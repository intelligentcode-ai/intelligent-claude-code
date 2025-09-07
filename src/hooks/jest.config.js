/** @type {import('jest').Config} */
module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.js',
    'pre-tool-use.js',
    '!lib/**/*.test.js',
    '!tests/**/*.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    './lib/intent-classifier.js': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    './lib/config-loader.js': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  
  // Test setup and teardown
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Test timeout (for performance tests)
  testTimeout: 30000,
  
  // Verbose output
  verbose: true,
  
  // Transform configuration
  transform: {},
  
  // Module paths
  moduleDirectories: ['node_modules', 'lib', '.'],
  
  // Test results processor
  reporters: ['default'],
  
  // Performance monitoring
  detectOpenHandles: true,
  forceExit: true,
  
  // Test sequencing
  maxWorkers: 1 // Run tests sequentially for better performance measurement
};