# Phase Transition

Transition workflow phase using $ARGUMENTS.

## Arguments
"Item: ITEM-ID | FromPhase: current | ToPhase: target | Force: true|false"

## Behavior
1. Parse item ID and phases from $ARGUMENTS
2. Load assignment file (epic.yaml, story.yaml, bug.yaml, task.md)
3. Validate current phase matches FromPhase
4. Check prerequisites: required fields, dependencies, quality gates
5. Update workflow_phase field with timestamp
6. Trigger next phase actions if applicable

## Phases
- **Outer (epics/stories/bugs):** knowledge_retrieval → epic_definition → story_creation → task_decomposition → git_operations → acceptance_criteria → knowledge_generation
- **Inner (tasks):** knowledge_retrieval → task_planning → task_execution → task_validation → peer_review → git_operations → task_completion → knowledge_generation

## Errors
- Invalid item: "Item not found"
- Phase mismatch: "Current phase does not match FromPhase"
- Prerequisites: "Prerequisites not met for transition"