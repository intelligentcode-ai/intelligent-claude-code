# [Developer] Merge validation and enforcement patterns

**ID:** TASK-010
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @Developer
**Priority:** P1

## Description
Merge validation-patterns.md and enforcement-patterns.md which have identical auto-correction logic and overlapping validation rules.

## Subtasks
- [ ] Create unified validation-enforcement-patterns.md
- [ ] Merge auto-correction logic (identical in both)
- [ ] Consolidate >70% capability matching rules
- [ ] Combine validation chain patterns
- [ ] Update all imports to use merged pattern file

## Pattern Consolidation
- Merge `shared-patterns/validation-patterns.md`
- Merge `shared-patterns/enforcement-patterns.md`
- Result: `shared-patterns/validation-enforcement-patterns.md`

## Duplicate Elements
- Auto-correction detection and execution
- Capability matching threshold (>70%)
- Validation chain commands
- Enforcement headers format
- Penalty system logic

## Acceptance Criteria
- Single validation-enforcement-patterns.md
- All validation logic preserved
- Auto-correction continues to work
- No broken enforcement rules

## Technical Notes
- Both patterns implement same auto-correction flow
- Both define identical capability matching
- Significant overlap in command structures