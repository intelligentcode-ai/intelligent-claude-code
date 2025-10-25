const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

/**
 * Marker Detection Utilities
 * Shared functions for detecting agent execution markers
 */

/**
 * Get marker directory path
 * @returns {string} Marker directory path
 */
function getMarkerDir() {
  return path.join(os.homedir(), '.claude', 'tmp');
}

/**
 * Ensure marker directory exists
 * @param {Function} log - Logger function
 */
function ensureMarkerDir(log) {
  const markerDir = getMarkerDir();
  if (!fs.existsSync(markerDir)) {
    fs.mkdirSync(markerDir, { recursive: true });
    if (log) {
      log(`Created marker directory: ${markerDir}`);
    }
  }
}

/**
 * Generate project hash from project root
 * @param {string} projectRoot - Project root path
 * @returns {string} 8-character MD5 hash
 */
function generateProjectHash(projectRoot) {
  return crypto.createHash('md5').update(projectRoot).digest('hex').substring(0, 8);
}

/**
 * Check if agent marker exists (agent context detection)
 * @param {string} projectRoot - Project root path
 * @param {string} sessionId - Session ID
 * @param {Function} log - Logger function
 * @returns {boolean} true if agent context, false if main scope
 */
function isAgentContext(projectRoot, sessionId, log) {
  const projectHash = generateProjectHash(projectRoot);
  const markerDir = getMarkerDir();

  ensureMarkerDir(log);

  const markerFile = path.join(markerDir, `agent-executing-${sessionId}-${projectHash}`);

  try {
    if (!fs.existsSync(markerFile)) {
      if (log) {
        log(`Main scope detected - no marker file for project ${projectRoot}`);
      }
      return false;
    }

    const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
    const agentCount = marker.agent_count || 0;

    // Markers are cleaned by UserPromptSubmit hook at start of turn
    // Just check if agent_count > 0 to determine context
    if (agentCount > 0) {
      if (log) {
        log(`Agent context detected - ${agentCount} active agent(s)`);
      }
      return true;
    } else {
      if (log) {
        log(`Main scope detected - marker exists but agent_count is 0`);
      }
      return false;
    }
  } catch (error) {
    if (log) {
      log(`Error reading marker file: ${error.message} - assuming main scope`);
    }
    return false;
  }
}

/**
 * Check if PM role (inverse of agent context)
 * @param {string} projectRoot - Project root path
 * @param {string} sessionId - Session ID
 * @param {Function} log - Logger function
 * @returns {boolean} true if PM context, false if agent context
 */
function isPMRole(projectRoot, sessionId, log) {
  return !isAgentContext(projectRoot, sessionId, log);
}

module.exports = {
  getMarkerDir,
  ensureMarkerDir,
  generateProjectHash,
  isAgentContext,
  isPMRole
};
