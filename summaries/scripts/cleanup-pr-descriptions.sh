#!/bin/bash
#
# PR Description Cleanup Script
#
# Cleans AI attribution mentions from ALL pull request descriptions
#

set -e

PROJECT_DIR="/Users/karsten/Nextcloud/Work/Development/intelligentcode-ai/intelligent-claude-code"
cd "$PROJECT_DIR"

echo "========================================="
echo "PR Description Cleanup"
echo "========================================="
echo ""

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "ERROR: GitHub CLI (gh) not found"
    echo "Install: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "ERROR: Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi

# Step 1: Get all PRs
echo "Step 1: Fetching all PRs..."
TOTAL_PRS=$(gh pr list --state all --limit 1000 --json number | jq 'length')
echo "  Total PRs in repository: $TOTAL_PRS"

# Step 2: Identify PRs with AI mentions
echo ""
echo "Step 2: Scanning PR descriptions for AI mentions..."
echo "  (This may take a few minutes...)"

PR_LIST=$(gh pr list --state all --limit 1000 --json number,body | \
  jq -r '.[] | select(.body | test("Claude|Generated|Co-Authored|🤖")) | .number')

if [ -z "$PR_LIST" ]; then
    echo ""
    echo "✓ No AI mentions found in PR descriptions!"
    exit 0
fi

# Count PRs with AI mentions
PR_COUNT=$(echo "$PR_LIST" | wc -l | tr -d ' ')
echo "  PRs with AI mentions: $PR_COUNT"

# Show sample PRs
echo ""
echo "Sample PRs to be cleaned:"
echo "$PR_LIST" | head -10 | while read pr_num; do
    pr_title=$(gh pr view "$pr_num" --json title -q .title)
    echo "  PR #$pr_num: $pr_title"
done
if [ "$PR_COUNT" -gt 10 ]; then
    echo "  ... and $((PR_COUNT - 10)) more"
fi

# Step 3: Confirm cleanup
echo ""
echo "========================================="
echo "WARNING: This will modify $PR_COUNT PR descriptions!"
echo "========================================="
echo ""
read -p "Proceed with cleaning PR descriptions? (yes/NO): " -r
echo
if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "PR cleanup cancelled."
    exit 0
fi

# Step 4: Clean PR descriptions
echo ""
echo "Step 4: Cleaning PR descriptions..."
CLEANED=0
FAILED=0

echo "$PR_LIST" | while read pr_num; do
    echo "  Processing PR #$pr_num..."

    # Get current body
    CURRENT_BODY=$(gh pr view "$pr_num" --json body -q .body)

    # Clean AI mentions
    CLEAN_BODY=$(echo "$CURRENT_BODY" | sed \
        -e '/🤖 Generated with \[Claude Code\]/d' \
        -e '/Generated with \[Claude Code\]/d' \
        -e '/Co-Authored-By: Claude/d' \
        -e '/Co-authored-by: Claude/d' \
        -e '/🤖.*Claude.*/d')

    # Only update if body changed
    if [ "$CURRENT_BODY" != "$CLEAN_BODY" ]; then
        if gh pr edit "$pr_num" --body "$CLEAN_BODY" 2>/dev/null; then
            echo "    ✓ Cleaned PR #$pr_num"
            CLEANED=$((CLEANED + 1))
        else
            echo "    ✗ Failed to clean PR #$pr_num"
            FAILED=$((FAILED + 1))
        fi
    else
        echo "    - No changes needed for PR #$pr_num"
    fi
done

# Step 5: Summary
echo ""
echo "========================================="
echo "Cleanup Summary"
echo "========================================="
echo "  Total PRs scanned: $TOTAL_PRS"
echo "  PRs with AI mentions: $PR_COUNT"
echo "  PRs cleaned: $CLEANED"
echo "  PRs failed: $FAILED"
echo ""

if [ $FAILED -gt 0 ]; then
    echo "⚠ Some PRs failed to clean. Review manually."
else
    echo "✓ All PR descriptions cleaned successfully!"
fi
echo ""
