# Priority System

## Overview
Proper prioritization ensures critical work happens first, not last. Priority flows from Epic → Story/Bug → Task.

## Priority Levels

### Epic Priority
- **Strategic**: Business-critical, revenue-impacting
- **High**: Important features, user-facing
- **Medium**: Enhancements, optimizations
- **Low**: Nice-to-have, future considerations

### Story/Bug Priority
- **P0**: Critical - Drop everything else
- **P1**: High - Complete within sprint
- **P2**: Medium - Schedule normally
- **P3**: Low - When capacity allows

### Task Priority (Within Story)
- **Blocking**: Must complete before others can start
- **Critical Path**: On the critical path to story completion
- **Parallel**: Can be done anytime
- **Optional**: Nice to have if time permits

## Priority Inheritance
```yaml
epic:
  priority: "strategic"
  stories:
    - id: "STORY-001"
      priority: "P0"  # Inherits urgency from epic
      tasks:
        - id: "TASK-001"  
          priority: "blocking"  # Must be done first
        - id: "TASK-002"
          priority: "critical_path"  # Required for completion
        - id: "TASK-003"
          priority: "parallel"  # Can be done anytime
```

## Execution Order

### Story Level
```
1. P0 stories first (critical/blocking)
2. P1 stories next (high priority)
3. P2 stories (normal workflow)
4. P3 stories (if capacity)
```

### Task Level (Within Story)
```
1. Blocking tasks first
2. Critical path tasks
3. Parallel tasks (can execute simultaneously)
4. Optional tasks last
```

## Bug Severity → Priority Mapping
```yaml
bug_priority_matrix:
  CRITICAL:
    data_loss: "P0"
    security_breach: "P0"
    complete_outage: "P0"
  HIGH:
    major_feature_broken: "P1"
    performance_degraded: "P1"
    affects_many_users: "P1"
  MEDIUM:
    minor_feature_broken: "P2"
    workaround_available: "P2"
    affects_some_users: "P2"
  LOW:
    cosmetic_issue: "P3"
    enhancement_request: "P3"
    affects_few_users: "P3"
```

## Dynamic Priority Adjustment

### Escalation Triggers
- Blocked tasks automatically escalate
- Customer-reported bugs increase priority
- Security issues always P0
- Data loss always P0

### De-escalation
- If workaround found: P1 → P2
- If affects fewer users: P2 → P3
- If not on critical path: Adjust down

## Priority in Assignment Files

### Story Example
```yaml
story:
  id: "STORY-001"
  priority: "P1"  # High priority story
  escalation_reason: "Customer commitment"
  
tasks:
  - id: "TASK-001"
    priority: "blocking"
    reason: "Others depend on this"
    
  - id: "TASK-002"
    priority: "critical_path"
    dependencies: ["TASK-001"]
    
  - id: "TASK-003"
    priority: "parallel"
    can_start: "anytime"
```

### Command Integration
```bash
# List by priority
icc:story-status --sort-by-priority

# Shows:
P0 Stories (Critical):
  - STORY-005: Security vulnerability fix
  
P1 Stories (High):
  - STORY-001: User authentication
  - STORY-003: Performance fix
  
P2 Stories (Medium):
  - STORY-002: UI enhancements
```

## PM Workflow with Priorities

1. **Epic Planning**: Set strategic priority
2. **Story Creation**: Assign P0-P3 based on impact
3. **Task Breakdown**: Identify blocking/critical tasks
4. **Daily Review**: Adjust priorities as needed
5. **Resource Allocation**: Highest priority first

## Specialist Workflow

1. **Check Assigned Tasks**: Sort by priority
2. **Execute Blocking First**: Unblock others
3. **Critical Path Next**: Keep story moving
4. **Parallel When Able**: Optimize throughput

## Anti-Patterns to Avoid

❌ **Last In, First Out**: New work pushing out critical tasks
❌ **Everything P0**: Dilutes real priorities  
❌ **Ignoring Dependencies**: Working on parallel tasks while blocking tasks wait
❌ **Static Priorities**: Never reviewing or adjusting

✅ **Correct Pattern**: Regular priority review, blocking tasks first, critical path focus