# Release Workflow Automation

## Overview

Automate the "PR → Merge → Tag → Release → Cleanup" workflow through configuration-driven pipeline execution with explicit trigger requirements.

### Problem
Manual release workflows are error-prone and time-consuming:
- Forgetting to create tags after merging
- Inconsistent release note generation
- Manual branch cleanup leading to repository clutter
- Version bumping mistakes
- Git privacy violations in release notes

### Solution
Configuration-driven release automation that:
- Executes complete pipeline from single trigger
- Respects project-specific workflows
- Maintains git privacy compliance
- Requires explicit approval (never fully automatic)
- Provides simple command interface

### Benefits
- **Efficiency**: Single command executes complete workflow
- **Consistency**: Same process every time, no missed steps
- **Error Reduction**: Automated validation and execution
- **Flexibility**: Configuration adapts to project needs
- **Safety**: Explicit trigger prevents accidental releases

## Implementation Options

Release automation is implemented AT THE PROJECT LEVEL, not in the system. Choose the approach that fits your workflow:

### Option 1: Shell Script (Simplest)

Create `scripts/release.sh`:

```bash
#!/bin/bash
# Release automation script

set -e  # Exit on error

PR_NUMBER=$(gh pr view --json number -q .number)
VERSION=$(cat VERSION)

echo "🚀 Releasing v${VERSION} from PR #${PR_NUMBER}"

# Validate
echo "→ Validating prerequisites..."
gh pr checks ${PR_NUMBER} --watch
git diff-index --quiet HEAD || (echo "Uncommitted changes!" && exit 1)

# Merge
echo "→ Merging PR..."
gh pr merge ${PR_NUMBER} --squash --delete-branch

# Tag
echo "→ Creating tag..."
git pull
git tag -a "v${VERSION}" -m "v${VERSION}"
git push origin "v${VERSION}"

# Release
echo "→ Creating GitHub release..."
CHANGELOG=$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '1d;$d')
gh release create "v${VERSION}" --title "v${VERSION}" --notes "${CHANGELOG}"

echo "✅ Release v${VERSION} complete"
```

Usage: `./scripts/release.sh`

### Option 2: Makefile Target

Add to your project's `Makefile`:

```makefile
.PHONY: release
release:
	@echo "🚀 Starting release process..."
	@./scripts/release.sh
```

Usage: `make release`

### Option 3: Custom Command

Create `.claude/commands/release.md`:

```markdown
You are @PM coordinating a release.

## Task
Execute the release workflow for the current PR.

## Steps
1. Validate PR is approved and checks pass
2. Create AgentTask for @DevOps-Engineer:
   - Merge PR with squash strategy
   - Create and push annotated tag
   - Generate GitHub release from changelog
   - Delete feature branch

Report completion status.
```

Usage: `/release` in Claude Code

### Option 4: Natural Language (Recommended)

Just ask: `@PM merge and release`

PM creates AgentTask for @DevOps-Engineer who executes the workflow.

## Design Principles

### 1. Configuration Over Code
Release workflows defined in configuration files, not hardcoded logic. Projects customize behavior without modifying system code.

### 2. Explicit Trigger Required
**NEVER automatic** - all releases require explicit trigger:
- User command: `@PM merge and release`
- Natural language: `@DevOps-Engineer execute release pipeline`
- Workflow command: `/icc-release`

### 3. Flexibility for Project Types
Support different release strategies:
- **Continuous Deployment**: Auto-merge trivial changes
- **Manual Approval**: Every release needs review
- **Semantic Release**: Version and notes from commits
- **Documentation Projects**: Skip releases for docs-only

### 4. Git Privacy Integration
All release artifacts (tags, release notes, commits) comply with git privacy settings automatically.

## Implementation Patterns

### Shell Script Pattern

The simplest approach is a bash script that handles the complete workflow:

