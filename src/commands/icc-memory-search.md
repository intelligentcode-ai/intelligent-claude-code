# Memory Search Command

**PURPOSE:** Search file-based memory system for relevant knowledge and patterns

## Behavior Pattern

When user executes `/icc-memory-search [query]`, perform comprehensive memory search using file-based storage system instead of MCP Memory.

## Core Operations

### Search Process
1. **Parse Query**: Extract search terms, filters, and context from `$ARGUMENTS`
2. **Multi-Index Search**: Search across content, tag, and date indexes simultaneously
3. **Load Candidates**: Retrieve entity files matching initial filters
4. **Score Results**: Calculate relevance scores based on query match and entity metadata
5. **Rank and Return**: Return top 20 results with context snippets

### Search Types

**Content Search Pattern:**
- Full-text search across entity observations and patterns
- Weight by entity type (Learning: 0.9, Pattern: 0.95, Project: 1.0)
- Boost recent entities (created within 30 days)
- Score based on term frequency and position

**Tag-Based Search Pattern:**
- Exact tag matching with fuzzy fallback
- Tag relevance scoring based on usage frequency
- Multi-tag queries use AND logic by default
- Support for OR queries with explicit syntax

**Context Search Pattern:**
- Search within specific project context
- Filter by entity type and creation date
- Include related entities via relationship mapping
- Prioritize entities from current project

### File Operations

**Index Loading:**
```
1. Load content-index.json for full-text search
2. Load tag-index.json for tag-based filtering  
3. Load date-index.json for temporal filtering
4. Cache indexes in memory for session
```

**Entity Retrieval:**
```
1. Read entity files from appropriate directories
2. Parse JSON content and validate structure
3. Extract relevance factors (age, usage, scores)
4. Build result objects with context snippets
```

**Result Scoring:**
```
1. Base score from term match quality (0.0-1.0)
2. Entity type weight (Learning: 0.9, Pattern: 0.95, Project: 1.0)
3. Recency boost (30 days: +0.2, 7 days: +0.3)
4. Usage frequency boost (application_count * 0.05)
5. Relevance threshold filter (minimum 0.3)
```

## Search Patterns

### Knowledge Retrieval Pattern
**Query Format:** "task validation patterns"
**Search Logic:**
- Search learning entities for validation-related content
- Find success patterns for task validation
- Load related project context
- Return actionable insights with implementation guidance

### Error Pattern Search
**Query Format:** "error: missing validation"  
**Search Logic:**
- Search learning entities for error patterns
- Find prevention strategies and solutions
- Load related patterns and fixes
- Return error handling guidance

### Project Context Search
**Query Format:** "project: intelligent-claude-code current state"
**Search Logic:**
- Load current project context entity
- Find recent learnings for this project
- Search for active work items and status
- Return comprehensive project state

## Response Format

### Search Results Structure
```json
{
  "query": "task validation patterns",
  "total_results": 15,
  "execution_time": "45ms",
  "results": [
    {
      "entity_id": "Learning-task-validation-20250120",
      "entity_type": "Learning", 
      "relevance_score": 0.94,
      "created_at": "2025-01-20T10:30:00Z",
      "context_snippet": "Task assignments require validation before execution...",
      "key_patterns": [
        "Always validate role assignments",
        "Use icc:validate-assignments() before execution"
      ],
      "tags": ["validation", "task-assignment", "error-prevention"],
      "application_count": 3
    }
  ],
  "related_entities": [
    "Pattern-role-assignment-validation-20250120"
  ],
  "suggestions": [
    "Search for 'role assignment validation' for more specific results",
    "Try 'validation command chains' for implementation patterns"
  ]
}
```

### No Results Handling
```json
{
  "query": "unknown topic",
  "total_results": 0,
  "execution_time": "12ms",
  "message": "No relevant entities found for query",
  "suggestions": [
    "Try broader search terms",
    "Check spelling and terminology",
    "Search for related concepts"
  ],
  "available_tags": ["validation", "role-assignment", "workflow", "learning"],
  "recent_entities": [
    "Learning-recent-topic-20250120"
  ]
}
```

## Error Handling

**File System Errors:**
- Missing memory directory → Create default structure
- Corrupted index files → Rebuild from entity files
- Permission issues → Fallback to read-only mode
- Disk space issues → Trigger cleanup and retry

**Search Errors:**
- Invalid query syntax → Return syntax guidance
- No matching entities → Provide search suggestions
- Timeout on large results → Return partial results with warning
- Index corruption → Rebuild and retry search

## Performance Optimization

**Index Caching:**
- Keep frequently used indexes in memory
- Lazy load entity files only when needed
- Cache search results for repeated queries
- Batch file operations for efficiency

**Search Optimization:**
- Use indexes for initial filtering
- Load only candidate entities for scoring
- Implement search result pagination
- Background index updates for new entities

## Integration Points

**Command Chain Integration:**
- Used by `icc:memory-first` pattern at start of workflows
- Called by `icc:load-context` for project state
- Integrated with `icc:store-learning` for pattern matching

**Behavior Integration:**
- Automatic search before task execution
- Pattern matching during error handling
- Context loading for role activation
- Knowledge application during planning

## Memory Directory Management

**Auto-Creation:**
```
1. Check if ~/.claude/memory/ exists
2. Create full directory structure if missing
3. Initialize default index files
4. Set appropriate permissions
```

**Index Management:**
```
1. Update content index when entities change
2. Rebuild tag index weekly
3. Maintain date index automatically
4. Validate index integrity on startup
```

**Storage Cleanup:**
```
1. Archive entities older than 180 days
2. Remove low-relevance entities (score < 0.2)
3. Consolidate duplicate entities
4. Maintain storage under 500MB limit
```

## Examples

### Learning Search
**Command:** `/icc-memory-search task validation errors`
**Behavior:** Search for learning entities about task validation errors, return prevention patterns and solutions

### Pattern Search  
**Command:** `/icc-memory-search success patterns role assignment`
**Behavior:** Find successful role assignment patterns, return implementation guidance and best practices

### Project Context Search
**Command:** `/icc-memory-search project current state active work`
**Behavior:** Load current project context, active work items, and recent progress updates

### Related Entity Search
**Command:** `/icc-memory-search related Learning-task-validation-20250120`
**Behavior:** Find entities related to specific learning, return pattern connections and context

---
**MEMORY SEARCH:** File-based storage • Multi-index search • Relevance scoring • Fast retrieval