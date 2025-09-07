/**
 * Performance Benchmark Tests for Hook System
 * 
 * Measures performance characteristics and establishes benchmarks
 */

const classifier = require('../../lib/intent-classifier');
const configLoader = require('../../lib/config-loader');

// Benchmark configuration
const BENCHMARK_CONFIG = {
  ITERATIONS: 1000,
  WARMUP_ITERATIONS: 100,
  TARGET_AVG_MS: 5,
  TARGET_P95_MS: 15,
  TARGET_P99_MS: 25
};

/**
 * Statistical analysis helper
 */
function analyzeTimings(timings) {
  timings.sort((a, b) => a - b);
  
  const sum = timings.reduce((a, b) => a + b, 0);
  const mean = sum / timings.length;
  const median = timings[Math.floor(timings.length / 2)];
  const p95 = timings[Math.floor(timings.length * 0.95)];
  const p99 = timings[Math.floor(timings.length * 0.99)];
  const min = timings[0];
  const max = timings[timings.length - 1];
  
  return { mean, median, p95, p99, min, max };
}

/**
 * Run classification benchmarks
 */
async function benchmarkClassification() {
  console.log('\n🚀 Running Classification Performance Benchmarks\n');
  
  const testScenarios = [
    {
      name: 'Simple Research Classification',
      tool: 'Read',
      parameters: { file_path: '/project/src/main.js' },
      context: 'reading main application file'
    },
    {
      name: 'Complex Work Classification',
      tool: 'Edit',
      parameters: { 
        file_path: '/src/auth/authentication.js',
        old_string: 'old implementation',
        new_string: 'new implementation with OAuth, JWT, session management'
      },
      context: 'implementing complex authentication system with multiple integrations'
    },
    {
      name: 'Q&A with Question Patterns',
      tool: 'Read',
      parameters: { file_path: '/docs/api.md' },
      context: 'What are the main API endpoints and how do they handle authentication?'
    },
    {
      name: 'Planning with Role Mentions',
      tool: 'Write',
      parameters: { file_path: '/prbs/user-system.prb.yaml' },
      context: '@PM create comprehensive PRB for user management system with @Architect input'
    },
    {
      name: 'Large Context Processing',
      tool: 'Grep',
      parameters: { pattern: 'function.*auth' },
      context: 'Search through comprehensive authentication implementation across multiple microservices with detailed logging, error handling, session management, OAuth integration, JWT token validation, role-based access control, and security middleware'.repeat(10)
    }
  ];
  
  const results = {};
  
  for (const scenario of testScenarios) {
    console.log(`⏱️  Benchmarking: ${scenario.name}`);
    
    // Warmup
    for (let i = 0; i < BENCHMARK_CONFIG.WARMUP_ITERATIONS; i++) {
      classifier.classifyIntent(scenario.tool, scenario.parameters, scenario.context);
    }
    
    // Actual benchmark
    const timings = [];
    for (let i = 0; i < BENCHMARK_CONFIG.ITERATIONS; i++) {
      const result = classifier.classifyIntent(scenario.tool, scenario.parameters, scenario.context);
      timings.push(result.timing);
    }
    
    const stats = analyzeTimings(timings);
    results[scenario.name] = stats;
    
    console.log(`   Mean: ${stats.mean.toFixed(3)}ms`);
    console.log(`   Median: ${stats.median.toFixed(3)}ms`);
    console.log(`   P95: ${stats.p95.toFixed(3)}ms`);
    console.log(`   P99: ${stats.p99.toFixed(3)}ms`);
    console.log(`   Range: ${stats.min.toFixed(3)}ms - ${stats.max.toFixed(3)}ms`);
    
    // Performance assertions
    const meetsTarget = stats.mean < BENCHMARK_CONFIG.TARGET_AVG_MS && 
                       stats.p95 < BENCHMARK_CONFIG.TARGET_P95_MS;
    console.log(`   Status: ${meetsTarget ? '✅ PASS' : '❌ FAIL'}`);
    console.log();
  }
  
  return results;
}

