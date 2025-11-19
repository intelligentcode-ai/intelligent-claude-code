#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const hookPath = path.resolve(__dirname, '../../src/hooks/workflow-enforcement.js');

function runWorkflowHook({ tool, filePath, cwd, env }) {
  const input = {
    tool_name: tool,
    tool_input: filePath ? { file_path: filePath } : {},
    cwd,
    session_id: 'session-review'
  };
  const res = spawnSync('node', [hookPath], {
    env: {
      ...process.env,
      ...env,
      CLAUDE_TOOL_INPUT: JSON.stringify(input)
    },
    encoding: 'utf8'
  });
  if (res.error) throw res.error;
  return JSON.parse(res.stdout.trim());
}

(function run() {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'icc-workflow-home-'));
  const configDir = path.join(tmpHome, '.claude');
  fs.mkdirSync(configDir);
  const config = {
    reviewed_workflow: {
      required: true,
      apply_to_agents: true
    }
  };
  fs.writeFileSync(path.join(configDir, 'icc.config.json'), JSON.stringify(config, null, 2));

  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'icc-workflow-proj-'));

  const env = {
    HOME: tmpHome,
    CLAUDE_PROJECT_DIR: projectDir
  };

  // Step 1: Task must run first
  let response = runWorkflowHook({ tool: 'Task', cwd: projectDir, env });
  assert.strictEqual(response.continue, true);

  // Writing docs before plan should block
  response = runWorkflowHook({ tool: 'Write', filePath: path.join(projectDir, 'docs/start.md'), cwd: projectDir, env });
  assert.strictEqual(response.continue, false);

  // PLAN write
  response = runWorkflowHook({ tool: 'Write', filePath: path.join(projectDir, 'plans/FEATURE-1-plan.md'), cwd: projectDir, env });
  assert.strictEqual(response.continue, true);

  // PLAN review
  response = runWorkflowHook({ tool: 'Write', filePath: path.join(projectDir, 'reviews/plan/FEATURE-1-review.md'), cwd: projectDir, env });
  assert.strictEqual(response.continue, true);

  // EXECUTE (Bash)
  response = runWorkflowHook({ tool: 'Bash', cwd: projectDir, env });
  assert.strictEqual(response.continue, true);

  // EXECUTE review
  response = runWorkflowHook({ tool: 'Write', filePath: path.join(projectDir, 'reviews/execute/FEATURE-1.md'), cwd: projectDir, env });
  assert.strictEqual(response.continue, true);

  // DOCUMENT
  response = runWorkflowHook({ tool: 'Write', filePath: path.join(projectDir, 'docs/FEATURE-1-summary.md'), cwd: projectDir, env });
  assert.strictEqual(response.continue, true);

  // After completing workflow, docs again should require new Task
  response = runWorkflowHook({ tool: 'Write', filePath: path.join(projectDir, 'docs/FEATURE-1-followup.md'), cwd: projectDir, env });
  assert.strictEqual(response.continue, false);

  console.log('✅ Workflow enforcement integration test passed');
})();
