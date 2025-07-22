# TASK-012: [AI-Engineer] Fix nonsensical 3-subtask mandate

## Status: COMPLETED
## Priority: P1_critical_fix
## SME_Reviewer: @AI-Architect
## Dependencies: TASK-011

## Description
Fix the ridiculous mandate that EVERY task must have 3+ subtasks, which forces artificial task breakdown and creates bloat.

## Subtasks
1. **Update task-creation-mandates.md**:
   - Remove rigid "minimum 3 subtasks" rule
   - Replace with: "Subtasks when task complexity warrants breakdown"
   - Add guidance: Simple tasks can be single-action
   - Complex tasks should have logical breakdown (not artificial)

2. **Define sensible subtask guidelines**:
   - Simple tasks (delete file, update version): No subtasks required
   - Medium tasks (implement feature): 2-4 logical subtasks
   - Complex tasks (system redesign): Multiple subtasks as needed
   - Focus on LOGICAL breakdown, not arbitrary numbers

3. **Update enforcement patterns**:
   - Remove auto-correction that forces 3 subtasks
   - Add validation for logical task structure
   - Ensure tasks have appropriate complexity breakdown

## Inner Workflow Phases
- [x] Memory Search: Find all references to 3-subtask mandate
- [x] Generate Workflow Steps: Plan sensible replacement
- [x] Execute Work: Update mandate and enforcement
- [x] SME Peer Review: @AI-Architect validates logic
- [x] Version Bump: Update VERSION file
- [x] Git Operations: Commit with git_privacy=true
- [x] Task Completion: Mark COMPLETED
- [x] Learning Capture: Document sensible task structure

## Implementation Summary
Successfully replaced the rigid "minimum 3 subtasks" mandate with complexity-based guidelines:
- Simple tasks (0-1 subtasks): Single-file edits, config updates, documentation fixes
- Standard tasks (2-3 subtasks): Feature implementations, bug fixes, refactoring
- Complex tasks (4+ subtasks): System-wide changes, new modules, security implementations

Updated files:
- `src/behaviors/task-creation-mandates.md`: Replaced rigid rule with complexity-based approach
- `src/workflow-templates/executable-workflow.md`: Updated task creation reference
- `src/modes/virtual-team.md`: Updated task mandates description
- `VERSION`: Bumped from 5.5.8 to 5.5.9