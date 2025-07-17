# icc:init-system

Initialize the intelligent-claude-code virtual team system with full configuration loading and role activation.

## Usage
```
icc-init-system
```

## Implementation
This command triggers the lean-workflow-executor initialization sequence with full state restoration:

1. **Config Load**: Load ~/.claude/config.md → Apply to workflow context
2. **STATE RESTORATION**: Execute icc-restore-state → Restore behavioral patterns
3. **Memory Bootstrap**: Search memory for project context → Load state  
4. **Role Definitions**: Load specialist roles and capabilities
5. **Workflow Engine**: Activate lean workflow executor
6. **Scoring System**: Initialize badges.md scoring system
7. **Learning System**: Activate learning-team-automation.md
8. **Assignment Reading**: Ready to read story/task assignment files
9. **BEHAVIORAL VALIDATION**: Execute icc-verify-behaviors → Verify all patterns restored correctly
10. **RECOVERY CONFIRMATION**: Confirm full system restoration complete

## Expected Output
```
✅ Config loaded and applied
🔄 Executing state restoration...
✅ System state fully restored
✅ Memory system operational  
✅ Role definitions loaded
✅ Lean workflow executor active
✅ Scoring system operational
✅ Learning system active
✅ Assignment file processing ready
🔍 Verifying all behaviors...
✅ ALL BEHAVIORS VERIFIED

🚀 Virtual team system initialized with full recovery
Mode: L3 | PM: Active | Commands: Available | State: RESTORED
```

## Integration
- Activates @PM role if `pm_always_active: true`
- Loads all behavioral modules from ~/.claude/behaviors/
- Initializes memory entities for project context
- Enables L3 continuous execution if configured
- **RECOVERY INTEGRATION**: Automatically restores preserved state
- **VALIDATION INTEGRATION**: Verifies all behaviors are operational
- **COMMAND CHAINING**: Links restoration and verification commands