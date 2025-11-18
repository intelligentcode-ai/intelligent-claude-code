#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');
const os = require('os');
const { runTestSuite } = require('../fixtures/test-helpers');
const { clearCache } = require('../../../src/hooks/lib/config-loader');

function runHook(hookInput, extraEnv = {}, options = {}) {
  const hookPath = path.resolve(__dirname, '../../../src/hooks/pm-constraints-enforcement.js');
  const res = spawnSync('node', [hookPath], {
    env: { ...process.env, ...extraEnv, CLAUDE_TOOL_INPUT: JSON.stringify(hookInput) },
    cwd: options.cwd || process.cwd(),
    encoding: 'utf8'
  });
  if (res.error) throw res.error;
  const out = res.stdout.trim();
  try {
    const parsed = JSON.parse(out);
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
    clearCache();
    const hookInput = {
      hook_event_name: 'PreToolUse',
      tool_name: 'Write',
      tool: 'Write',
      tool_input: { file_path: '/project/xroad-charts-repo/docs/deployment-guide.md' },
      cwd: '/project',
      transcript_path: path.join(os.tmpdir(), 'test-session.jsonl')
    };
    const out = runHook(hookInput, { CLAUDE_PROJECT_DIR: '/project/xroad-charts-repo' });
    assert.strictEqual(out.continue, true);
  },

  'blocks markdown in parent path when allow_parent_allowlist_paths is false': () => {
    clearCache();
    const homeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'home-'));
    const claudeDir = path.join(homeDir, '.claude');
    fs.mkdirSync(claudeDir);
    fs.writeFileSync(
      path.join(claudeDir, 'icc.config.json'),
      JSON.stringify({ enforcement: { allow_parent_allowlist_paths: false, tool_blacklist: { main_scope_only: [] } }, paths: { docs_path: 'docs' } })
    );

    const hookInput = {
      hook_event_name: 'PreToolUse',
      tool_name: 'Write',
      tool: 'Write',
      tool_input: { file_path: '/project/../docs/leak.md' },
      cwd: '/project',
      transcript_path: path.join(os.tmpdir(), 'test-session.jsonl')
    };
    const out = runHook(hookInput, {
      CLAUDE_PROJECT_DIR: '/project/xroad-charts-repo',
      HOME: homeDir
    });
    assert.strictEqual(out.continue, false);
  },

  'allows parent markdown when setting enabled (project config)': () => {
    clearCache();
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pm-allowlist-'));
    const projectDir = path.join(tmpDir, 'proj');
    fs.mkdirSync(projectDir);

    const homeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'home-'));
    const claudeDir = path.join(homeDir, '.claude');
    fs.mkdirSync(claudeDir);

    fs.writeFileSync(
      path.join(claudeDir, 'icc.config.json'),
      JSON.stringify({ enforcement: { allow_parent_allowlist_paths: true, tool_blacklist: { main_scope_only: [] } }, paths: { docs_path: 'docs' } })
    );

    const hookInput = {
      hook_event_name: 'PreToolUse',
      tool_name: 'Task',
      tool: 'Task',
      tool_input: { file_path: path.join(projectDir, '../docs/ok.md') },
      cwd: projectDir,
      transcript_path: path.join(os.tmpdir(), 'test-session.jsonl')
    };

    const out = runHook(
      hookInput,
      { CLAUDE_PROJECT_DIR: projectDir, HOME: homeDir, ALLOW_PARENT_ALLOWLIST_PATHS: 'true' },
      { cwd: projectDir }
    );

    // Debug aid if this ever regresses
    if (out.continue !== true) {
      console.error('allow_parent_allowlist_paths=true output', out);
    }
    assert.strictEqual(out.continue, true);
  }
};

console.log('\n=== PM Constraints markdown allowlist (segment + config) ===');
const ok = runTestSuite('pm-constraints-enforcement.js', tests);
process.exit(ok ? 0 : 1);
