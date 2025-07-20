# Plan Story

Generate task breakdown for story using $ARGUMENTS.

## Arguments
`STORY-XXX`

## Behavior
- Parse story ID from $ARGUMENTS, validate existence and PLANNED status
- Check workflow_phase allows planning (story_creation or later)
- Execute knowledge_retrieval: search memory for similar patterns
- Detect work type and complexity via icc-detect-work-type
- Generate tasks: standard flow (knowledge, implementation, testing, review, docs, git)
- Apply mandatory task rules: role in title, min 3 subtasks, parallelization
- Validate all assignments >70% capability match with architect approval

## Errors
- Missing ID → "Story ID required"
- Not found → "Story not found"
- Wrong phase → "Complete story_creation first"
- Invalid specialist → "Create specialist if <70% match"