const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { getSetting } = require('./config-loader');

/**
 * Marker Detection Utilities
 * Shared functions for detecting agent execution markers
 */

const MAIN_SCOPE_AGENT_PRIVILEGES =
  process.env.ICC_MAIN_SCOPE_AGENT === 'true' ||
  getSetting('enforcement.main_scope_has_agent_privileges', false);

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
 * CRITICAL: Normalizes path before hashing to ensure consistency
 * @param {string} projectRoot - Project root path
 * @returns {string} 8-character MD5 hash
 */
function generateProjectHash(projectRoot) {
  // CRITICAL: Normalize before hashing
  // Ensures same path with/without trailing slash = same hash
  let normalizedRoot = path.resolve(projectRoot);

  // Ensure no trailing slash (except root)
  if (normalizedRoot.length > 1 && normalizedRoot.endsWith(path.sep)) {
    normalizedRoot = normalizedRoot.slice(0, -1);
  }

  return crypto.createHash('md5').update(normalizedRoot).digest('hex').substring(0, 8);
}

/**
 * Check if agent marker exists (agent context detection)
 * @param {string} projectRoot - Project root path
 * @param {string} sessionId - Session ID
 * @param {Function} log - Logger function
 * @returns {boolean} true if agent context, false if main scope
 */
function isAgentContext(projectRoot, sessionId, log) {
  if (MAIN_SCOPE_AGENT_PRIVILEGES) {
    if (log) {
      log('Config: main_scope_has_agent_privileges=true (treating main scope as agent context)');
    }
    return true;
  }

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
