# TASK-185: Implement Dedicated Task File System

## Task Metadata
- **ID**: TASK-185
- **Title**: @AI-Engineer: Implement dedicated task file system
- **Assigned To**: @AI-Engineer
- **Type**: implementation
- **Priority**: blocking
- **Status**: completed
- **Story**: STORY-013
- **Dependencies**: ["TASK-175"]

## Task Scope
Implement a system that generates dedicated task files (.md) for every task, providing executing roles with clear scope, required information, and embedded settings.

## Execution Instructions
1. Design task file template structure including:
   - Task metadata (ID, title, assignee, type, priority, status)
   - Clear scope definition
   - Execution instructions
   - Required information and settings
   - Embedded configuration
   - Success criteria

2. Implement task file generation in lean-workflow-executor.md:
   - Auto-generate task files when tasks are created
   - Include all necessary context from story/bug
   - Add embedded config specific to task
   - Ensure proper file naming convention

3. Update task execution flow to:
   - Read task from dedicated file
   - Extract embedded config
   - Use task-specific settings
   - Update task file with results

4. Create validation to ensure:
   - Every task has a dedicated file
   - Files contain required sections
   - Embedded config is valid

## Required Information
- **File Naming Convention**: `TASK-{ID}-{brief-description}.md`
- **Directory Structure**: `{epic}/stories/{story-id}/tasks/` or `{epic}/bugs/{bug-id}/tasks/`
- **Template Sections**: Metadata, Scope, Instructions, Config, Criteria, Output

## Embedded Config
```yaml
autonomy_level: "L3"
execution_mode: "subtask"
model: "sonnet"
parallel_eligible: false  # Blocking task
validation_required: true
```

## Success Criteria
- Task file generation integrated into workflow
- All new tasks have dedicated files
- Files provide complete execution context
- Subtasks can execute independently using only task file
- Validation ensures file completeness

## Implementation Details
Update the following components:
1. `lean-workflow-executor.md` - Add task file generation
2. `role-activation-system.md` - Read task from file
3. Create new `task-file-generator.md` behavioral module
4. Update task execution to use dedicated files

## Output Location
- Implementation code in `src/behaviors/task-file-generator.md`
- Updated workflow executor with file generation
- Example task files in story/bug directories

## Completion Details
- **Completed At**: 2025-01-18 10:45
- **Completed By**: @AI-Engineer
- **Output**: Created task-file-generator.md behavioral module and integrated with lean-workflow-executor.md

### Implementation Summary
1. Created `src/behaviors/task-file-generator.md` with:
   - Task file generation logic
   - Proper naming convention support (`TASK-{ID}-{brief-description}.md`)
   - Task-specific embedded config generation
   - Template with all required sections
   - Integration hooks for workflow

2. Updated `src/behaviors/lean-workflow-executor.md` to:
   - Import task-file-generator.md
   - Generate task files when tasks are created (section 4.5)
   - Read from task files during execution
   - Added task file management functions (section 2.5)
   - Updated task execution to use dedicated files

3. Key features implemented:
   - Auto-generation of task files when tasks are created
   - Embedded config inheritance with task-specific overrides
   - Complete execution context in each file
   - Status updates to task files as work progresses
   - Validation to ensure file completeness

### Validation Results
- Task file generator successfully integrated into workflow
- Task execution now reads from dedicated files
- Files provide complete context for independent execution
- Subtasks can be executed using only their task file