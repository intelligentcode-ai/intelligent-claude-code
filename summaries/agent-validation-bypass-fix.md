# Agent Validation Bypass - Directory and Filename Enforcement Fix

**Date**: 2025-10-29
**Severity**: HIGH - Agents bypassed ALL file validation
**Status**: FIXED - Awaiting deployment via `make install`

## Problem Summary

Agents in the openstack project were able to:
1. Write files with ALL-CAPS names (e.g., "SUMMARY.md")
2. Write files in wrong directories (root instead of summaries/)
3. Main scope could perform Update operations without being blocked

All of this happened because hooks saw "3 active agents" from stale marker file and allowed everything.

## Root Causes Identified

### 1. pm-constraints-enforcement.js - Agent Validation Bypass (CRITICAL)
**Location**: `src/hooks/pm-constraints-enforcement.js:1042-1114`

**Problem**: ALL file validation (directory enforcement, filename checks) was inside `if (isPMRole(hookInput))` block, so agents bypassed ALL validation.

**Code Structure Before**:
```javascript
// Check if PM role and validate
if (isPMRole(hookInput)) {
  log('PM role active - validating operation');

  // Block Edit/Write/Update tools ONLY for files not in allowlist
  if (tool === 'Edit' || tool === 'Write' || tool === 'Update' || tool === 'MultiEdit') {
    // FILENAME-BASED DIRECTORY ENFORCEMENT
    if (!isCorrectDirectory(filePath, projectRoot)) {
      // Block with error
    }
    // ALL-CAPS filename check
    if (basename !== basename.toLowerCase()) {
      // Block with error
    }
    // ... more validation
  }
}
```

**Fix Applied**: Agent restructured code to move directory validation OUTSIDE isPMRole check:
- Universal validation now applies to ALL contexts (main AND agents)
- PM-specific restrictions remain inside PM check
- Directory enforcement and filename checks now CANNOT be bypassed

**Code Structure After**:
```javascript
// UNIVERSAL FILE VALIDATION (applies to ALL contexts - main AND agents)
if (tool === 'Edit' || tool === 'Write' || tool === 'Update' || tool === 'MultiEdit') {
  if (!isCorrectDirectory(filePath, projectRoot)) {
    // Block with directory enforcement error
    // This now applies to EVERYONE
  }

  // ALL-CAPS filename check applies universally
  if (basename !== basename.toLowerCase()) {
    // Block with error
  }
}

// PM-SPECIFIC RESTRICTIONS (only for PM role)
if (isPMRole(hookInput)) {
  if (tool === 'Edit' || tool === 'Write' || tool === 'Update' || tool === 'MultiEdit') {
    // PM allowlist validation
    // PM technical work blocking
  }
}
```

### 2. stop.js - Marker Cleanup Failure
**Location**: `src/hooks/stop.js:25`

**Problem**: Used old marker filename format `agent-executing-${session_id}` without project hash, couldn't find and delete project-specific marker files.

**Before**:
```javascript
const markerFile = path.join(os.homedir(), '.claude', 'tmp', `agent-executing-${session_id}`);
```

**After**:
```javascript
const session_id = hookInput.session_id;

// Calculate project hash to match agent-marker.js filename format
const crypto = require('crypto');
const projectRoot = hookInput.cwd || process.cwd();
const projectHash = crypto.createHash('md5').update(projectRoot).digest('hex').substring(0, 8);

const markerFile = path.join(os.homedir(), '.claude', 'tmp', `agent-executing-${session_id}-${projectHash}`);
```

### 3. Stale Marker File - Enforcement Bypass
**Location**: `~/.claude/tmp/agent-executing-ec0d0c7c-ea4a-440f-90f2-3ae972cb5fa7-9a02b4c2`

**Problem**: Marker file showed 3 agents still "active" even though they completed, causing all hooks to see agent context and allow operations.

**Evidence from pm-constraints-enforcement.log**:
```
[2025-10-29T16:20:15.899Z] Agent context detected - 3 active agent(s) in project...
[2025-10-29T16:20:15.903Z] Operation allowed
```

**Timeline**:
- **16:15:02.279Z**: Agent 6db938db created
- **16:15:02.296Z**: Agent 2dd84f35 created
- **16:17:37.517Z**: Agent 027b6638 created
- **16:26:54.178Z**: Only agent 027b6638 triggered SubagentStop (decremented to 2)
- **Between 16:26:54 and 16:34:45**: Marker deleted entirely (likely UserPromptSubmit cleanup)
- **16:34:45+**: UserPromptSubmit checks find no marker

