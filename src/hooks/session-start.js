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
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    } else {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify(standardOutput));
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
        '🔄 CONTEXT COMPACTION DETECTED - VIRTUAL TEAM SYSTEM LOST!',
        '',
        '⚠️ Session was continued/summarized - complete context NOT loaded',
        '🚨 MANDATORY: Read ~/.claude/modes/virtual-team.md or .claude/modes/virtual-team.md and ALL referenced files!',
        '',
        '❌ @Role patterns + AgentTask-Templates NOT loaded',
        '🧠 Memory-first approach and best-practices patterns NOT active',
        '🛑 System must be reloaded from disk before proceeding with work'
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
