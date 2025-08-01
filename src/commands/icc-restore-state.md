# Restore State

Restore system state after context loss using $ARGUMENTS.

## Arguments
`[--full|--roles|--tasks|--memory] [--force] [--timestamp:YYYY-MM-DD-HH:MM]`

## Behavior
- Parse restoration scope from $ARGUMENTS
- Load preserved state from memory/files
- Restore: role states/scores, task queue/progress, memory connections, ID sequences
- Validate integrity and resolve conflicts
- Test integrations (GitHub CLI, Context7)
- Display restoration summary with active counts

## Errors
- Memory missing → Initialize new system
- State conflict → Resolve by timestamp
- Corrupted data → Revert to defaults
- Access denied → Report specific error