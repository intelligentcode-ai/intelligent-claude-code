# Memory Operations

**MANDATORY:** Use version-controlled memory. Auto-correct violations.

## Structure
**Base:** memory/ (version controlled)
**Organization:** memory/[topic]/[subtopic].md
**Format:** Topic files with dated entries (newest first)

## Entry Format
```markdown
## 2025-01-23: OAuth2 Token Refresh
**Context:** TASK-001
**Problem:** Tokens expiring without refresh
**Solution:** Auto-refresh on 401 with exponential backoff
**Code:** [example if applicable]
---
```

## Operations

### StoreInMemory Pattern
1. Determine topic/subtopic path
2. Add entry at TOP of file (newest first for precedence)
3. Auto-prune if >10 entries or >5KB
4. Archive old entries to memory/archive/[topic]/[year].md
5. Update memory/index.md

### SearchMemory Pattern
1. Parse query for keywords/context
2. Check index for quick filtering
3. Search within topic files
4. Score by: keyword match + recency + context match
5. Return top matches for PRB embedding

### LoadFromMemory Pattern
1. Read topic file from memory/[topic]/
2. Parse markdown entries
3. Update access stats
4. Cache 5 min TTL

## Pruning
**Threshold:** 10 entries or 5KB
**Action:** Archive to memory/archive/[topic]/[year].md
**Keep:** Most recent 5-10 entries

## PRB Integration
- Embed only 2-3 most relevant entries (max 1000 tokens)
- Selection: topic match + recency + brevity
- No runtime lookups needed

## Index Format
```markdown
# Memory Index
## Topics
### Authentication
- `oauth2-patterns.md` - OAuth2 implementations
- `jwt-handling.md` - JWT patterns

### Error Handling
- `api-errors.md` - API error patterns
```

---
*Optimized: 234→60 lines*