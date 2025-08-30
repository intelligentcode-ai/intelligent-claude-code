# Agent Status Monitoring

**MANDATORY:** Monitor and track agent execution status for parallel operations

## Status States
**Agent States:** initializing, running, completed, failed, stalled, timeout

## Monitoring Pattern
**Every 30 seconds:**
1. Check all active agents via BashOutput
2. Update last_update timestamps
3. Detect stalled agents (no update > 5 min)
4. Handle failures/completions

**Progress Tracking:** Monitor output, file modifications, milestone completions

## Failure Handling

| Failure Type | Action |
|-------------|--------|
| failed | Generate fix PRB with error context |
| timeout | Check progress → extend or abort |
| stalled | Restart agent or escalate |
| crash | Clean up and retry PRB |

## Timeout Management
**Complexity-Based:** Nano=5min, Tiny=10min, Medium=30min, Large=60min, Mega=120min

**Timeout Response:**
1. Check agent output for progress
2. If progressing: extend timeout
3. If stalled: abort and cleanup
4. Generate timeout report
5. Queue retry if appropriate

## Status Reporting
**Status Format:**
```
Active PRBs (3/5 capacity):
- [RUNNING] STORY-011-PRB-001 (15 min) - 60% complete
- [RUNNING] STORY-011-PRB-002 (5 min) - 30% complete

Queued PRBs (2):
- [QUEUED] STORY-012-PRB-002 - waiting for capacity
```

**Monitoring Structure:**
```yaml
agent_monitoring:
  active_agents:
    - agent_id: agent_123
      prb_id: STORY-011-PRB-001
      status: running
      start_time: 2025-08-30T10:00:00
      last_update: 2025-08-30T10:05:00
      progress: "Modifying files..."
```

## Integration Points
**Queue Management:** Update queue on status changes, trigger dispatching on completions
**Background Execution:** Monitor agents via BashOutput, track process health

---
*Agent status monitoring for parallel execution visibility*