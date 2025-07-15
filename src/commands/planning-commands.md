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

## Command Chaining

**TYPICAL FLOW:**
```
icc:plan-task → icc:execute-task → icc:accept-task → DONE
     ↓              ↓              ↓
  (PLAN)       (EXECUTE)     (ACCEPTANCE)
```

**ERROR HANDLING:**
```
icc:accept-task (failed) → icc:plan-task (refinement) → icc:execute-task
```