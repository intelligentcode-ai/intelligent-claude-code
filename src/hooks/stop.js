#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('stop');

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    // hookInput already parsed earlier for logging
    if (!hookInput) {
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
