# Bug Analysis: Agent Marker Staleness Causing Hook Bypass

**Bug ID**: Agent Marker Staleness
**Severity**: CRITICAL
**Impact**: All enforcement hooks bypassed in projects with stale agent markers
**Affected**: All projects using ~/.claude/ installation

## Root Cause

Agent marker files created during Task tool execution are NEVER cleaned up after agent completes. This causes hooks to permanently think agents are running, skipping ALL enforcement.

## Evidence

### Stale Marker Files
```bash
# Markers from October 6, 22, 23, 24, 25 still present:
-rw-r--r--@ 1 karsten  staff   42 Oct  6 05:58 agent-executing-4016d3f3-60da-4aed-b9a9-beaa9805800c
-rw-r--r--@ 1 karsten  staff  336 Oct 25 20:18 agent-executing-808b28cc-095b-43ea-947b-8c9dbe2f7a9f-2456baa2
-rw-r--r--@ 1 karsten  staff  355 Oct 25 15:32 agent-executing-cea93682-9524-43c0-8aca-cb10b18b259d-7e8ce70e
```

### Stale Marker Content
```json
{
  "session_id": "cea93682-9524-43c0-8aca-cb10b18b259d",
  "project_root": "/Users/karsten/Nextcloud/Work/Engineering/ansible/deployments/kubernetes/applications",
  "agent_count": 1,
  "agents": [
    {
      "tool_invocation_id": "3821d2ea-b807-4d3a-85d9-534f9ffebb45",
      "created": "2025-10-25T13:32:25.354Z"
    }
  ]
}
```

**Problem**: Agent created at 13:32, still marked as active hours later!

### Hook Log Evidence
```
[2025-10-25T18:20:18.766Z] Agent context detected - 1 active agent(s)
[2025-10-25T18:20:18.766Z] Agent context detected - strict main scope enforcement skipped
```

## Bug Mechanism

### 1. Agent Marker Creation
**File**: `src/hooks/agent-marker.js`
**Event**: PreToolUse for Task tool
**Action**: Creates/increments agent marker file

```javascript
// Lines 64-88
function incrementAgentCount(markerFile, session_id, tool_name, projectRoot) {
  marker.agents.push({
    tool_invocation_id: toolInvocationId,
    created: new Date().toISOString(),
    tool_name: tool_name
  });
  marker.agent_count = marker.agents.length;
  atomicWriteMarker(markerFile, marker);
}
```

### 2. Missing Cleanup
**BUG**: NO cleanup mechanism exists!

Missing:
- ❌ PostToolUse hook to decrement agent_count
- ❌ Agent completion detection
- ❌ Marker file deletion on agent finish
- ❌ TTL/expiry mechanism
- ❌ Staleness validation

### 3. Detection Without Staleness Check
**File**: `src/hooks/lib/marker-detection.js`
**Function**: `isAgentContext()`

```javascript
// Lines 49-85
function isAgentContext(projectRoot, sessionId, log) {
  const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
  const agentCount = marker.agent_count || 0;

  if (agentCount > 0) {  // ← Always true for stale markers!
    return true;
  }
}
```

**Problem**: Only checks `agent_count > 0`, no timestamp validation!

### 4. Enforcement Bypass
**All hooks** check `isAgentContext()`:
- main-scope-enforcement.js (line 157)
- pm-constraints-enforcement.js
- summary-file-enforcement.js
- etc.

**Logic**:
```javascript
if (isAgentContext(projectRoot, hookInput.session_id, log)) {
  log('Agent context detected - enforcement skipped');
  return allowOperation(log);
}
```

**Result**: With stale marker, ALL hooks skip, ALL operations allowed!

## Reproduction Case

