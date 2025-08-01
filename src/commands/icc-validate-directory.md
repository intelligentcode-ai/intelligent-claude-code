# Validate Directory

Validate directory structure using $ARGUMENTS.

## Behavior
Checks hierarchy compliance, required files, naming conventions, parent-child relationships.

## Arguments
"Path: directory_path | Depth: shallow|deep|complete | Fix: true|false | Report: summary|detailed"

## Process
1. Parse path and options from $ARGUMENTS
2. Scan directory based on depth setting
3. Validate against expected patterns:
   - Epic: epic.yaml + stories/bugs subdirs
   - Story: story.yaml + tasks subdir
   - Bug: bug.yaml + tasks subdir
4. Check required files and ID-title naming
5. Verify parent references match
6. Generate report (summary/detailed)
7. Apply fixes if Fix=true
8. Return validation status

## Errors
- Invalid path: "Directory not found"
- Missing required: "epic.yaml missing"
- Invalid naming: "ID-title format required"
- Broken reference: "Parent ID mismatch"