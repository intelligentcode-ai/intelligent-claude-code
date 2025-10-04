#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-pre-commit.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  function loadGitPrivacySetting() {
    // Priority 1: Project-local config (HIGHEST)
    const projectConfigs = ['CLAUDE.md', '.claude/config.md', 'config.md'];
    for (const configPath of projectConfigs) {
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf8');

        // Try YAML frontmatter first
        const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (yamlMatch) {
          const yamlContent = yamlMatch[1];
          const match = yamlContent.match(/git_privacy:\s*(true|false)/);
          if (match) {
            log(`git_privacy loaded from project config YAML (${configPath}): ${match[1]}`);
            return match[1] === 'true';
          }
        }

        // Try markdown key:value pairs
        const match = content.match(/git_privacy:\s*(true|false)/);
        if (match) {
          log(`git_privacy loaded from project config (${configPath}): ${match[1]}`);
          return match[1] === 'true';
        }
      }
    }

    // Priority 2: User-global config
    const userConfig = path.join(os.homedir(), '.claude', 'config.md');
    if (fs.existsSync(userConfig)) {
      const content = fs.readFileSync(userConfig, 'utf8');
      const match = content.match(/git_privacy:\s*(true|false)/);
      if (match) {
        log(`git_privacy loaded from user config: ${match[1]}`);
        return match[1] === 'true';
      }
    }

    // Priority 3: System default (false - allow by default)
    log('git_privacy not configured - defaulting to false (allow AI mentions)');
    return false;
  }

  try {
    // Read commit message from .git/COMMIT_EDITMSG
    const commitMsgPath = '.git/COMMIT_EDITMSG';
    if (!fs.existsSync(commitMsgPath)) {
      log('No commit message file found - allowing commit');
      process.exit(0);
    }

    const commitMessage = fs.readFileSync(commitMsgPath, 'utf8');
    log(`Checking commit message: ${commitMessage.substring(0, 100)}...`);

    // Load git_privacy setting from configuration hierarchy
    const gitPrivacy = loadGitPrivacySetting();

    if (!gitPrivacy) {
      log('git_privacy disabled - allowing commit with AI mentions');
      process.exit(0);
    }

    log('git_privacy enabled - validating commit message');

    // Check for AI mention patterns
    const AI_PATTERNS = [
      { pattern: /Claude/i, name: 'Claude' },
      { pattern: /Generated with.*Claude Code/i, name: 'Generated with Claude Code' },
      { pattern: /Co-Authored-By:.*Claude/i, name: 'Co-Authored-By: Claude' },
      { pattern: /\bAI\b/, name: 'AI' },
      { pattern: /artificial intelligence/i, name: 'artificial intelligence' }
    ];

    const violations = [];
    for (const { pattern, name } of AI_PATTERNS) {
      if (pattern.test(commitMessage)) {
        violations.push(name);
        log(`AI mention detected: ${name}`);
      }
    }

    if (violations.length > 0) {
      const errorMessage = `🚫 Git Privacy Violation: AI mentions detected in commit message

git_privacy: true (configured in project/user settings)

Detected patterns:
${violations.map(v => `  - ${v}`).join('\n')}

Please remove AI attribution patterns from your commit message:
  - Remove "Generated with Claude Code" footer
  - Remove "Co-Authored-By: Claude" attribution
  - Remove any AI/Claude references

To allow AI mentions in this project, set in CLAUDE.md:
  git_privacy: false`;

      console.error(errorMessage);
      log('BLOCKED: AI mentions found in commit message');
      process.exit(1);  // Block commit
    }

    log('No AI mentions detected - allowing commit');
    process.exit(0);  // Allow commit

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow commit to prevent blocking valid work
    console.log('Hook error - allowing commit (fail-safe)');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
