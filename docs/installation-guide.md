# Installation Guide (v10.1)

## Install (macOS/Linux)
```bash
make install
```

## Clean Install (macOS/Linux)
```bash
make clean-install
```

## Install (Windows)
```powershell
.\install.ps1 install
```

## Scope
- User scope: installs to `~/.claude/`
- Project scope: installs to `<project>/.claude/`

## What gets installed
- **Skills** → `.claude/skills/` (35 skills)
- **Behaviors** → `.claude/behaviors/` (4 foundational behaviors)
- **Hooks** → `.claude/hooks/` (2 enforcement hooks)
- **Mode** → `.claude/modes/virtual-team.md`

## Hooks (minimal)
Registered hooks:
- `agent-infrastructure-protection.js`
- `summary-file-enforcement.js`

Note: Git privacy is now handled via the `git-privacy` skill rather than a hook.

See `docs/hook-registration-reference.md` for details.
