# Workflow Phase Enforcer

**PURPOSE:** Enforce workflow phase progression and validate phase prerequisites

## Core Behaviors

### Phase Detection
Use `/icc-detect-workflow-phase [assignment_file]` when reading assignment files to check for workflow_type field (outer or inner), check for workflow_phase field, infer from file type and status if missing

### Phase Prerequisites
Use `/icc-validate-phase-prereqs [current_phase] [action]` before executing any action to check current workflow phase, validate prerequisites are met, block actions that skip required phases, suggest correct next phase if blocked

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
Use `/icc-phase-transition [assignment_file] [next_phase]` when completing phase requirements to update workflow_phase in assignment file, log phase transition with timestamp, trigger next phase actions if L3 mode, update progress tracking

### Phase Validation Commands
Use `/icc-phase-check [assignment_file]` to check phase with assignment file status, `/icc-validate-phase-prereqs` to validate prerequisites met, `/icc-report-phase-block [action] [reason]` to report blocked actions, `/icc-suggest-phase-correction [current_phase]` for corrective actions

### Integration Points
Use `/icc-phase-check` in commands before execution, `/icc-enforce-phase-sequence` in behaviors, `/icc-auto-phase-transition` in L3 mode, `/icc-track-phase-status` in progress monitor

### Error Handling
Use `/icc-handle-phase-violation [violation_data]` when phase violation detected to block the action, explain which phase is required, show current vs required phase, provide command to transition phase

## Benefits
- Ensures workflow compliance
- Prevents skipped steps
- Maintains process integrity
- Enables progress tracking