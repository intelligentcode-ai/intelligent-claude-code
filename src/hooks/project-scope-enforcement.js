#!/usr/bin/env node

/**
 * Project Scope Enforcement Hook
 *
 * Protects installation directory (~/.claude/) from modification.
 * All work should be done within project directories.
 */

const path = require('path');
const os = require('os');

// Shared libraries
const { initializeHook } = require('./lib/logging');
const { extractToolInfo, allowOperation, blockOperation } = require('./lib/hook-helpers');
const { isInstallationPath } = require('./lib/path-utils');
const { isModifyingBashCommand } = require('./lib/command-validation');
const { getSetting } = require('./lib/config-loader');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('project-scope-enforcement');

  // Helper function for allowed exception check
  function isAllowedException(filePath) {
    const homedir = os.homedir();
    const allowedPath = path.join(homedir, '.claude', 'CLAUDE.md');
    const absolutePath = path.resolve(filePath);
    return absolutePath === allowedPath;
  }

  // Helper function to get project root with enhanced Linux support
  function getProjectRootFromHookInput(hookInput) {
    const path = require('path');
    let projectRoot;

    // Priority 1: Environment variable (authoritative)
    if (process.env.CLAUDE_PROJECT_DIR) {
      projectRoot = process.env.CLAUDE_PROJECT_DIR;
    }
    // Priority 2: Hook input cwd
    else if (hookInput && hookInput.cwd) {
      projectRoot = hookInput.cwd;
    }
    // Priority 3: Process cwd
    else {
      projectRoot = process.cwd();
    }

    // Normalize path (critical for cross-platform consistency)
    let normalizedPath = path.resolve(projectRoot);

    // Remove trailing slash (except root)
    if (normalizedPath.length > 1 && normalizedPath.endsWith(path.sep)) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    return normalizedPath;
  }

  // Helper function to check if path is within project boundaries
  function isWithinProjectBoundaries(filePath, projectRoot) {
    if (!filePath || !projectRoot) {
      return false;
    }

    // Normalize both paths for comparison
    const normalizedFile = path.resolve(filePath);
    const normalizedRoot = path.resolve(projectRoot);

    // Check if file path starts with project root
    // Add path separator to avoid false positives (e.g., /home/project1 vs /home/project)
    const rootWithSep = normalizedRoot.endsWith(path.sep) ? normalizedRoot : normalizedRoot + path.sep;
    const isInRoot = normalizedFile.startsWith(rootWithSep) || normalizedFile === normalizedRoot;

    return isInRoot;
  }

  try {
    if (!hookInput) {
      return allowOperation(log);
    }

    log(`Project scope enforcement triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool information
    const { tool, filePath, command } = extractToolInfo(hookInput);

    if (!tool) {
      log('No tool specified - allowing operation');
      return allowOperation(log);
    }

    log(`Tool: ${tool}, FilePath: ${filePath}, Command: ${command}`);

    // Get project root for boundary validation
    const projectRoot = getProjectRootFromHookInput(hookInput);
    log(`Project root detected: ${projectRoot}`);

    const mainScopeAgent = getSetting('enforcement.main_scope_has_agent_privileges', false) === true;

    // CRITICAL: Check project boundary FIRST (before installation check)
    // Block ALL file operations outside project root (except ~/.claude/CLAUDE.md)
    // Installation protection ALWAYS applies, even when main scope acts as agent.
    if (filePath && (tool === 'Edit' || tool === 'Write' || tool === 'MultiEdit')) {
      const isInProject = isWithinProjectBoundaries(filePath, projectRoot);
      const isException = isAllowedException(filePath);
      const isInstall = isInstallationPath(filePath);

      log(`Path boundary check - InProject: ${isInProject}, IsException: ${isException}, IsInstall: ${isInstall}`);
      log(`Normalized file path: ${path.resolve(filePath)}`);
      log(`Normalized project root: ${path.resolve(projectRoot)}`);

      // Allow exception (e.g., ~/.claude/CLAUDE.md)
      if (isException) {
        log(`Path allowed (exception): ${filePath}`);
        return allowOperation(log);
      }

      // Block installation path modifications (except exceptions already handled)
      if (isInstall) {
        log(`Installation path modification BLOCKED: ${filePath}`);
        return blockOperation(`🚫 Installation directory is protected - work within project scope only

Blocked: ${filePath}
Protected: ~/.claude/ directory (system installation)
Allowed: ~/.claude/CLAUDE.md (user configuration)

All work must be done within project directories:
- Project templates and source files
- Project documentation and memory
- Project-specific configurations

Installation updates happen via 'make install' from project source.`, log);
      }

      // If main scope has agent privileges, allow outside-project writes (agents already allowed)
      if (!isInProject && !mainScopeAgent) {
        log(`BLOCK: ${filePath} outside project root ${projectRoot}`);
        return blockOperation(`🚫 Project boundary enforcement - stay inside ${projectRoot}

Blocked path: ${path.resolve(filePath)}
Reason: Operation outside active project scope is prohibited.

Allowed exceptions:
- ~/.claude/CLAUDE.md for configuration edits

For cross-project work, switch project scope or run within the correct workspace.`, log);
      }
    }

    // Check Bash commands
    if (tool === 'Bash' && command) {
      if (isModifyingBashCommand(command)) {
        log(`Bash command modifying installation BLOCKED: ${command}`);
        return blockOperation(`🚫 Installation directory is protected - work within project scope only

Blocked command: ${command}
Protected: ~/.claude/ directory (system installation)

All work must be done within project directories:
- Project templates and source files
- Project documentation and memory
- Project-specific configurations

Installation updates happen via 'make install' from project source.`, log);
      }
    }

    // Allow operation
    return allowOperation(log);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    return allowOperation(log);
  }
}

if (require.main === module) {
  main();
}
