# icc:plan-story

Plan story tasks with architect validation and specialist assignment.

## Usage
```
icc-plan-story STORY-XXX
```

## Parameters
- `story_id`: Story identifier (required)

## Implementation
Executes story planning workflow with validation:

1. **Read Assignment**: Load story.yaml with embedded config
2. **Apply Config**: Use embedded config to shape task creation
3. **Work Type Detection**: Analyze story content for specialist requirements
4. **Architect Triage**: Mandatory PM + Specialist Architect consultation
5. **Task Generation**: Create tasks with appropriate specialist assignments
6. **Validation Chain**: Ensure all assignments meet >70% capability match
7. **Approval Gate**: Joint PM + Specialist Architect approval required

## Expected Output
```
📋 Planning Story: STORY-XXX

📖 Reading assignment file...
⚙️  Applying embedded config: L3 autonomy, PM active
🔍 Work Type: ai_agentic
👥 Required Architect: @AI-Architect

⏸️  Triage required with @AI-Architect
✅ Triage completed
✅ Tasks generated:
   - TASK-001: Knowledge retrieval (@AI-Engineer)
   - TASK-002: Architecture design (@AI-Architect) 
   - TASK-003: Implementation (@AI-Engineer)
   - TASK-004: Testing (@QA-Engineer)
   - TASK-005: Knowledge generation (@AI-Engineer)

✅ All assignments validated (>70% capability match)
✅ Joint approval received
📁 Updated: story.yaml with task assignments
🎯 Phase: PLAN → EXECUTE
```

## Integration
- Follows lean-workflow-executor planning patterns
- Integrates with role-assignment-validator for specialist matching
- Uses embedded config from story.yaml to shape behavior
- Triggers automatic task queue population in L3 mode