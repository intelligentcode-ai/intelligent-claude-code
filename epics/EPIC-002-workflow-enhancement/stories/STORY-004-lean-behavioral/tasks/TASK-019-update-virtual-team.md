# TASK-019: Update Virtual-Team.md Imports

**Status:** IN PROGRESS
**Assigned to:** @AI-Engineer
**Story:** STORY-004 Lean Behavioral System

## Objective
Update virtual-team.md to use lean imports with minimal modules for 80% token reduction.

## Current vs Lean Imports

### Current Imports (Complex)
```markdown
@../roles/specialists.md
@../behaviors/lean-workflow-executor.md       # But it imports 13+ modules!
@../behaviors/learning-team-automation.md     # Complex learning system
@badges.md
@../../workflow-templates/outer-workflow.yaml
@../../workflow-templates/inner-workflow.yaml
```

### Proposed Lean Imports
```markdown
@../roles/specialists.md                      # Role definitions
@../behaviors/lean-workflow-executor-v2.md    # TRUE lean executor
@badges.md                                    # Simple scoring
@../../workflow-templates/outer-workflow.yaml # Workflow definitions
@../../workflow-templates/inner-workflow.yaml
```

## Key Changes

### 1. Replace Complex Executor
- OLD: `@../behaviors/lean-workflow-executor.md` (20k tokens, imports 13+ modules)
- NEW: `@../behaviors/lean-workflow-executor-v2.md` (2k tokens, 5 imports)

### 2. Remove Complex Learning
- OLD: `@../behaviors/learning-team-automation.md` (complex penalty system)
- NEW: Simple memory storage built into executor

### 3. Simplify Startup Sequence
Update the startup sequence to reflect lean architecture:

```markdown
**STARTUP SEQUENCE:**
1. **Config Load:** Load configuration hierarchy
2. **Role Definitions:** Load specialist roles
3. **Workflow Engine:** Activate lean executor
4. **Scoring System:** Initialize simple badges
5. **Assignment Reading:** Ready to process files
```

## Implementation

I'll create a lean version of virtual-team.md that achieves the 80% token reduction goal.