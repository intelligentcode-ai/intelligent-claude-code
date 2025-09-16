# Ansible Hook Deployment Analysis for Windows PowerShell Implementation

## Executive Summary

This analysis documents the Ansible-based hook deployment system used by intelligent-claude-code to enable PowerShell-equivalent implementation for Windows environments. The system deploys behavioral enforcement hooks that integrate with Claude Code's pre-tool-use framework to ensure architectural compliance.

## 1. Ansible Deployment Architecture

### 1.1 Primary Deployment Files

**Main Deployment (`ansible/install.yml`)**:
- Controls overall installation workflow
- Determines installation scope (user vs project)
- Handles MCP server integration
- Sets installation target paths dynamically

**Role Definition (`ansible/roles/intelligent-claude-code/tasks/main.yml`)**:
- Creates complete directory structure (.claude/hooks/, .claude/logs/, etc.)
- Deploys all system components (behaviors, agents, templates)
- Handles existing CLAUDE.md preservation and integration
- Manages hook registration via settings.json

**Graceful Integration (`ansible/roles/intelligent-claude-code/tasks/graceful_integration.yml`)**:
- Preserves existing CLAUDE.md content
- Adds virtual team import line non-destructively
- Maintains user project configurations

### 1.2 Installation Scope Detection

```yaml
# Scope determination logic
target_scope: "{{ 'project' if (target_path | default('')) else 'user' }}"
install_path: "{{ ((target_path | default('')) | realpath) + '/.claude' if (target_path | default('')) else ansible_env.HOME + '/.claude' }}"
```

**User Scope**: `~/.claude/` (global installation)
**Project Scope**: `{project_path}/.claude/` (project-specific)

## 2. Hook Registration System

### 2.1 settings.json Structure

**Fresh Installation Template** (`ansible/roles/intelligent-claude-code/templates/settings.json.j2`):
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "node {{ claude_install_path }}/hooks/pre-tool-use.js",
        "timeout": 15000,
        "failureMode": "allow"
      }]
    }]
  }
}
```

**Merge Process for Existing Installations**:
1. Read existing settings.json content
2. Parse JSON and preserve all current settings
3. Merge hooks section using Ansible `combine()` with `recursive=True`
4. Write merged configuration back to settings.json

### 2.2 Hook Configuration Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `matcher` | `"*"` | Match all tool invocations |
| `type` | `"command"` | Execute shell command |
| `command` | `"node {path}/pre-tool-use.js"` | Node.js hook executable |
| `timeout` | `15000` | 15-second timeout |
| `failureMode` | `"allow"` | Fail-open to prevent Claude breakage |

## 3. Directory Structure Creation

### 3.1 Required Directories

```yaml
# Directory structure (mode 0755)
- "{{ claude_install_path }}"                 # Root installation
- "{{ claude_install_path }}/modes"           # Virtual team modes
- "{{ claude_install_path }}/behaviors"       # Behavioral patterns
- "{{ claude_install_path }}/commands"        # Essential commands
- "{{ claude_install_path }}/roles"           # Agent role definitions
- "{{ claude_install_path }}/agents"          # Agent implementations
- "{{ claude_install_path }}/agenttask-templates" # PRB templates
- "{{ claude_install_path }}/hooks"           # Hook system
- "{{ claude_install_path }}/logs"            # Violation logs
```

### 3.2 File Permissions

- **Directories**: `0755` (rwxr-xr-x)
- **Hook Scripts**: `0755` (executable)
- **Configuration Files**: `0644` (rw-r--r--)
- **Other Files**: `0644` (rw-r--r--)

## 4. Hook Implementation Components

### 4.1 Core Hook Components

**Main Hook Script** (`src/hooks/pre-tool-use.js`):
- Input validation and JSON parsing
- Memory enforcement checking
- Intent classification via lib/intent-classifier.js
- Configuration loading via lib/config-loader.js
- Violation logging with project/user scope detection
- Performance monitoring (<10ms target)

**Intent Classifier** (`src/hooks/lib/intent-classifier.js`):
- Categorizes tool usage into: research, qa, planning, work
- Pattern matching for work verbs and tool combinations
- Context analysis for @Role mentions and file paths
- Confidence scoring and threshold-based decisions

**Configuration Loader** (`src/hooks/lib/config-loader.js`):
- Schema validation with fallback defaults
- Environment variable overrides
- File watching for hot-reload capability
- Pattern matching for tools, parameters, and paths

### 4.2 Configuration Files

**Intent Patterns** (`src/hooks/config/intent-patterns.json`):
- Tool allowances by intent type
- Parameter and path pattern matching
- Enforcement actions (allow, warn, block, require_prb_context)
- Schema validation structure

**Claude Settings** (`src/hooks/config/claude-settings.json`):
- Hook registration template
- Installation instructions
- Performance targets and logging configuration

## 5. Memory Enforcement System

### 5.1 Memory Search Detection

```javascript
// Memory search window (5 minutes)
memorySearchWindow: 5 * 60 * 1000

// Memory search indicators in logs
- entry.tool === 'Read' && (parameters?.includes('memory'))
- entry.tool === 'Bash' && context?.includes('memory search')
```

### 5.2 Violation Logging

**Log Directory Resolution**:
```javascript
// Project scope (when CLAUDE_PROJECT_DIR set)
path.join(process.env.CLAUDE_PROJECT_DIR, '.claude', 'logs')

