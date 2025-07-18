# Lean Workflow Executor

**PURPOSE:** Assignment-driven workflow execution with integrated optimization.

## Executive Summary (100 tokens)

**Core Pattern:** Read Assignment → Validate → Execute → Update Progress  
**Key Functions:** `read_assignment()`, `execute_phase()`, `assign_role()`, `update_progress()`  
**Validation Chain:** /icc-validate-work-type → require-triage → validate-assignments → approval  
**Execution Modes:** L1 (manual), L2 (architect approval), L3 (autonomous continuous)  
**Optimization:** 96% token reduction via caching + selective parsing + lazy loading  
**Integration:** Config-driven, role-aware, learning-enabled, git-integrated  

## Quick Access Patterns

### Most Used Functions
1. **Task Execution:** `executeTask(taskId)` - Read, activate role, execute, update
2. **Story Planning:** `planStory(story)` - Validate, create tasks, delegate/queue
3. **Role Assignment:** `assign_role(task, capabilities)` - Validate >70% match
4. **Progress Update:** `update_progress(type, id, status)` - Cascade updates

### Command Shortcuts
- `/icc-load` - Force load behavioral patterns
- `/icc-create-story` - Create new story with validation
- `/icc-execute-task` - Execute specific task
- `@PM init/refresh/reset/status` - System management

## Imports

@./common-patterns.md                      # Shared behavioral patterns
@./config-loader.md @./git-privacy-enforcer.md @./role-detection-engine.md @./role-assignment-validator.md @./autonomy-controller.md @./role-activation-system.md @./pm-command-system.md @./learning-team-automation.md @./l3-continuous-engine.md @./task-queue-manager.md @./auto-continue-triggers.md @./progress-monitor.md @./work-discovery-engine.md @./archival-intelligence.md @./selective-yaml-parser.md @./smart-content-chunker.md @./task-file-generator.md @./session-file-cache.md @./lazy-loading-integration.md @./behavioral-module-registry.md @./id-formatting-guide.md

## Core Functions

### 0. Initialize System
```yaml
function: initialize_system()
  actions: EXECUTE /icc-init-system, /icc-load, /icc-restore-state, /icc-verify-behaviors, /icc-system-status
  integration: Load settings, controllers, processors, optimization systems; IF L3: Initialize continuous execution
```

### 0.1. Process Commands
```pseudocode
FUNCTION processUserMessage(message):
    IF message.startsWith("@PM"): RETURN PMCommandProcessor().processCommand(message)
    IF message.startsWith("/icc-"): RETURN SlashCommandProcessor().executeCommand(message)
    IF message == "/icc-load": RETURN forceLoadBehavioralPatterns()
    RETURN processNormalMessage(message)
```

### 1. Read Assignment
```yaml
function: read_assignment(type, id, operation)
  output: Parsed assignment data with embedded config
  action: Use cache + selective parsing + apply config
  optimization: Up to 96% token reduction
```

### 2. Execute Phase
```yaml
function: execute_phase(assignment, phase)
  autonomy_check: Apply level settings (L1/L2 approval, L3 autonomous)
  l3_mode: Queue for continuous execution
  phases: INIT→PLAN→EXECUTE→ACCEPTANCE→DONE→ARCHIVED
  archival_hook: Check eligibility on ARCHIVED phase
```

### 2.5. Task File Management
```yaml
function: findTaskFile(taskId)
  search_patterns: "epics/*/stories/*/tasks/TASK-{taskId}-*.md", "epics/*/bugs/*/tasks/TASK-{taskId}-*.md"
  returns: File path or null

function: ensureTaskDirectory(parentItem)
  actions: Create directories, set permissions
  returns: Generated path
```

### 3. Role Assignment with Self-Correcting Validation
```yaml
function: assign_role(task, required_capabilities)
  integration: ValidationInterceptor + RoleDetectionEngine + RoleAssignmentValidator
  self_correcting_validation: Auto-detect → Auto-execute → Auto-perform → Auto-apply
  governance: Auto-corrected architect validation
```

