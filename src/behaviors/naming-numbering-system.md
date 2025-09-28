# Naming & Numbering System

**MANDATORY:** Consistent naming format and sequential numbering for stories and bugs.

## Imports
@./shared-patterns/enforcement-rules.md

## Standard Naming Format

### Format Rules
- **Standard:** `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **Categories:** EPIC, STORY, BUG (case sensitive)
- **Numbers:** Zero-padded (001, 002, 003), sequential within category
- **Titles:** Lowercase, hyphen-separated, descriptive
- **Dates:** YYYY-MM-DD format using `$(date +%Y-%m-%d)`

### Valid Examples
- EPIC-001-virtual-team-enhancement-2025-08-26.md
- STORY-001-user-authentication-2025-08-26.md
- BUG-005-naming-format-inconsistency-2025-08-26.md

## Sequential Numbering

### Number Sequences
- **EPIC/STORY/BUG:** Global sequence across project

### Directory Scanning
**EPIC/STORY:** Search `stories/` directory
**BUG:** Search `bugs/` directory

### Number Generation Process
1. **Directory Scan**: Search configured directories for pattern matches
2. **Number Extraction**: Extract highest number using regex patterns
3. **Next Calculation**: Add 1, apply zero-padding (001 format)
4. **Conflict Check**: Verify generated number doesn't exist

## Validation & Enforcement

### Pre-Creation Validation
**CHECK:**
- Category in allowed list (EPIC, STORY, BUG)
- Number format (zero-padded, sequential)
- Title format (lowercase, hyphens only)
- Date format (YYYY-MM-DD)

### Auto-Correction
**COMMON FIXES:**
- Category case correction (story → STORY)
- Number padding (1 → 001)
- Title formatting (spaces → hyphens, lowercase)
- Date generation using system date

### Error Handling
**NAMING VALIDATION FAILED**
- File: {proposed_name}
- Errors: INVALID_CATEGORY (Category not in allowed list), INVALID_NUMBER_FORMAT (Number not zero-padded), INVALID_TITLE_FORMAT (Title contains invalid characters)
- Suggested Correction: {auto_corrected_name}

## Integration

### With Directory Structure
- Respect configured paths (`story_path`, `bug_path`)
- Auto-create missing directories
- Follow standard directory organization

### With Work Item Creation
- Generate compliant names before file creation
- Ensure uniqueness across project scope
- Apply consistent formatting rules

### With Memory System
- Store naming patterns and corrections
- Track validation improvements
- Capture common naming mistakes
- Apply learned corrections automatically

---
*Consistent naming and sequential numbering for stories and bugs*