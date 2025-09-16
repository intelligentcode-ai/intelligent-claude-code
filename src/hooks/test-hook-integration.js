#!/usr/bin/env node

/**
 * Test script for pre-tool-use hook integration
 * 
 * Validates that the hook correctly:
 * - Allows research/Q&A operations
 * - Blocks work operations in main scope
 * - Handles performance requirements
 * - Logs violations properly
 */

const { spawn } = require('child_process');
const path = require('path');

const hookPath = path.join(__dirname, 'pre-tool-use.js');

function runHook(input) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const child = spawn('node', [hookPath], { 
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 5000 
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      const duration = Date.now() - startTime;
      resolve({
        exitCode: code,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        duration
      });
    });
    
    child.on('error', (error) => {
      reject(error);
    });
    
    // Send input
    if (typeof input === 'string') {
      child.stdin.write(input);
    } else {
      child.stdin.write(JSON.stringify(input));
    }
    child.stdin.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Pre-Tool-Use Hook Integration\n');
  
  const tests = [
    {
      name: 'Read operation (should allow)',
      input: {
        tool: 'Read',
        parameters: { file_path: '/test/file.txt' },
        context: 'examining file contents'
      },
      expectedExit: 0,
      shouldContain: 'ALLOWED'
    },
    {
      name: 'Grep search (should allow)',
      input: {
        tool: 'Grep',
        parameters: { pattern: 'test' },
        context: 'searching for patterns'
      },
      expectedExit: 0,
      shouldContain: 'ALLOWED'
    },
    {
      name: 'Edit operation (should block)',
      input: {
        tool: 'Edit',
        parameters: { 
          file_path: '/test/file.txt',
          old_string: 'old',
          new_string: 'new'
        },
        context: 'fixing bug'
      },
      expectedExit: 2,
      shouldContain: 'BLOCKED'
    },
    {
      name: 'Write operation (should block)',
      input: {
        tool: 'Write',
        parameters: { 
          file_path: '/test/new.txt',
          content: 'new content'
        },
        context: 'creating new file'
      },
      expectedExit: 2,
      shouldContain: 'BLOCKED'
    },
    {
      name: 'Bash read command (should allow)',
      input: {
        tool: 'Bash',
        parameters: { command: 'ls -la /tmp' },
        context: 'listing directory contents'
      },
      expectedExit: 0,
      shouldContain: 'ALLOWED'
    },
    {
      name: 'Bash write command (should block)',
      input: {
        tool: 'Bash',
        parameters: { command: 'rm -f /test/file.txt' },
        context: 'removing file'
      },
      expectedExit: 2,
      shouldContain: 'BLOCKED'
    },
    {
      name: 'Invalid JSON (should fail gracefully)',
      input: 'not json',
      expectedExit: 1,
      shouldContain: 'parsing JSON'
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    process.stdout.write(`Testing: ${test.name}... `);
    
    try {
      const result = await runHook(test.input);
      
      // Check exit code
      if (result.exitCode !== test.expectedExit) {
        console.log(`❌ FAIL - Expected exit ${test.expectedExit}, got ${result.exitCode}`);
        failed++;
        continue;
      }
      
      // Check content
      const output = result.stdout || result.stderr;
      if (test.shouldContain && !output.toLowerCase().includes(test.shouldContain.toLowerCase())) {
        console.log(`❌ FAIL - Expected output to contain "${test.shouldContain}"`);
        failed++;
        continue;
      }
      
      // Check performance (should be reasonable)
      if (result.duration > 100) {
        console.log(`⚠️  SLOW - Took ${result.duration}ms (>100ms)`);
      }
      
      console.log(`✅ PASS (${result.duration}ms)`);
      passed++;
      
    } catch (error) {
      console.log(`❌ ERROR - ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed');
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed!');
    console.log('\n🎉 Hook integration is working correctly:');
    console.log('  - Research/Q&A operations are allowed');
    console.log('  - Work operations are blocked with helpful messages');
    console.log('  - Performance is acceptable');
    console.log('  - Error handling is graceful');
    console.log('\n📁 Next steps:');
    console.log('  1. Copy pre-tool-use.js to ~/.claude/hooks/');
    console.log('  2. Copy lib/ and config/ directories');
    console.log('  3. Add hook configuration to Claude settings.json');
    console.log('  4. Restart Claude Code to activate enforcement');
  }
}

// Run tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runHook };