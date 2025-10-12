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
    const privacyPatterns = getSetting('git.privacy_patterns', [
      'AI',
      'Claude',
      'agent',
      'Generated with Claude Code',
      'Co-Authored-By: Claude'
    ]);
    const config = {
      git_privacy: gitPrivacy,
      privacy_patterns: privacyPatterns
    };
    log(`Configuration loaded: git_privacy=${config.git_privacy}, patterns=${config.privacy_patterns.length}`);
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

  function stripAIMentions(message, privacyPatterns) {
    let cleaned = message;

    // First, remove full lines that contain privacy patterns
    const lines = cleaned.split('\n');
    const filteredLines = lines.filter(line => {
      // Check if line contains any privacy pattern
      for (const pattern of privacyPatterns) {
        const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedPattern, 'i');
        if (regex.test(line)) {
          return false;  // Remove this line
        }
      }
      return true;  // Keep this line
    });

    cleaned = filteredLines.join('\n');

    // Also remove common markdown variations
    cleaned = cleaned.replace(/🤖\s*/g, '');  // Remove robot emoji
    cleaned = cleaned.replace(/Generated with \[Claude Code\]\([^)]+\)/gi, '');
    cleaned = cleaned.replace(/Co-Authored-By: Claude <[^>]+>/gi, '');

    // Clean up multiple consecutive newlines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    // Trim trailing whitespace
    cleaned = cleaned.trim();

    return cleaned;
  }

  function checkPRBodyPrivacy(command, config) {
    log(`Checking PR/MR body privacy for command: ${command.substring(0, 100)}`);

    // Check if git_privacy enabled
    if (config.git_privacy !== true) {
      log('git_privacy disabled - no modification needed');
      return { allowed: true };
    }

    log('git_privacy enabled - checking for --body parameter');

    // Extract --body content (supports quoted strings, unquoted strings, and HEREDOC)
    let bodyMatch;

    // Try simple quoted string first
    bodyMatch = command.match(/--body\s+["']([^"']+)["']/s);
    if (bodyMatch) log(`Found body via quoted string: ${bodyMatch[1].substring(0, 50)}`);

    // Try unquoted string (up to next -- flag or end of string)
    if (!bodyMatch) {
      bodyMatch = command.match(/--body\s+([^\s][^\s-]*(?:\s+[^\s-]+)*)/);
      if (bodyMatch) log(`Found body via unquoted string: ${bodyMatch[1].substring(0, 50)}`);
    }

    // Try HEREDOC format
    if (!bodyMatch) {
      bodyMatch = command.match(/--body\s+"?\$\(cat <<['"]?EOF['"]?\n([\s\S]+?)\nEOF\)["']?/);
      if (bodyMatch) log(`Found body via HEREDOC: ${bodyMatch[1].substring(0, 50)}`);
    }

    if (!bodyMatch) {
      log('No --body parameter found - allowing command');
      return { allowed: true };
    }

    const body = bodyMatch[1];
    log(`Checking body for AI mentions: ${body.substring(0, 100)}`);
    const cleanBody = stripAIMentions(body, config.privacy_patterns || []);

    // Check if modifications were made
    if (cleanBody !== body) {
      log('AI mentions found in PR/MR body - blocking with cleaned version');
      return {
        allowed: false,
        message: `🔒 AI mentions detected in PR/MR body

ORIGINAL contained AI mentions that violate git_privacy setting

CLEANED BODY:
${cleanBody}

Please use the cleaned version above with --body "$(cat <<'EOF'
${cleanBody}
EOF
)"`
      };
    }

    log('No AI mentions found - allowing command');
    return { allowed: true };
  }

  function modifyGitCommand(command, config) {
    // Check for GitHub CLI PR commands
    if (command.match(/\bgh\s+pr\s+(create|edit)\b/)) {
      log('GitHub CLI PR command detected - checking for AI mentions');
      return checkPRBodyPrivacy(command, config);
    }

    // Check for GitLab CLI MR commands
    if (command.match(/\bglab\s+mr\s+(create|edit)\b/)) {
      log('GitLab CLI MR command detected - checking for AI mentions');
      return checkPRBodyPrivacy(command, config);
    }

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

    const cleanedMessage = stripAIMentions(message, config.privacy_patterns || []);

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

    // Handle blocked PR/MR commands
    if (result.allowed === false) {
      log(`Command blocked due to privacy violation`);
      const response = {
        abort: true,
        error: result.message
      };
      const responseJson = JSON.stringify(response);
      log(`BLOCKING: ${responseJson}`);
      console.log(responseJson);
      process.exit(1);
    }

    // Handle modified commands
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
