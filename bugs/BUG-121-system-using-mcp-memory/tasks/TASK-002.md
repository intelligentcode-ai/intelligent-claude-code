# TASK-002: [AI-Engineer] Update behavioral patterns to use file-based memory

## Task Details
- **Task ID**: TASK-002
- **Parent**: BUG-121
- **Title**: [AI-Engineer] Update behavioral patterns to use file-based memory
- **Status**: COMPLETED
- **Priority**: P0
- **Assignee**: @AI-Engineer
- **SME_Reviewer**: @Architect
- **Created**: 2025-01-23
- **Updated**: 2025-01-23
- **Completed**: 2025-01-23

## Description
Update all behavioral patterns to use the new file-based memory functions instead of MCP memory operations. Remove all abstract memory references and replace with concrete file operations.

## Objectives
1. Remove all MCP memory tool references
2. Update workflows to use file-based memory
3. Fix learning capture in retrospectives
4. Ensure memory operations work in project directory

## Subtasks
- [x] Audit all behavioral files for MCP memory usage
- [x] Update learning-team-automation.md to use file operations
- [x] Update executable-workflow.md memory steps
- [x] Remove abstract memory operation descriptions

## Files to Update
```
src/behaviors/learning-team-automation.md
src/behaviors/shared-patterns/learning-patterns.md
src/workflow-templates/executable-workflow.md
Any other files with memory operations
```

## Key Changes
1. Replace "Memory search" with concrete file search operations
2. Replace "Store in memory" with file write operations
3. Update retrospective phases to write learning files
4. Ensure all paths use .claude/memory/ within project

## Example Transformations
```markdown
# Before (Abstract)
"Search memory for similar patterns"

# After (Concrete)
"Search .claude/memory/entities/Learning/ for similar patterns using grep"
```

## Acceptance Criteria
- [x] Zero MCP memory references remain
- [x] All memory operations use file-based functions
- [x] Learning capture writes actual files
- [x] Memory search reads from file system
- [x] All operations stay within project directory

## Notes
- Coordinate with TASK-001 for function usage
- Preserve behavioral logic, only change implementation
- Test each updated pattern for correctness

## Completion Summary
All behavioral patterns have been verified and are already properly updated to use file-based memory operations:

1. **executable-workflow.md**: Uses StoreInMemory and SearchMemory patterns from memory-operations.md
2. **learning-team-automation.md**: Imports memory-operations.md and uses file-based patterns
3. **learning-patterns.md**: References memory-operations.md for all memory operations
4. **No MCP memory references remain**: Verified via comprehensive grep search

The system now exclusively uses file-based memory operations in the `.claude/memory/` directory structure within the project root.