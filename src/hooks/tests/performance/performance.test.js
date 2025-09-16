/**
 * Performance Tests for Jest Runner
 * 
 * Tests performance characteristics using Jest framework
 */

const { 
  benchmarkClassification,
  benchmarkConfigLoading,
  benchmarkFullValidation,
  BENCHMARK_CONFIG 
} = require('./benchmark');

describe('Performance Tests', () => {
  // Increase timeout for performance tests
  jest.setTimeout(60000);
  
  describe('Classification Performance', () => {
    test('should meet performance targets for classification', async () => {
      // Reduce iterations for Jest to avoid timeout
      const originalIterations = BENCHMARK_CONFIG.ITERATIONS;
      BENCHMARK_CONFIG.ITERATIONS = 100;
      
      try {
        const results = await benchmarkClassification();
        
        // Check that all scenarios meet performance targets
        Object.entries(results).forEach(([scenarioName, stats]) => {
          expect(stats.mean).toBeLessThan(BENCHMARK_CONFIG.TARGET_AVG_MS);
          expect(stats.p95).toBeLessThan(BENCHMARK_CONFIG.TARGET_P95_MS);
          expect(stats.p99).toBeLessThan(BENCHMARK_CONFIG.TARGET_P99_MS);
        });
        
      } finally {
        BENCHMARK_CONFIG.ITERATIONS = originalIterations;
      }
    });
    
    test('should have consistent performance across iterations', async () => {
      const classifier = require('../../lib/intent-classifier');
      const timings = [];
      
      // Run 50 iterations to check consistency
      for (let i = 0; i < 50; i++) {
        const result = classifier.classifyIntent(
          'Edit',
          { file_path: '/src/test.js' },
          'implement new feature'
        );
        timings.push(result.timing);
      }
      
      // Calculate coefficient of variation (should be low for consistency)
      const mean = timings.reduce((a, b) => a + b, 0) / timings.length;
      const variance = timings.reduce((sum, timing) => sum + Math.pow(timing - mean, 2), 0) / timings.length;
      const stdDev = Math.sqrt(variance);
      const coefficientOfVariation = stdDev / mean;
      
      expect(mean).toBeLessThan(BENCHMARK_CONFIG.TARGET_AVG_MS);
      expect(coefficientOfVariation).toBeLessThan(0.5); // Less than 50% variation
    });
  });
  
  describe('Configuration Loading Performance', () => {
    test('should meet performance targets for config loading', async () => {
      const originalIterations = BENCHMARK_CONFIG.ITERATIONS;
      BENCHMARK_CONFIG.ITERATIONS = 50;
      
      try {
        const results = await benchmarkConfigLoading();
        
        // Cold load should be reasonable
        expect(results['Cold Load (First Time)'].mean).toBeLessThan(100); // 100ms
        
        // Warm load should be very fast
        expect(results['Warm Load (Cached)'].mean).toBeLessThan(5); // 5ms
        
        // Cache should provide significant improvement
        const improvement = (results['Cold Load (First Time)'].mean - results['Warm Load (Cached)'].mean) / results['Cold Load (First Time)'].mean;
        expect(improvement).toBeGreaterThan(0.5); // At least 50% improvement
        
      } finally {
        BENCHMARK_CONFIG.ITERATIONS = originalIterations;
      }
    });
  });
  
  describe('Full Validation Performance', () => {
    test('should meet performance targets for full validation', async () => {
      const originalIterations = BENCHMARK_CONFIG.ITERATIONS;
      BENCHMARK_CONFIG.ITERATIONS = 50;
      
      try {
        const results = await benchmarkFullValidation();
        
        // All validation scenarios should meet performance targets
        Object.entries(results).forEach(([scenarioName, stats]) => {
          expect(stats.mean).toBeLessThan(BENCHMARK_CONFIG.TARGET_AVG_MS * 3); // Allow more time for full validation
          expect(stats.p99).toBeLessThan(50); // P99 should be under 50ms
        });
        
      } finally {
        BENCHMARK_CONFIG.ITERATIONS = originalIterations;
      }
    });
  });
  
  describe('Memory Performance', () => {
    test('should not have significant memory leaks', () => {
      const classifier = require('../../lib/intent-classifier');
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Run many operations
      for (let i = 0; i < 1000; i++) {
        classifier.classifyIntent(
          'Edit',
          { file_path: `/test${i}.js` },
          `context ${i} with work intent`
        );
      }
      
      const afterMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = (afterMemory - initialMemory) / 1024 / 1024; // MB
      
      // Should not increase memory significantly
      expect(memoryIncrease).toBeLessThan(10); // Less than 10MB for 1000 operations
    });
  });
  
  describe('Concurrent Performance', () => {
    test('should handle concurrent requests efficiently', async () => {
      const classifier = require('../../lib/intent-classifier');
      
      const concurrentRequests = 10;
      const requests = Array.from({ length: concurrentRequests }, (_, i) => ({
        tool: 'Read',
        parameters: { file_path: `/test${i}.js` },
        context: `concurrent request ${i}`
      }));
      
      const startTime = Date.now();
      
      const promises = requests.map(async (request) => {
        return classifier.classifyIntent(request.tool, request.parameters, request.context);
      });
      
      const results = await Promise.all(promises);
      const totalTime = Date.now() - startTime;
      
      // All requests should complete
      expect(results).toHaveLength(concurrentRequests);
      results.forEach(result => {
        expect(result.intent).toBeDefined();
        expect(result.confidence).toBeDefined();
      });
      
      // Total time should be reasonable for concurrent processing
      expect(totalTime).toBeLessThan(500); // 500ms for 10 concurrent requests
    });
  });
  
  describe('Edge Case Performance', () => {
    test('should handle large inputs efficiently', () => {
      const classifier = require('../../lib/intent-classifier');
      
      // Create large input
      const largeContext = 'context with many words '.repeat(1000); // ~25KB
      const largeParameters = {
        file_path: '/very/long/path/with/many/directories/and/file/names/test.js',
        content: 'content '.repeat(500)
      };
      
      const result = classifier.classifyIntent('Edit', largeParameters, largeContext);
      
      expect(result.intent).toBeDefined();
      expect(result.confidence).toBeDefined();
      expect(result.timing).toBeLessThan(BENCHMARK_CONFIG.TARGET_AVG_MS * 2); // Allow 2x time for large input
    });
    
    test('should handle malformed inputs gracefully', () => {
      const classifier = require('../../lib/intent-classifier');
      
      const malformedInputs = [
        { tool: null, parameters: {}, context: 'test' },
        { tool: '', parameters: undefined, context: null },
        { tool: 'Edit', parameters: { file_path: null }, context: undefined }
      ];
      
      malformedInputs.forEach(input => {
        const startTime = Date.now();
        const result = classifier.classifyIntent(input.tool, input.parameters, input.context);
        const endTime = Date.now();
        
        expect(result).toBeDefined();
        expect(result.intent).toBeDefined();
        expect(endTime - startTime).toBeLessThan(100); // Should handle errors quickly
      });
    });
  });
  
  describe('Stress Testing', () => {
    test('should maintain performance under sustained load', () => {
      const classifier = require('../../lib/intent-classifier');
      const timings = [];
      const iterations = 500;
      
      for (let i = 0; i < iterations; i++) {
        const result = classifier.classifyIntent(
          'Edit',
          { file_path: `/stress-test-${i}.js` },
          `stress test iteration ${i} with work intent patterns`
        );
        timings.push(result.timing);
        
        // Check if performance degrades over time
        if (i > 0 && i % 100 === 0) {
          const recentTimings = timings.slice(-100);
          const avgRecentTiming = recentTimings.reduce((a, b) => a + b, 0) / recentTimings.length;
          expect(avgRecentTiming).toBeLessThan(BENCHMARK_CONFIG.TARGET_AVG_MS * 2);
        }
      }
      
      // Overall performance should still be good
      const avgTiming = timings.reduce((a, b) => a + b, 0) / timings.length;
      expect(avgTiming).toBeLessThan(BENCHMARK_CONFIG.TARGET_AVG_MS);
    });
  });
});