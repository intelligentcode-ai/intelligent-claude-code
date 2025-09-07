/**
 * Integration Tests for Complete Hook System
 * 
 * Tests the pre-tool-use hook with real scenarios and end-to-end workflows
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('Hook System Integration', () => {
  const hookPath = path.join(__dirname, '..', '..', 'pre-tool-use.js');
  
  // Helper function to run the hook with input
  function runHook(input, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const child = spawn('node', [hookPath], { 
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout 
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
  
  describe('Research Operations (Should Allow)', () => {
    const testScenarios = global.testUtils.loadFixture('test-scenarios.json');
    
    test.each(testScenarios.research_scenarios)(
      'should allow: $name',
      async ({ tool, parameters, context }) => {
        const input = { tool, parameters, context };
        const result = await runHook(input);
        
        expect(result.exitCode).toBe(0);
        expect(result.stdout.toLowerCase()).toContain('allowed');
        expect(result.duration).toBeLessThan(1000); // Under 1 second
      }
    );
    
    test('should allow complex research workflows', async () => {
      const workflow = [
        {
          tool: 'Glob',
          parameters: { pattern: '**/*.js' },
          context: 'Find all JavaScript files in project'
        },
        {
          tool: 'Read',
          parameters: { file_path: '/project/src/main.js' },
          context: 'Read main entry point'
        },
        {
          tool: 'Grep',
          parameters: { pattern: 'function.*auth', path: '/project/src' },
          context: 'Search for authentication functions'
        }
      ];
      
      for (const step of workflow) {
        const result = await runHook(step);
        expect(result.exitCode).toBe(0);
        expect(result.stdout.toLowerCase()).toContain('allowed');
      }
    });
  });
  
  describe('Q&A Operations (Should Allow)', () => {
    const testScenarios = global.testUtils.loadFixture('test-scenarios.json');
    
    test.each(testScenarios.qa_scenarios)(
      'should allow Q&A: $name',
      async ({ tool, parameters, context }) => {
        const input = { tool, parameters, context };
        const result = await runHook(input);
        
        expect(result.exitCode).toBe(0);
        expect(result.stdout.toLowerCase()).toContain('allowed');
      }
    );
  });
  
  describe('Planning Operations (Should Allow)', () => {
    const testScenarios = global.testUtils.loadFixture('test-scenarios.json');
    
    test.each(testScenarios.planning_scenarios)(
      'should allow planning: $name',
      async ({ tool, parameters, context }) => {
        const input = { tool, parameters, context };
        const result = await runHook(input);
        
        expect(result.exitCode).toBe(0);
        expect(result.stdout.toLowerCase()).toContain('allowed');
      }
    );
  });
  
  describe('Work Operations (Should Block/Require PRB)', () => {
    const testScenarios = global.testUtils.loadFixture('test-scenarios.json');
    
    test.each(testScenarios.work_scenarios)(
      'should block/require PRB: $name',
      async ({ tool, parameters, context }) => {
        const input = { tool, parameters, context };
        const result = await runHook(input);
        
        expect([1, 2]).toContain(result.exitCode); // Non-zero exit codes
        expect(result.stdout.toLowerCase()).toMatch(/(blocked|require.*prb|not.*allowed)/);
      }
    );
    
    test('should block dangerous system operations', async () => {
      const dangerousOperations = [
        {
          tool: 'Bash',
          parameters: { command: 'rm -rf /important/data' },
          context: 'Remove important files'
        },
        {
          tool: 'Bash',
          parameters: { command: 'sudo chmod 777 /etc/passwd' },
          context: 'Change system file permissions'
        },
        {
          tool: 'Edit',
          parameters: { 
            file_path: '/etc/hosts',
            old_string: '127.0.0.1',
            new_string: '192.168.1.1'
          },
          context: 'Modify system hosts file'
        }
      ];
      
      for (const operation of dangerousOperations) {
        const result = await runHook(operation);
        expect([1, 2]).toContain(result.exitCode);
        expect(result.stdout.toLowerCase()).toMatch(/(blocked|not.*allowed|require.*prb)/);
      }
    });
  });
  
  describe('Edge Cases and Error Handling', () => {
    test('should handle malformed JSON input', async () => {
      const result = await runHook('{ invalid json }');
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr.toLowerCase()).toContain('json');
    });
    
    test('should handle empty input', async () => {
      const result = await runHook('');
      
      expect(result.exitCode).toBe(1);
    });
    
    test('should handle missing required fields', async () => {
      const incompleteInput = {
        // Missing tool
        parameters: { file_path: '/test.js' },
        context: 'test'
      };
      
      const result = await runHook(incompleteInput);
      
      expect([1, 2]).toContain(result.exitCode);
    });
    
    test('should handle very large input', async () => {
      const largeInput = {
        tool: 'Read',
        parameters: { file_path: '/test.js' },
        context: 'a'.repeat(50000) // 50KB context
      };
      
      const result = await runHook(largeInput);
      
      expect([0, 1, 2]).toContain(result.exitCode); // Should handle gracefully
      expect(result.duration).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });
  
  describe('Performance Requirements', () => {
    test('should respond quickly to simple requests', async () => {
      const input = {
        tool: 'Read',
        parameters: { file_path: '/test.js' },
        context: 'reading test file'
      };
      
      const result = await runHook(input);
      
      expect(result.duration).toBeLessThan(500); // Under 500ms
      expect(result.exitCode).toBe(0);
    });
    
    test('should handle concurrent requests efficiently', async () => {
      const inputs = [
        {
          tool: 'Read',
          parameters: { file_path: '/test1.js' },
          context: 'reading file 1'
        },
        {
          tool: 'Grep',
          parameters: { pattern: 'test' },
          context: 'searching patterns'
        },
        {
          tool: 'Edit',
          parameters: { file_path: '/test2.js', old_string: 'old', new_string: 'new' },
          context: 'editing file'
        }
      ];
      
      const startTime = Date.now();
      const promises = inputs.map(input => runHook(input));
      const results = await Promise.all(promises);
      const totalTime = Date.now() - startTime;
      
      expect(totalTime).toBeLessThan(2000); // All requests under 2 seconds
      expect(results[0].exitCode).toBe(0); // Read should be allowed
      expect(results[1].exitCode).toBe(0); // Grep should be allowed
      expect([1, 2]).toContain(results[2].exitCode); // Edit should be blocked
    });
    
    test('should handle stress testing', async () => {
      const stressInputs = Array.from({ length: 10 }, (_, i) => ({
        tool: 'Read',
        parameters: { file_path: `/test${i}.js` },
        context: `reading test file ${i}`
      }));
      
      const startTime = Date.now();
      
      for (const input of stressInputs) {
        const result = await runHook(input);
        expect(result.exitCode).toBe(0);
        expect(result.duration).toBeLessThan(1000);
      }
      
      const totalTime = Date.now() - startTime;
      expect(totalTime).toBeLessThan(5000); // All 10 requests under 5 seconds
    });
  });
  
  describe('Configuration Integration', () => {
    test('should respect configuration overrides', async () => {
      // Test with environment variable override
      const originalEnv = process.env.HOOK_DEBUG_MODE;
      process.env.HOOK_DEBUG_MODE = 'true';
      
      const input = {
        tool: 'Read',
        parameters: { file_path: '/test.js' },
        context: 'debug mode test'
      };
      
      const result = await runHook(input);
      
      expect(result.exitCode).toBe(0);
      // In debug mode, might have additional logging
      
      // Restore environment
      if (originalEnv !== undefined) {
        process.env.HOOK_DEBUG_MODE = originalEnv;
      } else {
        delete process.env.HOOK_DEBUG_MODE;
      }
    });
  });
  
  describe('Real-World Scenarios', () => {
    test('should handle typical development workflow', async () => {
      const developmentWorkflow = [
        // Research phase
        {
          tool: 'Glob',
          parameters: { pattern: '**/*.js' },
          context: 'Find all source files',
          expectedResult: 'allow'
        },
        {
          tool: 'Read',
          parameters: { file_path: '/src/auth.js' },
          context: 'Understand current authentication',
          expectedResult: 'allow'
        },
        {
          tool: 'Grep',
          parameters: { pattern: 'TODO|FIXME' },
          context: 'Find areas needing work',
          expectedResult: 'allow'
        },
        
        // Planning phase
        {
          tool: 'Write',
          parameters: { file_path: '/prbs/auth-improvement.prb.yaml' },
          context: 'Create PRB for authentication improvements',
          expectedResult: 'allow'
        },
        
        // Work phase (should be blocked)
        {
          tool: 'Edit',
          parameters: { 
            file_path: '/src/auth.js',
            old_string: 'old implementation',
            new_string: 'new implementation'
          },
          context: 'Implement authentication improvements',
          expectedResult: 'block'
        }
      ];
      
      for (const step of developmentWorkflow) {
        const result = await runHook({
          tool: step.tool,
          parameters: step.parameters,
          context: step.context
        });
        
        if (step.expectedResult === 'allow') {
          expect(result.exitCode).toBe(0);
          expect(result.stdout.toLowerCase()).toContain('allowed');
        } else {
          expect([1, 2]).toContain(result.exitCode);
          expect(result.stdout.toLowerCase()).toMatch(/(blocked|require.*prb|not.*allowed)/);
        }
      }
    });
    
    test('should handle debugging workflow', async () => {
      const debuggingWorkflow = [
        {
          tool: 'Read',
          parameters: { file_path: '/logs/error.log' },
          context: 'Examine error logs',
          expectedResult: 'allow'
        },
        {
          tool: 'Grep',
          parameters: { pattern: 'ERROR|FATAL', path: '/logs' },
          context: 'Search for critical errors',
          expectedResult: 'allow'
        },
        {
          tool: 'Bash',
          parameters: { command: 'ps aux | grep node' },
          context: 'Check running processes',
          expectedResult: 'allow'
        },
        {
          tool: 'Edit',
          parameters: { 
            file_path: '/src/buggy-module.js',
            old_string: 'buggy code',
            new_string: 'fixed code'
          },
          context: 'Fix identified bug',
          expectedResult: 'block'
        }
      ];
      
      for (const step of debuggingWorkflow) {
        const result = await runHook({
          tool: step.tool,
          parameters: step.parameters,
          context: step.context
        });
        
        if (step.expectedResult === 'allow') {
          expect(result.exitCode).toBe(0);
        } else {
          expect([1, 2]).toContain(result.exitCode);
        }
      }
    });
  });
  
  describe('Logging and Monitoring', () => {
    test('should provide informative output messages', async () => {
      const input = {
        tool: 'Edit',
        parameters: { file_path: '/src/test.js', old_string: 'a', new_string: 'b' },
        context: 'making code changes'
      };
      
      const result = await runHook(input);
      
      expect([1, 2]).toContain(result.exitCode);
      expect(result.stdout).toBeTruthy();
      
      // Should contain useful information about why it was blocked
      const output = result.stdout.toLowerCase();
      expect(output).toMatch(/(work.*intent|prb.*required|blocked|not.*allowed)/);
    });
    
    test('should handle verbose logging appropriately', async () => {
      const input = {
        tool: 'Read',
        parameters: { file_path: '/test.js' },
        context: 'verbose logging test'
      };
      
      const result = await runHook(input);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toBeTruthy();
    });
  });
});