# Active Learning System Architecture (BUG-014)

**Purpose:** Comprehensive implementation architecture for error forgiveness and learning bonus mechanisms  
**Integration:** Designed for lean-workflow-executor.md integration  
**Memory:** Supports both MCP and file-based storage  

## System Overview

The Active Learning System implements a sophisticated error forgiveness mechanism where first errors are learning opportunities (no penalty) and repeated errors after learning result in double penalties. It also rewards learning application with +0.5P/Q bonuses.

### Core Principles

1. **First Error Forgiveness**: Transform mistakes into learning opportunities
2. **Learning Reinforcement**: Reward application of previous learnings
3. **Pattern Recognition**: Detect and prevent error patterns
4. **Team Learning**: Share learnings across all roles
5. **Continuous Improvement**: Every interaction improves the system

## Architecture Components

### 1. Learning Controller (Core)

```pseudocode
CLASS ActiveLearningController:
    // Core dependencies
    memoryAdapter: MemoryAdapter  // Abstraction for MCP/file storage
    scoreManager: ScoreManager     // Integration with scoring system
    errorTracker: ErrorTracker     // Tracks error occurrences
    patternEngine: PatternEngine   // Pattern detection and matching
    bonusDetector: BonusDetector   // Real-time learning application detection
    
    // State management
    errorHistory: Map<string, ErrorRecord[]>
    activePatterns: Map<string, Pattern>
    learningCache: LRUCache<string, Learning>
    
    FUNCTION initialize(config):
        // Initialize with configuration
        this.memoryAdapter = createMemoryAdapter(config.memoryType)
        this.scoreManager = ScoreManager.getInstance()
        this.errorTracker = new ErrorTracker(this.memoryAdapter)
        this.patternEngine = new PatternEngine()
        this.bonusDetector = new BonusDetector()
        
        // Load existing learnings into cache
        this.loadActiveLearnings()
        
        // Start monitoring
        this.startContinuousMonitoring()
```

### 2. Memory Abstraction Layer

```pseudocode
INTERFACE MemoryAdapter:
    createEntity(entity: Entity): void
    createRelations(relations: Relation[]): void
    searchNodes(query: string): Entity[]
    updateEntity(entity: Entity): void
    
CLASS MCPMemoryAdapter IMPLEMENTS MemoryAdapter:
    FUNCTION createEntity(entity):
        mcp__memory__create_entities([entity])
    
    FUNCTION searchNodes(query):
        RETURN mcp__memory__search_nodes(query)
        
CLASS FileMemoryAdapter IMPLEMENTS MemoryAdapter:
    basePath: string = "~/.claude/memory"
    
    FUNCTION createEntity(entity):
        // Read existing entities
        entities = readJSON(basePath + "/entities.json")
        entities.append(entity)
        writeJSON(basePath + "/entities.json", entities)
        
        // Update knowledge graph
        updateKnowledgeGraph(entity)
    
    FUNCTION searchNodes(query):
        entities = readJSON(basePath + "/entities.json")
        RETURN entities.filter(e => matchesQuery(e, query))

FUNCTION createMemoryAdapter(type):
    IF type == "mcp" AND mcpAvailable():
        RETURN new MCPMemoryAdapter()
    ELSE:
        RETURN new FileMemoryAdapter()
```

### 3. Error Processing Engine

