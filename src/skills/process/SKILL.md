---
name: process
description: Activate when user explicitly requests the development workflow process, asks about workflow phases, or says "start work", "begin development", "follow the process". Activate when creating PRs or deploying to production. NOT for simple questions or minor fixes. Executes AUTONOMOUSLY - only pauses when human decision is genuinely required.
---

# Development Process

**AUTONOMOUS EXECUTION.** This process runs automatically. It only pauses when human input is genuinely required.

## Autonomous Principles

1. **Fix issues automatically** - Don't ask permission for obvious fixes
2. **Implement safe improvements automatically** - Low effort + safe = just do it
3. **Loop until clean** - Keep fixing until tests pass and no findings
4. **Only pause for genuine decisions** - Ambiguity, architecture, risk

## Phase Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ DEVELOPMENT PHASE (AUTONOMOUS)                                  │
│ Implement → Test → Review+Fix → Suggest+Implement → Loop        │
│ Pause only for: ambiguous requirements, architectural decisions │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ DEPLOYMENT PHASE (if applicable)                                │
│ Deploy → Test → Review+Fix → Commit                             │
│ Pause only for: deployment failures needing human intervention  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PR PHASE                                                        │
│ Create PR → Review+Fix → Suggest+Implement → WAIT for approval  │
│ Pause for: merge approval (ALWAYS requires explicit user OK)    │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 1: Development (AUTONOMOUS)

### Step 1.1: Implement
```
Implement feature/fix
```

### Step 1.2: Test Loop
```
Run tests
IF tests fail:
    Analyze failure
    Fix automatically if clear
    GOTO Step 1.2
IF tests pass:
    Continue to Step 1.3
```

### Step 1.3: Review + Auto-Fix
```
Run reviewer skill
- Finds: logic errors, regressions, security issues, file placement
- FIXES AUTOMATICALLY (don't ask permission)

IF fixes made:
    GOTO Step 1.2 (re-test)
IF needs human decision:
    PAUSE - present options, wait for input
IF clean:
    Continue to Step 1.4
```

### Step 1.4: Suggest + Auto-Implement
```
Run suggest skill
- Identifies improvements
- AUTO-IMPLEMENTS safe ones (low effort, no behavior change)
- PRESENTS risky ones to user

IF auto-implemented:
    GOTO Step 1.2 (re-test)
IF needs human decision:
    PAUSE - present suggestions, wait for input
    User chooses: implement some/all/none
    IF implementing: GOTO Step 1.2
IF clean or user says proceed:
    Continue to Phase 2 or 3
```

**Exit:** Tests pass, no review findings, suggestions addressed

## Phase 2: Deployment (AUTONOMOUS)

Skip if no deployment required.

### Step 2.1: Deploy
```
Deploy to target environment
```

### Step 2.2: Test Loop
```
Run deployment tests
IF fail:
    Analyze and fix if clear
    GOTO Step 2.1
```

### Step 2.3: Review + Auto-Fix
```
Run reviewer skill
FIXES AUTOMATICALLY
IF fixes made: GOTO Step 2.2
```

### Step 2.4: Commit
```
Run commit-pr skill
Ensure git-privacy rules followed
```

**Exit:** Deployment tests pass, no findings, committed

## Phase 3: Pull Request

### Step 3.1: Create PR
```
Run commit-pr skill to create PR
```

### Step 3.2: Review + Auto-Fix (in temp folder)
```
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"
gh pr checkout <PR-number>

Run reviewer skill (post-PR stage)
- Run project linters (Ansible, HELM, etc.)
- FIXES AUTOMATICALLY
- Push fixes to PR branch

IF fixes made: GOTO Step 3.2 (re-review)
IF needs human: PAUSE
IF clean: Continue
```

### Step 3.3: Suggest + Auto-Implement
```
Run suggest skill on full PR diff
- AUTO-IMPLEMENTS safe improvements
- Push to PR branch
- PRESENTS risky ones to user

IF auto-implemented: GOTO Step 3.2 (re-review)
IF needs human: PAUSE, wait for decision
IF clean or user says proceed: Continue
```

### Step 3.4: Await Approval (ALWAYS PAUSE)
```
WAIT for explicit user approval
DO NOT merge without: "merge", "approve", "LGTM", or similar

This is the ONE step that ALWAYS requires human input.
```

**Exit:** No findings, suggestions addressed, user approved

## Quality Gates

| Gate | Requirement | Human Input |
|------|-------------|-------------|
| Pre-commit | Tests pass, no findings, safe suggestions implemented | Only if ambiguous |
| Pre-deploy | Tests pass, no findings | Only if deploy fails |
| Pre-merge | No findings, suggestions addressed | **ALWAYS** (approval) |

## When to Pause

**PAUSE for:**
- Architectural decisions affecting multiple components
- Ambiguous requirements needing clarification
- Multiple valid approaches with trade-offs
- High-risk changes that could break things
- **Merge approval** (always)

**DO NOT pause for:**
- Fixing typos, formatting, naming
- Adding missing error handling
- Fixing security vulnerabilities
- Moving misplaced files
- Removing unused code
- Extracting duplicated code
- Adding null checks

## Commands

**Start (runs autonomously):**
```
process skill
```

**Force pause at every step (L1 mode):**
```
process skill with L1 autonomy
```

**Check status:**
```
Where am I in the process?
```