```bash
#!/bin/bash
# scripts/release.sh - Complete release automation

set -e  # Exit on error

# Configuration
MERGE_STRATEGY="squash"
TAG_FORMAT="v{version}"
REQUIRE_APPROVAL=true

# Get current state
PR_NUMBER=$(gh pr view --json number -q .number)
VERSION=$(cat VERSION)
TAG_NAME="${TAG_FORMAT/\{version\}/$VERSION}"

echo "🚀 Release Pipeline: v${VERSION} (PR #${PR_NUMBER})"

# Validation
echo "→ Step 1/5: Validation"
if [ "$REQUIRE_APPROVAL" = true ]; then
  gh pr view ${PR_NUMBER} --json reviewDecision -q .reviewDecision | grep -q "APPROVED" || {
    echo "❌ PR not approved"
    exit 1
  }
fi
gh pr checks ${PR_NUMBER} --watch || exit 1
git diff-index --quiet HEAD || { echo "❌ Uncommitted changes"; exit 1; }

# Merge
echo "→ Step 2/5: Merge"
gh pr merge ${PR_NUMBER} --${MERGE_STRATEGY} --delete-branch

# Tag
echo "→ Step 3/5: Tag"
git pull
git tag -a "${TAG_NAME}" -m "Release ${TAG_NAME}"
git push origin "${TAG_NAME}"

# Release
echo "→ Step 4/5: GitHub Release"
CHANGELOG=$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '1d;$d')
gh release create "${TAG_NAME}" --title "${TAG_NAME}" --notes "${CHANGELOG}"

# Verification
echo "→ Step 5/5: Verification"
gh release view "${TAG_NAME}" --json url -q .url

echo "✅ Release complete: ${TAG_NAME}"
```

### Makefile Pattern

Integrate release automation into your project's Makefile:

```makefile
# Makefile - Release automation

.PHONY: release release-dry-run release-draft

# Current version from VERSION file
VERSION := $(shell cat VERSION)
TAG := v$(VERSION)

release: ## Execute full release pipeline
	@echo "🚀 Starting release for $(TAG)..."
	@./scripts/release.sh

release-dry-run: ## Test release pipeline without execution
	@echo "🧪 Dry run for $(TAG)..."
	@PR=$$(gh pr view --json number -q .number); \
	echo "Would merge PR #$$PR"; \
	echo "Would create tag $(TAG)"; \
	echo "Would create release $(TAG)"

release-draft: ## Create draft release for review
	@echo "📝 Creating draft release $(TAG)..."
	@gh release create "$(TAG)" --draft --title "$(TAG)" \
	  --notes "$$(sed -n "/## \[$(VERSION)\]/,/## \[/p" CHANGELOG.md | sed '1d;$$d')"

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	  awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
```

### Custom Command Pattern

Create a project-specific release command:

```markdown
# .claude/commands/release.md

You are @PM coordinating a software release.

## Context
- **Project**: {project_name}
- **Current Branch**: {current_branch}
- **Version**: {version from VERSION file}

## Task
Execute the complete release workflow for the current PR.

## Workflow Steps

### 1. Pre-Release Validation
Create AgentTask for @QA-Engineer:
- Verify PR is approved
- Confirm all CI checks passing
- Validate version bumped correctly
- Check CHANGELOG.md updated

### 2. Merge and Tag
Create AgentTask for @DevOps-Engineer:
- Merge PR using squash strategy
- Create annotated tag: v{version}
- Push tag to remote repository
- Delete feature branch

### 3. GitHub Release
Create AgentTask for @DevOps-Engineer:
- Extract changelog section for version
- Create GitHub release with changelog
- Attach any release artifacts
- Verify release published

### 4. Post-Release
Create AgentTask for @PM:
- Update project documentation
- Notify team of release
- Close related issues
- Update project board

## Success Criteria
- PR merged to main branch
- Tag created and pushed: v{version}
- GitHub release published
- Feature branch deleted
- Team notified

Report completion status with release URL.
```

### Natural Language Pattern (Recommended)

The most flexible approach uses natural language with the virtual team:

```bash
# Simple release
@PM merge and release

# With specific PR
@PM merge PR #42 and create release

# Draft release for review
@PM create draft release for current PR

# Specific workflow steps
@DevOps-Engineer merge PR, create tag, and publish release
```

