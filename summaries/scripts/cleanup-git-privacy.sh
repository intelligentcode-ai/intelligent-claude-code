#!/bin/bash
#
# Git Privacy Cleanup Script - FULL HISTORY
#
# This script cleans AI attribution mentions from ENTIRE git history,
# not just recent commits.
#
# CRITICAL: Creates backup and requires team coordination before force push
#

set -e  # Exit on any error

PROJECT_DIR="/Users/karsten/Nextcloud/Work/Development/intelligentcode-ai/intelligent-claude-code"
cd "$PROJECT_DIR"

echo "========================================="
echo "Git Privacy Cleanup - FULL HISTORY"
echo "========================================="
echo ""

# Check if git repo
if [ ! -d ".git" ]; then
    echo "ERROR: Not a git repository"
    exit 1
fi

# Step 1: Create backup branch
echo "Step 1: Creating backup branch..."
if git rev-parse --verify backup-before-cleanup >/dev/null 2>&1; then
    echo "  Backup branch already exists. Delete it first if you want a fresh backup."
    read -p "  Delete existing backup and create new one? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git branch -D backup-before-cleanup
        git branch backup-before-cleanup
        echo "  ✓ New backup branch created"
    else
        echo "  Using existing backup branch"
    fi
else
    git branch backup-before-cleanup
    echo "  ✓ Backup branch created: backup-before-cleanup"
fi

# Step 2: Scan current state
echo ""
echo "Step 2: Scanning current state..."
TOTAL_COMMITS=$(git log --all --oneline | wc -l | tr -d ' ')
echo "  Total commits: $TOTAL_COMMITS"

# Count AI mentions
echo "  Scanning for AI mentions..."
AI_MENTIONS=$(git log --all --format=%B | grep -icE "claude|generated with.*claude code|co-authored.*claude|🤖" || echo "0")
echo "  AI mention occurrences: $AI_MENTIONS"

if [ "$AI_MENTIONS" -eq 0 ]; then
    echo ""
    echo "✓ No AI mentions found. Repository is already clean!"
    exit 0
fi

# Step 3: Show sample of what will be cleaned
echo ""
echo "Step 3: Sample of AI mentions to be cleaned:"
git log --all --format=%B | grep -iE "claude|generated with.*claude code|co-authored.*claude|🤖" | head -10
echo "  ... (showing first 10 occurrences)"

# Step 4: Confirm cleanup
echo ""
echo "========================================="
echo "WARNING: This will rewrite ENTIRE git history!"
echo "========================================="
echo ""
echo "This operation will:"
echo "  - Rewrite all $TOTAL_COMMITS commits"
echo "  - Remove all $AI_MENTIONS AI mention occurrences"
echo "  - Modify commit SHAs (breaking git history)"
echo "  - Require force push to remote"
echo "  - Require team coordination for local repo updates"
echo ""
read -p "Are you absolutely sure you want to proceed? (yes/NO): " -r
echo
if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "Cleanup cancelled. Backup branch preserved."
    exit 0
fi

# Step 5: Run git filter-branch on ENTIRE history
echo ""
echo "Step 5: Cleaning commit messages (this may take several minutes)..."
echo "  Filtering all branches and commits..."

git filter-branch -f --msg-filter '
  sed -e "/🤖 Generated with \[Claude Code\]/d" \
      -e "/Generated with \[Claude Code\]/d" \
      -e "/Co-Authored-By: Claude/d" \
      -e "/Co-authored-by: Claude/d" \
      -e "/🤖.*Claude.*/d"
' --all

echo "  ✓ Git filter-branch completed"

# Step 6: Verify cleanup
echo ""
echo "Step 6: Verifying cleanup..."
REMAINING_MENTIONS=$(git log --all --format=%B | grep -icE "claude|generated with.*claude code|co-authored.*claude|🤖" || echo "0")

if [ "$REMAINING_MENTIONS" -eq 0 ]; then
    echo "  ✓ SUCCESS: All AI mentions removed from commit messages!"
else
    echo "  ⚠ WARNING: Found $REMAINING_MENTIONS remaining AI mentions"
    echo "  Sample:"
    git log --all --format=%B | grep -iE "claude|generated with.*claude code|co-authored.*claude|🤖" | head -5
fi

# Step 7: Show statistics
echo ""
echo "========================================="
echo "Cleanup Statistics"
echo "========================================="
echo "  Total commits processed: $TOTAL_COMMITS"
echo "  AI mentions before: $AI_MENTIONS"
echo "  AI mentions after: $REMAINING_MENTIONS"
echo "  AI mentions removed: $((AI_MENTIONS - REMAINING_MENTIONS))"
echo ""

# Step 8: Next steps guidance
echo "========================================="
echo "Next Steps"
echo "========================================="
echo ""
echo "1. Review Changes:"
echo "   git log --all | head -50"
echo ""
echo "2. If satisfied, force push to remote:"
echo "   git push origin --force --all"
echo "   git push origin --force --tags"
echo ""
echo "3. Notify ALL team members to update their local repos:"
echo "   git fetch origin"
echo "   git reset --hard origin/main"
echo ""
echo "4. If you need to rollback:"
echo "   git reset --hard backup-before-cleanup"
echo "   git push origin --force --all"
echo ""
echo "========================================="
echo "⚠  CRITICAL: Force push requires team coordination!"
echo "========================================="
echo ""
echo "Backup preserved in branch: backup-before-cleanup"
echo ""
