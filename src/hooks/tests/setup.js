/**
 * Test setup and configuration
 * Runs before all test suites
 */

const path = require('path');
const fs = require('fs');

// Global test configuration
global.TEST_CONFIG = {
  TIMEOUT: 5000,
  PERFORMANCE_THRESHOLD: 10, // milliseconds
  COVERAGE_THRESHOLD: 90,
  
  // Test data paths
  FIXTURES_DIR: path.join(__dirname, 'fixtures'),
  TEST_CONFIG_PATH: path.join(__dirname, 'fixtures', 'test-config.json'),
  
  // Test environment
  NODE_ENV: 'test'
};

// Set environment variables for testing
process.env.NODE_ENV = 'test';
process.env.HOOK_DEBUG_MODE = 'false';
process.env.HOOK_STRICT_MODE = 'true';

// Global test utilities
global.testUtils = {
  /**
   * Create a mock tool invocation
   */
  createMockInvocation(tool, parameters = {}, context = '') {
    return { tool, parameters, context };
  },
  
  /**
   * Wait for a specific duration
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  /**
   * Load test fixture
   */
  loadFixture(filename) {
    const fixturePath = path.join(global.TEST_CONFIG.FIXTURES_DIR, filename);
    if (!fs.existsSync(fixturePath)) {
      throw new Error(`Fixture file not found: ${filename}`);
    }
    
    const content = fs.readFileSync(fixturePath, 'utf8');
    
    // Parse JSON fixtures automatically
    if (filename.endsWith('.json')) {
      return JSON.parse(content);
    }
    
    return content;
  },
  
  /**
   * Generate random test data
   */
  randomString(length = 10) {
    return Math.random().toString(36).substring(2, length + 2);
  },
  
  /**
   * Measure execution time
   */
  async measureTime(fn) {
    const start = process.hrtime.bigint();
    const result = await fn();
    const end = process.hrtime.bigint();
    const timeMs = Number(end - start) / 1_000_000;
    
    return { result, timeMs };
  }
};

// Console override for testing (capture logs)
const originalConsole = { ...console };
global.testLogs = [];

beforeEach(() => {
  global.testLogs = [];
  
  // Override console methods during tests
  console.log = (...args) => {
    global.testLogs.push({ type: 'log', args });
    originalConsole.log(...args);
  };
  
  console.error = (...args) => {
    global.testLogs.push({ type: 'error', args });
    originalConsole.error(...args);
  };
  
  console.warn = (...args) => {
    global.testLogs.push({ type: 'warn', args });
    originalConsole.warn(...args);
  };
});

afterEach(() => {
  // Restore console methods
  console.log = originalConsole.log;
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
});

// Handle test cleanup
afterAll(() => {
  // Cleanup any test artifacts
  const testArtifacts = [
    path.join(__dirname, '..', 'test-temp'),
    path.join(__dirname, '..', 'coverage', 'tmp')
  ];
  
  testArtifacts.forEach(artifactPath => {
    if (fs.existsSync(artifactPath)) {
      fs.rmSync(artifactPath, { recursive: true, force: true });
    }
  });
});