### 4. Progress Tracking
```yaml
function: update_progress(item_type, item_id, status)
  updates: Task→Story→Epic status + metrics
  automatic_scoring: Based on completion
  archival_triggers: Check eligibility on COMPLETED+ARCHIVED
```

## Validation Command Chains

### Core Validation Commands
```yaml
icc:detect-work-type(content): patterns: ai_agentic, infrastructure, security, database, frontend; output: specialist_architect_type
icc:require-triage(pm_role, specialist_architect): validation: BLOCK until joint triage complete; output: triage_complete
icc:validate-assignments(tasks): checks: Capability match >70%, specialist preference, no generic roles; output: validation_result
icc:require-approval(pm_role, specialist_architect): requirement: Joint PM + Specialist Architect approval; output: approval_status
```

### Story/Bug Creation Chain
```yaml
MANDATORY VALIDATION CHAIN:
/icc-validate-work-type → icc:require-triage → icc:validate-assignments → icc:require-approval → /icc-create-story
```

## Workflow Execution Patterns

### Story Planning (PM executes)
```pseudocode
FUNCTION planStory(story):
    // 1. Read story + apply config
    storyData = readAssignment("STORY", story.id, "validation_context")
    applyEmbeddedConfig(storyData.embedded_config)
    
    // 2. Execute validation chain
    EXECUTE /icc-validate-work-type(storyData.content)
    EXECUTE /icc-memory-search("story planning " + story.id)
    workType = detectWorkType(storyData)
    
    // 3. Validate assignments with specialist architect
    IF workType: requireTriageAndApproval(story, workType)
    
    // 4. Create validated tasks + generate files
    tasks = createValidatedTasks(story, workType)
    generateTaskFiles(tasks, story)
    updateStoryFile(story, tasks)
    
    // 5. Execute based on autonomy level
    IF L3: taskQueue.addAll(tasks); continuousEngine.processQueue()
    ELSE: executePMDelegation(tasks)
```

### PM Task Delegation Pattern
```pseudocode
FUNCTION executePMDelegation(tasks):
    groups = groupTasksByPriority(tasks)
    
    // Execute blocking and critical sequentially
    FOR task IN groups.blocking + groups.critical:
        createDelegatedSubtask(task); waitForCompletion(task)
    
    // Execute parallel tasks in batches
    executeParallelBatches(groups.parallel + groups.optional)

FUNCTION createDelegatedSubtask(task):
    config = {
        title: "Execute " + task.id + ": " + task.title,
        description: "[" + task.assigned_to + "] " + task.description + "\nTask File: " + task.file_path,
        model: task.embedded_config?.model || "sonnet"
    }
    RETURN Task.create(config)

FUNCTION executeParallelBatches(tasks):
    batches = groupNonConflictingTasks(tasks, 5)
    FOR batch IN batches:
        subtaskIds = batch.map(task => createDelegatedSubtask(task))
        waitForGroupCompletion(subtaskIds)
```

### Task Execution (Specialist executes)
```pseudocode
FUNCTION executeTask(taskId):
    IF isExecutingAsSubtask(): RETURN executeSubtaskFromContext()
    
    // 1. Read task file + apply config
    taskFile = findTaskFile(taskId)
    taskData = readTaskFile(taskFile)
    applyEmbeddedConfig(taskData.embedded_config)
    
    // 2. Activate role + knowledge retrieval
    EXECUTE /icc-activate-role(taskData.assigned_to)
    EXECUTE /icc-memory-search("task execution " + taskId)
    
    // 3. Execute work + update progress
    executeTaskWork(taskData)
    updateTaskFileStatus(taskFile, "completed")
    
    // 4. Knowledge generation + completion
    learnings = generateTaskLearnings(taskData)
    storeInMemory(learnings)
    markTaskComplete(taskId)
    
    // 5. L3 operations
    IF L3: triggerAutoContinue(taskId); updateQueue(taskId, "completed")

FUNCTION executeSubtaskFromContext():
    context = getCurrentExecutionContext()
    roleName = extractRoleFromDescription(context.description)
    taskFilePath = extractTaskFileFromDescription(context.description)
    
    EXECUTE /icc-activate-role(roleName)
    taskData = readTaskFile(taskFilePath)
    applyEmbeddedConfig(taskData.embedded_config)
    
    EXECUTE /icc-memory-search("subtask " + taskData.id)
    result = executeTaskWork(taskData)
    
    updateTaskFileWithResults(taskFilePath, result)
    storeInMemory(generateTaskLearnings(taskData))
    
    RETURN {status: "completed", task_id: taskData.id, role: roleName, result: result}

FUNCTION executeTaskWork(taskData):
    SWITCH taskData.type:
        CASE "implementation": RETURN executeImplementation(taskData)
        CASE "testing": RETURN executeTesting(taskData)
        CASE "review": RETURN executeReview(taskData)
        DEFAULT: RETURN executeGenericTask(taskData)
```

