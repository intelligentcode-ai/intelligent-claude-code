# Lean Workflow Executor

**PURPOSE:** Single module that reads assignment files and executes workflows. No complex behavioral enforcement needed - the workflow IS the behavior.

## Imports

@./config-loader.md
@./git-privacy-enforcer.md
@./role-detection-engine.md            # Detects @-notation patterns
@./role-assignment-validator.md       # Validates role assignments
@./autonomy-controller.md
@./role-activation-system.md          # Activates roles and switches behavior
@./pm-command-system.md
@./learning-team-automation.md
@./l3-continuous-engine.md
@./task-queue-manager.md
@./auto-continue-triggers.md
@./progress-monitor.md
@./work-discovery-engine.md
@./archival-intelligence.md               # AI-driven archival automation

## Core Functions

### 0. Initialize System (NEW)
```yaml
function: initialize_system()
  actions:
    - EXECUTE /icc-init-system command for full initialization
    - Load configuration via ConfigLoader
    - Initialize AutonomyController
    - Apply autonomy level settings
    - Check pm_always_active flag
    - Set blocking behavior mode
    - Cache settings for session
    - Initialize PM command processor
    - Initialize learning enforcement system
    - Initialize L3 continuous engine if L3 mode
    - EXECUTE /icc-restore-state for system state restoration
    - EXECUTE /icc-verify-behaviors for behavioral validation
    - EXECUTE /icc-system-status for operational confirmation
  integration: 
    - SettingsAPI.getSettings()
    - AutonomyController.initialize()
    - PMCommandProcessor.initialize()
    - initializeLearningEnforcement()
    - SystemStateManager.restoreState()
    - IF settings.autonomy_level == "L3":
        ContinuousExecutionEngine.initialize()
        TaskQueueManager.initialize()
        AutoContinueTriggers.initialize()
        ProgressMonitor.initialize()
        WorkDiscoveryEngine.initialize()
        ArchivalIntelligence.initialize()
```

### 0.1. Process PM Commands (NEW)
```pseudocode
FUNCTION processUserMessage(message):
    // Check for PM commands first
    IF message.startsWith("@PM"):
        processor = PMCommandProcessor()
        result = processor.processCommand(message)
        IF result != null:
            RETURN result
    
    // Check for slash commands
    IF message.startsWith("/icc-"):
        commandProcessor = SlashCommandProcessor()
        result = commandProcessor.executeCommand(message)
        IF result != null:
            RETURN result
    
    // Continue with normal processing
    RETURN processNormalMessage(message)
```

### 1. Read Assignment
```yaml
function: read_assignment(type, id)
  input: "EPIC-001" or "STORY-002" or "TASK-003"
  output: Parsed assignment data with embedded config
  action: 
    - Load file, validate structure
    - Apply embedded config if present
    - Return data with active config
  integration: SettingsAPI.applyEmbeddedConfig(content)
```

### 2. Execute Phase
```yaml
function: execute_phase(assignment, phase)
  autonomy_check:
    - Apply autonomy level before each phase
    - Get approval if required by L1/L2
    - L3 MODE: NEVER ask for permission, execute autonomously
    - L3 BEHAVIORAL RULE: Proceed with all decisions without confirmation
  l3_mode:
    - IF settings.autonomy_level == "L3":
        Add to task queue instead of direct execution
        Let continuous engine handle execution
        Auto-transition phases when criteria met
  phases:
    INIT: Capture initial information
    PLAN: Break down into smaller units (stories→tasks)
    EXECUTE: Perform the actual work (or queue in L3)
    ACCEPTANCE: Validate completion (auto in L3)
    DONE: Archive and capture learnings
    ARCHIVED: Manual phase transition for PM-driven archival
  archival_hook:
    - ON phase == "ARCHIVED":
        ArchivalIntelligence.checkArchivalEligibility(assignment)
```

