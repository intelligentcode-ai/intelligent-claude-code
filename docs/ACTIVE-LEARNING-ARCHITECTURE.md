# Active Learning System Architecture

This document describes the comprehensive architecture for the intelligent-claude-code active learning system, which implements error forgiveness, learning bonuses, and continuous improvement patterns.

## Overview

The Active Learning System transforms the virtual team into a continuously improving organization by:
- Forgiving first errors as learning opportunities
- Penalizing repeated errors after learning is captured
- Rewarding application of previous learnings (+0.5P/Q bonuses)
- Capturing and sharing patterns across the entire team
- Automating retrospectives and insight generation

## Core Components

### 1. Learning Controller (learning-controller.md)

The central orchestrator for all learning operations:

```pseudocode
CLASS LearningController:
    FUNCTION __init__():
        this.errorTracker = new ErrorTracker()
        this.bonusDetector = new BonusDetector()
        this.patternManager = new PatternManager()
        this.memoryAdapter = new MemoryAdapter()
        this.retrospectiveEngine = new RetrospectiveEngine()
    
    FUNCTION processError(error, context):
        errorKey = generateErrorKey(error)
        previousLearning = this.memoryAdapter.searchLearning(errorKey)
        
        IF previousLearning:
            // Second error - apply double penalty
            penalty = calculateBasePenalty(error) * 2
            applyPenalty(error.role, penalty, "REPEATED_ERROR_AFTER_LEARNING")
            logLearningIgnored(error, previousLearning)
        ELSE:
            // First error - create learning opportunity
            learning = createLearningEntity(error, context)
            this.memoryAdapter.storeLearning(learning)
            logFirstOccurrenceForgiveness(error)
            // NO PENALTY APPLIED
    
    FUNCTION detectAndApplyBonuses(action, context):
        learningReferences = this.bonusDetector.detect(action)
        FOR EACH reference IN learningReferences:
            IF validateLearningApplication(reference, action):
                applyBonus(action.role, +0.5, reference.type)
                logLearningBonus(reference)
```

### 2. Memory Abstraction Layer

Provides consistent interface regardless of storage backend:

```pseudocode
CLASS MemoryAdapter:
    FUNCTION __init__():
        this.mcpAvailable = checkMCPAvailability()
        this.fallbackStorage = new FileBasedStorage()
    
    FUNCTION searchLearning(query):
        IF this.mcpAvailable:
            RETURN mcp__memory__search_nodes(query)
        ELSE:
            RETURN this.fallbackStorage.search(query)
    
    FUNCTION storeLearning(learning):
        IF this.mcpAvailable:
            entity = {
                name: learning.name,
                entityType: "Learning",
                observations: learning.observations
            }
            mcp__memory__create_entities([entity])
            createLearningRelations(learning)
        ELSE:
            this.fallbackStorage.store(learning)
```

### 3. Error Processing Engine

Implements the error forgiveness logic:

```pseudocode
CLASS ErrorTracker:
    FUNCTION generateErrorKey(error):
        // Create consistent key for error type identification
        RETURN normalizeErrorType(error.type) + "-" + error.category
    
    FUNCTION createLearningEntity(error, context):
        learning = {
            name: "Learning-" + error.type + "-" + getCurrentDate(),
            entityType: "Learning",
            observations: [
                "Error: " + error.description,
                "Context: " + context.description,
                "Root Cause: " + analyzeRootCause(error),
                "Prevention: " + generatePreventionMeasures(error),
                "Impact: " + assessImpact(error),
                "Pattern: " + extractPattern(error)
            ],
            metadata: {
                role: context.role,
                task: context.task,
                timestamp: getCurrentTimestamp(),
                severity: error.severity
            }
        }
        RETURN learning
```

### 4. Learning Detection System

Real-time monitoring for learning application:

