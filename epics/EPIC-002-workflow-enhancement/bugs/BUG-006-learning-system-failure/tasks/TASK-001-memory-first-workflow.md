# TASK-001: Implement Memory-First Workflow

**Status:** IN PROGRESS  
**Assigned to:** @AI-Engineer  
**Bug:** BUG-006 Learning System Failure  
**Priority:** P0 CRITICAL

## Critical Issue Analysis

The user identified a fundamental flaw: **The learning system only stores completions but never recalls information before starting tasks.** This makes it useless for actual learning.

## Current Broken Pattern
```pseudocode
// BROKEN - No memory consultation
FUNCTION executeTask(task):
    executeWork(task)
    storeCompletion(task)  // Only stores, never retrieves
```

## Required Memory-First Pattern
```pseudocode
// FIXED - Memory consultation mandatory
FUNCTION executeTask(task):
    // MANDATORY: Consult memory BEFORE starting work
    relevantLearnings = searchMemory(task)
    applyLearnings(relevantLearnings, task)
    
    // Execute work with knowledge
    executeWork(task)
    
    // Store new learnings
    storeNewLearnings(task)
```

## Implementation Strategy

### 1. Memory-First Workflow Integration
Update lean-workflow-executor-v2.md to include mandatory memory consultation:

```pseudocode
FUNCTION executeWorkflow(assignment):
    // STEP 1: MANDATORY MEMORY CONSULTATION
    relevantKnowledge = consultMemoryForTask(assignment)
    
    // STEP 2: Apply retrieved knowledge
    applyKnowledgeToWork(relevantKnowledge, assignment)
    
    // STEP 3: Execute with knowledge
    executeTaskWithKnowledge(assignment)
    
    // STEP 4: Capture new learnings
    captureNewLearnings(assignment)
```

### 2. Memory Consultation Functions
```pseudocode
FUNCTION consultMemoryForTask(task):
    // Search for relevant learnings
    taskKeywords = extractKeywords(task)
    relevantLearnings = []
    
    FOR keyword IN taskKeywords:
        results = mcp__memory__search_nodes(keyword)
        relevantLearnings.extend(results)
    
    // Search for similar tasks
    similarTasks = searchSimilarTasks(task.type, task.domain)
    
    // Search for error patterns
    errorPatterns = searchErrorPatterns(task.type)
    
    RETURN {
        learnings: relevantLearnings,
        similarTasks: similarTasks,
        errorPatterns: errorPatterns
    }
```

### 3. Knowledge Application
```pseudocode
FUNCTION applyKnowledgeToWork(knowledge, task):
    // Apply lessons learned
    FOR learning IN knowledge.learnings:
        applyLearningToTask(learning, task)
    
    // Apply patterns from similar tasks
    FOR pattern IN knowledge.similarTasks:
        applyPatternToTask(pattern, task)
    
    // Avoid known error patterns
    FOR errorPattern IN knowledge.errorPatterns:
        avoidErrorPattern(errorPattern, task)
```

## User Information Learning

The user provided critical information that must be captured:

```yaml
Learning Entity:
  name: "Learning-System-Failure-2025-07-16"
  type: "CriticalBug"
  observations:
    - "Learning system only stores completions, doesn't recall before tasks"
    - "Must consult memory before starting any task"
    - "Should learn from information provided during conversations"
    - "Current system is append-only with no recall mechanism"
  prevention:
    - "Always call mcp__memory__search_nodes() before starting work"
    - "Capture user corrections and information as learnings"
    - "Apply retrieved learnings to current work"
```

## Implementation Steps

1. **Update lean-workflow-executor-v2.md** with memory-first pattern
2. **Create memory consultation functions** 
3. **Integrate with task execution** 
4. **Test with this bug** to ensure it works
5. **Store user's critical information** as learning

## Validation Criteria

- [ ] Memory consultation happens before EVERY task
- [ ] User information captured as learnings
- [ ] Learnings applied to current work
- [ ] System demonstrates actual learning through behavior changes

**IMPLEMENTING MEMORY-FIRST WORKFLOW TO FIX CRITICAL LEARNING FAILURE**