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
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "allow"
    }
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
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "allow",
          permissionDecisionReason: "Emergency override token accepted"
        }
      }));
      process.exit(0);
    }

    // Load configuration-based command lists
    const imperativeDestructive = getSetting('enforcement.infrastructure_protection.imperative_destructive', []);
    const writeOperations = getSetting('enforcement.infrastructure_protection.write_operations', []);
    const readOperations = getSetting('enforcement.infrastructure_protection.read_operations', []);
    const whitelist = getSetting('enforcement.infrastructure_protection.whitelist', []);
    const readAllowed = getSetting('enforcement.infrastructure_protection.read_operations_allowed', true);
    const blockingEnabled = getSetting('enforcement.blocking_enabled', true);

    // Step 1: Check imperative destructive operations (enforce IaC - suggest alternatives)
    for (const imperativeCmd of imperativeDestructive) {
      if (command.includes(imperativeCmd)) {
        if (blockingEnabled) {
          log(`IaC-ENFORCEMENT: Imperative destructive command detected: ${imperativeCmd}`);

          console.log(JSON.stringify({
            hookSpecificOutput: {
              hookEventName: "PreToolUse",
              permissionDecision: "deny",
              permissionDecisionReason: "IaC Enforcement - imperative destructive command detected"
            },
            systemMessage: `🏗️ INFRASTRUCTURE-AS-CODE ENFORCEMENT

Imperative destructive command detected: ${command}

Blocked command: ${imperativeCmd}
Blocked by: enforcement.infrastructure_protection.imperative_destructive

❌ AVOID: Imperative commands (kubectl delete, govc vm.destroy, Remove-VM)
✅ USE: Declarative IaC tools instead:
  • Terraform: terraform destroy
  • Ansible: state=absent in playbooks
  • Helm: helm uninstall
  • CloudFormation: stack deletion

WHY: Declarative tools provide:
  - Version control
  - Audit trails
  - Rollback capability
  - Team visibility
  - State management

To allow imperative commands: Set enforcement.blocking_enabled=false in icc.config.json
Emergency override: EMERGENCY_OVERRIDE:<token> <command>

Configuration: ./icc.config.json or ./.claude/icc.config.json`
          }));
          process.exit(0);
        } else {
          log(`[IaC-ENFORCEMENT] Imperative destructive detected but blocking disabled: ${command}`);
          // Continue with warning - blocking disabled
        }
      }
    }

    // Step 2: Check whitelist (overrides write/read blacklists, but not imperative destructive)
    for (const allowedCmd of whitelist) {
      if (command.includes(allowedCmd)) {
        log(`ALLOWED: Command in whitelist: ${allowedCmd}`);
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    }

    // Step 3: Check write operations (blocked for agents)
    for (const writeCmd of writeOperations) {
      if (command.includes(writeCmd)) {
        log(`BLOCKED: Write operation command: ${writeCmd}`);

        console.log(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: "Infrastructure write operation blocked for agents"
          },
          systemMessage: `⚠️ WRITE OPERATION BLOCKED

Blocked command: ${writeCmd}
Full command: ${command}
Blocked by: enforcement.infrastructure_protection.write_operations

This command can MODIFY running infrastructure:
- Power off/reboot virtual machines
- Start/stop services
- Create/modify resources
- Change infrastructure state

🛡️ INFRASTRUCTURE PROTECTION ACTIVE

Use declarative IaC tools: Terraform, Ansible, Pulumi, CloudFormation

To allow this specific operation:
1. Add to whitelist: enforcement.infrastructure_protection.whitelist in icc.config.json
2. Or disable protection: enforcement.infrastructure_protection.enabled: false
3. Document why Infrastructure-as-Code approach is not suitable

Configuration: ./icc.config.json or ./.claude/icc.config.json`
        }));
        process.exit(0);
      }
    }

    // Step 4: Check read operations (allowed if read_operations_allowed=true)
    for (const readCmd of readOperations) {
      if (command.includes(readCmd)) {
        if (readAllowed) {
          log(`ALLOWED: Read operation: ${readCmd}`);
          console.log(JSON.stringify(standardOutput));
          process.exit(0);
        } else {
          log(`BLOCKED: Read operation disabled: ${readCmd}`);

          console.log(JSON.stringify({
            hookSpecificOutput: {
              hookEventName: "PreToolUse",
              permissionDecision: "deny",
              permissionDecisionReason: "Infrastructure read operation disabled"
            },
            systemMessage: `ℹ️ READ OPERATION BLOCKED

Blocked command: ${readCmd}
Full command: ${command}
Blocked by: enforcement.infrastructure_protection.read_operations

Read operations are currently disabled.

To allow read operations:
1. Enable in configuration: enforcement.infrastructure_protection.read_operations_allowed: true
2. Or add to whitelist: enforcement.infrastructure_protection.whitelist

Configuration: ./icc.config.json or ./.claude/icc.config.json`
          }));
          process.exit(0);
        }
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
