# Task Queue Manager

**PURPOSE:** Manage priority-based task queue for continuous L3 execution

## Core Implementation

### Priority Queue Structure
```pseudocode
CLASS TaskQueueManager:
    queue = PriorityQueue()
    taskIndex = Map()  // Fast lookup by ID
    executingTasks = Set()  // Currently executing
    
    FUNCTION initialize():
        loadExistingTasks()
        buildTaskIndex()
        startQueueMonitor()
    
    FUNCTION addTask(task):
        // Calculate composite priority
        task.compositePriority = calculateCompositePriority(task)
        
        // Add to queue and index
        queue.enqueue(task)
        taskIndex.set(task.id, task)
        
        logTaskAdded(task)
        
    FUNCTION getNextTask():
        WHILE NOT queue.isEmpty():
            task = queue.peek()
            
            IF canExecuteTask(task):
                queue.dequeue()
                executingTasks.add(task.id)
                RETURN task
            ELSE:
                // Task not ready, try next
                queue.dequeue()
                queue.enqueue(task)  // Re-add to back
                
        RETURN null
    
    FUNCTION getAvailableTasks(limit = 5):
        availableTasks = []
        tempQueue = []
        
        WHILE NOT queue.isEmpty() AND availableTasks.length < limit:
            task = queue.dequeue()
            tempQueue.append(task)
            
            IF canExecuteTask(task) AND NOT isExecuting(task):
                availableTasks.append(task)
        
        // Re-add tasks to queue
        FOR task IN tempQueue:
            queue.enqueue(task)
            
        RETURN availableTasks
```

### Priority Calculation
```pseudocode
FUNCTION calculateCompositePriority(task):
    // Composite priority = (epicPriority * 1000) + (taskPriority * 100) + timeFactor
    
    epicPriority = getEpicPriority(task)  // P0=0, P1=1, P2=2, P3=3
    taskPriority = getTaskPriority(task)  // blocking=0, critical_path=1, parallel=2, optional=3
    timeFactor = getTimeFactor(task)      // 0-99 based on age
    
    composite = (epicPriority * 1000) + (taskPriority * 100) + timeFactor
    
    // Special adjustments
    IF task.type == "security":
        composite = 0  // Highest priority
    ELSE IF task.type == "customer_bug":
        composite = MIN(composite, 1000)  // At least P1
    ELSE IF task.hasTag("urgent"):
        composite = composite / 2  // Double priority
        
    RETURN composite

FUNCTION getEpicPriority(task):
    // P0 = 0 (highest), P3 = 3 (lowest)
    priorityMap = {
        "P0": 0,
        "P1": 1,
        "P2": 2,
        "P3": 3
    }
    
    epic = task.getEpic()
    RETURN priorityMap[epic.priority] || 3

FUNCTION getTaskPriority(task):
    priorityMap = {
        "blocking": 0,
        "critical_path": 1,
        "parallel": 2,
        "optional": 3
    }
    
    RETURN priorityMap[task.priority] || 3

FUNCTION getTimeFactor(task):
    // Older tasks get slight priority boost
    ageInMinutes = (getCurrentTime() - task.createdAt) / 60000
    RETURN MIN(ageInMinutes, 99)
```

### Task Readiness Checks
```pseudocode
FUNCTION canExecuteTask(task):
    // Check all conditions for task execution
    checks = [
        checkDependencies(task),
        checkBlockers(task),
        checkResourceAvailability(task),
        checkRoleAvailability(task),
        checkPrerequisites(task)
    ]
    
    FOR check IN checks:
        IF NOT check:
            RETURN false
            
    RETURN true

FUNCTION checkDependencies(task):
    IF task.dependencies.length == 0:
        RETURN true
        
    FOR dep IN task.dependencies:
        depTask = taskIndex.get(dep)
        IF NOT depTask OR depTask.status != "completed":
            RETURN false
            
    RETURN true

FUNCTION checkBlockers(task):
    blockers = task.getBlockers()
    
    FOR blocker IN blockers:
        IF NOT blocker.isResolved():
            RETURN false
            
    RETURN true

FUNCTION checkResourceAvailability(task):
    // Check if required resources are available
    resources = task.requiredResources || []
    
    FOR resource IN resources:
        IF NOT isResourceAvailable(resource):
            RETURN false
            
    RETURN true

FUNCTION checkRoleAvailability(task):
    // In L3, all roles are always available
    IF getAutonomyLevel() == "L3":
        RETURN true
        
    // For other levels, check role availability
    role = task.assigned_to
    RETURN isRoleAvailable(role)
```

### Queue Operations
```pseudocode
FUNCTION removeTask(taskId):
    task = taskIndex.get(taskId)
    IF task:
        queue.remove(task)
        taskIndex.delete(taskId)
        executingTasks.delete(taskId)
        
FUNCTION updateTaskStatus(taskId, newStatus):
    task = taskIndex.get(taskId)
    IF task:
        task.status = newStatus
        task.lastUpdated = getCurrentTime()
        
        IF newStatus == "completed":
            removeTask(taskId)
            checkDependentTasks(taskId)
            
FUNCTION checkDependentTasks(completedTaskId):
    // Find tasks that depend on this one
    FOR task IN queue:
        IF task.dependencies.includes(completedTaskId):
            // Re-evaluate readiness
            IF canExecuteTask(task):
                task.status = "ready"
                logTaskUnblocked(task)
```

