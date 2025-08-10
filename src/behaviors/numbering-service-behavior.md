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
**MANDATORY:** Use these bash commands to get the next number to use:

**For Stories:**
```bash
# Get highest STORY number
HIGHEST=$(ls stories/ | grep "^STORY-" | sed 's/STORY-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
echo "STORY-${NEXT}-title-$(date +%Y-%m-%d).md"
```

**For Bugs:**
```bash
# Get highest BUG number
HIGHEST=$(ls bugs/ | grep "^BUG-" | sed 's/BUG-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
echo "BUG-${NEXT}-title-$(date +%Y-%m-%d).md"
```

**For PRBs under parent:**
```bash
# Get highest PRB number under STORY-001
HIGHEST=$(ls prbs/ready/ prbs/completed/ | grep "^STORY-001-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
echo "STORY-001-PRB-${NEXT}-title-$(date +%Y-%m-%d).prb.yaml"
```

## How to Get the Next Number

### Steps to Find Next Available Number
To get the next number for any category, follow these steps:

1. **Decide what to look for:**
   - If category is "PRB" and has a parent:
     Look for pattern: parent_id + "-PRB-*" 
     Search in: prbs/ready/ and prbs/completed/ directories
   - For other categories:
     Look for pattern: category + "-*"
     Search in the category's main directory

2. **Find existing numbers:**
   - Search directories for files matching the pattern
   - Extract the number from each filename
   - Convert numbers and find the highest one
   - Handle zero-padding correctly when extracting

3. **Calculate next number:**
   - Take the highest found number and add 1
   - Format with zero-padding (001 format)
   - Return the formatted number

4. **Double-check:**
   - Make sure the generated number doesn't already exist
   - Handle any edge cases

### Examples of Getting Numbers from Filenames
Here's how to extract numbers from different filename patterns:

**Examples:**
- `STORY-001-title-2025-01-09.md` → get "001"
- `EPIC-025-title-2025-01-09.md` → get "025" 
- `STORY-001-PRB-003-title-2025-01-09.prb.yaml` → get "003" (the PRB number)

**Patterns to match:**
- For global categories: {category}-(\d{3})-.*
- For parent-child: {parent_id}-{category}-(\d{3})-.*

Convert the extracted text to a number for comparison.

## Finding the Right Directories

### Where to Look for Each Category
Based on project configuration, look in these directories:

**EPIC:** 
- Use the configured story_path (or "stories" if not configured)

**STORY:**
- Use the configured story_path (or "stories" if not configured)
- Also check story_path + "/drafts"

**BUG:**
- Use the configured bug_path (or "bugs" if not configured)

**PRB:**
- Use the configured prb_path + "/ready" (or "prbs/ready" if not configured)  
- Use the configured prb_path + "/completed" (or "prbs/completed" if not configured)

## Number Formatting Rules

### How to Format Numbers
- **Standard:** Always use 3-digit zero-padding (001, 002, 003, ...)
- **After 99:** Keep regular format when going past 099 (becomes 100, 101, 102, ...)
- **Consistency:** All numbers in the same category should use the same format
- **Rule:** Zero-pad to 3 digits minimum, use more digits if needed

### How to Format a Number
- If the number is less than 100: use `printf "%03d"` to get format like 001, 002, 099
- If the number is 100 or more: use regular format like 100, 101, 102

## Avoiding Number Conflicts

### How to Make Sure Numbers Are Unique
When generating a number, follow these steps to avoid conflicts:

**Try up to 10 times:**
1. **Get the next number:** Find the next available number for the category
2. **Build the full filename:** Create the complete work item name with the number
3. **Check if it exists:** Use file system tools to see if this name is already used
4. **If it doesn't exist:** Use this number
5. **If it does exist:** Note the collision and try the next number

**If you can't find a unique number after 10 tries:** Show error "Unable to generate unique number after 10 attempts"

### How to Handle Conflicts
- **Try again:** Up to 10 attempts with the next available numbers
- **No locks needed:** Just check if files exist in the filesystem
- **Clear errors:** Give helpful error messages if something goes wrong
- **Keep track:** Record collision patterns to improve the system

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

## Performance Optimization

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