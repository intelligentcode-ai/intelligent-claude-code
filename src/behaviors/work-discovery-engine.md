# Work Discovery Engine

**PURPOSE:** Continuously discover and queue new work for L3 autonomous execution

## Core Implementation

```pseudocode
CLASS WorkDiscovery:
    state = {scanInterval: 30000, discovered: Set(), sources: []}
    
    FUNCTION initialize():
        registerSources()
        startDiscoveryLoop()
    
    FUNCTION registerSources():
        sources = [scanBugs, scanStories, checkUnblocked, findFollowUps]
    
    FUNCTION startDiscoveryLoop():
        ASYNC WHILE true:
            wait(state.scanInterval)
            newWork = discoverWork()
            IF newWork.length > 0: processWork(newWork)
```

## Work Discovery

```pseudocode
FUNCTION discoverWork():
    allWork = []
    
    FOR source IN sources:
        TRY:
            work = source()
            IF work.length > 0:
                allWork.concat(work)
                LogWithContext("INFO", "Found " + work.length + " from " + source.name)
        CATCH error:
            HandleError(error, "Discovery - " + source.name)
    
    RETURN deduplicateWork(allWork)

FUNCTION scanBugs():
    bugs = []
    bugFiles = glob("epics/**/bugs/*/bug.yaml")
    
    FOR file IN bugFiles:
        content = readFile(file)
        bug = parseYAML(content)
        
        IF bug.status IN ["PLANNED", "IN PROGRESS"] AND
           bug.phase IN ["PLAN", "EXECUTE"] AND
           NOT state.discovered.has(bug.id):
            bugs.append(bug)
            
    RETURN bugs

FUNCTION scanStories():
    stories = []
    storyFiles = glob("epics/**/stories/*/story.yaml")
    
    FOR file IN storyFiles:
        content = readFile(file)
        story = parseYAML(content)
        
        IF story.status IN ["PLANNED", "IN PROGRESS"] AND
           NOT state.discovered.has(story.id):
            stories.append(story)
            
    RETURN stories
```

## Dependency Resolution

```pseudocode
FUNCTION checkUnblocked():
    unblocked = []
    
    FOR task IN getBlockedTasks():
        IF task.blockers.allResolved():
            task.status = "ready"
            unblocked.append(task)
            logInfo("Unblocked: " + task.id)
    
    RETURN unblocked

FUNCTION findFollowUps():
    followUps = []
    
    // Review follow-ups
    FOR review IN getCompletedReviews():
        IF review.hasIssues() AND NOT review.followUpsCreated:
            tasks = createReviewFollowUps(review)
            followUps.concat(tasks)
    
    // Error follow-ups
    FOR error IN getUnresolvedErrors():
        IF NOT error.hasFixTask:
            task = createErrorFixTask(error)
            followUps.append(task)
    
    RETURN followUps
```

## Work Processing

```pseudocode
FUNCTION processWork(workItems):
    FOR item IN workItems:
        state.discovered.add(item.id)
        
        SWITCH item.type:
            CASE "bug": processBug(item)
            CASE "story": processStory(item)
            CASE "task": processTask(item)

FUNCTION processBug(bug):
    IF bug.tasks.length == 0: createBugTasks(bug)
    
    FOR task IN bug.tasks:
        IF task.status IN ["planned", "ready"]:
            addToQueue(task)

FUNCTION processStory(story):
    IF story.phase == "PLAN" AND story.tasks.length == 0:
        triggerPlanning(story)
    ELSE:
        FOR task IN story.tasks:
            IF canExecute(task): addToQueue(task)
```

## Smart Prioritization

```pseudocode
FUNCTION prioritizeWork(items):
    FOR item IN items:
        item.priority = calculatePriority(item)
    
    items.sort((a, b) => a.priority - b.priority)
    RETURN items
```

## Configuration

```yaml
discovery_settings:
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
```

## Benefits

- **Continuous Discovery**: Always finding new work
- **Dependency Awareness**: Automatically unblocks work
- **Follow-Up Creation**: Never misses required fixes
- **Smart Prioritization**: Important work surfaces first