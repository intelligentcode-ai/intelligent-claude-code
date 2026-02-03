---
name: workflow
description: Apply workflow enforcement patterns and resolution. Use when checking workflow step requirements, resolving workflow conflicts, or ensuring proper execution sequence.
---

# Workflow Skill

Apply workflow enforcement patterns and ensure proper execution sequence.

## When to Use

- Checking workflow step requirements
- Resolving workflow conflicts
- Ensuring proper execution sequence
- Validating workflow compliance

## Standard Workflow Steps

1. **Task** - Create AgentTask via Task tool
2. **Plan** - Design implementation approach
3. **Review Plan** - Validate approach before execution
4. **Execute** - Implement the changes
5. **Review Execute** - Validate implementation
6. **Document** - Update documentation

## Workflow Enforcement

When `enforcement.workflow.enabled` is true:
- Steps must be completed in order
- Skipping steps is blocked
- Each step has allowed tools

### Step Tool Restrictions

| Step | Allowed Tools |
|------|---------------|
| Task | Task |
| Plan | Plan, Read, Grep, Glob |
| Review Plan | Review, Read |
| Execute | Edit, Write, Bash, ... |
| Review Execute | Review, Read |
| Document | Document, Write, Edit |

## Workflow Resolution

### Conflict Resolution
When steps conflict:
1. Identify the blocking step
2. Complete required predecessor
3. Document resolution
4. Continue workflow

### Skip Justification
If skip is truly necessary:
1. Document reason for skip
2. Get explicit user approval
3. Note in completion summary
4. Flag for review

## Workflow Settings

Check workflow config:
```
/icc-get-setting enforcement.workflow.enabled
/icc-get-setting enforcement.workflow.steps
```

## Integration with AgentTasks

AgentTasks include workflow stage:
```yaml
agentTask:
  workflow:
    current_step: "Execute"
    completed_steps: ["Task", "Plan", "Review Plan"]
    remaining_steps: ["Review Execute", "Document"]
```

## Workflow Completion

Workflow is complete when:
- All required steps executed
- No blocking conditions remain
- Documentation updated
- Summary generated