/**
 * Benchmark configuration loading
 */
async function benchmarkConfigLoading() {
  console.log('\n🚀 Running Configuration Loading Benchmarks\n');
  
  const scenarios = [
    {
      name: 'Cold Load (First Time)',
      forceReload: true
    },
    {
      name: 'Warm Load (Cached)',
      forceReload: false
    }
  ];
  
  const results = {};
  
  for (const scenario of scenarios) {
    console.log(`⏱️  Benchmarking: ${scenario.name}`);
    
    const timings = [];
    
    for (let i = 0; i < BENCHMARK_CONFIG.ITERATIONS; i++) {
      const startTime = process.hrtime.bigint();
      await configLoader.loadConfig(scenario.forceReload);
      const endTime = process.hrtime.bigint();
      
      const timeMs = Number(endTime - startTime) / 1_000_000;
      timings.push(timeMs);
    }
    
    const stats = analyzeTimings(timings);
    results[scenario.name] = stats;
    
    console.log(`   Mean: ${stats.mean.toFixed(3)}ms`);
    console.log(`   Median: ${stats.median.toFixed(3)}ms`);
    console.log(`   P95: ${stats.p95.toFixed(3)}ms`);
    console.log(`   P99: ${stats.p99.toFixed(3)}ms`);
    console.log(`   Range: ${stats.min.toFixed(3)}ms - ${stats.max.toFixed(3)}ms`);
    console.log();
  }
  
  return results;
}

/**
 * Benchmark full validation pipeline
 */
async function benchmarkFullValidation() {
  console.log('\n🚀 Running Full Validation Pipeline Benchmarks\n');
  
  const testCases = [
    {
      name: 'Research Tool Validation',
      tool: 'Read',
      parameters: { file_path: '/project/src/main.js' },
      context: 'examining the main application structure'
    },
    {
      name: 'Work Tool Validation',
      tool: 'Edit',
      parameters: { 
        file_path: '/src/auth.js',
        old_string: 'old code',
        new_string: 'new code'
      },
      context: 'fixing authentication bug'
    },
    {
      name: 'Complex Bash Command Validation',
      tool: 'Bash',
      parameters: { 
        command: 'find /project -name "*.js" -exec grep -l "auth" {} \\;' 
      },
      context: 'finding all authentication-related files'
    }
  ];
  
  const results = {};
  
  for (const testCase of testCases) {
    console.log(`⏱️  Benchmarking: ${testCase.name}`);
    
    // Warmup
    for (let i = 0; i < BENCHMARK_CONFIG.WARMUP_ITERATIONS; i++) {
      try {
        await classifier.validateAction(testCase.tool, testCase.parameters, testCase.context);
      } catch (error) {
        // Ignore warmup errors
      }
    }
    
    const timings = [];
    
    for (let i = 0; i < BENCHMARK_CONFIG.ITERATIONS; i++) {
      const startTime = process.hrtime.bigint();
      
      try {
        await classifier.validateAction(testCase.tool, testCase.parameters, testCase.context);
      } catch (error) {
        // Include error cases in timing
      }
      
      const endTime = process.hrtime.bigint();
      const timeMs = Number(endTime - startTime) / 1_000_000;
      timings.push(timeMs);
    }
    
    const stats = analyzeTimings(timings);
    results[testCase.name] = stats;
    
    console.log(`   Mean: ${stats.mean.toFixed(3)}ms`);
    console.log(`   Median: ${stats.median.toFixed(3)}ms`);
    console.log(`   P95: ${stats.p95.toFixed(3)}ms`);
    console.log(`   P99: ${stats.p99.toFixed(3)}ms`);
    console.log(`   Range: ${stats.min.toFixed(3)}ms - ${stats.max.toFixed(3)}ms`);
    console.log();
  }
  
  return results;
}

