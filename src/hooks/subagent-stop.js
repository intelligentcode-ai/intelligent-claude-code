#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-subagent-stop.log`);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  function atomicReadMarker(markerFile) {
    try {
      if (!fs.existsSync(markerFile)) {
        return null;
      }
      const content = fs.readFileSync(markerFile, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      log(`Failed to read marker: ${error.message}`);
      return null;
    }
  }

  function atomicWriteMarker(markerFile, data, retries = 5) {
    for (let i = 0; i < retries; i++) {
      try {
        const tempFile = `${markerFile}.tmp.${Date.now()}.${Math.random()}`;
        fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
        fs.renameSync(tempFile, markerFile);
        return true;
      } catch (error) {
        if (i === retries - 1) {
          log(`Failed to write marker after ${retries} retries: ${error.message}`);
          return false;
        }
        const delay = Math.pow(2, i) * 10;
        const end = Date.now() + delay;
        while (Date.now() < end) {}
      }
    }
    return false;
  }

  function decrementAgentCount(markerFile, session_id) {
    const marker = atomicReadMarker(markerFile);

    if (!marker || marker.agents.length === 0) {
      log(`No agents to decrement for session ${session_id}`);
      return false;
    }

    const removed = marker.agents.pop();
    marker.agent_count = marker.agents.length;

    log(`Decremented agent count: ${marker.agent_count} (removed ${removed.tool_invocation_id})`);

    if (marker.agent_count === 0) {
      try {
        fs.unlinkSync(markerFile);
        log(`All agents completed - marker file deleted`);
        return true;
      } catch (error) {
        log(`Failed to delete marker: ${error.message}`);
        return false;
      }
    } else {
      return atomicWriteMarker(markerFile, marker);
    }
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

    if (fs.existsSync(markerFile)) {
      decrementAgentCount(markerFile, session_id);
    } else {
      log(`Agent marker not found (already deleted or never created): ${markerFile}`);
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
