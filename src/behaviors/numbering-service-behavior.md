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

### Number Discovery Process
**Pattern matching for each category:**
- Scan configured directories for existing files
- Extract numbers using category-specific patterns  
- Find highest number and increment
- Apply zero-padding format (001, 002, etc.)

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
Each category uses configured directory paths with defaults:
- **EPIC/STORY**: story_path ("stories")
- **BUG**: bug_path ("bugs")  
- **PRB**: prb_path/ready and prb_path/completed ("prbs")

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
**Scoping Rules:**
- Each parent starts PRB numbering at 001
- PRB numbers are independent between parents
- Format: PARENT-ID-PRB-NUMBER-title-date.prb.yaml

### Parent Validation
**Requirements:**
- Parent work item must exist before creating child PRB
- Parent ID must be unambiguous (exactly one match)
- Search appropriate directories for parent pattern

## Performance & Error Handling

### Efficient Number Tracking
- Track highest number for each category/parent
- Cache recent directory scans for performance
- Update counters on file operations

## Error Handling

### Error Scenarios
- **INVALID_CATEGORY**: Not EPIC, STORY, BUG, or PRB
- **PARENT_NOT_FOUND**: Referenced parent doesn't exist
- **DIRECTORY_ACCESS_ERROR**: Cannot read directories
- **NUMBER_COLLISION**: Cannot generate unique number
- **FORMAT_ERROR**: Cannot parse existing filename

### Recovery Strategies
- Auto-create missing directories
- Retry number generation (up to 10 attempts)
- Suggest similar names for missing parents
- Log malformed filenames and continue

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

## Integration
- Number validation with naming enforcement
- Number generation for file operations
- Pattern storage for memory system learning

---
*Sequential numbering service for intelligent-claude-code work items*