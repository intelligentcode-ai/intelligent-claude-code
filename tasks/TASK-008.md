# [AI-Engineer] Consolidate L3 autonomous behaviors

**ID:** TASK-008
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @AI-Engineer
**Priority:** P1

## Description
Consolidate L3 autonomous execution behaviors. Multiple behaviors handle different aspects of L3 mode that should be unified.

## Subtasks
- [ ] Merge auto-continue logic into l3-continuous-engine.md
- [ ] Consolidate progress monitoring into l3-continuous-engine.md
- [ ] Ensure L3 stop conditions are preserved (business/security/data loss)
- [ ] Maintain continuous execution without interruptions
- [ ] Update shared-patterns/l3-autonomy-patterns.md references

## Behaviors to Merge
- Keep `src/behaviors/l3-continuous-engine.md` as primary
- Keep `src/behaviors/autonomy-controller.md` (L1/L2/L3 control)
- Merge auto-continue and progress features into l3-continuous-engine.md

## Key L3 Features
- Continuous execution without stops
- Auto-correction of violations
- Smart stop conditions only
- Parallel task execution
- Work discovery engine

## Acceptance Criteria
- Single L3 execution engine
- L1/L2/L3 modes continue to work
- Auto-continue functions properly
- Stop conditions respected

## Technical Notes
- L3 only stops for: business logic, security, data loss
- Autonomy-controller.md handles mode detection
- L3-continuous-engine.md handles execution