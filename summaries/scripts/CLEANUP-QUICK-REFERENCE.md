# Git Privacy Cleanup - Quick Reference Card

## TL;DR - Fast Track

```bash
cd /Users/karsten/Nextcloud/Work/Development/intelligentcode-ai/intelligent-claude-code

# 1. Create backup
git branch backup-before-cleanup
git push origin backup-before-cleanup

# 2. Run automated cleanup
cd scripts/
./cleanup-git-privacy.sh       # Clean commit messages
./cleanup-pr-descriptions.sh   # Clean PR descriptions

# 3. Verify cleanup
git log --all --format=%B | grep -icE "claude|generated|co-authored|🤖"
# Should output: 0

# 4. Force push (COORDINATE WITH TEAM FIRST!)
git push origin --force --all
git push origin --force --tags

# 5. Team updates their repos
git fetch origin
git reset --hard origin/main
```

## Critical Numbers

- **Total Commits:** 2,450
- **Commits to Clean:** 459 (18.7%)
- **AI Mentions:** 828 occurrences
- **Date Range:** June 24 → Oct 26 (4 months)
- **Total PRs:** 211

## Key Files

| File | Purpose |
|------|---------|
| `GIT-PRIVACY-CLEANUP-REPORT.md` | Full analysis |
| `cleanup-git-privacy.sh` | Commit cleanup script |
| `cleanup-pr-descriptions.sh` | PR cleanup script |
| `GIT-PRIVACY-CLEANUP-README.md` | Complete guide |
| `CLEANUP-QUICK-REFERENCE.md` | This file |

## Manual Cleanup Commands

### Commit Messages
```bash
git filter-branch -f --msg-filter '
  sed -e "/🤖 Generated with \[Claude Code\]/d" \
      -e "/Generated with \[Claude Code\]/d" \
      -e "/Co-Authored-By: Claude/d" \
      -e "/Co-authored-by: Claude/d" \
      -e "/🤖.*Claude.*/d"
' --all
```

### Single PR Description
```bash
PR_NUM=212
CLEAN_BODY=$(gh pr view $PR_NUM --json body -q .body | \
  sed -e '/🤖 Generated with/d' \
      -e '/Generated with.*Claude/d' \
      -e '/Co-Authored-By: Claude/d')
gh pr edit $PR_NUM --body "$CLEAN_BODY"
```

## Verification Commands

```bash
# Check commit messages
git log --all --format=%B | grep -icE "claude|generated|co-authored|🤖"

# Sample recent commits
git log --oneline -20

# Check single commit
git show HEAD

# Check PR descriptions
gh pr list --state all --limit 1000 --json number,body | \
  jq -r '.[] | select(.body | test("Claude|Generated|Co-Authored|🤖")) | .number'
```

## Rollback Commands

```bash
# If cleanup causes problems
git reset --hard backup-before-cleanup
git push origin --force --all
git push origin --force --tags
```

## Team Notification Template

```
URGENT: Git History Rewrite - Action Required

WHAT: Cleaning AI mentions from 459 commits (4 months history)
WHEN: [Date/Time]

BEFORE FORCE PUSH:
- Do NOT push any changes
- Save local work

AFTER FORCE PUSH:
Run these commands:
  cd /path/to/intelligent-claude-code
  git fetch origin
  git reset --hard origin/main

WARNING: Unsaved local commits will be lost!
```

## Checklist

### Before Cleanup
- [ ] Backup created: `backup-before-cleanup`
- [ ] Team notified of upcoming force push
- [ ] Maintenance window scheduled
- [ ] Scripts reviewed and tested

### During Cleanup
- [ ] Commit messages cleaned (459 commits)
- [ ] PR descriptions cleaned (211 PRs)
- [ ] Verification: 0 AI mentions remaining
- [ ] Force push completed

### After Cleanup
- [ ] Team updated local repos
- [ ] Git privacy enforcement enabled
- [ ] Pre-commit hook installed
- [ ] Process documented

## Prevention Setup

```bash
# Enable git privacy in CLAUDE.md
cat >> CLAUDE.md <<'EOF'

## System Configuration

```yaml
git_privacy: true
privacy_patterns:
  - "AI"
  - "Claude"
  - "agent"
  - "Generated with Claude Code"
  - "Co-Authored-By: Claude"
```
EOF

# Create pre-commit hook
cat > .git/hooks/pre-commit <<'EOF'
#!/bin/bash
COMMIT_MSG=$(cat "$1")
if echo "$COMMIT_MSG" | grep -qiE "claude|generated with.*claude|co-authored.*claude|🤖"; then
    echo "ERROR: Commit message contains AI attribution"
    exit 1
fi
EOF
chmod +x .git/hooks/pre-commit
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Script slow | Normal for 2,450 commits (5-15 min) |
| Force push rejected | Check write permissions |
| Team lost commits | Check backup-before-cleanup |
| PR edit failed | Verify gh auth status |
| Some mentions remain | Check sed patterns |

## Success Metrics

✅ **Complete Success:**
- 0 AI mentions in commits
- 0 AI mentions in PRs
- All team members updated
- Prevention measures active

## Emergency Contact

If critical issues arise:
1. Stop force push if not started
2. Document the issue
3. Check backup branch
4. Review error messages
5. Consult full guide

---

**Quick Reference Only** - See GIT-PRIVACY-CLEANUP-README.md for complete instructions
