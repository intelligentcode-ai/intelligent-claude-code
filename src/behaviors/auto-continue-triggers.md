# Auto-Continue Triggers

**PURPOSE:** Enable automatic progression between tasks and phases in L3 mode

## Imports

@./common-patterns.md                      # Shared behavioral patterns

## Core Implementation

### Trigger Registry
```pseudocode
CLASS AutoContinueTriggers:
    triggers = Map()
    activeListeners = Set()
    
    FUNCTION initialize():
        registerCoreTriggers()
        registerPhaseTriggers()
        registerErrorTriggers()
        registerCompletionTriggers()
        startTriggerListener()
    
    FUNCTION registerCoreTriggers():
        // Task lifecycle triggers
        triggers.set("task.completed", handleTaskCompleted)
        triggers.set("task.failed", handleTaskFailed)
        triggers.set("task.blocked", handleTaskBlocked)
        triggers.set("task.unblocked", handleTaskUnblocked)
        
        // Work item triggers
        triggers.set("story.ready", handleStoryReady)
        triggers.set("bug.ready", handleBugReady)
        triggers.set("epic.updated", handleEpicUpdated)
    
    FUNCTION registerPhaseTriggers():
        // Phase transition triggers
        triggers.set("phase.plan.complete", transitionToExecute)
        triggers.set("phase.execute.complete", transitionToAcceptance)
        triggers.set("phase.acceptance.complete", transitionToDone)
        triggers.set("phase.done.reached", archiveAndContinue)
    
    FUNCTION registerErrorTriggers():
        // Error recovery triggers
        triggers.set("error.test_failure", handleTestFailure)
        triggers.set("error.lint_issue", handleLintIssue)
        triggers.set("error.type_error", handleTypeError)
        triggers.set("error.build_failure", handleBuildFailure)
        triggers.set("error.non_critical", logAndContinue)
    
    FUNCTION registerCompletionTriggers():
        // Completion chain triggers
        triggers.set("implementation.complete", triggerTesting)
        triggers.set("testing.complete", triggerReview)
        triggers.set("review.complete", triggerDocumentation)
        triggers.set("documentation.complete", triggerGitOps)
        triggers.set("git.complete", triggerNextWork)
```

### Task Completion Handlers
```pseudocode
FUNCTION handleTaskCompleted(event):
    task = event.task
    
    // Log completion using common pattern
    LogWithContext("INFO", "Task completed: " + task.id + " (" + task.type + ")")
    
    // Determine next action based on task type
    SWITCH task.type:
        CASE "implementation":
            triggerTesting(task)
            
        CASE "testing":
            IF testsPassed(task):
                triggerReview(task)
            ELSE:
                triggerFixImplementation(task)
                
        CASE "review":
            IF reviewApproved(task):
                triggerDocumentation(task)
            ELSE:
                triggerImplementationFixes(task)
                
        CASE "documentation":
            triggerGitOps(task)
            
        CASE "git_operations":
            completeStoryAndContinue(task)
            
        CASE "knowledge_retrieval":
            triggerMainWork(task)
            
        CASE "knowledge_generation":
            markWorkComplete(task)

FUNCTION triggerTesting(implementationTask):
    story = implementationTask.getParentStory()
    testTasks = story.getTasksByType("testing")
    
    IF testTasks.length == 0:
        // No tests defined, skip to review
        LogWithContext("WARNING", "No test tasks found, skipping to review")  // Use common pattern
        triggerReview(implementationTask)
        RETURN
    
    // Mark test tasks as ready
    FOR testTask IN testTasks:
        IF testTask.dependencies.includes(implementationTask.id):
            testTask.status = "ready"
            queueManager.addTask(testTask)
            logInfo("Test task ready: " + testTask.id)

FUNCTION triggerReview(task):
    story = task.getParentStory()
    reviewTasks = story.getTasksByType("review")
    
    IF reviewTasks.length == 0:
        // Create automatic review task
        reviewTask = createAutoReviewTask(story, task)
        story.addTask(reviewTask)
    
    // Mark review tasks as ready
    FOR reviewTask IN reviewTasks:
        reviewTask.status = "ready"
        queueManager.addTask(reviewTask)
        
        // Non-blocking review in L3
        IF getAutonomyLevel() == "L3":
            reviewTask.blocking = false
```

### Phase Transition Handlers
```pseudocode
FUNCTION transitionToExecute(event):
    item = event.workItem
    
    IF item.phase != "PLAN":
        RETURN  // Wrong phase
        
    // Verify all tasks created
    IF NOT allTasksCreated(item):
        logWarning("Cannot transition - tasks incomplete")
        RETURN
        
    // Transition phase
    item.phase = "EXECUTE"
    item.phaseTransitionTime = getCurrentTime()
    
    // Activate all ready tasks
    executeTasks = item.getTasksForPhase("EXECUTE")
    FOR task IN executeTasks:
        IF task.dependencies.length == 0:
            task.status = "ready"
            queueManager.addTask(task)
            
    logInfo("Transitioned " + item.id + " to EXECUTE phase")

FUNCTION transitionToAcceptance(event):
    item = event.workItem
    
    IF item.phase != "EXECUTE":
        RETURN
        
    // Verify all execution complete
    IF NOT allExecutionComplete(item):
        RETURN
        
    // Transition phase
    item.phase = "ACCEPTANCE"
    
    // Run acceptance validation
    validationResult = validateAcceptanceCriteria(item)
    
    IF validationResult.passed:
        // Auto-transition to DONE
        transitionToDone({workItem: item})
    ELSE:
        // Create fix tasks
        createAcceptanceFixTasks(item, validationResult)

FUNCTION transitionToDone(event):
    item = event.workItem
    
    item.phase = "DONE"
    item.completedAt = getCurrentTime()
    
    // Capture learnings
    captureLearnings(item)
    
    // Archive
    archiveWorkItem(item)
    
    // Trigger next work discovery
    triggerEvent("work.completed", {item: item})
```

