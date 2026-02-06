---
name: process
description: Development workflow process with mandatory phases. Use when starting development work, implementing features, fixing bugs, deploying, or creating PRs. Enforces Development → Review → Deploy → PR phases with quality gates. Triggers on "start work", "implement", "deploy", "create PR", or workflow questions.
---

# Development Process

Mandatory workflow phases with quality gates. Each phase must complete before proceeding.

## Phase Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ DEVELOPMENT PHASE                                               │
│ Develop → Test → Fix → Repeat until tests pass                  │
│ Review → Fix → Repeat until no findings                         │
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
IF findings exist:
    Fix findings
    GOTO Step 1.2 (re-test after fixes)
ELSE:
    Proceed to Phase 2 or 3
```

**Exit criteria:** Tests pass AND no review findings

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
# Clone and checkout PR
TEMP_DIR=$(mktemp -d)
gh pr checkout <PR-number> --repo . --detach -C "$TEMP_DIR"
cd "$TEMP_DIR"

# Review ALL changes in PR
gh pr diff <PR-number>

# Run reviewer skill checks
```

```
Run reviewer skill (post-PR stage)
- Security scan entire PR diff
- File placement verification
- Credential/secret detection
- ALL-CAPS filename check

IF findings exist:
    Fix findings in original repo
    Push updates
    GOTO Step 3.2 (re-review)
```

### Step 3.3: Await Approval
```
WAIT for explicit user approval
DO NOT merge without user saying "merge", "approve", or "LGTM"
```

**Exit criteria:** No review findings AND explicit user approval

## Quality Gates

| Gate | Requirement |
|------|-------------|
| Pre-commit | Tests pass + No `reviewer skill` findings |
| Pre-deploy | Tests pass + No `reviewer skill` findings |
| Pre-merge | No `reviewer skill` findings + User approval |

## Related Skills

- `reviewer skill` - Critical review at each gate
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