### Git Operations with Auto-Correction
```pseudocode
FUNCTION executeGitOperations(task, phase):
    interceptor = new ValidationInterceptor()
    FOR step IN phase.steps:
        correctedStep = interceptor.interceptGitOperation(step, task)
        executeGitStep(correctedStep)

FUNCTION interceptGitOperation(step, task):
    settings = GetSettings()  // Use common pattern
    IF step.action == "commit":
        message = generateCommitMessage(task, step.template)
        IF settings.git_privacy: message = autoStripAIMentions(message)
        IF settings.branch_protection: autoValidateBranchProtection(step)
        step.message = message
    ELSE IF step.action == "create_pr":
        title = generatePRTitle(task)
        description = generatePRDescription(task)
        IF settings.git_privacy: title = autoStripAIMentions(title); description = autoStripAIMentions(description)
        step.title = title; step.description = description
    RETURN step
```

### Review Handling
```yaml
IF embedded_config.blocking_enabled == false: Create follow-up task for findings + continue execution
ELSE: Block until findings resolved + require re-review
```

## Scoring Integration

### Automatic Score Updates
```yaml
on_task_complete: +1.0P/Q
on_story_complete: +2.0P/Q bonus
on_learning_application: +0.5P/Q bonus
```

### Learning Bonus Integration
```pseudocode
FUNCTION processRoleAction(action, role):
    executeAction(action)
    learningBonuses = detectLearningApplication(action, role)
    FOR bonus IN learningBonuses: updateScore(role, bonus.score, bonus.scoreType)
```

## Role Detection Integration

### Automatic Role Detection
```pseudocode
FUNCTION processTaskAssignment(task):
    detectedRoles = RoleDetectionEngine().detectRoleAssignments(task.content)
    FOR roleAssignment IN detectedRoles:
        validation = RoleValidator().validateRoleAssignment(roleAssignment.role, task)
        IF validation.valid: RoleActivationController().activateRole(roleAssignment.role)
        ELSE: handleInvalidAssignment(roleAssignment, validation)
```

### Dynamic Specialist Creation
```pseudocode
FUNCTION handleSpecialistNeed(task, requiredDomain):
    IF settings.specialist_creation:
        specialistName = requiredDomain + "-" + determineBaseRole(task.type)
        IF NOT roleExists(specialistName): createDynamicSpecialist(specialistName)
        RoleActivationController().activateRole(specialistName)
```

## L3 Self-Correcting Behavioral Enforcement

```pseudocode
FUNCTION applyL3SelfCorrectingBehavior():
    IF settings.autonomy_level == "L3":
        enableAutoCorrection()
        setBehavioralPattern("self_correcting_autonomous")
        setStopConditions(["BUSINESS_CRITICAL", "SECURITY_VIOLATION", "DATA_LOSS_RISK"])
    RETURN settings.autonomy_level

FUNCTION processL3Action(action):
    IF L3:
        missingValidation = detectMissingValidation(action)
        FOR step IN missingValidation: autoExecuteValidationStep(step)
        RETURN executeWithFullCompliance(action)
    RETURN executeWithManualValidation(action)

FUNCTION shouldStopInL3(action):
    criticalPatterns = ["delete all data", "expose credentials", "major business logic change", "security violation"]
    FOR pattern IN criticalPatterns:
        IF action.description.contains(pattern): RETURN true
    RETURN false  // Never stop in L3 - auto-correct instead
```

