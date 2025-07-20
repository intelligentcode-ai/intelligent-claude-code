# Git Validate

Validate git operations and branch protection using $ARGUMENTS.

## Behavior
Validate git operations against branch protection rules, workflow standards,
and team policies before execution. Prevents unauthorized direct commits
and enforces professional git workflow practices.

## Arguments
**Format:** "Operation: commit|push|merge|branch | Target: branch_name | Content: commit_message"
**Example:** "Operation: commit | Target: main | Content: Fix critical security issue"

## Core Actions
- Parse git operation details from $ARGUMENTS
- Load git configuration and branch protection rules
- Validate operation against protection policies:
  - Branch protection rules
  - Commit message standards
  - File change permissions
  - Workflow compliance
- Check team policies and conventions
- Apply git privacy cleaning if enabled
- Provide specific feedback for violations
- Approve or block operation with clear reasoning

## Branch Protection Validation

### Protected Branches
- **main/master**: Requires PR/MR for all changes
- **develop**: May allow direct commits based on settings
- **release/***: Restricted to release managers
- **hotfix/***: Emergency fixes only with approval

### Protection Rules
- `require_pr_for_main: true` → Block direct commits to main
- `branch_protection: true` → Enforce feature branch workflow
- Custom protection rules from project configuration

### Validation Logic
```yaml
if target_branch == default_branch:
  if require_pr_for_main:
    BLOCK: "Direct commits to main branch not allowed. Use feature branch + PR."
  else:
    ALLOW: "Direct commits to main allowed by configuration"
else:
  ALLOW: "Feature branch commits allowed"
```

## Operation Validation

### Commit Validation
- **Message Format**: Follow team commit message standards
- **Content Cleaning**: Apply git privacy cleaning if enabled
- **File Permissions**: Check for sensitive file changes
- **Size Limits**: Validate commit size and file count

### Push Validation
- **Branch Permissions**: Verify push permissions to target branch
- **Force Push**: Block force pushes to protected branches
- **Upstream**: Validate upstream branch configuration

### Merge Validation
- **Source Branch**: Validate source branch status
- **Target Branch**: Check merge permissions
- **Conflicts**: Detect and report merge conflicts
- **Review Status**: Verify required reviews completed

### Branch Operations
- **Creation**: Validate branch naming conventions
- **Deletion**: Prevent deletion of protected branches
- **Rename**: Check impact on existing PRs/MRs

## Commit Message Standards

### Required Format
```
type(scope): description

[optional body]

[optional footer]
```

### Valid Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Validation Rules
- Subject line ≤50 characters
- Imperative mood ("Add feature" not "Added feature")
- No trailing punctuation in subject
- Body wrapped at 72 characters
- Clear description of changes

## Git Privacy Integration
- Apply git cleaning when `git_privacy: true`
- Strip AI mentions from commit messages
- Clean co-authorship lines
- Preserve technical content
- Use fallback messages if content becomes empty

## Team Policy Validation

### File Change Policies
- **Configuration Files**: Require review for .env, config files
- **Security Files**: Special approval for auth, crypto files
- **Infrastructure**: Review required for docker, CI/CD files
- **Dependencies**: Approval for package.json, requirements.txt changes

### Workflow Policies
- **Feature Branches**: Must start from main/develop
- **Naming Conventions**: feature/, bugfix/, hotfix/ prefixes
- **Review Requirements**: Minimum reviewers based on change type
- **Testing Requirements**: Tests required for certain file types

## Validation Results

### APPROVED
- Operation meets all validation criteria
- No policy violations detected
- Ready for execution
- Log approval for audit trail

### BLOCKED
- **Branch Protection**: Direct commit to protected branch
- **Message Format**: Invalid commit message format
- **Policy Violation**: Team policy not followed
- **Permission Denied**: Insufficient permissions

### WARNING
- **Best Practice**: Suggestion for improvement
- **Convention**: Minor convention violation
- **Recommendation**: Better approach available

## Error Reporting
- Specific violation description
- Corrective action suggestions
- Reference to relevant policies
- Examples of correct format

## Integration
- Used by all git workflow commands
- Triggered before git operations
- Integrates with branch protection enforcer
- Supports pre-commit hook integration
- Connected to git privacy enforcer

## Quality Standards
- Zero tolerance for protection violations
- Clear guidance for policy compliance
- Fast validation for standard operations
- Comprehensive coverage of git workflows
- Professional development practices enforcement