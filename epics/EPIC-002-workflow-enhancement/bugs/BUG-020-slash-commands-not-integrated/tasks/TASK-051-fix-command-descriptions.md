# TASK-051: Fix Claude Code Command Descriptions

**ID:** TASK-051  
**Bug:** BUG-020  
**Title:** Fix Claude Code command descriptions format  
**Type:** documentation  
**Assigned:** @Developer  
**Status:** planned  
**Priority:** P0  

## Problem Description
Commands in src/commands/ don't have proper Claude Code descriptions. Claude Code requires specific format for command descriptions to be recognized properly.

## Acceptance Criteria
- [ ] All icc commands have proper Claude Code description format
- [ ] Commands appear correctly in Claude Code interface
- [ ] Descriptions are clear and actionable
- [ ] Usage examples are provided

## Implementation Steps
1. Research proper Claude Code command description format
2. Update all icc command files with correct format
3. Add clear usage examples
4. Test commands appear properly in Claude Code

## Dependencies
- TASK-042 (Commands moved to src)

## Estimated Effort
1.5 hours

## Status
Planned - Fix command descriptions