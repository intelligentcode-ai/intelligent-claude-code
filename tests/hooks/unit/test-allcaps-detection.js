#!/usr/bin/env node
const assert = require('assert');
const { isAggressiveAllCaps } = require('../../../src/hooks/lib/allcaps-detection');

const cases = [
  ['README', true],
  ['README-GUIDE', true],
  ['README.2025', true],
  ['CODEX-REVIEW-2025-01-19-X-ROAD-FIXES', true],
  ['CODEX.REVIEW-2025.md', true],
  ['Story-001-overview', false],
  ['api-endpoint', false],
  ['notes', false]
];

cases.forEach(([name, expected]) => {
  assert.strictEqual(
    isAggressiveAllCaps(name),
    expected,
    `${name} should be ${expected ? 'flagged' : 'allowed'}`
  );
});

console.log('✅ ALL-CAPS detection tests passed');
