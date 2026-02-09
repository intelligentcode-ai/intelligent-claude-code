---
name: process
description: Activate when user explicitly requests the development workflow process, asks about workflow phases, or says "start work", "begin development", "follow the process". Activate when creating PRs or deploying to production. NOT for simple questions or minor fixes. Executes AUTONOMOUSLY - only pauses when human decision is genuinely required.
---

# Development Process

**AUTONOMOUS EXECUTION.** This process runs automatically. It only pauses when human input is genuinely required.

## Branch Workflow (CRITICAL)

```
main     ← STABLE ONLY (releases from dev)
  ↑
dev      ← INTEGRATION (all work merges here first)
  ↑
feature/* ← WHERE WORK HAPPENS
```

**ALL changes go to dev first. Main is ALWAYS stable.**

| Action | Target Branch |
|--------|---------------|
| Feature work | PR to `dev` |
| Bug fixes | PR to `dev` |
| Releases | PR from `dev` to `main` |

## Autonomous Principles

1. **Fix issues automatically** - Don't ask permission for obvious fixes
2. **Implement safe improvements automatically** - Low effort + safe = just do it
3. **Loop until clean** - Keep fixing until tests pass and no findings
4. **Only pause for genuine decisions** - Ambiguity, architecture, risk
5. **PR to dev by default** - Never PR to main unless releasing

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
│ PR PHASE (to dev)                                               │
│ Create PR to dev → Review+Fix → WAIT for approval               │
│ Pause for: merge approval (ALWAYS requires explicit user OK)    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ RELEASE PHASE (dev → main, only when requested)                 │
│ Stabilize dev → Create release PR → Tag → WAIT for approval     │
│ Pause for: release approval (requires explicit "release" cmd)   │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 1: Development (AUTONOMOUS)

### Step 1.0: Memory Check (AUTOMATIC)
```
BEFORE implementing, search memory:
  memory search: "relevant keywords"

  (CLI fallback, if you prefer commands: `node ./.claude/skills/memory/cli.js search "relevant keywords"`
   for project installs, or `node ~/.claude/skills/memory/cli.js search "relevant keywords"` for user installs.)

IF similar problem solved before:
  - Review the solution
  - Apply or adapt it
  - Skip re-solving known problems

This step is SILENT - no user notification needed.
```

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

### Step 1.5: Memory Save (AUTOMATIC)
```
IF key decision was made (architecture, pattern, fix):
  Remember:
  - Title: ...
  - Summary: ...
  - Category: architecture|implementation|issues|patterns
  - Importance: high|medium|low

  (CLI fallback: `node ./.claude/skills/memory/cli.js write --title "..." --summary "..." --category "..." --importance "..."`.)

This step is SILENT - auto-saves significant decisions.
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

## Phase 3: Pull Request (to dev)

**PRs go to `dev` branch, NOT `main`.**

### Step 3.1: Create PR to dev
```
Run commit-pr skill
MUST use: gh pr create --base dev
NEVER: gh pr create --base main (unless releasing)
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

**Required behavior (closed-loop):**
- Stage 3 MUST be executed by a dedicated reviewer subagent (preferred: `@Reviewer` via Task tool).
- Reviewer Stage 3 MUST loop until the PR is clean:
  - If findings exist: fix + push commits to the PR branch, then restart Stage 3 in a fresh temp checkout.
  - When clean: post `ICC-REVIEW-RECEIPT` with `Findings: 0` and `NO FINDINGS` for the current head SHA.
  - Optional GitHub approvals (GitHub-style approvals mode):
    - Default is self-review-and-merge: **GitHub required approvals may remain at 0**, while ICC Stage 3 receipt remains
      the required review gate.
    - If `workflow.require_github_approval=true`, the reviewer subagent should also try to add a GitHub approval using
      `gh pr review <PR-number> --approve ...` (skip if already approved).
      - If PR author == current authenticated `gh` user: GitHub forbids approving your own PR (server-side rule). Skip.
        If repo rules require approvals, a second GitHub identity/bot is required for approvals.

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

### Step 3.4: Merge Approval (Default: Pause, Optional Auto-Merge)
Default behavior:
```
WAIT for explicit user approval
DO NOT merge without: "merge", "approve", "LGTM", or similar
```

Optional auto-merge (Skills-level standing approval):
- If `workflow.auto_merge=true` in the current AgentTask/workflow context
- AND the PR targets `dev`
- AND the reviewer Stage 3 ICC-REVIEW receipt exists for the current head SHA (PASS)
- AND the receipt includes `Findings: 0` and `NO FINDINGS`
- AND checks are green

Then the agent MAY proceed to merge without an additional chat approval.

**Never auto-merge to `main`** unless performing an explicitly requested release workflow.

**Exit:** No findings, suggestions addressed, user approved, merged to dev

## Phase 4: Release (dev → main)

**Only when user explicitly requests a release.**

### Step 4.1: Verify dev is stable
```
Ensure dev branch:
- All tests pass
- No pending critical issues
- User confirms ready for release
```

### Step 4.2: Create Release PR
```
gh pr create --base main --title "release: vX.Y.Z"
Include release notes and changelog
```

### Step 4.3: Await Release Approval
```
WAIT for explicit user approval
User must say "release", "merge to main", or similar
```

### Step 4.4: Tag and Publish
```
After merge to main:
git tag vX.Y.Z
git push origin vX.Y.Z
gh release create vX.Y.Z
```

**Exit:** Released to main, tagged, published

## Quality Gates (BLOCKING)

**These gates are MANDATORY. You CANNOT proceed without passing them.**

| Gate | Requirement | Blocked Actions |
|------|-------------|-----------------|
| Pre-commit | Tests pass + reviewer skill clean | `git commit`, `git push` |
| Pre-deploy | Tests pass + reviewer skill clean | Deploy to production |
| Pre-merge | reviewer Stage 3 PASS receipt + checks green + user approval | `gh pr merge` |

### Gate Enforcement

```
IF attempting commit/push/PR without running reviewer skill:
  STOP - You are violating the process
  GO BACK to Step 1.3 (Review + Auto-Fix)
  DO NOT proceed until reviewer skill passes
```

**Skipping review is a process violation, not a shortcut.**

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
