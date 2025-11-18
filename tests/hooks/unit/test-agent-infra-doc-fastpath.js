#!/usr/bin/env node
const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');
const { runTestSuite } = require('../fixtures/test-helpers');

function runHook(command) {
  const hookPath = path.resolve(__dirname, '../../../src/hooks/agent-infrastructure-protection.js');
  const hookInput = {
    hook_event_name: 'PreToolUse',
    tool_name: 'Bash',
    tool_input: { command },
    cwd: '/tmp',
    transcript_path: '/tmp/test-session.jsonl'
  };
  const res = spawnSync('node', [hookPath], {
    env: {
      ...process.env,
      CLAUDE_TOOL_INPUT: JSON.stringify(hookInput)
    },
    encoding: 'utf8'
  });
  if (res.error) throw res.error;
  const out = res.stdout.trim();
  try {
    return JSON.parse(out);
  } catch (e) {
    throw new Error(`Failed to parse hook output: ${out}`);
  }
}

const tests = {
  'doc heredoc with infra keywords but no trailing commands is allowed': () => {
    const cmd = "cat > docs/central.md << 'EOF'\nkubectl apply -f something.yaml\nEOF";
    const output = runHook(cmd);
    assert.strictEqual(output.hookSpecificOutput.permissionDecision, 'allow');
  },

  'doc heredoc with trailing command is blocked': () => {
    const cmd = "cat > docs/central.md << 'EOF'\nkubectl apply -f something.yaml\nEOF\nkubectl delete ns prod";
    const output = runHook(cmd);
    assert.strictEqual(output.hookSpecificOutput.permissionDecision, 'deny');
  }
};

console.log('\n=== Agent Infrastructure Protection: doc fast-path ===');
const ok = runTestSuite('agent-infrastructure-protection.js', tests);
process.exit(ok ? 0 : 1);
