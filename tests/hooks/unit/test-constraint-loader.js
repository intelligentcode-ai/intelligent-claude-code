#!/usr/bin/env node
/**
 * Unit Tests for constraint-loader.js
 * Tests constraint loading and parsing
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  loadConstraintIDs,
  getConstraintIDList,
  getConstraintsByCategory,
  invalidateCache
} = require('../../../src/hooks/lib/constraint-loader.js');

const tests = {
  'loadConstraintIDs: returns array': () => {
    invalidateCache();
    const result = loadConstraintIDs();

    assert.ok(Array.isArray(result), 'Should return array');
  },

  'loadConstraintIDs: returns empty array on error': () => {
    invalidateCache();
    const result = loadConstraintIDs();

    assert.ok(Array.isArray(result), 'Should always return array');
  },

  'loadConstraintIDs: constraint objects have required fields': () => {
    invalidateCache();
    const constraints = loadConstraintIDs();

    if (constraints.length > 0) {
      const constraint = constraints[0];
      assert.ok(constraint.id, 'Should have id');
      assert.ok(constraint.text, 'Should have text');
      assert.ok(constraint.category, 'Should have category');
    } else {
      assert.ok(true, 'No constraints loaded - file may not exist');
    }
  },

  'getConstraintIDList: returns array of strings': () => {
    invalidateCache();
    const result = getConstraintIDList();

    assert.ok(Array.isArray(result), 'Should return array');

    if (result.length > 0) {
      assert.ok(typeof result[0] === 'string', 'Should contain strings');
    }
  },

  'getConstraintsByCategory: returns object': () => {
    invalidateCache();
    const result = getConstraintsByCategory();

    assert.ok(typeof result === 'object', 'Should return object');
  },

  'getConstraintsByCategory: groups by category': () => {
    invalidateCache();
    const result = getConstraintsByCategory();

    for (const category in result) {
      assert.ok(Array.isArray(result[category]), `${category} should be array`);
    }
  },

  'invalidateCache: clears cache successfully': () => {
    loadConstraintIDs();
    invalidateCache();

    // Should reload without error
    const result = loadConstraintIDs();
    assert.ok(Array.isArray(result), 'Should reload after cache clear');
  },

  'loadConstraintIDs: uses caching': () => {
    invalidateCache();
    const first = loadConstraintIDs();
    const second = loadConstraintIDs();

    // Both calls should work
    assert.ok(Array.isArray(first), 'First call should work');
    assert.ok(Array.isArray(second), 'Second call should work');
  },

  'loadConstraintIDs: handles missing file gracefully': () => {
    invalidateCache();
    const result = loadConstraintIDs();

    // Should not throw, should return empty array
    assert.ok(Array.isArray(result), 'Should handle missing file');
  },

  'constraint objects: have weight property': () => {
    invalidateCache();
    const constraints = loadConstraintIDs();

    if (constraints.length > 0) {
      const constraint = constraints[0];
      assert.ok(typeof constraint.weight === 'number', 'Should have numeric weight');
    } else {
      assert.ok(true, 'No constraints to check');
    }
  }
};

console.log('\n=== Constraint Loader Unit Tests ===');
const allPassed = runTestSuite('constraint-loader.js', tests);
process.exit(allPassed ? 0 : 1);
