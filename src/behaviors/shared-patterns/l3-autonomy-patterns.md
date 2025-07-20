# Shared L3 Autonomy Patterns

**PURPOSE:** Common patterns for L3 autonomous execution

## Core L3 Patterns

### L3 Mode Detection
```
autonomyLevel = getSetting("autonomy_level", "L2")
IF autonomyLevel == "L3":
  enableContinuousMode()
  disableBlockingBehaviors()
  activateAutoRecovery()
```

### Stop Conditions (L3 Only)
**Critical Stops:**
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass
- `DATA_LOSS_RISK` - Destructive operations without backup

**Auto-Handled (No Stop):**
- Process violations → Auto-correct
- Test failures → Apply fix patterns
- Lint errors → Auto-format
- Import issues → Resolve dependencies
- Type errors → Fix definitions

### Continuous Execution Pattern
```
WHILE l3Active:
  tasks = getReadyTasks(max: 5)
  IF tasks.empty:
    discoverNewWork()
  ELSE:
    executeParallel(tasks)
  handleCompletions()
  checkStopConditions()
```

### Auto-Recovery Pattern
```
IF error.isRecoverable:
  strategy = getRecoveryStrategy(error.type)
  applyStrategy(strategy)
  retryTask()
ELSE:
  createFixTask(error)
  continueWithOtherWork()
```

### Non-Blocking Review Pattern
```
IF review.required AND l3Mode:
  performAutoReview()
  IF issues.found:
    createFollowUpTasks(issues)
  markReviewComplete()
  continueExecution()
```

## Common L3 Operations

### enableL3Mode()
```
activateComponents:
  - continuous-engine
  - task-queue-manager
  - auto-continue-triggers
  - work-discovery-engine
  - progress-monitor
disableComponents:
  - user-approval-prompts
  - blocking-behaviors
  - manual-confirmations
```

### checkStopCondition(action)
```
IF action.type IN [BUSINESS_CRITICAL, SECURITY_VIOLATION, DATA_LOSS]:
  RETURN true  // Stop execution
ELSE:
  RETURN false // Continue autonomously
```

### autoCorrect(violation)
```
SWITCH violation.type:
  CASE "missing_validation":
    addValidation()
  CASE "skipped_step":
    executeStep()
  CASE "process_violation":
    applyCorrection()
continueExecution()
```

## L3 Configuration

### Required Settings
```yaml
autonomy_level: "L3"
blocking_enabled: false
auto_recovery: true
parallel_execution: true
continuous_mode: true
```

### Performance Settings
```yaml
max_parallel_tasks: 5
task_timeout_ms: 300000
error_threshold: 5
recovery_attempts: 3
```

---
*Shared L3 autonomy patterns for continuous execution*