# Scan Work

Scan for available work items using $ARGUMENTS.

## Arguments
`Scope: epics|stories|bugs|tasks|all | Status: PLANNED|IN_PROGRESS|all | Phase: phase_name | Ready: true|false`

## Behavior
- Parse scan criteria from $ARGUMENTS
- Scan directories: epics/**/[type]/*.yaml|*.md
- Filter by status, phase, readiness
- Check dependencies and blockers
- Validate role assignments >70% match
- Return categorized work items with counts
- Identify execution opportunities

## Errors
- Invalid scope → "Unknown work type"
- No matches → "No items match criteria"
- Parse error → "Cannot read item files"
- Invalid phase → "Unknown workflow phase"