# Autonomy Controller

**Purpose:** Control system autonomy levels (L1/L2/L3)  
**Type:** Behavioral Control Component  
**Status:** ACTIVE

## Imports

@./common-patterns.md                      # Shared behavioral patterns

## Autonomy Level Implementation

### Core Autonomy Controller

```pseudocode
CLASS AutonomyController:
    settings: Settings
    approvalQueue: Queue<ApprovalRequest>
    continuousMode: boolean
    
    FUNCTION initialize():
        settings = GetSettings()  // Use common pattern
        continuousMode = (settings.autonomy_level == "L3")
        
        IF settings.pm_always_active:
            activatePMRole()
        
        IF continuousMode:
            startContinuousLoop()
    
    FUNCTION applyAutonomyLevel(action):
        settings = GetSettings()  // Use common pattern
        
        SWITCH settings.autonomy_level:
            CASE "L1":
                RETURN handleL1Mode(action)
            CASE "L2":
                RETURN handleL2Mode(action)
            CASE "L3":
                RETURN handleL3Mode(action)
            DEFAULT:
                // Default to most restrictive
                RETURN handleL1Mode(action)
    
    FUNCTION handleL1Mode(action):
        // L1: User approval for everything
        approvalRequest = {
            action: action,
            type: "user_approval",
            reason: "L1 mode - user approval required",
            timestamp: getCurrentTime()
        }
        
        // Queue the request
        approvalQueue.add(approvalRequest)
        
        // Wait for approval
        RETURN waitForUserApproval(approvalRequest)
    
    FUNCTION handleL2Mode(action):
        // L2: Architect approval for technical decisions
        IF isTechnicalDecision(action):
            approvalRequest = {
                action: action,
                type: "architect_approval",
                reason: "L2 mode - technical decision requires architect approval",
                timestamp: getCurrentTime()
            }
            
            approvalQueue.add(approvalRequest)
            RETURN waitForArchitectApproval(approvalRequest)
        
        ELSE:
            // Non-technical decisions proceed autonomously
            RETURN proceedAutonomously(action)
    
    FUNCTION handleL3Mode(action):
        // L3: Full autonomy - never stop
        logAction(action, "L3 autonomous execution")
        RETURN proceedAutonomously(action)
```

### Decision Classification

```pseudocode
FUNCTION isTechnicalDecision(action):
    // Technical decision patterns
    technicalPatterns = [
        // Architecture decisions
        "architecture", "design", "system", "framework",
        "database", "schema", "api", "interface",
        
        // Technology choices
        "technology", "library", "package", "dependency",
        "version", "upgrade", "migration",
        
        // Infrastructure decisions
        "deployment", "infrastructure", "cloud", "server",
        "scaling", "performance", "optimization",
        
        // Security decisions
        "security", "authentication", "authorization",
        "encryption", "vulnerability", "compliance"
    ]
    
    actionText = action.description.toLowerCase()
    
    FOR pattern IN technicalPatterns:
        IF actionText.contains(pattern):
            RETURN true
    
    // Check action type
    technicalActionTypes = [
        "architecture_design",
        "technology_selection",
        "security_review",
        "infrastructure_change",
        "database_design",
        "api_design"
    ]
    
    IF action.type IN technicalActionTypes:
        RETURN true
    
    RETURN false
```

### Continuous Progression (L3)

```pseudocode
FUNCTION startContinuousLoop():
    // L3 continuous execution loop
    ASYNC FUNCTION continuousExecutor():
        WHILE true:
            TRY:
                IF hasWork():
                    nextWork = getNextWork()
                    executeWork(nextWork)
                    capturelearning(nextWork)
                
                ELSE:
                    // No immediate work, check for:
                    checkForNewAssignments()
                    checkForUpdatedTasks()
                    performHousekeeping()
                    optimizeProcesses()
                
                // Brief pause to prevent CPU spinning
                sleep(100ms)
                
            CATCH error:
                // Even errors don't stop L3
                handleErrorGracefully(error)
                continueExecution()
    
    // Start the continuous executor
    startAsync(continuousExecutor)

FUNCTION hasWork():
    // Check multiple sources for work
    sources = [
        checkTodoList(),
        checkAssignmentFiles(),
        checkPendingTasks(),
        checkReviewQueue(),
        checkLearningOpportunities()
    ]
    
    FOR source IN sources:
        IF source.hasWork():
            RETURN true
    
    RETURN false

FUNCTION getNextWork():
    // Priority-based work selection
    priorities = ["P0", "P1", "P2", "P3"]
    
    FOR priority IN priorities:
        work = findWorkByPriority(priority)
        IF work:
            RETURN work
    
    // Return any available work
    RETURN findAnyWork()
```

### Approval Mechanisms

