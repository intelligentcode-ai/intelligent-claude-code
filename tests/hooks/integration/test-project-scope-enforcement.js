#!/usr/bin/env node

/**
 * Integration Tests for Project Scope Enforcement Hook
 *
 * Tests the ACTUAL hook file execution with stdin input.
 * Verifies hook receives and processes PreToolUse input correctly.
 */

const assert = require('assert');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const HOOK_PATH = path.join(__dirname, '../../../src/hooks/project-scope-enforcement.js');
const PROJECT_ROOT = path.join(__dirname, '../../..');

let testsPassed = 0;
let testsFailed = 0;

console.log('🧪 Project Scope Enforcement Hook Integration Tests\n');
console.log(`Testing hook: ${HOOK_PATH}\n`);

/**
 * Execute hook with mock PreToolUse input and capture output
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

    // Send mock PreToolUse input via stdin
    const payload = mockInput === undefined ? '' : JSON.stringify(mockInput);
    hookProcess.stdin.write(payload);
    hookProcess.stdin.end();
  });
}

/**
 * Parse hook response from stdout
 */
function parseHookResponse(stdout) {
  try {
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

async function testHookReceivesStdinInput() {
  const mockInput = {
    tool_name: 'Write',
    tool_input: {
      file_path: `${PROJECT_ROOT}/test-file.txt`,
      content: 'test'
    },
    session_id: 'test-session-001',
    cwd: PROJECT_ROOT
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should exit with code 0');
  assert(response, 'Hook should return valid JSON response');
  assert(response.continue !== undefined, 'Response should have continue field');
}

async function testHookAllowsProjectFiles() {
  const mockInput = {
    tool_name: 'Write',
    tool_input: {
      file_path: `${PROJECT_ROOT}/src/test.js`
    },
    session_id: 'test-session-002',
    cwd: PROJECT_ROOT
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should allow project files');
  assert.strictEqual(response.continue, true, 'Should allow operation in project');
}

async function testHookBlocksInstallationPath() {
  const mockInput = {
    tool_name: 'Write',
    tool_input: {
      file_path: path.join(os.homedir(), '.claude', 'test.txt')
    },
    session_id: 'test-session-003',
    cwd: PROJECT_ROOT
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 2, 'Hook should block installation path (exit code 2)');
  assert.strictEqual(response.continue, false, 'Should block operation in ~/.claude/');
}

async function testHookAllowsCLAUDEmdException() {
  const mockInput = {
    tool_name: 'Write',
    tool_input: {
      file_path: path.join(os.homedir(), '.claude', 'CLAUDE.md')
    },
    session_id: 'test-session-004',
    cwd: PROJECT_ROOT
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should allow ~/.claude/CLAUDE.md');
  assert.strictEqual(response.continue, true, 'CLAUDE.md is allowed exception');
}

async function testHookBlocksOutsideProject() {
  const mockInput = {
    tool_name: 'Write',
    tool_input: {
      file_path: '/tmp/outside-project.txt'
    },
    session_id: 'test-session-005',
    cwd: PROJECT_ROOT
  };

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 2, 'Hook should block files outside project');
  assert.strictEqual(response.continue, false, 'Should block operation outside project');
}

async function testHookHandlesUndefinedInput() {
  const mockInput = undefined;

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should handle undefined input gracefully');
  assert.strictEqual(response.continue, true, 'Should allow when no input');
}

async function testHookHandlesEmptyInput() {
  const mockInput = {};

  const result = await executeHook(mockInput);
  const response = parseHookResponse(result.stdout);

  assert.strictEqual(result.code, 0, 'Hook should handle empty input gracefully');
  assert.strictEqual(response.continue, true, 'Should allow when empty input');
}

// Run all tests
async function runAllTests() {
  console.log('Running PreToolUse hook integration tests...\n');

  await runTest('Hook receives and parses stdin input', testHookReceivesStdinInput);
  await runTest('Hook allows files within project', testHookAllowsProjectFiles);
  await runTest('Hook blocks ~/.claude/ installation path', testHookBlocksInstallationPath);
  await runTest('Hook allows ~/.claude/CLAUDE.md exception', testHookAllowsCLAUDEmdException);
  await runTest('Hook blocks files outside project', testHookBlocksOutsideProject);
  await runTest('Hook handles undefined input gracefully', testHookHandlesUndefinedInput);
  await runTest('Hook handles empty input gracefully', testHookHandlesEmptyInput);

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