### Other Project Behavior
```bash
# Project: /Users/karsten/Nextcloud/Work/Engineering/ansible/deployments/kubernetes/applications

# 1. Days ago - Task tool invoked
# Created: agent-executing-cea93682-9524-43c0-8aca-cb10b18b259d-7e8ce70e
# agent_count: 1

# 2. Agent completed work
# Marker file NEVER cleaned up (BUG)

# 3. Today - direct git operations
git add . && git commit -m "direct commit" && git push
# ✅ WORKS! Should be ❌ BLOCKED by main-scope-enforcement.js

# 4. Create files anywhere
Write kubernetes/applications/monitoring/grafana/PHASE2_COMPLETION_SUMMARY.md
# ✅ WORKS! Should be ❌ BLOCKED by summary-file-enforcement.js

# Why? Hooks check isAgentContext():
# - Finds marker file with agent_count=1
# - Returns true (thinks agent is running)
# - Skips ALL enforcement
```

### This Project Behavior
```bash
# Project: intelligent-claude-code

# CURRENT conversation creates fresh agent marker
# agent_count incremented to 1
# ALL hooks skip enforcement

# BUT also has enforcement FROM agent execution
# Agent hooks ARE enforcing
# So appears to work (confusion!)
```

## Impact Analysis

### Severity: CRITICAL
- **Scope**: All projects using ~/.claude/ installation
- **Effect**: Complete bypass of ALL enforcement hooks
- **Duration**: Permanent until marker manually deleted
- **Detection**: Silent - no errors, just enforcement disabled

### Affected Operations
With stale marker, ALL of these work (should be blocked):
- ✅ git commit directly (bypasses main-scope-enforcement)
- ✅ Write to ANY path (bypasses pm-constraints-enforcement)
- ✅ Create ALL-CAPITALS summary files (bypasses summary-file-enforcement)
- ✅ Edit src/ files without AgentTask (bypasses strict mode)
- ✅ Any blocked bash command (bypasses main-scope-enforcement)

## Fix Strategy

### Three-Part Solution

#### 1. Add PostToolUse Cleanup Hook
**NEW FILE**: `src/hooks/agent-marker-cleanup.js`
**Event**: PostToolUse for Task tool
**Action**: Decrement agent_count, delete marker when count=0

```javascript
function decrementAgentCount(markerFile, tool_invocation_id) {
  const marker = atomicReadMarker(markerFile);
  if (!marker) return;

  // Remove agent with matching tool_invocation_id
  marker.agents = marker.agents.filter(a => a.tool_invocation_id !== tool_invocation_id);
  marker.agent_count = marker.agents.length;

  if (marker.agent_count === 0) {
    // No more agents - delete marker
    fs.unlinkSync(markerFile);
  } else {
    // Still have agents - update marker
    atomicWriteMarker(markerFile, marker);
  }
}
```

#### 2. Add Staleness Validation
**UPDATE**: `src/hooks/lib/marker-detection.js`
**Function**: `isAgentContext()`
**Action**: Validate timestamp, auto-cleanup stale markers

```javascript
function isAgentContext(projectRoot, sessionId, log) {
  const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));

  // Check each agent for staleness (30 minute TTL)
  const now = Date.now();
  const TTL = 30 * 60 * 1000; // 30 minutes

  const activeAgents = marker.agents.filter(agent => {
    const created = new Date(agent.created).getTime();
    const age = now - created;
    return age < TTL;
  });

  if (activeAgents.length === 0) {
    // All agents stale - cleanup marker
    fs.unlinkSync(markerFile);
    return false;
  }

  // Update marker with active agents only
  marker.agents = activeAgents;
  marker.agent_count = activeAgents.length;
  atomicWriteMarker(markerFile, marker);

  return marker.agent_count > 0;
}
```

#### 3. Add Periodic Cleanup
**NEW FILE**: `src/hooks/lib/marker-cleanup.js`
**Purpose**: Shared cleanup utility
**Action**: Remove markers older than TTL

