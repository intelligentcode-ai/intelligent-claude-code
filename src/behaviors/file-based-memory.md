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
**Store Entity:** Use `/icc-memory-store [entity_data]` to save entity with auto-indexing  
**Retrieve Entity:** Use `/icc-memory-search [entity_id]` to load by ID with caching  
**Update Entity:** Use `/icc-memory-store [updated_entity]` to modify with versioning  
**Delete Entity:** Use `/icc-memory-cleanup [entity_id]` to remove and update indexes  
**Search Entities:** Use `/icc-memory-search [query]` to query with ranking  

### Search Operations
**Content Search:** Use `/icc-memory-search [content_query]` for full-text across observations  
**Tag Search:** Use `/icc-memory-search [tag:tagname]` for tag filtering with relevance  
**Date Range Search:** Use `/icc-memory-search [date:range]` for time period queries  
**Relationship Search:** Use `/icc-memory-search [related:entity_id]` for relationship mapping  
**Context Search:** Use `/icc-memory-search [context:project]` for domain-specific queries  

### Relationship Management
**Link Entities:** Use `/icc-memory-store [relationship_data]` for typed relationships  
**Find Related:** Use `/icc-memory-search [related:entity_id]` to discover connections  
**Relationship Types:** learning-to-pattern, project-to-learning, knowledge-links  
**Automatic Linking:** Use `/icc-memory-store` with auto-detection of relevant relationships  

## Implementation Patterns

### Entity Creation
Use `/icc-memory-store [entity_data]` to generate unique ID, validate structure, calculate relevance score, store in directory, update indexes, create relationships, and return entity ID

### Search Implementation  
Use `/icc-memory-search [query]` to parse query, check indexes, load candidates, score entities, rank results, return snippets, and update usage statistics

### Cleanup and Maintenance
Use `/icc-memory-cleanup [cleanup_type]` to monitor usage, archive old entities, consolidate duplicates, rebuild indexes, backup critical entities, and maintain size limits

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

**Command Integration:** Use `/icc-memory-*` commands for all file storage operations  
**Behavior Integration:** Use `/icc-memory-store` and `/icc-memory-search` during workflow  
**Search Integration:** Use `/icc-memory-search` for seamless queries across entity types  
**Backup Integration:** Use `/icc-memory-backup` for regular git-like versioning  
**Cleanup Integration:** Use `/icc-memory-cleanup` for automatic maintenance  

## Migration from MCP Memory

**Detection:** Use `/icc-memory-init` to check for existing MCP patterns  
**Replacement:** Use `/icc-memory-*` commands instead of mcp__memory__ calls  
**Data Migration:** Use `/icc-memory-backup` and `/icc-memory-restore` for format conversion  
**Validation:** Use `/icc-memory-search` to ensure all operations work with file storage  
**Fallback:** Use `/icc-memory-init` to maintain compatibility during transition  

---
**FILE-BASED MEMORY:** Complete MCP Memory replacement • JSON storage • Fast search • Automatic maintenance