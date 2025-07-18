# L3 Continuous Engine

**PURPOSE:** Enable true continuous execution in L3 autonomy mode without frequent stops

## Core Components

### Continuous Execution Engine
```pseudocode
CLASS ContinuousExecutionEngine:
    state = {
        active: false,
        currentTasks: [],
        taskQueue: PriorityQueue(),
        blockers: [],
        lastActivity: null,
        errorCount: 0,
        maxErrorsBeforeStop: 5
    }
    
    FUNCTION initialize():
        settings = SettingsAPI.getSettings()
        IF settings.autonomy_level == "L3":
            state.active = true
            startContinuousLoop()
            startProgressMonitor()
            startWorkDiscovery()
            logStatus("L3 Continuous Engine activated")
    
    FUNCTION startContinuousLoop():
        ASYNC WHILE state.active AND getAutonomyLevel() == "L3":
            TRY:
                // Get multiple available tasks for parallel execution
                availableTasks = getAvailableTasks(maxTasks: 5)
                
                IF availableTasks.length > 0:
                    // Group tasks for parallel execution
                    parallelGroups = groupTasksForParallelExecution(availableTasks)
                    
                    FOR group IN parallelGroups:
                        // Execute entire group in parallel
                        executeTaskGroupAsync(group)
                    
                    // Reset error count on successful execution
                    state.errorCount = 0
                ELSE:
                    // No tasks available, check for new work
                    discoverNewWork()
                
                // Check for phase transitions
                checkPhaseTransitions()
                
                // Handle stuck tasks
                handleStuckTasks()
                
                // Brief pause based on activity
                IF state.currentTasks.length > 0:
                    wait(10ms)  // Active execution, minimal pause
                ELSE:
                    wait(100ms)  // No active tasks, longer pause
                    
            CATCH error:
                handleLoopError(error)
    
    FUNCTION getAvailableTasks(maxTasks):
        availableTasks = []
        allTasks = getAllPendingTasks()
        
        // Sort by priority: P0 � P1 � P2 � P3
        sortedTasks = sortTasksByPriority(allTasks)
        
        FOR task IN sortedTasks:
            IF taskIsReady(task) AND availableTasks.length < maxTasks:
                availableTasks.append(task)
        
        RETURN availableTasks
    
    FUNCTION canExecute(task):
        RETURN task.dependencies.allCompleted() AND
               task.status IN ["ready", "planned"] AND
               NOT hasBlocker(task) AND
               NOT isCurrentlyExecuting(task)
    
    FUNCTION executeTaskAsync(task):
        // Non-blocking asynchronous execution WITH FULL PROCESS COMPLIANCE
        ASYNC:
            state.currentTasks.append(task)
            task.status = "in_progress"
            state.lastActivity = getCurrentTime()
            
            TRY:
                // L3 BEHAVIORAL RULE: Execute ALL processes, just faster
                EXECUTE /icc-memory-search("task execution " + task.id)
                
                // MANDATORY: Role validation (accelerated, not bypassed)
                validatedRole = autoPerformRoleValidation(task)
                role = activateRole(validatedRole)
                
                // MANDATORY: Knowledge retrieval (cannot be skipped)
                performKnowledgeRetrieval(task)
                
                // Execute task with role following ALL workflow steps
                result = await role.executeWithProcessCompliance(task)
                
                // MANDATORY: Peer review (automated but thorough, not skipped)
                performAutomatedPeerReview(task, result)
                
                // MANDATORY: Knowledge generation (cannot be skipped)
                performKnowledgeGeneration(task, result)
                
                // MANDATORY: Git operations with settings enforcement
                enforceGitSettings(task, result)
                
                // Handle completion
                handleTaskCompletion(task, result)
                
            CATCH error:
                handleTaskError(task, error)
                
            FINALLY:
                state.currentTasks.remove(task)
    
    FUNCTION groupTasksForParallelExecution(tasks):
        // Group tasks that can execute in parallel
        groups = []
        currentGroup = []
        maxGroupSize = 5
        
        FOR task IN tasks:
            canAddToGroup = true
            
            // Check group size limit
            IF currentGroup.length >= maxGroupSize:
                canAddToGroup = false
            
            // Check for conflicts
            IF canAddToGroup:
                FOR other IN currentGroup:
                    IF hasTaskConflict(task, other):
                        canAddToGroup = false
                        BREAK
            
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
    
    FUNCTION executeTaskGroupAsync(taskGroup):
        // Execute all tasks in group simultaneously
        logInfo("L3: Executing " + taskGroup.length + " tasks in parallel")
        
        // Create parallel execution promises
        executionPromises = []
        
        FOR task IN taskGroup:
            IF canExecute(task) AND NOT isExecuting(task):
                promise = executeTaskAsync(task)
                executionPromises.append(promise)
        
        // Wait for all to complete (non-blocking)
        Promise.all(executionPromises).then(results => {
            logInfo("L3: Parallel group completed - " + results.length + " tasks")
        })
    
    FUNCTION hasTaskConflict(task1, task2):
        // Check for execution conflicts
        
        // File modification conflicts
        IF task1.modifies_files AND task2.modifies_files:
            commonFiles = task1.modifies_files.intersect(task2.modifies_files)
            IF commonFiles.length > 0:
                RETURN true
        
        // Database schema conflicts
        IF task1.modifies_schema AND task2.modifies_schema:
            RETURN true
        
        // API endpoint conflicts
        IF task1.modifies_api AND task2.modifies_api:
            commonEndpoints = task1.api_endpoints.intersect(task2.api_endpoints)
            IF commonEndpoints.length > 0:
                RETURN true
        
        // Same role is OK (Claude Code handles parallel subtasks)
        
        RETURN false
    
    FUNCTION handleTaskCompletion(task, result):
        task.status = "completed"
        task.completedAt = getCurrentTime()
        
        // Log completion
        logProgress("Task completed: " + task.id)
        
        // Trigger auto-continue
        triggerAutoContinue(task)
        
        // Update progress metrics
        updateProgressMetrics(task)
    
    FUNCTION handleTaskError(task, error):
        IF isRecoverableError(error):
            // Attempt recovery
            attemptErrorRecovery(task, error)
        ELSE IF isCriticalError(error):
            // Check if this is an L3 stop condition
            IF shouldStopForL3(error):
                stopL3Execution(error)
            ELSE:
                // Log and continue
                logError(error)
                createFollowUpTask(task, error)
                markTaskFailed(task)
```

