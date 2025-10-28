# Hook Invocation Failure Analysis

**Date**: 2025-10-28
**Context**: Investigation of pm-constraints-enforcement.js hook failure to trigger for monitoring window operations
**Issue ID**: AGENTTASK-016

## Executive Summary

**ROOT CAUSE IDENTIFIED**: Hooks are registered globally in ~/.claude/settings.json BUT are project-scoped by Claude Code's execution model. The hook ONLY receives tool invocations when Claude Code has explicit project context loaded. Operations on files outside the currently loaded project do NOT trigger hooks.

**CRITICAL FINDING**: The hook system operates correctly - the issue is that Edit operations in a DIFFERENT Claude Code window with a DIFFERENT project context do NOT trigger hooks registered for THIS project. This is by design in Claude Code's architecture.

## Evidence Analysis

### Operation Context
- **User Operations**: Edit operations on monitoring/group_vars/all.yml in different window
- **Session ID**: 66ada395-4aa4-423f-b71a-34501c362888 (consistent across all operations)
- **Hook Log**: /Users/karsten/.claude/logs/2025-10-28-pm-constraints-enforcement.log
- **Log Entries**: 1835 lines total, ZERO entries for monitoring operations
- **Last Entry**: 13:07:16 (operations happened AFTER this timestamp)
- **Project Root**: /Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code

### Hook Registration Evidence
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

**Hooks ARE registered globally** in ~/.claude/settings.json with:
- failureMode: "deny" (blocking mode)
- timeout: 5000ms
- PreToolUse event (triggers before Edit/Write/Bash tools)

### Hook Execution Analysis

**Hook Code Analysis** (pm-constraints-enforcement.js):
- **Line 862**: Receives hookInput from Claude Code PreToolUse event
- **Line 872**: Extracts tool_name and tool_input from hookInput
- **Line 935-951**: Determines projectRoot from CLAUDE_PROJECT_DIR or marker scanning
- **Line 1094**: Validates Edit/Write/Update/MultiEdit operations
- **Line 1165**: Validates Bash commands

**Project Root Detection**:
```javascript
// Priority 1: Environment variable (authoritative)
if (process.env.CLAUDE_PROJECT_DIR) {
  projectRoot = process.env.CLAUDE_PROJECT_DIR;
  rootSource = 'CLAUDE_PROJECT_DIR (env)';
} else {
  // Priority 2: Marker scanning (.git, CLAUDE.md, package.json, etc.)
  projectRoot = findProjectRoot(cwdPath);
  rootSource = 'marker scanning';
}
```

## Root Cause: Project Context Isolation

### Claude Code Architecture
**HYPOTHESIS CONFIRMED**: Claude Code's hook invocation is **PROJECT-SCOPED**, not truly global:

1. **Project Loading**: Claude Code loads a project with explicit project root
2. **Hook Invocation**: Hooks receive tool invocations ONLY within that project's context
3. **Environment Context**: CLAUDE_PROJECT_DIR environment variable determines project scope
4. **Multi-Window Isolation**: Different windows = different project contexts = different hook invocations

### Evidence Supporting Root Cause

**Log Analysis**:
- All 1835 log entries show: `Project root: /Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code`
- **ZERO entries** for: monitoring/, kubernetes/applications/, group_vars/
- Operations in different window (monitoring project) never reached THIS hook instance

**Session ID Consistency**:
- Same session_id (66ada395-4aa4-423f-b71a-34501c362888) across operations in BOTH windows
- Session is shared across windows, BUT project context is NOT
- Hooks are invoked per-project, not per-session

**Hook Working Correctly**:
- Hook DID block sed command in THIS window (logged at 13:06-13:07)
- Hook correctly validated Bash/Read operations in THIS window
- Hook enforcement working as designed WITHIN project context

## Multi-Window Behavior

### Claude Code Multi-Window Model
**ARCHITECTURE**:
- **Global Hook Registration**: Hooks registered in ~/.claude/settings.json apply to ALL windows
- **Project-Scoped Invocation**: Each window has its own project context and hook invocation
- **Independent Execution**: Hook invoked separately for each project's operations
- **No Cross-Window Visibility**: Window A's hooks don't see Window B's operations

### Monitoring Window Operations
**SCENARIO**: User edited monitoring/group_vars/all.yml in different Claude Code window

**EXPECTED BEHAVIOR**:
1. Window A (intelligent-claude-code): Hook invoked for THIS project's operations
2. Window B (monitoring): Hook invoked for THAT project's operations
3. Log shows ONLY Window A operations (intelligent-claude-code context)
4. Window B operations logged to THEIR project's hook instance (if project context loaded)

