const { getSetting } = require('./config-loader');

/**
 * Command Validation Utilities
 * Shared bash command validation functions
 */

/**
 * Extract actual commands from complex bash command string
 * @param {string} commandString - Full bash command string
 * @returns {Array<string>} Array of command names
 */
function extractCommandsFromBash(commandString) {
  // Remove all quoted strings (both single and double quotes)
  let cleanedCommand = commandString;

  // Remove double-quoted strings: "text"
  cleanedCommand = cleanedCommand.replace(/"[^"]*"/g, '""');

  // Remove single-quoted strings: 'text'
  cleanedCommand = cleanedCommand.replace(/'[^']*'/g, "''");

  // Split by command separators: && || ; |
  const statements = cleanedCommand.split(/&&|\|\||;|\|/).map(s => s.trim());

  const commands = [];

  for (const statement of statements) {
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
      const commandName = cmd.includes('/') ? cmd.split('/').pop() : cmd;

      commands.push(commandName);
    }
  }

  return commands;
}

/**
 * Check if bash command is allowed coordination command
 * @param {string} command - Bash command to check
 * @returns {boolean} true if allowed
 */
function isAllowedCoordinationCommand(command) {
  const allowedCommands = [
    // Git operations (complete workflow)
    'git status', 'git log', 'git diff', 'git show',
    'git add', 'git commit', 'git push', 'git pull',
    'git branch', 'git checkout', 'git fetch', 'git merge',
    'git reset', 'git stash', 'git tag', 'git remote',
    // File reading and searching
    'ls', 'find', 'cat', 'head', 'tail', 'grep', 'less', 'more', 'wc',
    // Information commands
    'date', 'pwd', 'whoami', 'echo', 'which', 'env',
    // Process monitoring
    'ps', 'top', 'jobs', 'bg', 'fg'
  ];

  // Check if command starts with any allowed command
  for (const allowed of allowedCommands) {
    if (command.trim().startsWith(allowed)) {
      return true;
    }
  }

  return false;
}

/**
 * Validate bash command for PM constraints
 * @param {string} command - Bash command to validate
 * @returns {Object} Validation result with allowed (boolean) and optional message
 */
function validateBashCommand(command) {
  // Allow read-only process inspection commands
  const readOnlyInspectionCommands = ['ps', 'pgrep', 'pidof', 'lsof', 'netstat', 'ss', 'top', 'htop'];

  const firstWord = command.trim().split(/\s+/)[0];
  if (readOnlyInspectionCommands.includes(firstWord)) {
    return { allowed: true };
  }

  // Check for SSH remote execution
  const sshPattern = /\bssh\b[^"']*["']([^"']+)["']/;
  const sshMatch = command.match(sshPattern);

  if (sshMatch) {
    const remoteCommand = sshMatch[1];
    // Recursively validate remote command
    return validateBashCommand(remoteCommand);
  }

  // Special case: grep is read-only if it's part of a pipe
  if (command.includes(' | grep') || command.match(/^\s*grep\s+/)) {
    return { allowed: true };
  }

  // Special case: kubectl read-only commands
  if (firstWord === 'kubectl') {
    const readOnlyKubectlSubcommands = [
      'get', 'describe', 'logs', 'top', 'version', 'cluster-info',
      'config view', 'api-resources', 'api-versions', 'explain'
    ];

    const kubectlSubcommand = command.trim().split(/\s+/)[1];

    if (readOnlyKubectlSubcommands.includes(kubectlSubcommand)) {
      return { allowed: true };
    }
  }

  // Block build/deploy/system commands
  const blockedCommands = [
    'npm', 'yarn', 'make', 'docker', 'cargo', 'mvn', 'gradle', 'go',
    'terraform', 'ansible', 'helm', 'systemctl', 'service',
    'apt', 'yum', 'brew', 'pip', 'gem', 'composer',
    'python', 'python3', 'node', 'ruby', 'perl', 'php',
    'nohup', 'screen', 'tmux',
    'sed', 'awk',
    'vi', 'vim', 'nano', 'emacs',
    'ssh', 'scp', 'sftp', 'rsync'
  ];

  // Add infrastructure tools from configuration
  const pmInfrastructureBlacklist = getSetting('enforcement.infrastructure_protection.pm_blacklist', []);
  const allBlockedCommands = [...blockedCommands, ...pmInfrastructureBlacklist];

  // Check for heredoc pattern
  if (command.includes('<<')) {
    return {
      allowed: false,
      message: `🚫 PM role cannot execute heredoc commands - create Agents using AgentTasks for technical work

Blocked pattern: Heredoc (cat << 'EOF', python << 'EOF', etc.)
Full command: ${command}

Heredoc commands require technical implementation by specialist agents.
Use Write tool for file creation or Task tool to create specialist agent via AgentTask.`
    };
  }

  // Extract actual commands
  const actualCommands = extractCommandsFromBash(command);

  // Check if any command is blocked
  for (const cmd of actualCommands) {
    for (const blocked of allBlockedCommands) {
      if (cmd === blocked || cmd.startsWith(blocked + '-')) {
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
Use Task tool to create specialist agent via AgentTask with explicit approval.`
        };
      }
    }
  }

  return { allowed: true };
}

/**
 * Check if bash command modifies installation directory
 * @param {string} command - Bash command to check
 * @returns {boolean} true if command modifies ~/.claude/
 */
function isModifyingBashCommand(command) {
  const path = require('path');
  const os = require('os');

  // Commands that modify filesystem
  const modifyingCommands = ['rm', 'mv', 'cp', 'touch', 'mkdir', 'rmdir'];
  const firstWord = command.trim().split(/\s+/)[0];

  if (!modifyingCommands.includes(firstWord)) {
    return false;
  }

  // Check if command references ~/.claude/
  const homedir = os.homedir();
  const claudeDir = path.join(homedir, '.claude');

  return command.includes('~/.claude') || command.includes(claudeDir);
}

module.exports = {
  extractCommandsFromBash,
  isAllowedCoordinationCommand,
  validateBashCommand,
  isModifyingBashCommand
};
