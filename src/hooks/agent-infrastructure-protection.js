#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Load unified config
const { getSetting } = require('./lib/config-loader');
const { initializeHook } = require('./lib/logging');

// Load config ONCE at module level (not on every hook invocation)
const PROTECTION_ENABLED = getSetting('enforcement.infrastructure_protection.enabled', true);
const EMERGENCY_OVERRIDE_ENABLED = getSetting('enforcement.infrastructure_protection.emergency_override_enabled', false);
const EMERGENCY_TOKEN = getSetting('enforcement.infrastructure_protection.emergency_override_token', '');
const IMPERATIVE_DESTRUCTIVE = getSetting('enforcement.infrastructure_protection.imperative_destructive', []);
const WRITE_OPERATIONS = getSetting('enforcement.infrastructure_protection.write_operations', []);
const READ_OPERATIONS = getSetting('enforcement.infrastructure_protection.read_operations', []);
const WHITELIST = getSetting('enforcement.infrastructure_protection.whitelist', []);
const READ_ALLOWED = getSetting('enforcement.infrastructure_protection.read_operations_allowed', true);
const BLOCKING_ENABLED = getSetting('enforcement.blocking_enabled', true);

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('agent-infrastructure-protection');

  const DOC_DIRECTORY_NAMES = new Set([
    'docs',
    'documentation',
    'doc',
    'docs-site',
    'docs-content',
  ]);
  const MARKDOWN_ALLOWLIST_DIRS = [
    getSetting('paths.docs_path', 'docs'),
    getSetting('paths.story_path', 'stories'),
    getSetting('paths.bug_path', 'bugs'),
    getSetting('paths.memory_path', 'memory'),
    getSetting('paths.summaries_path', 'summaries'),
    'agenttasks'
  ];

  function hasCommandSubstitution(str) {
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      const prev = str[i - 1];

      if (!inDouble && ch === "'" && prev !== '\\') {
        inSingle = !inSingle;
        continue;
      }
      if (!inSingle && ch === '"' && prev !== '\\') {
        inDouble = !inDouble;
        continue;
      }
      if (inSingle) {
        continue;
      }

      if (ch === '$' && prev !== '\\' && str[i + 1] === '(') {
        return true;
      }
      if (ch === '`' && prev !== '\\') {
        return true;
      }
      if ((ch === '>' || ch === '<') && prev !== '\\' && str[i + 1] === '(') {
        return true;
      }
    }
    return false;
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Return true if `needle` appears in `haystack` outside of quotes
  function containsUnquoted(haystack, needle) {
    if (!haystack || !needle) return false;
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i <= haystack.length - needle.length; i++) {
      const ch = haystack[i];

      if (ch === '\\') { // skip escaped character
        i += 1;
        continue;
      }

      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
        continue;
      }

      if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        continue;
      }

      if (!inSingle && !inDouble && haystack.startsWith(needle, i)) {
        return true;
      }
    }

    return false;
  }

  const ALLOW_PARENT_ALLOWLIST_PATHS = getSetting('enforcement.allow_parent_allowlist_paths', false);

  function targetsDocumentation(target, cwd) {
    const absBase = path.resolve(cwd || process.cwd());
    const absTarget = path.resolve(absBase, target);

    const underBase = absTarget === absBase || absTarget.startsWith(absBase + path.sep);
    if (!underBase && !ALLOW_PARENT_ALLOWLIST_PATHS) {
      return false;
    }

    const segments = absTarget.split(path.sep);
    return segments.some((segment) => DOC_DIRECTORY_NAMES.has(segment));
  }

  function targetsAllowlistedMarkdown(target, cwd) {
    const absBase = path.resolve(cwd || process.cwd());
    const absTarget = path.resolve(absBase, target);

    const underBase = absTarget === absBase || absTarget.startsWith(absBase + path.sep);
    if (!underBase && !ALLOW_PARENT_ALLOWLIST_PATHS) {
      return false;
    }

    if (!absTarget.endsWith('.md')) {
      return false;
    }

    const segments = absTarget.split(path.sep);
    return segments.some((segment) => MARKDOWN_ALLOWLIST_DIRS.includes(segment));
  }

  function isAllowlistedMarkdownWrite(cmd, cwd) {
    const trimmed = cmd.trim();
    if (!trimmed) {
      return false;
    }

    const firstLine = trimmed.split('\n', 1)[0];

    if (/[;&|]{1,2}/.test(firstLine)) {
      return false;
    }

    if (hasCommandSubstitution(firstLine)) {
      return false;
    }

    const redirectMatch = firstLine.match(/^(?:\s*)(cat|printf|tee)\b[^>]*>+\s*([^\s]+)\s*$/i);
    if (!redirectMatch) {
      return false;
    }

    const target = redirectMatch[2];
    if (!targetsAllowlistedMarkdown(target, cwd)) {
      return false;
    }

    const dashTrim = firstLine.includes('<<-');
    const heredocMatch = firstLine.match(/<<-?\s*(?:'([A-Za-z0-9_:-]+)'|"([A-Za-z0-9_:-]+)"|([A-Za-z0-9_:-]+))/);
    if (heredocMatch) {
      const terminator = heredocMatch[1] || heredocMatch[2] || heredocMatch[3];

      const leadingTabs = dashTrim ? '\\t*' : '';
      const terminatorRegex = new RegExp(`\\n${leadingTabs}${escapeRegex(terminator)}\\s*$`);
      const hasTerminator = terminatorRegex.test(trimmed);
      const isQuoted = Boolean(heredocMatch[1] || heredocMatch[2]);

      if (!hasTerminator) {
        return false;
      }

      if (!isQuoted) {
        const body = trimmed.replace(/^.*?\n/s, '');
        if (hasCommandSubstitution(body)) {
          return false;
        }
      }

      return true;
    }

    return trimmed.indexOf('\n') === -1;
  }

  function looksLikeMarkdownWrite(cmd, cwd) {
    const trimmed = cmd.trim();
    if (!trimmed) return false;
    const firstLine = trimmed.split('\n', 1)[0];
    const redirectMatch = firstLine.match(/^(?:\s*)(cat|printf|tee)\b[^>]*>+\s*([^\s]+)\s*$/i);
    if (!redirectMatch) return false;
    const target = redirectMatch[2];
    return targetsAllowlistedMarkdown(target, cwd);
  }

  function isDocumentationWrite(cmd, cwd) {
    const trimmed = cmd.trim();
    if (!trimmed) {
      return false;
    }

    const firstLine = trimmed.split('\n', 1)[0];

    if (/[;&|]{1,2}/.test(firstLine)) {
      return false;
    }

    if (hasCommandSubstitution(firstLine)) {
      return false;
    }

    const redirectMatch = firstLine.match(/^(?:\s*)(cat|printf|tee)\b[^>]*>+\s*([^\s]+)\s*$/i);
    if (!redirectMatch) {
      return false;
    }

    const target = redirectMatch[2];
    if (!targetsDocumentation(target, cwd)) {
      return false;
    }

    const dashTrim = firstLine.includes('<<-');
    const heredocMatch = firstLine.match(/<<-?\s*(?:'([A-Za-z0-9_:-]+)'|"([A-Za-z0-9_:-]+)"|([A-Za-z0-9_:-]+))/);
    if (heredocMatch) {
      const terminator = heredocMatch[1] || heredocMatch[2] || heredocMatch[3];

      // Require a quoted terminator OR a body with no command substitution
      const leadingTabs = dashTrim ? '\\t*' : '';
      const terminatorRegex = new RegExp(`\\n${leadingTabs}${escapeRegex(terminator)}\\s*$`);
      const hasTerminator = terminatorRegex.test(trimmed);
      const isQuoted = Boolean(heredocMatch[1] || heredocMatch[2]);

      if (!hasTerminator) {
        return false;
      }

      if (!isQuoted) {
        // Unquoted heredoc bodies perform substitution; ensure body is clean
        const body = trimmed.replace(/^.*?\n/s, '');
        if (hasCommandSubstitution(body)) {
          return false;
        }
      }

      return true;
    }

    return trimmed.indexOf('\n') === -1;
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
    // hookInput already parsed earlier for logging
    if (!hookInput) {
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
    const protectionEnabled = PROTECTION_ENABLED;

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

    // Special-case: allow pure documentation writes to docs*/ directories even if
    // the heredoc body contains infra keywords, because only a file write occurs.
    if (isDocumentationWrite(command, hookInput.cwd)) {
      log('ALLOWED: Documentation write detected (docs*/ directories fast-path)');
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // If this is a markdown write attempt but contains command substitution anywhere, block it explicitly
    if (looksLikeMarkdownWrite(command, hookInput.cwd) && hasCommandSubstitution(command)) {
      log('BLOCKED: Markdown write contains command substitution');
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: "Command substitution detected inside markdown write"
        }
      }));
      process.exit(0);
    }

    // Allow markdown writes in allowlisted directories (docs/stories/bugs/memory/summaries/agenttasks)
    if (isAllowlistedMarkdownWrite(command, hookInput.cwd)) {
      log('ALLOWED: Markdown write detected in allowlisted directory');
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Check for emergency override token
    const emergencyOverrideEnabled = EMERGENCY_OVERRIDE_ENABLED;
    const emergencyToken = EMERGENCY_TOKEN;

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
    const imperativeDestructive = IMPERATIVE_DESTRUCTIVE;
    const writeOperations = WRITE_OPERATIONS;
    const readOperations = READ_OPERATIONS;
    const whitelist = WHITELIST;
    const readAllowed = READ_ALLOWED;
    const blockingEnabled = BLOCKING_ENABLED;

    // Step 1: Check imperative destructive operations (enforce IaC - suggest alternatives)
    for (const imperativeCmd of imperativeDestructive) {
      if (containsUnquoted(command, imperativeCmd) || containsUnquoted(actualCommand, imperativeCmd)) {
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
      if (command.includes(allowedCmd) || actualCommand.includes(allowedCmd)) {
        log(`ALLOWED: Command in whitelist: ${allowedCmd}`);
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    }

    // Step 3: Check write operations (blocked for agents)
    for (const writeCmd of writeOperations) {
      if (containsUnquoted(command, writeCmd) || containsUnquoted(actualCommand, writeCmd)) {
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
      if (command.includes(readCmd) || actualCommand.includes(readCmd)) {
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
