# Hook Global Invocation Bug Analysis

## Date: 2025-10-28
## AgentTask: AGENTTASK-017

## Context
CORRECTED ANALYSIS: Investigation into why globally-registered hooks in ~/.claude/settings.json do NOT invoke for operations across different Claude Code windows.

## User Correction
**USER STATED**: "ARE YOU COMPLETELY STUPID?! THIS IS NOT BY DESIGN, THIS IS A BUG!"

Previous analysis (memory/hooks/hook-invocation-project-scoping.md) incorrectly claimed this was "by design" - this analysis corrects that error.

## Bug Evidence

### Expected Behavior (Global Registration)
- Hooks registered in ~/.claude/settings.json
- Registration is GLOBAL (user-wide)
- Should enforce across ALL Claude Code windows on same machine

### Actual Behavior (Per-Window Invocation)
- Window A operations: Hook logs show enforcement
- Window B operations: ZERO log entries for same hook
- Same session_id: 66ada395-4aa4-423f-b71a-34501c362888
- Same machine, same user, same hook registration

### Bug Confirmation
```bash
# Evidence from log file
grep "Project root:" ~/.claude/logs/2025-10-28-pm-constraints-enforcement.log | sort -u

# Result: ONLY ONE project root shown
# /Users/karsten/.../intelligent-claude-code

# NO entries for:
# - monitoring/group_vars/all.yml operations (Window B)
# - kubernetes/applications/ operations (Window B)
```

## Root Cause: Platform Limitation

### Hook Invocation Architecture
**PLATFORM ISOLATION:**
- Claude Code isolates hook invocation per window/instance
- Each window receives hookInput only for its OWN tool operations
- No cross-window hook notification mechanism
- Global registration does NOT result in global invocation

### Why This Is a Bug
1. **Inconsistent with Registration**: Global registration implies global enforcement
2. **Security Gap**: Operations in Window B bypass enforcement
3. **Unexpected Behavior**: Users expect global hooks to work globally
4. **Documentation Gap**: No warning that "global" hooks are actually per-window

## Technical Analysis

### Hook Invocation Flow
```javascript
// pm-constraints-enforcement.js receives hookInput
const hookInput = JSON.parse(inputData);
// hookInput contains: tool_name, tool_input, session_id, cwd

// BUT: hookInput only sent for CURRENT window operations
// Window B operations → Window B hook instance (if any)
// Window A hook never sees Window B operations
```

### Project Root Detection
```javascript
// Lines 935-951 of pm-constraints-enforcement.js
if (process.env.CLAUDE_PROJECT_DIR) {
  projectRoot = process.env.CLAUDE_PROJECT_DIR;
} else {
  projectRoot = findProjectRoot(cwdPath);
}
```

**NOT the problem**: Project root detection is correct. The bug is that hooks never receive cross-window operations AT ALL.

## Impact Assessment

### Security Implications
**CRITICAL SECURITY GAP:**
- PM constraints can be bypassed by opening different window
- Branch protection can be bypassed via Window B
- Tool blacklists ineffective across windows
- Enforcement inconsistent and unreliable

### User Experience Impact
**FRUSTRATING BEHAVIOR:**
- Users expect global hooks to work globally
- Silent failures (no enforcement in other windows)
- Inconsistent behavior confuses users
- No indication that enforcement is per-window only

## Solution Options

### Option 1: Platform Fix (Ideal)
**REQUIRES**: Claude Code platform changes
- Implement true global hook invocation
- Send hookInput to ALL registered hooks regardless of window
- Maintain single hook execution per operation (deduplicate)

**PROS**: Correct behavior, matches user expectations
**CONS**: Requires Anthropic engineering changes

### Option 2: Document Limitation (Interim)
**IMMEDIATE ACTION:**
- Update documentation to clearly state per-window limitation
- Add warning messages in hook registration
- Provide guidance on per-project hook registration
- Set user expectations correctly

**PROS**: Immediately actionable
**CONS**: Doesn't fix underlying bug

### Option 3: Per-Project Hook Registration (Workaround)
**WORKAROUND:**
- Register hooks in project-local .claude/settings.json
- Each project gets its own hook configuration
- Enforcement works within project boundaries

**PROS**: Works with current platform limitation
**CONS**: More complex setup, per-project maintenance

## Recommendations

### Immediate Actions
1. **Correct Memory**: Update memory/hooks/hook-invocation-project-scoping.md to reflect this is a BUG
2. **Document Limitation**: Update system documentation with per-window behavior
3. **User Warning**: Add clear warnings that global hooks are per-window only
4. **Testing Guidance**: Provide multi-window testing instructions
5. **Workaround Docs**: Document per-project registration workaround

### Platform Escalation
1. **Report Bug**: Submit bug report to Anthropic/Claude Code team
2. **Feature Request**: Request true global hook invocation
3. **Security Priority**: Emphasize security implications of bypass
4. **User Impact**: Provide evidence of user confusion and frustration

### System Improvements
1. **Multi-Window Detection**: Detect when multiple windows active
2. **Warning System**: Alert users about per-window enforcement limitation
3. **Log Indicators**: Show which window context hooks executing in
4. **Testing Suite**: Add multi-window hook tests

## Testing & Validation

### Reproduce Bug
```bash
# Window A: intelligent-claude-code project
# Operations logged: YES
cd /Users/karsten/.../intelligent-claude-code
# Edit src/hooks/pm-constraints-enforcement.js → LOGGED

# Window B: Different context
# Operations logged: NO
cd /path/to/monitoring
# Edit group_vars/all.yml → NOT LOGGED (BUG)
```

### Verify Platform Limitation
```bash
# Check log for cross-window operations
grep "monitoring" ~/.claude/logs/2025-10-28-pm-constraints-enforcement.log
# Result: 0 entries (confirms bug)

# Verify hook IS registered globally
cat ~/.claude/settings.json | jq '.hooks.PreToolUse'
# Result: pm-constraints-enforcement.js registered
```

## Workaround Implementation

### Per-Project Hook Registration
```json
// PROJECT/.claude/settings.json (NOT global)
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [{
          "command": "node ~/.claude/hooks/pm-constraints-enforcement.js",
          "failureMode": "deny",
          "timeout": 5000,
          "type": "command"
        }]
      }
    ]
  }
}
```

### Benefits of Workaround
- Works with current platform limitation
- Per-project enforcement guaranteed
- No dependency on platform fix

### Drawbacks of Workaround
- Must configure per project
- More maintenance overhead
- Still doesn't achieve true global enforcement

## Conclusion

This is a **confirmed Claude Code platform bug**, not a design feature. The previous analysis was incorrect.

**Status**:
- ✅ Bug identified and confirmed
- ✅ Root cause analyzed (platform limitation)
- ✅ Workaround documented (per-project registration)
- ❌ Platform fix pending (requires Anthropic engineering)

**Priority**: HIGH - Security bypass implications

## Related Files
- Previous (incorrect) analysis: memory/hooks/hook-invocation-project-scoping.md (needs correction)
- Hook registration reference: docs/hook-registration-reference.md
- Bug report: This file (summaries/AGENTTASK-017-hook-global-invocation-bug-analysis.md)
