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
 * Clean stale markers for current project from different sessions
 * CRITICAL: Prevents stale markers from bypassing enforcement
 * @param {string} projectRoot - Project root path
 * @param {string} currentSessionId - Current session ID
 * @param {Function} log - Logger function
 */
function cleanStaleMarkersForProject(projectRoot, currentSessionId, log) {
  const projectHash = generateProjectHash(projectRoot);
  const markerDir = getMarkerDir();

  try {
    if (!fs.existsSync(markerDir)) {
      return;
    }

    const files = fs.readdirSync(markerDir);
    const currentProjectMarkers = files.filter(f =>
      f.startsWith('agent-executing-') && f.endsWith(`-${projectHash}`)
    );

    let cleanedCount = 0;
    const maxAge = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    currentProjectMarkers.forEach(markerFile => {
      const fullPath = path.join(markerDir, markerFile);
      try {
        const marker = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

        // Check 1: Different session_id (stale from previous session)
        const isDifferentSession = marker.session_id && marker.session_id !== currentSessionId;

        // Check 2: File modification time too old (fallback for corrupted markers)
        const stats = fs.statSync(fullPath);
        const age = Date.now() - stats.mtimeMs;
        const isTooOld = age > maxAge;

        if (isDifferentSession || isTooOld) {
          if (log) {
            const reason = isDifferentSession
              ? `different session (${marker.session_id} vs ${currentSessionId})`
              : `too old (${Math.round(age / 1000 / 60)} minutes)`;
            log(`Cleaning stale marker: ${markerFile} - ${reason}`);
          }
          fs.unlinkSync(fullPath);
          cleanedCount++;
        }
      } catch (error) {
        if (log) {
          log(`Error processing marker ${markerFile}: ${error.message}`);
        }
      }
    });

    if (cleanedCount > 0 && log) {
      log(`Cleaned ${cleanedCount} stale marker(s) for project ${projectRoot}`);
    }
  } catch (error) {
    if (log) {
      log(`Marker cleanup error: ${error.message}`);
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
 * CRITICAL: Session-aware detection prevents stale markers from bypassing enforcement
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

    // CRITICAL: Verify marker session_id matches current session_id
    // Stale markers from different sessions MUST NOT bypass enforcement
    if (marker.session_id !== sessionId) {
      if (log) {
        log(`Stale marker detected - session mismatch (marker: ${marker.session_id}, current: ${sessionId})`);
        log(`Cleaning stale marker: ${markerFile}`);
      }
      // Clean up stale marker immediately
      try {
        fs.unlinkSync(markerFile);
        if (log) {
          log(`Successfully cleaned stale marker from different session`);
        }
      } catch (cleanupError) {
        if (log) {
          log(`Failed to clean stale marker: ${cleanupError.message}`);
        }
      }
      return false;
    }

    // Markers are cleaned by UserPromptSubmit hook at start of turn
    // Just check if agent_count > 0 to determine context
    if (agentCount > 0) {
      if (log) {
        log(`Agent context detected - ${agentCount} active agent(s) - session ${sessionId}`);
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
  cleanStaleMarkersForProject,
  isAgentContext,
  isPMRole
};
