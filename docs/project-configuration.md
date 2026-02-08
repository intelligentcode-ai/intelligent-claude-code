# Project Configuration (v10.2)

ICC uses JSON configuration files so it works across tools and editors.

## Key Files

- `icc.config.json`: behavior/enforcement configuration
  - git privacy, branch protection assumptions, paths, enforcement toggles
- `icc.workflow.json`: workflow automation configuration
  - auto-merge standing approval, optional GitHub approvals gate, release automation

See `docs/configuration-guide.md` for the full hierarchy and key settings.

## CLAUDE.md (Recommended)

For Claude Code, `CLAUDE.md` is the single entry point for project instructions and how to use ICC in that repo.
This repository’s `CLAUDE.md` is a good example.

