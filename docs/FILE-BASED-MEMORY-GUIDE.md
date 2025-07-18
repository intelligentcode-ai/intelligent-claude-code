# File-Based Memory Integration Guide

## Overview

The file-based memory system replaces MCP Memory with a markdown-based storage solution that provides 92% token reduction and complete transparency. All memory operations now use local files within the project structure.

## Quick Start

### Basic Operations

```pseudocode
// Store an entity
entity = {
    name: "Learning-auth-error-2025-07-18",
    entityType: "Learning",
    observations: [
        "Error: Authentication failed with OAuth",
        "Context: Missing refresh token handling",
        "Learning: Always implement token refresh",
        "Prevention: Add token expiry checks"
    ],
    tags: ["auth", "oauth", "learning"]
}
StoreInMemory(entity)

// Search for entities
results = SearchMemory("oauth")

// Load specific entity
learning = LoadFromMemory("Learning-auth-error-2025-07-18")
```

## Directory Structure

```
.claude/memory/
├── entities/           # All stored entities
│   ├── learning/      # Learning entities
│   ├── rolestate/     # Role state entities
│   └── pattern/       # Pattern entities
├── relations/         # Entity relationships
│   └── entity-relations.md
└── indexes/           # Fast lookup indexes
    ├── by-name.md     # Alphabetical index
    ├── by-type.md     # Type-based index
    └── by-date.md     # Date-based index
```

## Integration Patterns

### 1. Learning Team Automation

```pseudocode
// In learning-team-automation.md
FUNCTION processErrorForLearning(error):
    // Search for previous learning
    previousLearning = SearchMemory("Learning-" + error.type)
    
    IF previousLearning.length > 0:
        // Apply double penalty for repeated error
        penalty = calculateBasePenalty(error) * 2
        applyPenalty(penalty, "REPEATED_ERROR_AFTER_LEARNING")
    ELSE:
        // First occurrence - create learning
        learningEntity = {
            name: "Learning-" + error.type + "-" + getCurrentDate(),
            entityType: "Learning",
            observations: [
                "Error: " + error.description,
                "Context: " + error.context,
                "Learning: " + extractLesson(error),
                "Prevention: " + generatePrevention(error)
            ],
            tags: ["learning", error.type, error.role],
            relations: [
                {type: "learned-by", to: error.role},
                {type: "applies-to", to: error.taskType}
            ]
        }
        StoreInMemory(learningEntity)
    ]
```

### 2. Role State Management

```pseudocode
// In role-activation-system.md
FUNCTION saveRoleState(role):
    state = {
        name: "role-state-" + role.name,
        entityType: "RoleState",
        observations: [
            "Role: " + role.name,
            "Scores: P=" + role.scores.P + ", Q=" + role.scores.Q,
            "Active Tasks: " + role.activeTasks.join(", "),
            "Context: " + JSON.stringify(role.context),
            "Last Updated: " + getCurrentTimestamp()
        ],
        tags: ["role-state", role.name, "active"]
    }
    StoreInMemory(state)

FUNCTION loadRoleState(roleName):
    RETURN LoadFromMemory("role-state-" + roleName)
```

### 3. Pattern Storage

```pseudocode
// Success pattern storage
successPattern = {
    name: "Success-Pattern-OAuth-Implementation-2025-07-18",
    entityType: "SuccessPattern",
    observations: [
        "Pattern: Implement OAuth with refresh token",
        "Context: User authentication system",
        "Outcome: Seamless token renewal",
        "Instructions: Store refresh token securely, check expiry before API calls"
    ],
    tags: ["pattern", "success", "oauth", "authentication"]
}
StoreInMemory(successPattern)

// Error pattern storage
errorPattern = {
    name: "Error-Pattern-Memory-Overload-2025-07-18",
    entityType: "ErrorPattern",
    observations: [
        "Pattern: Loading entire memory context",
        "Issue: Excessive token usage (108k tokens)",
        "Root Cause: Using MCP Memory search",
        "Prevention: Use file-based memory with selective loading"
    ],
    tags: ["pattern", "error", "memory", "tokens"]
}
StoreInMemory(errorPattern)
```

### 4. Knowledge Retrieval

