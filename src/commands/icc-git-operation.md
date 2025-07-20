# Git Operation

Execute git workflow operations with branch management and privacy enforcement using $ARGUMENTS.

## Behavior
Professional git workflow execution with privacy enforcement, branch protection, and commit standards.

## Arguments
**Format:** "operation_type | target | message_or_description"
**Examples:** 
- "commit | feat: add memory | Implement MCP integration"
- "branch | feature/BUG-059-validation | Create validation branch"

## Core Actions
1. Privacy enforcement (strip AI mentions if enabled)
2. Branch validation (feature workflow + protection)
3. Operation execution with professional standards
4. Status validation and evidence capture

## Operation Types

### Branch: create, switch, delete, status
### Commit: commit, amend, stash, unstash  
### Integration: merge, rebase, push, pull

## Standards
**Branch**: `feature/TYPE-ID-desc` (e.g., `story/STORY-001-auth`)
**Commit**: `type: description` or `ID: description` (feat, fix, docs, etc.)
**Protection**: No direct commits to main/master

## Privacy Enforcement
When `git_privacy: true`: Remove AI-generated, Claude, Anthropic, 🤖, Co-Authored-By lines
**Fallback**: "Update implementation" if empty

## Workflow Integration
**Outer**: Branches per story/bug | **Inner**: Commits per task | **Quality**: Pre-commit validation

## Error Handling
- **No Changes**: "No changes to commit"
- **Conflicts**: "Manual resolution required" 
- **Protected**: "Switch to feature branch"
- **Push Failed**: "Pull and retry"

## Role Restrictions
**Authorized**: @Developer, @DevOps-Engineer, @System-Engineer, @PM