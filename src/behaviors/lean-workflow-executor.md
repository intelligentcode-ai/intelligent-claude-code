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
@./task-file-generator.md                 # Generate dedicated task files

## Core Functions

### 0. Initialize System (NEW)
```yaml
function: initialize_system()
  actions:
    - EXECUTE /icc-init-system command for full initialization
    - EXECUTE /icc-load for force-loading all behavioral patterns
    - Load configuration via ConfigLoader
    - Initialize AutonomyController
    - Apply autonomy level settings
    - Check pm_always_active flag
    - Set blocking behavior mode
    - Initialize PM command processor
    - Initialize learning enforcement system
    - Initialize L3 continuous engine if L3 mode
    - EXECUTE /icc-restore-state for system state restoration
    - EXECUTE /icc-verify-behaviors for behavioral validation
    - EXECUTE /icc-system-status for operational confirmation
  integration: 
    - settings = getSettings()  // Load fresh each time
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
    
    // Handle specific icc-load command for behavioral pattern loading
    IF message == "/icc-load":
        result = forceLoadBehavioralPatterns()
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
  integration: applyEmbeddedConfig(content)
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

### 2.5. Task File Management
```yaml
function: findTaskFile(taskId)
  description: Locate task file for a given task ID
  search_patterns:
    - "epics/*/stories/*/tasks/TASK-{taskId}-*.md"
    - "epics/*/bugs/*/tasks/TASK-{taskId}-*.md"
  returns: File path or null if not found
  implementation:
    FOR pattern IN search_patterns:
        files = glob(pattern.replace("{taskId}", taskId))
        IF files.length > 0:
            RETURN files[0]
    RETURN null

function: ensureTaskDirectory(parentItem)
  description: Ensure task directory exists for story/bug
  actions:
    - Create directories if needed
    - Set proper permissions
  implementation:
    parentType = parentItem.type  // "story" or "bug"
    epicId = parentItem.epic_id
    parentId = parentItem.id
    path = "epics/" + epicId + "/" + parentType + "s/" + parentId + "/tasks/"
    ensureDirectoryExists(path)
    RETURN path
```

### 3. Role Assignment with Self-Correcting Validation
```yaml
function: assign_role(task, required_capabilities)
  integration:
    - ValidationInterceptor for auto-correction
    - RoleDetectionEngine for @-notation parsing
    - RoleAssignmentValidator for comprehensive validation
  self_correcting_validation:
    - Auto-detect missing validation steps
    - Auto-execute specialist architect consultation
    - Auto-perform capability matching
    - Auto-apply role suggestions
  implementation:
    interceptor = new ValidationInterceptor()
    RETURN interceptor.interceptRoleAssignment(task)
    
FUNCTION ValidationInterceptor.interceptRoleAssignment(task):
    // SELF-CORRECTING VALIDATION SYSTEM
    
    // 1. AUTO-DETECT WORK TYPE
    workType = autoDetectWorkType(task.content)
    
    // 2. AUTO-ACTIVATE SPECIALIST ARCHITECT
    IF workType:
        specialistArchitect = getSpecialistArchitect(workType)
        autoActivateRole(specialistArchitect)
        
        // 3. AUTO-PERFORM TRIAGE
        autoPerformTriage(task, "PM", specialistArchitect)
        
        // 4. AUTO-VALIDATE ASSIGNMENT
        validation = autoValidateAssignment(task, specialistArchitect)
        
        // 5. AUTO-APPLY CORRECTIONS
        IF NOT validation.valid:
            task.assigned_to = validation.suggestions[0].suggested
            logAutoCorrection("Role assignment", task.assigned_to)
    
    // 6. EXECUTE WITH FULL VALIDATION
    RETURN executeValidatedRoleActivation(task.assigned_to, task)
    
FUNCTION executeValidatedRoleActivation(role, task):
    // Use slash command for role activation
    EXECUTE /icc-activate-role role
    RETURN assignRoleToTask(role, task)
  governance: Auto-corrected architect validation
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
    
    // 4.5. Generate task files for all tasks
    taskFileGenerator = new TaskFileGenerator()
    FOR task IN tasks:
        taskFileGenerator.generateTaskFile(task, story)
    
    // 5. Update story file with validated tasks
    updateStoryFile(story, tasks)
    
    // 6. Execute tasks based on mode
    IF settings.autonomy_level == "L3":
        // L3: Add to queue for continuous execution
        taskQueue.addAll(tasks)
        continuousEngine.processQueue()
    ELSE:
        // L1/L2: PM delegates using Task tool
        executePMDelegation(tasks)