## Configuration-Driven Behaviors

### Git Privacy Enforcement
```pseudocode
FUNCTION enforceGitPrivacy(operation, content):
    RETURN GitPrivacyEnforcer().enforceGitPrivacy(content, GetSettings())  // Use common pattern
```

### Autonomy Level Application
```pseudocode
FUNCTION applyAutonomyLevel(action):
    RETURN AutonomyController().applyAutonomyLevel(action)
```

### PM Activation
```pseudocode
FUNCTION checkPMActivation():
    IF GetSettings().pm_always_active:  // Use common pattern
        RoleActivationController().activateRole("PM")
        initializeTaskManagement(); initializePMCommands()

FUNCTION initializePMCommands():
    processor = PMCommandProcessor()
    processor.initialize()
    // Register handlers: @PM init/refresh/reset/status/archive/archive-status/restore
```

### Blocking Behavior Control
```pseudocode
FUNCTION handleBlockingEvent(event):
    IF GetSettings().blocking_enabled == false:  // Use common pattern
        logEvent(event); createFollowUpTask(event); RETURN continueExecution()
    ELSE: RETURN blockUntilResolved(event)
```

## Knowledge Management

### Patterns
```yaml
before_work: Search similar items + Load patterns + Apply learnings
after_work: Capture approach + Document learnings + Store for future
```

## Tool Usage

### Core Tool Set
- **Read**: Load assignment and task files
- **Write**: Update progress and results  
- **Task**: PM delegates to specialists via Claude Code Task tool
- **Memory**: Store/retrieve knowledge
- **Git**: Commit when specified

### Task Tool Pattern (PM Delegation)
- PM uses Task tool for ALL specialist work
- Role name MUST be in subtask description: [ROLE_NAME]
- Task file path included in instructions
- **MODEL SELECTION**: Non-PM tasks use "sonnet" model by default
- **PARALLEL EXECUTION**: PM creates multiple Task calls in ONE response
- Claude Code executes parallel tasks simultaneously (up to 5)

### Task Grouping Logic
1. **Blocking tasks**: Execute sequentially (dependencies)
2. **Critical path tasks**: Execute sequentially (timeline critical)  
3. **Parallel tasks**: Execute in batches of up to 5
4. **Optional tasks**: Execute in smaller batches (up to 3)

### Conflict Detection
- **File conflicts**: Tasks modifying same files → sequential
- **Resource conflicts**: Exclusive resources → sequential
- **Role conflicts**: Same role OK (different subtasks)
- **No conflicts**: Execute in parallel!

## Config Application

### During Planning
```yaml
read_config: Load settings + Embed in assignment + Shape task creation (never re-read)
```

### During Execution
```yaml
use_embedded: Read from assignment file + Apply conditional logic + Drive behavior
```

## Priority System Implementation

### Priority Level Definitions
```yaml
epic_priorities: P0(0) P1(1) P2(2) P3(3)
task_priorities: blocking(0) critical_path(1) parallel(2) optional(3)
```

### Priority Calculation Functions
```yaml
# Uses common CalculatePriority pattern
calculatePriority(item, parent):
  RETURN CalculatePriority(item, parent)  # Use common pattern
  if item.type == "security": return 0
  return base_priority

sortByPriority(items): return items.sort((a, b) => a.priority - b.priority)  # P0 first
```

### Priority Inheritance Logic
```yaml
inheritPriority(story, epic):
  story.priority = MAX(epic.priority, story.severity_priority)
  if story.type == "security": story.priority = 0
  if story.type == "customer_bug": story.priority = MAX(story.priority - 1, 0)
  return story.priority

applyTaskPriority(task, story):
  task.priority = story.priority
  set task.task_priority based on task.type
  return task
```

### Execution Order Fix
```yaml
# CORRECT: P0 → P1 → P2 → P3
getNextItem_CORRECT(items): return sortByPriority(items)[0]  # P0 first
```

