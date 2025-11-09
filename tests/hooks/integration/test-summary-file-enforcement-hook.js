#!/usr/bin/env node

/**
 * Integration Tests for Summary File Enforcement Hook
 *
 * Tests the ACTUAL hook file execution, not just library functions.
 * Simulates real hook input and tests full execution path.
 */

const assert = require('assert');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const HOOK_PATH = path.join(__dirname, '../../../src/hooks/summary-file-enforcement.js');
const PROJECT_ROOT = path.join(__dirname, '../../..');

let testsPassed = 0;
let testsFailed = 0;

console.log('🧪 Summary File Enforcement Hook Integration Tests\n');
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

async function testStoryFileWrite() {
  const mockInput = {
    tool: 'Write',
    tool_input: {
      file_path: 'stories/STORY-003-configuration-externalization-2025-11-09.md',
      content: 'Story content here'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-story'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'STORY file write to stories/ should be ALLOWED (continue: true)'
  );
}

async function testBugFileWrite() {
  const mockInput = {
    tool: 'Write',
    tool_input: {
      file_path: 'bugs/BUG-002-fix-summary-enforcement-2025-11-09.md',
      content: 'Bug description'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-bug'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'BUG file write to bugs/ should be ALLOWED (continue: true)'
  );
}

async function testSummaryFileToRoot() {
  const mockInput = {
    tool: 'Write',
    tool_input: {
      file_path: 'deployment-summary.md',
      content: 'Deployment summary content'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-summary'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 2, 'Hook should exit with code 2 for blocked operation');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.hookSpecificOutput?.permissionDecision,
    'deny',
    'Summary file write to root should be BLOCKED'
  );
  assert(
    response.hookSpecificOutput?.permissionDecisionReason.includes('summaries/'),
    'Block message should suggest summaries/ directory'
  );
}

async function testGenericFileInDocs() {
  const mockInput = {
    tool: 'Write',
    tool_input: {
      file_path: 'docs/configuration-guide.md',
      content: 'Configuration documentation'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-docs'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Generic file in docs/ should be ALLOWED (continue: true)'
  );
}

async function testReadOperationNotBlocked() {
  const mockInput = {
    tool: 'Read',
    tool_input: {
      file_path: 'deployment-summary.md'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-read'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Read operations should NEVER be blocked (continue: true)'
  );
}

async function testHookDoesNotCrash() {
  const mockInput = {
    tool: 'Write',
    tool_input: {
      file_path: 'test-file.md',
      content: 'Test content'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-basic'
  };

  const result = await executeHook(mockInput);

  assert.strictEqual(
    result.code === 0 || result.code === 2,
    true,
    'Hook should not crash (exit code 0 or 2)'
  );
  assert.strictEqual(
    result.stderr.includes('SyntaxError'),
    false,
    'Hook should not have syntax errors'
  );
}

async function testAllCapsBlocking() {
  const mockInput = {
    tool: 'Write',
    tool_input: {
      file_path: 'DEPLOYMENT.md',
      content: 'Deployment content'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-allcaps'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 2, 'Hook should exit with code 2 for blocked operation');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.hookSpecificOutput?.permissionDecision,
    'deny',
    'ALL-CAPITALS filename should be BLOCKED'
  );
  assert(
    response.hookSpecificOutput?.permissionDecisionReason.includes('ALL-CAPITALS'),
    'Block message should mention ALL-CAPITALS'
  );
}

async function testSummaryInSummariesDir() {
  const mockInput = {
    tool: 'Write',
    tool_input: {
      file_path: 'summaries/deployment-summary.md',
      content: 'Deployment summary'
    },
    cwd: PROJECT_ROOT,
    session_id: 'test-session-summaries'
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert.strictEqual(
    response.continue,
    true,
    'Summary file in summaries/ should be ALLOWED (continue: true)'
  );
}

// Run all tests
async function runAllTests() {
  console.log('Running integration tests...\n');

  await runTest('STORY file write to stories/ → ALLOW', testStoryFileWrite);
  await runTest('BUG file write to bugs/ → ALLOW', testBugFileWrite);
  await runTest('Summary file to root → BLOCK with suggestion', testSummaryFileToRoot);
  await runTest('Generic file in docs/ → ALLOW', testGenericFileInDocs);
  await runTest('Read operation → NEVER BLOCK', testReadOperationNotBlocked);
  await runTest('Hook does not crash → NO SYNTAX ERRORS', testHookDoesNotCrash);
  await runTest('ALL-CAPITALS filename → BLOCK', testAllCapsBlocking);
  await runTest('Summary in summaries/ → ALLOW', testSummaryInSummariesDir);

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
