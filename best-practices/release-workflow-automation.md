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

## Configuration Schema

### Primary Configuration (icc.config.json)

```json
{
  "release": {
    "enabled": true,
    "pipeline": {
      "merge": {
        "strategy": "squash",
        "delete_branch": true,
        "require_approval": true
      },
      "tag": {
        "enabled": true,
        "format": "v{version}",
        "push": true,
        "annotated": true
      },
      "github_release": {
        "enabled": true,
        "generate_notes": true,
        "draft": false,
        "prerelease": false
      },
      "cleanup": {
        "delete_local_branch": true,
        "delete_remote_branch": true
      }
    },
    "trivial_changes": {
      "auto_release": false,
      "patterns": ["docs/**", "*.md"]
    },
    "validation": {
      "require_pr_approved": true,
      "require_checks_passing": true,
      "require_version_bump": true
    }
  }
}
```

### Configuration Hierarchy
1. **Embedded config** (in AgentTasks) - highest priority
2. **Project config** (./icc.config.json or ./.claude/icc.config.json)
3. **User global** (~/.claude/icc.config.json)
4. **System defaults** (icc.config.default.json)

### Key Configuration Options

#### Merge Settings
- **strategy**: `squash`, `merge`, `rebase`
- **delete_branch**: Auto-delete feature branch after merge
- **require_approval**: Block merge without PR approval

#### Tag Settings
- **enabled**: Create git tags for releases
- **format**: Tag naming pattern (`v{version}`, `release-{version}`)
- **push**: Auto-push tags to remote
- **annotated**: Use annotated tags (recommended)

#### GitHub Release Settings
- **enabled**: Create GitHub releases
- **generate_notes**: Auto-generate from PR descriptions
- **draft**: Create as draft for manual review
- **prerelease**: Mark as pre-release

#### Cleanup Settings
- **delete_local_branch**: Remove local feature branch
- **delete_remote_branch**: Remove remote feature branch

## Command Interface

### Natural Language Triggers

```bash
# Simple trigger - executes complete pipeline
@PM merge and release

# Specific pipeline control
@DevOps-Engineer execute release pipeline for PR #42

# With options
@PM merge PR #42 and create release with generated notes
```

### Workflow Command

```bash
# Execute release pipeline
/icc-release [--pr PR_NUMBER] [--skip-tag] [--draft]

# Options:
# --pr: Specific PR to merge (default: current branch PR)
# --skip-tag: Skip tag creation
# --draft: Create draft release
# --no-cleanup: Skip branch cleanup
```

### Make Target

```bash
# Simple interface
make release

# With environment variables
PR_NUMBER=42 make release
SKIP_TAG=true make release
```

## Implementation Patterns

### AgentTask-Based Execution

Release pipeline executes through AgentTask system with @DevOps-Engineer:

```markdown
## AgentTask Context
**Type**: Release Pipeline Execution
**Agent**: @DevOps-Engineer
**Trigger**: User command "@PM merge and release"

## Pipeline Steps
1. Validation (PR approved, checks passing)
2. Merge (with configured strategy)
3. Tag (create and push annotated tag)
4. Release (GitHub release with notes)
5. Cleanup (delete branches)

## Configuration
{embedded release configuration from icc.config.json}

## Git Privacy
Strip patterns: {privacy_patterns from git.privacy_patterns}

## Success Criteria
- PR merged to default branch
- Tag created and pushed
- GitHub release published
- Branches cleaned up
- All steps comply with git privacy
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

**Tag Format Resolution:**
```javascript
// Format: "v{version}"
// Version: "8.18.9"
// Result: "v8.18.9"

const tagName = config.release.pipeline.tag.format
  .replace('{version}', currentVersion);
```

**Annotated Tag Creation:**
```bash
# Create annotated tag with release notes
git tag -a v8.18.9 -m "Release v8.18.9

feat: release workflow automation
- Configuration-driven pipeline
- Simple command interface
- Git privacy integration

Full release notes: https://github.com/org/repo/releases/v8.18.9"

# Push to remote
git push origin v8.18.9
```

**Git Privacy in Tags:**
Tag messages processed through privacy enforcement before creation.

### 4. GitHub Release Creation

**Release Note Generation:**

```javascript
// Auto-generate from PR descriptions
const releaseNotes = generateReleaseNotes({
  prNumber: pr.number,
  version: currentVersion,
  privacyPatterns: config.git.privacy_patterns
});

// Create release
gh release create v8.18.9 \
  --title "Release v8.18.9" \
  --notes "${releaseNotes}" \
  --target main
