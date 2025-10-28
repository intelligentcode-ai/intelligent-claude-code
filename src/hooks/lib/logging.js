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

module.exports = {
  getLogDir,
  ensureLogDir,
  cleanOldLogs,
  createLogger
};
