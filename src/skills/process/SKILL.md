---
name: process
description: Activate when user explicitly requests the development workflow process, asks about workflow phases, or says "start work", "begin development", "follow the process". Activate when creating PRs or deploying to production. NOT for simple questions or minor fixes. Provides mandatory Development → Review → Suggest → Deploy → PR workflow with quality gates.
---

# Development Process

Mandatory workflow phases with quality gates. Each phase must complete before proceeding.

## Phase Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ DEVELOPMENT PHASE                                               │
│ Develop → Test → Fix → Repeat until tests pass                  │
│ Review → Fix → Repeat until no findings                         │
│ Suggest → Present improvements to user                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ DEPLOYMENT PHASE (if applicable)                                │
│ Deploy → Test → Fix → Repeat until passing                      │
│ Review → Fix → Repeat until no findings                         │
│ Commit                                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PR PHASE                                                        │
│ Create PR → Review → Fix → Repeat until no findings             │
│ Suggest → Present improvements to user                          │
│ WAIT for explicit user approval before merge                    │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 1: Development

### Step 1.1: Implement
```
Implement feature/fix
```

### Step 1.2: Test Loop
```
Run tests
IF tests fail:
    Fix issues
    GOTO Step 1.2
```

### Step 1.3: Pre-Commit Review Loop
```
Run reviewer skill (pre-commit stage)
- Analyze for logic errors, regressions, edge cases
- Check security issues
- Verify test coverage

IF findings exist:
    Fix findings
    GOTO Step 1.2 (re-test after fixes)
```

### Step 1.4: Suggest Improvements (MANDATORY)
```
Run suggest skill on changes
- Analyze what could be improved
- Provide realistic, context-aware proposals
- Prioritize by impact

Present suggestions to user:
- User may choose to implement some/all/none
- If implementing: GOTO Step 1.2 (re-test)
- If skipping: Document decision, proceed to Phase 2 or 3
```

**Exit criteria:** Tests pass AND no review findings AND suggestions addressed

## Phase 2: Deployment (If Applicable)

Skip if no deployment required. Otherwise:

### Step 2.1: Deploy
```
Deploy to target environment
```

### Step 2.2: Deployment Test Loop
```
Run deployment tests/verification
IF tests fail:
    Fix issues
    GOTO Step 2.1
```

### Step 2.3: Post-Deploy Review Loop
```
Run reviewer skill (post-deploy stage)
IF findings exist:
    Fix findings
    GOTO Step 2.2
```

### Step 2.4: Commit
```
Run commit-pr skill to commit changes
Ensure git-privacy skill rules followed (no AI attribution)
```

**Exit criteria:** Deployment tests pass AND no review findings AND committed

## Phase 3: Pull Request

### Step 3.1: Create PR
```
Run commit-pr skill to create PR
```

### Step 3.2: Dedicated PR Review Loop

**MANDATORY**: Clone to temp directory and review full PR diff:
```bash
# Setup credentials
source ~/.config/git/common.conf 2>/dev/null && export GH_TOKEN=$GITHUB_PAT

# Clone and checkout PR
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"
gh pr checkout <PR-number>

# Review ALL changes in PR
gh pr diff <PR-number>
```

```
Run reviewer skill (post-PR stage)
- Security scan entire PR diff
- File placement verification
- Credential/secret detection
- ALL-CAPS filename check
- Project-specific linting (Ansible, HELM, etc.)

IF findings exist:
    Fix findings in original repo
    Push updates
    GOTO Step 3.2 (re-review)
```

### Step 3.3: Suggest Improvements (MANDATORY)
```
Run suggest skill on full PR diff
- Analyze what could be improved across all changes
- Provide realistic, context-aware proposals
- Consider documentation improvements

Present suggestions to user:
- User may choose to implement some/all/none
- If implementing: Push updates, GOTO Step 3.2
- If skipping: Document decision, proceed to approval
```

### Step 3.4: Await Approval
```
WAIT for explicit user approval
DO NOT merge without user saying "merge", "approve", or "LGTM"
```

**Exit criteria:** No review findings AND suggestions addressed AND explicit user approval

## Quality Gates

| Gate | Requirement |
|------|-------------|
| Pre-commit | Tests pass + No `reviewer` findings + `suggest` addressed |
| Pre-deploy | Tests pass + No `reviewer` findings |
| Pre-merge | No `reviewer` findings + `suggest` addressed + User approval |

## Related Skills

- `reviewer skill` - Find problems (logic errors, regressions, security)
- `suggest skill` - Propose improvements (what could be better)
- `commit-pr skill` - Commit and PR formatting
- `git-privacy skill` - No AI attribution (mandatory)

## Commands

**Start development:**
```
process skill
```

**Check current phase:**
```
Where am I in the process?
```

**Skip deployment phase:**
```
No deployment needed, go to PR
```

**Skip suggestions (with documentation):**
```
Skip suggestions, proceeding to [next phase]
```
