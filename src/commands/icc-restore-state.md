# State Recovery

Restore preserved system state after context loss.

## Parameters
- `--chain`: Run verification after restoration
- `--quiet`: Minimal output
- `--force`: Force restoration despite errors

## Behavior
Validate state file → Restore behaviors → Resume work → Reconnect memory → Sync IDs

## Output
```bash
# Default
State restored • Roles active: @PM, @AI-Engineer • Work resumed: BUG-024

# Quiet
RESTORED
```