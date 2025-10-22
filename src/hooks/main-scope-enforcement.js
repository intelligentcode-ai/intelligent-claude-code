#!/usr/bin/env node

/**
 * Main Scope Enforcement Hook
 *
 * Enforces strict main scope coordination-only mode when strict_main_scope enabled.
 * Main scope (no agent marker) can ONLY do coordination work.
 * All technical operations MUST go through Task tool + agents.
 */

const path = require('path');

// Shared libraries
const { createLogger } = require('./lib/logging');
const { parseHookInput, extractToolInfo, getProjectRoot, allowOperation, blockOperation } = require('./lib/hook-helpers');
const { loadConfig, getSetting } = require('./lib/config-loader');
const { isDevelopmentContext } = require('./lib/context-detection');
const { isAgentContext } = require('./lib/marker-detection');
const { isPathInAllowlist } = require('./lib/path-utils');
const { isAllowedCoordinationCommand } = require('./lib/command-validation');

function main() {
  const log = createLogger('main-scope-enforcement');

  /**
   * Check if mkdir command is for allowlist directory
   */
  function isAllowedMkdirCommand(command, projectRoot) {
    if (!command.trim().startsWith('mkdir')) {
      return false;
    }

    const config = loadConfig();
    const allowlist = [
      config.paths.story_path || 'stories',
      config.paths.bug_path || 'bugs',
      config.paths.memory_path || 'memory',
      config.paths.docs_path || 'docs',
      'agenttasks',
      'summaries'
    ];

    // Extract directory path from mkdir command
    const mkdirMatch = command.match(/mkdir\s+(?:-p\s+)?(.+?)(?:\s|$)/);
    if (!mkdirMatch) {
      return false;
    }

    let targetPath = mkdirMatch[1].trim();
    targetPath = targetPath.replace(/^["']|["']$/g, '');

    // Normalize to absolute path
    const absolutePath = path.isAbsolute(targetPath)
      ? targetPath
      : path.join(projectRoot, targetPath);

    const normalizedPath = path.normalize(absolutePath);
    const pathParts = normalizedPath.split(path.sep);

    // Check if ANY path component matches an allowlist directory
    for (const allowedDir of allowlist) {
      if (pathParts.includes(allowedDir)) {
        return true;
      }
    }

    return false;
  }

  try {
    // Parse hook input
    const hookInput = parseHookInput(log);
    if (!hookInput) {
      return allowOperation(log);
    }

    log(`PreToolUse triggered: ${JSON.stringify(hookInput)}`);

    // Get project root
    const projectRoot = getProjectRoot(hookInput);

    // Check for agent marker (if agent, skip enforcement)
    if (isAgentContext(projectRoot, hookInput.session_id, log)) {
      log('Agent context detected - strict main scope enforcement skipped');
      return allowOperation(log);
    }

    // Check if strict mode enabled
    const strictMode = getSetting('enforcement.strict_main_scope', true);
    if (!strictMode) {
      log('Strict main scope mode disabled - allowing operation');
      return allowOperation(log);
    }

    // Validate main scope operation
    const { tool, toolInput, filePath, command } = extractToolInfo(hookInput);

    if (!tool) {
      log('No tool specified - allowing operation');
      return allowOperation(log);
    }

    // Allow ALL MCP tools (read-only operations)
    if (tool && tool.startsWith('mcp__')) {
      log(`MCP tool allowed in main scope: ${tool}`);
      return allowOperation(log);
    }

    // Allow coordination tools
    const coordinationTools = ['Read', 'Grep', 'Glob', 'Task', 'TodoWrite', 'WebFetch', 'BashOutput', 'KillShell'];
    if (coordinationTools.includes(tool)) {
      log(`Coordination tool allowed: ${tool}`);
      return allowOperation(log);
    }

    // Check Write/Edit operations
    if (tool === 'Write' || tool === 'Edit') {
      // Build allowlist for file path checking
      const config = loadConfig();
      const allowlist = [
        config.paths.story_path,
        config.paths.bug_path,
        config.paths.memory_path,
        config.paths.docs_path,
        'agenttasks',
        'summaries'
      ];

      // In development context, allow src/ directory edits
      if (isDevelopmentContext(projectRoot)) {
        allowlist.push('src');
      }

      if (isPathInAllowlist(filePath, allowlist, projectRoot)) {
        log(`Write to allowlist directory allowed: ${filePath}`);
        return allowOperation(log);
      } else {
        // Block write outside allowlist
        const customMessage = getSetting('enforcement.strict_main_scope_message',
          'Main scope is limited to coordination work only. Create AgentTasks via Task tool for all technical operations.');

        return blockOperation(`🚫 STRICT MODE: Write/Edit operations outside allowlist directories not allowed in main scope

Tool: ${tool}
Detail: ${filePath}

${customMessage}

Main scope is limited to coordination work:
✅ ALLOWED: Read, Grep, Glob, Task, TodoWrite, WebFetch, BashOutput, KillShell
✅ ALLOWED: All MCP tools (mcp__memory, mcp__context7, etc.)
✅ ALLOWED: Write/Edit to allowlist directories (stories/, bugs/, memory/, docs/, summaries/, agenttasks/)
✅ ALLOWED: Write/Edit to src/ when in development context (working on intelligent-claude-code)
✅ ALLOWED: Root files (*.md, VERSION, icc.config.json, icc.workflow.json)
✅ ALLOWED: Git workflow (git add/commit/push/pull/branch/checkout/merge/reset/stash/tag/remote)
✅ ALLOWED: Read-only bash (ls, cat, grep, less, more, ps, top, etc.)
✅ ALLOWED: mkdir for allowlist directories

❌ BLOCKED: All technical operations (infrastructure, build, deploy, scripting)

To disable strict mode: Set enforcement.strict_main_scope = false in icc.config.json`, log);
      }
    }

    // Check Bash operations
    if (tool === 'Bash') {
      if (isAllowedCoordinationCommand(command)) {
        log(`Allowed coordination command: ${command}`);
        return allowOperation(log);
      }

      // Check if mkdir for allowlist directory
      if (isAllowedMkdirCommand(command, projectRoot)) {
        log(`Mkdir for allowlist directory allowed: ${command}`);
        return allowOperation(log);
      }

      // Block all other technical bash commands
      const customMessage = getSetting('enforcement.strict_main_scope_message',
        'Main scope is limited to coordination work only. Create AgentTasks via Task tool for all technical operations.');

      return blockOperation(`🚫 STRICT MODE: Technical bash commands not allowed in main scope

Tool: ${tool}
Detail: ${command}

${customMessage}

Main scope is limited to coordination work:
✅ ALLOWED: Read, Grep, Glob, Task, TodoWrite, WebFetch, BashOutput, KillShell
✅ ALLOWED: All MCP tools (mcp__memory, mcp__context7, etc.)
✅ ALLOWED: Write/Edit to allowlist directories (stories/, bugs/, memory/, docs/, summaries/, agenttasks/)
✅ ALLOWED: Write/Edit to src/ when in development context (working on intelligent-claude-code)
✅ ALLOWED: Root files (*.md, VERSION, icc.config.json, icc.workflow.json)
✅ ALLOWED: Git workflow (git add/commit/push/pull/branch/checkout/merge/reset/stash/tag/remote)
✅ ALLOWED: Read-only bash (ls, cat, grep, less, more, ps, top, etc.)
✅ ALLOWED: mkdir for allowlist directories

❌ BLOCKED: All technical operations (infrastructure, build, deploy, scripting)

To disable strict mode: Set enforcement.strict_main_scope = false in icc.config.json`, log);
    }

    // Block all other operations
    const customMessage = getSetting('enforcement.strict_main_scope_message',
      'Main scope is limited to coordination work only. Create AgentTasks via Task tool for all technical operations.');

    return blockOperation(`🚫 STRICT MODE: Operation not allowed in main scope strict mode

Tool: ${tool}

${customMessage}

Main scope is limited to coordination work:
✅ ALLOWED: Read, Grep, Glob, Task, TodoWrite, WebFetch, BashOutput, KillShell
✅ ALLOWED: All MCP tools (mcp__memory, mcp__context7, etc.)
✅ ALLOWED: Write/Edit to allowlist directories (stories/, bugs/, memory/, docs/, summaries/, agenttasks/)
✅ ALLOWED: Write/Edit to src/ when in development context (working on intelligent-claude-code)
✅ ALLOWED: Root files (*.md, VERSION, icc.config.json, icc.workflow.json)
✅ ALLOWED: Git workflow (git add/commit/push/pull/branch/checkout/merge/reset/stash/tag/remote)
✅ ALLOWED: Read-only bash (ls, cat, grep, less, more, ps, top, etc.)
✅ ALLOWED: mkdir for allowlist directories

❌ BLOCKED: All technical operations (infrastructure, build, deploy, scripting)

To disable strict mode: Set enforcement.strict_main_scope = false in icc.config.json`, log);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    allowOperation(log);
  }
}

if (require.main === module) {
  main();
}