```pseudocode
CLASS BonusDetector:
    learningPatterns = [
        {pattern: /based on previous learning/i, type: "EXPLICIT_REFERENCE", bonus: 0.5},
        {pattern: /applying lesson from/i, type: "LESSON_APPLICATION", bonus: 0.5},
        {pattern: /to prevent repeat of/i, type: "PREVENTION", bonus: 0.5},
        {pattern: /learned from previous/i, type: "PAST_LEARNING", bonus: 0.5},
        {pattern: /breaking the pattern/i, type: "PATTERN_BREAKING", bonus: 1.0}
    ]
    
    FUNCTION detect(action):
        references = []
        content = action.content + " " + action.rationale
        
        FOR EACH pattern IN this.learningPatterns:
            IF pattern.pattern.test(content):
                reference = {
                    type: pattern.type,
                    bonus: pattern.bonus,
                    content: extractContext(content, pattern.pattern),
                    confidence: calculateConfidence(content, pattern)
                }
                references.append(reference)
        
        // Also check for implicit learning application
        implicitReferences = detectImplicitLearning(action)
        references.extend(implicitReferences)
        
        RETURN references
```

### 5. Pattern Management System

Extracts and evolves patterns:

```pseudocode
CLASS PatternManager:
    FUNCTION extractPattern(data):
        pattern = {
            type: classifyPattern(data),
            trigger: identifyTrigger(data),
            behavior: extractBehavior(data),
            outcome: analyzeOutcome(data),
            prevention: generatePrevention(data),
            applicability: assessApplicability(data)
        }
        RETURN pattern
    
    FUNCTION evolvePattern(existingPattern, newData):
        // Patterns improve over time with more data
        updatedPattern = existingPattern
        updatedPattern.confidence = recalculateConfidence(existingPattern, newData)
        updatedPattern.variations.append(extractVariation(newData))
        updatedPattern.effectiveness = updateEffectiveness(existingPattern, newData)
        RETURN updatedPattern
```

### 6. Integration Layer (lean-workflow-executor.md)

Specific integration points in the workflow executor:

```pseudocode
// In processAssignmentFile():
FUNCTION processAssignmentFile(filePath):
    // Existing processing...
    
    // Learning integration
    IF action.type == "ERROR":
        learningController.processError(action.error, context)
    
    // Bonus detection for all actions
    learningController.detectAndApplyBonuses(action, context)
    
    // Retrospective trigger on completion
    IF action.type == "TASK_COMPLETE":
        retrospectiveEngine.triggerIfNeeded(action, context)

// In handleError():
FUNCTION handleError(error, context):
    // Existing error handling...
    
    // Learning system integration
    learningController.processError(error, context)
    
    // Continue with modified penalty (might be 0 for first error)
    RETURN modifiedError

// In executeAction():
FUNCTION executeAction(action, role):
    // Before execution - check for learning application
    learningController.detectAndApplyBonuses(action, {role: role})
    
    // Existing execution...
```

### 7. Retrospective Automation Engine

Automatic learning synthesis:

```pseudocode
CLASS RetrospectiveEngine:
    triggers = {
        TASK_COMPLETION: (ctx) => ctx.taskCompleted,
        ERROR_OCCURRENCE: (ctx) => ctx.errorOccurred,
        MILESTONE_REACHED: (ctx) => ctx.milestoneReached,
        DAILY_COMPLETION: (ctx) => isEndOfDay()
    }
    
    FUNCTION triggerIfNeeded(action, context):
        FOR EACH trigger IN this.triggers:
            IF trigger.condition(context):
                executeRetrospective(trigger.type, context)
    
    FUNCTION executeRetrospective(type, context):
        retrospective = {
            trigger: type,
            insights: {
                whatWorked: extractSuccesses(context),
                whatFailed: extractFailures(context),
                whatLearned: extractLearnings(context),
                whatToChange: extractImprovements(context)
            }
        }
        
        // Create learning entities for insights
        FOR EACH insight IN retrospective.insights.whatLearned:
            learning = createLearningFromInsight(insight)
            memoryAdapter.storeLearning(learning)
        
        // Share with team
        shareRetrospectiveWithTeam(retrospective)
```

## Integration Points

### 1. Memory System Integration
- Primary: MCP Memory for persistent storage
- Fallback: File-based JSON storage (~/.claude/learning/)
- Format: Consistent entity structure for both

