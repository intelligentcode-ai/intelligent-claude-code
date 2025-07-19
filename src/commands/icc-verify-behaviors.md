# Behavioral Validation

Validate all behavioral patterns and components are operational.

## Parameters
- `--target=<component>`: Verify specific component (modules|roles|workflow|memory)
- `--quiet`: Brief pass/fail only
- `--fix`: Attempt to fix detected issues

## Validation Process
Check modules → Test roles → Validate workflow → Verify memory → Test scoring

## Output
```bash
# Default
Modules: 8/8 loaded • Roles: @PM, @AI-Engineer active • Workflow: operational
Memory: connected • Scoring: active • Commands: ready
🎯 ALL VERIFIED | System: OPERATIONAL

# Quiet
VERIFIED
```