### 3. Role Assignment with Validation
```yaml
function: assign_role(task, required_capabilities)
  integration:
    - RoleDetectionEngine for @-notation parsing
    - RoleAssignmentValidator for comprehensive validation
  validation_chain:
    - /icc-validate-work-type(task.content) → specialist_architect_type
    - icc:require-triage(@PM, @specialist_architect) → triage_complete
    - icc:validate-assignments(tasks) → capability_match_check
    - icc:require-approval(@PM, @specialist_architect) → approval_status
  implementation:
    validator = new RoleAssignmentValidator()
    proposedRole = task.assigned_to || detectProposedRole(task)
    validation = validator.validateAssignment(task, proposedRole, allTasks)
    
    IF NOT validation.valid:
      handleValidationFailure(validation)
      IF validation.suggestions.length > 0:
        proposedRole = validation.suggestions[0].suggested
      ELSE:
        THROW "No valid role assignment possible"
    
    RETURN executeRoleActivation(proposedRole, task)
    
FUNCTION executeRoleActivation(role, task):
    // Use slash command for role activation
    EXECUTE /icc-activate-role role
    RETURN assignRoleToTask(role, task)
  governance: Architect-validated assignments only
```

### 4. Progress Tracking
```yaml
function: update_progress(item_type, item_id, status)
  updates:
    - Task status in story
    - Story status in epic
    - Overall progress metrics
  automatic_scoring: Based on completion
  archival_triggers:
    - IF status == "COMPLETED" AND phase == "ARCHIVED":
        ArchivalIntelligence.triggerArchivalCheck(item)  # Manual archival phase required
    - IF task.completed == true:
        ArchivalIntelligence.queueTaskArchival(task)  # Queue for PM manual archival command
```

## Validation Command Chains

### Core Validation Commands
```yaml
icc:detect-work-type(content):
  patterns:
    ai_agentic: ["AI", "ML", "agentic", "behavioral", "automation", "intelligence", 
                 "virtual team", "modes/", "behaviors/", "command chains", "AI system"]
    infrastructure: ["deployment", "infrastructure", "kubernetes", "docker", "cloud", "AWS"]
    security: ["security", "authentication", "authorization", "encryption", "OAuth"]
    database: ["database", "SQL", "PostgreSQL", "schema", "migration", "query"]
    frontend: ["UI", "UX", "React", "frontend", "component", "responsive"]
  output: specialist_architect_type (@AI-Architect, @System-Architect, etc.)

icc:require-triage(pm_role, specialist_architect):
  validation:
    - BLOCK until both roles complete joint triage
    - Validate work necessity and value
    - Confirm specialist requirements
    - Approve task breakdown approach
  output: triage_complete (true/false)

icc:validate-assignments(tasks):
  checks:
    - Capability match >70% for all assignments
    - Specialist preference (@AI-Architect not @Architect)
    - No generic roles when specialists exist
    - No meaningless busywork tasks
  output: validation_result (pass/fail with details)

icc:require-approval(pm_role, specialist_architect):
  requirement: Joint PM + Specialist Architect approval
  blocks: Assignment creation until approval received
  output: approval_status (approved/pending/rejected)
```

### Story/Bug Creation Chain
```yaml
MANDATORY VALIDATION CHAIN:
/icc-validate-work-type(content) 
→ icc:require-triage(@PM, @detected_specialist_architect) 
→ icc:validate-assignments(tasks) 
→ icc:require-approval(@PM, @detected_specialist_architect)
→ /icc-create-story(story.yaml)
```

## Workflow Execution Patterns

