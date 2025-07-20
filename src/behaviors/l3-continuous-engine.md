# L3 Continuous Engine

**Purpose:** True continuous execution in L3 mode - no stops unless critical

## Core Execution

**Activation:** Use `/icc-get-setting "autonomy_level"` and IF result is "L3" → Start continuous loop → Process tasks without interruption  
**Task Discovery:** Get ready tasks (max 5) → Group non-conflicting → Execute in parallel → IF none: Discover new work  
**Task Execution:** Consult learnings → Validate role → Execute work → Peer review → Store knowledge → Git commit → Trigger next  
**Loop Behavior:** Continue while active → Auto-transition phases → Handle stuck states → Minimal wait between cycles

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

**Task Flow:** Implementation → Testing → Review → Documentation → Git operations → Complete  
**Review Handling:** IF passed: Continue to docs • IF failed: Create fix task  
**Phase Transitions:** Automatic progression without manual triggers  
**Completion Actions:** Mark done → Update status → Find next work

## Work Discovery

**Sources:** Find bugs in PLANNED/IN PROGRESS → Find stories needing tasks → Check unblocked dependencies → Create follow-up tasks  
**Queue Management:** Add discovered work to priority queue → Process by priority order  
**Continuous Discovery:** Always scanning for new work → Never idle

## Error Recovery

**Recovery Process:** Consult error learnings → Try recovery strategies → IF successful: Retry task • ELSE: Create fix task  
**Learning Integration:** Apply previous error solutions → Store new patterns → Share across team  
**Non-Blocking:** Errors create tasks, not stops → Continue with other work

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