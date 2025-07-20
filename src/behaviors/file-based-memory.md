# File-Based Memory System

**Purpose:** Complete replacement for MCP Memory using file-based storage  
**Type:** Core Memory Component  
**Status:** ACTIVE

## Architecture Overview

**Storage Location:** `~/.claude/memory/` directory structure  
**Entity Storage:** JSON files organized by type and date  
**Relationship Storage:** Separate relationship mapping files  
**Index Management:** Auto-maintained index files for fast retrieval  
**Backup System:** Automatic versioning and cleanup  

## Directory Structure

```
~/.claude/memory/
├── entities/                    # Core entity storage
│   ├── Learning/               # Learning entities by date
│   │   ├── 2025/01/           # Year/month organization
│   │   │   ├── Learning-task-validation-20250120.json
│   │   │   └── Learning-error-handling-20250120.json
│   │   └── index.json         # Fast lookup index
│   ├── Project/               # Project context entities
│   │   ├── current/           # Current project state
│   │   └── index.json
│   ├── Pattern/               # Reusable patterns
│   │   ├── success/           # Success patterns
│   │   ├── error/             # Error patterns
│   │   └── index.json
│   └── Knowledge/             # General knowledge
│       ├── by-domain/         # Domain-specific knowledge
│       └── index.json
├── relationships/              # Entity relationships
│   ├── learning-to-pattern.json
│   ├── project-to-learning.json
│   └── knowledge-links.json
├── indexes/                   # Search indexes
│   ├── content-index.json     # Full-text search index
│   ├── tag-index.json         # Tag-based index
│   └── date-index.json        # Chronological index
└── config/                    # Memory system config
    ├── settings.json          # Memory settings
    └── cleanup-rules.json     # Automatic cleanup rules
```

## Entity Types

### Learning Entities
```json
{
  "id": "Learning-task-validation-20250120",
  "type": "Learning",
  "created_at": "2025-01-20T10:30:00Z",
  "context": {
    "task_id": "TASK-001",
    "role": "@AI-Engineer",
    "error_type": "validation_missing"
  },
  "observations": [
    "Task assignments require validation before execution",
    "Missing validation causes downstream errors",
    "PM + Architect approval prevents invalid assignments"
  ],
  "patterns": [
    "Always validate role assignments before task execution",
    "Use icc:validate-assignments() before role activation"
  ],
  "prevention": [
    "Add validation check to all task creation commands",
    "Block execution without proper role assignment"
  ],
  "tags": ["validation", "task-assignment", "error-prevention"],
  "relevance_score": 0.95,
  "application_count": 0
}
```

### Project Context Entities
```json
{
  "id": "Project-intelligent-claude-code-20250120",
  "type": "Project",
  "created_at": "2025-01-20T10:30:00Z",
  "project_name": "intelligent-claude-code",
  "context": {
    "system_type": "behavioral-framework",
    "architecture": "markdown-based",
    "primary_languages": ["markdown", "yaml"],
    "key_concepts": ["virtual-team", "role-switching", "workflow-automation"]
  },
  "observations": [
    "System focuses on behavioral patterns not executable code",
    "Uses @-notation for role switching",
    "Assignment files drive workflow execution"
  ],
  "current_state": {
    "active_epic": "EPIC-002",
    "active_bugs": ["BUG-076", "BUG-077"],
    "workflow_phase": "EXECUTE"
  },
  "learnings": [
    "Learning-behavioral-patterns-20250119",
    "Learning-role-validation-20250120"
  ],
  "tags": ["project-context", "active", "behavioral-system"],
  "relevance_score": 1.0
}
```

### Pattern Entities
```json
{
  "id": "Pattern-role-assignment-validation-20250120",
  "type": "Pattern",
  "created_at": "2025-01-20T10:30:00Z",
  "pattern_type": "success",
  "context": {
    "domain": "role-assignment",
    "application": "task-creation"
  },
  "pattern_description": "Mandatory PM + Specialist Architect triage for all task assignments",
  "implementation": [
    "1. Detect work type via icc:detect-work-type()",
    "2. Require triage via icc:require-triage()",
    "3. Validate assignments via icc:validate-assignments()",
    "4. Require approval via icc:require-approval()"
  ],
  "conditions": [
    "Task assignment is being created",
    "Specialist work is detected",
    "Role capability match calculation needed"
  ],
  "outcomes": [
    "Proper role assignment",
    "Reduced assignment errors",
    "Improved task execution quality"
  ],
  "reuse_count": 15,
  "success_rate": 0.94,
  "tags": ["role-assignment", "validation", "success-pattern"],
  "relevance_score": 0.98
}
```

