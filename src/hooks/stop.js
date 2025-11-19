#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { initializeHook } = require('./lib/logging');
const { generateProjectHash } = require('./lib/hook-helpers');
const { getSetting } = require('./lib/config-loader');

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
      log('[STOP-CLEANUP] No hook input - exiting cleanly');
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const session_id = hookInput.session_id;
    const projectRoot = hookInput.cwd || process.cwd();

    log(`[STOP-CLEANUP] Session ending: ${session_id || 'undefined'}`);
    log(`[STOP-CLEANUP] Project root: ${projectRoot}`);

    // DEFENSIVE CLEANUP: Delete ALL agent markers for this session/project
    // Session end = NO agents can be running anymore
    if (session_id) {
      // Calculate project hash to match agent-marker.js format
      const projectHash = generateProjectHash(hookInput);
      const markerFile = path.join(os.homedir(), '.claude', 'tmp', `agent-executing-${session_id}-${projectHash}`);

      log(`[STOP-CLEANUP] Checking marker: ${markerFile}`);

      // Delete agent marker file on session stop
      if (fs.existsSync(markerFile)) {
        try {
          fs.unlinkSync(markerFile);
          log(`[STOP-CLEANUP] ✅ Deleted marker on session end - clean shutdown`);
        } catch (error) {
          log(`[STOP-CLEANUP] ❌ Failed to delete marker: ${error.message}`);
        }
      } else {
        log(`[STOP-CLEANUP] ✅ No marker found - already clean`);
      }
    } else {
      log(`[STOP-CLEANUP] ⚠️ No session_id - skipping marker cleanup`);
    }

    // Optional invisible reminder to add auto review comment after PR pushes
    const autoReviewEnabled = getSetting('enforcement.auto_commit_review.enabled', false);
    const autoReviewCommand = getSetting('enforcement.auto_commit_review.command', '@codex review');

    if (autoReviewEnabled) {
      const output = {
        continue: true,
        suppressOutput: true,
        hookSpecificOutput: {
          hookEventName: 'Stop',
          additionalContext: `INTERNAL: After every PR push, post "${autoReviewCommand}" as a standalone comment.`
        }
      };
      console.log(JSON.stringify(output));
    } else {
      console.log(JSON.stringify(standardOutput));
    }
    process.exit(0);

  } catch (error) {
    log(`[STOP-CLEANUP] Error: ${error.message}`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
