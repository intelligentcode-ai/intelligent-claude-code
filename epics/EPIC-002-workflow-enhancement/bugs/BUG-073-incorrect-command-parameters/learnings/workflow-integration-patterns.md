# Workflow Integration Patterns

**Created:** 2025-07-19  
**Author:** @AI-Engineer  
**Purpose:** Document successful workflow integration patterns for future teams

## Overview

This document captures critical learnings from integrating outer and inner workflow templates into the intelligent-claude-code behavioral system. These patterns ensure workflows guide execution without rigid enforcement.

## Key Principle: Assignment-Driven Workflows

**Core Insight:** Workflows should guide, not enforce. Assignment files drive all behavior.

### How It Works
```yaml
# Assignment files contain workflow metadata
epic.yaml:
  workflow_type: "outer"
  workflow_phase: "story_creation"
  
# Behaviors check phase before actions
IF current_phase != required_phase:
  Block action with helpful error
  Suggest correct next step
```

## Integration Architecture

### 1. Behavioral Import Chain
```markdown
# lean-workflow-executor.md imports:
@./workflow-phase-enforcer.md

# This enables phase checking without complex coupling
```

### 2. Phase Enforcement Pattern
```pseudocode
FUNCTION executeAction(action):
  phase = getCurrentPhase(assignment)
  required = getRequiredPhase(action)
  
  IF phase != required:
    BLOCK with "Action requires phase: " + required
    SUGGEST "Complete " + phase + " first"
  ELSE:
    PROCEED with action
```

### 3. Command-Workflow Alignment

Each command maps to specific workflow phases:

| Command | Workflow Phase | Workflow Type |
|---------|---------------|---------------|
| icc-create-story | story_creation | Outer |
| icc-plan-story | task_decomposition | Outer |
| icc-activate-role | task_execution | Inner |
| icc-commit-task | git_operations | Inner |

## Validation Chain Integration

The validation chain executes during task_decomposition phase:

```bash
# Outer workflow - Phase: task_decomposition
1. detect-work-type(task_content)
2. require-triage(PM, SpecialistArchitect)  
3. validate-assignments(task, role)
4. require-approval(PM, SpecialistArchitect)
```

## Phase Transition Patterns

### Manual Transitions (L1/L2)
```yaml
# User completes phase requirements
# System updates assignment file:
workflow_phase: "task_execution" → "peer_review"
phase_transition_time: "2025-07-19T10:30:00Z"
```

### Automatic Transitions (L3)
```pseudocode
IF autonomy_level == "L3":
  ON phase_complete:
    next_phase = getNextPhase(current)
    updateAssignment(next_phase)
    triggerPhaseActions(next_phase)
```

## Git Integration by Workflow Level

### Outer Workflow Git Operations
- **Scope:** Story/Bug level
- **Actions:** Branch creation, merge preparation
- **Example:** `git checkout -b feature/STORY-001-oauth`

### Inner Workflow Git Operations  
- **Scope:** Task level
- **Actions:** Commits and pushes per task
- **Example:** `git commit -m "TASK-001: Implement token storage"`

## Knowledge Phase Patterns

Both workflows bookend with knowledge operations:

```yaml
# First phase always:
knowledge_retrieval:
  - Search similar work
  - Load patterns
  - Apply learnings

# Last phase always:
knowledge_generation:
  - Capture decisions
  - Store patterns
  - Share insights
```

## Common Integration Pitfalls

### Pitfall 1: Skipping Knowledge Phases
**Problem:** Teams want to jump straight to execution  
**Solution:** Phase enforcement blocks this, explains why knowledge matters

### Pitfall 2: Wrong Workflow Level Commands
**Problem:** Using story commands for task work  
**Solution:** Commands check assignment type, suggest correct command

### Pitfall 3: Manual Phase Updates
**Problem:** Forgetting to update workflow_phase field  
**Solution:** L3 auto-updates, L1/L2 get reminders after actions

## Implementation Checklist

When integrating workflows:

- [ ] Assignment files have workflow_type field
- [ ] Assignment files have workflow_phase field  
- [ ] Commands check phase before execution
- [ ] Phase transitions update assignment file
- [ ] Validation chains run at correct phase
- [ ] Git operations match workflow level
- [ ] Knowledge phases are enforced
- [ ] L3 mode enables auto-transitions
- [ ] Error messages guide to correct phase
- [ ] Progress tracking uses phase status

## Testing Patterns

### Phase Enforcement Test
```bash
# Try to execute out of phase
/icc-commit-task TASK-001
# Should see: "Cannot commit - task in planning phase"
```

### Transition Test
```bash
# Complete phase requirements
# Check assignment file updated
grep workflow_phase story.yaml
# Should show new phase
```

### L3 Auto-Transition Test
```yaml
# Set autonomy_level: "L3"
# Complete phase
# Watch for automatic transition
# No manual intervention needed
```

## Benefits of This Approach

1. **Flexibility** - Workflows guide without rigid enforcement
2. **Clarity** - Phase requirements prevent confusion
3. **Quality** - Validation gates ensure standards
4. **Learning** - Knowledge phases capture/apply insights
5. **Automation** - L3 mode reduces manual overhead

## Future Enhancement Ideas

1. **Phase Analytics** - Track time spent in each phase
2. **Phase Templates** - Reusable phase configurations  
3. **Cross-Workflow Sync** - Coordinate related stories
4. **Phase Webhooks** - External integrations on transitions
5. **Custom Phases** - Project-specific workflow extensions

## Summary

Successful workflow integration requires:
- Assignment files as source of truth
- Behavioral phase enforcement  
- Command-phase alignment
- Flexible validation chains
- Knowledge-first approach

The key is keeping workflows as guides that help teams follow best practices without becoming obstacles to productivity. The lean approach with behavioral enforcement achieves this balance perfectly.

---
*This learning will help future teams integrate workflows successfully*