#!/usr/bin/env node
/**
 * Integration Tests: Agent Marker Workflow
 *
 * Tests the full lifecycle of agent marker system:
 * 1. Marker Creation → File created with correct structure
 * 2. Marker Lookup → Find marker by session ID + project hash
 * 3. Agent Detection → isAgentContext() returns correct result
 * 4. Concurrent Agents → Multiple agents tracked correctly
 * 5. Marker Cleanup → Proper deletion on agent completion
 *
 * This test validates the complete agent marker workflow used by hooks
 * to detect main scope vs agent scope execution context.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { runTestSuite } = require('../fixtures/test-helpers');
const { createMockMarker, getMarkerFileName } = require('../fixtures/mock-marker-files');
const {
  generateProjectHash,
  isAgentContext,
  isPMRole,
  getMarkerDir,
  ensureMarkerDir
} = require(path.join(os.homedir(), '.claude', 'hooks', 'lib', 'marker-detection'));

// Test data - use unique session IDs to avoid conflicts
const testProjectRoot1 = '/test/integration/project/path1';
const testProjectRoot2 = '/test/integration/project/path2';
const testSessionId1 = 'integration-test-session-001';
const testSessionId2 = 'integration-test-session-002';
const markerDir = getMarkerDir();

// Cleanup function to remove test marker files
function cleanupTestMarkers() {
  if (fs.existsSync(markerDir)) {
    const files = fs.readdirSync(markerDir);
    files.forEach(file => {
      if (file.startsWith('agent-executing-integration-test')) {
        fs.unlinkSync(path.join(markerDir, file));
      }
    });
  }
}

// Utility to create a marker file directly
function createMarkerFile(sessionId, projectRoot, agents = []) {
  ensureMarkerDir();
  const markerFileName = getMarkerFileName(sessionId, projectRoot);
  const markerPath = path.join(markerDir, markerFileName);
  const markerData = createMockMarker(sessionId, projectRoot, agents.length);

  if (agents.length > 0) {
    markerData.agents = agents;
  }

  fs.writeFileSync(markerPath, JSON.stringify(markerData, null, 2));
  return markerPath;
}

// Test Suite
const tests = {
  // ==========================================
  // Category 1: Marker File Creation and Structure (5 tests)
  // ==========================================

  'Marker creation creates file with correct structure': () => {
    cleanupTestMarkers();
    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, []);

    assert.ok(fs.existsSync(markerPath), 'Marker file should exist');
    const data = JSON.parse(fs.readFileSync(markerPath, 'utf8'));

    assert.strictEqual(data.session_id, testSessionId1, 'Session ID should match');
    assert.strictEqual(data.project_root, testProjectRoot1, 'Project root should match');
    assert.strictEqual(data.agent_count, 0, 'Agent count should be 0');
    assert.ok(Array.isArray(data.agents), 'Agents should be an array');

    cleanupTestMarkers();
  },

  'Marker file contains required fields': () => {
    cleanupTestMarkers();
    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'test-id-1', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    const data = JSON.parse(fs.readFileSync(markerPath, 'utf8'));

    assert.ok(data.hasOwnProperty('session_id'), 'Should have session_id field');
    assert.ok(data.hasOwnProperty('project_root'), 'Should have project_root field');
    assert.ok(data.hasOwnProperty('agent_count'), 'Should have agent_count field');
    assert.ok(data.hasOwnProperty('agents'), 'Should have agents field');

    cleanupTestMarkers();
  },

  'Marker file permissions allow read/write': () => {
    cleanupTestMarkers();
    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, []);

    const stats = fs.statSync(markerPath);
    assert.ok(stats.mode & fs.constants.S_IRUSR, 'File should be readable');
    assert.ok(stats.mode & fs.constants.S_IWUSR, 'File should be writable');

    cleanupTestMarkers();
  },

  'Marker file created in correct location': () => {
    cleanupTestMarkers();
    const expectedDir = path.join(os.homedir(), '.claude', 'tmp');
    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, []);

    assert.ok(markerPath.startsWith(expectedDir), 'Marker should be in ~/.claude/tmp');

    cleanupTestMarkers();
  },

  'Marker file name format is correct': () => {
    cleanupTestMarkers();
    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, []);
    const fileName = path.basename(markerPath);
    const projectHash = generateProjectHash(testProjectRoot1);
    const expectedName = `agent-executing-${testSessionId1}-${projectHash}`;

    assert.strictEqual(fileName, expectedName, 'Marker file name should match expected format');

    cleanupTestMarkers();
  },

  // ==========================================
  // Category 2: Project Hash Generation and Lookup (5 tests)
  // ==========================================

  'Project hash generation is deterministic': () => {
    const hash1 = generateProjectHash(testProjectRoot1);
    const hash2 = generateProjectHash(testProjectRoot1);
    const hash3 = generateProjectHash(testProjectRoot1);

    assert.strictEqual(hash1, hash2, 'Hash should be consistent across calls');
    assert.strictEqual(hash2, hash3, 'Hash should be consistent across multiple calls');
  },

  'Project hash is correct length': () => {
    const hash = generateProjectHash(testProjectRoot1);
    assert.strictEqual(hash.length, 8, 'Hash should be exactly 8 characters');
  },

  'Different projects produce different hashes': () => {
    const hash1 = generateProjectHash(testProjectRoot1);
    const hash2 = generateProjectHash(testProjectRoot2);

    assert.notStrictEqual(hash1, hash2, 'Different projects should have different hashes');
  },

  'Marker lookup finds correct marker by session and project': () => {
    cleanupTestMarkers();

    // Create markers for different projects and sessions
    createMarkerFile(testSessionId1, testProjectRoot1, [{ tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }]);
    createMarkerFile(testSessionId2, testProjectRoot2, [{ tool_invocation_id: 'id2', created: new Date().toISOString(), tool_name: 'Task' }]);

    // Verify correct marker is found for each project/session combination
    const isAgent1 = isAgentContext(testProjectRoot1, testSessionId1);
    const isAgent2 = isAgentContext(testProjectRoot2, testSessionId2);

    assert.strictEqual(isAgent1, true, 'Should find marker for project1/session1');
    assert.strictEqual(isAgent2, true, 'Should find marker for project2/session2');

    cleanupTestMarkers();
  },

  'Marker lookup fails with wrong session ID': () => {
    cleanupTestMarkers();
    createMarkerFile(testSessionId1, testProjectRoot1, [{ tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }]);

    // Try to find marker with wrong session ID
    const isAgent = isAgentContext(testProjectRoot1, 'wrong-session-id');

    assert.strictEqual(isAgent, false, 'Should not find marker with wrong session ID');

    cleanupTestMarkers();
  },

  // ==========================================
  // Category 3: Agent Context Detection (6 tests)
  // ==========================================

  'isAgentContext returns true when marker exists with agents': () => {
    cleanupTestMarkers();
    createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    const result = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(result, true, 'Should detect agent context when marker has agents');

    cleanupTestMarkers();
  },

  'isAgentContext returns false when no marker exists': () => {
    cleanupTestMarkers();

    const result = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(result, false, 'Should return false when no marker exists');
  },

  'isAgentContext returns false when marker has zero agents': () => {
    cleanupTestMarkers();
    createMarkerFile(testSessionId1, testProjectRoot1, []);

    const result = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(result, false, 'Should return false when agent_count is 0');

    cleanupTestMarkers();
  },

  'isAgentContext returns false for wrong project': () => {
    cleanupTestMarkers();
    createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    // Try with different project root
    const result = isAgentContext(testProjectRoot2, testSessionId1);
    assert.strictEqual(result, false, 'Should return false for wrong project root');

    cleanupTestMarkers();
  },

  'isPMRole returns inverse of isAgentContext': () => {
    cleanupTestMarkers();

    // Test with no marker (should be PM role)
    const isPM1 = isPMRole(testProjectRoot1, testSessionId1);
    const isAgent1 = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(isPM1, true, 'Should be PM role when no marker');
    assert.strictEqual(isAgent1, false, 'Should not be agent context when no marker');

    // Create marker and test again
    createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    const isPM2 = isPMRole(testProjectRoot1, testSessionId1);
    const isAgent2 = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(isPM2, false, 'Should not be PM role when marker exists');
    assert.strictEqual(isAgent2, true, 'Should be agent context when marker exists');

    cleanupTestMarkers();
  },

  'isAgentContext handles corrupted marker gracefully': () => {
    cleanupTestMarkers();

    const markerFileName = getMarkerFileName(testSessionId1, testProjectRoot1);
    const markerPath = path.join(markerDir, markerFileName);

    ensureMarkerDir();
    fs.writeFileSync(markerPath, 'invalid json {corrupt}');

    const result = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(result, false, 'Should return false for corrupted marker');

    cleanupTestMarkers();
  },

  // ==========================================
  // Category 4: Concurrent Agent Handling (4 tests)
  // ==========================================

  'Marker tracks multiple concurrent agents': () => {
    cleanupTestMarkers();

    const agents = [
      { tool_invocation_id: 'agent-1', created: new Date().toISOString(), tool_name: 'Task' },
      { tool_invocation_id: 'agent-2', created: new Date().toISOString(), tool_name: 'Task' },
      { tool_invocation_id: 'agent-3', created: new Date().toISOString(), tool_name: 'Task' }
    ];

    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, agents);
    const data = JSON.parse(fs.readFileSync(markerPath, 'utf8'));

    assert.strictEqual(data.agent_count, 3, 'Agent count should be 3');
    assert.strictEqual(data.agents.length, 3, 'Should have 3 agents in array');

    cleanupTestMarkers();
  },

  'Agent entries have required fields': () => {
    cleanupTestMarkers();

    const agents = [
      { tool_invocation_id: 'test-id', created: new Date().toISOString(), tool_name: 'Task' }
    ];

    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, agents);
    const data = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
    const agent = data.agents[0];

    assert.ok(agent.hasOwnProperty('tool_invocation_id'), 'Agent should have tool_invocation_id');
    assert.ok(agent.hasOwnProperty('created'), 'Agent should have created timestamp');
    assert.ok(agent.hasOwnProperty('tool_name'), 'Agent should have tool_name');

    cleanupTestMarkers();
  },

  'isAgentContext detects context with multiple agents': () => {
    cleanupTestMarkers();

    const agents = [
      { tool_invocation_id: 'agent-1', created: new Date().toISOString(), tool_name: 'Task' },
      { tool_invocation_id: 'agent-2', created: new Date().toISOString(), tool_name: 'Task' }
    ];

    createMarkerFile(testSessionId1, testProjectRoot1, agents);
    const result = isAgentContext(testProjectRoot1, testSessionId1);

    assert.strictEqual(result, true, 'Should detect agent context with multiple agents');

    cleanupTestMarkers();
  },

  'Concurrent agents in different projects are isolated': () => {
    cleanupTestMarkers();

    // Create markers for different projects with different session IDs
    createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'project1-agent', created: new Date().toISOString(), tool_name: 'Task' }
    ]);
    createMarkerFile(testSessionId2, testProjectRoot2, [
      { tool_invocation_id: 'project2-agent', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    // Verify each project only sees its own agents
    const isAgent1 = isAgentContext(testProjectRoot1, testSessionId1);
    const isAgent2 = isAgentContext(testProjectRoot2, testSessionId2);
    const isAgent1WithSession2 = isAgentContext(testProjectRoot1, testSessionId2);

    assert.strictEqual(isAgent1, true, 'Project1 should see its agent');
    assert.strictEqual(isAgent2, true, 'Project2 should see its agent');
    assert.strictEqual(isAgent1WithSession2, false, 'Project1 should not see Project2 session');

    cleanupTestMarkers();
  },

  // ==========================================
  // Category 5: Marker Cleanup (3 tests)
  // ==========================================

  'Marker file can be deleted successfully': () => {
    cleanupTestMarkers();

    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    assert.ok(fs.existsSync(markerPath), 'Marker should exist before deletion');

    fs.unlinkSync(markerPath);

    assert.ok(!fs.existsSync(markerPath), 'Marker should not exist after deletion');
  },

  'isAgentContext returns false after marker cleanup': () => {
    cleanupTestMarkers();

    const markerPath = createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    const resultBefore = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(resultBefore, true, 'Should detect agent before cleanup');

    fs.unlinkSync(markerPath);

    const resultAfter = isAgentContext(testProjectRoot1, testSessionId1);
    assert.strictEqual(resultAfter, false, 'Should not detect agent after cleanup');
  },

  'Cleanup does not affect other project markers': () => {
    cleanupTestMarkers();

    const markerPath1 = createMarkerFile(testSessionId1, testProjectRoot1, [
      { tool_invocation_id: 'id1', created: new Date().toISOString(), tool_name: 'Task' }
    ]);
    const markerPath2 = createMarkerFile(testSessionId2, testProjectRoot2, [
      { tool_invocation_id: 'id2', created: new Date().toISOString(), tool_name: 'Task' }
    ]);

    // Delete marker for project1
    fs.unlinkSync(markerPath1);

    // Verify project1 marker is gone but project2 marker remains
    const isAgent1 = isAgentContext(testProjectRoot1, testSessionId1);
    const isAgent2 = isAgentContext(testProjectRoot2, testSessionId2);

    assert.strictEqual(isAgent1, false, 'Project1 marker should be gone');
    assert.strictEqual(isAgent2, true, 'Project2 marker should still exist');

    cleanupTestMarkers();
  }
};

// Run test suite
console.log('\n=================================================');
console.log('Integration Tests: Agent Marker Workflow');
console.log('Testing full lifecycle: creation → lookup → detection → cleanup');
console.log('=================================================');

const success = runTestSuite('Agent Marker Workflow Integration Tests', tests);

// Final cleanup
cleanupTestMarkers();

console.log('\n=================================================');
console.log(success ? '✅ All integration tests passed!' : '❌ Some integration tests failed');
console.log('=================================================\n');

process.exit(success ? 0 : 1);