### 2. Scoring System Integration
- Error penalties: 0 for first, 2x for repeated
- Learning bonuses: +0.5P/Q for application
- Pattern breaking: +1.0P/Q for innovation

### 3. Workflow Integration
- Hook into error handling pipeline
- Enhance action processing for bonus detection
- Trigger retrospectives on completion events

### 4. PM Command Integration
- @PM learning-stats: View learning statistics
- @PM clear-learning: Reset learning data (with confirmation)
- Included in @PM status output

## Data Structures

### Learning Entity Format
```yaml
name: "Learning-[ErrorType]-[YYYY-MM-DD]"
entityType: "Learning"
observations:
  - "Error: [Description]"
  - "Context: [Situation]"
  - "Root Cause: [Analysis]"
  - "Prevention: [Measures]"
  - "Impact: [Assessment]"
  - "Pattern: [Extracted]"
metadata:
  role: "@Role"
  task: "TASK-XXX"
  timestamp: "ISO-8601"
  severity: "low|medium|high|critical"
```

### Relations
- Learning -> appliedBy -> Role
- Learning -> prevents -> ErrorType
- Learning -> relatedTo -> Task
- Learning -> evolvesFrom -> PreviousLearning

## Performance Considerations

### Caching Strategy
```pseudocode
CLASS LearningCache:
    FUNCTION __init__():
        this.cache = new LRUCache(maxSize: 100)
        this.preloadCommonPatterns()
    
    FUNCTION get(key):
        IF this.cache.has(key):
            RETURN this.cache.get(key)
        
        learning = memoryAdapter.searchLearning(key)
        this.cache.set(key, learning)
        RETURN learning
```

### Performance Metrics
- Learning lookup: <50ms (cached), <200ms (uncached)
- Bonus detection: <20ms per action
- Error processing: <100ms including storage
- Retrospective generation: <500ms

## Testing Strategy

### Unit Tests
- Error forgiveness flow
- Bonus detection accuracy
- Pattern extraction correctness
- Memory adapter fallback

### Integration Tests
- Full error -> learning -> bonus cycle
- Cross-role learning sharing
- Retrospective trigger conditions
- Performance benchmarks

### Manual Test Scenarios
1. First error creates learning (no penalty)
2. Second identical error applies double penalty
3. Explicit learning reference grants +0.5P/Q
4. Implicit learning application detected
5. Retrospectives generate new learnings
6. Pattern evolution improves over time

## Edge Cases

### Concurrent Errors
Multiple roles encountering same error type simultaneously:
- First to process gets forgiveness
- Others check for existing learning
- Race condition handled by timestamp

### Error Evolution
Error types that change slightly over time:
- Fuzzy matching for error similarity
- Pattern evolution captures variations
- Manual review for ambiguous cases

### Cross-Role Learning
Learning from one role applied by another:
- Universal learning pool
- Role-specific adaptations
- Confidence scoring for applicability

### Learning Conflicts
Contradictory learnings:
- Timestamp-based precedence
- Effectiveness scoring
- Manual resolution for critical conflicts

## Success Metrics

1. **Error Reduction**: 40% fewer repeated errors after 30 days
2. **Learning Application**: 60% of actions reference previous learnings
3. **Team Improvement**: 25% increase in P/Q scores over 90 days
4. **Knowledge Retention**: 95% of learnings actively used within 7 days
5. **Pattern Evolution**: 80% of patterns improve with additional data

## Implementation Phases

### Phase 1: Core Learning System (TASK-002, TASK-003)
- Error forgiveness implementation
- Basic bonus detection
- Memory integration

### Phase 2: Pattern Management (Future)
- Advanced pattern extraction
- Pattern evolution algorithms
- Cross-domain pattern application

### Phase 3: Predictive Learning (Future)
- Proactive error prevention
- Suggested learnings before tasks
- AI-powered pattern recognition

## Summary

The Active Learning System creates a continuously improving virtual team by:
- Forgiving mistakes while capturing lessons
- Rewarding application of past learnings
- Sharing knowledge across all roles
- Automating insight generation
- Building on successes and failures

This architecture ensures the team gets smarter with every interaction, turning errors into opportunities and successes into repeatable patterns.