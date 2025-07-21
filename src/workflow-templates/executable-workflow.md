# Executable AI Workflow

**MANDATORY:** MUST use unified workflow execution. Auto-correct violations.

**Purpose:** Complete workflow execution with Task tool invocations, autonomy control, and system-level management

## Core Principle: @Role = Task Tool Invocation

Every @Role mention triggers a Task tool invocation that creates a subagent with that role's expertise.

**CRITICAL**: PROJECT-CONTEXT.md is loaded ONCE by the outer workflow parent and passed to all subagents via context parameters.

## Task Queue Management

### Priority System
**Execution Order:** P0 → P1 → P2 → P3 (FIXED: was reversed)
**Priority Inheritance:** Epic → Story → Task with severity adjustments
**Dynamic Escalation:** Security issues and system failures → P0
**Display Format:** TodoWrite shows [P0], [P1], [P2], [P3] prefixes

### Queue Operations
**Add Task:** Check dependencies → Assign priority → Insert by priority order
**Get Next:** Return highest priority ready task → Update status to in_progress
**Get Parallel:** Return up to 5 non-conflicting ready tasks → Mark all in_progress
**Remove Task:** Mark completed → Update dependent tasks → Trigger next work

### Task Coordination
**Parallel Execution:** Up to 5 simultaneous non-conflicting tasks
**Dependency Management:** Block dependent tasks until prerequisites complete
**Resource Conflicts:** Prevent file conflicts by analyzing task scope
**Load Balancing:** Distribute work across available roles

### Priority Calculation
**Priority Assignment:** Start with story base priority → If task type is "blocking": escalate to P0 → If task type is "critical_path": increase priority by one level → If security impact: auto-escalate to P0 → If system failure: auto-escalate to P0

### Scoring Bonuses
**Priority Completion Bonuses:**
- P0 completion: +2.0P
- P1 completion: +1.5P
- P2 completion: +1.0P
- P3 completion: +0.5P

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

## Workflow Phase Management

### Phase Transitions
**Automatic Progression:** task_ready → in_progress → peer_review → completed
**Manual Triggers:** User or PM can force phase transitions
**Validation Gates:** Each phase requires validation before progression
**Error Handling:** Failed phases create fix tasks, continue other work

### Dependency Resolution
**Prerequisites:** Check all dependencies before marking task ready
**Circular Dependencies:** Detect and break cycles with PM intervention
**External Dependencies:** Track and notify when external blocks resolved
**Resource Dependencies:** Prevent conflicts with file-level analysis

### Continuous Flow
**Work Discovery:** Automatically scan for new ready tasks
**Queue Replenishment:** Maintain 3-5 ready tasks per role
**Progress Monitoring:** Track velocity and identify bottlenecks
**Escalation:** Notify PM when tasks blocked >24 hours

## Autonomy Control Integration

### Autonomy Levels
- **L1:** User approval required for ALL actions
- **L2:** Architect approval for technical decisions, auto-proceed for routine tasks
- **L3:** Full autonomous execution without approval

### Technical Decision Detection
**Technical Keywords:** architecture, design, system, framework, database, schema, api, interface, technology, library, package, dependency, version, upgrade, migration, deployment, infrastructure, cloud, server, scaling, performance, optimization, security, authentication, authorization, encryption, vulnerability, compliance

**Detection Process:** Scan content for technical keywords → If 2+ matches: mark as technical decision → L1: require user approval → L2: require architect approval → L3: proceed autonomously

### L3 Autonomous Behavior
**Dynamic Check:** Use `/icc-get-setting "autonomy_level"` for current setting
**L3 Commands:**
- `/icc-l3-execute [decision]` - Autonomous execution
- `/icc-l3-continue` - Continue without interruption
- `/icc-l3-proceed` - Proceed with best judgment
- `/icc-create-bug [issue_data]` - Create bugs autonomously
- `/icc-l3-continuous-loop` - Execute tasks continuously

### L3 Stop Conditions (ONLY)
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass
- `DATA_LOSS_RISK` - Destructive operations
- `CRITICAL_QUALITY_FAILURE` - System-breaking issues

