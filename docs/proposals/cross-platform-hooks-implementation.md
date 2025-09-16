# Cross-Platform Hook Implementation Strategy

## Challenge: OS Compatibility for Behavioral Enforcement Hooks

### Platform-Specific Issues

**Current Problem with Shell Scripts**:
- **Linux/macOS**: Bash scripts work natively
- **Windows**: No native bash support (without WSL/Git Bash/Cygwin)
- **Windows CMD/PowerShell**: Different syntax, different tools
- **Path separators**: `/` vs `\`
- **Tool availability**: `jq` not native on Windows

## Solution Approaches

### Option 1: Node.js-Based Hooks (RECOMMENDED)
**Best cross-platform solution using JavaScript**

**Advantages**:
- Claude Code already requires Node.js
- Single codebase for all platforms
- Native JSON parsing (no jq needed)
- Consistent behavior across OS
- Easy to test and maintain

**Implementation**:
```javascript
#!/usr/bin/env node
// .claude/hooks/pre-tool-use.js

const fs = require('fs');
const path = require('path');

// Read stdin for tool data
let inputData = '';
process.stdin.on('data', chunk => {
    inputData += chunk;
});

process.stdin.on('end', () => {
    try {
        const input = JSON.parse(inputData);
        const result = enforceRules(input);
        
        if (result.blocked) {
            console.error(result.message);
            process.exit(2); // Block execution
        }
        
        process.exit(0); // Allow execution
    } catch (error) {
        console.error('Hook error:', error.message);
        process.exit(1); // Error - allow by default
    }
});

function enforceRules(input) {
    const tool = input.tool;
    const context = input.context || {};
    
    // Main scope blocking
    if (context.scope === 'main' && isWorkTool(tool)) {
        return {
            blocked: true,
            message: '❌ BLOCKED: Main scope cannot execute work directly\n' +
                    '📋 Required: Generate PRB using @Role pattern first'
        };
    }
    
    // PM role blocking
    if (context.role === 'PM' && isTechnicalTool(tool)) {
        return {
            blocked: true,
            message: '❌ BLOCKED: PM role is COORDINATION ONLY\n' +
                    '🚫 PM cannot use: Edit, Write, MultiEdit tools'
        };
    }
    
    return { blocked: false };
}

function isWorkTool(tool) {
    const workTools = ['Edit', 'Write', 'MultiEdit', 'NotebookEdit'];
    return workTools.includes(tool);
}

function isTechnicalTool(tool) {
    const technicalTools = ['Edit', 'Write', 'MultiEdit', 'Bash'];
    return technicalTools.includes(tool);
}
```

**Settings.json Configuration**:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/hooks/pre-tool-use.js"
          }
        ]
      }
    ]
  }
}
```

### Option 2: Python-Based Hooks
**Good compatibility, requires Python**

**Advantages**:
- Python widely available
- Good JSON support
- Works on all platforms
- Can use same code everywhere

**Implementation**:
```python
#!/usr/bin/env python3
# .claude/hooks/pre-tool-use.py

import sys
import json

def main():
    try:
        # Read input from stdin
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        
        # Enforce rules
        result = enforce_rules(data)
        
        if result['blocked']:
            print(result['message'], file=sys.stderr)
            sys.exit(2)  # Block
        
        sys.exit(0)  # Allow
        
    except Exception as e:
        print(f"Hook error: {e}", file=sys.stderr)
        sys.exit(1)  # Error - allow by default

def enforce_rules(data):
    tool = data.get('tool', '')
    context = data.get('context', {})
    
    # Main scope blocking
    if context.get('scope') == 'main' and is_work_tool(tool):
        return {
            'blocked': True,
            'message': '❌ BLOCKED: Main scope cannot execute work directly\n'
                      '📋 Required: Generate PRB using @Role pattern first'
        }
    
    # PM role blocking  
    if context.get('role') == 'PM' and is_technical_tool(tool):
        return {
            'blocked': True,
            'message': '❌ BLOCKED: PM role is COORDINATION ONLY\n'
                      '🚫 PM cannot use: Edit, Write, MultiEdit tools'
        }
    
    return {'blocked': False}

def is_work_tool(tool):
    work_tools = ['Edit', 'Write', 'MultiEdit', 'NotebookEdit']
    return tool in work_tools

def is_technical_tool(tool):
    technical_tools = ['Edit', 'Write', 'MultiEdit', 'Bash']
    return tool in technical_tools

if __name__ == '__main__':
    main()
```

### Option 3: Compiled Binary Hooks
**Using Go for single binary distribution**

**Advantages**:
- Single binary per platform
- No runtime dependencies
- Fast execution
- Can pre-compile for all platforms

