# Queue Get Parallel

Get non-conflicting tasks for parallel execution using $ARGUMENTS.

## Arguments
`MaxTasks: 1-5 | SpecialistFilter: @Role1,@Role2 | ConflictCheck: strict|standard | Priority: P0|P1|P2|P3`

## Behavior
- Parse criteria from $ARGUMENTS, default MaxTasks=5
- Load priority queue sorted by numeric priority
- Filter by specialist availability and priority level
- Detect conflicts: file modifications, schema changes, API endpoints
- Select up to MaxTasks non-conflicting tasks
- Mark selected as EXECUTING, return with metadata

## Errors
- Empty queue → "No tasks available"
- All conflicting → "No parallel tasks possible"
- Invalid filter → "Unknown specialist role"
- Resource unavailable → "Required resources in use"