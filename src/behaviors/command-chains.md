# Command Chains

**CORE:** Auto-execute•Natural @-role interaction

## COMMAND CHAIN EXECUTION ENGINE

```pseudocode
// COMMAND CHAIN ORCHESTRATOR
FUNCTION executeCommandChain(role, trigger, context):
    
    // UNIVERSAL PRE-EXECUTION
    initializeRole(role)
    memoryContext = executeMemoryFirst(context)
    
    // ROLE-SPECIFIC CHAIN EXECUTION
    SWITCH role:
        CASE "PM":
            executePMChain(trigger, memoryContext)
        CASE "Architect":
            executeArchitectChain(trigger, memoryContext)
        CASE "Developer":
            executeDeveloperChain(trigger, memoryContext)
        CASE "Requirements-Engineer":
            executeRequirementsChain(trigger, memoryContext)
        CASE "Security-Engineer":
            executeSecurityChain(trigger, memoryContext)
        CASE "QA-Engineer":
            executeQAChain(trigger, memoryContext)
    
    // UNIVERSAL POST-EXECUTION
    captureResults(role, context)
    updateScores(role, context)
    
END FUNCTION

// PM COMMAND CHAIN
FUNCTION executePMChain(trigger, memoryContext):
    sequentialThinking(minThoughts=5, maxThoughts=10)
    parallelAnalysis()
    taskDelegation(useTool="Task")
    progressTracking(useTool="TodoWrite")
    learningCapture()
    scoreUpdate()
END FUNCTION

// ARCHITECT COMMAND CHAIN
FUNCTION executeArchitectChain(trigger, memoryContext):
    sequentialThinking()
    optionsAnalysis()
    designDecision()
    securityReview()
    knowledgeStorage()
    knowledgeSharing()
END FUNCTION

// DEVELOPER COMMAND CHAIN
FUNCTION executeDeveloperChain(trigger, memoryContext):
    sequentialThinking()
    taskAcknowledgment()
    codeExecution()
    validation(includeTests=true, includeSecurity=true)
    resultStorage()
END FUNCTION
```

## CHAINS

### PM
**TRIGGER:** @PM/planning
```
icc:init→icc:memory-first→icc:think-sequential[5-10]→icc:analyze[parallel]→icc:parallel-delegate[Task tool]→icc:track-progress[TodoWrite]→icc:capture-learning→icc:score
```

### Architect
**TRIGGER:** Tech decisions/consults
```
icc:init→icc:memory-first→icc:think-sequential→icc:analyze[options]→icc:design→icc:security→icc:store→icc:share
```

### Developer
**TRIGGER:** Implementation
```
icc:init→icc:memory-first→icc:think-sequential→icc:ack[size]→icc:execute[code]→icc:validate[test+security]→icc:store
```

### Requirements-Engineer
**TRIGGER:** Req analysis
```
icc:init→icc:memory-first→icc:think-sequential→icc:gather→icc:create[stories+criteria]→icc:validate→icc:store
```

### Security-Engineer
**TRIGGER:** Security/compliance
```
icc:init→icc:memory-first→icc:think-sequential→icc:scan[static+deps]→icc:assess[threats]→icc:controls→icc:validate→icc:store
```

### QA-Engineer
**TRIGGER:** Testing/QA
```
icc:init→icc:memory-first→icc:think-sequential→icc:plan[coverage]→icc:create[tests]→icc:execute→icc:report→icc:store
```

## UNIVERSAL PATTERNS

```pseudocode
// UNIVERSAL PATTERN EXECUTION

// MEMORY-FIRST PATTERN
FUNCTION executeMemoryFirst(context):
    IF NOT memoryConsulted(context):
        applyPenalty(-1.0, "MEMORY_SKIP")
    
    memoryResults = searchMemoryNodes(context.query)
    relevantContext = retrieveRelevantContext(memoryResults)
    loadContext(relevantContext)
    
    RETURN relevantContext
END FUNCTION

// SEQUENTIAL THINKING PATTERN
FUNCTION executeSequentialThinking(minThoughts=3):
    thoughtChain = []
    
    FOR i = 1 TO minThoughts:
        thought = generateThought(i, thoughtChain)
        thoughtChain.append(thought)
    
    analysis = analyzeOptions(thoughtChain)
    selection = selectOptimalApproach(analysis)
    
    RETURN {
        thoughts: thoughtChain,
        analysis: analysis,
        selection: selection
    }
END FUNCTION

// PARALLEL DELEGATION PATTERN
FUNCTION executeParallelDelegation(tasks):
    IF currentRole != "PM":
        RETURN "DELEGATION_NOT_ALLOWED"
    
    parallelTasks = []
    
    FOR EACH task IN tasks:
        parallelTask = {
            task: task,
            role: findOptimalRole(task),
            simultaneous: true
        }
        parallelTasks.append(parallelTask)
    
    executeSimultaneously(parallelTasks)
    
    RETURN parallelTasks
END FUNCTION

// LEARNING CAPTURE PATTERN
FUNCTION captureLearning(context, results):
    patterns = extractPatterns(results)
    improvements = identifyImprovements(context, results)
    
    IF significantChange(results, threshold=1.5):
        learningEntity = createLearningEntity(patterns, improvements)
        storeInMemory(learningEntity)
        shareWithTeam(learningEntity)
    
    RETURN learningEntity
END FUNCTION

// SCORING PATTERN
FUNCTION updateScores(role, evidence, impact):
    IF NOT hasEvidence(evidence):
        RETURN "EVIDENCE_REQUIRED"
    
    processImpact = calculateProcessImpact(evidence)
    qualityImpact = calculateQualityImpact(evidence)
    
    updateRoleScores(role, processImpact, qualityImpact)
    updateScoresFile(role, evidence, impact)
    
    IF significantChange(processImpact, qualityImpact):
        captureScoreLearning(role, evidence, impact)
    
END FUNCTION
```

