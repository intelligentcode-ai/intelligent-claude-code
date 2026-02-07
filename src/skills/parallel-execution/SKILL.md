---
name: parallel-execution
description: Activate when multiple independent work items can execute concurrently. Activate when coordinating non-blocking task patterns in L3 autonomy mode. Manages parallel execution from .agent/queue/.
---

# Parallel Execution Skill

Manage parallel work item execution and coordination.

## When to Use

- Running multiple work items concurrently
- Monitoring status of background tasks
- Coordinating non-blocking patterns
- Operating in L3 autonomy mode

## Parallel Execution Rules

### Independence Check
Before parallel execution, verify:
- No data dependencies between items
- No file conflicts (same file modified)
- No sequential requirements (check BlockedBy)

### Maximum Concurrency
- Default: 5 parallel items
- Configurable via `autonomy.max_parallel`
- Respect system resource limits

## Non-Blocking Patterns

### Launch Background Task (Claude Code)
```
Task tool with run_in_background: true
```
- Returns immediately with task ID
- Continue with other work
- Check status periodically

### Monitor Status
```
TaskOutput with task_id, block: false
```
- Non-blocking status check
- Returns current progress

### Wait for Completion
```
TaskOutput with task_id, block: true
```
- Blocks until task completes
- Returns final result

## Queue-Based Execution

### Identify Parallel Items
From `.agent/queue/`, items can run in parallel if:
- Neither has `BlockedBy` referencing the other
- They modify different files/components
- They're independent features

### Launch Parallel Work
```bash
# Example: two independent items
# 001-pending-frontend.md (no blockers)
# 002-pending-backend.md (no blockers)
# Can run in parallel
```

### Track Status in Queue
Update status in filenames:
- `pending` → `in_progress` when started
- `in_progress` → `completed` when done
- `in_progress` → `blocked` if dependency issue found

## Prioritization

1. Items blocking others (critical path)
2. Independent items (parallelizable)
3. Items with most blockers (finish last)

## Error Handling

**L3 (continue_on_error: true):**
- Log failed items
- Continue with remaining items
- Report all failures at end

**L1/L2:**
- Stop on first failure
- Report error to user
- Await guidance

## Coordination Patterns

### Fork-Join Pattern
1. Identify independent work items
2. Launch all in parallel (Task tool with run_in_background)
3. Wait for all to complete
4. Aggregate results

### Pipeline Pattern
1. Item A produces output
2. Item B blocked by A
3. Execute sequentially
4. Respect BlockedBy in queue files
