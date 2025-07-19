# Task Addition Command

Add task to story/bug during execution - Specialist-only operation

## Usage
```bash
icc-add-task STORY-XXX|BUG-XXX "Task title" --type implementation --assigned-to @Role [--deps TASK-XXX,TASK-YYY] [--auto-review]
```

## Parameters
- `item_id`: Story or Bug identifier (required)
- `title`: Task title/description (required)
- `--type`: implementation|testing|documentation|review (required)
- `--assigned-to`: Role to assign the task to (required)
- `--priority`: blocking|critical_path|parallel|optional (default: parallel, see priority-system.md)
- `--deps`: Comma-separated task dependencies (optional)
- `--auto-review`: Auto-generate review task (optional, default: true)

## Core Actions
- Verify specialist role (not PM)
- Confirm story/bug exists and in EXECUTING phase
- Allocate next available TASK-XXX number
- Auto-create review task for implementation/design tasks
- Create task files with embedded config
- Update parent story/bug with new tasks

## Validation
- Specialist role required (PM cannot add tasks during execution)
- Parent must be in EXECUTING phase
- Valid task type required
- Number availability check
- Auto-review for creation/update tasks

## Output
```
✅ Created tasks:
  - TASK-052: Implement error handling for API calls (@Developer)
  - TASK-053: Review error handling implementation (@System-Architect) [AUTO-REVIEW]
```