---
name: reviewer
description: Activate when reviewing code, before committing, after committing, or before merging a PR. Activate when user asks to review, audit, check for security issues, or find regressions. Analyzes code for logic errors, regressions, edge cases, security issues, and test gaps. Fixes findings AUTOMATICALLY. Required at process skill quality gates.
---

# Reviewer Skill

Critical code reviewer. Finds problems and **FIXES THEM AUTOMATICALLY**.

## Autonomous Execution

**DEFAULT BEHAVIOR: Fix issues automatically.**

Only pause for human input when:
- Architectural decisions are needed
- Multiple valid fix approaches exist
- The fix would change intended behavior
- Clarification is genuinely required

**DO NOT ask permission to fix:**
- Typos, formatting, naming issues
- Missing error handling (add it)
- Security vulnerabilities (fix them)
- File placement violations (move the files)
- Credential exposure (remove and warn)

## Core Analysis Questions

For EVERY review, answer these questions:

1. **Logic errors** - What could fail? What assumptions are wrong?
2. **Regressions** - What changed that shouldn't have? What behavior is different?
3. **Edge cases** - What inputs aren't handled? What happens at boundaries?
4. **Security** - Beyond credentials: injection, auth bypass, data exposure?
5. **Test gaps** - What's untested? What scenarios are missing?

## Review Stages

### Stage 1: Pre-Commit Review

**Context:** Uncommitted changes in working directory
**Location:** Current directory (NOT temp folder)

```bash
git diff              # unstaged
git diff --cached     # staged
git status            # files affected
```

**Find and FIX:**
- Logic errors → Fix the code
- Security issues → Fix immediately
- File placement violations → Move files to correct location
- Credential exposure → Remove and add to .gitignore

**Pause only for:**
- Ambiguous requirements needing clarification
- Architectural choices with trade-offs

### Stage 2: Post-Commit / Pre-PR Review

**Context:** Commits exist on branch, no PR yet
**Location:** Current directory

```bash
git diff main..HEAD
git log main..HEAD --oneline
```

**Find and FIX:**
- Same as Stage 1, applied to full branch diff
- Create fixup commits for issues found

### Stage 3: Post-PR Review

**Context:** PR exists, full review before merge
**Location:** MUST use temp folder for isolation

```bash
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"
gh pr checkout <PR-number>
gh pr diff <PR-number>
```

**Find and FIX:**
- Push fix commits to the PR branch
- Update PR if needed

### Project-Specific Linting

Run linters and **FIX what can be auto-fixed**:

**Ansible:**
```bash
ansible-lint --offline 2>/dev/null || ansible-lint
# Fix YAML formatting issues automatically
```

**HELM:**
```bash
helm lint .
```

**Node.js:**
```bash
npm audit fix 2>/dev/null || true    # Auto-fix vulnerabilities
npx eslint . --fix 2>/dev/null || true  # Auto-fix lint issues
```

**Python:**
```bash
ruff check . --fix 2>/dev/null || true
```

**Shell:**
```bash
find . -name "*.sh" -exec shellcheck {} \;
```

## Security Review (AUTO-FIX)

| Issue | Auto-Fix Action |
|-------|-----------------|
| Hardcoded credential | Remove, add to .gitignore, warn user |
| SQL injection | Parameterize the query |
| Command injection | Use safe APIs, escape inputs |
| Path traversal | Sanitize paths |
| Missing auth check | Add auth check (or flag if unclear) |

## File Placement (AUTO-FIX)

| Wrong Location | Action |
|----------------|--------|
| Summary in root | `mv summary.md summaries/` |
| Report in docs/ | `mv docs/report.md summaries/` |
| ALL-CAPS bloat file | Delete or move to summaries/ |

## Output Format

After auto-fixing, report:

```markdown
# Review Complete

## Auto-Fixed
- [file:line] Fixed: description of fix
- [file:line] Fixed: description of fix

## Requires Human Decision
- [file:line] Issue: description
  - Option A: ...
  - Option B: ...
  - Why I can't decide: ...

## Summary
- Issues found: X
- Auto-fixed: Y
- Needs human: Z
- Blocking: Yes/No
```

## Integration

After fixing:
1. Re-run tests (Step 1.2)
2. If tests pass → proceed to suggest skill
3. If tests fail → fix and repeat

## Memory Integration (AUTOMATIC)

After fixing recurring issues, auto-save to memory:

```bash
# When a pattern emerges (same fix multiple times):
node ~/.claude/skills/memory/cli.js write \
  --title "Recurring: <issue type>" \
  --summary "<what to check for and how to fix>" \
  --tags "recurring,security|quality|patterns" \
  --category "issues" \
  --importance "medium"
```

This is **SILENT** - no user notification. Builds knowledge for future reviews.

## NOT This Skill's Job

- Improvement suggestions → use suggest skill
- Asking permission for obvious fixes → just fix them
