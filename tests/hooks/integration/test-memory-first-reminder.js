#!/usr/bin/env node

/**
 * Integration Tests for Memory-First Reminder Hook
 *
 * Tests the ACTUAL hook file execution, not just library functions.
 * Simulates real hook input and tests full execution path.
 */

const assert = require('assert');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const HOOK_PATH = path.join(__dirname, '../../../src/hooks/memory-first-reminder.js');
const PROJECT_ROOT = path.join(__dirname, '../../..');

let testsPassed = 0;
let testsFailed = 0;

console.log('🧪 Memory-First Reminder Hook Integration Tests\n');
console.log(`Testing hook: ${HOOK_PATH}\n`);

/**
 * Execute hook with mock input and capture output
 */
function executeHook(mockInput) {
  return new Promise((resolve, reject) => {
    const hookProcess = spawn('node', [HOOK_PATH], {
      env: { ...process.env, NODE_ENV: 'test' }
    });

    let stdout = '';
    let stderr = '';

    hookProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    hookProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    hookProcess.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });

    hookProcess.on('error', (err) => {
      reject(err);
    });

    // Send mock input
    hookProcess.stdin.write(JSON.stringify(mockInput));
    hookProcess.stdin.end();
  });
}

/**
 * Parse hook response from stdout
 */
function parseHookResponse(stdout) {
  try {
    // Hook response is the last JSON object in stdout
    const lines = stdout.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    return JSON.parse(lastLine);
  } catch (err) {
    return null;
  }
}

/**
 * Test helper
 */
async function runTest(name, testFn) {
  try {
    await testFn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (err) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${err.message}`);
    testsFailed++;
  }
}

// Test Cases

async function testGitHubPATQuestion() {
  const mockInput = {
    user_prompt: 'Where is my GitHub PAT stored?',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-pat'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Hook should ALWAYS ALLOW (non-blocking reminder)'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('memory/git/'),
    'Reminder should mention memory/git/ for credential queries'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('MEMORY-FIRST'),
    'Reminder should include MEMORY-FIRST guidance'
  );
}

async function testConfigurationQuery() {
  const mockInput = {
    user_prompt: 'What is the configuration for hook settings?',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-config'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Hook should ALWAYS ALLOW (non-blocking)'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('memory/configuration/'),
    'Reminder should mention memory/configuration/ for config queries'
  );
}

async function testAgenttaskCreationWithoutMemory() {
  const mockInput = {
    user_prompt: 'Create an AgentTask to implement authentication',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-agenttask'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Hook should ALWAYS ALLOW (educational only)'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('memory/implementation/'),
    'Reminder should mention memory/implementation/ for AgentTask creation'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('Search memory BEFORE AgentTask'),
    'Reminder should emphasize memory search before AgentTask'
  );
}

async function testMemorySearchAcknowledgement() {
  const mockInput = {
    user_prompt: 'Search memory for Git PAT location',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-search'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Hook should ALWAYS ALLOW'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('EXCELLENT'),
    'Should acknowledge memory search is active'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('memory-first pattern'),
    'Should confirm following memory-first pattern'
  );
}

async function testWorkflowQuery() {
  const mockInput = {
    user_prompt: 'How do I deploy to production?',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-workflow'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Hook should ALWAYS ALLOW'
  );
  assert(
    response.hookSpecificOutput?.additionalContext.includes('memory/deployment/') ||
    response.hookSpecificOutput?.additionalContext.includes('memory/workflows/'),
    'Reminder should mention workflow/deployment memory topics'
  );
}

async function testRegularToolUseNoReminder() {
  const mockInput = {
    user_prompt: 'List files in the current directory',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-regular'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Hook should ALWAYS ALLOW'
  );
  // Regular operations should not trigger memory reminder
  assert(
    !response.hookSpecificOutput || response.suppressOutput,
    'Regular operations should not need memory guidance'
  );
}

async function testNonBlockingBehavior() {
  const mockInput = {
    user_prompt: 'Where is the configuration file?',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-nonblock'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook MUST exit with code 0 (not 2)');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Hook MUST set continue: true (non-blocking)'
  );
  assert(
    response.hookSpecificOutput?.permissionDecision !== 'deny',
    'Hook MUST NOT block operations (educational only)'
  );
}

async function testStatisticsTracking() {
  // Clean stats file before test
  const statsFile = path.join(os.homedir(), '.claude', 'stats', 'memory-usage.json');
  if (fs.existsSync(statsFile)) {
    fs.unlinkSync(statsFile);
  }

  const mockInput = {
    user_prompt: 'Where is my GitHub token?',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-stats'
  };

  await executeHook(mockInput);

  // Check stats file was created
  assert(
    fs.existsSync(statsFile),
    'Statistics file should be created'
  );

  const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));

  assert(
    stats.events && stats.events.length > 0,
    'Statistics should contain events'
  );
  assert(
    stats.summary,
    'Statistics should contain summary'
  );
  assert(
    stats.summary.opportunities_detected > 0,
    'Statistics should track memory opportunities'
  );
}

async function testHookDoesNotCrash() {
  const mockInput = {
    user_prompt: 'Test prompt',
    cwd: PROJECT_ROOT,
    session_id: 'test-session-crash'
  };

  const result = await executeHook(mockInput);

  assert.strictEqual(
    result.code,
    0,
    'Hook should not crash (exit code 0)'
  );
  assert.strictEqual(
    result.stderr.includes('SyntaxError'),
    false,
    'Hook should not have syntax errors'
  );
}

// Run all tests
async function runAllTests() {
  console.log('Running integration tests...\n');

  await runTest('GitHub PAT question → Memory reminder with git/ topic', testGitHubPATQuestion);
  await runTest('Configuration query → Memory reminder with configuration/ topic', testConfigurationQuery);
  await runTest('AgentTask creation without memory → Remind to search first', testAgenttaskCreationWithoutMemory);
  await runTest('Memory search detected → Acknowledge and encourage', testMemorySearchAcknowledgement);
  await runTest('Workflow query → Remind about workflow/deployment memory', testWorkflowQuery);
  await runTest('Regular tool use → No reminder needed', testRegularToolUseNoReminder);
  await runTest('Non-blocking behavior → ALWAYS ALLOW (code 0, continue: true)', testNonBlockingBehavior);
  await runTest('Statistics tracking → Track memory usage events', testStatisticsTracking);
  await runTest('Hook does not crash → NO SYNTAX ERRORS', testHookDoesNotCrash);

  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`📈 Total: ${testsPassed + testsFailed}`);

  if (testsFailed > 0) {
    process.exit(1);
  }
}

// Execute tests
runAllTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
