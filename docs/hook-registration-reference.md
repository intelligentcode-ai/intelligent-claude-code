# Hook Registration Reference

Complete mapping of all hooks to their Claude Code events for intelligent-claude-code system.

## Overview

The system includes **15 hook files** that execute at different points in the Claude Code lifecycle. Previously, only **3 PreToolUse hooks** were registered in settings.json, leaving **12 hooks unregistered and inactive**.

This document provides the complete hook-to-event mapping and registration status.

---

## PreToolUse Hooks (9 total)

Execute **before tool operations** to enforce constraints and validate operations.

### 1. agent-infrastructure-protection.js
**Purpose:** Blocks SSH infrastructure operations
**Enforcement:** Prevents agents from SSHing into infrastructure
**Event:** PreToolUse
**Status:** Now registered ✅

### 2. agent-marker.js
**Purpose:** Tracks agent execution with Task tool
**Enforcement:** Creates/updates agent execution markers
**Event:** PreToolUse
**Status:** Now registered ✅

### 3. config-protection.js
**Purpose:** Protects config files from modification
**Enforcement:** Blocks changes to icc.config.json and icc.workflow.json
**Event:** PreToolUse
**Status:** Now registered ✅

### 4. git-enforcement.js
**Purpose:** Enforces git privacy and constraints
**Enforcement:** Strips AI mentions, enforces branch protection
**Event:** PreToolUse
**Status:** Already registered ✅

### 5. main-scope-enforcement.js
**Purpose:** Enforces main scope coordination mode
**Enforcement:** Main scope coordination only when strict_main_scope enabled
**Event:** PreToolUse
**Status:** Already registered ✅

### 6. pm-constraints-enforcement.js
**Purpose:** Enforces PM role constraints
**Enforcement:** PM can only coordinate, not execute technical work
**Event:** PreToolUse
**Status:** Already registered ✅

### 7. pre-agenttask-validation.js
**Purpose:** Validates memory search before Task tool
**Enforcement:** Encourages memory-first approach (guidance, not blocking)
**Event:** PreToolUse
**Status:** Now registered ✅

### 8. project-scope-enforcement.js
**Purpose:** Protects installation directory
**Enforcement:** Blocks modifications to ~/.claude/ (except CLAUDE.md)
**Event:** PreToolUse
**Status:** Now registered ✅

### 9. summary-file-enforcement.js
**Purpose:** Ensures summary files go to summaries/ directory
**Enforcement:** Blocks ALL-CAPITALS filenames, enforces directory structure
**Event:** PreToolUse
**Status:** Now registered ✅

---

## UserPromptSubmit Hooks (3 total)

Execute **when user submits a prompt** to inject context and reminders.

### 1. context-injection.js
**Purpose:** Injects best practices and reminders
**Enforcement:** Educational reminders (5-15% chance)
**Event:** UserPromptSubmit
**Status:** Now registered ✅

### 2. task-tool-execution-reminder.js
**Purpose:** Reminds about Task tool usage
**Enforcement:** Detects @Role mentions and suggests Task tool deployment
**Event:** UserPromptSubmit
**Status:** Now registered ✅

### 3. user-prompt-submit.js
**Purpose:** Main user prompt processing
**Enforcement:** Cleans up ALL project markers at UserPromptSubmit
**Event:** UserPromptSubmit
**Status:** Already registered ✅

---

## SubagentStop Hooks (1 total)

Execute **when a subagent stops** to clean up state.

### 1. subagent-stop.js
**Purpose:** Cleans up agent markers
**Enforcement:** Removes agent execution markers on subagent completion
**Event:** SubagentStop
**Status:** Already registered ✅

---

## Stop Hooks (1 total)

Execute **on session stop** to clean up session state.

### 1. stop.js
**Purpose:** Cleans up session markers
**Enforcement:** Removes session-level agent markers
**Event:** Stop
**Status:** Now registered ✅

---

## Excluded Hooks (1 total)

### session-start-dummy.js
**Purpose:** Debug placeholder
**Reason:** Not needed for production - logs phantom SessionStart calls
**Status:** Not registered (by design)

---

## Registration Status Summary

| Event Type | Total Hooks | Previously Registered | Now Registered |
|------------|-------------|----------------------|----------------|
| PreToolUse | 9 | 3 | 9 ✅ |
| UserPromptSubmit | 3 | 1 | 3 ✅ |
| SubagentStop | 1 | 1 | 1 ✅ |
| Stop | 1 | 0 | 1 ✅ |
| **Total** | **14** | **5** | **14** ✅ |

---

## Installation Updates

### Ansible Playbook
File: `ansible/roles/intelligent-claude-code/tasks/main.yml` (lines 241-310)

All hooks now registered in correct events with proper structure.

### PowerShell Script
File: `install.ps1` (lines 177-311)

All hooks now registered with Windows-compatible paths.

---

## Verification

After installation, verify complete registration:

```bash
# Check settings.json structure
cat ~/.claude/settings.json | jq '.hooks'

# Verify PreToolUse hooks (should show 9)
cat ~/.claude/settings.json | jq '.hooks.PreToolUse[0].hooks | length'

# Verify UserPromptSubmit hooks (should show 3)
cat ~/.claude/settings.json | jq '.hooks.UserPromptSubmit[0].hooks | length'

# Verify SubagentStop hooks (should show 1)
cat ~/.claude/settings.json | jq '.hooks.SubagentStop[0].hooks | length'

# Verify Stop hooks (should show 1)
cat ~/.claude/settings.json | jq '.hooks.Stop[0].hooks | length'
```

Expected output:
- PreToolUse: 9 hooks
- UserPromptSubmit: 3 hooks
- SubagentStop: 1 hook
- Stop: 1 hook

---

## Hook Execution Order

### PreToolUse (before every tool operation)
1. agent-infrastructure-protection.js
2. agent-marker.js
3. config-protection.js
4. git-enforcement.js
5. main-scope-enforcement.js
6. pm-constraints-enforcement.js
7. pre-agenttask-validation.js
8. project-scope-enforcement.js
9. summary-file-enforcement.js

### UserPromptSubmit (on user input)
1. context-injection.js
2. task-tool-execution-reminder.js
3. user-prompt-submit.js

### SubagentStop (on agent completion)
1. subagent-stop.js

### Stop (on session end)
1. stop.js

---

## Impact Analysis

### Before Fix (Only 5 hooks registered)
- Infrastructure protection: INACTIVE
- Agent tracking: INACTIVE
- Config protection: INACTIVE
- AgentTask validation: INACTIVE
- Project scope protection: INACTIVE
- Summary enforcement: INACTIVE
- Context injection: INACTIVE
- Task tool reminders: INACTIVE
- Session cleanup: INACTIVE

### After Fix (All 14 hooks registered)
- ALL enforcement hooks: ACTIVE ✅
- ALL protective measures: ACTIVE ✅
- ALL educational reminders: ACTIVE ✅
- ALL cleanup operations: ACTIVE ✅

---

## Maintenance Notes

When adding new hooks:

1. **Determine Event Type**: PreToolUse, UserPromptSubmit, SubagentStop, or Stop
2. **Update Ansible**: Add to appropriate event in `ansible/roles/intelligent-claude-code/tasks/main.yml`
3. **Update PowerShell**: Add to appropriate event in `install.ps1`
4. **Update This Document**: Add hook description and event mapping
5. **Test Registration**: Verify hook appears in settings.json after installation

---

## Related Documentation

- Hook development: `docs/hooks/`
- Installation guide: `README.md`
- Configuration reference: `docs/configuration.md`

---

*Last updated: 2025-10-26*
*Fixed incomplete hook registration issue*