PM analyzes the request, creates appropriate AgentTasks for @DevOps-Engineer, and orchestrates the complete workflow.

## Usage Examples

### Shell Script Usage

```bash
# Execute complete release pipeline
./scripts/release.sh

# Dry run to test (add to script as option)
DRY_RUN=true ./scripts/release.sh

# With specific PR (modify script to accept arguments)
./scripts/release.sh 42
```

### Makefile Usage

```bash
# Standard release
make release

# Test without execution
make release-dry-run

# Create draft for review
make release-draft

# Show available targets
make help
```

### Natural Language Usage (Recommended)

```bash
# Simple release trigger
@PM merge and release

# Specific PR
@PM merge PR #42 and create release

# Draft release for review
@PM create draft release for current PR

# Direct assignment
@DevOps-Engineer execute release pipeline
```

## How It Works

### AgentTask-Based Execution

When you request a release, PM creates an AgentTask for @DevOps-Engineer:

```markdown
## AgentTask Context
**Type**: Release Pipeline Execution
**Agent**: @DevOps-Engineer
**Trigger**: User request "@PM merge and release"

## Pipeline Steps
1. Validation (PR approved, checks passing)
2. Merge (using project's release script)
3. Tag (create and push annotated tag)
4. Release (GitHub release with changelog)
5. Cleanup (delete feature branches)

## Project Implementation
The project provides release automation via:
- Shell script: scripts/release.sh
- Make target: make release
- Custom command: /release
- Or natural language: "@PM merge and release"

## Success Criteria
- PR merged to default branch
- Tag created and pushed
- GitHub release published
- Branches cleaned up
- All steps follow project standards
```

### Sequential Pipeline Execution

Pipeline executes steps sequentially with validation at each stage:

```
1. PRE-VALIDATION
   ☐ PR exists and is approved
   ☐ All checks passing
   ☐ Version bumped correctly
   ☐ CHANGELOG updated (if required)
   ☐ No merge conflicts

2. MERGE
   ☐ Checkout default branch
   ☐ Merge with configured strategy
   ☐ Push to remote
   ☐ Verify merge successful

3. TAG
   ☐ Generate tag name from version
   ☐ Create annotated tag
   ☐ Push tag to remote
   ☐ Verify tag created

4. RELEASE
   ☐ Generate release notes
   ☐ Create GitHub release
   ☐ Attach artifacts (if configured)
   ☐ Verify release published

5. CLEANUP
   ☐ Delete local feature branch
   ☐ Delete remote feature branch
   ☐ Verify cleanup complete

6. POST-VALIDATION
   ☐ Default branch updated
   ☐ Tag exists on remote
   ☐ Release visible on GitHub
   ☐ Branches removed
```

## Pipeline Steps Detailed

### 1. Pre-Execution Validation

**Validation Checks:**
- PR exists and is in mergeable state
- PR approved (if `require_pr_approved: true`)
- All status checks passing (if `require_checks_passing: true`)
- Version bumped (if `require_version_bump: true`)
- CHANGELOG updated (based on workflow settings)
- No merge conflicts with target branch
- Branch protection rules satisfied

**Failure Handling:**
- Block pipeline execution
- Report specific validation failures
- Provide remediation guidance
- Exit with error status

### 2. Merge Execution

**Merge Strategies:**

#### Squash Merge
```bash
git checkout main
git merge --squash feature/user-auth
git commit -m "feat: user authentication system"
git push origin main
```

Benefits: Clean history, single commit per feature

#### Merge Commit
```bash
git checkout main
git merge --no-ff feature/user-auth
git push origin main
```

Benefits: Preserves feature branch history

#### Rebase Merge
```bash
git checkout feature/user-auth
git rebase main
git checkout main
git merge --ff-only feature/user-auth
git push origin main
```

Benefits: Linear history, preserves individual commits

**Git Privacy Integration:**
All merge commits processed through git privacy enforcement to strip AI mentions.

### 3. Tag Creation

