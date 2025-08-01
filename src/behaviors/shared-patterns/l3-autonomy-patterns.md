# Shared L3 Autonomy Patterns

**MANDATORY:** MUST use L3 autonomous patterns. Auto-correct violations.

**PURPOSE:** Common patterns for L3 autonomous execution

## Core L3 Patterns

### L3 Mode Detection
**Process:** Get autonomy level setting (default L2) → If level is L3: enable continuous mode, disable blocking behaviors, activate auto-recovery

### Stop Conditions (L3 Only)
**Critical Stops:**
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass
- `DATA_LOSS_RISK` - Destructive operations without backup

**Auto-Handled (No Stop):**
- Process violations → Auto-correct
- Test failures → Apply fix patterns
- Lint errors → Auto-format
- Import issues → Resolve dependencies
- Type errors → Fix definitions

### Continuous Execution Pattern
**Process:** While L3 mode is active, continuously retrieve ready tasks (maximum 5). When no tasks are available: discover new work opportunities. When tasks exist: execute them in parallel. After each cycle: handle task completions and check for critical stop conditions.

### Auto-Recovery Pattern
**Process:** When an error occurs, determine if it's recoverable. If recoverable: identify appropriate recovery strategy, apply the strategy, then retry the task. If not recoverable: create a fix task for manual resolution and continue with other available work.

### Non-Blocking Review Pattern
**Process:** When review is required and L3 mode is active, perform automatic review process. If issues are found during review: create follow-up tasks to address them. Always mark review as complete and continue execution without blocking the workflow.

## Common L3 Operations

### L3 Mode Activation
**When enabling L3 mode:** Activate continuous-engine, task-queue-manager, auto-continue-triggers, work-discovery-engine, and progress-monitor components. Simultaneously disable user-approval-prompts, blocking-behaviors, and manual-confirmations to ensure uninterrupted autonomous execution.

### Stop Condition Evaluation
**When evaluating actions:** If action type is business critical, security violation, or data loss risk: halt execution immediately. For all other action types: continue autonomous execution without interruption.

### Auto-Correction Process
**When violations occur:** For missing validation: add required validation steps. For skipped steps: execute the missed step. For process violations: apply appropriate correction measures. After any correction: continue execution without manual intervention.

## L3 Configuration

### Required Settings
**Configuration requirements:** Set autonomy level to L3, disable blocking behaviors, enable auto-recovery mechanisms, allow parallel execution of tasks, and activate continuous operation mode.

### Performance Settings
**Operational parameters:** Maximum of 5 parallel tasks, task timeout of 300 seconds, error threshold of 5 failures before escalation, and up to 3 recovery attempts per error before creating fix tasks.

---
*Shared L3 autonomy patterns for continuous execution*