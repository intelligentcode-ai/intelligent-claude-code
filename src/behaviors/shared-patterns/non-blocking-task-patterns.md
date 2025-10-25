# Non-Blocking Task Patterns

**MANDATORY:** Use non-blocking Task tool invocation for parallel agent execution. Auto-correct sequential execution violations.

## Core Pattern

**Task Tool Invocation Pattern:**
- **Agent Type**: Use general-purpose subagent for AgentTask execution
- **Description**: Include specific AgentTask identifier for tracking
- **Context**: Provide complete AgentTask context for autonomous execution
- **Background Mode**: Enable background execution for parallel processing

## Execution Mode Decision

| Condition | Mode | run_in_background |
|-----------|------|------------------|
| L3 + Independent AgentTasks + Capacity available | Non-blocking | true |
| L1/L2 + Dependent AgentTasks + Critical ops | Blocking | false |

## Agent Management

**Registry Pattern:**
- Store: handle, agenttask_id, start_time, status
- Track: Periodic status checks (2-5 min intervals)
- Lifecycle: Launch → Monitor → Complete → Cleanup
- Capacity: Respect max_parallel setting, queue when full

**Status Monitoring Pattern:**
- **Regular Checks**: Monitor all running agents at periodic intervals
- **Completion Detection**: When agent completes, process results and update registry
- **Error Handling**: When agent encounters error, apply error recovery procedures
- **Registry Cleanup**: Remove completed or failed agents from active registry

## Conflict Detection

**Resource Conflicts:**
- File conflicts: Serialize same-file operations
- Directory conflicts: Prevent overlapping git ops
- Dependencies: Ensure prerequisite completion

## Error Handling

| Error Type | Action | Recovery |
|------------|--------|----------|
| Timeout | Terminate, log, retry | Manual review if repeated |
| Failure | Capture context, auto-retry | Manual after retry limit |
| Resource exhaustion | Queue AgentTask, reduce capacity | Resume when available |

## Integration

**L3 Mode:** Parallel AgentTask generation and dispatch
**Queue Management:** Priority scheduling, dependency resolution
**Memory:** Track performance patterns and optimization learnings

## Implementation

**Registry Operations:** Add/update/cleanup with metadata persistence
**Coordination:** Resource locking, dependency tracking, error isolation
**Capacity:** Monitor limits, graceful degradation to sequential execution

---
*Non-blocking Task tool patterns for parallel agent execution*