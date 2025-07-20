# Plan Bug

Generate task breakdown for bug fixing using $ARGUMENTS as bug ID.

## Arguments
`BUG-XXX`

## Behavior
- Parse bug ID from $ARGUMENTS, validate existence and OPEN status
- Search memory for similar bug patterns and resolutions
- Perform root cause analysis: symptoms, reproducibility, environment
- Detect work type and assign specialists (>70% capability match)
- Generate tasks: Knowledge loading, Investigation, Root cause, Implementation, Testing, Regression prevention, Documentation, Git ops, Knowledge capture
- Apply priority based on severity (CRITICAL→P0, HIGH→P1, etc.)
- Mark blocking/critical path tasks appropriately

## Errors
- Missing ID → "Bug ID required"
- Not found → "Bug not found"
- Wrong status → "Bug must be OPEN"
- Invalid specialist → "Create specialist if <70% match"