# Memory Restore Command

**PURPOSE:** Restore file-based memory system from backup for disaster recovery and data migration

## Behavior Pattern

When user executes `/icc-memory-restore [backup_id]`, restore complete memory system from specified backup, preserving all entities, indexes, relationships, and configuration.

## Core Operations

### Restore Process
1. **Validate Backup**: Verify backup integrity and compatibility
2. **Prepare System**: Backup current state if system exists
3. **Extract Archive**: Decompress and extract backup contents
4. **Restore Data**: Copy entities, indexes, relationships, and configuration
5. **Rebuild Indexes**: Regenerate search indexes from restored entities
6. **Validate Restoration**: Verify system integrity and functionality

### Backup Selection

**Available Backups Discovery:**
```
1. Scan ~/.claude/memory/backups/ for available backups
2. List backups with metadata (date, size, entity count)
3. Show backup names and descriptions
4. Validate backup integrity before listing
```

**Backup Information Display:**
```json
{
  "available_backups": [
    {
      "backup_id": "backup-20250120-143022",
      "name": "pre-migration-backup",
      "created_at": "2025-01-20T14:30:22Z",
      "total_entities": 150,
      "size_mb": 12.5,
      "integrity_status": "verified",
      "compatible": true
    },
    {
      "backup_id": "backup-20250119-090000",
      "name": "daily-backup",
      "created_at": "2025-01-19T09:00:00Z",
      "total_entities": 142,
      "size_mb": 11.8,
      "integrity_status": "verified",
      "compatible": true
    }
  ]
}
```

### Restore Types

**Complete Restore (Default):**
- Replace entire memory system with backup contents
- All existing data is overwritten
- Includes entities, indexes, relationships, and configuration
- Suitable for disaster recovery scenarios

**Selective Restore:**
- Restore only specific entity types or date ranges
- Merge with existing system data
- Preserve current configuration if desired
- Useful for recovering specific lost data

**Incremental Restore:**
- Restore from incremental backup on top of base backup
- Requires compatible base backup to exist
- Reconstructs system state at backup time
- Efficient for recent data recovery

**Migration Restore:**
- Restore backup created on different system
- Handle path differences and configuration updates
- Preserve compatibility across system versions
- Support for system migration scenarios

### Data Restoration Process

**Pre-Restore Safety:**
```
1. Create safety backup of current system state
2. Store current system configuration
3. Validate sufficient disk space for restoration
4. Check file system permissions
```

**Entity Restoration:**
```
1. Clear existing entity directories (if complete restore)
2. Extract entity files from backup archive
3. Restore directory structure with proper permissions
4. Validate entity file integrity during restoration
```

**Index Rebuilding:**
```
1. Clear existing search indexes
2. Scan all restored entity files
3. Rebuild content-index.json from entity observations
4. Rebuild tag-index.json from entity tags
5. Rebuild date-index.json from entity timestamps
6. Validate index completeness and consistency
```

**Relationship Restoration:**
```
1. Restore relationship mapping files
2. Validate all referenced entities exist
3. Rebuild broken relationships if needed
4. Update relationship statistics
```

### Validation and Verification

**Restoration Validation:**
```
1. Verify entity count matches backup manifest
2. Test sample entity file loading and parsing
3. Validate search index functionality
4. Check relationship mapping consistency
5. Test basic memory operations (search, store)
```

**System Health Check:**
```
1. Run comprehensive memory system diagnostics
2. Verify all configuration settings are valid
3. Test memory command functionality
4. Check file permissions and accessibility
5. Validate storage limits and cleanup rules
```

**Integrity Verification:**
```
1. Compare restored system hash with backup manifest
2. Validate entity content against backup checksums
3. Verify index consistency with entity data
4. Check for any corrupted or missing files
```

## Error Handling

**Backup Validation Failures:**
- Corrupted backup archive → Attempt repair or request alternative backup
- Missing backup files → Provide available backup options
- Incompatible backup version → Offer migration assistance
- Integrity check failure → Warn user and offer partial restore options

**Restoration Failures:**
- Insufficient disk space → Clean system and retry, or request partial restore
- Permission errors → Provide detailed resolution guidance
- File corruption during restore → Retry failed portions, restore from redundant data
- Index rebuild failure → Attempt manual index reconstruction