### Story Planning (PM executes) - WITH VALIDATION
```pseudocode
FUNCTION planStory(story):
    // 1. Read story assignment file
    storyData = readAssignment("STORY", story.id)
    
    // 2. Check embedded_config
    applyEmbeddedConfig(storyData.embedded_config)
    
    // 3. EXECUTE SLASH COMMANDS FOR VALIDATION
    EXECUTE /icc-validate-work-type(storyData.content)
    EXECUTE /icc-memory-search("story planning " + story.id)
    
    // 4. VALIDATION CHAIN EXECUTION
    validator = new RoleAssignmentValidator()
    
    // Detect work type
    workType = validator.detectWorkType(storyData)
    
    IF workType:
        specialistArchitect = WORK_TYPE_PATTERNS[workType].required_architect
        
        // Require triage - BLOCK until complete
        IF NOT hasTriageApproval(story, "PM", specialistArchitect):
            BLOCK("Triage required with " + specialistArchitect)
        
        // Create proposed tasks
        proposedTasks = generateTasks(story, workType)
        
        // Validate all assignments
        FOR task IN proposedTasks:
            validation = validator.validateAssignment(
                task, 
                task.assigned_to, 
                proposedTasks
            )
            
            IF NOT validation.valid:
                // Use suggestions or block
                IF validation.suggestions.length > 0:
                    task.assigned_to = validation.suggestions[0].suggested
                ELSE:
                    BLOCK("No valid assignment for " + task.title)
        
        // Require approval - BLOCK until approved
        IF NOT hasJointApproval(story, "PM", specialistArchitect):
            BLOCK("Joint approval required from PM and " + specialistArchitect)
    
    // 4. Create validated tasks
    tasks = [
        createKnowledgeTask("retrieve", proposedTasks[0].assigned_to),
        ...proposedTasks,
        createKnowledgeTask("generate", proposedTasks[0].assigned_to)
    ]
    
    // 5. Update story file with validated tasks
    updateStoryFile(story, tasks)
    
    // 6. L3 MODE execution
    IF settings.autonomy_level == "L3":
        taskQueue.addAll(tasks)
        continuousEngine.processQueue()
```

### Task Execution (Specialist executes)
```
1. EXECUTE /icc-memory-search("task execution " + task.id)
2. Read task assignment via /icc-activate-role(task.assigned_to)
3. Knowledge retrieval (automatic first step)
4. Decide if subtasks needed
5. Execute work
6. Update progress
7. Knowledge generation (automatic last step)
8. Mark complete
9. **L3 MODE:**
   - Trigger auto-continue for next task
   - Update queue with completion
   - Check for unblocked tasks
   - Trigger archival check for completed tasks
```

### Git Operations Integration
```pseudocode
FUNCTION executeGitOperations(task, phase):
    settings = SettingsAPI.getSettings()
    interceptor = GitOperationInterceptor()
    
    FOR step IN phase.steps:
        IF step.action == "commit":
            message = generateCommitMessage(task, step.template)
            interceptor.interceptCommit(message, task.files)
            
        ELSE IF step.action == "push":
            validateBranchProtection(settings)
            executePush()
            
        ELSE IF step.action == "create_pr":
            title = generatePRTitle(task)
            description = generatePRDescription(task)
            interceptor.interceptPullRequest(title, description)
```

### Review Handling (Config-driven)
```
IF embedded_config.blocking_enabled == false:
  - Create follow-up task for findings
  - Continue execution
ELSE:
  - Block until findings resolved
  - Require re-review
```

## Scoring Integration

### Automatic Score Updates
```yaml
on_task_complete:
  task_type: "implementation"
  updates:
    - process_score: +1.0
    - quality_score: +1.0
    
on_story_complete:
  all_tasks: "done"
  updates:
    - process_bonus: +2.0
    - quality_bonus: +2.0

on_learning_application:
  detection: "learning reference found"
  validation: "verified against memory"
  updates:
    - learning_bonus: +0.5P/Q
    - reason: "Applied previous learning"
```

### Learning Bonus Integration
```pseudocode
FUNCTION processRoleAction(action, role):
    // Standard processing
    executeAction(action)
    
    // Check for learning application
    learningBonuses = detectLearningApplication(action, role)
    
    // Apply any detected bonuses
    FOR bonus IN learningBonuses:
        IF bonus.scoreType == "P":
            updateScore(role, bonus.score, "P")
        ELSE IF bonus.scoreType == "Q":
            updateScore(role, bonus.score, "Q")
        ELSE IF bonus.scoreType == "BOTH":
            updateScore(role, bonus.score/2, "P")
            updateScore(role, bonus.score/2, "Q")
        
        logScoreUpdate(role, bonus)
```

## Role Detection Integration

