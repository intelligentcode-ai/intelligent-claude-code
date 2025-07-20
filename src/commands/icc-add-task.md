# Add Task

Add task to story or bug using $ARGUMENTS.

## Arguments
`Parent: STORY-XXX|BUG-XXX | Title: "[Role] Task description" | Type: implementation|testing|review | Priority: blocking|critical_path|parallel|optional | Hours: N | Deps: TASK-XXX,TASK-YYY`

## Behavior
- Verify not @PM role (PM delegates via Task tool)
- Parse parent ID, title (with role), type, priority from $ARGUMENTS
- Validate parent exists and phase allows tasks (EXECUTE or later)
- Detect work type, verify current role has >70% capability match
- Generate next TASK-XXX ID sequentially
- Create task file with role in title, min 3 subtasks
- Update parent's task list and progress

## Errors
- Wrong role → "Requires specialist, not @PM"
- Parent missing → "Parent not found"
- Wrong phase → "Cannot add during [phase]"
- Capability mismatch → "Task needs @[Role]"