# Memory Store Command

**PURPOSE:** Store entities in file-based memory system for persistent knowledge capture

## Behavior Pattern

When user executes `/icc-memory-store [entity_data]`, store new entities or update existing ones in the file-based memory system, replacing MCP Memory functionality.

## Core Operations

### Storage Process
1. **Parse Entity Data**: Extract entity structure and metadata from `$ARGUMENTS`
2. **Validate Entity**: Ensure required fields and proper structure
3. **Generate ID**: Create unique ID using type-content-date format
4. **Store File**: Save entity JSON to appropriate directory
5. **Update Indexes**: Refresh search indexes with new content
6. **Create Relationships**: Establish automatic links to related entities

### Entity Types

**Learning Entity Storage:**
```json
{
  "id": "Learning-{{type}}-{{YYYYMMDD}}",
  "type": "Learning",
  "created_at": "{{ISO8601_timestamp}}",
  "context": {
    "task_id": "{{task_id}}",
    "role": "{{role}}",
    "error_type": "{{error_category}}"
  },
  "observations": [
    "Key insight or lesson learned",
    "Specific behavior or pattern identified"
  ],
  "patterns": [
    "Actionable pattern for future use",
    "Implementation guidance"
  ],
  "prevention": [
    "Steps to prevent this error",
    "Validation checks to add"
  ],
  "tags": ["{{category}}", "{{domain}}", "{{type}}"],
  "relevance_score": 0.95,
  "application_count": 0
}
```

**Pattern Entity Storage:**
```json
{
  "id": "Pattern-{{domain}}-{{type}}-{{YYYYMMDD}}",
  "type": "Pattern",
  "created_at": "{{ISO8601_timestamp}}",
  "pattern_type": "success|error|process",
  "context": {
    "domain": "{{technical_domain}}",
    "application": "{{use_case}}"
  },
  "pattern_description": "Clear description of the pattern",
  "implementation": [
    "Step 1: Specific action",
    "Step 2: Implementation detail",
    "Step 3: Validation approach"
  ],
  "conditions": [
    "When this pattern applies",
    "Prerequisites for use"
  ],
  "outcomes": [
    "Expected positive results",
    "Measurable improvements"
  ],
  "reuse_count": 0,
  "success_rate": 1.0,
  "tags": ["{{domain}}", "{{pattern_type}}"],
  "relevance_score": 0.98
}
```

**Project Context Storage:**
```json
{
  "id": "Project-{{name}}-{{YYYYMMDD}}",
  "type": "Project",
  "created_at": "{{ISO8601_timestamp}}",
  "project_name": "{{project_identifier}}",
  "context": {
    "system_type": "{{architecture_type}}",
    "architecture": "{{system_architecture}}",
    "primary_languages": ["{{lang1}}", "{{lang2}}"],
    "key_concepts": ["{{concept1}}", "{{concept2}}"]
  },
  "observations": [
    "System characteristics",
    "Development patterns",
    "Team conventions"
  ],
  "current_state": {
    "active_epic": "{{epic_id}}",
    "active_bugs": ["{{bug_id1}}", "{{bug_id2}}"],
    "workflow_phase": "{{current_phase}}"
  },
  "learnings": [
    "{{learning_entity_id1}}",
    "{{learning_entity_id2}}"
  ],
  "tags": ["project-context", "active", "{{system_type}}"],
  "relevance_score": 1.0
}
```

### File Operations

**Directory Management:**
```
1. Determine entity type and create type-specific path
2. Create year/month subdirectories for organization
3. Generate unique filename with entity ID
4. Ensure directory permissions are correct
```

**File Writing:**
```
1. Serialize entity to formatted JSON
2. Write to temporary file first for atomicity
3. Move to final location to prevent corruption
4. Set appropriate file permissions
```

**Index Updates:**
```
1. Update content-index.json with searchable content
2. Add tags to tag-index.json with entity reference
3. Update date-index.json with creation timestamp
4. Refresh related entity mappings
```

### Auto-Relationship Detection

**Pattern Matching:**
```
1. Scan entity content for references to existing entities
2. Identify domain overlaps and conceptual connections
3. Create bidirectional relationship mappings
4. Update relationship files with new connections
```

**Relationship Types:**
- `learning-to-pattern`: Learning entities that reference patterns
- `project-to-learning`: Project context linked to learnings
- `pattern-to-pattern`: Related patterns in same domain
- `knowledge-links`: General knowledge connections

### Storage Organization

**Directory Structure Creation:**
```
~/.claude/memory/
├── entities/
│   ├── Learning/2025/01/
│   ├── Pattern/2025/01/
│   ├── Project/current/
│   └── Knowledge/by-domain/
├── relationships/
├── indexes/
└── config/
```

