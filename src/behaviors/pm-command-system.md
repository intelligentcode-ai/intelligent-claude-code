# PM Command System

**MANDATORY:** MUST use PM commands. Auto-correct violations.

**Purpose:** System management commands for PM role

## PM Commands

### Core Commands
- **@PM init** - Initialize system with configuration, autonomy level, role activation, memory, and task management
- **@PM refresh** - Reload configuration, refresh role capabilities, update behavioral patterns, sync memory
- **@PM reset** - Clear accumulated state while preserving configuration, reset scores, reinitialize
- **@PM status** - Display configuration, active roles, memory stats, task status, system health
- **@PM help** - Show available commands

### Command Restrictions
- Commands only work for @PM role
- Validate role before execution
- Show appropriate errors for invalid commands or wrong role

### Command Behavior
- **Init:** Load config → Set autonomy level → Activate PM if configured → Initialize memory/tasks
- **Refresh:** Reload config → Detect changes → Refresh roles → Update patterns → Sync memory
- **Reset:** Preserve config → Clear states/history → Reset scores → Reinitialize
- **Status:** Show config/roles/memory/tasks/health with current values

### Error Handling
- NOT_PM_ROLE: "❌ Error: PM commands can only be executed by @PM role"
- INVALID_COMMAND: "❌ Error: Unknown PM command. Use '@PM help' for available commands"
- SYSTEM_BUSY: "⏳ System busy. Please wait for current operation to complete"

---
*PM command system architecture for intelligent-claude-code*