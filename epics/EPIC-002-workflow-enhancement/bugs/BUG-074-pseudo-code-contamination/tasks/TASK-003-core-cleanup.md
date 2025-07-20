# TASK-003: [AI-Engineer] Clean Core Behavioral Files

## Overview
**Task ID:** TASK-003
**Title:** [AI-Engineer] Clean Core Behavioral Files
**Status:** COMPLETED
**Assigned To:** @AI-Engineer
**Priority:** P0 (critical_path)
**Type:** implementation

## Description
Remove pseudo-code from core behavioral files and replace with clean behavioral descriptions that reference commands.

## Subtasks
1. **Clean lean-workflow-executor.md**
   - Remove all FUNCTION declarations
   - Replace pseudo-code with behavioral text
   - Reference commands instead of functions
   - Keep descriptions SHORT and PRECISE

2. **Clean config-loader.md**
   - Remove CLASS and method syntax
   - Describe configuration loading behavior
   - Reference settings retrieval commands
   - Maintain clarity without code

3. **Clean role-assignment-validator.md**
   - Remove validation pseudo-functions
   - Describe validation behavior clearly
   - Reference validation commands
   - Keep logic as behavioral rules

## Acceptance Criteria
- [ ] No pseudo-code remains in core files
- [ ] Behaviors describe WHAT happens, not HOW
- [ ] Commands referenced for actions
- [ ] Text is SHORT and PRECISE

## Dependencies
- TASK-002 (need contamination analysis)

## Parallel Execution
- Each file can be cleaned independently

## Output
- Clean behavioral files
- No programming constructs
- Clear behavioral descriptions