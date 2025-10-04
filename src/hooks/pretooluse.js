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
  const logFile = path.join(logDir, `${today}-pretooluse.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

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
    // Detect if current operation is within agent context by checking transcript
    // for Task tool invocations and parentUuid chains
    const transcriptPath = hookInput.transcript_path;

    if (!transcriptPath || !fs.existsSync(transcriptPath)) {
      log('No transcript available - allowing operation (fail-safe for agents)');
      return false;
    }

    try {
      // Read last 100 lines of transcript (covers recent agent context)
      const content = fs.readFileSync(transcriptPath, 'utf8');
      const lines = content.trim().split('\n').slice(-100);

      // Parse entries and find Task tool invocations
      const taskUUIDs = new Set();
      const entries = [];

      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          entries.push(entry);

          // Track Task tool UUIDs (agent spawns)
          if (entry.message?.content?.[0]?.name === 'Task') {
            taskUUIDs.add(entry.uuid);
            log(`Found Task tool UUID: ${entry.uuid}`);
          }
        } catch (parseError) {
          continue;
        }
      }

      // If no recent Task tools, this is main agent (PM context)
      if (taskUUIDs.size === 0) {
        log('No recent Task tools - PM context');
        return true;
      }

      // Check last 20 entries to see if we're in agent execution context
      // by checking if entries link to Task tools via parentUuid
      for (let i = entries.length - 1; i >= Math.max(0, entries.length - 20); i--) {
        const entry = entries[i];

        // Direct link: entry is Task tool or immediate child
        if (taskUUIDs.has(entry.uuid) || taskUUIDs.has(entry.parentUuid)) {
          log(`Agent context detected: entry ${entry.uuid} linked to Task`);
          return false;
        }

        // 2-level deep: check parent's parent
        if (entry.parentUuid) {
          const parent = entries.find(e => e.uuid === entry.parentUuid);
          if (parent && taskUUIDs.has(parent.parentUuid)) {
            log(`Agent context detected: parent chain leads to Task`);
            return false;
          }
        }
      }

      log('No agent context in recent entries - PM context');
      return true;

    } catch (readError) {
      log(`ERROR: Failed to read transcript: ${readError.message}`);
      return false; // Fail-safe: allow operation on errors
    }
  }

  function validateBashCommand(command) {
    // Block build/deploy/system commands in PM scope
    const blockedCommands = [
      'npm', 'yarn', 'make', 'docker', 'cargo', 'mvn', 'gradle', 'go',
      'kubectl', 'terraform', 'ansible', 'helm', 'systemctl', 'service',
      'apt', 'yum', 'brew', 'pip', 'gem', 'composer'
    ];

    // Extract first word (command name) from command string
    const firstWord = command.trim().split(/\s+/)[0];

    // Check if command is blocked
    for (const blocked of blockedCommands) {
      if (firstWord === blocked) {
        return {
          allowed: false,
          message: `🚫 PM role cannot execute build/deploy/system commands - create AgentTask for technical work

Blocked command: ${blocked}
Full command: ${command}

Build/Deploy tools blocked: npm, yarn, make, docker, cargo, mvn, gradle, go
System tools blocked: kubectl, terraform, ansible, helm, systemctl, service, apt, yum, brew, pip, gem, composer

Create AgentTask for specialist execution.`
        };
      }
    }

    return { allowed: true };
  }

  function isPathInAllowlist(filePath, allowlist) {
    // Check if file is in root and ends with .md
    const fileName = path.basename(filePath);
    const dirName = path.dirname(filePath);

    // Allow root *.md files (CLAUDE.md, README.md, etc.)
    if ((dirName === '.' || dirName === '/') && fileName.endsWith('.md')) {
      return true;
    }

    // Check if path starts with any allowlist directory
    for (const allowedPath of allowlist) {
      if (filePath.startsWith(allowedPath + '/') || filePath === allowedPath) {
        return true;
      }
    }

    return false;
  }

  function isPathInBlocklist(filePath, blocklist) {
    // Check if path starts with any blocklist directory
    for (const blockedPath of blocklist) {
      if (filePath.startsWith(blockedPath + '/') || filePath === blockedPath) {
        return true;
      }
    }

    return false;
  }

  function isSummaryFile(filePath) {
    const fileName = path.basename(filePath);
    const dirName = path.dirname(filePath);

    // Only check files in project root
    if (dirName !== '.' && dirName !== '/') {
      // Check if it's an absolute path to project root
      const isAbsoluteRoot = dirName.split('/').pop() === path.basename(process.cwd());
      if (!isAbsoluteRoot) {
        return false;
      }
    }

    // Check if filename matches summary patterns (case-insensitive)
    const upperFileName = fileName.toUpperCase();
    const summaryPatterns = ['SUMMARY', 'REPORT', 'VALIDATION', 'ANALYSIS'];

    return summaryPatterns.some(pattern => upperFileName.startsWith(pattern));
  }

  function validateSummaryFile(filePath) {
    if (!isSummaryFile(filePath)) {
      return { allowed: true };
    }

    const fileName = path.basename(filePath);
    const suggestedPath = `summaries/${fileName}`;

    // Ensure summaries directory exists
    if (!fs.existsSync('summaries')) {
      fs.mkdirSync('summaries', { recursive: true });
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

  function validatePMOperation(filePath, tool, paths) {
    const { allowlist, blocklist } = paths;

    // Check blocklist first (explicit denial)
    if (isPathInBlocklist(filePath, blocklist)) {
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
    if (isPathInAllowlist(filePath, allowlist)) {
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
      inputData = fs.readFileSync(0, 'utf8');
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
    const summaryValidation = validateSummaryFile(filePath);
    if (!summaryValidation.allowed) {
      log(`Summary file blocked: ${filePath}`);
      const response = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: summaryValidation.message
        }
      };
      const responseJson = JSON.stringify(response);
      log(`RESPONSE: ${responseJson}`);
      log(`EXIT CODE: 2`);
      console.log(responseJson);
      process.exit(2);
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
          const response = {
            hookSpecificOutput: {
              hookEventName: 'PreToolUse',
              permissionDecision: 'deny',
              permissionDecisionReason: bashValidation.message
            }
          };
          const responseJson = JSON.stringify(response);
          log(`RESPONSE: ${responseJson}`);
          log(`EXIT CODE: 2`);
          console.log(responseJson);
          process.exit(2);
        }

        log(`Bash command ALLOWED: ${command}`);
      }

      // Validate file operations (Edit/Write/MultiEdit)
      if (filePath && (tool === 'Edit' || tool === 'Write' || tool === 'MultiEdit')) {
        log(`Validating file operation: ${tool} on ${filePath}`);

        const paths = getConfiguredPaths();
        const validation = validatePMOperation(filePath, tool, paths);

        if (!validation.allowed) {
          log(`File operation BLOCKED: ${filePath}`);
          const response = {
            hookSpecificOutput: {
              hookEventName: 'PreToolUse',
              permissionDecision: 'deny',
              permissionDecisionReason: validation.message
            }
          };
          const responseJson = JSON.stringify(response);
          log(`RESPONSE: ${responseJson}`);
          log(`EXIT CODE: 2`);
          console.log(responseJson);
          process.exit(2);
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
