---
name: reviewer
description: Activate when reviewing code, before committing, after committing, or before merging a PR. Activate when user asks to review, audit, check for security issues, or find regressions. Analyzes code for logic errors, regressions, edge cases, security issues, and test gaps. Required at process skill quality gates.
---

# Reviewer Skill

Critical code reviewer focused on finding problems. Analyzes for logic errors, regressions, edge cases, security issues, and test gaps.

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
# Review unstaged changes
git diff

# Review staged changes
git diff --cached

# See what files are affected
git status
```

**Analyze the diff for:**
- Logic errors in the changed code
- Regressions from the previous behavior
- Edge cases not handled
- Security issues introduced
- Missing test coverage for changes

**Also check:**
- [ ] No hardcoded credentials/secrets in diff
- [ ] No sensitive files staged (.env, keys, credentials)
- [ ] Files in correct locations (summaries/, memory/, etc.)
- [ ] No ALL-CAPS filenames (except LICENSE, README, CLAUDE.md, CHANGELOG.md)

### Stage 2: Post-Commit / Pre-PR Review

**Context:** Commits exist on branch, no PR yet
**Location:** Current directory

```bash
# Review all commits on branch vs main
git diff main..HEAD

# See commit history
git log main..HEAD --oneline

# Review a specific commit
git show <commit-sha>
```

**Analyze the full branch diff for:**
- Logic errors across all changes
- Regressions from main branch behavior
- Edge cases introduced by the feature
- Security implications of the full change set
- Test coverage for the complete feature

**Also check:**
- [ ] Commit messages are meaningful
- [ ] No debug code left in
- [ ] Documentation updated if needed

### Stage 3: Post-PR Review

**Context:** PR exists, full review before merge
**Location:** MUST use temp folder for isolation

```bash
# Setup credentials (if using external config)
source ~/.config/git/common.conf 2>/dev/null && export GH_TOKEN=$GITHUB_PAT

# Clone to temp folder
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Checkout the PR
gh pr checkout <PR-number>

# Review full PR diff
gh pr diff <PR-number>

# Check PR status and reviews
gh pr view <PR-number>
```

**Windows (PowerShell):**
```powershell
$TEMP_DIR = Join-Path $env:TEMP "review-$(Get-Random)"
New-Item -ItemType Directory -Path $TEMP_DIR
Set-Location $TEMP_DIR
gh pr checkout <PR-number>
```

**Analyze the PR for:**
- Logic errors in all changed code
- Regressions from main branch
- Edge cases not covered
- Security vulnerabilities
- Test gaps

**Also check:**
- [ ] PR description is accurate
- [ ] Documentation reflects changes
- [ ] No unnecessary files included

### Project-Specific Linting

Run linters based on project type detected:

**Ansible projects** (contains `playbook.yml`, `ansible/`, or `roles/`):
```bash
# Use dummy password for vault if present
ansible-lint --offline 2>/dev/null || ansible-lint
ansible-playbook --syntax-check *.yml --vault-password-file=/dev/null 2>/dev/null || true
```

**HELM projects** (contains `Chart.yaml` or `charts/`):
```bash
helm lint .
helm template . --debug 2>&1 | head -50
```

**Node.js projects** (contains `package.json`):
```bash
npm audit 2>/dev/null || true
npx eslint . --ext .js,.ts 2>/dev/null || true
```

**Python projects** (contains `pyproject.toml` or `requirements.txt`):
```bash
ruff check . 2>/dev/null || pylint **/*.py 2>/dev/null || true
```

**Shell scripts**:
```bash
find . -name "*.sh" -exec shellcheck {} \; 2>/dev/null || true
```

## Security Review Checklist

Beyond simple credential detection:

### Injection Vulnerabilities
- SQL injection (unsanitized input in queries)
- Command injection (user input in shell commands)
- XSS (unescaped output in HTML)
- Path traversal (user input in file paths)

### Authentication/Authorization
- Missing auth checks on endpoints
- Broken access control (can user A access user B's data?)
- Session handling issues
- Token exposure in logs or URLs

### Data Exposure
- Sensitive data in logs
- PII in error messages
- Secrets in environment variable dumps
- Credentials in config files

### Dependency Security
```bash
# Check for known vulnerabilities
npm audit 2>/dev/null
pip-audit 2>/dev/null
```

## File Placement Review

**Blocked patterns (agent bloat):**
- `REPORT.md`, `SUMMARY.md`, `ANALYSIS.md` in project root
- ALL-CAPS `.md` files (except: README, LICENSE, CLAUDE, CHANGELOG, CONTRIBUTING, SECURITY)

**Correct locations:**
| Type | Directory |
|------|-----------|
| Summaries/Reports | `summaries/` |
| Memory entries | `memory/` |
| Stories | `stories/` |
| Bugs | `bugs/` |
| Documentation | `docs/` |

## Output Format

```markdown
# Review Findings

## Critical
1. **[CRITICAL]** [file:line] Description
   - Evidence: `code snippet`
   - Risk: What could happen
   - Fix: How to resolve

## High
1. **[HIGH]** [file:line] Description
   - Evidence: `code snippet`
   - Fix: Recommendation

## Medium
...

## Low
...

## Linting
- ansible-lint: X violations
- eslint: X errors, Y warnings

## Summary
- Critical: X
- High: X
- Medium: X
- Low: X
- Blocking: Yes/No
```

## Integration

- **process skill** - Invoked at each quality gate
- **git-privacy skill** - Check for AI attribution
- **file-placement skill** - Verify file locations

## NOT This Skill's Job

Improvement suggestions belong in a separate skill. This skill finds **problems**, not **opportunities**.
