# Memory Init Command  

**PURPOSE:** Initialize file-based memory system directory structure and configuration files to replace MCP Memory functionality.

## Behavior Pattern

When user executes `/icc-memory-init`, create complete file-based memory system structure with default configuration, indexes, and validation.

## Core Operations

### Initialization Process
1. **Detect Environment**: Check current system and memory requirements
2. **Create Structure**: Build complete directory hierarchy
3. **Initialize Indexes**: Create empty search indexes with proper structure
4. **Setup Configuration**: Install default memory settings and cleanup rules
5. **Validate System**: Test file operations and permissions
6. **Migration Check**: Detect existing MCP Memory usage patterns

### Directory Structure Creation

**Primary Structure:**
```
~/.claude/memory/
├── entities/                     # Core entity storage
│   ├── Learning/                # Learning entities by date
│   │   ├── 2025/01/            # Year/month organization
│   │   └── index.json          # Fast lookup index
│   ├── Pattern/                # Reusable patterns
│   │   ├── success/            # Success patterns
│   │   ├── error/              # Error patterns  
│   │   └── index.json
│   ├── Project/                # Project context entities
│   │   ├── current/            # Current project state
│   │   └── index.json
│   └── Knowledge/              # General knowledge
│       ├── by-domain/          # Domain-specific knowledge
│       └── index.json
├── relationships/               # Entity relationships
│   ├── learning-to-pattern.json
│   ├── project-to-learning.json
│   └── knowledge-links.json
├── indexes/                    # Search indexes
│   ├── content-index.json      # Full-text search index
│   ├── tag-index.json          # Tag-based index
│   └── date-index.json         # Chronological index
└── config/                     # Memory system config
    ├── settings.json           # Memory settings
    └── cleanup-rules.json      # Automatic cleanup rules
```

### Default Configuration Files

**Memory Settings (config/settings.json):**
```json
{
  "version": "1.0.0",
  "max_entities_per_type": 1000,
  "auto_cleanup_days": 90,
  "index_rebuild_interval": "weekly",
  "backup_retention_days": 30,
  "search_result_limit": 20,
  "relevance_threshold": 0.3,
  "auto_relationship_detection": true,
  "storage_limits": {
    "max_storage_mb": 500,
    "warning_threshold_mb": 400,
    "cleanup_trigger_mb": 450
  },
  "performance": {
    "index_cache_size": 50,
    "entity_cache_size": 100,
    "batch_operation_size": 25
  }
}
```

**Cleanup Rules (config/cleanup-rules.json):**
```json
{
  "version": "1.0.0",
  "rules": {
    "low_relevance_threshold": 0.2,
    "unused_entity_days": 45,
    "duplicate_merge_threshold": 0.85,
    "archive_after_days": 180,
    "force_cleanup_days": 365
  },
  "preservation": {
    "always_preserve_types": ["Project"],
    "high_value_tags": ["critical", "security", "architecture"],
    "min_preserve_per_type": 10
  },
  "automation": {
    "auto_cleanup_enabled": true,
    "cleanup_schedule": "weekly",
    "confirm_before_delete": true,
    "backup_before_cleanup": true
  }
}
```

### Index Initialization

**Content Index (indexes/content-index.json):**
```json
{
  "version": "1.0.0",
  "created_at": "2025-01-20T10:30:00Z",
  "last_updated": "2025-01-20T10:30:00Z",
  "entity_count": 0,
  "index": {
    "terms": {},
    "entities": {},
    "statistics": {
      "total_terms": 0,
      "avg_entity_length": 0,
      "most_common_terms": []
    }
  }
}
```

**Tag Index (indexes/tag-index.json):**
```json
{
  "version": "1.0.0",
  "created_at": "2025-01-20T10:30:00Z",
  "last_updated": "2025-01-20T10:30:00Z",
  "tag_count": 0,
  "index": {
    "tags": {},
    "entity_tags": {},
    "statistics": {
      "most_used_tags": [],
      "tag_frequency": {},
      "entities_per_tag": {}
    }
  }
}
```

**Date Index (indexes/date-index.json):**
```json
{
  "version": "1.0.0",
  "created_at": "2025-01-20T10:30:00Z",
  "last_updated": "2025-01-20T10:30:00Z",
  "date_range": {
    "earliest": null,
    "latest": null
  },
  "index": {
    "by_year": {},
    "by_month": {},
    "by_day": {},
    "statistics": {
      "entities_per_month": {},
      "creation_trends": []
    }
  }
}
```