```pseudocode
// Before starting work
FUNCTION consultMemoryBeforeWork(task):
    relevantKnowledge = {
        learnings: [],
        patterns: [],
        similarWork: []
    }
    
    // Search for relevant learnings
    keywords = extractKeywords(task.description)
    FOR keyword IN keywords:
        learnings = SearchMemory(keyword + " entityType:Learning")
        relevantKnowledge.learnings.extend(learnings)
    
    // Search for success patterns
    patterns = SearchMemory(task.type + " entityType:SuccessPattern")
    relevantKnowledge.patterns.extend(patterns)
    
    // Search for similar completed work
    similarWork = SearchMemory(task.domain + " status:completed")
    relevantKnowledge.similarWork.extend(similarWork)
    
    RETURN relevantKnowledge
```

## Performance Optimization

### 1. Selective Loading

```pseudocode
// Load only what you need
FUNCTION loadRecentLearnings(domain, limit = 10):
    // Search for recent learnings in domain
    searchResults = SearchMemory(domain + " entityType:Learning")
    
    // Load only the most recent
    recentLearnings = []
    FOR i = 0; i < MIN(limit, searchResults.length); i++:
        entity = LoadFromMemory(searchResults[i].name)
        recentLearnings.append(entity)
    
    RETURN recentLearnings
```

### 2. Batch Operations

```pseudocode
// Store multiple entities efficiently
FUNCTION batchStoreResults(results):
    entities = []
    
    FOR result IN results:
        entity = {
            name: result.type + "-" + result.name + "-" + getCurrentDate(),
            entityType: result.type,
            observations: result.observations,
            tags: result.tags
        }
        entities.append(entity)
    
    // Store all at once
    batchStoreEntities(entities)
```

### 3. Session Caching

```pseudocode
// Cache frequently accessed entities
sessionCache = new Map()

FUNCTION getCachedEntity(name):
    IF sessionCache.has(name):
        RETURN sessionCache.get(name)
    
    entity = LoadFromMemory(name)
    IF entity:
        sessionCache.set(name, entity)
    
    RETURN entity
```

## Migration from MCP Memory

### Step 1: Export Existing Data
```bash
# Run migration utility
runFullMigration()
```

### Step 2: Update Code References
```pseudocode
// OLD: mcp__memory__create_entities([entity])
// NEW: StoreInMemory(entity)

// OLD: mcp__memory__search_nodes(query)
// NEW: SearchMemory(query)

// OLD: mcp__memory__open_nodes({names: [name]})
// NEW: LoadFromMemory(name)
```

### Step 3: Verify Migration
```bash
# Check file structure
ls -la .claude/memory/

# Test operations
SearchMemory("test")
```

## Token Savings

| Operation | MCP Memory | File-Based | Savings |
|-----------|------------|------------|---------|
| Search | 8,500 tokens | 570-700 tokens | 92% |
| Create | 330 tokens | 150-300 tokens | 45% |
| Load | 8,500 tokens | 275-480 tokens | 94% |
| Typical Session | 108,231 tokens | 7,975 tokens | 93% |

## Best Practices

1. **Use Descriptive Names**: Entity names should be self-documenting
2. **Tag Appropriately**: Use consistent tags for better search
3. **Store Relations**: Connect related entities for context
4. **Regular Cleanup**: Archive old entities to maintain performance
5. **Git Integration**: Commit memory changes for team visibility

## Troubleshooting

### Issue: Entity Not Found
```pseudocode
// Check if entity exists
IF NOT LoadFromMemory(entityName):
    // Search for similar names
    similar = SearchMemory(entityName.substring(0, 10))
    IF similar.length > 0:
        console.log("Did you mean: " + similar[0].name)
```

### Issue: Search Too Broad
```pseudocode
// Use more specific queries
// Instead of: SearchMemory("error")
// Use: SearchMemory("error entityType:Learning domain:auth")
```

### Issue: Performance Degradation
```pseudocode
// Clean up old entities
FUNCTION archiveOldEntities(daysOld = 90):
    cutoffDate = getCurrentDate() - (daysOld * 24 * 60 * 60 * 1000)
    oldEntities = SearchMemory("created:<" + cutoffDate)
    
    FOR entity IN oldEntities:
        archivePath = ".claude/memory/archive/" + entity.path
        moveFile(entity.path, archivePath)
```

## Summary

The file-based memory system provides:
- **92% token reduction** compared to MCP Memory
- **Complete transparency** with markdown files
- **Git integration** for version control
- **Selective loading** for performance
- **No external dependencies**

All memory operations now happen locally within your project, making the system faster, cheaper, and more reliable.

---
*Complete guide for file-based memory integration*