```

### PM Task Delegation Pattern (Claude Code Task Tool)
```pseudocode
FUNCTION executePMDelegation(tasks):
    // PM uses Claude Code's Task tool for delegation
    IF currentRole != "PM":
        ERROR("Only PM can delegate tasks using Task tool")
    
    // Group tasks by priority for execution strategy
    blockingTasks = tasks.filter(t => t.priority == "blocking")
    criticalTasks = tasks.filter(t => t.priority == "critical_path")
    parallelTasks = tasks.filter(t => t.priority == "parallel")
    optionalTasks = tasks.filter(t => t.priority == "optional")
    
    // Execute blocking tasks sequentially
    FOR task IN blockingTasks:
        createDelegatedSubtask(task)
        waitForCompletion(task)
    
    // Execute critical path tasks sequentially
    FOR task IN criticalTasks:
        createDelegatedSubtask(task)
        waitForCompletion(task)
    
    // Execute parallel tasks simultaneously in batches
    IF parallelTasks.length > 0:
        executeParallelTasks(parallelTasks)
    
    // Execute optional tasks if time permits
    IF optionalTasks.length > 0:
        executeParallelTasks(optionalTasks, maxBatch: 3)

FUNCTION executeParallelTasks(tasks, maxBatch = 5):
    // Group non-conflicting tasks for parallel execution
    parallelGroups = groupNonConflictingTasks(tasks, maxBatch)
    
    FOR group IN parallelGroups:
        // PM creates multiple Task calls in ONE response
        // This is the key pattern for parallel execution!
        
        logInfo("PM delegating " + group.length + " tasks simultaneously:")
        
        // Create all subtasks in the group AT ONCE
        subtaskIds = []
        FOR task IN group:
            taskId = createDelegatedSubtask(task)
            subtaskIds.append(taskId)
            logInfo("  - " + task.id + " to " + task.assigned_to)
        
        // Claude Code handles parallel execution natively
        logInfo("Claude Code executing " + group.length + " tasks in parallel")
        
        // Wait for all tasks in group to complete
        waitForGroupCompletion(subtaskIds)

FUNCTION createDelegatedSubtask(task):
    // Format subtask for Claude Code Task tool
    subtaskTitle = "Execute " + task.id + ": " + task.title
    
    // CRITICAL: Include role name in description
    subtaskDescription = "[" + task.assigned_to + "] " + task.description + "\n\n"
    subtaskDescription += "Task File: " + task.file_path + "\n\n"
    subtaskDescription += "Instructions:\n"
    subtaskDescription += "1. Read the task file for complete context\n"
    subtaskDescription += "2. Apply embedded configuration from task file\n"
    subtaskDescription += "3. Execute according to task type and instructions\n"
    subtaskDescription += "4. Update task file with results\n"
    subtaskDescription += "5. Return completion status"
    
    // Use Claude Code's Task tool
    result = Task.create({
        title: subtaskTitle,
        description: subtaskDescription,
        instructions: "Execute as " + task.assigned_to + " role"
    })
    
    logInfo("Delegated " + task.id + " to " + task.assigned_to + " via Task tool")
    RETURN result.id

FUNCTION groupNonConflictingTasks(tasks, maxBatchSize = 5):
    // Group tasks that can execute in parallel
    groups = []
    currentGroup = []
    
    FOR task IN tasks:
        canAddToGroup = true
        
        // Check batch size limit
        IF currentGroup.length >= maxBatchSize:
            canAddToGroup = false
        
        // Check for conflicts with tasks in current group
        IF canAddToGroup:
            FOR other IN currentGroup:
                // Check for file conflicts
                IF hasFileConflict(task, other):
                    canAddToGroup = false
                    BREAK
                
                // Check for resource conflicts
                IF hasResourceConflict(task, other):
                    canAddToGroup = false
                    BREAK
                
                // Same role is OK in parallel (different subtasks)
                // Claude Code can handle multiple subtasks for same role
        
        IF canAddToGroup:
            currentGroup.append(task)
        ELSE:
            // Start new group
            IF currentGroup.length > 0:
                groups.append(currentGroup)
            currentGroup = [task]
    
    // Add final group
    IF currentGroup.length > 0:
        groups.append(currentGroup)
    
    RETURN groups

