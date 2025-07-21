# Command Reference - icc- Slash Commands

## Overview

The intelligent-claude-code system provides slash commands with the `icc-` prefix for reliable workflow execution. Commands are integrated into the executable workflow system and provide consistent, predictable behavior.

## Command Syntax
- **Filename**: `icc-command-name.md` (how Claude Code reads the command)
- **Title**: `icc:command-name` (display title in the command description)
- **Usage**: User types `icc-command-name` in Claude Code interface

## System Management Commands

### `icc-init-system`
**Purpose**: Initialize the virtual team system with full configuration and state restoration
**Usage**: `icc-init-system`
**Integration**: Called during system startup and recovery
**Output**: Full system initialization confirmation

### `icc-system-status`
**Purpose**: Display current system status and configuration
**Usage**: `icc-system-status`
**Integration**: Available for system monitoring
**Output**: Current roles, configuration, and system health

### `icc-restore-state`
**Purpose**: Restore behavioral patterns and system state
**Usage**: `icc-restore-state`
**Integration**: Called automatically during init or manually for recovery
**Output**: State restoration confirmation

### `icc-verify-behaviors`
**Purpose**: Validate all behavioral patterns are operational
**Usage**: `icc-verify-behaviors`
**Integration**: Called during init and for system validation
**Output**: Behavioral pattern validation results

## Role Management Commands

### `icc-activate-role`
**Purpose**: Activate a specialist role with full behavioral switching
**Usage**: `icc-activate-role @RoleName`
**Parameters**:
- `@RoleName`: Role to activate (e.g., @PM, @AI-Engineer, @React-Developer)
**Integration**: Called during role assignment and switching
**Output**: Role activation confirmation with scores

## Workflow Commands

### `icc-create-story`
**Purpose**: Create a new story with proper validation
**Usage**: `icc-create-story "Story Title"`
**Parameters**:
- `title`: Story title and description
**Integration**: Used in story creation workflow
**Output**: Story creation confirmation with ID

### `icc-plan-story`
**Purpose**: Plan story tasks with specialist validation
**Usage**: `icc-plan-story STORY-001`
**Parameters**:
- `story_id`: Story ID to plan
**Integration**: Called during story planning phase
**Output**: Task breakdown with role assignments

### `icc-detect-work-type`
**Purpose**: Detect work type and determine required specialists
**Usage**: `icc-detect-work-type "work description"`
**Parameters**:
- `content`: Work description to analyze
**Integration**: Called during work assignment validation
**Output**: Work type classification and required architect

## Memory Commands

### `icc-memory-search`
**Purpose**: Search memory for relevant knowledge and patterns
**Usage**: `icc-memory-search "keyword"`
**Parameters**:
- `query`: Search terms
**Integration**: Called during knowledge retrieval phases
**Output**: Relevant memory entities and relationships

### `icc-archive-completed`
**Purpose**: Archive all completed work items
**Usage**: `icc-archive-completed`
**Integration**: Called during archival operations
**Output**: Archival summary and confirmation

## Command Integration

Commands are integrated into the executable workflow system at key workflow points:

- **System Initialization**: `icc-init-system` called on startup
- **Role Assignment**: `icc-activate-role` called during role switching
- **Work Validation**: `icc-detect-work-type` called during assignment validation
- **Story Planning**: `icc-create-story` and `icc-plan-story` used in planning
- **Knowledge Operations**: `icc-memory-search` used in retrieval phases

## Command Syntax Standards

- **Prefix**: All commands use `icc-` prefix
- **Parameters**: Space-separated, quoted when containing spaces
- **Role References**: Use @-notation (e.g., @PM, @AI-Engineer)
- **IDs**: Use standard format (STORY-001, TASK-042, etc.)

## Error Handling

Commands include built-in error handling:
- Invalid parameters show usage help
- Role validation ensures valid assignments
- Work type validation prevents incorrect assignments
- Memory operations handle missing data gracefully

## Integration Testing

All commands are tested through:
- Individual command validation
- Workflow integration testing
- End-to-end process verification
- Error condition handling