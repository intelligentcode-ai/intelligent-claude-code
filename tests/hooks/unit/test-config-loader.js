#!/usr/bin/env node
/**
 * Unit Tests for config-loader.js
 * Tests configuration hierarchy loading
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  loadConfig,
  getSetting,
  clearCache
} = require('../../../src/hooks/lib/config-loader.js');

const tests = {
  'loadConfig: returns configuration object': () => {
    clearCache();
    const config = loadConfig();

    assert.ok(config, 'Should return config object');
    assert.ok(typeof config === 'object', 'Should be object');
  },

  'loadConfig: includes autonomy settings': () => {
    clearCache();
    const config = loadConfig();

    assert.ok(config.autonomy, 'Should include autonomy');
    assert.ok(config.autonomy.level, 'Should have autonomy level');
  },

  'loadConfig: includes git settings': () => {
    clearCache();
    const config = loadConfig();

    assert.ok(config.git, 'Should include git settings');
    assert.ok(typeof config.git.privacy === 'boolean', 'Should have git privacy');
  },

  'loadConfig: includes paths settings': () => {
    clearCache();
    const config = loadConfig();

    assert.ok(config.paths, 'Should include paths');
    assert.ok(config.paths.story_path, 'Should have story_path');
    assert.ok(config.paths.bug_path, 'Should have bug_path');
  },

  'loadConfig: includes enforcement settings': () => {
    clearCache();
    const config = loadConfig();

    assert.ok(config.enforcement, 'Should include enforcement');
    assert.ok(typeof config.enforcement.blocking_enabled === 'boolean', 'Should have blocking_enabled');
  },

  'getSetting: retrieves top-level setting': () => {
    clearCache();
    const result = getSetting('autonomy');

    assert.ok(result, 'Should retrieve autonomy setting');
    assert.ok(result.level, 'Should have nested level property');
  },

  'getSetting: retrieves nested setting with dot notation': () => {
    clearCache();
    const result = getSetting('autonomy.level');

    assert.ok(result, 'Should retrieve nested setting');
    assert.ok(typeof result === 'string', 'Should be string');
  },

  'getSetting: returns default for missing key': () => {
    clearCache();
    const result = getSetting('nonexistent.key', 'default_value');

    assert.strictEqual(result, 'default_value');
  },

  'getSetting: handles deeply nested keys': () => {
    clearCache();
    const result = getSetting('autonomy.l3_settings.max_parallel');

    assert.ok(result !== undefined, 'Should retrieve deeply nested value');
  },

  'clearCache: clears configuration cache': () => {
    loadConfig();
    clearCache();

    // No exception should be thrown
    const config = loadConfig();
    assert.ok(config, 'Should reload after cache clear');
  },

  'getSetting: git.privacy returns boolean': () => {
    clearCache();
    const result = getSetting('git.privacy', false);

    assert.ok(typeof result === 'boolean', 'Should be boolean');
  },

  'getSetting: paths.story_path returns string': () => {
    clearCache();
    const result = getSetting('paths.story_path', 'stories');

    assert.ok(typeof result === 'string', 'Should be string');
    assert.ok(result.length > 0, 'Should not be empty');
  }
};

console.log('\n=== Config Loader Unit Tests ===');
const allPassed = runTestSuite('config-loader.js', tests);
process.exit(allPassed ? 0 : 1);
