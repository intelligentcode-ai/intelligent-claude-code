# BUG-117: System Redundancy Removal - Task Breakdown

**Created:** 2025-07-21  
**Architect:** @AI-Architect  
**Priority:** P0-CRITICAL

## Executive Summary

This bug addresses massive system redundancy where executable-workflow.md now defines most behavior, making many commands and behaviors redundant. The goal is to reduce from 84 files to ~40 files (50% reduction) while preserving 100% functionality.

## Phase 1: Command Removal (P0 Priority)

### TASK-001: [AI-Architect] Analyze and document critical dependencies
- Map import chains from executable-workflow.md
- Identify unique functionality to preserve
- Document safe removal order
- Create risk assessment

### TASK-002: [Developer] Remove redundant memory operation commands
- Delete: icc-memory-search, icc-memory-store, icc-learning-store
- Keep: icc-memory-init, icc-memory-cleanup
- Update references to use behaviors

### TASK-003: [Developer] Remove redundant queue management commands  
- Delete: icc-queue-add, icc-queue-get-parallel
- Keep: icc-prioritize
- Use workflow-coordination.md for queue ops

### TASK-004: [Developer] Remove redundant validation commands
- Delete: icc-validate-context, icc-validate-assignments, icc-validate-role-title, icc-enforce-validation
- Keep: icc-validate-directory, icc-validate-file, icc-validate-naming
- Keep: icc-detect-work-type, icc-require-triage

### TASK-005: [Developer] Remove redundant git operation commands
- Delete: icc-git-validate, git-privacy-enforcer.md
- Keep: icc-git-operation, icc-git-clean
- Git logic in executable-workflow.md

## Phase 2: Behavior Consolidation (P1 Priority)

### TASK-006: [AI-Engineer] Consolidate workflow execution behaviors
- Delete: workflow-executor-simple, workflow-enforcement-patterns, workflow-integration-strategy, workflow-auto-correction-design
- Keep: lean-workflow-executor (orchestrator), workflow-coordination (queue)

### TASK-007: [AI-Engineer] Merge role management behaviors
- Consolidate into role-management.md
- Keep role-assignment-validator.md
- Preserve Task.create() subagent pattern

### TASK-008: [AI-Engineer] Consolidate L3 autonomous behaviors
- Merge features into l3-continuous-engine.md
- Keep autonomy-controller.md (L1/L2/L3)
- Preserve stop conditions

## Phase 3: Pattern Merging (P1 Priority)

### TASK-009: [Developer] Merge shared learning patterns
- Merge memory-patterns + error-handling → learning-patterns.md
- Consolidate duplicate learning logic
- Preserve penalty/bonus system

### TASK-010: [Developer] Merge validation and enforcement patterns
- Merge validation-patterns + enforcement-patterns → validation-enforcement-patterns.md
- Consolidate auto-correction logic
- Keep >70% capability matching

## Phase 4: Finalization (P2 Priority)

### TASK-011: [Developer] Update all import references system-wide
- Fix all @./ imports
- Update CLAUDE.md structure
- Ensure import chains resolve

### TASK-012: [QA-Engineer] Validate complete system functionality
- Test all workflows
- Verify no regression
- Confirm 35%+ token reduction
- Update documentation

## Expected Outcomes

### File Reduction
- Commands: 53 → 35 files (34% reduction)
- Behaviors: 24 → 12 files (50% reduction)  
- Patterns: 7 → 4 files (43% reduction)
- **Total: 84 → 51 files (39% reduction)**

### Token Reduction
- Current: ~17,950 tokens
- Target: ~11,450 tokens
- **Reduction: 6,500 tokens (36%)**

### Benefits
- Single source of truth (executable-workflow.md)
- Eliminated duplicate implementations
- Cleaner import hierarchy
- Easier maintenance
- Faster system initialization

## Implementation Order

1. **P0 Tasks (1-5)**: Remove redundant commands - Low risk
2. **P1 Tasks (6-10)**: Consolidate behaviors/patterns - Medium risk  
3. **P2 Tasks (11-12)**: Update imports and validate - Final verification

## Critical Success Factors

- ✅ All functionality preserved
- ✅ No breaking changes
- ✅ Clean import hierarchy
- ✅ 35%+ token reduction
- ✅ All tests pass

**NOTE**: Each task has minimum 3 subtasks and clear role assignment per mandate.