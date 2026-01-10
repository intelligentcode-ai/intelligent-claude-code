# Sample ICC Configurations (v9)

These presets are aligned to the **current v9 hooks** only:
- Git privacy (commit/PR text)
- Infrastructure protection (Bash safety)
- Summary/report routing

Copy one to `./icc.config.json` or `~/.claude/icc.config.json` and adjust.

## Presets

- `icc.config.relaxed.json` — light constraints, infra protection off, file routing relaxed.
- `icc.config.main-scope-dev.json` — dev‑friendly, allows main‑scope infra bypass, relaxed file routing.
- `icc.config.main-scope.json` — main‑scope infra bypass enabled, otherwise strict.
- `icc.config.strict-main-scope.json` — strict infra protection, no main‑scope bypass.
- `icc.config.sub-agent.json` — strict infra protection; assumes work happens via subagents.
- `icc.config.local-backup.json` — minimal override for infra protection only.

## Notes

- Only keys used by current hooks are included.
- `main_scope_has_agent_privileges` only affects **infra protection bypass** for Bash; it does not relax summary routing or git privacy enforcement.
- If you need additional settings, add them manually to your config.
