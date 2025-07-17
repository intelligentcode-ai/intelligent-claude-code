# icc:verify-behaviors

Verify that all behavioral patterns and system components are functioning correctly after restoration.

## Usage
```
icc-verify-behaviors
```

## Implementation
This command performs comprehensive behavioral validation:

1. **BEHAVIORAL MODULE CHECK**: Verify all ~/.claude/behaviors/ modules are loaded
2. **ROLE SYSTEM CHECK**: Test @-notation role switching functionality
3. **WORKFLOW ENGINE CHECK**: Validate lean-workflow-executor is active
4. **MEMORY INTEGRATION CHECK**: Test MCP memory system connectivity
5. **SCORING SYSTEM CHECK**: Verify badges.md scoring is operational
6. **COMMAND SYSTEM CHECK**: Test all icc- commands are available
7. **ID TRACKING CHECK**: Validate ID-TRACKER.md is functional
8. **L3 AUTONOMY CHECK**: Verify L3 continuous execution if configured

## Expected Output
```
🔍 Starting behavioral verification...

✅ BEHAVIORAL MODULES (8/8 loaded)
  ✓ lean-workflow-executor.md
  ✓ role-activation-system.md
  ✓ learning-team-automation.md
  ✓ l3-continuous-engine.md
  ✓ task-queue-manager.md
  ✓ auto-continue-triggers.md
  ✓ progress-monitor.md
  ✓ work-discovery-engine.md

✅ ROLE SYSTEM OPERATIONAL
  ✓ @PM role activation working
  ✓ @AI-Engineer role switching functional
  ✓ Dynamic specialist creation enabled
  ✓ Role score tracking active

✅ WORKFLOW ENGINE ACTIVE
  ✓ Assignment file processing ready
  ✓ Validation command chains functional
  ✓ Phase transitions operational
  ✓ Task execution pipeline ready

✅ MEMORY INTEGRATION WORKING
  ✓ MCP memory server connected
  ✓ Entity creation/retrieval functional
  ✓ Learning storage operational

✅ SCORING SYSTEM FUNCTIONAL
  ✓ badges.md scoring active
  ✓ Achievement tracking working
  ✓ Process/Quality metrics updated

✅ COMMAND SYSTEM READY
  ✓ All icc- commands available
  ✓ PM commands operational
  ✓ Recovery commands functional

✅ ID TRACKING OPERATIONAL
  ✓ ID-TRACKER.md accessible
  ✓ Global unique ID system working
  ✓ Transparency logging active

✅ L3 AUTONOMY CONFIGURED
  ✓ Continuous execution engine ready
  ✓ Task queue manager operational
  ✓ Auto-continue triggers active

🎯 ALL BEHAVIORS VERIFIED
System: FULLY OPERATIONAL | Mode: L3 | Status: READY
```

## Validation Tests
- **Workflow Compliance**: Test assignment file processing
- **Role Switching**: Verify @-notation functionality
- **Memory Access**: Test knowledge retrieval/storage
- **Command Execution**: Validate all slash commands
- **Scoring Updates**: Test achievement tracking
- **Process Adherence**: Verify workflow enforcement

## Error Detection
- Missing behavioral modules → Report and suggest restoration
- Broken role system → Provide troubleshooting steps
- Memory connectivity issues → Test fallback mechanisms
- Command failures → Identify specific broken commands
- Scoring malfunctions → Reset and reinitialize system

## Integration
- Called after icc-restore-state for verification
- Can be used for system health checks
- Provides diagnostic information for troubleshooting
- Validates all critical system components