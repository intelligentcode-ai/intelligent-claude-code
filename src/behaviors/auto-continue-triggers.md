# Auto-Continue Triggers

**Purpose:** Automatic progression between tasks and phases in L3 mode

## Trigger Registration

**Core Triggers:** task.completed → Next task • task.failed → Error recovery • phase.complete → Phase transition • error.occurred → Fix generation  
**Event Listening:** Monitor all task events → Match to registered handlers → Execute appropriate action  
**Handler Registration:** Map event types to handler actions → Start continuous listener

## Task Completion Flow

### Task Type Progression
- **Implementation** → Trigger testing tasks
- **Testing** → Trigger review process
- **Review** → Trigger documentation
- **Documentation** → Trigger git operations
- **Git operations** → Mark story complete

### Testing Triggers
**Find Test Tasks:** Get testing tasks from parent story → Check dependencies on completed task → Mark ready if dependent  
**No Tests Fallback:** IF no test tasks found → Skip to review phase → Log warning

## Phase Transitions

**Phase Progression:** PLAN → EXECUTE → ACCEPTANCE → DONE → ARCHIVED  
**Transition Conditions:**
- PLAN complete → All tasks created
- EXECUTE complete → All tasks done
- ACCEPTANCE complete → Criteria met
- DONE → Ready for archival

**Transition Actions:** Update phase → Record transition time → Activate new phase handlers

## Error Recovery

**Auto-Fix Detection:** Check if error type is auto-fixable → Generate fix → Apply and retry  
**Fix Task Creation:** IF not auto-fixable → Create fix task → Continue with other work  
**Common Auto-Fixes:**
- Test failures → Re-run with fixes
- Lint errors → Auto-format
- Import errors → Add missing imports

## Event Propagation

**Event Flow:** Receive event → Find handler → Create event object → Execute handler → Handle errors  
**Error Handling:** Catch handler errors → Create recovery task → Continue processing  
**Logging:** Log all events → Track event flow → Debug information available

## Continuous Flow

**Story Completion:** Mark story complete → Update phase to DONE → Update epic progress  
**Next Work Discovery:** Find next story in epic → IF none: Check other epics → Activate found work  
**Progress Updates:** Update all parent items → Recalculate completion percentages

## Benefits

- **Automatic Progression**: Tasks flow without manual intervention
- **Smart Error Handling**: Auto-recovery for common issues
- **Phase Management**: Automatic phase transitions
- **Continuous Discovery**: Always finding next work