# Auto-Continue Triggers

**Purpose:** Automatic progression between tasks and phases in L3 mode

## Trigger Registration

**Core Triggers:** Use `/icc-register-triggers` for task.completed → Next task • task.failed → Error recovery • phase.complete → Phase transition • error.occurred → Fix generation  
**Event Listening:** Use `/icc-monitor-events` to monitor all task events, match to registered handlers, execute appropriate action  
**Handler Registration:** Use `/icc-register-handlers` to map event types to handler actions and start continuous listener

## Task Completion Flow

### Task Type Progression
- **Implementation** → Trigger testing tasks
- **Testing** → Trigger review process
- **Review** → Trigger documentation
- **Documentation** → Trigger git operations
- **Git operations** → Mark story complete

### Testing Triggers
**Find Test Tasks:** Use `/icc-find-test-tasks [story_id]` to get testing tasks from parent story, check dependencies on completed task, mark ready if dependent  
**No Tests Fallback:** Use `/icc-skip-to-review [story_id]` if no test tasks found to skip to review phase and log warning

## Phase Transitions

**Phase Progression:** Use `/icc-phase-transition [next_phase]` for PLAN → EXECUTE → ACCEPTANCE → DONE → ARCHIVED  
**Transition Conditions:** Use `/icc-check-phase-ready [current_phase]` to verify PLAN complete (all tasks created), EXECUTE complete (all tasks done), ACCEPTANCE complete (criteria met), DONE (ready for archival)

**Transition Actions:** Use `/icc-execute-phase-transition [phase_data]` to update phase, record transition time, activate new phase handlers

## Error Recovery

**Auto-Fix Detection:** Use `/icc-auto-fix-check [error_type]` to check if error type is auto-fixable, generate fix, apply and retry  
**Fix Task Creation:** Use `/icc-create-fix-task [error_data]` if not auto-fixable to create fix task and continue with other work  
**Common Auto-Fixes:** Use `/icc-auto-fix [error_type]` for test failures (re-run with fixes), lint errors (auto-format), import errors (add missing imports)

## Event Propagation

**Event Flow:** Use `/icc-process-event [event_data]` to receive event, find handler, create event object, execute handler, handle errors  
**Error Handling:** Use `/icc-handle-event-error [error_data]` to catch handler errors, create recovery task, continue processing  
**Logging:** Use `/icc-log-events [event_data]` to log all events, track event flow, provide debug information

## Continuous Flow

**Story Completion:** Use `/icc-complete-story [story_id]` to mark story complete, update phase to DONE, update epic progress  
**Next Work Discovery:** Use `/icc-discover-next-work [current_epic]` to find next story in epic, check other epics if none, activate found work  
**Progress Updates:** Use `/icc-update-progress [item_hierarchy]` to update all parent items and recalculate completion percentages

## Benefits

- **Automatic Progression**: Tasks flow without manual intervention
- **Smart Error Handling**: Auto-recovery for common issues
- **Phase Management**: Automatic phase transitions
- **Continuous Discovery**: Always finding next work