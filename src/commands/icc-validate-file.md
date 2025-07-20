# Validate File

Validate file format, content, and compliance with system standards using $ARGUMENTS.

## Behavior
Comprehensive file validation that checks format compliance, content structure,
naming conventions, and integration with the behavioral system. Ensures all
files meet quality standards and system requirements.

## Arguments
**Format:** "FilePath: path/to/file | Type: expected_file_type | Standards: validation_standards"
**Example:** "FilePath: epics/EPIC-001/story.yaml | Type: story | Standards: workflow_compliance,role_validation"

## Core Actions
- Parse file path and expected type from $ARGUMENTS
- Load file content and validate format:
  - YAML files: Valid YAML syntax
  - Markdown files: Valid markdown structure
  - Assignment files: Required fields present
- Check naming conventions:
  - ID format: TYPE-NUMBER (e.g., EPIC-001, STORY-015)
  - File naming: Consistent with type
  - Directory structure: Proper hierarchy
- Validate content structure:
  - Required fields present
  - Valid workflow phases
  - Proper role assignments
  - Embedded config format
- Check system compliance:
  - Workflow integration
  - Role validation
  - Priority system
  - Git workflow standards

## Validation Standards

### Assignment Files (epic.yaml, story.yaml, bug.yaml)
- **Required Fields**: id, title, description, status, priority
- **Workflow Fields**: workflow_type, workflow_phase
- **Role Fields**: assigned_to, tasks (for stories/bugs)
- **Config Fields**: embedded_config (optional)

### Task Files (task.md)
- **Header Structure**: Title with role prefix
- **Content Sections**: Description, subtasks, acceptance criteria
- **Assignment**: Proper role assignment
- **Dependency**: Clear dependency definition

### Configuration Files
- **YAML Format**: Valid YAML syntax
- **Setting Keys**: Recognized configuration keys
- **Value Types**: Proper value types and formats
- **Hierarchy**: Proper import structure

## File Type Validation

### Epic Files
- Contains stories and bugs
- Strategic objectives defined
- Success metrics present
- Priority system compliance

### Story/Bug Files
- Parent epic reference
- Task breakdown present
- Role assignments validated
- Acceptance criteria defined

### Task Files
- Role in title format: "[Role] Task description"
- Minimum 3 subtasks
- Clear dependencies
- Acceptance criteria

## Validation Results

### PASS
- All format checks passed
- Content structure valid
- Naming conventions followed
- System compliance verified

### FAIL
- **Format Errors**: Invalid YAML/Markdown syntax
- **Structure Errors**: Missing required fields
- **Naming Errors**: Incorrect ID or file naming
- **Compliance Errors**: System standard violations

## Error Reporting
- Specific error location and description
- Suggested fixes for common issues
- Reference to relevant standards
- Priority level based on error severity

## Integration
- Used by workflow validation systems
- Triggered during file creation and updates
- Integrates with git pre-commit hooks
- Supports quality gate enforcement
- Connected to learning system for pattern capture

## Quality Standards
- Zero tolerance for format violations
- Clear error messages with actionable fixes
- Fast validation for common file types
- Comprehensive coverage of system requirements