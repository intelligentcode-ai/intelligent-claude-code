#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');
const { generateProjectHash } = require('./lib/hook-helpers');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('subagent-stop');

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
    suppressOutput: false
  };

  try {
    // hookInput already parsed earlier for logging
    if (!hookInput) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const session_id = hookInput.session_id;

    // CRITICAL FIX: Include project hash to match agent-marker.js filename format
    // Without hash, decrement fails to find marker file and count stays stale
    // This caused PM constraints bypass when marker showed 23 agents as "active"
    const projectHash = generateProjectHash(hookInput);

    // Use project-specific marker filename matching agent-marker.js
    const markerFile = path.join(os.homedir(), '.claude', 'tmp', `agent-executing-${session_id}-${projectHash}`);

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
