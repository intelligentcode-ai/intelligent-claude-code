/**
 * Test Scenario Builders
 * Common test scenarios for hook testing
 */

const { createMockHookInput } = require('./mock-hook-inputs');

// Path normalization test scenarios
const pathScenarios = [
  {
    name: 'Trailing slash',
    input1: { cwd: '/path/to/project/' },
    input2: { cwd: '/path/to/project' },
    shouldMatch: true
  },
  {
    name: 'Relative vs absolute',
    input1: { cwd: '../project' },
    input2: { cwd: '/absolute/path/project' },
    shouldMatch: false // Until we resolve relative paths
  },
  {
    name: 'Subdirectory',
    input1: { cwd: '/path/to/project' },
    input2: { cwd: '/path/to/project/subdir' },
    shouldMatch: false
  },
  {
    name: 'Identical paths',
    input1: { cwd: '/path/to/project' },
    input2: { cwd: '/path/to/project' },
    shouldMatch: true
  }
];

// Command validation test scenarios
const commandScenarios = [
  // Allowed commands
  { command: 'git status', shouldAllow: true },
  { command: 'ls -la', shouldAllow: true },
  { command: 'cd /path && git status', shouldAllow: true },

  // Blocked commands
  { command: 'npm install', shouldAllow: false },
  { command: 'docker run', shouldAllow: false },
  { command: 'ssh user@host', shouldAllow: false },

  // Edge cases
  { command: 'cd /path && npm install', shouldAllow: false },
  { command: 'git status | grep modified', shouldAllow: true }
];

// Directory routing test scenarios
const directoryScenarios = [
  { file: 'STORY-001-test.md', expectedDir: 'stories/' },
  { file: 'BUG-001-test.md', expectedDir: 'stories/' },
  { file: 'EPIC-001-test.md', expectedDir: 'stories/' },
  { file: 'memory/debugging/pattern.md', expectedDir: 'memory/' },
  { file: 'docs/architecture.md', expectedDir: 'docs/' },
  { file: 'VERSION', expectedDir: 'root' },
  { file: 'CLAUDE.md', expectedDir: 'root' },
  { file: 'random-file.md', expectedDir: 'summaries/' }
];

module.exports = {
  pathScenarios,
  commandScenarios,
  directoryScenarios
};
