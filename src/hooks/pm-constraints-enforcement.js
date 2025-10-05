#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuration cache
let configCache = null;
let configCacheTime = 0;
const CONFIG_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
    const now = Date.now();

    // Return cached config if still valid
    if (configCache && (now - configCacheTime) < CONFIG_CACHE_TTL) {
      log('Using cached configuration');
      return configCache;
    }

    const config = {
      story_path: 'stories',
      bug_path: 'bugs',
      memory_path: 'memory',
      docs_path: 'docs',
      src_path: 'src',
      test_path: 'tests',
      config_path: 'config'
    };

    try {
      // Try to load from CLAUDE.md or config.md
      const possibleConfigPaths = [
        'CLAUDE.md',
        'config.md',
        '.claude/config.md'
      ];

      for (const configPath of possibleConfigPaths) {
        if (fs.existsSync(configPath)) {
          log(`Loading configuration from ${configPath}`);
          const content = fs.readFileSync(configPath, 'utf8');

          // Parse YAML frontmatter
          const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (yamlMatch) {
            const yamlContent = yamlMatch[1];
            const lines = yamlContent.split('\n');

            for (const line of lines) {
              const match = line.match(/^(\w+):\s*(.+)$/);
              if (match) {
                const key = match[1];
                const value = match[2].replace(/^["']|["']$/g, '');
                if (key in config) {
                  config[key] = value;
                  log(`Loaded ${key} = ${value} from YAML frontmatter`);
                }
              }
            }
          }

          // Parse markdown key:value pairs
          const markdownMatches = content.matchAll(/^-?\s*\*?\*?(\w+)\*?\*?:\s*(.+)$/gm);
          for (const match of markdownMatches) {
            const key = match[1];
            const value = match[2].replace(/^["']|["']$/g, '');
            if (key in config) {
              config[key] = value;
              log(`Loaded ${key} = ${value} from markdown`);
            }
          }

          break; // Use first config file found
        }
      }
    } catch (error) {
      log(`Configuration loading error: ${error.message}`);
    }

    // Normalize paths (remove trailing slashes)
    for (const key in config) {
      config[key] = config[key].replace(/\/$/, '');
    }

    // Cache the configuration
    configCache = config;
    configCacheTime = now;

    log(`Configuration loaded: ${JSON.stringify(config)}`);
    return config;
  }

  function getConfiguredPaths() {
    const config = loadConfiguration();

    return {
      allowlist: [
        config.story_path,
        config.bug_path,
        config.memory_path,
        config.docs_path,
        'agenttasks'  // Always allow agenttasks directory
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
    // Detect agent context by checking if LAST EXISTING entry has Task tool in parent chain
    // Strategy: PreToolUse fires BEFORE current entry written to transcript
    //           Start from last existing entry and walk its parent chain
    //
    // VERIFIED PATTERN:
    // - Hook fires BEFORE transcript written (current entry doesn't exist yet)
    // - Read last EXISTING entry from transcript
    // - Walk ITS parentUuid chain to find Task tool
    // - Task tool in chain = Agent context (allow all)
    // - No Task tool in chain = PM context (enforce constraints)

    const transcriptPath = hookInput.transcript_path;

    try {
      const content = fs.readFileSync(transcriptPath, 'utf8');
      const lines = content.trim().split('\n');

      if (lines.length === 0) {
        log('Empty transcript - allowing (fail-safe)');
        return false;
      }

      // Parse all entries into map for efficient UUID lookup
      const entriesMap = new Map();
      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          if (entry.uuid) {
            entriesMap.set(entry.uuid, entry);
          }
        } catch (parseError) {
          continue;
        }
      }

      // Find LAST existing entry WITH a UUID that's NOT a user message or file-history-snapshot
      // We want tool_use or assistant entries to correctly identify agent context
      let lastEntry = null;
      for (let i = lines.length - 1; i >= 0; i--) {
        try {
          const entry = JSON.parse(lines[i]);
          // Skip user messages and file-history-snapshot - we want tool_use or assistant entries
          if (entry.uuid && entry.type !== 'user' && entry.type !== 'file-history-snapshot') {
            lastEntry = entry;
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!lastEntry) {
        log('No entries with UUID found in transcript - allowing (fail-safe)');
        return false;
      }

      log(`Starting from last existing entry: UUID ${lastEntry.uuid}, type: ${lastEntry.type}`);

      // Walk parentUuid chain from last existing entry
      let currentUuid = lastEntry.parentUuid;
      let visited = new Set();
      let chainDepth = 0;

      while (currentUuid && !visited.has(currentUuid)) {
        visited.add(currentUuid);
        chainDepth++;

        const parent = entriesMap.get(currentUuid);
        if (!parent) {
          log(`ParentUuid chain broken at depth ${chainDepth}: UUID ${currentUuid} not found`);
          break;
        }

        // Check if this parent is a Task tool invocation
        if (parent.message?.content) {
          const hasTaskTool = Array.isArray(parent.message.content) &&
            parent.message.content.some(item =>
              item.type === 'tool_use' && item.name === 'Task'
            );

          if (hasTaskTool) {
            log(`Agent context: Task tool found in parent chain at depth ${chainDepth}`);
            return false; // Agent context - allow all
          }
        }

        currentUuid = parent.parentUuid;
      }

      // No Task tool in chain = PM context
      log(`PM context: No Task tool in parent chain (traversed ${chainDepth} levels)`);
      return true; // PM context - enforce constraints

    } catch (error) {
      log(`ERROR: ${error.message}`);
      return false; // Fail-safe
    }
  }

  function validateBashCommand(command) {
    // Block build/deploy/system commands in PM scope
    const blockedCommands = [
      'npm', 'yarn', 'make', 'docker', 'cargo', 'mvn', 'gradle', 'go',
      'kubectl', 'terraform', 'ansible', 'helm', 'systemctl', 'service',
      'apt', 'yum', 'brew', 'pip', 'gem', 'composer',
      'python', 'python3', 'node', 'ruby', 'perl', 'php',  // Scripting languages
      'nohup', 'screen', 'tmux',  // Background/session tools
      'sed', 'awk',  // Stream/text processing (file modification)
      'vi', 'vim', 'nano', 'emacs'  // Text editors
    ];

    // Check for Python heredoc pattern (python3 << 'PYEOF')
    if (command.includes('<<') && (command.includes('python') || command.includes('node') || command.includes('ruby'))) {
      return {
        allowed: false,
        message: `🚫 PM role cannot execute inline scripts via heredoc - create AgentTask for technical work

Blocked pattern: Script heredoc (python3 << 'EOF', node << 'EOF', etc.)
Full command: ${command}

Inline scripts require technical implementation by specialist agents.

Create AgentTask for specialist execution.`
      };
    }

    // Split compound commands by && and ; and | to check ALL commands in chain
    const commandParts = command.split(/&&|;|\|/).map(part => part.trim());

    for (const part of commandParts) {
      // Extract first word (command name) from each part
      const firstWord = part.trim().split(/\s+/)[0];

      // Skip empty parts
      if (!firstWord) continue;

      // Check if command is blocked (exact match OR prefix match with hyphen)
      for (const blocked of blockedCommands) {
        if (firstWord === blocked || firstWord.startsWith(blocked + '-')) {
          return {
            allowed: false,
            message: `🚫 PM role cannot execute build/deploy/system commands - create AgentTask for technical work

Blocked command: ${blocked}
Found in: ${part}
Full command: ${command}

Build/Deploy tools: npm, yarn, make, docker, cargo, mvn, gradle, go
System tools: kubectl, terraform, ansible, helm, systemctl, service, apt, yum, brew, pip, gem, composer
Scripting languages: python, python3, node, ruby, perl, php
Background tools: nohup, screen, tmux
Text processing: sed, awk
Text editors: vi, vim, nano, emacs

Create AgentTask for specialist execution.`
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

    // Check if file is in root and ends with .md
    const fileName = path.basename(relativePath);
    const dirName = path.dirname(relativePath);

    if ((dirName === '.' || dirName === '') && fileName.endsWith('.md')) {
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
    const dirName = path.dirname(relativePath);

    // Check if it's in project root
    if (dirName !== '.' && dirName !== '') {
      return false;
    }

    // Check if filename matches summary patterns (case-insensitive)
    const upperFileName = fileName.toUpperCase();
    const summaryPatterns = ['SUMMARY', 'REPORT', 'VALIDATION', 'ANALYSIS', 'FIX', 'PATH-MATCHING'];

    return summaryPatterns.some(pattern => upperFileName.includes(pattern));
  }

  function validateSummaryFile(filePath, projectRoot) {
    if (!isSummaryFile(filePath, projectRoot)) {
      return { allowed: true };
    }

    const fileName = path.basename(filePath);
    const suggestedPath = `summaries/${fileName}`;

    // Ensure summaries directory exists in the project root
    const summariesDir = path.join(projectRoot, 'summaries');
    if (!fs.existsSync(summariesDir)) {
      fs.mkdirSync(summariesDir, { recursive: true });
      log('Created summaries/ directory for summary file redirection');
    }

    return {
      allowed: false,
      message: `📋 Summary files belong in ./summaries/ directory

Blocked: ${filePath}
Suggested: ${suggestedPath}

Please create summary files in the summaries/ directory to keep project root clean.`
    };
  }

  function getBlockingEnabled() {
    const configPaths = [
      path.join(process.cwd(), 'CLAUDE.md'),           // Project CLAUDE.md (highest priority)
      path.join(process.cwd(), '.claude', 'CLAUDE.md'), // Project .claude/CLAUDE.md
      path.join(process.env.HOME || os.homedir(), '.claude', 'CLAUDE.md') // User global CLAUDE.md
    ];

    for (const configPath of configPaths) {
      try {
        if (fs.existsSync(configPath)) {
          const content = fs.readFileSync(configPath, 'utf8');

          // Look for blocking_enabled setting in YAML frontmatter or markdown
          const match = content.match(/blocking_enabled:\s*(true|false)/i);
          if (match) {
            const enabled = match[1].toLowerCase() === 'true';
            log(`Config found at ${configPath}: blocking_enabled=${enabled}`);
            return enabled;
          }
        }
      } catch (error) {
        // Continue to next path
      }
    }

    // DEFAULT: blocking enabled (secure by default)
    log('No blocking_enabled config found in CLAUDE.md - defaulting to TRUE (blocking mode)');
    return true;
  }

  function validatePMOperation(filePath, tool, paths, projectRoot) {
    const { allowlist, blocklist } = paths;

    // Check blocklist first (explicit denial)
    if (isPathInBlocklist(filePath, blocklist, projectRoot)) {
      const blockedDir = blocklist.find(p => filePath.startsWith(p + '/'));
      return {
        allowed: false,
        message: `🚫 PM role is coordination only - create AgentTask for technical work

Blocked: ${filePath}
Reason: PM cannot modify files in ${blockedDir}/

Allowed directories: ${allowlist.join(', ')}, root *.md files`
      };
    }

    // Check allowlist (explicit permission)
    if (isPathInAllowlist(filePath, allowlist, projectRoot)) {
      return { allowed: true };
    }

    // Not in allowlist = blocked
    return {
      allowed: false,
      message: `🚫 PM role is coordination only - create AgentTask for technical work

Blocked: ${filePath}
Reason: File path not in PM allowlist

Allowed directories: ${allowlist.join(', ')}, root *.md files`
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

    // Check for summary files in root (applies to ALL roles)
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

    // Check if PM role and validate
    if (isPMRole(hookInput)) {
      log('PM role active - validating operation');

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

      // Validate file operations (Edit/Write/MultiEdit)
      if (filePath && (tool === 'Edit' || tool === 'Write' || tool === 'MultiEdit')) {
        log(`Validating file operation: ${tool} on ${filePath}`);

        const paths = getConfiguredPaths();
        const validation = validatePMOperation(filePath, tool, paths, projectRoot);

        if (!validation.allowed) {
          log(`File operation BLOCKED: ${filePath}`);

          const blockingEnabled = getBlockingEnabled();

          if (blockingEnabled) {
            // BLOCKING MODE (default)
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
            // WARNING MODE (non-blocking)
            log(`⚠️ WARNING (non-blocking): ${validation.message}`);
            console.log(JSON.stringify({ continue: true }));
            process.exit(0);
          }
        }

        log(`File operation ALLOWED: ${filePath}`);
      }
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