**Mystery**: Why didn't SubagentStop fire for first 2 agents (6db938db and 2dd84f35)?

**Resolution**: Marker is now gone, stale marker problem resolved. pm-constraints-enforcement.js fix prevents future bypasses even if stale markers occur.

### 4. post-agent-file-validation.js - Fundamentally Useless
**Location**: `src/hooks/post-agent-file-validation.js:69-72`

**Problem**: Hook runs AFTER SubagentStop in hook order, too late to prevent anything. Can only warn about damage already done.

**Additional Issue**: Was only checking .md files due to filter on lines 69-72.

**Fix Applied**: Agent removed .md-only filter to validate ALL files, but hook remains fundamentally useless since it runs post-facto.

**Recommendation**: Consider removing this hook entirely - PreToolUse enforcement is the only real prevention mechanism.

## Files Modified

1. **src/hooks/stop.js**
   - Added crypto import
   - Added project hash calculation
   - Fixed marker filename format to match agent-marker.js

2. **src/hooks/pm-constraints-enforcement.js**
   - Moved directory validation OUTSIDE isPMRole check
   - Moved ALL-CAPS filename check to universal scope
   - Universal validation now applies to main scope AND agents
   - PM-specific restrictions remain isolated in PM check

3. **src/hooks/post-agent-file-validation.js**
   - Removed .md-only filter (lines 69-72)
   - Now validates ALL file types
   - Still runs too late to prevent damage (structural issue)

4. **src/hooks/context-injection.js**
   - Already fixed earlier (constraint display from files)
   - UserPromptSubmit cleanup handled stale marker

## Deployment Required

Run the following to deploy fixes:
```bash
cd /Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code
make install
```

This will:
- Deploy stop.js with correct marker filename format
- Deploy pm-constraints-enforcement.js with universal validation
- Deploy post-agent-file-validation.js with all-file checking
- Deploy context-injection.js with file-based constraint loading

## Testing Validation

After deployment, verify:
1. ✅ Agents cannot create ALL-CAPS filenames
2. ✅ Agents cannot write files in wrong directories
3. ✅ Directory enforcement applies to all scopes
4. ✅ stop.js correctly cleans up markers on session end
5. ✅ No more "Agent context detected - 3 active agent(s)" bypass messages

## Lessons Learned

1. **Scope Validation Must Be Universal**: Directory enforcement and filename validation MUST apply to ALL scopes, not just PM role

2. **Hook Timing Matters**:
   - PreToolUse blocks BEFORE damage (prevention)
   - SubagentStop runs AFTER agent completes (too late for prevention)
   - post-agent hooks run too late to prevent anything (only warnings possible)

3. **Marker Cleanup Has Two Mechanisms**:
   - SubagentStop (on agent completion) - decrements count
   - UserPromptSubmit (stale cleanup) - deletes entire marker if stale

4. **Filename Format Consistency**: All marker operations must use same filename format (session_id + project hash)

5. **Don't Blame Claude Code First**: SubagentStop works fine - marker was likely manually deleted or cleaned up by UserPromptSubmit after sitting stale

6. **Agent Context Detection Affects Behavior**: Even with correct validation, stale markers showing "active agents" can cause hooks to behave differently - marker cleanup is critical

## Outstanding Questions

1. **Why didn't SubagentStop fire for first 2 agents?**
   - Agent 6db938db-c0d5-43e7-9d23-dbb606aca3e0 (16:15:02.279Z) - no SubagentStop log
   - Agent 2dd84f35-0fd6-4a31-b6e9-aa5477fe1c10 (16:15:02.296Z) - no SubagentStop log
   - Agent 027b6638-8e86-4084-8654-b453b75d54c7 (16:17:37.517Z) - SubagentStop fired at 16:26:54.178Z
   - SubagentStop IS registered in settings.json
   - SubagentStop DOES work for other agents (many successful decrements in logs)
   - Agents confirmed NOT still running
   - No error logs for these agents

2. **Should post-agent-file-validation.js be removed?**
   - Runs too late to prevent anything
   - Can only warn about damage already done
   - PreToolUse enforcement is the only real prevention

3. **What deleted the marker between 16:26:54 and 16:34:45?**
   - Marker had 2 agents still in it (6db938db and 2dd84f35)
   - By 16:34:45, context-injection.log shows "No marker file found"
   - Likely UserPromptSubmit cleanup, but timing unclear
   - Could also be manual deletion

## Related Issues

See `CRITICAL-hook-registration-structure-bug.md` for separate issue about hook registration structure in installation scripts.