### Dynamic Priority Adjustment
```yaml
escalatePriority(item, reason):
  if reason == "security_issue": item.priority = 0
  if reason == "customer_escalation": item.priority = MAX(item.priority - 1, 0)
  if reason == "system_failure": item.priority = 0
  return item.priority
```

## Error Handling

### Error Processing with Learning
```pseudocode
FUNCTION handleError(error, context):
    processErrorForLearning(error)
    SWITCH error.type:
        CASE "blocked": updateStatus("blocked"); noteBlocker(error.blocker); escalateToPM()
        CASE "failed": captureFailureReason(error); IF needsBug(error): createBug(error); learnFromFailure(error)
        CASE "priority_conflict": useTaskTypeResolution(); logConflict(error); defaultToCreationTime()
```

### Learning Integration
```yaml
error_forgiveness:
  first_occurrence: No penalty + Learning entity created + Pattern extracted + Memory integration
  repeated_error: Double penalty + Previous learning referenced + Escalation triggered

learning_detection:
  patterns: "based on previous learning", "applying lesson from", "to prevent repeat of"
  bonuses: +0.5P for process improvement, +0.5Q for quality improvement
```

## L3 Continuous Execution Mode

### Continuous Flow Architecture
```pseudocode
FUNCTION enableL3ContinuousMode():
    IF settings.autonomy_level != "L3": RETURN
    continuousEngine = new ContinuousExecutionEngine()
    taskQueue = new TaskQueueManager()
    triggers = new AutoContinueTriggers()
    continuousEngine.initialize()
    setExecutionMode("continuous")
```

### L3 Execution Differences
```yaml
Normal Mode (L1/L2): Sequential execution + Manual transitions + Blocking reviews + User drives
L3 Continuous Mode: Parallel execution + Auto transitions + Non-blocking reviews + System drives
```

### Task Queue Integration
```pseudocode
FUNCTION addWorkToQueue(workItem):
    IF executionMode != "continuous": RETURN normalExecution(workItem)
    FOR task IN workItem.tasks: taskQueue.addTask(task)
    continuousEngine.processQueue()
```

### Auto-Continue Integration
```pseudocode
FUNCTION onTaskComplete(task):
    updateTaskStatus(task, "completed")
    ArchivalIntelligence.checkArchivalEligibility(task)
    IF executionMode == "continuous":
        triggers.triggerEvent("task.completed", {task: task})
        checkPhaseTransition(task.parent)
        RETURN
    notifyUserTaskComplete(task)
```

### L3 Stop Conditions
```pseudocode
FUNCTION shouldStopExecution(context):
    IF settings.autonomy_level != "L3": RETURN true
    L3_STOP_CONDITIONS = ["BUSINESS_CRITICAL_DECISION", "SECURITY_VIOLATION", "DATA_LOSS_RISK", "UNRECOVERABLE_ERROR"]
    RETURN context.issue IN L3_STOP_CONDITIONS
```

## Behavioral Pattern Loading

```pseudocode
FUNCTION forceLoadBehavioralPatterns():
    output = ["🔄 Force-loading virtual team behavioral patterns..."]
    
    sessionCache = getSessionCache()
    operationContext = createOperationContext("behavioral")
    virtualTeamContent = sessionCache.getCachedContent("~/.claude/modes/virtual-team.md", "behavioral_module", operationContext)
    
    imports = parseImports(virtualTeamContent)
    FOR module IN imports: loadBehavioralModuleChunked(module, operationContext)
    
    enforcement = executeCommand("/icc-enforce-validation")
    output.append(enforcement)
    output.append("🚀 All behavioral patterns loaded and internalized")
    output.append("Status: COMMITTED TO COMPLIANCE")
    
    RETURN output.join("\n")

FUNCTION loadBehavioralModuleChunked(modulePath, operationContext):
    content = getSessionCache().getCachedContent(modulePath, "behavioral_module", operationContext)
    components = parseModuleComponents(content)
    FOR component IN components:
        IF component.type == "core_function": loadCoreFunction(component)
        ELSE IF component.type == "integration_point": loadIntegrationPoint(component)
        ELSE IF component.type == "configuration": loadConfiguration(component)
```

## Auto-Correction Helper Functions

