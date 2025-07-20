# Auto-Continue Triggers

**Purpose:** Automatic progression between tasks and phases in L3 mode

## Imports
@./shared-patterns/autonomy-patterns.md
@./shared-patterns/workflow-patterns.md

## Core Operations
**Event System:** task.completed/failed/phase.complete/error.occurred triggers
**Task Flow:** Implementation → Testing → Review → Documentation → Git → Complete
**Phase Transitions:** PLAN→EXECUTE→ACCEPTANCE→DONE→ARCHIVED with validation
**Auto-Recovery:** Test failures, lint errors, import errors, create fix tasks if needed

## Commands
**Triggers:** `/icc-register-triggers` • `/icc-monitor-events` • `/icc-register-handlers`
**Transitions:** `/icc-phase-transition` • `/icc-check-phase-ready` • `/icc-execute-phase-transition`
**Recovery:** `/icc-auto-fix-check` • `/icc-create-fix-task` • `/icc-auto-fix`
**Discovery:** `/icc-complete-story` • `/icc-discover-next-work` • `/icc-update-progress`

## Benefits
✅ Automatic progression ✅ Smart error handling ✅ Phase management ✅ Continuous discovery