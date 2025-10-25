#!/usr/bin/env node

/**
 * Tool Blacklist Checker
 * Centralized tool blacklist checking for all PreToolUse hooks
 *
 * Provides unified tool restriction enforcement across main scope, PM, and agents
 * with support for universal, context-specific, and per-project blacklists.
 */

const { getSetting } = require('./config-loader');

/**
 * Check if a tool is blocked based on context and blacklist configuration
 *
 * @param {string} tool - Tool name (e.g., "Write", "Edit", "Bash", "Task")
 * @param {Object} toolInput - Tool input parameters (e.g., { command: "...", file_path: "..." })
 * @param {string} context - Execution context: 'main_scope', 'agent', or 'pm'
 * @param {string} projectRoot - Project root directory (optional, defaults to cwd)
 * @returns {Object} Result object with:
 *   - blocked: boolean - true if tool is blocked
 *   - reason: string - Human-readable reason for blocking
 *   - list: string - Which blacklist blocked it ('universal', 'main_scope_only', 'agents_only')
 *
 * @example
 * const result = checkToolBlacklist('Write', { file_path: '/path/to/file' }, 'main_scope');
 * if (result.blocked) {
 *   console.log(`Tool blocked: ${result.reason} (${result.list})`);
 * }
 */
function checkToolBlacklist(tool, toolInput, context, projectRoot = process.cwd()) {
  // Load tool blacklist from unified configuration
  let blacklist;
  try {
    blacklist = getSetting('enforcement.tool_blacklist', {});
  } catch (error) {
    // Fail open if configuration cannot be loaded
    return { blocked: false };
  }

  // If no blacklist configured, allow operation
  if (!blacklist || Object.keys(blacklist).length === 0) {
    return { blocked: false };
  }

  // Check universal blacklist (applies to ALL contexts)
  const universalList = blacklist.universal || [];
  if (isToolBlocked(tool, toolInput, universalList)) {
    return {
      blocked: true,
      reason: 'Tool blocked by universal blacklist (applies to all contexts)',
      list: 'universal'
    };
  }

  // Check main_scope_only blacklist (if context is main_scope or pm)
  if (context === 'main_scope' || context === 'pm') {
    const mainScopeList = blacklist.main_scope_only || [];
    if (isToolBlocked(tool, toolInput, mainScopeList)) {
      return {
        blocked: true,
        reason: 'Tool blocked by main scope blacklist (coordination only)',
        list: 'main_scope_only'
      };
    }
  }

  // Check agents_only blacklist (if context is agent)
  if (context === 'agent') {
    const agentsOnlyList = blacklist.agents_only || [];
    if (isToolBlocked(tool, toolInput, agentsOnlyList)) {
      return {
        blocked: true,
        reason: 'Tool blocked by agent blacklist (agents cannot use this tool)',
        list: 'agents_only'
      };
    }
  }

  // Tool not blocked
  return { blocked: false };
}

/**
 * Helper function to check if tool matches any item in blacklist array
 *
 * Supports:
 * - Exact tool name matching (e.g., "Write", "Edit")
 * - Bash command pattern matching (e.g., "rm -rf", "dd")
 *
 * @param {string} tool - Tool name
 * @param {Object} toolInput - Tool input parameters
 * @param {Array<string>} blacklist - Array of blocked tool names or patterns
 * @returns {boolean} true if tool is blocked by any blacklist item
 *
 * @example
 * isToolBlocked('Write', {}, ['Write', 'Edit']); // true
 * isToolBlocked('Bash', { command: 'rm -rf /' }, ['rm -rf']); // true
 * isToolBlocked('Read', {}, ['Write', 'Edit']); // false
 */
function isToolBlocked(tool, toolInput, blacklist) {
  // Validate inputs
  if (!tool || !Array.isArray(blacklist)) {
    return false;
  }

  // Iterate through blacklist items
  for (const blockedItem of blacklist) {
    // Exact tool name match
    if (tool === blockedItem) {
      return true;
    }

    // Bash command pattern matching
    if (tool === 'Bash' && toolInput?.command) {
      const command = toolInput.command.trim();
      if (command.includes(blockedItem)) {
        return true;
      }
    }
  }

  return false;
}

module.exports = {
  checkToolBlacklist,
  isToolBlocked
};
