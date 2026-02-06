---
name: branch-protection
description: MANDATORY - Git branch protection rules. Use when performing git operations. Assumes branch protection enabled unless git.branch_protection=false in settings. Prevents direct commits to main/master, blocks destructive operations.
---

# Branch Protection Skill

**MANDATORY by default.** Branch protection is assumed enabled unless explicitly disabled.

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

- `main` and `master` are protected by default
- Configurable via `git.default_branch` setting

## Rules

### NEVER Do (Unless User Explicitly Requests)
```bash
# Direct commit to protected branch
git checkout main && git commit

# Force push
git push --force

# Destructive operations
git reset --hard
git checkout .
git restore .
git clean -f
git branch -D
```

### ALWAYS Do
```bash
# Work on feature branch
git checkout -b feature/my-change

# Commit to feature branch
git commit -m "feat: Add feature"

# Push feature branch
git push -u origin feature/my-change

# Create PR for merge
gh pr create
```

## Commit Workflow

1. **Create branch**: `git checkout -b feature/description`
2. **Make changes**: Edit files
3. **Test**: Run tests
4. **Commit**: `git commit -m "type: description"`
5. **Push**: `git push -u origin feature/description`
6. **PR**: `gh pr create`
7. **Merge**: Via PR after approval

## Self-Check Before Git Operations

1. Am I on a feature branch? → If on main, create branch first
2. Is this destructive? → Only proceed if user explicitly requested
3. Am I pushing to main? → Use PR workflow instead

## Integration

Works with:
- `/git-privacy` - No AI attribution in commits
- `/commit-pr` - Commit message formatting
- `/process` - Development workflow phases
