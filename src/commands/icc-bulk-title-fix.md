# Bulk Title Fix

Fix non-compliant task titles using $ARGUMENTS.

## Arguments
`[scope: all|epic:ID|story:ID|bug:ID|active|recent] [mode: scan|suggest|auto|interactive] [options]`

## Behavior
- Scan specified scope for role-in-title violations
- Analyze content to determine appropriate specialist role
- Apply "[Role] Description" format corrections
- Validate >70% capability match for assigned roles
- Store correction patterns in memory for learning
- Handle batch operations efficiently with progress reporting

## Errors
- Invalid scope → "Unknown scope"
- No violations → "All titles compliant"
- Ambiguous content → "Manual review required"
- Access denied → "Cannot read file"