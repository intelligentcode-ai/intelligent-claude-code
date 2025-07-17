# Planning Commands

**CORE:** Structured task management•Phase-based workflow•Assignment files•Explicit criteria

## icc:plan-task
**PURPOSE:** Create structured task with assignment file and planning workflow
**TRIGGER:** User needs planned implementation of feature/bug/enhancement
**AUTHORITY:** @PM initiates with @Architect consultation

**USAGE:**
```bash
icc:plan-task "Implement user authentication system"
icc:plan-task "Fix memory leak in worker process" --type bug
icc:plan-task "Add dark mode support" --epic EPIC-UI-001
```

**PROTOCOL:**
```pseudocode
FUNCTION planTask(description, type="feature", epic=null):
    // PHASE 1: INITIALIZATION
    taskId = generateTaskId()
    assignmentFile = createFromTemplate()
    assignmentFile.problemDescription = description
    assignmentFile.type = type
    assignmentFile.epic = epic
    assignmentFile.phase = "INIT"
    
    // PHASE 2: PLANNING (PM + Architect)
    pmAnalysis = analyzeProblem(description)
    architectDesign = consultArchitect(pmAnalysis)
    
    // Define acceptance criteria
    acceptanceCriteria = defineAcceptanceCriteria(pmAnalysis, architectDesign)
    
    // Calculate role assignments
    requiredCapabilities = extractRequiredCapabilities(architectDesign)
    primaryRole = assignRole(requiredCapabilities)
    
    // Break into subtasks
    subtasks = createSubtasks(architectDesign)
    
    // Define git operations
    gitOps = defineGitOperations(taskId, description)
    
    // Update assignment file
    updateAssignmentFile(assignmentFile, {
        acceptanceCriteria,
        primaryRole,
        subtasks,
        gitOps,
        phase: "PLAN"
    })
    
    RETURN assignmentFile
END FUNCTION
```

**ENFORCEMENT:**
- **PM-ARCHITECT CONSULTATION**: Mandatory for all planning
- **CAPABILITY MATCHING**: Must calculate and document match %
- **ACCEPTANCE CRITERIA**: Required before execution
- **SUBTASK DEFINITION**: Atomic operations with clear outcomes

## icc:execute-task
**PURPOSE:** Execute task following assignment file specifications
**TRIGGER:** Task in EXECUTE phase with complete planning
**AUTHORITY:** Assigned role(s) execute autonomously

**USAGE:**
```bash
icc:execute-task TASK-001
icc:execute-task TASK-002 --subtask ST-003  # Resume from specific subtask
```

**PROTOCOL:**
```pseudocode
FUNCTION executeTask(taskId, startSubtask=null):
    assignmentFile = loadAssignmentFile(taskId)
    
    // Validate execution readiness
    IF assignmentFile.phase != "EXECUTE":
        RETURN "Task not ready for execution"
    
    // Execute subtasks
    FOR subtask IN assignmentFile.subtasks:
        IF startSubtask AND subtask.id < startSubtask:
            CONTINUE
            
        role = subtask.assignedTo
        result = executeSubtask(role, subtask)
        
        // Handle outcomes
        SWITCH result.outcome:
            CASE "continue_to":
                updateProgress(subtask, "completed")
                CONTINUE
            CASE "back_to":
                updateProgress(subtask, "revision_needed")
                JUMP TO result.target
            CASE "blocked_by":
                updateProgress(subtask, "blocked")
                HALT
    
    // All subtasks complete
    assignmentFile.phase = "ACCEPTANCE"
    RETURN "Ready for acceptance"
END FUNCTION
```

**ENFORCEMENT:**
- **ASSIGNMENT FILE**: Required for execution
- **ROLE VALIDATION**: Only assigned roles can execute
- **PROGRESS TRACKING**: Real-time updates required
- **OUTCOME HANDLING**: Explicit flow control

## icc:accept-task
**PURPOSE:** Validate task completion against acceptance criteria
**TRIGGER:** All subtasks completed
**AUTHORITY:** @QA roles and user validation

**USAGE:**
```bash
icc:accept-task TASK-001
icc:accept-task TASK-002 --criteria AC-003  # Check specific criteria
```

**PROTOCOL:**
```pseudocode
FUNCTION acceptTask(taskId, specificCriteria=null):
    assignmentFile = loadAssignmentFile(taskId)
    
    // Validate readiness
    IF assignmentFile.phase != "ACCEPTANCE":
        RETURN "Task not ready for acceptance"
    
    results = []
    
    // Check each acceptance criteria
    FOR criteria IN assignmentFile.acceptanceCriteria:
        IF specificCriteria AND criteria.id != specificCriteria:
            CONTINUE
            
        SWITCH criteria.validationMethod:
            CASE "automated_test":
                result = runAutomatedTests(criteria)
            CASE "manual_review":
                result = requestManualReview(criteria)
            CASE "security_scan":
                result = runSecurityScan(criteria)
            CASE "peer_review":
                result = checkPeerReview(criteria)
                
        updateCriteriaStatus(criteria, result)
        results.append(result)
    
    // Determine overall status
    IF all(results.passed):
        assignmentFile.phase = "DONE"
        executeCompletionOps(assignmentFile)
    ELSE:
        assignmentFile.phase = "INIT"  // Back to refinement
        
    RETURN results
END FUNCTION
```

**ENFORCEMENT:**
- **ALL CRITERIA**: Must pass for completion
- **VALIDATION METHODS**: Appropriate validators required
- **USER FEEDBACK**: Incorporated in acceptance
- **COMPLETION OPS**: Git operations executed on success

## icc:task-status
**PURPOSE:** Display current task status and progress
**TRIGGER:** Status check needed
**AUTHORITY:** Any role can check status

