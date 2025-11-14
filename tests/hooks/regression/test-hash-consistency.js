#!/usr/bin/env node

/**
 * Hash Consistency Regression Test
 *
 * PREVENTS: Manual MD5 hash generation instead of using generateProjectHash()
 * STORY: All hooks MUST use centralized generateProjectHash() from hook-helpers.js
 *
 * This test prevents regression of BUG-001 where hooks used manual hash generation,
 * causing inconsistent hashing between hooks and breaking agent marker detection.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function log(message, color = '') {
  console.log(`${color}${message}${RESET}`);
}

function error(message) {
  log(`❌ ${message}`, RED);
}

function success(message) {
  log(`✅ ${message}`, GREEN);
}

function warning(message) {
  log(`⚠️  ${message}`, YELLOW);
}

/**
 * Find all hook files that should use generateProjectHash
 */
function findHookFiles() {
  const hooksDir = path.join(__dirname, '../../../src/hooks');
  const files = fs.readdirSync(hooksDir);

  // Filter for .js files excluding lib/ directory
  return files
    .filter(f => f.endsWith('.js') && !f.startsWith('test-'))
    .map(f => path.join(hooksDir, f));
}

/**
 * Check if a file imports generateProjectHash from hook-helpers
 */
function importsGenerateProjectHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for various import patterns
  const importPatterns = [
    /const\s+\{[^}]*generateProjectHash[^}]*\}\s*=\s*require\(['"]\.\/lib\/hook-helpers['"]\)/,
    /const\s+\{\s*generateProjectHash\s*\}\s*=\s*require\(['"]\.\/lib\/hook-helpers['"]\)/,
    /require\(['"]\.\/lib\/hook-helpers['"]\)\.generateProjectHash/
  ];

  return importPatterns.some(pattern => pattern.test(content));
}

/**
 * Check if a file uses manual crypto hash generation
 */
function usesManualHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Pattern for manual MD5 hash generation
  const manualHashPattern = /crypto\.createHash\(['"]md5['"]\)\.update\([^)]+\)\.digest\(['"]hex['"]\)\.substring\(0,\s*8\)/;

  return manualHashPattern.test(content);
}

/**
 * Check if a file uses generateProjectHash function call
 */
function usesGenerateProjectHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Pattern for generateProjectHash() usage
  const usagePattern = /generateProjectHash\s*\(/;

  return usagePattern.test(content);
}

/**
 * Get list of hooks that need project hash (interact with agent markers)
 */
function getHashRequiredHooks() {
  // Hooks that interact with agent marker files and need consistent hashing
  return [
    'agent-marker.js',
    'context-injection.js',
    'main-scope-enforcement.js',
    'pm-constraints-enforcement.js',
    'session-start-dummy.js',
    'stop.js',
    'subagent-stop.js',
    'summary-file-enforcement.js',
    'user-prompt-submit.js'
  ];
}

/**
 * Main test execution
 */
function runTests() {
  log('\n=== Hash Consistency Regression Test ===\n');

  const hookFiles = findHookFiles();
  const hashRequiredHooks = getHashRequiredHooks();
  let failures = 0;
  let warnings = 0;

  log(`Found ${hookFiles.length} hook files to check\n`);

  for (const filePath of hookFiles) {
    const fileName = path.basename(filePath);
    const requiresHash = hashRequiredHooks.includes(fileName);

    if (!requiresHash) {
      continue; // Skip hooks that don't need hash
    }

    log(`\nChecking ${fileName}:`);

    // Check 1: Must import generateProjectHash
    const hasImport = importsGenerateProjectHash(filePath);
    if (!hasImport) {
      error(`  Missing import of generateProjectHash from hook-helpers`);
      failures++;
      continue;
    }
    success(`  Imports generateProjectHash correctly`);

    // Check 2: Must NOT use manual hash generation
    const hasManualHash = usesManualHash(filePath);
    if (hasManualHash) {
      error(`  Uses manual crypto.createHash() instead of generateProjectHash()`);
      failures++;
      continue;
    }
    success(`  Does NOT use manual hash generation`);

    // Check 3: Must use generateProjectHash function
    const usesFunction = usesGenerateProjectHash(filePath);
    if (!usesFunction) {
      warning(`  Imports generateProjectHash but doesn't seem to use it`);
      warnings++;
    } else {
      success(`  Uses generateProjectHash() function`);
    }
  }

  // Summary
  log('\n' + '='.repeat(50));
  if (failures === 0 && warnings === 0) {
    success('\n✅ ALL TESTS PASSED - Hash consistency maintained!\n');
    process.exit(0);
  } else if (failures === 0) {
    warning(`\n⚠️  ALL CRITICAL TESTS PASSED (${warnings} warnings)\n`);
    process.exit(0);
  } else {
    error(`\n❌ TESTS FAILED: ${failures} critical issues, ${warnings} warnings\n`);
    error('CRITICAL: Some hooks use manual hash generation instead of generateProjectHash()');
    error('This will cause inconsistent hashing and break agent marker detection!\n');
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
