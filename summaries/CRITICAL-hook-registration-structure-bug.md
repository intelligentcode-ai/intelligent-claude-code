# CRITICAL: Hook Registration Structure Bug in Installation Scripts

**Date**: 2025-10-28
**Severity**: CRITICAL
**Root Cause**: Installation scripts generate INCORRECT hook structure per Claude Code specification

## The Bug

**BOTH Ansible and PowerShell installation scripts generate WRONG hook registration structure** in `~/.claude/settings.json`.

### Current (WRONG) Structure

```json
{
  "hooks": {
    "PreToolUse": [
      { "hooks": [{ "command": "hook1.js" }] },  // ❌ Each hook in separate object
      { "hooks": [{ "command": "hook2.js" }] },  // ❌ Claude Code ignores these
      { "hooks": [{ "command": "hook3.js" }] }   // ❌ Only first object used
    ]
  }
}
```

**RESULT**: Only the FIRST hook in each event array is registered! All others are IGNORED.

### Correct Structure (Per Claude Code Docs)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [  // ✅ ALL hooks in ONE array
          { "command": "hook1.js" },
          { "command": "hook2.js" },
          { "command": "hook3.js" }
        ]
      }
    ]
  }
}
```

**Reference**: https://docs.claude.com/en/docs/claude-code/hooks

## Impact - Why Operations Were Allowed

**ONLY THESE HOOKS ARE ACTUALLY ACTIVE**:
- PreToolUse: `git-enforcement.js` (first in list) ✅
- UserPromptSubmit: `user-prompt-submit.js` (first in list) ✅
- SubagentStop: `subagent-stop.js` (first in list) ✅
- Stop: `stop.js` (first in list) ✅

**ALL THESE HOOKS ARE IGNORED AND NEVER INVOKED**:
- ❌ main-scope-enforcement.js
- ❌ **pm-constraints-enforcement.js** ← THIS IS WHY EDITS WERE ALLOWED!
- ❌ agent-infrastructure-protection.js
- ❌ agent-marker.js
- ❌ config-protection.js
- ❌ pre-agenttask-validation.js
- ❌ project-scope-enforcement.js
- ❌ summary-file-enforcement.js
- ❌ context-injection.js
- ❌ task-tool-execution-reminder.js
- ❌ post-agent-file-validation.js

**Total**: 11 out of 15 hooks are NOT WORKING!

## Files Requiring Fixes

### 1. Ansible: ansible/roles/intelligent-claude-code/tasks/main.yml

**Lines 241-262**: Hook configuration

**WRONG**:
```yaml
production_hooks:
  PreToolUse:
    - hooks: [{ command: 'git-enforcement.js', ... }]      # Separate object
    - hooks: [{ command: 'main-scope-enforcement.js', ... }]  # Separate object
    - hooks: [{ command: 'pm-constraints-enforcement.js', ... }]  # Separate object
```

**CORRECT**:
```yaml
production_hooks:
  PreToolUse:
    - hooks:  # ONE object with array of ALL hooks
        - { command: 'git-enforcement.js', ... }
        - { command: 'main-scope-enforcement.js', ... }
        - { command: 'pm-constraints-enforcement.js', ... }
        - { command: 'agent-infrastructure-protection.js', ... }
        - { command: 'agent-marker.js', ... }
        - { command: 'config-protection.js', ... }
        - { command: 'pre-agenttask-validation.js', ... }
        - { command: 'project-scope-enforcement.js', ... }
        - { command: 'summary-file-enforcement.js', ... }
```

### 2. PowerShell: install.ps1

**Lines 178-202**: ProductionHooks definition

**WRONG**:
```powershell
PreToolUse = @(
    [PSCustomObject]@{ hooks = @([PSCustomObject]@{ command = "git-enforcement.js" }) }
    [PSCustomObject]@{ hooks = @([PSCustomObject]@{ command = "main-scope-enforcement.js" }) }
    [PSCustomObject]@{ hooks = @([PSCustomObject]@{ command = "pm-constraints-enforcement.js" }) }
)
```

**CORRECT**:
```powershell
PreToolUse = @(
    [PSCustomObject]@{
        hooks = @(  # ONE object with array of ALL hooks
            [PSCustomObject]@{ type = "command"; command = "...git-enforcement.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...main-scope-enforcement.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...pm-constraints-enforcement.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...agent-infrastructure-protection.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...agent-marker.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...config-protection.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...pre-agenttask-validation.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...project-scope-enforcement.js"; ... }
            [PSCustomObject]@{ type = "command"; command = "...summary-file-enforcement.js"; ... }
        )
    }
)
```

## Why This Explains EVERYTHING

1. **No PM Constraints Enforcement**: `pm-constraints-enforcement.js` is 3rd in the list, NEVER INVOKED
2. **Monitoring Operations Allowed**: Without PM constraints, main scope operations went through unchecked
3. **No Logs Generated**: Hooks that aren't registered don't log anything
4. **Only git-enforcement.js Logs**: Because it's the ONLY PreToolUse hook actually working
5. **Not a Multi-Window Issue**: Hooks simply weren't registered properly for ANY window!

## Evidence

**Log Analysis**:
```bash
grep "Engineering/ansible/deployments" ~/.claude/logs/2025-10-28-pm-constraints-enforcement.log
```

Result: 29 entries, ALL from direct testing after 13:59:58 - ZERO from user's actual operations because pm-constraints hook was NEVER REGISTERED!

**Settings File**:
```bash
cat ~/.claude/settings.json
```

Shows the WRONG nested structure with each hook in separate `{ hooks: [...] }` object.

## Fix Steps

1. Update Ansible playbook: `ansible/roles/intelligent-claude-code/tasks/main.yml` lines 241-262
2. Update PowerShell script: `install.ps1` lines 178-202
3. Run `make install` to deploy fixed hook registration
4. Verify corrected structure in `~/.claude/settings.json`
5. Test that PM constraints now blocks operations correctly

## Verification After Fix

After running fixed installation, `~/.claude/settings.json` should contain:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          { "type": "command", "command": "node ~/.claude/hooks/git-enforcement.js", "timeout": 5000, "failureMode": "allow" },
          { "type": "command", "command": "node ~/.claude/hooks/main-scope-enforcement.js", "timeout": 5000, "failureMode": "deny" },
          { "type": "command", "command": "node ~/.claude/hooks/pm-constraints-enforcement.js", "timeout": 5000, "failureMode": "deny" },
          { "type": "command", "command": "node ~/.claude/hooks/agent-infrastructure-protection.js", "timeout": 5000, "failureMode": "deny" },
          { "type": "command", "command": "node ~/.claude/hooks/agent-marker.js", "timeout": 5000, "failureMode": "allow" },
          { "type": "command", "command": "node ~/.claude/hooks/config-protection.js", "timeout": 5000, "failureMode": "deny" },
          { "type": "command", "command": "node ~/.claude/hooks/pre-agenttask-validation.js", "timeout": 5000, "failureMode": "allow" },
          { "type": "command", "command": "node ~/.claude/hooks/project-scope-enforcement.js", "timeout": 5000, "failureMode": "deny" },
          { "type": "command", "command": "node ~/.claude/hooks/summary-file-enforcement.js", "timeout": 5000, "failureMode": "deny" }
        ]
      }
    ]
  }
}
```

**Test**: Try to Edit a file in main scope - should be BLOCKED by pm-constraints-enforcement.js.

---

**CRITICAL**: This bug has existed since initial release. The hook system appeared partially functional because git-enforcement.js (first hook) was working, masking that 11 other hooks were completely non-functional!
