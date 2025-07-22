# TASK-010: [AI-Engineer] Optimize remaining behavioral files

## Status: PLANNED
## Priority: P2_optimization
## SME_Reviewer: @AI-Architect
## Dependencies: TASK-009

## Description
Optimize the remaining behavioral files for conciseness and proper references.

## Subtasks
1. **Optimize workflow-state-tracker.md**
   - Condense three verbose examples to one-line descriptions
   - Remove repetitive state format examples
   - Add /icc-restore-state command reference

2. **Add workflow references to role-management.md**
   - Add "Integration with Executable Workflow" section
   - Reference that @Role triggers Task tool per workflow
   - Link to executable-workflow.md

3. **Fix other missing references**
   - task-creation-mandates.md: Add workflow phase references
   - learning-team-automation.md: Reference workflow retrospective phases
   - config-loader.md: Link to workflow config loading

4. **General cleanup**
   - Remove any pseudo-code comments
   - Consolidate repetitive examples
   - Ensure all files reference executable-workflow.md where relevant

## Inner Workflow Phases
- [ ] Memory Search: Review all behavioral files
- [ ] Generate Workflow Steps: Plan optimization approach
- [ ] Execute Work: Optimize files maintaining functionality
- [ ] SME Peer Review: @AI-Architect validates no loss
- [ ] Version Bump: Update VERSION file
- [ ] Git Operations: Commit with git_privacy=true
- [ ] Task Completion: Mark COMPLETED
- [ ] Learning Capture: Document optimization patterns