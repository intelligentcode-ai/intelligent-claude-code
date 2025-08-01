# Role Switching Guide

This guide explains how role switching works in the intelligent-claude-code virtual team system.

## Overview

Role switching enables the system to adopt different specialized personas based on task requirements. When a role is assigned using @-notation, the system activates that role's expertise, behavioral patterns, and decision-making approach.

## How Role Switching Works

### 1. Role Detection
The system continuously monitors for role assignments using various patterns:

```markdown
# Direct assignment
@Developer implement the authentication system

# Task assignment
assigned_to: @Security-Engineer

# Role communication
@PM (P:10.5, Q:8.0): Starting sprint planning

# Handoff patterns
Handing off to @QA-Engineer for testing
```

### 2. Role Activation
When a role is detected, the system:
1. Saves the current role state (if any)
2. Loads the new role's profile
3. Activates role-specific expertise and behavioral patterns
4. Switches decision-making context to the new role

### 3. Behavioral Changes
Each role brings specific changes:

- **Communication Style**: Adapts to role-appropriate language
- **Decision Making**: Uses role-specific expertise and priorities
- **Tool Usage**: Employs tools relevant to the role
- **Constraints**: Respects role-specific limitations (e.g., PM cannot edit code)

## Core Roles

The system includes 14 core roles, each with specific capabilities:

### Management & Coordination
- **@PM**: Project coordination, task delegation, strategic decisions
- **@Architect**: System design, technology choices, architecture reviews
- **@Requirements-Engineer**: Requirements analysis, documentation, validation

### Implementation
- **@Developer**: General software development and coding
- **@AI-Engineer**: AI/ML systems and agentic development
- **@Database-Engineer**: Database design and optimization
- **@Web-Designer**: UI/UX design and frontend development

### Operations & Quality
- **@System-Engineer**: Infrastructure and system operations
- **@DevOps-Engineer**: CI/CD pipelines and deployment
- **@Security-Engineer**: Security reviews and compliance
- **@QA-Engineer**: Quality assurance and testing strategy

### Testing
- **@Frontend-Tester**: UI testing and validation
- **@Backend-Tester**: API and backend testing
- **@User-Role**: End-to-end browser testing (Puppeteer)

## Dynamic Specialists

Beyond core roles, the system can create unlimited dynamic specialists:

```markdown
# Technology-specific specialists
@React-Developer - React.js expertise
@Kubernetes-Expert - K8s deployment specialist
@GraphQL-Engineer - GraphQL API development

# Domain-specific specialists
@Payment-Processing-Expert
@Real-Time-Systems-Engineer
@Blockchain-Developer
```

Dynamic specialists are created automatically when:
- A task requires expertise not covered by core roles
- Capability match is <70% for existing roles
- Specific technology or domain knowledge is needed

## Usage Examples

### Basic Role Assignment
```markdown
@Developer implement user authentication feature
# System becomes Developer role with coding expertise
```

### Role Communication
```markdown
@PM (P:15.5, Q:12.0): Sprint planning complete
@Developer (P:8.0, Q:9.5): Starting implementation
@QA-Engineer (P:6.0, Q:8.0): Test cases prepared
```

### Multi-Role Coordination
```markdown
# PM delegates to multiple roles
@PM: Delegating tasks for user story
- @Developer: Implement backend API
- @Web-Designer: Create UI mockups
- @QA-Engineer: Prepare test scenarios
```

### Role Handoffs
```markdown
@Developer: Implementation complete, handing off to @QA-Engineer
@QA-Engineer: Received, starting test execution
```

## Role State Management

### State Preservation
- Current role state is saved before switching
- Task context is maintained across role switches
- Role-specific memory and learning are preserved

### Role Stack
- Previous roles are pushed onto a stack
- Enables returning to previous role after task completion
- Maintains role history for context

### Score Tracking
- Each role maintains separate P (Process) and Q (Quality) scores
- Scores persist across role switches
- Role performance is tracked individually

## Integration with Settings

Role behavior is influenced by system settings:

### PM Auto-Activation
```yaml
pm_always_active: true  # PM role activates on startup
```

### Autonomy Levels
- **L1**: Role switches require user approval
- **L2**: Technical role switches need architect approval
- **L3**: Autonomous role switching

### Specialist Creation
```yaml
specialist_creation: true  # Enable dynamic specialist creation
role_validation: true      # Validate capability match >70%
```

## Troubleshooting

### Role Not Switching
1. Check @-notation syntax is correct
2. Verify role name matches exactly (case-sensitive)
3. Ensure role detection patterns are triggered

### Behavioral Issues
1. Verify role profile loaded correctly
2. Check for conflicting role assignments
3. Review role constraints and limitations

### Performance Problems
1. Monitor role switching frequency
2. Check role state size
3. Review role stack depth

## Best Practices

### Clear Role Assignment
```markdown
# Good - Clear role and task
@Developer implement the login feature

# Avoid - Ambiguous assignment
Someone should implement login
```

### Role-Appropriate Tasks
```markdown
# Good - Matches role expertise
@Security-Engineer review authentication implementation

# Avoid - Wrong role for task
@Web-Designer implement database schema
```

### Explicit Handoffs
```markdown
# Good - Clear handoff
@Developer: Implementation complete, handing off to @QA-Engineer for testing

# Avoid - Unclear transition
Done with coding, someone should test
```

## Technical Details

### Detection Patterns
The role detection engine uses regex patterns to identify:
- Direct @-notation mentions
- YAML assignment fields
- Communication patterns
- Handoff declarations

### Activation Process
1. Detection triggers role change request
2. Current role state serialized
3. New role profile loaded
4. Behavioral patterns activated
5. Expertise context initialized
6. Constraints applied

### Memory Integration
- Role-specific memories stored separately
- Cross-role learning shared when relevant
- Role performance tracked in scores.md

## Summary

Role switching is fundamental to the virtual team system, enabling:
- Specialized expertise for each task
- Proper separation of concerns
- Role-appropriate decision making
- Effective multi-role coordination

The system seamlessly switches between roles based on task assignments, maintaining context while adopting role-specific behaviors and expertise.