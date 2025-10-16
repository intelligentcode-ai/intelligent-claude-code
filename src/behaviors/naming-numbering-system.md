# Naming & Numbering System

**MANDATORY:** Consistent naming format and sequential numbering. Auto-correct violations.

## Imports
@./shared-patterns/enforcement-rules.md

## Format Rules

**Standard**: `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
**Categories**: EPIC, STORY, BUG (case sensitive)
**Numbers**: Zero-padded (001, 002, 003), sequential within category
**Titles**: Lowercase, hyphen-separated, descriptive
**Dates**: YYYY-MM-DD format using `$(date +%Y-%m-%d)`

**Examples**: EPIC-001-virtual-team-enhancement-2025-08-26.md, STORY-001-user-authentication-2025-08-26.md

## Sequential Numbering

**Sequences**: EPIC/STORY/BUG global sequence across project
**Directory Scanning**: EPIC/STORY in stories/, BUG in bugs/

### Number Generation
1. Scan directories for pattern matches
2. Extract highest number using regex
3. Add 1, apply zero-padding (001 format)
4. Verify generated number doesn't exist

## Validation

**Pre-Creation Checks**: Category in allowed list, number format (zero-padded), title format (lowercase, hyphens), date format (YYYY-MM-DD)

**Auto-Correction**: Category case (story → STORY), number padding (1 → 001), title formatting (spaces → hyphens, lowercase), date generation

## Integration

Respect configured paths (story_path, bug_path), generate compliant names before file creation, ensure uniqueness, apply consistent formatting.

---
*Consistent naming and sequential numbering for stories and bugs*
