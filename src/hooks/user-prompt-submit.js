#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const ReminderLoader = require('./lib/reminder-loader');
const ContextLoader = require('./lib/context-loader');
const ComplianceTracker = require('./lib/compliance-tracker');

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
    const contextLoader = new ContextLoader();
    const complianceTracker = new ComplianceTracker();
    let contextualGuidance = [];

    // Track compliance behaviors and get score updates
    const complianceMessages = complianceTracker.processUserPrompt(userPrompt);
    if (complianceMessages.length > 0) {
      contextualGuidance.push(''); // Empty line for separation
      contextualGuidance.push('🎮 COMPLIANCE TRACKING ACTIVE:');
      contextualGuidance.push(...complianceMessages);
      contextualGuidance.push(''); // Empty line for separation
    }

    // COMPACTION DETECTION - Check for session continuation markers
    const compactionIndicators = [
      'continued from a previous conversation',
      'conversation was summarized',
      'ran out of context',
      'conversation is being continued',
      'previous session',
      'this session is being continued',
      'conversation chronologically',
      'summary provided',
      'context summary'
    ];

    const isCompacted = compactionIndicators.some(indicator =>
      userPrompt.toLowerCase().includes(indicator)
    );

    // SYSTEM INITIALIZATION CHECK
    const stateFile = path.join(os.homedir(), '.claude', 'hooks', 'system-initialized.state');
    let systemInitialized = false;

    try {
      if (fs.existsSync(stateFile)) {
        const stateData = fs.readFileSync(stateFile, 'utf8');
        const state = JSON.parse(stateData);
        // Check if initialization was within last 4 hours (typical session length)
        const fourHoursAgo = Date.now() - (4 * 60 * 60 * 1000);
        systemInitialized = state.timestamp && state.timestamp > fourHoursAgo;
      }
    } catch (error) {
      log(`State file error: ${error.message}`);
      systemInitialized = false;
    }

    // AGGRESSIVE COMPACTION RESPONSE
    if (isCompacted) {
      contextualGuidance.push('🔄 COMPACTION DETECTED - VIRTUAL TEAM SYSTEM LOST!');
      contextualGuidance.push('⚠️ Session was continued/summarized - complete context NOT loaded');
      contextualGuidance.push('🚨 MANDATORY: Run /icc-init-system IMMEDIATELY');
      contextualGuidance.push('❌ @Role patterns + AgentTask-Templates WILL NOT WORK without initialization');
      contextualGuidance.push('🧠 Memory-first approach and best-practices patterns NOT active');
      contextualGuidance.push('🛑 DO NOT PROCEED with work until complete system is initialized');

      // Force this to the top priority
      const criticalWarning = [
        '=' .repeat(60),
        '🚨 CRITICAL: COMPACTED SESSION DETECTED',
        '⚡ ACTION REQUIRED: /icc-init-system',
        '❌ Virtual team patterns NOT ACTIVE',
        '=' .repeat(60)
      ].join('\n');

      contextualGuidance.unshift(criticalWarning);
    }

    // Check for @Role mentions without system initialization
    if (userPrompt.includes('@') && (!systemInitialized || isCompacted)) {
      contextualGuidance.push('⚠️ @ROLE PATTERN DETECTED BUT SYSTEM NOT INITIALIZED!');
      contextualGuidance.push('🚨 RUN: /icc-init-system');
      contextualGuidance.push('❌ @Role communication REQUIRES virtual team activation');
    }

    // Check for @Role mentions WITH system initialization
    if (userPrompt.includes('@') && systemInitialized && !isCompacted) {
      contextualGuidance.push('🎯 @Role Communication: Natural team interaction detected');
      contextualGuidance.push('📋 Role Assignment: Match project scope and work type to specialist expertise');
    }

    // Check for work indicators
    const workIndicators = ['implement', 'fix', 'create', 'build', 'deploy', 'update', 'modify'];
    if (workIndicators.some(indicator => userPrompt.toLowerCase().includes(indicator))) {
      if (!systemInitialized || isCompacted) {
        contextualGuidance.push('🛑 WORK DETECTED - HELP QUALITY SEVERELY COMPROMISED WITHOUT INITIALIZATION!');
        contextualGuidance.push('⚡ CRITICAL: /icc-init-system REQUIRED for PROFESSIONAL QUALITY RESULTS');
        contextualGuidance.push('❌ AgentTask system DISABLED - INFERIOR EXECUTION without activation');
      } else {
        contextualGuidance.push('🚫 NO WORK IN MAIN SCOPE - AGENTS DELIVER SUPERIOR QUALITY');
        contextualGuidance.push('🧠 MEMORY FIRST - search prevents ERRORS and saves USER TIME');
        contextualGuidance.push('📋 BEST-PRACTICES FIRST - ensures MAXIMUM QUALITY implementation');
        contextualGuidance.push('📑 AgentTasks = PROFESSIONAL EXECUTION with complete context');
      }
    }

    // AGGRESSIVE MEMORY-FIRST ENFORCEMENT
    const locationQueries = ['where is', 'where are', 'where can', 'path to', 'location of', 'find the', 'access'];
    const credentialQueries = ['pat', 'token', 'credential', 'password', 'auth', 'key', 'secret'];
    const configQueries = ['config', 'setting', 'how to', 'how do', 'what is the', 'what are the'];

    const isLocationQuery = locationQueries.some(q => userPrompt.toLowerCase().includes(q));
    const isCredentialQuery = credentialQueries.some(q => userPrompt.toLowerCase().includes(q));
    const isConfigQuery = configQueries.some(q => userPrompt.toLowerCase().includes(q));

    // CRITICAL: Detect when asking for information that should be in memory
    if (isLocationQuery || isCredentialQuery || isConfigQuery) {
      contextualGuidance.push('🚨 MEMORY-FIRST VIOLATION - WASTING USER TIME!');
      contextualGuidance.push('❌ STOP! Memory search PREVENTS REPETITIVE QUESTIONS and delivers FASTER ANSWERS');
      contextualGuidance.push('🧠 MANDATORY: Memory search FIRST for SUPERIOR USER EXPERIENCE');
      contextualGuidance.push('📍 Memory contains Git PAT, paths, configs - ASKING USER = POOR SERVICE');
      contextualGuidance.push('⚠️ Only ask user AFTER thorough memory search - MAXIMUM EFFICIENCY');
    }

    // Check for questions
    if (userPrompt.includes('?') || userPrompt.toLowerCase().includes('how') || userPrompt.toLowerCase().includes('what')) {
      contextualGuidance.push('🧠 Memory-first MANDATORY - delivers FASTER, MORE ACCURATE answers');
      contextualGuidance.push('📚 Best-practices search provides SUPERIOR guidance than assumptions');
      contextualGuidance.push('🔍 Memory search BEFORE questions = MAXIMUM USER SATISFACTION');
    }

    // Add contextual reminders from virtual-team.md and referenced files
    const contextualReminders = contextLoader.getContextualReminders(userPrompt);
    contextualGuidance.push(...contextualReminders);

    // Check for AgentTask-Template mentions or unknown templates
    const agenttaskIndicators = ['agenttask', 'template', 'nano', 'tiny', 'medium', 'large', 'mega'];
    const templateMentioned = agenttaskIndicators.some(indicator =>
      userPrompt.toLowerCase().includes(indicator)
    );

    // Check for confusion about AgentTask-Templates
    const confusionIndicators = ['what is', 'what are', 'how do', 'where are', 'unknown', 'missing'];
    const seemsConfused = confusionIndicators.some(indicator =>
      userPrompt.toLowerCase().includes(indicator)
    ) && templateMentioned;

    if (seemsConfused || (!systemInitialized && templateMentioned)) {
      contextualGuidance.push('⚠️ AgentTask-Templates UNKNOWN? Load ~/.claude/modes/virtual-team.md + ALL included files!');
      contextualGuidance.push('📑 Templates are in agenttask-templates/ directory');
      contextualGuidance.push('🚨 Run /icc-init-system to load complete virtual team system');
    }

    // Add weighted random reminder with memory-first bias
    const randomReminder = reminderLoader.getReminder();
    if (randomReminder) {
      // If asking for info, increase chance of memory reminder
      if ((isLocationQuery || isCredentialQuery || isConfigQuery) && Math.random() > 0.3) {
        contextualGuidance.push('🧠 MEMORY FIRST - search memory/ before any work or questions');
      } else {
        contextualGuidance.push(randomReminder);
      }
    }

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