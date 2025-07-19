# TASK-005: [AI-Engineer] Remove Examples from Commands

## Overview
**Task ID:** TASK-005
**Title:** [AI-Engineer] Remove Examples from Commands
**Status:** PLANNED
**Assigned To:** @AI-Engineer
**Priority:** P0 (critical_path)
**Type:** cleanup

## Description
Remove ALL example sections from command files. Commands are behavioral instructions for AI agents who don't need examples to understand $ARGUMENTS.

## Subtasks
1. **Strip example sections from all commands**
   - Remove ## Examples sections
   - Remove example usage lines
   - Keep only behavioral instructions

2. **Ensure commands are lean**
   - Brief description
   - Core behavioral actions
   - Nothing else needed

3. **Move examples to documentation**
   - Create docs/COMMAND-EXAMPLES.md if needed
   - Examples belong in human documentation

## Acceptance Criteria
- [ ] All example sections removed
- [ ] Commands contain only behavioral instructions
- [ ] Lean, focused command files

## Dependencies
- Understanding that examples are for humans, not AI

## Parallel Execution
- Can process all commands in parallel

## Output
- Clean command files without examples
- Pure behavioral instructions for AI