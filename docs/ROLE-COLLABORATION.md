# Role Collaboration Patterns

## Overview
This document describes the role collaboration mechanisms implemented in the intelligent-claude-code virtual team system.

## Core Collaboration Mechanisms

### 1. Role Handoff Protocol
The system implements a HandoffPackage structure to preserve context during role transitions:

```pseudocode
HandoffPackage:
  fromRole: string
  toRole: string
  taskContext: Context
  workingFiles: File[]
  decisions: Decision[]
  progress: ProgressState
  learnings: Learning[]
  timestamp: datetime
```

#### Usage
When a role needs to hand off work to another specialist:
- Current role state is preserved in HandoffPackage
- Target role receives full context including decisions and progress
- Seamless continuation of work without context loss

### 2. Multi-Role Task Assignment
Tasks requiring multiple specialists can be assigned to multiple roles simultaneously:

```pseudocode
MultiRoleCoordination:
  primaryRole: Role
  supportingRoles: Role[]
  sharedContext: SharedContext
  coordinationMethod: string
```

#### Coordination Methods
- **Sequential**: Roles work in order
- **Parallel**: Roles work simultaneously
- **Collaborative**: Roles share context in real-time

### 3. Shared Context Management
The SharedContextManager enables real-time collaboration between roles:

```pseudocode
SharedContext:
  taskId: string
  participatingRoles: Role[]
  sharedData: Map<string, any>
  decisions: Decision[]
  progress: ProgressTracker
  collaborationMode: string
```

#### Features
- Real-time context updates
- Decision sharing across roles
- Progress synchronization
- Collaborative data management

### 4. Role State Synchronization
Ensures all participating roles maintain consistent state:
- Automatic notification of context updates
- Decision propagation to all roles
- Progress tracking synchronization
- Shared learning capture

## Implementation Examples

### Example 1: Developer to QA Handoff
```yaml
Task: Implement user authentication
Handoff:
  from: @Developer
  to: @QA-Engineer
  context:
    - Implementation details
    - Test scenarios identified
    - Edge cases considered
    - Technical decisions made
```

### Example 2: Multi-Role Security Review
```yaml
Task: Security audit for authentication system
Roles:
  primary: @Security-Engineer
  supporting: [@Developer, @System-Engineer]
coordination: collaborative
shared_context:
  - Security findings
  - Implementation constraints
  - Infrastructure considerations
```

### Example 3: Collaborative Architecture Design
```yaml
Task: Design microservices architecture
Roles:
  - @AI-Architect
  - @System-Engineer
  - @DevOps-Engineer
collaboration_mode: real-time
shared_decisions:
  - Service boundaries
  - Communication patterns
  - Deployment strategy
```

## Best Practices

### 1. Context Preservation
- Always include all relevant decisions in handoff
- Document technical constraints discovered
- Share learning outcomes

### 2. Multi-Role Coordination
- Define clear primary/supporting role responsibilities
- Use appropriate coordination method for task type
- Maintain shared context throughout execution

### 3. Decision Making
- Record all significant decisions in shared context
- Notify all participating roles of decisions
- Maintain decision audit trail

### 4. Progress Tracking
- Update progress in shared context
- Synchronize progress across all roles
- Maintain visibility for all participants

## Integration with Workflow

### Assignment Files
Role collaboration is triggered through assignment files:
```yaml
task:
  id: TASK-001
  assigned_to: ["@Developer", "@QA-Engineer"]
  collaboration_mode: "parallel"
```

### Workflow Phases
- **Planning**: Multi-role participation in design
- **Execution**: Collaborative implementation
- **Review**: Joint review by multiple specialists
- **Completion**: Shared knowledge capture

## Troubleshooting

### Common Issues
1. **Context Loss**: Ensure HandoffPackage includes all relevant data
2. **Decision Conflicts**: Use shared context for decision coordination
3. **Progress Mismatch**: Verify role synchronization is active
4. **Communication Gaps**: Check role notification mechanisms

### Resolution Steps
1. Verify shared context is created for multi-role tasks
2. Ensure all roles have access to shared context
3. Check role synchronization logs
4. Validate handoff package completeness

---
*Role collaboration patterns for intelligent-claude-code virtual team system*