# Numbering Instructions

**MANDATORY:** Use sequential numbers for work items in each category.

**PURPOSE:** Keep numbers organized and sequential for all work item categories

## Imports
@./shared-patterns/configuration-patterns.md

## How Numbers Work

### Number Sequences for Each Category
- **EPIC:** Numbers go across the whole project (EPIC-001, EPIC-002, ...)
- **STORY:** Numbers go across the whole project (STORY-001, STORY-002, ...)  
- **BUG:** Numbers go across the whole project (BUG-001, BUG-002, ...)
- **PRB:** Numbers are separate for each parent work item (STORY-001-PRB-001, STORY-001-PRB-002, ...)

### Where to Look for Existing Numbers
To find what numbers are already used:
- **EPIC:** Check stories/ directory for EPIC-* files
- **STORY:** Check stories/ directory for STORY-* files
- **BUG:** Check bugs/ directory for BUG-* files
- **PRB:** Check prbs/ready/ and prbs/completed/ directories for *-PRB-* files

### Commands to Find Next Available Numbers
**Template for all categories:**
```bash
# General pattern: CATEGORY-NUMBER-title-date.extension
HIGHEST=$(ls [directory] | grep "^[PATTERN]-" | sed 's/[PATTERN]-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
echo "[PATTERN]-${NEXT}-title-$(date +%Y-%m-%d).[ext]"

# Examples:
# STORY: ls stories/ | grep "^STORY-" | sed 's/STORY-\([0-9]*\)-.*/\1/' | sort -n | tail -1
# BUG: ls bugs/ | grep "^BUG-" | sed 's/BUG-\([0-9]*\)-.*/\1/' | sort -n | tail -1  
# PRB: ls prbs/ready/ prbs/completed/ | grep "^STORY-001-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1
```

## How to Get the Next Number

### Number Generation Process
1. **Scope determination**: PRB with parent → search parent scope; otherwise global scope
2. **Directory scan**: Search configured directories for pattern matches  
3. **Number extraction**: Extract highest number using regex patterns
4. **Next calculation**: Add 1, apply zero-padding (001 format)
5. **Conflict check**: Verify generated number doesn't exist

**Filename patterns:**
- Global: `{category}-(\d{3})-.*` (STORY-001-title.md → "001")
- Parent-child: `{parent_id}-{category}-(\d{3})-.*` (STORY-001-PRB-003-title.prb.yaml → "003")

## Finding the Right Directories

### Directory Configuration

| Category | Directories | Configuration |
|----------|-------------|---------------|
| **EPIC** | story_path | "stories" (default) |
| **STORY** | story_path, story_path/drafts | "stories" (default) |
| **BUG** | bug_path | "bugs" (default) |
| **PRB** | prb_path/ready, prb_path/completed | "prbs" (default) |

## Number Formatting Rules

### Number Formatting
- **Standard**: 3-digit zero-padding (001, 002, 003)
- **Beyond 99**: Regular format (100, 101, 102)
- **Format function**: `printf "%03d"` for <100, regular for ≥100

## Avoiding Number Conflicts

### Collision Prevention
**Process**: Try up to 10 attempts → Generate number → Build filename → Check existence → Use if unique or retry
**Recovery**: Filesystem-based checks, no locks needed, helpful error messages after 10 failed attempts

## Parent-Child Relationships

### PRB Numbering Under Parents
```
Examples:
- STORY-001-PRB-001-implementation-2025-01-09.prb.yaml
- STORY-001-PRB-002-testing-2025-01-09.prb.yaml
- BUG-005-PRB-001-bug-fix-2025-01-09.prb.yaml

Scoping Rules:
- Each parent starts PRB numbering at 001
- PRB numbers are independent between parents
- STORY-001-PRB-001 and STORY-002-PRB-001 can coexist
```

### Parent Validation Process

**Purpose:** Verify that parent work item exists before creating child PRB

**Steps to Validate Parent Reference:**
1. **Parse Parent ID:** Extract the category and number from the parent work item ID
2. **Search for Parent:** Look in appropriate directories for files matching the parent pattern
3. **Verify Existence:** Confirm exactly one matching parent file exists

**Validation Rules:**
- Parent must exist in the correct directory for its category
- Parent ID must be unambiguous (only one file should match)
- Error if no parent found: "Parent not found: {parent_id}"
- Error if multiple matches: "Ambiguous parent reference: {parent_id}"
- Success when exactly one valid parent is found

## Performance & Error Handling

### Efficient Number Tracking
**Track Current Numbers:**
- Keep track of highest number for each category
- Store highest number for each parent work item
- Remember recent directory scans for faster lookups

### Smart Updates
- **When Creating Files:** Update the stored highest number for that category/parent
- **When Deleting Files:** Refresh stored numbers to ensure accuracy
- **When Directory Changes:** Re-scan directories to get current state

## Error Handling

### Common Error Scenarios

**Types of Errors You Might Encounter:**
- **INVALID_CATEGORY:** Work item category not recognized (must be EPIC, STORY, BUG, or PRB)
- **PARENT_NOT_FOUND:** Referenced parent work item doesn't exist in the system
- **DIRECTORY_ACCESS_ERROR:** Cannot read work item directories (permission or path issues)
- **NUMBER_COLLISION:** Cannot generate a unique number after multiple attempts
- **FORMAT_ERROR:** Cannot parse number from existing filename format

### Error Recovery

**How to Handle Different Error Types:**
- **INVALID_CATEGORY:** Check against the allowed categories list (EPIC, STORY, BUG, PRB)
- **PARENT_NOT_FOUND:** Search with similar names to suggest corrections
- **DIRECTORY_ACCESS:** Create missing directories and check file permissions
- **NUMBER_COLLISION:** Try again with the next available numbers (up to 10 attempts)
- **FORMAT_ERROR:** Log the malformed filename and continue scanning other files

## Integration Points

### With Naming Enforcement
- **Number Validation:** Validate proposed numbers are sequential
- **Number Generation:** Generate next available number for new items
- **Collision Prevention:** Ensure generated names are unique

### With File Operations
- **Creation:** Generate number before file creation
- **Renaming:** Update numbering when files are renamed
- **Deletion:** Optionally compact numbers or leave gaps

### With Memory System
- **Pattern Storage:** Store numbering patterns and collision data
- **Learning:** Improve numbering strategy based on usage patterns

## Commands

### Number Management Commands
- `/icc-get-next-number [category] [parent_id]` - Get next available number
- `/icc-validate-number [category] [number] [parent_id]` - Validate number is available
- `/icc-renumber-category [category]` - Renumber all items in category (dangerous)
- `/icc-number-gaps [category]` - Show gaps in numbering sequence
- `/icc-max-numbers` - Display current max numbers for all categories

---
*Sequential numbering service for intelligent-claude-code work items*