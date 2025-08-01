# TASK-003B: [AI-Engineer] Update Commands to Use $ARGUMENTS Pattern

## Overview
**Task ID:** TASK-003B
**Title:** [AI-Engineer] Update Commands to Use $ARGUMENTS Pattern
**Status:** PLANNED
**Assigned To:** @AI-Engineer
**Priority:** P0 (critical_path)
**Type:** implementation

## Description
Update all command markdown files to use Claude Code's actual $ARGUMENTS substitution pattern instead of parameter parsing.

## Subtasks
1. **Update critical P0 commands to $ARGUMENTS**
   - Replace parameter sections with argument descriptions
   - Use $ARGUMENTS variable in behavioral text
   - Document expected argument format

2. **Convert all commands to argument pattern**
   - Remove complex parameter parsing documentation
   - Add clear argument format examples
   - Ensure $ARGUMENTS is used correctly

3. **Standardize argument documentation**
   - Create consistent format for documenting arguments
   - Show examples of argument parsing patterns
   - Maintain behavioral clarity

## Acceptance Criteria
- [ ] All commands use $ARGUMENTS pattern
- [ ] Parameter sections replaced with argument format
- [ ] Clear examples for each command
- [ ] AI can understand argument expectations

## Dependencies
- CRITICAL-FINDING.md (new understanding)

## Parallel Execution
- Commands can be updated in parallel once pattern established

## Output
- All command files using $ARGUMENTS
- Consistent argument documentation
- Clear behavioral patterns for argument parsing