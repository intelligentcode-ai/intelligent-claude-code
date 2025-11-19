#!/usr/bin/env node

/**
 * Summary File Enforcement Hook
 *
 * Ensures summary files are created in summaries/ directory.
 * Blocks ALL-CAPITALS filenames (except well-known exceptions).
 */

const fs = require('fs');
const path = require('path');

// Shared libraries
const { initializeHook } = require('./lib/logging');
const { extractToolInfo, generateProjectHash, allowOperation, blockResponse, sendResponse } = require('./lib/hook-helpers');
const { getSetting } = require('./lib/config-loader');
const { validateSummaryFilePlacement } = require('./lib/summary-validation');
const { isAggressiveAllCaps } = require('./lib/allcaps-detection');

// Load config ONCE at module level (not on every hook invocation)
const ALLOWED_ALLCAPS_FILES = getSetting('enforcement.allowed_allcaps_files', [
  'README.md',
  'LICENSE',
  'LICENSE.md',
  'CLAUDE.md',
  'SKILL.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'AUTHORS',
  'NOTICE',
  'PATENTS',
  'VERSION',
  'MAKEFILE',
  'DOCKERFILE',
  'COPYING',
  'COPYRIGHT',
  'AGENTS.md'
]);
const STRICT_MODE = getSetting('development.file_management_strict', true);
const SUMMARIES_PATH = getSetting('paths.summaries_path', 'summaries');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('summary-enforcement');

  try {
    if (!hookInput) {
      return allowOperation(log, true); // Suppress output
    }

    // Extract tool information
    const { tool, filePath } = extractToolInfo(hookInput);

    if (!filePath) {
      return allowOperation(log, true);
    }

    // CRITICAL: Only enforce on Write/Edit operations, NOT Read operations
    if (tool !== 'Write' && tool !== 'Edit') {
      return allowOperation(log, true);
    }

    // CRITICAL: Apply ALL-CAPS check to everyone; only skip placement validation for agents
    // Check for agent marker files to detect agent context
    const crypto = require('crypto');
    const os = require('os');

    // Get project root with enhanced path resolution for Linux
    const projectRoot = hookInput.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const normalizedProjectRoot = path.resolve(projectRoot);

    log(`Checking file: ${filePath}`);
    log(`Project root (raw): ${projectRoot}`);
    log(`Project root (normalized): ${normalizedProjectRoot}`);

    // Normalize to relative path if absolute
    let relativePath = filePath;
    if (path.isAbsolute(filePath)) {
      relativePath = path.relative(normalizedProjectRoot, filePath);
    }

    // Enhanced Linux path debugging
    log(`=== PATH DEBUG ===`);
    log(`Platform: ${os.platform()}`);
    log(`Original filePath: ${filePath}`);
    log(`Normalized filePath: ${path.resolve(filePath)}`);
    log(`Project root (cwd): ${projectRoot}`);
    log(`Project root (normalized): ${normalizedProjectRoot}`);
    log(`Relative path: ${relativePath}`);
    log(`Path is absolute: ${path.isAbsolute(filePath)}`);
    log(`Path separator: "${path.sep}"`);
    log(`=== END DEBUG ===`);

    // Get filename early for ALL-CAPITALS check
    const fileName = path.basename(relativePath);

    // STEP 1: ALL-CAPITALS check (highest priority - blocks EVERYONE including agents)
    // Load allowed ALL-CAPITALS files from unified configuration
    const allowedAllCapsFiles = ALLOWED_ALLCAPS_FILES;
    log(`Allowed ALL-CAPITALS files: ${allowedAllCapsFiles.length} entries`);

    // Check for ALL-CAPITALS filename (excluding extension)
    const fileBaseName = fileName.replace(/\.[^/.]+$/, ''); // Remove extension
    const isAllCaps = isAggressiveAllCaps(fileBaseName);

    // CRITICAL: Block ALL-CAPITALS files REGARDLESS of location (unless in allowed list)
    if (isAllCaps && !allowedAllCapsFiles.includes(fileName)) {
      log(`AUTO-CORRECT: ALL-CAPITALS filename detected: ${fileName}`);

      // Auto-suggest lowercase-kebab alternative
      const suggestedName = fileName
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/_/g, '-') + path.extname(fileName);

      const message = `🚫 ALL-CAPITALS filenames are not allowed

Blocked filename: ${fileName}
Auto-suggested: ${suggestedName}

Well-known exceptions allowed:
${allowedAllCapsFiles.join(', ')}

Please retry with the suggested name. To keep progress: rename your target file to the suggestion and rerun.

🎯 INTELLIGENT CLAUDE CODE EXECUTION PATTERN:
1) Main Scope delegates via Task tool; agents execute and return results
2) Parallelize AgentTasks when possible
3) Use agenttask templates (nano/tiny/medium/large/mega) according to scope
4) Agents summarize results; Main Scope reviews and commits.`;

      const response = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: message
        }
      };
      return sendResponse(response, 2, log);
    }

    // STEP 2: Agent context check - skip remaining validation for agents
    // Check for agent marker file (same logic as pm-constraints-enforcement.js)
    const sessionId = hookInput.session_id || '';
    if (sessionId && projectRoot) {
      const projectHash = generateProjectHash(hookInput);
      const markerDir = path.join(os.homedir(), '.claude', 'tmp');
      const markerFile = path.join(markerDir, `agent-executing-${sessionId}-${projectHash}`);

      if (fs.existsSync(markerFile)) {
        try {
          const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
          const agentCount = marker.agent_count || 0;

          if (agentCount > 0) {
            log('Agent context detected - skipping remaining validation (ALL-CAPITALS already checked)');
            return allowOperation(log, true);
          }
        } catch (err) {
          // Marker file error - continue with validation
          log(`Warning: Could not read agent marker file: ${err.message}`);
        }
      }
    }

    // Get settings
    const strictMode = STRICT_MODE;
    const summariesPath = SUMMARIES_PATH;

    log(`Strict mode: ${strictMode}`);
    log(`Summaries path: ${summariesPath}`);

    // STEP 3: Summary placement validation (after ALL-CAPITALS passes)
    // Agents: skip placement enforcement but keep ALL-CAPS enforcement above
    const summaryValidation = validateSummaryFilePlacement(filePath, projectRoot);

    // If not a summary file or already in correct location, allow
    if (summaryValidation.allowed) {
      log('File validation passed - allowing');
      return allowOperation(log, true);
    }

    log(`Summary file detected outside summaries/: ${fileName}`);

    // Check if already in summaries directory
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const summariesPattern = new RegExp(`^${summariesPath}/`, 'i');
    const isInSummariesDir = summariesPattern.test(normalizedPath) ||
                            normalizedPath.includes(`/${summariesPath}/`);

    // STEP 4: If file is in summaries directory and passes ALL-CAPITALS check, allow
    if (isInSummariesDir) {
      // File is in summaries directory and has proper casing, allow
      log(`File in summaries directory with proper casing - allowed`);
      return allowOperation(log, true);
    }

    // Summary file outside summaries directory
    if (strictMode) {
      // Block with guidance - use message from shared validation
      log(`BLOCKED: Summary file outside summaries directory (strict mode)`);

      const message = `${summaryValidation.message}

To disable this enforcement, set development.file_management_strict: false in icc.config.json`;

      const response = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: message
        }
      };
      return sendResponse(response, 2, log);
    } else {
      // Allow with warning
      log(`WARNING: Summary file outside summaries directory (permissive mode)`);
      return allowOperation(log, true);
    }

  } catch (error) {
    log(`Error: ${error.message}`);
    allowOperation(log, true);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
