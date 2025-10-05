#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const ReminderLoader = require('./lib/reminder-loader');
const { selectRelevantConstraints } = require('./lib/constraint-selector');

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

    // DETECT /icc-init-system COMMAND AND FORCE INITIALIZATION DISPLAY
    if (userPrompt.trim().startsWith('/icc-init-system')) {
      try {
        const installPath = path.join(os.homedir(), '.claude');
        const commandFile = path.join(installPath, 'commands', 'icc-init-system.md');

        // Try to find VERSION file - check multiple possible locations
        let version = '8.13.3'; // fallback
        const versionSearchPaths = [
          path.join(installPath, 'VERSION'),
          path.join(installPath, '..', 'Nextcloud', 'Work', 'Development', 'intelligentcode-ai', 'intelligent-claude-code', 'VERSION'),
          path.join(process.cwd(), 'VERSION')
        ];

        for (const versionPath of versionSearchPaths) {
          if (fs.existsSync(versionPath)) {
            version = fs.readFileSync(versionPath, 'utf8').trim();
            break;
          }
        }

        // Read initialization content from command file
        if (fs.existsSync(commandFile)) {
          const commandContent = fs.readFileSync(commandFile, 'utf8');

          // Extract initialization display (lines 34-96)
          const lines = commandContent.split('\n');
          const initDisplayStart = lines.findIndex(l => l.includes('### 🎯 INTELLIGENT CLAUDE CODE'));
          const initDisplayEnd = lines.findIndex((l, idx) => idx > initDisplayStart && l.startsWith('## Core Actions'));

          if (initDisplayStart !== -1 && initDisplayEnd !== -1) {
            let initDisplay = lines.slice(initDisplayStart, initDisplayEnd).join('\n');

            // Replace [CURRENT_VERSION] placeholder with actual version
            initDisplay = initDisplay.replace(/\[CURRENT_VERSION\]/g, version);

            // Build complete initialization text
            const fullInitText = [
              '🚀 INITIALIZING INTELLIGENT CLAUDE CODE VIRTUAL TEAM SYSTEM',
              '',
              initDisplay,
              '',
              '✅ SYSTEM INITIALIZATION COMPLETE',
              '📋 Virtual team ready for @Role communication',
              '🎯 AgentTask-driven execution activated',
              '🧠 Memory-first approach enabled',
              '⚡ Professional standards enforced',
              ''
            ].join('\n');

            // Force injection via hookSpecificOutput with exit code 0
            const response = {
              hookSpecificOutput: {
                hookEventName: 'UserPromptSubmit',
                additionalContext: fullInitText
              }
            };

            log('Injecting /icc-init-system initialization display');
            console.log(JSON.stringify(response));
            process.exit(0);
          }
        }

        // Fallback if file reading fails - still show something
        const fallbackInit = [
          '🚀 INITIALIZING INTELLIGENT CLAUDE CODE v' + version,
          '✅ Virtual Team System Active',
          '📋 14 core roles + unlimited specialists',
          '🎯 AgentTask-driven execution ready',
          '🧠 Memory-first approach enabled',
          '⚡ Professional standards enforced'
        ].join('\n');

        const fallbackResponse = {
          hookSpecificOutput: {
            hookEventName: 'UserPromptSubmit',
            additionalContext: fallbackInit
          }
        };

        log('Using fallback /icc-init-system display');
        console.log(JSON.stringify(fallbackResponse));
        process.exit(0);

      } catch (error) {
        log(`/icc-init-system injection error: ${error.message}`);
        // Continue with normal flow if init injection fails
      }
    }

    // Generate contextual reminders based on user prompt
    const reminderLoader = new ReminderLoader();
    let contextualGuidance = [];


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

    // NUCLEAR COMPACTION RESPONSE
    if (isCompacted) {
      contextualGuidance.push('🔄 COMPACTION DETECTED - VIRTUAL TEAM SYSTEM LOST!');
      contextualGuidance.push('⚠️ Session was continued/summarized - complete context NOT loaded');
      contextualGuidance.push('🚨 MANDATORY: Run /icc-init-system IMMEDIATELY');
      contextualGuidance.push('❌ @Role patterns + AgentTask-Templates WILL NOT WORK without initialization');
      contextualGuidance.push('🧠 Memory-first approach and best-practices patterns NOT active');
      contextualGuidance.push('🛑 DO NOT PROCEED with work until complete system is initialized');
      contextualGuidance.push('💀 COMPACTION = QUALITY DESTRUCTION - Professional standards LOST');
      contextualGuidance.push('⚡ NUCLEAR BLOCKING ACTIVE - NO work without virtual team restoration');
      contextualGuidance.push('🔥 EMERGENCY MODE: All behavioral patterns DESTROYED by compression');

      // NUCLEAR WARNING - Force this to the top priority
      const criticalWarning = [
        '🚨'.repeat(30),
        '💥 NUCLEAR: COMPACTED SESSION DETECTED 💥',
        '⚡ EMERGENCY ACTION REQUIRED: /icc-init-system',
        '❌ ALL BEHAVIORAL PATTERNS DESTROYED',
        '🛑 PROFESSIONAL QUALITY IMPOSSIBLE WITHOUT INIT',
        '💀 COMPACTION = AMATEUR EXECUTION',
        '🚨'.repeat(30)
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

    // NUCLEAR WORK DETECTION AND BLOCKING
    const workIndicators = ['implement', 'fix', 'create', 'build', 'deploy', 'update', 'modify', 'change', 'add', 'remove', 'delete', 'configure', 'setup', 'install'];
    const infrastructureQueries = ['jump', 'host', 'ssh', 'connect', 'access', 'server', 'cluster', 'environment'];

    const hasWorkIndicator = workIndicators.some(indicator => userPrompt.toLowerCase().includes(indicator));
    const hasInfrastructureQuery = infrastructureQueries.some(query => userPrompt.toLowerCase().includes(query));

    if (hasWorkIndicator) {
      if (!systemInitialized || isCompacted) {
        contextualGuidance.push('💀 WORK DURING COMPACTION = AMATEUR EXECUTION!');
        contextualGuidance.push('🚨 NUCLEAR BLOCKING: Work quality DESTROYED without virtual team');
        contextualGuidance.push('⚡ EMERGENCY: /icc-init-system MANDATORY for professional results');
        contextualGuidance.push('❌ AgentTask system LOST - Direct work delivers INFERIOR outcomes');
        contextualGuidance.push('🔥 COMPACTION DESTROYED BEHAVIORAL PATTERNS - Quality IMPOSSIBLE');
      } else {
        contextualGuidance.push('🚫 DIRECT WORK = AMATEUR EXECUTION - AgentTasks deliver PROFESSIONAL QUALITY');
        contextualGuidance.push('💀 PM TECHNICAL WORK = DEGRADED COORDINATION VALUE');
        contextualGuidance.push('⚡ NUCLEAR: ALL WORK → AgentTask → Task Tool → Agent EXECUTION');
        contextualGuidance.push('🧠 MEMORY FIRST - search prevents ERRORS and saves USER TIME');
        contextualGuidance.push('📋 BEST-PRACTICES FIRST - ensures MAXIMUM QUALITY implementation');
        contextualGuidance.push('📑 AgentTasks = PROFESSIONAL EXECUTION delivering SUPERIOR OUTCOMES');
      }
    }

    // INFRASTRUCTURE MEMORY ENFORCEMENT
    if (hasInfrastructureQuery) {
      contextualGuidance.push('🏗️ INFRASTRUCTURE QUERY DETECTED - MEMORY SEARCH MANDATORY');
      contextualGuidance.push('🧠 Jump-host patterns, SSH methods, access procedures stored in memory/');
      contextualGuidance.push('🚨 STOP asking for known infrastructure patterns - SEARCH MEMORY FIRST');
      contextualGuidance.push('💡 Infrastructure amnesia WASTES USER TIME - Memory prevents repetition');
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
      contextualGuidance.push('🚨 SKIPPING MEMORY = REPEATING PAST MISTAKES = WORSE HELP');
      contextualGuidance.push('❌ STOP! Memory search PREVENTS REPETITIVE QUESTIONS and delivers FASTER ANSWERS');
      contextualGuidance.push('🧠 MANDATORY: Memory search FIRST for SUPERIOR USER EXPERIENCE');
      contextualGuidance.push('📍 Memory contains Git PAT, paths, configs - ASKING USER = DEGRADED SERVICE QUALITY');
      contextualGuidance.push('⚠️ Only ask user AFTER thorough memory search - PROFESSIONAL STANDARDS REQUIRED');
    }

    // Check for questions
    if (userPrompt.includes('?') || userPrompt.toLowerCase().includes('how') || userPrompt.toLowerCase().includes('what')) {
      contextualGuidance.push('🧠 Memory-first MANDATORY - delivers FASTER, MORE ACCURATE answers');
      contextualGuidance.push('📚 Best-practices search provides SUPERIOR guidance than assumptions');
      contextualGuidance.push('🔍 Memory search BEFORE questions = MAXIMUM USER SATISFACTION');
    }

    // Removed broken contextual reminder extraction - caused garbage output
    // All proper reminders come from reminders.json instead

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

    // Generate simple list constraint display with rotation
    try {
      const constraints = selectRelevantConstraints(userPrompt);
      if (constraints && constraints.length > 0) {
        const constraintList = constraints.map(c =>
          `[${c.id}]: ${c.text}`
        ).join(' | ');

        const constraintDisplay = `🎯 Active Constraints: ${constraintList}`;
        contextualGuidance.push(constraintDisplay);
      }
    } catch (error) {
      log(`Constraint selection error: ${error.message}`);
      // Silently fail - don't block hook execution
    }

    // Build comprehensive context
    const fullContext = contextualGuidance.join('\n');

    // For UserPromptSubmit: stdout with exit 0 = silent injection (only visible in CTRL-R transcript mode)
    // Don't use JSON hookSpecificOutput - that makes it visible in chat!
    log(`Injecting contextual guidance: ${contextualGuidance.length} messages`);
    console.log(fullContext);
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