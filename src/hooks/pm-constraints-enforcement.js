#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { loadConfig, getSetting } = require('./lib/config-loader');
const { isDevelopmentContext } = require('./lib/context-detection');
const { checkToolBlacklist } = require('./lib/tool-blacklist');
const { validateSummaryFilePlacement } = require('./lib/summary-validation');
const { isCorrectDirectory, getSuggestedPath } = require('./lib/directory-enforcement');
const { initializeHook } = require('./lib/logging');
const { isAllowedCoordinationCommand } = require('./lib/command-validation');
const { getProjectRoot } = require('./lib/hook-helpers');
const { isAgentContext, isPMRole } = require('./lib/marker-detection');

// Load config ONCE at module level (not on every hook invocation)
const PM_EXTRA_COMMANDS = getSetting('enforcement.pm_allowed_bash_commands', [
  'gh pr list', 'gh pr view', 'gh pr status',
  'gh issue list', 'gh issue view'
]);
const PM_INFRASTRUCTURE_BLACKLIST = getSetting('enforcement.tool_blacklist.infrastructure', []);
const HEREDOC_ALLOWED_COMMANDS = getSetting('enforcement.heredoc_allowed_commands', ['git', 'gh', 'glab', 'hub']);
const ALLOW_PARENT_ALLOWLIST_PATHS = process.env.ALLOW_PARENT_ALLOWLIST_PATHS
  ? process.env.ALLOW_PARENT_ALLOWLIST_PATHS === 'true'
  : getSetting('enforcement.allow_parent_allowlist_paths', false);
