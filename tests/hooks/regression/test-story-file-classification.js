#!/usr/bin/env node

/**
 * Regression Tests: Story File Classification (BUG-002)
 *
 * Tests that STORY-*.md, BUG-*.md, EPIC-*.md files are NEVER blocked as summary files,
 * regardless of their content or the directory they're being written to.
 *
 * Root Cause: summary-validation.js was checking keywords BEFORE filename patterns,
 * causing legitimate work items to be blocked as "summary files".
 */

const path = require('path');
const { isSummaryFile } = require('../../../src/hooks/lib/summary-validation');

const PROJECT_ROOT = '/test/project';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log('\n=== Regression Tests: Story File Classification (BUG-002) ===\n');

// ============================================================================
// TIER 1: Work Item Pattern Tests (HIGHEST PRIORITY)
// ============================================================================

console.log('--- TIER 1: Work Item Patterns (Always Allow) ---\n');

// The bug: STORY-003-configuration-*.md was blocked because "configuration" keyword matched
assert(
  !isSummaryFile('STORY-003-configuration-externalization-2025-11-09.md', PROJECT_ROOT),
  'STORY-003-configuration-*.md NOT classified as summary (BUG-002 fix)'
);

assert(
  !isSummaryFile('STORY-001-user-authentication-2025-11-09.md', PROJECT_ROOT),
  'STORY-001 NOT classified as summary'
);

assert(
  !isSummaryFile('BUG-001-update-hook-permissions-2025-11-09.md', PROJECT_ROOT),
  'BUG-001-update-*.md NOT classified as summary (has "update" keyword)'
);

assert(
  !isSummaryFile('BUG-002-status-reporting-fix-2025-11-09.md', PROJECT_ROOT),
  'BUG-002-status-*.md NOT classified as summary (has "status" keyword)'
);

assert(
  !isSummaryFile('EPIC-001-deployment-automation-2025-11-09.md', PROJECT_ROOT),
  'EPIC-001-deployment-*.md NOT classified as summary (has "deployment" keyword)'
);

// ============================================================================
// TIER 2: Location-Based Tests (Absolute Path Resolution)
// ============================================================================

console.log('\n--- TIER 2: Location-Based Validation (Absolute Paths) ---\n');

// Test with absolute paths (simulating different cwd contexts)
assert(
  !isSummaryFile('/test/project/stories/STORY-003-configuration-externalization-2025-11-09.md', PROJECT_ROOT),
  'STORY-003 in stories/ with absolute path NOT classified as summary'
);

assert(
  !isSummaryFile('/test/project/bugs/BUG-001-update-hook-permissions-2025-11-09.md', PROJECT_ROOT),
  'BUG-001 in bugs/ with absolute path NOT classified as summary'
);

assert(
  !isSummaryFile('/test/project/docs/configuration-guide.md', PROJECT_ROOT),
  'configuration-guide.md in docs/ NOT classified as summary (documentation)'
);

assert(
  !isSummaryFile('/test/project/src/config/deployment-config.js', PROJECT_ROOT),
  'deployment-config.js in src/ NOT classified as summary (source code)'
);

assert(
  !isSummaryFile('/test/project/tests/integration/status-report-test.js', PROJECT_ROOT),
  'status-report-test.js in tests/ NOT classified as summary (test file)'
);

// ============================================================================
// TIER 3: Root Directory Special Files
// ============================================================================

console.log('\n--- TIER 3: Root Directory Special Files ---\n');

assert(
  !isSummaryFile('README.md', PROJECT_ROOT),
  'README.md in root NOT classified as summary (special file)'
);

assert(
  !isSummaryFile('CHANGELOG.md', PROJECT_ROOT),
  'CHANGELOG.md in root NOT classified as summary (special file)'
);

assert(
  !isSummaryFile('VERSION', PROJECT_ROOT),
  'VERSION in root NOT classified as summary (special file)'
);

// ============================================================================
// TIER 4: Keyword Heuristics (ONLY Root Directory Files)
// ============================================================================

console.log('\n--- TIER 4: Keyword Heuristics (Root Files Only) ---\n');

// These SHOULD be classified as summaries (in root, match keywords)
assert(
  isSummaryFile('deployment-summary.md', PROJECT_ROOT),
  'deployment-summary.md in root IS classified as summary'
);

assert(
  isSummaryFile('status-report.md', PROJECT_ROOT),
  'status-report.md in root IS classified as summary'
);

assert(
  isSummaryFile('post-mortem-analysis.md', PROJECT_ROOT),
  'post-mortem-analysis.md in root IS classified as summary'
);

// These should NOT be classified as summaries (subdirectory files)
assert(
  !isSummaryFile('docs/deployment-guide.md', PROJECT_ROOT),
  'deployment-guide.md in docs/ NOT classified as summary (subdirectory)'
);

assert(
  !isSummaryFile('memory/debugging/status-investigation.md', PROJECT_ROOT),
  'status-investigation.md in memory/ NOT classified as summary (subdirectory)'
);

// ============================================================================
// Edge Cases: CWD Variations
// ============================================================================

console.log('\n--- Edge Cases: Different CWD Contexts ---\n');

// Simulate user being in stories/ directory writing STORY-003
assert(
  !isSummaryFile('stories/STORY-003-configuration-externalization-2025-11-09.md', PROJECT_ROOT),
  'STORY-003 from stories/ cwd NOT classified as summary (relative path)'
);

// Simulate user in root directory writing to stories/
assert(
  !isSummaryFile('stories/STORY-003-configuration-externalization-2025-11-09.md', PROJECT_ROOT),
  'STORY-003 to stories/ from root cwd NOT classified as summary'
);

// ============================================================================
// Regression Prevention: Keyword Patterns
// ============================================================================

console.log('\n--- Regression Prevention: Removed Problematic Keywords ---\n');

// These keywords were removed from summaryPatterns because they're too broad
assert(
  !isSummaryFile('docs/configuration-standards.md', PROJECT_ROOT),
  'configuration-*.md in docs/ NOT blocked (keyword removed from patterns)'
);

assert(
  !isSummaryFile('docs/system-update-guide.md', PROJECT_ROOT),
  'update-*.md in docs/ NOT blocked (keyword removed from patterns)'
);

assert(
  !isSummaryFile('docs/status-monitoring.md', PROJECT_ROOT),
  'status-*.md in docs/ NOT blocked (keyword removed from patterns)'
);

assert(
  !isSummaryFile('docs/troubleshooting-guide.md', PROJECT_ROOT),
  'troubleshoot-*.md in docs/ NOT blocked (keyword removed from patterns)'
);

// ============================================================================
// Summary
// ============================================================================

console.log('\n=== All Regression Tests Passed ===\n');
console.log('BUG-002 Fix Verified:');
console.log('✅ STORY-*.md files NEVER classified as summaries');
console.log('✅ BUG-*.md files NEVER classified as summaries');
console.log('✅ EPIC-*.md files NEVER classified as summaries');
console.log('✅ Files in allowed directories (stories/, bugs/, docs/, etc.) NOT blocked');
console.log('✅ Absolute path resolution works correctly (no cwd bugs)');
console.log('✅ Keyword heuristics only apply to root directory files');
console.log('✅ Overly-broad keywords removed from patterns');
console.log('✅ User can create STORY-003-configuration-*.md successfully');
console.log('');
