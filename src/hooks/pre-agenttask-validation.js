#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-pre-agenttask-validation.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  function checkToolHistory(targetTool, recentTools) {
    // Check recent tool history for specific tool usage
    if (!recentTools || !Array.isArray(recentTools)) {
      return false;
    }

    for (const tool of recentTools) {
      if (tool.name === targetTool) {
        return tool;
      }
    }
    return false;
  }

  function checkMemoryAccess(grepTool) {
    // Verify Grep accessed memory/ directory
    if (!grepTool || !grepTool.parameters) {
      return false;
    }

    const path = grepTool.parameters.path || '';

    // Check if path includes memory directory
    if (path.includes('memory/') || path === 'memory') {
      return true;
    }

    return false;
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
    log(`Pre-AgentTask validation triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool and parameters
    const tool = hookInput.tool_name || hookInput.tool || '';
    const toolHistory = hookInput.recent_tools || [];

    if (!tool) {
      log('No tool specified - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Check if Task tool is being invoked (AgentTask creation)
    if (tool === 'Task') {
      log('Task tool detected - checking for memory search compliance');

      // Check recent tool history for Grep usage
      const recentGrep = checkToolHistory('Grep', toolHistory);

      if (!recentGrep) {
        log('BLOCKED: No Grep usage detected before Task tool invocation');
        const response = {
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: `🚫 Memory search required before AgentTask creation

BLOCKED: Task tool invocation without prior memory search

REQUIREMENT: Use Grep to search memory/ for relevant patterns before creating AgentTask

Example memory searches:
  - Grep pattern="authentication" path="memory"
  - Grep pattern="implementation" path="memory/debugging"
  - Grep pattern="error handling" path="memory/[work_domain]"

REASON: Memory-first approach ensures agents benefit from stored patterns and previous learnings.

See: memory-enforcement-patterns.md for complete guidance`
          }
        };
        console.log(JSON.stringify(response));
        process.exit(2);
      }

      // Verify Grep accessed memory/ directory
      const memoryAccessed = checkMemoryAccess(recentGrep);

      if (!memoryAccessed) {
        log('BLOCKED: Grep detected but did not access memory/ directory');
        const response = {
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: `🚫 Memory search must access memory/ directory

BLOCKED: Grep usage detected but did not search memory/

REQUIREMENT: Grep must search within memory/ directory for patterns

Current Grep path: ${recentGrep.parameters.path || 'unknown'}
Required path pattern: memory/ or memory/[topic]/

Example correct searches:
  - Grep pattern="authentication" path="memory"
  - Grep pattern="debugging" path="memory/implementation"

REASON: AgentTask context requires memory patterns from memory/ directory.

See: memory-enforcement-patterns.md for complete guidance`
          }
        };
        console.log(JSON.stringify(response));
        process.exit(2);
      }

      // Memory search compliance verified
      log(`Memory search compliance verified: Grep accessed ${recentGrep.parameters.path}`);
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Allow other operations
    log('Operation allowed - not Task tool invocation');
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
