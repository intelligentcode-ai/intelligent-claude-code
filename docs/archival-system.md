# AI-Agentic Archival System Architecture

## Overview

The AI-Agentic Archival System (STORY-010) provides intelligent, command-driven archival of completed work items to maintain a clean workspace. The system uses behavioral patterns to detect completed items, validate archival safety, and execute Git-aware file operations when archival commands are executed.

### Core Cascading Behavior

The archival system implements **cascading archival** as a fundamental requirement. When archiving parent items, the system MUST automatically include their child items to maintain work unit integrity:

- **Epic Archival**: The system MUST archive the epic AND all its child stories and their tasks
- **Story Archival**: The system MUST archive the story AND all its associated tasks
- **Task Archival**: Archives individual tasks independently

This cascading behavior is NOT optional - it is a core requirement that ensures complete work units are archived together, maintaining logical groupings and preventing orphaned items. The system MUST enforce this behavior to fulfill the requirement that "the system should automatically archive tasks if the story is done".

## Core Components

### 1. AI Detection Engine
- **Pattern Recognition**: Detects completed bugs/stories (status: COMPLETED, phase: ARCHIVED)
- **Task Detection**: Identifies completed tasks within items
- **Cascading Detection**: Identifies parent-child relationships for cascading archival
- **Manual Scanning**: Analyzes items when archival command is executed
- **Confidence Scoring**: Validates archival eligibility with safety checks

### 2. Archival Decision Engine
- **Intelligent Routing**: Completed tasks → archives/tasks/ (OUT of git)
- **Git-Aware Storage**: Completed bugs/stories → archives/completed/ (IN git)
- **Cascading Logic**: Automatically includes child items when archiving parents
- **Safety Validation**: Checks dependencies, references, and age requirements
- **Conflict Resolution**: Handles manual changes and git conflicts gracefully

### 3. Git Operations Handler
- **Smart Git Management**: Uses `git mv` for tracked files
- **Filesystem Operations**: Direct moves for untracked items
- **Gitignore Updates**: Automatically manages .gitignore patterns
- **Commit Automation**: Creates meaningful archival commits

### 4. Behavioral Enforcement
- **Manual Validation**: Validates items during command execution
- **Learning Patterns**: Captures successful/failed archival patterns
- **User Preferences**: Learns and adapts to team preferences
- **Archive Protection**: Archived items remain in read-only archives

## Command Interface

### Primary Command: `icc:archive-completed`

```bash
# Manual mode - scan and archive all eligible items
icc:archive-completed

# Preview mode - see what would be archived
icc:archive-completed --dry-run

# Specific item - archive specific item
icc:archive-completed --item STORY-001

# Restore mode - bring back from archive
icc:restore-archived TASK-002
```

### PM Commands

```bash
# Execute archival of all eligible items
# This command triggers the actual archival process
# Items marked as COMPLETED + phase ARCHIVED will be moved
@PM archive

# Archive specific item with cascading
# Will archive the item and all its child items
@PM archive STORY-001

# Check archival status
# Shows which items are ready for archival
@PM archive-status

# Restore specific item
# Brings item back from archive to active workspace
@PM restore TASK-001
```

**Important Note**: Items are NOT automatically archived when marked as done. Archival only happens when the PM explicitly runs the `archive` command. This ensures conscious control over when items are moved to archives.

## Archive Structure

### Git-Tracked Archives (Epics/Bugs/Stories/Milestones)
```
archives/
└── completed/
    ├── epics/
    │   └── 2024/
    │       └── 01/
    │           └── 2024-01-15-EPIC-001-user-management.md
    ├── stories/
    │   └── 2024/
    │       └── 01/
    │           ├── 2024-01-15-STORY-001-user-authentication.md
    │           └── 2024-01-15-STORY-002-user-profiles.md
    ├── bugs/
    │   └── 2024/
    │       └── 01/
    │           └── 2024-01-15-BUG-042-login-fix.md
    └── milestones/
        └── 2024/
            └── milestone-M1-phase-1-delivery.md
```

### Untracked Archives (Tasks)
```
archives/
└── tasks/
    └── 2024/
        └── 01/
            └── STORY-001/
                ├── task-001-implement-login.md
                └── task-002-add-validation.md
```

## Safety Mechanisms

### Archival Prerequisites
1. **Status Check**: Item must be COMPLETED with phase ARCHIVED
2. **Completion Verification**: Item has been properly completed and validated
3. **Dependency Validation**: No active dependencies allowed
4. **Reference Check**: No incoming references from active items
5. **User Lock Check**: No active user locks on files
6. **Manual Command**: PM must explicitly run `@PM archive` command

### When Archival Occurs
- **NOT** when items are marked as done/completed
- **NOT** when phase is changed to ARCHIVED
- **ONLY** when PM executes the `archive` command
- This ensures deliberate, conscious archival decisions

