# Memory Store

Store entity in memory system using $ARGUMENTS.

## Behavior

Stores entities in memory with relationship tracking.

## Arguments

**Format:** "entity_type | entity_data | relationships"

**Type:** learning, pattern, success, error, decision
**Example:** "pattern | auth-flow | relates-to:security"

## Core Actions

1. Parse entity type, data, and relationships from $ARGUMENTS
2. Create entity with metadata and timestamp
3. Establish relationships with existing entities
4. Apply exponential aging weights
5. Store in memory with indexing
6. Update entity statistics

## Entity Types

**Learning:** Captured insights and lessons
**Pattern:** Reusable solutions and approaches
**Success:** Successful implementations
**Error:** Mistakes and prevention
**Decision:** Important decisions and rationale

## Error Handling

- **Invalid type**: "Entity type must be: learning|pattern|success|error|decision"
- **Empty data**: "Entity data cannot be empty"
- **Store failed**: "Failed to store entity in memory"