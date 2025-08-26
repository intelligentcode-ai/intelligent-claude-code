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
**NEVER** hardcode specific dates - always get date from system for accuracy.

### Valid Examples
- `EPIC-001-virtual-team-enhancement-YYYY-MM-DD.md`
- `STORY-001-user-authentication-YYYY-MM-DD.md`
- `BUG-005-naming-format-inconsistency-YYYY-MM-DD.md`
- `STORY-001-PRB-001-implement-auth-backend-YYYY-MM-DD.prb.yaml`
- `BUG-005-PRB-001-fix-naming-enforcement-YYYY-MM-DD.prb.yaml`

### Invalid Examples
- `story-1-something.md` (wrong category case, no zero-padding, no date)
- `TASK-001-example-YYYY-MM-DD.md` (invalid category)
- `STORY-1-Example_Title-YYYY-MM-DD.md` (no zero-padding, spaces/underscores)
- `STORY-001-title-YY-MM-DD.md` (invalid date format)

## Validation Process

### Steps to Check Work Item Names
1. **Break down the name**: Extract category, number, title, date from name
2. **Check category**: Must be one of: EPIC, STORY, BUG, PRB (case sensitive)
3. **Check number**: Must be zero-padded (001, 002, etc.) and sequential
4. **Check title**: Must be lowercase, hyphen-separated, descriptive (>3 characters)
5. **Check date**: Must be YYYY-MM-DD format
6. **Check parent reference (for PRBs)**: Parent must exist if specified

### How to Fix Invalid Names
1. **Fix category**: Convert lowercase to uppercase, map common aliases (task→STORY)
2. **Generate number**: Find next available number for category, apply zero-padding
3. **Fix title**: Convert to lowercase, replace spaces/underscores with hyphens
4. **Set date**: Use current date (YYYY-MM-DD) if missing: `CURRENT_DATE=$(date +%Y-%m-%d)`
5. **Create corrected name**: Combine all corrected parts and verify uniqueness

## When to Apply These Instructions

### Before Creating PRBs
- Check that generated PRB name follows format
- Make sure parent reference exists and is valid
- Fix automatically if needed, record corrections

### When @PM Creates PRBs from Stories
- Make sure generated PRB names follow parent-child format
- Use sequential numbering within story scope
- Keep date consistent across related PRBs

### Before Creating Any Work Item
- Block creation of names that don't follow rules
- Suggest corrections
- Record patterns for learning

## Error Handling

### Validation Failures
**ValidationError Types:**
- INVALID_CATEGORY: Category not in allowed list
- INVALID_NUMBER_FORMAT: Number not zero-padded or sequential
- INVALID_TITLE_FORMAT: Title contains spaces, uppercase, or special chars
- INVALID_DATE_FORMAT: Date not YYYY-MM-DD format
- PARENT_NOT_FOUND: Referenced parent doesn't exist
- NAME_ALREADY_EXISTS: Generated name conflicts with existing file

### Error Response Format
```markdown
❌ NAMING VALIDATION FAILED
File: {proposed_name}
Errors:
- {error_type}: {error_message}

Suggested Correction: {auto_corrected_name}

Would you like to:
1. Use suggested correction
2. Manually specify compliant name
3. Cancel operation
```

### Recovery Actions
- **AUTO_CORRECTABLE**: Apply correction automatically and proceed
- **USER_INPUT_NEEDED**: Request user confirmation for correction
- **BLOCK_OPERATION**: Prevent creation until compliant name provided
- **LOG_PATTERN**: Store validation pattern for future improvement

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