# PreToolUse Blocking Hook

Real-time enforcement of PM role file operation boundaries and summary file organization.

## Overview

The PreToolUse hook intercepts Write/Edit/MultiEdit operations before execution, enforcing:
1. **PM Role Allowlist**: PM can only modify coordination files (stories/, bugs/, memory/, docs/, agenttasks/, root *.md)
2. **Technical Directory Protection**: Blocks PM from src/, lib/, config/, tests/
3. **Summary File Redirection**: Prevents SUMMARY/REPORT/VALIDATION/ANALYSIS files in project root

## How It Works

**Validation Flow:**
1. Hook receives tool invocation (Write/Edit/MultiEdit) with file_path
2. Checks for summary file patterns in root → Block with redirection guidance
3. Detects PM role from context → Validates against allowlist/blocklist
4. Returns exit 0 (allow) or exit 1 (block) with guidance message

## PM Role Allowlist

**Allowed Directories (Coordination Only):**
- `stories/` - User stories and planning (configurable: story_path)
- `bugs/` - Bug reports and tracking (configurable: bug_path)
- `memory/` - Learning storage (configurable: memory_path)
- `docs/` - Documentation (configurable: docs_path)
- `agenttasks/` - AgentTask files
- Root `*.md` files - CLAUDE.md, README.md, CHANGELOG.md, etc.

**Blocked Directories (Technical Work):**
- `src/` - Source code (configurable: src_path)
- `tests/` - Test files (configurable: test_path)
- `config/` - Configuration (configurable: config_path)
- `lib/` - Libraries

## Summary File Redirection

**Blocked Patterns in Root:**
- `SUMMARY*` - Summary documents
- `REPORT*` - Report files
- `VALIDATION*` - Validation results
- `ANALYSIS*` - Analysis documents

**Applies To:** ALL roles (not just PM)

**Automatic Actions:**
- Blocks file creation with exit 1
- Suggests `summaries/{filename}` as alternative
- Auto-creates `summaries/` directory if missing

## Configuration Customization

The hook respects directory-structure configuration from CLAUDE.md or config.md:

```yaml
story_path: "user-stories"  # Default: "stories"
bug_path: "issues"           # Default: "bugs"
memory_path: "knowledge"     # Default: "memory"
docs_path: "documentation"   # Default: "docs"
src_path: "source"           # Default: "src"
test_path: "test-suite"      # Default: "tests"
config_path: "settings"      # Default: "config"
```

Configuration cache: 5-minute TTL for performance.

## Installation

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node /path/to/intelligent-claude-code/src/hooks/pretooluse.js",
            "timeout": 5000
          }
        ]
      }
    ]
  }
}
```

## Testing

**Test PM Blocking:**
```bash
# This should be blocked
echo '{"tool":"Edit","parameters":{"file_path":"src/test.js"},"context":{"role":"@PM"}}' | node src/hooks/pretooluse.js

# Expected output: {"continue":false,"message":"🚫 PM role is coordination only..."}
# Expected exit code: 1
```

**Test PM Allowing:**
```bash
# This should be allowed
echo '{"tool":"Edit","parameters":{"file_path":"stories/STORY-001.md"},"context":{"role":"@PM"}}' | node src/hooks/pretooluse.js

# Expected output: {"continue":true}
# Expected exit code: 0
```

**Test Summary Redirection:**
```bash
# This should be blocked (any role)
echo '{"tool":"Write","parameters":{"file_path":"SUMMARY.md"},"context":{}}' | node src/hooks/pretooluse.js

# Expected output: {"continue":false,"message":"📋 Summary files belong in ./summaries/..."}
# Expected exit code: 1
```

## Logging

All hook operations logged to: `~/.claude/logs/YYYY-MM-DD-pretooluse.log`

**Log Format:**
```
[2025-10-03T10:15:30.123Z] PreToolUse triggered: {"tool":"Edit","parameters":{"file_path":"src/test.js"}...}
[2025-10-03T10:15:30.124Z] PM role detected, validating file path: src/test.js
[2025-10-03T10:15:30.125Z] PM operation BLOCKED: src/test.js
```

## Troubleshooting

**Hook Not Blocking:**
1. Check `~/.claude/settings.json` has PreToolUse hook configured
2. Verify hook path is absolute and correct
3. Check log file for errors: `~/.claude/logs/YYYY-MM-DD-pretooluse.log`
4. Ensure timeout is sufficient (5000ms recommended)

**False Positives (Blocking Allowed Operations):**
1. Verify configuration paths in CLAUDE.md/config.md
2. Check cache (5-minute TTL) - may need to wait for cache refresh
3. Ensure file paths are relative (not absolute with full project root)

**PM Role Not Detected:**
1. Hook looks for `@PM` in context.role or conversation text
2. Ensure PM role is explicitly mentioned in conversation
3. Check log file to see what context was received

## Exit Codes

- **Exit 0**: Operation allowed, continue
- **Exit 1**: Operation blocked, show error message
- **No timeout**: Hook should complete in <100ms typically

## Related Documentation

- Story: `stories/STORY-005-pretooluse-blocking-hook-2025-10-03.md`
- Configuration: `src/behaviors/directory-structure.md`
- PM Role: `src/behaviors/story-breakdown.md`
