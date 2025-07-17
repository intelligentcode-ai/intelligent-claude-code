# Work Discovery Engine

**PURPOSE:** Continuously discover and queue new work for L3 autonomous execution

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
                logInfo("Found " + work.length + " items from " + source.name)
        CATCH error:
            logError("Discovery error in " + source.name + ": " + error)
    
    // Deduplicate
    uniqueWork = deduplicateWork(allNewWork)
    
    RETURN uniqueWork

FUNCTION scanForNewBugs():
    bugs = []
    bugFiles = glob("epics/**/bugs/*/bug.yaml")
    
    FOR bugFile IN bugFiles:
        bug = readYaml(bugFile)
        
        IF bug.status IN ["PLANNED", "IN PROGRESS"] AND
           bug.phase IN ["PLAN", "EXECUTE"] AND
           NOT isAlreadyDiscovered(bug.id):
            bugs.append(bug)
            
    RETURN bugs

FUNCTION scanForNewStories():
    stories = []
    storyFiles = glob("epics/**/stories/*/story.yaml")
    
    FOR storyFile IN storyFiles:
        story = readYaml(storyFile)
        
        IF story.status IN ["PLANNED", "IN PROGRESS"] AND
           NOT isAlreadyDiscovered(story.id):
            stories.append(story)
            
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
    // Sort by priority factors
    priorityFactors = {
        "security_bug": 0,
        "customer_bug": 100,
        "blocking_work": 200,
        "critical_path": 300,
        "feature_work": 400,
        "documentation": 500,
        "optional": 600
    }
    
    FOR item IN workItems:
        item.discoveryPriority = calculateDiscoveryPriority(item, priorityFactors)
    
    // Sort by priority
    workItems.sort((a, b) => a.discoveryPriority - b.discoveryPriority)
    
    RETURN workItems

FUNCTION calculateDiscoveryPriority(item, factors):
    basePriority = factors[item.category] || 999
    
    // Adjust for age
    ageBonus = Math.min(item.ageInDays * 10, 100)
    
    // Adjust for dependencies
    depBonus = item.blockingOthers ? -50 : 0
    
    RETURN basePriority - ageBonus + depBonus
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