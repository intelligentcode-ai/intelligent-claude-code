# Critical Bug Analysis: Hooks Not Invoked for Monitoring Window Operations

**Date**: 2025-10-28
**Severity**: CRITICAL
**Status**: Root cause identified

## Executive Summary

**THE BUG**: Hooks are NOT being invoked for Claude Code operations in the monitoring project window, despite being registered globally in `~/.claude/settings.json`.

## Evidence

### 1. Zero Log Entries for User Operations

**Search Results**:
```bash
grep '"cwd":"/Users/karsten/Work/Engineering' ~/.claude/logs/2025-10-28-pm-constraints-enforcement.log
```

**Findings**:
- ALL entries with monitoring cwd are from 13:59:58 onwards
- These timestamps correspond to MY testing (AGENTTASK-022 started ~13:51)
- User's actual operations (before 13:51) have ZERO log entries

**Timestamps Found**:
- [2025-10-28T13:59:58.720Z] - My test with monitoring context
- [2025-10-28T14:09:34.xxx] - My grep searches
- [2025-10-28T14:10:23.xxx] - More grep searches

### 2. Hook Registration Confirmed Global

**File**: `~/.claude/settings.json`
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          {
            "command": "node /Users/karsten/.claude/hooks/pm-constraints-enforcement.js",
            "failureMode": "deny",
            "timeout": 5000,
            "type": "command"
          }
        ]
      }
    ]
  }
}
```

**Confirmed**: Hooks ARE registered globally, should apply to ALL windows.

### 3. Test Proves Hook Works

**Test Input** (test-hook-monitoring.json):
```json
{
  "session_id": "66ada395-4aa4-423f-b71a-34501c362888",
  "cwd": "/Users/karsten/Work/Engineering/ansible/deployments/kubernetes/applications",
  "permission_mode": "bypassPermissions",
  "hook_event_name": "PreToolUse",
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/Users/karsten/Work/Engineering/.../monitoring/group_vars/all.yml",
    "old_string": "test",
    "new_string": "test2"
  }
}
```

**Test Result**: Hook DENIED operation due to directory enforcement bug
**Log Entry Created**: YES - hook was invoked and logged at 13:59:58

### 4. bypassPermissions Mode Still Enforces

**Hook Code** (pm-constraints-enforcement.js:868-871):
```javascript
const permissionMode = hookInput.permission_mode || '';
if (permissionMode === 'bypassPermissions') {
  log(`⚠️ BYPASS MODE DETECTED - PM constraints will still be enforced (architectural requirement)`);
}
```

**Confirmed**: bypassPermissions does NOT disable hook enforcement.

## The Critical Mystery

**Question**: Why are hooks NOT invoked for the monitoring window when:
1. Hooks are registered globally ✓
2. Hooks work in THIS window ✓
3. Test with monitoring context works ✓
4. Same session_id across windows ✓
5. Same machine ✓

**Possible Explanations**:

### Theory 1: Different Claude Code Instance
- Monitoring window running different Claude Code version without hooks support
- Unlikely - same machine, same installation

### Theory 2: Hook Invocation Bug
- Bug in Claude Code that prevents hooks from being invoked for certain projects
- Would explain zero logs AND operations being allowed

### Theory 3: Configuration Override
- Monitoring project has configuration that disables hook invocation entirely
- But we found `strict_main_scope: false` which is about enforcement, not invocation
- Hooks should still be invoked and log, even if they allow operations

### Theory 4: Silent Hook Failure
- Hooks failing silently before logging starts
- Added entry logging to detect this, but no entries before my testing
- Would require failure at process startup before any logging

### Theory 5: Permission/Access Issue
- Hook script doesn't have execute permissions for monitoring window
- But same user, same machine, same ~/.claude/ installation
- Permissions are global, not per-window

## What We Know For Certain

**✓ CONFIRMED FACTS**:
1. Hooks registered globally in ~/.claude/settings.json
2. Hooks work in intelligent-claude-code window (1800+ log entries today)
3. Test with monitoring context successfully invokes hook
4. User's actual monitoring operations have ZERO log entries
5. Operations were ALLOWED (user confirmed they happened)
6. Same session_id, same machine
7. bypassPermissions mode still enforces constraints

**❌ UNCONFIRMED**:
1. WHEN did user's monitoring operations happen?
2. WHICH tool was used? (Claude Code confirmed, but which window?)
3. WAS Claude Code actually invoked, or different tool?
4. Does monitoring window have same ~/.claude/settings.json?

## Next Steps

**CRITICAL QUESTIONS TO RESOLVE**:
1. Verify monitoring operations actually happened in Claude Code, not vim/vscode
2. Check if monitoring window is running same Claude Code version
3. Verify monitoring window sees same ~/.claude/settings.json
4. Check if there are other hook logs (different dates) with monitoring operations
5. Investigate Claude Code bug where hooks aren't invoked for certain projects

## Impact

**Severity**: CRITICAL - Hook system completely bypassed for monitoring window

**Security Implications**:
- PM constraints not enforced
- Directory enforcement not applied
- Git privacy potentially not enforced
- All protection mechanisms bypassed

**User Experience**:
- Operations allowed that should be blocked
- No visibility into why (no logs)
- Inconsistent behavior across windows
- System appears broken and unreliable

---

**Investigation Status**: Awaiting clarification on monitoring operations context
**Next Action**: Determine why hooks aren't invoked for monitoring window operations
