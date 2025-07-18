# TASK-176: Design subtask parallel execution patterns for Claude Code

## Task Metadata
- **ID**: TASK-176
- **Title**: Design subtask parallel execution patterns for Claude Code
- **Assigned To**: @AI-Architect
- **Type**: design
- **Priority**: blocking
- **Status**: completed
- **Story**: STORY-030-parallel-execution
- **Dependencies**: []

## Task Scope
Design clear behavioral patterns for how the virtual team should use Claude Code's existing Task tool capabilities to achieve parallel execution. This is about documenting the proper usage patterns, not creating new architecture.

## Execution Instructions
1. Document how PM role uses Task tool for delegation
2. Define patterns for task file integration
3. Specify how roles read task context
4. Design parallel execution patterns
5. Update behavioral documentation

## Required Information
- **Parent Story**: STORY-030: Implement subtask parallel execution
- **Acceptance Criteria**: See parent story
- **Key Constraint**: Must use Claude Code's existing Task tool, not create new system

## Embedded Config
```yaml
execution_mode: design
model: opus
validation_required: true
blocking_enabled: false
```

## Success Criteria
- Clear patterns for Task tool usage
- Behavioral documentation updated
- No new architecture introduced
- Practical implementation guide
- Integration with existing workflow

## Implementation Details

### 1. Claude Code Task Tool Usage Pattern

**Core Principle**: The PM role stays in the main conversation context and uses Claude Code's Task tool to delegate work to specialists.

#### PM Delegation Pattern
```pseudocode
FUNCTION PMDelegateTask(task):
    // PM remains in main context
    IF currentRole != "PM":
        ERROR("Only PM can delegate tasks")
    
    // Create subtask using Task tool
    subtaskDescription = formatSubtaskDescription(task)
    
    // CRITICAL: Include role name in description
    subtaskDescription = "[" + task.assigned_to + "] " + subtaskDescription
    
    // Use Claude Code's Task tool
    result = TaskTool.create(
        title: task.title,
        description: subtaskDescription,
        instructions: "Read task file at: " + task.file_path
    )
    
    RETURN result
```

#### Subtask Description Format
```
[ROLE_NAME] Execute TASK-XXX from task file

Task File: epics/EPIC-XXX/stories/STORY-XXX/tasks/TASK-XXX-description.md

Instructions:
1. Read the task file for complete context and embedded config
2. Apply the embedded configuration
3. Execute according to task type and instructions
4. Update task file with results
5. Return completion status
```

### 2. Task File Integration Pattern

**Core Principle**: Each task has a dedicated .md file that serves as the single source of truth for execution.

#### Task File Reading Pattern
```pseudocode
FUNCTION executeSubtask(subtaskContext):
    // Extract task file path from description
    taskFilePath = extractTaskFilePath(subtaskContext.description)
    
    // Read task file
    taskContent = readFile(taskFilePath)
    
    // Parse embedded config
    embeddedConfig = parseEmbeddedConfig(taskContent)
    applyConfig(embeddedConfig)
    
    // Extract role from description
    assignedRole = extractRoleFromDescription(subtaskContext.description)
    
    // Activate role
    activateRole(assignedRole)
    
    // Execute based on task content
    executeTaskWork(taskContent)
```

### 3. Parallel Execution Pattern

**Core Principle**: PM identifies tasks with priority "parallel" and creates multiple Task tool subtasks simultaneously.

#### Parallel Task Creation
```pseudocode
FUNCTION createParallelTasks(story):
    // Identify parallel-eligible tasks
    parallelTasks = story.tasks.filter(t => t.priority == "parallel")
    
    // Group by non-conflicting work
    taskGroups = groupNonConflictingTasks(parallelTasks)
    
    // Create subtasks for first group
    FOR task IN taskGroups[0]:
        // Create subtask immediately
        TaskTool.create({
            title: task.title,
            description: "[" + task.assigned_to + "] " + task.description,
            instructions: "Read: " + task.file_path
        })
    
    // Claude Code handles parallel execution
    logInfo("Created " + taskGroups[0].length + " parallel subtasks")
```