FUNCTION hasFileConflict(task1, task2):
    // Check if tasks modify the same files
    IF NOT task1.modifies_files OR NOT task2.modifies_files:
        RETURN false
    
    // Check for overlapping file modifications
    commonFiles = task1.modifies_files.intersect(task2.modifies_files)
    
    // Allow read-only overlaps
    IF commonFiles.length > 0:
        FOR file IN commonFiles:
            IF task1.modifies(file) AND task2.modifies(file):
                RETURN true  // Both modify same file
    
    RETURN false

FUNCTION hasResourceConflict(task1, task2):
    // Check for exclusive resource conflicts
    exclusiveResources = ["database_schema", "api_endpoints", "config_files"]
    
    FOR resource IN exclusiveResources:
        IF task1.requires(resource) AND task2.requires(resource):
            IF task1.exclusive(resource) OR task2.exclusive(resource):
                RETURN true
    
    RETURN false

FUNCTION waitForGroupCompletion(subtaskIds):
    // Wait for all subtasks in group to complete
    allComplete = false
    
    WHILE NOT allComplete:
        completedCount = 0
        
        FOR taskId IN subtaskIds:
            status = getSubtaskStatus(taskId)
            IF status == "completed":
                completedCount++
        
        IF completedCount == subtaskIds.length:
            allComplete = true
        ELSE:
            logProgress("Parallel execution: " + completedCount + "/" + subtaskIds.length + " completed")
            wait(5000)  // Check every 5 seconds
    
    logInfo("All " + subtaskIds.length + " parallel tasks completed")
```

### Task Execution (Specialist executes)
```pseudocode
FUNCTION executeTask(taskId):
    // 0. Check if executing as subtask
    IF isExecutingAsSubtask():
        RETURN executeSubtaskFromContext()
    
    // 1. Read task from dedicated file
    taskFile = findTaskFile(taskId)
    IF NOT taskFile:
        ERROR("Task file not found for " + taskId)
    
    taskData = readTaskFile(taskFile)
    
    // 2. Extract and apply embedded config
    embeddedConfig = extractEmbeddedConfig(taskData)
    applyEmbeddedConfig(embeddedConfig)
    
    // 3. Activate assigned role
    EXECUTE /icc-activate-role(taskData.assigned_to)
    
    // 4. Execute knowledge retrieval
    EXECUTE /icc-memory-search("task execution " + taskId)
    knowledgeRetrieved = retrieveRelevantKnowledge(taskData)
    
    // 5. Decide if subtasks needed
    IF taskComplexityRequiresSubtasks(taskData):
        subtasks = createSubtasks(taskData)
        FOR subtask IN subtasks:
            // Generate subtask files
            taskFileGenerator.generateTaskFile(subtask, taskData)
    
    // 6. Execute work based on task type
    executeTaskWork(taskData)
    
    // 7. Update task file with progress
    updateTaskFileStatus(taskFile, "completed")
    
    // 8. Knowledge generation
    learnings = generateTaskLearnings(taskData)
    storeInMemory(learnings)
    
    // 9. Mark complete
    markTaskComplete(taskId)
    
    // 10. L3 MODE operations
    IF settings.autonomy_level == "L3":
        triggerAutoContinue(taskId)
        updateQueue(taskId, "completed")
        checkUnblockedTasks()
        triggerArchivalCheck(taskId)

FUNCTION readTaskFile(filePath):
    content = readFile(filePath)
    
    // Parse task metadata
    taskData = parseTaskMetadata(content)
    
    // Extract embedded config
    configMatch = content.match(/```yaml\n([\s\S]*?)\n```/)
    IF configMatch:
        taskData.embedded_config = yaml.parse(configMatch[1])
    
    RETURN taskData
