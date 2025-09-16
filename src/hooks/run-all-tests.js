#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Hook System
 * 
 * Runs all test suites and generates comprehensive reports
 */

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Test configuration
 */
const TEST_CONFIG = {
  timeout: 60000,
  verbose: true,
  coverage: true,
  bail: false
};

/**
 * Execute command and return promise
 */
function execCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('sh', ['-c', command], {
      stdio: 'pipe',
      ...options
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
      if (TEST_CONFIG.verbose) {
        process.stdout.write(data);
      }
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
      if (TEST_CONFIG.verbose) {
        process.stderr.write(data);
      }
    });
    
    child.on('close', (code) => {
      resolve({
        exitCode: code,
        stdout: stdout.trim(),
        stderr: stderr.trim()
      });
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Run Jest test suites
 */
async function runJestTests() {
  console.log('\n🧪 Running Jest Test Suites\n');
  console.log('='.repeat(60));
  
  const testSuites = [
    {
      name: 'Unit Tests',
      command: 'npm run test:unit',
      required: true
    },
    {
      name: 'Integration Tests', 
      command: 'npm run test:integration',
      required: true
    },
    {
      name: 'Performance Tests',
      command: 'npm run test:performance',
      required: false
    }
  ];
  
  const results = {};
  
  for (const suite of testSuites) {
    console.log(`\n🔬 Running ${suite.name}...`);
    
    try {
      const result = await execCommand(suite.command, {
        cwd: __dirname,
        timeout: TEST_CONFIG.timeout
      });
      
      results[suite.name] = {
        passed: result.exitCode === 0,
        exitCode: result.exitCode,
        output: result.stdout,
        error: result.stderr
      };
      
      if (result.exitCode === 0) {
        console.log(`✅ ${suite.name} PASSED`);
      } else {
        console.log(`❌ ${suite.name} FAILED (exit code: ${result.exitCode})`);
        if (suite.required && TEST_CONFIG.bail) {
          throw new Error(`Required test suite failed: ${suite.name}`);
        }
      }
      
    } catch (error) {
      console.log(`❌ ${suite.name} ERROR: ${error.message}`);
      results[suite.name] = {
        passed: false,
        exitCode: -1,
        output: '',
        error: error.message
      };
      
      if (suite.required && TEST_CONFIG.bail) {
        throw error;
      }
    }
  }
  
  return results;
}

/**
 * Run legacy test suites
 */
async function runLegacyTests() {
  console.log('\n🔧 Running Legacy Test Suites\n');
  console.log('='.repeat(60));
  
  const legacyTests = [
    {
      name: 'Intent Classifier Legacy Tests',
      command: 'npm run test:legacy:intent'
    },
    {
      name: 'Config Loader Legacy Tests',
      command: 'npm run test:legacy:config'
    },
    {
      name: 'Hook Integration Legacy Tests',
      command: 'npm run test:legacy'
    }
  ];
  
  const results = {};
  
  for (const test of legacyTests) {
    console.log(`\n🔍 Running ${test.name}...`);
    
    try {
      const result = await execCommand(test.command, {
        cwd: __dirname,
        timeout: TEST_CONFIG.timeout
      });
      
      results[test.name] = {
        passed: result.exitCode === 0,
        exitCode: result.exitCode,
        output: result.stdout,
        error: result.stderr
      };
      
      if (result.exitCode === 0) {
        console.log(`✅ ${test.name} PASSED`);
      } else {
        console.log(`❌ ${test.name} FAILED`);
      }
      
    } catch (error) {
      console.log(`❌ ${test.name} ERROR: ${error.message}`);
      results[test.name] = {
        passed: false,
        exitCode: -1,
        output: '',
        error: error.message
      };
    }
  }
  
  return results;
}

/**
 * Run performance benchmarks
 */
async function runBenchmarks() {
  console.log('\n⚡ Running Performance Benchmarks\n');
  console.log('='.repeat(60));
  
  try {
    const result = await execCommand('npm run benchmark', {
      cwd: __dirname,
      timeout: 120000 // 2 minutes for benchmarks
    });
    
    return {
      passed: result.exitCode === 0,
      exitCode: result.exitCode,
      output: result.stdout,
      error: result.stderr
    };
    
  } catch (error) {
    console.log(`❌ Benchmarks ERROR: ${error.message}`);
    return {
      passed: false,
      exitCode: -1,
      output: '',
      error: error.message
    };
  }
}

/**
 * Generate test coverage report
 */
async function generateCoverageReport() {
  console.log('\n📊 Generating Coverage Report\n');
  console.log('='.repeat(60));
  
  try {
    const result = await execCommand('npm run test:coverage', {
      cwd: __dirname,
      timeout: TEST_CONFIG.timeout
    });
    
    if (result.exitCode === 0) {
      console.log('✅ Coverage report generated successfully');
      
      // Try to display coverage summary
      const coveragePath = path.join(__dirname, 'coverage', 'coverage-summary.json');
      if (fs.existsSync(coveragePath)) {
        const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
        displayCoverageSummary(coverage);
      }
    } else {
      console.log('❌ Coverage report generation failed');
    }
    
    return {
      passed: result.exitCode === 0,
      exitCode: result.exitCode,
      output: result.stdout
    };
    
  } catch (error) {
    console.log(`❌ Coverage ERROR: ${error.message}`);
    return {
      passed: false,
      exitCode: -1,
      error: error.message
    };
  }
}

/**
 * Display coverage summary
 */
function displayCoverageSummary(coverage) {
  console.log('\n📈 Coverage Summary:');
  
  const total = coverage.total;
  
  console.log(`   Lines:      ${total.lines.pct}% (${total.lines.covered}/${total.lines.total})`);
  console.log(`   Functions:  ${total.functions.pct}% (${total.functions.covered}/${total.functions.total})`);
  console.log(`   Branches:   ${total.branches.pct}% (${total.branches.covered}/${total.branches.total})`);
  console.log(`   Statements: ${total.statements.pct}% (${total.statements.covered}/${total.statements.total})`);
  
  const overallScore = (
    total.lines.pct + 
    total.functions.pct + 
    total.branches.pct + 
    total.statements.pct
  ) / 4;
  
  console.log(`\n   Overall Coverage: ${overallScore.toFixed(1)}%`);
  
  if (overallScore >= 90) {
    console.log('   Grade: 🥇 Excellent');
  } else if (overallScore >= 80) {
    console.log('   Grade: 🥈 Good');  
  } else if (overallScore >= 70) {
    console.log('   Grade: 🥉 Acceptable');
  } else {
    console.log('   Grade: ⚠️  Needs Improvement');
  }
}

/**
 * Generate final report
 */
function generateFinalReport(jestResults, legacyResults, benchmarkResults, coverageResults) {
  console.log('\n📋 COMPREHENSIVE TEST REPORT\n');
  console.log('='.repeat(80));
  
  // Jest Tests Summary
  console.log('\n🧪 Jest Test Results:');
  let jestPassed = 0;
  let jestTotal = 0;
  
  Object.entries(jestResults).forEach(([name, result]) => {
    jestTotal++;
    if (result.passed) {
      jestPassed++;
      console.log(`   ✅ ${name}`);
    } else {
      console.log(`   ❌ ${name} (exit code: ${result.exitCode})`);
    }
  });
  
  // Legacy Tests Summary
  console.log('\n🔧 Legacy Test Results:');
  let legacyPassed = 0;
  let legacyTotal = 0;
  
  Object.entries(legacyResults).forEach(([name, result]) => {
    legacyTotal++;
    if (result.passed) {
      legacyPassed++;
      console.log(`   ✅ ${name}`);
    } else {
      console.log(`   ❌ ${name}`);
    }
  });
  
  // Performance Results
  console.log('\n⚡ Performance Results:');
  if (benchmarkResults.passed) {
    console.log('   ✅ Performance benchmarks completed successfully');
  } else {
    console.log('   ❌ Performance benchmarks failed or incomplete');
  }
  
  // Coverage Results
  console.log('\n📊 Coverage Results:');
  if (coverageResults.passed) {
    console.log('   ✅ Coverage report generated successfully');
  } else {
    console.log('   ❌ Coverage report generation failed');
  }
  
  // Overall Summary
  console.log('\n🏆 Overall Summary:');
  const totalPassed = jestPassed + legacyPassed + (benchmarkResults.passed ? 1 : 0);
  const totalTests = jestTotal + legacyTotal + 1;
  const successRate = (totalPassed / totalTests) * 100;
  
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   Passed: ${totalPassed}`);
  console.log(`   Failed: ${totalTests - totalPassed}`);
  console.log(`   Success Rate: ${successRate.toFixed(1)}%`);
  
  if (successRate === 100) {
    console.log('   Status: 🎉 ALL TESTS PASSING!');
  } else if (successRate >= 80) {
    console.log('   Status: ✅ Mostly Passing');
  } else if (successRate >= 60) {
    console.log('   Status: ⚠️  Some Issues');
  } else {
    console.log('   Status: ❌ Major Issues');
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  if (jestPassed < jestTotal) {
    console.log('   - Fix failing Jest test suites for core functionality');
  }
  if (legacyPassed < legacyTotal) {
    console.log('   - Review legacy test failures and update tests if needed');
  }
  if (!benchmarkResults.passed) {
    console.log('   - Investigate performance issues or benchmark failures');
  }
  if (!coverageResults.passed) {
    console.log('   - Fix coverage reporting setup and aim for >90% coverage');
  }
  
  console.log('\n' + '='.repeat(80));
  
  return successRate;
}

/**
 * Main test runner
 */
async function main() {
  console.log('🚀 Starting Comprehensive Test Suite');
  console.log('Hook System Testing Framework');
  console.log('='.repeat(80));
  
  const startTime = Date.now();
  
  try {
    // Check if Jest is available
    try {
      await execCommand('which jest', { timeout: 5000 });
    } catch (error) {
      console.log('⚠️  Jest not found, installing dependencies...');
      await execCommand('npm install', { cwd: __dirname });
    }
    
    // Run all test suites
    const jestResults = await runJestTests();
    const legacyResults = await runLegacyTests();
    const benchmarkResults = await runBenchmarks();
    const coverageResults = TEST_CONFIG.coverage ? await generateCoverageReport() : { passed: true };
    
    const successRate = generateFinalReport(jestResults, legacyResults, benchmarkResults, coverageResults);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n⏱️  Total execution time: ${duration} seconds`);
    
    // Exit with appropriate code
    process.exit(successRate >= 80 ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  runJestTests,
  runLegacyTests,
  runBenchmarks,
  generateCoverageReport
};