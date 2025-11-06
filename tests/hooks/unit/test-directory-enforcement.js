#!/usr/bin/env node
/**
 * Unit Tests for directory-enforcement.js
 * Tests directory routing rules
 */

const assert = require('assert');
const path = require('path');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  getCorrectDirectory,
  isCorrectDirectory,
  getSuggestedPath
} = require('../../../src/hooks/lib/directory-enforcement.js');

const tests = {
  'getCorrectDirectory: STORY files go to stories/': () => {
    const filename = 'STORY-001-authentication.md';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, path.join(projectRoot, 'stories'));
  },

  'getCorrectDirectory: EPIC files go to stories/': () => {
    const filename = 'EPIC-001-user-management.md';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, path.join(projectRoot, 'stories'));
  },

  'getCorrectDirectory: BUG files go to bugs/ (SPECIFICATION)': () => {
    const filename = 'BUG-001-login-fix.md';
    const projectRoot = '/project';

    // SPECIFICATION: BUG files go to bugs/ directory
    // CURRENT BUG: Code routes to stories/ instead
    // TEST STATUS: Will fail until bug fixed
    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, path.join(projectRoot, 'bugs'), 'BUG files SHOULD go to bugs/ per spec');
  },

  'getCorrectDirectory: AGENTTASK files go to agenttasks/': () => {
    const filename = 'AGENTTASK-001-implement-auth.yaml';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, path.join(projectRoot, 'agenttasks'));
  },

  'getCorrectDirectory: CLAUDE.md goes to root': () => {
    const filename = 'CLAUDE.md';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, projectRoot);
  },

  'getCorrectDirectory: VERSION goes to root': () => {
    const filename = 'VERSION';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, projectRoot);
  },

  'getCorrectDirectory: README.md goes to root (SPECIFICATION CORRECT)': () => {
    // SPECIFICATION: README.md allowed in project root (and all locations)
    // BEHAVIOR: Correctly routes to root, also allowed elsewhere
    const filename = 'README.md';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, projectRoot, 'README.md routes to root per spec');
  },

  'getCorrectDirectory: architecture.md goes to docs/': () => {
    const filename = 'architecture.md';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, path.join(projectRoot, 'docs'));
  },

  'getCorrectDirectory: api.md goes to docs/': () => {
    const filename = 'api.md';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, path.join(projectRoot, 'docs'));
  },

  'getCorrectDirectory: other files go to summaries/': () => {
    const filename = 'random-file.md';
    const projectRoot = '/project';

    const result = getCorrectDirectory(filename, projectRoot);
    assert.strictEqual(result, path.join(projectRoot, 'summaries'));
  },

  'isCorrectDirectory: returns true for correct placement': () => {
    // Use absolute paths as the function expects
    const projectRoot = '/project';
    const filePath = path.join(projectRoot, 'stories', 'STORY-001-test-story.md');

    const result = isCorrectDirectory(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isCorrectDirectory: returns false for incorrect placement': () => {
    const projectRoot = '/project';
    const filePath = path.join(projectRoot, 'STORY-001-test-story.md');

    const result = isCorrectDirectory(filePath, projectRoot);
    assert.strictEqual(result, false);
  },

  'isCorrectDirectory: allows subdirectories of correct directory': () => {
    const projectRoot = '/project';
    const filePath = path.join(projectRoot, 'stories', 'drafts', 'STORY-001-test-story.md');

    const result = isCorrectDirectory(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'isCorrectDirectory: exempts non-markdown files': () => {
    const filePath = '/project/test.txt';
    const projectRoot = '/project';

    const result = isCorrectDirectory(filePath, projectRoot);
    assert.strictEqual(result, true);
  },

  'getSuggestedPath: suggests correct path': () => {
    const projectRoot = '/project';
    const filePath = path.join(projectRoot, 'STORY-001-test-story.md');

    const result = getSuggestedPath(filePath, projectRoot);
    const expected = path.join(projectRoot, 'stories', 'STORY-001-test-story.md');
    assert.strictEqual(result, expected);
  }
};

console.log('\n=== Directory Enforcement Unit Tests ===');
const allPassed = runTestSuite('directory-enforcement.js', tests);
process.exit(allPassed ? 0 : 1);
