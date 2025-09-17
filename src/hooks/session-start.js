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
    // Load actual CLAUDE.md content for proper initialization
    const claudeMdPath = path.join(os.homedir(), '.claude', 'CLAUDE.md');
    let sessionContext = '';

    // Try to load CLAUDE.md content
    if (fs.existsSync(claudeMdPath)) {
      const claudeMdContent = fs.readFileSync(claudeMdPath, 'utf8');
      // Provide the full CLAUDE.md content as initialization
      sessionContext = claudeMdContent;
    } else {
      // Fallback to essential context if CLAUDE.md not found
      sessionContext = [
        '🚀 Intelligent Claude Code System',
        '',
        '## Core Architecture',
        '• Virtual Team: 14 core roles + unlimited specialists',
        '• Work Flow: User Request → AgentTask → Task Tool → Agent',
        '• NO WORK IN MAIN SCOPE - all work via agents',
        '',
        '## Primary Pattern',
        '• Use @Role communication for natural team interaction',
        '• Memory-first approach - check memory before asking',
        '• AgentTasks must be self-contained with all context'
      ].join('\n');
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