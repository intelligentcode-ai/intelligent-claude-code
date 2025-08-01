# Behavioral Pattern Examples for Parameter Interpretation

## Overview
This document demonstrates how Claude Code interprets different parameter documentation patterns in markdown behavioral files.

## Pattern 1: Ambiguous Positional Parameters

### Poor Pattern
```markdown
## Usage
```bash
icc-command arg1 arg2 [arg3]
```
```

### AI Interpretation Issues
- Cannot determine parameter types
- Unsure which arguments are optional
- May pass wrong number of arguments
- Quote handling becomes problematic

### Example Misinterpretation
User: "Create a story called User Auth"
AI might generate: `icc-create-story User Auth` (missing quotes)

## Pattern 2: Mixed Styles Without Types

### Poor Pattern
```markdown
## Usage
```bash
icc-command <item-id> --flag [value] [--optional]
```

Parameters mentioned in text but not structured.
```

### AI Interpretation Issues
- Confused about <brackets> vs [brackets]
- Cannot infer if --flag requires a value
- No type information for validation

## Pattern 3: Well-Structured Parameters

### Good Pattern
```markdown
## Usage
```bash
icc-create-story "title" --epic EPIC-XXX [--priority P0|P1|P2|P3]
```

## Parameters
- `title` (string, required): Story title
  - Example: "Implement user authentication"
  
- `--epic` (string, required): Parent epic ID
  - Format: EPIC-XXX
  - Example: --epic EPIC-001
  
- `--priority` (enum, optional): Priority level
  - Values: P0|P1|P2|P3
  - Default: P2
  - Example: --priority P1
```

### AI Interpretation Success
- Knows title needs quotes
- Understands --epic is required with specific format
- Recognizes P0-P3 as valid enum values
- Applies P2 default when priority omitted

## Pattern 4: Boolean Flags

### Poor Pattern
```markdown
--dry-run [true|false]  # Ambiguous
```

### Good Pattern
```markdown
- `--dry-run` (boolean, optional): Preview mode
  - Usage: Include flag to enable, omit to disable
  - Example: icc-archive --dry-run
```

### AI Behavior
- Good pattern: AI includes flag without value
- Poor pattern: AI might add "--dry-run true"

## Pattern 5: Complex Parameters

### Poor Pattern
```markdown
icc-add-task STORY "title" @Role --deps task1,task2
```

### Good Pattern
```markdown
## Parameters
- `story-id` (string, required): Story identifier
  - Format: STORY-XXX or BUG-XXX
  - Example: STORY-001

- `title` (string, required): Task description
  - Example: "Implement error handling"

- `--assigned-to` (string, required): Role assignment
  - Format: @RoleName
  - Example: --assigned-to @Developer

- `--deps` (string, optional): Dependencies
  - Format: Comma-separated task IDs
  - Example: --deps TASK-001,TASK-002
```

## Behavioral Test Cases

### Test 1: Type Inference
```markdown
# Without explicit types
--count value  # AI unsure: string? number?

# With explicit types  
- `--count` (number, required): Item count
  - Example: --count 5
```
Result: AI correctly passes numeric value

### Test 2: Required vs Optional
```markdown
# Ambiguous
icc-command [--epic EPIC-XXX]

# Clear
- `--epic` (string, optional): Parent epic
  - Default: Current epic context
```
Result: AI knows when to include/omit parameter

### Test 3: Enum Constraints
```markdown
# Unconstrained
--type <type>

# Constrained
- `--type` (enum, required): Task type
  - Values: implementation|testing|documentation|review
```
Result: AI validates against allowed values

## Recommended Behavioral Patterns

### 1. Parameter Discovery Pattern
When AI encounters a command:
1. First check ## Parameters section
2. Extract type, requirement, constraints
3. Validate user input against constraints
4. Apply defaults for omitted optional parameters

### 2. Error Prevention Pattern
```markdown
## Parameters
- `--priority` (enum, optional): Priority level
  - Values: P0|P1|P2|P3
  - Default: P2
  - Error: "Invalid priority. Use P0, P1, P2, or P3"
```

### 3. Example-Driven Understanding
Always provide examples showing:
- Minimal required usage
- Full parameter usage
- Boolean flag usage
- Error cases

## Summary

The key to reliable parameter interpretation is:
1. **Explicit type declarations** in Parameters section
2. **Clear required/optional marking**
3. **Comprehensive examples** showing usage
4. **Consistent patterns** across all commands

This structured approach eliminates ambiguity and ensures Claude Code correctly interprets and executes commands in the behavioral system.