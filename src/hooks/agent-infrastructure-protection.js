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

  function extractSSHCommand(command) {
    // Match SSH command patterns:
    // ssh user@host "command"
    // ssh -J jump@host user@host "command"
    // ssh -i keyfile user@host "command"
    // ssh user@host << 'EOF' ... EOF (heredoc)
    // ssh user@host << EOF ... EOF (heredoc)

    // Pattern 1: Quoted commands
    const quotedPatterns = [
      /ssh\s+.*?"([^"]+)"/,  // ssh ... "command" (double quotes)
      /ssh\s+.*?'([^']+)'/,  // ssh ... 'command' (single quotes)
    ];

    for (const pattern of quotedPatterns) {
      const match = command.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Pattern 2: Heredoc (extract entire heredoc content)
    const heredocPattern = /ssh\s+.*?<<\s*'?EOF'?\s*([\s\S]*?)\s*EOF/;
    const heredocMatch = command.match(heredocPattern);
    if (heredocMatch && heredocMatch[1]) {
      return heredocMatch[1].trim();
    }

    return command; // Not SSH, return original
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

    // Extract actual command (handle SSH wrapping)
    const actualCommand = extractSSHCommand(command);
    log(`Actual command after SSH extraction: ${actualCommand.substring(0, 100)}...`);

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
      if (actualCommand.includes(imperativeCmd)) {
        if (blockingEnabled) {
          log(`IaC-ENFORCEMENT: Imperative destructive command detected: ${imperativeCmd}`);

          console.log(JSON.stringify({
            hookSpecificOutput: {
              hookEventName: "PreToolUse",
              permissionDecision: "deny",
              permissionDecisionReason: "IaC Enforcement - imperative destructive command detected"
            },
            systemMessage: `🏗️ INFRASTRUCTURE-AS-CODE ENFORCEMENT

Full command: ${command}
Remote command: ${actualCommand}

Blocked command: ${imperativeCmd}
Blocked by: enforcement.infrastructure_protection.imperative_destructive

❌ PROHIBITED APPROACHES:
  • Imperative commands (kubectl delete, govc vm.destroy, Remove-VM)
  • Shell scripts with infrastructure commands
  • Manual SSH operations
  • Ad-hoc infrastructure modifications
  • One-off fixes without documentation

✅ REQUIRED: REUSABLE INFRASTRUCTURE-AS-CODE
  • Ansible Playbooks (playbooks/*.yml) - state management
  • Terraform configurations (*.tf) - infrastructure definition
  • Helm Charts (charts/*) - Kubernetes applications
  • CloudFormation templates (*.yaml) - AWS resources
  • Pulumi programs - multi-cloud infrastructure

WHY IaC ONLY:
  • Version control - track all changes
  • Reusability - apply same config to multiple environments
  • Audit trails - who changed what when
  • Rollback capability - revert to previous state
  • Team visibility - everyone sees infrastructure state
  • Documentation - code IS the documentation
  • Testing - validate before applying
  • Idempotency - same result every time

WORKFLOW:
1. Create reusable playbook/chart/config
2. Test in development environment
3. Commit to version control
4. Apply via IaC tool (ansible-playbook, terraform apply, helm install)
5. Document in repository

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
      if (actualCommand.includes(allowedCmd)) {
        log(`ALLOWED: Command in whitelist: ${allowedCmd}`);
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    }

    // Step 3: Check write operations (blocked for agents)
    for (const writeCmd of writeOperations) {
      if (actualCommand.includes(writeCmd)) {
        log(`BLOCKED: Write operation command: ${writeCmd}`);

        console.log(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: "Infrastructure write operation blocked for agents"
          },
          systemMessage: `⚠️ INFRASTRUCTURE MODIFICATION BLOCKED

Full command: ${command}
Remote command: ${actualCommand}

Blocked command: ${writeCmd}
Blocked by: enforcement.infrastructure_protection.write_operations

❌ PROHIBITED:
  • Manual infrastructure modifications via SSH
  • Shell scripts with kubectl/govc/VM commands
  • Direct state changes without IaC
  • Ad-hoc fixes and patches

✅ REQUIRED: Create reusable IaC resources
  • Ansible Playbooks for configuration management
  • Helm Charts for Kubernetes deployments
  • Terraform for infrastructure provisioning
  • Version-controlled and documented

PRINCIPLE: Infrastructure changes MUST be:
  - Repeatable (works in all environments)
  - Versionable (committed to git)
  - Testable (validated before production)
  - Documented (self-documenting code)

To allow this operation:
1. Create reusable playbook/chart/config
2. Add to whitelist: enforcement.infrastructure_protection.whitelist
3. Or disable protection: enforcement.infrastructure_protection.enabled: false

Configuration: ./icc.config.json or ./.claude/icc.config.json`
        }));
        process.exit(0);
      }
    }

    // Step 4: Check read operations (allowed if read_operations_allowed=true)
    for (const readCmd of readOperations) {
      if (actualCommand.includes(readCmd)) {
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
