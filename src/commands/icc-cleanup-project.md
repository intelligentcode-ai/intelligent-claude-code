# Cleanup Project

Clean up project-wide issues and inconsistencies using $ARGUMENTS.

## Behavior
Perform comprehensive project cleanup including file organization,
naming convention fixes, broken reference repairs, and structural
improvements. Maintains project health and behavioral system integration.

## Arguments
**Format:** "Scope: structure|files|references|all | Mode: safe|aggressive | DryRun: true|false | Backup: true|false"
**Example:** "Scope: all | Mode: safe | DryRun: false | Backup: true"

## Core Actions
- Parse cleanup scope and safety mode from $ARGUMENTS
- Create backup if Backup=true
- Scan project for cleanup opportunities
- Apply cleanup operations based on scope and mode
- Fix naming conventions and structural issues
- Repair broken references and relationships
- Remove obsolete and duplicate files
- Update file content for consistency
- Generate comprehensive cleanup report
- Restore from backup if errors occur

## Cleanup Scopes

### Structure Cleanup
- **Directory Organization**: Fix directory structure and hierarchy
- **Naming Conventions**: Correct work item ID and file naming
- **Hierarchy Fixes**: Repair parent-child relationships
- **Missing Directories**: Create required directory structure

### File Cleanup
- **Obsolete Files**: Remove outdated and unused files
- **Duplicate Files**: Consolidate duplicate content
- **Temporary Files**: Remove temp, cache, and backup files
- **Invalid Files**: Fix or remove malformed files

### Reference Cleanup
- **Broken Links**: Fix references to non-existent items
- **Orphaned Items**: Connect or remove orphaned work items
- **Circular References**: Detect and break circular dependencies
- **Inconsistent IDs**: Synchronize IDs across files and directories

### Complete Cleanup
- **All Scopes**: Apply all cleanup categories
- **Deep Analysis**: Comprehensive issue detection
- **Cross-Validation**: Validate fixes across categories
- **System Integration**: Ensure behavioral system compatibility

## Cleanup Modes

### Safe Mode
- **Conservative Approach**: Only apply low-risk fixes
- **Preserve Content**: Never delete important content
- **Manual Confirmation**: Ask before destructive operations
- **Rollback Ready**: Easy rollback for all changes

### Aggressive Mode
- **Comprehensive Fixing**: Apply all identified fixes
- **Remove Duplicates**: Automatically remove duplicate content
- **Delete Obsolete**: Remove clearly obsolete files
- **Structural Changes**: Make significant structural improvements

## Cleanup Operations

### Structure Fixes
```yaml
structure_operations:
  directory_renames:
    - from: "epics/epic-001"
      to: "epics/EPIC-001-user-authentication"
      reason: "Naming convention fix"
      
  missing_directories:
    - path: "epics/EPIC-001/stories"
      reason: "Required stories container"
      
  hierarchy_fixes:
    - item: "STORY-005"
      from: "epics/EPIC-002/stories/"
      to: "epics/EPIC-001/stories/"
      reason: "Correct parent epic"
```

### File Operations
```yaml
file_operations:
  deletions:
    - file: "epics/EPIC-001/.DS_Store"
      reason: "System temp file"
      safe: true
      
    - file: "epics/EPIC-001/story.yaml.bak"
      reason: "Backup file no longer needed"
      safe: true
      
  consolidations:
    - primary: "epics/EPIC-001/epic.yaml"
      duplicate: "epics/EPIC-001/epic-definition.yaml"
      action: "merge_and_remove_duplicate"
      
  repairs:
    - file: "epics/EPIC-001/stories/STORY-001/story.yaml"
      issue: "Invalid YAML syntax"
      fix: "Correct indentation and quotes"
```

### Reference Repairs
```yaml
reference_operations:
  broken_links:
    - file: "epics/EPIC-001/epic.yaml"
      field: "stories"
      broken_ref: "STORY-999"
      action: "remove_reference"
      
  orphaned_items:
    - item: "TASK-042"
      location: "epics/EPIC-001/tasks/TASK-042.md"
      action: "move_to_story_tasks"
      target: "epics/EPIC-001/stories/STORY-003/tasks/"
      
  id_synchronization:
    - file: "epics/EPIC-001/stories/STORY-005/story.yaml"
      directory: "epics/EPIC-001/stories/story-5"
      action: "rename_directory_to_match_id"
```

## Safety Measures

### Backup Strategy
```yaml
backup_info:
  timestamp: 2025-01-15T10:30:00Z
  location: ".cleanup-backups/backup-20250115-103000/"
  includes:
    - "Complete project structure"
    - "All work item files"
    - "Configuration files"
    - "Git history preserved"
  restoration: "Use 'restore-from-backup' command"
```

### Rollback Capability
- **Operation Log**: Complete log of all changes
- **Reverse Operations**: Automated rollback commands
- **Git Integration**: Git-based rollback when possible
- **File Restoration**: Restore from backup if needed

### Validation Before/After
- **Pre-Cleanup Scan**: Baseline project state
- **Post-Cleanup Validation**: Verify improvements
- **Regression Detection**: Ensure no new issues introduced
- **Quality Metrics**: Measure cleanup effectiveness

## Cleanup Report

### Operations Summary
```yaml
cleanup_report:
  timestamp: 2025-01-15T10:45:00Z
  scope: all
  mode: safe
  duration: "15 minutes"
  
  operations_performed:
    structure_fixes: 8
    file_operations: 15
    reference_repairs: 6
    total_changes: 29
    
  results:
    directories_renamed: 3
    files_deleted: 12
    files_repaired: 4
    references_fixed: 6
    
  improvements:
    naming_compliance: "95% → 100%"
    broken_references: "12 → 0"
    obsolete_files: "23 → 0"
    structure_violations: "5 → 0"
    
  status: "SUCCESS"
  rollback_available: true
  backup_location: ".cleanup-backups/backup-20250115-103000/"
```

### Issue Resolution
```yaml
issues_resolved:
  critical_issues:
    - "Fixed 3 broken epic-story references"
    - "Corrected 2 invalid directory names"
    - "Repaired 1 malformed YAML file"
    
  warnings_addressed:
    - "Removed 12 obsolete temporary files"
    - "Consolidated 2 duplicate configurations"
    - "Updated 4 outdated file references"
    
  improvements_made:
    - "Enhanced directory structure consistency"
    - "Improved file organization"
    - "Standardized naming conventions"
    - "Optimized project navigation"
```

## Git Integration

### Change Tracking
- **Git Commits**: Cleanup changes committed with clear messages
- **Branch Safety**: Cleanup performed on feature branch
- **Change Review**: All changes reviewable in git diff
- **Selective Rollback**: Git-based selective change reversal

### Cleanup Commit Message
```
chore: Project cleanup - fix structure and references

- Fixed 3 directory naming convention violations
- Removed 12 obsolete temporary files
- Repaired 6 broken work item references
- Consolidated 2 duplicate configuration files

Backup available at: .cleanup-backups/backup-20250115-103000/
Rollback: git reset --hard HEAD~1
```

## Integration
- Used by PM commands for project maintenance
- Referenced by automated quality assurance
- Integrates with validation systems
- Supports scheduled cleanup operations
- Connected to project health monitoring

## Quality Standards
- Zero data loss during cleanup
- Complete rollback capability
- Comprehensive issue resolution
- Clear operation reporting
- Professional project organization