### Automatic Role Detection
```pseudocode
FUNCTION processTaskAssignment(task):
    engine = RoleDetectionEngine()
    validator = RoleValidator()
    controller = RoleActivationController()
    
    // Detect all role assignments
    detectedRoles = engine.detectRoleAssignments(task.content)
    
    FOR roleAssignment IN detectedRoles:
        // Validate assignment
        validation = validator.validateRoleAssignment(
            roleAssignment.role,
            task
        )
        
        IF NOT validation.valid:
            handleInvalidAssignment(roleAssignment, validation)
        ELSE:
            // Use RoleActivationController for role switching
            controller.activateRole(roleAssignment.role)
```

### Dynamic Specialist Creation
```pseudocode
FUNCTION handleSpecialistNeed(task, requiredDomain):
    settings = SettingsAPI.getSettings()
    controller = RoleActivationController()
    
    IF settings.specialist_creation:
        // Determine base role
        baseRole = determineBaseRole(task.type)
        specialistName = requiredDomain + "-" + baseRole
        
        // Create specialist if not exists
        IF NOT roleExists(specialistName):
            createDynamicSpecialist(specialistName)
        
        // Activate specialist using RoleActivationController
        controller.activateRole(specialistName)
        
        // Assign specialist
        assignRole(specialistName, task)
```

## L3 Autonomous Behavioral Enforcement

```pseudocode
FUNCTION applyL3AutonomousBehavior():
    settings = SettingsAPI.getSettings()
    
    IF settings.autonomy_level == "L3":
        // L3 BEHAVIORAL ENFORCEMENT
        setResponse("L3 autonomous mode - executing without permission")
        disablePermissionRequests()
        enableContinuousExecution()
        
        // L3 SPECIFIC BEHAVIORS
        setBehavioralPattern("autonomous_execution")
        setStopConditions(["BUSINESS_CRITICAL", "SECURITY_VIOLATION", "DATA_LOSS_RISK"])
        
        logInfo("L3 autonomous behavioral mode activated")
    
    RETURN settings.autonomy_level

FUNCTION shouldStopInL3(action):
    // ONLY stop for critical conditions in L3
    criticalPatterns = [
        "delete all data",
        "expose credentials", 
        "major business logic change",
        "security violation"
    ]
    
    FOR pattern IN criticalPatterns:
        IF action.description.contains(pattern):
            RETURN true
    
    // DEFAULT: Never stop in L3 for normal operations
    RETURN false
```

## Configuration-Driven Behaviors

### Git Privacy Enforcement
```pseudocode
FUNCTION enforceGitPrivacy(operation, content):
    settings = SettingsAPI.getSettings()
    enforcer = GitPrivacyEnforcer()
    RETURN enforcer.enforceGitPrivacy(content, settings)
```

### Autonomy Level Application
```pseudocode
FUNCTION applyAutonomyLevel(action):
    controller = AutonomyController()
    RETURN controller.applyAutonomyLevel(action)
```

### PM Activation
```pseudocode
FUNCTION checkPMActivation():
    settings = SettingsAPI.getSettings()
    IF settings.pm_always_active == true:
        controller = RoleActivationController()
        controller.activateRole("PM")
        initializeTaskManagement()
        initializePMCommands()

FUNCTION initializePMCommands():
    processor = PMCommandProcessor()
    processor.initialize()
    // Register command handlers
    registerCommandHandler("@PM init", processor.executeInit)
    registerCommandHandler("@PM refresh", processor.executeRefresh)
    registerCommandHandler("@PM reset", processor.executeReset)
    registerCommandHandler("@PM status", processor.executeStatus)
    
    // Register manual archival commands (PM-driven only)
    registerCommandHandler("@PM archive", processor.executeArchive)  # Manual archival trigger
    registerCommandHandler("@PM archive-status", processor.showArchivalStatus)  # Manual status check
    registerCommandHandler("@PM restore", processor.restoreFromArchive)  # Manual restoration
```

### Blocking Behavior Control
```pseudocode
FUNCTION handleBlockingEvent(event):
    settings = SettingsAPI.getSettings()
    IF settings.blocking_enabled == false:
        logEvent(event)
        createFollowUpTask(event)
        RETURN continueExecution()
    ELSE:
        RETURN blockUntilResolved(event)
```

## Knowledge Management

