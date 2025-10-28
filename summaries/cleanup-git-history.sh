#!/bin/bash
#
# Git Privacy Cleanup - Remove attribution mentions from entire history
#

set -e

echo "========================================="
echo "Git Privacy Cleanup - FULL HISTORY"
echo "========================================="
echo ""

# Create backup branch
BACKUP_BRANCH="backup-before-cleanup-$(date +%Y%m%d-%H%M%S)"
git branch "$BACKUP_BRANCH"
echo "✓ Backup branch created: $BACKUP_BRANCH"
echo ""

# Count current mentions
BEFORE_COUNT=$(git log --all --format=%B | grep -icE "claude|generated with.*claude code|co-authored.*claude|🤖" || echo "0")
echo "AI mentions before cleanup: $BEFORE_COUNT"
echo ""

# Run filter-branch
echo "Running git filter-branch (this may take several minutes)..."
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --msg-filter 'cat | sed "/🤖 Generated with/d; /Generated with.*Claude Code/d; /Co-Authored-By: Claude/d; /Co-authored-by: Claude/d"' --all

echo "✓ Git filter-branch completed"
echo ""

# Verify cleanup
AFTER_COUNT=$(git log --all --format=%B | grep -icE "claude|generated with.*claude code|co-authored.*claude|🤖" || echo "0")
echo "AI mentions after cleanup: $AFTER_COUNT"
echo "Mentions removed: $((BEFORE_COUNT - AFTER_COUNT))"
echo ""

if [ "$AFTER_COUNT" -eq 0 ]; then
    echo "✓ SUCCESS: All attribution mentions removed!"
else
    echo "⚠ WARNING: $AFTER_COUNT mentions remain"
fi

echo ""
echo "========================================="
echo "Next Steps"
echo "========================================="
echo "1. Force push: git push origin --force --all"
echo "2. Rollback if needed: git reset --hard $BACKUP_BRANCH"
echo ""
