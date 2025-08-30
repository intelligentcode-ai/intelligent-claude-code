# PRB Queue Management

**MANDATORY:** Track and manage PRB execution queue for parallel processing with capacity enforcement and conflict prevention.

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
**Auto-Dispatch:** On completion → release locks, decrement counter, find eligible PRB (dependencies met + no conflicts), dispatch by priority (HIGH→MEDIUM→LOW, FIFO within)

## Conflict Prevention

**File Locking:** Extract PRB files → check running PRB overlap → block if conflicts → lock during execution → release on completion
**Conflict Types:** Same file/git/config/directory → queue second PRB until first completes

## Dependency Resolution  

**Check:** All dependencies in `completed` state → auto-detect chains (validation→implementation, fix→validation, deploy→build)
**Patterns:** Sequential (feature→validate→fix→deploy) vs Parallel (docs, refactoring, optimization)

## Background Execution

**Dispatch:** `Task(subagent_type='general-purpose', run_in_background=true)` → store prb_id, agent_handle, start_time, files_locked
**Monitor:** Every 2-5min → check agent status → process completions/failures → cleanup resources → trigger next dispatch → update stats

## Queue Health & Recovery

**Monitor:** Queue length, completion rates, failure patterns, capacity utilization
**Recovery:** Failed PRBs (retry/manual), orphaned agents (cleanup), queue corruption (rebuild), graceful degradation (sequential fallback)

## Integration

**PRB System:** Pre-check capacity/conflicts, track execution, update completion state
**L3 Autonomy:** Dynamic capacity loading, respect autonomy levels, continuous operation
**Memory/Config:** State persistence, pattern learning, performance optimization, dynamic settings

---
*PRB queue management for parallel execution with capacity enforcement and conflict prevention*