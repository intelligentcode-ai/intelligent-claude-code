# TASK-007: [AI-Engineer] Fix role-workflow coordination patterns

## Status: PLANNED
## Priority: P1
## Assigned: @AI-Engineer
## Dependencies: TASK-006

## Description
Fix the coordination between @-notation role assignments and workflow execution. Ensure that when roles like @AI-Engineer are mentioned, the appropriate workflow phases are automatically triggered.

## Subtasks
1. **Update role assignment patterns**: Modify specialists.md to include workflow execution triggers
2. **Fix role name enforcement**: Ensure @AI-Engineer is used for behavioral work (not @Developer)
3. **Connect @-notation with workflows**: Link role mentions to automatic workflow phase execution
4. **Validate role-workflow integration**: Test that role assignments trigger correct workflow phases

## Acceptance Criteria
- [ ] @AI-Engineer automatically used for behavioral/AI work
- [ ] Role assignments trigger appropriate workflow phases
- [ ] Cannot assign wrong roles - system auto-corrects
- [ ] @-notation mentions automatically start workflow execution
- [ ] Role validation integrated with workflow enforcement

## Focus Areas
- Behavioral configuration through markdown patterns
- Role assignment validation through existing behavioral system
- Integration with @-notation patterns already in virtual-team.md

## Inner Workflow Phases
- [ ] Knowledge Retrieval: Review current role assignment and @-notation patterns
- [ ] Task Planning: Design role-workflow coordination approach
- [ ] Task Execution: Update role patterns to include workflow triggers
- [ ] Peer Review: @AI-Architect validates role-workflow coordination
- [ ] Git Operations: Commit role pattern updates
- [ ] Task Completion: Mark task complete
- [ ] Knowledge Generation: Document role-workflow coordination patterns