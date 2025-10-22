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

  /**
   * Check if command is a read-only infrastructure operation
   */
  function isReadOnlyInfrastructureCommand(command) {
    // Read-only infrastructure commands (allowed in main scope)
    const readOnlyPatterns = [
      // Kubernetes read operations
      'kubectl get', 'kubectl describe', 'kubectl logs', 'kubectl exec',
      // Docker read operations
      'docker ps', 'docker images', 'docker logs', 'docker inspect',
      // HTTP requests (ALL allowed - for docs, API data, etc.)
      'curl', 'wget',
      // NPM/package manager reads
      'npm list', 'npm view', 'npm search',
      'pip list', 'pip show',
      // Database read operations
      'mysql -e "SELECT', 'psql -c "SELECT',
      // System monitoring
      'systemctl status', 'service status'
    ];

    const cmd = command.trim();

    // Check if command matches read-only patterns
    for (const pattern of readOnlyPatterns) {
      if (cmd.startsWith(pattern)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if command is a modifying infrastructure operation
   */
  function isModifyingInfrastructureCommand(command) {
    // Commands that MODIFY external systems (blocked in main scope)
    const modifyingCommands = [
      // SSH (always modifying - can execute commands)
      'ssh', 'scp', 'rsync',
      // Kubernetes modifications
      'kubectl apply', 'kubectl create', 'kubectl delete', 'kubectl edit', 'kubectl patch', 'kubectl scale',
      // Docker modifications
      'docker run', 'docker start', 'docker stop', 'docker rm', 'docker build', 'docker push',
      // Infrastructure as code
      'terraform', 'ansible', 'ansible-playbook',
      // Package installations
      'npm install', 'npm uninstall', 'yarn add', 'yarn remove',
      'pip install', 'pip uninstall',
      'gem install', 'cargo install',
      // Build systems
      'make', 'cmake', 'gradle', 'mvn',
      // System service modifications
      'systemctl start', 'systemctl stop', 'systemctl restart',
      'service start', 'service stop', 'service restart',
      // Database modifications
      'mysql -e "INSERT', 'mysql -e "UPDATE', 'mysql -e "DELETE', 'mysql -e "DROP',
      'psql -c "INSERT', 'psql -c "UPDATE', 'psql -c "DELETE', 'psql -c "DROP'
    ];

    const cmd = command.trim();

    // Check if command starts with modifying operation
    for (const modifying of modifyingCommands) {
      if (cmd.startsWith(modifying)) {
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
✅ ALLOWED: Git workflow and read-only bash (git add/commit/push, git status, ls, cat, grep, ps, top, etc.)
✅ ALLOWED: mkdir for allowlist directories

❌ BLOCKED: Infrastructure commands (ssh, kubectl, docker, terraform, ansible, npm, etc.)
❌ BLOCKED: All other technical operations

To disable strict mode: Set enforcement.strict_main_scope = false in icc.config.json`, log);
      }
    }

    // Check Bash operations
    if (tool === 'Bash') {
      const bashCommand = command || '';

      // CRITICAL: Block modifying infrastructure commands
      if (isModifyingInfrastructureCommand(bashCommand)) {
        return blockOperation(
          'Modifying infrastructure commands not allowed in main scope',
          tool,
          `The command modifies external systems or infrastructure.

Main scope CANNOT modify infrastructure:
❌ SSH to servers (ssh always blocked - can execute commands)
❌ Create/modify containers (docker run, kubectl apply)
❌ Install packages (npm install, pip install)
❌ Deploy infrastructure (terraform, ansible)
❌ Modify databases (INSERT, UPDATE, DELETE)

Main scope CAN read infrastructure:
✅ kubectl get, kubectl logs, kubectl describe
✅ docker ps, docker logs, docker inspect
✅ curl/wget (ALL HTTP requests allowed for docs, API data)
✅ npm list, pip list

To execute modifying commands:
1. Create AgentTask via Task tool
2. Assign to @DevOps-Engineer or @System-Engineer
3. Agent executes in isolated context`
        );
      }

      // Allow read-only infrastructure commands
      if (isReadOnlyInfrastructureCommand(bashCommand)) {
        log(`Read-only infrastructure command allowed: ${bashCommand}`);
        return allowOperation(log);
      }

      // Then check if allowed coordination command
      if (isAllowedCoordinationCommand(bashCommand)) {
        log(`Allowed coordination command: ${bashCommand}`);
        return allowOperation(log);
      }

      // Check if mkdir for allowlist directory
      if (isAllowedMkdirCommand(bashCommand, projectRoot)) {
        log(`Mkdir for allowlist directory allowed: ${bashCommand}`);
        return allowOperation(log);
      }

      // Block all other technical bash commands
      const customMessage = getSetting('enforcement.strict_main_scope_message',
        'Main scope is limited to coordination work only. Create AgentTasks via Task tool for all technical operations.');

      return blockOperation(`🚫 STRICT MODE: Technical bash commands not allowed in main scope

Tool: ${tool}
Detail: ${bashCommand}

${customMessage}

Main scope is limited to coordination work:
✅ ALLOWED: Read, Grep, Glob, Task, TodoWrite, WebFetch, BashOutput, KillShell
✅ ALLOWED: All MCP tools (mcp__memory, mcp__context7, etc.)
✅ ALLOWED: Write/Edit to allowlist directories (stories/, bugs/, memory/, docs/, summaries/, agenttasks/)
✅ ALLOWED: Write/Edit to src/ when in development context (working on intelligent-claude-code)
✅ ALLOWED: Root files (*.md, VERSION, icc.config.json, icc.workflow.json)
✅ ALLOWED: Git workflow and read-only bash (git add/commit/push, git status, ls, cat, grep, ps, top, etc.)
✅ ALLOWED: mkdir for allowlist directories

❌ BLOCKED: Infrastructure commands (ssh, kubectl, docker, terraform, ansible, npm, etc.)
❌ BLOCKED: All other technical operations

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
✅ ALLOWED: Git workflow and read-only bash (git add/commit/push, git status, ls, cat, grep, ps, top, etc.)
✅ ALLOWED: mkdir for allowlist directories

❌ BLOCKED: Infrastructure commands (ssh, kubectl, docker, terraform, ansible, npm, etc.)
❌ BLOCKED: All other technical operations

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
