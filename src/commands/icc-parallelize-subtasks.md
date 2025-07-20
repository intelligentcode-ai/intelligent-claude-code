# Parallelize Subtasks

Analyze subtasks for parallel execution using $ARGUMENTS.

## Arguments
`Task description with subtasks | Mode: aggressive|conservative`

## Behavior
- Parse task breakdown from $ARGUMENTS
- Analyze dependencies: prerequisites, file conflicts, API/schema deps
- Categorize: sequential, blocking, critical_path, parallel
- Build execution groups with up to 5 parallel subtasks
- Consider resource conflicts and capability requirements
- Generate optimized execution plan with time estimates

## Errors
- No subtasks → "Provide subtask breakdown"
- All sequential → "No parallelization possible"
- Resource conflict → "Cannot parallelize conflicting tasks"
- Too complex → "Reduce scope for analysis"