**Tag Creation with Format:**
```bash
# scripts/release.sh - Tag creation section
VERSION=$(cat VERSION)
TAG_FORMAT="v{version}"  # Configure in script
TAG_NAME="${TAG_FORMAT/\{version\}/$VERSION}"

# Create annotated tag with release notes
git tag -a ${TAG_NAME} -m "Release ${TAG_NAME}

feat: release workflow automation
- Project-level shell scripts
- Simple command interface
- Git privacy integration

Full release notes: https://github.com/org/repo/releases/${TAG_NAME}"

# Push to remote
git push origin ${TAG_NAME}
```

**Git Privacy in Tags:**
Tag messages processed through privacy enforcement before creation.

### 4. GitHub Release Creation

**Release Note Generation:**

```bash
# scripts/release.sh - GitHub release creation section
PR_NUMBER=$(gh pr view --json number -q .number)
VERSION=$(cat VERSION)

# Extract release notes from CHANGELOG
RELEASE_NOTES=$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '1d;$d')

# Or auto-generate from PR (git privacy hooks apply)
# RELEASE_NOTES=$(gh pr view ${PR_NUMBER} --json body -q .body)

# Create release (privacy enforced by git hooks if configured)
gh release create "v${VERSION}" \
  --title "Release v${VERSION}" \
  --notes "${RELEASE_NOTES}" \
  --target main
```

**GitHub Release Options:**
```bash
# Create draft release for manual review
gh release create "v${VERSION}" --draft --notes "${NOTES}"

# Create pre-release for testing versions
gh release create "v${VERSION}" --prerelease --notes "${NOTES}"

# Auto-generate notes from commits
gh release create "v${VERSION}" --generate-notes

# Attach build artifacts
gh release create "v${VERSION}" --notes "${NOTES}" dist/*.tar.gz
```

### 5. Branch Cleanup

**Local Branch Deletion:**
```bash
git branch -d feature/user-auth
```

**Remote Branch Deletion:**
```bash
git push origin --delete feature/user-auth
```

**Safety Checks:**
- Verify branch merged before deletion
- Confirm tag created before cleanup
- Skip deletion if configured off

### 6. Post-Execution Verification

**Verification Checks:**
- Default branch shows merge commit
- Tag exists on remote repository
- GitHub release visible and published
- Feature branches removed (local and remote)
- Git privacy compliance throughout

**Failure Recovery:**
- Log specific verification failures
- Provide manual remediation steps
- Do not rollback completed steps
- Create follow-up AgentTask for fixes

## Error Handling

### Pre-Execution Validation Failures

**PR Not Approved:**
```
❌ VALIDATION FAILED: PR #42 not approved

Required approvals: 1
Current approvals: 0

ACTION: Request review from configured reviewer
COMMAND: gh pr review 42 --approve
```

**Checks Not Passing:**
```
❌ VALIDATION FAILED: Status checks failing

Failed checks:
- CI/CD Pipeline: failing
- Security Scan: failing

ACTION: Fix check failures before release
```

**Version Not Bumped:**
```
❌ VALIDATION FAILED: Version not bumped

Current version: 8.18.9
Required: 8.19.0 (minor) or 8.18.10 (patch)

ACTION: Bump version before release
COMMAND: make version-bump-minor
```

### Mid-Pipeline Error Recovery

**Merge Conflict:**
```
❌ MERGE FAILED: Conflict in src/config.ts

ACTION: Resolve conflicts manually
1. git checkout feature/user-auth
2. git rebase main
3. Resolve conflicts
4. git rebase --continue
5. Retry release pipeline
```

**Tag Creation Failure:**
```
❌ TAG FAILED: Tag v8.18.9 already exists

ACTION: Delete existing tag or bump version
COMMAND: git tag -d v8.18.9 && git push origin :v8.18.9
```

**Release Creation Failure:**
```
❌ RELEASE FAILED: GitHub API error

Error: API rate limit exceeded

ACTION: Wait for rate limit reset or use PAT with higher limits
```

### Post-Pipeline Issues

