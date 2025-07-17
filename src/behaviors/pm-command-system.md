# PM Command System Architecture

**Purpose:** System management commands for PM role  
**Type:** Command Processing Component  
**Status:** DESIGNED

## Command Architecture

### Core Command Processor

```pseudocode
CLASS PMCommandProcessor:
    configLoader: ConfigLoader
    roleController: RoleActivationController
    autonomyController: AutonomyController
    memorySystem: MemorySystemAPI
    systemState: SystemState
    
    FUNCTION processCommand(command):
        // Parse PM commands
        IF NOT command.startsWith("@PM"):
            RETURN null
        
        commandParts = command.split(" ")
        pmCommand = commandParts[1].toLowerCase()
        
        SWITCH pmCommand:
            CASE "init":
                RETURN executeInit()
            CASE "refresh":
                RETURN executeRefresh()
            CASE "reset":
                RETURN executeReset()
            CASE "status":
                RETURN executeStatus()
            CASE "help":
                RETURN showHelp()
            DEFAULT:
                RETURN "Unknown PM command: " + pmCommand
    
    FUNCTION executeInit():
        output = []
        output.append("🚀 Initializing intelligent-claude-code system...")
        
        // Step 1: Load configuration
        output.append("📋 Loading configuration...")
        configLoader.clearCache()
        config = configLoader.loadConfiguration()
        output.append("  ✓ Configuration loaded: " + summarizeConfig(config))
        
        // Step 2: Initialize autonomy
        output.append("🎯 Setting autonomy level: " + config.autonomy_level)
        autonomyController.initialize()
        
        // Step 3: Activate PM role if configured
        IF config.pm_always_active:
            output.append("👤 Activating PM role (pm_always_active: true)")
            roleController.activateRole("PM")
        
        // Step 4: Initialize memory system
        output.append("🧠 Initializing memory system...")
        initializeMemory()
        
        // Step 5: Load behavioral patterns
        output.append("📚 Loading behavioral patterns...")
        loadBehavioralPatterns()
        
        // Step 6: Initialize todo system
        output.append("✅ Initializing task management...")
        initializeTodoSystem()
        
        // Step 7: System ready
        output.append("\n✨ System initialized successfully!")
        output.append("Mode: " + config.autonomy_level + " | PM: " + 
                     (config.pm_always_active ? "Active" : "Manual"))
        
        RETURN output.join("\n")
```

### Refresh Command Implementation

```pseudocode
FUNCTION executeRefresh():
    output = []
    output.append("🔄 Refreshing system capabilities...")
    
    // Step 1: Reload configuration
    output.append("📋 Reloading configuration...")
    configLoader.clearCache()
    newConfig = configLoader.loadConfiguration()
    configChanges = detectConfigChanges(systemState.config, newConfig)
    
    IF configChanges.length > 0:
        output.append("  ✓ Configuration changes detected:")
        FOR change IN configChanges:
            output.append("    - " + change)
    ELSE:
        output.append("  ✓ No configuration changes")
    
    // Step 2: Refresh role capabilities
    output.append("👥 Refreshing role capabilities...")
    refreshedRoles = refreshRoleCapabilities()
    output.append("  ✓ " + refreshedRoles.length + " roles refreshed")
    
    // Step 3: Update behavioral patterns
    output.append("📚 Updating behavioral patterns...")
    patternsUpdated = updateBehavioralPatterns()
    output.append("  ✓ " + patternsUpdated + " patterns updated")
    
    // Step 4: Sync memory system
    output.append("🧠 Synchronizing memory...")
    memorySyncResult = syncMemorySystem()
    output.append("  ✓ Memory synchronized: " + memorySyncResult)
    
    // Step 5: Apply new settings
    IF configChanges.length > 0:
        output.append("⚙️ Applying new settings...")
        applyConfigurationChanges(newConfig)
    
    output.append("\n✨ System refreshed successfully!")
    RETURN output.join("\n")
```

### Reset Command Implementation

```pseudocode
FUNCTION executeReset():
    output = []
    output.append("🔧 Resetting system to clean state...")
    output.append("⚠️ This will clear accumulated state while preserving configuration")
    
    // Step 1: Save current configuration
    output.append("💾 Preserving configuration...")
    savedConfig = systemState.config
    
    // Step 2: Clear accumulated state
    output.append("🧹 Clearing accumulated state...")
    clearSystemState()
    output.append("  ✓ Role states cleared")
    output.append("  ✓ Task history cleared")
    output.append("  ✓ Temporary data cleared")
    
    // Step 3: Reset scores and penalties
    output.append("📊 Resetting scores and penalties...")
    resetScoresAndPenalties()
    output.append("  ✓ All role scores reset to 0.0")
    output.append("  ✓ All penalties cleared")
    
    // Step 4: Clear caches
    output.append("🗑️ Clearing caches...")
    clearAllCaches()
    output.append("  ✓ Configuration cache cleared")
    output.append("  ✓ Role cache cleared")
    output.append("  ✓ Memory cache cleared")
    
    // Step 5: Reinitialize with saved config
    output.append("🔄 Reinitializing with saved configuration...")
    systemState.config = savedConfig
    executeInit()
    
    output.append("\n✨ System reset complete!")
    RETURN output.join("\n")
```

