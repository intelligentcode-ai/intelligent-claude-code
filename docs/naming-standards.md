# Naming Standards Guide

**Complete guide to naming format enforcement in intelligent-claude-code system**

## Standard Naming Format

### Format Rules
All work items (EPICs, STORYs, BUGs, PRBs) MUST follow consistent naming format:

- **Standard:** `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **With Parent:** `<PARENT>-<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **Categories:** EPIC, STORY, BUG, PRB (case sensitive)
- **Numbers:** Zero-padded (001, 002, ..., 099, 100), sequential within category
- **Titles:** Lowercase, hyphen-separated, descriptive
- **Dates:** YYYY-MM-DD (current date for new items)

### Critical Date Requirement
**MANDATORY:** Always use system command to get current date:
```bash
CURRENT_DATE=$(date +%Y-%m-%d)
```
**NEVER** hardcode dates like "2025-01-09" - always retrieve from system for accuracy.

## Valid Examples

### Work Items
- `EPIC-001-virtual-team-enhancement-2025-08-09.md`
- `STORY-001-mcp-installation-2025-08-09.md`  
- `BUG-005-naming-format-inconsistency-2025-08-09.md`

### PRBs (with parent reference)
- `STORY-001-PRB-001-ansible-playbook-update-2025-08-09.prb.yaml`
- `BUG-005-PRB-001-naming-format-enforcement-2025-08-09.prb.yaml`

## Invalid Examples (with explanations)

- ❌ `story-1-something.md` (wrong category case, no zero-padding, no date)
- ❌ `TASK-001-example-2025-08-09.md` (invalid category - use STORY instead)
- ❌ `STORY-1-Example_Title-2025-08-09.md` (no zero-padding, mixed case title, underscores)
- ❌ `STORY-001-title-25-08-09.md` (invalid date format - must be YYYY-MM-DD)
- ❌ `STORY-001-title-2025-01-09.md` (hardcoded date - use system date)

## Getting Next Available Numbers

### For Stories
```bash
# Get highest STORY number
HIGHEST=$(ls stories/ | grep "^STORY-" | sed 's/STORY-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
CURRENT_DATE=$(date +%Y-%m-%d)
echo "STORY-${NEXT}-title-${CURRENT_DATE}.md"
```

### For Bugs
```bash
# Get highest BUG number
HIGHEST=$(ls bugs/ | grep "^BUG-" | sed 's/BUG-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
CURRENT_DATE=$(date +%Y-%m-%d)
echo "BUG-${NEXT}-title-${CURRENT_DATE}.md"
```

### For PRBs under Parent
```bash
# Get highest PRB number under STORY-001
HIGHEST=$(ls prbs/ready/ prbs/completed/ | grep "^STORY-001-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
CURRENT_DATE=$(date +%Y-%m-%d)
echo "STORY-001-PRB-${NEXT}-title-${CURRENT_DATE}.prb.yaml"
```

## Validation Rules

### Category Validation
- Must be one of: EPIC, STORY, BUG, PRB
- Case sensitive (uppercase only)
- No aliases allowed (e.g., TASK → use STORY)

### Number Validation
- Must be zero-padded (001, 002, 003, ...)
- Must be sequential within category/parent scope
- Use NumberingService to get next available number
- No gaps allowed without justification

### Title Validation
- Must be lowercase only
- Must use hyphens for word separation (no spaces, underscores, or special characters)
- Must be descriptive (minimum 3 characters)
- Should briefly describe the work

### Date Validation
- Must be YYYY-MM-DD format
- Must be current system date for new items
- Must be retrieved using: `date +%Y-%m-%d`
- No hardcoded dates allowed

### Parent Reference Validation (PRBs only)
- Parent must exist in appropriate directory
- Parent format must be valid
- Parent-child relationship properly maintained

## Error Messages

When validation fails, clear error messages guide correction:

```
❌ NAMING VALIDATION FAILED
File: story-1-bad-example.md
Errors:
- INVALID_CATEGORY: Category "story" invalid. Must be STORY (uppercase)
- INVALID_NUMBER_FORMAT: Number "1" invalid. Use zero-padded: 001, 002, etc.
- INVALID_DATE_FORMAT: Missing date. Use YYYY-MM-DD format

Suggested Correction: STORY-001-bad-example-2025-08-09.md

Would you like to:
1. Use suggested correction
2. Manually specify compliant name  
3. Cancel operation
```

## Auto-Correction Features

The system automatically corrects common naming violations:

- **Category:** Converts lowercase to uppercase (story → STORY)
- **Aliases:** Maps common aliases (task → STORY, requirement → PRB)
- **Numbers:** Applies zero-padding and sequential numbering
- **Titles:** Converts to lowercase, replaces spaces/underscores with hyphens
- **Dates:** Uses current system date if missing

## Directory Structure

### Work Item Locations
- **EPICs:** `stories/` directory
- **STORYs:** `stories/` directory (and `stories/drafts/` for WIP)
- **BUGs:** `bugs/` directory
- **PRBs:** `prbs/ready/` (active) and `prbs/completed/` (finished)

### Scanning Strategy
The numbering service scans these directories to determine next available numbers:
- Global sequences for EPIC, STORY, BUG
- Parent-scoped sequences for PRBs

## Integration Points

### With PRB System
- All PRBs must follow naming format
- Parent references validated before PRB creation
- Auto-correction applied during generation

### With Story Breakdown
- Generated PRB names follow parent-child format
- Sequential numbering within story scope
- Date consistency across related PRBs

### With Memory System
- Naming patterns stored in memory for learning
- Validation failures captured for improvement
- Success patterns replicated

## Best Practices

1. **Always use system date:** Never hardcode dates in filenames
2. **Descriptive titles:** Make titles clear and specific
3. **Consistent format:** Follow format exactly for all work items
4. **Sequential numbering:** Use NumberingService for proper sequences
5. **Validate before creation:** Check format compliance before file creation

## Troubleshooting

### Common Issues
1. **Date discrepancies:** Ensure using `date +%Y-%m-%d` command
2. **Number gaps:** Use NumberingService to find next available number
3. **Parent not found:** Verify parent work item exists before creating PRB
4. **Case sensitivity:** Ensure categories are uppercase (STORY, not story)

### Recovery Actions
- Use auto-correction suggestions when available
- Manually specify compliant name if auto-correction fails
- Check parent directory for valid parent work items
- Verify system date command accessibility

---
*Complete naming standards guide for intelligent-claude-code system*