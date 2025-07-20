# Validate Directory

Validate directory structure and hierarchy using $ARGUMENTS.

## Behavior
Validate that project directory structure follows the established hierarchy,
contains required files, maintains proper parent-child relationships,
and integrates correctly with the behavioral system workflow.

## Arguments
**Format:** "Path: directory_path | Depth: shallow|deep|complete | Fix: true|false | Report: summary|detailed"
**Example:** "Path: epics/EPIC-001 | Depth: deep | Fix: false | Report: detailed"

## Core Actions
- Parse directory path and validation options from $ARGUMENTS
- Scan directory structure recursively based on depth
- Validate hierarchy against expected patterns
- Check for required files and proper naming
- Verify parent-child relationships and references
- Identify missing, misplaced, or invalid items
- Generate comprehensive validation report
- Apply automatic fixes if Fix=true
- Log validation results for compliance tracking

## Expected Directory Structure

### Project Root Structure
```
project-root/
├── epics/                          # All epics container
├── .claude/                       # Configuration directory
│   ├── config.md                   # Project configuration
│   ├── modes/                      # Behavioral modes
│   ├── behaviors/                  # Behavioral modules
│   └── commands/                   # Command definitions
├── docs/                          # Documentation
├── workflow-templates/            # Workflow definitions
└── archives/                      # Completed work archive
```

### Epic Directory Structure
```
epics/EPIC-XXX-title-slug/
├── epic.yaml                      # Epic definition (REQUIRED)
├── stories/                       # Stories container (OPTIONAL)
│   └── STORY-XXX-title-slug/
│       ├── story.yaml                  # Story definition (REQUIRED)
│       └── tasks/                      # Tasks container (OPTIONAL)
│           └── TASK-XXX-title-slug.md      # Task files
├── bugs/                          # Bugs container (OPTIONAL)
│   └── BUG-XXX-title-slug/
│       ├── bug.yaml                    # Bug definition (REQUIRED)
│       └── tasks/                      # Bug tasks (OPTIONAL)
│           └── TASK-XXX-title-slug.md      # Bug task files
└── learnings/                     # Epic learnings (OPTIONAL)
    └── learning-YYYY-MM-DD.md        # Learning files
```

## Validation Depth

### Shallow Validation
- **Directory Names**: Check naming conventions
- **Required Files**: Verify essential files present
- **Basic Structure**: Validate top-level organization
- **Quick Check**: Fast validation for basic compliance

### Deep Validation
- **All Shallow Checks**: Complete shallow validation
- **File Content**: Validate file content structure
- **References**: Check parent-child references
- **Consistency**: Verify ID consistency across files
- **Dependencies**: Validate dependency relationships

### Complete Validation
- **All Deep Checks**: Complete deep validation
- **Cross-References**: Validate all cross-references
- **Workflow Integration**: Check workflow compliance
- **Quality Standards**: Verify quality requirements
- **System Integration**: Validate behavioral system integration

## Validation Rules

### Directory Naming
- **Epic Directories**: `EPIC-XXX-title-slug`
- **Story Directories**: `STORY-XXX-title-slug`
- **Bug Directories**: `BUG-XXX-title-slug`
- **Container Directories**: `stories`, `bugs`, `tasks`, `learnings`
- **Case Sensitivity**: Proper case for all components

### Required Files
- **Epic**: `epic.yaml` (mandatory)
- **Story**: `story.yaml` (mandatory)
- **Bug**: `bug.yaml` (mandatory)
- **Tasks**: At least one `.md` file in tasks/ directory
- **Configuration**: Valid YAML format

### Hierarchy Rules
- **Epic Level**: Direct child of `epics/`
- **Story Level**: Child of `epic/stories/`
- **Bug Level**: Child of `epic/bugs/`
- **Task Level**: Child of `story/tasks/` or `bug/tasks/`
- **No Orphans**: All items have valid parents

### Reference Integrity
- **Parent References**: Child items reference correct parents
- **ID Consistency**: Directory names match file content IDs
- **Task References**: Stories/bugs list their tasks
- **Dependency Links**: Task dependencies reference valid tasks

## Validation Issues

### Structure Violations
- **Missing Directories**: Required directories not found
- **Wrong Hierarchy**: Items in wrong hierarchy level
- **Invalid Names**: Directory names don't follow conventions
- **Orphaned Items**: Items without valid parents

### File Violations
- **Missing Files**: Required files not present
- **Invalid Content**: File content doesn't match structure
- **Broken References**: References to non-existent items
- **Format Errors**: Invalid YAML or Markdown format

### Consistency Violations
- **ID Mismatch**: Directory name vs. file content ID
- **Title Mismatch**: Directory slug vs. actual title
- **Reference Errors**: Broken parent-child references
- **Duplicate IDs**: Same ID used multiple times

## Validation Report

### Summary Report
```yaml
validation_summary:
  path: "epics/EPIC-001"
  depth: deep
  timestamp: 2025-01-15T10:30:00Z
  
  status: FAILED
  total_items: 15
  valid_items: 12
  violations: 3
  
  breakdown:
    structure_ok: 13
    structure_violations: 1
    file_ok: 11
    file_violations: 2
    reference_ok: 14
    reference_violations: 1
    
  critical_issues: 2
  warnings: 1
```

### Detailed Report
```yaml
validation_details:
  violations:
    - type: structure_violation
      severity: critical
      location: "epics/EPIC-001/stories/story-5"
      issue: "Directory name not following convention"
      expected: "STORY-005-oauth-implementation"
      fix_command: "mv story-5 STORY-005-oauth-implementation"
      
    - type: file_violation
      severity: critical
      location: "epics/EPIC-001/stories/STORY-002/story.yaml"
      issue: "Missing required field: parent_epic"
      fix_suggestion: "Add 'parent_epic: EPIC-001' to YAML"
      
    - type: reference_violation
      severity: warning
      location: "epics/EPIC-001/epic.yaml"
      issue: "Story STORY-003 listed but directory not found"
      fix_suggestion: "Remove STORY-003 from stories list or create directory"
```

## Automatic Fixes

### Safe Fixes
- **Directory Renaming**: Fix naming convention violations
- **File Creation**: Create missing required files
- **Reference Updates**: Fix broken internal references
- **Format Corrections**: Fix minor YAML/Markdown issues

### Manual Fixes Required
- **Content Changes**: Significant content modifications
- **Hierarchy Changes**: Moving items between levels
- **ID Changes**: Changing work item IDs
- **Deletion**: Removing invalid or duplicate items

## Integration
- Used by project setup and maintenance tools
- Referenced by work item creation commands
- Integrates with file validation systems
- Supports automated compliance checking
- Connected to cleanup and repair tools

## Quality Standards
- Comprehensive structure validation
- Clear hierarchy enforcement
- Reliable reference integrity checking
- Safe automatic correction
- Complete compliance reporting