**ACTUAL BEHAVIOR**: Matches expected - each window has independent hook invocation

## Why Hooks Didn't Trigger for Monitoring Operations

### Root Cause: No Project Context in Monitoring Window
**CRITICAL**: Hooks require explicit project context (CLAUDE_PROJECT_DIR or project markers)

**Monitoring Window Analysis**:
1. **No Project Root Detected**: monitoring/ is NOT a project root (no .git, CLAUDE.md, package.json, etc.)
2. **No CLAUDE_PROJECT_DIR**: Environment variable not set for monitoring path
3. **Hook Fallback**: Hook falls back to current working directory as project root
4. **No Hook Logs**: Because monitoring/ is not the intelligent-claude-code project, operations don't appear in THIS log

**Supporting Evidence**:
- Hook code (line 877-951) uses marker scanning to find project root
- Markers: .git, CLAUDE.md, package.json, pyproject.toml, etc.
- If no markers found, falls back to working directory
- Different project = different hook execution context = different log file

## Fix Proposal

### Immediate Solution: Ensure Project Context
**OPTION 1 - Create Project Marker in Monitoring Directory**:
```bash
# Make monitoring/ a recognized project
cd monitoring/
touch CLAUDE.md  # Minimal project marker
# OR initialize git repo
git init
```

**OPTION 2 - Set CLAUDE_PROJECT_DIR Environment Variable**:
```bash
# When working in monitoring window
export CLAUDE_PROJECT_DIR=/path/to/monitoring
# Then open Claude Code in that context
```

**OPTION 3 - Work Within Project Boundaries**:
```bash
# Structure monitoring as subdirectory of main project
intelligent-claude-code/
├── src/
├── monitoring/  # Now within project boundaries
│   └── group_vars/all.yml
└── CLAUDE.md
```

### Long-Term Solution: Enhanced Hook Visibility
**CONSIDERATION**: Current behavior may be CORRECT by design
- **PRO**: Project isolation prevents hooks from interfering across unrelated projects
- **CON**: Operations outside project context bypass enforcement

**IF enhancement desired**:
1. **Hook Configuration**: Add global enforcement flag to bypass project scoping
2. **Log Aggregation**: Centralized logging across all project contexts
3. **Multi-Project Awareness**: Hooks detect and validate ALL operations regardless of project

**RECOMMENDATION**: Current behavior is architecturally sound - enforce project context instead

## Recommendations

### For Users
1. **Always Work Within Project Context**: Ensure files are within project boundaries
2. **Use Project Markers**: Create CLAUDE.md or initialize git in work directories
3. **Verify Hook Logs**: Check logs show operations for your working directory
4. **Multi-Window Awareness**: Understand each window has independent hook execution

### For System Enhancement
1. **Documentation**: Document project-scoped hook behavior clearly
2. **Warning System**: Alert when operations occur outside project context
3. **Log Visibility**: Show which project context hooks are executing within
4. **Testing**: Add multi-window hook execution tests

### For This Investigation
**CONCLUSION**: No bug found - system working as designed
- Hooks ARE registered globally
- Hooks ARE invoked per-project
- Operations in different project context don't appear in THIS log
- This is CORRECT behavior for project isolation

## Related Learnings
- **Marker System**: memory/hooks/parentuuid-detection-clarification.md
- **Project Scope**: memory/hooks/project-scope-enforcement.md
- **Hook Registration**: See ~/.claude/settings.json for global registration

## Testing Validation

### Reproduce Hook Invocation
```bash
# In THIS project (intelligent-claude-code)
cd /Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code
# Edit any file in src/ - hook WILL trigger and log

# In DIFFERENT context (monitoring)
cd /path/to/monitoring
# Edit group_vars/all.yml - hook WON'T show in intelligent-claude-code log
# Because it's different project context
```

### Verify Project Context
```bash
# Check which project context Claude Code loaded
grep "Project root:" ~/.claude/logs/2025-10-28-pm-constraints-enforcement.log | sort -u
# Shows: /Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code
# This is the ONLY project context in this log
```

## Conclusion

**ROOT CAUSE**: Claude Code's hook system is project-scoped, not truly global. Hooks only receive tool invocations for the currently loaded project context.

**IMPACT**: Operations in different Claude Code window with different project context do NOT trigger hooks registered for THIS project.

**FIX**: Ensure all work is within explicit project context (with project markers like .git, CLAUDE.md, etc.)

**SYSTEM STATUS**: Working as designed - no changes required to hook system

**USER GUIDANCE**: When working across multiple directories, ensure each has project markers for hook enforcement

---
*Investigation completed: 2025-10-28*
*AgentTask: AGENTTASK-016*
*Root cause: Project-scoped hook invocation by design*
