# icc:add-task

Add a task to a story/bug during execution phase. This is a Stage 4 (EXECUTING) command that allows specialists to add tasks they discover during execution. Available to any specialist role.

## Usage
```
icc-add-task STORY-XXX|BUG-XXX "Task title" --type implementation|testing|documentation|review --assigned-to @Role [--dependencies TASK-XXX,TASK-YYY]
```

## Parameters
- `item_id`: Story or Bug identifier (required)
- `title`: Task title/description (required)
- `--type`: Task type - implementation, testing, documentation, review, etc. (required)
- `--assigned-to`: Role to assign the task to (required)
- `--dependencies`: Comma-separated list of task dependencies (optional)

## Implementation
Executes task addition workflow during Stage 4 (EXECUTING):

1. **Role Validation**: Verify current role is a specialist (not PM)
2. **Item Validation**: Load story/bug and verify it exists
3. **Phase Check**: Ensure item is in EXECUTING phase
4. **Number Allocation**: Find next available number in appropriate range
5. **Review Generation**: Auto-create review task for creation/update tasks
6. **File Generation**: Create task files with embedded config
7. **Item Update**: Add tasks to story/bug file

## Task Numbering Logic
```pseudocode
FUNCTION findNextAvailableNumber(existingTasks, taskType):
    allocator = new TaskNumberAllocator()
    
    // Load existing numbers
    FOR task IN existingTasks:
        number = extractTaskNumber(task.id)
        allocator.usedNumbers.add(number)
    
    // Determine range based on task type
    IF taskType IN ["knowledge_retrieval", "settings_retrieval", "memory_search"]:
        range = {start: 1, end: 9}
    ELSE IF taskType IN ["documentation", "deployment", "testing_final", "git_operations", "knowledge_generation"]:
        range = {start: 995, end: 999}
    ELSE:
        // Core tasks - find gaps in middle range
        range = {start: 10, end: 994}
    
    // Find first available number
    FOR num IN range.start TO range.end:
        IF num NOT IN allocator.usedNumbers:
            RETURN allocator.formatTaskId(num)
    
    THROW "No available task numbers in range"
```

## Review Task Generation
- Tasks of type "implementation", "design", "update", or "creation" automatically get review tasks
- Review task number = main task number + 1
- Review assigned to appropriate architect based on domain
- No reviews for: review tasks, knowledge tasks, git operations

## Expected Output
```
📋 Task Addition (Stage 4: EXECUTING)

🔐 Role Check: @AI-Engineer ✅
🔍 Loading: STORY-023 ✅
📊 Current Phase: EXECUTING ✅

🔢 Finding available task number...
  Range: Core tasks (010-994)
  Next available: TASK-052

✅ Creating task:
  - TASK-052: Implement error handling for API calls (@Developer)
  - Type: implementation
  - Dependencies: TASK-020

✅ Generating review task:
  - TASK-053: Review error handling implementation (@System-Architect)
  - Type: peer_review
  - Review of: TASK-052

📁 Generated 2 task files
📝 Updated STORY-023 with new tasks

⏭️  Next Step: Execute the newly added tasks
```

## Task File Structure
Each task gets a dedicated file at `story-dir/tasks/TASK-XXX-title.md`:
```yaml
task:
  id: "TASK-XXX"
  title: "Task title"
  assigned_to: "@Role"
  type: "task_type"
  status: "planned"
  priority: "parallel"  # Or blocking/critical_path based on context
  dependencies: ["TASK-YYY"]
  project_scope: "[Inherited from parent story/bug]"
  
context: |
  Task discovered during execution of [parent context]
  
execution_instructions: |
  1. [Step-by-step instructions based on task type]
  
success_criteria:
  - [Specific measurable criteria]
  
embedded_config:
  model: "sonnet"  # Non-PM tasks use sonnet
  autonomy_level: "[Inherited from parent]"
```

## Validation
- **Specialist Role Required**: PM cannot add tasks during execution
- **Phase Must Be EXECUTING**: Cannot add tasks in other phases
- **Valid Task Type**: Must be recognized task type
- **Number Availability**: Must have available numbers in range
- **No Duplicate Work**: Check task doesn't duplicate existing work
- **Review Enforcement**: Creation/update tasks must have reviews

## Domain-Based Review Assignment
```pseudocode
FUNCTION determineReviewer(taskType, assignedTo):
    domainMap = {
        "@AI-Engineer": "@AI-Architect",
        "@Developer": "@System-Architect",
        "@DevOps-Engineer": "@System-Architect",
        "@Database-Engineer": "@Data-Architect",
        "@Security-Engineer": "@Security-Architect",
        "@Web-Designer": "@Frontend-Architect",
        "@QA-Engineer": "@QA-Architect",
        "@Frontend-Developer": "@Frontend-Architect",
        "@Backend-Developer": "@System-Architect"
    }
    
    RETURN domainMap[assignedTo] || "@AI-Architect"  // Default
```

## Integration
- Works with TaskNumberAllocator for number allocation
- Updates parent story/bug with new tasks
- Creates task files with proper structure
- Maintains project_scope inheritance
- Sets model to "sonnet" for specialist tasks
- Integrates with existing task workflow

## Error Handling
- **No Numbers Available**: Suggest using different task type or range
- **Phase Mismatch**: Inform user item must be in EXECUTING phase
- **PM Restriction**: Inform PM they cannot add tasks during execution
- **Duplicate Task**: Warn if similar task already exists