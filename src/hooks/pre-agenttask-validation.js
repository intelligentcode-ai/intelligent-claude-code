#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('pre-agenttask-validation');

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
    // hookInput already parsed earlier for logging
    if (!hookInput) {
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

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
        log('[WARNING] No Grep usage detected before Task tool invocation - consider searching memory/ for patterns');
        log('[INFO] Memory-first approach is guidance, not absolute gate - allowing AgentTask creation');
        // Allow operation - memory might not exist yet for this work domain
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }

      // Verify Grep accessed memory/ directory
      const memoryAccessed = checkMemoryAccess(recentGrep);

      if (!memoryAccessed) {
        log(`[WARNING] Grep detected but did not access memory/ directory - current path: ${recentGrep.parameters.path || 'unknown'}`);
        log('[INFO] Consider searching memory/ for relevant patterns when available');
        // Allow operation - Grep might be searching elsewhere appropriately
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }

      // Memory search compliance verified
      log(`[INFO] Memory search detected: Grep accessed ${recentGrep.parameters.path}`);
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
