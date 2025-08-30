# Agent Status Monitoring

**MANDATORY:** Monitor and track agent execution status for parallel operations

## Status States

### Agent States
- **initializing**: Agent starting up
- **running**: Actively executing PRB
- **completed**: Successfully finished
- **failed**: Execution failed
- **stalled**: No progress detected
- **timeout**: Exceeded time limit

## Monitoring Structure

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

## Status Checking Patterns

### Periodic Status Check
```
Every 30 seconds:
1. Check all active agents
2. Query status via BashOutput tool
3. Update last_update timestamp
4. Detect stalled agents (no update > 5 min)
5. Handle failures/completions
```

### Progress Tracking
- Monitor output from background agents
- Track file modifications
- Log milestone completions
- Estimate remaining work

## Failure Handling

### Failure Detection
- Agent returns error status
- Timeout exceeded (based on complexity)
- Stalled (no progress updates)
- Crash/disconnect detected

### Recovery Actions
1. **On Failure**: Generate fix PRB with error context
2. **On Timeout**: Check if more time needed or abort
3. **On Stall**: Attempt restart or escalate
4. **On Crash**: Clean up and retry PRB

## Timeout Management

### Complexity-Based Timeouts
- Nano (0-2 points): 5 minutes
- Tiny (3-5 points): 10 minutes
- Medium (6-15 points): 30 minutes
- Large (16-30 points): 60 minutes
- Mega (30+ points): 120 minutes

### Timeout Handling
```
On Timeout:
1. Check agent output for progress
2. If progressing: extend timeout
3. If stalled: abort and cleanup
4. Generate timeout report
5. Queue retry if appropriate
```

## Status Reporting

### Status Command Pattern
When requested "status":
```
Active PRBs (3/5 capacity):
- [RUNNING] STORY-011-PRB-001 (15 min) - 60% complete
- [RUNNING] STORY-011-PRB-002 (5 min) - 30% complete  
- [RUNNING] STORY-012-PRB-001 (8 min) - 45% complete

Queued PRBs (2):
- [QUEUED] STORY-012-PRB-002 - waiting for capacity
- [QUEUED] STORY-012-PRB-003 - depends on PRB-002
```

## Integration Points

### With Queue Management
- Update queue on status changes
- Trigger dispatching on completions
- Handle failures in queue

### With Background Execution
- Monitor agents via BashOutput
- Track background process health
- Coordinate multiple agents

---
*Agent status monitoring for parallel execution visibility*