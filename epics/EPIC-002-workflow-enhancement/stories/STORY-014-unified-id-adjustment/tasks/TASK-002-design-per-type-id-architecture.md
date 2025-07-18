# TASK-002: Design Per-Type ID System Architecture

**⚠️ CORRECTION NOTICE:** This task was completed based on a misunderstanding of the system's nature. The intelligent-claude-code system is a BEHAVIORAL DOCUMENTATION SYSTEM, not software. The correct approach would have been to design ID formatting guidelines and documentation patterns, not a software ID generator. The implementation in TASK-003 has been corrected to proper behavioral documentation. This task is preserved for historical accuracy.

## Task Metadata
- **ID**: TASK-002
- **Title**: Design per-type ID system architecture
- **Assigned To**: @Architect
- **Type**: architecture
- **Priority**: critical_path
- **Status**: completed
- **Story**: STORY-014
- **Dependencies**: ["TASK-001"]

## Task Scope
Design a comprehensive per-type ID generation architecture that maintains sequential numbering within each work item type (EPIC-001, EPIC-002, STORY-001, STORY-002, BUG-001, BUG-002) rather than the current unified sequential system.

## Architecture Design

### 1. ID Generation Architecture

#### Per-Type Counter Storage

```pseudocode
# Storage location: .claude/id-counters.yaml
id_counters:
  epic:
    last_used: 2      # Current highest EPIC-XXX
    prefix: "EPIC"
    format: "EPIC-{:03d}"
  story:
    last_used: 22     # Current highest STORY-XXX
    prefix: "STORY"
    format: "STORY-{:03d}"
  bug:
    last_used: 70     # Current highest BUG-XXX
    prefix: "BUG"
    format: "BUG-{:03d}"
  task:
    # Tasks use parent-relative numbering, no global counter
    format: "TASK-{:03d}"
```

#### ID Generator Module

```pseudocode
CLASS IDGenerator:
    countersFile = ".claude/id-counters.yaml"
    lockFile = ".claude/id-counters.lock"
    
    FUNCTION generateID(itemType):
        // Acquire file lock to prevent race conditions
        acquireLock(lockFile)
        
        TRY:
            // Load current counters
            counters = loadCounters()
            
            // Validate item type
            IF itemType NOT IN ["epic", "story", "bug"]:
                THROW "Invalid item type: " + itemType
            
            // Increment counter
            counters[itemType].last_used += 1
            newID = counters[itemType].last_used
            
            // Format ID
            formattedID = formatID(itemType, newID)
            
            // Save updated counters
            saveCounters(counters)
            
            // Release lock
            releaseLock(lockFile)
            
            RETURN formattedID
            
        CATCH error:
            releaseLock(lockFile)
            THROW error
    
    FUNCTION formatID(itemType, number):
        format = getCounters()[itemType].format
        RETURN format.replace("{:03d}", padNumber(number, 3))
    
    FUNCTION generateTaskID(parentItem):
        // Tasks use parent-relative numbering
        existingTasks = parentItem.tasks || []
        highestTaskNum = 0
        
        FOR task IN existingTasks:
            taskNum = extractTaskNumber(task.id)
            IF taskNum > highestTaskNum:
                highestTaskNum = taskNum
        
        newTaskNum = highestTaskNum + 1
        RETURN "TASK-" + padNumber(newTaskNum, 3)
```

### 2. Storage Mechanism

#### Counter File Structure

```yaml
# .claude/id-counters.yaml
version: "1.0"
updated: "2025-01-18 10:30:00"
updated_by: "@PM"

counters:
  epic:
    last_used: 2
    prefix: "EPIC"
    format: "EPIC-{:03d}"
    created: "2025-01-01"
    
  story:
    last_used: 22
    prefix: "STORY"
    format: "STORY-{:03d}"
    created: "2025-01-01"
    
  bug:
    last_used: 70
    prefix: "BUG"
    format: "BUG-{:03d}"
    created: "2025-01-01"

# History of notable ID assignments
history:
  - id: "EPIC-002"
    title: "Workflow Enhancement"
    created: "2025-01-05"
  - id: "STORY-014"
    title: "Unified ID Adjustment"
    created: "2025-01-18"
```

