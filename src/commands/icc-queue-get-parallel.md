# Queue Get Parallel

Get non-conflicting tasks for parallel execution using $ARGUMENTS.

## Behavior
Select up to 5 tasks from the priority queue that can execute simultaneously
without conflicts. Optimizes for maximum throughput while maintaining
quality standards and avoiding resource conflicts.

## Arguments
**Format:** "MaxTasks: 1-5 | SpecialistFilter: @Role1,@Role2 | ConflictCheck: strict|standard | Priority: P0|P1|P2|P3"
**Example:** "MaxTasks: 3 | SpecialistFilter: @AI-Engineer,@Developer | ConflictCheck: strict | Priority: P1"

## Core Actions
- Parse selection criteria from $ARGUMENTS
- Load current priority queue sorted by numeric priority
- Filter tasks by specialist availability and priority level
- Perform comprehensive conflict detection
- Select non-conflicting task set up to MaxTasks
- Validate resource availability for selected tasks
- Mark selected tasks as EXECUTING
- Return task set with execution metadata
- Update queue status for monitoring

## Conflict Detection

### File-Level Conflicts
- **Same File Modifications**: Tasks modifying same files
- **Directory Conflicts**: Overlapping directory changes
- **Configuration Files**: Simultaneous config changes
- **Shared Resources**: Common file dependencies

### API-Level Conflicts
- **Same Endpoints**: Multiple tasks modifying same API endpoints
- **Breaking Changes**: API changes that affect other work
- **Schema Dependencies**: Related API schema modifications
- **Integration Points**: Shared integration interfaces

### Database Conflicts
- **Schema Changes**: Database schema modifications
- **Migration Dependencies**: Sequential migration requirements
- **Data Model**: Related data model changes
- **Performance Impact**: Heavy database operations

### System-Level Conflicts
- **Environment Changes**: System configuration modifications
- **Deployment Dependencies**: Infrastructure changes
- **Security Changes**: Authentication/authorization modifications
- **Performance Impact**: Resource-intensive operations

## Selection Algorithm

### Priority-First Selection
1. **Sort Queue**: Order by numeric priority (ascending = higher priority)
2. **Filter Eligible**: Remove blocked/executing tasks
3. **Check Dependencies**: Ensure all dependencies completed
4. **Validate Resources**: Confirm required resources available
5. **Conflict Analysis**: Detect conflicts with each task addition
6. **Optimize Set**: Select best non-conflicting combination

### Conflict Matrix
```yaml
# Example conflict detection
TASK-015: # AI behavioral patterns
  files: ["src/behaviors/", "src/modes/"]
  apis: []
  database: []
  conflicts_with: [TASK-018] # Same directory

TASK-016: # Frontend UI updates
  files: ["src/ui/", "public/"]
  apis: ["user-api"]
  database: []
  conflicts_with: [TASK-020] # Same API

TASK-017: # Database optimization
  files: ["migrations/"]
  apis: []
  database: ["schema_changes"]
  conflicts_with: [TASK-019] # Same schema
```

## Specialist Filtering

### Available Specialists
- Check specialist capacity and availability
- Consider current workload and assignments
- Validate role capability match for tasks
- Ensure balanced workload distribution

### Specialist Optimization
- **Workload Balancing**: Distribute tasks across available specialists
- **Expertise Matching**: Prefer tasks aligned with specialist strengths
- **Context Switching**: Minimize role switching overhead
- **Learning Opportunities**: Balance routine and growth tasks

## Resource Validation

### Required Resources
- **Development Environment**: IDE, tools, access
- **External Services**: APIs, databases, third-party services
- **Test Environment**: Testing infrastructure, test data
- **Documentation**: Required specifications, references

### Capacity Checking
- **System Resources**: CPU, memory, disk space
- **Network Bandwidth**: External API calls, file transfers
- **Specialist Time**: Available working hours, capacity
- **Shared Resources**: Databases, test environments

## Parallel Task Set

### Selection Result
```yaml
parallel_tasks:
  - task_id: TASK-015
    priority: 1145
    specialist: @AI-Engineer
    estimated_duration: 120
    resources: ["development_env", "memory_access"]
    
  - task_id: TASK-021
    priority: 1230
    specialist: @Frontend-Developer
    estimated_duration: 90
    resources: ["development_env", "ui_tools"]
    
  - task_id: TASK-033
    priority: 1340
    specialist: @QA-Engineer
    estimated_duration: 60
    resources: ["test_env", "automation_tools"]

total_tasks: 3
max_duration: 120
conflicts_detected: 0
queue_remaining: 12
```

## Quality Standards

### Execution Quality
- **No Resource Conflicts**: Guaranteed non-conflicting execution
- **Optimal Throughput**: Maximum tasks within capacity
- **Quality Maintenance**: No compromise on work quality
- **Risk Mitigation**: Safe parallel execution

### Monitoring Integration
- **Progress Tracking**: Real-time execution monitoring
- **Conflict Prevention**: Ongoing conflict detection
- **Performance Metrics**: Throughput and efficiency tracking
- **Error Handling**: Quick issue detection and resolution

## L3 Integration

### Autonomous Execution
- **Automatic Selection**: Continuous task selection
- **Dynamic Adjustment**: Real-time capacity adjustment
- **Smart Optimization**: Learning-based selection improvement
- **Error Recovery**: Automatic conflict resolution

### Continuous Improvement
- **Selection Patterns**: Learn optimal task combinations
- **Conflict Prediction**: Improve conflict detection accuracy
- **Specialist Optimization**: Better specialist utilization
- **Throughput Enhancement**: Maximize delivery velocity

## Integration
- Used by L3 continuous engine for task execution
- Referenced by task queue manager for scheduling
- Integrates with progress monitoring systems
- Supports manual parallel task selection
- Connected to learning system for optimization patterns

## Error Handling
- **No Available Tasks**: Queue empty or all blocked
- **All Tasks Conflict**: Sequential execution required
- **Resource Unavailable**: Defer until resources available
- **Specialist Overload**: Reduce parallel task count
- **System Capacity**: Respect system resource limits