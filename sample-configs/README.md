# Sample ICC Configurations (Legacy)

These presets were created for v8/v9-era enforcement hooks. v10 uses a skills-first architecture and relies on CC-native subagents, so these files should be treated as **legacy starting points** only.

If you use one, copy it to `./icc.config.json` (or `~/.claude/icc.config.json`) and adjust for v10.

## Notes

- Options that referenced main-scope enforcement, workflow enforcement, or reminder hooks are no longer used.
- Keep only settings relevant to current hooks (git privacy, infra protection, paths).
- v10 introduces 34 skills that replace most behavior-based guidance.