**USAGE:**
```bash
icc:task-status TASK-001
icc:task-status --all
icc:task-status --phase EXECUTE
```

**PROTOCOL:**
```pseudocode
FUNCTION taskStatus(taskId=null, all=false, phase=null):
    IF taskId:
        task = loadAssignmentFile(taskId)
        RETURN formatTaskStatus(task)
    ELIF all OR phase:
        tasks = loadAllTasks()
        IF phase:
            tasks = filterByPhase(tasks, phase)
        RETURN formatMultipleTaskStatus(tasks)
END FUNCTION
```

## Integration Patterns

### Memory Integration
```
Before planning: searchMemory("similar tasks")
After completion: storeTaskLearnings(outcomes)
```

### Git Integration
```
Branch creation: git checkout -b {assignmentFile.git.branch.name}
Commit format: Follow assignmentFile.git.commit.requirements
```

### Future JIRA Integration
```
Task creation: POST /rest/api/2/issue
Status updates: PUT /rest/api/2/issue/{id}/transitions
```

## @PM Management Commands

### @PM init
**PURPOSE:** Initialize/reset system state and load configuration
**TRIGGER:** System startup or state corruption
**AUTHORITY:** PM role exclusive

**USAGE:**
```bash
@PM init
```

**PROTOCOL:**
```pseudocode
FUNCTION pmInit():
    // Load configuration hierarchy
    configLoader.clearCache()
    config = configLoader.loadConfiguration()
    
    // Initialize autonomy controller
    autonomyController.initialize()
    
    // Activate PM if configured
    IF config.pm_always_active:
        roleController.activateRole("PM")
    
    // Initialize memory system
    memorySystem.initialize()
    createProjectEntity()
    
    // Load behavioral patterns
    loadBehavioralPatterns()
    
    // Initialize task management
    initializeTodoSystem()
    
    RETURN "System initialized successfully"
END FUNCTION
```

**ENFORCEMENT:**
- **PM ONLY**: Command restricted to PM role
- **STATE CLEAR**: Clears accumulated state
- **CONFIG LOAD**: Respects priority hierarchy
- **MEMORY INIT**: Creates project context

### @PM refresh
**PURPOSE:** Refresh team capabilities and reload configuration
**TRIGGER:** Configuration changes or capability updates
**AUTHORITY:** PM role exclusive

**USAGE:**
```bash
@PM refresh
```

**PROTOCOL:**
```pseudocode
FUNCTION pmRefresh():
    // Reload configuration
    oldConfig = systemState.config
    newConfig = configLoader.loadConfiguration()
    changes = detectConfigChanges(oldConfig, newConfig)
    
    // Refresh role capabilities
    roleProfiles = reloadRoleProfiles()
    updateAllRoles(roleProfiles)
    
    // Update behavioral patterns
    refreshBehavioralPatterns()
    
    // Sync memory system
    memorySyncResult = memorySystem.sync()
    
    // Apply configuration changes
    IF changes.length > 0:
        applyConfigurationChanges(newConfig)
    
    RETURN "System refreshed: " + summarizeChanges(changes)
END FUNCTION
```

**ENFORCEMENT:**
- **LIVE UPDATE**: Updates without restart
- **CHANGE DETECTION**: Reports what changed
- **CAPABILITY SYNC**: All roles updated
- **MEMORY PRESERVE**: Keeps existing knowledge

### @PM reset
**PURPOSE:** Reset system to clean state while preserving configuration
**TRIGGER:** Accumulated errors or clean slate needed
**AUTHORITY:** PM role exclusive

**USAGE:**
```bash
@PM reset
```

**PROTOCOL:**
```pseudocode
FUNCTION pmReset():
    // Save configuration
    savedConfig = systemState.config
    
    // Clear all state
    roleController.clearAllStates()
    clearTaskHistory()
    clearTemporaryData()
    
    // Reset scores and penalties
    resetAllScores()
    clearAllPenalties()
    
    // Clear all caches
    configLoader.clearCache()
    roleController.clearCache()
    memorySystem.clearCache()
    
    // Reinitialize with saved config
    systemState.config = savedConfig
    pmInit()
    
    RETURN "System reset complete"
END FUNCTION
```

**ENFORCEMENT:**
- **CONFIG PRESERVE**: Maintains settings
- **STATE CLEAR**: All accumulated state removed
- **SCORE RESET**: All roles start fresh
- **CACHE CLEAR**: Forces reload

### @PM status
**PURPOSE:** Display comprehensive system status
**TRIGGER:** Health check or debugging
**AUTHORITY:** PM role exclusive

**USAGE:**
```bash
@PM status
```

**PROTOCOL:**
```pseudocode
FUNCTION pmStatus():
    status = {}
    
    // Configuration status
    status.config = {
        autonomy: config.autonomy_level,
        pm_active: config.pm_always_active,
        blocking: config.blocking_enabled,
        git_privacy: config.git_privacy
    }
    
    // Active roles
    status.roles = roleController.getActiveRoles()
    
    // Memory statistics
    status.memory = memorySystem.getStatistics()
    
    // Task statistics
    status.tasks = getTodoStatistics()
    
    // System health
    status.health = checkSystemHealth()
    
    RETURN formatStatusReport(status)
END FUNCTION
```

## Command Chaining

**TYPICAL FLOW:**
```
icc:plan-task → icc:execute-task → icc:accept-task → DONE
     ↓              ↓              ↓
  (PLAN)       (EXECUTE)     (ACCEPTANCE)
```

**PM MANAGEMENT FLOW:**
```
@PM init → System Ready → Normal Operations
    ↓           ↓              ↓
@PM reset   @PM refresh   @PM status
```

**ERROR HANDLING:**
```
icc:accept-task (failed) → icc:plan-task (refinement) → icc:execute-task
```