### Stop Conditions Handler
```pseudocode
FUNCTION shouldStopForL3(issue):
    // Only stop for truly critical issues in L3
    // L3 BEHAVIORAL RULE: Never stop for process compliance issues
    L3_STOP_CONDITIONS = [
        "BUSINESS_IMPACT_DECISION",    // Major business logic changes
        "SECURITY_VIOLATION",          // Credential exposure, auth bypass
        "DATA_LOSS_RISK",             // Destructive operations
        "CRITICAL_QUALITY_FAILURE"     // System-breaking after auto-fix attempt
    ]
    
    // L3 BEHAVIORAL RULE: Process violations are AUTO-CORRECTED, not ignored
    IF issue.type == "PROCESS_VIOLATION":
        // Auto-correct process violations without stopping
        autoCorrectProcessViolation(issue)
        RETURN false  // Continue execution after correction
    
    RETURN issue.type IN L3_STOP_CONDITIONS AND
           issue.severity == "CRITICAL" AND
           NOT canAutoResolve(issue)

FUNCTION canAutoResolve(issue):
    AUTO_RESOLVABLE = [
        "missing_test",         // Can add test
        "formatting_error",     // Can auto-format
        "import_missing",       // Can add import
        "type_error",          // Can fix type
        "lint_warning"         // Can fix lint
    ]
    
    RETURN issue.subtype IN AUTO_RESOLVABLE

// L3 PROCESS COMPLIANCE FUNCTIONS
FUNCTION performKnowledgeRetrieval(task):
    // MANDATORY in L3 - cannot be skipped
    EXECUTE /icc-memory-search("task knowledge " + task.id)
    searchResults = searchMemory(task.type, task.domain)
    task.retrievedKnowledge = searchResults
    logProcessCompliance("Knowledge retrieval completed", task.id)

FUNCTION performAutomatedPeerReview(task, result):
    // MANDATORY in L3 - automated but thorough
    reviewer = determineReviewer(task.type)
    reviewResult = automatedReview(result, reviewer.expertise)
    
    IF reviewResult.hasIssues:
        createReviewFollowUpTask(task, reviewResult.issues)
    
    task.reviewStatus = "completed"
    logProcessCompliance("Automated peer review completed", task.id)

FUNCTION performKnowledgeGeneration(task, result):
    // MANDATORY in L3 - capture learnings
    learning = extractLearnings(task, result)
    storeInMemory(learning)
    
    task.knowledgeGenerated = true
    logProcessCompliance("Knowledge generation completed", task.id)

FUNCTION autoCorrectProcessViolation(issue):
    // L3 BEHAVIORAL RULE: Fix process violations, don't ignore them
    SWITCH issue.type:
        CASE "MISSING_ROLE_VALIDATION":
            autoPerformRoleValidation(issue.task)
            
        CASE "MISSING_PEER_REVIEW":
            performAutomatedPeerReview(issue.task, issue.result)
            
        CASE "MISSING_KNOWLEDGE_RETRIEVAL":
            performKnowledgeRetrieval(issue.task)
            
        CASE "MISSING_KNOWLEDGE_GENERATION":
            performKnowledgeGeneration(issue.task, issue.result)
            
        CASE "GIT_SETTINGS_VIOLATION":
            enforceGitSettings(issue.task, issue.result)
            
        CASE "WORKFLOW_SHORTCUT":
            executeFullWorkflow(issue.task)
    
    logProcessCompliance("Process violation auto-corrected", issue.type)

FUNCTION autoPerformRoleValidation(task):
    // L3 BEHAVIORAL RULE: Role validation is accelerated, not bypassed
    workType = autoDetectWorkType(task.content)
    
    IF workType:
        specialistArchitect = getSpecialistArchitect(workType)
        
        // Auto-execute triage (faster, not skipped)
        triageResult = autoPerformTriage(task, specialistArchitect)
        
        // Auto-validate assignment (faster, not skipped)  
        validation = autoValidateAssignment(task, specialistArchitect)
        
        IF NOT validation.valid:
            // Auto-correct role assignment
            correctedRole = validation.suggestions[0].suggested
            task.assigned_to = correctedRole
            logAutoCorrection("Role assignment corrected", correctedRole)
    
    logProcessCompliance("Role validation auto-completed", task.id)

FUNCTION enforceGitSettings(task, result):
    // L3 BEHAVIORAL RULE: Git operations always enforce settings
    settings = loadSettings()
    
    // Auto-enforce git privacy
    IF settings.git_privacy:
        cleanCommitMessage = stripAIMentions(result.commitMessage)
        result.commitMessage = cleanCommitMessage
    
    // Auto-enforce branch protection
    IF settings.branch_protection:
        ensureFeatureBranch()
    
    // Execute commit with enforced settings
    executeGitCommit(result.commitMessage, result.files)
    
    logProcessCompliance("Git operations with settings enforcement", task.id)
```

