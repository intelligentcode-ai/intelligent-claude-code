---
name: parallel-execution
description: Manage parallel AgentTask execution and queue management. Use when running multiple AgentTasks concurrently, monitoring agent status, or coordinating non-blocking task patterns in L3 mode.
---

# Parallel Execution Skill

Manage parallel AgentTask execution and coordination.

## When to Use

- Running multiple AgentTasks concurrently
- Monitoring status of background agents
- Coordinating non-blocking task patterns
- Operating in L3 autonomy mode

## Parallel Execution Rules

### Independence Check
Before parallel execution, verify:
- No data dependencies between tasks
- No file conflicts (same file modified)
- No sequential requirements

### Maximum Concurrency
- Default: 5 parallel AgentTasks
- Configurable via `autonomy.l3_settings.max_parallel`
- Respect system resource limits

## Non-Blocking Patterns

### Launch Background Task
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
- Use to coordinate completion

### Wait for Completion
```
TaskOutput with task_id, block: true
```
- Blocks until task completes
- Returns final result
- Use when result needed

## Queue Management

### Task Prioritization
1. Blocking dependencies first
2. Critical path items
3. Independent tasks in parallel
4. Low-priority background tasks

### Error Handling
When `continue_on_error` is true (L3):
- Log failed tasks
- Continue with remaining tasks
- Report all failures at end

When false (L1/L2):
- Stop on first failure
- Report error to user
- Await guidance

## Coordination Patterns

### Fork-Join Pattern
1. Create multiple independent AgentTasks
2. Launch all in parallel
3. Wait for all to complete
4. Aggregate results

### Pipeline Pattern
1. Task A produces output
2. Task B consumes A's output
3. Sequential dependency respected
4. Use `addBlockedBy` for ordering

## Status Monitoring

For long-running operations:
1. Launch with `run_in_background: true`
2. Periodically check with `TaskOutput`
3. Process results when complete
4. Handle timeouts appropriately