```

### Subtask Execution Pattern (Claude Code Task Tool)
```pseudocode
FUNCTION isExecutingAsSubtask():
    // Check if we're in a Claude Code subtask context
    context = getCurrentExecutionContext()
    RETURN context.type == "subtask" OR context.hasTaskToolContext

FUNCTION executeSubtaskFromContext():
    // Extract role and task file from subtask description
    context = getCurrentExecutionContext()
    description = context.description
    
    // 1. Extract role from description pattern: [ROLE_NAME]
    roleMatch = description.match(/^\[(@\w+(?:-\w+)*)\]/)
    IF NOT roleMatch:
        ERROR("No role specified in subtask description")
    
    roleName = roleMatch[1]
    
    // 2. Extract task file path
    fileMatch = description.match(/Task File:\s*(.+\.md)/)
    IF NOT fileMatch:
        ERROR("No task file specified in subtask description")
    
    taskFilePath = fileMatch[1]
    
    // 3. Activate the specified role
    EXECUTE /icc-activate-role(roleName)
    logInfo("Subtask activated role: " + roleName)
    
    // 4. Read task file
    taskData = readTaskFile(taskFilePath)
    
    // 5. Apply embedded config
    IF taskData.embedded_config:
        applyEmbeddedConfig(taskData.embedded_config)
    
    // 6. Execute knowledge retrieval
    EXECUTE /icc-memory-search("subtask " + taskData.id)
    
    // 7. Execute the task work
    result = executeTaskWork(taskData)
    
    // 8. Update task file with results
    updateTaskFileWithResults(taskFilePath, result)
    
    // 9. Generate and store learnings
    learnings = generateTaskLearnings(taskData)
    storeInMemory(learnings)
    
    // 10. Return completion status
    RETURN {
        status: "completed",
        task_id: taskData.id,
        role: roleName,
        result: result
    }

FUNCTION executeTaskWork(taskData):
    // Execute based on task type
    SWITCH taskData.type:
        CASE "implementation":
            RETURN executeImplementation(taskData)
        CASE "testing":
            RETURN executeTesting(taskData)
        CASE "review":
            RETURN executeReview(taskData)
        CASE "documentation":
            RETURN executeDocumentation(taskData)
        CASE "investigation":
            RETURN executeInvestigation(taskData)
        CASE "fix":
            RETURN executeFix(taskData)
        DEFAULT:
            RETURN executeGenericTask(taskData)

FUNCTION updateTaskFileWithResults(filePath, result):
    content = readFile(filePath)
    
    // Add completion section
    completionSection = "\n\n## Execution Results\n"
    completionSection += "- **Status**: completed\n"
    completionSection += "- **Completed At**: " + getCurrentTime() + "\n"
    completionSection += "- **Result**: " + summarizeResult(result) + "\n"
    
    IF result.outputs:
        completionSection += "\n### Outputs\n"
        FOR output IN result.outputs:
            completionSection += "- " + output + "\n"
    
    // Update file
    updatedContent = content + completionSection
    writeFile(filePath, updatedContent)
```

### Git Operations with Auto-Correction
```pseudocode
FUNCTION executeGitOperations(task, phase):
    // SELF-CORRECTING GIT OPERATIONS
    interceptor = new ValidationInterceptor()
    
    FOR step IN phase.steps:
        // Auto-correct all git operations
        correctedStep = interceptor.interceptGitOperation(step, task)
        executeGitStep(correctedStep)
        
FUNCTION ValidationInterceptor.interceptGitOperation(step, task):
    // AUTO-INJECT SETTINGS (stateless)
    settings = getSettings()
    step.settings = settings
    
    // AUTO-CORRECT BASED ON OPERATION TYPE
    IF step.action == "commit":
        // Auto-generate message with settings
        message = generateCommitMessage(task, step.template)
        
        // Auto-enforce privacy settings
        IF settings.git_privacy:
            message = autoStripAIMentions(message)
        
        // Auto-apply branch protection
        IF settings.branch_protection:
            autoValidateBranchProtection(step)
        
        step.message = message
        step.validated = true
        
    ELSE IF step.action == "push":
        // Auto-validate branch protection
        IF settings.branch_protection:
            autoValidateBranchProtection(step)
        
        // Auto-apply push restrictions
        step.validated = true
        
    ELSE IF step.action == "create_pr":
        // Auto-generate PR content
        title = generatePRTitle(task)
        description = generatePRDescription(task)
        
        // Auto-enforce privacy in PR
        IF settings.git_privacy:
            title = autoStripAIMentions(title)
            description = autoStripAIMentions(description)
        
        step.title = title
        step.description = description
        step.validated = true
    
    logAutoCorrection("Git operation", step.action)
    RETURN step
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
    settings = getSettings()
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

