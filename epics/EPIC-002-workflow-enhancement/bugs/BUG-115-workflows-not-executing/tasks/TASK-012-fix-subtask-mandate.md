# TASK-012: [AI-Engineer] Fix nonsensical 3-subtask mandate

## Status: PLANNED
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
- [ ] Memory Search: Find all references to 3-subtask mandate
- [ ] Generate Workflow Steps: Plan sensible replacement
- [ ] Execute Work: Update mandate and enforcement
- [ ] SME Peer Review: @AI-Architect validates logic
- [ ] Version Bump: Update VERSION file
- [ ] Git Operations: Commit with git_privacy=true
- [ ] Task Completion: Mark COMPLETED
- [ ] Learning Capture: Document sensible task structure