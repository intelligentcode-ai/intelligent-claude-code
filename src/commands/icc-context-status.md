# Context Status

Display project context status using $ARGUMENTS display mode.

## Arguments
`detailed|usage|"section name"` (optional - defaults to summary)

## Behavior
- Check if PROJECT-CONTEXT.md loaded in memory
- Show project name, sections, validation score, last update
- Display mode: summary (default), detailed (full content), usage (application tracking)
- Query memory for ProjectContext entities and usage patterns
- Show health: Fresh (<7d), Aging (7-30d), Stale (>30d)

## Actions
If loaded: Display status with available sections and active usage
If not loaded: Show instructions to run /icc-load-context
If stale: Suggest refresh with validation