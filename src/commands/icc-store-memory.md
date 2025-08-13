# /icc-store-memory

**Purpose:** Store a new memory entity in version-controlled memory

**Usage:** `/icc-store-memory [topic] [content]`

**Parameters:**
- `topic`: Topic/subtopic path (e.g., "authentication/oauth2" or "error-handling")
- `content`: Content to store (problem, solution, code examples)

**Behavioral Pattern:** @behaviors/shared-patterns/memory-operations.md (StoreInMemory)

## Execution Process

1. **Validate Input**
   - Parse topic path (e.g., "authentication/oauth2")
   - Ensure content is provided
   - Extract context from current PRB/task

2. **Determine File Path**
   - Topic file: memory/[topic]/[subtopic].md
   - Create topic directory if needed
   - Example: memory/authentication/oauth2-patterns.md

3. **Add Entry to Topic File**
   - Add new entry at TOP of file (newest first)
   - Format: ## [DATE]: [Title]
   - Include context, problem, solution
   - Version controlled (not gitignored)

4. **Format Entry**
   ```markdown
   ## YYYY-MM-DD: OAuth2 Token Refresh
   **Context:** PRB-001 / TASK-001
   
   ### Problem
   [Description of issue]
   
   ### Solution
   [How it was solved]
   
   ### Code Example
   ```language
   [Code if applicable]
   ```
   ```

5. **Auto-Prune if Needed**
   - Check file size (threshold: 10 entries or 5KB)
   - If exceeded: Archive old entries to memory/archive/[topic]/[year].md
   - Keep most recent 5-10 entries in main file
   - Add archive reference at bottom

6. **Update Index**
   - Add topic to memory/index.md if new
   - Update topic description if needed
   - Ready for version control

## Example

```bash
/icc-store-memory authentication/oauth2 "Problem: Tokens expiring without refresh. Solution: Implement automatic 401 detection with exponential backoff retry."
```

**Output:**
```
✓ Stored in memory/authentication/oauth2-patterns.md
  Entry: YYYY-MM-DD: Token Refresh Strategy
  Topic: Authentication / OAuth2
  Status: Ready to commit
```

## Integration
- Auto-invoked during PRB retrospectives
- Manual invocation for ad-hoc storage
- Returns entity ID for reference
- Memories embedded in future PRBs

---
*Command template for storing memory entities*