# Task Queue Manager

**PURPOSE:** Priority-based task queue for L3 execution

## Core Implementation

```pseudocode
CLASS TaskQueue:
    queue = PriorityQueue(); tasks = Map(); executing = Set()
    
    FUNCTION add(task):
        task.priority = calculatePriority(task)
        queue.enqueue(task); tasks.set(task.id, task)
        
    FUNCTION getNext():
        WHILE NOT queue.isEmpty():
            task = queue.dequeue()
            IF canExecute(task): executing.add(task.id); RETURN task
        RETURN null
    
    FUNCTION getParallel(limit = 5):
        available = []
        WHILE NOT queue.isEmpty() AND available.length < limit:
            task = queue.dequeue()
            IF canExecute(task) AND NOT executing.has(task.id):
                available.append(task)
        RETURN available
```

## Priority Calculation

```pseudocode
FUNCTION calculatePriority(task):
    epic = getEpicPriority(task)  // P0=0, P1=1, P2=2, P3=3
    taskPri = getTaskPriority(task)  // blocking=0, critical=1, parallel=2, optional=3
    age = MIN((now - task.created) / 60000, 99)
    
    composite = (epic * 1000) + (taskPri * 100) + age
    
    IF task.type == "security": composite = 0
    IF task.hasTag("urgent"): composite /= 2
    
    RETURN composite
```

## Readiness Checks

```pseudocode
FUNCTION canExecute(task):
    checks = [
        checkDependencies(task),
        checkBlockers(task),
        checkResources(task)
    ]
    FOR check IN checks: IF NOT check: RETURN false
    RETURN true

FUNCTION checkDependencies(task):
    FOR dep IN task.dependencies:
        depTask = tasks.get(dep)
        IF NOT depTask OR depTask.status != "completed": RETURN false
    RETURN true
```

## Parallel Execution

```pseudocode
FUNCTION getParallelTasks(max = 5):
    parallel = []
    candidates = getAvailable(max * 2)
    
    FOR candidate IN candidates:
        IF parallel.length < max AND NOT hasConflict(candidate, parallel):
            parallel.append(candidate)
    
    RETURN parallel

FUNCTION hasConflict(task, others):
    FOR other IN others:
        IF task.files.intersects(other.files) OR
           task.schema AND other.schema OR
           task.api.intersects(other.api): RETURN true
    RETURN false
```

## Queue Operations

```pseudocode
FUNCTION remove(taskId):
    task = tasks.get(taskId)
    IF task: queue.remove(task); tasks.delete(taskId); executing.delete(taskId)
        
FUNCTION updateStatus(taskId, status):
    task = tasks.get(taskId)
    IF task:
        task.status = status
        IF status == "completed": remove(taskId); checkDependent(taskId)
            
FUNCTION checkDependent(completedId):
    FOR task IN queue:
        IF task.dependencies.includes(completedId) AND canExecute(task):
            task.status = "ready"
```

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