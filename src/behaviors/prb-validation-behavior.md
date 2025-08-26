# PRB Validation Behavior

**MANDATORY:** Validate PRBs have NO unresolved placeholders before subagent execution.

**PURPOSE:** Ensure all PRBs are self-contained and ready for subagent execution

## Core Validation Principle

**CRITICAL:** Every PRB must be completely resolved before subagent execution:
- Zero unresolved placeholders ([...] patterns)
- All configuration values embedded (no [FROM_CONFIG])
- Absolute file paths (no [PROJECT_ROOT] patterns)
- Actual content (no [USER_REQUEST] patterns)

## Validation Categories

### 1. Configuration Validation
**VALIDATE CONFIG VALUES:**
- `git_privacy`: Must be `true` or `false` (NOT "[FROM_CONFIG]")
- `branch_protection`: Must be `true` or `false` (NOT "[FROM_CONFIG]")
- `default_branch`: Must be actual branch name like "main" (NOT "[FROM_CONFIG]")
- `autonomy_level`: Must be "L1", "L2", or "L3" (NOT "[FROM_CONFIG]")

### 2. Context Validation
**VALIDATE CONTEXT VALUES:**
- `project_root`: Must be absolute path starting with "/" (NOT "[PROJECT_ROOT]")
- `system_nature`: Must be "MARKDOWN-BASED AI-AGENTIC" or "CODE-BASED" (NOT "[SYSTEM_NATURE]")
- `current_date`: Must be YYYY-MM-DD format (NOT "[CURRENT_DATE]")

### 3. Content Validation
**VALIDATE CONTENT VALUES:**
- `original_request`: Must contain actual user request (NOT "[USER_REQUEST]")
- `success_criteria`: Must contain actual criteria (NOT "[SUCCESS_CRITERIA]")
- `title`: Must contain actual role and description (NOT "[ROLE] [DESCRIPTION]")

### 4. File Reference Validation
**VALIDATE FILE REFERENCES:**
- All file paths must be absolute (start with "/")
- Critical files must have actual content samples
- No placeholder file paths like "[CRITICAL_FILE]"

## Comprehensive Placeholder Detection

**SCAN FOR ANY REMAINING PLACEHOLDERS:**
- Any text patterns matching "[...]" format
- Configuration placeholders: [FROM_CONFIG], [ALL-SETTINGS]
- Context placeholders: [PROJECT_ROOT], [SYSTEM_NATURE], [CURRENT_DATE]
- Content placeholders: [USER_REQUEST], [SUCCESS_CRITERIA], [ROLE]
- File placeholders: [CRITICAL_FILE], [PROJECT_PATH]

## Validation Enforcement

### Pre-Execution Blocking
**MANDATORY:** Block subagent execution if validation fails
- Display specific placeholder violations found
- Provide clear resolution guidance
- Prevent execution until all placeholders resolved

### Error Messages
**PLACEHOLDER_DETECTED:**
```
❌ PRB VALIDATION FAILED: Unresolved placeholders found
Placeholders detected: [FROM_CONFIG], [PROJECT_ROOT]
Required action: Resolve all placeholders before execution
```

**CONFIG_NOT_EMBEDDED:**
```
❌ Configuration values not embedded
git_privacy: "[FROM_CONFIG]" ← Must be actual boolean value
Required action: Load and embed actual configuration values
```

**CONTENT_NOT_RESOLVED:**
```
❌ Template content not resolved
original_request: "[USER_REQUEST]" ← Must be actual story content
Required action: Extract and embed actual story requirements
```

## Quality Gates

### Validation Sequence
1. **Placeholder Scan**: Check for any "[...]" patterns
2. **Configuration Check**: Validate all config values are actual
3. **Context Check**: Validate all context values are resolved
4. **Content Check**: Validate all content is story-specific
5. **File Check**: Validate all file references are absolute

### Pass Criteria
- Zero unresolved placeholder patterns found
- All configuration values are actual types (boolean/string)
- All content is story-specific and measurable
- All file paths are absolute and valid

## Integration Points

### With PRB Creation
- Validation runs immediately after PRB creation
- Blocks PRB completion if validation fails
- Ensures only valid PRBs reach subagent execution

### With Subagent Deployment
- Pre-deployment validation prevents execution failures
- Self-contained PRBs eliminate runtime dependencies
- Complete context enables autonomous subagent operation

### With Template System
- Validates template placeholder resolution completeness
- Ensures template-to-PRB transformation quality
- Maintains template compliance throughout process

---
*PRB validation behavior for intelligent-claude-code system*