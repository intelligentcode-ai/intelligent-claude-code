# Executable AI Workflow

## Core Principle: @Role = Task Tool Invocation

Every @Role mention triggers a Task tool invocation that creates a subagent with that role's expertise.

## Outer Workflow (Bug/Story Level)

### 1. PM Planning
```xml
<invoke name="Task">
  <parameter name="description">[PM] Plan STORY-XXX implementation</parameter>
  <parameter name="prompt">You are @PM. Analyze STORY-XXX requirements, search memory for similar patterns, and define implementation approach.</parameter>
</invoke>
```

### 2. Architect Triage
```xml
<invoke name="Task">
  <parameter name="description">[AI-Architect] Review and approve story approach</parameter>
  <parameter name="prompt">You are @AI-Architect. Review the story plan and provide architectural approval or feedback.</parameter>
</invoke>
```

### 3. Task Creation
```xml
<invoke name="Task">
  <parameter name="description">[PM] Create tasks with role assignments</parameter>
  <parameter name="prompt">You are @PM. Create tasks for STORY-XXX ensuring:
  - Role-in-title format: "[Role] Task description"
  - Minimum 3 subtasks per task
  - Create dynamic specialists if <70% capability match</parameter>
</invoke>
```

### 4. Git Branch Setup
```xml
<invoke name="Task">
  <parameter name="description">[Developer] Create feature/STORY-XXX branch</parameter>
  <parameter name="prompt">You are @Developer. Create and checkout feature branch for STORY-XXX.</parameter>
</invoke>
```

### 5. Parallel Task Execution
```xml
<!-- Execute up to 5 non-conflicting tasks in parallel -->
<invoke name="Task">
  <parameter name="description">[Developer] Execute TASK-001</parameter>
  <parameter name="prompt">You are @Developer. Execute TASK-001 following inner workflow.</parameter>
</invoke>

<invoke name="Task">
  <parameter name="description">[QA-Engineer] Execute TASK-002</parameter>
  <parameter name="prompt">You are @QA-Engineer. Execute TASK-002 following inner workflow.</parameter>
</invoke>
```

### 6. Merge Request
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

### 4. Peer Review
```xml
<invoke name="Task">
  <parameter name="description">[Security-Engineer] Review auth implementation</parameter>
  <parameter name="prompt">You are @Security-Engineer. Review for security best practices and vulnerabilities.</parameter>
</invoke>
```

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
  <parameter name="prompt">You are @GraphQL-Developer with 10+ years GraphQL expertise. Implement the API following best practices.</parameter>
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
</invoke>

<invoke name="Task">
  <parameter name="description">[Backend-Developer] Create API endpoints</parameter>
</invoke>

<invoke name="Task">
  <parameter name="description">[Database-Engineer] Design schema</parameter>
</invoke>
```

## Git Settings

- **git_privacy**: Strip AI/Claude mentions from commits
- **branch_protection**: Enforce feature branches
- **default_branch**: main/master/develop
- **require_pr_for_main**: Block direct pushes

## Directory Structure (Nested)

```
project-root/
├── .claude/
│   ├── PROJECT-CONTEXT.md
│   └── config.md
├── epics/
│   └── EPIC-001-authentication/
│       ├── epic.yaml
│       ├── stories/
│       │   └── STORY-001-oauth/
│       │       ├── story.yaml
│       │       └── tasks/
│       │           ├── TASK-001.md
│       │           └── TASK-002.md
│       └── bugs/
│           └── BUG-045-session-timeout/
│               ├── bug.yaml
│               └── tasks/
│                   └── TASK-010.md
└── src/
```

## Task Template Example

```markdown
# [Developer] Implement Google OAuth

**ID:** TASK-001
**Status:** PLANNED | IN_PROGRESS | COMPLETED | BLOCKED
**Priority:** P1

## Subtasks (minimum 3)
- [ ] Setup OAuth application
- [ ] Implement callback handler  
- [ ] Add secure token storage
- [ ] Write integration tests

## Interruption Notes
[Track any pauses/resumes here]
```

## L3 Autonomous Mode

- Auto-execution without approval
- Auto-correction of violations
- Stop only for critical issues:
  - Business logic changes
  - Security violations
  - Data loss risks

## Summary

This workflow uses Task tool invocations to create subagents for each role. The parent coordinates while subagents execute with specialized expertise. Dynamic specialists are created when existing roles have <70% capability match.