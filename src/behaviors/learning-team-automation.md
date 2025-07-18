# Learning Team Automation

**CORE:** First error forgiven • Second error penalized • Active learning bonus • Retrospective mandatory

## Executive Summary (60 tokens)

**Pattern:** Error → Forgive (1st) or Penalize (2nd) → Capture Learning → Share  
**Bonuses:** +0.5P/Q for applying previous learnings ("based on", "applying lesson")  
**Memory Format:** Learning-[ErrorType]-[YYYY-MM-DD]  
**Key Functions:** `processErrorForLearning()`, `detectLearningApplication()`, `executeRetrospective()`  
**Integration:** Automatic with all role actions and error handling  

## Quick Learning Patterns

```yaml
First Error: No penalty + Learning created + Pattern stored
Repeated Error: Double penalty (2x) + Escalation
Learning Application: +0.5P/Q bonus for references
Retrospective: Auto-triggered on completion/error/milestone
```

## AUTOMATED LEARNING ENFORCEMENT

```pseudocode
FUNCTION initializeLearningEnforcement():
    errorDetector = new ErrorDetector()
    learningValidator = new LearningValidator()
    penaltyCalculator = new PenaltyCalculator()
    
    setInterval(() => {
        currentErrors = errorDetector.detectErrors()
        FOR EACH error IN currentErrors: processErrorForLearning(error)
    }, 100)

FUNCTION processErrorForLearning(error):
    errorEntity = {type: error.type, description: error.description, context: error.context, timestamp: getCurrentTimestamp(), role: error.involvedRole}
    
    previousLearning = searchMemoryNodes("Learning-" + error.type)
    
    IF previousLearning.length > 0:
        penalty = calculateBasePenalty(error) * 2
        applyPenalty(penalty, "REPEATED_ERROR_AFTER_LEARNING")
        logLearningIgnored(error, previousLearning)
        escalateRepeatedError(error, previousLearning)
    ELSE:
        learningEntity = createLearningEntity(errorEntity)
        StoreInMemory(learningEntity)  // Use common pattern
        logFirstOccurrenceForgiveness(error)
        integrateLearningIntoMemory(learningEntity)
    
    analyzeErrorPatterns(error, previousLearning)

FUNCTION createLearningEntity(errorEntity):
    learningEntity = {
        name: "Learning-" + errorEntity.type + "-" + getCurrentDate(),
        entityType: "Learning",
        observations: ["Error: " + errorEntity.description, "Context: " + errorEntity.context, "Learning: " + extractLesson(errorEntity), "Prevention: " + generatePreventionMeasures(errorEntity)]
    }
    
    createRelations([
        {from: learningEntity.name, to: errorEntity.role, relationType: "learned-by"},
        {from: learningEntity.name, to: errorEntity.context, relationType: "applies-to"},
        {from: learningEntity.name, to: "Prevention-Measures", relationType: "prevents"}
    ])
    
    RETURN learningEntity
```

**ERROR DETECTION:** Every error/failure → AUTO-CAPTURE → Memory entity creation → Pattern analysis
**LEARNING VALIDATION:** Before penalty → Search memory for identical error type → If found: Apply DOUBLE penalty • If new: Create learning entry with NO penalty
**FORGIVENESS PROTOCOL:** First occurrence of error type → Learning opportunity → NO PENALTY → MANDATORY memory integration with Learning-[ErrorType]-[YYYY-MM-DD] format
**PENALTY TRIGGER:** Identical error type found in memory → DOUBLE scoring penalty applied → Escalation protocols activated → Learning ignored violation recorded

## BEHAVIORAL LEARNING INTEGRATION

**MANDATORY MEMORY CONSULTATION:** Before making role assignments, Claude Code MUST search memory for relevant learnings:

