# [Developer] Update all import references system-wide

**ID:** TASK-011
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @Developer
**Priority:** P2

## Description
After consolidation, update all import references throughout the system to point to the new consolidated files.

## Subtasks
- [ ] Find all @./ imports pointing to removed files
- [ ] Update imports to use new consolidated locations
- [ ] Verify all import chains resolve correctly
- [ ] Update CLAUDE.md with new structure
- [ ] Test system initialization with new imports

## Import Updates Required
- References to removed commands → use behaviors
- References to old patterns → use merged patterns
- References to removed behaviors → use consolidated ones
- Update virtual-team.md imports
- Update executable-workflow.md imports

## Key Files to Update
- `/src/modes/virtual-team.md`
- `/src/behaviors/lean-workflow-executor.md`
- `/src/CLAUDE.md`
- All remaining behaviors with imports
- All remaining commands with imports

## Acceptance Criteria
- All imports resolve correctly
- No broken import chains
- System initializes properly
- make validate-imports passes

## Technical Notes
- Use grep to find all @./ references
- Update systematically by component
- Test after each major update