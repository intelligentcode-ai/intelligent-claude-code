/**
 * Test Helper Functions
 * Utilities for running tests
 */

const assert = require('assert');

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`  ✓ ${testName}`);
    return true;
  } catch (error) {
    console.log(`  ✗ ${testName}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

function runTestSuite(suiteName, tests) {
  console.log(`\n${suiteName}`);
  let passed = 0;
  let failed = 0;

  for (const [name, testFn] of Object.entries(tests)) {
    if (runTest(name, testFn)) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log(`\n  ${passed} passed, ${failed} failed`);
  return failed === 0;
}

module.exports = {
  runTest,
  runTestSuite
};
