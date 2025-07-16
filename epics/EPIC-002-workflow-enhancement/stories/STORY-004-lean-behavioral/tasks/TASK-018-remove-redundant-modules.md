# TASK-018: Remove Redundant Behavioral Modules

**Status:** IN PROGRESS  
**Assigned to:** @AI-Engineer
**Story:** STORY-004 Lean Behavioral System

## Objective
Document modules to be removed from the lean system. Since this is a markdown-based system installed via `make install`, we cannot delete files directly. Instead, we'll document what should be excluded from the lean installation.

## Modules to Remove

### 1. Complex Behavioral Modules (src/behaviors/)
These modules add complexity without value in the lean system:

#### ❌ REMOVE COMPLETELY
- `l3-continuous-engine.md` - Over-engineered continuous loops
- `task-queue-manager.md` - No queues needed for markdown system
- `auto-continue-triggers.md` - Complex automation not needed
- `progress-monitor.md` - TodoWrite is sufficient
- `work-discovery-engine.md` - Over-engineered discovery

#### 🔄 SIMPLIFY (Keep minimal version)
- `autonomy-controller.md` → Replace with simple L3 flag check
- `role-activation-system.md` → Keep only basic role switching
- `learning-team-automation.md` → Keep only simple memory storage
- `pm-command-system.md` → Move commands to virtual-team.md

### 2. Old Behavioral Modules (if they exist)
Based on the story description, these should be removed:
- `runtime-tools.md` - Complex triggers
- `command-chains.md` - Over-engineered
- `unified-enforcement.md` - Penalties
- `active-disagreement.md` - Complex

### 3. Complex Mode Files (src/modes/)
- `core-systems.md` → Extract roles only
- `execution-engine.md` → DELETE
- `role-framework.md` → KEEP (needed)
- `integration-layer.md` → SIMPLIFY
- `operational-protocols.md` → Extract git patterns only

## Implementation Strategy

Since we cannot delete files in a markdown system, we need to:

1. **Update virtual-team.md** to NOT import removed modules
2. **Create lean-imports.md** with only essential imports
3. **Update installation** to exclude removed modules
4. **Document in README** which modules are deprecated

## Lean System Structure

```
KEEP (Essential):
├── behaviors/
│   ├── lean-workflow-executor-v2.md  ✅ NEW LEAN VERSION
│   ├── config-loader.md              ✅ Config management
│   ├── git-privacy-enforcer.md       ✅ Git feature
│   ├── role-detection-engine.md      ✅ Role parsing
│   ├── role-assignment-validator.md  ✅ Validation
│   └── archival-intelligence.md      ✅ Archival feature
├── roles/
│   └── specialists.md                ✅ Role definitions
└── modes/
    └── virtual-team.md               ✅ UPDATE IMPORTS

REMOVE/EXCLUDE:
├── behaviors/
│   ├── l3-continuous-engine.md       ❌
│   ├── task-queue-manager.md         ❌
│   ├── auto-continue-triggers.md     ❌
│   ├── progress-monitor.md           ❌
│   ├── work-discovery-engine.md      ❌
│   ├── autonomy-controller.md        ❌ (simplify inline)
│   ├── role-activation-system.md     ❌ (simplify inline)
│   ├── learning-team-automation.md   ❌ (simplify inline)
│   └── pm-command-system.md          ❌ (move to virtual-team)
```

## Next Steps

1. Create simplified virtual-team.md with lean imports
2. Test that core functionality works without removed modules
3. Update documentation to reflect lean architecture

**TASK IN PROGRESS:** Documenting modules for removal from lean system...