**System Recovery:**
- Partial restore failure → Restore safety backup and provide diagnostic report
- Complete system corruption → Guide user through manual recovery procedures
- Configuration conflicts → Merge configurations with user guidance
- Performance degradation → Rebuild indexes and optimize restored system

## Safety Features

**Automatic Safety Backup:**
```
1. Always backup current system before restore (unless disabled)
2. Safety backup stored in separate location
3. Quick rollback option if restore fails
4. Safety backup automatically cleaned after successful restore
```

**Confirmation Requirements:**
```
1. Require explicit confirmation for complete restore
2. Display impact summary before proceeding
3. Confirm data loss warnings for destructive operations
4. Provide option to abort at any stage
```

**Rollback Capability:**
```
1. Maintain rollback option during restore process
2. Enable quick reversion to pre-restore state
3. Preserve safety backups until user confirms success
4. Provide detailed rollback instructions
```

## Performance Optimization

**Parallel Processing:**
```
1. Restore entity types in parallel
2. Decompress and copy files simultaneously
3. Rebuild indexes in background during entity restore
4. Use multiple threads for large backup restoration
```

**Memory Management:**
```
1. Stream large files to avoid memory pressure
2. Process entities in batches for efficient memory usage
3. Release resources aggressively during restoration
4. Monitor system resources and adjust processing
```

**Storage Optimization:**
```
1. Use temporary space for decompression
2. Clean temporary files during restore process
3. Optimize file operations for sequential access
4. Minimize disk I/O through efficient buffering
```

## Recovery Scenarios

**Disaster Recovery:**
- Complete system loss → Full restore from most recent backup
- Corrupted memory system → Validate and restore from known good backup
- Hardware failure recovery → Migrate backup to new system
- Accidental deletion → Selective restore of missing entities

**Migration Support:**
- System upgrade → Restore compatible backup on new system
- Environment change → Restore backup with configuration updates
- Data consolidation → Merge multiple backups into single system
- Development to production → Restore curated backup subset

**Maintenance Recovery:**
- Failed system update → Rollback to pre-update backup
- Configuration errors → Restore working configuration
- Index corruption → Rebuild from entity backup
- Performance issues → Restore optimized system state

## Integration Points

**System Integration:**
- Called during disaster recovery procedures
- Integrated with system migration tools
- Supports development environment setup
- Enables testing with production data subsets

**Command Integration:**
- Works with `/icc-memory-backup` for complete backup/restore cycle
- Used by `/icc-memory-migrate` for system transitions
- Integrated with `/icc-system-reset` for clean system setup
- Supports `/icc-memory-verify` for post-restore validation

**Automated Integration:**
- Scheduled restore testing for backup validation
- Integration with system monitoring for failure detection
- Automatic rollback triggers for critical system failures
- Support for blue/green deployment scenarios

## Configuration Options

**Restore Settings:**
```json
{
  "auto_safety_backup": true,
  "require_confirmation": true,
  "parallel_threads": 4,
  "temp_directory": "/tmp/claude-memory-restore/",
  "verify_after_restore": true,
  "rebuild_indexes": true,
  "preserve_current_config": false,
  "cleanup_after_restore": true
}
```

**Safety Options:**
```json
{
  "safety_backup_location": "~/.claude/memory/safety/",
  "rollback_timeout_hours": 24,
  "confirmation_required_for_complete": true,
  "backup_validation_required": true,
  "integrity_check_level": "full"
}
```

## Examples

### Complete System Restore
**Command:** `/icc-memory-restore backup-20250120-143022`
**Behavior:** Full restoration of memory system from specified backup with safety backup and validation

### Selective Entity Restore
**Command:** `/icc-memory-restore --entities Learning,Pattern backup-20250119-090000`
**Behavior:** Restore only Learning and Pattern entities from backup, preserve other current data

### Migration Restore
**Command:** `/icc-memory-restore --migrate --update-config backup-20250118-120000`
**Behavior:** Restore backup on new system with configuration updates for environment differences

### List Available Backups
**Command:** `/icc-memory-restore --list`
**Behavior:** Display all available backups with metadata and integrity status

---
**MEMORY RESTORE:** Complete disaster recovery • Selective restoration • Safety backups • Integrity validation