# /icc-load-memory

**Purpose:** Load a specific memory entity for PRB embedding

**Usage:** `/icc-load-memory [entity-id]`

**Parameters:**
- `entity-id`: The unique identifier of the memory entity

**Behavioral Pattern:** @behaviors/shared-patterns/memory-operations.md (LoadFromMemory)

## Execution Process

1. **Parse Entity ID**
   - Extract type, context, and timestamp
   - Validate ID format
   - Check cache first (5 min TTL)

2. **Construct File Path**
   - Base: memory/
   - Path: [topic]/[subtopic].md
   - Handle missing files gracefully

3. **Load Entity**
   - Read file content
   - Parse YAML frontmatter
   - Extract structured data

4. **Update Metadata**
   - Increment applicationCount
   - Update lastAccessed timestamp
   - Write changes back to file

5. **Return Entity**
   - Full content with metadata
   - Related entities list
   - Application suggestions

## Example

```bash
/icc-load-memory Learning-OAuth2Refresh-20250123-143000
```

**Output:**
```
✓ Loaded Learning-OAuth2Refresh-20250123-143000

Type: Learning
Created: 2025-01-23T14:30:00Z
Context: TASK-001
Relevance: 8/10
Applications: 3
Last Accessed: 2025-01-23T15:45:00Z

## Observations
- OAuth2 token refresh requires specific error handling
- 401 errors should trigger automatic token refresh
- Retry logic must include exponential backoff

## Prevention Steps
1. Check token expiry before API calls
2. Implement proper refresh token rotation
3. Add comprehensive error logging

## Related Entities
- Pattern-OAuth2Flow-20250122
- Knowledge-AuthBestPractices-20250120
```

## Cache Behavior
- Cached for 5 minutes after load
- Cache key includes entity ID
- Auto-refresh on file changes

## Integration
- Used during PRB generation to embed full content
- Manual load for review and exploration
- Batch loading for related memories
- Content embedded in PRBs, not referenced

---
*Command template for loading memory entities*