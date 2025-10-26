# Hook Registration Reference

Complete mapping of all production hooks to their Claude Code hook events.

## Production Hook System (14 Hooks)

### PreToolUse Event (9 Hooks)

Executes before any tool usage in Claude Code.

| Hook File | Purpose | Failure Mode | Timeout |
|-----------|---------|--------------|---------|
| `git-enforcement.js` | Git privacy and branch protection enforcement | allow | 5000ms |
| `main-scope-enforcement.js` | Strict main scope coordination-only mode | deny | 5000ms |
| `pm-constraints-enforcement.js` | PM role constraints and technical work blocking | deny | 5000ms |
| `agent-infrastructure-protection.js` | Agent infrastructure operation protection | deny | 5000ms |
| `agent-marker.js` | Agent context marker creation and detection | allow | 5000ms |
| `config-protection.js` | Configuration file protection from modification | deny | 5000ms |
| `pre-agenttask-validation.js` | Pre-execution AgentTask validation | allow | 5000ms |
| `project-scope-enforcement.js` | Project boundary enforcement | deny | 5000ms |
| `summary-file-enforcement.js` | Summary file directory enforcement | deny | 5000ms |

### UserPromptSubmit Event (3 Hooks)

Executes when user submits a prompt.

| Hook File | Purpose | Failure Mode | Timeout |
|-----------|---------|--------------|---------|
| `user-prompt-submit.js` | Educational reminders and behavioral guidance | allow | 15000ms |
| `context-injection.js` | Dynamic context injection into prompts | allow | 5000ms |
| `task-tool-execution-reminder.js` | Task tool execution pattern reminders | allow | 5000ms |

### SubagentStop Event (1 Hook)

Executes when a subagent (via Task tool) completes execution.

| Hook File | Purpose | Failure Mode | Timeout |
|-----------|---------|--------------|---------|
| `subagent-stop.js` | Agent marker cleanup and session management | allow | 5000ms |

### Stop Event (1 Hook)

Executes when main Claude Code session stops.

| Hook File | Purpose | Failure Mode | Timeout |
|-----------|---------|--------------|---------|
| `stop.js` | Main scope marker cleanup and session cleanup | allow | 5000ms |

## Hook Registration

### Ansible Installation

All 14 hooks are registered via `ansible/roles/intelligent-claude-code/templates/settings.json.j2`.

### PowerShell Installation

All 14 hooks are registered via `Register-ProductionHooks` function in `install.ps1`.

### Settings.json Structure

```json
{
  "hooks": {
    "PreToolUse": [
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/git-enforcement.js", "timeout": 5000, "failureMode": "allow" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/main-scope-enforcement.js", "timeout": 5000, "failureMode": "deny" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/pm-constraints-enforcement.js", "timeout": 5000, "failureMode": "deny" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/agent-infrastructure-protection.js", "timeout": 5000, "failureMode": "deny" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/agent-marker.js", "timeout": 5000, "failureMode": "allow" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/config-protection.js", "timeout": 5000, "failureMode": "deny" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/pre-agenttask-validation.js", "timeout": 5000, "failureMode": "allow" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/project-scope-enforcement.js", "timeout": 5000, "failureMode": "deny" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/summary-file-enforcement.js", "timeout": 5000, "failureMode": "deny" }] }
    ],
    "UserPromptSubmit": [
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/user-prompt-submit.js", "timeout": 15000, "failureMode": "allow" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/context-injection.js", "timeout": 5000, "failureMode": "allow" }] },
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/task-tool-execution-reminder.js", "timeout": 5000, "failureMode": "allow" }] }
    ],
    "SubagentStop": [
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/subagent-stop.js", "timeout": 5000, "failureMode": "allow" }] }
    ],
    "Stop": [
      { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/stop.js", "timeout": 5000, "failureMode": "allow" }] }
    ]
  }
}
```

## Failure Modes

### allow
Hook failure does not block operation. Used for:
- Educational reminders (user-prompt-submit.js)
- Context injection (context-injection.js, task-tool-execution-reminder.js)
- Marker management (agent-marker.js, subagent-stop.js, stop.js)
- Privacy enforcement (git-enforcement.js - applies modification, doesn't block)
- Validation (pre-agenttask-validation.js - provides warnings)

### deny
Hook failure blocks operation. Used for:
- Main scope enforcement (main-scope-enforcement.js)
- PM constraints (pm-constraints-enforcement.js)
- Agent protection (agent-infrastructure-protection.js)
- Config protection (config-protection.js)
- Project scope (project-scope-enforcement.js)
- Summary file enforcement (summary-file-enforcement.js)

## Execution Order

### PreToolUse
Hooks execute in array order:
1. git-enforcement.js (privacy patterns)
2. main-scope-enforcement.js (coordination-only mode)
3. pm-constraints-enforcement.js (PM technical work blocking)
4. agent-infrastructure-protection.js (agent operations)
5. agent-marker.js (context detection)
6. config-protection.js (configuration safety)
7. pre-agenttask-validation.js (AgentTask readiness)
8. project-scope-enforcement.js (boundary enforcement)
9. summary-file-enforcement.js (directory routing)

### UserPromptSubmit
Hooks execute in array order:
1. user-prompt-submit.js (educational reminders)
2. context-injection.js (dynamic context)
3. task-tool-execution-reminder.js (execution patterns)

### SubagentStop
Single hook:
1. subagent-stop.js (cleanup)

### Stop
Single hook:
1. stop.js (session cleanup)

## Configuration

All hooks respect configuration from:
- User global: `~/.claude/icc.config.json`
- Project: `./icc.config.json`

Key settings:
- `enforcement.strict_main_scope`: Enable/disable strict main scope mode
- `git.privacy`: Enable/disable git privacy enforcement
- `git.privacy_patterns`: Custom privacy patterns
- `git.branch_protection`: Enable/disable branch protection
- `git.require_pr_for_main`: Require PR for main branch

## Logging

All hooks log to:
- `~/.claude/logs/<YYYY-MM-DD>-<hook-name>.log`
- Auto-cleanup after 24 hours
- Detailed execution traces for debugging

## Version

Hook system version: **v8.20.26**
- All 14 production hooks registered
- Privacy patterns refined to specific attribution
- Sleep command added to main scope allowlist
- Comprehensive enforcement active
