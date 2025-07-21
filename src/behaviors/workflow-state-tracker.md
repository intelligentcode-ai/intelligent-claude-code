# Workflow State Tracker

**MANDATORY:** Track and persist ALL workflow state. Auto-recover from interruptions.

**PURPOSE:** Persist workflow phase state for recovery and phase validation

## State Storage Pattern

### Directory Structure
```
.claude/memory/state/
├── active-workflow.md      # Current workflow type and phase
├── workflow-history/       # Phase transition history
│   └── [YYYY-MM-DD]/      # Daily workflow logs
└── interruption-recovery/  # Saved states for recovery
    └── [workflow-id].md    # Interrupted workflow state
```

### Active Workflow State
**File:** `.claude/memory/state/active-workflow.md`
```markdown
# Active Workflow State
**Workflow ID:** [STORY-XXX or TASK-XXX]
**Type:** [outer|inner]
**Current Phase:** [1-8]
**Started:** [YYYY-MM-DD HH:MM:SS]
**Last Update:** [YYYY-MM-DD HH:MM:SS]

## Phase Status
- Phase 1: ✓ COMPLETED at HH:MM:SS
- Phase 2: ⚡ ACTIVE since HH:MM:SS
- Phase 3: ⏸ PENDING

## Context
**Parent Context:** [PROJECT-CONTEXT content]
**Settings:** autonomy_level=L3, git_privacy=true, ...
**Active Role:** [Current role]
**Task Queue:** [TASK-001, TASK-002]
```

## Phase Transition Tracking

### Transition Recording Pattern
**BEFORE phase change:** Save current state → Record completion → Validate next phase allowed → Update active phase → Log transition

### Phase Validation Rules
**Forward Only:** Phases must progress sequentially (1→2→3...)
**Backward Allowed:** Review failures can return to earlier phases
**Skip Prevention:** Cannot jump phases without completion

### Transition Log Format
**File:** `.claude/memory/state/workflow-history/[YYYY-MM-DD]/transitions.md`
```markdown
## [HH:MM:SS] Phase Transition
**From:** Phase 2 (Validation)
**To:** Phase 3 (Execution)
**Trigger:** Architect approval received
**Duration:** 5m 23s
```

## Interruption Recovery

### Auto-Save Pattern
**Trigger Points:**
- Every phase transition
- Every 5 minutes during active work
- Before any external tool invocation
- On subtask completion

### Recovery State Format
**File:** `.claude/memory/state/interruption-recovery/[workflow-id].md`
```markdown
# Interrupted Workflow: STORY-XXX
**Interrupted At:** [YYYY-MM-DD HH:MM:SS]
**Phase:** 3 (Execution)
**Progress:** 2/5 tasks completed

## Completed Work
- TASK-001: ✓ Completed
- TASK-002: ✓ Completed
- TASK-003: ⚡ 60% - Subtask 2/3 done

## Pending Work
- TASK-004: ⏸ Not started
- TASK-005: ⏸ Not started

## Recovery Instructions
1. Load context and settings from saved state
2. Resume TASK-003 from subtask 3
3. Continue with TASK-004, TASK-005
```

## State Operations

### Save State Pattern
**Process:** Gather current workflow data → Format as markdown → Write to active-workflow.md → Update transition log → Create recovery snapshot

### Load State Pattern
**Process:** Check for active-workflow.md → If exists: parse state → Validate phase consistency → Resume from saved phase → If missing: check recovery files

### Validate State Pattern
**Process:** Read current phase → Check allowed actions for phase → Verify completion requirements → Block invalid transitions → Return validation result

## Integration Points

### With Workflow Enforcement
**Phase Gates:** Use state tracker to enforce phase restrictions
**Auto-Correction:** Check saved state before corrections
**Violation Logging:** Record attempts in transition history

### With Executable Workflow
**Phase Updates:** Auto-save after each workflow step
**Context Passing:** Include saved context in subagent calls
**Recovery Points:** Mark safe recovery boundaries

### With Learning System
**Pattern Detection:** Analyze phase durations and transitions
**Optimization:** Identify bottlenecks in workflow execution
**Success Tracking:** Record successful completion patterns

## Recovery Strategies

### Clean Recovery
**Conditions:** Active workflow exists, valid state, no conflicts
**Process:** Load state → Validate consistency → Resume execution

### Conflict Resolution
**Conditions:** Multiple active workflows or state mismatch
**Process:** Present options to user → Archive conflicts → Start fresh or merge

### Corrupted State Recovery
**Conditions:** Malformed state files or missing data
**Process:** Archive corrupted files → Reconstruct from history → Start at safe phase

## Usage Examples

### Save Workflow State
```
When entering Phase 3:
1. Update active-workflow.md with phase: 3
2. Log transition with timestamp and trigger
3. Create recovery snapshot
4. Continue with execution
```

### Check Current Phase
```
Before developer work:
1. Read active-workflow.md
2. Verify current phase allows development (phase 3)
3. If not phase 3: block and show current phase
4. If phase 3: proceed with work
```

### Recover from Interruption
```
On system restart:
1. Check active-workflow.md exists
2. If yes: load state and resume
3. If no: check interruption-recovery/
4. Present recovery options to user
5. Resume or start fresh based on choice
```

---
*Workflow state tracking for intelligent-claude-code system*