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
  const logFile = path.join(logDir, `${today}-git-privacy.log`);

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
      git_privacy: false // Default to disabled
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
              const match = line.match(/^git_privacy:\s*(.+)$/);
              if (match) {
                const value = match[1].trim().toLowerCase();
                config.git_privacy = (value === 'true');
                log(`Loaded git_privacy = ${config.git_privacy} from YAML frontmatter`);
              }
            }
          }

          // Parse markdown key:value pairs
          const markdownMatches = content.matchAll(/^-?\s*\*?\*?git_privacy\*?\*?:\s*(.+)$/gm);
          for (const match of markdownMatches) {
            const value = match[1].trim().toLowerCase();
            config.git_privacy = (value === 'true');
            log(`Loaded git_privacy = ${config.git_privacy} from markdown`);
          }

          break; // Use first config file found
        }
      }
    } catch (error) {
      log(`Configuration loading error: ${error.message}`);
    }

    // Cache the configuration
    configCache = config;
    configCacheTime = now;

    log(`Configuration loaded: git_privacy=${config.git_privacy}`);
    return config;
  }

  function extractCommitMessage(command) {
    // Handle: git commit -m "message"
    const singleQuoteMatch = command.match(/git commit.*-m ['"](.+?)['"]/s);
    if (singleQuoteMatch) {
      log(`Extracted message from -m flag: ${singleQuoteMatch[1]}`);
      return singleQuoteMatch[1];
    }

    // Handle: git commit -m "$(cat <<'EOF' ... EOF)"
    const heredocMatch = command.match(/cat <<['"]?EOF['"]?\n([\s\S]+?)\nEOF/);
    if (heredocMatch) {
      log(`Extracted message from HEREDOC: ${heredocMatch[1]}`);
      return heredocMatch[1];
    }

    log('No commit message extracted');
    return '';
  }

  function validateGitPrivacy(command, config) {
    // Only check git commit commands
    if (!command.includes('git commit')) {
      log('Not a git commit command - allowing');
      return { allowed: true };
    }

    // Check if git_privacy enabled
    if (config.git_privacy !== true) {
      log('git_privacy disabled - allowing commit');
      return { allowed: true };
    }

    // Extract commit message
    const message = extractCommitMessage(command);
    if (!message) {
      log('No commit message found - allowing (may be using editor)');
      return { allowed: true };
    }

    // Privacy patterns (case-insensitive, Claude Code attribution only)
    const privacyPatterns = [
      { pattern: /generated with.*claude/i, name: 'Claude generation attribution' },
      { pattern: /co-authored-by.*claude/i, name: 'Claude co-authorship attribution' },
      { pattern: /claude.*assisted/i, name: 'Claude assistance attribution' }
    ];

    // Check for violations
    for (const { pattern, name } of privacyPatterns) {
      if (pattern.test(message)) {
        log(`BLOCKED: Privacy violation detected - ${name}`);
        return {
          allowed: false,
          message: `🚫 Git privacy enabled - commit message contains Claude Code attribution

Blocked pattern: ${name}
Pattern regex: ${pattern.source}

git_privacy=true requires neutral commit messages without AI attribution.
Remove Claude Code mentions from commit message.

Example violations:
- "Generated with Claude Code"
- "Co-Authored-By: Claude <noreply@anthropic.com>"
- "Claude assisted in this commit"

Note: "AI-AGENTIC", "multi-agent", and similar technical terms are allowed.`
        };
      }
    }

    log('No privacy violations detected - allowing commit');
    return { allowed: true };
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
    log(`Git privacy check triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool and parameters
    const tool = hookInput.tool_name || hookInput.tool || '';
    const toolInput = hookInput.tool_input || hookInput.parameters || {};
    const command = toolInput.command || '';

    if (!tool || tool !== 'Bash') {
      log('Not a Bash tool - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    if (!command) {
      log('No command specified - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    log(`Checking command: ${command}`);

    // Load configuration
    const config = loadConfiguration();

    // Validate git privacy
    const validation = validateGitPrivacy(command, config);

    if (!validation.allowed) {
      log(`Git privacy violation - blocking commit`);
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

    // Allow operation
    log('Git privacy check passed - allowing operation');
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
