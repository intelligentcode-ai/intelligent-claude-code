# TASK-002: [AI-Engineer] Research Claude Code Command Parameter Interpretation

## Overview
**Task ID:** TASK-002
**Title:** [AI-Engineer] Research Claude Code Command Parameter Interpretation
**Status:** COMPLETED
**Assigned To:** @AI-Engineer
**Priority:** P0 (critical_path)
**Type:** research

## Description
Research how Claude Code actually interprets slash command parameters in markdown behavioral files. This is about AI interpretation patterns, not programming.

## Subtasks
1. **Analyze parameter documentation patterns**
   - Study how parameters should be documented in markdown
   - Research Claude Code's parameter interpretation
   - Identify working patterns vs broken patterns

2. **Experiment with parameter formats**
   - Document different parameter styles (flags, args, etc.)
   - Create behavioral examples for each style
   - Note which patterns Claude Code recognizes

3. **Extract best practices**
   - Determine optimal parameter documentation format
   - Create template for behavioral parameter patterns
   - Document AI interpretation guidelines

## Acceptance Criteria
- [x] Correct parameter documentation format identified
- [x] Behavioral patterns documented
- [x] Template created for all commands

## Dependencies
- TASK-001 (need context loaded)

## Parallel Execution
- Subtasks 1 and 3 can parallelize
- Subtask 2 sequential after findings

## Output
- Parameter documentation format guide
- Behavioral pattern examples
- Command parameter template

## Research Findings

### Parameter Documentation Analysis

#### Current Parameter Styles Observed:
1. **Positional Arguments**
   - `icc-activate-role @Role-Name`
   - `icc-memory-search "search query"`
   - Problems: AI can misinterpret position, especially with quotes

2. **Flag-based Arguments**
   - `--epic EPIC-XXX`
   - `--type <type>`
   - `--priority P2`
   - Problems: Inconsistent requirement marking, type inference issues

3. **Mixed Approaches**
   - Some commands use both positional and flags
   - Creates confusion about which parameters are required

#### Key Issues Identified:
1. **Type Ambiguity**: No explicit type declaration (string, enum, boolean)
2. **Required vs Optional**: Inconsistent marking (sometimes [brackets], sometimes text)
3. **Default Values**: Not clearly specified in parameter lists
4. **Value Constraints**: Enums not clearly listed in parameter section

### Experiment Results

#### Format Testing:
1. **Explicit Type Declaration**
   ```
   --priority: P0|P1|P2|P3 (default: P2)
   ```
   Result: AI recognizes enum constraints better

2. **Required/Optional Clarity**
   ```
   Parameters:
   - `title` (string, required): Story title
   - `--epic` (string, required): Parent epic ID
   - `--priority` (enum, optional): P0|P1|P2|P3, default: P2
   ```
   Result: AI correctly identifies requirements

3. **Boolean Flags**
   ```
   - `--dry-run` (boolean, optional): Preview mode
   ```
   Result: AI understands no value needed

### Best Practices Extracted

1. **Standardized Parameter Section**
   - Always include explicit "## Parameters" section
   - List each parameter with type, requirement, description
   - Include constraints and defaults inline

2. **Type Declaration Pattern**
   ```markdown
   - `param-name` (type, required|optional): Description
     - Constraints: value1|value2|value3
     - Default: value
   ```

3. **Usage Examples**
   - Show most common use cases first
   - Include examples with all parameter variations
   - Demonstrate boolean flag usage clearly

### Optimal Parameter Format Template

```markdown
## Parameters
- `param-name` (type, required|optional): Brief description
  - Type: string|enum|boolean|number
  - Constraints: Specific validation rules or enum values
  - Default: default-value (for optional only)
  - Example: usage example
```

### Key Findings Summary

1. **Explicit Types Required**: AI cannot reliably infer types from context
2. **Structured Parameters Section**: Critical for reliable interpretation
3. **Boolean Flag Clarity**: Must specify "Include flag to enable"
4. **Enum Value Lists**: Must be inline as value1|value2|value3
5. **Example-Driven**: AI heavily relies on examples for usage patterns

### Deliverables Created

1. **PARAMETER-TEMPLATE.md**: Complete template for command documentation
2. **BEHAVIORAL-PATTERNS.md**: Examples showing AI interpretation issues
3. **PARAMETER-FORMAT-GUIDE.md**: Comprehensive format guide with rationale
4. **Memory Entities**: Learning and Pattern stored for future reference