#!/usr/bin/env node
const assert = require('assert');
const { isAggressiveAllCaps } = require('../../../src/hooks/lib/allcaps-detection');

const cases = [
  { name: 'README', expected: true },
  { name: 'README-GUIDE', expected: true },
  { name: 'CODEX-REVIEW-2025-01-19-X-ROAD-FIXES', expected: true },
  { name: 'CODEX-REVIEW-2025-01-19-X-Road-Fixes', expected: true },
  { name: 'API-Endpoint', expected: false },
  { name: 'Story-001-overview', expected: false },
  { name: 'notes', expected: false }
];

cases.forEach(({ name, expected }) => {
  assert.strictEqual(
    isAggressiveAllCaps(name),
    expected,
    `${name} should be ${expected ? 'treated as' : 'ignored as'} ALL-CAPS`
  );
});

console.log('✅ allcaps detection tests passed');
