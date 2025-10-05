#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-project-scope-enforcement.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function cleanOldLogs(logDir) {
    try {
      const files = fs.readdirSync(logDir);
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      for (const file of files) {
        if (!file.endsWith('.log')) continue;

        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);

        if (now - stats.mtimeMs > maxAge) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (error) {
      // Silent fail - don't block hook execution
    }
  }

  // Clean old logs at hook start
  cleanOldLogs(logDir);

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  function isInstallationPath(filePath) {
    const homedir = os.homedir();
    const claudeDir = path.join(homedir, '.claude');
    const absolutePath = path.resolve(filePath);

    // Check if path is within ~/.claude/
    return absolutePath.startsWith(claudeDir + path.sep) || absolutePath === claudeDir;
  }

  function isAllowedException(filePath) {
    const homedir = os.homedir();
    const allowedPath = path.join(homedir, '.claude', 'CLAUDE.md');
    const absolutePath = path.resolve(filePath);

    return absolutePath === allowedPath;
  }

  function isModifyingBashCommand(command) {
    // Block bash commands that modify ~/.claude/
    const modifyingCommands = ['rm', 'mv', 'cp', 'touch', 'mkdir', 'rmdir'];
    const firstWord = command.trim().split(/\s+/)[0];

    // Check if command is a modifying command
    if (!modifyingCommands.includes(firstWord)) {
      return false;
    }

    // Check if command references ~/.claude/ directory
    const homedir = os.homedir();
    const claudeDir = path.join(homedir, '.claude');

    return command.includes('~/.claude') || command.includes(claudeDir);
  }

  try {
    // Parse input from multiple sources
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        inputData = fs.readFileSync(0, 'utf8');
      } catch (stdinError) {
        log(`WARN: Failed to read stdin: ${stdinError.message} - allowing operation`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    const hookInput = JSON.parse(inputData);
    log(`Project scope enforcement triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool and parameters
    const tool = hookInput.tool_name || hookInput.tool || '';
    const toolInput = hookInput.tool_input || hookInput.parameters || {};
    const filePath = toolInput.file_path || '';
    const command = toolInput.command || '';

    if (!tool) {
      log('No tool specified - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    log(`Tool: ${tool}, FilePath: ${filePath}, Command: ${command}`);

    // Check file operations (Edit/Write/MultiEdit)
    if (filePath && (tool === 'Edit' || tool === 'Write' || tool === 'MultiEdit')) {
      if (isInstallationPath(filePath)) {
        // Check if this is an allowed exception
        if (isAllowedException(filePath)) {
          log(`Installation path access ALLOWED (exception): ${filePath}`);
          console.log(JSON.stringify({ continue: true }));
          process.exit(0);
        }

        // Block the operation
        log(`Installation path modification BLOCKED: ${filePath}`);
        const response = {
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: `🚫 Installation directory is protected - work within project scope only

Blocked: ${filePath}
Protected: ~/.claude/ directory (system installation)
Allowed: ~/.claude/CLAUDE.md (user configuration)

All work must be done within project directories:
- Project templates and source files
- Project documentation and memory
- Project-specific configurations

Installation updates happen via 'make install' from project source.`
          }
        };
        const responseJson = JSON.stringify(response);
        log(`RESPONSE: ${responseJson}`);
        log(`EXIT CODE: 2`);
        console.log(responseJson);
        process.exit(2);
      }
    }

    // Check Bash commands
    if (tool === 'Bash' && command) {
      if (isModifyingBashCommand(command)) {
        log(`Bash command modifying installation BLOCKED: ${command}`);
        const response = {
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: `🚫 Installation directory is protected - work within project scope only

Blocked command: ${command}
Protected: ~/.claude/ directory (system installation)

All work must be done within project directories:
- Project templates and source files
- Project documentation and memory
- Project-specific configurations

Installation updates happen via 'make install' from project source.`
          }
        };
        const responseJson = JSON.stringify(response);
        log(`RESPONSE: ${responseJson}`);
        log(`EXIT CODE: 2`);
        console.log(responseJson);
        process.exit(2);
      }
    }

    // Allow operation
    log('Operation allowed');
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