### Phase Auto-Transition
```pseudocode
FUNCTION checkPhaseTransitions():
    activeItems = getActiveWorkItems()
    
    FOR item IN activeItems:
        currentPhase = item.phase
        
        SWITCH currentPhase:
            CASE "PLAN":
                IF allTasksCreated(item):
                    transitionPhase(item, "EXECUTE")
                    logTransition(item, "PLAN", "EXECUTE")
                    
            CASE "EXECUTE":
                IF allTasksCompleted(item):
                    transitionPhase(item, "ACCEPTANCE")
                    startAcceptanceValidation(item)
                    
            CASE "ACCEPTANCE":
                IF acceptanceCriteriaMet(item):
                    transitionPhase(item, "DONE")
                    archiveItem(item)
                    discoverNextWork()
                    
            CASE "DONE":
                // Already complete, check for follow-ups
                checkForFollowUpWork(item)

FUNCTION transitionPhase(item, newPhase):
    item.phase = newPhase
    item.phaseTransitionTime = getCurrentTime()
    
    // Trigger phase-specific actions
    SWITCH newPhase:
        CASE "EXECUTE":
            activateExecutionTasks(item)
        CASE "ACCEPTANCE":
            createAcceptanceTasks(item)
        CASE "DONE":
            createKnowledgeCapture(item)
```

### Work Discovery
```pseudocode
FUNCTION discoverNewWork():
    // Check multiple sources for work
    sources = [
        checkForNewBugs(),
        checkForNewStories(),
        checkForUnblockedTasks(),
        checkForFollowUpTasks(),
        checkForReviewCompletions()
    ]
    
    newWork = []
    FOR source IN sources:
        work = source.execute()
        IF work.length > 0:
            newWork.concat(work)
    
    // Add to task queue
    FOR task IN newWork:
        addToTaskQueue(task)
    
    RETURN newWork.length

FUNCTION checkForUnblockedTasks():
    unblockedTasks = []
    blockedTasks = getBlockedTasks()
    
    FOR task IN blockedTasks:
        IF task.blockers.allResolved():
            task.status = "ready"
            unblockedTasks.append(task)
            logUnblocked(task)
    
    RETURN unblockedTasks
```

### Progress Monitoring
```pseudocode
FUNCTION startProgressMonitor():
    ASYNC WHILE state.active:
        // Update metrics every second
        wait(1000ms)
        
        // Check for stuck tasks
        stuckTasks = findStuckTasks()
        IF stuckTasks.length > 0:
            handleStuckTasks(stuckTasks)
        
        // Report progress
        IF hasSignificantProgress():
            reportProgress()
        
        // Check system health
        checkSystemHealth()

FUNCTION findStuckTasks():
    stuckTasks = []
    threshold = 300000  // 5 minutes
    
    FOR task IN state.currentTasks:
        IF getCurrentTime() - task.startTime > threshold:
            IF NOT task.hasRecentActivity():
                stuckTasks.append(task)
    
    RETURN stuckTasks

FUNCTION handleStuckTasks(stuckTasks):
    FOR task IN stuckTasks:
        logWarning("Task stuck: " + task.id)
        
        // Attempt to unstick
        IF canRetry(task):
            retryTask(task)
        ELSE:
            // Create follow-up and continue
            createFollowUpTask(task, "Task stuck")
            markTaskFailed(task)
            removeFromCurrentTasks(task)
```

