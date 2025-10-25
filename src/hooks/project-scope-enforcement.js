#!/usr/bin/env node

/**
 * Project Scope Enforcement Hook
 *
 * Protects installation directory (~/.claude/) from modification.
 * All work should be done within project directories.
 */

const path = require('path');
const os = require('os');

// Shared libraries
const { createLogger } = require('./lib/logging');
const { parseHookInput, extractToolInfo, allowOperation, blockOperation } = require('./lib/hook-helpers');
const { isInstallationPath } = require('./lib/path-utils');
const { isModifyingBashCommand } = require('./lib/command-validation');

function main() {
  const log = createLogger('project-scope-enforcement');

  // Helper function for allowed exception check
  function isAllowedException(filePath) {
    const homedir = os.homedir();
    const allowedPath = path.join(homedir, '.claude', 'CLAUDE.md');
    const absolutePath = path.resolve(filePath);
    return absolutePath === allowedPath;
  }

  try {
    // Parse hook input
    const hookInput = parseHookInput(log);
    if (!hookInput) {
      return allowOperation(log);
    }

    log(`Project scope enforcement triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool information
    const { tool, filePath, command } = extractToolInfo(hookInput);

    if (!tool) {
      log('No tool specified - allowing operation');
      return allowOperation(log);
    }

    log(`Tool: ${tool}, FilePath: ${filePath}, Command: ${command}`);

    // READS are ALLOWED from installation directory - only WRITES are blocked
    // Check file MODIFICATION operations (Edit/Write/MultiEdit)
    if (filePath && (tool === 'Edit' || tool === 'Write' || tool === 'MultiEdit')) {
      if (isInstallationPath(filePath)) {
        // Check if this is an allowed exception
        if (isAllowedException(filePath)) {
          log(`Installation path access ALLOWED (exception): ${filePath}`);
          return allowOperation(log);
        }

        // Block the operation
        log(`Installation path modification BLOCKED: ${filePath}`);
        return blockOperation(`🚫 Installation directory is protected - work within project scope only

Blocked: ${filePath}
Protected: ~/.claude/ directory (system installation)
Allowed: ~/.claude/CLAUDE.md (user configuration)

All work must be done within project directories:
- Project templates and source files
- Project documentation and memory
- Project-specific configurations

Installation updates happen via 'make install' from project source.`, log);
      }
    }

    // Check Bash commands
    if (tool === 'Bash' && command) {
      if (isModifyingBashCommand(command)) {
        log(`Bash command modifying installation BLOCKED: ${command}`);
        return blockOperation(`🚫 Installation directory is protected - work within project scope only

Blocked command: ${command}
Protected: ~/.claude/ directory (system installation)

All work must be done within project directories:
- Project templates and source files
- Project documentation and memory
- Project-specific configurations

Installation updates happen via 'make install' from project source.`, log);
      }
    }

    // Allow operation
    allowOperation(log);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    allowOperation(log);
  }
}

if (require.main === module) {
  main();
}
