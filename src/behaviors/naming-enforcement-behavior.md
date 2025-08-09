# Naming Format Instructions

**MANDATORY:** All work items MUST follow standard naming format.

**PURPOSE:** Keep naming consistent across all work items (EPICs, STORYs, BUGs, PRBs)

## Imports
@./shared-patterns/configuration-patterns.md
@./numbering-service-behavior.md

## Standard Naming Format

### Format Rules
- **Standard:** `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **With Parent:** `<PARENT>-<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **Categories:** EPIC, STORY, BUG, PRB (case sensitive)
- **Numbers:** Zero-padded (001, 002, ..., 099, 100), sequential within category
- **Titles:** Lowercase, hyphen-separated, descriptive
- **Dates:** YYYY-MM-DD (current date for new items)

### How to Get Current Date
**MANDATORY:** When creating new work items, always get current date using:
```bash
CURRENT_DATE=$(date +%Y-%m-%d)
```
**NEVER** hardcode dates like "2025-01-09" - always get date from system for accuracy.

### Valid Examples
- `EPIC-001-virtual-team-enhancement-2025-01-09.md`
- `STORY-001-mcp-installation-2025-01-09.md`
- `BUG-005-naming-format-inconsistency-2025-01-09.md`
- `STORY-001-PRB-001-ansible-playbook-update-2025-01-09.prb.yaml`
- `BUG-005-PRB-001-naming-format-enforcement-2025-01-09.prb.yaml`

### Invalid Examples
- `story-1-something.md` (wrong category case, no zero-padding, no date)
- `TASK-001-example-2025-01-09.md` (invalid category)
- `STORY-1-Example_Title-2025-01-09.md` (no zero-padding, spaces/underscores)
- `STORY-001-title-25-01-09.md` (invalid date format)

## How to Validate Names

### Steps to Check Work Item Names
To validate a work item name, follow these steps:

1. **Break down the name:**
   - Extract category, number, title, date from name
   - Check for parent reference if applicable

2. **Check category:**
   - Must be one of: EPIC, STORY, BUG, PRB
   - Case sensitive - must be uppercase
   - Show error: "❌ Invalid category: {category}. Must be EPIC|STORY|BUG|PRB"

3. **Check number:**
   - Must be zero-padded (001, 002, etc.)
   - Must be sequential within category/parent scope
   - Find next available number by looking at existing files
   - Show error: "❌ Invalid number format. Use zero-padded: 001, 002, etc."

4. **Check title:**
   - Must be lowercase
   - Must use hyphens only (no spaces, underscores, special chars)
   - Must be descriptive (>3 characters)
   - Show error: "❌ Invalid title format. Use lowercase-with-hyphens"

5. **Check date:**
   - Must be YYYY-MM-DD format
   - Must be reasonable (not future date >30 days, not before 2024)
   - Use current date for new items
   - Show error: "❌ Invalid date format. Use YYYY-MM-DD"

6. **Check parent reference (for PRBs):**
   - Parent must exist if specified
   - Parent format must be valid
   - Show error: "❌ Parent reference invalid or not found: {parent_id}"

### How to Fix Invalid Names
When you find an invalid name, fix it by following these steps:

1. **Fix category:**
   - Convert lowercase to uppercase
   - Map common aliases (task→STORY, requirement→PRB)

2. **Generate number:**
   - Find the next available number for the category
   - Apply zero-padding automatically

3. **Fix title:**
   - Convert to lowercase
   - Replace spaces with hyphens
   - Replace underscores with hyphens
   - Remove special characters except hyphens
   - Make sure it's longer than 3 characters

4. **Set date:**
   - Use current date (YYYY-MM-DD) if missing: `CURRENT_DATE=$(date +%Y-%m-%d)`
   - Check existing date format is valid

5. **Create corrected name:**
   - Combine all the corrected parts
   - Check that the final name doesn't already exist
   - Return the corrected name

## When to Apply These Instructions

### Before Creating PRBs
**When:** Before creating PRB files
**What to do:**
- Check that generated PRB name follows format
- Make sure parent reference exists and is valid
- Fix automatically if needed, record corrections

### When @PM Creates PRBs from Stories
**When:** When @PM breaks down stories into PRBs
**What to do:**
- Make sure generated PRB names follow parent-child format
- Use sequential numbering within story scope
- Keep date consistent across related PRBs

### Before Creating Any Work Item
**When:** Creating any work item file
**What to do:**
- Block creation of names that don't follow rules
- Suggest corrections
- Record patterns for learning

## Error Handling

### Validation Failures
```
ValidationError Types:
- INVALID_CATEGORY: Category not in allowed list
- INVALID_NUMBER_FORMAT: Number not zero-padded or sequential
- INVALID_TITLE_FORMAT: Title contains spaces, uppercase, or special chars
- INVALID_DATE_FORMAT: Date not YYYY-MM-DD format
- PARENT_NOT_FOUND: Referenced parent doesn't exist
- NAME_ALREADY_EXISTS: Generated name conflicts with existing file
```

### Error Response Format
```markdown
❌ NAMING VALIDATION FAILED
File: {proposed_name}
Errors:
- {error_type}: {error_message}
- {error_type}: {error_message}

Suggested Correction: {auto_corrected_name}

Would you like to:
1. Use suggested correction
2. Manually specify compliant name
3. Cancel operation
```

### Recovery Actions
- **AUTO_CORRECTABLE:** Apply correction automatically and proceed
- **USER_INPUT_NEEDED:** Request user confirmation for correction
- **BLOCK_OPERATION:** Prevent creation until compliant name provided
- **LOG_PATTERN:** Store validation pattern for future improvement

## Performance Optimization

### Caching Strategy
- **Category Lists:** Cache allowed categories (static data)
- **Number Sequences:** Cache current max numbers per category (1 min TTL)
- **Parent References:** Cache parent validation (5 min TTL)
- **Name Validation:** Cache validation results (1 min TTL)

### Batch Operations
- **Bulk Validation:** Validate multiple names in single operation
- **Batch Correction:** Apply corrections to multiple files
- **Progress Reporting:** Show progress for large batch operations

## Learning Integration

### Pattern Capture
Store successful validations and corrections in memory:
- Common correction patterns
- Validation failure types
- User preference patterns
- Performance metrics

### Memory Storage Location
`memory/enforcement/naming-standards.md` - Validation patterns and corrections
`memory/system-organization/file-management.md` - Bulk operation learnings

---
*Naming enforcement behavior for intelligent-claude-code system*