/**
 * Comprehensive Unit Tests for Intent Classification Engine
 * 
 * Tests classification accuracy, performance, edge cases, and API functionality
 */

const classifier = require('../../lib/intent-classifier');

describe('Intent Classification Engine', () => {
  // Test data
  const testScenarios = global.testUtils.loadFixture('test-scenarios.json');
  
  describe('classifyIntent function', () => {
    describe('Research Intent Classification', () => {
      test.each(testScenarios.research_scenarios)(
        'should correctly classify: $name',
        ({ tool, parameters, context, expected_intent, expected_confidence_min }) => {
          const result = classifier.classifyIntent(tool, parameters, context);
          
          expect(result).toHaveProperty('intent');
          expect(result).toHaveProperty('confidence');
          expect(result).toHaveProperty('timing');
          expect(result).toHaveProperty('scores');
          
          expect(result.intent).toBe(expected_intent);
          expect(result.confidence).toBeGreaterThanOrEqual(expected_confidence_min);
          expect(result.timing).toBeGreaterThan(0);
          expect(result.timing).toBeLessThan(global.TEST_CONFIG.PERFORMANCE_THRESHOLD);
        }
      );
    });
    
    describe('Q&A Intent Classification', () => {
      test.each(testScenarios.qa_scenarios)(
        'should correctly classify: $name',
        ({ tool, parameters, context, expected_intent, expected_confidence_min }) => {
          const result = classifier.classifyIntent(tool, parameters, context);
          
          expect(result.intent).toBe(expected_intent);
          expect(result.confidence).toBeGreaterThanOrEqual(expected_confidence_min);
          expect(result.timing).toBeLessThan(global.TEST_CONFIG.PERFORMANCE_THRESHOLD);
        }
      );
    });
    
    describe('Planning Intent Classification', () => {
      test.each(testScenarios.planning_scenarios)(
        'should correctly classify: $name',
        ({ tool, parameters, context, expected_intent, expected_confidence_min }) => {
          const result = classifier.classifyIntent(tool, parameters, context);
          
          expect(result.intent).toBe(expected_intent);
          expect(result.confidence).toBeGreaterThanOrEqual(expected_confidence_min);
          expect(result.timing).toBeLessThan(global.TEST_CONFIG.PERFORMANCE_THRESHOLD);
        }
      );
    });
    
    describe('Work Intent Classification', () => {
      test.each(testScenarios.work_scenarios)(
        'should correctly classify: $name',
        ({ tool, parameters, context, expected_intent, expected_confidence_min }) => {
          const result = classifier.classifyIntent(tool, parameters, context);
          
          expect(result.intent).toBe(expected_intent);
          expect(result.confidence).toBeGreaterThanOrEqual(expected_confidence_min);
          expect(result.timing).toBeLessThan(global.TEST_CONFIG.PERFORMANCE_THRESHOLD);
        }
      );
    });
    
    describe('Edge Cases', () => {
      test.each(testScenarios.edge_cases)(
        'should handle edge case: $name',
        ({ tool, parameters, context, expected_intent, expected_confidence_min }) => {
          const result = classifier.classifyIntent(tool, parameters, context);
          
          expect(result.intent).toBe(expected_intent);
          expect(result.confidence).toBeGreaterThanOrEqual(expected_confidence_min);
          expect(typeof result.timing).toBe('number');
          expect(result.timing).toBeGreaterThanOrEqual(0);
        }
      );
    });
    
    describe('Error Conditions', () => {
      test.each(testScenarios.error_conditions)(
        'should gracefully handle error: $name',
        ({ tool, parameters, context }) => {
          const result = classifier.classifyIntent(tool, parameters, context);
          
          expect(result).toBeDefined();
          expect(result).toHaveProperty('intent');
          expect(result).toHaveProperty('confidence');
          expect(result).toHaveProperty('timing');
          
          expect(typeof result.intent).toBe('string');
          expect(typeof result.confidence).toBe('number');
          expect(result.confidence).toBeGreaterThanOrEqual(0);
          expect(result.confidence).toBeLessThanOrEqual(1);
          expect(typeof result.timing).toBe('number');
          expect(result.timing).toBeGreaterThanOrEqual(0);
        }
      );
    });
  });
  
  describe('isWorkIntent function', () => {
    const testCases = [
      { 
        classification: { intent: 'work', confidence: 0.8 }, 
        threshold: 0.3, 
        expected: true 
      },
      { 
        classification: { intent: 'work', confidence: 0.2 }, 
        threshold: 0.3, 
        expected: false 
      },
      { 
        classification: { intent: 'research', confidence: 0.9 }, 
        threshold: 0.3, 
        expected: false 
      },
      { 
        classification: { intent: 'work', confidence: 0.5 }, 
        threshold: 0.6, 
        expected: false 
      },
      { 
        classification: null, 
        threshold: 0.3, 
        expected: false 
      },
      { 
        classification: {}, 
        threshold: 0.3, 
        expected: false 
      }
    ];
    
    test.each(testCases)(
      'should return $expected for classification $classification with threshold $threshold',
      ({ classification, threshold, expected }) => {
        const result = classifier.isWorkIntent(classification, threshold);
        expect(result).toBe(expected);
      }
    );
    
    test('should use default threshold of 0.3', () => {
      const classification = { intent: 'work', confidence: 0.4 };
      
      expect(classifier.isWorkIntent(classification)).toBe(true);
      expect(classifier.isWorkIntent({ intent: 'work', confidence: 0.2 })).toBe(false);
    });
  });
  
  describe('isReadOnlyCommand function', () => {
    const readOnlyCommands = [
      'ls -la',
      'cat file.txt',
      'head -10 log.txt',
      'tail -f access.log',
      'grep pattern file.txt',
      'find . -name "*.js"',
      'ps aux',
      'pwd',
      'whoami',
      'date',
      'echo "hello"',
      'wc -l file.txt',
      'sort file.txt',
      'ls | grep pattern'
    ];
    
    const workCommands = [
      'npm install express',
      'git commit -m "message"',
      'rm file.txt',
      'mkdir directory',
      'cp file1.txt file2.txt',
      'mv old.txt new.txt',
      'chmod 755 script.sh',
      'curl -X POST http://api.example.com',
      'wget http://example.com/file.zip',
      'docker run -it ubuntu',
      'make install',
      'echo "hello" > file.txt',
      'ls > output.txt'
    ];
    
    test.each(readOnlyCommands)(
      'should identify "%s" as read-only',
      (command) => {
        expect(classifier.isReadOnlyCommand(command)).toBe(true);
      }
    );
    
    test.each(workCommands)(
      'should identify "%s" as work command',
      (command) => {
        expect(classifier.isReadOnlyCommand(command)).toBe(false);
      }
    );
    
    test('should handle edge cases', () => {
      expect(classifier.isReadOnlyCommand(null)).toBe(true);
      expect(classifier.isReadOnlyCommand(undefined)).toBe(true);
      expect(classifier.isReadOnlyCommand('')).toBe(true);
      expect(classifier.isReadOnlyCommand('   ')).toBe(true);
    });
  });
  
  describe('validateAction function', () => {
    test('should validate research actions as allowed', async () => {
      const result = await classifier.validateAction(
        'Read',
        { file_path: '/project/src/main.js' },
        'examining the main application file'
      );
      
      expect(result).toHaveProperty('decision');
      expect(result).toHaveProperty('intent');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('violations');
      expect(result).toHaveProperty('timing');
      
      expect(result.intent).toBe('research');
      expect(result.decision).toBe('allow');
    }, 10000);
    
    test('should validate work actions as requiring PRB', async () => {
      const result = await classifier.validateAction(
        'Edit',
        { 
          file_path: '/src/auth.js',
          old_string: 'old code',
          new_string: 'new code'
        },
        'implementing authentication fix'
      );
      
      expect(result.intent).toBe('work');
      expect(['require_prb', 'block']).toContain(result.decision);
    }, 10000);
    
    test('should handle validation errors gracefully', async () => {
      const result = await classifier.validateAction(null, null, null);
      
      expect(result).toHaveProperty('decision');
      expect(result).toHaveProperty('intent');
      expect(result.decision).toBeDefined();
      expect(result.intent).toBeDefined();
    }, 10000);
  });
  
  describe('requiresPrbContext function', () => {
    test('should return true for work tools', async () => {
      const result = await classifier.requiresPrbContext('Edit', {
        file_path: '/src/main.js'
      });
      
      expect(result).toBe(true);
    });
    
    test('should return false for research tools with research context', async () => {
      const result = await classifier.requiresPrbContext('Read', {
        file_path: '/docs/api.md'
      });
      
      expect(result).toBe(false);
    });
  });
  
  describe('getEnforcementAction function', () => {
    test('should return enforcement actions for known intents', async () => {
      const researchAction = await classifier.getEnforcementAction('research');
      const workAction = await classifier.getEnforcementAction('work');
      
      expect(typeof researchAction).toBe('string');
      expect(typeof workAction).toBe('string');
      
      expect(['allow', 'warn', 'block', 'require_prb_context']).toContain(researchAction);
      expect(['allow', 'warn', 'block', 'require_prb_context']).toContain(workAction);
    });
    
    test('should handle unknown intents gracefully', async () => {
      const result = await classifier.getEnforcementAction('unknown_intent');
      
      expect(typeof result).toBe('string');
      expect(result).toBe('warn'); // Default fallback
    });
  });
  
  describe('Constants Export', () => {
    test('should export required constants', () => {
      expect(classifier.WORK_VERBS).toBeDefined();
      expect(classifier.RESEARCH_TOOLS).toBeDefined();
      expect(classifier.WORK_TOOLS).toBeDefined();
      expect(classifier.QA_PATTERNS).toBeDefined();
      expect(classifier.PLANNING_PATTERNS).toBeDefined();
      expect(classifier.WORK_INTENT_PATTERNS).toBeDefined();
      expect(classifier.WORK_FILE_PATTERNS).toBeDefined();
      
      expect(classifier.WORK_VERBS).toBeInstanceOf(Set);
      expect(classifier.RESEARCH_TOOLS).toBeInstanceOf(Set);
      expect(classifier.WORK_TOOLS).toBeInstanceOf(Set);
      expect(Array.isArray(classifier.QA_PATTERNS)).toBe(true);
      expect(Array.isArray(classifier.PLANNING_PATTERNS)).toBe(true);
      expect(Array.isArray(classifier.WORK_INTENT_PATTERNS)).toBe(true);
      expect(Array.isArray(classifier.WORK_FILE_PATTERNS)).toBe(true);
    });
    
    test('should have work verbs populated', () => {
      expect(classifier.WORK_VERBS.size).toBeGreaterThan(10);
      expect(classifier.WORK_VERBS.has('implement')).toBe(true);
      expect(classifier.WORK_VERBS.has('fix')).toBe(true);
      expect(classifier.WORK_VERBS.has('create')).toBe(true);
    });
    
    test('should have tool categorizations', () => {
      expect(classifier.RESEARCH_TOOLS.has('Read')).toBe(true);
      expect(classifier.RESEARCH_TOOLS.has('Grep')).toBe(true);
      expect(classifier.WORK_TOOLS.has('Edit')).toBe(true);
      expect(classifier.WORK_TOOLS.has('Write')).toBe(true);
    });
  });
  
  describe('Performance Requirements', () => {
    test('should meet performance targets', () => {
      const iterations = 100;
      const timings = [];
      
      for (let i = 0; i < iterations; i++) {
        const result = classifier.classifyIntent(
          'Edit',
          { file_path: '/src/complex-system.js' },
          'Implement complex authentication system with OAuth, JWT, and role-based access control'
        );
        
        timings.push(result.timing);
      }
      
      const avgTiming = timings.reduce((sum, t) => sum + t, 0) / iterations;
      const maxTiming = Math.max(...timings);
      
      expect(avgTiming).toBeLessThan(5); // Average under 5ms
      expect(maxTiming).toBeLessThan(15); // Max under 15ms
    });
  });
});