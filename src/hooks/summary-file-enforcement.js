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
const { extractToolInfo, allowOperation, blockResponse, sendResponse } = require('./lib/hook-helpers');
const { getSetting } = require('./lib/config-loader');
const { validateSummaryFilePlacement } = require('./lib/summary-validation');

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

    // Get project root from hookInput.cwd or fallback
    const projectRoot = hookInput.cwd || process.cwd();

    // Get settings
    const strictMode = getSetting('development.file_management_strict', true);
    const summariesPath = getSetting('paths.summaries_path', 'summaries');

    log(`Checking file: ${filePath}`);
    log(`Strict mode: ${strictMode}`);
    log(`Summaries path: ${summariesPath}`);
    log(`Project root: ${projectRoot}`);

    // Normalize to relative path if absolute
    let relativePath = filePath;
    if (path.isAbsolute(filePath)) {
      relativePath = path.relative(projectRoot, filePath);
    }

    // DEBUG: Log all path information
    log(`=== PATH DEBUG ===`);
    log(`Original filePath: ${filePath}`);
    log(`Project root (cwd): ${projectRoot}`);
    log(`Relative path: ${relativePath}`);
    log(`Path is absolute: ${path.isAbsolute(filePath)}`);
    log(`=== END DEBUG ===`);

    // Get filename early for ALL-CAPITALS check
    const fileName = path.basename(relativePath);

    // STEP 1: ALL-CAPITALS check (highest priority - blocks everywhere)
    // Load allowed ALL-CAPITALS files from unified configuration
    const allowedAllCapsFiles = getSetting('enforcement.allowed_allcaps_files', [
      'README.md',
      'LICENSE',
      'LICENSE.md',
      'CLAUDE.md',
      'CHANGELOG.md',
      'CONTRIBUTING.md',
      'AUTHORS',
      'NOTICE',
      'PATENTS',
      'VERSION',
      'MAKEFILE',
      'DOCKERFILE',
      'COPYING',
      'COPYRIGHT'
    ]);
    log(`Allowed ALL-CAPITALS files: ${allowedAllCapsFiles.length} entries`);

    // Check for ALL-CAPITALS filename (excluding extension)
    const fileBaseName = fileName.replace(/\.[^/.]+$/, ''); // Remove extension
    const isAllCaps = fileBaseName === fileBaseName.toUpperCase() &&
                      fileBaseName.length > 1 &&
                      /^[A-Z0-9_-]+$/.test(fileBaseName);

    // CRITICAL: Block ALL-CAPITALS files REGARDLESS of location (unless in allowed list)
    if (isAllCaps && !allowedAllCapsFiles.includes(fileName)) {
      log(`BLOCKED: ALL-CAPITALS filename not allowed: ${fileName} (blocks everywhere)`);

      // Suggest lowercase alternative
      const suggestedName = fileName.toLowerCase();

      const message = `🚫 ALL-CAPITALS filenames are not allowed

Blocked filename: ${fileName}
Suggested alternative: ${suggestedName}

Well-known exceptions allowed:
${allowedAllCapsFiles.join(', ')}

Please use lowercase or mixed-case filenames for better readability.

🎯 INTELLIGENT CLAUDE CODE EXECUTION PATTERN:

1. Main Scope Creates AgentTasks ONLY via Task tool
2. Agent response = Agent completed (process results immediately)
3. Main Scope SHOULD parallelize work when possible (multiple Task tool calls in single message)
4. ALL work MUST use AgentTask templates (nano/tiny/medium/large/mega)

Example - Sequential Work:
  Task tool → @Developer (fix bug) → Agent returns → Process results

Example - Parallel Work (PREFERRED):
  Single message with multiple Task tool calls:
  - Task tool → @Developer (fix bug A)
  - Task tool → @Developer (fix bug B)
  - Task tool → @QA-Engineer (test feature C)
  All execute in parallel → Agents return → Process results

Template Usage:
  - 0-2 points: nano-agenttask-template.yaml
  - 3-5 points: tiny-agenttask-template.yaml
  - 6-15 points: Create STORY first, then break down to nano/tiny AgentTasks
  - 16+ points: Create STORY first, then break down to nano/tiny AgentTasks

To execute blocked operation:
1. Create AgentTask using appropriate template
2. Invoke via Task tool with specialist agent (@Developer, @DevOps-Engineer, etc.)
3. Wait for agent completion
4. Agent provides comprehensive summary with results`;

      const response = {
        continue: false,
        displayToUser: message
      };
      return sendResponse(response, 2, log);
    }

    // STEP 2: Summary placement validation (after ALL-CAPITALS passes)
    // Use shared validation logic
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

    // STEP 3: If file is in summaries directory and passes ALL-CAPITALS check, allow
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
        continue: false,
        displayToUser: message
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
