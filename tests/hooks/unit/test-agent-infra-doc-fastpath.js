#!/usr/bin/env node
const assert = require('assert');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');
const { runTestSuite } = require('../fixtures/test-helpers');

function runHook(command) {
  const hookPath = path.resolve(__dirname, '../../../src/hooks/agent-infrastructure-protection.js');
  const hookInput = {
    tool_name: 'Bash',
    tool_input: { command },
    cwd: '/project'
  };
  const res = spawnSync('node', [hookPath], {
    env: {
      ...process.env,
      CLAUDE_TOOL_INPUT: JSON.stringify(hookInput),
      // Ensure infra protection is active and main-scope bypass is disabled for the test
      ICC_MAIN_SCOPE_AGENT: 'false',
      CLAUDE_DISABLE_MAIN_INFRA_BYPASS: '1',
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
  'allows doc write containing literal markdown backticks': () => {
    const cmd = "printf 'Use `kubectl apply` to deploy' > docs/guide.md";
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'allow');
  },
  'blocks doc write with unquoted command substitution': () => {
    const cmd = 'printf $(kubectl delete pod foo) > docs/guide.md';
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'deny');
  },
  'blocks doc write with double-quoted substitution': () => {
    const cmd = 'printf "$(kubectl delete pod foo)" > docs/guide.md';
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'deny');
  },
  'allows doc write with escaped substitution inside double quotes': () => {
    const cmd = 'printf "\\$(kubectl apply) literal" > docs/guide.md';
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'allow');
  },
  'blocks unquoted heredoc with substitution in body': () => {
    const cmd = "cat <<EOF > docs/guide.md\n$(kubectl delete pod foo)\nEOF";
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'deny');
  },
  'allows single-quoted heredoc even with substitution text': () => {
    const cmd = "cat <<'EOF' > docs/guide.md\n$(kubectl delete pod foo)\nEOF";
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'allow');
  },
  'blocks double-quoted heredoc with substitution in body': () => {
    const cmd = "cat <<\"EOF\" > docs/guide.md\n$(kubectl delete pod foo)\nEOF";
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'deny');
  },
  'blocks double-quoted string containing single-quoted substitution': () => {
    const cmd = 'printf "\'$(kubectl delete pod foo)\'" > docs/guide.md';
    const out = runHook(cmd);
    assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'deny');
  }
};

console.log('\n=== Agent infra doc fast-path ===');
const ok = runTestSuite('agent-infrastructure-protection.js', tests);
process.exit(ok ? 0 : 1);
