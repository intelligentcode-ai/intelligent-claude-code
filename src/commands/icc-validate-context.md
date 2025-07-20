# Validate Context

Validate context and role state using $ARGUMENTS.

## Behavior

Validates context, roles, and system components.

## Arguments

**Format:** "type | scope"
**Example:** "role | current"

## Core Actions

1. Parse type and scope from $ARGUMENTS
2. Validate based on type: role, context, system
3. Report validation results

## Error Handling

- **Invalid type**: "Invalid validation type"
- **Context missing**: "Required context not loaded"