#!/usr/bin/env node
/**
 * Unit Tests for tool-blacklist.js
 * Tests tool blacklist checking
 *
 * SPECIFICATION: Tool blacklist loaded from .icc/config.json
 * Configuration path: enforcement.tool_blacklist
 * Supports: universal, main_scope_only, agents_only lists
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  checkToolBlacklist,
  isToolBlocked
} = require('../../../src/hooks/lib/tool-blacklist.js');

const tests = {
  'checkToolBlacklist: Write blocked in main_scope by default config': () => {
    // NOTE: Test uses real config which has Write in main_scope_only blacklist
    const result = checkToolBlacklist('Write', {}, 'main_scope');
    assert.strictEqual(result.blocked, true);
    assert.strictEqual(result.list, 'main_scope_only');
  },

  'isToolBlocked: exact tool name match': () => {
    const result = isToolBlocked('Write', {}, ['Write', 'Edit']);
    assert.strictEqual(result, true);
  },

  'isToolBlocked: no match returns false': () => {
    const result = isToolBlocked('Read', {}, ['Write', 'Edit']);
    assert.strictEqual(result, false);
  },

  'isToolBlocked: Bash command pattern matching': () => {
    const result = isToolBlocked('Bash', { command: 'rm -rf /' }, ['rm -rf']);
    assert.strictEqual(result, true);
  },

  'isToolBlocked: Bash command no match': () => {
    const result = isToolBlocked('Bash', { command: 'ls -la' }, ['rm -rf']);
    assert.strictEqual(result, false);
  },

  'isToolBlocked: handles null tool': () => {
    const result = isToolBlocked(null, {}, ['Write']);
    assert.strictEqual(result, false);
  },

  'isToolBlocked: handles non-array blacklist': () => {
    const result = isToolBlocked('Write', {}, null);
    assert.strictEqual(result, false);
  },

  'isToolBlocked: handles empty blacklist': () => {
    const result = isToolBlocked('Write', {}, []);
    assert.strictEqual(result, false);
  },

  'isToolBlocked: case-sensitive matching': () => {
    const result = isToolBlocked('write', {}, ['Write']);
    assert.strictEqual(result, false);
  },

  'isToolBlocked: partial command matching': () => {
    const result = isToolBlocked('Bash', { command: 'sudo rm -rf /' }, ['rm -rf']);
    assert.strictEqual(result, true);
  }
};

console.log('\n=== Tool Blacklist Unit Tests ===');
const allPassed = runTestSuite('tool-blacklist.js', tests);
process.exit(allPassed ? 0 : 1);
