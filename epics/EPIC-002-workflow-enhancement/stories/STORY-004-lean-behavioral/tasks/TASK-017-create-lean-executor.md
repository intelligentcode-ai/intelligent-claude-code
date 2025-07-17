# TASK-017: Create Lean Workflow Executor

**Status:** IN PROGRESS
**Assigned to:** @AI-Engineer
**Story:** STORY-004 Lean Behavioral System

## Objective
Create a truly lean workflow executor that replaces the bloated current version.

## Implementation Plan

The current lean-workflow-executor.md imports 13+ complex modules, creating the bloat we're trying to eliminate. We need a TRULY lean version that:

1. Imports only essential modules (6 total)
2. Removes all complex enforcement patterns
3. Focuses on simple assignment reading and execution
4. Reduces token count by 80%

## Proposed Lean Executor Structure

```markdown
# Lean Workflow Executor

**PURPOSE:** Read assignment files and execute workflows. The workflow IS the behavior.

## Imports (ONLY ESSENTIALS)

@./config-loader.md           # Configuration management
@./git-privacy-enforcer.md    # Git privacy feature
@./role-detection-engine.md   # @-notation detection
@./role-assignment-validator.md # Role validation
@../roles/specialists.md      # Role definitions

## Core Functions (SIMPLIFIED)

### 1. Read Assignment
- Load YAML file
- Parse structure
- Apply embedded config
- Return assignment data

### 2. Execute Workflow
- Read assignment phases
- Execute based on status
- Update progress
- No complex loops or monitoring

### 3. Assign Role
- Detect @-notation
- Validate capability match
- Activate role
- Simple and direct

### 4. Update Progress
- Change task status
- Update story/epic status
- Write to file
- No complex tracking

## Removed Complexity
- NO autonomy-controller.md (just check L3 flag)
- NO pm-command-system.md (commands in virtual-team.md)
- NO learning-team-automation.md (simple memory storage)
- NO l3-continuous-engine.md (over-engineered)
- NO task-queue-manager.md (no queues needed)
- NO auto-continue-triggers.md (simple status updates)
- NO progress-monitor.md (TodoWrite is enough)
- NO work-discovery-engine.md (simple file scan)
- NO complex state management
- NO penalty systems
- NO monitoring loops
```

## Next Steps

1. Create new lean-workflow-executor-v2.md with minimal imports
2. Test functionality preservation
3. Replace old executor with new lean version
4. Verify 80% token reduction

**TASK IN PROGRESS:** Creating the truly lean executor...