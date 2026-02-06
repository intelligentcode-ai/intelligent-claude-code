---
name: icc-setup
description: Setup ICC development environment. Use when starting work on the ICC framework, after cloning the repository, or when setting up local skill testing. Creates symlinks and verifies project structure.
---

# ICC Development Setup

This skill sets up the local development environment for working on the Intelligent Claude Code framework.

## When to Use

- After cloning the ICC repository
- Starting development work on ICC
- Setting up local skill testing
- Verifying project structure is correct

## Setup Steps

### 1. Verify Project Structure

Confirm you're in the ICC project root:
```bash
ls -la src/skills src/hooks CLAUDE.md
```

Expected: `src/skills/`, `src/hooks/`, and `CLAUDE.md` exist.

### 2. Create Local Skills Directory

```bash
mkdir -p .claude/skills
```

### 3. Create Symlinks for Active Development

Link skills you're actively developing:

**Linux/macOS:**
```bash
cd .claude/skills
ln -sf ../../src/skills/commit-pr commit-pr
ln -sf ../../src/skills/git-privacy git-privacy
ln -sf ../../src/skills/icc-setup icc-setup
ln -sf ../../src/skills/reviewer reviewer
ln -sf ../../src/skills/process process
```

**Windows (PowerShell as Admin or Developer Mode enabled):**
```powershell
cd .claude\skills
New-Item -ItemType SymbolicLink -Path commit-pr -Target ..\..\src\skills\commit-pr
New-Item -ItemType SymbolicLink -Path git-privacy -Target ..\..\src\skills\git-privacy
New-Item -ItemType SymbolicLink -Path icc-setup -Target ..\..\src\skills\icc-setup
New-Item -ItemType SymbolicLink -Path reviewer -Target ..\..\src\skills\reviewer
New-Item -ItemType SymbolicLink -Path process -Target ..\..\src\skills\process
```

**Windows (cmd as Admin):**
```cmd
cd .claude\skills
mklink /D commit-pr ..\..\src\skills\commit-pr
mklink /D git-privacy ..\..\src\skills\git-privacy
mklink /D icc-setup ..\..\src\skills\icc-setup
mklink /D reviewer ..\..\src\skills\reviewer
mklink /D process ..\..\src\skills\process
```

Add more symlinks as needed for skills being developed.

### 4. Verify Symlinks

```bash
ls -la .claude/skills/
```

Should show symlinks pointing to `../../src/skills/`.

### 5. Copy Local-Only Skills

Some skills are local-only (not distributed):
```bash
# icc-development is local-only, keep in .claude/skills/ directly
ls .claude/skills/icc-development/
```

## Quick Setup (All Commands)

**Linux/macOS:**
```bash
mkdir -p .claude/skills
cd .claude/skills
ln -sf ../../src/skills/commit-pr commit-pr
ln -sf ../../src/skills/git-privacy git-privacy
ln -sf ../../src/skills/icc-setup icc-setup
ln -sf ../../src/skills/reviewer reviewer
ln -sf ../../src/skills/process process
cd ../..
```

**Windows (PowerShell as Admin):**
```powershell
New-Item -ItemType Directory -Force -Path .claude\skills
cd .claude\skills
New-Item -ItemType SymbolicLink -Path commit-pr -Target ..\..\src\skills\commit-pr
New-Item -ItemType SymbolicLink -Path git-privacy -Target ..\..\src\skills\git-privacy
New-Item -ItemType SymbolicLink -Path icc-setup -Target ..\..\src\skills\icc-setup
New-Item -ItemType SymbolicLink -Path reviewer -Target ..\..\src\skills\reviewer
New-Item -ItemType SymbolicLink -Path process -Target ..\..\src\skills\process
cd ..\..
```

## Verification

After setup, test with:
```
commit-pr
git-privacy
icc-setup
```

Each should load the skill from `src/skills/` via the symlink.

## Project Understanding

**Key principle**: This project IS the ICC framework source.

| Directory | Purpose |
|-----------|---------|
| `src/skills/` | Distributed skills (what users install) |
| `src/hooks/` | Enforcement hooks |
| `.claude/skills/` | Local symlinks for testing |

Changes to `src/skills/` affect what users get when they install ICC.

## Troubleshooting

**Symlink not working (Linux/macOS):**
```bash
# Check if symlink is valid
ls -la .claude/skills/commit-pr
# Should show: commit-pr -> ../../src/skills/commit-pr

# If broken, recreate
rm .claude/skills/commit-pr
cd .claude/skills && ln -sf ../../src/skills/commit-pr commit-pr
```

**Windows symlink permission denied:**
- Enable Developer Mode: Settings → Update & Security → For developers → Developer Mode
- Or run PowerShell/cmd as Administrator

**Skill not found:**
Ensure the skill exists in `src/skills/` first, then create the symlink.