```pseudocode
FUNCTION consultLearningsBeforeRoleAssignment(taskType, proposedRole):
    learningQueries = [
        "Learning-" + proposedRole + "-",
        "Learning-" + taskType + "-",
        proposedRole + " cannot",
        proposedRole + " restriction"
    ]
    
    FOR query IN learningQueries:
        relevantLearnings = searchMemoryNodes(query)
        
        IF relevantLearnings.length > 0:
            logLearningApplication("Based on previous learning: " + relevantLearnings[0].observations[2])
            preventionMeasure = relevantLearnings[0].observations[3]
            
            IF preventionMeasure.contains("Remove"):
                RETURN {
                    blocked: true,
                    reason: "Learning prevents this assignment",
                    learning: relevantLearnings[0],
                    alternative: extractAlternativeFromPrevention(preventionMeasure)
                }
    
    RETURN {blocked: false}
```

**LEARNING REFERENCE PATTERNS:**
- "Based on previous learning about [topic]..."
- "Applying lesson from [Learning-Entity-Name]..."
- "To prevent repeat of [error type]..."

## LEARNING MEMORY FORMAT [SIMPLIFIED]

**FORMAT:** "Learning-[ErrorType]-[YYYY-MM-DD]" 
**CONTENT:** "Error: [Description] | Context: [Situation] | Learning: [Extracted lesson] | Prevention: [How to avoid]"
**RELATIONSHIP:** Link to role, task, outcome, and prevention measures
**RETRIEVAL:** Simple search by error type, role, or context keywords

## BONUS POINT AUTOMATION

```pseudocode
FUNCTION detectLearningApplication(action, context):
    bonuses = []
    
    learningReferences = detectLearningReferences(action.content)
    
    FOR EACH reference IN learningReferences:
        validation = validateLearningApplication(reference, action)
        
        IF validation.isValid:
            SWITCH reference.type:
                CASE "BASED_ON_PREVIOUS_LEARNING": bonuses.append({type: "LEARNING_APPLICATION", score: +0.5, scoreType: "P", reason: "Applied previous learning"})
                CASE "APPLYING_LESSON_FROM": bonuses.append({type: "LESSON_APPLICATION", score: +0.5, scoreType: "P", reason: "Applied lesson from experience"})
                CASE "PREVENT_REPEAT_OF": bonuses.append({type: "PREVENTION_APPLICATION", score: +0.5, scoreType: "Q", reason: "Prevented error repetition"})
                CASE "PATTERN_BREAKING": IF validation.successfullyBrokePattern: bonuses.append({type: "PATTERN_BREAKING", score: +1.0, scoreType: "BOTH", reason: "Successfully broke negative pattern"})
    
    FOR EACH bonus IN bonuses: applyBonus(bonus.score, bonus.scoreType, bonus.reason); logLearningBonus(bonus)
    RETURN bonuses

FUNCTION detectLearningReferences(content):
    references = []
    learningPatterns = [
        {pattern: "based on previous learning", type: "BASED_ON_PREVIOUS_LEARNING"},
        {pattern: "applying lesson from", type: "APPLYING_LESSON_FROM"},
        {pattern: "to prevent repeat of", type: "PREVENT_REPEAT_OF"},
        {pattern: "learned from previous", type: "BASED_ON_PREVIOUS_LEARNING"},
        {pattern: "breaking the pattern", type: "PATTERN_BREAKING"}
    ]
    
    FOR EACH pattern IN learningPatterns:
        IF content.contains(pattern.pattern): references.append({type: pattern.type, content: extractRelevantContent(content, pattern.pattern), confidence: calculateConfidence(content, pattern.pattern)})
    
    RETURN references
```

**TRIGGERS:** "Based on previous learning" → +0.5P • "Applying lesson from" → +0.5P • "To prevent repeat of" → +0.5Q • Pattern breaking → +1.0P/Q

## RETROSPECTIVE AUTOMATION

