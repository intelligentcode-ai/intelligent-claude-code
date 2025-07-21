# [Developer] Remove redundant memory operation commands

**ID:** TASK-002
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @Developer
**Priority:** P0

## Description
Remove memory operation commands that duplicate functionality in file-based-memory.md and shared-patterns/memory-patterns.md.

## Subtasks
- [ ] Delete /icc-memory-search command (duplicates memory-patterns.md functionality)
- [ ] Delete /icc-memory-store command (duplicates memory-patterns.md functionality)
- [ ] Update any references to use memory behaviors directly
- [ ] Verify memory operations still work through behaviors
- [ ] Test learning capture and storage functionality

## Commands to Remove
- `src/commands/icc-memory-search.md`
- `src/commands/icc-memory-store.md`
- `src/commands/icc-learning-store.md` (duplicates icc-memory-store)

## Acceptance Criteria
- All memory commands removed from src/commands/
- Memory operations work through behaviors
- No broken imports or references
- Learning system continues to function

## Technical Notes
- Keep icc-memory-init.md and icc-memory-cleanup.md (unique functionality)
- Memory patterns are well-defined in shared-patterns/memory-patterns.md
- File-based-memory.md provides the implementation