```pseudocode
CLASS ErrorProcessor:
    learningController: ActiveLearningController
    
    FUNCTION processError(error, context):
        // Generate unique error signature
        errorSignature = this.generateErrorSignature(error)
        
        // Check for previous learning
        previousLearning = this.searchPreviousLearning(errorSignature)
        
        IF previousLearning:
            RETURN this.handleRepeatedError(error, context, previousLearning)
        ELSE:
            RETURN this.handleFirstError(error, context)
    
    FUNCTION generateErrorSignature(error):
        // Create a normalized signature for error matching
        signature = {
            type: normalizeErrorType(error.type),
            category: categorizeError(error),
            context: extractContextSignature(error.context),
            hash: generateHash(error.message)
        }
        
        RETURN JSON.stringify(signature)
    
    FUNCTION handleFirstError(error, context):
        // No penalty - learning opportunity
        learning = this.createLearningEntity(error, context)
        
        // Store in memory
        this.learningController.memoryAdapter.createEntity(learning)
        
        // Extract patterns
        patterns = this.extractPatterns(error, context)
        this.storePatterns(patterns, learning.name)
        
        // Create prevention strategies
        prevention = this.generatePreventionStrategies(error, patterns)
        this.storePrevention(prevention, learning.name)
        
        // Log forgiveness
        logInfo("First occurrence of " + error.type + " - No penalty, learning captured")
        
        RETURN {
            penalty: 0,
            action: "FORGIVEN",
            learning: learning,
            message: "Learning opportunity created - no penalty applied"
        }
    
    FUNCTION handleRepeatedError(error, context, previousLearning):
        // Calculate double penalty
        basePenalty = calculateBasePenalty(error.severity)
        doublePenalty = basePenalty * 2
        
        // Apply penalty through score manager
        this.learningController.scoreManager.applyPenalty(
            context.role,
            doublePenalty,
            "REPEATED_ERROR_AFTER_LEARNING"
        )
        
        // Update error statistics
        this.updateErrorStatistics(error, context, previousLearning)
        
        // Reinforce learning
        this.reinforceLearning(previousLearning, error)
        
        RETURN {
            penalty: doublePenalty,
            action: "PENALIZED",
            previousLearning: previousLearning,
            message: "Repeated error after learning - double penalty applied"
        }
```

### 4. Learning Detection System

```pseudocode
CLASS LearningBonusDetector:
    patterns: Map<string, RegExp>
    validationRules: ValidationRule[]
    
    FUNCTION initialize():
        // Initialize detection patterns
        this.patterns = {
            "EXPLICIT_REFERENCE": /based on previous learning|applying lesson from/i,
            "PREVENTION_MENTION": /to prevent repeat of|avoiding previous error/i,
            "PATTERN_APPLICATION": /using pattern from|applying pattern/i,
            "EXPERIENCE_REFERENCE": /from experience|learned that/i,
            "IMPROVEMENT_MENTION": /improving from|better than before/i
        }
        
        // Start continuous monitoring
        this.startMonitoring()
    
    FUNCTION detectLearningApplication(action, role):
        bonuses = []
        
        // Check for explicit references
        explicitRefs = this.findExplicitReferences(action.content)
        FOR ref IN explicitRefs:
            IF this.validateReference(ref, action):
                bonus = this.calculateBonus(ref, action, role)
                bonuses.append(bonus)
        
        // Check for implicit pattern application
        implicitApps = this.detectImplicitApplication(action, role)
        bonuses.extend(implicitApps)
        
        // Apply all detected bonuses
        FOR bonus IN bonuses:
            this.applyBonus(role, bonus)
        
        RETURN bonuses
    
    FUNCTION validateReference(reference, action):
        // Verify the learning actually exists
        IF reference.learningId:
            learning = memoryAdapter.searchNodes("Learning-" + reference.learningId)
            IF learning.length == 0:
                RETURN false
        
        // Verify relevance to current action
        relevance = calculateRelevance(reference.context, action.context)
        RETURN relevance > 0.7
    
    FUNCTION calculateBonus(reference, action, role):
        baseBonus = 0.5
        
        // Adjust based on reference type
        multiplier = 1.0
        SWITCH reference.type:
            CASE "PREVENTION":
                multiplier = 1.2  // Higher bonus for prevention
            CASE "PATTERN_BREAKING":
                multiplier = 1.5  // Highest for breaking bad patterns
            CASE "IMPROVEMENT":
                multiplier = 1.1
        
        finalBonus = baseBonus * multiplier
        
        // Determine P or Q
        bonusType = this.determineBonusType(reference, action)
        
        RETURN {
            amount: finalBonus,
            type: bonusType,
            reason: "Learning application: " + reference.description,
            evidence: reference.evidence
        }
```

