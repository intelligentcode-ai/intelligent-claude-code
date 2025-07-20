# TASK-005: [AI-Engineer] Update Commands for File Management

## Overview
**Task ID:** TASK-005
**Title:** [AI-Engineer] Update Commands for File Management
**Status:** COMPLETED
**Assigned To:** @AI-Engineer
**Priority:** P0 (parallel)
**Type:** implementation
**Completed:** 2025-01-20

## Description
Update all commands that create files to follow new file management patterns.

## Subtasks
1. **Update report-generating commands**
   - Add folder organization
   - Enforce naming conventions
   - Prevent root directory pollution

2. **Fix documentation commands**
   - Enhance existing first logic
   - Proper folder placement
   - lowercase naming enforcement

3. **Add validation to all Write usage**
   - Pre-write validation
   - Name convention checks
   - Folder requirement checks

## Acceptance Criteria
- [x] All commands updated ✓
- [x] File creation validated ✓
- [x] Naming enforced ✓
- [x] No root pollution ✓

## Dependencies
- TASK-003 (need design patterns)

## Output
- Updated command files ✓ (icc-create-epic.md, icc-create-bug.md, archival-intelligence.md)
- Consistent file creation ✓ (all using lowercase-hyphenated names)
- Clean project structure ✓ (file-management-enforcer validation added)