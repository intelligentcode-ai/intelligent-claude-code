#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-session-start.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    // Load the full system context from icc-init-system command
    // This provides CLAUDE.md content, configuration, and initial guidance
    const initCommand = path.join(os.homedir(), '.claude', 'commands', 'icc-init-system.md');

    let sessionContext = '🚀 Intelligent Claude Code System Initialized\\n';

    // Check if init command exists and is readable
    if (fs.existsSync(initCommand)) {
      // Note: In production, this would trigger the actual command
      // For now, we provide the essential context
      sessionContext += '📋 Run /icc-init-system to load full project context and CLAUDE.md\\n';
      sessionContext += '🎯 Use @Role patterns for natural team interaction\\n';
      sessionContext += '🧠 Memory-first approach - check memory before asking users\\n';
      sessionContext += '🚫 NO WORK IN MAIN SCOPE - all work via AgentTask → Task → Agent';
    }

    const output = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: sessionContext
      }
    };

    log(JSON.stringify(output));
    console.log(JSON.stringify(output));
    process.exit(0);

  } catch (error) {
    log(JSON.stringify(standardOutput));
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}