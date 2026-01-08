# Version

Display the current intelligent-claude-code system version.

## Behavior
Quick version check command that displays the installed system version.
Useful for support, debugging, and ensuring you're using the latest version.

**Version Resolution:** Read from VERSION file in project root, replacing [CURRENT_VERSION] placeholder.

## Usage
`/icc-version`

## Output

### 🎯 INTELLIGENT CLAUDE CODE
**Version:** [CURRENT_VERSION]
**Type:** Virtual Team Enhancement Framework
**Architecture:** AgentTask-driven execution with 14 core roles + dynamic specialists

### System Components:
- **Behavioral Framework:** Minimal behavior stack (virtual-team mode)
- **AgentTask Templates:** 5 complexity tiers (nano/tiny/medium/large/mega)
- **Memory System:** File-based learning storage
- **Hook System:** Minimal PreToolUse safety/privacy hooks

**Repository:** https://github.com/intelligentcode-ai/intelligent-claude-code
**Documentation:** See README.md for full details

## Error Messages
- **VERSION_NOT_FOUND**: "⚠️ Version file not found. Run /icc-init-system to initialize."
- **SYSTEM_NOT_INITIALIZED**: "⚠️ System not initialized. Run /icc-init-system first."
