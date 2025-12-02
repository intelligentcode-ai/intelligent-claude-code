#!/usr/bin/env node

/**
 * Directory Routing Integration Tests
 *
 * Tests directory-enforcement.js routing logic:
 * - Story file routing (stories/)
 * - Bug file routing (stories/)
 * - Memory file routing (memory/) - STORY-007 fix validation
 * - Summary file routing (summaries/)
 * - Root file routing (project root)
 * - Edge cases and suggestion system
 */

const path = require('path');
const {
  getCorrectDirectory,
  isCorrectDirectory,
  getSuggestedPath
} = require('../../../src/hooks/lib/directory-enforcement');

const PROJECT_ROOT = '/Users/karsten/test-project';

// Test utilities
let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, message) {
  testsRun++;
  if (actual === expected) {
    testsPassed++;
    console.log(`✓ ${message}`);
  } else {
    testsFailed++;
    console.error(`✗ ${message}`);
    console.error(`  Expected: ${expected}`);
    console.error(`  Actual:   ${actual}`);
  }
}

function assertTrue(condition, message) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`✓ ${message}`);
  } else {
    testsFailed++;
    console.error(`✗ ${message}`);
  }
}

console.log('=== Directory Routing Integration Tests ===\n');

// ============================================================================
// Category 1: Story File Routing (4 tests)
// ============================================================================
console.log('--- Story File Routing ---');

assertEqual(
  getCorrectDirectory('STORY-001-test.md', PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'stories'),
  'STORY-*.md files route to stories/'
);

assertEqual(
  getCorrectDirectory('STORY-123-complex-feature-2025-11-06.md', PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'stories'),
  'STORY files with dates route to stories/'
);

assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'stories/STORY-001-test.md'), PROJECT_ROOT),
  'STORY files in stories/ directory are valid'
);

assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'stories/drafts/STORY-002-draft.md'), PROJECT_ROOT),
  'STORY files in stories/drafts/ subdirectory are valid'
);

// ============================================================================
// Category 2: Bug File Routing (3 tests)
// SPECIFICATION: BUG files go to bugs/ directory
// CURRENT BUG: Code routes to stories/ instead
// ============================================================================
console.log('\n--- Bug File Routing (SPECIFICATION: bugs/) ---');

// SPECIFICATION: BUG files go to bugs/ directory
// CURRENT BUG: Code returns stories/ instead
// TEST STATUS: Will fail until bug fixed
assertEqual(
  getCorrectDirectory('BUG-001-critical-issue.md', PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'bugs'),
  'SPEC: BUG-*.md files SHOULD route to bugs/'
);

// SPECIFICATION: BUG files go to bugs/ directory
// CURRENT BUG: Code validates stories/ as correct
// TEST STATUS: Will fail until bug fixed
assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'bugs/BUG-001-issue.md'), PROJECT_ROOT),
  'SPEC: BUG files in bugs/ directory SHOULD be valid'
);

// SPECIFICATION: BUG files already in bugs/ should stay
// CURRENT BUG: Code suggests moving to stories/
// TEST STATUS: Will fail until bug fixed
assertEqual(
  getSuggestedPath(path.join(PROJECT_ROOT, 'bugs/BUG-001-issue.md'), PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'bugs/BUG-001-issue.md'),
  'SPEC: BUG files already in bugs/ SHOULD stay there'
);

// ============================================================================
// Category 3: Memory File Routing (5 tests) - STORY-007 fix validation
// ============================================================================
console.log('\n--- Memory File Routing (STORY-007 Validation) ---');

// This is the actual routing logic - getCorrectDirectory returns summaries/
// because there's no memory-specific pattern in the current implementation
// The fix should add memory pattern detection
const memoryFilename = 'implementation-auth.md';
const expectedMemoryDir = path.join(PROJECT_ROOT, 'summaries'); // Current behavior

assertEqual(
  getCorrectDirectory(memoryFilename, PROJECT_ROOT),
  expectedMemoryDir,
  'Memory files currently route based on default logic'
);

// Test that files in memory/ subdirectories are allowed (STORY-007 fix)
const memoryImplPath = path.join(PROJECT_ROOT, 'memory/implementation/auth.md');
const memoryDebugPath = path.join(PROJECT_ROOT, 'memory/debugging/error-patterns.md');
const memoryRootPath = path.join(PROJECT_ROOT, 'memory/auth-patterns.md');

// STORY-007 fix: memory paths should be valid
assertTrue(
  isCorrectDirectory(memoryImplPath, PROJECT_ROOT),
  'memory/implementation/ files should be allowed (STORY-007 fix)'
);

assertTrue(
  isCorrectDirectory(memoryDebugPath, PROJECT_ROOT),
  'memory/debugging/ files should be allowed (STORY-007 fix)'
);

assertTrue(
  isCorrectDirectory(memoryRootPath, PROJECT_ROOT),
  'memory/ root files should be allowed (STORY-007 fix)'
);