**Branch Deletion Blocked:**
```
⚠️  CLEANUP WARNING: Cannot delete remote branch

Remote branch 'feature/user-auth' protected

ACTION: Manually delete through GitHub UI or update protection rules
```

## Security Considerations

### Git Privacy Integration

**Automatic Privacy Enforcement:**
All release artifacts processed through git privacy enforcement:

```bash
# Git privacy hooks automatically enforce pattern stripping
# No manual intervention needed in scripts

# Example: Merge commit (privacy enforced by prepare-commit-msg hook)
git commit -m "feat: add user authentication

This feature was developed using Claude Code assistance."
# Hook strips: "using Claude Code assistance" if git.privacy enabled

# Example: Tag annotation (privacy enforced if using git hooks)
git tag -a v8.18.9 -m "Release v8.18.9

Generated with Claude Code"
# Hook strips: "Generated with Claude Code" if configured

# Example: GitHub release notes (git hooks don't apply)
# Project scripts should strip manually if needed
NOTES=$(gh pr view --json body -q .body | sed 's/Generated with Claude Code//g')
```

**Privacy Patterns Automatically Stripped by Git Hooks:**
- AI mentions
- Claude references
- Agent keywords
- "Generated with Claude Code" footers
- "Co-Authored-By: Claude" trailers

### Approval Requirements

**Never Auto-Release Without Approval:**
- `require_pr_approved: true` (default)
- `require_approval: true` in merge settings
- Manual trigger required (no automatic execution)

**Approval Workflow:**
1. PR created and reviewed
2. Reviewer approves PR
3. User explicitly triggers release
4. Pipeline validates approval before execution

### Audit Trail

**Release Tracking:**
Every release pipeline execution logged with:
- Trigger source (user, command, natural language)
- Configuration used
- Steps executed
- Validation results
- Git operations performed
- Success/failure status

**Audit Log Format:**
```json
{
  "timestamp": "2025-10-12T14:30:00Z",
  "trigger": "@PM merge and release",
  "pr_number": 42,
  "configuration": {
    "merge_strategy": "squash",
    "tag_format": "v{version}",
    "release_enabled": true
  },
  "steps": {
    "validation": "passed",
    "merge": "success",
    "tag": "success",
    "release": "success",
    "cleanup": "success"
  },
  "git_privacy": "enforced",
  "result": "success"
}
```

## Example Workflows

### Bug Fix Release (Patch)

**Scenario:** Fix critical authentication bug

**Project Setup:**
```bash
# scripts/release.sh configured with:
MERGE_STRATEGY="squash"
REQUIRE_APPROVAL=true
TAG_FORMAT="v{version}"
```

**Execution:**
```bash
# 1. User request
@PM merge PR #45 and release patch

# 2. PM creates AgentTask for @DevOps-Engineer

# 3. @DevOps-Engineer validates
- PR #45 approved ✓
- Checks passing ✓
- Version bumped: 8.18.9 → 8.18.10 ✓

# 4. @DevOps-Engineer executes scripts/release.sh
- Merge: squash merge to main ✓
- Tag: v8.18.10 created and pushed ✓
- Release: GitHub release with changelog ✓
- Cleanup: feature branch deleted ✓

# 5. Result
✅ Release v8.18.10 published
```

### Feature Release (Minor)

**Scenario:** Add new user authentication system

**Project Setup:**
```makefile
# Makefile with release automation
.PHONY: release
release:
	@./scripts/release.sh
```

**Execution:**
```bash
# 1. User request
@PM merge and release feature/user-auth

# 2. PM creates AgentTask for @DevOps-Engineer

# 3. @DevOps-Engineer validates
- PR #42 approved ✓
- All checks passing ✓
- Version bumped: 8.18.10 → 8.19.0 ✓
- CHANGELOG updated ✓

# 4. @DevOps-Engineer runs: make release
- Merge: squash merge to main ✓
- Tag: v8.19.0 created and pushed ✓
- Release: Changelog notes extracted ✓
- Cleanup: local and remote branches deleted ✓

# 5. Result
✅ Release v8.19.0 published
📝 Release notes from CHANGELOG.md
```

