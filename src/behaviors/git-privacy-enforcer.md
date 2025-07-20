# Git Privacy Enforcer

**Purpose:** Strip AI mentions from git commits  
**Type:** Security & Privacy Component  
**Status:** ACTIVE

## Operation

**Trigger:** When `git_privacy: true` in settings  
**Scope:** Commit messages, PR titles, PR descriptions  
**Fallback:** "Update implementation" if message becomes empty  

## AI Patterns Removed

Use `/icc-git-clean [content_type]` to remove all AI mentions including direct mentions, co-authorship, indirect references, and orphaned phrases automatically.

## Implementation

**Privacy Enforcement:** Use `/icc-git-clean [message]` to check `git_privacy` setting, apply pattern removal, clean phrases, normalize whitespace, and ensure coherent messages

**Git Operations:** Use `/icc-git-validate [operation_type]` to intercept messages, validate branch protection, and execute cleaned operations

**Branch Protection:** Use `/icc-git-validate [branch_operation]` to prevent direct commits to main branch, warn about violations, and enforce feature branch workflow

## Examples

Use `/icc-git-clean [message_text]` for automatic cleaning:
- Commit messages: Removes AI mentions and emojis
- PR descriptions: Strips co-authorship and generation references  
- Complex messages: Cleans AI assistant references while preserving meaning

## Integration

**Automatic activation:** Use `/icc-load-config` to check `git_privacy: true` and automatically apply to all git operations

**Error handling:** Use `/icc-git-clean [message]` with automatic fallbacks for empty messages, branch protection, and pattern errors

---
*Git privacy enforcement for intelligent-claude-code system*