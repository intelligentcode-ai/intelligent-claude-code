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
  },

  // BUG-002 Regression Tests: STORY files with problematic keywords
  'isSummaryFile: excludes STORY files with "configuration" keyword': () => {
    const filePath = 'stories/STORY-003-configuration-externalization-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'STORY files should never be summaries');
  },

  'isSummaryFile: excludes STORY files with "status" keyword': () => {
    const filePath = 'stories/STORY-001-status-update-feature-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'STORY files should never be summaries');
  },

  'isSummaryFile: excludes STORY files with "progress" keyword': () => {
    const filePath = 'stories/STORY-002-progress-tracking-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'STORY files should never be summaries');
  },

  // BUG-002 Regression Tests: BUG files with problematic keywords
  'isSummaryFile: excludes BUG files with "update" keyword': () => {
    const filePath = 'bugs/BUG-001-update-hook-permissions-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'BUG files should never be summaries');
  },

  'isSummaryFile: excludes BUG files with "fix" keyword': () => {
    const filePath = 'bugs/BUG-002-fix-configuration-bug-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'BUG files should never be summaries');
  },

  // BUG-002 Regression Tests: EPIC files
  'isSummaryFile: excludes EPIC files': () => {
    const filePath = 'stories/EPIC-001-platform-modernization-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'EPIC files should never be summaries');
  },

  // BUG-002 Regression Tests: Files in allowed directories
  'isSummaryFile: excludes docs/ files with "configuration" keyword': () => {
    const filePath = 'docs/configuration-guide.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'docs/ files should be excluded even with summary keywords');
  },

  'isSummaryFile: excludes src/ files with "update" keyword': () => {
    const filePath = 'src/update-handler.js';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'src/ files should be excluded');
  },

  // BUG-002 Regression Tests: Absolute path scenarios
  'isSummaryFile: excludes STORY files with absolute paths': () => {
    const filePath = '/project/stories/STORY-003-configuration-externalization-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'STORY files with absolute paths should be excluded');
  },

  'isSummaryFile: excludes BUG files with absolute paths': () => {
    const filePath = '/project/bugs/BUG-002-fix-configuration-bug-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'BUG files with absolute paths should be excluded');
  },

  // BUG-002 Regression Tests: Edge cases
  'isSummaryFile: excludes nested stories/ files': () => {
    const filePath = 'stories/drafts/STORY-004-summary-page-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'Nested stories/ files should be excluded');
  },

  'isSummaryFile: excludes nested bugs/ files': () => {
    const filePath = 'bugs/open/BUG-003-status-report-fix-2025-11-09.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false, 'Nested bugs/ files should be excluded');
  }
};

console.log('\n=== Summary Validation Unit Tests ===');
const allPassed = runTestSuite('summary-validation.js', tests);
process.exit(allPassed ? 0 : 1);
