# Enhanced Planning Mode System Guide

## Table of Contents

1. [Overview](#overview)
2. [User Guide](#user-guide)
3. [Assignment File Format Reference](#assignment-file-format-reference)
4. [Phase Workflow Explanation](#phase-workflow-explanation)
5. [Integration Guide](#integration-guide)
6. [Migration Guide](#migration-guide)
7. [Examples and Use Cases](#examples-and-use-cases)

## Overview

The Enhanced Planning Mode System provides structured project planning with phase-based workflows, intelligent task decomposition, and progress tracking. It replaces the previous behavioral activation system with a more focused, deterministic approach to project management.

### Key Features

- **Phase-Based Workflow**: Projects progress through Analysis, Design, Implementation, and Validation phases
- **Smart Task Decomposition**: Automatic breakdown of complex requirements into actionable tasks
- **Progress Tracking**: Real-time visibility into task status and team performance
- **Future-Ready Integration**: Designed for seamless JIRA and CI/CD pipeline integration

## User Guide

### Getting Started

The enhanced planning mode is activated automatically when Claude Code detects planning-related commands or project initialization requests.

### Basic Commands

#### 1. Start a New Project
```
"Let's plan a new authentication system"
"I need to build a REST API for user management"
"Help me create a data processing pipeline"
```

#### 2. Review Current Status
```
"Show me the current project status"
"What tasks are in progress?"
"Display the phase summary"
```

#### 3. Progress to Next Phase
```
"Move to the design phase"
"Complete analysis and start design"
"Transition to implementation"
```

#### 4. Update Task Status
```
"Mark authentication task as complete"
"Update API design status to in-progress"
"Complete all validation tasks"
```

### Command Patterns

The system recognizes natural language patterns for planning activities:

- **Planning Triggers**: "plan", "design", "architect", "build", "create"
- **Status Queries**: "status", "progress", "show", "display", "what's"
- **Phase Transitions**: "move to", "start", "begin", "complete", "finish"
- **Task Updates**: "mark", "update", "complete", "finish", "done"

## Assignment File Format Reference

### Structure Overview

Assignment files are YAML-formatted documents that capture project state, phases, and task allocations.

### File Naming Convention
```
assignments/[project-name]-assignments.yaml
```

### Schema Definition

```yaml
project:
  name: string              # Project identifier
  description: string       # Brief project description
  created: ISO-8601         # Creation timestamp
  updated: ISO-8601         # Last update timestamp

phases:
  - name: string           # Phase name (Analysis, Design, Implementation, Validation)
    status: enum           # Status: pending, in-progress, completed
    started: ISO-8601      # Phase start time (optional)
    completed: ISO-8601    # Phase completion time (optional)
    
    deliverables:
      - name: string       # Deliverable identifier
        description: string # Detailed description
        status: enum       # Status: pending, in-progress, completed
        
        tasks:
          - id: string     # Unique task identifier (e.g., TASK-001)
            name: string   # Task name
            role: string   # Assigned role (e.g., @Architect, @Developer)
            status: enum   # Status: pending, assigned, in-progress, completed
            created: ISO-8601
            updated: ISO-8601
            completed: ISO-8601  # Completion timestamp (optional)
            dependencies: [string]  # List of task IDs this depends on
            
progress:
  total_tasks: integer
  completed_tasks: integer
  in_progress_tasks: integer
  pending_tasks: integer
  completion_percentage: float
```

### Example Assignment File

```yaml
project:
  name: user-authentication
  description: Multi-factor authentication system with OAuth2 integration
  created: 2025-01-15T10:30:00Z
  updated: 2025-01-15T14:45:00Z

phases:
  - name: Analysis
    status: completed
    started: 2025-01-15T10:30:00Z
    completed: 2025-01-15T11:45:00Z
    
    deliverables:
      - name: requirements-specification
        description: Comprehensive requirements documentation
        status: completed
        
        tasks:
          - id: TASK-001
            name: Gather authentication requirements
            role: "@Requirements-Engineer"
            status: completed
            created: 2025-01-15T10:30:00Z
            completed: 2025-01-15T11:00:00Z
            
  - name: Design
    status: in-progress
    started: 2025-01-15T11:45:00Z
    
    deliverables:
      - name: system-architecture
        description: Technical architecture and API design
        status: in-progress
        
        tasks:
          - id: TASK-004
            name: Design authentication flow
            role: "@Architect"
            status: in-progress
            created: 2025-01-15T11:45:00Z
            dependencies: ["TASK-001"]

progress:
  total_tasks: 12
  completed_tasks: 3
  in_progress_tasks: 2
  pending_tasks: 7
  completion_percentage: 25.0
```

## Phase Workflow Explanation

### Phase Overview

The enhanced planning system follows a structured four-phase workflow:

```
Analysis → Design → Implementation → Validation
```

### 1. Analysis Phase

**Purpose**: Understand requirements and define project scope

**Key Activities**:
- Requirements gathering and documentation
- Stakeholder analysis
- Constraint identification
- Success criteria definition

**Typical Deliverables**:
- Requirements specification
- Use case documentation
- Constraint analysis
- Stakeholder matrix

**Exit Criteria**:
- All requirements documented
- Stakeholder approval obtained
- Success criteria defined
- Constraints identified

### 2. Design Phase

**Purpose**: Create technical architecture and detailed designs

**Key Activities**:
- System architecture design
- API specification
- Database schema design
- Security architecture
- Integration planning

**Typical Deliverables**:
- System architecture document
- API specifications
- Database designs
- Security design
- Integration architecture

**Exit Criteria**:
- Architecture approved
- All components designed
- Integration points defined
- Security review completed

### 3. Implementation Phase

**Purpose**: Build the system according to designs

**Key Activities**:
- Code development
- Unit testing
- Integration development
- Documentation creation
- Code reviews

**Typical Deliverables**:
- Source code
- Unit tests
- API implementations
- Configuration files
- Technical documentation

**Exit Criteria**:
- All features implemented
- Unit tests passing
- Code reviews completed
- Documentation updated

### 4. Validation Phase

**Purpose**: Ensure system meets requirements and quality standards

**Key Activities**:
- Integration testing
- Performance testing
- Security validation
- User acceptance testing
- Deployment preparation

**Typical Deliverables**:
- Test results
- Performance reports
- Security audit results
- Deployment guide
- Release notes

**Exit Criteria**:
- All tests passing
- Performance targets met
- Security validated
- Deployment ready

### Phase Transitions

Phases transition automatically when all deliverables are completed, or manually through user commands:

```
Current Phase Status → Review Completion → Transition Decision → Next Phase Activation
```

## Integration Guide

### Future Integration Points

The enhanced planning system is designed for seamless integration with external tools:

### 1. JIRA Integration

**Connection Points**:
```yaml
integrations:
  jira:
    enabled: false  # Future capability
    config:
      url: https://company.atlassian.net
      project_key: PROJ
      issue_type_mapping:
        task: Task
        deliverable: Epic
        phase: Version
```

**Planned Features**:
- Automatic JIRA issue creation from tasks
- Bi-directional status synchronization
- Sprint planning integration
- Burndown chart generation

### 2. CI/CD Pipeline Integration

**Connection Points**:
```yaml
integrations:
  cicd:
    enabled: false  # Future capability
    config:
      pipeline: GitLab CI
      triggers:
        implementation_complete: build
        validation_phase: deploy-staging
        validation_complete: deploy-production
```

**Planned Features**:
- Automatic pipeline triggers on phase completion
- Build status integration
- Deployment tracking
- Rollback coordination

### 3. API Endpoints (Future)

```yaml
api:
  endpoints:
    - GET /api/projects/{id}/status
    - POST /api/projects/{id}/phases/transition
    - PUT /api/tasks/{id}/status
    - GET /api/projects/{id}/export/jira
```

### Integration Preparation

To prepare for future integrations:

1. **Maintain Clean Data**: Keep assignment files well-structured
2. **Use Standard IDs**: Follow TASK-XXX naming convention
3. **Document Dependencies**: Clearly define task relationships
4. **Track Timestamps**: Record all state changes with timestamps

## Migration Guide

### From Behavioral System to Enhanced Planning

The enhanced planning system replaces the complex behavioral activation patterns with a streamlined, phase-based approach.

### Key Differences

| Behavioral System | Enhanced Planning |
|------------------|-------------------|
| 300+ behavior files | Single planning engine |
| Complex role interactions | Clear task assignments |
| Implicit workflows | Explicit phases |
| Scattered state | Centralized assignments |
| Behavioral activation | Direct task execution |

### Migration Steps

#### 1. Project Analysis
Review existing behavioral patterns and extract:
- Core project requirements
- Key deliverables
- Role responsibilities
- Task dependencies

#### 2. Create Initial Assignment File
Transform behavioral patterns into structured tasks:

```yaml
# Before (Behavioral)
@PM: Initialize project with memory-first approach
@Architect: Consult on system design with ultra-experienced mindset
@Developer: Implement with quality gates

# After (Enhanced Planning)
phases:
  - name: Analysis
    deliverables:
      - name: requirements-specification
        tasks:
          - id: TASK-001
            name: Define system requirements
            role: "@Requirements-Engineer"
```

#### 3. Phase Mapping
Map behavioral workflows to phases:

- **Memory-first patterns** → Analysis phase tasks
- **Architecture consultation** → Design phase deliverables
- **Implementation with quality gates** → Implementation and Validation phases

#### 4. Simplify Role Interactions
Replace complex behavioral chains with direct task assignments:

```yaml
# Instead of behavioral chains:
# icc:memory-first → icc:think-sequential → icc:parallel-delegate → icc:quality-gates

# Use simple task structure:
tasks:
  - id: TASK-001
    name: Implement authentication module
    role: "@Developer"
    dependencies: ["DESIGN-001"]
```

#### 5. Consolidate Documentation
Move from scattered behavioral documentation to centralized planning docs:

1. Extract relevant information from `behaviors/*.md`
2. Create structured documentation in `docs/`
3. Update assignment files with clear descriptions
4. Remove obsolete behavioral activation files

### Migration Checklist

- [ ] Identify active projects using behavioral system
- [ ] Extract requirements and tasks from behavioral patterns
- [ ] Create assignment files for each project
- [ ] Map behavioral workflows to phases
- [ ] Update role assignments to use direct task allocation
- [ ] Test phase transitions and task updates
- [ ] Archive behavioral activation files
- [ ] Update team documentation

## Examples and Use Cases

### Example 1: Starting a New API Project

**User Input**:
```
"I need to build a REST API for managing customer orders"
```

**System Response**:
1. Creates `assignments/order-api-assignments.yaml`
2. Initiates Analysis phase
3. Generates initial tasks:
   - Requirements gathering
   - API endpoint definition
   - Data model analysis
   - Integration requirements

**Assignment File Created**:
```yaml
project:
  name: order-api
  description: REST API for customer order management
  created: 2025-01-15T15:00:00Z

phases:
  - name: Analysis
    status: in-progress
    deliverables:
      - name: api-requirements
        tasks:
          - id: TASK-001
            name: Define order management requirements
            role: "@Requirements-Engineer"
            status: assigned
```

### Example 2: Transitioning Phases

**User Input**:
```
"Complete the analysis phase and move to design"
```

**System Actions**:
1. Validates all Analysis tasks are completed
2. Updates phase status to completed
3. Initiates Design phase
4. Creates design deliverables and tasks
5. Assigns tasks to appropriate roles

### Example 3: Complex Project with Dependencies

**Project**: E-commerce Platform

```yaml
phases:
  - name: Implementation
    deliverables:
      - name: payment-system
        tasks:
          - id: IMPL-001
            name: Implement payment gateway integration
            role: "@Developer"
            dependencies: ["DESIGN-003", "DESIGN-004"]
            
          - id: IMPL-002
            name: Create payment security module
            role: "@Security-Engineer"
            dependencies: ["IMPL-001"]
            
          - id: IMPL-003
            name: Implement payment testing framework
            role: "@QA-Engineer"
            dependencies: ["IMPL-001", "IMPL-002"]
```

### Example 4: Progress Tracking

**User Input**:
```
"Show me the current project status"
```

**System Output**:
```
Project: E-commerce Platform
Current Phase: Implementation (In Progress)

Progress Summary:
- Total Tasks: 24
- Completed: 12 (50%)
- In Progress: 5 (21%)
- Pending: 7 (29%)

Active Tasks:
- IMPL-001: Payment gateway integration (@Developer) - In Progress
- IMPL-004: Shopping cart implementation (@Developer) - In Progress
- IMPL-007: Security audit preparation (@Security-Engineer) - In Progress

Next Milestones:
- Complete payment system: 3 tasks remaining
- Start validation phase: Pending 7 implementation tasks
```

### Example 5: JIRA Export Format (Future)

When JIRA integration is available, the system will generate export-ready data:

```json
{
  "issues": [
    {
      "key": "PROJ-001",
      "summary": "Implement payment gateway integration",
      "issueType": "Task",
      "status": "In Progress",
      "assignee": "developer-team",
      "parent": "PROJ-PAYMENT",
      "customFields": {
        "phase": "Implementation",
        "taskId": "IMPL-001"
      }
    }
  ]
}
```

## Best Practices

### 1. Task Naming
- Use clear, action-oriented names
- Include the component or feature
- Avoid technical jargon in task names

### 2. Dependency Management
- Define dependencies at task creation
- Avoid circular dependencies
- Document dependency rationale

### 3. Phase Progression
- Complete all tasks before phase transition
- Review deliverables for completeness
- Document lessons learned

### 4. Role Assignment
- Match tasks to role expertise
- Consider workload distribution
- Plan for role availability

### 5. Progress Monitoring
- Review status regularly
- Update task progress promptly
- Identify and address blockers

## Troubleshooting

### Common Issues

**1. Phase Won't Transition**
- Check all deliverables are completed
- Verify no tasks are stuck in progress
- Review dependencies

**2. Task Assignment Conflicts**
- Ensure role is available
- Check for dependency blocks
- Verify role expertise matches task

**3. Progress Calculation Errors**
- Validate assignment file structure
- Check for duplicate task IDs
- Ensure status values are valid

## Conclusion

The Enhanced Planning Mode System provides a structured, efficient approach to project planning and execution. By following the phase-based workflow and maintaining clean assignment files, teams can effectively manage complex projects while preparing for future tool integrations.

For additional support or feature requests, please refer to the project documentation or submit an issue in the project repository.