const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Logging Utilities
 * Shared logging functions for all hooks
 */

/**
 * Get log directory path
 * @returns {string} Log directory path
 */
function getLogDir() {
  return path.join(os.homedir(), '.claude', 'logs');
}

/**
 * Ensure log directory exists
 */
function ensureLogDir() {
  const logDir = getLogDir();
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

/**
 * Clean old log files (older than 24 hours)
 * @param {string} logDir - Log directory path
 */
function cleanOldLogs(logDir) {
  try {
    const files = fs.readdirSync(logDir);
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    for (const file of files) {
      if (!file.endsWith('.log')) continue;

      const filePath = path.join(logDir, file);
      const stats = fs.statSync(filePath);

      if (now - stats.mtimeMs > maxAge) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    // Silent fail - don't block hook execution
  }
}

/**
 * Normalize path for log filename
 * @param {string} pathStr - Path to normalize
 * @returns {string} Normalized path (home → ~, / → -, strip leading dash)
 */
function normalizePath(pathStr) {
  if (!pathStr) return 'unknown';

  // Replace home directory with ~
  const homeDir = os.homedir();
  let normalized = pathStr.replace(homeDir, '~');

  // Replace slashes with dashes
  normalized = normalized.replace(/\//g, '-');

  // Strip leading dash
  if (normalized.startsWith('-')) {
    normalized = normalized.substring(1);
  }

  return normalized;
}

/**
 * Create logger function for specific hook
 * @param {string} hookName - Name of the hook (e.g., 'pm-constraints-enforcement')
 * @param {Object} hookInput - Optional hook input containing cwd for path normalization
 * @returns {Function} Logger function
 */
function createLogger(hookName, hookInput = null) {
  const logDir = getLogDir();
  const today = new Date().toISOString().split('T')[0];

  // Include normalized project path in log filename if available
  let logFileName = `${today}`;
  if (hookInput && hookInput.cwd) {
    const normalizedPath = normalizePath(hookInput.cwd);
    logFileName += `-${normalizedPath}`;
  }
  logFileName += `-${hookName}.log`;

  const logFile = path.join(logDir, logFileName);

  ensureLogDir();
  cleanOldLogs(logDir);

  return function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  };
}

/**
 * Initialize hook with input parsing and logging
 * Consolidates duplicated initialization code across all hooks
 *
 * @param {string} hookName - Name of the hook (e.g., 'pm-constraints-enforcement')
 * @returns {Object} Object containing { log, hookInput }
 */
function initializeHook(hookName) {
  // Parse hook input from multiple sources
  let hookInput;
  try {
    let inputData = '';

    // Check argv[2] first
    if (process.argv[2]) {
      inputData = process.argv[2];
    }
    // Check HOOK_INPUT environment variable (UserPromptSubmit, etc.)
    else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    }
    // Check CLAUDE_TOOL_INPUT (PreToolUse payloads)
    else if (process.env.CLAUDE_TOOL_INPUT) {
      inputData = process.env.CLAUDE_TOOL_INPUT;
    }
    // Read from stdin if available
    else if (!process.stdin.isTTY) {
        try {
          const buffer = Buffer.alloc(65536);
          const sab = new SharedArrayBuffer(4);
          const int32 = new Int32Array(sab);
          let bytesRead = 0;

          for (let attempt = 0; attempt < 10; attempt++) {
            try {
              bytesRead = fs.readSync(0, buffer, 0, buffer.length, null);
              if (bytesRead > 0) {
                inputData = buffer.toString('utf8', 0, bytesRead);
                break;
              }
            } catch (readError) {
              if (readError.code === 'EAGAIN' && attempt < 10) {
                Atomics.wait(int32, 0, 0, 10);
                continue;
              } else if (readError.code !== 'EAGAIN') {
                throw readError;
              }
            }
          }
        } catch (stdinError) {
          // Silent fail for stdin read
        }
      }
    // Parse JSON if data available
    if (inputData.trim()) {
      hookInput = JSON.parse(inputData);
    }
  } catch (error) {
    // If parsing fails, hookInput will be undefined
  }

  // Create logger with normalized project path
  const log = createLogger(hookName, hookInput);

  return { log, hookInput };
}

module.exports = {
  getLogDir,
  ensureLogDir,
  cleanOldLogs,
  createLogger,
  initializeHook
};
