# Learning Store

Store learning entity in memory using $ARGUMENTS.

## Behavior

Stores learnings with error forgiveness logic.

## Arguments

**Format:** "type | content | context"
**Example:** "error | validation-missing | task-creation"

## Core Actions

1. Parse type, content, context from $ARGUMENTS
2. Check for existing similar learning
3. Apply error forgiveness (first=no penalty, repeat=double)
4. Store in memory with relationships

## Error Handling

- **Invalid type**: "Type must be: success|error|pattern|insight"
- **Empty content**: "Content cannot be empty"