### Documentation Update (No Release)

**Scenario:** Update README with new instructions

**Project Decision:**
Documentation updates don't trigger releases.

**Execution:**
```bash
# 1. Direct commit to main
@Developer update README with new installation steps

# 2. @Developer commits directly
git add README.md
git commit -m "docs: update installation instructions"
git push origin main

# 3. No release needed
- Documentation-only change
- No version bump required
- No release created

# 4. Result
✅ Documentation updated, no release created
```

## Project Variations

### Semantic Release Style

**Implementation:**
```bash
#!/bin/bash
# scripts/release.sh - Semantic versioning with conventional commits

# Auto-detect version from commits
CURRENT_VERSION=$(cat VERSION)
COMMITS=$(git log --pretty=format:"%s" $(git describe --tags --abbrev=0)..HEAD)

# Determine bump type from commits
if echo "$COMMITS" | grep -q "^feat!:"; then
  VERSION_TYPE="major"
elif echo "$COMMITS" | grep -q "^feat:"; then
  VERSION_TYPE="minor"
else
  VERSION_TYPE="patch"
fi

# Bump version
NEW_VERSION=$(semver bump $VERSION_TYPE $CURRENT_VERSION)
echo $NEW_VERSION > VERSION

# Generate notes from conventional commits
gh pr merge --squash --delete-branch
gh release create "v${NEW_VERSION}" --generate-notes
```

**Characteristics:**
- Version determined from commit messages
- Release notes from conventional commits
- Automated semantic versioning
- Fast iteration cycles

### Manual Approval Style

**Implementation:**
```bash
#!/bin/bash
# scripts/release.sh - Manual approval with draft releases

PR_NUMBER=$(gh pr view --json number -q .number)
VERSION=$(cat VERSION)

# Validate approval
gh pr view ${PR_NUMBER} --json reviewDecision -q .reviewDecision | grep -q "APPROVED" || {
  echo "❌ PR requires approval before release"
  exit 1
}

# Merge
gh pr merge ${PR_NUMBER} --squash --delete-branch

# Create DRAFT release for manual review
gh release create "v${VERSION}" --draft --title "v${VERSION}" \
  --notes "$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '1d;$d')"

echo "📝 Draft release created - review and publish manually"
```

**Characteristics:**
- PR approval required before merge
- Releases created as drafts
- Manual review before publishing
- Explicit publish step required

### Continuous Deployment Style

**Implementation:**
```bash
#!/bin/bash
# scripts/release.sh - Fast iteration with pre-releases

VERSION=$(cat VERSION)
PR_NUMBER=$(gh pr view --json number -q .number)

# Merge immediately (for internal/dev releases)
gh pr merge ${PR_NUMBER} --squash --delete-branch

# Create pre-release tag
gh release create "v${VERSION}" --prerelease \
  --title "v${VERSION} (Pre-release)" \
  --notes "$(gh pr view ${PR_NUMBER} --json body -q .body)"

echo "🚀 Pre-release v${VERSION} deployed"
```

**Characteristics:**
- Fast merge and release cycle
- Pre-release tags for testing
- Minimal approval gates for development
- Production releases use different script

## Integration Points

### Virtual Team Integration

Release automation integrates with the virtual team system:

**Work Classification:**
- **Simple Releases**: @DevOps-Engineer executes directly via scripts/release.sh
- **Complex Releases**: @PM coordinates multi-step workflow
- **Emergency Hotfixes**: Fast-track with minimal gates
- **Major Releases**: Full coordination with breaking change assessment

**Role Responsibilities:**
- **@PM**: Orchestrates release process, validates readiness
- **@DevOps-Engineer**: Executes release scripts, handles git operations
- **@QA-Engineer**: Validates release readiness, confirms tests pass
- **@Architect**: Reviews breaking changes for major releases

### Git Privacy Integration

**Automatic Privacy Enforcement:**
Release scripts can integrate with git privacy hooks:

