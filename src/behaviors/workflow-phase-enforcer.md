# Workflow Phase Enforcer

**PURPOSE:** Enforce workflow phase progression and validate phase prerequisites

## Core Behaviors

### Phase Detection
When reading any assignment file (epic.yaml, story.yaml, bug.yaml, task.md):
- Check for workflow_type field (outer or inner)
- Check for workflow_phase field
- If missing, infer from file type and status

### Phase Prerequisites
Before executing any action:
- Check current workflow phase
- Validate phase prerequisites are met
- Block actions that skip required phases
- Suggest correct next phase if blocked

### Outer Workflow Phases
**Sequence:** knowledge_retrieval → epic_definition → story_creation → task_decomposition → git_operations → acceptance_criteria → knowledge_generation

**Phase Gates:**
- Cannot create tasks before completing story_creation
- Cannot assign roles before task_decomposition
- Cannot create branches before git_operations
- Cannot close story before knowledge_generation

### Inner Workflow Phases  
**Sequence:** knowledge_retrieval → task_planning → task_execution → task_validation → peer_review → git_operations → task_completion → knowledge_generation

**Phase Gates:**
- Cannot execute before knowledge_retrieval
- Cannot commit before task_validation
- Cannot complete before knowledge_generation
- Peer review required for certain task types

### Phase Transitions
When completing phase requirements:
- Update workflow_phase in assignment file
- Log phase transition with timestamp
- Trigger next phase actions if L3 mode
- Update progress tracking

### Phase Validation Commands
- Check phase with assignment file status
- Validate phase prerequisites met
- Report blocked actions with reasons
- Suggest corrective actions

### Integration Points
- Commands check phase before execution
- Behaviors enforce phase sequences  
- L3 mode auto-transitions phases
- Progress monitor tracks phase status

### Error Handling
When phase violation detected:
- Block the action
- Explain which phase is required
- Show current phase vs required phase
- Provide command to transition phase

## Benefits
- Ensures workflow compliance
- Prevents skipped steps
- Maintains process integrity
- Enables progress tracking