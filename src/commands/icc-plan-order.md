# Order Planning Command

**BEHAVIORAL INSTRUCTION**: Establish execution order through joint PM + Specialist-Architect collaboration.

## Parameters
- `item_id`: Work item identifier (required)
- `--plan-children` - Plan all children (for epics)
- `--chain-to <COMMAND>` - Chain to next command
- `--dry-run` - Preview without execution
- `--force` - Skip validation

## Claude Behaviors
1. **Role Detection**: Automatically detect work type and required Specialist-Architect
2. **Dual Role Requirement**: Enforce both @PM AND @Specialist-Architect participation
3. **Phase Validation**: Ensure item is in DEFINING phase before proceeding
4. **Planning Session**: Create collaborative planning session with both roles
5. **Dependency Mapping**: Establish dependencies and blocking relationships
6. **Approval Workflow**: Require explicit approval from both PM and Specialist-Architect
7. **Phase Transition**: Move item from DEFINING to PLANNING phase after dual approval

## Mandatory Behaviors
- Block single-role execution - must have both PM and appropriate Specialist-Architect
- Never skip dual approval - both roles must explicitly approve before phase transition
- Always detect work type to identify required architect
- Always create planning session for collaborative context
- Always wait for approval before phase transition

## Integration
- **Chain Target**: icc-plan-story (for stories) or icc-plan-bug (for bugs)
- Approval via `/icc-approve-plan <item_id>` command