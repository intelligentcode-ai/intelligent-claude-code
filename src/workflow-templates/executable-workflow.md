# Executable AI Workflow

## Core Principle: @Role = Task Tool Invocation

Every @Role mention triggers a Task tool invocation that creates a subagent with that role's expertise.

**CRITICAL**: PROJECT-CONTEXT.md is loaded ONCE by the outer workflow parent and passed to all subagents via context parameters.

## Outer Workflow (Bug/Story Level)

### 1. PM Planning (with PROJECT-CONTEXT)
```xml
<!-- Parent loads PROJECT-CONTEXT.md ONCE here -->
<invoke name="Task">
  <parameter name="description">[PM] Plan STORY-XXX implementation</parameter>
  <parameter name="prompt">You are @PM. Analyze STORY-XXX requirements, search memory for similar patterns, and define implementation approach.
  Context: [PROJECT-CONTEXT content passed from parent]</parameter>
</invoke>
```

### 2. Architect Triage
```xml
<invoke name="Task">
  <parameter name="description">[AI-Architect] Review and approve story approach</parameter>
  <parameter name="prompt">You are @AI-Architect. Review the story plan and provide architectural approval or feedback.
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>
```

### 3. Task Creation
```xml
<invoke name="Task">
  <parameter name="description">[PM] Create tasks with role assignments</parameter>
  <parameter name="prompt">You are @PM. Create tasks for STORY-XXX ensuring:
  - Role-in-title format: "[Role] Task description"
  - Minimum 3 subtasks per task
  - Create dynamic specialists if <70% capability match
  - For behavioral/AI work: Use @AI-Engineer (not @Developer)
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>
```

### 4. Git Branch Setup
```xml
<invoke name="Task">
  <parameter name="description">[AI-Engineer] Create feature/STORY-XXX branch</parameter>
  <parameter name="prompt">You are @AI-Engineer. Create and checkout feature branch for STORY-XXX.</parameter>
</invoke>
```

### 5. Parallel Task Execution
```xml
<!-- Execute up to 5 non-conflicting tasks in parallel -->
<invoke name="Task">
  <parameter name="description">[AI-Engineer] Execute TASK-001</parameter>
  <parameter name="prompt">You are @AI-Engineer. Execute TASK-001 following inner workflow.
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>

<invoke name="Task">
  <parameter name="description">[QA-Engineer] Execute TASK-002</parameter>
  <parameter name="prompt">You are @QA-Engineer. Execute TASK-002 following inner workflow.
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>
```

### 6. Merge Request Decision
<!-- PARENT asks user directly - NOT a subagent task -->
After all tasks complete, parent asks user:
"Would you like me to create a merge request for the completed story?"

If user approves:
```xml
<invoke name="Task">
  <parameter name="description">[Developer] Create merge request</parameter>
  <parameter name="prompt">You are @Developer. Create MR for completed story branch.</parameter>
</invoke>
```

### 7. Story Retrospective
```xml
<invoke name="Task">
  <parameter name="description">[PM] Synthesize story learnings</parameter>
  <parameter name="prompt">You are @PM. Create story-level learning entity capturing patterns and recommendations.</parameter>
</invoke>
```

## Inner Workflow (Task Level)

### 1. Memory Search
Search for relevant patterns before starting work.

### 2. Plan Approach
- Simple tasks: Direct implementation
- Complex tasks: Break into subtasks

### 3. Execute Work
Implement the task requirements.

### 4. Peer Review (with Repetition Pattern)
```xml
<invoke name="Task">
  <parameter name="description">[Security-Engineer] Review auth implementation</parameter>
  <parameter name="prompt">You are @Security-Engineer. Review for security best practices and vulnerabilities.</parameter>
</invoke>
```

**Review Repetition Pattern:**
- Minor issues (typos, formatting): Fix in same task, re-review
- Major issues (wrong approach): Back to planning (step 2)
- Blocking issues: Create follow-up task, continue others
- Maximum 3 review cycles before escalation to @PM

