# Validate Role-in-Title

Validate task title follows "[Role] Description" pattern using $ARGUMENTS.

## Arguments
Task title text or assignment content

## Behavior
- Parse title from $ARGUMENTS
- Check for "[Role] Description" format with square brackets
- Validate role is specialist (core or Technology-BaseRole)
- Auto-correct: detect work type, suggest appropriate role
- L3 mode: apply corrections automatically
- Store violations as learning entries

## Errors
- Missing role → "Add [Role] prefix"
- Invalid role → "Use valid specialist"
- Wrong brackets → "Use square brackets"
- Generic role → "Specify exact specialist"