### 5. Pattern Management System

```pseudocode
CLASS PatternEngine:
    patterns: Map<string, ErrorPattern>
    patternMatchers: PatternMatcher[]
    
    FUNCTION extractPatterns(error, context):
        patterns = []
        
        // Root cause pattern
        rootCause = this.analyzeRootCause(error, context)
        patterns.append({
            type: "ROOT_CAUSE",
            pattern: rootCause,
            confidence: rootCause.confidence,
            prevention: this.generatePrevention(rootCause)
        })
        
        // Context patterns
        contextPattern = this.analyzeContext(error, context)
        patterns.append({
            type: "CONTEXT",
            pattern: contextPattern,
            triggers: this.identifyTriggers(contextPattern),
            earlyWarnings: this.generateWarnings(contextPattern)
        })
        
        // Behavioral patterns
        behaviorPattern = this.analyzeBehavior(error, context)
        IF behaviorPattern.isSignificant:
            patterns.append({
                type: "BEHAVIORAL",
                pattern: behaviorPattern,
                correction: this.generateCorrection(behaviorPattern)
            })
        
        RETURN patterns
    
    FUNCTION matchPatterns(currentContext):
        matches = []
        
        FOR pattern IN this.patterns.values():
            matchScore = this.calculateMatch(pattern, currentContext)
            IF matchScore > 0.8:
                matches.append({
                    pattern: pattern,
                    score: matchScore,
                    preventionAdvice: pattern.prevention
                })
        
        RETURN matches.sortBy(m => m.score).reverse()
    
    FUNCTION evolvePattern(pattern, newData):
        // Update pattern with new information
        pattern.occurrences += 1
        pattern.contexts.append(newData.context)
        
        // Recalculate pattern strength
        pattern.confidence = this.recalculateConfidence(pattern)
        
        // Generate new prevention strategies if needed
        IF pattern.confidence > 0.9:
            pattern.prevention = this.enhancePrevention(pattern)
        
        // Store updated pattern
        this.updateStoredPattern(pattern)
```

### 6. Integration Layer

```pseudocode
// Integration with lean-workflow-executor.md

FUNCTION enhanceLeanWorkflowExecutor():
    // Add to initialization
    IN FUNCTION initialize_system():
        // ... existing initialization ...
        
        // Initialize Active Learning System
        activeLearning = new ActiveLearningController(settings)
        activeLearning.initialize(settings)
        
        // Hook into error handling
        errorHandlers.register(activeLearning.processError)
        
        // Hook into action monitoring
        actionMonitors.register(activeLearning.detectLearningApplication)
    
    // Enhance error handling
    IN FUNCTION handleError(error, context):
        // Process through learning system first
        learningResult = activeLearning.processError(error, context)
        
        // Apply learning result
        IF learningResult.action == "FORGIVEN":
            // No penalty path
            logLearningOpportunity(learningResult)
        ELSE IF learningResult.action == "PENALIZED":
            // Double penalty already applied
            logRepeatedError(learningResult)
        
        // Continue with standard error handling
        // ... existing error handling ...
    
    // Enhance action processing
    IN FUNCTION processRoleAction(action, role):
        // ... existing processing ...
        
        // Check for learning application
        learningBonuses = activeLearning.detectLearningApplication(action, role)
        
        // Log any bonuses applied
        IF learningBonuses.length > 0:
            logLearningBonuses(role, learningBonuses)
    
    // Add retrospective triggers
    IN FUNCTION onTaskComplete(task):
        // ... existing completion logic ...
        
        // Trigger retrospective
        activeLearning.triggerRetrospective({
            type: "TASK_COMPLETE",
            task: task,
            role: getCurrentRole(),
            outcomes: task.outcomes
        })
    
    // Add to PM command processing
    IN FUNCTION processUserMessage(message):
        // Check for learning commands
        IF message.contains("show learnings"):
            RETURN activeLearning.showTeamLearnings()
        ELSE IF message.contains("learning stats"):
            RETURN activeLearning.generateLearningStats()
        
        // ... existing command processing ...
```

