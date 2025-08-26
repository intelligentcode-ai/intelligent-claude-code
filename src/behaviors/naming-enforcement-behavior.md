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

### Date Handling
**MANDATORY:** Always use current system date for new items in YYYY-MM-DD format. Never hardcode specific dates.

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

## Validation Requirements

### Component Validation
- **Category**: Must be EPIC, STORY, BUG, or PRB (case-sensitive uppercase)
- **Number**: Zero-padded sequential numbers within scope (001, 002, etc.)
- **Title**: Lowercase, hyphen-separated, descriptive (>3 characters)
- **Date**: YYYY-MM-DD format, reasonable date range
- **Parent Reference**: Must exist if specified (for PRBs only)

### Correction Logic
- Auto-correct category case and common aliases
- Generate next available sequential number
- Normalize title format (lowercase, hyphens only)
- Use current system date if missing
- Verify final name uniqueness

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

### Error Types
- INVALID_CATEGORY, INVALID_NUMBER_FORMAT, INVALID_TITLE_FORMAT
- INVALID_DATE_FORMAT, PARENT_NOT_FOUND, NAME_ALREADY_EXISTS

### Recovery Actions  
- Auto-correction for format issues
- User confirmation for ambiguous cases
- Block creation until compliant name provided
- Pattern logging for system improvement

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