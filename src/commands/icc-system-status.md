# System Status

Display virtual team status using $ARGUMENTS.

## Arguments
`[--brief|--detailed|--full] [--config|--roles|--memory|--tasks|--health] [--json|--yaml|--table]`

## Behavior
- Parse detail level and focus area from $ARGUMENTS
- Show config: autonomy_level, git_privacy, role settings
- Display roles: active role, scores (P/Q), recent activities
- Memory status: entities, learnings, connection health
- Task summary: active, queued, completed counts by priority
- System health: integrations (GitHub, Context7), validation status
- Format output as requested (table default)

## Errors
- Invalid option → "Unknown option"
- System not initialized → "Initialize first"
- Memory unavailable → "Memory system offline"
- Integration failed → "Tool X not available"