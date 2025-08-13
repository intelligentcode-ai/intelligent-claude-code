# STORY-005: Work-Item Lifecycle Management System

**Created:** 2025-08-09
**Completed:** 2025-08-10
**Status:** Ready
**Priority:** High
**Category:** System Organization

## Story

As a virtual team system, I need automated bug and story lifecycle management that moves work-items through their lifecycle stages (open → in-progress → completed) similar to how PRBs are managed (ready → completed), so that the work-item tracking remains organized and current.

## Background

Currently, bugs remain in the bugs/ directory even after being fixed, and stories remain in their base directories. They're marked as "Open" despite having completed PRBs and merged fixes. This creates confusion about which work-items are actually active versus completed.

The system already has a good pattern with PRBs:
- `prbs/ready/` - PRBs ready for execution
- `prbs/completed/` - PRBs that have been executed

## Requirements

### Functional Requirements
1a. Create `bugs/open/` and `bugs/completed/` directory structure
1b. Create `stories/open/` and `stories/completed/` directory structure
2. Work-Items should move from open → completed when their PRB is completed
3. Work-Item status should automatically update when implementation is merged
4. Behavioral pattern to enforce lifecycle management

### Technical Requirements  
1. Similar to PRB lifecycle management
2. Automated through behavioral patterns
3. Clear instructions for AI agents to follow
4. Integration with PRB completion process

## Acceptance Criteria

- [ ] Work-Items have clear lifecycle stages: open → in-progress → completed
- [ ] Completed work-items are moved to bugs/completed/
- [ ] Work-Item status updates when PRB completes
- [ ] Behavioral pattern documented for AI agents
- [ ] Works consistently with existing PRB lifecycle

## Success Metrics

- All fixed work-items properly archived in <base-directory>/completed/
- No confusion about which work-items are active
- Clear audit trail of fixes and implementations
- Consistent with PRB management pattern

## Out of Scope

- External work-item tracking systems
- Complex workflow states beyond open/in-progress/completed
- Integration with GitHub issues
