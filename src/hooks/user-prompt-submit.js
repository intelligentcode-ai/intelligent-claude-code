#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const ReminderLoader = require('./lib/reminder-loader');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-user-prompt-submit.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        const stdinBuffer = fs.readFileSync(0, 'utf8');
        if (stdinBuffer && stdinBuffer.trim()) {
          inputData = stdinBuffer;
        }
      } catch (error) {
        log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    } else {
      log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    if (!inputData.trim()) {
      log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    let claudeInput;
    try {
      claudeInput = JSON.parse(inputData);
    } catch (error) {
      log(`JSON parse error: ${error.message}`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Get user prompt from input
    const userPrompt = claudeInput.user_prompt || '';

    // Generate contextual reminders based on user prompt
    const reminderLoader = new ReminderLoader();
    let contextualGuidance = [];

    // Check for @Role mentions
    if (userPrompt.includes('@')) {
      contextualGuidance.push('🎯 @Role Communication: Natural team interaction detected');
      contextualGuidance.push('📋 Role Assignment: Match project scope and work type to specialist expertise');
    }

    // Check for work indicators
    const workIndicators = ['implement', 'fix', 'create', 'build', 'deploy', 'update', 'modify'];
    if (workIndicators.some(indicator => userPrompt.toLowerCase().includes(indicator))) {
      contextualGuidance.push('🚫 NO WORK IN MAIN SCOPE - all work must use AgentTask → Task → Agent');
      contextualGuidance.push('🔍 ALWAYS search memory before creating any AgentTask');
      contextualGuidance.push('📦 AgentTasks must be SELF-CONTAINED with all context embedded');
    }

    // Check for questions
    if (userPrompt.includes('?') || userPrompt.toLowerCase().includes('how') || userPrompt.toLowerCase().includes('what')) {
      contextualGuidance.push('🧠 Memory-first approach - check memory before asking users');
      contextualGuidance.push('📚 Check best-practices/ directory for relevant patterns');
    }

    // Add standard pre-execution reminders
    const standardReminder = reminderLoader.getPreExecutionReminder();
    contextualGuidance.push(standardReminder);

    // Build comprehensive context
    const fullContext = contextualGuidance.join('\n');

    const output = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext: fullContext
      }
    };

    log(JSON.stringify(output));
    console.log(JSON.stringify(output));
    process.exit(0);

  } catch (error) {
    log(JSON.stringify(standardOutput));
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}