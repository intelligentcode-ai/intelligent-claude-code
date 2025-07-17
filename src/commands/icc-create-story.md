# icc:create-story

Create a new user story with automatic validation, ID tracking, and specialist assignment. Integrates with workflow validation chains and PM oversight.

## Usage
```
icc-create-story "Story title" --epic EPIC-XXX [--priority P1] [--type feature]
```

## Parameters
- `title`: Story description (required)
- `--epic`: Parent epic ID (required)
- `--priority`: P0, P1, P2, P3 (default: P2)
- `--type`: feature, enhancement, refactor (default: feature)

## Implementation
Follows lean-workflow-executor validation chain with auto-correction:

1. **FORCE-LOAD**: Execute /icc-reload to ensure behavioral compliance
2. **AUTO-DETECT**: Execute /icc-validate-work-type for content analysis
3. **AUTO-TRIAGE**: Automatically perform PM + Specialist Architect triage
4. **AUTO-VALIDATE**: Ensure >70% capability match for all tasks
5. **AUTO-APPROVE**: Joint PM + Specialist Architect approval
6. **AUTO-ASSIGN**: Generate story.yaml with validated assignments
7. **AUTO-CORRECT**: Apply role suggestions if validation fails

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