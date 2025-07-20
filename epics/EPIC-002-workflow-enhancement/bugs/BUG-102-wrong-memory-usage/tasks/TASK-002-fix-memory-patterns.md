# TASK-002: [AI-Engineer] Fix memory behavioral patterns to enforce file-based approach

## Objective
Update all memory-related behavioral patterns to clearly guide file-based operations using Claude Code's native tools, removing any MCP Memory references.

## Subtasks
1. **Update file-based-memory.md** to emphasize native file operations
2. **Fix all icc-memory-*.md commands** to use file system patterns
3. **Create clear examples** of file-based memory operations
4. **Remove or clarify MCP references** in behavioral files

## Acceptance Criteria
- All memory patterns use Read/Write/Grep tools only
- No mcp__memory__* function references
- Clear behavioral examples for each operation
- File structure patterns properly documented

## Priority: P0
## Status: PENDING
## Assigned: @AI-Engineer
## Dependencies: TASK-001