### Status Command Implementation

```pseudocode
FUNCTION executeStatus():
    output = []
    output.append("📊 System Status Report")
    output.append("=" * 40)
    
    // Configuration status
    output.append("\n⚙️ Configuration:")
    config = systemState.config
    output.append("  Autonomy Level: " + config.autonomy_level)
    output.append("  PM Active: " + config.pm_always_active)
    output.append("  Blocking: " + config.blocking_enabled)
    output.append("  Git Privacy: " + config.git_privacy)
    
    // Active roles
    output.append("\n👥 Active Roles:")
    activeRoles = roleController.getActiveRoles()
    FOR role IN activeRoles:
        output.append("  @" + role.name + " (P:" + role.scores.P + 
                     ", Q:" + role.scores.Q + ")")
    
    // Memory status
    output.append("\n🧠 Memory System:")
    memoryStats = memorySystem.getStatistics()
    output.append("  Entities: " + memoryStats.entityCount)
    output.append("  Relations: " + memoryStats.relationCount)
    output.append("  Last Update: " + memoryStats.lastUpdate)
    
    // Task status
    output.append("\n✅ Task Management:")
    todoStats = getTodoStatistics()
    output.append("  Pending: " + todoStats.pending)
    output.append("  In Progress: " + todoStats.inProgress)
    output.append("  Completed: " + todoStats.completed)
    
    // System health
    output.append("\n💚 System Health:")
    health = checkSystemHealth()
    output.append("  Status: " + health.status)
    output.append("  Uptime: " + health.uptime)
    output.append("  Last Command: " + health.lastCommand)
    
    RETURN output.join("\n")
```

### Helper Functions

```pseudocode
FUNCTION initializeMemory():
    // Initialize memory system with project context
    memorySystem.initialize()
    
    // Create initial project entity
    projectEntity = {
        name: "intelligent-claude-code-project",
        type: "Project",
        observations: [
            "Virtual development team system",
            "14 specialized roles",
            "Command chain coordination",
            "Behavioral framework"
        ]
    }
    memorySystem.createEntity(projectEntity)

FUNCTION loadBehavioralPatterns():
    // Load all behavioral patterns from src/behaviors/
    patterns = [
        "lean-workflow-executor",
        "config-loader", 
        "git-privacy-enforcer",
        "role-detection-engine",
        "autonomy-controller",
        "role-activation-system"
    ]
    
    FOR pattern IN patterns:
        loadBehavioralPattern(pattern)

FUNCTION refreshRoleCapabilities():
    refreshedRoles = []
    
    // Reload role profiles
    roleProfiles = loadRoleProfiles()
    
    // Update each role with new capabilities
    FOR roleName, profile IN roleProfiles:
        roleController.updateRoleProfile(roleName, profile)
        refreshedRoles.append(roleName)
    
    RETURN refreshedRoles

FUNCTION clearSystemState():
    // Clear role states
    roleController.clearAllStates()
    
    // Clear task history
    clearTaskHistory()
    
    // Clear temporary data
    clearTemporaryData()
    
    // Reset system counters
    resetSystemCounters()

FUNCTION detectConfigChanges(oldConfig, newConfig):
    changes = []
    
    // Check each configuration field
    fields = ["autonomy_level", "pm_always_active", 
              "blocking_enabled", "git_privacy"]
    
    FOR field IN fields:
        IF oldConfig[field] != newConfig[field]:
            changes.append(field + ": " + oldConfig[field] + 
                          " → " + newConfig[field])
    
    RETURN changes
```

## Integration Points

```yaml
integration_with_executor:
  command_detection:
    - Hook into message processing
    - Detect @PM commands
    - Route to PMCommandProcessor
    
  state_management:
    - Maintain system state
    - Track configuration
    - Monitor role states
    
  memory_integration:
    - Store command history
    - Track system changes
    - Capture learnings

integration_with_roles:
  pm_role_requirement:
    - Commands only work for PM role
    - Validate role before execution
    - Show appropriate errors
    
  role_coordination:
    - Coordinate with role controller
    - Update role states
    - Refresh capabilities
```

## Command Usage Examples

```yaml
# Initialize system
input: "@PM init"
output: |
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

# Refresh capabilities
input: "@PM refresh"
output: |
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

# Reset system
input: "@PM reset"
output: |
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

# Check status
input: "@PM status"
output: |
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
    Last Update: 2025-01-15 14:30:00
  
  ✅ Task Management:
    Pending: 8
    In Progress: 2
    Completed: 15
  
  💚 System Health:
    Status: Healthy
    Uptime: 2h 15m
    Last Command: @PM refresh
```

## Error Handling

```pseudocode
FUNCTION handleCommandError(command, error):
    IF error.type == "NOT_PM_ROLE":
        RETURN "❌ Error: PM commands can only be executed by @PM role"
    
    ELSE IF error.type == "INVALID_COMMAND":
        RETURN "❌ Error: Unknown PM command. Use '@PM help' for available commands"
    
    ELSE IF error.type == "SYSTEM_BUSY":
        RETURN "⏳ System busy. Please wait for current operation to complete"
    
    ELSE:
        RETURN "❌ Error executing command: " + error.message
```

---
*PM command system architecture for intelligent-claude-code*