```pseudocode
FUNCTION initializeRetrospectiveAutomation():
    triggers = {
        "TASK_COMPLETION": (context) => context.taskCompleted,
        "ERROR_OCCURRENCE": (context) => context.errorOccurred,
        "MILESTONE_REACHED": (context) => context.milestoneReached,
        "DAILY_COMPLETION": (context) => context.dailyWorkCompleted
    }
    
    setInterval(() => {
        context = getCurrentContext()
        FOR EACH trigger IN triggers:
            IF trigger.condition(context): executeRetrospective(trigger.type, context)
    }, 1000)

FUNCTION executeRetrospective(triggerType, context):
    retrospective = {
        trigger: triggerType,
        timestamp: getCurrentTimestamp(),
        insights: {
            whatWorked: extractSuccessfulPatterns(context),
            whatFailed: extractErrorPatterns(context),
            whatLearned: extractNewInsights(context),
            whatToChange: extractProcessImprovements(context)
        }
    }
    
    integrateRetrospectiveIntoMemory(retrospective)
    shareRetrospectiveWithTeam(retrospective)
    buildPatternsFromRetrospective(retrospective)
    RETURN retrospective

FUNCTION extractSuccessfulPatterns(context):
    successfulPatterns = []
    successfulActions = context.actions.filter(action => action.success)
    
    FOR EACH action IN successfulActions:
        pattern = {type: "SUCCESS_PATTERN", action: action.type, context: action.context, outcome: action.outcome, reusability: calculateReusability(action)}
        patternEntity = {name: "Success-Pattern-" + action.type + "-" + getCurrentDate(), entityType: "SuccessPattern", observations: ["Action: " + action.description, "Context: " + action.context, "Outcome: " + action.outcome, "Reuse Instructions: " + generateReuseInstructions(action)]}
        storeInMemory(patternEntity)
        successfulPatterns.append(pattern)
    
    RETURN successfulPatterns

FUNCTION extractErrorPatterns(context):
    errorPatterns = []
    failedActions = context.actions.filter(action => action.failed)
    
    FOR EACH action IN failedActions:
        pattern = {type: "ERROR_PATTERN", action: action.type, failure: action.failure, rootCause: analyzeRootCause(action), prevention: generatePreventionMeasures(action)}
        learningEntity = {name: "Learning-" + action.failure.type + "-" + getCurrentDate(), entityType: "Learning", observations: ["Error: " + action.failure.description, "Root Cause: " + pattern.rootCause, "Prevention: " + pattern.prevention, "Context: " + action.context]}
        storeInMemory(learningEntity)
        errorPatterns.append(pattern)
    
    RETURN errorPatterns
```

**TRIGGERS:** Task completion • Error occurrence • Milestone reached • Daily completion
**AUTO-EXTRACTION:** What worked → Capture for reuse • What failed → Capture for prevention • What learned → Memory integration • What to change → Implementation planning

## BEHAVIORAL ENFORCEMENT

**MEMORY-FIRST VALIDATION:** Before action → Memory search → Apply learnings → Document usage
**LEARNING CHECK:** Error occurs → Search patterns → Apply forgiveness/penalty logic → Continue with learning
**PATTERN PREVENTION:** Task starts → Search error patterns → Apply prevention measures → Proactive learning application
**CROSS-ROLE LEARNING:** Learning in one role → Share with relevant roles → Prevent team-wide repetition

## PENALTY SYSTEM INTEGRATION

**FIRST ERROR HANDLING:** calculatePenalty() checks checkForPreviousLearning() → Returns zero penalty if first occurrence with learning captured
**REPEATED ERROR HANDLING:** calculatePenalty() applies 2x base penalty multiplier for repeated errors after learning captured
**BONUS DETECTION:** detectAndApplyLearningBonuses() automatically scans actions for learning application patterns
**MEMORY INTEGRATION:** All learning events stored using simple naming: Learning-[ErrorType]-[YYYY-MM-DD]
**AUTOMATIC REWARDS:** +0.5P/Q applied automatically when learning application detected in role communications