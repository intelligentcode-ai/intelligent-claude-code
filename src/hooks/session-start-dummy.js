#!/usr/bin/env node

/**
 * SESSION-START HOOK - DEFENSIVE MARKER CLEANUP
 *
 * CRITICAL: Claude Code sometimes fails to invoke SubagentStop hook consistently.
 * This creates a defensive cleanup layer that resets agent markers at session start.
 *
 * DEFENSIVE RESET POINTS:
 * 1. Session Start (this file) - Clean slate for new session
 * 2. UserPromptSubmit (context-injection.js) - Clean on user prompt
 * 3. Stop hook (stop.js) - Clean on session end
 *
 * Session start = main scope = NO agents can be running
 * Therefore: safe to delete ALL markers for this session
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');
const { generateProjectHash } = require('./lib/hook-helpers');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('session-start');

  try {
    // Parse hook input
    if (!hookInput) {
      log('[SESSION-START-CLEANUP] No hook input - exiting cleanly');
      process.exit(0);
    }

    // Extract session and project information
    const session_id = hookInput.session_id;
    const projectRoot = hookInput.cwd || process.cwd();

    log(`[SESSION-START-CLEANUP] Session starting: ${session_id || 'undefined'}`);
    log(`[SESSION-START-CLEANUP] Project root: ${projectRoot}`);

    // DEFENSIVE CLEANUP: Delete stale agent markers
    // Session start = main scope = NO agents can be running
    if (session_id) {
      // Calculate project hash to match agent-marker.js filename format
      const projectHash = generateProjectHash(hookInput);
      const markerFile = path.join(os.homedir(), '.claude', 'tmp', `agent-executing-${session_id}-${projectHash}`);

      log(`[SESSION-START-CLEANUP] Checking marker: ${markerFile}`);

      // Delete marker if exists (session start = fresh slate)
      if (fs.existsSync(markerFile)) {
        try {
          fs.unlinkSync(markerFile);
          log(`[SESSION-START-CLEANUP] ✅ Deleted stale marker - clean session start`);
        } catch (error) {
          log(`[SESSION-START-CLEANUP] ❌ Failed to delete marker: ${error.message}`);
        }
      } else {
        log(`[SESSION-START-CLEANUP] ✅ No marker found - clean session start`);
      }
    } else {
      log(`[SESSION-START-CLEANUP] ⚠️ No session_id - skipping marker cleanup`);
    }

    // Session start doesn't expect JSON output - just exit with success
    process.exit(0);

  } catch (error) {
    log(`[SESSION-START-CLEANUP] Error: ${error.message}`);
    // Exit cleanly even on error - don't block session start
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}