```pseudocode
FUNCTION waitForUserApproval(request):
    // Display approval request
    displayApprovalRequest(request)
    
    // Set up timeout (configurable)
    timeout = getApprovalTimeout()
    startTime = getCurrentTime()
    
    WHILE NOT request.approved AND NOT request.rejected:
        IF getCurrentTime() - startTime > timeout:
            // Timeout reached
            logTimeout(request)
            RETURN handleApprovalTimeout(request)
        
        // Check for user response
        checkUserResponse(request)
        
        // Small delay to prevent spinning
        sleep(500ms)
    
    IF request.approved:
        RETURN proceedWithAction(request.action)
    ELSE:
        RETURN cancelAction(request.action, request.rejectReason)

FUNCTION waitForArchitectApproval(request):
    // Notify architect role
    notifyArchitect(request)
    
    // In L2, architect decisions have shorter timeout
    timeout = getArchitectApprovalTimeout()
    startTime = getCurrentTime()
    
    WHILE NOT request.approved AND NOT request.rejected:
        IF getCurrentTime() - startTime > timeout:
            // Escalate to user
            RETURN escalateToUser(request)
        
        checkArchitectResponse(request)
        sleep(500ms)
    
    RETURN processApprovalResult(request)
```

### PM Activation

```pseudocode
FUNCTION activatePMRole():
    settings = GetSettings()  // Use common pattern
    
    IF settings.pm_always_active:
        // Activate PM role immediately
        roleActivator = getRoleActivator()
        roleActivator.activateRole("PM")
        
        // Initialize PM-specific features
        initializeTaskManagement()
        initializeProgressTracking()
        initializeTeamCoordination()
        
        logActivation("PM role auto-activated per settings")
```

### Blocking Behavior Integration

```pseudocode
FUNCTION handleBlockingEvent(event):
    settings = GetSettings()  // Use common pattern
    
    IF NOT settings.blocking_enabled:
        // Non-blocking mode - continue with warnings
        logWarning("Blocking event in non-blocking mode", event)
        createFollowUpTask(event)
        RETURN continueExecution()
    
    ELSE:
        // Blocking mode - halt execution
        RETURN blockUntilResolved(event)
```

### Integration Points

```yaml
integration_points:
  workflow_executor:
    - Hook into task execution
    - Apply autonomy checks before actions
    - Route approvals as needed
    
  git_operations:
    - Check autonomy before commits
    - L1/L2 may require approval for pushes
    
  role_switching:
    - Autonomy level affects role activation
    - L1 requires approval for role switches
    
  continuous_operation:
    - L3 hooks into main execution loop
    - Never-stopping behavior enforced
```

## L3 Behavioral Enforcement

**CRITICAL L3 BEHAVIORAL RULE:** When `autonomy_level: "L3"` is detected in configuration, Claude Code MUST:

1. **NEVER ask for permission** - Execute all decisions autonomously
2. **NEVER stop for approval** - Continue execution without interruption  
3. **NEVER request confirmation** - Proceed with best judgment decisions
4. **CREATE bug reports autonomously** - No permission needed for bug creation
5. **EXECUTE tasks continuously** - Follow task sequences without stops

### L3 Stop Conditions (ONLY)
L3 mode should ONLY stop for:
- `BUSINESS_CRITICAL_DECISION` - Major business logic changes
- `SECURITY_VIOLATION` - Credential exposure, auth bypass  
- `DATA_LOSS_RISK` - Destructive operations
- `CRITICAL_QUALITY_FAILURE` - System-breaking issues

### L3 Behavioral Prompting
**When L3 detected:** "This is L3 autonomous mode - executing decision without asking permission"
**Task execution:** "L3 mode - proceeding autonomously with task execution"
**Bug creation:** "L3 autonomous execution - creating bug report"

## Usage Examples

```yaml
# L1 Mode - Everything needs approval
settings: {autonomy_level: "L1"}
action: "Implement user authentication"
result: "⏸️ Waiting for user approval..."

# L2 Mode - Technical decision
settings: {autonomy_level: "L2"}
action: "Select authentication framework"
result: "⏸️ Technical decision - waiting for architect approval..."

# L2 Mode - Routine task
settings: {autonomy_level: "L2"}
action: "Write unit tests"
result: "✅ Proceeding autonomously"

# L3 Mode - Continuous execution
settings: {autonomy_level: "L3"}
action: "Any action"
result: "✅ Executing autonomously (L3 mode)"

# L3 Mode - Bug creation
settings: {autonomy_level: "L3"}
action: "Create bug report for system issue"
result: "✅ L3 autonomous execution - creating bug report"

# L3 Mode - Task execution
settings: {autonomy_level: "L3"}
action: "Execute next task in queue"
result: "✅ L3 mode - proceeding autonomously with task execution"
```

---
*Autonomy controller for intelligent-claude-code system*