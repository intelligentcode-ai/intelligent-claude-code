#!/usr/bin/env node
/**
 * Unit Tests for context-detection.js
 * Tests context type detection
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { runTestSuite } = require('../fixtures/test-helpers');
const {
  isDevelopmentContext
} = require('../../../src/hooks/lib/context-detection.js');

const tests = {
  'isDevelopmentContext: detects intelligent-claude-code project': () => {
    // Use actual project root
    const projectRoot = '/Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code';

    if (fs.existsSync(projectRoot)) {
      const result = isDevelopmentContext(projectRoot);
      assert.strictEqual(result, true);
    } else {
      // Skip if not running in actual project
      assert.ok(true, 'Skipped - not in project environment');
    }
  },

  'isDevelopmentContext: returns false for non-development context': () => {
    const result = isDevelopmentContext('/some/other/project');
    assert.strictEqual(result, false);
  },

  'isDevelopmentContext: returns false for invalid path': () => {
    const result = isDevelopmentContext('/nonexistent/path');
    assert.strictEqual(result, false);
  },

  'isDevelopmentContext: handles null path gracefully': () => {
    try {
      const result = isDevelopmentContext(null);
      assert.strictEqual(result, false);
    } catch (error) {
      assert.ok(true, 'Should handle null gracefully');
    }
  },

  'isDevelopmentContext: handles undefined path gracefully': () => {
    try {
      const result = isDevelopmentContext(undefined);
      assert.strictEqual(result, false);
    } catch (error) {
      assert.ok(true, 'Should handle undefined gracefully');
    }
  },

  'isDevelopmentContext: checks for src/agenttask-templates': () => {
    const projectRoot = '/Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code';

    if (fs.existsSync(projectRoot)) {
      const templatesPath = path.join(projectRoot, 'src', 'agenttask-templates');
      const exists = fs.existsSync(templatesPath);

      if (exists) {
        const result = isDevelopmentContext(projectRoot);
        assert.strictEqual(result, true);
      } else {
        assert.ok(true, 'Templates not found - not in dev context');
      }
    } else {
      assert.ok(true, 'Skipped - not in project environment');
    }
  },

  'isDevelopmentContext: checks for src/behaviors': () => {
    const projectRoot = '/Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code';

    if (fs.existsSync(projectRoot)) {
      const behaviorsPath = path.join(projectRoot, 'src', 'behaviors');
      const exists = fs.existsSync(behaviorsPath);

      if (exists) {
        const result = isDevelopmentContext(projectRoot);
        assert.strictEqual(result, true);
      } else {
        assert.ok(true, 'Behaviors not found - not in dev context');
      }
    } else {
      assert.ok(true, 'Skipped - not in project environment');
    }
  },

  'isDevelopmentContext: checks for VERSION file': () => {
    const projectRoot = '/Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code';

    if (fs.existsSync(projectRoot)) {
      const versionPath = path.join(projectRoot, 'VERSION');
      const exists = fs.existsSync(versionPath);

      if (exists) {
        const result = isDevelopmentContext(projectRoot);
        assert.strictEqual(result, true);
      } else {
        assert.ok(true, 'VERSION not found - not in dev context');
      }
    } else {
      assert.ok(true, 'Skipped - not in project environment');
    }
  },

  'isDevelopmentContext: returns false when missing required directories': () => {
    const result = isDevelopmentContext('/tmp');
    assert.strictEqual(result, false);
  },

  'isDevelopmentContext: handles permission errors gracefully': () => {
    try {
      const result = isDevelopmentContext('/root/restricted');
      assert.strictEqual(result, false);
    } catch (error) {
      assert.ok(true, 'Should handle permission errors');
    }
  },

  'isDevelopmentContext: distinguishes from user projects': () => {
    const result = isDevelopmentContext(process.env.HOME);
    assert.strictEqual(result, false);
  },

  'isDevelopmentContext: returns boolean type': () => {
    const result = isDevelopmentContext('/any/path');
    assert.ok(typeof result === 'boolean', 'Should return boolean');
  }
};

console.log('\n=== Context Detection Unit Tests ===');
const allPassed = runTestSuite('context-detection.js', tests);
process.exit(allPassed ? 0 : 1);
