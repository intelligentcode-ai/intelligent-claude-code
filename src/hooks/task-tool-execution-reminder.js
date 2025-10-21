#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Logging setup
const logDir = path.join(os.homedir(), '.claude', 'logs');
const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}-task-tool-execution-reminder.log`);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
}

try {
  // Parse hook input
  let inputData = '';

  if (process.argv[2]) {
    inputData = process.argv[2];
  } else if (process.env.HOOK_INPUT) {
    inputData = process.env.HOOK_INPUT;
  } else if (!process.stdin.isTTY) {
    inputData = fs.readFileSync(0, 'utf8');
  }

  if (!inputData.trim()) {
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  const hookInput = JSON.parse(inputData);
  const toolName = hookInput.tool_name || hookInput.tool || '';

  // Only trigger for Task tool
  if (toolName !== 'Task') {
    log(`Skipping - not Task tool: ${toolName}`);
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  log('Task tool invocation detected - injecting synchronous execution reminder');

  // Inject reminder via hookSpecificOutput
  const reminder = `
🚨 CRITICAL: Task Tool Execution is SYNCHRONOUS (BLOCKING)

EXECUTION MODEL:
  Main Agent → Task Tool → Agent Executes (WAIT) → Agent Returns → Main Continues
           |________________BLOCKING WAIT___________________|

YOU MUST:
✅ WAIT for agent completion summary before proceeding
✅ PROCESS agent results before next action
✅ ONE agent at a time for sequential work
✅ READ the complete agent execution summary

YOU MUST NOT:
❌ Start agent and immediately do other work
❌ Assume asynchronous execution
❌ Invoke multiple Task tools rapidly without waiting
❌ Continue conversation before agent completes

REMINDER: The Task tool BLOCKS until the agent finishes. You will receive the agent's
complete execution summary. WAIT for it. READ it. THEN continue.
`;

  const response = {
    continue: true,
    hookSpecificOutput: reminder
  };

  console.log(JSON.stringify(response));
  process.exit(0);

} catch (error) {
  log(`Error: ${error.message}`);
  // On error, allow execution to continue
  console.log(JSON.stringify({ continue: true }));
  process.exit(0);
}
