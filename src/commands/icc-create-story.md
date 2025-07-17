# icc:create-story

Create a new story with validation command chains and specialist assignment.

## Usage
```
/icc:create-story "Story title" --epic EPIC-XXX [--priority P1] [--type feature]
```

## Parameters
- `title`: Story description (required)
- `--epic`: Parent epic ID (required)
- `--priority`: P0, P1, P2, P3 (default: P2)
- `--type`: feature, enhancement, refactor (default: feature)

## Implementation
Follows lean-workflow-executor validation chain:

1. **icc:detect-work-type**: Analyze story content for specialist requirements
2. **icc:require-triage**: Mandatory PM + Specialist Architect approval
3. **icc:validate-assignments**: Ensure >70% capability match for all tasks
4. **icc:require-approval**: Joint PM + Specialist Architect approval
5. **icc:create-assignment**: Generate story.yaml with embedded config

## Expected Output
```
📋 Story Creation Process

🔍 Work Type Detection: ai_agentic
👥 Required Triage: @PM + @AI-Architect
⚠️  Blocking until triage complete...

✅ Triage approved by @PM and @AI-Architect
✅ Tasks validated with >70% capability match
✅ Story created: STORY-XXX

📁 Created: epics/EPIC-XXX/stories/STORY-XXX/story.yaml
🎯 Phase: PLAN
👤 Assigned: @AI-Engineer
📊 Priority: P1
```

## Integration
- Creates story directory structure under specified epic
- Generates story.yaml with embedded config from parent epic
- Triggers role assignment validation
- Integrates with scoring system for story completion tracking