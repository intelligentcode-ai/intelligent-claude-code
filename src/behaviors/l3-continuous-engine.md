# L3 Continuous Engine

**Purpose:** True continuous execution in L3 mode - no stops unless critical

## Core Execution

**Activation:** Use `/icc-l3-activate` when autonomy_level = "L3" to start continuous loop and process tasks without interruption  
**Task Discovery:** Use `/icc-queue-get-parallel [5]` to get ready tasks, group non-conflicting, execute in parallel, or use `/icc-discover-work` if none  
**Task Execution:** Use `/icc-memory-search` → `/icc-validate-assignments` → Execute work → Peer review → `/icc-learning-capture` → `/icc-git-clean` → Trigger next  
**Loop Behavior:** Use `/icc-l3-continuous-loop` to continue while active, auto-transition phases, handle stuck states, minimal wait between cycles

## Stop Conditions

### Critical Stops Only
- **BUSINESS_IMPACT** - Major business logic changes
- **SECURITY_VIOLATION** - Credential exposure, auth bypass
- **DATA_LOSS** - Destructive operations without backup

### Auto-Resolved Issues
- **Process violations** → Auto-correct and continue
- **Test failures** → Apply fix patterns
- **Lint errors** → Auto-format
- **Import issues** → Resolve dependencies
- **Type errors** → Fix type definitions

## Auto-Continue Triggers

**Task Flow:** Use `/icc-auto-continue [task_id]` for Implementation → Testing → Review → Documentation → Git operations → Complete  
**Review Handling:** Use `/icc-handle-review-result [review_data]` - IF passed: Continue to docs • IF failed: Create fix task  
**Phase Transitions:** Use `/icc-phase-transition [next_phase]` for automatic progression without manual triggers  
**Completion Actions:** Use `/icc-complete-task [task_id]` to mark done, update status, and find next work

## Work Discovery

**Sources:** Use `/icc-discover-work` to find bugs in PLANNED/IN PROGRESS, stories needing tasks, unblocked dependencies, and create follow-up tasks  
**Queue Management:** Use `/icc-queue-add [discovered_work]` to add work to priority queue and `/icc-prioritize` to process by priority order  
**Continuous Discovery:** Use `/icc-discover-work [continuous]` for always scanning, never idle

## Error Recovery

**Recovery Process:** Use `/icc-process-error [error_data]` to consult error learnings, try recovery strategies, retry task if successful, or create fix task  
**Learning Integration:** Use `/icc-memory-search [error_type]` to apply previous solutions, `/icc-learning-capture` to store new patterns, and `/icc-share-learning` across team  
**Non-Blocking:** Use `/icc-create-task [fix_description]` for errors to create tasks, not stops, and continue with other work

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