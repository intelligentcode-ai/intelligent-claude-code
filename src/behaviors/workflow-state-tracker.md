# Workflow State Tracker

**MANDATORY:** Track and persist ALL workflow state. Auto-recover from interruptions.

**PURPOSE:** Persist workflow phase state for recovery and phase validation

## State Storage

### Directory Structure
```
[memory_path]/state/        # Configurable memory path
├── active-workflow.md      # Current workflow type and phase
├── workflow-history/       # Phase transition history
└── interruption-recovery/  # Saved states for recovery
```

### Active Workflow Format
**Location:** `[memory_path]/state/active-workflow.md` (configurable)
- Workflow ID, type (outer/inner), current phase
- Phase status with timestamps
- Context and settings from parent
- Active role and task queue

## Phase Management

### Transition Rules
**Forward:** Sequential progression (1→2→3...)
**Backward:** Review failures only
**Validation:** No phase skipping

### Recording Pattern
Save state → Record completion → Validate next → Update phase → Log transition

## Interruption Recovery

### Auto-Save Triggers
- Phase transitions
- 5-minute intervals
- External tool calls
- Subtask completion

### Recovery State
**Location:** `[memory_path]/state/interruption-recovery/[workflow-id].md` (configurable)
- Timestamp, phase, progress
- Completed/pending work lists
- Resume instructions

## State Operations

**Save:** Gather data → Format markdown → Write state → Log transition
**Load:** Check active → Parse state → Validate → Resume
**Validate:** Read phase → Check allowed → Verify complete → Return result

## Integration Points

### With Workflow Enforcement
- Phase gates via state tracker
- State check before corrections
- Violation logging in history

### With Executable Workflow  
- Auto-save after each step
- Context in subagent calls
- Safe recovery boundaries

### With Learning System
- Analyze phase durations
- Identify bottlenecks
- Track success patterns

## Recovery Strategies

**Clean:** Valid state → Load → Resume
**Conflict:** Multiple workflows → User choice → Archive/merge
**Corrupted:** Archive bad → Reconstruct → Safe phase

---
*Workflow state tracking for intelligent-claude-code system*