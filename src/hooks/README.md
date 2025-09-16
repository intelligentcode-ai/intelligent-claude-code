# Claude Code Hook Integration

This directory contains the pre-tool-use hook integration for intelligent-claude-code behavioral pattern enforcement.

## Components

- **`pre-tool-use.js`** - Main hook that enforces behavioral patterns and memory consultation
- **`post-tool-use.js`** - Post-execution hook for memory storage reminders
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
       }],
       "PostToolUse": [{
         "matcher": "*",
         "hooks": [{
           "type": "command",
           "command": "node .claude/hooks/post-tool-use.js",
           "timeout": 5000,
           "failureMode": "continue"
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
       }],
       "PostToolUse": [{
         "matcher": "*",
         "hooks": [{
           "type": "command",
           "command": "node ~/.claude/hooks/post-tool-use.js",
           "timeout": 5000,
           "failureMode": "continue"
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
- **PRB Creation Without Memory**: Creating PRB files without recent memory consultation

## Memory Enforcement

### Memory-First Principle
The hooks enforce a **memory-first** approach to ensure learned patterns are applied:

1. **Pre-Tool-Use Hook**: Blocks PRB creation if no memory search occurred within 5 minutes
2. **Post-Tool-Use Hook**: Detects PRB completion and suggests memory storage opportunities

### Memory Search Detection
The pre-hook considers these activities as valid memory consultation:
- Reading files in `memory/` directory
- Bash commands containing "memory search"
- Any file operations involving memory-related content

### Memory Storage Reminders
The post-hook identifies learning opportunities from:
- **Domain Knowledge**: Technical domains and implementation patterns
- **Solution Patterns**: Successful implementation approaches
- **Issue Resolution**: Problem-solving patterns and fixes

### Memory Enforcement Messages
When PRB creation is blocked, users receive detailed guidance:
- Required memory search locations
- 5-minute time window requirement
- Specific memory directories to check
- Clear instructions for compliance

### Performance
- Target: <10ms execution time
- Actual: ~20-25ms average
- Timeout: 15 seconds maximum
- Mode: Fail open (allow on errors to prevent breaking Claude)

### Logging
- **Project-level**: Violations logged to: `$CLAUDE_PROJECT_DIR/.claude/logs/violations-YYYY-MM-DD.log`
- **User-level**: Violations logged to: `~/.claude/logs/violations-YYYY-MM-DD.log`
- **Memory opportunities**: Logged to: `memory-opportunities-YYYY-MM-DD.log`
- Format: JSON lines with timestamp, tool, intent, confidence, memory data
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