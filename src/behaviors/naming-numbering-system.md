# Naming & Numbering System

**MANDATORY:** Consistent naming format and sequential numbering for all work items.

## Imports
@./shared-patterns/enforcement-rules.md

## Standard Naming Format

### Format Rules
- **Standard:** `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **With Parent:** `<PARENT>-<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **Categories:** EPIC, STORY, BUG, AGENTTASK (case sensitive)
- **Numbers:** Zero-padded (001, 002, 003), sequential within category
- **Titles:** Lowercase, hyphen-separated, descriptive
- **Dates:** YYYY-MM-DD format using `$(date +%Y-%m-%d)`

### Valid Examples
- EPIC-001-virtual-team-enhancement-2025-08-26.md
- STORY-001-user-authentication-2025-08-26.md
- BUG-005-naming-format-inconsistency-2025-08-26.md
- STORY-001-AGENTTASK-001-implement-auth-backend-2025-08-26.agenttask.yaml

## Sequential Numbering

### Number Sequences
- **EPIC/STORY/BUG:** Global sequence across project
- **AGENTTASK:** Parent-scoped sequence (STORY-001-AGENTTASK-001, STORY-001-AGENTTASK-002)

### Directory Scanning
**EPIC/STORY:** Search `stories/` directory
**BUG:** Search `bugs/` directory  
**AGENTTASK:** Search `agenttasks/ready/` and `agenttasks/completed/` directories

### Number Generation Process
1. **Scope Determination**: Global (EPIC/STORY/BUG) vs Parent-scoped (AGENTTASK)
2. **Directory Scan**: Search configured directories for pattern matches
3. **Number Extraction**: Extract highest number using regex patterns
4. **Next Calculation**: Add 1, apply zero-padding (001 format)
5. **Conflict Check**: Verify generated number doesn't exist

## Validation & Enforcement

### Pre-Creation Validation
**CHECK:**
- Category in allowed list (EPIC, STORY, BUG, AGENTTASK)
- Number format (zero-padded, sequential)
- Title format (lowercase, hyphens only)
- Date format (YYYY-MM-DD)
- Parent reference exists (for AGENTTASKs)

### Auto-Correction
**COMMON FIXES:**
- Category case correction (story → STORY)
- Number padding (1 → 001)
- Title formatting (spaces → hyphens, lowercase)
- Date generation using system date
- Parent validation and reference

### Error Handling
**NAMING VALIDATION FAILED**
- File: {proposed_name}
- Errors: INVALID_CATEGORY (Category not in allowed list), INVALID_NUMBER_FORMAT (Number not zero-padded), INVALID_TITLE_FORMAT (Title contains invalid characters), PARENT_NOT_FOUND (Referenced parent doesn't exist)
- Suggested Correction: {auto_corrected_name}

## Integration

### With Directory Structure
- Respect configured paths (`story_path`, `bug_path`, `agenttask_path`)
- Auto-create missing directories
- Follow standard directory organization

### With Work Item Creation
- Generate compliant names before file creation
- Validate parent references for AGENTTASKs
- Ensure uniqueness across project scope
- Apply consistent formatting rules

### With Memory System
- Store naming patterns and corrections
- Track validation improvements
- Capture common naming mistakes
- Apply learned corrections automatically

---
*Consistent naming and sequential numbering for all work items*