### Configuration Checks
**PM Auto-Activation:** Check `/icc-get-setting "pm_always_active"` → If true: auto-activate @PM role
**Blocking Behavior:** Check `/icc-get-setting "blocking_enabled"` → If false: use non-blocking warnings

## L3 Continuous Execution

### Core L3 Loop
**Activation:** Check autonomy level → If L3: start continuous loop
**Task Discovery:** Get ready tasks (max 5) → Group non-conflicting → Execute in parallel → If none: discover new work
**Task Execution:** Consult learnings → Validate role → Execute work → Peer review → Store knowledge → Git commit → Trigger next
**Loop Behavior:** Continue while active → Auto-transition phases → Handle stuck states → Minimal wait between cycles

### Auto-Resolved Issues
- **Process violations** → Auto-correct and continue
- **Test failures** → Apply fix patterns
- **Lint errors** → Auto-format
- **Import issues** → Resolve dependencies
- **Type errors** → Fix type definitions

### L3 Work Discovery
**Sources:** Find bugs in PLANNED/IN PROGRESS → Find stories needing tasks → Check unblocked dependencies → Create follow-up tasks
**Queue Management:** Add discovered work to priority queue → Process by priority order
**Continuous Discovery:** Always scanning for new work → Never idle

### L3 Error Recovery
**Recovery Process:** Consult error learnings → Try recovery strategies → If successful: retry task → Else: create fix task
**Learning Integration:** Apply previous error solutions → Store new patterns → Share across team
**Non-Blocking:** Errors create tasks, not stops → Continue with other work

### L3 Configuration
**Settings:** Maximum parallel tasks: 5, timeout: 300 seconds, error threshold: 5 errors before escalation
**Stop Conditions:** business impact, security violation, data loss risk
**Auto-Recovery:** test failures, lint errors, type errors

## Role Assignment Validation

### Validation Commands
- `/icc-detect-work-type` - Identify work domain
- `/icc-require-triage` - PM + Architect triage
- `/icc-validate-assignments` - Check capability match
- `/icc-require-approval` - Joint approval gate

### Validation Chain
**Story Level:** detect-work-type → architect triage → validate assignments → joint approval
**Task Level:** validate-assignments → capability match → architect approval

### Work Type Detection
**Behavioral/AI Work:** Requires @AI-Architect or @AI-Engineer
**Security Work:** Requires @Security-Engineer or @Security-Architect
**Infrastructure Work:** Requires @System-Engineer or @DevOps-Engineer
**General Work:** Any appropriate specialist based on domain

### Capability Matching
**Threshold:** >70% capability match required
**Auto-Correction:** Wrong assignments auto-corrected
**Specialist Creation:** If <70% match, create dynamic specialist

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

## Integration Patterns

### Queue Commands (Behavioral)
- Check queue for ready tasks: `getNextTask(role)`
- Add task to queue: `addTask(task, priority)`
- Get parallel tasks: `getParallelTasks(maxCount=5)`
- Update task status: `updateTaskStatus(taskId, status)`

### Coordination with L3 Engine
**Task Discovery:** Provide ready tasks to L3 continuous engine
**Progress Updates:** Receive completion notifications from L3
**Auto-Continue:** Trigger next work when tasks complete
**Stop Conditions:** Respect L3 critical stop conditions

## Critical Implementation Notes

1. **PROJECT-CONTEXT Loading**: Parent loads PROJECT-CONTEXT.md ONCE and passes to all subagents
2. **User Interaction**: Parent asks user about MR/PR creation (step 6) - NOT delegated to subagent
3. **Review Pattern**: Reviews can repeat up to 3 times before PM escalation
4. **Role Selection**: Use @AI-Engineer for behavioral/AI work, not @Developer
5. **Task Templates**: Reference templates/ directory for all templates
6. **XML Syntax**: All Task invocations use proper XML format

## Summary

This workflow uses Task tool invocations to create subagents for each role. The parent coordinates while subagents execute with specialized expertise. Dynamic specialists are created when existing roles have <70% capability match. The system includes comprehensive task queue management, autonomy control, and L3 continuous execution capabilities.

---
*Unified executable workflow for intelligent-claude-code system*