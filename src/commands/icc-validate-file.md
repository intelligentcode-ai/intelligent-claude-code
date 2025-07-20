# Validate File

Validate assignment files, code files, and documentation for compliance using $ARGUMENTS.

## Behavior
Comprehensive validation including structure, naming, content, role assignments, and system compliance.

## Arguments
**Format:** "file_path:path | validation_type:assignment|code|docs|all | strict:true|false"
**Example:** "file_path:epic.yaml | validation_type:assignment | strict:true"

## Core Actions
1. Parse request → Detect file type → Validate structure/content
2. Check compliance → Validate role assignments → Check dependencies
3. Generate comprehensive validation report

## Validation Types

### Assignment Files (epic.yaml, story.yaml, bug.yaml, task.md)
**Structure**: Valid YAML header, required fields (id, title, status, priority, assigned_to, created_date)
**Content**: TYPE-NUMBER IDs, 10-80 char titles, valid status/priority values, @Role format >70% match
**Tasks**: "[Role] Title" format, min 3 subtasks, parallelization identified

### Code Files (.js, .ts, .py, .md, .yaml, .json)  
**Quality**: Valid syntax, style compliance, documentation, security, performance
**Patterns**: @~/ imports resolve, valid @Role notation, proper icc: commands

### Documentation (.md, README)
**Standards**: Proper hierarchy, working links, valid examples, completeness, accuracy

## Validation Rules by File Type

### Epic/Story/Bug Files (.yaml)
**Required**: id (TYPE-XXX), title (10-80 chars), priority (P0-P3), status, created_date
**Validation**: Parent references exist, roles pass validation chain, >70% capability match

### Task Files (.md)
**Required**: [Role] title format, parent reference, min 3 subtasks, acceptance criteria
**Validation**: Role capability >70%, parallel opportunities identified, dependencies valid

## Compliance Checking

### Role Assignment: Validation chain, >70% capability, specialist requirements, SME reviews
### Task Creation: [Role] titles, min 3 subtasks, parallelization, sequential thinking, ultra-experienced
### Git Workflow: Branch naming, commit messages, privacy mode, branch protection

## Strictness Levels
**Strict**: Zero tolerance, blocking, complete coverage, detailed reporting
**Lenient**: Warnings, non-blocking, essential focus, summary reporting

## Validation Report
```yaml
validation_report:
  file_path: "path" | file_type: "assignment|code|docs" | strict_mode: true|false
  overall_status: "PASS|FAIL|WARNING"
  structure|content|compliance_validation: {status: "PASS|FAIL", errors: [], warnings: []}
  summary: {errors: count, warnings: count, critical: count, recommendations: []}
```

## Error Handling
- **File Not Found**: "Cannot find '{file_path}'"
- **Invalid Type**: "Must be assignment|code|docs|all"  
- **Parse Error**: "Invalid format in '{file_path}'"
- **Permission**: "No read access '{file_path}'"
- **Engine Error**: "Validation failed for '{type}'"
- **Critical**: "Critical violation: {details}"
