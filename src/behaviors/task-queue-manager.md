# Task Queue Manager

**Purpose:** Priority-based task queue for L3 execution

## Queue Management

**Task Addition:** Use `/icc-queue-add [task_data]` to calculate priority, add to queue, and track in task map  
**Task Retrieval:** Use `/icc-queue-get` to get highest priority executable task and mark as executing  
**Parallel Retrieval:** Use `/icc-queue-get-parallel [max_count]` to get up to 5 non-conflicting tasks

## Priority Calculation

**Priority Formula:** Use `/icc-prioritize [task_data]` to calculate Epic priority (P0-P3) × 1000 + Task type × 100 + Age in minutes  
**Special Cases:** Use `/icc-prioritize [task_data]` for Security tasks → Priority 0 • Urgent tagged → Priority ÷ 2  
**Priority Reference:** P0(0) → P1(1000) → P2(2000) → P3(3000) and blocking(0) → critical_path(100) → parallel(200) → optional(300)

## Readiness Checks

**Execution Requirements:** Use `/icc-queue-check-ready [task_id]` to verify dependencies, blockers, and resource availability  
**Comprehensive Validation:** Command handles dependency completion, blocker status, approval requirements, and resource conflicts

## Parallel Execution

**Conflict Detection:** Use `/icc-queue-check-conflicts [task_list]` to detect file overlap, schema changes, and API conflicts  
**Parallel Selection:** Use `/icc-queue-get-parallel [max_count]` to get candidates, filter conflicts, and return non-conflicting tasks  
**Conflict Types:** File conflicts, schema conflicts, API conflicts automatically detected by conflict checker

## Queue Operations

**Remove Task:** Use `/icc-queue-remove [task_id]` to remove from queue, delete from map, and clear executing flag  
**Update Status:** Use `/icc-queue-update-status [task_id] [status]` to update status and handle completion dependencies  
**Dependency Updates:** Use `/icc-queue-unblock-dependents [completed_task_id]` to find and mark dependent tasks as ready

## Configuration

```yaml
queue_settings:
  max_parallel: 5
  priority_levels:
    P0: 0  # Critical
    P1: 1  # High
    P2: 2  # Medium
    P3: 3  # Low
  
  task_priorities:
    blocking: 0
    critical_path: 1
    parallel: 2
    optional: 3
```

## Benefits

- **Auto-Prioritization**: Tasks execute in optimal order
- **Dependency Handling**: Unblocks dependent tasks automatically
- **Parallel Support**: Non-conflicting tasks run together
- **Fair Scheduling**: Age prevents starvation