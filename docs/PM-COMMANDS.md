# PM Commands Guide

This guide explains the PM (Project Manager) system management commands available in intelligent-claude-code.

## Overview

PM commands provide essential system management capabilities for initializing, refreshing, resetting, and monitoring the virtual team system. These commands are restricted to the @PM role to ensure proper system management authority.

## Available Commands

### @PM init

**Purpose:** Initialize or reinitialize the intelligent-claude-code system

**Usage:**
```bash
@PM init
```

**What it does:**
1. Loads system configuration (respecting priority hierarchy)
2. Sets autonomy level (L1/L2/L3)
3. Activates PM role if `pm_always_active: true`
4. Initializes memory system with project context
5. Loads all behavioral patterns
6. Initializes task management system

**Output Example:**
```
🚀 Initializing intelligent-claude-code system...
📋 Loading configuration...
  ✓ Configuration loaded: L3, PM active
🎯 Setting autonomy level: L3
👤 Activating PM role (pm_always_active: true)
🧠 Initializing memory system...
📚 Loading behavioral patterns...
✅ Initializing task management...

✨ System initialized successfully!
Mode: L3 | PM: Active
```

**When to use:**
- First time system setup
- After major configuration changes
- When system state is unknown
- To ensure clean initialization

### @PM refresh

**Purpose:** Refresh system capabilities and reload configuration

**Usage:**
```bash
@PM refresh
```

**What it does:**
1. Reloads configuration files (clears cache)
2. Detects and reports configuration changes
3. Refreshes all role capabilities
4. Updates behavioral patterns
5. Synchronizes memory system
6. Applies any new settings

**Output Example:**
```
🔄 Refreshing system capabilities...
📋 Reloading configuration...
  ✓ Configuration changes detected:
    - autonomy_level: L2 → L3
👥 Refreshing role capabilities...
  ✓ 14 roles refreshed
📚 Updating behavioral patterns...
  ✓ 6 patterns updated
🧠 Synchronizing memory...
  ✓ Memory synchronized: 45 entities, 120 relations
⚙️ Applying new settings...

✨ System refreshed successfully!
```

**When to use:**
- After modifying configuration files
- To pick up new behavioral patterns
- When adding new roles or capabilities
- To synchronize memory after external changes

### @PM reset

**Purpose:** Reset system to clean state while preserving configuration

**Usage:**
```bash
@PM reset
```

**What it does:**
1. Saves current configuration
2. Clears all accumulated state
3. Resets all role scores to 0.0
4. Clears all penalties
5. Empties all caches
6. Reinitializes with saved configuration

**Output Example:**
```
🔧 Resetting system to clean state...
⚠️ This will clear accumulated state while preserving configuration
💾 Preserving configuration...
🧹 Clearing accumulated state...
  ✓ Role states cleared
  ✓ Task history cleared
  ✓ Temporary data cleared
📊 Resetting scores and penalties...
  ✓ All role scores reset to 0.0
  ✓ All penalties cleared
🗑️ Clearing caches...
  ✓ Configuration cache cleared
  ✓ Role cache cleared
  ✓ Memory cache cleared
🔄 Reinitializing with saved configuration...

✨ System reset complete!
```

**When to use:**
- When system has accumulated errors
- To clear penalties and start fresh
- When role scores need resetting
- To resolve stuck states

### @PM status

**Purpose:** Display comprehensive system status report

**Usage:**
```bash
@PM status
```

**What it does:**
1. Shows current configuration settings
2. Lists active roles with scores
3. Displays memory system statistics
4. Shows task management metrics
5. Reports system health status

**Output Example:**
```
📊 System Status Report
========================================

⚙️ Configuration:
  Autonomy Level: L3
  PM Active: true
  Blocking: false
  Git Privacy: true

👥 Active Roles:
  @PM (P:5.5, Q:8.0)
  @AI-Engineer (P:7.0, Q:9.5)

🧠 Memory System:
  Entities: 45
  Relations: 120
  Last Update: 2025-01-15 14:45:00

✅ Task Management:
  Pending: 8
  In Progress: 2
  Completed: 15

💚 System Health:
  Status: Healthy
  Uptime: 2h 30m
  Last Command: @PM refresh
```

**When to use:**
- To check current system state
- Before making configuration changes
- To monitor role performance
- For troubleshooting issues

## Command Restrictions

### Role Requirements
- **All PM commands require @PM role**
- Other roles will receive: `❌ Error: PM commands can only be executed by @PM role`
- This ensures proper system management authority

### Error Messages
- **Invalid command:** `❌ Error: Unknown PM command. Use '@PM help' for available commands`
- **System busy:** `⏳ System busy. Please wait for current operation to complete`
- **General error:** `❌ Error executing command: [specific error message]`

## Common Workflows

### Initial Setup
```bash
# 1. Initialize system
@PM init

# 2. Check status
@PM status

# 3. Begin work
@PM Create bug tracking system
```

### Configuration Change
```bash
# 1. Modify config file (e.g., .claude/config.md)
# Change autonomy_level from L2 to L3

# 2. Refresh system
@PM refresh

# 3. Verify changes
@PM status
```

### Recovery from Issues
```bash
# 1. Check current state
@PM status

# 2. Reset if needed
@PM reset

# 3. Verify clean state
@PM status
```

### Daily Workflow
```bash
# Morning: Check system health
@PM status

# After config changes: Refresh
@PM refresh

# End of sprint: Reset scores
@PM reset
```

## Configuration Integration

PM commands respect the configuration hierarchy:
1. Embedded config (in assignment files)
2. Project config (.claude/config.md)
3. User config (~/.claude/config.md)
4. System defaults

Key settings that affect PM commands:
- `pm_always_active`: Auto-activates PM role on init
- `autonomy_level`: Sets L1/L2/L3 behavior
- `blocking_enabled`: Affects task execution
- `git_privacy`: Controls commit message filtering

## Troubleshooting

### System Won't Initialize
1. Check configuration files are valid YAML
2. Ensure PM role is active: `@PM`
3. Try reset first: `@PM reset`

### Configuration Not Loading
1. Check file permissions
2. Verify YAML syntax
3. Use `@PM refresh` to reload

### Scores Not Resetting
1. Use `@PM reset` (not just refresh)
2. Check for active penalties
3. Verify with `@PM status`

### Commands Not Working
1. Ensure you're using @PM role
2. Check for exact command spelling
3. Look for system busy messages

## Best Practices

1. **Regular Status Checks**: Use `@PM status` to monitor system health
2. **Refresh After Changes**: Always `@PM refresh` after config modifications
3. **Reset Sparingly**: Use `@PM reset` only when needed (clears history)
4. **Init Once**: Usually only needed on first setup or major issues

## Technical Details

### State Management
- Configuration is always preserved during reset
- Role states are cleared but role definitions remain
- Memory system maintains project entity
- Scores reset to 0.0, not removed

### Performance
- init: ~200ms (comprehensive initialization)
- refresh: ~150ms (incremental updates)
- reset: ~250ms (full state clearing)
- status: ~50ms (read-only query)

### Integration Points
- Hooks into lean workflow executor
- Uses configuration loader with caching
- Integrates with role activation system
- Coordinates with memory system

## Summary

PM commands provide essential system management capabilities:
- **@PM init**: Initialize system from any state
- **@PM refresh**: Update configuration and capabilities
- **@PM reset**: Clear state while preserving config
- **@PM status**: Monitor system health and state

These commands ensure the virtual team system remains manageable, recoverable, and observable throughout development workflows.