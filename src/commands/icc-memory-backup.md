# Memory Backup Command

**PURPOSE:** Create backup of file-based memory system for data preservation and disaster recovery

## Behavior Pattern

When user executes `/icc-memory-backup [backup_name]`, create comprehensive backup of all memory system data including entities, indexes, relationships, and configuration.

## Core Operations

### Backup Process
1. **Validate System**: Ensure memory system is initialized and accessible
2. **Create Backup Directory**: Generate timestamped backup location
3. **Copy Data**: Backup all entities, indexes, relationships, and configuration
4. **Compress Archive**: Create compressed backup for efficient storage
5. **Verify Integrity**: Validate backup completeness and integrity
6. **Update Manifest**: Record backup metadata and restore information

### Backup Structure

**Backup Location:**
```
~/.claude/memory/backups/
├── backup-YYYYMMDD-HHMMSS/
│   ├── entities/                # Complete entity backup
│   │   ├── Learning/
│   │   ├── Pattern/
│   │   ├── Project/
│   │   └── Knowledge/
│   ├── relationships/           # Relationship mappings
│   ├── indexes/                # Search indexes
│   ├── config/                 # Configuration files
│   └── manifest.json           # Backup metadata
└── backup-YYYYMMDD-HHMMSS.tar.gz  # Compressed archive
```

**Backup Manifest (manifest.json):**
```json
{
  "backup_id": "backup-20250120-143022",
  "created_at": "2025-01-20T14:30:22Z",
  "backup_name": "pre-migration-backup",
  "system_version": "1.0.0",
  "total_entities": 150,
  "entities_by_type": {
    "Learning": 85,
    "Pattern": 42,
    "Project": 8,
    "Knowledge": 15
  },
  "total_size_mb": 12.5,
  "compressed_size_mb": 3.2,
  "integrity_hash": "sha256:abc123...",
  "backup_duration_ms": 2500,
  "files_backed_up": 247,
  "validation_passed": true
}
```

### Backup Types

**Full Backup (Default):**
- Complete copy of all entities and indexes
- All relationship mappings preserved
- Configuration and settings included
- Suitable for complete system restore

**Incremental Backup:**
- Only entities modified since last backup
- Requires previous full backup as base
- Faster backup process for large systems
- Space-efficient for frequent backups

**Configuration Backup:**
- Only backup configuration and settings
- Includes index structures but not entity data
- Useful for system migration setup
- Minimal storage requirements

### Compression and Optimization

**Data Compression:**
```
1. JSON entity files compressed with gzip
2. Directory structure preserved in tar format
3. Overall compression ratio typically 70-80%
4. Index files benefit most from compression
```

**Selective Backup:**
```
1. Option to exclude low-relevance entities (score < 0.3)
2. Option to exclude archived entities older than specified date
3. Option to backup only specific entity types
4. Custom filtering based on tags or creation date
```

### Validation and Integrity

**Pre-Backup Validation:**
```
1. Verify memory system is accessible
2. Check available disk space for backup
3. Validate entity file integrity
4. Ensure index consistency
```

**Post-Backup Validation:**
```
1. Verify all files copied successfully
2. Check compressed archive integrity
3. Validate entity count matches source
4. Test sample entity deserialization
```

**Integrity Checking:**
```
1. Generate SHA256 hash of backup contents
2. Store hash in manifest for verification
3. Enable future backup integrity validation
4. Detect corruption or tampering
```

## Error Handling

**Backup Failures:**
- Insufficient disk space → Clean old backups and retry
- File access errors → Check permissions and retry with elevated access
- Compression failures → Create uncompressed backup and warn user
- Partial backup corruption → Retry failed portions up to 3 times

**Validation Failures:**
- Entity count mismatch → Log differences and continue with warning
- Hash validation failure → Mark backup as potentially corrupt
- Index inconsistency → Rebuild indexes and retry backup
- Manifest creation failure → Create backup without manifest (degraded mode)

**Recovery Actions:**
- Failed backup → Keep partial backup with error log for debugging
- Space limitations → Offer to create incremental backup instead
- Permission issues → Provide detailed guidance for manual resolution
- System errors → Create diagnostic report with backup attempt details

## Performance Optimization

**Parallel Processing:**
```
1. Backup entity types in parallel threads
2. Compress large files during copy operation
3. Stream large directories to avoid memory limits
4. Background processing with progress reporting
```

**Memory Management:**
```
1. Process entities in batches to limit memory usage
2. Stream file operations for large entity collections
3. Release memory aggressively during backup process
4. Monitor system resources and adjust batch sizes
```

**Storage Efficiency:**
```
1. Deduplicate identical entity content
2. Use differential compression for incremental backups
3. Optimize JSON formatting for compression
4. Remove temporary files during backup process
```

## Backup Management

**Automatic Cleanup:**
```
1. Keep configurable number of recent backups (default: 10)
2. Remove backups older than retention period (default: 90 days)
3. Preserve weekly backups for longer retention
4. Maintain minimum free disk space threshold
```

**Backup Scheduling:**
```
1. Daily automatic backups for active systems
2. Pre-migration backups before major changes
3. Manual backups on-demand
4. Integration with system maintenance schedules
```

**Backup Verification:**
```
1. Regular integrity checks of stored backups
2. Test restore capabilities monthly
3. Validate backup consistency across multiple backups
4. Report backup health and recommendations
```

## Integration Points

**System Integration:**
- Triggered before major system updates
- Integrated with archival operations
- Called before memory system reset
- Supports disaster recovery procedures

**Command Integration:**
- Prerequisites for `/icc-memory-restore`
- Used by `/icc-memory-migrate` for data preservation
- Integrated with `/icc-memory-cleanup` for space management
- Supports `/icc-system-reset` with data preservation

**Automated Triggers:**
- Before system upgrades or migrations
- After significant learning accumulation
- Before experimental configuration changes
- As part of regular maintenance cycles

## Configuration Options

**Backup Settings:**
```json
{
  "backup_retention_days": 90,
  "max_backups_kept": 10,
  "compression_enabled": true,
  "compression_level": 6,
  "include_low_relevance": false,
  "min_relevance_score": 0.3,
  "incremental_backup_enabled": true,
  "automatic_cleanup": true,
  "parallel_threads": 4
}
```

**Storage Limits:**
```json
{
  "max_backup_size_mb": 100,
  "min_free_space_mb": 500,
  "backup_directory": "~/.claude/memory/backups/",
  "temp_directory": "/tmp/claude-memory-backup/"
}
```

## Examples

### Full System Backup
**Command:** `/icc-memory-backup system-migration-prep`
**Behavior:** Create complete backup of all memory data with compression and validation

### Incremental Backup
**Command:** `/icc-memory-backup --incremental daily-backup`
**Behavior:** Create backup of only changed entities since last full backup

### Configuration Backup
**Command:** `/icc-memory-backup --config-only pre-settings-change`
**Behavior:** Backup only configuration and index structure, exclude entity data

### Selective Backup
**Command:** `/icc-memory-backup --high-relevance-only important-patterns`
**Behavior:** Backup only entities with relevance score > 0.7 for critical pattern preservation

---
**MEMORY BACKUP:** Complete data preservation • Compressed archives • Integrity validation • Automated management