# Hook Registration Reference (v10.1)

Claude Code hooks are kept **minimal** and only enforce behaviors CC does not provide natively.

## Active Hooks

### PreToolUse
- `agent-infrastructure-protection.js` — Infra safety enforcement
- `summary-file-enforcement.js` — Summary/report file placement + ALL‑CAPS blocking

Note: Git privacy is now handled via the `git-privacy` skill rather than a hook.

## Registration
Hooks are registered by:
- `ansible/roles/intelligent_claude_code/templates/settings.json.j2`
- `install.ps1` (Register‑ProductionHooks)

## Version
Hook system version: **v10.1.0**
