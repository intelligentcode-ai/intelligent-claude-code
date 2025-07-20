# Validate Naming

Validate naming conventions using $ARGUMENTS.

## Arguments
`Target: file_path|work_item_id | Type: epic|story|bug|task|directory | Standard: strict|standard | Fix: true|false`

## Behavior
- Parse target and type from $ARGUMENTS
- Validate ID format: TYPE-NUMBER (EPIC-001, STORY-015, BUG-068)
- Check directory structure: epics/EPIC-XXX/stories/STORY-XXX/
- Verify file naming: epic.yaml, story.yaml, bug.yaml, TASK-XXX.md
- Validate parent-child relationships and ID consistency
- Apply fixes if Fix=true, report violations otherwise

## Errors
- Invalid format → "ID must be TYPE-NUMBER"
- Wrong structure → "Directory structure mismatch"
- ID mismatch → "File/directory ID inconsistent"
- Parent missing → "Parent reference not found"