### 7. Retrospective Automation

```pseudocode
CLASS RetrospectiveEngine:
    triggers: Map<string, TriggerCondition>
    insightExtractors: InsightExtractor[]
    
    FUNCTION initialize():
        // Define trigger conditions
        this.triggers = {
            "TASK_COMPLETE": (event) => event.type == "task.completed",
            "ERROR_PATTERN": (event) => event.errorCount >= 3,
            "MILESTONE": (event) => event.type == "milestone.reached",
            "TIME_BASED": (event) => timeSinceLastRetro() > 24 * HOUR
        }
    
    FUNCTION executeRetrospective(trigger):
        retrospective = {
            id: generateId(),
            trigger: trigger.type,
            timestamp: getCurrentTimestamp(),
            context: captureContext(trigger),
            insights: this.extractInsights(trigger)
        }
        
        // Extract learnings
        learnings = this.convertInsightsToLearnings(retrospective.insights)
        
        // Store each learning
        FOR learning IN learnings:
            learningEntity = this.createLearningFromInsight(learning)
            memoryAdapter.createEntity(learningEntity)
        
        // Share with team
        this.shareTeamInsights(retrospective)
        
        // Update patterns
        this.updatePatternsFromRetrospective(retrospective)
        
        RETURN retrospective
    
    FUNCTION extractInsights(trigger):
        insights = {
            successes: [],
            failures: [],
            learnings: [],
            improvements: []
        }
        
        // Analyze recent actions
        recentActions = getRecentActions(trigger.context)
        
        // Extract success patterns
        insights.successes = this.findSuccessPatterns(recentActions)
        
        // Extract failure patterns
        insights.failures = this.findFailurePatterns(recentActions)
        
        // Generate learnings
        insights.learnings = this.generateLearnings(
            insights.successes,
            insights.failures
        )
        
        // Identify improvements
        insights.improvements = this.identifyImprovements(insights)
        
        RETURN insights
```

### 8. Performance Optimization

```pseudocode
CLASS LearningCache:
    cache: LRUCache<string, Learning>
    maxSize: number = 1000
    ttl: number = 3600000  // 1 hour
    
    FUNCTION get(key):
        entry = this.cache.get(key)
        IF entry AND !this.isExpired(entry):
            RETURN entry.value
        
        // Cache miss - load from memory
        learning = memoryAdapter.searchNodes(key)
        IF learning:
            this.cache.set(key, {
                value: learning,
                timestamp: getCurrentTimestamp()
            })
        
        RETURN learning
    
    FUNCTION preloadCommonPatterns():
        // Preload frequently used patterns
        commonPatterns = [
            "Learning-ConfigError-*",
            "Learning-APIError-*",
            "Learning-ValidationError-*"
        ]
        
        FOR pattern IN commonPatterns:
            results = memoryAdapter.searchNodes(pattern)
            FOR result IN results:
                this.cache.set(result.name, {
                    value: result,
                    timestamp: getCurrentTimestamp()
                })

CLASS PerformanceMonitor:
    metrics: MetricsCollector
    
    FUNCTION trackLearningOperation(operation, duration):
        this.metrics.record({
            operation: operation,
            duration: duration,
            timestamp: getCurrentTimestamp()
        })
        
        // Alert if slow
        IF duration > 100:  // ms
            logWarning("Slow learning operation: " + operation)
```

### 9. Edge Case Handling

