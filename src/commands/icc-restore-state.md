# icc:restore-state

Restore full system state from preservation data after context compaction or system restart.

## Usage
```
/icc:restore-state
```

## Implementation
This command performs comprehensive state restoration:

1. **STATE FILE VALIDATION**: Verify .claude/system-state.json exists and is valid
2. **BEHAVIORAL RESTORATION**: Reload all behavioral modules and patterns
3. **ROLE STATE RESTORATION**: Restore active roles with scores and context
4. **WORKFLOW STATE RESTORATION**: Resume work items and task assignments
5. **MEMORY INTEGRATION**: Reconnect with MCP memory system
6. **ID TRACKER SYNC**: Ensure ID tracking system is current
7. **SCORING SYSTEM RESTORE**: Reload badges and achievements
8. **VALIDATION**: Verify all systems restored correctly

## Expected Output
```
🔄 Starting state restoration...
✅ State file validated (.claude/system-state.json)
✅ Behavioral modules restored (14 modules)
✅ Role states restored (@PM, @AI-Engineer active)
✅ Workflow state restored (BUG-024 in progress)
✅ Memory system reconnected (45 entities)
✅ ID tracker synchronized (NEXT_ID: 035)
✅ Scoring system restored (P:X.X, Q:Y.Y)
✅ All systems validated

🚀 System state fully restored
Last State: 2025-07-17T17:35:00Z | Mode: L3 | Active Work: BUG-024
```

## Recovery Process
- Loads state from .claude/system-state.json
- Activates behavioral patterns from ~/.claude/behaviors/
- Restores role context and assignments
- Resumes interrupted work items
- Validates system integrity

## Error Handling
- Missing state file → Initialize fresh state
- Corrupted state → Fallback to defaults with warning
- Partial restoration → Continue with available data
- Validation failure → Report issues and continue

## Integration
- Used by /icc:init-system for automatic restoration
- Can be called manually after context loss
- Integrates with ID tracking and memory systems
- Preserves all workflow and process states