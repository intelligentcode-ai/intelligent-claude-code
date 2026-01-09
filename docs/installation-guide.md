# Installation Guide (v9)

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
- Agents → `.claude/agents/`
- Behaviors → `.claude/behaviors/`
- Hooks → `.claude/hooks/`

## Hooks (minimal)
Registered hooks:
- `git-enforcement.js`
- `agent-infrastructure-protection.js`
- `summary-file-enforcement.js`

See `docs/hook-registration-reference.md` for details.
