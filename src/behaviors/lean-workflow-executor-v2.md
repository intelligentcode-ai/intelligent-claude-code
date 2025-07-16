# Lean Workflow Executor v2

**PURPOSE:** Simple module that reads assignment files and executes workflows. The workflow IS the behavior.

## Imports

@./config-loader.md           # Configuration management
@./git-privacy-enforcer.md    # Git privacy feature  
@./role-detection-engine.md   # @-notation detection
@./role-assignment-validator.md # Role validation
@../roles/specialists.md      # Role definitions

## Core Functions

### 1. Read Assignment
```pseudocode
FUNCTION readAssignment(type, id):
    // Simple file reading
    path = getAssignmentPath(type, id)
    content = readYamlFile(path)
    
    // Apply embedded config if present
    IF content.embedded_config:
        applyEmbeddedConfig(content.embedded_config)
    
    RETURN content
```

### 2. Execute Workflow
```pseudocode
FUNCTION executeWorkflow(assignment):
    // Check autonomy level once
    isL3 = getConfig("autonomy_level") == "L3"
    
    // Execute based on phase
    SWITCH assignment.phase:
        CASE "INIT":
            planWork(assignment)
        CASE "PLAN":
            createTasks(assignment)
        CASE "EXECUTE":
            executeTasks(assignment, isL3)
        CASE "ACCEPTANCE":
            validateWork(assignment)
        CASE "DONE":
            captureKnowledge(assignment)
```

### 3. Assign Role
```pseudocode
FUNCTION assignRole(task):
    // Detect role from @-notation
    role = detectRole(task.assigned_to)
    
    // Validate assignment
    validation = validateAssignment(task, role)
    IF NOT validation.valid:
        role = validation.suggestedRole
    
    // Simple role activation
    activateRole(role)
    RETURN role
```

### 4. Update Progress
```pseudocode
FUNCTION updateProgress(item, newStatus):
    // Simple status update
    item.status = newStatus
    
    // Write back to file
    writeYamlFile(item.path, item)
    
    // Update parent if needed
    IF item.parent:
        updateParentProgress(item.parent)
```

## Simplified Operations

### L3 Mode Check
```pseudocode
// No complex autonomy controller needed
IF getConfig("autonomy_level") == "L3":
    // Execute without asking
    executeDirectly()
ELSE:
    // Ask for approval
    requestApproval()
```

### Memory Storage
```pseudocode
// Simple memory operations without complex learning system
FUNCTION storeKnowledge(item, knowledge):
    memory.create({
        name: item.id + "-knowledge",
        type: "Knowledge",
        content: knowledge
    })
```

### Git Operations
```pseudocode
// Use existing git privacy enforcer
FUNCTION commitWork(message, files):
    cleanMessage = enforceGitPrivacy(message)
    executeGitCommit(cleanMessage, files)
```

## What This Replaces

This lean executor replaces the entire complex system of:
- 13+ behavioral modules
- Complex monitoring loops
- Penalty and scoring systems
- Task queues and triggers
- Progress monitors
- Work discovery engines
- Complex state management

## Benefits

1. **80% Token Reduction**: From ~150k to ~30k tokens
2. **Simpler Logic**: Direct execution without loops
3. **Easier Maintenance**: Fewer moving parts
4. **Same Functionality**: All essential features preserved
5. **Faster Execution**: No overhead from complex systems

## Usage

```yaml
# In virtual-team.md, replace complex imports with:
@behaviors/lean-workflow-executor-v2.md

# That's it! The system is now lean.
```