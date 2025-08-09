# Numbering Service Behavior

**MANDATORY:** Generate sequential numbers for work item categories. Prevent collisions.

**PURPOSE:** Manage sequential numbering across all work item categories with proper scoping

## Imports
@./shared-patterns/configuration-patterns.md

## Numbering Scopes

### Category Scopes
- **EPIC:** Global sequence across entire project (EPIC-001, EPIC-002, ...)
- **STORY:** Global sequence across entire project (STORY-001, STORY-002, ...)  
- **BUG:** Global sequence across entire project (BUG-001, BUG-002, ...)
- **PRB:** Scoped to parent work item (STORY-001-PRB-001, STORY-001-PRB-002, ...)

### Directory Scanning Strategy
```
Numbering Directories by Category:
- EPIC: stories/ directory (scan for EPIC-* files)
- STORY: stories/ directory (scan for STORY-* files)
- BUG: bugs/ directory (scan for BUG-* files) 
- PRB: prbs/ready/ and prbs/completed/ directories (scan for *-PRB-* files)
```

## Number Generation Logic

### GetNextNumber Function
```
GetNextNumber(category, parent_id=null, target_directory=null):
  1. **Determine Scope:**
     - If category == "PRB" AND parent_id:
         scope = parent_id + "-PRB-*"
         directories = [prbs/ready/, prbs/completed/]
     - Else:
         scope = category + "-*"
         directories = GetCategoryDirectories(category)
  
  2. **Scan Existing Numbers:**
     - Search directories for files matching scope pattern
     - Extract number from filename (position depends on scope)
     - Parse numbers and find maximum
     - Handle zero-padding in extraction
  
  3. **Generate Next Number:**
     - next_number = max_found_number + 1
     - Apply zero-padding (001 format)
     - Return formatted number
  
  4. **Collision Check:**
     - Verify generated number doesn't exist
     - Handle edge cases and concurrent access
```

### Number Extraction Logic
```
ExtractNumberFromName(filename, category, parent_id=null):
  Examples:
  - STORY-001-title-2025-01-09.md → extract "001"
  - EPIC-025-title-2025-01-09.md → extract "025" 
  - STORY-001-PRB-003-title-2025-01-09.prb.yaml → extract "003" (PRB number)
  
  Pattern Matching:
  - Global scope: {category}-(\d{3})-.*
  - Parent scope: {parent_id}-{category}-(\d{3})-.*
  
  Return: integer value for comparison
```

## Directory Resolution

### GetCategoryDirectories Function
```
GetCategoryDirectories(category):
  Based on project configuration and standard layout:
  
  EPIC: 
    - get_project_path("story_path", "stories")
  
  STORY:
    - get_project_path("story_path", "stories") 
    - get_project_path("story_path", "stories") + "/drafts"
  
  BUG:
    - get_project_path("bug_path", "bugs")
    - "bugs/" (fallback if not configured)
  
  PRB:
    - get_project_path("prb_path", "prbs") + "/ready"
    - get_project_path("prb_path", "prbs") + "/completed"
  
  Return: List of directories to scan
```

## Zero-Padding Management

### Padding Rules
- **Standard:** 3-digit zero-padding (001, 002, 003, ...)
- **Transition:** Maintains padding when crossing boundaries (099 → 100)
- **Consistency:** All numbers in same category use same padding
- **Format:** Zero-pad to 3 digits minimum, expand as needed

### FormatNumber Function
```
FormatNumber(number):
  if number < 100:
    return sprintf("%03d", number)  # 001, 002, ..., 099
  else:
    return sprintf("%d", number)    # 100, 101, 102, ...
```

## Collision Prevention

### Concurrent Access Handling
```
GenerateUniqueNumber(category, parent_id=null):
  max_attempts = 10
  for attempt in 1..max_attempts:
    1. **Get Next Number:** 
       number = GetNextNumber(category, parent_id)
    
    2. **Generate Full Name:**
       proposed_name = BuildWorkItemName(category, number, "temp", current_date, parent_id)
    
    3. **Check Existence:**
       if !FileExists(proposed_name):
         return number
    
    4. **Handle Conflict:**
       Log collision attempt
       Continue to next iteration
  
  ERROR: "Unable to generate unique number after {max_attempts} attempts"
```

### Conflict Resolution
- **Retry Logic:** Up to 10 attempts with incremented numbers
- **Lock-Free:** Use filesystem existence checks instead of locks  
- **Error Handling:** Clear error messages for unresolvable conflicts
- **Logging:** Track collision patterns for system improvement

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

### Parent Validation
```
ValidateParentExists(parent_id):
  1. **Parse Parent ID:**
     category = ExtractCategoryFromID(parent_id)
     number = ExtractNumberFromID(parent_id)
  
  2. **Search for Parent:**
     directories = GetCategoryDirectories(category)
     pattern = parent_id + "-*"
     matches = ScanDirectoriesForPattern(directories, pattern)
  
  3. **Validation:**
     if matches.length == 0:
       ERROR: "Parent not found: {parent_id}"
     if matches.length > 1:
       ERROR: "Ambiguous parent reference: {parent_id}"
     return VALIDATION_PASSED
```

## Performance Optimization

### Caching Strategy
```
Cache Structure:
- category_max_numbers: {category: max_number} (TTL: 5 minutes)
- parent_max_numbers: {parent_id: max_number} (TTL: 5 minutes)  
- directory_scans: {directory: file_list} (TTL: 1 minute)
```

### Incremental Updates
- **On File Creation:** Update cached max number for category/parent
- **On File Deletion:** Invalidate cache to force rescan
- **On Directory Change:** Invalidate directory scan cache

## Error Handling

### Common Error Scenarios
```
Error Types:
- INVALID_CATEGORY: Unknown work item category
- PARENT_NOT_FOUND: Referenced parent doesn't exist
- DIRECTORY_ACCESS_ERROR: Cannot read work item directories
- NUMBER_COLLISION: Cannot generate unique number
- FORMAT_ERROR: Cannot parse number from existing filename
```

### Error Recovery
```
Recovery Actions:
- INVALID_CATEGORY: Validate against allowed categories list
- PARENT_NOT_FOUND: Search with fuzzy matching, suggest corrections
- DIRECTORY_ACCESS: Create missing directories, check permissions
- NUMBER_COLLISION: Retry with incremented attempts
- FORMAT_ERROR: Log malformed filename, continue scan
```

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