// Ensure structured docs aren’t routed into memory/
const misroutedStoryInMemory = path.join(PROJECT_ROOT, 'memory/STORY-999-wrong-place.md');
const misroutedBugInMemory = path.join(PROJECT_ROOT, 'memory/BUG-999-wrong-place.md');
assertTrue(
  !isCorrectDirectory(misroutedStoryInMemory, PROJECT_ROOT),
  'STORY files should not be allowed under memory/'
);
assertTrue(
  !isCorrectDirectory(misroutedBugInMemory, PROJECT_ROOT),
  'BUG files should not be allowed under memory/'
);

// Test suggestion system for misplaced memory files
const memoryInSummaries = path.join(PROJECT_ROOT, 'summaries/memory-pattern.md');
const suggestedMemoryPath = getSuggestedPath(memoryInSummaries, PROJECT_ROOT);
// Current implementation would suggest summaries/ since there's no memory detection
assertEqual(
  suggestedMemoryPath,
  path.join(PROJECT_ROOT, 'summaries/memory-pattern.md'),
  'Memory-pattern files in summaries/ - current suggestion behavior'
);

// ============================================================================
// Category 4: Summary File Routing (3 tests)
// ============================================================================
console.log('\n--- Summary File Routing ---');

assertEqual(
  getCorrectDirectory('hook-validation-summary-2025-11-05.md', PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'summaries'),
  'Summary files route to summaries/ by default'
);

assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'summaries/test-summary.md'), PROJECT_ROOT),
  'Files in summaries/ directory are valid'
);

assertEqual(
  getCorrectDirectory('random-notes.md', PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'summaries'),
  'Non-pattern .md files default to summaries/'
);

// ============================================================================
// Category 5: Root File Routing (4 tests)
// ============================================================================
console.log('\n--- Root File Routing ---');

assertEqual(
  getCorrectDirectory('VERSION', PROJECT_ROOT),
  PROJECT_ROOT,
  'VERSION file routes to project root'
);

assertEqual(
  getCorrectDirectory('CLAUDE.md', PROJECT_ROOT),
  PROJECT_ROOT,
  'CLAUDE.md routes to project root'
);

assertEqual(
  getCorrectDirectory('package.json', PROJECT_ROOT),
  PROJECT_ROOT,
  'package.json routes to project root'
);

assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'VERSION'), PROJECT_ROOT),
  'Root files in project root are valid'
);

// ============================================================================
// Category 6: EPIC File Routing (2 tests)
// ============================================================================
console.log('\n--- EPIC File Routing ---');

assertEqual(
  getCorrectDirectory('EPIC-001-major-initiative.md', PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'stories'),
  'EPIC-*.md files route to stories/'
);

assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'stories/EPIC-001-initiative.md'), PROJECT_ROOT),
  'EPIC files in stories/ directory are valid'
);

// ============================================================================
// Category 7: Edge Cases (5 tests)
// ============================================================================
console.log('\n--- Edge Cases ---');

assertEqual(
  getCorrectDirectory('STORY-001-test.md', PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'stories'),
  'Pattern matching works with full filename'
);

assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'stories/team-a/STORY-001-test.md'), PROJECT_ROOT),
  'Deep subdirectories within stories/ are valid'
);

// Non-.md files should pass directory check
assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'anywhere/file.txt'), PROJECT_ROOT),
  'Non-.md files exempt from directory enforcement'
);

assertTrue(
  isCorrectDirectory(path.join(PROJECT_ROOT, 'src/code.js'), PROJECT_ROOT),
  'Source code files exempt from enforcement'
);

assertEqual(
  getCorrectDirectory('config.md', PROJECT_ROOT),
  PROJECT_ROOT,
  'config.md whitelisted to project root'
);

// ============================================================================
// Category 8: Suggestion System (4 tests)
// ============================================================================
console.log('\n--- Suggestion System ---');

assertEqual(
  getSuggestedPath(path.join(PROJECT_ROOT, 'wrong/STORY-001-test.md'), PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'stories/STORY-001-test.md'),
  'Wrong directory gets correct suggestion for STORY'
);

// SPECIFICATION: BUG files belong in bugs/
// CURRENT BUG: Code suggests stories/
// TEST STATUS: Will fail until bug fixed
assertEqual(
  getSuggestedPath(path.join(PROJECT_ROOT, 'stories/BUG-001-issue.md'), PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'bugs/BUG-001-issue.md'),
  'SPEC: BUG files in stories/ SHOULD get bugs/ suggestion'
);

assertEqual(
  getSuggestedPath(path.join(PROJECT_ROOT, 'docs/VERSION'), PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'VERSION'),
  'Root files in wrong directory get root suggestion'
);

assertEqual(
  getSuggestedPath(path.join(PROJECT_ROOT, 'root/summary-test.md'), PROJECT_ROOT),
  path.join(PROJECT_ROOT, 'summaries/summary-test.md'),
  'Generic .md files get summaries/ suggestion'
);

// ============================================================================
// Test Summary
// ============================================================================
console.log('\n=== Test Summary ===');
console.log(`Total Tests: ${testsRun}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✓ All directory routing integration tests passed!');
  process.exit(0);
} else {
  console.error(`\n✗ ${testsFailed} test(s) failed`);
  process.exit(1);
}