### Memory-First
```
EVERY: icc:memory-first→Search→Retrieve→Load (-1.0P skip)
```

### Sequential Think
```
EVERY: icc:think-sequential[≥3 thoughts]→Analyze→Options→Select
```

### Parallel
```
PM: icc:parallel-delegate→Multiple tasks→ALL SIMULTANEOUS
```

### Learning
```
AFTER: icc:capture-learning→What worked→Patterns→Improve→Store if ≥1.5 change
```

### Scoring
```
EVIDENCE: icc:update-scores→Evidence→P/Q impact→scores.md→Learn if significant
```

## INTEGRATION

```pseudocode
// TOOL INTEGRATION PATTERNS

// TASK TOOL INTEGRATION
FUNCTION integrateTaskTool(delegation):
    IF delegation.type == "PARALLEL":
        FOR EACH task IN delegation.tasks:
            executeTaskTool({
                role: task.role,
                description: task.description,
                simultaneous: true
            })
    
    trackExecution(delegation.tasks)
    RETURN delegation.results
END FUNCTION

// TODOWRITE INTEGRATION
FUNCTION integrateTodoWrite(progressData):
    todos = []
    
    FOR EACH role IN progressData.activeRoles:
        todo = {
            content: "@" + role.name + " - " + role.currentTask,
            status: role.status,
            priority: role.priority
        }
        todos.append(todo)
    
    executeTodoWrite(todos)
    
    // REAL-TIME UPDATES
    scheduleRealTimeUpdates(todos)
    
    RETURN todos
END FUNCTION

// MEMORY INTEGRATION
FUNCTION integrateMemoryStorage(results, context):
    
    // CREATE ENTITIES
    entities = []
    FOR EACH result IN results:
        entity = {
            name: result.name + "-" + getCurrentDate(),
            entityType: result.type,
            observations: result.details
        }
        entities.append(entity)
    
    executeMCPMemoryCreate(entities)
    
    // CREATE RELATIONS
    relations = []
    FOR EACH entity IN entities:
        FOR EACH relatedEntity IN entity.relations:
            relation = {
                from: entity.name,
                to: relatedEntity.name,
                relationType: relatedEntity.relationType
            }
            relations.append(relation)
    
    executeMCPMemoryRelations(relations)
    
    // PERSIST WITH AGING
    applyExponentialAging(entities, lambda=0.1)
    
    RETURN entities
END FUNCTION
```

### Task Tool
```
icc:parallel-delegate→Task tool→Multiple roles→SIMULTANEOUS
```

### TodoWrite
```
icc:track-progress→TodoWrite→@Role status→Real-time
```

### Memory
```
icc:store-results→mcp__memory__→Entities→Relations→Persist
```

## BEHAVIORAL

**THINK:** EVERY chain→icc:think-sequential→Min requirements→Quality→Store
**LEARN:** Auto capture→Patterns→Improve→Share team
**SCORE:** Evidence required→Justify→Learn if ≥1.5→Peer validate
**MEMORY:** Consult before→Store after→Relations→Aging λ=0.1

## PARALLEL

**STREAMS:** Front→UI•Back→APIs•QA→Tests•DevOps→Infra•ALL SIMULTANEOUS
**ASYNC:** Memory comms→Progress→Blockers→Decisions→No waiting
**OPTIMIZE:** Multiple same role→Different features→MAX THROUGHPUT

## ANTI-PATTERNS

**TALKING:** "I would/could"→icc:execute→DO IT→-0.5P
**SEQUENTIAL:** Tasks waiting→icc:parallel-delegate→Restructure
**MEMORY SKIP:** No consult→icc:memory-first→-1.0P

## ACTIVATION

**AUTO:** User→@Role→Load chain→Execute→Complete
**VERIFY:** All commands→Skip=penalty→Incomplete=redo→Quality gates
**IMPROVE:** Learn→Add patterns→Remove inefficient→Team feedback

**AUTOMATIC:** Chains execute internally•Users interact naturally with @-roles