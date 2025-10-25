#!/usr/bin/env node

const path = require('path');
const { parseHookInput, extractToolInfo, allowOperation, blockOperation } = require('./lib/hook-helpers');
const { createLogger } = require('./lib/logging');

/**
 * Configuration Protection Hook
 *
 * Prevents unauthorized modification of system configuration files.
 *
 * SECURITY: Configuration files can ONLY be modified by the user.
 * Main scope and agents CANNOT change:
 * - icc.config.json
 * - icc.workflow.json
 */

function main() {
  const log = createLogger('config-protection');

  try {
    const hookInput = parseHookInput(log);

    if (!hookInput) {
      log('No hook input - allowing operation');
      return allowOperation(log);
    }

    const { tool, toolInput } = extractToolInfo(hookInput);

    // Only check Write/Edit operations
    if (!['Write', 'Edit'].includes(tool)) {
      return allowOperation(log);
    }

    const filePath = toolInput.file_path || '';
    const fileName = path.basename(filePath);

    // Block config file modifications
    if (fileName === 'icc.config.json' || fileName === 'icc.workflow.json') {
      const message = `Configuration files are USER-ONLY

Configuration files (icc.config.json, icc.workflow.json) can ONLY be modified by the user.

Main scope and agents CANNOT change system configuration.

To change configuration:
1. User manually edits icc.config.json or icc.workflow.json
2. OR user uses CLI configuration commands (when available)

This protects critical settings like:
- enforcement.blocking_enabled
- autonomy.level
- git.privacy
- All workflow settings

File attempted: ${fileName}
Operation: ${tool}`;

      return blockOperation(message, log);
    }

    return allowOperation(log);

  } catch (error) {
    log(`Error: ${error.message}`);
    return allowOperation(log); // Fail open to prevent blocking valid work
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
