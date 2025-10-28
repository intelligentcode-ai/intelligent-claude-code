# Hook Invocation Debugging: Missing Logs Investigation

**Date**: 2025-10-28
**Context**: Multi-project hook debugging
**Outcome**: Critical logging design flaw fixed

## Problem

User reported Edit operations on monitoring project files that should have been blocked by PM constraints hook, but were allowed. Investigation revealed **ZERO log entries** for monitoring project operations despite global hook registration.

## Root Cause

**CRITICAL LOGGING DESIGN FLAW**: Log files named only by date and hook name:
```
2025-10-28-pm-constraints-enforcement.log
```

**Missing**: Project context in filename made it **impossible to quickly identify** that monitoring operations had NO log entries at all (hooks were never invoked).

## Investigation Process

1. **Checked hook logs** - Found 1835 lines but all from THIS project context
2. **Searched for monitoring paths** - ZERO entries before testing started
3. **Verified global registration** - Hooks ARE registered in ~/.claude/settings.json
4. **Tested hook directly** - Hook works when invoked manually
5. **Critical realization** - ALL monitoring cwd entries were from MY testing, none from user's actual operations

## Solution Implemented

**Normalized path in log filenames** (v8.20.39):

```javascript
// Path normalization
function normalizePath(pathStr) {
  return pathStr
    .replace(os.homedir(), '~')
    .replace(/\//g, '-')
    .replace(/^-/, '');
}

// Updated log filename format
const normalizedPath = normalizePath(hookInput.cwd);
const logFile = path.join(logDir, `${date}-${normalizedPath}-${hookName}.log`);
```

**Result**:
```
2025-10-28-~-Work-Engineering-ansible-deployments-kubernetes-applications-pm-constraints-enforcement.log
2025-10-28-~-Nextcloud-Altlandsberg-Work-Development-intelligentcode-ai-intelligent-claude-code-pm-constraints-enforcement.log
```

## Key Insights

### Missing Logs Now Obvious
With project-specific filenames, **missing monitoring logs are immediately visible** - the absence of a monitoring log file means hooks were never invoked for that project.

### Multi-Project Debugging
- Each project creates distinct log files
- Quick `ls` shows which projects have hook activity
- No need to grep massive combined logs

### Backwards Compatibility
- `hookInput` parameter optional in createLogger()
- Old hooks without hookInput still work
- Gradual migration as hooks are updated

## Debugging Pattern

**When hooks appear to fail**:
1. `ls ~/.claude/logs/ | grep $(date +%Y-%m-%d)` - List today's logs
2. Look for project-specific log files
3. **Missing project log file = hooks never invoked**
4. **Present but no relevant entries = hooks invoked but allowed operation**
5. Check hook registration in ~/.claude/settings.json
6. Verify hook script exists and has correct permissions

## Application to Future Issues

**Symptoms of missing hook invocation**:
- Operations allowed that should be blocked
- User confusion about inconsistent behavior
- Zero log entries for specific project
- **Now detectable**: Missing project-specific log file

## Related Files

- summaries/BUG-ANALYSIS-hooks-not-invoked-monitoring-window.md - Original bug analysis
- summaries/BUG-ANALYSIS-hook-monitoring-directory-enforcement.md - Directory enforcement bug
- test-hook-monitoring.json - Test input for direct hook testing

---

**Lesson**: Logging design must support multi-project debugging from day one. File-level organization reveals issues that grep searches miss.
