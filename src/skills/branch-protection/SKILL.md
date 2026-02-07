---
name: branch-protection
description: Activate when performing git operations. MANDATORY by default - prevents direct commits to main/master, blocks destructive operations (force push, reset --hard). Enforces dev-first workflow where all changes go to dev before main. Assumes branch protection enabled unless disabled in settings.
---

# Branch Protection Skill

**MANDATORY by default.** Branch protection is assumed enabled unless explicitly disabled.

## Branch Hierarchy (CRITICAL)

```
main     ← STABLE RELEASE ONLY (production-ready)
  ↑
dev      ← INTEGRATION BRANCH (all features merge here first)
  ↑
feature/* ← DEVELOPMENT (where work happens)
fix/*
chore/*
```

### Workflow Rules

| From | To | Method | When |
|------|----|--------|------|
| feature/* | dev | PR | When feature is complete and tested |
| fix/* | dev | PR | When fix is ready |
| dev | main | PR | When dev is stable and release-ready |

**NEVER merge directly to main from feature branches.**

## Default Behavior

Branch protection is ON unless `git.branch_protection=false` in `icc.config.json`:
```json
{
  "git": {
    "branch_protection": false
  }
}
```

## Protected Branches

- `main` - Stable releases only (from dev PRs)
- `dev` - Integration branch (from feature PRs)
- Configurable via `git.default_branch` setting

## Rules

### NEVER Do (Unless User Explicitly Requests)
```bash
# Direct commit to protected branch
git checkout main && git commit
git checkout dev && git commit

# Force push
git push --force

# Destructive operations
git reset --hard
git checkout .
git restore .
git clean -f
git branch -D

# PR directly to main (WRONG!)
gh pr create --base main   # Only for releases!
```

### ALWAYS Do
```bash
# Work on feature branch
git checkout -b feature/my-change

# Commit to feature branch
git commit -m "feat: Add feature"

# Push feature branch
git push -u origin feature/my-change

# Create PR to DEV (not main!)
gh pr create --base dev
```

## Commit Workflow

1. **Create branch**: `git checkout -b feature/description`
2. **Make changes**: Edit files
3. **Test**: Run tests
4. **Commit**: `git commit -m "type: description"`
5. **Push**: `git push -u origin feature/description`
6. **PR to dev**: `gh pr create --base dev`
7. **Merge to dev**: Via PR after approval
8. **Release to main**: Separate PR from dev → main (when stable)

## Self-Check Before Git Operations

1. Am I on a feature branch? → If on main/dev, create branch first
2. Is this destructive? → Only proceed if user explicitly requested
3. Am I PRing to main? → Should this go to dev first?
4. Is this a release? → Only then PR to main

## Release Process

Only create PRs to main when:
1. Dev branch is stable and tested
2. All features for release are merged to dev
3. User explicitly requests a release

```bash
# Release workflow (dev → main)
git checkout dev
git pull origin dev
git checkout -b release/v10.2.0
gh pr create --base main --title "release: v10.2.0"
```

## Integration

Works with:
- git-privacy skill - No AI attribution in commits
- commit-pr skill - Commit message formatting, defaults PR to dev
- process skill - Development workflow phases (including Phase 4: Release)
