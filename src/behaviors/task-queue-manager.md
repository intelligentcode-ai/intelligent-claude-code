# Task Queue Manager

**Purpose:** Priority-based task queue for L3 execution

## Queue Management

**Task Addition:** Calculate priority → Add to priority queue → Track in task map  
**Task Retrieval:** Get highest priority → Check if executable → Mark as executing → Return task  
**Parallel Retrieval:** Get up to 5 tasks → Check no conflicts → Return non-conflicting set

## Priority Calculation

**Priority Formula:** Epic priority (P0-P3) × 1000 + Task type × 100 + Age in minutes  
**Special Cases:** Security tasks → Priority 0 • Urgent tagged → Priority ÷ 2  
**Priority Levels:**
- P0: 0 (Critical) 
- P1: 1000 (High)
- P2: 2000 (Medium)
- P3: 3000 (Low)

**Task Types:**
- blocking: 0
- critical_path: 100
- parallel: 200
- optional: 300

## Readiness Checks

**Execution Requirements:** Check dependencies complete → Check no blockers → Check resources available  
**Dependency Check:** All dependent tasks completed → No missing prerequisites  
**Blocker Check:** No active blockers → Required approvals obtained  
**Resource Check:** Required tools available → No conflicts with executing tasks

## Parallel Execution

**Conflict Detection:** Check file overlap → Check schema changes → Check API conflicts  
**Parallel Selection:** Get candidates → Filter conflicts → Return up to 5 non-conflicting  
**Conflict Types:**
- File conflicts - Same files being modified
- Schema conflicts - Database changes
- API conflicts - Same endpoints

## Queue Operations

**Remove Task:** Remove from queue → Delete from map → Clear executing flag  
**Update Status:** Update task status → IF completed: Remove and check dependents  
**Dependency Updates:** When task completes → Find dependent tasks → Mark as ready if unblocked

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