**Implementation**:
```go
// pre-tool-use.go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "os"
)

type Input struct {
    Tool    string                 `json:"tool"`
    Context map[string]interface{} `json:"context"`
    Params  map[string]interface{} `json:"parameters"`
}

func main() {
    // Read stdin
    data, err := ioutil.ReadAll(os.Stdin)
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
        os.Exit(1)
    }
    
    var input Input
    if err := json.Unmarshal(data, &input); err != nil {
        fmt.Fprintf(os.Stderr, "Error parsing JSON: %v\n", err)
        os.Exit(1)
    }
    
    // Enforce rules
    if blocked, message := enforceRules(input); blocked {
        fmt.Fprintln(os.Stderr, message)
        os.Exit(2) // Block
    }
    
    os.Exit(0) // Allow
}

func enforceRules(input Input) (bool, string) {
    // Main scope blocking
    if input.Context["scope"] == "main" && isWorkTool(input.Tool) {
        return true, "❌ BLOCKED: Main scope cannot execute work directly\n" +
                    "📋 Required: Generate PRB using @Role pattern first"
    }
    
    // PM role blocking
    if input.Context["role"] == "PM" && isTechnicalTool(input.Tool) {
        return true, "❌ BLOCKED: PM role is COORDINATION ONLY\n" +
                    "🚫 PM cannot use: Edit, Write, MultiEdit tools"
    }
    
    return false, ""
}
```

**Build for all platforms**:
```bash
# Build script
GOOS=darwin GOARCH=amd64 go build -o pre-tool-use-macos
GOOS=linux GOARCH=amd64 go build -o pre-tool-use-linux  
GOOS=windows GOARCH=amd64 go build -o pre-tool-use.exe
```

### Option 4: Platform Detection with Fallbacks
**Hybrid approach with multiple implementations**

**Installer Script**:
```javascript
// install-hooks.js
const os = require('os');
const fs = require('fs');
const path = require('path');

function installHooks() {
    const platform = os.platform();
    const hookDir = path.join(os.homedir(), '.claude', 'hooks');
    
    // Ensure directory exists
    fs.mkdirSync(hookDir, { recursive: true });
    
    // Determine best hook implementation
    let hookCommand;
    
    // Try Node.js first (most universal)
    if (commandExists('node')) {
        copyNodeHooks(hookDir);
        hookCommand = 'node ~/.claude/hooks/pre-tool-use.js';
    }
    // Fall back to Python
    else if (commandExists('python3') || commandExists('python')) {
        copyPythonHooks(hookDir);
        const pythonCmd = commandExists('python3') ? 'python3' : 'python';
        hookCommand = `${pythonCmd} ~/.claude/hooks/pre-tool-use.py`;
    }
    // Use pre-compiled binary as last resort
    else {
        copyBinaryHook(hookDir, platform);
        hookCommand = platform === 'win32' 
            ? '~\\.claude\\hooks\\pre-tool-use.exe'
            : '~/.claude/hooks/pre-tool-use';
    }
    
    // Update settings.json
    updateSettings(hookCommand);
}

function commandExists(cmd) {
    try {
        const { execSync } = require('child_process');
        execSync(`which ${cmd}`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}
```

## Recommended Implementation Strategy

### 1. Primary: Node.js Hooks
**Rationale**:
- Claude Code requires Node.js anyway
- Single codebase for all platforms
- Easiest to maintain and test
- Good performance
- Native JSON handling

### 2. Fallback: Python Hooks
**For environments where Node might be restricted**:
- Secondary implementation
- Same logic as Node version
- Auto-detected during installation

### 3. Installation Process
```javascript
// Smart installer that detects platform
npm install -g intelligent-claude-hooks

// Or manual installation
npx intelligent-claude-hooks install
```

### 4. Testing Strategy
**Cross-platform test suite**:
```javascript
// test-hooks.js
const { spawn } = require('child_process');
const os = require('os');

describe('Hook Compatibility', () => {
    test('Works on current platform', async () => {
        const platform = os.platform();
        const hookPath = getHookPath(platform);
        
        const result = await runHook(hookPath, {
            tool: 'Edit',
            context: { scope: 'main' }
        });
        
        expect(result.exitCode).toBe(2);
        expect(result.stderr).toContain('BLOCKED');
    });
});
```

## Platform-Specific Considerations

### Windows
- Use Node.js or Python (both common on developer machines)
- Avoid shell scripts entirely
- Handle path separators in code
- Consider Windows Defender/antivirus impact

### macOS
- Node.js works perfectly
- Handle macOS security (codesigning for binaries)
- Consider Gatekeeper restrictions

### Linux
- Most flexible platform
- Node.js universally available
- Consider various distributions

## Final Recommendation

**Use Node.js-based hooks as primary implementation**:

1. **Universal Compatibility**: Works on all platforms where Claude Code runs
2. **Single Codebase**: One implementation to maintain
3. **Easy Testing**: Can test on all platforms with same code
4. **Good Performance**: Fast enough for hook requirements
5. **Simple Installation**: npm package can handle platform detection

**Implementation Path**:
1. Develop Node.js hook implementation
2. Create npm package for easy installation
3. Add Python fallback for edge cases
4. Test on all three platforms
5. Provide clear documentation

This approach ensures maximum compatibility while minimizing maintenance burden.

---
*Cross-platform strategy documented: 2025-09-07*