# Create Story

Create story within epic - PM-only operation

## Usage
```bash
icc-create-story "Story title" --epic EPIC-XXX --scope "Story scope" [--priority P2] [--chain]
```

## Parameters
- `title`: Story title/description (required)
- `--epic`: Parent epic ID (required)
- `--scope`: Story-specific scope within epic context (required)
- `--priority`: P0|P1|P2|P3 (default: inherits from epic, see priority-system.md)
- `--chain`: Auto-continue to icc-plan-order (optional)

## Core Actions
- Verify @PM role and epic exists
- Assign next STORY-XXX ID
- Create story directory with story.yaml
- Update parent epic with story reference
- No tasks created (Stage 1: DEFINING only)

## Validation
- PM role required
- Parent epic must exist
- Story scope mandatory
- ID uniqueness check

## Output
```
✅ Story created: API Integration Framework
  Epic: EPIC-002 | Priority: P1 | Phase: DEFINING
```