const ALLOW_MARKDOWN_OUTSIDE_ALLOWLIST_AGENTS = getSetting('enforcement.allow_markdown_outside_allowlist_agents', null);
const ALLOW_MARKDOWN_OUTSIDE_ALLOWLIST = getSetting('enforcement.allow_markdown_outside_allowlist', false);
const BLOCKING_ENABLED = getSetting('enforcement.blocking_enabled', true);

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('pm-constraints-enforcement');

  // ENTRY LOG: Detect hook invocation vs silent exits
  log('=== HOOK ENTRY: pm-constraints-enforcement.js invoked ===');

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

  function getConfiguredPaths(projectRoot) {
    const config = loadConfiguration();

    const allowlist = [
      config.story_path,
      config.bug_path,
      config.memory_path,
      config.docs_path,
      'agenttasks',           // Always allow agenttasks directory
      'icc.config.json',      // Project configuration file
      'icc.workflow.json',    // Workflow configuration file
      'summaries',            // Summaries and reports directory
      'tests'                 // Allow test file creation for comprehensive coverage
    ];

    // In development context, allow src/ directory edits
    if (isDevelopmentContext(projectRoot)) {
      allowlist.push('src');
      log('Development context detected - src/ added to PM allowlist');
    }

    return {
      allowlist: allowlist,
      blocklist: [
        config.src_path,
        config.test_path,
        config.config_path,
        'lib'  // Always block lib directory
      ]
    };
  }

  // Note: isDevelopmentContext() is now provided by shared library
  // Location: src/hooks/lib/context-detection.js

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

  function extractFilePathsFromBashRedirect(command) {
    // Extract file paths from Bash redirect operators: >, >>, cat >, echo >
    // Patterns: cat > file, echo > file, command > file, command >> file
    const redirectPatterns = [
      /(?:cat|echo|tee)\s+>\s*([^\s<>|&;]+)/,  // cat > file, echo > file, tee > file
      />\s*([^\s<>|&;]+)/,                      // Any command > file
      />>\s*([^\s<>|&;]+)/                      // Any command >> file
    ];

    const filePaths = [];

    for (const pattern of redirectPatterns) {
      const match = command.match(pattern);
      if (match && match[1]) {
        // Extract filename, removing quotes if present
        let filePath = match[1].replace(/^["']|["']$/g, '');
        filePaths.push(filePath);
      }
    }

    return filePaths;
  }

  function validateBashCommand(command, projectRoot) {
    // Allow read-only process inspection commands (ps, grep, pgrep, etc.)
    const readOnlyInspectionCommands = ['ps', 'pgrep', 'pidof', 'lsof', 'netstat', 'ss', 'top', 'htop'];

    // Check if this is a read-only inspection command
    const firstWord = command.trim().split(/\s+/)[0];
    if (readOnlyInspectionCommands.includes(firstWord)) {
      return { allowed: true };
    }

    // Check if command is allowed coordination command (unified with main-scope)
    if (isAllowedCoordinationCommand(command, { role: 'pm' })) {
      log(`PM-allowed coordination command: ${command}`);
      return { allowed: true };
    }

    // Additionally check PM-specific commands from configuration (gh CLI, etc.)
    const pmExtraCommands = PM_EXTRA_COMMANDS;

    for (const allowedCmd of pmExtraCommands) {
      if (command.trim().startsWith(allowedCmd + ' ') || command.trim() === allowedCmd) {
        log(`PM-allowed extra command: ${allowedCmd} (full command: ${command})`);
        return { allowed: true };
      }
    }

    // Check for SSH remote execution BEFORE other validation
    // SSH commands execute quoted strings on remote systems, so we must validate the remote command
    const sshPattern = /\bssh\b[^"']*["']([^"']+)["']/;
    const sshMatch = command.match(sshPattern);

    if (sshMatch) {
      // Extract remote command from quoted string
      const remoteCommand = sshMatch[1];
      log(`SSH remote command detected: ${remoteCommand}`);
      // Recursively validate the FULL remote command (preserves kubectl subcommands)
      return validateBashCommand(remoteCommand, projectRoot);
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

    // Check for file creation via Bash redirect (cat >, echo >, >, >>)
    // Extract file paths and validate for ALL-CAPITALS
    const redirectedFiles = extractFilePathsFromBashRedirect(command);
    for (const filePath of redirectedFiles) {
      if (filePath.endsWith('.md')) {
        const fileName = path.basename(filePath);
        const isAllCapitals = fileName === fileName.toUpperCase();

        if (isAllCapitals) {
          const suggestedName = fileName.toLowerCase();
          const suggestedPath = filePath.replace(fileName, suggestedName);

          return {
            allowed: false,
            message: `🚫 PM role cannot create ALL-CAPITALS markdown files - use lowercase for consistency

Blocked: ${filePath}
Suggested: ${suggestedPath}

ALL-CAPITALS filenames violate project naming conventions.
Use lowercase filenames with hyphens for word separation.

Example: story-003-completion-summary.md instead of STORY-003-COMPLETION-SUMMARY.md

Use Write tool with lowercase filename or create AgentTask for file creation.

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
4. Agent provides comprehensive summary with results`
          };
        }
      }
    }

    // Block build/deploy/system commands in PM scope
    const blockedCommands = [
      'npm', 'yarn', 'make', 'docker', 'cargo', 'mvn', 'gradle', 'go',
      'terraform', 'ansible', 'helm', 'systemctl', 'service',
      'apt', 'yum', 'brew', 'pip', 'gem', 'composer',
      'python', 'python3', 'node', 'ruby', 'perl', 'php',  // Scripting languages
      'nohup', 'screen', 'tmux',  // Background/session tools
      'sed', 'awk',  // Stream/text processing (file modification)
      'vi', 'vim', 'nano', 'emacs',  // Text editors
      'ssh', 'scp', 'sftp', 'rsync'  // Remote access and file transfer
    ];

    // Add infrastructure tools from unified configuration (infrastructure_protection.pm_blacklist)
    const pmInfrastructureBlacklist = PM_INFRASTRUCTURE_BLACKLIST;
    const allBlockedCommands = [...blockedCommands, ...pmInfrastructureBlacklist];

    // Check for ANY heredoc pattern (<< 'EOF', << EOF, <<EOF, <<-EOF)
    // Whitelist approach: Allow specific commands (git, gh, glab, hub) to use heredocs
    if (command.includes('<<')) {
      // Load heredoc allowed commands from unified config
      const allowedHeredocCommands = HEREDOC_ALLOWED_COMMANDS;

      // Extract the actual command being executed
      const cmdStart = command.trim().split(/\s+/)[0];

      // Check if command is in allowed list
      const isAllowed = allowedHeredocCommands.some(allowed =>
        command.trim().startsWith(allowed + ' ') || command.trim().startsWith(allowed + '\n')
      );

      if (isAllowed) {
        log(`Allowing heredoc for whitelisted command: ${cmdStart}`);
        // Continue with other validation - don't return here
      } else {
        return {
          allowed: false,
          message: `🚫 PM role cannot execute heredoc commands - create Agents using AgentTasks for technical work

Blocked pattern: Heredoc (cat << 'EOF', python << 'EOF', etc.)
Full command: ${command}

Allowed heredoc commands: ${allowedHeredocCommands.join(', ')}

Heredoc commands (both shell and scripting) require technical implementation by specialist agents.
Use Write tool for file creation or Task tool to create specialist agent via AgentTask.

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
4. Agent provides comprehensive summary with results`
        };
      }
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
Text editors: vi, vim, nano, emacs
Remote access: ssh, scp, sftp, rsync${kubectlGuidance}

Infrastructure-as-Code Principle: Use declarative tools, not imperative commands.
All infrastructure tools are configurable in: enforcement.tool_blacklist.infrastructure
Use Task tool to create specialist agent via AgentTask with explicit approval.

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
4. Agent provides comprehensive summary with results`
          };
        }
      }
    }

    return { allowed: true };
  }

  function isPathInAllowlist(filePath, allowlist, projectRoot) {
    // Normalize to absolute path
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath);
    const normalizedFilePath = path.normalize(absolutePath);
    const normalizedProjectRoot = path.normalize(projectRoot);

    // Extract filename and directory
    const fileName = path.basename(normalizedFilePath);
    const fileDir = path.dirname(normalizedFilePath);

    // Check if file is in project root
    const isInProjectRoot = path.normalize(fileDir) === normalizedProjectRoot;

    if (isInProjectRoot) {
      // Allow root *.md files
      if (fileName.endsWith('.md')) {
        return true;
      }
      // Allow root config/version files
      if (fileName === 'icc.config.json' || fileName === 'icc.workflow.json' || fileName === 'VERSION') {
        return true;
      }
    }

    // Calculate relative path from project root
    const relativePath = path.relative(normalizedProjectRoot, normalizedFilePath);

    // Check if path is within project boundaries (doesn't start with '..')
    const isWithinProject = !relativePath.startsWith('..');

    if (isWithinProject) {
      // Standard check: path within project root
      for (const allowedPath of allowlist) {
        if (relativePath.startsWith(allowedPath + '/') || relativePath === allowedPath) {
          return true;
        }
      }
    } else if (ALLOW_PARENT_ALLOWLIST_PATHS) {
      // Parent/sibling paths are only allowed when explicitly enabled
      const pathParts = normalizedFilePath.split(path.sep);

      // Check if ANY directory component matches an allowlist directory
      for (const allowedPath of allowlist) {
        const allowedIndex = pathParts.indexOf(allowedPath);
        if (allowedIndex >= 0) {
          const reconstructedPath = pathParts.slice(0, allowedIndex + 1).join(path.sep);
          if (normalizedFilePath.startsWith(reconstructedPath + path.sep)) {
            return true;
          }
        }
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

  function validateMarkdownOutsideAllowlist(filePath, projectRoot, isAgentContext = false) {
    // Check if file is markdown
    if (!filePath.endsWith('.md')) {
      return { allowed: true };
    }

    // Normalize to project-relative path (resolve symlinks when possible)
    let relativePath;
    const normalizedFilePath = path.normalize(path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath));
    const normalizedProjectRoot = path.normalize(projectRoot);

    try {
      const realFilePath = fs.existsSync(normalizedFilePath) ? fs.realpathSync(normalizedFilePath) : normalizedFilePath;
      const realProjectRoot = fs.realpathSync(normalizedProjectRoot);
      relativePath = path.relative(realProjectRoot, realFilePath);
    } catch (error) {
      // Fall back to non-resolved paths if realpath fails
      relativePath = path.relative(normalizedProjectRoot, normalizedFilePath);
    }

    // Get configured allowlist (include defaults, filter falsy)
    const config = loadConfiguration();
    const allowlist = [
      config.story_path || 'stories',
      config.bug_path || 'bugs',
      config.memory_path || 'memory',
      config.docs_path || 'docs',
      config.summaries_path || 'summaries',
      config.test_path || 'tests',
      'documentation', 'doc', 'docs-site', 'docs-content',
      'agenttasks'
    ].filter(Boolean);

    const fileName = path.basename(relativePath);
    const dirName = path.dirname(relativePath);
    const isMarkdown = fileName.toLowerCase().endsWith('.md');

    const normalizeSegments = (entry) => path.normalize(entry || '')
      .split(path.sep)
      .filter(Boolean);

    const containsSegmentSequence = (parts, sequence) => {
      if (!sequence.length) return false;
      for (let i = 0; i <= parts.length - sequence.length; i++) {
        let matches = true;
        for (let j = 0; j < sequence.length; j++) {
          if (parts[i + j] !== sequence[j]) {
            matches = false;
            break;
          }
        }
        if (matches) {
          return true;
        }
      }
      return false;
    };

    const allowlistSequences = allowlist
      .map(normalizeSegments)
      .filter(seq => seq.length > 0);

    const markdownAliasSequences = ['docs', 'documentation', 'doc', 'docs-site', 'docs-content']
      .map(normalizeSegments)
      .filter(seq => seq.length > 0);

    const markdownSegments = Array.from(new Set([
      ...allowlistSequences,
      ...markdownAliasSequences
    ].map(seq => JSON.stringify(seq)))).map(str => JSON.parse(str));

    const pathParts = relativePath.split(path.sep);

    // PRIORITY 1: Check if markdown is in root (root .md files are ALWAYS allowed)
    if (dirName === '.' || dirName === '') {
      return { allowed: true };
    }

    // PRIORITY 2: README.md (case-insensitive) ALWAYS allowed anywhere
    const isReadme = fileName.toUpperCase() === 'README.MD';
    if (isReadme) {
      return { allowed: true };
    }

    // PRIORITY 3: Parent/sibling paths are denied unless explicitly allowed
    const isOutsideProject = relativePath.startsWith('..');
    if (isOutsideProject && !ALLOW_PARENT_ALLOWLIST_PATHS) {
      return { allowed: false, message: 'Markdown outside project root and parent allowlist disabled' };
    }

    // PRIORITY 4: Parent paths with allow_parent_allowlist_paths enabled
    if (isOutsideProject && ALLOW_PARENT_ALLOWLIST_PATHS) {
      const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath);
      const normalizedFilePath = path.normalize(absolutePath);
      const pathPartsAbs = normalizedFilePath.split(path.sep);

      for (const seq of allowlistSequences) {
        if (containsSegmentSequence(pathPartsAbs, seq)) {
          return { allowed: true };
        }
      }
    }

    // PRIORITY 5: For markdown, allow if ANY path segment matches allowlist (honours parent-path gate)
    if (isMarkdown && (!isOutsideProject || ALLOW_PARENT_ALLOWLIST_PATHS)) {
      for (const seq of markdownSegments) {
        if (containsSegmentSequence(pathParts, seq)) {
          return { allowed: true };
        }
      }
    }

    // PRIORITY 4: File is OUTSIDE allowlist - now check setting
    let allowMarkdown;

    if (isAgentContext) {
      // For agents: check agent-specific setting first, fallback to main setting
      const agentSetting = ALLOW_MARKDOWN_OUTSIDE_ALLOWLIST_AGENTS;
      allowMarkdown = agentSetting !== null ? agentSetting : ALLOW_MARKDOWN_OUTSIDE_ALLOWLIST;
    } else {
      // For main scope: use main setting
      allowMarkdown = ALLOW_MARKDOWN_OUTSIDE_ALLOWLIST;
    }

    if (allowMarkdown) {
      return { allowed: true };
    }

    // PRIORITY 5: File is outside allowlist AND setting is false - block it
    return {
      allowed: false,
      message: `📝 Markdown files outside allowlist directories are blocked by default

Blocked: ${filePath}
Reason: Markdown files should be in designated directories

Allowed directories for markdown: ${allowlist.join(', ')}, root *.md files

If you specifically requested this file, ask the user to enable:
enforcement.allow_markdown_outside_allowlist = true in icc.config.json

Or create the file in an appropriate allowlist directory.

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
4. Agent provides comprehensive summary with results`
    };
  }

  function getBlockingEnabled() {
    const enabled = BLOCKING_ENABLED;
    log(`blocking_enabled=${enabled} (from unified config)`);
    return enabled;
  }

  function validatePMOperation(filePath, tool, paths, projectRoot) {
    const { allowlist, blocklist } = paths;

    // Normalize path information up-front so downstream checks do not hit
    // undeclared variables and so parent/sibling detection is consistent.
    const normalizedFilePath = path.normalize(path.isAbsolute(filePath)
      ? filePath
      : path.join(projectRoot, filePath));
    const normalizedProjectRoot = path.normalize(projectRoot);
    const relativePath = path.relative(normalizedProjectRoot, normalizedFilePath);
    const pathParts = relativePath.split(path.sep);
    const fileName = path.basename(relativePath);
    const isMarkdown = fileName.toLowerCase().endsWith('.md');
    const isParentPath = relativePath.startsWith('..');

    // Check blocklist first (explicit denial)
    if (isPathInBlocklist(filePath, blocklist, projectRoot)) {
      // Convert to relative path for proper directory matching
      let relativePath = filePath;
      if (path.isAbsolute(filePath)) {
        relativePath = path.relative(projectRoot, filePath);
      }

      // Find which blocklist directory contains this file
      const blockedDir = blocklist.find(p =>
        relativePath.startsWith(p + '/') || relativePath === p
      ) || path.dirname(relativePath).split(path.sep)[0];

      return {
        allowed: false,
        message: `🚫 PM role is coordination only - create Agents using AgentTasks for technical work

Blocked: ${filePath}
Reason: PM cannot modify files in ${blockedDir}/

Allowed directories: ${allowlist.join(', ')}, root *.md files
Use Task tool to create specialist agent via AgentTask.

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
4. Agent provides comprehensive summary with results`
      };
    }

    // Check allowlist (explicit permission)
    if (isMarkdown) {
      const allowParentPaths = ALLOW_PARENT_ALLOWLIST_PATHS;

      // Only allow parent/sibling markdown if explicitly configured
      if (!isParentPath || allowParentPaths) {
        if (allowlist.some(allowed => pathParts.includes(allowed))) {
          return { allowed: true };
        }
      }
    }

    if (isPathInAllowlist(filePath, allowlist, projectRoot)) {
      return { allowed: true };
    }

    // Not in allowlist = blocked
    // Determine if this is a parent path issue
    let reason = 'File path not in PM allowlist';
    let suggestion = 'Or create the file in an appropriate allowlist directory.';

    if (isParentPath) {
      // Check if the path contains an allowlist directory name
      const pathParts = normalizedFilePath.split(path.sep);
      const hasAllowlistDir = allowlist.some(allowed => pathParts.includes(allowed));

      if (hasAllowlistDir) {
        reason = 'File is in parent/sibling path outside project root';
        suggestion = `To allow writes to allowlist directories in parent paths, enable:
enforcement.allow_parent_allowlist_paths = true in icc.config.json

Or create the file within the project root.`;
      } else {
        reason = 'File is in parent/sibling path outside project root AND not in allowlist directory';
      }
    }

    return {
      allowed: false,
      message: `🚫 PM role is coordination only - create Agents using AgentTasks for technical work

Blocked: ${filePath}
Reason: ${reason}

Allowed directories: ${allowlist.join(', ')}, root *.md files

${suggestion}
Use Task tool to create specialist agent via AgentTask.

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
4. Agent provides comprehensive summary with results`
    };
  }

  try {
    // hookInput already parsed earlier for logging
    if (!hookInput) {
      log('WARN: Empty input data - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

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

    // Find actual project root by scanning upward from working directory
    function findProjectRoot(startPath) {
      // Project markers in priority order
      const markers = [
        '.git',           // Git repository (highest priority)
        'CLAUDE.md',      // ICC project marker
        'package.json',   // Node.js project
        'pyproject.toml', // Python project (modern)
        'setup.py',       // Python project (legacy)
        'Cargo.toml',     // Rust project
        'pom.xml',        // Maven (Java)
        'build.gradle',   // Gradle (Java/Kotlin)
        'go.mod',         // Go project
        'Gemfile',        // Ruby project
        'composer.json'   // PHP project
      ];

      let currentPath = path.resolve(startPath);
      const root = path.parse(currentPath).root;

      // Scan upward from startPath to filesystem root
      while (currentPath !== root) {
        // Check each marker
        for (const marker of markers) {
          const markerPath = path.join(currentPath, marker);
          try {
            if (fs.existsSync(markerPath)) {
              // Found project marker - this is the root
              return currentPath;
            }
          } catch (error) {
            // Ignore permission errors, continue search
          }
        }

        // Move up one directory
        const parentPath = path.dirname(currentPath);
        if (parentPath === currentPath) {
          break; // Reached filesystem root
        }
        currentPath = parentPath;
      }

      // No project markers found - check if startPath is a common subdirectory
      const startDirName = path.basename(startPath);
      const commonSubdirs = ['docs', 'src', 'lib', 'tests', 'test', 'dist', 'build', 'bin'];

      if (commonSubdirs.includes(startDirName)) {
        // We're in a common subdirectory - parent is likely project root
        const parentPath = path.dirname(path.resolve(startPath));
        return parentPath;
      }

      // Absolute fallback - use startPath (working directory)
      return startPath;
    }

    // Get working directory and detect actual project root
    const cwdPath = hookInput.cwd || process.cwd();

    // Use CLAUDE_PROJECT_DIR if available (authoritative from Claude Code)
    // Fall back to marker scanning if environment variable not set
    let projectRoot;
    let rootSource;

    if (process.env.CLAUDE_PROJECT_DIR) {
      projectRoot = process.env.CLAUDE_PROJECT_DIR;
      rootSource = 'CLAUDE_PROJECT_DIR (env)';
    } else {
      projectRoot = findProjectRoot(cwdPath);
      rootSource = 'marker scanning';
    }

    log(`Working directory: ${cwdPath}`);
    log(`Project root: ${projectRoot} (source: ${rootSource})`);

    if (!tool) {
      log('No tool specified - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    log(`Tool: ${tool}, FilePath: ${filePath}, Command: ${command}`);

    // ========================================================================
    // CRITICAL: For Bash tool, check coordination commands BEFORE blacklist
    // Read-only commands (git, ls, make, etc.) must be allowed even though
    // Bash is in the main_scope_only blacklist. This allows safe coordination
    // commands while still blocking dangerous operations.
    // ========================================================================
    if (tool === 'Bash' && command) {
      log(`Checking Bash coordination commands before blacklist: ${command}`);
      const bashValidation = validateBashCommand(command, projectRoot);

      if (bashValidation.allowed) {
        log(`Bash coordination command allowed: ${command}`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }
      // If not allowed by coordination check, continue to blacklist and other checks
    }

    // CRITICAL: Check tool blacklist AFTER Bash coordination check
    const blacklistResult = checkToolBlacklist(tool, toolInput, 'pm', projectRoot);
    if (blacklistResult.blocked) {
      log(`Tool blocked by blacklist: ${tool} (${blacklistResult.list})`);

      const blockingEnabled = getBlockingEnabled();

      if (blockingEnabled) {
        const response = {
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: `Tool blocked by ${blacklistResult.list} blacklist

Tool "${tool}" is blocked by the ${blacklistResult.reason}.

Blacklist type: ${blacklistResult.list}

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
4. Agent provides comprehensive summary with results`
          }
        };
        log(`RESPONSE: ${JSON.stringify(response)}`);
        console.log(JSON.stringify(response));
        process.exit(0);
      } else {
        log(`⚠️ WARNING (non-blocking): Tool blocked by blacklist: ${tool}`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }
    }

    // Always allow Task tool (agent creation) - no PM restrictions apply
    if (tool === 'Task') {
      log('Task tool invocation - always allowed (agent creation)');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Check for summary files in root (applies to Write/Edit/Update only, not Read)
    if (tool !== 'Read' && filePath.endsWith('.md')) {
      const summaryValidation = validateSummaryFilePlacement(filePath, projectRoot);
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
          log(`EXIT CODE: 0 (DENY)`);
          console.log(responseJson);
          process.exit(0);
        } else {
          // WARNING MODE (non-blocking)
          log(`⚠️ WARNING (non-blocking): ${summaryValidation.message}`);
          console.log(JSON.stringify({ continue: true }));
          process.exit(0);
        }
      }
    }

    // Check for markdown files outside allowlist (applies to Write/Edit/Update only, not Read)
    if (tool !== 'Read' && filePath.endsWith('.md')) {
      // Import getCorrectDirectory from directory-enforcement.js
      const { getCorrectDirectory } = require('./lib/directory-enforcement');

      const fileName = path.basename(filePath);
      const correctDir = getCorrectDirectory(fileName, projectRoot);

      // Check if this file SHOULD be routed (has a pattern match)
      // If correctDir is summaries/ AND filename doesn't match routing patterns, skip enforcement for agents
      const shouldRoute = correctDir !== path.join(projectRoot, 'summaries') ||
                          fileName.match(/^(STORY|EPIC|BUG|AGENTTASK)-/);

      // If it's NOT a routing pattern file, allow agents to skip enforcement
      let shouldApplyMarkdownValidation = true;

      if (!shouldRoute) {
        // File doesn't match routing patterns - skip enforcement for agents
        const sessionId = hookInput.session_id || '';

        if (isAgentContext(projectRoot, sessionId, log)) {
          log('Agent context + no routing pattern - skipping enforcement');
          shouldApplyMarkdownValidation = false;
        }
      } else {
        log('File matches routing pattern - enforcing directory routing even for agents');
      }

      // Apply markdown validation if needed
      if (shouldApplyMarkdownValidation) {
        const markdownValidation = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);

        // If the file is outside the project, parent paths are allowed, and the path already contains an allowlisted segment, allow it
        const allowParentPaths = getSetting('enforcement.allow_parent_allowlist_paths', false);
        const outsideProject = path.relative(projectRoot, filePath).startsWith('..');
        const pathParts = path.normalize(filePath).split(path.sep);
        const allowlistDirs = [
          getSetting('paths.story_path', 'stories'),
          getSetting('paths.bug_path', 'bugs'),
          getSetting('paths.memory_path', 'memory'),
          getSetting('paths.docs_path', 'docs'),
          'agenttasks',
          getSetting('paths.summaries_path', 'summaries')
        ];
        const containsAllowlistedSegment = allowlistDirs.some((dir) => pathParts.includes(dir));
        const forceAllow = allowParentPaths && outsideProject && containsAllowlistedSegment;

        if (!markdownValidation.allowed && !forceAllow) {
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
            log(`EXIT CODE: 0 (DENY)`);
            console.log(responseJson);
            process.exit(0);
          } else {
            // WARNING MODE (non-blocking)
            log(`⚠️ WARNING (non-blocking): ${markdownValidation.message}`);
            console.log(JSON.stringify({ continue: true }));
            process.exit(0);
          }
        }
      }
    }

    // UNIVERSAL FILE VALIDATION (applies to ALL contexts - main scope AND agents)
    if (tool === 'Edit' || tool === 'Write' || tool === 'Update' || tool === 'MultiEdit') {
      log(`File modification tool detected: ${tool} on ${filePath}`);

      // FILENAME-BASED DIRECTORY ENFORCEMENT - applies universally
      if (!isCorrectDirectory(filePath, projectRoot)) {
        const suggestedPath = getSuggestedPath(filePath, projectRoot);

        const blockingEnabled = getBlockingEnabled();

        if (blockingEnabled) {
          const response = {
            hookSpecificOutput: {
              hookEventName: 'PreToolUse',
              permissionDecision: 'deny',
              permissionDecisionReason: `Wrong directory for filename pattern

File "${path.basename(filePath)}" should be in a different directory based on its filename pattern.

Current path: ${filePath}
Suggested path: ${suggestedPath}

DIRECTORY ROUTING RULES:
- STORY-*.md, EPIC-*.md, BUG-*.md → stories/
- AGENTTASK-*.yaml → agenttasks/
- Root files (CLAUDE.md, VERSION, etc.) → project root
- Documentation files (architecture.md, api.md) → docs/
- Everything else → summaries/

Please use the correct directory for this file type.`
            }
          };
          const responseJson = JSON.stringify(response);
          log(`RESPONSE: ${responseJson}`);
          log(`EXIT CODE: 0 (DENY)`);
          console.log(responseJson);
          process.exit(0);
        } else {
          log(`⚠️ WARNING (non-blocking): Wrong directory for filename pattern: ${filePath}`);
        }
      }
    }

    // PM-SPECIFIC RESTRICTIONS (only for PM role)
    if (isPMRole(projectRoot, hookInput.session_id || '', log)) {
      log('PM role active - validating operation');

      // Block Edit/Write/Update tools ONLY for files not in PM allowlist
      if (tool === 'Edit' || tool === 'Write' || tool === 'Update' || tool === 'MultiEdit') {
        const paths = getConfiguredPaths(projectRoot);
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
            log(`EXIT CODE: 0 (DENY)`);
            console.log(responseJson);
            process.exit(0);
          } else {
            log(`⚠️ WARNING (non-blocking): ${validation.message}`);
            console.log(JSON.stringify({ continue: true }));
            process.exit(0);
          }
        } else {
          log(`File modification allowed - ${filePath} is in PM allowlist`);
        }
      }

      // Note: Bash command validation now happens BEFORE blacklist check (line 942)
      // This allows coordination commands like git, ls, make to bypass blacklist

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
