# Cleanup Files

Clean up workspace files using $ARGUMENTS.

## Behavior

Cleans workspace with safety checks.

## Arguments

**Format:** "type | pattern | confirm"
**Example:** "temp | *.tmp | yes"

## Core Actions

1. Parse type, pattern, confirm from $ARGUMENTS
2. Apply safety checks (no active work deletion)
3. Execute cleanup: temp, completed, archived, orphaned
4. Report results

## Error Handling

- **No confirmation**: "Cleanup requires confirmation"
- **Active files**: "Cannot cleanup active files"