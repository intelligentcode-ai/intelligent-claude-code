# Finalize Work Item

Complete work items and prepare for archival.

## Usage
```bash
icc-finalize-item [ITEM-ID] [--batch]
```

## Access
PM role only. Transitions items through completion phases.

## Behavior
- Validate all tasks completed
- Check acceptance criteria met
- Capture final metrics
- Prepare for archival
- Generate success patterns

## Examples
```bash
icc-finalize-item STORY-001
icc-finalize-item BUG-002 --batch=[BUG-003,BUG-004]
```

## Validation
Items must be in EXECUTING phase with all tasks completed and acceptance criteria satisfied.