```pseudocode
FUNCTION detectMissingValidation(action):
    missing = []
    IF action.type == "role_assignment":
        IF NOT hasSpecialistArchitectConsultation(action): missing.append("specialist_architect_consultation")
        IF NOT hasCapabilityMatch(action): missing.append("capability_validation")
        IF NOT hasTriageApproval(action): missing.append("triage_approval")
    IF action.type == "git_operation":
        IF NOT hasSettingsInjection(action): missing.append("settings_injection")
        IF NOT hasPrivacyEnforcement(action): missing.append("privacy_enforcement")
        IF NOT hasBranchProtection(action): missing.append("branch_protection")
    RETURN missing

FUNCTION autoExecuteValidationStep(step):
    SWITCH step.type:
        CASE "specialist_architect_consultation": autoActivateRole(getSpecialistArchitect(detectWorkType(step.context)))
        CASE "capability_validation": validation = performCapabilityMatch(step.context); IF NOT validation.valid: autoApplyRoleSuggestion(validation.suggestions[0])
        CASE "settings_injection": injectSettings(step.context, getSettings())
        CASE "privacy_enforcement": IF settings.git_privacy: stripAIMentions(step.context)
        CASE "branch_protection": IF settings.branch_protection: validateBranchProtection(step.context)

FUNCTION logAutoCorrection(type, details):
    correctionLog = {timestamp: getCurrentTime(), type: type, details: details, autonomy_level: settings.autonomy_level, auto_corrected: true}
    appendToFile("auto_corrections.log", correctionLog)
    createLearningEntry("auto_correction", correctionLog)
    logInfo("Auto-correction applied: " + type + " - " + details)
```

## Why This Works

1. **Structure Enforces Behavior**: Assignment files contain all needed information
2. **Self-Correcting Logic**: Missing validation automatically executed
3. **Config-Driven**: Embedded settings shape execution
4. **Natural Flow**: Knowledge→Work→Knowledge
5. **Automatic Scoring**: Completion triggers updates
6. **Auto-Correction**: Validation never bypassed, only accelerated
7. **L3 Continuous**: True autonomous execution with full compliance

## Usage Examples

### PM Creates Story
```
icc:create-story "Add user preferences"
- System creates story file + PM runs icc:plan-story
- Tasks auto-generated with specialists assigned + Task files generated
```

### PM Delegates Tasks - PARALLEL EXECUTION
```
PM executes story with 5 tasks (2 blocking, 3 parallel):
PHASE 1 - Blocking tasks (sequential): Creates Task: "[Architect] Execute TASK-001..." → Model: sonnet
PHASE 2 - Parallel tasks (simultaneous): Creates ALL 3 tasks in ONE response
Claude Code executes tasks 3, 4, and 5 SIMULTANEOUSLY using Sonnet model!
```

### Specialist Executes in Subtask
```
Subtask context: "[Developer] Execute TASK-002..."
- Detects role + Activates Developer role + Reads task file + Applies embedded config
- Does knowledge retrieval + Implements feature + Updates task file + Returns completion
```

## Validation Examples

### AI-Agentic Work Detection
```yaml
Input: "Update virtual team behavioral patterns in modes/"
Detection: Work type: "ai_agentic" + Required architect: @AI-Architect + Blocked roles: @Developer, @System-Engineer
Validation Flow: icc:detect-work-type → icc:require-triage → icc:validate-assignments → icc:require-approval
Result: Tasks assigned to @AI-Engineer after validation
```

### Wrong Assignment Prevention
```yaml
Input: "Deploy kubernetes infrastructure" assigned to @Developer
Detection: Work type: "infrastructure" + Capability match: 0.25 (FAIL - below 0.7 threshold)
Validation: icc:validate-assignments → FAIL + Suggestion: @DevOps-Engineer (match: 0.85)
Result: Auto-reassign to @DevOps-Engineer with architect approval
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

## Summary

This role assignment validation system integrates seamlessly with the lean workflow executor to prevent incorrect specialist assignments. By detecting work types through pattern matching and validating capability matches above 70%, the system ensures the right specialists are assigned to the right work, with architect oversight for all specialist domains.