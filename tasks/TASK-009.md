# [Developer] Merge shared learning patterns

**ID:** TASK-009
**Bug:** BUG-117
**Status:** PLANNED
**Assigned:** @Developer
**Priority:** P1

## Description
Merge overlapping shared patterns. Memory-patterns.md and error-handling patterns have identical learning storage logic that should be consolidated.

## Subtasks
- [ ] Create unified learning-patterns.md from memory + error patterns
- [ ] Remove duplicate learning entity structures
- [ ] Consolidate first/repeat error penalty logic
- [ ] Merge +0.5P/Q bonus detection patterns
- [ ] Update all imports to use new learning-patterns.md

## Pattern Consolidation
- Merge `shared-patterns/memory-patterns.md` learning portions
- Merge `shared-patterns/error-handling-patterns.md` into learning-patterns.md
- Keep unique memory operations in memory-patterns.md
- Result: `shared-patterns/learning-patterns.md` (consolidated)

## Duplicate Elements to Merge
- Learning entity JSON structure (identical in both)
- First error forgiveness logic
- Repeat error penalty (2x)
- Learning bonus detection (+0.5P/Q)
- Storage path patterns

## Acceptance Criteria
- Single learning-patterns.md file
- No duplicate learning logic
- All learning features preserved
- Clean import hierarchy

## Technical Notes
- Both patterns define identical Learning entity structure
- Both have same penalty/bonus system
- Consolidation will reduce significant duplication