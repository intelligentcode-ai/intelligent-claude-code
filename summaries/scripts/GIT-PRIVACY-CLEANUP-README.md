# Git Privacy Cleanup - Complete Guide

## Overview

This guide provides comprehensive instructions for cleaning AI attribution mentions from the **ENTIRE** git history and all pull request descriptions.

**Critical Understanding:** The initial cleanup attempt only addressed 2 days of commits. This repository has **459 commits with AI mentions spanning 4 MONTHS** (June 24, 2025 → October 26, 2025).

## Repository Statistics

- **Total Commits:** 2,450
- **Commits with AI Mentions:** 459 (18.7%)
- **AI Mention Occurrences:** 828 total
- **Total PRs:** 211
- **Date Range:** 124 days

## Files in This Directory

1. **GIT-PRIVACY-CLEANUP-REPORT.md** - Detailed analysis report
2. **cleanup-git-privacy.sh** - Script to clean commit messages
3. **cleanup-pr-descriptions.sh** - Script to clean PR descriptions
4. **GIT-PRIVACY-CLEANUP-README.md** - This file

## Prerequisites

### Required Tools
```bash
# Git (already installed)
git --version

# GitHub CLI
brew install gh
gh auth login
```

### Permissions
- Write access to repository
- Permission to force push to all branches
- Team coordination for force push

## Cleanup Process

### Phase 1: Preparation

#### 1. Review Current State
```bash
cd /Users/karsten/Nextcloud/Work/Development/intelligentcode-ai/intelligent-claude-code

# Count total commits
git log --all --oneline | wc -l

# Count AI mentions
git log --all --format=%B | grep -icE "claude|generated|co-authored.*claude|🤖"

# Show sample AI mentions
git log --all --format=%B | grep -iE "claude|generated|co-authored.*claude|🤖" | head -20
```

#### 2. Notify Team
**CRITICAL:** Force push will break local copies for all team members!

Send notification to all contributors:
```
SUBJECT: Git History Rewrite - Force Push Required

We are performing a complete git history cleanup to remove AI attribution
mentions from all 459 commits spanning 4 months.

TIMELINE: [Date/Time]

ACTION REQUIRED:
After force push, all team members MUST update local repositories:
  git fetch origin
  git reset --hard origin/main

Do NOT push any changes between now and the force push completion.
```

#### 3. Create Backup
```bash
# Backup current state
git branch backup-before-cleanup
git push origin backup-before-cleanup
```

### Phase 2: Cleanup Execution

#### 1. Clean Commit Messages

Run the automated script:
```bash
cd scripts/
./cleanup-git-privacy.sh
```

**Script will:**
- Create backup branch (if not exists)
- Scan entire history for AI mentions
- Show sample of what will be cleaned
- Require explicit confirmation
- Run git filter-branch on ALL commits
- Verify cleanup completeness
- Provide statistics

**Manual cleanup alternative:**
```bash
git filter-branch -f --msg-filter '
  sed -e "/🤖 Generated with \[Claude Code\]/d" \
      -e "/Generated with \[Claude Code\]/d" \
      -e "/Co-Authored-By: Claude/d" \
      -e "/Co-authored-by: Claude/d" \
      -e "/🤖.*Claude.*/d"
' --all
```

#### 2. Verify Commit Cleanup

```bash
# Should return 0
git log --all --format=%B | grep -icE "claude|generated|co-authored.*claude|🤖"

# Check sample commits
git log --all --oneline | head -20
git show HEAD
```

#### 3. Clean PR Descriptions

Run the automated script:
```bash
cd scripts/
./cleanup-pr-descriptions.sh
```

**Script will:**
- Fetch all PRs (211 total)
- Identify PRs with AI mentions
- Show sample PRs to be cleaned
- Require confirmation
- Clean each PR description
- Provide cleanup statistics

**Manual PR cleanup (if needed):**
```bash
# List PRs with AI mentions
gh pr list --state all --limit 1000 --json number,body | \
  jq -r '.[] | select(.body | test("Claude|Generated|Co-Authored|🤖")) | .number'

# Clean individual PR
PR_NUM=212
CLEAN_BODY=$(gh pr view $PR_NUM --json body -q .body | \
  sed -e '/🤖 Generated with/d' \
      -e '/Generated with.*Claude/d' \
      -e '/Co-Authored-By: Claude/d')

gh pr edit $PR_NUM --body "$CLEAN_BODY"
```

### Phase 3: Force Push

#### 1. Final Verification
```bash
# Verify commit messages clean
git log --all --format=%B | grep -iE "claude|generated|co-authored|🤖" | wc -l
# Should output: 0

# Verify PR descriptions clean
gh pr list --state all --limit 1000 --json number,body | \
  jq -r '.[] | select(.body | test("Claude|Generated|Co-Authored|🤖")) | .number' | wc -l
# Should output: 0
```