**File Naming Convention:**
- Learning: `Learning-{{error_type}}-{{YYYYMMDD}}.json`
- Pattern: `Pattern-{{domain}}-{{type}}-{{YYYYMMDD}}.json`
- Project: `Project-{{name}}-{{YYYYMMDD}}.json`
- Knowledge: `Knowledge-{{domain}}-{{topic}}-{{YYYYMMDD}}.json`

## Storage Patterns

### Learning Capture Pattern
**Usage:** Store error learnings with forgiveness logic
**Process:**
1. Detect error type and context
2. Check for existing similar learnings
3. Create new learning entity with prevention guidance
4. Link to related patterns and project context
5. Update error tracking for repeat detection

### Success Pattern Storage
**Usage:** Capture successful workflows and approaches
**Process:**
1. Identify successful completion of complex task
2. Extract reusable patterns and implementation steps
3. Store with success metrics and reuse guidance
4. Create links to related learnings and context
5. Update pattern usage statistics

### Project Context Updates
**Usage:** Maintain current project state and evolution
**Process:**
1. Update current project context entity
2. Add new learnings and pattern references
3. Track active work items and progress
4. Maintain project evolution history
5. Link to all related project learnings

## Error Handling

**Storage Failures:**
- Directory creation fails → Create with sudo and adjust permissions
- File write fails → Retry with temporary location and move
- JSON serialization fails → Validate entity structure and fix
- Permission issues → Fallback to user-writable locations

**Index Update Failures:**
- Index corruption → Rebuild from existing entity files
- Concurrent access → Use file locking and retry logic
- Disk space issues → Trigger automatic cleanup
- Large index files → Implement index compression

**Validation Failures:**
- Missing required fields → Return validation error with guidance
- Invalid entity structure → Provide structure template
- Duplicate entity IDs → Generate alternative ID with suffix
- Invalid relationships → Skip relationship creation and continue

## Performance Optimization

**Batch Operations:**
```
1. Group multiple entity writes into single operation
2. Defer index updates until all entities stored
3. Batch relationship detection and creation
4. Minimize file system calls through caching
```

**Lazy Index Updates:**
```
1. Queue index updates for background processing
2. Update indexes only when search is triggered
3. Use incremental index updates for small changes
4. Rebuild full indexes only when necessary
```

**Memory Management:**
```
1. Cache frequently accessed entities in memory
2. Limit memory usage with LRU eviction
3. Stream large entity files instead of loading fully
4. Use memory-mapped files for large indexes
```

## Integration Points

**Workflow Integration:**
- Automatic learning storage after error detection
- Pattern storage after successful task completion
- Project context updates during phase transitions
- Knowledge capture during planning and execution

**Command Chain Integration:**
- Called by `icc:store-learning` after error handling
- Used by `icc:capture-pattern` after success
- Integrated with `icc:update-context` for project state
- Supports `icc:memory-backup` for data preservation

## Validation Rules

**Entity Structure Validation:**
```
1. Required fields present (id, type, created_at)
2. Valid entity type (Learning, Pattern, Project, Knowledge)
3. Proper ID format with type prefix
4. Valid JSON structure
5. Required type-specific fields present
```

**Content Validation:**
```
1. Observations array has meaningful content
2. Tags array contains relevant categorization
3. Relevance score between 0.0 and 1.0
4. Context object contains required fields
5. Relationships reference existing entities
```

**Storage Validation:**
```
1. Directory structure exists and is writable
2. File doesn't already exist with same ID
3. Available disk space for storage
4. Proper file permissions for access
5. Index files are valid and writable
```

## Examples

### Store Learning Entity
**Command:** `/icc-memory-store Learning error:validation context:task-assignment observations:["Validation required before task execution", "Missing validation causes errors"] prevention:["Add icc:validate-assignments() check"]`

**Behavior:** Create learning entity about validation errors with prevention guidance and link to validation patterns

### Store Success Pattern
**Command:** `/icc-memory-store Pattern domain:role-assignment type:success implementation:["Detect work type", "Require triage", "Validate capability", "Get approval"] outcomes:["Proper assignments", "Reduced errors"]`

**Behavior:** Store successful role assignment pattern with implementation steps and measurable outcomes

### Update Project Context
**Command:** `/icc-memory-store Project name:intelligent-claude-code current_state:{"active_epic":"EPIC-002","workflow_phase":"EXECUTE"} learnings:["Learning-validation-20250120"]`

**Behavior:** Update current project context with active work items and link to recent learnings

---
**MEMORY STORE:** File-based persistence • Auto-indexing • Relationship detection • Validation