#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Load unified config
const { getSetting } = require('./lib/config-loader');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-infrastructure-protection.log`);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        const stdinBuffer = fs.readFileSync(0, 'utf8');
        if (stdinBuffer && stdinBuffer.trim()) {
          inputData = stdinBuffer;
        }
      } catch (error) {
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    let hookInput;
    try {
      hookInput = JSON.parse(inputData);
    } catch (error) {
      log(`JSON parse error: ${error.message}`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const tool_name = hookInput.tool_name;

    // Only check Bash operations
    if (tool_name !== 'Bash') {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const command = hookInput.tool_input?.command || '';

    // Check if infrastructure protection is enabled
    const protectionEnabled = getSetting('enforcement.infrastructure_protection.enabled', true);

    if (!protectionEnabled) {
      log('Infrastructure protection disabled - allowing command');
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    log(`Checking command: ${command.substring(0, 100)}...`);
    log(`Infrastructure protection: enabled`);

    // Check for emergency override token
    const emergencyOverrideEnabled = getSetting('enforcement.infrastructure_protection.emergency_override_enabled', false);
    const emergencyToken = getSetting('enforcement.infrastructure_protection.emergency_override_token', '');

    if (emergencyOverrideEnabled && emergencyToken && command.includes(`EMERGENCY_OVERRIDE:${emergencyToken}`)) {
      log(`EMERGENCY OVERRIDE ACTIVATED - allowing command with token`);
      // Remove token from command before execution
      const cleanCommand = command.replace(new RegExp(`EMERGENCY_OVERRIDE:${emergencyToken}\\s*`, 'g'), '');
      console.log(JSON.stringify({
        ...standardOutput,
        modifiedCommand: cleanCommand
      }));
      process.exit(0);
    }

    // Load configuration-based command lists
    const criticalDestructive = getSetting('enforcement.infrastructure_protection.critical_destructive', []);
    const writeOperations = getSetting('enforcement.infrastructure_protection.write_operations', []);
    const readOperations = getSetting('enforcement.infrastructure_protection.read_operations', []);
    const whitelist = getSetting('enforcement.infrastructure_protection.whitelist', []);
    const readAllowed = getSetting('enforcement.infrastructure_protection.read_operations_allowed', true);

    // Check whitelist first (explicit allow)
    for (const allowedCmd of whitelist) {
      if (command.includes(allowedCmd)) {
        log(`ALLOWED: Command in whitelist: ${allowedCmd}`);
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    }

    // Check for critical destructive operations (ALWAYS blocked)
    for (const criticalCmd of criticalCommands) {
      if (command.includes(criticalCmd)) {
        log(`BLOCKED: Critical destructive command detected: ${criticalCmd}`);

        console.log(JSON.stringify({
          continue: false,
          displayToUser: `🚨 CRITICAL: Infrastructure destruction command blocked

Command: ${criticalCmd}
Full command: ${command}

This command can PERMANENTLY DESTROY infrastructure:
- Virtual machines
- Datastores
- Resource pools
- Network configuration

⛔ BLOCKED FOR SAFETY

If this operation is absolutely necessary:
1. Add to whitelist in icc.config.json: enforcement.infrastructure_protection.whitelist
2. Document justification and impact
3. Obtain user confirmation
4. Execute manually with explicit approval

Infrastructure-as-Code Principle: Use declarative tools (Terraform, Ansible, Pulumi) instead of imperative commands.`
        }));
        process.exit(0);
      }
    }

    // Check agent-specific blacklist (high-risk manipulation)
    for (const blacklistedCmd of agentBlacklist) {
      if (command.includes(blacklistedCmd)) {
        log(`BLOCKED: Agent blacklist command: ${blacklistedCmd}`);

        console.log(JSON.stringify({
          continue: false,
          displayToUser: `⚠️ HIGH-RISK: Infrastructure manipulation command blocked

Command: ${blacklistedCmd}
Full command: ${command}

This command can disrupt running infrastructure:
- Power off/reboot virtual machines
- Shutdown/reboot hosts
- Interrupt production services

🛡️ BLOCKED BY INFRASTRUCTURE PROTECTION

Infrastructure-as-Code Principle Enforcement:
- Use declarative tools: Terraform, Ansible, Pulumi, CloudFormation
- Avoid imperative commands that manipulate infrastructure state
- Document infrastructure changes in code

To allow this specific operation:
1. Add to whitelist: enforcement.infrastructure_protection.whitelist in icc.config.json
2. Or disable protection: enforcement.infrastructure_protection.enabled: false
3. Document why Infrastructure-as-Code approach is not suitable

Project-specific configuration: ./icc.config.json or ./.claude/icc.config.json`
        }));
        process.exit(0);
      }
    }

    // Allow command
    console.log(JSON.stringify(standardOutput));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
