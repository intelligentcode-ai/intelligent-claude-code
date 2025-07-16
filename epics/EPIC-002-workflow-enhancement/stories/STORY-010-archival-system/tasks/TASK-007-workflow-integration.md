# TASK-007 Integrate with Workflow Executor

**Task:** Integrate with workflow executor  
**Assigned to:** @AI-Engineer  
**Status:** COMPLETED ✅  
**Priority:** critical_path  
**Dependencies:** [TASK-004]

## Integration Requirements

Integrate the archival system with the lean workflow executor.

### Integration Points

1. **Task Completion Hooks**
   - Hook into onTaskComplete
   - Check parent for archival readiness
   - Schedule archival checks

2. **Phase Change Hooks**
   - Monitor phase transitions
   - Trigger on "ARCHIVED" phase
   - Schedule archival after delay

3. **PM Command Integration**
   - Extend PM command system
   - Add archive commands
   - Add restore functionality

4. **Workflow Events**
   - Listen for completion events
   - Process archival candidates
   - Update workflow state

## Implementation Complete

Workflow integration implemented in archival-intelligence.md:
- Complete integration logic (lines 313-352)
- Task completion hooks
- Phase change monitoring
- PM command extensions
- Parent archival checks

Additional integration needed in lean-workflow-executor.md:
- Import archival-intelligence module
- Initialize archival system
- Register hooks on startup

## Success Criteria ✅

- Archival triggers on completion
- PM commands integrated
- Workflow events captured
- Seamless operation