### Rollback Capability
- Automatic rollback on any failure
- Git history preservation
- File restoration to original locations
- Reference restoration
- Complete audit trail

## Integration Points

### Lean Workflow Executor
- Task completion allows archival eligibility
- Phase transitions tracked (especially ARCHIVED)
- Progress updates include archival status
- Manual command-driven execution

### Virtual Team System
- PM role has archive/restore permissions
- DevOps-Engineer handles git conflicts
- System-Engineer manages filesystem operations
- Scoring integration (+0.25P for successful archival)

### Memory System
- Captures archival patterns as entities
- Stores learning from successes/failures
- Maintains relationships between archived items
- Enables pattern-based optimization

## Behavioral Patterns

### Detection Patterns
```pseudocode
completionPatterns = {
    "EPIC_COMPLETE": {
        detect: (item) => item.status == "COMPLETED" AND item.phase == "ARCHIVED",
        archivePath: "archives/completed/epics/",
        gitTracked: true,
        cascade: true,
        cascadeTypes: ["story", "task"]
    },
    "STORY_COMPLETE": {
        detect: (item) => item.status == "COMPLETED" AND item.phase == "ARCHIVED",
        archivePath: "archives/completed/stories/",
        gitTracked: true,
        cascade: true,
        cascadeTypes: ["task"]
    },
    "TASK_COMPLETE": {
        detect: (task) => task.completed == true OR task.status == "DONE",
        archivePath: "archives/tasks/",
        gitTracked: false,
        cascade: false
    }
}
```

### Cascading Logic
```pseudocode
FUNCTION archiveWithCascade(item):
    // Archive the parent item first
    archiveItem(item)
    
    // If item supports cascading, archive children
    IF item.cascade == true:
        FOR EACH childType IN item.cascadeTypes:
            children = findChildren(item, childType)
            FOR EACH child IN children:
                archiveWithCascade(child)  // Recursive for nested cascades
    
    // Update all references
    updateReferences(item)
    
    // Commit changes
    commitArchival(item)
END FUNCTION
```

### Learning Patterns
- First-time success patterns captured
- Failure modes analyzed and prevented
- User preferences learned over time
- Optimization based on historical data

## Configuration

### Default Settings
```yaml
archival_configuration:
  enabled: true
  command_driven: true          # Manual command execution only
  batch_threshold: 10           # Batch operations above this count
  parallel_operations: true     # Enable parallel archival
  git_tracked_types: ["story", "bug", "milestone"]
  untracked_types: ["task"]
```

### Command-Driven Mode
- Manual execution via commands
- User-initiated archival operations
- Non-blocking operations
- Learning and optimization enabled

## Benefits

1. **Clean Workspace**: Helps maintain organized project structure
2. **Git History**: Preserves complete history for tracked items
3. **Easy Retrieval**: Structured archives enable quick restoration
4. **Learning System**: Improves over time based on team patterns
5. **Safety First**: Multiple validation checks prevent accidental loss
6. **Seamless Integration**: Works within existing virtual team workflow

## Usage Examples

### Manual Archival Flow
```
1. Story marked COMPLETED + phase ARCHIVED
2. User executes archival command
3. Archival check runs (dependencies, references)
4. Git mv operation for story file
5. Move associated tasks to archives/tasks/
6. Update references and memory
7. Commit with meaningful message
```

### Cascading Archival Examples

#### Epic → Stories → Tasks
```
@PM archive EPIC-001
Result:
- EPIC-001 → archives/completed/epics/2024/01/
- STORY-001 → archives/completed/stories/2024/01/
- STORY-002 → archives/completed/stories/2024/01/
- task-001 → archives/tasks/2024/01/STORY-001/
- task-002 → archives/tasks/2024/01/STORY-001/
- task-003 → archives/tasks/2024/01/STORY-002/
```

#### Story → Tasks
```
@PM archive STORY-003
Result:
- STORY-003 → archives/completed/stories/2024/01/
- task-010 → archives/tasks/2024/01/STORY-003/
- task-011 → archives/tasks/2024/01/STORY-003/
- task-012 → archives/tasks/2024/01/STORY-003/
```

#### Individual Task
```
@PM archive TASK-020
Result:
- task-020 → archives/tasks/2024/01/unassociated/
```

### Specific Item Archival
```
@PM archive --manual STORY-010
- Direct archival of specific item
- Same safety checks apply
- User confirmation required
```

### Restoration
```
@PM restore STORY-010
- Finds item in archives
- Restores to original location
- Updates status to ACTIVE
- Preserves all relationships
```

## Additional Features for Consideration

1. **Compression**: Archive old items to save space
2. **Search**: Enhanced archive search capabilities
3. **Reporting**: Archive analytics and insights
4. **Cloud Backup**: Optional cloud archive sync
5. **Retention Policies**: Configurable retention rules