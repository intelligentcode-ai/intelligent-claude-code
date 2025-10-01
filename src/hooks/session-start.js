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
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        const stdinBuffer = fs.readFileSync(0, 'utf8');
        if (stdinBuffer && stdinBuffer.trim()) {
          inputData = stdinBuffer;
        }
      } catch (error) {
        log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    } else {
      log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    if (!inputData.trim()) {
      log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    let claudeInput;
    try {
      claudeInput = JSON.parse(inputData);
    } catch (error) {
      log(`JSON parse error: ${error.message}`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Get session reason from input
    const reason = claudeInput.reason || '';

    log(`SessionStart triggered with reason: ${reason}`);

    // Detect context compaction or session resumption
    if (reason === 'compact' || reason === 'resume') {
      const guidance = [
        '🔄 Session Continuation Detected',
        '',
        'Virtual team system requires re-initialization after context compaction.',
        'Run /icc-init-system to restore @Role patterns and AgentTask templates.',
        '',
        'System capabilities reactivated:',
        '  • @Role communication patterns',
        '  • AgentTask-driven execution',
        '  • Memory-first approach',
        '  • Best-practices integration',
        '  • Educational reminder system'
      ].join('\n');

      const output = {
        continue: true,
        suppressOutput: true,
        hookSpecificOutput: {
          hookEventName: "SessionStart",
          additionalContext: guidance
        }
      };

      log(`Compaction detected - injecting restoration guidance`);
      console.log(JSON.stringify(output));
      process.exit(0);
    }

    // Normal session start - no guidance needed
    log(`Normal session start - no action required`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
