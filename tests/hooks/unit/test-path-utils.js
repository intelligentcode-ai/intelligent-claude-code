#!/usr/bin/env node
/**
 * Unit Tests for path-utils.js
 * Tests path validation and checking functions
 */

const assert = require('assert');
const path = require('path');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  getConfiguredPaths,
  isPathInAllowlist,
  isPathInBlocklist,
  findProjectRoot,
  isInstallationPath
} = require('../../../src/hooks/lib/path-utils.js');

const tests = {
  'getConfiguredPaths: returns allowlist and blocklist': () => {
    const projectRoot = '/test/project';
    const result = getConfiguredPaths(projectRoot);

    assert.ok(result.allowlist, 'Should return allowlist');
    assert.ok(result.blocklist, 'Should return blocklist');
    assert.ok(Array.isArray(result.allowlist), 'Allowlist should be array');
    assert.ok(Array.isArray(result.blocklist), 'Blocklist should be array');
  },

  'getConfiguredPaths: includes standard paths': () => {
    const projectRoot = '/test/project';
    const result = getConfiguredPaths(projectRoot);

    assert.ok(result.allowlist.includes('stories'), 'Should include stories');
    assert.ok(result.allowlist.includes('bugs'), 'Should include bugs');
    assert.ok(result.allowlist.includes('memory'), 'Should include memory');
    assert.ok(result.allowlist.includes('summaries'), 'Should include summaries');
  },

  'isPathInAllowlist: root .md files allowed': () => {
    const filePath = '/project/README.md';
    const allowlist = ['stories', 'bugs', 'docs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInAllowlist: root config files allowed': () => {
    const filePath = '/project/icc.config.json';
    const allowlist = ['stories', 'bugs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInAllowlist: VERSION file allowed': () => {
    const filePath = '/project/VERSION';
    const allowlist = ['stories', 'bugs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInAllowlist: files in allowlist directories allowed': () => {
    const filePath = '/project/stories/STORY-001-test.md';
    const allowlist = ['stories', 'bugs', 'docs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInAllowlist: files in documentation/ allowed when alias present': () => {
    const filePath = '/project/documentation/deployment-guide.md';
    const allowlist = ['stories', 'bugs', 'documentation'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInAllowlist: allows nested docs segment': () => {
    const filePath = '/project/xroad-charts-repo/docs/deployment-guide.md';
    const allowlist = ['docs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInAllowlist: files in docs/ allowed when docs in allowlist': () => {
    const filePath = '/project/docs/deployment-guide-central-server.md';
    const allowlist = ['stories', 'bugs', 'docs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInAllowlist: files outside allowlist blocked': () => {
    const filePath = '/project/src/code.js';
    const allowlist = ['stories', 'bugs', 'docs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, false);
  },

  'isPathInAllowlist: paths outside project blocked by default': () => {
    const filePath = '/other/project/file.md';
    const allowlist = ['stories', 'bugs'];
    const projectRoot = '/project';

    const result = isPathInAllowlist(filePath, allowlist, projectRoot);
    assert.strictEqual(result, false);
  },

  'isPathInBlocklist: blocked paths detected': () => {
    const filePath = '/project/src/code.js';
    const blocklist = ['src', 'lib', 'tests'];
    const projectRoot = '/project';

    const result = isPathInBlocklist(filePath, blocklist, projectRoot);
    assert.strictEqual(result, true);
  },

  'isPathInBlocklist: non-blocked paths allowed': () => {
    const filePath = '/project/stories/STORY-001.md';
    const blocklist = ['src', 'lib', 'tests'];
    const projectRoot = '/project';

    const result = isPathInBlocklist(filePath, blocklist, projectRoot);
    assert.strictEqual(result, false);
  },

  'findProjectRoot: finds .git directory': () => {
    // This test would require mock filesystem, simplified version
    const result = findProjectRoot(process.cwd());
    assert.ok(result, 'Should return a project root');
    assert.ok(path.isAbsolute(result), 'Should return absolute path');
  },

  'isInstallationPath: detects ~/.claude/ paths': () => {
    const os = require('os');
    const claudePath = path.join(os.homedir(), '.claude', 'test.txt');

    const result = isInstallationPath(claudePath);
    assert.strictEqual(result, true);
  },

  'isInstallationPath: rejects non-installation paths': () => {
    const result = isInstallationPath('/some/other/path/file.txt');
    assert.strictEqual(result, false);
  }
};

console.log('\n=== Path Utils Unit Tests ===');
const allPassed = runTestSuite('path-utils.js', tests);
process.exit(allPassed ? 0 : 1);