```

**Release Configuration:**
- **Draft**: Create as draft for manual review before publishing
- **Prerelease**: Mark as pre-release for testing versions
- **Generate Notes**: Auto-generate from PR/commit history
- **Assets**: Attach build artifacts if configured

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

```javascript
// Merge commits
const mergeMessage = stripPrivacyPatterns(
  prDescription,
  config.git.privacy_patterns
);

// Tag messages
const tagMessage = stripPrivacyPatterns(
  releaseNotes,
  config.git.privacy_patterns
);

// Release notes
const cleanReleaseNotes = stripPrivacyPatterns(
  generatedNotes,
  config.git.privacy_patterns
);
```

**Privacy Patterns Stripped:**
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

**Workflow Configuration:**
```json
{
  "workflow_settings": {
    "tiny": {
      "version_bump": true,
      "version_type": "patch",
      "changelog_required": true,
      "pr_required": false,
      "merge_strategy": "direct_commit"
    }
  }
}
```

**Execution:**
```bash
# 1. User request
@PM merge PR #45 and release patch

# 2. Pipeline validates
- PR #45 approved ✓
- Checks passing ✓
- Version bumped: 8.18.9 → 8.18.10 ✓

# 3. Pipeline executes
- Merge: squash merge to main ✓
- Tag: v8.18.10 created and pushed ✓
- Release: GitHub release with notes ✓
- Cleanup: feature branch deleted ✓

# 4. Result
✅ Release v8.18.10 published
```

### Feature Release (Minor)

**Scenario:** Add new user authentication system

**Workflow Configuration:**
```json
{
  "workflow_settings": {
    "medium": {
      "version_bump": true,
      "version_type": "minor",
      "changelog_required": true,
      "pr_required": true,
      "merge_strategy": "feature_branch",
      "release_automation": true
    }
  }
}
```

**Execution:**
```bash
# 1. User request
@PM merge and release feature/user-auth

# 2. Pipeline validates
- PR #42 approved ✓
- All checks passing ✓
- Version bumped: 8.18.10 → 8.19.0 ✓
- CHANGELOG updated ✓

# 3. Pipeline executes
- Merge: squash merge to main ✓
- Tag: v8.19.0 created and pushed ✓
- Release: Generated notes from PR ✓
- Cleanup: local and remote branches deleted ✓

# 4. Result
✅ Release v8.19.0 published
📝 Release notes auto-generated from PR #42
```

### Documentation Update (No Release)

**Scenario:** Update README with new instructions

**Workflow Configuration:**
```json
{
  "workflow_settings": {
    "nano": {
      "version_bump": false,
      "changelog_required": false,
      "pr_required": false,
      "merge_strategy": "direct_commit",
      "release_automation": false
    }
  },
  "release": {
    "trivial_changes": {
      "auto_release": false,
      "patterns": ["docs/**", "*.md", "README.md"]
    }
  }
}
```

**Execution:**
```bash
# 1. Commit directly to main
git add README.md
git commit -m "docs: update installation instructions"
git push origin main

# 2. No release pipeline triggered
- Nano-sized change (0 points)
- Documentation-only pattern matched
- release_automation: false

