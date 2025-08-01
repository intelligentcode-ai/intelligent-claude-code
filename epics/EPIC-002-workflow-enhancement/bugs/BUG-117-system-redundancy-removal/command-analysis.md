# COMMAND REDUNDANCY ANALYSIS

## Commands vs Workflow Capabilities

### FULLY REDUNDANT COMMANDS (DELETE):

1. **icc-activate-role.md** - Workflow handles via subagent calls
2. **icc-create-task.md** - Workflow step 3 handles task creation
3. **icc-create-bug.md** - Workflow handles bug creation
4. **icc-create-story.md** - Workflow handles story creation
5. **icc-create-epic.md** - Workflow handles epic creation
6. **icc-parallelize-subtasks.md** - Workflow handles parallel execution
7. **icc-plan-bug.md** - Workflow step 1-3 handles planning
8. **icc-plan-story.md** - Workflow step 1-3 handles planning
9. **icc-plan-tasks.md** - Workflow step 3 handles task planning
10. **icc-prioritize.md** - Workflow has priority rules built-in
11. **icc-git-operation.md** - Workflow handles all git operations

### PARTIALLY REDUNDANT (NEEDS ANALYSIS):

1. **icc-detect-work-type.md** - Used IN workflow for specialist selection
2. **icc-require-triage.md** - Used IN workflow step 2
3. **icc-validate-assignments.md** - Used IN workflow for >70% matching
4. **icc-create-specialist.md** - Used IN workflow for <70% match

### UNIQUE FUNCTIONALITY (KEEP):

1. **icc-init-system.md** - System initialization
2. **icc-system-status.md** - Status checking
3. **icc-restore-state.md** - State restoration
4. **icc-verify-behaviors.md** - Behavior verification
5. **icc-load-config.md** - Configuration loading
6. **icc-get-setting.md** - Get specific settings
7. **icc-apply-config.md** - Apply configuration
8. **icc-load-project-context.md** - Load PROJECT-CONTEXT.md
9. **icc-validate-context.md** - Validate context loaded
10. **icc-detect-project-type.md** - Detect project characteristics
11. **icc-think-sequential.md** - Sequential thinking tool
12. **icc-validate-directory.md** - Directory validation
13. **icc-load.md** - Generic loading
14. **icc-load-context.md** - Context loading
15. **icc-finalize-item.md** - Finalization logic

## SUMMARY

- **DELETE:** 11 commands (35%)
- **KEEP FOR WORKFLOW:** 4 commands (13%)
- **KEEP UNIQUE:** 15 commands (48%)
- **UNCLEAR:** 1 command (3%)

The workflow makes many commands obsolete because it handles:
- All role switching
- All work item creation (epic/story/bug/task)
- All planning operations
- All git operations
- Priority management
- Parallel execution

Commands should only exist for:
1. System management (init, status, restore)
2. Configuration management
3. Utilities used BY the workflow
4. Unique functionality not in workflow