#### Non-Conflicting Task Detection
```pseudocode
FUNCTION groupNonConflictingTasks(tasks):
    groups = []
    currentGroup = []
    
    FOR task IN tasks:
        hasConflict = false
        
        FOR other IN currentGroup:
            // Check for conflicts
            IF task.modifies_files.intersects(other.modifies_files):
                hasConflict = true
                BREAK
            IF task.assigned_to == other.assigned_to:
                hasConflict = true
                BREAK
        
        IF NOT hasConflict:
            currentGroup.append(task)
        ELSE:
            // Start new group
            groups.append(currentGroup)
            currentGroup = [task]
    
    IF currentGroup.length > 0:
        groups.append(currentGroup)
    
    RETURN groups
```

### 4. Behavioral Pattern Updates

#### Update lean-workflow-executor.md
```pseudocode
// Add to task execution section
FUNCTION executeTaskAsSubtask(task):
    // Check if we should use Task tool
    IF currentRole == "PM" AND task.assigned_to != "PM":
        // Use Task tool for delegation
        subtask = TaskTool.create({
            title: "Execute " + task.id,
            description: "[" + task.assigned_to + "] Execute from file",
            instructions: "Task file: " + task.file_path
        })
        RETURN subtask
    ELSE:
        // Direct execution (non-PM or self-assigned)
        RETURN executeTaskDirectly(task)
```

#### Add Role Detection in Subtask
```pseudocode
FUNCTION detectRoleFromSubtask(context):
    // Pattern: [ROLE_NAME] at start of description
    roleMatch = context.description.match(/^\[(@\w+(?:-\w+)*)\]/)
    
    IF roleMatch:
        roleName = roleMatch[1]
        activateRole(roleName)
        RETURN roleName
    ELSE:
        ERROR("No role specified in subtask description")
```

### 5. Implementation Integration Points

#### PM Command Enhancement
```yaml
# When PM executes story planning
pm_story_execution:
  blocking_tasks:
    - Execute sequentially
    - Use Task tool for each
    
  parallel_tasks:
    - Group non-conflicting
    - Create multiple Task subtasks
    - Let Claude Code handle parallelism
```

#### Task File Generator Integration
```yaml
# Task file must include
task_file_content:
  execution_context:
    - Clear role assignment
    - Embedded configuration
    - File paths for work
    - Dependencies clearly stated
    
  subtask_instructions:
    - "This task will be executed via Claude Code Task tool"
    - "Read this file for complete context"
    - "Apply embedded config before execution"
```

### 6. Benefits of This Approach

1. **No New Architecture**: Uses Claude Code's existing Task tool
2. **Natural Parallelism**: Claude Code handles parallel subtask execution
3. **Clear Context**: Task files provide complete execution context
4. **Role Clarity**: Role name in description ensures proper activation
5. **PM Coordination**: PM stays in main context, coordinates via Task tool

### 7. Example Usage Flow

```yaml
# PM in main conversation
PM: "I need to execute STORY-030 tasks"

# PM creates parallel tasks
PM: Creates Task 1: "[Developer] Execute TASK-001 from file..."
PM: Creates Task 2: "[QA-Engineer] Execute TASK-002 from file..."
PM: Creates Task 3: "[AI-Engineer] Execute TASK-003 from file..."

# Claude Code executes subtasks in parallel
Subtask 1: Developer reads file, implements feature
Subtask 2: QA-Engineer reads file, creates tests
Subtask 3: AI-Engineer reads file, updates AI components

# Results flow back to PM
PM: Receives completion notifications, coordinates next steps
```

## Output Location
- Pattern documentation in lean-workflow-executor.md
- Task tool usage examples in documentation
- Integration notes in task-file-generator.md

## Completion Details
- **Completed At**: 2025-01-18T10:45:00
- **Completed By**: @AI-Architect
- **Output**: Comprehensive design for using Claude Code's Task tool with virtual team

### Key Design Decisions
1. PM uses Task tool for ALL specialist delegations
2. Role name MUST be in subtask description as [ROLE_NAME]
3. Task files provide complete execution context
4. Parallel tasks created as multiple Task tool calls
5. No new architecture - purely behavioral patterns