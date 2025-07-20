# Create Task

Create individual task with role assignment and validation using $ARGUMENTS.

## Behavior

Creates tasks with mandatory role validation and subtask decomposition.

## Arguments

**Format:** "Title: [Role] Task description | Parent: STORY-XXX|BUG-XXX | Priority: P0|P1|P2|P3 | Role: @AssignedRole"

## Role Restrictions

**@PM** role required for task creation.

## Core Actions

1. Parse task details from $ARGUMENTS
2. Validate title format: "[Role] Task description" 
3. Verify parent exists and is active
4. Apply validation chain and mandates
5. Generate task file with structure
6. Update parent with task reference

## Task Creation Mandates

**Role in Title:** "[Role] Task description" mandatory
**Subtasks:** Minimum 3 subtasks required
**Specialist:** Ultra-experienced assignments only

## Error Handling

- **Missing role**: "Task title must include [Role] format"
- **Invalid parent**: "Parent not found"
- **Low capability**: "Capability match too low"