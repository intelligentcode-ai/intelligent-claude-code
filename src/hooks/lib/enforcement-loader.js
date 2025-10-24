#!/usr/bin/env node

/**
 * Enforcement Configuration Loader
 *
 * ⚠️ DEPRECATED: This module is deprecated and will be removed in a future version.
 *
 * ALL enforcement settings have been migrated to the unified configuration system.
 * Use config-loader.js instead with the 'enforcement.*' namespace.
 *
 * Migration Examples:
 * - OLD: getEnforcementSetting(projectRoot, 'allowed_allcaps_files', [])
 * - NEW: getSetting('enforcement.allowed_allcaps_files', [])
 *
 * - OLD: getEnforcementSetting(projectRoot, 'infrastructure_protection.pm_blacklist', [])
 * - NEW: getSetting('enforcement.tool_blacklist.infrastructure', [])
 *
 * - OLD: getEnforcementSetting(projectRoot, 'heredoc_allowed_commands', [])
 * - NEW: getSetting('enforcement.heredoc_allowed_commands', [])
 *
 * All settings are now in icc.config.json under the "enforcement" key.
 * See icc.config.default.json for complete enforcement settings structure.
 *
 * Legacy Priority Order (NO LONGER USED):
 * 1. Project-local: .icc/enforcement.json
 * 2. Project root: icc.enforcement.json
 * 3. System default: .icc/enforcement.default.json
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Cache enforcement configuration
let enforcementCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Load enforcement configuration with priority hierarchy
 * @deprecated Use config-loader.js with getSetting('enforcement.*') instead
 * @param {string} projectRoot - Project root directory
 * @returns {object} Enforcement configuration object
 */
function loadEnforcement(projectRoot) {
  console.warn('[DEPRECATED] enforcement-loader.loadEnforcement() is deprecated. Use config-loader.getSetting("enforcement.*") instead.');

  // Check cache validity
  const now = Date.now();
  if (enforcementCache && cacheTimestamp && (now - cacheTimestamp < CACHE_TTL)) {
    return enforcementCache;
  }

  // Priority search paths
  const searchPaths = [
    path.join(projectRoot, '.icc', 'enforcement.json'),                    // Project-local (highest priority)
    path.join(projectRoot, 'icc.enforcement.json'),                        // Project root
    path.join(os.homedir(), '.claude', '.icc', 'enforcement.default.json'), // User global .icc
    path.join(os.homedir(), '.claude', 'icc.enforcement.json')             // User global root
  ];

  // Try each path in priority order
  for (const searchPath of searchPaths) {
    if (fs.existsSync(searchPath)) {
      try {
        const content = fs.readFileSync(searchPath, 'utf8');
        const enforcement = JSON.parse(content);

        // Cache the result
        enforcementCache = enforcement;
        cacheTimestamp = now;

        return enforcement;
      } catch (error) {
        // Parse error - try next path
        continue;
      }
    }
  }

  // Fallback to empty configuration
  const fallback = {
    tool_blacklist: {
      universal: [],
      main_scope_only: [],
      agents_only: []
    },
    infrastructure_protection: {
      pm_blacklist: []
    },
    allowed_allcaps_files: [],
    heredoc_allowed_commands: []
  };

  enforcementCache = fallback;
  cacheTimestamp = now;

  return fallback;
}

/**
 * Get specific enforcement setting
 * @deprecated Use config-loader.js with getSetting('enforcement.*') instead
 * @param {string} projectRoot - Project root directory
 * @param {string} key - Dot-notation key (e.g., 'tool_blacklist.universal')
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} Setting value or default
 */
function getEnforcementSetting(projectRoot, key, defaultValue = null) {
  console.warn(`[DEPRECATED] enforcement-loader.getEnforcementSetting() is deprecated. Use config-loader.getSetting('enforcement.${key}') instead.`);

  const enforcement = loadEnforcement(projectRoot);

  // Split key by dots and traverse object
  const parts = key.split('.');
  let value = enforcement;

  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return defaultValue;
    }
  }

  return value !== undefined ? value : defaultValue;
}

/**
 * Clear enforcement cache (useful for testing)
 */
function clearEnforcementCache() {
  enforcementCache = null;
  cacheTimestamp = null;
}

module.exports = {
  loadEnforcement,
  getEnforcementSetting,
  clearEnforcementCache
};
