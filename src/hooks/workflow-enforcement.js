#!/usr/bin/env node

const path = require('path');

const { initializeHook } = require('./lib/logging');
const { getSetting } = require('./lib/config-loader');
const { generateProjectHash, allowOperation, blockOperation } = require('./lib/hook-helpers');
const { loadWorkflowState, saveWorkflowState } = require('./lib/workflow-state');
const { isAgentContext } = require('./lib/marker-detection');

const DEFAULT_WORKFLOW = [
  {
    name: 'TASK',
    type: 'task',
    tools: ['Task'],
    description: 'Main Scope must create an AgentTask before planning.'
  },
  {
    name: 'PLAN',
    type: 'write',
    path_patterns: ['plans/', '-plan.md'],
    description: 'Create or update a plan file inside plans/ before continuing.'
  },
  {
    name: 'REVIEW_PLAN',
    type: 'write',
    path_patterns: ['reviews/plan', 'plan-review'],
    description: 'Capture a review of the plan (reviews/plan/).' 
  },
  {
    name: 'EXECUTE',
    type: 'command',
    tools: ['Bash'],
    description: 'Infrastructure or code execution must happen only after plan review.'
  },
  {
    name: 'REVIEW_EXECUTE',
    type: 'write',
    path_patterns: ['reviews/execute', 'exec-review'],
    description: 'Log a review of the execution results.'
  },
  {
    name: 'DOCUMENT',
    type: 'write',
    path_patterns: ['docs/', 'summaries/'],
    description: 'Document the work in docs/ or summaries/.'
  }
];

const WORKFLOW_CONFIG = getSetting('reviewed_workflow', {});
const WORKFLOW_REQUIRED = WORKFLOW_CONFIG.required === true;
const APPLY_TO_AGENTS = WORKFLOW_CONFIG.apply_to_agents !== false;
const CONFIGURED_STEPS = Array.isArray(WORKFLOW_CONFIG.steps) && WORKFLOW_CONFIG.steps.length > 0
  ? WORKFLOW_CONFIG.steps
  : DEFAULT_WORKFLOW;

function normalizeStep(rawStep, idx) {
  const base = DEFAULT_WORKFLOW[idx] || {};
  return {
    name: rawStep.name || base.name || `STEP_${idx + 1}`,
    type: (rawStep.type || base.type || 'write').toLowerCase(),
    tools: rawStep.tools || base.tools || [],
    path_patterns: rawStep.path_patterns || base.path_patterns || [],
    description: rawStep.description || base.description || ''
  };
}

const WORKFLOW_STEPS = CONFIGURED_STEPS.map(normalizeStep);

function mapAction(tool) {
  if (!tool) return 'other';
  if (tool === 'Task') return 'task';
  if (tool === 'Bash') return 'command';
  if (['Write', 'Edit', 'MultiEdit'].includes(tool)) return 'write';
  return 'other';
}

function matchPath(pattern, filePath) {
  if (!pattern || !filePath) return false;
  const normalizedFile = filePath.toLowerCase();
  if (pattern.startsWith('regex:')) {
    const regex = new RegExp(pattern.slice(6), 'i');
    return regex.test(filePath);
  }
  return normalizedFile.includes(pattern.toLowerCase());
}

function matchesStep(step, action, tool, filePath) {
  switch (step.type) {
    case 'task':
      return action === 'task';
    case 'command': {
      if (action !== 'command') return false;
      if (step.tools && step.tools.length > 0) {
        return step.tools.includes(tool);
      }
      return tool === 'Bash';
    }
    case 'write': {
      if (action !== 'write') return false;
      if (!step.path_patterns || step.path_patterns.length === 0) return true;
      return step.path_patterns.some(pattern => matchPath(pattern, filePath));
    }
    default:
      return false;
  }
}

function advanceState(state, completedIdx) {
  if (typeof state.nextIndex !== 'number') {
    state.nextIndex = 0;
  }
  if (completedIdx === state.nextIndex) {
    state.history = state.history || [];
    state.history.push({ step: WORKFLOW_STEPS[state.nextIndex].name, timestamp: Date.now() });
    state.nextIndex += 1;
    if (state.nextIndex >= WORKFLOW_STEPS.length) {
      state.nextIndex = 0;
    }
  }
}

function blockWorkflow(step, tool, log) {
  const message = step.description
    ? `${step.description}`
    : `Workflow step "${step.name}" is required before running ${tool}.`;
  blockOperation(message, log);
}

function main() {
  const { log, hookInput } = initializeHook('workflow-enforcement');

  if (!WORKFLOW_REQUIRED || WORKFLOW_STEPS.length === 0) {
    return allowOperation(log);
  }

  const projectRoot = hookInput.cwd || process.cwd();
  const sessionId = hookInput.session_id || 'main-session';
  const agentCtx = isAgentContext(projectRoot, sessionId, log);

  if (!APPLY_TO_AGENTS && agentCtx) {
    return allowOperation(log);
  }

  const projectHash = generateProjectHash(hookInput);
  const state = loadWorkflowState(projectHash);
  if (typeof state.nextIndex !== 'number') {
    state.nextIndex = 0;
    saveWorkflowState(projectHash, state);
  }

  const tool = hookInput.tool_name;
  const action = mapAction(tool);
  const filePath = hookInput.tool_input?.file_path ? path.resolve(hookInput.tool_input.file_path) : null;

  // Ignore actions we don't track
  if (action === 'other') {
    return allowOperation(log);
  }

  const matchedIndex = WORKFLOW_STEPS.findIndex(step => matchesStep(step, action, tool, filePath));

  if (matchedIndex === -1) {
    // Action not part of workflow definition, allow
    return allowOperation(log);
  }

  if (matchedIndex > state.nextIndex) {
    return blockWorkflow(WORKFLOW_STEPS[state.nextIndex], tool, log);
  }

  advanceState(state, matchedIndex);
  saveWorkflowState(projectHash, state);
  return allowOperation(log);
}

if (require.main === module) {
  main();
}

module.exports = { main };
