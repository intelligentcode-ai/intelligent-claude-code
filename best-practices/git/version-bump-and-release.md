# Version Bump and GitHub Release Workflow

**Status**: Best Practice (promoted from memory after 2+ successful uses)
**Category**: Git Operations
**Applies To**: All AgentTask sizes requiring version management
**Keywords**: version, release, gh cli, changelog, git tag

## Date: 2025-10-28

## Context
Performed version bump from 8.20.32 to 8.20.33 with CHANGELOG update, git tagging, and GitHub release creation using gh CLI with credentials from ~/.config/git/common.conf.

## Problem
Need to bump version, update changelog, create git tag, push changes, and publish GitHub release while respecting:
- Branch protection (no direct commits to main)
- Git privacy settings (no AI attribution in commits)
- GitHub authentication via personal access token

## Solution

### Workflow Steps
1. **Create Feature Branch**: `git checkout -b release/v8.20.33`
2. **Update VERSION File**: Change version number
3. **Update CHANGELOG.md**: Add new release entry at top
4. **Commit Changes**: `git commit -m "chore: bump version to 8.20.33"` (no AI attribution due to git_privacy)
5. **Create Git Tag**: `git tag -a v8.20.33 -m "Release v8.20.33"`
6. **Push Branch**: `git push -u origin release/v8.20.33`
7. **Push Tag**: `git push origin v8.20.33`
8. **Create GitHub Release**: Use gh CLI with credentials
9. **Create Pull Request**: Merge release branch to main

### GitHub Credentials Setup
**Location**: ~/.config/git/common.conf
**Token Variable**: GITHUB_PAT
**Usage Pattern**:
```bash
source ~/.config/git/common.conf && export GITHUB_TOKEN=$GITHUB_PAT && /opt/homebrew/bin/gh [command]
```

### gh CLI Commands
**Create Release**:
```bash
gh release create v8.20.33 --title "v8.20.33" --notes "[release notes]"
```

**Create Pull Request**:
```bash
gh pr create --title "chore: release v8.20.33" --body "[PR description]"
```

## Key Learnings
1. **Branch Protection**: Requires feature branch workflow, cannot commit directly to main
2. **Git Privacy**: Must omit AI attribution (Co-Authored-By: Claude) when git_privacy=true
3. **Credentials**: Source ~/.config/git/common.conf and export GITHUB_TOKEN=$GITHUB_PAT for gh CLI
4. **Tag Timing**: Create and push tag on feature branch before merging to main
5. **Release Timing**: Can create GitHub release on tag before PR merge
6. **gh CLI Path**: Full path /opt/homebrew/bin/gh required for reliable execution

## Results
- VERSION: 8.20.32 → 8.20.33
- CHANGELOG: Updated with v8.20.33 entry
- Git Tag: v8.20.33 created and pushed
- GitHub Release: Published at https://github.com/intelligentcode-ai/intelligent-claude-code/releases/tag/v8.20.33
- Pull Request: Created at https://github.com/intelligentcode-ai/intelligent-claude-code/pull/223

## Reusable Pattern
This workflow can be reused for any version bump by:
1. Creating release/vX.Y.Z branch
2. Updating VERSION and CHANGELOG.md
3. Committing without AI attribution
4. Creating and pushing tag
5. Using gh CLI with sourced credentials for release and PR
