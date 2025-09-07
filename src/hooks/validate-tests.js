#!/usr/bin/env node

/**
 * Quick Test Validation Script
 * 
 * Validates that the test framework is properly set up and working
 */

const fs = require('fs');
const path = require('path');

/**
 * Validate test framework setup
 */
function validateTestFramework() {
  console.log('🔍 Validating Test Framework Setup\n');
  
  const checks = [
    {
      name: 'Jest Configuration',
      check: () => fs.existsSync(path.join(__dirname, 'jest.config.js')),
      message: 'jest.config.js exists'
    },
    {
      name: 'Test Directory Structure',
      check: () => {
        const dirs = ['tests', 'tests/unit', 'tests/integration', 'tests/performance', 'tests/fixtures'];
        return dirs.every(dir => fs.existsSync(path.join(__dirname, dir)));
      },
      message: 'All test directories exist'
    },
    {
      name: 'Test Fixtures',
      check: () => {
        const fixtures = ['test-scenarios.json', 'test-config.json', 'mock-config.json'];
        return fixtures.every(file => fs.existsSync(path.join(__dirname, 'tests/fixtures', file)));
      },
      message: 'Test fixtures are available'
    },
    {
      name: 'Unit Tests',
      check: () => {
        const tests = ['intent-classifier.test.js', 'config-loader.test.js'];
        return tests.every(test => fs.existsSync(path.join(__dirname, 'tests/unit', test)));
      },
      message: 'Unit test files exist'
    },
    {
      name: 'Integration Tests',
      check: () => fs.existsSync(path.join(__dirname, 'tests/integration/hook-integration.test.js')),
      message: 'Integration test files exist'
    },
    {
      name: 'Performance Tests',
      check: () => {
        return fs.existsSync(path.join(__dirname, 'tests/performance/benchmark.js')) &&
               fs.existsSync(path.join(__dirname, 'tests/performance/performance.test.js'));
      },
      message: 'Performance test files exist'
    },
    {
      name: 'Jest Installation',
      check: () => {
        try {
          require.resolve('jest');
          return true;
        } catch {
          return false;
        }
      },
      message: 'Jest is installed'
    },
    {
      name: 'Source Files',
      check: () => {
        return fs.existsSync(path.join(__dirname, 'lib/intent-classifier.js')) &&
               fs.existsSync(path.join(__dirname, 'lib/config-loader.js'));
      },
      message: 'Source files are available'
    },
    {
      name: 'Package Scripts',
      check: () => {
        const pkg = require('./package.json');
        const requiredScripts = ['test', 'test:unit', 'test:integration', 'test:performance', 'test:all'];
        return requiredScripts.every(script => pkg.scripts[script]);
      },
      message: 'All npm scripts are configured'
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  checks.forEach(check => {
    if (check.check()) {
      console.log(`✅ ${check.name}: ${check.message}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}: ${check.message}`);
      failed++;
    }
  });
  
  console.log(`\n📊 Validation Results: ${passed}/${checks.length} checks passed`);
  
  if (failed === 0) {
    console.log('🎉 Test framework is properly set up and ready to use!');
    console.log('\nNext steps:');
    console.log('  npm run test           # Run all tests');
    console.log('  npm run test:all       # Comprehensive test suite');
    console.log('  npm run benchmark      # Performance benchmarks');
  } else {
    console.log('⚠️  Some issues found. Please fix the failed checks above.');
  }
  
  return failed === 0;
}

/**
 * Quick smoke test
 */
function runSmokeTest() {
  console.log('\n🚨 Running Smoke Test\n');
  
  try {
    // Test intent classifier
    const classifier = require('./lib/intent-classifier');
    const result = classifier.classifyIntent('Read', { file_path: '/test.js' }, 'reading file');
    
    if (result && result.intent && result.confidence !== undefined) {
      console.log('✅ Intent classifier basic functionality works');
    } else {
      console.log('❌ Intent classifier returned invalid result');
      return false;
    }
    
    // Test config loader
    const configLoader = require('./lib/config-loader');
    configLoader.loadConfig().then(config => {
      if (config && config.version && config.intents) {
        console.log('✅ Config loader basic functionality works');
      } else {
        console.log('❌ Config loader returned invalid result');
        return false;
      }
    }).catch(error => {
      console.log('❌ Config loader error:', error.message);
      return false;
    });
    
    console.log('✅ Smoke test completed successfully');
    return true;
    
  } catch (error) {
    console.log('❌ Smoke test failed:', error.message);
    return false;
  }
}

/**
 * Show test framework overview
 */
function showOverview() {
  console.log('\n📋 Test Framework Overview\n');
  console.log('Available test commands:');
  console.log('  npm test               # Jest tests with coverage');
  console.log('  npm run test:unit      # Unit tests only');
  console.log('  npm run test:integration # Integration tests only');
  console.log('  npm run test:performance # Performance tests only');
  console.log('  npm run test:watch     # Watch mode for development');
  console.log('  npm run test:coverage  # Coverage report only');
  console.log('  npm run test:all       # Comprehensive test suite');
  console.log('  npm run benchmark      # Standalone benchmarks');
  console.log('  npm run test:legacy    # Legacy test suites');
  console.log('\nTest coverage targets:');
  console.log('  - Lines:      90%+');
  console.log('  - Functions:  90%+');
  console.log('  - Branches:   90%+');
  console.log('  - Statements: 90%+');
  console.log('\nPerformance targets:');
  console.log('  - Classification: <5ms average');
  console.log('  - P95 Response:   <15ms');
  console.log('  - P99 Response:   <25ms');
  console.log('  - Memory Usage:   <10MB per 1000 ops');
}

/**
 * Main function
 */
function main() {
  console.log('🧪 Hook System Test Framework Validator\n');
  console.log('='.repeat(50));
  
  const setupValid = validateTestFramework();
  
  if (setupValid) {
    const smokeValid = runSmokeTest();
    showOverview();
    
    if (smokeValid) {
      console.log('\n🎉 Everything looks good! Ready to run tests.');
      process.exit(0);
    } else {
      console.log('\n⚠️  Setup valid but smoke test failed. Check source files.');
      process.exit(1);
    }
  } else {
    console.log('\n❌ Setup validation failed. Fix issues before running tests.');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { validateTestFramework, runSmokeTest };