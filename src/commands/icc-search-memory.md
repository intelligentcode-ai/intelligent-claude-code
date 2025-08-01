# /icc-search-memory

**Purpose:** Search the project's file-based memory system for relevant entities

**Usage:** `/icc-search-memory [query]`

**Parameters:**
- `query`: Search terms (keywords, context, tags, or entity types)

**Behavioral Pattern:** @behaviors/shared-patterns/memory-operations.md (SearchMemory)

## Execution Process

1. **Parse Query**
   - Extract keywords and phrases
   - Identify entity type filters
   - Detect context references (TASK-XXX, STORY-XXX)

2. **Search Strategy**
   - Check index for quick filtering
   - Search recent memories first (current month)
   - Apply relevance scoring

3. **Scoring Algorithm**
   - Keyword match: +3 points per match
   - Context match: +5 points
   - Recency: exponential decay (λ=0.1)
   - Application count: +1 per 5 uses
   - Tag match: +2 points

4. **Filter Results**
   - Sort by combined score
   - Return top 10 results
   - Include preview snippets

5. **Cache Results**
   - Store in search cache (2 min TTL)
   - Track search patterns

## Example

```bash
/icc-search-memory "oauth2 authentication error handling"
```

**Output:**
```
Found 3 relevant memories:

1. Learning-OAuth2Refresh-20250123-143000 (Score: 9.2)
   "OAuth2 token refresh requires specific error handling..."
   Tags: [oauth2, error-handling, authentication]
   
2. Pattern-AuthFlow-20250122-093000 (Score: 7.8)
   "Standard authentication flow with JWT tokens..."
   Tags: [authentication, jwt, patterns]
   
3. Knowledge-ErrorCodes-20250120-110000 (Score: 6.5)
   "Common HTTP error codes and handling strategies..."
   Tags: [error-handling, http, best-practices]
```

## Search Tips
- Use quotes for exact phrases: "token refresh"
- Filter by type: "type:Learning oauth"
- Search by context: "context:TASK-001"
- Tag search: "tag:authentication"

## Integration
- Auto-invoked at workflow start
- Manual search for exploration
- Results feed into task execution

---
*Command template for searching memory entities*