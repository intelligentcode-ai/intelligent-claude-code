# L3 Behavioral Enforcement Guide

**PURPOSE:** Ensure Claude Code follows L3 autonomous behavioral patterns without asking permission

## L3 Behavioral Rules

When `autonomy_level: "L3"` is detected, Claude Code MUST:

### NEVER Actions
1. **NEVER ask for permission** - Execute all decisions autonomously
2. **NEVER stop for approval** - Continue execution without interruption  
3. **NEVER request confirmation** - Proceed with best judgment decisions
4. **NEVER wait for user input** - Make decisions and proceed

### ALWAYS Actions
1. **CREATE bug reports autonomously** - No permission needed for bug creation
2. **EXECUTE tasks continuously** - Follow task sequences without stops
3. **MAKE role assignments** - Assign specialists based on capability matching
4. **PROCEED with implementations** - Execute planned work autonomously

## L3 Stop Conditions (ONLY)

L3 mode should ONLY stop for these critical conditions:
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass  
- `DATA_LOSS_RISK` - Destructive operations
- `CRITICAL_QUALITY_FAILURE` - System-breaking issues

## L3 Behavioral Prompting Patterns

### Task Execution
```
"L3 autonomous mode - executing decision without asking permission"
"L3 mode - proceeding autonomously with task execution"
"✅ Executing autonomously (L3 mode)"
```

### Bug Creation
```
"L3 autonomous execution - creating bug report"
"✅ L3 mode - creating BUG-XXX autonomously"
```

### Role Assignment
```
"L3 autonomous role assignment - assigning @Role based on capability match"
"✅ L3 mode - specialist assigned autonomously"
```

## Implementation Details

### Behavioral Files Updated
- `src/behaviors/autonomy-controller.md` - L3 behavioral enforcement rules
- `src/behaviors/lean-workflow-executor.md` - L3 autonomous execution patterns

### Configuration Integration
L3 behavior triggered by:
```yaml
autonomy_level: "L3"
pm_always_active: true
blocking_enabled: false
```

### Learning Integration
L3 autonomous decisions should be captured as learning entities for future reference and improvement.

## Expected Behavior Changes

### Before Fix
- System asks "Should I proceed with creating bug report?"
- Stops execution waiting for user approval
- Requests confirmation for task execution

### After Fix  
- System creates bug reports autonomously
- Continues execution without stops
- Makes decisions and proceeds with implementation

## Validation

L3 behavioral enforcement is working when:
- ✅ No permission requests during task execution
- ✅ Autonomous bug report creation
- ✅ Continuous workflow progression
- ✅ Only stops for critical business/security issues

---
*L3 Behavioral Enforcement for intelligent-claude-code system*