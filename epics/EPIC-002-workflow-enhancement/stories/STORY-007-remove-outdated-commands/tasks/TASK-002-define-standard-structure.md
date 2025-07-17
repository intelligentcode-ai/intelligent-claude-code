# TASK-002: Define Standard icc: Command Structure

**Status:** COMPLETED  
**Assigned to:** @AI-Architect  
**Story:** STORY-007 Remove Outdated Commands  
**Priority:** P1  
**Dependencies:** TASK-001

## Task Description

Create standardized command naming and structure guidelines for all icc: prefixed commands.

## Command Structure Standard

### Base Pattern
All commands MUST follow: `icc:category-action`

### Categories Defined
- **pm** - Project Management commands
- **role** - Role management commands  
- **workflow** - Workflow execution commands
- **archive** - Archival system commands
- **validation** - Validation and checking commands

### Naming Conventions
1. **Lowercase only** - No camelCase or PascalCase
2. **Hyphen separation** - Use hyphens between words
3. **Action verbs** - Use clear action verbs (init, refresh, execute, validate)
4. **No parameters in name** - Parameters passed separately

### Command Registry

#### PM Commands
- `icc:pm-init` - Initialize system
- `icc:pm-refresh` - Refresh configuration
- `icc:pm-reset` - Reset system state
- `icc:pm-status` - Show system status
- `icc:pm-help` - Show help information

#### Workflow Commands  
- `icc:create-story` - Create new story
- `icc:plan-story` - Plan story tasks
- `icc:execute-task` - Execute task
- `icc:create-assignment` - Create assignment file

#### Validation Commands
- `icc:detect-work-type` - Detect work type for assignment
- `icc:require-triage` - Require PM + Architect triage
- `icc:validate-assignments` - Validate role assignments
- `icc:require-approval` - Require approval

#### Archive Commands
- `icc:archive-item` - Archive specific item
- `icc:archive-completed` - Archive all completed items
- `icc:archive-status` - Show archive status
- `icc:restore-archived` - Restore from archive

### Command Documentation Template
```yaml
command: icc:category-action
description: "Brief description of what command does"
parameters:
  - name: "parameter1"
    type: "string|number|boolean"
    required: true|false
    description: "What this parameter does"
returns: "What the command returns"
example: "icc:category-action parameter1"
```

### Migration Mapping
```
@PM init          → icc:pm-init
@PM refresh       → icc:pm-refresh
@PM reset         → icc:pm-reset
@PM status        → icc:pm-status
@PM help          → icc:pm-help
@PM archive       → icc:archive-item
@PM archive-status → icc:archive-status
@PM archive-completed → icc:archive-completed
```

## Slash Commands Update

Actually, the story is about updating SLASH COMMANDS (like /compact) to use icc: prefix, not the @PM commands or other existing commands. The slash commands appear to be custom prompt files that can be invoked.

**TASK UPDATE:** Need to identify where slash commands are defined and update them to use icc: prefix.