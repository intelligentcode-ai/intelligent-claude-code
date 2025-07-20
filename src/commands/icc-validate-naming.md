# Validate Naming

Validate naming conventions for work items and files using $ARGUMENTS.

## Behavior
Validate that work item IDs, file names, directory structure, and content
follow the established naming conventions and standards. Ensures consistency
across the project and integration with the behavioral system.

## Arguments
**Format:** "Target: file_path|work_item_id | Type: epic|story|bug|task|directory | Standard: strict|standard | Fix: true|false"
**Example:** "Target: epics/EPIC-001/stories/STORY-005 | Type: story | Standard: strict | Fix: false"

## Core Actions
- Parse validation target and criteria from $ARGUMENTS
- Apply appropriate naming convention rules
- Check ID format, file naming, and directory structure
- Validate content alignment with naming
- Report violations with specific feedback
- Generate fix suggestions for violations
- Apply automatic fixes if Fix=true
- Log validation results for compliance tracking

## Naming Convention Standards

### Work Item ID Format
- **Pattern**: TYPE-NUMBER
- **Types**: EPIC, STORY, BUG, TASK (always uppercase)
- **Numbers**: Three-digit sequential (001, 002, ..., 999, 1000+)
- **Examples**: EPIC-001, STORY-015, BUG-068, TASK-142

### File Naming Conventions
- **Epic Files**: `epic.yaml`
- **Story Files**: `story.yaml`
- **Bug Files**: `bug.yaml`
- **Task Files**: `TASK-XXX-title-slug.md` or `TASK-XXX.md`
- **Directory Names**: Match work item ID exactly

### Directory Structure
```
epics/
├── EPIC-001-user-authentication/          # Epic ID + title slug
│   ├── epic.yaml                           # Standard epic file
│   ├── stories/                            # Stories container
│   │   └── STORY-001-oauth-implementation/    # Story ID + title slug
│   │       ├── story.yaml                      # Standard story file
│   │       └── tasks/                          # Tasks container
│   │           ├── TASK-001-research.md            # Task file
│   │           └── TASK-002-implement.md           # Task file
│   └── bugs/                               # Bugs container
│       └── BUG-001-login-timeout/             # Bug ID + title slug
│           ├── bug.yaml                        # Standard bug file
│           └── tasks/                          # Bug tasks container
│               └── TASK-003-fix-timeout.md         # Bug task file
```

## Validation Rules

### ID Format Validation
- **Pattern Matching**: TYPE-NUMBER format strictly enforced
- **Type Validation**: TYPE must be EPIC, STORY, BUG, or TASK
- **Number Validation**: Must be positive integer
- **Case Sensitivity**: TYPE must be uppercase
- **Separator**: Must use hyphen (-) not underscore

### File Name Validation
- **Epic Files**: Must be named `epic.yaml`
- **Story Files**: Must be named `story.yaml`
- **Bug Files**: Must be named `bug.yaml`
- **Task Files**: Must include TASK-XXX prefix
- **Extensions**: YAML files (.yaml), Markdown files (.md)

### Directory Structure Validation
- **Epic Directories**: `epics/EPIC-XXX-title-slug/`
- **Story Directories**: `epics/EPIC-XXX/stories/STORY-XXX-title-slug/`
- **Bug Directories**: `epics/EPIC-XXX/bugs/BUG-XXX-title-slug/`
- **Task Containers**: `tasks/` directory in parent work item
- **Hierarchy**: Proper parent-child relationships

### Content Alignment
- **ID Consistency**: File content ID matches directory/file name
- **Title Slugs**: Directory slugs match work item titles
- **Parent References**: Child items reference correct parents
- **Assignment Consistency**: Role assignments valid and consistent

## Validation Standards

### Strict Standard
- **Zero Tolerance**: No naming violations allowed
- **Format Precision**: Exact format matching required
- **Content Alignment**: Perfect ID/name/content consistency
- **Hierarchy Validation**: Complete parent-child validation

### Standard Mode
- **Minor Tolerance**: Allow minor formatting variations
- **Content Priority**: Focus on content over format details
- **Practical Validation**: Practical compliance checking
- **Warning Level**: Warnings for minor violations

## Validation Results

### PASS
- All naming conventions followed
- Content and structure aligned
- No violations detected
- Ready for system integration

### VIOLATIONS FOUND
```yaml
validation_result:
  target: "epics/epic-001/stories/story-5"
  type: story
  standard: strict
  status: FAILED
  
  violations:
    - type: "id_format"
      issue: "Epic ID not uppercase: 'epic-001' should be 'EPIC-001'"
      location: "directory_name"
      fix_suggestion: "Rename to 'EPIC-001-title-slug'"
      
    - type: "id_format"
      issue: "Story ID missing zero padding: 'story-5' should be 'STORY-005'"
      location: "directory_name"
      fix_suggestion: "Rename to 'STORY-005-title-slug'"
      
    - type: "file_missing"
      issue: "Missing story.yaml file"
      location: "file_structure"
      fix_suggestion: "Create story.yaml with proper structure"
      
  fix_commands:
    - "mv epics/epic-001 epics/EPIC-001-user-authentication"
    - "mv epics/EPIC-001/stories/story-5 epics/EPIC-001/stories/STORY-005-oauth-login"
    - "touch epics/EPIC-001/stories/STORY-005/story.yaml"
```

## Automatic Fixes

### Safe Fixes (Applied Automatically)
- **Case Correction**: Convert to proper case
- **Zero Padding**: Add missing leading zeros
- **Extension Fixes**: Correct file extensions
- **Minor Format**: Fix separator and spacing issues

### Manual Fixes (Require Approval)
- **Directory Renames**: Structural changes
- **File Moves**: Location changes
- **Content Updates**: ID changes in file content
- **Hierarchy Changes**: Parent-child relationship fixes

## Integration
- Used by file validation systems
- Referenced by work item creation commands
- Integrates with project cleanup tools
- Supports automated compliance checking
- Connected to quality assurance processes

## Quality Standards
- Comprehensive naming validation
- Clear violation reporting
- Actionable fix suggestions
- Safe automatic correction
- Complete compliance tracking