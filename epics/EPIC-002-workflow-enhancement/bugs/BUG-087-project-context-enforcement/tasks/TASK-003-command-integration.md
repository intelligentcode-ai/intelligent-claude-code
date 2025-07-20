# TASK-003: [AI-Engineer] Create Context Loading Commands

## Task Details
- **ID**: TASK-003
- **Parent**: BUG-087
- **Title**: [AI-Engineer] Create commands for PROJECT-CONTEXT operations
- **Status**: PLANNED
- **Priority**: critical_path
- **Assigned To**: @AI-Engineer

## Description
Create slash commands for PROJECT-CONTEXT.md operations including loading, validation, and status checking. These commands will be used by behaviors to enforce context awareness.

## Acceptance Criteria
- [ ] Create `/icc-load-context` command
- [ ] Create `/icc-validate-context` command
- [ ] Create `/icc-context-status` command
- [ ] Integrate with memory system
- [ ] Provide clear status feedback

## Subtasks
1. **Load command** - Create command to load PROJECT-CONTEXT.md
2. **Validate command** - Check if context is loaded and understood
3. **Status command** - Display current context understanding
4. **Memory integration** - Store/retrieve context from memory
5. **Error handling** - Handle missing or invalid context files

## Dependencies
- TASK-001 (behavior defines what to load)

## Notes
- Commands should be simple and focused
- Use $ARGUMENTS for flexibility
- Consider different project locations