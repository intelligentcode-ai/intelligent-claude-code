# Non-Blocking Task Patterns

**MANDATORY:** Use non-blocking Task tool invocation for parallel agent execution. Auto-correct sequential execution violations.

## Core Pattern

**Task Tool Invocation:**
```markdown
Task(subagent_type='general-purpose', description='Execute [PRB-ID]', 
     prompt='[Complete PRB context]', run_in_background=true)
```

## Execution Mode Decision

| Condition | Mode | run_in_background |
|-----------|------|------------------|
| L3 + Independent PRBs + Capacity available | Non-blocking | true |
| L1/L2 + Dependent PRBs + Critical ops | Blocking | false |

## Agent Management

**Registry Pattern:**
- Store: handle, prb_id, start_time, status
- Track: Periodic status checks (2-5 min intervals)
- Lifecycle: Launch → Monitor → Complete → Cleanup
- Capacity: Respect max_parallel setting, queue when full

**Status Monitoring:**
```yaml
for agent in running_agents:
  if completed: process_completion(agent)
  if error: handle_error(agent)
  remove_from_registry(agent)
```

## Conflict Detection

**Resource Conflicts:**
- File conflicts: Serialize same-file operations
- Directory conflicts: Prevent overlapping git ops
- Dependencies: Ensure prerequisite completion

## Error Handling

| Error Type | Action | Recovery |
|------------|--------|----------|
| Timeout (30min) | Terminate, log, retry | Manual review if repeated |
| Failure | Capture context, auto-retry (2x) | Manual after retry limit |
| Resource exhaustion | Queue PRB, reduce capacity | Resume when available |

## Integration

**L3 Mode:** Parallel PRB generation and dispatch
**Queue Management:** Priority scheduling, dependency resolution
**Memory:** Track performance patterns and optimization learnings

## Implementation

**Registry Operations:** Add/update/cleanup with metadata persistence
**Coordination:** Resource locking, dependency tracking, error isolation
**Capacity:** Monitor limits, graceful degradation to sequential execution

---
*Non-blocking Task tool patterns for parallel agent execution*