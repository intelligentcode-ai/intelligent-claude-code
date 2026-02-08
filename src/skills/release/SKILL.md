---
name: release
description: Activate when user asks to release, bump version, cut a release, merge to main, or tag a version. Handles version bumping (semver), CHANGELOG updates, PR merging, git tagging, and GitHub release creation.
---

# Release Skill

Handles the complete release workflow: version bump, CHANGELOG, merge, tag, and GitHub release.

## Auto-Merge vs Agent Merge

This skill does NOT require GitHub "auto-merge" (`gh pr merge --auto`).
When automation is enabled, the **agent performs the merge itself** (runs `gh pr merge`) once the merge gates pass.

## When to Use

- User asks to "release", "cut a release", "ship it"
- User asks to "bump version" (major/minor/patch)
- User asks to "merge to main" after PR approval
- User asks to "tag a version" or "create a release"

## Prerequisites

Before releasing:
1. All changes committed and pushed
2. PR created and reviewed (ICC Stage 3 receipt is the required review gate by default)
3. Tests passing
4. No blocking review findings

## Automation Controls (Skills-Level)

These controls are driven by workflow configuration (AgentTask `workflow.*` and `icc.workflow.json`):
- `workflow.auto_merge=true`: standing approval to merge PRs once gates pass
- `workflow.release_automation=true`: automate the mechanical release steps (tag + GitHub release creation)

Safety defaults:
- Never auto-merge to `main` unless the user explicitly requested a release workflow.
- Never publish a non-draft GitHub release without explicit user approval (draft releases are OK).

## Release Workflow

### Step 1: Verify Ready to Release

```bash
# Check PR status
gh pr status

# Verify PR is approved
gh pr view <PR-number> --json reviews

# Verify checks pass
gh pr checks <PR-number>

# Verify this is a release PR (base should be main)
gh pr view <PR-number> --json baseRefName --jq .baseRefName

# Verify reviewer Stage 3 receipt exists (ICC-REVIEW-RECEIPT) and matches current head SHA
PR=<PR-number>
HEAD_SHA=$(gh pr view "$PR" --json headRefOid --jq .headRefOid)
RECEIPT=$(gh pr view "$PR" --json comments --jq '.comments | map(select(.body | contains("ICC-REVIEW-RECEIPT"))) | last | .body // ""')
echo "$RECEIPT" | rg -q "Reviewer-Stage: 3 \\(temp checkout\\)"
echo "$RECEIPT" | rg -q "Head-SHA: $HEAD_SHA"
echo "$RECEIPT" | rg -q "Result: PASS"
```

### Step 2: Determine Version Bump

Ask user if not specified:

| Type | When | Example |
|------|------|---------|
| `major` | Breaking changes | 1.0.0 → 2.0.0 |
| `minor` | New features, backward compatible | 1.0.0 → 1.1.0 |
| `patch` | Bug fixes, no new features | 1.0.0 → 1.0.1 |

### Step 3: Update VERSION File

```bash
# Read current version
CURRENT=$(cat src/VERSION 2>/dev/null || cat VERSION 2>/dev/null || echo "0.0.0")

# Calculate new version based on bump type
# For patch: increment last number
# For minor: increment middle, reset last to 0
# For major: increment first, reset others to 0
```

### Step 4: Update CHANGELOG

Add new section at top of CHANGELOG.md:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing features

### Fixed
- Bug fixes

### Removed
- Removed features
```

Derive changes from:
```bash
git log --oneline $(git describe --tags --abbrev=0 2>/dev/null || echo "HEAD~10")..HEAD
```

### Step 5: Commit Version Bump

```bash
git add VERSION src/VERSION CHANGELOG.md
git commit -m "chore: Bump version to X.Y.Z"
git push
```

### Step 6: Merge PR

```bash
# Merge gate (required):
# - Reviewer Stage 3 receipt exists and matches head SHA (ICC-REVIEW-RECEIPT)
# - All checks passing
# - User explicitly approved the release/merge
#
# Only then merge the PR (squash or merge based on project preference)
gh pr merge <PR-number> --squash --delete-branch
```

Or if merge commit preferred:
```bash
gh pr merge <PR-number> --merge --delete-branch
```

### Step 7: Create Git Tag

```bash
# Checkout main after merge
git checkout main
git pull origin main

# Create annotated tag
git tag -a "vX.Y.Z" -m "Release vX.Y.Z"
git push origin "vX.Y.Z"
```

### Step 8: Create GitHub Release (if using GitHub)

```bash
# Default: create DRAFT release (safe). Publish only if user explicitly requests.
gh release create "vX.Y.Z" \
  --draft \
  --title "vX.Y.Z" \
  --notes "$(cat <<'EOF'
## What's Changed

### Added
- Feature 1
- Feature 2

### Fixed
- Bug fix 1

**Full Changelog**: https://github.com/OWNER/REPO/compare/vPREV...vX.Y.Z
EOF
)"
```

Or generate notes automatically:
```bash
gh release create "vX.Y.Z" --generate-notes
```

## Version File Locations

Check for VERSION in order:
1. `src/VERSION`
2. `VERSION`
3. `package.json` (for Node projects)
4. `pyproject.toml` (for Python projects)

## CHANGELOG Format

Follow [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [X.Y.Z] - YYYY-MM-DD

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
```

## Safety Checks

Before any release action:
1. Confirm user approval for merge
2. Verify on correct branch
3. Check no uncommitted changes
4. Verify PR checks pass

## Integration

Works with:
- commit-pr skill - For version bump commit
- git-privacy skill - No AI attribution in release notes
- branch-protection skill - Respect branch rules
- reviewer skill - Verify no blocking findings

## Examples

### Patch Release
```
User: "Release a patch for the bug fixes"
→ Bump 1.2.3 → 1.2.4
→ Update CHANGELOG
→ Commit, merge, tag, release
```

### Minor Release
```
User: "Cut a minor release with the new features"
→ Bump 1.2.3 → 1.3.0
→ Update CHANGELOG
→ Commit, merge, tag, release
```

### Major Release
```
User: "Major release - we have breaking changes"
→ Bump 1.2.3 → 2.0.0
→ Update CHANGELOG (note breaking changes)
→ Commit, merge, tag, release
```

## Rollback

If release needs to be reverted:
```bash
# Delete the tag locally and remotely
git tag -d vX.Y.Z
git push origin :refs/tags/vX.Y.Z

# Delete the GitHub release
gh release delete vX.Y.Z --yes

# Revert the merge commit if needed
git revert <merge-commit-sha>
```
