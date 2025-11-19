#!/usr/bin/env node
/**
 * Unit Tests: marker-detection.js
 * Tests hash generation consistency and agent context detection logic
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { runTestSuite } = require('../fixtures/test-helpers');
const { createMockMarker, getMarkerFileName } = require('../fixtures/mock-marker-files');
const { clearCache } = require('../../../src/hooks/lib/config-loader');

const markerModulePath = require.resolve('../../../src/hooks/lib/marker-detection');

function loadMarkerModule() {
  delete require.cache[markerModulePath];
  return require(markerModulePath);
}

let {
  generateProjectHash,
  isAgentContext,
  isPMRole,
  getMarkerDir
} = loadMarkerModule();

let markerDir = getMarkerDir();

function reloadMarkerDetection() {
  clearCache();
  ({
    generateProjectHash,
    isAgentContext,
    isPMRole,
    getMarkerDir
  } = loadMarkerModule());
  markerDir = getMarkerDir();
}

// Test data
const testProjectRoot1 = '/test/project/path1';
const testProjectRoot2 = '/test/project/path2';
const testSessionId = 'test-session-123';

// Cleanup function to remove test marker files
function cleanupTestMarkers() {
  if (fs.existsSync(markerDir)) {
    const files = fs.readdirSync(markerDir);
    files.forEach(file => {
      if (file.startsWith('agent-executing-test-session')) {
        fs.unlinkSync(path.join(markerDir, file));
      }
    });
  }
}

// Test suite
const tests = {
  'generateProjectHash produces consistent hash for same input': () => {
    const hash1 = generateProjectHash(testProjectRoot1);
    const hash2 = generateProjectHash(testProjectRoot1);
    assert.strictEqual(hash1, hash2, 'Hash should be consistent for same project root');
    assert.strictEqual(hash1.length, 8, 'Hash should be 8 characters');
  },

  'generateProjectHash produces different hashes for different inputs': () => {
    const hash1 = generateProjectHash(testProjectRoot1);
    const hash2 = generateProjectHash(testProjectRoot2);
    assert.notStrictEqual(hash1, hash2, 'Different project roots should produce different hashes');
  },

  'getMarkerDir returns correct path': () => {
    const markerPath = getMarkerDir();
    const expectedPath = path.join(os.homedir(), '.claude', 'tmp');
    assert.strictEqual(markerPath, expectedPath, 'Marker directory should be ~/.claude/tmp');
  },

  'isAgentContext returns false when no marker file exists': () => {
    cleanupTestMarkers();
    const result = isAgentContext(testProjectRoot1, testSessionId);
    assert.strictEqual(result, false, 'Should return false when marker file does not exist');
  },

  'isAgentContext returns true when marker file exists with agent_count > 0': () => {
    cleanupTestMarkers();
    const mockMarker = createMockMarker(testSessionId, testProjectRoot1, 2);
    const markerFileName = getMarkerFileName(testSessionId, testProjectRoot1);
    const markerPath = path.join(markerDir, markerFileName);

    // Ensure marker directory exists
    if (!fs.existsSync(markerDir)) {
      fs.mkdirSync(markerDir, { recursive: true });
    }

    fs.writeFileSync(markerPath, JSON.stringify(mockMarker));
    const result = isAgentContext(testProjectRoot1, testSessionId);

    cleanupTestMarkers();
    assert.strictEqual(result, true, 'Should return true when marker exists with agent_count > 0');
  },

  'isAgentContext returns false when marker file exists with agent_count = 0': () => {
    cleanupTestMarkers();
    const mockMarker = createMockMarker(testSessionId, testProjectRoot1, 0);
    const markerFileName = getMarkerFileName(testSessionId, testProjectRoot1);
    const markerPath = path.join(markerDir, markerFileName);

    if (!fs.existsSync(markerDir)) {
      fs.mkdirSync(markerDir, { recursive: true });
    }

    fs.writeFileSync(markerPath, JSON.stringify(mockMarker));
    const result = isAgentContext(testProjectRoot1, testSessionId);

    cleanupTestMarkers();
    assert.strictEqual(result, false, 'Should return false when marker exists but agent_count is 0');
  },

  'isPMRole returns true when no agent context': () => {
    cleanupTestMarkers();
    const result = isPMRole(testProjectRoot1, testSessionId);
    assert.strictEqual(result, true, 'isPMRole should return true when no agent marker exists');
  },

  'isPMRole returns false when agent context exists': () => {
    cleanupTestMarkers();
    const mockMarker = createMockMarker(testSessionId, testProjectRoot1, 1);
    const markerFileName = getMarkerFileName(testSessionId, testProjectRoot1);
    const markerPath = path.join(markerDir, markerFileName);

    if (!fs.existsSync(markerDir)) {
      fs.mkdirSync(markerDir, { recursive: true });
    }

    fs.writeFileSync(markerPath, JSON.stringify(mockMarker));
    const result = isPMRole(testProjectRoot1, testSessionId);

    cleanupTestMarkers();
    assert.strictEqual(result, false, 'isPMRole should return false when agent marker exists');
  },

  'isAgentContext handles corrupted marker file gracefully': () => {
    cleanupTestMarkers();
    const markerFileName = getMarkerFileName(testSessionId, testProjectRoot1);
    const markerPath = path.join(markerDir, markerFileName);

    if (!fs.existsSync(markerDir)) {
      fs.mkdirSync(markerDir, { recursive: true });
    }

    // Write invalid JSON
    fs.writeFileSync(markerPath, 'invalid json content');
    const result = isAgentContext(testProjectRoot1, testSessionId);

    cleanupTestMarkers();
    assert.strictEqual(result, false, 'Should return false and handle corrupted marker file gracefully');
  },

  'isAgentContext returns true when main scope agent privileges enabled': () => {
    cleanupTestMarkers();
    process.env.ICC_MAIN_SCOPE_AGENT = 'true';
    reloadMarkerDetection();

    const result = isAgentContext(testProjectRoot1, testSessionId);
    assert.strictEqual(result, true, 'Config override should treat main scope as agent context');

    delete process.env.ICC_MAIN_SCOPE_AGENT;
    reloadMarkerDetection();
    cleanupTestMarkers();
  }
};

// Run test suite
const success = runTestSuite('Marker Detection Library Tests', tests);

// Final cleanup
cleanupTestMarkers();

process.exit(success ? 0 : 1);
