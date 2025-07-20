# File-Based Memory

**MANDATORY:** MUST use file operations. Auto-correct violations.

**PURPOSE:** File-based memory system for knowledge persistence and learning capture

## Imports
@./shared-patterns/memory-patterns.md
@./shared-patterns/error-handling-patterns.md

## Core Architecture

### Storage Structure
```
~/.claude/memory/
├── entities/[Learning|Pattern|Project|Knowledge]/YYYY/MM/
├── relationships/
├── indexes/[by-type.md, by-name.md, by-content.md]
└── config/memory-config.json
```

### Entity Types
- **Learning:** Error patterns, prevention measures, application bonuses
- **Pattern:** Reusable solutions, success metrics, usage statistics  
- **Project:** Current state, work tracking, evolution history
- **Knowledge:** Domain expertise, best practices, reference materials

## Memory Operations

### Storage Operations
- `/icc-memory-store [entity_type] [entity_data]` - Create entity with auto-indexing
- `/icc-memory-search [query_terms]` - Search all types with relevance ranking
- `/icc-memory-backup` / `/icc-memory-restore` - Archive management

### Learning Integration
**Error Processing:** First error → Learning entity, no penalty; Repeated → double penalty
**Success Pattern:** Capture approaches → Pattern entities → Usage tracking
**Memory-First:** Search before action → Apply knowledge → Capture learnings

### Relationship Management
**Auto-Relationships:** Learning→Pattern, Pattern→Project, similar entities
**Types:** derives_from, applies_to, similar_to, prevents, implements

## Command Definitions

### `/icc-memory-search [query]`
Search entities across all types with relevance ranking

### `/icc-memory-store [entity_type] [data]`
Create entity with ID generation, indexing, and relationships

### `/icc-memory-init`
Initialize directory structure and indexes

### `/icc-memory-backup` / `/icc-memory-restore [file]`
Archive and restore complete memory system

### `/icc-memory-cleanup`
Remove old entities and optimize storage