### Parallel Execution Support
```pseudocode
FUNCTION getParallelTasks(maxParallel = 5):
    parallelTasks = []
    availableTasks = getAvailableTasks(maxParallel * 2)
    
    // Group by execution context
    contextGroups = groupByContext(availableTasks)
    
    // Select tasks from different contexts for true parallelism
    FOR context IN contextGroups:
        IF parallelTasks.length < maxParallel:
            task = context.tasks[0]
            IF NOT hasConflict(task, parallelTasks):
                parallelTasks.append(task)
                
    RETURN parallelTasks

FUNCTION hasConflict(task, otherTasks):
    // Check for resource conflicts
    FOR other IN otherTasks:
        IF task.modifiesFiles.intersects(other.modifiesFiles):
            RETURN true
        IF task.assigned_to == other.assigned_to:
            RETURN true  // Same role conflict
            
    RETURN false
```

### Queue Monitoring
```pseudocode
FUNCTION startQueueMonitor():
    ASYNC WHILE true:
        wait(5000ms)  // Check every 5 seconds
        
        // Log queue statistics
        stats = {
            queueSize: queue.size(),
            executing: executingTasks.size(),
            blocked: countBlockedTasks(),
            ready: countReadyTasks()
        }
        
        logQueueStats(stats)
        
        // Check for queue issues
        IF stats.queueSize > 100:
            logWarning("Large queue size: " + stats.queueSize)
            
        IF stats.executing == 0 AND stats.ready > 0:
            logError("Tasks ready but none executing")
            triggerExecutionCheck()
```

### Task Filtering and Queries
```pseudocode
FUNCTION getTasksByPriority(priority):
    return queue.filter(task => task.priority == priority)
    
FUNCTION getTasksByStatus(status):
    tasks = []
    FOR task IN taskIndex.values():
        IF task.status == status:
            tasks.append(task)
    RETURN tasks
    
FUNCTION getBlockedTasks():
    return queue.filter(task => NOT canExecuteTask(task))
    
FUNCTION getTasksByRole(role):
    return queue.filter(task => task.assigned_to == role)
```

### Integration with Work Discovery
```pseudocode
FUNCTION integrateNewWork(workItems):
    FOR item IN workItems:
        IF item.type == "bug" OR item.type == "story":
            // Add all tasks from the work item
            FOR task IN item.tasks:
                addTask(task)
        ELSE IF item.type == "task":
            // Direct task addition
            addTask(item)
            
FUNCTION refreshQueue():
    // Re-evaluate all tasks in queue
    allTasks = queue.toArray()
    queue.clear()
    
    FOR task IN allTasks:
        task.compositePriority = calculateCompositePriority(task)
        queue.enqueue(task)
```

## Queue Persistence

### Save/Load Operations
```pseudocode
FUNCTION saveQueueState():
    state = {
        tasks: queue.toArray(),
        executing: Array.from(executingTasks),
        timestamp: getCurrentTime()
    }
    
    writeToFile("queue-state.json", state)
    
FUNCTION loadQueueState():
    IF fileExists("queue-state.json"):
        state = readFromFile("queue-state.json")
        
        // Rebuild queue
        FOR task IN state.tasks:
            queue.enqueue(task)
            taskIndex.set(task.id, task)
            
        // Restore executing set
        executingTasks = new Set(state.executing)
```

## Priority Examples

### Example Priority Calculations
```yaml
# P0 Security Bug - Blocking
epicPriority: 0 (P0)
taskPriority: 0 (blocking)
timeFactor: 10 (10 minutes old)
composite: 0*1000 + 0*100 + 10 = 10
final: 0 (security override)

# P1 Customer Bug - Critical Path
epicPriority: 1 (P1)
taskPriority: 1 (critical_path)
timeFactor: 30 (30 minutes old)
composite: 1*1000 + 1*100 + 30 = 1130

# P2 Feature - Parallel
epicPriority: 2 (P2)
taskPriority: 2 (parallel)
timeFactor: 60 (1 hour old)
composite: 2*1000 + 2*100 + 60 = 2260

# P3 Documentation - Optional
epicPriority: 3 (P3)
taskPriority: 3 (optional)
timeFactor: 99 (old task)
composite: 3*1000 + 3*100 + 99 = 3399
```

## Benefits

1. **Automatic Prioritization**: Tasks execute in optimal order
2. **Dependency Management**: Automatically unblocks dependent tasks
3. **Parallel Support**: Identifies non-conflicting parallel work
4. **Fair Scheduling**: Time factor prevents starvation
5. **Special Handling**: Security and customer issues prioritized