# Git Privacy Compliance

## Overview
Ensure all git commits comply with privacy settings and branch protection rules through automatic enforcement and manual verification.

## Git Privacy Settings

### Configuration
```json
{
  "git": {
    "privacy": true,
    "privacy_patterns": [
      "AI",
      "Claude",
      "agent",
      "Generated with Claude Code",
      "Co-Authored-By: Claude"
    ],
    "branch_protection": true,
    "default_branch": "main",
    "require_pr_for_main": true
  }
}
```

### Automatic Enforcement
- **Hook**: `git-privacy-enforcement.js` enforces automatically
- **Trigger**: Before all git commit operations
- **Action**: Strips AI mentions from commit messages
- **Validation**: MANDATORY when `git.privacy: true`

## Privacy Pattern Stripping

### Default Patterns Removed
- "AI" references
- "Claude" mentions
- "agent" keywords
- "Generated with Claude Code" footers
- "Co-Authored-By: Claude" trailers

### Custom Patterns
Add project-specific patterns to `git.privacy_patterns` array in `icc.config.json`.

## Branch Protection

### Protected Branch Rules
- **Default Branch**: Usually `main` or `master`
- **Direct Commits**: Blocked when `branch_protection: true`
- **Workflow**: Feature branch → PR → Merge
- **Override**: Emergency fixes require explicit override

### Feature Branch Workflow
1. Create feature branch from default branch
2. Make commits on feature branch
3. Create pull request to default branch
4. Review and approve PR
5. Merge to default branch

## Commit Message Guidelines

### Professional Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type Categories
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Test additions or changes
- **chore**: Build process or auxiliary tool changes

### Privacy-Compliant Examples

**CORRECT**:
```
feat(auth): implement JWT authentication system

Add JWT-based authentication with refresh tokens.
Includes middleware for protected routes.

Closes #42
```

**WRONG** (privacy violation):
```
feat(auth): implement JWT authentication

AI-generated code using Claude Code.
Agent execution via Task tool.

Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Hook Integration

### Automatic Privacy Enforcement
```javascript
// git-privacy-enforcement.js hook
// Runs BEFORE git commit
// Strips privacy patterns automatically
// NO manual action required
```

### Manual Verification
Before git operations:

- ☐ Check commit message for AI mentions
- ☐ Verify no "Generated with Claude Code" footer
- ☐ Confirm no "Co-Authored-By: Claude" trailer
- ☐ Validate professional commit format
- ☐ Ensure neutral language (no emojis)

## Branch Protection Workflow

### Standard Workflow
1. **Create Branch**: `git checkout -b feature/user-auth`
2. **Make Changes**: Implement feature with commits
3. **Push Branch**: `git push -u origin feature/user-auth`
4. **Create PR**: Use `gh pr create` or web interface
5. **Review**: Code review and approval
6. **Merge**: Merge PR to default branch

### Emergency Override
Only for critical production fixes:

```bash
# Temporarily disable branch protection
# Make emergency commit
# Re-enable branch protection
# Create follow-up PR for review
```

## Quality Checklist

Before git commit:

- ☐ Privacy enforcement hook active
- ☐ Commit message professional format
- ☐ No AI/Claude/agent mentions
- ☐ No generated code footers
- ☐ Neutral language (no emojis)
- ☐ Descriptive commit subject
- ☐ Detailed commit body (if needed)

Before git push:

- ☐ Pushing to feature branch (not default)
- ☐ Branch protection respected
- ☐ PR workflow planned (if merging to default)
- ☐ All commits privacy-compliant
- ☐ Professional commit history

## Common Pitfalls

### Privacy Violations
**WRONG**: "AI-generated authentication system"
**CORRECT**: "Implement authentication system"

### Direct Main Commits
**WRONG**: `git checkout main && git commit`
**CORRECT**: `git checkout -b feature/xyz && git commit`

### Unprofessional Messages
**WRONG**: "🎉 Added cool new feature! 🚀"
**CORRECT**: "feat: implement user authentication"

### Missing Context
**WRONG**: "Fixed bug"
**CORRECT**: "fix(auth): resolve token expiration issue"

## Integration Points

### With AgentTask System
- Version bumping before git operations
- CHANGELOG updates required (workflow settings)
- Git operations in execution checklist
- Privacy compliance validated

### With Workflow Settings
- **Nano**: No version bump, no changelog
- **Tiny**: Patch version, changelog required
- **Medium+**: Minor/major version, PR required
- **Release**: Automated for medium+ AgentTasks

### With Hook System
- **Enforcement**: Automatic privacy stripping
- **Validation**: Pre-commit checks
- **Blocking**: Prevent privacy violations
- **Logging**: Track enforcement actions

## Examples

### Complete Privacy-Compliant Workflow

```bash
# 1. Create feature branch
git checkout -b feature/jwt-auth

# 2. Make changes and commit (privacy hook auto-strips)
git add src/auth/
git commit -m "feat(auth): implement JWT authentication

Add JWT-based authentication with refresh tokens.
Includes middleware for protected routes and token validation.

Closes #42"

# 3. Push feature branch
git push -u origin feature/jwt-auth

# 4. Create pull request
gh pr create --title "JWT Authentication" --body "$(cat <<'EOF'
## Summary
- JWT-based authentication system
- Refresh token support
- Protected route middleware

## Test plan
- Unit tests for token generation
- Integration tests for auth flow
- Manual testing with Postman

EOF
)"

# 5. Merge after review
gh pr merge --squash
```

### Privacy Hook in Action

**Input Commit Message**:
```
feat: authentication system

Implemented by AI using Claude Code.

Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Hook Processed Output**:
```
feat: authentication system

Implemented authentication system.
```

## Success Metrics

- Zero privacy violations in commit history
- 100% branch protection compliance
- Professional commit message format
- Neutral language throughout
- Automated enforcement success rate >99%
