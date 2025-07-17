# TASK-042: Move Commands to Source Directory

**ID:** TASK-042  
**Bug:** BUG-020  
**Title:** Move icc commands from .claude/ to src/commands/  
**Type:** deployment  
**Assigned:** @System-Engineer  
**Status:** planned  
**Priority:** P0  

## Problem Description
Commands currently in `.claude/commands/` need to be moved to `src/commands/` for proper system integration and rollout.

## Acceptance Criteria
- [ ] All icc- commands moved to src/commands/
- [ ] Commands renamed with proper icc: prefix
- [ ] Source directory structure validated
- [ ] Original .claude/ commands removed

## Implementation Steps
1. Create tasks in src/commands/ for all icc commands
2. Update command prefix from icc- to icc:
3. Validate src/commands/ integration
4. Remove .claude/commands/ versions

## Dependencies
None

## Estimated Effort
1 hour

## Status
Planned - Move commands to proper location