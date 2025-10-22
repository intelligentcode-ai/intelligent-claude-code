#!/usr/bin/env node

/**
 * Main Scope Enforcement Hook
 *
 * Enforces strict main scope coordination-only mode when strict_main_scope enabled.
 * Main scope (no agent marker) can ONLY do coordination work.
 * All technical operations MUST go through Task tool + agents.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { loadConfig, getSetting } = require('./lib/config-loader');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-main-scope-enforcement.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function cleanOldLogs(logDir) {
    try {
      const files = fs.readdirSync(logDir);
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      for (const file of files) {
        if (!file.endsWith('.log')) continue;

        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);

        if (now - stats.mtimeMs > maxAge) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (error) {
      // Silent fail - don't block hook execution
    }
  }

  // Clean old logs at hook start
  cleanOldLogs(logDir);

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  function checkAgentMarker(projectRoot, sessionId) {
    const crypto = require('crypto');
    const projectHash = crypto.createHash('md5').update(projectRoot).digest('hex').substring(0, 8);

    const markerDir = path.join(os.homedir(), '.claude', 'tmp');

    // CRITICAL: Ensure marker directory exists before reading markers
    if (!fs.existsSync(markerDir)) {
      fs.mkdirSync(markerDir, { recursive: true });
      log(`Created marker directory: ${markerDir}`);
    }

    const markerFile = path.join(markerDir, `agent-executing-${sessionId}-${projectHash}`);

    try {
      if (!fs.existsSync(markerFile)) {
        log(`Main scope detected - no marker file for project ${projectRoot}`);
        return false;
      }

      const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
      const agentCount = marker.agent_count || 0;

      if (agentCount > 0) {
        log(`Agent context detected - ${agentCount} active agent(s)`);
        return true;
      } else {
        log(`Main scope detected - marker exists but agent_count is 0`);
        return false;
      }
    } catch (error) {
      log(`Error reading marker file: ${error.message} - assuming main scope`);
      return false;
    }
  }

  function isInAllowlist(filePath, projectRoot) {
    // Load configuration to get allowlist paths
    const config = loadConfig();
    const allowlist = [
      config.paths.story_path,
      config.paths.bug_path,
      config.paths.memory_path,
      config.paths.docs_path,
      'agenttasks',
      'summaries'
    ];

    // Normalize to relative path if absolute
    let relativePath = filePath;
    if (path.isAbsolute(filePath)) {
      relativePath = path.relative(projectRoot, filePath);
    }

    const fileName = path.basename(relativePath);
    const dirName = path.dirname(relativePath);

    // Check if file is in root and ends with .md
    if ((dirName === '.' || dirName === '') && fileName.endsWith('.md')) {
      return true;
    }

    // Check if file is root config/version file
    if ((dirName === '.' || dirName === '') &&
        (fileName === 'icc.config.json' || fileName === 'icc.workflow.json' || fileName === 'VERSION')) {
      return true;
    }

    // Check if path starts with any allowlist directory
    for (const allowedPath of allowlist) {
      if (relativePath.startsWith(allowedPath + '/') || relativePath === allowedPath) {
        return true;
      }
    }

    return false;
  }

  function isAllowedCoordinationCommand(command) {
    // Allowed commands for coordination work (includes git workflow)
    const allowedCommands = [
      // Git operations (workflow commands)
      'git status', 'git log', 'git diff', 'git show',
      'git add', 'git commit', 'git push', 'git pull',
      'git branch', 'git checkout', 'git fetch', 'git merge',
      'git reset', 'git stash', 'git tag',
      // Read-only information commands
      'ls', 'find', 'cat', 'head', 'tail', 'grep',
      'date', 'pwd', 'whoami', 'echo'
    ];

    // Check if command starts with any allowed command
    for (const allowed of allowedCommands) {
      if (command.trim().startsWith(allowed)) {
        return true;
      }
    }

    return false;
  }

  function isAllowedMkdirCommand(command, projectRoot) {
    // Check if command is mkdir
    if (!command.trim().startsWith('mkdir')) {
      return false;
    }

    // Load configuration
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
    // Handles: mkdir dir, mkdir -p dir, mkdir -p /absolute/path/dir
    const mkdirMatch = command.match(/mkdir\s+(?:-p\s+)?(.+?)(?:\s|$)/);
    if (!mkdirMatch) {
      return false;
    }

    let targetPath = mkdirMatch[1].trim();

    // Remove quotes if present
    targetPath = targetPath.replace(/^["']|["']$/g, '');

    // Normalize to absolute path
    const absolutePath = path.isAbsolute(targetPath)
      ? targetPath
      : path.join(projectRoot, targetPath);

    const normalizedPath = path.normalize(absolutePath);

    // Split path into components
    const pathParts = normalizedPath.split(path.sep);

    // Check if ANY path component matches an allowlist directory
    for (const allowedDir of allowlist) {
      if (pathParts.includes(allowedDir)) {
        return true;
      }
    }

    return false;
  }

  function blockOperation(reason, tool, detail = '') {
    const customMessage = getSetting('enforcement.strict_main_scope_message',
      'Main scope is limited to coordination work only. Create AgentTasks via Task tool for all technical operations.');

    const message = `🚫 STRICT MODE: ${reason}

Tool: ${tool}
${detail ? `Detail: ${detail}` : ''}

${customMessage}

Main scope is limited to coordination work:
✅ ALLOWED: Read, Grep, Glob, Task, TodoWrite, WebFetch
✅ ALLOWED: All MCP tools (mcp__memory, mcp__context7, etc.)
✅ ALLOWED: Write/Edit to allowlist directories (stories/, bugs/, memory/, docs/)
✅ ALLOWED: Root files (*.md, VERSION, icc.config.json, icc.workflow.json)
✅ ALLOWED: Git workflow and read-only bash (git add/commit/push, git status, ls, cat, grep, etc.)
✅ ALLOWED: mkdir for allowlist directories (stories/, bugs/, memory/, docs/)

❌ BLOCKED: All technical operations (infrastructure, build, deploy, scripting)

To disable strict mode: Set enforcement.strict_main_scope = false in icc.config.json`;

    log(`BLOCKED: ${reason} - ${tool} - ${detail}`);

    const response = {
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: message
      }
    };

    console.log(JSON.stringify(response));
    process.exit(2);
  }

  try {
    // Parse input from multiple sources
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        inputData = fs.readFileSync(0, 'utf8');
      } catch (stdinError) {
        log(`WARN: Failed to read stdin: ${stdinError.message} - allowing operation`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    const hookInput = JSON.parse(inputData);
    log(`PreToolUse triggered: ${JSON.stringify(hookInput)}`);

    // Get working directory and project root
    const cwdPath = hookInput.cwd || process.cwd();
    const projectRoot = process.env.CLAUDE_PROJECT_DIR || cwdPath;

    // 1. Check for agent marker (if agent, skip enforcement)
    const isAgentContext = checkAgentMarker(projectRoot, hookInput.session_id);
    if (isAgentContext) {
      log('Agent context detected - strict main scope enforcement skipped');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // 2. Check if strict mode enabled
    const strictMode = getSetting('enforcement.strict_main_scope', true);
    if (!strictMode) {
      log('Strict main scope mode disabled - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // 3. Validate main scope operation
    const tool = hookInput.tool_name || hookInput.tool || '';
    const toolInput = hookInput.tool_input || hookInput.parameters || {};

    if (!tool) {
      log('No tool specified - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Allow ALL MCP tools (read-only operations like memory search, docs fetch)
    if (tool && tool.startsWith('mcp__')) {
      log(`MCP tool allowed in main scope: ${tool}`);
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Allow coordination tools
    const coordinationTools = ['Read', 'Grep', 'Glob', 'Task', 'TodoWrite', 'WebFetch', 'BashOutput', 'KillShell'];
    if (coordinationTools.includes(tool)) {
      log(`Coordination tool allowed: ${tool}`);
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Check Write/Edit operations
    if (tool === 'Write' || tool === 'Edit') {
      const filePath = toolInput.file_path || '';
      if (isInAllowlist(filePath, projectRoot)) {
        log(`Write to allowlist directory allowed: ${filePath}`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      } else {
        // Block write outside allowlist
        return blockOperation('Write/Edit operations outside allowlist directories not allowed in main scope', tool, filePath);
      }
    }

    // Check Bash operations
    if (tool === 'Bash') {
      const command = toolInput.command || '';

      if (isAllowedCoordinationCommand(command)) {
        log(`Allowed coordination command: ${command}`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }

      // Check if mkdir for allowlist directory
      if (isAllowedMkdirCommand(command, projectRoot)) {
        log(`Mkdir for allowlist directory allowed: ${command}`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }

      // Block all other technical bash commands
      return blockOperation('Technical bash commands not allowed in main scope', tool, command);
    }

    // Block all other operations
    return blockOperation('Operation not allowed in main scope strict mode', tool);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