### Error Recovery Handlers
```pseudocode
FUNCTION handleTestFailure(event):
    task = event.task
    error = event.error
    
    IF canAutoFixTest(error):
        fix = generateTestFix(error)
        applyFix(task, fix)
        retryTask(task)
    ELSE:
        // Create fix task
        fixTask = createTestFixTask(task, error)
        queueManager.addTask(fixTask)
        
        // Continue with other work
        continueWithOtherTasks()

FUNCTION handleLintIssue(event):
    task = event.task
    issues = event.lintIssues
    
    // Attempt auto-fix
    autoFixed = runAutoFormatter(task.files)
    
    IF autoFixed:
        logInfo("Auto-fixed lint issues")
        retryTask(task)
    ELSE:
        // Manual fix needed
        createLintFixTask(task, issues)

FUNCTION handleTypeError(event):
    task = event.task
    error = event.typeError
    
    // Try common fixes
    fixes = [
        tryAddTypeAnnotation,
        tryFixImport,
        tryAddMissingProperty,
        tryFixTypeMismatch
    ]
    
    FOR fix IN fixes:
        IF fix.canHandle(error):
            result = fix.apply(task, error)
            IF result.success:
                retryTask(task)
                RETURN
                
    // Create manual fix task
    createTypeFixTask(task, error)
```

### Continuous Flow Handlers
```pseudocode
FUNCTION completeStoryAndContinue(gitTask):
    story = gitTask.getParentStory()
    
    // Mark story complete
    story.status = "completed"
    story.phase = "DONE"
    
    // Update epic progress
    epic = story.getEpic()
    epic.updateProgress()
    
    // Discover next work
    nextWork = findNextWork(epic)
    
    IF nextWork:
        activateWork(nextWork)
    ELSE:
        // Check other epics
        checkOtherEpics()

FUNCTION findNextWork(currentEpic):
    // Priority order for next work
    workSources = [
        findBlockingBugs,
        findCriticalPathStories,
        findParallelWork,
        findNewBugs,
        findNewStories
    ]
    
    FOR source IN workSources:
        work = source(currentEpic)
        IF work:
            RETURN work
            
    RETURN null

FUNCTION activateWork(workItem):
    // Set as active
    workItem.status = "active"
    
    // Start planning if needed
    IF workItem.phase == "INIT":
        startPlanning(workItem)
    ELSE IF workItem.phase == "PLAN":
        continePlanning(workItem)
    ELSE IF workItem.phase == "EXECUTE":
        resumeExecution(workItem)
```

### Event Propagation
```pseudocode
FUNCTION triggerEvent(eventType, data):
    // Check if handler exists
    IF NOT triggers.has(eventType):
        LogWithContext("DEBUG", "No handler for event: " + eventType)  // Use common pattern
        RETURN
        
    // Get handler
    handler = triggers.get(eventType)
    
    // Create event object
    event = {
        type: eventType,
        timestamp: getCurrentTime(),
        data: data
    }
    
    // Execute handler
    TRY:
        handler(event)
    CATCH error:
        HandleError(error, "Handler - " + eventType)  // Use common pattern
        // Continue execution despite error
        handleHandlerError(eventType, error)

FUNCTION handleHandlerError(eventType, error):
    // Log detailed error
    errorDetails = {
        event: eventType,
        error: error.message,
        stack: error.stack,
        timestamp: getCurrentTime()
    }
    
    logError(errorDetails)
    
    // Create error recovery task if critical
    IF isCriticalEvent(eventType):
        createErrorRecoveryTask(eventType, error)
```

### Custom Trigger Registration
```pseudocode
FUNCTION registerCustomTrigger(eventType, handler):
    // Validate handler
    IF typeof handler != "function":
        throw "Handler must be a function"
        
    // Register
    triggers.set(eventType, handler)
    logInfo("Registered custom trigger: " + eventType)
    
FUNCTION unregisterTrigger(eventType):
    triggers.delete(eventType)
    logInfo("Unregistered trigger: " + eventType)
```

## Integration Examples

### With Continuous Engine
```pseudocode
// In l3-continuous-engine.md
FUNCTION handleTaskCompletion(task, result):
    // Original completion logic
    task.status = "completed"
    
    // Trigger auto-continue
    autoContinueTriggers.triggerEvent("task.completed", {
        task: task,
        result: result
    })
```

### With Task Queue
```pseudocode
// In task-queue-manager.md
FUNCTION updateTaskStatus(taskId, newStatus):
    // Original status update
    task.status = newStatus
    
    // Trigger appropriate event
    IF newStatus == "completed":
        triggerEvent("task.completed", {task: task})
    ELSE IF newStatus == "failed":
        triggerEvent("task.failed", {task: task})
    ELSE IF newStatus == "blocked":
        triggerEvent("task.blocked", {task: task})
```

## Benefits

1. **Automatic Progression**: Tasks flow without manual intervention
2. **Smart Error Handling**: Auto-recovery for common issues
3. **Phase Management**: Automatic phase transitions
4. **Continuous Discovery**: Always finding next work
5. **Non-Blocking Reviews**: Reviews don't stop progress in L3