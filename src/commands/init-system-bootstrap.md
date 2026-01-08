# Init System Bootstrap

**MANDATORY:** Bootstrap validation and context recovery patterns for system initialization.

## Context Recovery & Bootstrap Validation

### Phase 1: Project Root Detection
1. **Project Root Detection**: Explicitly determine and validate absolute project root path
2. **Configuration Path Resolution**: Detect and validate config locations (project/user/system)
3. **File System Validation**: Verify critical directories and files exist and are accessible
4. **Context State Assessment**: Determine if system is in fresh start or recovery-from-context-loss state

### Initialization Output

**🔧 CONTEXT RECOVERY & BOOTSTRAP VALIDATION**
- ✓ Working directory: /project/path/
- ✓ CLAUDE.md found and validated
- ✓ Project structure confirmed
- ✓ Configuration path resolved
- ✓ Critical directories accessible: src/, memory/, agenttasks/

**Recovery State Assessment:**
- ℹ️ Context State: [FRESH_START | CONTEXT_RECOVERY]
- ℹ️ Previous session data: [FOUND | NOT_FOUND]
- ℹ️ Configuration cache status: [VALID | EXPIRED | MISSING]

### Error Handling

**Context Recovery Errors:**
- **PROJECT_ROOT_NOT_FOUND**: "❌ Critical: Cannot determine project root directory. Expected CLAUDE.md or .git in current directory."
- **CONFIG_PATH_FAILED**: "❌ Critical: Config locations not detected. Expected: ./icc.config.json, ./.claude/icc.config.json, ~/.claude/icc.config.json"
- **CONTEXT_RECOVERY_FAILED**: "❌ Critical: Unable to recover system context. Please verify project structure and permissions."
- **FILE_SYSTEM_ACCESS_DENIED**: "❌ Critical: Cannot access critical directories. Check permissions for: {failed_paths}"

---

*Bootstrap validation and context recovery for system initialization*
