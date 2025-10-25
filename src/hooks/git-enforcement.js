#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const { getSetting } = require('./lib/config-loader');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-git-enforcement.log`);

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

    // Load user global config first for git.privacy (GLOBAL ENFORCEMENT)
    const userConfigPath = path.join(os.homedir(), '.claude', 'icc.config.json');
    let globalGitPrivacy = true; // Default to privacy ON

    if (fs.existsSync(userConfigPath)) {
      try {
        const userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
        if (userConfig.git && userConfig.git.privacy !== undefined) {
          globalGitPrivacy = userConfig.git.privacy;
          log(`Loaded global git.privacy from user config: ${globalGitPrivacy}`);
        }
      } catch (error) {
        log(`Failed to load user config: ${error.message}`);
      }
    }

    // Git Privacy Settings - Use global as default, allow project override
    const gitPrivacy = getSetting('git.privacy', globalGitPrivacy);
    const privacyPatterns = getSetting('git.privacy_patterns', [
      "AI", "Claude", "agent",
      "Generated with Claude Code",
      "Co-Authored-By: Claude"
    ]);

    // Branch Protection Settings (DEFAULT: true)
    const branchProtection = getSetting('git.branch_protection', true);
    const requirePRforMain = getSetting('git.require_pr_for_main', true);
    const defaultBranch = getSetting('git.default_branch', 'main');

    const config = {
      git: {
        privacy: gitPrivacy,
        branch_protection: branchProtection,
        require_pr_for_main: requirePRforMain,
        default_branch: defaultBranch
      },
      privacy_patterns: privacyPatterns
    };

    log(`Configuration loaded: git.privacy=${config.git.privacy} (global: ${globalGitPrivacy}), git.branch_protection=${config.git.branch_protection}, git.require_pr_for_main=${config.git.require_pr_for_main}, git.default_branch=${config.git.default_branch}`);
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

  function stripAIMentions(message, patterns) {
    let cleaned = message;

    // Technical term whitelist - these terms should NEVER trigger privacy blocking
    const technicalTermWhitelist = [
      'AGENTTASK',
      'AGENTTASK-CORE',
      'AGENTTASK-TEMPLATE',
      'AGENTTASK-PLACEHOLDERS',
      'AGENTTASK-CONTEXT',
      'AGENTTASK-SIZE',
      'AGENTTASK-ROLES'
    ];

    // Check if message contains ONLY whitelisted technical terms
    function isWhitelistedContext(text, pattern) {
      // For each whitelist term, check if the pattern match is within that term
      for (const term of technicalTermWhitelist) {
        // Check if text contains this technical term
        if (new RegExp(term, 'gi').test(text)) {
          // Check if the pattern matches within this term
          const termMatches = text.match(new RegExp(term, 'gi'));
          if (termMatches) {
            for (const termMatch of termMatches) {
              // Create a fresh pattern test for this term
              const patternCopy = new RegExp(pattern.source, pattern.flags);
              if (patternCopy.test(termMatch)) {
                return true; // Pattern is part of whitelisted term
              }
            }
          }
        }
      }
      return false;
    }

    // Build regex patterns from configuration
    const regexPatterns = [
      /🤖 Generated with \[Claude Code\]\([^)]+\)\s*/gi,
      /Generated with \[Claude Code\]\([^)]+\)\s*/gi,
      /Co-Authored-By: Claude <[^>]+>\s*/gi,
      /Claude assisted in this commit\s*/gi,
      /\n\n🤖 Generated.*$/s,
      /\n\nCo-Authored-By: Claude.*$/s,
      /\n\nCo-authored-by:.*<.*@.*>\s*/gi  // Block ALL Co-authored-by lines when git.privacy=true
    ];

    // Add custom patterns from config with word boundaries
    for (const pattern of patterns) {
      // Escape special regex characters
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Add word boundaries for simple words, keep full pattern for phrases
      const patternWithBoundaries = pattern.split(/\s+/).length === 1
        ? `\\b${escaped}\\b`
        : escaped;
      regexPatterns.push(new RegExp(patternWithBoundaries, 'gi'));
    }

    for (const pattern of regexPatterns) {
      // Skip if pattern match is within whitelisted technical term
      if (!isWhitelistedContext(cleaned, pattern)) {
        cleaned = cleaned.replace(pattern, '');
      }
    }

    // Clean up multiple consecutive newlines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    // Trim trailing whitespace
    cleaned = cleaned.trim();

    return cleaned;
  }

  function getCurrentBranch() {
    try {
      const branch = execSync('git branch --show-current', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim();
      log(`Current branch detected: ${branch}`);
      return branch;
    } catch (error) {
      log(`Failed to detect current branch: ${error.message}`);
      return null;
    }
  }

  function enforceBranchProtection(config) {
    // Check if branch protection is enabled
    if (!config.git.branch_protection || !config.git.require_pr_for_main) {
      log('Branch protection disabled - skipping check');
      return { blocked: false };
    }

    const currentBranch = getCurrentBranch();

    if (!currentBranch) {
      log('Could not determine current branch - allowing operation');
      return { blocked: false };
    }

    // Check if committing to protected branch
    if (currentBranch === config.git.default_branch) {
      log(`BLOCKING: Direct commit to ${config.git.default_branch} branch not allowed`);

      const errorMessage = `
🔒 BRANCH PROTECTION: Direct commits to ${config.git.default_branch} not allowed

Current branch: ${currentBranch}
Configuration: git.require_pr_for_main = true

Required workflow:
1. Create feature branch: git checkout -b feature/your-feature
2. Make commits on feature branch
3. Push feature branch: git push origin feature/your-feature
4. Create Pull Request for review
5. Merge after approval

To disable: Set git.require_pr_for_main=false in icc.config.json
      `.trim();

      return {
        blocked: true,
        reason: 'Branch Protection',
        message: errorMessage
      };
    }

    log(`Branch protection check passed - not on ${config.git.default_branch} branch`);
    return { blocked: false };
  }

  function modifyGitCommand(command, config) {
    // Only modify git commit commands
    if (!command.includes('git commit')) {
      log('Not a git commit command - no modification needed');
      return { modified: false, blocked: false, command };
    }

    // STEP 1: Enforce branch protection FIRST
    const branchCheck = enforceBranchProtection(config);
    if (branchCheck.blocked) {
      return {
        modified: false,
        blocked: true,
        reason: branchCheck.reason,
        message: branchCheck.message
      };
    }

    // STEP 2: Check git commit messages for AI mentions (including heredoc content)
    const isGitCommit = command.trim().startsWith('git commit');

    if (config.git && config.git.privacy === true && isGitCommit) {
      let commitMessage = '';

      // Extract message from heredoc if present
      if (command.includes('<<')) {
        // Match heredoc pattern: <<'EOF' ... EOF or <<EOF ... EOF
        const heredocMatch = command.match(/<<\s*['"]?(\w+)['"]?\s*\n([\s\S]*?)\n\1/);
        if (heredocMatch) {
          commitMessage = heredocMatch[2];
          log(`Extracted heredoc content (${commitMessage.length} chars)`);
        }
      } else {
        // Extract from -m "message" flags
        const messageMatches = command.match(/-m\s+["']([^"']+)["']/g);
        if (messageMatches) {
          commitMessage = messageMatches.map(m => m.replace(/-m\s+["']([^"']+)["']/, '$1')).join('\n');
        }
      }

      // Apply privacy filtering to extracted message
      if (commitMessage) {
        const privacyPatterns = config.privacy_patterns || [
          "AI", "Claude", "agent",
          "Generated with Claude Code",
          "Co-Authored-By: Claude"
        ];

        // Technical term whitelist - these terms should NEVER trigger privacy blocking
        const technicalTermWhitelist = [
          'AGENTTASK',
          'AGENTTASK-CORE',
          'AGENTTASK-TEMPLATE',
          'AGENTTASK-PLACEHOLDERS',
          'AGENTTASK-CONTEXT',
          'AGENTTASK-SIZE',
          'AGENTTASK-ROLES'
        ];

        // Check if pattern match is within whitelisted technical term
        function isWhitelistedContext(text, pattern) {
          for (const term of technicalTermWhitelist) {
            // Check if text contains this technical term
            if (new RegExp(term, 'gi').test(text)) {
              // Check if the pattern matches within this term
              const termMatches = text.match(new RegExp(term, 'gi'));
              if (termMatches) {
                for (const termMatch of termMatches) {
                  // Create a fresh pattern test for this term
                  const patternCopy = new RegExp(pattern.source, pattern.flags);
                  if (patternCopy.test(termMatch)) {
                    return true; // Pattern is part of whitelisted term
                  }
                }
              }
            }
          }
          return false;
        }

        let filteredMessage = commitMessage;
        let hasAIMentions = false;

        // Build regex patterns and check for matches
        const regexPatterns = [
          /🤖 Generated with \[Claude Code\]\([^)]+\)/gi,
          /Generated with \[Claude Code\]\([^)]+\)/gi,
          /Co-Authored-By: Claude <[^>]+>/gi,
          /Claude assisted in this commit/gi
        ];

        // Add custom patterns from config with word boundaries
        for (const pattern of privacyPatterns) {
          const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          // Add word boundaries for simple words, keep full pattern for phrases
          const patternWithBoundaries = pattern.split(/\s+/).length === 1
            ? `\\b${escaped}\\b`
            : escaped;
          regexPatterns.push(new RegExp(patternWithBoundaries, 'gi'));
        }

        for (const pattern of regexPatterns) {
          // Skip if pattern match is within whitelisted technical term
          if (pattern.test(filteredMessage) && !isWhitelistedContext(filteredMessage, pattern)) {
            hasAIMentions = true;
            filteredMessage = filteredMessage.replace(pattern, '[FILTERED]');
          }
        }

        if (hasAIMentions) {
          log(`AI mentions detected in commit message - would be filtered`);

          return {
            modified: false,
            blocked: true,
            reason: 'Git Privacy - AI Mentions Detected',
            message: `🚫 GIT PRIVACY: AI mentions detected in commit message

git.privacy=true blocks AI mentions from commit messages.

Original message contained AI-related content that would be filtered.

Filtered version:
${filteredMessage}

✅ To proceed:
1. Remove AI mentions from commit message
2. Or disable git.privacy in icc.config.json`
          };
        }

        log(`Commit message clean - no AI mentions detected`);
      }
    }

    // STEP 3: Enforce git privacy (if enabled)
    if (!config.git || config.git.privacy !== true) {
      log('git_privacy disabled - no modification needed');
      return { modified: false, blocked: false, command };
    }

    // Extract and clean commit message
    const message = extractCommitMessage(command);
    if (!message) {
      log('No commit message found - no modification needed');
      return { modified: false, blocked: false, command };
    }

    const cleanedMessage = stripAIMentions(message, config.privacy_patterns);

    if (cleanedMessage === message) {
      log('No AI mentions found - no modification needed');
      return { modified: false, blocked: false, command };
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

    return { modified: true, blocked: false, command: modifiedCommand };
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
        console.log(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "allow"
          }
        }));
        process.exit(0);
      }
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "allow"
        }
      }));
      process.exit(0);
    }

    const hookInput = JSON.parse(inputData);
    log(`Git enforcement check triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool and parameters
    const tool = hookInput.tool_name || hookInput.tool || '';
    const toolInput = hookInput.tool_input || hookInput.parameters || {};
    const command = toolInput.command || '';

    if (!tool || tool !== 'Bash') {
      log('Not a Bash tool - allowing operation');
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "allow"
        }
      }));
      process.exit(0);
    }

    if (!command) {
      log('No command specified - allowing operation');
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "allow"
        }
      }));
      process.exit(0);
    }

    log(`Checking command: ${command}`);

    // Load configuration
    const config = loadConfiguration();

    // Enforce git rules (privacy + branch protection)
    const result = modifyGitCommand(command, config);

    // BLOCKED: Branch protection violation
    if (result.blocked) {
      log(`Command BLOCKED: ${result.reason}`);
      const response = {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: result.reason
        },
        systemMessage: result.message
      };
      const responseJson = JSON.stringify(response);
      log(`BLOCKING RESPONSE: ${responseJson}`);
      console.log(responseJson);
      process.exit(2);  // Exit code 2 for deny/block
    }

    // MODIFIED: Privacy enforcement applied
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
    log('No modification or blocking needed - allowing operation');
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "allow"
      }
    }));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "allow"
      }
    }));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