### Auto-Continue Triggers
```pseudocode
FUNCTION triggerAutoContinue(completedTask):
    // Determine next action based on task type
    SWITCH completedTask.type:
        CASE "implementation":
            triggerTesting(completedTask)
            
        CASE "testing":
            triggerPeerReview(completedTask)
            
        CASE "review":
            IF reviewPassed(completedTask):
                triggerDocumentation(completedTask)
            ELSE:
                triggerFixImplementation(completedTask)
                
        CASE "documentation":
            triggerGitOperations(completedTask)
            
        CASE "git_operations":
            markStoryComplete(completedTask.parent)
            discoverNextWork()

FUNCTION triggerTesting(implementationTask):
    story = implementationTask.parent
    testTasks = story.tasks.filter(t => t.type == "testing")
    
    FOR testTask IN testTasks:
        IF testTask.dependencies.includes(implementationTask.id):
            testTask.status = "ready"
            addToTaskQueue(testTask)
```

### Error Recovery
```pseudocode
FUNCTION attemptErrorRecovery(task, error):
    recoveryStrategies = getRecoveryStrategies(error.type)
    
    FOR strategy IN recoveryStrategies:
        IF strategy.canHandle(error):
            result = strategy.attempt(task, error)
            IF result.success:
                logRecovery("Recovered from: " + error.type)
                retryTask(task)
                RETURN true
    
    // Recovery failed, create follow-up
    createErrorFollowUp(task, error)
    RETURN false

FUNCTION getRecoveryStrategies(errorType):
    SWITCH errorType:
        CASE "test_failure":
            RETURN [fixTestStrategy, skipTestStrategy]
        CASE "lint_error":
            RETURN [autoFormatStrategy, fixLintStrategy]
        CASE "type_error":
            RETURN [fixTypeStrategy, addTypeAnnotationStrategy]
        CASE "import_error":
            RETURN [addImportStrategy, fixImportPathStrategy]
        DEFAULT:
            RETURN [logAndContinueStrategy]
```

### System Health
```pseudocode
FUNCTION checkSystemHealth():
    health = {
        memoryUsage: getMemoryUsage(),
        cpuUsage: getCPUUsage(),
        taskQueueSize: state.taskQueue.size(),
        errorRate: calculateErrorRate(),
        executionRate: calculateExecutionRate()
    }
    
    // Check thresholds
    IF health.memoryUsage > 0.9:
        performGarbageCollection()
        
    IF health.errorRate > 0.5:
        IF state.errorCount > state.maxErrorsBeforeStop:
            stopL3Execution("High error rate")
        ELSE:
            logWarning("High error rate: " + health.errorRate)
            
    IF health.executionRate < 0.1 AND state.taskQueue.size() > 0:
        logWarning("Low execution rate despite pending tasks")
        analyzeBottlenecks()
```

## Integration

### With Lean Workflow Executor
```pseudocode
// In lean-workflow-executor.md
FUNCTION initialize_system():
    existingInit()  // Original initialization
    
    // Add L3 continuous engine
    IF settings.autonomy_level == "L3":
        engine = new ContinuousExecutionEngine()
        engine.initialize()
        
        // Override normal execution flow
        setExecutionMode("continuous")
```

### With Autonomy Controller
```pseudocode
// Enhanced autonomy controller integration
FUNCTION applyAutonomyLevel(action):
    IF settings.autonomy_level == "L3" AND continuousEngine.active:
        // Let continuous engine handle
        RETURN continuousEngine.handleAction(action)
    ELSE:
        // Original autonomy logic
        RETURN originalAutonomyLogic(action)
```

## Configuration

### L3-Specific Settings
```yaml
l3_continuous_settings:
  max_parallel_tasks: 5
  task_timeout_ms: 300000  # 5 minutes
  error_threshold: 5
  progress_report_interval: 60000  # 1 minute
  
  stop_conditions:
    business_impact: true
    security_violations: true
    data_loss_risks: true
    critical_quality_failures: true
    
  auto_recovery:
    test_failures: true
    lint_errors: true
    type_errors: true
    import_errors: true
```

## Benefits

1. **True Continuous Operation**: No stopping between tasks
2. **Parallel Execution**: Multiple tasks simultaneously
3. **Auto-Recovery**: Handles common errors automatically
4. **Smart Work Discovery**: Finds next work proactively
5. **Minimal Stops**: Only for critical L3 conditions