### Relationship File Initialization

**Learning-to-Pattern (relationships/learning-to-pattern.json):**
```json
{
  "version": "1.0.0",
  "created_at": "2025-01-20T10:30:00Z",
  "relationship_type": "learning-to-pattern",
  "relationships": {},
  "statistics": {
    "total_relationships": 0,
    "most_connected_learnings": [],
    "pattern_reference_count": {}
  }
}
```

### Validation and Testing

**System Validation:**
```
1. Check directory creation permissions
2. Verify file write/read operations
3. Test index file structure
4. Validate JSON parsing
5. Check available disk space
6. Test concurrent access handling
```

**Permission Setup:**
```
1. Set appropriate directory permissions (755)
2. Set file permissions for security (644)
3. Ensure user ownership of all files
4. Create backup directory with proper access
5. Test file locking mechanisms
```

**Integration Testing:**
```
1. Test entity storage and retrieval
2. Verify search index functionality
3. Check relationship detection
4. Validate cleanup procedures
5. Test backup and restore operations
```

## Migration Handling

### MCP Memory Detection
```
1. Scan for existing mcp__memory__ function calls
2. Check for MCP Memory configuration files
3. Identify entity structures and relationships
4. Assess migration complexity and requirements
5. Generate migration plan and timeline
```

### Legacy Support
```
1. Maintain compatibility during transition
2. Provide fallback mechanisms
3. Create migration utilities
4. Preserve existing data integrity
5. Ensure gradual transition capability
```

## Error Handling

**Directory Creation Failures:**
- Permission denied → Try with elevated permissions or alternative location
- Disk space insufficient → Clean temporary files and retry
- Path conflicts → Use alternative base directory
- File system errors → Fall back to temporary directory

**Configuration Failures:**
- JSON parsing errors → Use default configuration and log error
- Invalid settings → Apply validation and use safe defaults
- Missing dependencies → Create minimal working configuration
- Version conflicts → Upgrade configuration format automatically

**Index Initialization Failures:**
- Index file corruption → Recreate from scratch with empty state
- Write permission errors → Fall back to read-only mode with warnings
- Concurrent access issues → Use file locking and retry logic
- Storage limit exceeded → Trigger immediate cleanup

## Performance Considerations

**Lazy Initialization:**
```
1. Create directories only when needed
2. Initialize indexes on first use
3. Load configuration on demand
4. Cache frequently accessed settings
```

**Scalability Preparation:**
```
1. Design for growth with partitioned storage
2. Prepare index sharding for large datasets
3. Implement compression for old entities
4. Plan for distributed storage if needed
```

**Resource Management:**
```
1. Limit memory usage during initialization
2. Use streaming for large file operations
3. Implement background processing where possible
4. Monitor and report resource usage
```

## Integration Points

**System Integration:**
- Called by installation scripts during setup
- Triggered by first memory operation if not initialized
- Integrated with system health checks
- Supports complete system reset and reinstallation

**Command Integration:**
- Prerequisites for all other memory commands
- Validates system before allowing operations
- Provides diagnostic information for troubleshooting
- Enables memory system status reporting

**Backup Integration:**
- Creates backup directory structure
- Initializes backup scheduling
- Sets up rotation policies
- Enables disaster recovery procedures

## Validation Checks

**Pre-Initialization:**
```
1. Check if memory system already exists
2. Verify system requirements and dependencies
3. Assess available disk space
4. Check user permissions
5. Validate target directory accessibility
```

**Post-Initialization:**
```
1. Verify all directories created successfully
2. Test file operations in each directory
3. Validate configuration file structure
4. Check index file integrity
5. Test basic search and storage operations
```

**Health Checks:**
```
1. Regular validation of directory structure
2. Index integrity checks
3. Configuration validation
4. Performance monitoring
5. Error rate tracking
```

## Examples

### Standard Initialization
**Command:** `/icc-memory-init`
**Behavior:** Create complete memory system structure with default settings and validate all operations

### Force Reinitialize
**Command:** `/icc-memory-init --force`
**Behavior:** Remove existing memory system and create fresh installation with updated structure

### Migration Mode
**Command:** `/icc-memory-init --migrate`
**Behavior:** Initialize file-based system while preserving and migrating existing MCP Memory data

### Minimal Installation
**Command:** `/icc-memory-init --minimal`
**Behavior:** Create basic structure with minimal configuration for resource-constrained environments

---
**MEMORY INIT:** Complete file-based setup • Configuration management • Validation • Migration support