### 5. Git Operations
- Load settings (git_privacy, branch_protection)
- Commit with format: "TASK-XXX: Description"
- Strip AI mentions if git_privacy=true

### 6. Task Completion
Update task status to COMPLETED.

### 7. Learning Capture
Store task learnings for future reference.

## Dynamic Specialist Creation

When existing roles have <70% capability match:

```xml
<invoke name="Task">
  <parameter name="description">[GraphQL-Developer] Implement GraphQL API</parameter>
  <parameter name="prompt">You are @GraphQL-Developer with 10+ years GraphQL expertise. Implement the API following best practices.
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>
```

## User Interruption Handling

### During Task Execution
- Save current state to task file
- Update status to IN_PROGRESS
- Document completed subtasks
- Note: "Paused by user at [timestamp]"

### Resuming Work
```xml
<invoke name="Task">
  <parameter name="description">[Role] Resume TASK-XXX from interruption</parameter>
  <parameter name="prompt">You are @[Role]. Review task state, check completed subtasks, and continue from interruption point.</parameter>
</invoke>
```

## Priority & Parallelization

### Execution Order
P0 → P1 → P2 → P3 (security issues auto-escalate to P0)

### Parallel Execution Example
```xml
<!-- Execute non-conflicting tasks simultaneously -->
<invoke name="Task">
  <parameter name="description">[Frontend-Developer] Build UI components</parameter>
  <parameter name="prompt">You are @Frontend-Developer. Build UI components.
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>

<invoke name="Task">
  <parameter name="description">[Backend-Developer] Create API endpoints</parameter>
  <parameter name="prompt">You are @Backend-Developer. Create API endpoints.
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>

<invoke name="Task">
  <parameter name="description">[Database-Engineer] Design schema</parameter>
  <parameter name="prompt">You are @Database-Engineer. Design database schema.
  Context: [PROJECT-CONTEXT passed from parent]</parameter>
</invoke>
```

## Git Settings

- **git_privacy**: Strip AI/Claude mentions from commits
- **branch_protection**: Enforce feature branches
- **default_branch**: main/master/develop
- **require_pr_for_main**: Block direct pushes

## Directory Structure

```
project-root/
├── .claude/
│   ├── PROJECT-CONTEXT.md    # Loaded ONCE by parent
│   └── config.md
├── epics/
│   └── EPIC-001-authentication/
│       ├── epic.yaml
│       ├── stories/
│       │   └── STORY-001-oauth.yaml
│       └── bugs/
│           └── BUG-045-session-timeout.yaml
├── tasks/
│   ├── TASK-001.md
│   ├── TASK-002.md
│   └── TASK-010.md
├── templates/              # Task templates directory
│   ├── task-template.md
│   ├── story-template.yaml
│   └── bug-template.yaml
└── src/
```

## Task Templates

Task templates are stored in the `templates/` directory. See:
- `templates/task-template.md` - Standard task format
- `templates/story-template.yaml` - Story definition
- `templates/bug-template.yaml` - Bug report format

## L3 Autonomous Mode

- Auto-execution without approval
- Auto-correction of violations
- Stop only for critical issues:
  - Business logic changes
  - Security violations
  - Data loss risks

## Critical Implementation Notes

1. **PROJECT-CONTEXT Loading**: Parent loads PROJECT-CONTEXT.md ONCE and passes to all subagents
2. **User Interaction**: Parent asks user about MR/PR creation (step 6) - NOT delegated to subagent
3. **Review Pattern**: Reviews can repeat up to 3 times before PM escalation
4. **Role Selection**: Use @AI-Engineer for behavioral/AI work, not @Developer
5. **Task Templates**: Reference templates/ directory for all templates
6. **XML Syntax**: All Task invocations use proper XML format

## Summary

This workflow uses Task tool invocations to create subagents for each role. The parent coordinates while subagents execute with specialized expertise. Dynamic specialists are created when existing roles have <70% capability match.