# Plan Order

Establish execution order using $ARGUMENTS as item ID.

## Arguments
`STORY-XXX or BUG-XXX`

## Behavior
- Parse item ID from $ARGUMENTS, validate existence and DEFINING phase
- Detect work type and assign specialist architect
- Activate @PM + appropriate @Specialist-Architect
- Collaborative planning: PM analyzes dependencies, Architect analyzes technical complexity
- Calculate priorities and identify critical path
- Determine: blocking tasks, parallel opportunities, task sequences
- Generate execution order with role assignments

## Errors
- Missing ID → "Item ID required"
- Not found → "Item not found"
- Wrong phase → "Only for DEFINING phase"
- Invalid specialist → "Create specialist if <70% match"