#### 2. Execute Force Push
```bash
# Force push all branches
git push origin --force --all

# Force push all tags
git push origin --force --tags
```

#### 3. Verify Remote
```bash
# Check remote history
git fetch origin
git log origin/main --format=%B | grep -iE "claude|generated|co-authored|🤖" | wc -l
# Should output: 0
```

### Phase 4: Team Coordination

#### 1. Notify Team of Completion
```
SUBJECT: Git History Rewrite - COMPLETE - Update Required NOW

The git history cleanup is complete.

ALL TEAM MEMBERS must update local repositories NOW:

  cd /path/to/intelligent-claude-code
  git fetch origin
  git reset --hard origin/main

WARNING: Any local commits not pushed will be lost.
Save your work before running these commands!
```

#### 2. Verify Team Updates
Have each team member confirm:
```bash
# Should show clean commit messages
git log --oneline | head -10

# Should be in sync with remote
git status
# Output: "Your branch is up to date with 'origin/main'"
```

## Rollback Procedure

If cleanup causes issues:

```bash
# Switch to backup
git reset --hard backup-before-cleanup

# Force push backup
git push origin --force --all

# Notify team to update
# (same process as Phase 4)
```

## Prevention - Future Commits

### 1. Configure Git Privacy

Enable git privacy in project config:
```bash
# Add to CLAUDE.md or config.md
git_privacy: true
privacy_patterns:
  - "AI"
  - "Claude"
  - "agent"
  - "Generated with Claude Code"
  - "Co-Authored-By: Claude"
```

### 2. Install Pre-Commit Hook

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Pre-commit hook to block AI mentions

COMMIT_MSG=$(cat "$1")

if echo "$COMMIT_MSG" | grep -qiE "claude|generated with.*claude|co-authored.*claude|🤖"; then
    echo "ERROR: Commit message contains AI attribution"
    echo "Remove AI mentions and try again"
    exit 1
fi
```

Make executable:
```bash
chmod +x .git/hooks/pre-commit
```

### 3. Enable Git Enforcement Hook

Ensure git-enforcement.js hook is active:
```bash
# Verify hook exists
ls -la ~/.claude/hooks/git-enforcement.js

# Test hook
git commit -m "Test commit 🤖 Generated with Claude Code"
# Should be BLOCKED
```

## Verification Checklist

After complete cleanup:

- [ ] All 2,450 commits scanned
- [ ] 0 AI mentions remain in commit messages
- [ ] All 211 PRs scanned
- [ ] 0 AI mentions remain in PR descriptions
- [ ] Force push completed successfully
- [ ] All team members updated local repos
- [ ] Backup branch preserved
- [ ] Git privacy enforcement enabled
- [ ] Pre-commit hook installed
- [ ] Team documented on prevention

## Statistics Tracking

Document cleanup results:

```bash
# Before cleanup
Total Commits: 2,450
AI Mentions in Commits: 828
Commits with AI Mentions: 459 (18.7%)
PRs with AI Mentions: [Unknown]

# After cleanup
Total Commits: 2,450
AI Mentions in Commits: 0
Commits with AI Mentions: 0 (0%)
PRs with AI Mentions: 0

# Cleanup Stats
Commit Messages Cleaned: 459
PR Descriptions Cleaned: [Count]
Total Duration: [Time]
Team Coordination: [Successful/Issues]
```

## Troubleshooting

### Issue: git filter-branch very slow
**Solution:** Use `--force` flag and patience. 2,450 commits takes 5-15 minutes.

### Issue: Force push rejected
**Solution:** Verify write permissions and use `--force` flag explicitly.

### Issue: Team member lost local commits
**Solution:** Check if commits exist in backup-before-cleanup branch.

### Issue: PR edit failed
**Solution:** Check gh CLI authentication and repository permissions.

### Issue: Some AI mentions remain
**Solution:** Check sed patterns match exactly. May need additional patterns.

## Support

For issues or questions:
1. Review GIT-PRIVACY-CLEANUP-REPORT.md
2. Check script output logs
3. Verify prerequisites installed
4. Test commands manually
5. Consult git documentation

## Success Criteria

Cleanup is successful when:
1. ✅ 0 AI mentions in all commit messages
2. ✅ 0 AI mentions in all PR descriptions
3. ✅ All team members updated successfully
4. ✅ Repository functions normally
5. ✅ Prevention measures in place
6. ✅ Team documented on process

---

**Generated:** 2025-10-26
**Repository:** intelligent-claude-code
**Scope:** COMPLETE git history cleanup (4 months, 459 commits, 211 PRs)
