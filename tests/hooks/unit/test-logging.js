#!/usr/bin/env node
/**
 * Unit Tests for logging.js
 * Tests logging utilities
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  getLogDir,
  ensureLogDir,
  createLogger,
  initializeHook
} = require('../../../src/hooks/lib/logging.js');

const originalHookInputEnv = process.env.HOOK_INPUT;
const originalClaudeToolInputEnv = process.env.CLAUDE_TOOL_INPUT;

const tests = {
  'getLogDir: returns log directory path': () => {
    const result = getLogDir();

    assert.ok(result, 'Should return path');
    assert.ok(result.includes('.claude'), 'Should include .claude');
    assert.ok(result.includes('logs'), 'Should include logs');
  },

  'getLogDir: returns absolute path': () => {
    const result = getLogDir();

    assert.ok(path.isAbsolute(result), 'Should be absolute path');
  },

  'ensureLogDir: creates directory if missing': () => {
    ensureLogDir();
    const logDir = getLogDir();

    assert.ok(fs.existsSync(logDir), 'Log directory should exist');
  },

  'createLogger: returns function': () => {
    const logger = createLogger('test-hook');

    assert.ok(typeof logger === 'function', 'Should return function');
  },

  'createLogger: logger function accepts messages': () => {
    const logger = createLogger('test-hook');

    // Should not throw
    logger('Test message');
    assert.ok(true, 'Logger should accept messages');
  },

  'createLogger: includes hook name in filename': () => {
    const hookName = 'test-hook-unique-' + Date.now();
    const logger = createLogger(hookName);

    // Write a log entry to ensure file is created
    logger('Test message');

    const logDir = getLogDir();
    const files = fs.readdirSync(logDir);
    const hasHookLog = files.some(f => f.includes(hookName));

    assert.ok(hasHookLog, 'Should create log file with hook name');
  },

  'createLogger: includes date in filename': () => {
    const logger = createLogger('test-hook');
    const today = new Date().toISOString().split('T')[0];

    const logDir = getLogDir();
    const files = fs.readdirSync(logDir);
    const hasDateLog = files.some(f => f.includes(today));

    assert.ok(hasDateLog, 'Should include date in filename');
  },

  'initializeHook: returns object with log and hookInput': () => {
    const result = initializeHook('test-hook');

    assert.ok(result, 'Should return object');
    assert.ok(typeof result.log === 'function', 'Should have log function');
  },

  'initializeHook: handles missing input gracefully': () => {
    const result = initializeHook('test-hook');

    // Should not throw even without input
    assert.ok(result.log, 'Should have logger');
  },

  'initializeHook: hookInput can be undefined': () => {
    const result = initializeHook('test-hook');

    // hookInput should be undefined when no input provided
    assert.ok(result.hookInput === undefined || result.hookInput === null, 'hookInput can be undefined');
  },

  'initializeHook: reads CLAUDE_TOOL_INPUT env when HOOK_INPUT missing': () => {
    delete process.env.HOOK_INPUT;
    process.env.CLAUDE_TOOL_INPUT = JSON.stringify({ source: 'claude_tool', counter: 7 });

    const result = initializeHook('test-hook');

    assert.ok(result.hookInput, 'hookInput should be parsed');
    assert.strictEqual(result.hookInput.source, 'claude_tool');
    assert.strictEqual(result.hookInput.counter, 7);

    delete process.env.CLAUDE_TOOL_INPUT;
  },

  'initializeHook: deletes oldest transcripts when project exceeds quota': () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'logging-test-'));
    const oldPath = path.join(tmpDir, 'old.jsonl');
    const olderPath = path.join(tmpDir, 'older.jsonl');
    const activePath = path.join(tmpDir, 'active.jsonl');

    fs.writeFileSync(olderPath, Buffer.alloc(4096, 'x'));
    fs.utimesSync(olderPath, new Date(0), new Date(0));
    fs.writeFileSync(oldPath, Buffer.alloc(4096, 'y'));
    fs.utimesSync(oldPath, new Date(1000), new Date(1000));
    fs.writeFileSync(activePath, Buffer.alloc(1024, 'z'));

    const previousHookInput = process.env.HOOK_INPUT;
    process.env.HOOK_INPUT = JSON.stringify({ transcript_path: activePath });
    process.env.CLAUDE_PROJECT_TRANSCRIPTS_MAX_BYTES = '6000';

    initializeHook('test-hook');

    const archivedFiles = fs.readdirSync(tmpDir).filter(file => file.startsWith('older.jsonl.archived-'));
    assert.ok(archivedFiles.length === 1, 'Oldest transcript should be archived');
    assert.ok(fs.existsSync(activePath), 'Active transcript should remain');

    if (previousHookInput === undefined) {
      delete process.env.HOOK_INPUT;
    } else {
      process.env.HOOK_INPUT = previousHookInput;
    }
    delete process.env.CLAUDE_PROJECT_TRANSCRIPTS_MAX_BYTES;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  },

  'initializeHook: trims active transcript when quota still exceeded': () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'logging-test-'));
    const activePath = path.join(tmpDir, 'active.jsonl');
    const otherPath = path.join(tmpDir, 'other.jsonl');

    fs.writeFileSync(otherPath, Buffer.alloc(2048, 'x'));
    fs.writeFileSync(activePath, Buffer.alloc(6144, 'y'));

    const previousHookInput = process.env.HOOK_INPUT;
    process.env.HOOK_INPUT = JSON.stringify({ transcript_path: activePath });
    process.env.CLAUDE_PROJECT_TRANSCRIPTS_MAX_BYTES = '4000';

    initializeHook('test-hook');

    const stats = fs.statSync(activePath);
    assert.ok(stats.size < 5000, 'Active transcript should be trimmed when still over budget');

    if (previousHookInput === undefined) {
      delete process.env.HOOK_INPUT;
    } else {
      process.env.HOOK_INPUT = previousHookInput;
    }
    delete process.env.CLAUDE_PROJECT_TRANSCRIPTS_MAX_BYTES;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  },

  'initializeHook: trims active transcript when single file exceeds cap even if total ok': () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'logging-test-'));
    const activePath = path.join(tmpDir, 'active.jsonl');
    fs.writeFileSync(activePath, Buffer.alloc(6 * 1024 * 1024, 'z')); // 6MB

    const previousHookInput = process.env.HOOK_INPUT;
    process.env.HOOK_INPUT = JSON.stringify({ transcript_path: activePath });
    process.env.CLAUDE_SINGLE_TRANSCRIPT_MAX_BYTES = '4194304'; // 4MB
    process.env.CLAUDE_SINGLE_TRANSCRIPT_RETAIN_BYTES = '2097152'; // 2MB

    initializeHook('test-hook');

    const stats = fs.statSync(activePath);
    assert.ok(stats.size <= 4 * 1024 * 1024, 'Active transcript should be trimmed below single-file cap');

    if (previousHookInput === undefined) {
      delete process.env.HOOK_INPUT;
    } else {
      process.env.HOOK_INPUT = previousHookInput;
    }
    delete process.env.CLAUDE_SINGLE_TRANSCRIPT_MAX_BYTES;
    delete process.env.CLAUDE_SINGLE_TRANSCRIPT_RETAIN_BYTES;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  },

  'initializeHook: respects very small project quota when trimming': () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'logging-test-'));
    const activePath = path.join(tmpDir, 'active.jsonl');
    fs.writeFileSync(activePath, Buffer.alloc(32 * 1024, 'z')); // 32KB

    const previousHookInput = process.env.HOOK_INPUT;
    process.env.HOOK_INPUT = JSON.stringify({ transcript_path: activePath });
    process.env.CLAUDE_PROJECT_TRANSCRIPTS_MAX_BYTES = '8192'; // 8KB budget

    initializeHook('test-hook');

    const stats = fs.statSync(activePath);
    assert.ok(stats.size <= 8192, 'Transcript should not exceed configured small project quota');

    if (previousHookInput === undefined) {
      delete process.env.HOOK_INPUT;
    } else {
      process.env.HOOK_INPUT = previousHookInput;
    }
    delete process.env.CLAUDE_PROJECT_TRANSCRIPTS_MAX_BYTES;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
};

console.log('\n=== Logging Utils Unit Tests ===');
const allPassed = runTestSuite('logging.js', tests);

if (originalHookInputEnv === undefined) {
  delete process.env.HOOK_INPUT;
} else {
  process.env.HOOK_INPUT = originalHookInputEnv;
}

if (originalClaudeToolInputEnv === undefined) {
  delete process.env.CLAUDE_TOOL_INPUT;
} else {
  process.env.CLAUDE_TOOL_INPUT = originalClaudeToolInputEnv;
}

process.exit(allPassed ? 0 : 1);
