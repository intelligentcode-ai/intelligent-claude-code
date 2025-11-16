#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');

// Initialize hook with shared library function
const { log, hookInput } = initializeHook('task-tool-execution-reminder');

/**
 * Detect Task tool usage intent from user prompt
 *
 * @param {string} userPrompt - The user's submitted prompt
 * @returns {boolean} True if Task tool usage is likely
 */
function detectTaskToolIntent(userPrompt) {
  const prompt = userPrompt.toLowerCase();

  // Check for @Role mentions (primary indicator)
  if (userPrompt.includes('@')) {
    return true;
  }

  // Check for work request patterns
  const workIndicators = [
    'implement', 'fix', 'create', 'build', 'deploy',
    'update', 'modify', 'change', 'add', 'remove',
    'delete', 'configure', 'setup', 'install', 'refactor'
  ];

  if (workIndicators.some(indicator => prompt.includes(indicator))) {
    return true;
  }

  // Check for explicit agent/task mentions
  const explicitIndicators = [
    'create agent', 'use task tool', 'invoke agent',
    'create agenttask', 'break down', 'delegate to'
  ];

  if (explicitIndicators.some(indicator => prompt.includes(indicator))) {
    return true;
  }

  return false;
}

try {
  // Parse hook input
  let inputData = '';

  if (process.argv[2]) {
    inputData = process.argv[2];
  } else if (process.env.HOOK_INPUT) {
    inputData = process.env.HOOK_INPUT;
  } else if (process.env.CLAUDE_TOOL_INPUT) {
    inputData = process.env.CLAUDE_TOOL_INPUT;
  } else if (!process.stdin.isTTY) {
    inputData = fs.readFileSync(0, 'utf8');
  }

  if (!inputData.trim()) {
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  const hookInput = JSON.parse(inputData);
  const userPrompt = hookInput.user_prompt || '';

  // Detect Task tool usage intent from user prompt
  if (!detectTaskToolIntent(userPrompt)) {
    log(`No Task tool intent detected in prompt`);
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  log('Task tool usage intent detected - injecting synchronous execution reminder');

  // Inject reminder BEFORE Task tool usage
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

  // For UserPromptSubmit: Use hookSpecificOutput to inject context
  const response = {
    continue: true,
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext: reminder
    }
  };

  log('Reminder injected via hookSpecificOutput');
  console.log(JSON.stringify(response));
  process.exit(0);

} catch (error) {
  log(`Error: ${error.message}`);
  // On error, allow execution to continue
  console.log(JSON.stringify({ continue: true }));
  process.exit(0);
}
