#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');
const { getSetting } = require('./lib/config-loader');
const { generateProjectHash, allowOperation, blockOperation } = require('./lib/hook-helpers');

const DEFAULT_STEPS = [
  { name: 'Task', tools: ['Task'] },
  { name: 'Plan', tools: ['Plan'] },
  { name: 'Review Plan', tools: ['Review'] },
  { name: 'Execute', tools: ['Execute'] },
  { name: 'Review Execute', tools: ['Review'] },
  { name: 'Document', tools: ['Document', 'Write', 'Edit'] }
];

function normalizeToolName(tool) {
  return (tool || '').trim().toLowerCase();
}

function loadWorkflowSettings() {
  const enforcement = getSetting('enforcement.workflow', {});
  const enabled = Boolean(enforcement && enforcement.enabled);
  const configuredSteps = Array.isArray(enforcement?.steps) && enforcement.steps.length > 0
    ? enforcement.steps
    : DEFAULT_STEPS;

  const steps = configuredSteps
    .map((step, index) => ({
      index,
      name: step.name || `Step ${index + 1}`,
      tools: (step.tools || []).map(normalizeToolName).filter(Boolean)
    }))
    .filter(step => step.tools.length > 0);

  return { enabled, steps };
}

function getStateDir() {
  if (process.env.ICC_WORKFLOW_STATE_DIR) {
    return path.resolve(process.env.ICC_WORKFLOW_STATE_DIR);
  }
  return path.join(os.homedir(), '.claude', 'workflow-state');
}

function getStatePath(sessionId, hookInput) {
  const hash = generateProjectHash(hookInput);
  const dir = path.join(getStateDir(), hash);
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, `${sessionId}.json`);
}

function loadState(sessionId, hookInput) {
  const statePath = getStatePath(sessionId, hookInput);
  if (!fs.existsSync(statePath)) {
    return { active: false, nextIndex: 0, path: statePath };
  }

  try {
    const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    return {
      active: Boolean(data.active),
      nextIndex: Number.isInteger(data.nextIndex) ? data.nextIndex : 0,
      path: statePath
    };
  } catch (error) {
    return { active: false, nextIndex: 0, path: statePath };
  }
}

function saveState(state) {
  fs.writeFileSync(state.path, JSON.stringify({
    active: state.active,
    nextIndex: state.nextIndex
  }));
}

function resetState(state) {
  state.active = false;
  state.nextIndex = 0;
  saveState(state);
}

function main() {
  const settings = loadWorkflowSettings();
  const { log, hookInput } = initializeHook('workflow-enforcement');

  if (!settings.enabled || settings.steps.length === 0) {
    allowOperation(log, true);
  }

  if (!hookInput || !hookInput.session_id) {
    allowOperation(log, true);
  }

  const toolName = normalizeToolName(hookInput.tool_name || hookInput.tool);
  if (!toolName) {
    allowOperation(log, true);
  }

  const trackedStep = settings.steps.find(step => step.tools.includes(toolName));
  if (!trackedStep) {
    allowOperation(log, true);
  }

  const state = loadState(hookInput.session_id, hookInput);
  const expectedIndex = state.active ? state.nextIndex : 0;
  const expectedStep = settings.steps[expectedIndex];

  if (!state.active && trackedStep.index !== 0) {
    blockOperation(`Workflow enforcement active. Start with the ${settings.steps[0].name} step before running ${trackedStep.name}.`, log);
  }

  if (state.active && trackedStep.index !== expectedIndex) {
    blockOperation(`Workflow enforcement active. Expected ${expectedStep.name} before running ${trackedStep.name}.`, log);
  }

  // Accepted step handling
  if (!state.active && trackedStep.index === 0) {
    state.active = settings.steps.length > 1;
    state.nextIndex = settings.steps.length > 1 ? 1 : 0;
    saveState(state);
    allowOperation(log, true);
  }

  if (state.active && trackedStep.index === expectedIndex) {
    const lastIndex = settings.steps.length - 1;
    if (expectedIndex === lastIndex) {
      resetState(state);
    } else {
      state.nextIndex = expectedIndex + 1;
      saveState(state);
    }
    allowOperation(log, true);
  }
}

try {
  main();
} catch (error) {
  console.error(`[workflow-enforcement] Error: ${error.message}`);
  console.log(JSON.stringify({ continue: true }));
  process.exit(0);
}