### Retrieval Pattern
```yaml
before_work:
  - Search for similar items
  - Load relevant patterns
  - Apply learnings
  simple_and_automatic: No enforcement needed
```

### Generation Pattern
```yaml
after_work:
  - Capture approach
  - Document learnings
  - Store for future
  simple_and_automatic: Part of workflow
```

## Tool Usage

### Minimal Tool Set
- **Read**: Load assignment files
- **Write**: Update progress
- **Task**: Create follow-up tasks
- **Memory**: Store/retrieve knowledge
- **Git**: Commit when specified

### No Complex Chains
- No forced sequential thinking
- No penalty systems
- No monitoring loops
- Just read → execute → update

## Config Application

### During Planning
```yaml
read_config:
  - Load all settings
  - Embed in assignment
  - Shape task creation
  never_again: Config embedded, not re-read
```

### During Execution
```yaml
use_embedded:
  - Read from assignment file
  - Apply conditional logic
  - Drive behavior
  simple: No runtime lookups
```

## Priority System Implementation

### Priority Level Definitions
```yaml
epic_priorities:
  P0: 0    # CRITICAL - System-breaking issues, security vulnerabilities
  P1: 1    # HIGH - Major features, important bugs
  P2: 2    # MEDIUM - Standard features, minor bugs
  P3: 3    # LOW - Nice-to-have features, documentation

task_priorities:
  blocking: 0       # Must complete before other tasks
  critical_path: 1  # On critical path, affects timeline
  parallel: 2       # Can run simultaneously
  optional: 3       # Can be skipped if needed
```

### Priority Calculation Functions
```yaml
calculatePriority(item, parent):
  base_priority = parent ? parent.priority : item.priority
  
  # Severity adjustments
  if item.severity == "CRITICAL": return 0
  if item.severity == "HIGH": return MAX(base_priority, 1)
  if item.severity == "MEDIUM": return MAX(base_priority, 2)
  if item.severity == "LOW": return MAX(base_priority, 3)
  
  # Type adjustments
  if item.type == "security": return 0
  if item.type == "architecture": return MAX(base_priority - 1, 0)
  
  return base_priority

sortByPriority(items):
  return items.sort((a, b) => {
    # Primary sort: Priority level (P0 first)
    if a.priority != b.priority:
      return a.priority - b.priority
    
    # Secondary sort: Task type (blocking first)
    if a.task_priority != b.task_priority:
      return a.task_priority - b.task_priority
    
    # Tertiary sort: Creation time (FIFO)
    return a.created_time - b.created_time
  })
```

### Priority Inheritance Logic
```yaml
inheritPriority(story, epic):
  story.priority = MAX(epic.priority, story.severity_priority)
  
  # Security escalation
  if story.type == "security" || story.title.includes("security"):
    story.priority = 0
  
  # Customer bug escalation
  if story.type == "customer_bug":
    story.priority = MAX(story.priority - 1, 0)
  
  return story.priority

applyTaskPriority(task, story):
  task.priority = story.priority
  
  # Task type adjustments
  if task.type == "blocking":
    task.task_priority = 0
  elif task.type == "critical_path":
    task.task_priority = 1
  elif task.type == "parallel":
    task.task_priority = 2
  else:
    task.task_priority = 3
  
  return task
```

### Execution Order Fix
```yaml
# BROKEN (old system): Last item = highest priority
getNextItem_BROKEN(items):
  return items[items.length - 1]  # WRONG: Returns P3 before P0

# CORRECT (new system): P0 → P1 → P2 → P3
getNextItem_CORRECT(items):
  sorted_items = sortByPriority(items)
  return sorted_items[0]  # CORRECT: Returns P0 first

executeInPriorityOrder(items):
  sorted_items = sortByPriority(items)
  for item in sorted_items:
    if item.status == "ready":
      return executeItem(item)
  return null
```

### Dynamic Priority Adjustment
```yaml
escalatePriority(item, reason):
  old_priority = item.priority
  
  if reason == "security_issue":
    item.priority = 0
  elif reason == "customer_escalation":
    item.priority = MAX(item.priority - 1, 0)
  elif reason == "blocking_dependency":
    item.task_priority = 0
  elif reason == "system_failure":
    item.priority = 0
  
  if item.priority != old_priority:
    logPriorityChange(item, old_priority, item.priority, reason)
    notifyTeam(item, "priority_escalated")
  
  return item.priority
```

