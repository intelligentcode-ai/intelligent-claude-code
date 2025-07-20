# Prioritize

Calculate task priority using the system priority formula with $ARGUMENTS.

## Behavior
Calculate numeric priority for tasks using the standardized priority formula
that considers epic priority, task type, age, and special escalation rules.
Supports priority-based execution ordering and queue management.

## Arguments
**Format:** "Task: TASK-ID | EpicPriority: P0|P1|P2|P3 | TaskType: blocking|critical_path|parallel|optional | Age: minutes | Special: security|customer|emergency"
**Example:** "Task: TASK-015 | EpicPriority: P1 | TaskType: critical_path | Age: 45 | Special: none"

## Core Actions
- Parse task priority components from $ARGUMENTS
- Apply priority formula calculation
- Check for special escalation rules
- Apply dynamic priority adjustments
- Calculate final numeric priority
- Return priority value with explanation
- Log priority calculation for audit

## Priority Formula

### Base Calculation
```
Numeric Priority = Epic Priority × 1000 + Task Type × 100 + Age in Minutes
```

### Component Values

#### Epic Priority (Base Level)
- **P0 (Critical)**: 0 → Highest priority
- **P1 (High)**: 1000
- **P2 (Medium)**: 2000
- **P3 (Low)**: 3000 → Lowest priority

#### Task Type (Within Epic Priority)
- **blocking**: 0 → Must complete before others start
- **critical_path**: 100 → On critical path, affects timeline
- **parallel**: 200 → Can run simultaneously
- **optional**: 300 → Can be skipped if needed

#### Age Factor (Anti-Starvation)
- **Age in Minutes**: Added to prevent task starvation
- **Maximum Age Bonus**: 999 (prevents age from changing priority level)
- **Purpose**: Ensures old tasks eventually get attention

## Special Escalation Rules

### Automatic Escalations
- **Security Issues**: Force to P0 (priority = 0)
- **Customer Escalations**: Reduce priority by 1000 (move up one level)
- **System Failures**: Force to P0 with emergency flag
- **Blocking Dependencies**: Escalate to critical_path if blocking others

### Emergency Override
- **Emergency Flag**: Jump to front of queue regardless of calculation
- **Business Critical**: Override normal priority calculation
- **Data Loss Risk**: Immediate highest priority

## Priority Examples

### Standard Priorities
```
# P1 Critical Path Task, 45 minutes old
P1 (1000) + critical_path (100) + 45 = 1145

# P0 Parallel Task, 30 minutes old
P0 (0) + parallel (200) + 30 = 230

# P2 Blocking Task, 120 minutes old
P2 (2000) + blocking (0) + 120 = 2120
```

### With Escalations
```
# Security Issue (Auto P0)
Original: P2 (2000) + parallel (200) + 60 = 2260
Escalated: P0 (0) + parallel (200) + 60 = 260

# Customer Escalation (+1 Priority Level)
Original: P3 (3000) + critical_path (100) + 90 = 3190
Escalated: P2 (2000) + critical_path (100) + 90 = 2190
```

## Dynamic Adjustments

### Dependency-Based
- **Blocking Others**: Escalate to critical_path type
- **Blocked By**: Inherit blocker's priority level
- **Chain Dependencies**: Propagate priority through dependency chain

### Capacity-Based
- **Specialist Overload**: Temporary priority boost
- **Resource Contention**: Adjust based on availability
- **Parallel Opportunities**: Boost for parallel-friendly tasks

### Context-Based
- **Release Pressure**: Boost for release-critical tasks
- **Technical Debt**: Lower priority unless blocking
- **Innovation Tasks**: Standard priority unless strategic

## Priority Validation

### Range Checking
- **Minimum Priority**: 0 (emergency/security)
- **Maximum Priority**: 3999 (P3 + optional + 699 age)
- **Valid Ranges**: Ensure priorities fall within expected bounds

### Consistency Checking
- **Epic Inheritance**: Tasks inherit appropriate epic priority
- **Type Consistency**: Task type aligns with work content
- **Escalation Logic**: Special rules applied correctly

## Output Format

### Priority Result
```yaml
numeric_priority: 1145
priority_level: P1
task_type: critical_path
age_bonus: 45
escalations: []
explanation: "P1 epic (1000) + critical_path (100) + 45 minutes age = 1145"
queue_position: 5
```

### With Escalations
```yaml
numeric_priority: 260
priority_level: P0
task_type: parallel
age_bonus: 60
escalations: ["security_escalation"]
explanation: "Security escalation: forced to P0. P0 (0) + parallel (200) + 60 minutes = 260"
queue_position: 2
```

## Integration
- Used by queue management for task ordering
- Referenced by work discovery for priority assignment
- Integrates with L3 continuous engine
- Supports manual priority calculation
- Connected to progress monitoring for priority tracking

## Quality Standards
- Consistent priority calculation across all components
- Clear explanation of priority determination
- Reliable escalation rule application
- Fast calculation for real-time use
- Audit trail for priority decisions