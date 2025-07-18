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

### 2. Execute Workflow (MEMORY-FIRST)
```pseudocode
FUNCTION executeWorkflow(assignment):
    // MANDATORY: Consult memory BEFORE starting work
    relevantKnowledge = consultMemoryForTask(assignment)
    
    // Apply retrieved knowledge to current work
    applyKnowledgeToWork(relevantKnowledge, assignment)
    
    // Check autonomy level
    isL3 = getConfig("autonomy_level") == "L3"
    
    // Execute based on phase with knowledge
    SWITCH assignment.phase:
        CASE "INIT":
            planWorkWithKnowledge(assignment, relevantKnowledge)
        CASE "PLAN":
            createTasksWithKnowledge(assignment, relevantKnowledge)
        CASE "EXECUTE":
            executeTasksWithKnowledge(assignment, relevantKnowledge, isL3)
        CASE "ACCEPTANCE":
            validateWorkWithKnowledge(assignment, relevantKnowledge)
        CASE "DONE":
            captureNewKnowledge(assignment, relevantKnowledge)
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

### Memory-First Implementation (CRITICAL FIX)
```pseudocode
FUNCTION consultMemoryForTask(task):
    // Extract keywords from task
    keywords = extractKeywords(task.title, task.description)
    relevantKnowledge = {learnings: [], similarTasks: [], errorPatterns: []}
    
    // Search for relevant learnings
    FOR keyword IN keywords:
        results = SearchMemory(keyword)  // Use file-based memory
        relevantKnowledge.learnings.extend(results)
    
    // Search for similar tasks
    similarTasks = searchSimilarTasks(task.type, task.domain)
    relevantKnowledge.similarTasks = similarTasks
    
    // Search for error patterns
    errorPatterns = searchErrorPatterns(task.type)
    relevantKnowledge.errorPatterns = errorPatterns
    
    RETURN relevantKnowledge

FUNCTION applyKnowledgeToWork(knowledge, task):
    applicationLog = []
    
    // Apply different types of learnings
    FOR learning IN knowledge.learnings:
        application = null
        
        SWITCH learning.entityType:
            CASE "CriticalBug":
                application = applyCriticalBugLearning(learning, task)
            CASE "TechnicalPattern":
                application = applyTechnicalPattern(learning, task)
            CASE "UserCorrection":
                application = applyUserCorrection(learning, task)
            CASE "StoryLearning":
                application = applyStoryLearning(learning, task)
            DEFAULT:
                application = applyGenericLearning(learning, task)
        
        IF application:
            applicationLog.append(application)
    
    // Apply patterns from similar tasks
    FOR pattern IN knowledge.similarTasks:
        application = applyPatternToTask(pattern, task)
        applicationLog.append(application)
    
    // Avoid known error patterns
    FOR errorPattern IN knowledge.errorPatterns:
        application = avoidErrorPattern(errorPattern, task)
        applicationLog.append(application)
    
    // Log all applications
    logLearningApplications(applicationLog, task)
    
    RETURN applicationLog

FUNCTION captureNewKnowledge(task, previousKnowledge):
    // Capture user information as learnings
    userInformation = extractUserInformation(task)
    IF userInformation:
        storeUserInformation(userInformation)
    
    // Capture corrections as learnings
    corrections = extractCorrections(task)
    IF corrections:
        storeCorrections(corrections)
    
    // Store task completion with new insights
    storeTaskCompletion(task, previousKnowledge)

// Learning Application Functions
FUNCTION applyCriticalBugLearning(bugLearning, task):
    preventionMeasures = []
    
    // Extract prevention measures from bug observations
    FOR observation IN bugLearning.observations:
        IF observation.contains("Must consult memory"):
            preventionMeasures.append("memory_consultation_mandatory")
        IF observation.contains("Should learn from information"):
            preventionMeasures.append("capture_user_information")
        IF observation.contains("recall before tasks"):
            preventionMeasures.append("memory_first_workflow")
    
    // Apply prevention measures
    FOR measure IN preventionMeasures:
        applyPreventionMeasure(measure, task)
    
    RETURN {
        type: "critical_bug_prevention",
        learning: bugLearning,
        measures: preventionMeasures,
        applied: true
    }

FUNCTION applyTechnicalPattern(pattern, task):
    // Check if pattern applies to current task
    IF isPatternApplicable(pattern, task):
        applyPatternPrinciples(pattern, task)
        RETURN {
            type: "technical_pattern",
            pattern: pattern,
            applied: true
        }
    RETURN {type: "technical_pattern", applied: false}

FUNCTION applyUserCorrection(correction, task):
    // Extract corrected behavior
    correctedBehavior = extractCorrectedBehavior(correction)
    
    // Apply correction to current task
    applyCorrectionToTask(correctedBehavior, task)
    
    RETURN {
        type: "user_correction",
        correction: correction,
        behavior: correctedBehavior,
        applied: true
    }
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
2. **Memory-First Learning**: Mandatory memory consultation before all work
3. **Actual Learning**: Captures user information and applies knowledge
4. **Simpler Logic**: Direct execution without loops
5. **Easier Maintenance**: Fewer moving parts
6. **Same Functionality**: All essential features preserved
7. **Faster Execution**: No overhead from complex systems

## Usage

```yaml
# In virtual-team.md, replace complex imports with:
@behaviors/lean-workflow-executor-v2.md

# That's it! The system is now lean.
```