#### File Locking Mechanism

```pseudocode
FUNCTION acquireLock(lockFile):
    maxRetries = 10
    retryDelay = 100ms
    
    FOR i = 0 TO maxRetries:
        IF NOT fileExists(lockFile):
            // Create lock file with PID
            writeFile(lockFile, {
                pid: getCurrentPID(),
                timestamp: getCurrentTime(),
                operation: "id_generation"
            })
            RETURN true
        
        // Check if lock is stale (>5 seconds old)
        lockData = readFile(lockFile)
        IF getCurrentTime() - lockData.timestamp > 5000:
            // Stale lock, remove and retry
            deleteFile(lockFile)
            CONTINUE
        
        // Wait and retry
        wait(retryDelay)
    
    THROW "Could not acquire lock after " + maxRetries + " attempts"

FUNCTION releaseLock(lockFile):
    IF fileExists(lockFile):
        deleteFile(lockFile)
```

### 3. Integration Points

#### Command Integration

```pseudocode
# Update icc-create-epic.md
FUNCTION createEpic(title, options):
    // Replace hardcoded ID generation with:
    epicID = IDGenerator.generateID("epic")
    
    // Create epic with generated ID
    epic = {
        id: epicID,
        title: title,
        ...
    }

# Update icc-create-story.md
FUNCTION createStory(title, options):
    // Replace hardcoded ID generation with:
    storyID = IDGenerator.generateID("story")
    
    // Create story with generated ID
    story = {
        id: storyID,
        title: title,
        ...
    }

# Update icc-create-bug.md
FUNCTION createBug(title, options):
    // Replace hardcoded ID generation with:
    bugID = IDGenerator.generateID("bug")
    
    // Create bug with generated ID
    bug = {
        id: bugID,
        title: title,
        ...
    }
```

#### Workflow Executor Integration

```pseudocode
# Update lean-workflow-executor.md
FUNCTION createValidatedTasks(story, workType):
    tasks = []
    
    FOR taskDef IN story.task_definitions:
        // Use parent-relative task ID generation
        taskID = IDGenerator.generateTaskID(story)
        
        task = {
            id: taskID,
            ...taskDef
        }
        tasks.append(task)
    
    RETURN tasks
```

### 4. Validation and Uniqueness Guarantees

#### ID Validation Functions

```pseudocode
FUNCTION validateIDFormat(id):
    patterns = {
        epic: /^EPIC-\d{3}$/,
        story: /^STORY-\d{3}$/,
        bug: /^BUG-\d{3}$/,
        task: /^TASK-\d{3}$/
    }
    
    FOR type, pattern IN patterns:
        IF pattern.test(id):
            RETURN {valid: true, type: type}
    
    RETURN {valid: false, error: "Invalid ID format"}

FUNCTION checkIDUniqueness(id, type):
    // Check if ID already exists in filesystem
    searchPatterns = {
        epic: "epics/" + id + "*",
        story: "epics/*/stories/" + id + "*",
        bug: "epics/*/bugs/" + id + "*"
    }
    
    IF type IN searchPatterns:
        matches = glob(searchPatterns[type])
        RETURN matches.length == 0
    
    RETURN true

FUNCTION validateAndReserveID(itemType):
    maxRetries = 3
    
    FOR i = 0 TO maxRetries:
        // Generate new ID
        newID = IDGenerator.generateID(itemType)
        
        // Check uniqueness
        IF checkIDUniqueness(newID, itemType):
            RETURN newID
        
        // ID collision detected, log and retry
        logWarning("ID collision detected: " + newID)
    
    THROW "Could not generate unique ID after " + maxRetries + " attempts"
```

### 5. Migration Strategy

#### Migration Plan

