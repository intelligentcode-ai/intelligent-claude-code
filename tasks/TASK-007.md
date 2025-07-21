# [AI-Engineer] Merge role management behaviors

**ID:** TASK-007
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @AI-Engineer
**Priority:** P1

## Description
Consolidate role management behaviors that have overlapping functionality. Multiple behaviors handle role detection, activation, and management.

## Subtasks
- [ ] Analyze role-management.md to identify what to preserve
- [ ] Delete redundant role behaviors that duplicate role-management.md
- [ ] Ensure role activation through Task.create() is preserved
- [ ] Maintain >70% capability matching logic
- [ ] Update imports to use consolidated role-management.md

## Behaviors to Consolidate
- Keep `src/behaviors/role-management.md` as the primary role behavior
- Keep `src/behaviors/role-assignment-validator.md` (validation logic)
- Remove behaviors that duplicate role-management.md functionality

## Key Functionality to Preserve
- Role activation via @-notation
- Dynamic specialist creation (<70% match)
- Capability matching validation
- Role assignment validation chain

## Acceptance Criteria
- Single role management behavior
- Role activation continues to work
- Dynamic specialist creation functions
- Validation chain remains intact

## Technical Notes
- Executable-workflow.md defines Task.create() subagent pattern
- Role-management.md should handle role logistics
- Role-assignment-validator.md handles validation requirements