## Memory Operations

### Core Storage Operations
**Store Entity:** Save entity to appropriate directory with auto-indexing  
**Retrieve Entity:** Load entity by ID with caching  
**Update Entity:** Modify existing entity with versioning  
**Delete Entity:** Remove entity and update indexes  
**Search Entities:** Query across all entity types with ranking  

### Search Operations
**Content Search:** Full-text search across observations and patterns  
**Tag Search:** Filter by tags with relevance ranking  
**Date Range Search:** Find entities within time periods  
**Relationship Search:** Find related entities via relationship mapping  
**Context Search:** Search within specific project or domain context  

### Relationship Management
**Link Entities:** Create typed relationships between entities  
**Find Related:** Discover entities related to given entity  
**Relationship Types:** learning-to-pattern, project-to-learning, knowledge-links  
**Automatic Linking:** Auto-detect and create relevant relationships  

## Implementation Patterns

### Entity Creation
```
1. Generate unique ID with type-content-date format
2. Validate entity structure and required fields
3. Calculate relevance score based on content depth
4. Store entity in appropriate type directory
5. Update search indexes with new content
6. Create automatic relationships based on content
7. Return entity ID for reference
```

### Search Implementation
```
1. Parse search query and determine search type
2. Check indexes for fast initial filtering
3. Load candidate entities from storage
4. Score entities based on relevance factors
5. Rank results by relevance score
6. Return top results with context snippets
7. Update entity usage statistics
```

### Cleanup and Maintenance
```
1. Monitor storage usage and entity age
2. Archive old entities with low relevance scores
3. Consolidate duplicate or similar entities
4. Rebuild indexes periodically for performance
5. Backup critical entities before cleanup
6. Maintain storage size within configured limits
```

## Configuration Options

### Memory Settings
```json
{
  "max_entities_per_type": 1000,
  "auto_cleanup_days": 90,
  "index_rebuild_interval": "weekly",
  "backup_retention_days": 30,
  "search_result_limit": 20,
  "relevance_threshold": 0.3,
  "auto_relationship_detection": true
}
```

### Cleanup Rules
```json
{
  "low_relevance_threshold": 0.2,
  "unused_entity_days": 45,
  "duplicate_merge_threshold": 0.85,
  "archive_after_days": 180,
  "max_storage_mb": 500
}
```

## Error Handling

**Storage Failures:** Fallback to memory-only mode with periodic retry  
**Corruption Detection:** Validate entity structure on load  
**Index Corruption:** Rebuild indexes from entity files  
**Permission Issues:** Graceful degradation with user notification  
**Disk Space:** Automatic cleanup with user confirmation  

## Performance Optimization

**Lazy Loading:** Load entities only when accessed  
**Index Caching:** Keep frequently used indexes in memory  
**Batch Operations:** Group multiple operations for efficiency  
**Async Operations:** Non-blocking storage operations where possible  
**Compression:** Compress old entities to save space  

## Integration Points

**Command Integration:** All icc:memory-* commands use file storage  
**Behavior Integration:** Automatic memory operations during workflow  
**Search Integration:** Seamless search across all entity types  
**Backup Integration:** Regular backups with git-like versioning  
**Cleanup Integration:** Automatic maintenance during idle periods  

## Migration from MCP Memory

**Detection:** Check for existing MCP memory usage patterns  
**Replacement:** Replace all mcp__memory__ calls with file operations  
**Data Migration:** Convert existing MCP entities to file format  
**Validation:** Ensure all memory operations work with file storage  
**Fallback:** Maintain compatibility during transition period  

---
**FILE-BASED MEMORY:** Complete MCP Memory replacement • JSON storage • Fast search • Automatic maintenance