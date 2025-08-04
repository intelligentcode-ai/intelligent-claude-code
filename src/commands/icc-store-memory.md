# /icc-store-memory

**Purpose:** Store a new memory entity in the project's file-based memory system

**Usage:** `/icc-store-memory [type] [content]`

**Parameters:**
- `type`: Entity type (Learning, Pattern, or Knowledge)
- `content`: Content to store (can be multi-line)

**Behavioral Pattern:** @behaviors/shared-patterns/memory-operations.md (StoreInMemory)

## Execution Process

1. **Validate Input**
   - Check entity type is valid (Learning/Pattern/Knowledge)
   - Ensure content is provided
   - Extract context from current task/story

2. **Generate Entity ID**
   - Format: [Type]-[Context]-[YYYYMMDD-HHMMSS]
   - Example: Learning-AuthError-20250123-142530

3. **Create File Structure**
   - Get memory_path from config (default: memory/)
   - Directory: [memory_path]/entities/[Type]/[YYYY]/[MM]/
   - Filename: [Type]-[ID]-[YYYY-MM-DD].md
   - Create directories if they don't exist

4. **Format Content**
   - YAML frontmatter with metadata
   - Markdown body with observations
   - Related entities references

5. **Update Index**
   - Append to [memory_path]/index.md
   - Sort by creation date

## Example

```bash
/icc-store-memory Learning "OAuth2 token refresh requires specific error handling. 401 errors should trigger automatic refresh with exponential backoff."
```

**Output:**
```
✓ Stored Learning-OAuth2Refresh-20250123-143000
  Location: memory/entities/Learning/2025/01/
  Relevance: 8/10
  Tags: [oauth2, error-handling, authentication]
```

## Integration
- Auto-invoked during workflow retrospectives
- Manual invocation for ad-hoc storage
- Returns entity ID for reference

---
*Command template for storing memory entities*