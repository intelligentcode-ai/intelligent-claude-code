# Discover Work

Discover new work opportunities and unblock existing work using $ARGUMENTS.

## Behavior
Proactively discover new work items, identify unblocked tasks, find follow-up
work from completed items, and generate missing work items. Supports L3
continuous execution by ensuring the work pipeline never runs dry.

## Arguments
**Format:** "Sources: bugs|stories|followups|unblocked|all | Mode: discovery|analysis|generation | Queue: true|false"
**Example:** "Sources: bugs,followups | Mode: discovery | Queue: true"

## Core Actions
- Parse discovery criteria from $ARGUMENTS
- Execute discovery algorithms for selected sources
- Analyze discovered work for execution readiness
- Generate missing work items when gaps identified
- Unblock tasks when dependencies are resolved
- Queue discovered work if Queue=true
- Report discovery results with actionable insights
- Store discovery patterns for future optimization

## Discovery Sources

### Bug Discovery
- **Scan Pattern**: `epics/**/bugs/*/bug.yaml`
- **Status Filter**: PLANNED, IN_PROGRESS
- **Phase Filter**: PLAN, EXECUTE phases only
- **Readiness Check**: Dependencies resolved, roles assigned
- **Queue Criteria**: Ready tasks without blockers

### Story Discovery
- **Scan Pattern**: `epics/**/stories/*/story.yaml`
- **Status Filter**: Active stories needing tasks
- **Phase Filter**: task_decomposition, EXECUTE phases
- **Task Analysis**: Stories with incomplete task breakdown
- **Planning Trigger**: Stories needing icc-plan-tasks

### Follow-Up Discovery
- **Review Analysis**: Completed reviews with unaddressed issues
- **Error Analysis**: Recent errors needing fix tasks
- **Debt Analysis**: Technical debt accumulation
- **Quality Analysis**: Quality issues needing attention

### Unblocked Task Discovery
- **Dependency Resolution**: Check if blocking tasks completed
- **Resource Availability**: Previously unavailable resources now ready
- **Approval Updates**: Recently approved tasks
- **External Dependencies**: External blockers resolved

## Discovery Algorithms

### Bug Discovery Algorithm
```yaml
for each epic_directory:
  scan bugs/ subdirectory
  for each bug.yaml:
    parse status and phase
    if status in [PLANNED, IN_PROGRESS]:
      if phase == PLAN:
        check if tasks exist
        if no tasks: add to planning_needed
      if phase == EXECUTE:
        check task readiness
        add ready tasks to execution_queue
```

### Dependency Unblocking
```yaml
for each blocked_task:
  check dependencies status
  if all dependencies COMPLETED:
    remove blockers
    calculate new priority
    add to ready_queue
    update task status to PLANNED
```

### Follow-Up Generation
```yaml
for each completed_review:
  parse review findings
  if unaddressed_issues:
    generate fix_task
    assign to original implementer
    set priority based on severity
    link to original work item
```

## Work Generation

### Missing Task Generation
- **Story Analysis**: Stories without tasks
- **Task Patterns**: Standard task types for work item types
- **Role Assignment**: Appropriate specialists for generated tasks
- **Validation**: Generated tasks go through validation chain

### Fix Task Generation
- **Error Analysis**: Recent errors and failures
- **Review Issues**: Unaddressed review findings
- **Quality Issues**: Code quality violations
- **Security Issues**: Security scan findings

### Enhancement Opportunities
- **Performance Issues**: Performance bottlenecks identified
- **User Experience**: UX improvement opportunities
- **Technical Debt**: Refactoring opportunities
- **Documentation Gaps**: Missing or outdated documentation

## Discovery Results

### Discovered Work Items
```yaml
discovery_results:
  timestamp: 2025-01-15T10:30:00Z
  sources: [bugs, followups]
  mode: discovery
  
  bugs_discovered:
    ready_for_execution:
      - BUG-015: "Authentication token expiry"
        tasks_ready: 2
        estimated_effort: 4h
        priority: P1
        
    planning_needed:
      - BUG-018: "Memory leak in API service"
        needs: task_decomposition
        assigned_architect: @System-Architect
        
  followups_generated:
    review_issues:
      - TASK-051: "Fix security vulnerability from review"
        parent: STORY-008
        severity: HIGH
        assigned: @Security-Engineer
        
    error_fixes:
      - TASK-052: "Handle null pointer exception"
        error_source: TASK-045
        frequency: 3_occurrences
        assigned: @Developer
        
  unblocked_tasks:
    - TASK-048: "Integration testing"
      previously_blocked_by: TASK-045
      now_ready: true
      priority: P2
      
  generation_summary:
    total_discovered: 12
    ready_for_queue: 8
    planning_needed: 3
    generated_tasks: 4
```

## Queue Integration

### Automatic Queuing
- Ready tasks automatically added to execution queue
- Priority calculated using standard formula
- Conflict detection performed
- Resource availability validated

### Batch Processing
- Multiple discovered items processed together
- Optimal queue ordering maintained
- Duplicate detection and removal
- Capacity-aware queuing

## Learning Integration

### Discovery Patterns
- **Success Patterns**: Effective discovery strategies
- **Common Sources**: Most productive discovery sources
- **Timing Patterns**: Optimal discovery frequency
- **Queue Optimization**: Best queuing strategies

### Continuous Improvement
- **Discovery Accuracy**: Improve readiness assessment
- **Generation Quality**: Better task generation
- **Priority Accuracy**: More accurate priority assignment
- **Throughput Optimization**: Maximize work pipeline flow

## L3 Integration

### Continuous Discovery
- **Automatic Scanning**: Regular discovery cycles
- **Real-Time Unblocking**: Immediate dependency resolution
- **Smart Generation**: AI-driven work item creation
- **Adaptive Prioritization**: Dynamic priority adjustment

### Performance Optimization
- **Incremental Discovery**: Only scan changes
- **Predictive Analysis**: Anticipate future work needs
- **Resource Optimization**: Optimal specialist utilization
- **Pipeline Management**: Maintain continuous work flow

## Integration
- Used by work discovery engine for continuous operation
- Referenced by L3 continuous engine for work pipeline
- Integrates with queue management for task addition
- Supports manual work discovery sessions
- Connected to learning system for pattern optimization

## Quality Standards
- Accurate work readiness assessment
- High-quality generated work items
- Reliable dependency unblocking
- Efficient discovery algorithms
- Comprehensive work pipeline management