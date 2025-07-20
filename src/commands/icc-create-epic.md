# Create Epic

Create a new epic using $ARGUMENTS with title, priority, and optional description.

## Behavior
PM-only operation creating epic directories, files, and metadata. Enforces naming conventions and validates priority levels.

## Arguments
**Format:** "Epic Title | Priority: P0-P3 | Description: Optional"
**Example:** "User Authentication | Priority: P0 | Description: OAuth and sessions"

## Core Actions
1. Validate @PM role → Parse title/priority/description 
2. Generate EPIC-XXX ID → Create directory structure
3. Generate epic.yaml with metadata → Initialize git tracking → Update progress

## Error Handling
- **NOT_PM**: "❌ Only @PM can create epics"
- **INVALID_FORMAT**: "❌ Use format 'Title | Priority: P0-P3 | Description: text'"
- **INVALID_PRIORITY**: "❌ Priority: P0 (critical), P1 (high), P2 (medium), P3 (low)"
- **DUPLICATE**: "❌ Similar epic exists" | **DIR_EXISTS**: "❌ Directory exists"