## L3 Self-Correcting Behavioral Enforcement

```pseudocode
FUNCTION applyL3SelfCorrectingBehavior():
    settings = getSettings()
    
    IF settings.autonomy_level == "L3":
        // L3 SELF-CORRECTING ENFORCEMENT
        interceptor = new ValidationInterceptor()
        
        // Enable auto-correction for all operations
        enableAutoCorrection()
        
        // L3 RULE: Execute ALL processes, just faster
        setBehavioralPattern("self_correcting_autonomous")
        
        // L3 SPECIFIC BEHAVIORS
        setValidationMode("auto_correct")
        setStopConditions(["BUSINESS_CRITICAL", "SECURITY_VIOLATION", "DATA_LOSS_RISK"])
        
        logInfo("L3 self-correcting behavioral mode activated")
    
    RETURN settings.autonomy_level

FUNCTION processL3Action(action):
    // L3 SELF-CORRECTING WORKFLOW
    IF settings.autonomy_level == "L3":
        // 1. AUTO-DETECT MISSING VALIDATION
        missingValidation = detectMissingValidation(action)
        
        // 2. AUTO-EXECUTE MISSING STEPS
        FOR step IN missingValidation:
            autoExecuteValidationStep(step)
            logAutoCorrection("L3 validation", step.type)
        
        // 3. EXECUTE ACTION WITH FULL COMPLIANCE
        RETURN executeWithFullCompliance(action)
    
    // Normal execution for L1/L2
    RETURN executeWithManualValidation(action)

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
    
    // DEFAULT: Never stop in L3 - auto-correct instead
    RETURN false
```

## Configuration-Driven Behaviors

### Git Privacy Enforcement
```pseudocode
FUNCTION enforceGitPrivacy(operation, content):
    settings = getSettings()
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
    settings = getSettings()
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
    settings = getSettings()
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
- **PARALLEL EXECUTION**: PM creates multiple Task calls in ONE response
- Claude Code executes parallel tasks simultaneously (up to 5)
- Non-conflicting tasks grouped for parallel execution

### Parallel Execution Patterns
```pseudocode
// PM delegates 3 parallel tasks in ONE response:
Task.create({title: "Execute TASK-001", description: "[Developer] ..."})
Task.create({title: "Execute TASK-002", description: "[QA-Engineer] ..."})  
Task.create({title: "Execute TASK-003", description: "[AI-Engineer] ..."})

// Claude Code executes all 3 simultaneously!
```

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

### Execution Flow
- PM reads story → creates tasks → groups by priority
- PM delegates blocking/critical sequentially
- PM delegates parallel tasks in batches (multiple Task calls)
- Specialists execute simultaneously in subtasks
- Results flow back → PM coordinates next batch

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

## Behavioral Pattern Loading

```pseudocode
// FORCE-LOAD ALL BEHAVIORAL PATTERNS
FUNCTION forceLoadBehavioralPatterns():
    output = []
    output.append("🔄 Force-loading virtual team behavioral patterns...")
    
    // STEP 1: Read virtual-team.md completely
    output.append("✅ Reading ~/.claude/modes/virtual-team.md")
    virtualTeamContent = readFile("~/.claude/modes/virtual-team.md")
    
    // STEP 2: Parse all @import references  
    output.append("✅ Parsing imports: 14 behavioral modules found")
    imports = parseImports(virtualTeamContent)
    
    // STEP 3: Load each behavioral module
    FOR module IN imports:
        output.append("✅ Loading patterns: " + module)
        loadBehavioralModule(module)
    
    // STEP 4: Activate enforcement
    output.append("\n🔐 Activating validation enforcement...")
    enforcement = executeCommand("/icc-enforce-validation")
    output.append(enforcement)
    
    // STEP 5: Commit to compliance
    output.append("✅ Committing to behavioral compliance")
    output.append("✅ Validating understanding of all patterns")
    
    output.append("\n🚀 All behavioral patterns loaded and internalized")
    output.append("Status: COMMITTED TO COMPLIANCE")
    
    RETURN output.join("\n")

