#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { loadConfig, getSetting } = require('./lib/config-loader');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-pm-constraints-enforcement.log`);

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

  function loadConfiguration() {
    log('Loading configuration via unified config-loader');
    const config = loadConfig();

    // Extract path settings
    const pathConfig = {
      story_path: config.paths.story_path,
      bug_path: config.paths.bug_path,
      memory_path: config.paths.memory_path,
      docs_path: config.paths.docs_path,
      src_path: config.paths.src_path,
      test_path: config.paths.test_path,
      config_path: config.paths.config_path,
      summaries_path: config.paths.summaries_path
    };

    // Normalize paths (remove trailing slashes)
    for (const key in pathConfig) {
      pathConfig[key] = pathConfig[key].replace(/\/$/, '');
    }

    log(`Configuration loaded: ${JSON.stringify(pathConfig)}`);
    return pathConfig;
  }

  function getConfiguredPaths() {
    const config = loadConfiguration();

    return {
      allowlist: [
        config.story_path,
        config.bug_path,
        config.memory_path,
        config.docs_path,
        'agenttasks',           // Always allow agenttasks directory
        'icc.config.json',      // Project configuration file
        'icc.workflow.json',    // Workflow configuration file
        'summaries'             // Summaries and reports directory
      ],
      blocklist: [
        config.src_path,
        config.test_path,
        config.config_path,
        'lib'  // Always block lib directory
      ]
    };
  }

  function isPMRole(hookInput) {
    const session_id = hookInput.session_id;

    // Generate project hash from project root for project-specific markers
    const crypto = require('crypto');
    const projectRoot = hookInput.cwd || process.cwd();
    const projectHash = crypto.createHash('md5').update(projectRoot).digest('hex').substring(0, 8);

    const markerDir = path.join(os.homedir(), '.claude', 'tmp');
    const markerFile = path.join(markerDir, `agent-executing-${session_id}-${projectHash}`);

    try {
      if (!fs.existsSync(markerFile)) {
        log(`PM context detected - no marker file for project ${projectRoot}`);
        return true;
      }

      const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
      const agentCount = marker.agent_count || 0;

      if (agentCount > 0) {
        log(`Agent context detected - ${agentCount} active agent(s) in project ${projectRoot}`);
        return false;
      } else {
        log(`PM context detected - marker exists but agent_count is 0 for project ${projectRoot}`);
        return true;
      }
    } catch (error) {
      log(`Error reading marker file: ${error.message} - assuming PM context`);
      return true;
    }
  }

  function extractCommandsFromBash(commandString) {
    // First, remove all quoted strings (both single and double quotes)
    // Replace with placeholder to maintain word boundaries
    let cleanedCommand = commandString;

    // Remove double-quoted strings: "text"
    cleanedCommand = cleanedCommand.replace(/"[^"]*"/g, '""');

    // Remove single-quoted strings: 'text'
    cleanedCommand = cleanedCommand.replace(/'[^']*'/g, "''");

    // Split by command separators: && || ; |
    const statements = cleanedCommand.split(/&&|\|\||;|\|/).map(s => s.trim());

    const commands = [];

    for (const statement of statements) {
      // Remove leading/trailing whitespace
      const trimmed = statement.trim();
      if (!trimmed) continue;

      // Split into words
      const words = trimmed.split(/\s+/);

      // Skip environment variables (FOO=bar, VAR=val)
      let commandIndex = 0;
      while (commandIndex < words.length && words[commandIndex].includes('=')) {
        commandIndex++;
      }

      if (commandIndex < words.length) {
        const cmd = words[commandIndex];

        // Extract command name (ignore paths)
        // If command contains '/', take only the last part (basename)
        const commandName = cmd.includes('/') ? cmd.split('/').pop() : cmd;

        commands.push(commandName);
      }
    }

    return commands;
  }

  function validateBashCommand(command) {
    // Allow read-only process inspection commands (ps, grep, pgrep, etc.)
    const readOnlyInspectionCommands = ['ps', 'pgrep', 'pidof', 'lsof', 'netstat', 'ss', 'top', 'htop'];

    // Check if this is a read-only inspection command
    const firstWord = command.trim().split(/\s+/)[0];
    if (readOnlyInspectionCommands.includes(firstWord)) {
      return { allowed: true };
    }

    // Special case: grep is read-only if it's part of a pipe (ps aux | grep)
    // Check if command contains " | grep" or starts with grep for file reading
    if (command.includes(' | grep') || command.match(/^\s*grep\s+/)) {
      // This is grep being used for filtering/searching, not executing
      return { allowed: true };
    }

    // Special case: kubectl read-only commands allowed
    if (firstWord === 'kubectl') {
      const readOnlyKubectlSubcommands = [
        'get', 'describe', 'logs', 'top', 'version', 'cluster-info',
        'config view', 'api-resources', 'api-versions', 'explain'
      ];

      // Extract kubectl subcommand (second word after kubectl)
      const kubectlSubcommand = command.trim().split(/\s+/)[1];

      if (readOnlyKubectlSubcommands.includes(kubectlSubcommand)) {
        return { allowed: true };
      }

      // If not read-only, fall through to normal blocking
    }

    // Block build/deploy/system commands in PM scope
    const blockedCommands = [
      'npm', 'yarn', 'make', 'docker', 'cargo', 'mvn', 'gradle', 'go',
      'terraform', 'ansible', 'helm', 'systemctl', 'service',
      'apt', 'yum', 'brew', 'pip', 'gem', 'composer',
      'python', 'python3', 'node', 'ruby', 'perl', 'php',  // Scripting languages
      'nohup', 'screen', 'tmux',  // Background/session tools
      'sed', 'awk',  // Stream/text processing (file modification)
      'vi', 'vim', 'nano', 'emacs'  // Text editors
    ];

    // Add infrastructure tools from configuration (PM blacklist - includes kubectl, govc, etc.)
    const pmInfrastructureBlacklist = getSetting('enforcement.infrastructure_protection.pm_blacklist', []);
    const allBlockedCommands = [...blockedCommands, ...pmInfrastructureBlacklist];

    // Check for Python heredoc pattern (python3 << 'PYEOF')
    if (command.includes('<<') && (command.includes('python') || command.includes('node') || command.includes('ruby'))) {
      return {
        allowed: false,
        message: `🚫 PM role cannot execute inline scripts via heredoc - create Agents using AgentTasks for technical work

Blocked pattern: Script heredoc (python3 << 'EOF', node << 'EOF', etc.)
Full command: ${command}

Inline scripts require technical implementation by specialist agents.

Use Task tool to create specialist agent via AgentTask.`
      };
    }

    // Extract actual commands being executed (ignore paths and arguments)
    const actualCommands = extractCommandsFromBash(command);

    // Check if ANY actual command is in the blocked list
    for (const cmd of actualCommands) {
      // Check against blocked commands
      for (const blocked of allBlockedCommands) {
        // Match command name exactly or with suffix (e.g., npm vs npm-install)
        if (cmd === blocked || cmd.startsWith(blocked + '-')) {
          // Provide specific guidance for kubectl commands
          let kubectlGuidance = '';
          if (blocked === 'kubectl') {
            kubectlGuidance = `

kubectl Read-only (ALLOWED): get, describe, logs, top, version, cluster-info, config view, api-resources, api-versions, explain
kubectl Destructive (BLOCKED): delete, apply, create, patch, replace, scale, rollout, drain, cordon, taint, label, annotate`;
          }

          return {
            allowed: false,
            message: `🚫 PM role cannot execute build/deploy/system commands - create Agents using AgentTasks for technical work

Blocked command: ${cmd}
Full command: ${command}

Build/Deploy tools: npm, yarn, make, docker, cargo, mvn, gradle, go
System tools: terraform, ansible, helm, systemctl, service, apt, yum, brew, pip, gem, composer
Infrastructure: ${pmInfrastructureBlacklist.join(', ')} ⚠️ DESTRUCTIVE
Scripting languages: python, python3, node, ruby, perl, php
Background tools: nohup, screen, tmux
Text processing: sed, awk
Text editors: vi, vim, nano, emacs${kubectlGuidance}

Infrastructure-as-Code Principle: Use declarative tools, not imperative commands.
All infrastructure tools are configurable in: enforcement.infrastructure_protection.pm_blacklist
Use Task tool to create specialist agent via AgentTask with explicit approval.`
          };
        }
      }
    }

    return { allowed: true };
  }

  function isPathInAllowlist(filePath, allowlist, projectRoot) {
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

    // Check if file is VERSION in root
    if ((dirName === '.' || dirName === '') && fileName === 'VERSION') {
      return true;
    }

    // Check if file is root config file (icc.config.json or icc.workflow.json)
    if ((dirName === '.' || dirName === '') &&
        (fileName === 'icc.config.json' || fileName === 'icc.workflow.json')) {
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

  function isPathInBlocklist(filePath, blocklist, projectRoot) {
    // Normalize to relative path if absolute
    let relativePath = filePath;

    if (path.isAbsolute(filePath)) {
      relativePath = path.relative(projectRoot, filePath);
    }

    // Check if path starts with any blocklist directory
    for (const blockedPath of blocklist) {
      if (relativePath.startsWith(blockedPath + '/') || relativePath === blockedPath) {
        return true;
      }
    }

    return false;
  }

  function isSummaryFile(filePath, projectRoot) {
    // Normalize to relative path if absolute
    let relativePath = filePath;

    if (path.isAbsolute(filePath)) {
      relativePath = path.relative(projectRoot, filePath);
    }

    const fileName = path.basename(relativePath);

    // Check if filename matches summary patterns (case-insensitive)
    // Check ANY directory, not just project root
    const upperFileName = fileName.toUpperCase();
    const summaryPatterns = ['SUMMARY', 'REPORT', 'VALIDATION', 'ANALYSIS', 'FIX', 'PATH-MATCHING', 'ROOT_CAUSE'];

    return summaryPatterns.some(pattern => upperFileName.includes(pattern));
  }

  function validateSummaryFile(filePath, projectRoot) {
    if (!isSummaryFile(filePath, projectRoot)) {
      return { allowed: true };
    }

    const fileName = path.basename(filePath);
    const isAllCapitals = fileName === fileName.toUpperCase();
    const suggestedName = isAllCapitals ? fileName.toLowerCase() : fileName;
    const suggestedPath = `summaries/${suggestedName}`;

    // Ensure summaries directory exists in the project root
    const summariesDir = path.join(projectRoot, 'summaries');
    if (!fs.existsSync(summariesDir)) {
      fs.mkdirSync(summariesDir, { recursive: true });
      log('Created summaries/ directory for summary file redirection');
    }

    const capitalsWarning = isAllCapitals ? '\n⚠️ Filename is all-capitals - use lowercase for consistency' : '';

    return {
      allowed: false,
      message: `📋 Summary files belong in ./summaries/ directory

Blocked: ${filePath}
Suggested: ${suggestedPath}${capitalsWarning}

Please create summary files in the summaries/ directory to keep project root clean.`
    };
  }

  function validateMarkdownOutsideAllowlist(filePath, projectRoot, isAgentContext = false) {
    // Check appropriate setting based on context
    let allowMarkdown;

    if (isAgentContext) {
      // For agents: check agent-specific setting first, fallback to main setting
      const agentSetting = getSetting('enforcement.allow_markdown_outside_allowlist_agents', null);
      allowMarkdown = agentSetting !== null ? agentSetting : getSetting('enforcement.allow_markdown_outside_allowlist', false);
    } else {
      // For main scope: use main setting
      allowMarkdown = getSetting('enforcement.allow_markdown_outside_allowlist', false);
    }

    if (allowMarkdown) {
      return { allowed: true };
    }

    // Check if file is markdown
    if (!filePath.endsWith('.md')) {
      return { allowed: true };
    }

    // Normalize to relative path if absolute
    let relativePath = filePath;
    if (path.isAbsolute(filePath)) {
      relativePath = path.relative(projectRoot, filePath);
    }

    // Get configured allowlist
    const config = loadConfiguration();
    const allowlist = [
      config.story_path,
      config.bug_path,
      config.memory_path,
      config.docs_path,
      'agenttasks',
      'summaries'
    ];

    // Check if markdown is in root (root .md files are allowed)
    const dirName = path.dirname(relativePath);
    if (dirName === '.' || dirName === '') {
      return { allowed: true };
    }

    // Check if markdown is in allowlist directory
    for (const allowedPath of allowlist) {
      if (relativePath.startsWith(allowedPath + '/') || relativePath === allowedPath) {
        return { allowed: true };
      }
    }

    // Markdown file outside allowlist and setting is false - block it
    return {
      allowed: false,
      message: `📝 Markdown files outside allowlist directories are blocked by default

Blocked: ${filePath}
Reason: Markdown files should be in designated directories

Allowed directories for markdown: ${allowlist.join(', ')}, root *.md files

If you specifically requested this file, ask the user to enable:
enforcement.allow_markdown_outside_allowlist = true in icc.config.json

Or create the file in an appropriate allowlist directory.`
    };
  }

  function getBlockingEnabled() {
    const enabled = getSetting('enforcement.blocking_enabled', true);
    log(`blocking_enabled=${enabled} (from unified config)`);
    return enabled;
  }

  function validatePMOperation(filePath, tool, paths, projectRoot) {
    const { allowlist, blocklist } = paths;

    // Check blocklist first (explicit denial)
    if (isPathInBlocklist(filePath, blocklist, projectRoot)) {
      const blockedDir = blocklist.find(p => filePath.startsWith(p + '/'));
      return {
        allowed: false,
        message: `🚫 PM role is coordination only - create Agents using AgentTasks for technical work

Blocked: ${filePath}
Reason: PM cannot modify files in ${blockedDir}/

Allowed directories: ${allowlist.join(', ')}, root *.md files
Use Task tool to create specialist agent via AgentTask.`
      };
    }

    // Check allowlist (explicit permission)
    if (isPathInAllowlist(filePath, allowlist, projectRoot)) {
      return { allowed: true };
    }

    // Not in allowlist = blocked
    return {
      allowed: false,
      message: `🚫 PM role is coordination only - create Agents using AgentTasks for technical work

Blocked: ${filePath}
Reason: File path not in PM allowlist

Allowed directories: ${allowlist.join(', ')}, root *.md files
Use Task tool to create specialist agent via AgentTask.`
    };
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

    // Check for bypass permissions mode - log but still enforce PM constraints
    const permissionMode = hookInput.permission_mode || '';
    if (permissionMode === 'bypassPermissions') {
      log(`⚠️ BYPASS MODE DETECTED - PM constraints will still be enforced (architectural requirement)`);
    }

    // Extract tool and parameters from Claude Code format
    // Claude Code sends: { tool_name: "Edit", tool_input: { file_path: "..." } }
    const tool = hookInput.tool_name || hookInput.tool || '';
    const toolInput = hookInput.tool_input || hookInput.parameters || {};
    const filePath = toolInput.file_path || '';
    const command = toolInput.command || '';

    // Get project root from hookInput.cwd (agent's working directory) or fallback to process.cwd()
    const projectRoot = hookInput.cwd || process.cwd();
    log(`Project root: ${projectRoot}`);

    if (!tool) {
      log('No tool specified - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    log(`Tool: ${tool}, FilePath: ${filePath}, Command: ${command}`);

    // Always allow Task tool (agent creation) - no PM restrictions apply
    if (tool === 'Task') {
      log('Task tool invocation - always allowed (agent creation)');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Check for summary files in root (applies to Write/Edit/Update only, not Read)
    if (tool !== 'Read' && filePath.endsWith('.md')) {
      const summaryValidation = validateSummaryFile(filePath, projectRoot);
      if (!summaryValidation.allowed) {
        log(`Summary file blocked: ${filePath}`);

        const blockingEnabled = getBlockingEnabled();

        if (blockingEnabled) {
          // BLOCKING MODE (default)
          const response = {
            hookSpecificOutput: {
              hookEventName: 'PreToolUse',
              permissionDecision: 'deny',
              permissionDecisionReason: summaryValidation.message
            }
          };
          const responseJson = JSON.stringify(response);
          log(`RESPONSE: ${responseJson}`);
          log(`EXIT CODE: 2 (BLOCKING MODE)`);
          console.log(responseJson);
          process.exit(2);
        } else {
          // WARNING MODE (non-blocking)
          log(`⚠️ WARNING (non-blocking): ${summaryValidation.message}`);
          console.log(JSON.stringify({ continue: true }));
          process.exit(0);
        }
      }
    }

    // Check for markdown files outside allowlist (applies to ALL roles)
    const isAgentContext = !isPMRole(hookInput);
    const markdownValidation = validateMarkdownOutsideAllowlist(filePath, projectRoot, isAgentContext);
    if (!markdownValidation.allowed) {
      log(`Markdown file outside allowlist blocked: ${filePath}`);

      const blockingEnabled = getBlockingEnabled();

      if (blockingEnabled) {
        // BLOCKING MODE (default)
        const response = {
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: markdownValidation.message
          }
        };
        const responseJson = JSON.stringify(response);
        log(`RESPONSE: ${responseJson}`);
        log(`EXIT CODE: 2 (BLOCKING MODE)`);
        console.log(responseJson);
        process.exit(2);
      } else {
        // WARNING MODE (non-blocking)
        log(`⚠️ WARNING (non-blocking): ${markdownValidation.message}`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }
    }

    // Check if PM role and validate
    if (isPMRole(hookInput)) {
      log('PM role active - validating operation');

      // Block Edit/Write/Update tools ONLY for files not in allowlist
      if (tool === 'Edit' || tool === 'Write' || tool === 'Update' || tool === 'MultiEdit') {
        log(`File modification tool detected: ${tool} on ${filePath}`);

        const paths = getConfiguredPaths();
        const validation = validatePMOperation(filePath, tool, paths, projectRoot);

        if (!validation.allowed) {
          const blockingEnabled = getBlockingEnabled();

          if (blockingEnabled) {
            const response = {
              hookSpecificOutput: {
                hookEventName: 'PreToolUse',
                permissionDecision: 'deny',
                permissionDecisionReason: validation.message
              }
            };
            const responseJson = JSON.stringify(response);
            log(`RESPONSE: ${responseJson}`);
            log(`EXIT CODE: 2 (BLOCKING MODE)`);
            console.log(responseJson);
            process.exit(2);
          } else {
            log(`⚠️ WARNING (non-blocking): ${validation.message}`);
            console.log(JSON.stringify({ continue: true }));
            process.exit(0);
          }
        } else {
          log(`File modification allowed - ${filePath} is in PM allowlist`);
        }
      }

      // Validate Bash commands
      if (tool === 'Bash' && command) {
        log(`Validating Bash command: ${command}`);
        const bashValidation = validateBashCommand(command);

        if (!bashValidation.allowed) {
          log(`Bash command BLOCKED: ${command}`);

          const blockingEnabled = getBlockingEnabled();

          if (blockingEnabled) {
            // BLOCKING MODE (default)
            const response = {
              hookSpecificOutput: {
                hookEventName: 'PreToolUse',
                permissionDecision: 'deny',
                permissionDecisionReason: bashValidation.message
              }
            };
            const responseJson = JSON.stringify(response);
            log(`RESPONSE: ${responseJson}`);
            log(`EXIT CODE: 2 (BLOCKING MODE)`);
            console.log(responseJson);
            process.exit(2);
          } else {
            // WARNING MODE (non-blocking)
            log(`⚠️ WARNING (non-blocking): ${bashValidation.message}`);
            console.log(JSON.stringify({ continue: true }));
            process.exit(0);
          }
        }

        log(`Bash command ALLOWED: ${command}`);
      }

      // Note: Edit/Write/Update/MultiEdit are now blocked entirely above (lines 469-501)
      // No file path validation needed - all file modifications require AgentTasks
    }

    // Non-PM role or allowed operation
    log('Operation allowed');
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);

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
