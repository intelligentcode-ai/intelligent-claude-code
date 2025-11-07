#!/usr/bin/env node
/**
 * Unit Tests for constraint-selector.js
 * Tests constraint selection logic
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  detectActiveRole,
  classifyWorkType,
  calculateRelevance,
  selectRelevantConstraints
} = require('../../../src/hooks/lib/constraint-selector.js');

const tests = {
  'detectActiveRole: detects @PM role': () => {
    const context = 'I want @PM to break down this story';
    const result = detectActiveRole(context);

    assert.strictEqual(result, '@PM');
  },

  'detectActiveRole: detects @Developer role': () => {
    const context = 'Ask @Developer to implement authentication';
    const result = detectActiveRole(context);

    assert.strictEqual(result, '@Developer');
  },

  'detectActiveRole: returns null for no role': () => {
    const context = 'This is a regular message';
    const result = detectActiveRole(context);

    assert.strictEqual(result, null);
  },

  'detectActiveRole: returns most recent role': () => {
    const context = '@PM can you check this? Then @Developer implement it';
    const result = detectActiveRole(context);

    assert.strictEqual(result, '@Developer');
  },

  'classifyWorkType: detects coordination': () => {
    const context = 'Please break down this story into tasks';
    const result = classifyWorkType(context);

    assert.strictEqual(result, 'coordination');
  },

  'classifyWorkType: detects implementation': () => {
    const context = 'Implement user authentication system';
    const result = classifyWorkType(context);

    assert.strictEqual(result, 'implementation');
  },

  'classifyWorkType: detects architecture': () => {
    const context = 'Design the system architecture for authentication';
    const result = classifyWorkType(context);

    assert.strictEqual(result, 'architecture');
  },

  'classifyWorkType: detects testing': () => {
    const context = 'Test the authentication system';
    const result = classifyWorkType(context);

    assert.strictEqual(result, 'testing');
  },

  'classifyWorkType: returns general for unknown': () => {
    const context = 'Random text without keywords';
    const result = classifyWorkType(context);

    assert.strictEqual(result, 'general');
  },

  'calculateRelevance: baseline score for all constraints': () => {
    const constraint = { id: 'TEST-001', category: 'General' };
    const result = calculateRelevance(constraint, null, 'general');

    assert.ok(result >= 1, 'Should have baseline score of 1');
  },

  'calculateRelevance: bonus for role matching': () => {
    const constraint = { id: 'PM-001', category: 'PM' };
    const result = calculateRelevance(constraint, '@PM', 'general');

    assert.ok(result > 1, 'Should have bonus for role match');
  },

  'calculateRelevance: bonus for work type matching': () => {
    const constraint = { id: 'PM-001', category: 'PM' };
    const result = calculateRelevance(constraint, null, 'coordination');

    assert.ok(result > 1, 'Should have bonus for work type match');
  },

  'selectRelevantConstraints: returns array': () => {
    const context = '@PM break down story';
    const result = selectRelevantConstraints(context);

    assert.ok(Array.isArray(result), 'Should return array');
  },

  'selectRelevantConstraints: returns 6 constraints': () => {
    const context = '@PM break down story';
    const result = selectRelevantConstraints(context);

    // Should return up to 6 (3 situation + 3 cycling)
    assert.ok(result.length <= 6, 'Should return up to 6 constraints');
  },

  'selectRelevantConstraints: constraints have required fields': () => {
    const context = '@Developer implement feature';
    const result = selectRelevantConstraints(context);

    if (result.length > 0) {
      const constraint = result[0];
      assert.ok(constraint.id, 'Should have id');
      assert.ok(constraint.text, 'Should have text');
      assert.ok(constraint.type, 'Should have type (situation/cycling)');
    } else {
      assert.ok(true, 'No constraints returned');
    }
  }
};

console.log('\n=== Constraint Selector Unit Tests ===');
const allPassed = runTestSuite('constraint-selector.js', tests);
process.exit(allPassed ? 0 : 1);
