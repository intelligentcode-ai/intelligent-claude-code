# Workflow-Based Task Ordering Guide

This guide explains the workflow-based task ordering system used in intelligent-claude-code, which ensures tasks follow proper Inner Workflow phases for optimal execution sequence and quality outcomes.

## Overview

The task ordering system maps task numbers to specific Inner Workflow phases, ensuring that knowledge retrieval happens first, implementation follows proper planning, and quality/documentation tasks complete the workflow. This prevents common anti-patterns like implementing before understanding requirements or committing code before review.

## Task Number Ranges and Workflow Phase Mapping

### 001-009: Process Tasks (Phase: knowledge_retrieval)
These tasks **ALWAYS** come first and focus on gathering context, understanding requirements, and preparing the environment.

- **001**: Knowledge Loading - Search memory for similar patterns, load project context
- **002**: Dependency Resolution - Identify and resolve external dependencies
- **003**: Environment Setup - Prepare tools, access, development environments
- **004-009**: Additional process tasks - Further knowledge gathering as needed

**Example:**
```markdown
# TASK-001: [Architect] Load Workflow Ordering Knowledge
Workflow Phase: knowledge_retrieval
Priority: blocking
```

### 010-994: Core Work Tasks (Phase: task_execution)
These tasks contain the main implementation work and follow after knowledge retrieval is complete.

- **010**: Analysis/Investigation - Deep understanding of requirements
- **020**: Design/Architecture - Create technical design and approach
- **030**: Primary Implementation - Core development work
- **031**: Peer Review for 030 (Phase: peer_review)
- **040**: Integration - Connect with existing systems
- **041**: Peer Review for 040 (Phase: peer_review)
- **050-094**: Additional implementation tasks
- **100-994**: Extended tasks for complex work

**Key Pattern:** Every implementation task (030, 040, etc.) gets an immediate +1 numbered peer review task that shifts to the peer_review phase.

**Example:**
```markdown
# TASK-030: [Developer] Implement Configuration Loader
Workflow Phase: task_execution
Priority: critical_path
Review Task: TASK-031

# TASK-031: [AI-Architect] Review Configuration Implementation
Workflow Phase: peer_review
Priority: critical_path
Reviews: TASK-030
```

### 995-999: Wrap-up Tasks (Multiple phases)
These tasks **ALWAYS** come last and handle documentation, validation, git operations, and knowledge capture.

- **995**: Documentation Updates (Phase: task_execution)
- **996**: Testing Validation (Phase: task_validation)
- **997**: Git Operations - Commit/Push/PR (Phase: git_operations)
- **998**: Knowledge Creation - Capture learnings (Phase: knowledge_generation)
- **999**: Completion Verification (Phase: task_completion)

**Example:**
```markdown
# TASK-997: [Developer] Git Operations for Workflow Ordering
Workflow Phase: git_operations
Priority: critical_path
Dependencies: [TASK-030, TASK-031, TASK-995, TASK-996]
```

## Workflow Phase Sequence

Tasks must follow the Inner Workflow phase progression:

1. **knowledge_retrieval** → First, understand the problem
2. **task_planning** → Plan the approach (handled by icc-plan-tasks)
3. **task_execution** → Implement the solution
4. **task_validation** → Validate the implementation
5. **peer_review** → Expert review of work
6. **git_operations** → Commit and push changes
7. **task_completion** → Verify everything is done
8. **knowledge_generation** → Capture learnings

## Best Practices for Task Ordering

### 1. Always Start with Knowledge Retrieval (001-009)
```yaml
tasks:
  - id: "TASK-001"
    title: "[Architect] Load Context and Patterns"
    workflow_phase: "knowledge_retrieval"
    priority: "blocking"
```

### 2. Group Related Implementation Tasks
```yaml
tasks:
  - id: "TASK-030"
    title: "[Developer] Implement Core Feature"
    workflow_phase: "task_execution"
  - id: "TASK-031"
    title: "[Architect] Review Core Implementation"
    workflow_phase: "peer_review"
    reviews: "TASK-030"
```

### 3. Dependencies Flow with Phase Order
```yaml
tasks:
  - id: "TASK-001"
    dependencies: []  # Knowledge tasks have no dependencies
  - id: "TASK-030"
    dependencies: ["TASK-001", "TASK-020"]  # Depends on knowledge and design
  - id: "TASK-997"
    dependencies: ["TASK-030", "TASK-031", "TASK-995", "TASK-996"]  # Git after all work
```

### 4. Use Priority to Control Execution Within Phases
```yaml
# Within the same phase, use priority to control order:
- blocking: Must complete before others can start
- critical_path: On the critical path for delivery
- parallel: Can run simultaneously with others
- optional: Can be skipped if needed
```

