#!/usr/bin/env node
/**
 * Unit Tests for summary-validation.js
 * Tests summary validation rules
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  isSummaryFile,
  validateSummaryFilePlacement
} = require('../../../src/hooks/lib/summary-validation.js');

const tests = {
  'isSummaryFile: detects summary pattern': () => {
    const filePath = 'test-summary.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isSummaryFile: detects report pattern': () => {
    const filePath = 'status-report.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isSummaryFile: detects fix pattern': () => {
    const filePath = 'bug-fix-analysis.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isSummaryFile: detects analysis pattern': () => {
    const filePath = 'performance-analysis.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isSummaryFile: excludes stories/ files': () => {
    const filePath = 'stories/summary-story.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false);
  },

  'isSummaryFile: excludes bugs/ files': () => {
    const filePath = 'bugs/summary-bug.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false);
  },

  'isSummaryFile: excludes docs/ files': () => {
    const filePath = 'docs/summary-doc.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false);
  },

  'isSummaryFile: excludes root allowed files': () => {
    const filePath = 'README.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false);
  },

  'validateSummaryFilePlacement: allows files in summaries/': () => {
    const filePath = 'summaries/test-summary.md';
    const projectRoot = '/project';

    const result = validateSummaryFilePlacement(filePath, projectRoot);
    assert.strictEqual(result.allowed, true);
  },

  'validateSummaryFilePlacement: blocks summary files outside summaries/': () => {
    const os = require('os');
    const path = require('path');

    // Use temp directory that exists
    const projectRoot = os.tmpdir();
    const filePath = path.join(projectRoot, 'root-summary.md');

    const result = validateSummaryFilePlacement(filePath, projectRoot);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.message, 'Should provide message');
  },

  'validateSummaryFilePlacement: allows non-summary files': () => {
    const filePath = 'README.md';
    const projectRoot = '/project';

    const result = validateSummaryFilePlacement(filePath, projectRoot);
    assert.strictEqual(result.allowed, true);
  },

  'validateSummaryFilePlacement: suggests correct path': () => {
    const os = require('os');
    const path = require('path');

    // Use temp directory that exists
    const projectRoot = os.tmpdir();
    const filePath = path.join(projectRoot, 'root-summary.md');

    const result = validateSummaryFilePlacement(filePath, projectRoot);
    assert.ok(result.message.includes('summaries/'), 'Should suggest summaries/ directory');
  }
};

console.log('\n=== Summary Validation Unit Tests ===');
const allPassed = runTestSuite('summary-validation.js', tests);
process.exit(allPassed ? 0 : 1);