// User scope fallback
path.join(process.env.HOME || '/tmp', '.claude', 'logs')
```

**Log Format**:
```json
{
  "timestamp": "2025-01-16T10:30:00.000Z",
  "tool": "Write",
  "intent": "work",
  "confidence": 0.85,
  "reason": "File modification detected",
  "parameters": ["file_path"],
  "context": ["AgentTask creation detected"],
  "violation_type": "memory_enforcement"
}
```

## 6. PowerShell Implementation Requirements

### 6.1 Core Translation Requirements

**PowerShell Script Structure**:
- Replace Node.js with PowerShell Core (pwsh.exe)
- Maintain same JSON input/output interface
- Implement equivalent performance monitoring
- Preserve fail-open behavior for system stability

**Command Registration**:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "pwsh.exe -ExecutionPolicy Bypass -File {install_path}\\hooks\\PreToolUse.ps1",
        "timeout": 15000,
        "failureMode": "allow"
      }]
    }]
  }
}
```

### 6.2 Directory Structure Mapping

**Windows Path Translations**:
- `~/.claude/` → `$env:USERPROFILE\.claude\`
- `/tmp/.claude/` → `$env:TEMP\.claude\`
- Unix permissions → Windows ACLs/attributes

**PowerShell Directory Creation**:
```powershell
$installPath = "$env:USERPROFILE\.claude"
@('hooks', 'logs', 'config', 'lib') | ForEach-Object {
    $dir = Join-Path $installPath $_
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
    }
}
```

### 6.3 Intent Classification Translation

**PowerShell Equivalents**:
- JavaScript regex → PowerShell `-match` operators
- JSON parsing → `ConvertFrom-Json` / `ConvertTo-Json`
- File I/O → `Get-Content` / `Set-Content`
- Performance timing → `Measure-Command`

**Work Verb Detection**:
```powershell
$workVerbs = @('fix', 'change', 'update', 'modify', 'create', 'delete', 'deploy', 'install')
$hasWorkIntent = $workVerbs -contains $verb
```

### 6.4 Configuration Management

**PowerShell Configuration Loading**:
```powershell
# Load intent patterns configuration
$configPath = Join-Path $PSScriptRoot "config\intent-patterns.json"
$config = Get-Content $configPath | ConvertFrom-Json

# Environment overrides
if ($env:HOOK_DEBUG_MODE) {
    $config.overrides.debug_mode = [bool]::Parse($env:HOOK_DEBUG_MODE)
}
```

### 6.5 Memory Enforcement Implementation

**PowerShell Log Analysis**:
```powershell
# Read violation logs for memory search detection
$logPath = "$env:USERPROFILE\.claude\logs\violations-$(Get-Date -Format 'yyyy-MM-dd').log"
if (Test-Path $logPath) {
    $logs = Get-Content $logPath | ForEach-Object { $_ | ConvertFrom-Json }
    $recentMemorySearch = $logs | Where-Object {
        $_.timestamp -gt (Get-Date).AddMinutes(-5) -and
        ($_.tool -eq 'Read' -and $_.parameters -contains 'memory')
    }
}
```

### 6.6 Error Handling and Logging

**PowerShell Error Management**:
```powershell
try {
    # Hook processing logic
    $result = @{
        allowed = $true
        message = "Action allowed"
        performance = $executionTime
    }
}
catch {
    # Fail open behavior
    $result = @{
        allowed = $true
        message = "System error (failing open): $($_.Exception.Message)"
        performance = $executionTime
    }
}

# Output for Claude Code
$result | ConvertTo-Json -Compress | Write-Output
```

## 7. Performance and Reliability Requirements

### 7.1 Performance Targets

- **Target Execution Time**: <10ms total
- **Maximum Timeout**: 15 seconds
- **Performance Monitoring**: Log warnings when threshold exceeded
- **Memory Usage**: Minimal footprint to avoid Claude impact

### 7.2 Reliability Features

- **Fail-Open Behavior**: Always allow action on system errors
- **Input Validation**: Robust JSON parsing with error handling
- **Graceful Degradation**: Continue operation with reduced functionality
- **Log Rotation**: Daily log files with manual cleanup

## 8. Security Considerations

### 8.1 Execution Security

- **Script Execution**: PowerShell ExecutionPolicy bypass required
- **Path Security**: Validate all file paths to prevent traversal attacks
- **Input Sanitization**: Clean all user-provided input before processing
- **Privilege Escalation**: Run with minimal required privileges

### 8.2 Configuration Security

- **File Permissions**: Restrict hook script modification to administrators
- **Log Security**: Protect violation logs from unauthorized access
- **JSON Parsing**: Validate JSON structure before processing
- **Memory Safety**: Prevent sensitive data exposure in logs

## 9. Implementation Recommendations

### 9.1 PowerShell Module Structure

```
$env:USERPROFILE\.claude\hooks\
├── PreToolUse.ps1              # Main hook script
├── lib\
│   ├── IntentClassifier.psm1   # Intent classification module
│   ├── ConfigLoader.psm1       # Configuration management
│   └── Logger.psm1             # Violation logging
├── config\
│   ├── intent-patterns.json    # Same as Node.js version
│   └── claude-settings.json    # Same as Node.js version
└── tests\
    └── PreToolUse.Tests.ps1    # Pester tests
```

### 9.2 Development Approach

1. **Direct Translation**: Maintain functional parity with Node.js implementation
2. **PowerShell Idioms**: Use native PowerShell patterns where appropriate
3. **Testing Strategy**: Implement comprehensive Pester test suite
4. **Performance Optimization**: Profile and optimize critical paths
5. **Documentation**: Create PowerShell-specific installation guide

## Conclusion

The Ansible hook deployment system provides a comprehensive framework for behavioral enforcement in Claude Code. The PowerShell implementation should maintain identical functionality while leveraging native Windows capabilities. Key success factors include preserving the fail-open behavior, maintaining sub-10ms performance, and ensuring robust error handling across all Windows environments.