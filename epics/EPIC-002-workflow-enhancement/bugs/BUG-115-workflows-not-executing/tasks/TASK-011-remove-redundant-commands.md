# TASK-011: [System-Engineer] Remove redundant commands

## Status: PLANNED
## Priority: P1_cleanup
## SME_Reviewer: @AI-Architect
## Dependencies: TASK-010

## Description
Remove commands made redundant by workflow automation and validate remaining commands function correctly.

## Subtasks
1. **Remove definitely redundant commands**:
   - Delete icc-validate-assignments.md (workflow handles in Architect Triage)
   - Delete icc-require-triage.md (workflow mandates automatically)
   - Delete icc-detect-work-type.md (workflow-auto-trigger.md handles)
   - Delete icc-enforce-validation.md (workflow-enforcement.md does continuously)

2. **Review and decide on potentially redundant**:
   - Check icc-create-specialist.md (keep for manual creation?)
   - Check icc-finalize-item.md (workflow completion sufficient?)
   - Check icc-validate-context.md (state tracker covers?)
   - Check icc-apply-config.md (config-loader sufficient?)

3. **Validate remaining commands**:
   - Test each remaining command still works
   - Ensure no broken references to removed commands
   - Update any documentation referencing removed commands

4. **Update command references**:
   - Remove references to deleted commands from behaviors
   - Update COMMAND-REFERENCE.md
   - Fix any workflow references

## Inner Workflow Phases
- [ ] Memory Search: Find all references to redundant commands
- [ ] Generate Workflow Steps: Plan removal and validation
- [ ] Execute Work: Remove commands and update references
- [ ] SME Peer Review: @AI-Architect validates removals
- [ ] Version Bump: Update VERSION file
- [ ] Git Operations: Commit with git_privacy=true
- [ ] Task Completion: Mark COMPLETED
- [ ] Learning Capture: Document command consolidation