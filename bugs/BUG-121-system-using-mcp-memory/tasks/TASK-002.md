# TASK-002: [AI-Engineer] Update behavioral patterns to use file-based memory

## Task Details
- **Task ID**: TASK-002
- **Parent**: BUG-121
- **Title**: [AI-Engineer] Update behavioral patterns to use file-based memory
- **Status**: PLANNED
- **Priority**: P0
- **Assignee**: @AI-Engineer
- **SME_Reviewer**: @Architect
- **Created**: 2025-01-23
- **Updated**: 2025-01-23

## Description
Update all behavioral patterns to use the new file-based memory functions instead of MCP memory operations. Remove all abstract memory references and replace with concrete file operations.

## Objectives
1. Remove all MCP memory tool references
2. Update workflows to use file-based memory
3. Fix learning capture in retrospectives
4. Ensure memory operations work in project directory

## Subtasks
- [ ] Audit all behavioral files for MCP memory usage
- [ ] Update learning-team-automation.md to use file operations
- [ ] Update executable-workflow.md memory steps
- [ ] Remove abstract memory operation descriptions

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
- [ ] Zero MCP memory references remain
- [ ] All memory operations use file-based functions
- [ ] Learning capture writes actual files
- [ ] Memory search reads from file system
- [ ] All operations stay within project directory

## Notes
- Coordinate with TASK-001 for function usage
- Preserve behavioral logic, only change implementation
- Test each updated pattern for correctness