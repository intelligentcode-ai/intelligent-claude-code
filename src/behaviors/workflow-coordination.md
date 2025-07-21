# Workflow Coordination

**MANDATORY:** MUST use priority-based task coordination. Auto-correct violations.

**Purpose:** Unified task queue management and priority coordination
**Type:** Core Workflow Component
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

---
*Unified workflow coordination for intelligent-claude-code system*