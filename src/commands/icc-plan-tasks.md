# icc:plan-tasks

Create tasks for a story/bug with standardized numbering and automatic review generation. This is a Stage 3 (REFINING) command that creates tasks with proper structure. Specialist-Architect only command.

## Usage
```
icc-plan-tasks STORY-XXX|BUG-XXX
```

## Parameters
- `item_id`: Story or Bug identifier (required)

## Implementation
Executes task planning workflow with standardized numbering:

1. **Role Validation**: Verify current role is Specialist-Architect (not PM)
2. **Item Validation**: Load story/bug and verify it exists
3. **Phase Check**: Ensure item is in PLANNING phase
4. **Task Generation**: Create tasks using standardized numbering
5. **Review Generation**: Auto-create review tasks for each creation/update task
6. **File Generation**: Create task files for all tasks
7. **Phase Transition**: Update phase from PLANNING to REFINING
8. **Item Update**: Save all tasks to story/bug file

## Task Numbering Pattern
```yaml
process_tasks: 001-009
  001: knowledge_retrieval
  002: settings_retrieval
  003: memory_search
  004-009: reserved

core_tasks: 010-994
  Design, implementation, testing, etc.
  
wrap_up_tasks: 995-999
  995: documentation
  996: deployment
  997: testing_final
  998: git_operations
  999: knowledge_generation
```

## Review Task Generation
- Every creation/update task gets a review task with +1 numbering
- Example: TASK-010 (implementation) → TASK-011 (review)
- Reviews assigned to domain-specific architects
- No reviews for: review tasks, knowledge tasks, git operations

## Expected Output
```
📋 Task Planning (Stage 3: REFINING)

🔐 Role Check: @AI-Architect ✅
🔍 Loading: STORY-023 ✅
📊 Current Phase: PLANNING → REFINING

🔢 Generating tasks with standardized numbering...

✅ Process Tasks:
  - TASK-001: Knowledge retrieval (@AI-Engineer)
  - TASK-002: Settings retrieval (@AI-Engineer)

✅ Core Tasks:
  - TASK-010: Design API structure (@AI-Architect)
  - TASK-011: Review API design (@System-Architect) [Review of TASK-010]
  - TASK-020: Implement API endpoints (@Developer)
  - TASK-021: Review API implementation (@System-Architect) [Review of TASK-020]
  - TASK-030: Write API tests (@QA-Engineer)
  - TASK-031: Review API tests (@QA-Architect) [Review of TASK-030]

✅ Wrap-up Tasks:
  - TASK-995: Update documentation (@Requirements-Engineer)
  - TASK-997: Run final test suite (@QA-Engineer)
  - TASK-998: Git operations (@DevOps-Engineer)
  - TASK-999: Knowledge generation (@AI-Engineer)

📁 Generated 12 task files
📝 Updated STORY-023 with tasks
🎯 Phase: PLANNING → REFINING

⏭️  Next Step: Specialists can begin task execution
```

## Task File Generation
Each task gets a dedicated file with:
- Complete task metadata
- Execution instructions
- Project scope (inherited from parent)
- Embedded config (model selection)
- Success criteria

## Validation
- **Architect Role Required**: Only Specialist-Architects can plan tasks
- **Phase Must Be PLANNING**: Cannot add tasks in other phases
- **Project Scope Mandatory**: All tasks inherit parent's project_scope
- **Number Allocation**: Prevents duplicate task numbers
- **Review Enforcement**: Creation/update tasks must have reviews

## Task Number Allocator
```pseudocode
CLASS TaskNumberAllocator:
    usedNumbers: Set<number>
    
    FUNCTION allocateNumber(taskType):
        range = getNumberRange(taskType)
        
        FOR num IN range.start TO range.end:
            IF num NOT IN usedNumbers:
                usedNumbers.add(num)
                RETURN formatTaskId(num)
        
        THROW "No available numbers in range"
    
    FUNCTION formatTaskId(number):
        RETURN "TASK-" + number.toString().padStart(3, '0')
```

## Integration
- Works with task-file-generator for file creation
- Updates parent story/bug with task list
- Sets proper model (sonnet) for non-PM tasks
- Triggers phase transition to REFINING
- Ready for Stage 4: EXECUTING