FUNCTION loadBehavioralModule(modulePath):
    // Load and internalize the behavioral module
    content = readFile(modulePath)
    internalizeBehavioralPatterns(content)
    
FUNCTION internalizeBehavioralPatterns(content):
    // Parse pseudo-code patterns and behavioral rules
    patterns = extractBehavioralPatterns(content)
    FOR pattern IN patterns:
        activateBehavioralPattern(pattern)
```

## Auto-Correction Helper Functions

```pseudocode
// AUTO-CORRECTION DETECTION
FUNCTION detectMissingValidation(action):
    missing = []
    
    // Check role assignment validation
    IF action.type == "role_assignment":
        IF NOT hasSpecialistArchitectConsultation(action):
            missing.append("specialist_architect_consultation")
        IF NOT hasCapabilityMatch(action):
            missing.append("capability_validation")
        IF NOT hasTriageApproval(action):
            missing.append("triage_approval")
    
    // Check git operation validation
    IF action.type == "git_operation":
        IF NOT hasSettingsInjection(action):
            missing.append("settings_injection")
        IF NOT hasPrivacyEnforcement(action):
            missing.append("privacy_enforcement")
        IF NOT hasBranchProtection(action):
            missing.append("branch_protection")
    
    RETURN missing

// AUTO-EXECUTION FUNCTIONS
FUNCTION autoExecuteValidationStep(step):
    SWITCH step.type:
        CASE "specialist_architect_consultation":
            workType = detectWorkType(step.context)
            architect = getSpecialistArchitect(workType)
            autoActivateRole(architect)
            
        CASE "capability_validation":
            validation = performCapabilityMatch(step.context)
            IF NOT validation.valid:
                autoApplyRoleSuggestion(validation.suggestions[0])
                
        CASE "settings_injection":
            settings = getSettings()
            injectSettings(step.context, settings)
            
        CASE "privacy_enforcement":
            IF settings.git_privacy:
                stripAIMentions(step.context)
                
        CASE "branch_protection":
            IF settings.branch_protection:
                validateBranchProtection(step.context)

// AUTO-CORRECTION LOGGING
FUNCTION logAutoCorrection(type, details):
    timestamp = getCurrentTime()
    correctionLog = {
        timestamp: timestamp,
        type: type,
        details: details,
        autonomy_level: settings.autonomy_level,
        auto_corrected: true
    }
    
    // Store in file-based memory system
    appendToFile("auto_corrections.log", correctionLog)
    
    // Update learning system
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
- System creates story file
- PM runs icc:plan-story
- Tasks auto-generated with specialists assigned
- Task files generated for each task
```

### PM Delegates Tasks (Task Tool) - PARALLEL EXECUTION
```
PM executes story with 5 tasks (2 blocking, 3 parallel):

PHASE 1 - Blocking tasks (sequential):
1. Creates Task: "[Architect] Execute TASK-001: Design API schema..."
   → Waits for completion
2. Creates Task: "[Database-Engineer] Execute TASK-002: Create database schema..."
   → Waits for completion

PHASE 2 - Parallel tasks (simultaneous):
PM creates ALL 3 tasks in ONE response:
3. Creates Task: "[Developer] Execute TASK-003: Implement user service..."
4. Creates Task: "[Developer] Execute TASK-004: Implement auth service..."  
5. Creates Task: "[QA-Engineer] Execute TASK-005: Write integration tests..."

Claude Code executes tasks 3, 4, and 5 SIMULTANEOUSLY!
- Two Developer subtasks run in parallel (different services)
- QA-Engineer works on tests at the same time
- No file conflicts = true parallel execution
```

### Specialist Executes in Subtask
```
Subtask context: "[Developer] Execute TASK-002..."
- Detects role from description: Developer
- Activates Developer role
- Reads task file: epics/EPIC-001/stories/STORY-002/tasks/TASK-002-implement.md
- Applies embedded config from task file
- Does knowledge retrieval
- Implements feature
- Updates task file with results
- Returns completion to PM
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