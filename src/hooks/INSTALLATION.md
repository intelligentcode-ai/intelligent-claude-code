# Hook Installation

## Project-Level Installation (Recommended)

For project-specific hook behavior, install hooks in the project directory:

1. Copy hook files to project `.claude` directory:
   ```bash
   mkdir -p .claude/hooks
   cp -r src/hooks/* .claude/hooks/
   ```

2. Set project environment variable:
   ```bash
   export CLAUDE_PROJECT_DIR=$(pwd)
   ```

3. Add to your project's `settings.json`:
   ```json
   {
     "hooks": {
       "PreToolUse": [{
         "matcher": "*",
         "hooks": [{
           "type": "command",
           "command": "node .claude/hooks/pre-tool-use.js",
           "timeout": 15000,
           "failureMode": "allow"
         }]
       }]
     }
   }
   ```

## User-Level Installation (Automatic)

Hooks are automatically deployed to user scope during `make install`. The installation:

1. Creates `~/.claude/hooks/` directory
2. Copies all hook files including subdirectories (lib/, config/, tests/, coverage/)
3. Makes hook scripts executable
4. Creates `~/.claude/logs/` directory for violation logging

## Manual Hook Activation

If you have an existing `settings.json` file, you need to manually add the hook configuration.

### For User-Level Hooks

Add this configuration to your `~/.claude/settings.json`:

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

### For Project-Level Hooks

Add this configuration to your project's `settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "node .claude/hooks/pre-tool-use.js",
        "timeout": 15000,
        "failureMode": "allow"
      }]
    }]
  }
}
```

**Important**: For project-level hooks, ensure `CLAUDE_PROJECT_DIR` environment variable is set to your project root.

## Environment Variables

- **`CLAUDE_PROJECT_DIR`**: Set to project root for project-level hooks
- When set, hooks use project-specific paths for logs and configuration
- When unset, hooks fall back to user-level paths (`~/.claude/`)

Restart Claude Code to activate behavioral enforcement

## Verification

### User-Level Hook Testing

```bash
cd ~/.claude/hooks
node test-hook-integration.js
```

### Project-Level Hook Testing

```bash
cd .claude/hooks
export CLAUDE_PROJECT_DIR=$(pwd | sed 's|/.claude/hooks||')
node test-hook-integration.js
```

You should see all tests pass, indicating behavioral enforcement is active.

## Logging Locations

- **Project-level**: Violations logged to `$CLAUDE_PROJECT_DIR/.claude/logs/violations-YYYY-MM-DD.log`
- **User-level**: Violations logged to `~/.claude/logs/violations-YYYY-MM-DD.log`