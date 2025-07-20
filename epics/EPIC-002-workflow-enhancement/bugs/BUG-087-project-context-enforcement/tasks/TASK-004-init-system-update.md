# TASK-004: [AI-Engineer] Update System Initialization

## Task Details
- **ID**: TASK-004
- **Parent**: BUG-087
- **Title**: [AI-Engineer] Update icc-init-system to load PROJECT-CONTEXT first
- **Status**: PLANNED
- **Priority**: critical_path
- **Assigned To**: @AI-Engineer

## Description
Modify the system initialization command to enforce PROJECT-CONTEXT.md loading as the very first action. This ensures all subsequent initialization happens with proper context awareness.

## Acceptance Criteria
- [ ] Update icc-init-system.md command
- [ ] Add context loading as first step
- [ ] Validate context before proceeding
- [ ] Adjust initialization order
- [ ] Add failure handling

## Subtasks
1. **Reorder initialization** - Move context loading to first position
2. **Validation integration** - Check context loaded successfully
3. **Conditional flow** - Adjust init based on context understanding
4. **Error messaging** - Clear feedback if context missing
5. **Fallback behavior** - Handle projects without context file

## Dependencies
- TASK-003 (needs context commands)

## Notes
- Maintain backwards compatibility
- Consider projects that might not have context file
- Ensure smooth initialization flow