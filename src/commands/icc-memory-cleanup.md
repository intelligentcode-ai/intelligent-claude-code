# Memory Cleanup

Maintain and optimize the file-based memory system using $ARGUMENTS for cleanup options.

## Behavior
Perform maintenance operations on the file-based memory system including
cleanup, optimization, archival, and index rebuilding.

## Arguments
**Format:** "[--dry-run] [--aggressive] [--rebuild-indexes] [--archive-old]"
**Example:** "--dry-run --aggressive" (preview aggressive cleanup without executing)

## Core Actions
1. Parse cleanup options from $ARGUMENTS
2. Analyze memory usage and entity statistics
3. Identify candidates for cleanup/archival
4. Perform cleanup operations based on configuration
5. Rebuild search indexes if needed
6. Report cleanup results and space savings

## Cleanup Operations

### Low Relevance Cleanup
- Identify entities with relevance score < 0.2
- Check if entities haven't been accessed in 45+ days
- Archive to compressed storage with notification
- Update indexes to remove archived entities

### Duplicate Detection
- Compare entity content using similarity algorithms
- Merge entities with >85% content similarity
- Preserve relationships and update references
- Consolidate observations and increase relevance scores

### Age-Based Archival
- Archive entities older than 180 days (configurable)
- Compress archived entities to save space
- Maintain searchable index of archived content
- Keep high-relevance entities regardless of age

### Storage Optimization
- Compress old entity files to reduce disk usage
- Remove orphaned relationship entries
- Consolidate fragmented index files
- Monitor total storage against configured limits

## Index Maintenance

### Rebuild Operations
**Content Index**: Rebuild full-text search capabilities
**Tag Index**: Refresh tag-based search optimization
**Date Index**: Update chronological organization
**Usage Index**: Refresh access frequency tracking

### Optimization Steps
1. Backup existing indexes before rebuild
2. Scan all entity files for content updates
3. Rebuild search structures with current data
4. Validate index integrity and performance
5. Update index metadata and statistics

## Configuration Integration
Load cleanup rules from ~/.claude/memory/config/cleanup-rules.json:
```json
{
  "low_relevance_threshold": 0.2,
  "unused_entity_days": 45,
  "duplicate_merge_threshold": 0.85,
  "archive_after_days": 180,
  "max_storage_mb": 500,
  "aggressive_cleanup": false
}
```

## Cleanup Strategies

### Conservative (Default)
- Archive only very low relevance entities
- Minimal duplicate merging
- Preserve recent content regardless of relevance
- Gentle storage optimization

### Aggressive (--aggressive flag)
- More aggressive relevance thresholds
- Active duplicate detection and merging
- Shorter retention periods for unused content
- Comprehensive storage optimization

## Reporting

### Cleanup Summary
```
🧹 Memory Cleanup Complete
📊 Entities processed: 247
🗑️ Entities archived: 12
🔗 Duplicates merged: 3
💾 Space saved: 15.3 MB
⚡ Index rebuild: Complete
```

### Statistics
- Before/after entity counts by type
- Storage usage before/after cleanup
- Index performance improvements
- Relationship integrity validation results

## Safety Features
- **Dry Run Mode**: Preview cleanup without execution
- **Backup Creation**: Automatic backups before major changes
- **Rollback Support**: Ability to restore from backups
- **Selective Cleanup**: Target specific entity types or date ranges

## Error Handling
- **Permission issues**: Guide for directory access problems
- **Corruption detection**: Validate entity structure before cleanup
- **Backup failures**: Ensure backup success before proceeding
- **Index errors**: Rebuild indexes if corruption detected

## Integration
- Called periodically by autonomous maintenance systems
- Used by icc-system-status.md for memory health monitoring
- Referenced by memory initialization for default rule setup
- Supports memory search optimization through index maintenance