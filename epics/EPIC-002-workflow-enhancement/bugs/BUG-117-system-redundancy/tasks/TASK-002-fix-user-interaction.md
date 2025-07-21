# [System-Engineer] Fix User Interaction Architecture

**ID:** TASK-002
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @System-Engineer
**Priority:** P0

## Description
Clean up the user interaction system by removing duplicate virtual-team.md content from ~/.claude/CLAUDE.md and establishing proper project/user file relationships. Fix the circular import issues and create clear boundaries.

## Subtasks
- [ ] Remove duplicate virtual-team.md content from ~/.claude/CLAUDE.md
- [ ] Update ~/.claude/CLAUDE.md to properly reference PROJECT-CONTEXT.md via @{{project_dir}}/PROJECT-CONTEXT.md
- [ ] Create proper import hierarchy: User files → Project files (never reverse)
- [ ] Fix the multiple-instruction issue by establishing single source of truth
- [ ] Update documentation to clarify user vs project file purposes

## Acceptance Criteria
- ~/.claude/CLAUDE.md contains NO duplicate content from other files
- Clear import direction: User → Project only
- Claude receives single, coherent instruction set
- PROJECT-CONTEXT.md becomes the single source for project configuration
- No circular dependencies in the import chain

## Technical Notes
- Use @{{project_dir}} variable for dynamic project references
- Ensure backward compatibility during migration
- Test with multiple projects to verify proper isolation
- Document the new architecture clearly