#!/usr/bin/env node

/**
 * Test Memory Enforcement Implementation
 *
 * Tests the memory enforcement features in pre-tool-use.js and post-tool-use.js
 */

const fs = require('fs');
const path = require('path');
const { processHook: processPreHook } = require('./pre-tool-use.js');
const { processHook: processPostHook } = require('./post-tool-use.js');

/**
 * Test utility to set up test environment
 */
class TestEnvironment {
  constructor() {
    this.testDir = path.join(__dirname, 'test-temp');
    this.logDir = path.join(this.testDir, '.claude', 'logs');
    this.memoryDir = path.join(this.testDir, 'memory');

    // Set environment for testing
    process.env.CLAUDE_PROJECT_DIR = this.testDir;
  }

  setup() {
    // Create test directories
    fs.mkdirSync(this.logDir, { recursive: true });
    fs.mkdirSync(this.memoryDir, { recursive: true });

    // Create sample memory structure
    fs.mkdirSync(path.join(this.memoryDir, 'behavioral-enforcement'), { recursive: true });
    fs.mkdirSync(path.join(this.memoryDir, 'system'), { recursive: true });
  }

  cleanup() {
    // Clean up test directory
    if (fs.existsSync(this.testDir)) {
      fs.rmSync(this.testDir, { recursive: true, force: true });
    }

    // Clean up environment
    delete process.env.CLAUDE_PROJECT_DIR;
  }

  /**
   * Simulate a memory search by creating a log entry
   */
  simulateMemorySearch() {
    const logFile = path.join(this.logDir, `violations-${new Date().toISOString().split('T')[0]}.log`);
    const entry = {
      timestamp: new Date().toISOString(),
      tool: 'Read',
      intent: 'research',
      parameters: ['memory'],
      context: 'memory search',
      reason: 'Reading memory files'
    };

    fs.appendFileSync(logFile, JSON.stringify(entry) + '\n');
  }

  /**
   * Create a test PRB file content
   */
  createPRBContent() {
    return `name: TEST-PRB-001
description: Test PRB for memory enforcement
execution_instructions:
  Step_1_Analysis:
    - Review requirements
  Step_2_Implementation:
    - Implement features ✅
    - Test functionality ✅
completion_definition:
  done_when:
    - All tests pass ✅
    - Documentation complete ✅`;
  }
}

/**
 * Test cases for memory enforcement
 */
async function runTests() {
  const env = new TestEnvironment();
  const results = [];

  try {
    env.setup();
    console.log('🧪 Running Memory Enforcement Tests...\n');

    // Test 1: PRB creation without memory search should be blocked
    console.log('Test 1: PRB creation without memory search');
    try {
      const input1 = {
        tool: 'Write',
        parameters: {
          file_path: '/test/prbs/ready/TEST-PRB-001.prb.yaml',
          content: env.createPRBContent()
        },
        context: 'Creating PRB'
      };

      const result1 = await processPreHook(input1);
      const passed1 = !result1.allowed && result1.message.includes('MEMORY CONSULTATION REQUIRED');

      console.log(`   ${passed1 ? '✅' : '❌'} Expected: Blocked, Got: ${result1.allowed ? 'Allowed' : 'Blocked'}`);
      console.log(`   Message preview: ${result1.message.substring(0, 100)}...`);
      results.push({ test: 'PRB creation without memory', passed: passed1 });
    } catch (error) {
      console.log(`   ❌ Test failed with error: ${error.message}`);
      results.push({ test: 'PRB creation without memory', passed: false });
    }

    console.log();

    // Test 2: PRB creation with recent memory search should be allowed
    console.log('Test 2: PRB creation with recent memory search');
    try {
      env.simulateMemorySearch(); // Add recent memory search

      const input2 = {
        tool: 'Write',
        parameters: {
          file_path: '/test/prbs/ready/TEST-PRB-002.prb.yaml',
          content: env.createPRBContent()
        },
        context: 'Creating PRB after memory search'
      };

      const result2 = await processPreHook(input2);
      const passed2 = result2.allowed;

      console.log(`   ${passed2 ? '✅' : '❌'} Expected: Allowed, Got: ${result2.allowed ? 'Allowed' : 'Blocked'}`);
      console.log(`   Message: ${result2.message}`);
      results.push({ test: 'PRB creation with memory', passed: passed2 });
    } catch (error) {
      console.log(`   ❌ Test failed with error: ${error.message}`);
      results.push({ test: 'PRB creation with memory', passed: false });
    }

    console.log();

    // Test 3: Post-hook memory opportunity detection
    console.log('Test 3: Post-hook memory opportunity detection');
    try {
      const input3 = {
        tool: 'Write',
        parameters: {
          file_path: '/test/prbs/completed/TEST-PRB-003.prb.yaml',
          content: env.createPRBContent() + '\n\nexecution_summary:\n  - All steps completed ✅'
        },
        result: { success: true }
      };

      const result3 = await processPostHook(input3);
      const passed3 = result3.success && result3.message.includes('MEMORY STORAGE OPPORTUNITY');

      console.log(`   ${passed3 ? '✅' : '❌'} Expected: Memory opportunity detected, Got: ${passed3 ? 'Detected' : 'Not detected'}`);
      console.log(`   Message preview: ${result3.message.substring(0, 100)}...`);
      results.push({ test: 'Post-hook opportunity detection', passed: passed3 });
    } catch (error) {
      console.log(`   ❌ Test failed with error: ${error.message}`);
      results.push({ test: 'Post-hook opportunity detection', passed: false });
    }

    console.log();

    // Test 4: Non-PRB file operations should not be affected
    console.log('Test 4: Non-PRB file operations should be allowed');
    try {
      const input4 = {
        tool: 'Write',
        parameters: {
          file_path: '/test/src/example.js',
          content: 'console.log("Hello, world!");'
        },
        context: 'Creating regular file'
      };

      const result4 = await processPreHook(input4);
      const passed4 = result4.allowed; // Should be allowed since it's not PRB creation

      console.log(`   ${passed4 ? '✅' : '❌'} Expected: Allowed, Got: ${result4.allowed ? 'Allowed' : 'Blocked'}`);
      console.log(`   Message: ${result4.message}`);
      results.push({ test: 'Non-PRB file operations', passed: passed4 });
    } catch (error) {
      console.log(`   ❌ Test failed with error: ${error.message}`);
      results.push({ test: 'Non-PRB file operations', passed: false });
    }

    console.log();

    // Summary
    const passed = results.filter(r => r.passed).length;
    const total = results.length;

    console.log('📊 Test Results Summary:');
    console.log(`   ${passed}/${total} tests passed`);

    if (passed === total) {
      console.log('   🎉 All tests passed! Memory enforcement is working correctly.');
    } else {
      console.log('   ⚠️  Some tests failed. Check implementation.');
      results.filter(r => !r.passed).forEach(r => {
        console.log(`      ❌ ${r.test}`);
      });
    }

  } finally {
    env.cleanup();
  }
}

// Run tests if called directly
if (require.main === module) {
  runTests().catch(error => {
    console.error(`Test suite failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { runTests };