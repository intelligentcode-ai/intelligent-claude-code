# AgentTask Queue Management

**MANDATORY:** Track and manage AgentTask execution queue for parallel processing with capacity enforcement and conflict prevention.

## Queue States

| State | Description | Dispatch Rule |
|-------|-------------|---------------|
| queued | Waiting for slot/dependencies | Check capacity + conflicts + dependencies |
| running | Currently executing via Task tool | Track agent handle + file locks |
| completed | Successfully finished | Release locks + trigger next dispatch |
| failed | Execution failed | Retry logic or manual intervention |
| blocked | Conflicts or unmet dependencies | Hold until resolved |

## Capacity Management

**Dispatch:** Load `max_parallel` from L3 → If `current_running < max_parallel` dispatch, else queue with priority
**Auto-Dispatch:** On completion → release locks, decrement counter, find eligible AgentTask (dependencies met + no conflicts), dispatch by priority (HIGH→MEDIUM→LOW, FIFO within)

## Conflict Prevention

**File Locking:** Extract AgentTask files → check running AgentTask overlap → block if conflicts → lock during execution → release on completion
**Conflict Types:** Same file/git/config/directory → queue second AgentTask until first completes

## Dependency Resolution  

**Check:** All dependencies in `completed` state → auto-detect chains (validation→implementation, fix→validation, deploy→build)
**Patterns:** Sequential (feature→validate→fix→deploy) vs Parallel (docs, refactoring, optimization)

## Background Execution

**Dispatch Pattern:** Use Task tool with general-purpose subagent and background execution, then store tracking information including AgentTask ID, agent handle, start time, and file locks
**Monitor:** Every 2-5min → check agent status → process completions/failures → cleanup resources → trigger next dispatch → update stats

## Queue Health & Recovery

**Monitor:** Queue length, completion rates, failure patterns, capacity utilization
**Recovery:** Failed AgentTasks (retry/manual), orphaned agents (cleanup), queue corruption (rebuild), graceful degradation (sequential fallback)

## Integration

**AgentTask System:** Pre-check capacity/conflicts, track execution, update completion state
**L3 Autonomy:** Dynamic capacity loading, respect autonomy levels, continuous operation
**Memory/Config:** State persistence, pattern learning, performance optimization, dynamic settings

---
*AgentTask queue management for parallel execution with capacity enforcement and conflict prevention*