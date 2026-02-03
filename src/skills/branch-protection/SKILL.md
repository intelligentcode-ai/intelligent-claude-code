---
name: branch-protection
description: Apply git branch protection and commit rules. Use when performing git operations to ensure branch protection is followed. This skill mirrors what the git-enforcement hook enforces.
---

# Branch Protection Skill

Apply git branch protection rules and safe commit practices.

## Why This Matters

Git operations are **enforced by hooks** - dangerous operations will be blocked. This skill ensures you understand the rules so your commits aren't rejected.

## Branch Protection Rules

### Protected Branches
- `main` and `master` are protected by default
- Direct commits to protected branches are blocked
- PRs required for changes to protected branches

### Allowed Operations
```bash
# Safe operations (always allowed)
git status
git log
git diff
git show
git branch
git fetch
git pull

# Commit operations (require branch check)
git commit      # Blocked on protected branches
git push        # Blocked to protected branches
```

### Blocked Operations
```bash
# Dangerous operations (always blocked)
git push --force
git reset --hard
git checkout .
git restore .
git clean -f
git branch -D

# Unless user explicitly requests
```

## Commit Workflow

### Correct Flow
1. Create feature branch: `git checkout -b feature/my-change`
2. Make changes
3. Commit to feature branch: `git commit -m "..."`
4. Push feature branch: `git push -u origin feature/my-change`
5. Create PR via `gh pr create`
6. Merge via PR (not direct push)

### Incorrect Flow (Blocked)
```bash
# Direct commit to main - BLOCKED
git checkout main
git commit -m "my change"

# Force push - BLOCKED
git push --force origin main
```

## Git Privacy Integration

When `git.privacy=true`:
- AI references stripped from commit messages
- Co-authored-by lines removed
- Professional language enforced

See `/git-privacy` skill for details.

## Hook Enforcement

The `git-enforcement.js` hook will:
1. **Block** direct commits to protected branches
2. **Block** force push to any branch
3. **Block** destructive operations (reset --hard, clean -f)
4. **Apply** privacy filtering to commit messages

## Before Git Operations

Ask yourself:
1. Am I on a feature branch? → If not, create one
2. Is this a destructive operation? → Only if user explicitly requested
3. Am I pushing to main? → Use PR instead
4. Does my commit message contain AI references? → Will be filtered

## Integration with Hooks

This skill provides **guidance** - you understand the rules.
The hook provides **enforcement** - violations are blocked.

Together they prevent:
- Accidental commits to main
- Lost work from destructive operations
- AI references leaking into history
