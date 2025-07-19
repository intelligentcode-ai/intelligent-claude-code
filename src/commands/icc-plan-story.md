# Story Planning Command

**BEHAVIORAL INSTRUCTION**: Plan story by generating tasks with specialist matching.

## Parameters
- `story_id`: Story identifier (required)
- `--chain-to <COMMAND>` - Chain to next command
- `--dry-run` - Preview without execution
- `--force` - Skip validation

## Claude Behaviors
1. **Memory-First**: Search memory for similar story patterns
2. **Work Type Detection**: Identify AI, infrastructure, security, database, or frontend work
3. **Specialist Activation**: Switch to appropriate architect role for work type
4. **Validation Enforcement**: Ensure PM + Specialist-Architect triage and approval
5. **Task Generation**: Create knowledge retrieval (001), core work (010-994), knowledge capture (999)
6. **Assignment Validation**: Verify >70% capability match for each task
7. **Phase Transition**: Move story from PLANNING to EXECUTE

## Mandatory Behaviors
- Never skip validation without --force
- Always activate specialist architect for detected work type
- Always generate review tasks for implementation
- Always create knowledge tasks (retrieval and generation)
- Always update story.yaml with tasks and phase change

## Integration
- **Prerequisites**: icc-plan-order completion
- **Chain Target**: icc-plan-tasks