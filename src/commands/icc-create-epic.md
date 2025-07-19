# Epic Creation Command

Create epic structure - PM-only operation

## Usage
```bash
icc-create-epic "Epic title" --scope "Project scope" [--priority P2] [--chain]
```

## Parameters
- `title`: Epic title/description (required)
- `--scope`: Project scope and business value (required) 
- `--priority`: P0|P1|P2|P3 (default: P2, see priority-system.md for strategic alignment)
- `--chain`: Auto-continue to icc-plan-order (optional)

## Core Actions
- Verify @PM role
- Assign next EPIC-XXX ID
- Create epic directory with epic.yaml
- Initialize stories/ and bugs/ subdirectories
- No tasks created (Stage 1: DEFINING only)

## Validation
- PM role required
- Project scope mandatory
- ID uniqueness check

## Output
```
✅ Epic created: User Authentication System
  Status: PLANNED | Phase: DEFINING | Priority: P1
```