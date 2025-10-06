#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-stop.log`);

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
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    let hookInput;
    try {
      hookInput = JSON.parse(inputData);
    } catch (error) {
      log(`JSON parse error: ${error.message}`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const session_id = hookInput.session_id;
    const markerFile = path.join(os.homedir(), '.claude', 'tmp', `agent-executing-${session_id}`);

    // Delete agent marker file on session stop
    if (fs.existsSync(markerFile)) {
      try {
        fs.unlinkSync(markerFile);
        log(`Agent marker deleted on session stop: ${markerFile}`);
      } catch (error) {
        log(`Failed to delete agent marker: ${error.message}`);
      }
    } else {
      log(`Agent marker not found on session stop: ${markerFile}`);
    }

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
