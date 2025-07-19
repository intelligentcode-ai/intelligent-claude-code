# Bug Creation Command

Create bug report within epic - PM-only operation

## Usage
```bash
icc-create-bug "Bug title" --epic EPIC-XXX --scope "Bug impact scope" [--priority P1] [--severity HIGH] [--chain]
```

## Parameters
- `title`: Bug title/description (required)
- `--epic`: Parent epic ID (required)
- `--scope`: Bug impact scope and affected areas (required)
- `--priority`: P0|P1|P2|P3 (default: P1)
- `--severity`: CRITICAL|HIGH|MEDIUM|LOW (default: HIGH)
- `--chain`: Auto-continue to icc-plan-order (optional)

## Core Actions
- Verify @PM role and epic exists
- Assign next BUG-XXX ID
- Create bug directory with bug.yaml
- Update parent epic with bug reference
- Auto-align priority with severity
- No tasks created (Stage 1: DEFINING only)

## Validation
- PM role required
- Parent epic must exist
- Impact scope mandatory
- Priority/severity alignment
- ID uniqueness check

## Priority/Severity Mapping
- CRITICAL → P0, HIGH → P1, MEDIUM → P2, LOW → P3
- See priority-system.md for complete escalation rules

## Output
```
✅ Bug created: Validation Not Enforced in Workflow
  Epic: EPIC-002 | Priority: P0 | Severity: CRITICAL | Phase: DEFINING
```