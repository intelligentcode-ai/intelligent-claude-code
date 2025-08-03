# Shared Memory Operations Patterns

**MANDATORY:** MUST use file-based memory operations. Auto-correct violations.

**PURPOSE:** File-based memory storage, search, and retrieval patterns for the project

## Core Memory Patterns

### Memory Structure
**Base Directory:** .claude/memory/ (within project root - **PROJECT SCOPE ONLY**)
**Entity Types:** Learning, Pattern, Knowledge
**Organization:** .claude/memory/entities/[EntityType]/[YYYY]/[MM]/
**File Format:** [EntityType]-[ID]-[YYYY-MM-DD].md

**Scope Validation:**
- **Project Memory**: All memory operations within .claude/memory/ (project scope)
- **Installation Memory**: System templates in ~/.claude/ (installation scope)
- **Boundary Enforcement**: Never write to ~/.claude/ during execution

### Entity Structure
**Common Fields:**
- ID: Unique identifier (format: [Type]-[Context]-[Timestamp])
- Type: Learning, Pattern, or Knowledge
- Creation: ISO timestamp
- Context: Task/Story/Bug reference
- Observations: Array of insights
- Relevance: Score 0-10
- ApplicationCount: Times referenced
- LastAccessed: ISO timestamp

## Memory Operations

### StoreInMemory Pattern
**Process:**
1. Determine entity type (Learning/Pattern/Knowledge)
2. Generate unique ID: [Type]-[Context]-[YYYYMMDD-HHMMSS]
3. Create directory path: .claude/memory/entities/[Type]/[YYYY]/[MM]/
4. Format content as markdown with YAML frontmatter
5. Write to file: [Type]-[ID]-[YYYY-MM-DD].md
6. Update index file: .claude/memory/index.md

**File Structure:**
```markdown
---
id: Learning-AuthError-20250123-142530
type: Learning
created: 2025-01-23T14:25:30Z
context: TASK-001
relevance: 8
applicationCount: 0
lastAccessed: 2025-01-23T14:25:30Z
tags: [authentication, error-handling, oauth2]
---

# Learning: Authentication Error Handling

## Observations
- OAuth2 token refresh requires specific error code handling
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

### SearchMemory Pattern
**Process:**
1. Parse search query for keywords and context
2. Check index file for quick filtering
3. Search in relevant time periods (recent first)
4. Apply relevance scoring based on:
   - Keyword matches in content
   - Context similarity
   - Recency (exponential decay λ=0.1)
   - Application count
5. Return sorted results (max 10)

**Search Strategies:**
- **By Type:** Filter .claude/memory/entities/[Type]/
- **By Date:** Navigate year/month directories
- **By Context:** Match TASK/STORY/BUG references
- **By Tags:** Search YAML frontmatter tags
- **Full Text:** Grep through content sections

### LoadFromMemory Pattern
**Process:**
1. Construct file path from entity ID
2. Read file from .claude/memory/entities/
3. Parse YAML frontmatter
4. Extract structured content
5. Update lastAccessed timestamp
6. Increment applicationCount
7. Return entity object

**Load Optimization:**
- Cache recently accessed entities (5 min TTL)
- Batch load related entities
- Lazy load observations for listings

## Index Management

### Index Structure
**Location:** .claude/memory/index.md
**Format:** Markdown table with key fields
**Updates:** Real-time on store/delete operations

**Index Format:**
```markdown
# Memory Index

| ID | Type | Created | Context | Tags | Relevance |
|----|------|---------|---------|------|-----------|
| Learning-AuthError-20250123-142530 | Learning | 2025-01-23 | TASK-001 | auth,error | 8 |
| Pattern-OAuth2Flow-20250122-093000 | Pattern | 2025-01-22 | STORY-045 | oauth2,flow | 9 |
```

## Memory Lifecycle

### Creation
**Triggers:** Error occurrence, pattern recognition, knowledge capture
**Validation:** Check for duplicates before storing
**Indexing:** Update index immediately after store

### Access
**Read Path:** Index lookup → File load → Cache update
**Write Path:** Generate ID → Create file → Update index
**Search Path:** Query parse → Index filter → File search → Rank results

### Maintenance
**Aging:** Apply exponential decay to relevance scores
**Cleanup:** Archive entities with relevance < 3 after 90 days
**Compression:** Monthly archives for inactive entities

## Integration Patterns

### With Workflows
**Outer Workflow:** Memory search in step 1, storage in step 7
**Inner Workflow:** Memory search in step 1, storage in step 8
**Auto-trigger:** On retrospective phases

### With Learning System
**Error Detection:** Auto-store as Learning entity
**Pattern Recognition:** Store as Pattern entity
**Knowledge Capture:** Store as Knowledge entity

### With Scoring System
**Memory Usage:** +0.5P/Q for applying stored memory
**Memory Creation:** +0.3P for valuable storage
**Pattern Breaking:** +1.0P/Q for novel solutions

## Performance Optimization

### Caching Strategy
**Hot Cache:** Last 10 accessed entities (5 min TTL)
**Index Cache:** Full index in memory (15 min TTL)
**Search Cache:** Recent search results (2 min TTL)

### File Organization
**Monthly Directories:** Limit directory size
**Year Archival:** Compress previous years
**Quick Access:** Current month in hot path

## Commands

### Store Memory
`/icc-store-memory [type] [content]` - Store new memory entity

### Search Memory
`/icc-search-memory [query]` - Search memory entities

### Load Memory
`/icc-load-memory [id]` - Load specific memory entity

### Memory Status
`/icc-memory-status` - Show memory statistics and health

---
*File-based memory operation patterns for intelligent-claude-code system*