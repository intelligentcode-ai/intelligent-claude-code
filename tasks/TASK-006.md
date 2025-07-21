# [AI-Engineer] Consolidate workflow execution behaviors

**ID:** TASK-006
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @AI-Engineer
**Priority:** P1

## Description
Consolidate overlapping workflow execution behaviors. Many behaviors duplicate what's already in executable-workflow.md.

## Subtasks
- [ ] Delete workflow-executor-simple.md (redundant with executable-workflow.md)
- [ ] Delete workflow-enforcement-patterns.md (patterns in executable-workflow.md)
- [ ] Delete workflow-integration-strategy.md (strategy in executable-workflow.md)
- [ ] Delete workflow-auto-correction-design.md (design implemented in patterns)
- [ ] Keep lean-workflow-executor.md as orchestrator of executable-workflow.md
- [ ] Update workflow-coordination.md to reference executable-workflow.md

## Behaviors to Remove
- `src/behaviors/workflow-executor-simple.md`
- `src/behaviors/workflow-enforcement-patterns.md`
- `src/behaviors/workflow-integration-strategy.md`
- `src/behaviors/workflow-auto-correction-design.md`

## Keep These
- `src/behaviors/lean-workflow-executor.md` (orchestrates executable-workflow.md)
- `src/behaviors/workflow-coordination.md` (queue management)

## Acceptance Criteria
- Redundant workflow behaviors removed
- Lean-workflow-executor properly references executable-workflow.md
- Workflow execution continues to function
- No broken workflow patterns

## Technical Notes
- executable-workflow.md is the single source of workflow truth
- lean-workflow-executor.md orchestrates but doesn't duplicate
- workflow-coordination.md handles queue/priority logic