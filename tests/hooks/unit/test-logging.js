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
  }
};

console.log('\n=== Logging Utils Unit Tests ===');
const allPassed = runTestSuite('logging.js', tests);
process.exit(allPassed ? 0 : 1);
