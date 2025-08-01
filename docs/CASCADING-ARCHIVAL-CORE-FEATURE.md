# Cascading Archival Core Feature Documentation

## Overview

The cascading archival behavior is a CORE REQUIREMENT of the command-driven archival system. This feature implements the fundamental requirement that "the system should automatically archive tasks if the story is done". When archiving a parent item (epic or story), all completed child items MUST be automatically included in the operation.

## Key Changes

### 1. Cascading Logic Implementation

Added recursive archival logic in `archival-intelligence.md`:
- Epic archival cascades to all completed stories/bugs
- Story/bug archival cascades to all completed tasks
- Maintains completion status validation at each level

### 2. Enhanced Detection

Updated detection engine to:
- Include epic-level items for archival
- Skip child scanning when parent will be archived
- Prevent duplicate archival attempts

### 3. Hierarchy Support

```
Epic (COMPLETED + ARCHIVED)
├── Story-1 (COMPLETED) → Auto-archived
│   ├── Task-1 (COMPLETED) → Auto-archived
│   └── Task-2 (COMPLETED) → Auto-archived
└── Story-2 (COMPLETED) → Auto-archived
    └── Task-3 (COMPLETED) → Auto-archived
```

## Usage

### Archive an Epic (cascades to all children)
```bash
@PM archive-item EPIC-001
# Archives epic + all completed stories + all their tasks
```

### Archive a Story (cascades to tasks only)
```bash
@PM archive-item STORY-001
# Archives story + all its completed tasks
```

### Archive Everything Completed
```bash
@PM archive-completed
# Scans and archives all eligible items with cascading
```

## Important Behaviors

1. **Manual Trigger Required**: Marking items as COMPLETED + ARCHIVED does NOT trigger archival
2. **Automatic Cascading**: Once triggered, cascading happens automatically
3. **Safety Preserved**: Only completed items are archived
4. **Selective Control**: Can still archive individual items without parents

## Architecture Details

### Cascading Flow
```pseudocode
FUNCTION executeArchival(candidate):
    // Archive the main item
    archiveMainItem(candidate)
    
    // Cascade based on type
    IF candidate.type == "epic":
        stories = getStoriesForEpic(candidate.item)
        FOR EACH story IN stories:
            IF story.status == "COMPLETED":
                executeArchival({type: "story", item: story})
    
    ELSE IF candidate.type IN ["story", "bug"]:
        tasks = getTasksForItem(candidate.item)
        FOR EACH task IN tasks:
            IF task.status == "COMPLETED":
                archiveTask(task, archivePath)
```

### Archive Structure
```
archives/
├── completed/          # Git-tracked
│   ├── epics/
│   ├── stories/
│   └── bugs/
└── tasks/             # Not git-tracked
```

## Peer Review Results

**Verdict**: APPROVED with Recommendations
**Score**: 8/10

### Strengths
- Sound cascading logic with clear hierarchy
- Manual nature perfectly preserved
- Elegant recursive implementation
- Proper error handling with rollback

### Implementation Considerations
1. Add recursion depth protection
2. Implement hierarchy caching for performance
3. Handle multi-parent scenarios
4. Batch git operations for efficiency

## Testing

See `/test/cascading-archival-demo.md` for test scenarios demonstrating:
- Epic → Stories → Tasks cascading
- Story → Tasks cascading
- Selective archival options

## Commit Information

- **Core Feature**: Cascading archival behavior (required functionality)
- **Files Modified**: 
  - `src/behaviors/archival-intelligence.md`
  - `docs/archival-system.md`
  - `test/cascading-archival-demo.md`
- **Maintains**: Manual command-driven operation