# CRITICAL FINDING: Claude Code Uses $ARGUMENTS

## Discovery
Claude Code slash commands work differently than we assumed:
- Commands use `$ARGUMENTS` variable substitution
- NOT parameter parsing with flags/options
- The entire text after the command becomes `$ARGUMENTS`

## Example
Command file content:
```
Please analyze and fix the GitHub issue: $ARGUMENTS.
```

Usage:
```
/command 39
```

Result: `$ARGUMENTS` is replaced with "39"

## Impact
- ALL parameter documentation needs to change
- Commands should document what arguments they expect
- No complex parameter parsing - just string substitution

## Required Changes
1. Update all commands to use $ARGUMENTS
2. Document expected argument format
3. Remove parameter sections with flags/options
4. Use simple argument descriptions instead