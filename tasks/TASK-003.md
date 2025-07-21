# [Developer] Remove redundant queue management commands

**ID:** TASK-003
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @Developer
**Priority:** P0

## Description
Remove queue management commands that duplicate functionality already in workflow-coordination.md (which consolidated task-queue-manager.md).

## Subtasks
- [ ] Delete /icc-queue-add command (use workflow-coordination.md)
- [ ] Delete /icc-queue-get-parallel command (use workflow-coordination.md)
- [ ] Update references to use workflow-coordination.md behavioral patterns
- [ ] Verify task queue operations through workflow-coordination.md
- [ ] Test parallel task execution still functions

## Commands to Remove
- `src/commands/icc-queue-add.md`
- `src/commands/icc-queue-get-parallel.md`

## Keep These
- `src/commands/icc-prioritize.md` (has unique priority calculation logic)

## Acceptance Criteria
- Queue commands removed from src/commands/
- Task queue operations work through workflow-coordination.md
- Parallel execution continues to function
- Priority system remains intact

## Technical Notes
- workflow-coordination.md already has complete queue management
- Priority calculation remains a separate concern
- Executable-workflow.md handles the actual execution flow