/**
 * Memory usage benchmark
 */
function benchmarkMemoryUsage() {
  console.log('\n🚀 Running Memory Usage Benchmarks\n');
  
  const initialMemory = process.memoryUsage();
  console.log('Initial Memory Usage:');
  console.log(`   RSS: ${(initialMemory.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Used: ${(initialMemory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Total: ${(initialMemory.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log();
  
  // Run many classifications to test memory leaks
  console.log('Running 10,000 classifications...');
  for (let i = 0; i < 10000; i++) {
    classifier.classifyIntent(
      'Edit',
      { file_path: `/test/file${i}.js` },
      `context for iteration ${i} with various work intent patterns`
    );
  }
  
  const afterMemory = process.memoryUsage();
  console.log('Memory Usage After 10,000 Classifications:');
  console.log(`   RSS: ${(afterMemory.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Used: ${(afterMemory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Total: ${(afterMemory.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log();
  
  const memoryIncrease = afterMemory.heapUsed - initialMemory.heapUsed;
  console.log(`Memory Increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`);
  
  // Force garbage collection if available
  if (global.gc) {
    console.log('Running garbage collection...');
    global.gc();
    
    const gcMemory = process.memoryUsage();
    console.log('Memory Usage After GC:');
    console.log(`   RSS: ${(gcMemory.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Heap Used: ${(gcMemory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Heap Total: ${(gcMemory.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  }
  
  return {
    initial: initialMemory,
    after: afterMemory,
    increase: memoryIncrease
  };
}

/**
 * Generate performance report
 */
function generateReport(classificationResults, configResults, validationResults, memoryResults) {
  console.log('\n📊 PERFORMANCE BENCHMARK REPORT\n');
  console.log('='.repeat(60));
  
  // Classification Performance Summary
  console.log('\n🎯 Classification Performance Summary:');
  const allClassificationTimes = Object.values(classificationResults).map(r => r.mean);
  const avgClassificationTime = allClassificationTimes.reduce((a, b) => a + b, 0) / allClassificationTimes.length;
  const maxClassificationTime = Math.max(...allClassificationTimes);
  
  console.log(`   Average Classification Time: ${avgClassificationTime.toFixed(3)}ms`);
  console.log(`   Maximum Classification Time: ${maxClassificationTime.toFixed(3)}ms`);
  console.log(`   Target Met: ${avgClassificationTime < BENCHMARK_CONFIG.TARGET_AVG_MS ? '✅ YES' : '❌ NO'}`);
  
  // Configuration Performance Summary
  console.log('\n⚙️  Configuration Performance Summary:');
  if (configResults['Cold Load (First Time)'] && configResults['Warm Load (Cached)']) {
    const coldLoad = configResults['Cold Load (First Time)'].mean;
    const warmLoad = configResults['Warm Load (Cached)'].mean;
    const cacheImprovement = ((coldLoad - warmLoad) / coldLoad) * 100;
    
    console.log(`   Cold Load Time: ${coldLoad.toFixed(3)}ms`);
    console.log(`   Warm Load Time: ${warmLoad.toFixed(3)}ms`);
    console.log(`   Cache Improvement: ${cacheImprovement.toFixed(1)}%`);
  }
  
  // Validation Performance Summary
  console.log('\n🔍 Validation Performance Summary:');
  const allValidationTimes = Object.values(validationResults).map(r => r.mean);
  const avgValidationTime = allValidationTimes.reduce((a, b) => a + b, 0) / allValidationTimes.length;
  
  console.log(`   Average Validation Time: ${avgValidationTime.toFixed(3)}ms`);
  console.log(`   Target Met: ${avgValidationTime < BENCHMARK_CONFIG.TARGET_AVG_MS * 2 ? '✅ YES' : '❌ NO'}`);
  
  // Memory Performance Summary
  console.log('\n💾 Memory Performance Summary:');
  const memoryIncreaseMB = memoryResults.increase / 1024 / 1024;
  console.log(`   Memory Increase (10,000 operations): ${memoryIncreaseMB.toFixed(2)} MB`);
  console.log(`   Memory per Operation: ${(memoryIncreaseMB * 1024 / 10000).toFixed(3)} KB`);
  console.log(`   Memory Leak Risk: ${memoryIncreaseMB > 100 ? '⚠️  HIGH' : memoryIncreaseMB > 50 ? '⚠️  MEDIUM' : '✅ LOW'}`);
  
  // Overall Assessment
  console.log('\n🏆 Overall Performance Assessment:');
  const performanceScore = calculatePerformanceScore({
    classificationTime: avgClassificationTime,
    validationTime: avgValidationTime,
    memoryIncrease: memoryIncreaseMB
  });
  
  console.log(`   Performance Score: ${performanceScore}/100`);
  console.log(`   Grade: ${getPerformanceGrade(performanceScore)}`);
  
  // Recommendations
  console.log('\n💡 Performance Recommendations:');
  if (avgClassificationTime > BENCHMARK_CONFIG.TARGET_AVG_MS) {
    console.log('   - Optimize classification algorithm for better performance');
  }
  if (memoryIncreaseMB > 50) {
    console.log('   - Investigate potential memory leaks in classification or caching');
  }
  if (avgValidationTime > BENCHMARK_CONFIG.TARGET_AVG_MS * 2) {
    console.log('   - Consider caching validation results or optimizing config access');
  }
  
  console.log('\n' + '='.repeat(60));
}

/**
 * Calculate overall performance score
 */
function calculatePerformanceScore({ classificationTime, validationTime, memoryIncrease }) {
  let score = 100;
  
  // Classification time penalty (0-40 points)
  if (classificationTime > BENCHMARK_CONFIG.TARGET_AVG_MS) {
    score -= Math.min(40, (classificationTime - BENCHMARK_CONFIG.TARGET_AVG_MS) * 8);
  }
  
  // Validation time penalty (0-30 points)
  if (validationTime > BENCHMARK_CONFIG.TARGET_AVG_MS * 2) {
    score -= Math.min(30, (validationTime - BENCHMARK_CONFIG.TARGET_AVG_MS * 2) * 3);
  }
  
  // Memory increase penalty (0-30 points)
  if (memoryIncrease > 10) {
    score -= Math.min(30, (memoryIncrease - 10) * 2);
  }
  
  return Math.max(0, Math.round(score));
}

/**
 * Get performance grade
 */
function getPerformanceGrade(score) {
  if (score >= 90) return '🥇 A+ (Excellent)';
  if (score >= 80) return '🥈 A (Very Good)';
  if (score >= 70) return '🥉 B (Good)';
  if (score >= 60) return '📊 C (Acceptable)';
  return '⚠️  D (Needs Improvement)';
}

/**
 * Main benchmark runner
 */
async function runAllBenchmarks() {
  console.log('🏁 Starting Performance Benchmarks');
  console.log(`Configuration: ${BENCHMARK_CONFIG.ITERATIONS} iterations, ${BENCHMARK_CONFIG.WARMUP_ITERATIONS} warmup`);
  
  try {
    const classificationResults = await benchmarkClassification();
    const configResults = await benchmarkConfigLoading();
    const validationResults = await benchmarkFullValidation();
    const memoryResults = benchmarkMemoryUsage();
    
    generateReport(classificationResults, configResults, validationResults, memoryResults);
    
  } catch (error) {
    console.error('❌ Benchmark failed:', error);
    process.exit(1);
  }
}

// Run benchmarks if this file is executed directly
if (require.main === module) {
  runAllBenchmarks();
}

module.exports = {
  runAllBenchmarks,
  benchmarkClassification,
  benchmarkConfigLoading,
  benchmarkFullValidation,
  benchmarkMemoryUsage,
  BENCHMARK_CONFIG
};