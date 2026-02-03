---
name: story-breakdown
description: Break large stories into manageable AgentTasks. Use when a story exceeds 15 complexity points, spans multiple components, or requires coordination across team members.
---

# Story Breakdown Skill

Break large stories into manageable AgentTasks for execution.

## When to Create a Story Breakdown

- Estimated complexity > 15 points
- Multi-component or multi-team scope
- Requires sequential execution phases
- Dependencies between work items

## Breakdown Process

1. **PM reviews** scope and goals
2. **Architect advises** on technical boundaries
3. **Split into AgentTasks** with clear success criteria
4. **Assign roles** based on domain expertise
5. **Document dependencies** and execution order

## Size Management Rules

**CRITICAL**: Maintain AgentTask size limits:
- **Single AgentTask**: ≤15 complexity points maximum
- **Auto-Breakdown**: Stories >15 points split into multiple AgentTasks
- **Logical Grouping**: Split by natural boundaries
- **Dependency Management**: Document execution order

## Complexity Estimation

| Points | Scope |
|--------|-------|
| 1-2 | Trivial change, single line |
| 3-5 | Simple single-file change |
| 6-10 | Multi-file feature |
| 11-15 | Complex feature, max single AgentTask |
| 16-30 | Multi-AgentTask story |
| 31+ | Epic requiring breakdown |

## Splitting Strategies

### By Component
- Frontend AgentTask
- Backend AgentTask
- Database AgentTask

### By Phase
- Phase 1: Core functionality
- Phase 2: Error handling
- Phase 3: Testing
- Phase 4: Documentation

### By Domain
- Authentication AgentTask
- Data processing AgentTask
- API integration AgentTask

## Naming Convention

```
STORY-XXX-AgentTask-001-[description]
STORY-XXX-AgentTask-002-[description]
STORY-XXX-AgentTask-003-[description]
```

## Dependency Documentation

```yaml
dependencies:
  STORY-001-AgentTask-002:
    blockedBy: [STORY-001-AgentTask-001]
    reason: "Requires auth module from AgentTask-001"
```

## Role Assignment

For each AgentTask, assign based on:
1. Primary technology domain
2. Required expertise level
3. Dependency on other work
4. Available specialists

## Validation

Before execution:
- [ ] Total points = sum of AgentTask points
- [ ] Each AgentTask ≤15 points
- [ ] Dependencies are acyclic
- [ ] Roles assigned for all AgentTasks
- [ ] Success criteria defined
