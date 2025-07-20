# Apply Config

Apply configuration to systems using $ARGUMENTS.

## Behavior

Applies loaded configuration to active systems.

## Arguments

**Format:** "scope | mode"
**Example:** "all | immediate"

## Core Actions

1. Parse scope and mode from $ARGUMENTS
2. Apply settings: behavioral, git, team, autonomy
3. Update active systems
4. Report applied changes

## Error Handling

- **Invalid scope**: "Invalid configuration scope"
- **Apply failed**: "Configuration application failed"