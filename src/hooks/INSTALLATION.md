# Hook Installation

## Automatic Installation

Hooks are automatically deployed during `make install`. The installation:

1. Creates `~/.claude/hooks/` directory
2. Copies all hook files including subdirectories (lib/, config/, tests/, coverage/)
3. Makes hook scripts executable
4. Creates `~/.claude/logs/` directory for violation logging

## Manual Hook Activation

If you have an existing `settings.json` file, you need to manually add the hook configuration:

1. Add this configuration to your `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "node ~/.claude/hooks/pre-tool-use.js",
        "timeout": 15000,
        "failureMode": "allow"
      }]
    }]
  }
}
```

2. Restart Claude Code to activate behavioral enforcement

## Verification

Test that hooks are working:

```bash
cd ~/.claude/hooks
node test-hook-integration.js
```

You should see all tests pass, indicating behavioral enforcement is active.