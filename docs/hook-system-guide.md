# Hook System Guide

The v10.2 hook system is intentionally minimal and only enforces behaviors Claude Code does not provide natively.

## Active Hooks (PreToolUse)

- `agent-infrastructure-protection.js` — blocks imperative infra changes and guides IaC.
- `summary-file-enforcement.js` — routes summary/report files into `summaries/` and blocks ALL‑CAPS filenames.

Note: Git privacy is now handled via the `git-privacy` skill rather than a hook.

## Registration

Hooks are registered by:
- `ansible/roles/intelligent_claude_code/templates/settings.json.j2`
- `install.ps1` (Register‑ProductionHooks)

## Why only PreToolUse?

Claude Code already handles role orchestration and subagent execution. The remaining hooks focus purely on safety and file hygiene.
