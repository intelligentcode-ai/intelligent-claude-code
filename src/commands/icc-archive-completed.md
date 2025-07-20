# Archive Completed

Archive completed work items using $ARGUMENTS.

## Arguments
`[--dry-run] [--force] [--type:epic|story|bug] [--older-than:days] [ITEM-ID]`

## Behavior
- Verify @PM role required for archival operations
- Scan for items with status:COMPLETED and phase:ARCHIVED
- Create archive structure: archives/completed/type/YYYY/MM/ID-title/
- Generate ARCHIVED.md summary with metrics and learnings
- Use git mv for epics/stories/bugs, file ops for tasks
- Cascade archival: epic→stories/bugs→tasks automatically
- Commit with descriptive message, update parent references

## Errors
- Wrong role → "@PM role required"
- Not ready → "Item not completed/archived"
- Incomplete children → "Child items not done"
- Git failed → "Git operation error"