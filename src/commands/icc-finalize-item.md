# Finalize Item

Complete work items for archival using $ARGUMENTS.

## Arguments
`EPIC-XXX|STORY-XXX|BUG-XXX [--force]`

## Behavior
- Verify @PM role required for finalization
- Parse item ID from $ARGUMENTS, validate existence
- Check completion: all children done, PRB objectives met
- Update status to COMPLETED, phase to ARCHIVED
- Generate summary: metrics, learnings, duration
- Trigger archival readiness notification
- Apply --force to override incomplete checks

## Errors
- Wrong role → "@PM role required"
- Missing ID → "Item ID required"
- Not found → "Item not found"
- Incomplete → "Children or phases incomplete"