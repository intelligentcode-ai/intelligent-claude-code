# TASK-002: Settings Retrieval - Current Task Patterns

## Task Context
Analysis of current settings and configuration patterns related to task management and numbering in the intelligent-claude-code system.

## Current Task Configuration Findings

### 1. Configuration Files

#### src/config.md
- **No task-specific settings found**
- Contains L3 autonomy settings, git configuration, review requirements
- Has priority system configuration but no task numbering formats
- Uses hardcoded "TASK-" prefix throughout examples

#### .claude/config.md
- Project-specific minimal config
- No task numbering settings

### 2. Task ID Patterns Currently in Use

#### Hardcoded Format: TASK-XXX
Found throughout the codebase:
- `TASK-001`, `TASK-002`, `TASK-003` etc. in examples
- Always 3 digits with leading zeros
- Always uppercase "TASK-" prefix

#### File Naming Convention
From task-file-generator.md:
```
fileName = "TASK-" + task.id + "-" + briefDescription + ".md"
```
Example: `TASK-003-implement-user-service.md`

#### Task File Search Patterns
From lean-workflow-executor.md:
```
"epics/*/stories/*/tasks/TASK-{taskId}-*.md"
"epics/*/bugs/*/tasks/TASK-{taskId}-*.md"
```

### 3. Priority System Integration

#### Priority Display Format (inner-workflow.yaml)
```yaml
priority_display:
  - "Show priority prefix: [P0], [P1], [P2], [P3]"
  - "Highlight P0 items, dim P3 items"
  - "Sort status updates by priority"
```

#### Priority Bonuses
```yaml
priority_bonuses:
  - "P0 task completion: +2.0P bonus"
  - "P1 task completion: +1.5P bonus"
  - "P2 task completion: +1.0P bonus"
  - "P3 task completion: +0.5P bonus"
```

### 4. Task Generation Logic

#### No Configurable Task ID Generation Found
- `generateTaskId()` function referenced in planning-commands.md but not implemented
- No task counter or sequence management
- No configuration for task numbering format

#### Task Creation in Workflows
- Tasks are created during story planning phase
- PM and specialists create tasks with manual IDs
- No automatic ID assignment logic

### 5. Configuration Points That Need Updating

#### Missing Settings to Add:
```yaml
# Task Management Configuration
task_management:
  task_id_format: "TASK-{id:03d}"  # Format with 3-digit padding
  task_id_prefix: "TASK"            # Configurable prefix
  task_numbering_scope: "global"    # global, per-story, per-epic
  task_file_format: "{prefix}-{id:03d}-{description}.md"
  
  # Subtask configuration
  subtask_format: "ST-{parent_id}.{sub_id:02d}"
  subtask_enabled: true
```

### 6. Files Requiring Updates

1. **src/config.md**
   - Add task_management section
   - Define configurable formats

2. **src/behaviors/lean-workflow-executor.md**
   - Update task ID generation logic
   - Make findTaskFile() use configurable patterns

3. **src/behaviors/task-file-generator.md**
   - Update generateTaskFileName() to use config
   - Make file format configurable

4. **workflow-templates/inner-workflow.yaml**
   - Reference configurable task formats
   - Update examples to show configuration

5. **src/commands/icc-plan-story.md**
   - Update task generation to use configured format
   - Show configurable examples

### 7. Role-Based Task Restrictions

#### Current Restrictions:
- PM role cannot use Edit/Write tools (delegation only)
- Task assignment requires >70% capability match
- Specialist validation mandatory for all assignments
- No role-specific task numbering found

### 8. Command Definitions

No task-specific commands for:
- Task numbering configuration
- Task ID generation
- Task format validation

### Summary for Architect Review

**Current State:**
- Task IDs are hardcoded as "TASK-XXX" throughout
- No configuration options for task numbering
- No automatic ID generation system
- Priority system exists but separate from task IDs
- File naming follows hardcoded patterns

**Configuration Gaps:**
1. No task_management section in config
2. No configurable task ID format
3. No task numbering scope options
4. No subtask format configuration
5. No automatic sequence management

**Recommended Configuration Structure:**
```yaml
task_management:
  # Core task identification
  task_id_format: "TASK-{id:03d}"
  task_id_prefix: "TASK"
  task_numbering_scope: "global"
  
  # File generation
  task_file_format: "{prefix}-{id:03d}-{description}.md"
  
  # Subtask support
  subtask_enabled: true
  subtask_format: "ST-{parent_id}.{sub_id:02d}"
  
  # Display options
  show_priority_prefix: true
  priority_format: "[{priority}]"
```

This configuration would need to be integrated across all task-related behaviors and workflows.