## Error Handling

### Error Processing with Learning
```pseudocode
FUNCTION handleError(error, context):
    // Process through learning system first
    processErrorForLearning(error)
    
    // Continue with standard error handling
    SWITCH error.type:
        CASE "blocked":
            updateStatus("blocked")
            noteBlocker(error.blocker)
            escalateToPM()
            
        CASE "failed":
            captureFailureReason(error)
            IF needsBug(error):
                createBug(error)
            learnFromFailure(error)
            
        CASE "priority_conflict":
            useTaskTypeResolution()
            logConflict(error)
            defaultToCreationTime()
```

### Learning Integration
```yaml
error_forgiveness:
  first_occurrence:
    - No penalty applied
    - Learning entity created
    - Pattern extracted
    - Memory integration
    
  repeated_error:
    - Double penalty applied
    - Previous learning referenced
    - Escalation triggered
    - Pattern reinforcement

learning_detection:
  patterns:
    - "based on previous learning"
    - "applying lesson from"
    - "to prevent repeat of"
  bonuses:
    - +0.5P for process improvement
    - +0.5Q for quality improvement
```

## L3 Continuous Execution Mode

### Continuous Flow Architecture
```pseudocode
FUNCTION enableL3ContinuousMode():
    IF settings.autonomy_level != "L3":
        RETURN  // Only for L3
    
    // Initialize continuous components
    continuousEngine = new ContinuousExecutionEngine()
    taskQueue = new TaskQueueManager()
    triggers = new AutoContinueTriggers()
    
    // Start continuous execution
    continuousEngine.initialize()
    
    // Override normal execution flow
    setExecutionMode("continuous")
    logInfo("L3 Continuous Mode ACTIVE")
```

### L3 Execution Differences
```yaml
Normal Mode (L1/L2):
  - Sequential task execution
  - Manual phase transitions
  - Blocking on reviews
  - Stop after each task
  - User drives progression

L3 Continuous Mode:
  - Parallel task execution
  - Automatic phase transitions
  - Non-blocking reviews
  - Continuous flow between tasks
  - System drives progression
```

### Task Queue Integration
```pseudocode
FUNCTION addWorkToQueue(workItem):
    IF executionMode != "continuous":
        RETURN normalExecution(workItem)
    
    // Add all tasks to queue
    FOR task IN workItem.tasks:
        taskQueue.addTask(task)
    
    // Let continuous engine handle execution
    continuousEngine.processQueue()
```

### Auto-Continue Integration
```pseudocode
FUNCTION onTaskComplete(task):
    // Normal completion logic
    updateTaskStatus(task, "completed")
    
    // Trigger archival check (queues for manual PM command)
    ArchivalIntelligence.checkArchivalEligibility(task)
    
    IF executionMode == "continuous":
        // Trigger auto-continue
        triggers.triggerEvent("task.completed", {task: task})
        
        // Check for phase transitions
        checkPhaseTransition(task.parent)
        
        // Continue without stopping
        RETURN
    
    // Normal mode - stop for user
    notifyUserTaskComplete(task)
```

### L3 Stop Conditions
```pseudocode
FUNCTION shouldStopExecution(context):
    IF settings.autonomy_level != "L3":
        RETURN true  // Always stop in L1/L2
    
    // L3 only stops for critical issues
    L3_STOP_CONDITIONS = [
        "BUSINESS_CRITICAL_DECISION",
        "SECURITY_VIOLATION",
        "DATA_LOSS_RISK",
        "UNRECOVERABLE_ERROR"
    ]
    
    RETURN context.issue IN L3_STOP_CONDITIONS
```

## Why This Works

1. **Structure Enforces Behavior**: Assignment files contain all needed information
2. **No Complex Logic**: Just read files and execute steps
3. **Config-Driven**: Embedded settings shape execution
4. **Natural Flow**: Knowledge→Work→Knowledge
5. **Automatic Scoring**: Completion triggers updates
6. **Simple Tools**: Basic operations only
7. **L3 Continuous**: True autonomous execution without stops

