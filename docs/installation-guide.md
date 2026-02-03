# Installation Guide (v10)

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
- **Skills** → `.claude/skills/` (34 skills)
- **Behaviors** → `.claude/behaviors/` (4 foundational behaviors)
- **Hooks** → `.claude/hooks/` (3 enforcement hooks)
- **Mode** → `.claude/modes/virtual-team.md`

## Hooks (minimal)
Registered hooks:
- `git-enforcement.js`
- `agent-infrastructure-protection.js`
- `summary-file-enforcement.js`

See `docs/hook-registration-reference.md` for details.
