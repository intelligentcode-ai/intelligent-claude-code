# Command Parameter Documentation Template

## Overview
This template defines the OPTIMAL format for documenting slash command parameters in behavioral markdown files to ensure Claude Code correctly interprets them.

## Template Structure

```markdown
# Command Name

Brief description of what the command does.

## Usage
```bash
# Show the actual command syntax with clear indicators
icc-command-name <required-positional> [optional-positional] --required-flag VALUE [--optional-flag VALUE]
```

## Parameters
<!-- CRITICAL: This section ensures AI understands each parameter -->
- `required-positional` (string, required): Description of the parameter
  - Constraints: Any specific constraints
  - Example: "value1", "value2"
  
- `optional-positional` (string, optional): Description
  - Default: "default-value"
  - Example: "example-value"
  
- `--required-flag` (type, required): Description
  - Type: string|enum|boolean|number
  - Constraints: For enums, list all values (value1|value2|value3)
  - Example: --required-flag VALUE
  
- `--optional-flag` (type, optional): Description  
  - Type: string|enum|boolean|number
  - Default: default-value
  - Constraints: Any constraints
  - Example: --optional-flag VALUE

## Examples
<!-- CRITICAL: Examples help AI infer correct usage -->
```bash
# Basic usage
icc-command-name "required value"

# With all parameters
icc-command-name "required" "optional" --required-flag value1 --optional-flag value2

# Boolean flag usage (no value)
icc-command-name "required" --dry-run --verbose
```

## Behavior
Detailed description of what the command does, including:
- Validation steps
- Core actions performed
- Error conditions
- Success criteria

## Output
```
Show example output format
Including success/error cases
```
```

## Key Principles

### 1. Explicit Type Declaration
ALWAYS declare parameter types explicitly:
- `(string, required)` - Text input
- `(enum, optional)` - Limited set of values  
- `(boolean, optional)` - Flag with no value
- `(number, required)` - Numeric input

### 2. Clear Requirements
- Mark as `required` or `optional` explicitly
- Never rely on brackets alone for optional indication
- State defaults for ALL optional parameters

### 3. Constraint Documentation
- For enums: List ALL valid values as `value1|value2|value3`
- For strings: Specify format constraints (e.g., "EPIC-XXX format")
- For numbers: Specify ranges if applicable

### 4. Boolean Flag Pattern
```markdown
- `--dry-run` (boolean, optional): Preview without executing
  - Usage: Just include flag, no value needed
  - Example: icc-command --dry-run
```

### 5. Positional vs Flag Guidelines
- Use positional for PRIMARY required parameters (1-2 max)
- Use flags for ALL other parameters
- Flags provide better clarity for AI interpretation

## Example: Well-Documented Command

```markdown
# Create Story

Create a new story within an epic.

## Usage
```bash
icc-create-story "Story title" --epic EPIC-XXX [--priority P0|P1|P2|P3] [--chain]
```

## Parameters
- `title` (string, required): Story title or description
  - Constraints: Non-empty string, max 100 characters
  - Example: "Implement user authentication"

- `--epic` (string, required): Parent epic identifier
  - Constraints: Must match EPIC-XXX format
  - Example: --epic EPIC-001

- `--priority` (enum, optional): Story priority level
  - Values: P0|P1|P2|P3
  - Default: P2
  - Example: --priority P1

- `--chain` (boolean, optional): Enable command chaining
  - Usage: Include flag to enable chaining
  - Example: --chain

## Examples
```bash
# Minimal usage
icc-create-story "Add login feature" --epic EPIC-001

# With priority
icc-create-story "Add login feature" --epic EPIC-001 --priority P1

# With chaining
icc-create-story "Add login feature" --epic EPIC-001 --chain
```
```

## Common Pitfalls to Avoid

1. **DON'T use ambiguous brackets**
   ```bash
   # BAD - AI unsure if brackets mean optional
   icc-command [--flag value]
   
   # GOOD - Explicit in parameters section
   - `--flag` (string, optional): Description
   ```

2. **DON'T mix positional and flag styles for similar parameters**
   ```bash
   # BAD - Inconsistent
   icc-command item-id --title "Title"
   
   # GOOD - Consistent approach
   icc-command ITEM-XXX --title "Title"
   ```

3. **DON'T forget type information**
   ```markdown
   # BAD
   - `--priority`: Priority level
   
   # GOOD  
   - `--priority` (enum, optional): Priority level
     - Values: P0|P1|P2|P3
     - Default: P2
   ```

## Migration Checklist

When updating existing commands:
1. ✓ Add explicit `## Parameters` section
2. ✓ Include (type, required|optional) for EVERY parameter
3. ✓ Document constraints and defaults
4. ✓ Provide clear usage examples
5. ✓ Show boolean flag usage without values
6. ✓ Ensure enum values are listed