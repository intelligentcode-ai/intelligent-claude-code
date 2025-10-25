const fs = require('fs');

/**
 * Hook Helper Utilities
 * Shared helper functions for hook operations
 */

/**
 * Parse hook input from multiple sources
 * @param {Function} log - Logger function
 * @returns {Object|null} Parsed hook input or null
 */
function parseHookInput(log) {
  let inputData = '';

  // Source 1: Command line argument
  if (process.argv[2]) {
    inputData = process.argv[2];
  }
  // Source 2: Environment variable
  else if (process.env.HOOK_INPUT) {
    inputData = process.env.HOOK_INPUT;
  }
  // Source 3: stdin
  else if (!process.stdin.isTTY) {
    try {
      inputData = fs.readFileSync(0, 'utf8');
    } catch (stdinError) {
      if (log) {
        log(`WARN: Failed to read stdin: ${stdinError.message} - allowing operation`);
      }
      return null;
    }
  }

  if (!inputData.trim()) {
    return null;
  }

  try {
    return JSON.parse(inputData);
  } catch (error) {
    if (log) {
      log(`JSON parse error: ${error.message}`);
    }
    return null;
  }
}

/**
 * Create standard allow response
 * @returns {Object} Standard allow response
 */
function allowResponse() {
  return { continue: true };
}

/**
 * Create standard allow response with suppressed output
 * @returns {Object} Standard allow response with suppression
 */
function allowResponseSuppressed() {
  return {
    continue: true,
    suppressOutput: true
  };
}

/**
 * Create block/deny response
 * @param {string} message - Block reason message
 * @returns {Object} Hook-specific block response
 */
function blockResponse(message) {
  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: message
    }
  };
}

/**
 * Send response and exit
 * @param {Object} response - Response object
 * @param {number} exitCode - Exit code (0 = allow, 2 = block)
 * @param {Function} log - Logger function (optional)
 */
function sendResponse(response, exitCode = 0, log = null) {
  const responseJson = JSON.stringify(response);

  if (log) {
    log(`RESPONSE: ${responseJson}`);
    log(`EXIT CODE: ${exitCode}`);
  }

  console.log(responseJson);
  process.exit(exitCode);
}

/**
 * Block operation with message and exit
 * @param {string} message - Block reason message
 * @param {Function} log - Logger function
 */
function blockOperation(message, log) {
  if (log) {
    log(`BLOCKED: ${message}`);
  }

  const response = blockResponse(message);
  sendResponse(response, 2, log);
}

/**
 * Allow operation and exit
 * @param {Function} log - Logger function
 * @param {boolean} suppress - Suppress output (default: false)
 */
function allowOperation(log, suppress = false) {
  if (log) {
    log('Operation allowed');
  }

  const response = suppress ? allowResponseSuppressed() : allowResponse();
  sendResponse(response, 0, log);
}

/**
 * Get project root from hook input with fallback
 * @param {Object} hookInput - Parsed hook input
 * @returns {string} Project root path
 */
function getProjectRoot(hookInput) {
  // Priority 1: Environment variable (authoritative from Claude Code)
  if (process.env.CLAUDE_PROJECT_DIR) {
    return process.env.CLAUDE_PROJECT_DIR;
  }

  // Priority 2: Hook input cwd
  if (hookInput && hookInput.cwd) {
    return hookInput.cwd;
  }

  // Priority 3: Process cwd
  return process.cwd();
}

/**
 * Extract tool information from hook input
 * @param {Object} hookInput - Parsed hook input
 * @returns {Object} Tool information {tool, toolInput, filePath, command}
 */
function extractToolInfo(hookInput) {
  const tool = hookInput.tool_name || hookInput.tool || '';
  const toolInput = hookInput.tool_input || hookInput.parameters || {};
  const filePath = toolInput.file_path || '';
  const command = toolInput.command || '';

  return { tool, toolInput, filePath, command };
}

module.exports = {
  parseHookInput,
  allowResponse,
  allowResponseSuppressed,
  blockResponse,
  sendResponse,
  blockOperation,
  allowOperation,
  getProjectRoot,
  extractToolInfo
};