## Usage Examples

### PM Creates Story
```
icc:create-story "Add user preferences"
- System creates story file
- PM runs icc:plan-story
- Tasks auto-generated with specialists assigned
```

### Specialist Executes Task
```
icc:execute-task TASK-002
- System loads task assignment
- Specialist does knowledge retrieval
- Work happens
- Knowledge captured
- Score updated
```

### Review Creates Follow-up
```
Review finds issue:
- Check embedded_config.blocking_enabled
- If false: Create TASK-XXX-fix-issue
- Continue execution
- No complex enforcement needed
```

## Validation Examples

### AI-Agentic Work Detection
```yaml
Input: "Update virtual team behavioral patterns in modes/"
Detection: 
  - Work type: "ai_agentic" (matches: behavioral, modes/)
  - Required architect: @AI-Architect
  - Blocked roles: @Developer, @System-Engineer
Validation Flow:
  1. icc:detect-work-type() → "ai_agentic"
  2. icc:require-triage(@PM, @AI-Architect) → BLOCK until complete
  3. icc:validate-assignments() → Check all proposed assignments
  4. icc:require-approval(@PM, @AI-Architect) → Joint approval required
Result: Tasks assigned to @AI-Engineer after validation
```

### Wrong Assignment Prevention
```yaml
Input: "Deploy kubernetes infrastructure" assigned to @Developer
Detection:
  - Work type: "infrastructure" (matches: kubernetes, infrastructure)
  - Capability match: 0.25 (FAIL - below 0.7 threshold)
  - Role blocked for infrastructure work
Validation:
  - icc:validate-assignments() → FAIL
  - Suggestion: @DevOps-Engineer (match: 0.85)
  - Required: @System-Architect review
Result: Auto-reassign to @DevOps-Engineer with architect approval
```

### Specialist Preference Enforcement
```yaml
Input: "Design authentication system" assigned to generic @Architect
Detection:
  - Work type: "security" (matches: authentication)
  - Specialist available: @Security-Architect
Validation:
  - Specialist preference rule triggered
  - Generic @Architect blocked when specialist exists
  - Required: @Security-Architect review
Result: Reassign to @Security-Engineer with @Security-Architect approval
```

### Multi-Domain Work Handling
```yaml
Input: "Build ML model with secure API deployment"
Detection:
  - Primary: "ai_agentic" (ML model)
  - Secondary: "security" (secure API)
Validation:
  - Primary architect: @AI-Architect
  - Secondary consult: @Security-Architect
  - Suggested: @AI-Engineer with security review task
Result: Multi-architect triage, primary assignment to AI specialist
```

## Benefits

### Governance Without Complexity
- **Lightweight**: Validation integrated into existing workflow without heavy enforcement
- **Pattern-Based**: Work type detection through keyword patterns
- **Capability Scoring**: Objective 0-70% threshold for role matching
- **Suggestion Engine**: Always provides alternatives when validation fails
- **Architect-Driven**: Specialist architects validate their domain assignments

### Problem Prevention
✅ **Pattern-based work type detection** identifies AI, infrastructure, security, database, frontend work
✅ **Capability matching prevents <70% matches** with automatic reassignment suggestions
✅ **Blocked role lists** prevent obviously wrong assignments (e.g., @Web-Designer for database work)
✅ **Specialist preference enforcement** ensures @AI-Architect over generic @Architect
✅ **Multi-architect support** for cross-domain work requiring multiple specialists

### Validation Features
- **Work Type Patterns**: Comprehensive keyword lists for each specialty domain
- **Role Capabilities**: Defined capabilities for accurate matching
- **Optimal Role Finding**: Always suggests the best available role
- **Duplicate Prevention**: No role assigned to multiple tasks simultaneously
- **Graceful Fallback**: Suggestions provided even when validation fails

## Summary

This role assignment validation system integrates seamlessly with the lean workflow executor to prevent incorrect specialist assignments. By detecting work types through pattern matching and validating capability matches above 70%, the system ensures the right specialists are assigned to the right work, with architect oversight for all specialist domains.