```bash
#!/bin/bash
# scripts/release.sh - With privacy enforcement

# Extract changelog and strip AI mentions if git.privacy enabled
if git config --get-regexp 'hooks.git-privacy' > /dev/null; then
  # Git privacy hook will automatically strip patterns
  NOTES=$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '1d;$d')
else
  NOTES=$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '1d;$d')
fi

# Create release (privacy enforced by git hooks)
gh release create "v${VERSION}" --title "v${VERSION}" --notes "${NOTES}"
```

**Privacy Validation:**
Git privacy hooks automatically process:
- Merge commit messages
- Tag annotations
- Release notes (if generated from commits)
- All git operations

### Script Validation Patterns

**Pre-Release Validation:**
```bash
#!/bin/bash
# scripts/validate-release.sh - Pre-release validation

validate_pr_approval() {
  gh pr view ${PR_NUMBER} --json reviewDecision -q .reviewDecision | grep -q "APPROVED"
}

validate_checks_passing() {
  gh pr checks ${PR_NUMBER} | grep -q "All checks have passed"
}

validate_version_bump() {
  git diff main...HEAD VERSION | grep -q "^+[0-9]"
}

validate_changelog() {
  grep -q "## \[$(cat VERSION)\]" CHANGELOG.md
}

# Run all validations
echo "→ Validating release prerequisites..."
validate_pr_approval || { echo "❌ PR not approved"; exit 1; }
validate_checks_passing || { echo "❌ Checks failing"; exit 1; }
validate_version_bump || { echo "❌ Version not bumped"; exit 1; }
validate_changelog || { echo "❌ CHANGELOG not updated"; exit 1; }

echo "✅ All validations passed"
```

**Post-Release Actions:**
```bash
#!/bin/bash
# scripts/post-release.sh - Post-release actions

VERSION=$(cat VERSION)

# Update documentation badges
sed -i "s/version-[0-9.]*/version-${VERSION}/" README.md

# Notify team (optional)
if [ -n "$SLACK_WEBHOOK" ]; then
  curl -X POST "$SLACK_WEBHOOK" -d "{\"text\":\"Release v${VERSION} published\"}"
fi

# Log release
echo "$(date): v${VERSION}" >> releases.log
```

## Recommendations

### DO

✅ **Use Shell Scripts**
Simple, testable, version-controlled automation

✅ **Require Explicit Triggers**
Never auto-release without user approval

✅ **Validate Before Execution**
Pre-execution validation prevents mid-pipeline failures

✅ **Integrate with Git Hooks**
Leverage existing git privacy enforcement

✅ **Support Dry-Run Mode**
Test pipeline without execution

✅ **Log Everything**
Comprehensive audit trail in releases.log

✅ **Document Your Workflow**
Clear README section explaining release process

✅ **Use Natural Language**
`@PM merge and release` is clearer than commands

### DON'T

❌ **Don't Hardcode Credentials**
Use environment variables or gh auth

❌ **Don't Auto-Release**
Always require explicit trigger

❌ **Don't Skip Validation**
Pre-execution checks prevent errors

❌ **Don't Ignore Git Privacy**
Respect git.privacy configuration

❌ **Don't Over-Complicate**
Start simple, add features as needed

❌ **Don't Silent Fail**
Clear error messages and recovery steps

❌ **Don't Skip Cleanup**
Always clean up branches after release

❌ **Don't Commit Secrets**
Validate artifacts before release

## Success Metrics

**Efficiency Gains:**
- Release time reduced from 15+ minutes to 2 minutes
- Zero missed release steps (automated workflow)
- Consistent release quality across all releases

**Error Reduction:**
- Zero git privacy violations (hook enforcement)
- Zero tag creation mistakes (validated scripts)
- Zero branch cleanup failures (automated)

**Flexibility:**
- Multiple implementation patterns available
- Projects choose approach that fits workflow
- Easy to customize and extend scripts

**Safety:**
- Explicit trigger required for all releases
- Pre-execution validation prevents errors
- Comprehensive logging in releases.log