```pseudocode
FUNCTION migrateToPerTypeIDs():
    // Phase 1: Scan existing items
    existingItems = scanExistingWorkItems()
    
    // Phase 2: Initialize counters
    counters = {
        epic: {last_used: 0},
        story: {last_used: 0},
        bug: {last_used: 0}
    }
    
    // Phase 3: Find highest ID per type
    FOR item IN existingItems:
        idInfo = parseID(item.id)
        IF idInfo.number > counters[idInfo.type].last_used:
            counters[idInfo.type].last_used = idInfo.number
    
    // Phase 4: Create counter file
    createCounterFile(counters)
    
    // Phase 5: Update commands to use new system
    updateCommandsToUseIDGenerator()
    
    RETURN {
        status: "success",
        counters: counters,
        message: "Migrated to per-type ID system"
    }

FUNCTION scanExistingWorkItems():
    items = []
    
    // Scan epics
    epicDirs = glob("epics/EPIC-*")
    FOR dir IN epicDirs:
        epicID = extractIDFromPath(dir)
        items.append({id: epicID, type: "epic", path: dir})
    
    // Scan stories
    storyDirs = glob("epics/*/stories/STORY-*")
    FOR dir IN storyDirs:
        storyID = extractIDFromPath(dir)
        items.append({id: storyID, type: "story", path: dir})
    
    // Scan bugs
    bugDirs = glob("epics/*/bugs/BUG-*")
    FOR dir IN bugDirs:
        bugID = extractIDFromPath(dir)
        items.append({id: bugID, type: "bug", path: dir})
    
    RETURN items
```

### 6. Behavioral Module Integration

Create new behavioral module: `src/behaviors/id-generator.md`

```markdown
# ID Generator

**PURPOSE:** Generate unique sequential IDs per work item type
**TYPE:** Core System Component
**STATUS:** ACTIVE

## ID Generation System

### Core ID Generator

```pseudocode
[Include the IDGenerator class from above]
```

### Integration Points

- **Commands**: All create commands use generateID()
- **Workflow**: Task creation uses generateTaskID()
- **Validation**: Pre-creation uniqueness checks
- **Migration**: One-time counter initialization

### Error Handling

```pseudocode
FUNCTION handleIDGenerationError(error):
    SWITCH error.type:
        CASE "lock_timeout":
            logError("Could not acquire lock for ID generation")
            RETURN suggestManualID()
        
        CASE "counter_corruption":
            logError("Counter file corrupted")
            RETURN rebuildCountersFromFilesystem()
        
        CASE "id_collision":
            logError("ID collision detected")
            RETURN retryWithIncrement()
        
        DEFAULT:
            logError("Unknown ID generation error", error)
            THROW error
```

## Benefits

1. **Sequential per type**: EPIC-001, EPIC-002... STORY-001, STORY-002...
2. **No gaps**: Continuous numbering within each type
3. **Race condition safe**: File locking prevents duplicates
4. **Migration friendly**: Can initialize from existing items
5. **Validation built-in**: Uniqueness checks before creation
```

## Implementation Details

### File Locations
- **Counter Storage**: `.claude/id-counters.yaml`
- **Lock File**: `.claude/id-counters.lock`
- **Behavioral Module**: `src/behaviors/id-generator.md`

### Integration Sequence
1. Create behavioral module with ID generator
2. Update create commands to use generator
3. Run migration to initialize counters
4. Test with concurrent operations
5. Document in command reference

### Edge Cases Handled
- Concurrent ID generation (file locking)
- Counter file corruption (rebuild from filesystem)
- ID collisions (retry mechanism)
- Stale locks (timeout detection)
- Migration from existing IDs (scan and initialize)

## Success Criteria
- Sequential IDs within each type (EPIC-001, EPIC-002...)
- No duplicate IDs across concurrent operations
- Seamless migration from current system
- Counter persistence across sessions
- Integration with all create commands

## Completion Details
- **Completed At**: 2025-01-18 10:45:00
- **Completed By**: @Architect
- **Output**: Comprehensive per-type ID system architecture with file-based counter storage, locking mechanism, validation, and migration strategy