```javascript
function cleanupStaleMarkers(log) {
  const markerDir = getMarkerDir();
  const TTL = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();

  const files = fs.readdirSync(markerDir);

  for (const file of files) {
    if (!file.startsWith('agent-executing-')) continue;

    const markerFile = path.join(markerDir, file);
    const marker = atomicReadMarker(markerFile);

    if (!marker) continue;

    // Filter out stale agents
    const activeAgents = marker.agents.filter(agent => {
      const created = new Date(agent.created).getTime();
      return (now - created) < TTL;
    });

    if (activeAgents.length === 0) {
      // All stale - delete marker
      fs.unlinkSync(markerFile);
      if (log) log(`Cleaned up stale marker: ${file}`);
    } else if (activeAgents.length < marker.agents.length) {
      // Some stale - update marker
      marker.agents = activeAgents;
      marker.agent_count = activeAgents.length;
      atomicWriteMarker(markerFile, marker);
      if (log) log(`Updated marker with ${activeAgents.length} active agents: ${file}`);
    }
  }
}
```

## Implementation Priority

### Phase 1 (Immediate - Critical Fix)
1. ✅ Document bug analysis (this file)
2. Add staleness check to isAgentContext() with auto-cleanup
3. Test with stale markers from other project
4. Verify enforcement now works

### Phase 2 (Complete Solution)
1. Create agent-marker-cleanup.js PostToolUse hook
2. Create marker-cleanup.js shared utility
3. Add periodic cleanup call in all hooks
4. Update tests to verify cleanup

### Phase 3 (Validation)
1. Manual cleanup of existing stale markers
2. Test enforcement in other project
3. Monitor logs for proper cleanup
4. Update documentation

## Temporary Workaround

**IMMEDIATE FIX** - Manually delete stale markers:
```bash
rm ~/.claude/tmp/agent-executing-*
```

**VERIFICATION**:
```bash
# After cleanup, enforcement should work:
cd /path/to/other/project
git commit -m "test"
# Should be ❌ BLOCKED now
```

## Testing Plan

### Test 1: Staleness Detection
```bash
# 1. Create fake stale marker
echo '{"agent_count":1,"agents":[{"created":"2025-10-01T00:00:00.000Z"}]}' > ~/.claude/tmp/agent-executing-test-oldproject

# 2. Trigger hook in project
# Expected: Hook detects staleness, deletes marker, enforces rules
```

### Test 2: Active Agent Protection
```bash
# 1. Invoke Task tool (creates fresh marker)
# 2. Immediately try blocked operation
# Expected: Hook sees active agent, skips enforcement (correct!)
```

### Test 3: Cleanup Verification
```bash
# 1. Create multiple markers with mixed ages
# 2. Run cleanup utility
# Expected: Stale markers deleted, fresh markers preserved
```

## Affected Files

### Files to Create
- `src/hooks/agent-marker-cleanup.js` - PostToolUse cleanup hook
- `src/hooks/lib/marker-cleanup.js` - Shared cleanup utility

### Files to Update
- `src/hooks/lib/marker-detection.js` - Add staleness validation
- `src/hooks/agent-marker.js` - Add TTL to marker creation
- `Makefile` - Add new hooks to installation

### Files to Test
- All enforcement hooks (verify staleness check integration)
- All projects with stale markers (verify cleanup)

## Lessons Learned

### Process Issues
1. **Missing Lifecycle Management**: Created markers but no cleanup
2. **No Expiry Mechanism**: Markers assumed to be valid forever
3. **Silent Failures**: No warnings when using stale markers
4. **Testing Gap**: No tests for long-running marker scenarios

### Prevention
1. **Lifecycle Rule**: All stateful files need creation AND cleanup
2. **TTL Pattern**: All cache/state files need expiry mechanism
3. **Staleness Check**: Always validate timestamps on state reads
4. **Cleanup Utilities**: Shared utilities for state maintenance
5. **Integration Tests**: Test scenarios spanning time periods

## Version Impact

**Current Version**: 8.20.16
**Fix Version**: 8.20.17 (patch - bug fix)
**Breaking Change**: No
**Migration Required**: No (auto-cleanup handles existing stale markers)

## Conclusion

This bug completely bypassed ALL enforcement hooks by leaving stale agent marker files. The fix adds:
1. Staleness validation (immediate critical fix)
2. PostToolUse cleanup (proper lifecycle management)
3. Periodic cleanup (state maintenance)

**Priority**: CRITICAL - Deploy staleness check immediately, complete cleanup in next release.
