# Executable Workflow

**MANDATORY:** MUST use unified workflow execution. Auto-correct violations.

**Purpose:** Consolidated workflow execution with autonomy control, L3 continuous engine, and role validation
**Type:** Core Unified Workflow Component
**Status:** ACTIVE

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/organization-patterns.md

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

---
*Unified executable workflow for intelligent-claude-code system*