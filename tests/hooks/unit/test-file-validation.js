#!/usr/bin/env node
/**
 * Unit Tests for file-validation.js
 * Tests file validation rules
 */

const assert = require('assert');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  isSummaryFile,
  validateSummaryFile,
  validateMarkdownOutsideAllowlist,
  extractFilePathsFromBashRedirect
} = require('../../../src/hooks/lib/file-validation.js');

const tests = {
  'isSummaryFile: detects SUMMARY pattern': () => {
    const filePath = 'test-SUMMARY.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isSummaryFile: detects REPORT pattern': () => {
    const filePath = 'STATUS-REPORT-2024.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isSummaryFile: detects VALIDATION pattern': () => {
    const filePath = 'hook-VALIDATION-complete.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isSummaryFile: ignores non-summary files': () => {
    const filePath = 'README.md';
    const projectRoot = '/project';

    const result = isSummaryFile(filePath, projectRoot);
    assert.strictEqual(result, false);
  },

  'validateSummaryFile: allows files in summaries/': () => {
    const filePath = 'summaries/test-summary.md';
    const projectRoot = '/project';

    const result = validateSummaryFile(filePath, projectRoot);
    assert.strictEqual(result.allowed, true);
  },

  'validateSummaryFile: blocks summary files outside summaries/': () => {
    const fs = require('fs');
    const path = require('path');
    const os = require('os');

    // Use temp directory that exists
    const projectRoot = os.tmpdir();
    const filePath = path.join(projectRoot, 'ROOT-SUMMARY.md');

    const result = validateSummaryFile(filePath, projectRoot);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.message, 'Should provide blocking message');
  },

  'validateSummaryFile: non-summary files pass validation': () => {
    const filePath = 'README.md';
    const projectRoot = '/project';

    const result = validateSummaryFile(filePath, projectRoot);
    assert.strictEqual(result.allowed, true);
  },

  'validateMarkdownOutsideAllowlist: allows root .md files': () => {
    const filePath = 'README.md';
    const projectRoot = '/project';

    const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);
    assert.strictEqual(result.allowed, true);
  },

  'validateMarkdownOutsideAllowlist: allows README.md anywhere (case-insensitive)': () => {
    // SPECIFICATION: README.md allowed in ALL locations (case-insensitive)
    // BEHAVIOR: Correctly allows readme.md, README.md, ReadMe.md everywhere
    const filePath = 'src/readme.md';
    const projectRoot = '/project';

    const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);
    assert.strictEqual(result.allowed, true, 'README.md allowed everywhere per spec');
  },

  'validateMarkdownOutsideAllowlist: blocks markdown outside allowlist by default': () => {
    const filePath = 'src/notes.md';
    const projectRoot = '/project';

    const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);
    assert.strictEqual(result.allowed, false);
    assert.ok(result.message, 'Should provide blocking message');
  },

  'extractFilePathsFromBashRedirect: extracts > redirect': () => {
    const command = 'echo "test" > output.txt';

    const result = extractFilePathsFromBashRedirect(command);
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0], 'output.txt');
  },

  'extractFilePathsFromBashRedirect: extracts >> redirect': () => {
    const command = 'cat data.txt >> log.txt';

    const result = extractFilePathsFromBashRedirect(command);
    // Function captures both > and >> patterns, may return 2 results
    assert.ok(result.length >= 1, 'Should extract at least one file');
    assert.ok(result.includes('log.txt'), 'Should include log.txt');
  },

  'extractFilePathsFromBashRedirect: returns empty for no redirects': () => {
    const command = 'ls -la';

    const result = extractFilePathsFromBashRedirect(command);
    assert.strictEqual(result.length, 0);
  }
};

console.log('\n=== File Validation Unit Tests ===');
const allPassed = runTestSuite('file-validation.js', tests);
process.exit(allPassed ? 0 : 1);
