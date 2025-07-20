# Create Bug

Create bug report using $ARGUMENTS.

## Arguments
`Title: "Bug title" | Epic: EPIC-XXX | Impact: "description" | Severity: CRITICAL|HIGH|MEDIUM|LOW | Reproducibility: ALWAYS|SOMETIMES|RARELY`

## Behavior
- Verify @PM role required for bug creation
- Parse bug details from $ARGUMENTS pipe format
- Validate epic exists and all required fields present
- Generate next BUG-XXX ID sequentially
- Create bug.yaml with all bug properties
- Set priority based on severity (CRITICAL→P0, etc.)
- Create directory structure: epics/EPIC-XXX/bugs/BUG-XXX/

## Errors
- Wrong role → "@PM role required"
- Epic missing → "Epic not found"
- Missing fields → "Title/impact required"
- Invalid severity → "Use CRITICAL|HIGH|MEDIUM|LOW"