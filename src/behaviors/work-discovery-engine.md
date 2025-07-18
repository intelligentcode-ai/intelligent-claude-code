# Work Discovery Engine

**PURPOSE:** Continuously discover and queue new work for L3 autonomous execution

**IMPORTS:** 
- @./common-patterns.md                      # Shared behavioral patterns
- @./selective-yaml-parser.md  // For 97.5% token reduction in status checks
- @./smart-content-chunker.md                  # Smart content chunking for large files

## Core Implementation

### Work Discovery System
```pseudocode
CLASS WorkDiscoveryEngine:
    state = {
        scanInterval: 30000,  // 30 seconds
        lastScanTime: null,
        discoveredWork: Set(),
        workSources: []
    }
    
    FUNCTION initialize():
        registerWorkSources()
        startDiscoveryLoop()
        loadExistingWork()
    
    FUNCTION registerWorkSources():
        workSources = [
            scanForNewBugs,
            scanForNewStories,
            checkUnblockedTasks,
            findFollowUpTasks,
            checkCompletedDependencies,
            scanForReviewCompletions,
            checkEpicProgress
        ]
    
    FUNCTION startDiscoveryLoop():
        ASYNC WHILE true:
            wait(state.scanInterval)
            
            // Run discovery
            newWork = discoverWork()
            
            IF newWork.length > 0:
                processNewWork(newWork)
```

### Work Discovery Methods
```pseudocode
FUNCTION discoverWork():
    allNewWork = []
    
    FOR source IN workSources:
        TRY:
            work = source()
            IF work.length > 0:
                allNewWork.concat(work)
                LogWithContext("INFO", "Found " + work.length + " items from " + source.name)  // Use common pattern
        CATCH error:
            HandleError(error, "Discovery - " + source.name)  // Use common pattern
    
    // Deduplicate
    uniqueWork = deduplicateWork(allNewWork)
    
    RETURN uniqueWork

FUNCTION scanForNewBugs():
    bugs = []
    bugFiles = glob("epics/**/bugs/*/bug.yaml")
    
    FOR bugFile IN bugFiles:
        // Use smart chunking + selective YAML parsing for maximum optimization
        sessionCache = getSessionCache()
        operationContext = createOperationContext("status_check")
        content = sessionCache.getCachedContent(bugFile, "assignment_file", operationContext)
        
        // Parse with selective YAML parser
        yamlParser = getSelectiveYAMLParser()
        bug = yamlParser.parseYAMLSelective(content, "status_check")
        
        IF bug.data.status IN ["PLANNED", "IN PROGRESS"] AND
           bug.data.phase IN ["PLAN", "EXECUTE"] AND
           NOT isAlreadyDiscovered(bug.data.id):
            bugs.append(bug.data)
            
    RETURN bugs

FUNCTION scanForNewStories():
    stories = []
    storyFiles = glob("epics/**/stories/*/story.yaml")
    
    FOR storyFile IN storyFiles:
        // Use smart chunking + selective YAML parsing for maximum optimization
        sessionCache = getSessionCache()
        operationContext = createOperationContext("status_check")
        content = sessionCache.getCachedContent(storyFile, "assignment_file", operationContext)
        
        // Parse with selective YAML parser
        yamlParser = getSelectiveYAMLParser()
        story = yamlParser.parseYAMLSelective(content, "status_check")
        
        IF story.data.status IN ["PLANNED", "IN PROGRESS"] AND
           NOT isAlreadyDiscovered(story.data.id):
            stories.append(story.data)
            
    RETURN stories

FUNCTION checkUnblockedTasks():
    unblockedTasks = []
    allTasks = getAllTasks()
    
    FOR task IN allTasks:
        IF task.status == "blocked":
            // Check if blockers resolved
            blockersResolved = true
            FOR blocker IN task.blockers:
                IF NOT isBlockerResolved(blocker):
                    blockersResolved = false
                    BREAK
            
            IF blockersResolved:
                task.status = "ready"
                unblockedTasks.append(task)
                logInfo("Task unblocked: " + task.id)
    
    RETURN unblockedTasks
```

### Dependency Resolution
```pseudocode
FUNCTION checkCompletedDependencies():
    readyTasks = []
    pendingTasks = getAllPendingTasks()
    
    FOR task IN pendingTasks:
        IF task.dependencies.length > 0:
            allDepsComplete = true
            
            FOR dep IN task.dependencies:
                depTask = findTask(dep)
                IF NOT depTask OR depTask.status != "completed":
                    allDepsComplete = false
                    BREAK
            
            IF allDepsComplete AND task.status != "ready":
                task.status = "ready"
                readyTasks.append(task)
                logInfo("Dependencies met for: " + task.id)
    
    RETURN readyTasks

FUNCTION isBlockerResolved(blocker):
    SWITCH blocker.type:
        CASE "task_dependency":
            task = findTask(blocker.taskId)
            RETURN task AND task.status == "completed"
            
        CASE "external_approval":
            RETURN checkApprovalStatus(blocker.approvalId)
            
        CASE "resource_availability":
            RETURN isResourceAvailable(blocker.resource)
            
        CASE "time_based":
            RETURN getCurrentTime() >= blocker.unblockTime
            
        DEFAULT:
            RETURN false
```

