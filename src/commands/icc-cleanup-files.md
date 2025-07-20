# Cleanup Files

Clean up invalid, temporary, or obsolete files in the project using $ARGUMENTS.

## Behavior
Systematic cleanup of project files that violate standards, are no longer
needed, or conflict with the behavioral system architecture. Maintains
project hygiene and prevents configuration drift.

## Arguments
**Format:** "Scope: cleanup_scope | Type: file_types | DryRun: true|false"
**Example:** "Scope: project | Type: temp,invalid,obsolete | DryRun: false"

## Core Actions
- Parse cleanup scope and file types from $ARGUMENTS
- Scan project directory for target files
- Identify files for cleanup based on criteria:
  - Invalid format or structure
  - Temporary files and caches
  - Obsolete configuration files
  - Duplicate or conflicting files
- Perform cleanup operations:
  - Remove temporary files
  - Archive obsolete files
  - Fix format violations
  - Consolidate duplicates
- Generate cleanup report with actions taken

## Cleanup Scopes

### Project Scope
- Root directory and all subdirectories
- Configuration files and templates
- Assignment files (epics, stories, bugs, tasks)
- Documentation and workflow files

### Config Scope
- Configuration files only
- Template files and imports
- Behavioral definitions
- Role and command files

### Assignment Scope
- Epic, story, bug, and task files
- Workflow-related files only
- Assignment file validation

## File Types for Cleanup

### Temporary Files
- `.tmp`, `.temp`, `.cache` files
- Backup files (`.bak`, `.backup`)
- System temporary files
- Editor temporary files

### Invalid Files
- Malformed YAML/Markdown files
- Files with invalid naming conventions
- Files missing required fields
- Files with broken imports

### Obsolete Files
- Old configuration versions
- Deprecated templates
- Unused behavioral files
- Archived assignment files in wrong location

### Duplicate Files
- Multiple config files with same purpose
- Redundant behavioral definitions
- Duplicate assignment files

## Cleanup Operations

### Safe Operations (Always Performed)
- Remove confirmed temporary files
- Fix minor format issues
- Update file permissions
- Clean up empty directories

### Destructive Operations (Require Confirmation)
- Delete invalid files
- Remove obsolete configurations
- Archive old assignment files
- Consolidate duplicates

## Safety Measures
- **Dry Run Mode**: Show what would be cleaned without acting
- **Backup Creation**: Create backups before destructive operations
- **Confirmation Required**: Ask before deleting important files
- **Rollback Support**: Ability to restore from backups
- **Git Integration**: Respect git-tracked files

## Cleanup Report
- Files removed with rationale
- Files moved or archived
- Format fixes applied
- Warnings for manual review
- Rollback instructions if needed

## Integration
- Used by PM commands for project maintenance
- Triggered during system initialization
- Integrates with validation systems
- Supports git workflow cleanup
- Connected to learning system for pattern capture

## Quality Standards
- No loss of important project data
- Clear reporting of all actions
- Reversible operations where possible
- Respect for git workflow and history