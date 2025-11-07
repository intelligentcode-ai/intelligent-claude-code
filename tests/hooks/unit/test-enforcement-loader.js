#!/usr/bin/env node
/**
 * Unit Tests for enforcement-loader.js
 * Tests enforcement rule loading (DEPRECATED - uses config-loader)
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  loadEnforcement,
  getEnforcementSetting,
  clearEnforcementCache
} = require('../../../src/hooks/lib/enforcement-loader.js');

const tests = {
  'loadEnforcement: returns enforcement object': () => {
    clearEnforcementCache();
    const result = loadEnforcement(process.cwd());

    assert.ok(result, 'Should return object');
    assert.ok(typeof result === 'object', 'Should be object');
  },

  'loadEnforcement: includes tool_blacklist': () => {
    clearEnforcementCache();
    const result = loadEnforcement(process.cwd());

    assert.ok(result.tool_blacklist, 'Should include tool_blacklist');
  },

  'loadEnforcement: includes infrastructure_protection': () => {
    clearEnforcementCache();
    const result = loadEnforcement(process.cwd());

    assert.ok(result.infrastructure_protection, 'Should include infrastructure_protection');
  },

  'getEnforcementSetting: retrieves top-level setting': () => {
    clearEnforcementCache();
    const result = getEnforcementSetting(process.cwd(), 'tool_blacklist');

    assert.ok(result, 'Should retrieve setting');
  },

  'getEnforcementSetting: retrieves nested setting': () => {
    clearEnforcementCache();
    const result = getEnforcementSetting(process.cwd(), 'tool_blacklist.universal', []);

    assert.ok(Array.isArray(result), 'Should retrieve array setting');
  },

  'getEnforcementSetting: returns default for missing key': () => {
    clearEnforcementCache();
    const result = getEnforcementSetting(process.cwd(), 'nonexistent.key', 'default');

    assert.strictEqual(result, 'default');
  },

  'clearEnforcementCache: clears cache successfully': () => {
    loadEnforcement(process.cwd());
    clearEnforcementCache();

    // Should reload without error
    const result = loadEnforcement(process.cwd());
    assert.ok(result, 'Should reload after cache clear');
  },

  'loadEnforcement: uses fallback on missing file': () => {
    clearEnforcementCache();
    const result = loadEnforcement('/nonexistent/path');

    assert.ok(result.tool_blacklist, 'Should return fallback with tool_blacklist');
  },

  'fallback: includes all required sections': () => {
    clearEnforcementCache();
    const result = loadEnforcement('/nonexistent/path');

    assert.ok(result.tool_blacklist, 'Should have tool_blacklist');
    assert.ok(result.infrastructure_protection, 'Should have infrastructure_protection');
    assert.ok(Array.isArray(result.allowed_allcaps_files), 'Should have allowed_allcaps_files');
  },

  'loadEnforcement: logs deprecation warning': () => {
    clearEnforcementCache();
    // This test just ensures the function runs without errors
    const result = loadEnforcement(process.cwd());
    assert.ok(result, 'Should complete despite deprecation');
  }
};

console.log('\n=== Enforcement Loader Unit Tests (DEPRECATED) ===');
const allPassed = runTestSuite('enforcement-loader.js', tests);
process.exit(allPassed ? 0 : 1);
