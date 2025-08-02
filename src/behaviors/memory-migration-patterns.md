# Memory Migration Patterns

**MANDATORY:** MUST follow migration patterns. Auto-correct violations.

**PURPOSE:** Guide AI agents through safe MCP-to-file memory migration

## Core Migration Principle

Every memory entity in MCP must be:
1. **Read** completely from MCP
2. **Validated** for integrity
3. **Transformed** to file format
4. **Written** to correct location
5. **Indexed** for discovery
6. **Verified** post-migration

## Migration Execution Pattern

### Phase 1: Discovery and Planning
**Process:**
1. List all entities in MCP memory via `mcp__memory__read_graph`
2. Group entities by type (Learning, Project, Team, etc.)
3. Calculate total entity count and size
4. Create migration batch plan (max 50 entities per batch)
5. Document migration scope in temporary tracking file

**Validation:** Ensure MCP connection active → Verify entity count > 0 → Check available disk space

### Phase 2: Entity Reading Pattern
**For Each Entity Type:**
```
1. Query entities by type using mcp__memory__search_nodes
2. For each entity:
   - Read full entity data via mcp__memory__open_nodes
   - Capture all observations
   - Record all relations
   - Note entity metadata (creation date, type, ID)
3. Store in temporary migration buffer
```

**Error Handling:** MCP timeout → Retry 3x with backoff → Skip entity if persistent failure → Log in migration report

### Phase 3: Transformation Pattern
**Entity to File Mapping:**
```
MCP Entity Structure → File-Based Structure
{
  name: "Learning-ErrorType-20250128"     → Filename: Learning-ErrorType-20250128.md
  entityType: "Learning"                  → Directory: ~/.claude/memory/entities/Learning/2025/01/
  observations: [...]                     → Content sections in markdown
  relations: [...]                        → Reference links in file
}
```

**Content Structure:**
```markdown
# [Entity Name]

**Type:** [Entity Type]
**Created:** [Creation Date]
**ID:** [Unique Identifier]

## Observations
- [Observation 1]
- [Observation 2]
...

## Relations
- **[Relation Type]** → [Target Entity]
...

## Metadata
- Application Count: [Number]
- Last Accessed: [Date]
- Relevance Score: [0-1]
```

### Phase 4: File Writing Pattern
**Directory Creation:**
1. Check base path exists: `~/.claude/memory/entities/`
2. Create type directory: `[EntityType]/`
3. Create year directory: `[YYYY]/`
4. Create month directory: `[MM]/`
5. Ensure proper permissions (755 for dirs, 644 for files)

**File Writing Process:**
1. Generate full file path from entity metadata
2. Check if file already exists (handle duplicates)
3. Write entity content in markdown format
4. Set appropriate file permissions
5. Verify file written successfully

**Duplicate Handling:** If file exists → Compare content → If different: append timestamp → If same: skip writing → Log decision

### Phase 5: Index Update Pattern
**Index Structure:**
```
~/.claude/memory/
├── index.json          # Master index
├── type-index/         # Per-type indices
│   ├── Learning.json
│   ├── Project.json
│   └── Team.json
└── entities/           # Entity storage
```

**Index Update Process:**
1. Read existing index.json (or create if missing)
2. Add/update entry for migrated entity:
   ```json
   {
     "id": "Learning-ErrorType-20250128",
     "type": "Learning",
     "path": "entities/Learning/2025/01/Learning-ErrorType-20250128.md",
     "created": "2025-01-28T15:00:00Z",
     "tags": ["error-handling", "validation"],
     "relevance": 0.8
   }
   ```
3. Update type-specific index
4. Sort indices by relevance and date
5. Write updated indices atomically

### Phase 6: Verification Pattern
**Post-Migration Validation:**
1. **File Verification:**
   - Check file exists at expected path
   - Verify file size > 0
   - Ensure readable permissions
   - Validate markdown structure

2. **Index Verification:**
   - Confirm entity in master index
   - Verify type index updated
   - Check path references valid
   - Ensure no orphaned entries

3. **Content Verification:**
   - Read migrated file
   - Compare observation count with MCP
   - Verify relations preserved
   - Check metadata completeness

**Success Criteria:** File exists AND indexed AND content matches MCP → Mark entity as migrated

## Batch Processing Pattern

### Batch Configuration
- **Size:** 50 entities per batch
- **Ordering:** By type, then by creation date
- **Parallelization:** NO (sequential only for safety)
- **Progress:** Track in `~/.claude/memory/migration-status.json`

### Batch Execution
```
For each batch:
1. Load batch entities from MCP
2. Transform all entities in batch
3. Write all files in batch
4. Update indices once for batch
5. Verify entire batch
6. Update migration progress
7. Commit progress (in case of interruption)
```

## Error Recovery Pattern

### Failure Types and Recovery
| Failure Type | Detection | Recovery Action |
|--------------|-----------|-----------------|
| MCP Timeout | Connection error | Retry 3x, skip if persistent |
| File Write Error | IO exception | Check permissions, retry |
| Index Corruption | Parse error | Rebuild from files |
| Duplicate Entity | File exists | Append timestamp suffix |
| Incomplete Migration | Progress < 100% | Resume from last batch |

### Progress Tracking
**Status File Structure:**
```json
{
  "started": "2025-01-28T15:00:00Z",
  "total_entities": 500,
  "migrated": 350,
  "failed": 5,
  "current_batch": 7,
  "last_entity": "Learning-ErrorType-20250128",
  "status": "in_progress"
}
```

## Migration Commands Pattern

### Command Sequence
1. `/memory-migration-start` - Initialize migration
2. `/memory-migration-status` - Check progress
3. `/memory-migration-resume` - Continue after interruption
4. `/memory-migration-verify` - Validate completion
5. `/memory-migration-rollback` - Undo migration (if needed)

### Safety Checks
- **Pre-Migration:** Backup MCP connection config
- **During Migration:** No MCP deletions until verified
- **Post-Migration:** Keep MCP data for 7 days
- **Rollback Ready:** Maintain migration log for reversal

## Integration with Memory Operations

### Memory Operations Compatibility
- Migration preserves all memory operation patterns
- File-based operations remain unchanged
- Search/retrieve/update patterns work identically
- Only the storage backend changes

### Dual-Mode Operation
**During Migration:**
- Read from MCP (authoritative source)
- Write to both MCP and files
- Verify consistency between systems
- Switch to file-only after validation

## Performance Patterns

### Optimization Guidelines
- Batch similar entities together
- Minimize index rewrites (batch updates)
- Use streaming for large observations
- Cache frequently accessed entities
- Compress old entities (>6 months)

### Resource Management
- Monitor disk usage during migration
- Limit memory buffer to 100MB
- Release MCP connections after batch
- Clean temporary files immediately

## Success Indicators

### Migration Complete When
1. All entities successfully migrated (or documented failures)
2. All indices updated and valid
3. Verification passes for 95%+ entities
4. Migration status shows "completed"
5. File-based operations fully functional

### Quality Metrics
- **Entity Fidelity:** 100% observation preservation
- **Relation Integrity:** All links maintained
- **Search Performance:** <100ms for most queries
- **Storage Efficiency:** <2x MCP storage size
- **Access Patterns:** No degradation vs MCP

---
*Memory migration behavioral patterns for intelligent-claude-code system*