## Common Task Ordering Patterns

### Standard Feature Implementation
```yaml
TASK-001: [Architect] Load Feature Context (knowledge_retrieval, blocking)
TASK-002: [Developer] Resolve Dependencies (knowledge_retrieval, blocking)
TASK-010: [Architect] Analyze Requirements (task_execution, critical_path)
TASK-020: [Architect] Design Solution (task_execution, critical_path)
TASK-030: [Developer] Implement Feature (task_execution, critical_path)
TASK-031: [Architect] Review Implementation (peer_review, critical_path)
TASK-995: [Developer] Update Documentation (task_execution, parallel)
TASK-996: [QA-Engineer] Validate Tests (task_validation, critical_path)
TASK-997: [Developer] Git Operations (git_operations, critical_path)
TASK-998: [Architect] Capture Learnings (knowledge_generation, optional)
TASK-999: [PM] Verify Completion (task_completion, critical_path)
```

### Bug Fix Pattern
```yaml
TASK-001: [Developer] Load Bug Context (knowledge_retrieval, blocking)
TASK-010: [Developer] Investigate Root Cause (task_execution, blocking)
TASK-030: [Developer] Fix Implementation (task_execution, critical_path)
TASK-031: [QA-Engineer] Review Fix (peer_review, critical_path)
TASK-995: [Developer] Update Changelog (task_execution, parallel)
TASK-996: [QA-Engineer] Regression Testing (task_validation, critical_path)
TASK-997: [Developer] Git Operations (git_operations, critical_path)
TASK-998: [Developer] Document Root Cause (knowledge_generation, parallel)
TASK-999: [QA-Engineer] Verify Fix (task_completion, critical_path)
```

### Complex Multi-Component Work
```yaml
# Knowledge Phase (001-009)
TASK-001: [Architect] Load System Context
TASK-002: [DevOps-Engineer] Check Infrastructure Dependencies
TASK-003: [Developer] Setup Development Environment

# Core Work Phase (010-994)
TASK-010: [Architect] System Analysis
TASK-020: [Architect] Component Design
TASK-030: [Backend-Developer] API Implementation
TASK-031: [Backend-Architect] API Review
TASK-040: [Frontend-Developer] UI Implementation  
TASK-041: [Frontend-Architect] UI Review
TASK-050: [DevOps-Engineer] Infrastructure Setup
TASK-051: [System-Engineer] Infrastructure Review

# Wrap-up Phase (995-999)
TASK-995: [Technical-Writer] Documentation
TASK-996: [QA-Engineer] End-to-End Testing
TASK-997: [Developer] Git Operations
TASK-998: [Architect] Architecture Learnings
TASK-999: [PM] Final Verification
```

## Phase Enforcement and Validation

The workflow-phase-enforcer ensures:

1. **Phase Prerequisites**: Cannot skip phases (e.g., no execution before knowledge retrieval)
2. **Phase Gates**: Must complete phase requirements before transitioning
3. **Blocking Validation**: System blocks invalid phase transitions with clear error messages
4. **Progress Tracking**: Each task tracks its workflow phase for monitoring

## Benefits of Workflow-Based Ordering

1. **Quality Assurance**: Reviews happen at the right time, not as afterthoughts
2. **Knowledge First**: Understanding precedes implementation, reducing rework
3. **Proper Sequencing**: Git operations happen after validation, not before
4. **Learning Capture**: Knowledge generation is built into the workflow
5. **Predictable Execution**: Teams know exactly when each type of work happens
6. **Parallel Optimization**: Clear identification of what can run simultaneously
7. **Reduced Errors**: Common mistakes (commit before review) are prevented

## Integration with PM Delegation

When the PM uses the Task tool to delegate work, tasks execute in order:
1. First, all blocking tasks (usually 001-009)
2. Then critical_path tasks in sequence
3. Parallel tasks can run simultaneously (up to 5)
4. Optional tasks if time permits

This ensures the Inner Workflow phases are respected during execution.

## Troubleshooting Task Order Issues

### Problem: Tasks executing out of order
**Solution**: Check task numbers align with workflow phases and dependencies are set correctly.

### Problem: Review happening before implementation
**Solution**: Ensure review tasks are numbered +1 after their implementation task.

### Problem: Git operations too early
**Solution**: TASK-997 should depend on all implementation and review tasks.

### Problem: Knowledge tasks skipped
**Solution**: 001-009 tasks should have blocking priority to force early execution.

## Summary

The workflow-based task ordering system ensures high-quality outcomes by enforcing proper sequencing aligned with the Inner Workflow. By mapping task numbers to workflow phases and using dependencies and priorities correctly, teams achieve predictable, efficient execution with built-in quality gates.

Remember: **Knowledge First, Implementation Second, Quality Always!**