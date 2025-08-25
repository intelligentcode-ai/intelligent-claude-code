# PRB Validation Behavior

**MANDATORY:** Validate PRBs have NO unresolved placeholders before subagent execution. Auto-block incomplete PRBs.

**PURPOSE:** Ensure all PRBs are self-contained and ready for subagent execution without placeholders

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

**Detection Pattern:**
```bash
# Check for unresolved config placeholders
grep -q "\[FROM_CONFIG\]" "$prb_file" && echo "❌ Config placeholders found"
```

### 2. Context Validation
**VALIDATE CONTEXT VALUES:**
- `project_root`: Must be absolute path starting with "/" (NOT "[PROJECT_ROOT]")
- `system_nature`: Must be "MARKDOWN-BASED AI-AGENTIC" or "CODE-BASED" (NOT "[SYSTEM_NATURE]")
- `current_date`: Must be YYYY-MM-DD format (NOT "[CURRENT_DATE]")

**Detection Pattern:**
```bash
# Check for unresolved context placeholders
grep -q "\[PROJECT_ROOT\]\|\[SYSTEM_NATURE\]\|\[CURRENT_DATE\]" "$prb_file" && echo "❌ Context placeholders found"
```

### 3. Content Validation
**VALIDATE CONTENT VALUES:**
- `original_request`: Must contain actual user request (NOT "[USER_REQUEST]")
- `success_criteria`: Must contain actual criteria (NOT "[SUCCESS_CRITERIA]")
- `title`: Must contain actual role and description (NOT "[ROLE] [DESCRIPTION]")

**Detection Pattern:**
```bash
# Check for unresolved content placeholders
grep -q "\[USER_REQUEST\]\|\[SUCCESS_CRITERIA\]\|\[ROLE\]" "$prb_file" && echo "❌ Content placeholders found"
```

### 4. Comprehensive Placeholder Scan
**VALIDATE NO REMAINING PLACEHOLDERS:**
```bash
# Detect ANY remaining placeholder patterns
PLACEHOLDERS=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null | sort -u)
if [ ! -z "$PLACEHOLDERS" ]; then
    echo "❌ CRITICAL: Unresolved placeholders detected:"
    echo "$PLACEHOLDERS"
    return 1
fi
```

## Validation Execution Process

### Pre-Subagent Validation
**MANDATORY BEFORE SUBAGENT EXECUTION:**

1. **Load PRB File**: Read the PRB file completely
2. **Scan for Placeholders**: Use comprehensive placeholder scan
3. **Validate Configuration**: Check all config values are resolved  
4. **Validate Context**: Check all context values are resolved
5. **Validate Content**: Check all content values are resolved
6. **Block if Failed**: Prevent subagent execution if any validation fails

### Validation Blocking
**IMMEDIATE BLOCKS:**
- Any [FROM_CONFIG] patterns detected
- Any [PROJECT_ROOT] patterns detected  
- Any [USER_REQUEST] patterns detected
- Any [ROLE] or [DESCRIPTION] patterns detected
- Any [...] patterns of any kind detected

**Error Messages:**
```
❌ PRB VALIDATION FAILED: Cannot execute with unresolved placeholders
Found placeholders: [list of detected patterns]
Resolution required: All placeholders must be resolved by main agent before subagent execution
```

## Integration with PRB Execution

### Template Integration
**WITH TEMPLATE LOADING:**
- Templates loaded with placeholders
- Main agent resolves ALL placeholders during PRB creation
- Validation confirms resolution completeness
- Only validated PRBs passed to subagents

### Process Integration  
**WITH PM PROCESS:**
- @PM loads template and configuration
- @PM resolves all placeholders with actual values
- Validation runs automatically after resolution
- Only validated PRBs proceed to execution

### Subagent Protection
**SUBAGENT CONTEXT SAFETY:**
- Subagents receive only validated, self-contained PRBs
- No placeholder resolution needed in subagent context
- No configuration file access required during execution
- Complete isolation and reliability

## Quality Gates

### Validation Quality Standards
**MUST PASS ALL:**
- Zero placeholder patterns detected
- All file paths are absolute (start with /)
- All configuration values are actual booleans/strings
- All dates are in YYYY-MM-DD format
- All content is actual text (no placeholder patterns)

### Error Recovery
**WHEN VALIDATION FAILS:**
1. **Block Subagent Execution**: Immediately prevent execution
2. **Show Clear Error**: List all detected placeholders
3. **Require Main Agent Fix**: Must be resolved in main agent context
4. **Re-validate**: After fixes, run validation again
5. **Proceed Only After Pass**: Execute only after complete validation success

## Learning Integration

### Pattern Capture
**STORE VALIDATION PATTERNS:**
- Common placeholder detection patterns
- Validation failure analysis
- Resolution quality improvements
- Integration success patterns

### Memory Storage Location
`memory/prb-validation/validation-patterns.md` - Validation patterns and improvements

## Commands Integration

### With PRB Creation Commands
- `/icc-create-prb` - Auto-validation after PRB generation
- `/icc-validate-prb [path]` - Manual PRB validation
- `/icc-scan-placeholders [path]` - Comprehensive placeholder scan

### Validation Quality Assurance
**ENFORCE STANDARDS:**
- No PRB execution without validation pass
- Clear error messages for all failures
- Comprehensive placeholder detection
- Protection of subagent execution contexts

---
*PRB validation behavior for intelligent-claude-code system*