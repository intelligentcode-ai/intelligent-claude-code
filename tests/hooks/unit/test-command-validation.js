#!/usr/bin/env node
/**
 * Unit Tests for command-validation.js
 * Tests command extraction, validation, and security boundaries
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const { commandScenarios } = require('../fixtures/test-scenarios');
const {
  extractCommandsFromBash,
  isAllowedCoordinationCommand,
  validateBashCommand,
  isModifyingBashCommand
} = require('/Users/karsten/.claude/hooks/lib/command-validation.js');

// Test extractCommandsFromBash()
const extractionTests = {
  'extracts simple command': () => {
    const result = extractCommandsFromBash('git status');
    assert.deepStrictEqual(result, ['git'], 'Should extract git');
  },

  'extracts commands from pipe': () => {
    const result = extractCommandsFromBash('ls -la | grep test');
    assert.deepStrictEqual(result, ['ls', 'grep'], 'Should extract both commands');
  },

  'extracts commands from && chain': () => {
    const result = extractCommandsFromBash('cd /path && git status');
    assert.deepStrictEqual(result, ['cd', 'git'], 'Should extract chained commands');
  },

  'extracts commands from || chain': () => {
    const result = extractCommandsFromBash('make build || echo failed');
    assert.deepStrictEqual(result, ['make', 'echo'], 'Should extract OR commands');
  },

  'handles quoted strings': () => {
    const result = extractCommandsFromBash('echo "test && fake" && git status');
    assert.deepStrictEqual(result, ['echo', 'git'], 'Should ignore commands in quotes');
  },

  'handles environment variables': () => {
    const result = extractCommandsFromBash('FOO=bar BAZ=qux npm install');
    assert.deepStrictEqual(result, ['npm'], 'Should skip environment variables');
  },

  'handles command paths': () => {
    const result = extractCommandsFromBash('/usr/bin/python3 script.py');
    assert.deepStrictEqual(result, ['python3'], 'Should extract command name from path');
  },

  'handles empty command': () => {
    const result = extractCommandsFromBash('');
    assert.deepStrictEqual(result, [], 'Should return empty array');
  },

  'handles complex SSH command': () => {
    const result = extractCommandsFromBash('ssh user@host "cd /path && npm install"');
    assert.deepStrictEqual(result, ['ssh'], 'Should extract ssh command');
  },

  'handles heredoc pattern': () => {
    const result = extractCommandsFromBash('cat << EOF\ntest\nEOF');
    assert.deepStrictEqual(result, ['cat'], 'Should extract cat from heredoc');
  }
};

// Test validateBashCommand()
const validationTests = {
  'allows git status': () => {
    const result = validateBashCommand('git status');
    assert.strictEqual(result.allowed, true, 'Should allow git status');
  },

  'allows read-only commands': () => {
    const result = validateBashCommand('ls -la');
    assert.strictEqual(result.allowed, true, 'Should allow ls');
  },

  'allows grep in pipe': () => {
    const result = validateBashCommand('git log | grep commit');
    assert.strictEqual(result.allowed, true, 'Should allow grep in pipe');
  },

  'allows process inspection': () => {
    const result = validateBashCommand('ps aux');
    assert.strictEqual(result.allowed, true, 'Should allow ps');
  },

  'blocks npm commands': () => {
    const result = validateBashCommand('npm install');
    assert.strictEqual(result.allowed, false, 'Should block npm');
    assert(result.message, 'Should include error message');
  },

  'blocks docker commands': () => {
    const result = validateBashCommand('docker run nginx');
    assert.strictEqual(result.allowed, false, 'Should block docker');
  },

  'blocks terraform commands': () => {
    const result = validateBashCommand('terraform apply');
    assert.strictEqual(result.allowed, false, 'Should block terraform');
  },

  'blocks python execution': () => {
    const result = validateBashCommand('python3 script.py');
    assert.strictEqual(result.allowed, false, 'Should block python');
  },

  'blocks heredoc patterns': () => {
    const result = validateBashCommand('cat << EOF\ntest\nEOF');
    assert.strictEqual(result.allowed, false, 'Should block heredoc');
    assert(result.message.includes('heredoc'), 'Should mention heredoc in message');
  },

  'blocks chained blocked commands': () => {
    const result = validateBashCommand('cd /path && npm install');
    assert.strictEqual(result.allowed, false, 'Should block chain with npm');
  },

  'allows kubectl get': () => {
    const result = validateBashCommand('kubectl get pods');
    assert.strictEqual(result.allowed, true, 'Should allow kubectl get');
  },

  'allows kubectl non-read-only when not in blacklist': () => {
    // Note: kubectl destructive commands are only blocked if kubectl is in pm_blacklist config
    const result = validateBashCommand('kubectl delete pod test');
    // In test environment without pm_blacklist config, this is allowed by default
    assert.strictEqual(result.allowed, true, 'kubectl delete allowed without blacklist config');
  },

  'validates SSH remote command': () => {
    const result = validateBashCommand('ssh user@host "npm install"');
    assert.strictEqual(result.allowed, false, 'Should block SSH with npm');
  }
};

// Test isAllowedCoordinationCommand()
const coordinationTests = {
  'allows git status': () => {
    const result = isAllowedCoordinationCommand('git status');
    assert.strictEqual(result, true, 'Should allow git status');
  },

  'allows git commit': () => {
    const result = isAllowedCoordinationCommand('git commit -m "test"');
    assert.strictEqual(result, true, 'Should allow git commit');
  },

  'allows ls commands': () => {
    const result = isAllowedCoordinationCommand('ls -la /path');
    assert.strictEqual(result, true, 'Should allow ls');
  },

  'allows grep': () => {
    const result = isAllowedCoordinationCommand('grep pattern file.txt');
    assert.strictEqual(result, true, 'Should allow grep');
  },

  'blocks npm commands': () => {
    const result = isAllowedCoordinationCommand('npm install');
    assert.strictEqual(result, false, 'Should block npm');
  },

  'blocks docker commands': () => {
    const result = isAllowedCoordinationCommand('docker ps');
    assert.strictEqual(result, false, 'Should block docker');
  }
};

// Test isModifyingBashCommand()
const modificationTests = {
  'detects rm ~/.claude/ command': () => {
    const result = isModifyingBashCommand('rm -rf ~/.claude/hooks');
    assert.strictEqual(result, true, 'Should detect ~/.claude/ modification');
  },

  'detects mv ~/.claude/ command': () => {
    const result = isModifyingBashCommand('mv ~/.claude/config.md ~/.claude/config.bak');
    assert.strictEqual(result, true, 'Should detect ~/.claude/ modification');
  },

  'allows rm in project directory': () => {
    const result = isModifyingBashCommand('rm /project/file.txt');
    assert.strictEqual(result, false, 'Should allow project directory modifications');
  },

  'allows read-only commands': () => {
    const result = isModifyingBashCommand('cat ~/.claude/config.md');
    assert.strictEqual(result, false, 'Should allow read-only commands');
  },

  'detects cp to ~/.claude/': () => {
    const result = isModifyingBashCommand('cp file.txt ~/.claude/');
    assert.strictEqual(result, true, 'Should detect cp to ~/.claude/');
  }
};

// Test with test-scenarios.js data
const scenarioTests = {
  'validates all command scenarios': () => {
    let passed = 0;
    let failed = 0;

    for (const scenario of commandScenarios) {
      const result = validateBashCommand(scenario.command);
      if (result.allowed === scenario.shouldAllow) {
        passed++;
      } else {
        failed++;
        console.log(`    ⚠ Scenario failed: "${scenario.command}" (expected: ${scenario.shouldAllow}, got: ${result.allowed})`);
      }
    }

    assert.strictEqual(failed, 0, `All ${commandScenarios.length} scenarios should pass (${passed} passed, ${failed} failed)`);
  }
};

// Run all test suites
console.log('\n=== Command Validation Unit Tests ===\n');

const results = [
  runTestSuite('extractCommandsFromBash()', extractionTests),
  runTestSuite('validateBashCommand()', validationTests),
  runTestSuite('isAllowedCoordinationCommand()', coordinationTests),
  runTestSuite('isModifyingBashCommand()', modificationTests),
  runTestSuite('Test Scenario Validation', scenarioTests)
];

const allPassed = results.every(r => r === true);

if (allPassed) {
  console.log('\n✓ All command validation tests passed');
  console.log('✓ STORY-009 completed: Full test infrastructure with unit tests for all hook utilities');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed');
  process.exit(1);
}