```pseudocode
CLASS EdgeCaseHandler:
    
    FUNCTION handleConcurrentErrors(errors):
        // Group similar errors
        errorGroups = this.groupSimilarErrors(errors)
        
        // Process each group
        FOR group IN errorGroups:
            IF group.length == 1:
                // Single error - normal processing
                processError(group[0])
            ELSE:
                // Multiple similar errors - special handling
                this.handleErrorCluster(group)
    
    FUNCTION handleErrorEvolution(currentError, previousError):
        // Calculate similarity
        similarity = this.calculateErrorSimilarity(currentError, previousError)
        
        IF similarity > 0.85:
            // Treat as same error type
            RETURN this.mergeLearnings(currentError, previousError)
        ELSE IF similarity > 0.6:
            // Related but different - create relationship
            this.createErrorRelationship(currentError, previousError)
        ELSE:
            // Different errors - process separately
            RETURN null
    
    FUNCTION handleCrossRoleLearning(learning, fromRole, toRole):
        // Validate applicability
        IF this.isApplicableAcrossRoles(learning):
            // Create adapted learning for target role
            adaptedLearning = this.adaptLearningForRole(learning, toRole)
            
            // Store with relationship
            memoryAdapter.createEntity(adaptedLearning)
            memoryAdapter.createRelation({
                from: adaptedLearning.name,
                to: learning.name,
                relationType: "adapted-from"
            })
    
    FUNCTION handleLearningConflicts(newLearning, existingLearning):
        // Detect if learnings contradict
        IF this.detectContradiction(newLearning, existingLearning):
            // Create meta-learning about the contradiction
            metaLearning = this.createMetaLearning(
                "Contradiction detected",
                [newLearning, existingLearning]
            )
            
            // Flag for human review
            this.flagForReview(metaLearning)
```

## Implementation Guide

### Phase 1: Core Setup
1. Integrate ActiveLearningController into lean-workflow-executor initialization
2. Set up memory adapter based on available tools
3. Initialize error tracking and pattern engine

### Phase 2: Hook Integration
1. Add error processing hooks to error handling
2. Add learning detection to action processing
3. Add retrospective triggers to task completion

### Phase 3: Testing
1. Test first error forgiveness
2. Test repeated error penalties
3. Test learning bonus detection
4. Test pattern evolution

### Phase 4: Optimization
1. Enable caching for performance
2. Set up background pattern analysis
3. Configure retrospective scheduling

## Testing Strategy

```yaml
test_scenarios:
  error_forgiveness:
    - First error → No penalty + Learning created
    - Same error again → Double penalty applied
    - Different error → New learning opportunity
    
  learning_detection:
    - Explicit reference → Bonus applied
    - Implicit application → Bonus applied
    - False reference → No bonus
    
  pattern_matching:
    - Similar context → Pattern matched
    - Prevention applied → Error avoided
    - Pattern evolution → Improved prevention
    
  cross_role:
    - Role A error → Role B learns
    - Team-wide pattern → All roles benefit
    - Specialized learning → Role-specific

  performance:
    - 1000 learnings → <50ms lookup
    - Pattern matching → <20ms
    - Bonus detection → <10ms
```

## Monitoring and Analytics

```pseudocode
CLASS LearningAnalytics:
    
    FUNCTION generateDashboard():
        RETURN {
            totalLearnings: countLearnings(),
            learningsByRole: groupLearningsByRole(),
            topPatterns: getTopPatterns(10),
            preventionSuccess: calculatePreventionRate(),
            bonusesAwarded: sumBonuses(),
            errorReduction: calculateErrorReduction()
        }
    
    FUNCTION trackLearningEffectiveness(learning):
        // Track how often learning prevents errors
        preventions = countPreventions(learning)
        applications = countApplications(learning)
        
        effectiveness = preventions / (applications + 1)
        
        // Update learning metadata
        learning.effectiveness = effectiveness
        learning.lastApplied = getCurrentTimestamp()
        
        memoryAdapter.updateEntity(learning)
```

## Benefits

1. **Continuous Improvement**: Every error becomes a learning opportunity
2. **Knowledge Preservation**: Team knowledge persists across sessions
3. **Positive Reinforcement**: Rewards encourage learning application
4. **Error Prevention**: Patterns help prevent repeat mistakes
5. **Team Learning**: Cross-role knowledge sharing improves everyone
6. **Measurable Impact**: Analytics show improvement over time

---
*Comprehensive Active Learning System Architecture for BUG-014*