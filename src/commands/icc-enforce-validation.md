# Enforce Validation

Activate real-time validation enforcement using $ARGUMENTS.

## Arguments
`Level: strict|normal|advisory | Areas: roles|git|workflow|all | Auto-correct: enabled|disabled`

## Behavior
- Parse enforcement level and areas from $ARGUMENTS
- Initialize monitors: role assignments, git privacy, workflow compliance
- Strict: HALT on violations, no auto-fix; Normal: auto-fix minor, HALT major; Advisory: log only
- Monitor continuously: role >70% match, PM+Architect approval, git privacy, phase transitions
- Auto-correct when enabled: reassign roles, strip AI mentions, fix phases
- Track violations in ~/.claude/violations.log

## Errors
- Invalid level → "Must be strict|normal|advisory"
- System not ready → "Initialize system first"
- Monitor failed → "Cannot start monitors"
- Log failed → "Using memory tracking"