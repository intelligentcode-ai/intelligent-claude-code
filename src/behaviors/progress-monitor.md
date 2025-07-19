# Progress Monitor

**PURPOSE:** Continuous progress visibility without stopping execution in L3 mode

## Core Implementation

```pseudocode
CLASS ProgressMonitor:
    state = {active: Map(), completed: [], metrics: {}, lastReport: null}
    
    FUNCTION initialize():
        startTracking()
        startReporting()
    
    FUNCTION startTracking():
        ASYNC WHILE true:
            wait(1000ms)
            updateActiveWork()
            checkMilestones()
            IF shouldReport(): generateReport()
```

## Non-Blocking Handlers

```pseudocode
FUNCTION applyL3NonBlocking(action):
    IF GetSetting("autonomy_level") != "L3":
        RETURN action.executeNormally()
    
    replacements = {
        "waitForUserConfirmation": logAndContinue,
        "confirmTaskComplete": markCompleteAndContinue,
        "approveReview": performAutomatedReview,
        "pauseAfterTask": continueToNext,
        "confirmError": autoHandleError
    }
    
    IF replacements.has(action.type):
        RETURN replacements.get(action.type)(action)
    
    RETURN action.executeNormally()

FUNCTION logAndContinue(action):
    LogWithContext("INFO", "Auto-continuing: " + action.description)
    updateProgress(action)
    RETURN {continue: true, result: action.defaultResult}

FUNCTION markCompleteAndContinue(task):
    task.status = "completed"
    task.completedAt = now()
    triggerEvent("task.completed", {task: task})
    RETURN {continue: true}
```

## Smart Stop Conditions

```pseudocode
FUNCTION shouldStop(context):
    IF GetSetting("autonomy_level") != "L3":
        RETURN true  // Normal stop behavior
    
    criticalConditions = [
        isBusinessCritical,
        isSecurityViolation,
        isDataLossRisk,
        isSystemFailure
    ]
    
    FOR condition IN criticalConditions:
        IF condition(context):
            logCriticalStop(condition, context)
            RETURN true
    
    RETURN false  // Don't stop for non-critical

FUNCTION isBusinessCritical(context):
    patterns = ["pricing", "customer data deletion", "api breaking", "legal", "payment"]
    FOR pattern IN patterns:
        IF context.description.includes(pattern): RETURN true
    RETURN false
```

## Review Handling

```pseudocode
FUNCTION performAutomatedReview(review):
    IF GetSetting("autonomy_level") == "L3":
        reviewResult = automatedPeerReview(review.task, review.result)
        IF reviewResult.hasIssues():
            createFollowUpTask(reviewResult.issues)
        RETURN {continue: true, blocking: false, completed: true}
    ELSE:
        RETURN {continue: false, blocking: true}
```

## Error Recovery

```pseudocode
FUNCTION autoHandleError(error):
    IF canAutoRecover(error):
        recovery = attemptRecovery(error)
        IF recovery.success:
            logInfo("Auto-recovered: " + error.type)
            RETURN {continue: true}
    
    IF GetSetting("autonomy_level") == "L3":
        createErrorFixTask(error)
        logWarning("Created fix task: " + error.type)
        RETURN {continue: true, createdFixTask: true}
    
    RETURN {continue: false}
```

## Progress Reporting

```pseudocode
FUNCTION generateReport():
    summary = {
        tasksCompleted: countCompletedSince(state.lastReport),
        tasksInProgress: state.active.size(),
        tasksQueued: getQueuedCount(),
        milestones: getRecentMilestones()
    }
    
    logProgressSummary(summary)
    state.lastReport = now()
```

## Benefits

- **No Unnecessary Stops**: Removes non-critical stopping points
- **Continuous Visibility**: Real-time progress without interruption
- **Smart Decisions**: Only stops for truly critical issues
- **Auto-Recovery**: Handles common issues automatically