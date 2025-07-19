# Auto-Continue Triggers

**PURPOSE:** Automatic progression between tasks and phases in L3 mode

## Core Implementation

```pseudocode
CLASS AutoTriggers:
    triggers = Map()
    
    FUNCTION initialize():
        registerTriggers()
        startListener()
    
    FUNCTION registerTriggers():
        triggers.set("task.completed", handleTaskCompleted)
        triggers.set("task.failed", handleTaskFailed)
        triggers.set("phase.complete", handlePhaseComplete)
        triggers.set("error.occurred", handleError)
```

## Task Completion Handlers

```pseudocode
FUNCTION handleTaskCompleted(task):
    LogWithContext("INFO", "Task completed: " + task.id)
    
    SWITCH task.type:
        CASE "implementation": triggerTesting(task)
        CASE "testing": triggerReview(task)
        CASE "review": triggerDocs(task)
        CASE "documentation": triggerGit(task)
        CASE "git": markStoryComplete(task)

FUNCTION triggerTesting(task):
    story = task.getParent()
    testTasks = story.getTasksByType("testing")
    
    IF testTasks.length == 0:
        LogWithContext("WARNING", "No tests, skipping to review")
        triggerReview(task)
        RETURN
    
    FOR testTask IN testTasks:
        IF testTask.dependencies.includes(task.id):
            testTask.status = "ready"
            addToQueue(testTask)
```

## Phase Transitions

```pseudocode
FUNCTION handlePhaseComplete(item):
    SWITCH item.phase:
        CASE "PLAN": 
            IF allTasksCreated(item): transitionTo(item, "EXECUTE")
        CASE "EXECUTE":
            IF allTasksCompleted(item): transitionTo(item, "ACCEPTANCE")
        CASE "ACCEPTANCE":
            IF acceptanceMet(item): transitionTo(item, "DONE")

FUNCTION transitionTo(item, phase):
    item.phase = phase
    item.transitionTime = now()
    activatePhase(item, phase)
```

## Error Recovery

```pseudocode
FUNCTION handleError(event):
    task = event.task
    error = event.error
    
    IF canAutoFix(error):
        fix = generateFix(error)
        applyFix(task, fix)
        retryTask(task)
    ELSE:
        createFixTask(task, error)
        continueOtherWork()
```

## Event Propagation

```pseudocode
FUNCTION triggerEvent(type, data):
    IF NOT triggers.has(type):
        LogWithContext("DEBUG", "No handler for: " + type)
        RETURN
        
    handler = triggers.get(type)
    event = {type: type, data: data, timestamp: now()}
    
    TRY:
        handler(event)
    CATCH error:
        HandleError(error, "Trigger - " + type)
        createRecoveryTask(type, error)
```

## Continuous Flow

```pseudocode
FUNCTION markStoryComplete(gitTask):
    story = gitTask.getParent()
    story.status = "completed"
    story.phase = "DONE"
    
    epic = story.getEpic()
    epic.updateProgress()
    
    nextWork = findNextWork(epic)
    IF nextWork: activateWork(nextWork)
    ELSE: checkOtherEpics()
```

## Benefits

- **Automatic Progression**: Tasks flow without manual intervention
- **Smart Error Handling**: Auto-recovery for common issues
- **Phase Management**: Automatic phase transitions
- **Continuous Discovery**: Always finding next work