# 3. Result
✅ Documentation updated, no release created
```

## Project Variations

### Semantic Release Style

**Configuration:**
```json
{
  "release": {
    "enabled": true,
    "pipeline": {
      "merge": {
        "strategy": "squash",
        "require_approval": true
      },
      "tag": {
        "format": "v{version}",
        "annotated": true
      },
      "github_release": {
        "generate_notes": true,
        "commit_convention": "conventional"
      }
    },
    "version": {
      "auto_detect": true,
      "bump_from_commits": true
    }
  }
}
```

**Behavior:**
- Version automatically determined from commit messages
- Release notes generated from conventional commits
- Tags follow semantic versioning
- All releases automated after PR approval

### Manual Approval Style

**Configuration:**
```json
{
  "release": {
    "enabled": true,
    "pipeline": {
      "merge": {
        "require_approval": true
      },
      "github_release": {
        "draft": true
      }
    },
    "validation": {
      "require_pr_approved": true,
      "require_checks_passing": true
    }
  }
}
```

**Behavior:**
- All releases require PR approval
- GitHub releases created as drafts
- Manual review before publishing
- Explicit publish step required

### Continuous Deployment Style

**Configuration:**
```json
{
  "release": {
    "enabled": true,
    "trivial_changes": {
      "auto_release": true,
      "patterns": ["src/**", "lib/**"]
    },
    "pipeline": {
      "merge": {
        "strategy": "squash",
        "require_approval": false
      },
      "github_release": {
        "generate_notes": true,
        "prerelease": true
      }
    }
  }
}
```

**Behavior:**
- Trivial changes auto-release after merge
- Pre-release tags for testing
- Fast iteration cycles
- Production releases still require approval

## Integration Points

### AgentTask System Integration

**Size-Based Workflows:**
Release pipeline respects AgentTask size workflow settings:

```json
{
  "workflow_settings": {
    "nano": {
      "release_automation": false
    },
    "tiny": {
      "release_automation": false
    },
    "medium": {
      "release_automation": true,
      "auto_merge": false
    },
    "large": {
      "release_automation": true,
      "coordination_required": true
    },
    "mega": {
      "release_automation": true,
      "breaking_change_assessment": true
    }
  }
}
```

**Pipeline Triggering:**
- **Nano/Tiny**: Manual release trigger only
- **Medium+**: Auto-trigger pipeline after merge (with approval)
- **Large/Mega**: Additional coordination and assessment steps

### Git Privacy Integration

**Automatic Privacy Enforcement:**
All release artifacts processed through git privacy system:

```javascript
// Release pipeline step
function createRelease(version, notes) {
  // Load git privacy configuration
  const privacyConfig = config.git;

  // Strip privacy patterns
  const cleanNotes = stripPrivacyPatterns(
    notes,
    privacyConfig.privacy_patterns
  );

  // Create release with clean notes
  return gh.createRelease({
    tag_name: version,
    body: cleanNotes,
    draft: config.release.pipeline.github_release.draft
  });
}
```

**Privacy Validation:**
Pre-release validation checks all artifacts for privacy compliance:
- Merge commit messages
- Tag annotations
- Release notes
- PR descriptions

### Hook System Integration

**Pre-Release Validation Hook:**
```javascript
// pre-release-validation.js
module.exports = {
  name: 'pre-release-validation',
  type: 'pre-release',

  validate: async (context) => {
    const checks = [
      validatePRApproval(context),
      validateChecksStatus(context),
      validateVersionBump(context),
      validateChangelog(context),
      validateGitPrivacy(context)
    ];

    const results = await Promise.all(checks);
    return results.every(r => r.passed);
  }
};
```

**Post-Release Hook:**
```javascript
// post-release-notification.js
module.exports = {
  name: 'post-release-notification',
  type: 'post-release',

  execute: async (context) => {
    // Log release to audit trail
    await logRelease(context);

    // Update project documentation
    await updateVersionBadge(context.version);

    // Notify team (if configured)
    if (config.notifications.enabled) {
      await notifyRelease(context);
    }
  }
};
```

## Recommendations

### DO

✅ **Use Configuration Files**
Define release behavior in `icc.config.json`, not code

✅ **Require Explicit Triggers**
Never auto-release without user approval

✅ **Validate Before Execution**
Pre-execution validation prevents mid-pipeline failures

✅ **Integrate Git Privacy**
All release artifacts comply with privacy settings

✅ **Support Multiple Strategies**
Allow projects to choose merge strategy

✅ **Log Everything**
Comprehensive audit trail for all releases

✅ **Test Pipeline Locally**
Dry-run mode for testing without execution

✅ **Document Configuration**
Clear examples for different project types

### DON'T

❌ **Don't Hardcode Logic**
Configuration-driven, not code-driven

❌ **Don't Auto-Release**
Always require explicit user trigger

❌ **Don't Skip Validation**
Pre-execution checks prevent errors

❌ **Don't Ignore Privacy**
Enforce git privacy throughout pipeline

❌ **Don't Force Single Strategy**
Support different project workflows

❌ **Don't Silent Fail**
Clear error messages and recovery steps

❌ **Don't Skip Cleanup**
Always clean up branches after release

❌ **Don't Commit Sensitive Data**
Validate artifacts before release

## Success Metrics

**Efficiency Gains:**
- Release time reduced from 15+ minutes to 2 minutes
- Zero missed release steps
- Consistent release quality

**Error Reduction:**
- Zero git privacy violations in releases
- Zero tag creation mistakes
- Zero branch cleanup failures

**Flexibility:**
- Support for 3+ different release strategies
- Project-specific configuration active
- Zero hardcoded release logic

**Safety:**
- 100% explicit approval before merge
- Pre-execution validation catch rate >95%
- Audit trail coverage 100%
