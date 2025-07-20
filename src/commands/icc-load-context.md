# Load Context

Load project, assignment, and role context from various sources using $ARGUMENTS.

## Behavior
Load contextual information from assignment files, memory, project state, and role history for decision-making.

## Arguments
**Format:** "context_type:assignment|project|role|memory | source:identifier | depth:shallow|deep"
**Example:** "context_type:assignment | source:STORY-001 | depth:deep"

## Core Actions
1. Parse request → Load by context type (assignment/project/role/memory)
2. Process depth (shallow: core info | deep: relationships/history)
3. Assemble context package → Validate → Cache frequently accessed

## Context Types

## Context Relationships
Hierarchical (Epic→Story→Task), dependencies, role assignments, knowledge links

## Context Packaging
```yaml
context_package:
  type: assignment|project|role|memory | source: identifier | depth: shallow|deep
  loaded_at: timestamp | core_data: {} | relationships: {} | history: {} | metadata: {}
```

## Caching Strategy
**Assignment**: 10min | **Project**: 30min | **Role**: 15min | **Memory**: 1hr

## Error Handling
- **Unknown Type**: "Invalid context_type"
- **Source Not Found**: "Cannot find source"
- **Access Denied**: "No permission"
- **Incomplete**: "Missing relationships"
- **Cache Error**: "Cache unavailable"
