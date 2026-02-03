# Hook Registration Reference (v10)

Claude Code hooks are kept **minimal** and only enforce behaviors CC does not provide natively.

## Active Hooks

### PreToolUse
- `git-enforcement.js` — Git privacy filtering (commit + PR text)
- `agent-infrastructure-protection.js` — Infra safety enforcement
- `summary-file-enforcement.js` — Summary/report file placement + ALL‑CAPS blocking

## Registration
Hooks are registered by:
- `ansible/roles/intelligent_claude_code/templates/settings.json.j2`
- `install.ps1` (Register‑ProductionHooks)

## Version
Hook system version: **v10.0.0**