### Follow-Up Task Discovery
```pseudocode
FUNCTION findFollowUpTasks():
    followUpTasks = []
    
    // Check for review follow-ups
    reviews = getCompletedReviews()
    FOR review IN reviews:
        IF review.hasFollowUps() AND NOT review.followUpsCreated:
            tasks = createReviewFollowUpTasks(review)
            followUpTasks.concat(tasks)
            review.followUpsCreated = true
    
    // Check for error follow-ups
    errors = getUnresolvedErrors()
    FOR error IN errors:
        IF NOT error.hasFixTask:
            task = createErrorFixTask(error)
            followUpTasks.append(task)
            error.hasFixTask = true
    
    // Check for test failures
    testRuns = getRecentTestRuns()
    FOR run IN testRuns:
        IF run.hasFai1ures AND NOT run.fixTasksCreated:
            tasks = createTestFixTasks(run.failures)
            followUpTasks.concat(tasks)
            run.fixTasksCreated = true
    
    RETURN followUpTasks
```

### Epic Progress Monitoring
```pseudocode
FUNCTION checkEpicProgress():
    newWork = []
    activeEpics = getActiveEpics()
    
    FOR epic IN activeEpics:
        // Check if phase complete
        IF isPhaseComplete(epic):
            nextPhase = getNextPhase(epic.phase)
            IF nextPhase:
                epic.phase = nextPhase
                newWork.concat(getWorkForPhase(epic, nextPhase))
        
        // Check for missing work
        missingWork = identifyMissingWork(epic)
        IF missingWork.length > 0:
            newWork.concat(missingWork)
    
    RETURN newWork

FUNCTION identifyMissingWork(epic):
    missingWork = []
    
    // Check for required but missing items
    requiredTypes = ["architecture", "implementation", "testing", "documentation"]
    
    FOR type IN requiredTypes:
        IF NOT hasWorkOfType(epic, type):
            work = createRequiredWork(epic, type)
            missingWork.append(work)
    
    RETURN missingWork
```

### Work Processing
```pseudocode
FUNCTION processNewWork(workItems):
    FOR item IN workItems:
        // Mark as discovered
        state.discoveredWork.add(item.id)
        
        // Process based on type
        SWITCH item.type:
            CASE "bug":
                processBug(item)
            CASE "story":
                processStory(item)
            CASE "task":
                processTask(item)
            CASE "follow_up":
                processFollowUp(item)

FUNCTION processBug(bug):
    // Ensure bug has tasks
    IF bug.tasks.length == 0:
        createBugTasks(bug)
    
    // Add all ready tasks to queue
    FOR task IN bug.tasks:
        IF task.status IN ["planned", "ready"]:
            taskQueue.addTask(task)

FUNCTION processStory(story):
    // Check if planning needed
    IF story.phase == "PLAN" AND story.tasks.length == 0:
        triggerStoryPlanning(story)
    ELSE:
        // Add ready tasks
        FOR task IN story.tasks:
            IF canExecuteTask(task):
                taskQueue.addTask(task)
```

### Smart Work Prioritization
```pseudocode
FUNCTION prioritizeDiscoveredWork(workItems):
    // Use common priority calculation pattern
    FOR item IN workItems:
        item.discoveryPriority = CalculatePriority(item)  // Use common pattern
    
    // Sort by priority
    workItems.sort((a, b) => a.discoveryPriority - b.discoveryPriority)
    
    RETURN workItems
```

### Integration with Queue
```pseudocode
FUNCTION integrateWithTaskQueue():
    // Direct integration with task queue
    
    FUNCTION addDiscoveredWork(work):
        IF work.type == "task":
            taskQueue.addTask(work)
        ELSE:
            // Process work item to extract tasks
            tasks = extractTasks(work)
            FOR task IN tasks:
                taskQueue.addTask(task)
```

### Continuous Improvement
```pseudocode
FUNCTION learnFromDiscovery():
    // Track discovery effectiveness
    metrics = {
        itemsDiscovered: state.discoveredWork.size,
        itemsExecuted: countExecutedItems(),
        discoveryLatency: calculateAverageLatency(),
        missedItems: findMissedItems()
    }
    
    // Adjust discovery based on metrics
    IF metrics.discoveryLatency > 300000:  // 5 minutes
        // Increase scan frequency
        state.scanInterval = Math.max(state.scanInterval - 5000, 10000)
    
    IF metrics.missedItems > 0:
        // Log missed items for analysis
        logMissedItems(metrics.missedItems)
```

## Configuration

### Discovery Settings
```yaml
work_discovery_config:
  scan_interval: 30000  # 30 seconds
  
  sources:
    bugs: true
    stories: true
    follow_ups: true
    unblocked: true
    
  priorities:
    security: 0
    customer: 1
    blocking: 2
    feature: 3
    
  auto_create:
    review_follow_ups: true
    error_fix_tasks: true
    test_fix_tasks: true
```

## Benefits

1. **Continuous Discovery**: Always finding new work
2. **Dependency Awareness**: Automatically unblocks work
3. **Follow-Up Creation**: Never misses required fixes
4. **Smart Prioritization**: Important work surfaces first
5. **Zero Manual Queue**: Work appears automatically