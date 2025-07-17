# TASK-001 Architecture Analysis - COMPLETE

**Task:** Architecture Analysis - What to Remove/Keep  
**Assigned to:** @AI-Architect  
**Status:** COMPLETE  
**Date:** 2025-07-15 11:15:00

## Executive Summary

System bloat confirmed: We have both complex behavioral enforcement (19 imports) AND lean workflow system active simultaneously. The lean system is designed to REPLACE the complex system entirely.

## Current Architecture Issues

### Old System (TO REMOVE)
- **19 complex imports** in virtual-team.md
- **Command chains** with penalties and monitoring
- **Behavioral enforcement** with scoring systems
- **Complex memory coordination** with auto-correction
- **Monitoring loops** that interfere with execution

### New System (TO KEEP)
- **lean-workflow-executor.md** - Simple file-based execution
- **Role definitions** - 14 core roles + dynamic specialists
- **Workflow templates** - outer/inner workflow definitions
- **Assignment files** - Stories/tasks with embedded config

## Architecture Decision

**REPLACE complex enforcement with lean workflow execution**

### What to Remove
```
FILES TO DELETE:
├── src/modes/
│   ├── core-systems.md           # Complex enforcement
│   ├── execution-engine.md       # Penalties, monitoring
│   ├── integration-layer.md      # Complex memory coordination  
│   └── operational-protocols.md  # Git enforcement
├── src/behaviors/
│   ├── runtime-tools.md          # Complex tool chains
│   ├── memory-coordination.md    # Complex memory enforcement
│   ├── command-chains.md         # Old command system
│   ├── enforcement-autonomy.md   # Penalty systems
│   ├── unified-enforcement.md    # Monitoring loops
│   ├── team-coordination.md      # Complex coordination
│   └── active-disagreement.md    # Complex disagreement system
└── src/commands.md               # Old command chains
```

### What to Keep
```
LEAN SYSTEM WITH SCORING & LEARNING:
├── src/roles/specialists.md           # NEW: Just role definitions
├── src/behaviors/lean-workflow-executor.md  # Simple executor
├── src/behaviors/learning-team-automation.md  # KEEP: Learning system
├── src/modes/badges.md                # KEEP: Scoring system
├── workflow-templates/outer-workflow.yaml   # Workflow definitions
└── workflow-templates/inner-workflow.yaml   # Task execution
```

### New Virtual Team Structure
```yaml
# NEW virtual-team.md imports (6 components)
@src/roles/specialists.md          # Role definitions only
@src/behaviors/lean-workflow-executor.md  # Single executor
@src/behaviors/learning-team-automation.md  # Learning system
@src/modes/badges.md                # Scoring system
@workflow-templates/outer-workflow.yaml
@workflow-templates/inner-workflow.yaml
```

## Technical Implementation Plan

### Phase 1: Extract Role Definitions
- Create `src/roles/specialists.md` with ONLY role definitions
- Remove all enforcement logic, penalties, command chains
- Keep: 14 core roles + dynamic specialist creation capability

### Phase 2: Replace Virtual Team Imports  
- Update virtual-team.md to import only 6 lean components
- Remove 13 complex enforcement imports (keep learning & scoring)
- Remove enforcement directives but keep scoring & learning logic

### Phase 3: Clean File System
- Delete complex enforcement modules (13 files)
- Keep: lean-workflow-executor.md + learning-team-automation.md in behaviors/
- Keep: badges.md in modes/
- Remove old command system files

### Phase 4: Test Functionality
- Verify @-notation role switching works
- Test workflow execution reads assignment files
- Confirm task creation and execution works

## Risk Assessment

**LOW RISK:** Lean system is designed as complete replacement
- Role switching: Basic @-notation should work with simple role definitions
- Workflow execution: Assignment files contain all needed information  
- Tool usage: Lean executor uses minimal tool set (Read, Write, Task, Memory)

## Success Criteria

✅ Only lean workflow executor active  
✅ Role switching works per @-notation  
✅ Workflows execute based on assignment files  
✅ System reduced from 19 modules to 6 files  
✅ No interference between systems

## Next Steps

Hand off to @AI-Engineer for implementation in TASK-002.

## Knowledge Captured

**Pattern:** Complex behavioral systems can be replaced with structured workflows
**Learning:** File structure drives behavior more reliably than enforcement code  
**Future:** Always design workflows as behavior, not add behavior to workflows

---
**Analysis complete. System architecture clearly defined for lean migration.**