# Phase Transition

Transition workflow phase for assignment items using $ARGUMENTS.

## Behavior
Manage workflow phase transitions for epics, stories, bugs, and tasks
according to outer and inner workflow templates. Validates phase
prerequisites and updates assignment files with new phase status.

## Arguments
**Format:** "Item: ITEM-ID | FromPhase: current_phase | ToPhase: target_phase | Force: true|false"
**Example:** "Item: STORY-005 | FromPhase: story_creation | ToPhase: task_decomposition | Force: false"

## Core Actions
- Parse item ID and phase details from $ARGUMENTS
- Load assignment file (epic.yaml, story.yaml, bug.yaml, task.md)
- Validate current phase matches FromPhase
- Check phase transition prerequisites:
  - Required fields completed
  - Dependencies satisfied
  - Quality gates passed
- Update workflow_phase field in assignment file
- Record phase transition timestamp
- Trigger next phase actions if applicable
- Log phase transition for audit trail

## Workflow Templates

### Outer Workflow (Epics/Stories/Bugs)
**Phase Sequence:**
1. **knowledge_retrieval** → Load context and patterns
2. **epic_definition** → Define scope and objectives (epics only)
3. **story_creation** → Break into stories/bugs
4. **task_decomposition** → Create tasks with validation
5. **git_operations** → Branch management
6. **acceptance_criteria** → Define completion criteria
7. **knowledge_generation** → Capture planning insights

### Inner Workflow (Tasks)
**Phase Sequence:**
1. **knowledge_retrieval** → Load task-specific context
2. **task_planning** → Plan approach and subtasks
3. **task_execution** → Perform assigned work
4. **task_validation** → Validate completion
5. **peer_review** → Domain expert review
6. **git_operations** → Commit and push
7. **task_completion** → Final verification
8. **knowledge_generation** → Capture learnings

## Phase Prerequisites

### Outer Workflow Prerequisites
- **story_creation** → epic_definition complete
- **task_decomposition** → stories/bugs defined, validation chain complete
- **git_operations** → tasks created and assigned
- **acceptance_criteria** → git branches ready
- **knowledge_generation** → acceptance criteria defined

### Inner Workflow Prerequisites
- **task_planning** → knowledge_retrieval complete
- **task_execution** → task_planning complete
- **task_validation** → task_execution complete
- **peer_review** → task_validation passed
- **git_operations** → peer_review approved (if required)
- **task_completion** → git_operations complete
- **knowledge_generation** → task_completion verified

## Validation Checks

### Prerequisites Validation
- Check required fields are populated
- Verify dependencies are satisfied
- Ensure quality gates are passed
- Validate role assignments (for task phases)

### Business Rules
- Cannot skip phases without Force=true
- Cannot transition backwards without justification
- Cannot proceed with blocking issues
- Must complete validation chain for task_decomposition

## Phase Actions

### Automatic Triggers
- **task_decomposition** → Trigger PM delegation
- **task_execution** → Activate assigned specialist
- **peer_review** → Assign domain expert reviewer
- **knowledge_generation** → Store learning entities

### L3 Autonomous Behavior
- Automatic phase progression when prerequisites met
- Non-blocking transitions for routine phases
- Smart stop only for critical business decisions

## Assignment File Updates

### Standard Updates
```yaml
workflow_phase: new_phase
phase_transitions:
  - from: old_phase
    to: new_phase
    timestamp: 2025-01-15T10:30:00Z
    triggered_by: @Role
last_updated: 2025-01-15T10:30:00Z
```

### Phase-Specific Updates
- **task_decomposition** → Add tasks array
- **git_operations** → Add branch information
- **knowledge_generation** → Add learning references

## Error Handling
- **Invalid Phase**: Current phase doesn't match FromPhase
- **Prerequisites Failed**: Required conditions not met
- **Missing File**: Assignment file not found
- **Permission Denied**: Insufficient role permissions
- **Force Required**: Phase skip requires Force=true

## Integration
- Used by workflow templates for automatic progression
- Triggered by phase completion events
- Integrates with L3 continuous engine
- Supports manual phase management
- Connected to progress monitoring systems

## Quality Standards
- No phase skipping without explicit approval
- Complete audit trail of all transitions
- Clear error messages for failed transitions
- Automatic rollback on transition failures
- Integration with learning system for pattern capture