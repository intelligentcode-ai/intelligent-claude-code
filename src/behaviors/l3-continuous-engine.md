# L3 Continuous Engine

**PURPOSE:** True continuous execution in L3 mode - no stops unless critical

## Core Execution

```pseudocode
CLASS L3Engine:
    state = {active: false, tasks: [], errors: 0}
    
    FUNCTION start():
        IF GetSetting("autonomy_level") == "L3":
            state.active = true; executeLoop()
    
    FUNCTION executeLoop():
        WHILE state.active:
            tasks = getReadyTasks(5)
            IF tasks: executeParallel(tasks)
            ELSE: discoverWork()
            autoTransition(); handleStuck()
            wait(tasks ? 10ms : 100ms)
    
    FUNCTION executeParallel(tasks):
        groups = groupNonConflicting(tasks)
        FOR group IN groups: executeGroupAsync(group)
    
    FUNCTION executeTask(task):
        ConsultLearnings("task", task.type)
        role = getValidatedRole(task)
        result = role.execute(task)
        performPeerReview(task, result)
        storeKnowledge(task, result)
        gitCommit(task, result)
        triggerNext(task)
```

## Stop Conditions

```pseudocode
FUNCTION shouldStop(issue):
    CRITICAL = ["BUSINESS_IMPACT", "SECURITY_VIOLATION", "DATA_LOSS"]
    
    IF issue.type == "PROCESS_VIOLATION":
        autoCorrect(issue); RETURN false
    
    RETURN issue.type IN CRITICAL AND NOT canAutoResolve(issue)

FUNCTION canAutoResolve(issue):
    RETURN issue.subtype IN ["test", "lint", "format", "import", "type"]
```

## Auto-Continue

```pseudocode
FUNCTION triggerNext(task):
    nextActions = {
        "implementation": triggerTesting,
        "testing": triggerReview,
        "review": (t) => reviewPassed(t) ? triggerDocs(t) : triggerFix(t),
        "documentation": triggerGit,
        "git": markComplete
    }
    nextActions[task.type](task)
```

## Work Discovery

```pseudocode
FUNCTION discoverWork():
    sources = [findBugs, findStories, findUnblocked, findFollowUp]
    FOR source IN sources:
        work = source()
        FOR item IN work: addToQueue(item)
```

## Error Recovery

```pseudocode
FUNCTION recoverError(task, error):
    ConsultLearnings("error", error.type)
    strategies = getStrategies(error.type)
    FOR strategy IN strategies:
        IF strategy.attempt(task, error): RETURN retry(task)
    createFixTask(task, error)
```

## Configuration

```yaml
l3_settings:
  max_parallel: 5
  timeout_ms: 300000
  error_threshold: 5
  
  stop_for:
    - business_impact
    - security_violation
    - data_loss
    
  auto_recover:
    - test_failures
    - lint_errors
    - type_errors
```

## Benefits

- **Never Stops**: Only for critical L3 conditions
- **Parallel Tasks**: Up to 5 simultaneous
- **Auto-Recovery**: Common errors handled
- **Smart Discovery**: Finds next work automatically