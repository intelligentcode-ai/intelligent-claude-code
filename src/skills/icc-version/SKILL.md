---
name: icc-version
description: Display ICC system version, component status, and installation info. Use when user asks about version, system status, asks 'what version', or wants to check if ICC is installed correctly.
---

# ICC Version

Display the current intelligent-claude-code system version and component status.

## When to Use

- User asks about version or system status
- Troubleshooting or support scenarios
- Verifying ICC installation

## Process

1. **Read VERSION file** from installation directory (`~/.claude/VERSION`)
2. **Validate installation** by checking key directories exist
3. **Display formatted output** with version and component status

## Output Format

```
INTELLIGENT CLAUDE CODE
Version: [version from VERSION file]
Type: Virtual Team Enhancement Framework
Architecture: AgentTask-driven execution with 14 core roles + dynamic specialists

System Components:
- Skills Framework: [status]
- AgentTask Templates: 5 complexity tiers (nano/tiny/medium/large/mega)
- Memory System: File-based learning storage
- Hook System: PreToolUse safety/privacy hooks

Repository: https://github.com/intelligentcode-ai/intelligent-claude-code
```

## Error Handling

- **VERSION_NOT_FOUND**: Display "Version file not found. Run /icc-init-system to initialize."
- **SYSTEM_NOT_INITIALIZED**: Display "System not initialized. Run /icc-init-system first."
