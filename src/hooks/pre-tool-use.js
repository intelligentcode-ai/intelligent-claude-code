#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const ReminderLoader = require('./lib/reminder-loader');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-pre-tool-use.log`);

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

    // Generate educational reminder
    const reminderLoader = new ReminderLoader();
    const reminder = reminderLoader.getPreExecutionReminder();

    const output = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        additionalContext: reminder
      }
    };

    log(JSON.stringify(output));
    process.exit(0);

  } catch (error) {
    log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}