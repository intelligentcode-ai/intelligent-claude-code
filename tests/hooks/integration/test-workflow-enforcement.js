#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const HOOK_PATH = path.join(__dirname, '../../../src/hooks/workflow-enforcement.js');

function createTestProject() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'workflow-enforce-'));
  fs.mkdirSync(path.join(dir, '.icc'), { recursive: true });
  const config = {
    enforcement: {
      workflow: {
        enabled: true,
        steps: [
          { name: 'Task', tools: ['Task'] },
          { name: 'Plan', tools: ['Plan'] },
          { name: 'Review', tools: ['Review'] },
          { name: 'Execute', tools: ['Execute'] },
          { name: 'Document', tools: ['Document'] }
        ]
      }
    }
  };
  fs.writeFileSync(path.join(dir, '.icc', 'config.json'), JSON.stringify(config, null, 2));
  return dir;
}

function runHook(projectDir, toolName, sessionId) {
  const input = {
    tool_name: toolName,
    session_id: sessionId,
    cwd: projectDir,
    tool_input: {}
  };

  const env = {
    ...process.env,
    NODE_ENV: 'test',
    ICC_WORKFLOW_STATE_DIR: path.join(projectDir, '.workflow-state')
  };

  const result = spawnSync('node', [HOOK_PATH], {
    cwd: projectDir,
    env,
    input: JSON.stringify(input),
    encoding: 'utf8'
  });

  const stdout = result.stdout.trim();
  const lines = stdout.split('\n');
  const lastLine = lines[lines.length - 1] || '{}';
  let response;
  try {
    response = JSON.parse(lastLine);
  } catch (error) {
    throw new Error(`Failed to parse hook response: ${stdout}`);
  }

  return { code: result.status, response };
}

(function runTests() {
  const projectDir = createTestProject();
  const sessionId = 'test-session-1';

  const planFirst = runHook(projectDir, 'Plan', sessionId);
  assert.strictEqual(planFirst.code, 2, 'Plan before Task should be blocked');

  const allowedSequence = ['Task', 'Plan', 'Review', 'Execute', 'Document'];
  allowedSequence.forEach((tool, index) => {
    const result = runHook(projectDir, tool, sessionId);
    assert.strictEqual(result.code, 0, `Step ${index + 1} (${tool}) should be allowed`);
  });

  const restart = runHook(projectDir, 'Task', sessionId);
  assert.strictEqual(restart.code, 0, 'Workflow should reset after Document');

  const outOfOrder = runHook(projectDir, 'Execute', sessionId);
  assert.strictEqual(outOfOrder.code, 2, 'Execute before Plan should be blocked in new cycle');

  console.log('✅ Workflow enforcement integration tests passed');
})();
