#!/usr/bin/env node
const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');
const os = require('os');
const { runTestSuite } = require('../fixtures/test-helpers');

function runHook(hookInput, extraEnv = {}) {
  const hookPath = path.resolve(__dirname, '../../../src/hooks/pm-constraints-enforcement.js');
  const res = spawnSync('node', [hookPath], {
    env: { ...process.env, ...extraEnv, CLAUDE_TOOL_INPUT: JSON.stringify(hookInput) },
    encoding: 'utf8'
  });
  if (res.error) throw res.error;
  const out = res.stdout.trim();
  try {
    const parsed = JSON.parse(out);
    // Normalize to {continue: boolean} for assertions
    if (parsed.continue === undefined && parsed.hookSpecificOutput) {
      parsed.continue = parsed.hookSpecificOutput.permissionDecision !== 'deny';
    }
    return parsed;
  } catch (e) {
    throw new Error(`Failed to parse hook output: ${out}`);
  }
}

const tests = {
  'allows markdown when any path segment is docs': () => {
    const hookInput = {
      hook_event_name: 'PreToolUse',
      tool_name: 'Write',
      tool_input: { file_path: '/project/xroad-charts-repo/docs/deployment-guide.md' },
      cwd: '/project',
      transcript_path: path.join(os.tmpdir(), 'test-session.jsonl')
    };
    const out = runHook(hookInput, { CLAUDE_PROJECT_DIR: '/project/xroad-charts-repo' });
    assert.strictEqual(out.continue, true);
  },

  'blocks markdown in parent path when allow_parent_allowlist_paths is false': () => {
    const hookInput = {
      hook_event_name: 'PreToolUse',
      tool_name: 'Write',
      tool_input: { file_path: '/project/../docs/leak.md' },
      cwd: '/project',
      transcript_path: path.join(os.tmpdir(), 'test-session.jsonl')
    };
    const out = runHook(hookInput, {
      CLAUDE_PROJECT_DIR: '/project/xroad-charts-repo',
      enforcement: JSON.stringify({ allow_parent_allowlist_paths: false })
    });
    assert.strictEqual(out.continue, false);
  }
};

console.log('\n=== PM Constraints markdown allowlist (segment + config) ===');
const ok = runTestSuite('pm-constraints-enforcement.js', tests);
process.exit(ok ? 0 : 1);
