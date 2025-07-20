# Shared Memory Patterns

**PURPOSE:** Common memory operations used across behavioral modules

## Core Memory Patterns

### Memory-First Pattern
**Principle:** Always check memory before taking action
**Commands:** 
- `/icc-memory-search [context]` - Search before work
- `/icc-memory-store [entity]` - Store after work
**Benefits:** Avoid repeated errors, apply learnings, build knowledge

### Entity Structure Pattern
```json
{
  "id": "[Type]-[descriptor]-[timestamp]",
  "type": "[EntityType]",
  "created_at": "[ISO timestamp]",
  "context": {},
  "observations": [],
  "tags": [],
  "relevance_score": 0.0-1.0
}
```

### Learning Storage Pattern
**First Error:** No penalty + Create learning entity
**Repeated Error:** 2x penalty + Reference existing learning
**Success Pattern:** Store as Pattern entity for reuse
**Naming:** Learning-[ErrorType]-[YYYY-MM-DD]

### Search Pattern
**Content Search:** `/icc-memory-search [query]`
**Tag Search:** `/icc-memory-search tag:[tagname]`
**Context Search:** `/icc-memory-search context:[project]`
**Related Search:** `/icc-memory-search related:[entity_id]`

### Storage Location Pattern
```
~/.claude/memory/
├── entities/[Type]/[Year]/[Month]/
├── relationships/
├── indexes/
└── config/
```

## Common Operations

### Store Learning
```
/icc-memory-store Learning {
  "type": "Learning",
  "context": { "error_type": "[type]", "task": "[task_id]" },
  "observations": ["what happened", "why it happened", "how to prevent"],
  "prevention": ["specific steps to avoid repeat"]
}
```

### Apply Learning
```
/icc-memory-search "error: [type]"
IF results found:
  Reference in action: "Based on previous learning..."
  Apply prevention measures
  Gain +0.5P/Q bonus
```

### Project Context Storage
```
/icc-memory-store ProjectContext {
  "type": "ProjectConfiguration",
  "project_path": "[path]",
  "observations": ["project type", "key patterns", "constraints"],
  "current_state": { "active_work": "[current]" }
}
```

## Integration Helpers

### checkMemoryFirst(action)
```
results = /icc-memory-search [action.context]
IF results.hasLearnings:
  applyLearnings(results)
  RETURN enhancedAction
RETURN action
```

### storeLearning(outcome)
```
IF outcome.isError AND NOT previouslyEncountered:
  /icc-memory-store Learning outcome.asLearning()
ELSE IF outcome.isSuccess:
  /icc-memory-store Pattern outcome.asPattern()
```

---
*Shared memory patterns for consistent knowledge management*