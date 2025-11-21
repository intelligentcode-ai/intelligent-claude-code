const fs = require('fs');
const path = require('path');
const os = require('os');

function ensureWorkflowDir() {
  const dir = path.join(os.homedir(), '.claude', 'workflow');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function getStateFile(projectHash) {
  const dir = ensureWorkflowDir();
  return path.join(dir, `${projectHash}.json`);
}

function loadWorkflowState(projectHash) {
  const stateFile = getStateFile(projectHash);
  if (!fs.existsSync(stateFile)) {
    return { currentStep: null, history: [] };
  }
  try {
    const data = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    if (!data.history) {
      data.history = [];
    }
    return data;
  } catch (_) {
    return { currentStep: null, history: [] };
  }
}

function saveWorkflowState(projectHash, state) {
  const stateFile = getStateFile(projectHash);
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
}

function resetWorkflowState(projectHash) {
  saveWorkflowState(projectHash, { currentStep: null, history: [] });
}

module.exports = {
  loadWorkflowState,
  saveWorkflowState,
  resetWorkflowState
};
