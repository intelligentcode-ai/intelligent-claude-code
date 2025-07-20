# TASK-001: Create PROJECT-CONTEXT.md Loader Behavior

## Task Details
- **ID**: TASK-001
- **Parent**: BUG-087
- **Title**: [AI-Engineer] Create PROJECT-CONTEXT.md loader behavior
- **Status**: PLANNED
- **Priority**: blocking
- **Assigned To**: @AI-Engineer

## Description
Create a behavioral module that enforces PROJECT-CONTEXT.md loading as the FIRST action in any work session. This behavior must intercept all initialization and ensure context is loaded before any other actions.

## Acceptance Criteria
- [ ] Create `project-context-loader.md` behavior
- [ ] Integrate with system initialization
- [ ] Block work without context loaded
- [ ] Provide clear feedback when enforcing
- [ ] Store context in memory for session

## Subtasks
1. **Design behavior structure** - Create the behavioral pattern for context loading
2. **Integration hooks** - Add hooks to initialization and work start
3. **Validation logic** - Ensure context is loaded and understood
4. **Blocking mechanism** - Prevent work without context
5. **Memory storage** - Store loaded context for session reference

## Dependencies
- None (blocking task)

## Notes
- Must be ultra-experienced in behavioral pattern design
- Consider all entry points where work might begin
- Ensure generic nature of system is emphasized