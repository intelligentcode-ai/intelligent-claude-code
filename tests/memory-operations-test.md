# Memory Operations Test Plan

**Purpose:** Verify file-based memory operations work correctly

## Test Scenarios

### 1. StoreInMemory Tests

#### Test 1.1: Store Learning Entity
```bash
/icc-store-memory Learning "First error with OAuth2: Missing refresh token handling caused 401 loop"
```
**Expected:**
- Creates .claude/memory/entities/Learning/2025/01/
- Generates unique ID with timestamp
- Updates index.md
- Returns success with entity ID

#### Test 1.2: Store Pattern Entity
```bash
/icc-store-memory Pattern "Authentication flow: Check token → Refresh if expired → Retry request"
```
**Expected:**
- Creates appropriate directory structure
- Stores with Pattern type
- Adds to index with correct metadata

#### Test 1.3: Store Knowledge Entity
```bash
/icc-store-memory Knowledge "JWT tokens should use RS256 for production, HS256 for development"
```
**Expected:**
- Creates Knowledge entity
- Proper YAML frontmatter
- Correct file naming

### 2. SearchMemory Tests

#### Test 2.1: Keyword Search
```bash
/icc-search-memory "OAuth2 authentication"
```
**Expected:**
- Returns all entities matching keywords
- Sorted by relevance score
- Shows preview snippets

#### Test 2.2: Type Filter Search
```bash
/icc-search-memory "type:Learning error handling"
```
**Expected:**
- Only returns Learning entities
- Filters by error handling keywords

#### Test 2.3: Context Search
```bash
/icc-search-memory "context:TASK-001"
```
**Expected:**
- Returns entities created in TASK-001 context
- Shows all types

### 3. LoadFromMemory Tests

#### Test 3.1: Load Existing Entity
```bash
/icc-load-memory [entity-id-from-test-1.1]
```
**Expected:**
- Loads complete entity
- Updates applicationCount
- Updates lastAccessed
- Returns full content

#### Test 3.2: Load Non-Existent Entity
```bash
/icc-load-memory Learning-NonExistent-20250101-000000
```
**Expected:**
- Returns error gracefully
- Suggests search command
- No crash

### 4. Integration Tests

#### Test 4.1: Workflow Integration
```bash
# Execute a task that triggers memory operations
@Developer: Fix authentication bug TASK-001
```
**Expected:**
- Auto-searches memory at start
- Creates learning on completion
- Updates index automatically

#### Test 4.2: Cache Performance
```bash
# Rapid repeated searches
/icc-search-memory "authentication"
/icc-search-memory "authentication"  # Should hit cache
```
**Expected:**
- First search: Full execution
- Second search: Cache hit (faster)
- Cache expires after 2 minutes

### 5. Index Management Tests

#### Test 5.1: Index Integrity
```bash
/icc-memory-status
```
**Expected:**
- Shows correct entity counts
- No orphaned files
- Index matches file system

#### Test 5.2: Index Rebuild
```bash
# Manually corrupt index then rebuild
echo "" > .claude/memory/index.md
/icc-memory-reindex  # Future command
```
**Expected:**
- Detects corruption
- Rebuilds from files
- Restores full index

## Validation Checklist

- [ ] Directory structure created correctly
- [ ] Entity IDs are unique and formatted properly
- [ ] YAML frontmatter is valid
- [ ] Index updates on every operation
- [ ] Search returns relevant results
- [ ] Load updates metadata correctly
- [ ] Cache improves performance
- [ ] No file system errors
- [ ] Graceful error handling
- [ ] Integration with workflows

## Performance Metrics

- Store operation: < 100ms
- Search operation: < 200ms (< 50ms cached)
- Load operation: < 50ms (< 10ms cached)
- Index update: < 50ms

---
*Test plan for memory operations validation*