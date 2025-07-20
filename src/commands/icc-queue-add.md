# Queue Add

Add task to priority queue using $ARGUMENTS.

## Arguments
`Task: TASK-ID | Priority: P0|P1|P2|P3 | Type: blocking|critical_path|parallel|optional | Dependencies: TASK-001,TASK-002`

## Behavior
- Parse task details from $ARGUMENTS
- Validate task exists and dependencies resolved
- Calculate priority: base_priority*1000 + type*100 + age_minutes
- Check conflicts with executing/queued tasks
- Add to queue with metadata and timestamp
- Mark task status as QUEUED

## Errors
- Invalid task → "Task not found"
- Not ready → "Dependencies unresolved"
- Already queued → "Task already in queue"
- Resource conflict → "Conflicts with task X"