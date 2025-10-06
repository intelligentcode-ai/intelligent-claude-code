#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { getSetting } = require('./lib/config-loader');

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
    log('Loading configuration via unified config-loader');
    const gitPrivacy = getSetting('git.privacy', false);
    const config = {
      git_privacy: gitPrivacy
    };
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

  function stripAIMentions(message) {
    let cleaned = message;

    // Privacy patterns to remove (case-insensitive)
    const privacyPatterns = [
      /🤖 Generated with \[Claude Code\]\([^)]+\)\s*/gi,
      /Generated with \[Claude Code\]\([^)]+\)\s*/gi,
      /Co-Authored-By: Claude <[^>]+>\s*/gi,
      /Claude assisted in this commit\s*/gi,
      /\n\n🤖 Generated.*$/s,
      /\n\nCo-Authored-By: Claude.*$/s
    ];

    for (const pattern of privacyPatterns) {
      cleaned = cleaned.replace(pattern, '');
    }

    // Clean up multiple consecutive newlines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    // Trim trailing whitespace
    cleaned = cleaned.trim();

    return cleaned;
  }

  function modifyGitCommand(command, config) {
    // Only modify git commit commands
    if (!command.includes('git commit')) {
      log('Not a git commit command - no modification needed');
      return { modified: false, command };
    }

    // Check if git_privacy enabled
    if (config.git_privacy !== true) {
      log('git_privacy disabled - no modification needed');
      return { modified: false, command };
    }

    // Extract and clean commit message
    const message = extractCommitMessage(command);
    if (!message) {
      log('No commit message found - no modification needed');
      return { modified: false, command };
    }

    const cleanedMessage = stripAIMentions(message);

    if (cleanedMessage === message) {
      log('No AI mentions found - no modification needed');
      return { modified: false, command };
    }

    log(`Stripped AI mentions from commit message`);
    log(`Original: ${message.substring(0, 100)}...`);
    log(`Cleaned: ${cleanedMessage.substring(0, 100)}...`);

    // Reconstruct command with cleaned message
    let modifiedCommand = command;

    // Handle HEREDOC format
    if (command.includes('cat <<')) {
      modifiedCommand = command.replace(
        /cat <<['"]?EOF['"]?\n([\s\S]+?)\nEOF/,
        `cat <<'EOF'\n${cleanedMessage}\nEOF`
      );
    }
    // Handle -m flag format
    else {
      const escapedMessage = cleanedMessage.replace(/"/g, '\\"');
      modifiedCommand = command.replace(
        /git commit.*-m ['"](.+?)['"]/s,
        `git commit -m "${escapedMessage}"`
      );
    }

    return { modified: true, command: modifiedCommand };
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

    // Modify git command if needed
    const result = modifyGitCommand(command, config);

    if (result.modified) {
      log(`Command modified - returning updated command`);
      const response = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          modifiedToolInput: {
            command: result.command
          }
        }
      };
      const responseJson = JSON.stringify(response);
      log(`RESPONSE: ${responseJson}`);
      console.log(responseJson);
      process.exit(0);
    }

    // Allow operation unchanged
    log('No modification needed - allowing operation');
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
