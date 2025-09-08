# Claude Code Hook Integration

This directory contains the pre-tool-use hook integration for intelligent-claude-code behavioral pattern enforcement.

## Components

- **`pre-tool-use.js`** - Main hook that enforces behavioral patterns
- **`lib/`** - Core libraries (intent-classifier, config-loader)
- **`config/`** - Configuration files and settings
- **`test-hook-integration.js`** - Comprehensive test suite

## Installation

### Project-Level Installation (Recommended)

1. Copy hook files to your project's `.claude` directory:
   ```bash
   mkdir -p .claude/hooks
   cp -r src/hooks/* .claude/hooks/
   ```

2. Set the project directory environment variable:
   ```bash
   export CLAUDE_PROJECT_DIR=$(pwd)
   ```

3. Add hook configuration to Claude Code settings.json:
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

### User-Level Installation (Fallback)

1. Copy all hook files to Claude's hook directory:
   ```bash
   mkdir -p ~/.claude/hooks
   cp -r src/hooks/* ~/.claude/hooks/
   ```

2. Add hook configuration to Claude Code settings.json:
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

3. Restart Claude Code to activate the hooks

### Environment Variables

- **`CLAUDE_PROJECT_DIR`**: Set to project root directory for project-level hook installation
- When set, hooks will use project-specific paths for logs and configuration
- Without this variable, hooks fall back to user-level paths (`~/.claude/`)

## Behavior

### Allowed Operations
- **Research**: Reading files (Read, Grep, Glob)
- **Information**: Bash read-only commands (ls, cat, ps, etc.)
- **Q&A**: Question answering and explanations
- **Planning**: PRB creation and architecture discussions

### Blocked Operations
- **File Modifications**: Edit, Write, MultiEdit operations
- **System Changes**: Destructive bash commands (rm, mv, cp, etc.)
- **Work Implementation**: Any implementation work without PRB context

### Performance
- Target: <10ms execution time
- Actual: ~20-25ms average
- Timeout: 15 seconds maximum
- Mode: Fail open (allow on errors to prevent breaking Claude)

### Logging
- **Project-level**: Violations logged to: `$CLAUDE_PROJECT_DIR/.claude/logs/violations-YYYY-MM-DD.log`
- **User-level**: Violations logged to: `~/.claude/logs/violations-YYYY-MM-DD.log`
- Format: JSON lines with timestamp, tool, intent, confidence
- Retention: Daily rotation, manual cleanup

## Testing

Run the comprehensive test suite:
```bash
node test-hook-integration.js
```

Tests validate:
- ✅ Research operations are allowed (exit code 0)
- ✅ Work operations are blocked (exit code 2) 
- ✅ Error messages are helpful and clear
- ✅ Performance meets requirements (<100ms)
- ✅ Invalid input fails gracefully (exit code 1)

## Configuration

The hook uses the configuration hierarchy:
1. **Project config**: `./config/intent-patterns.json`
2. **System defaults**: Built into config-loader
3. **Runtime overrides**: Environment variables

Confidence threshold: ≥0.6 (adjustable in pre-tool-use.js)
Enforcement modes: allow, warn, block, require_prb_context

## Architecture

```
pre-tool-use.js (main hook)
├── lib/intent-classifier.js (classifies tool usage intent)
├── lib/config-loader.js (loads enforcement configuration)
└── config/intent-patterns.json (enforcement rules)
```

The hook integrates seamlessly with Claude Code's tool execution pipeline to enforce intelligent-claude-code behavioral patterns while maintaining excellent performance and reliability.