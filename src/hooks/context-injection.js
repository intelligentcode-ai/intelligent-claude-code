#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const ReminderLoader = require('./lib/reminder-loader');
const { selectRelevantConstraints } = require('./lib/constraint-selector');
const { initializeHook } = require('./lib/logging');
const { generateProjectHash } = require('./lib/hook-helpers');
const { getSetting } = require('./lib/config-loader');

/**
 * Load best practices from README.md
 *
 * @returns {Array<Object>} Array of best practice objects with title and summary
 */
function loadBestPractices() {
  try {
    // Try installation path first, then project path
    const possiblePaths = [
      path.join(os.homedir(), '.claude', 'best-practices', 'README.md'),
      path.join(process.cwd(), 'best-practices', 'README.md'),
      path.join(process.cwd(), '.claude', 'best-practices', 'README.md')
    ];

    let readmePath = null;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        readmePath = p;
        break;
      }
    }

    if (!readmePath) {
      return [];
    }

    const content = fs.readFileSync(readmePath, 'utf8');
    const practices = [];

    // Parse markdown: Extract ## headlines and summary paragraphs
    const lines = content.split('\n');
    let currentTitle = null;
    let currentSummary = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Match ## Headline
      if (line.startsWith('## ') && !line.startsWith('###')) {
        // Save previous practice if exists
        if (currentTitle && currentSummary) {
          practices.push({ title: currentTitle, summary: currentSummary });
        }

        currentTitle = line.replace(/^##\s+/, '').trim();
        currentSummary = null;
      }
      // Find summary (first non-empty, non-link line after headline)
      else if (currentTitle && !currentSummary && line.length > 0 && !line.startsWith('[') && !line.startsWith('#')) {
        currentSummary = line;
      }
    }

    // Add last practice
    if (currentTitle && currentSummary) {
      practices.push({ title: currentTitle, summary: currentSummary });
    }

    return practices;

  } catch (error) {
    // Silent fail - return empty array
    return [];
  }
}

/**
 * Load virtual-team.md from hierarchy
 *
 * @returns {string|null} File content or null if not found
 */
function loadVirtualTeamMd() {
  try {
    // Search hierarchy: project dev context, then user global
    const possiblePaths = [
      path.join(process.cwd(), 'src', 'modes', 'virtual-team.md'),
      path.join(os.homedir(), '.claude', 'modes', 'virtual-team.md')
    ];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Select random best practices
 *
 * @param {Array<Object>} practices - Available practices
 * @param {number} count - Number to select
 * @returns {Array<Object>} Randomly selected practices
 */
function selectRandomBestPractices(practices, count = 3) {
  if (practices.length === 0) return [];

  const shuffled = [...practices].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, practices.length));
}

/**
 * Build MCP availability hints for PM/Main Scope based on config
 * @returns {string[]} list of hint lines
 */
function buildMcpHints() {
  const hints = [];

  try {
    const enabled = getSetting('tools.mcp_tools_enabled', true);
    if (!enabled) {
      return hints; // Explicitly disabled
    }

    const cfg = getSetting('mcp_integrations', {});
    const blocks = [];

    const add = (key, label) => {
      const section = cfg?.[key];
      if (section?.enabled) {
        const provider = section.provider || 'provider not set';
        blocks.push(`${label}: provider ${provider} (MCP)`);
      }
    };

    add('issue_tracking', 'Issue tracking');
    add('documentation', 'Knowledge/Docs');
    add('memory', 'Memory store');

    if (blocks.length) {
      hints.push('📡 MCP integrations detected - prefer these tools in Main Scope when applicable:');
      blocks.forEach(b => hints.push(`• ${b}`));
      hints.push('Use the corresponding mcp__* tool if the provider is registered; fallback to legacy flow if unavailable.');
    }
  } catch (error) {
    // Do not block context; log happens in initializeHook
  }

  return hints;
}

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('context-injection');
  const claudeInput = hookInput; // context-injection uses claudeInput alias

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    // claudeInput already parsed earlier for logging
    if (!claudeInput) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const projectRoot = hookInput?.cwd || process.cwd();

    // CRITICAL: Clean stale agent markers on user prompt submit
    // User prompt = main scope restart = no active agents
    // This prevents PM constraints bypass from stale markers
    const session_id = claudeInput.session_id;
    log(`[MARKER-CLEANUP] Session ID: ${session_id || 'undefined'}`);

    if (session_id) {
      // CRITICAL FIX: Calculate project hash to match agent-marker.js filename format
      // Without hash, cleanup fails to find marker file and stale counts persist
      const projectHash = generateProjectHash(hookInput);

      const { getMarkerDir } = require('./lib/marker-detection');
      const markerFile = path.join(getMarkerDir(), `agent-executing-${session_id}-${projectHash}`);
      log(`[MARKER-CLEANUP] Checking marker: ${markerFile} (project: ${projectRoot})`);

      if (fs.existsSync(markerFile)) {
        log(`[MARKER-CLEANUP] Marker exists - attempting cleanup`);
        try {
          fs.unlinkSync(markerFile);
          log(`Cleaned stale agent marker on user prompt submit: ${markerFile}`);
        } catch (error) {
          log(`Failed to clean agent marker: ${error.message}`);
        }
      } else {
        log(`[MARKER-CLEANUP] No marker file found - clean state`);
      }
    } else {
      log(`[MARKER-CLEANUP] No session_id - skipping marker cleanup`);
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
      // Load virtual-team.md content
      const virtualTeamContent = loadVirtualTeamMd();

      if (virtualTeamContent) {
        // Output complete virtual-team.md file content
        contextualGuidance.push('🔄 SESSION COMPACTION DETECTED - RESTORING COMPLETE BEHAVIORAL CONTEXT');
        contextualGuidance.push('');
        contextualGuidance.push(virtualTeamContent);
        contextualGuidance.push('');
        contextualGuidance.push('✅ VIRTUAL TEAM BEHAVIORAL CONTEXT RESTORED');
        log('Compaction detected - loaded virtual-team.md content');
      } else {
        // Fallback if file not found
        contextualGuidance.push('🔄 COMPACTION DETECTED - VIRTUAL TEAM SYSTEM LOST!');
        contextualGuidance.push('⚠️ Session was continued/summarized - complete context NOT loaded');
        contextualGuidance.push('🚨 MANDATORY: Run /icc-init-system IMMEDIATELY');
        contextualGuidance.push('❌ virtual-team.md file not found - cannot restore behavioral context');
        log('Compaction detected but virtual-team.md not found');
      }
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

    // WORK DETECTION AND MEMORY-FIRST REMINDER
    const workActionVerbs = ['implement', 'fix', 'create', 'build', 'deploy', 'update', 'modify', 'change', 'add', 'remove', 'delete', 'configure', 'setup', 'install', 'refactor', 'optimize'];
    const hasWorkAction = workActionVerbs.some(verb => userPrompt.toLowerCase().includes(verb));

    // Track recent memory searches in session (simple heuristic)
    const memorySearchTerms = ['memory/', 'searched memory', 'from memory', 'memory shows', 'according to memory'];
    const hasRecentMemorySearch = memorySearchTerms.some(term => userPrompt.toLowerCase().includes(term));

    // Inject memory-first reminder for work requests without recent memory search
    if (hasWorkAction && !hasRecentMemorySearch) {
      contextualGuidance.push('💡 MEMORY-FIRST REMINDER: Before creating AgentTask, search memory for patterns:');
      contextualGuidance.push('   - Grep memory/[work_domain] for similar implementations');
      contextualGuidance.push('   - Check best-practices/[category] for proven approaches');
      contextualGuidance.push('   - Embed discoveries in AgentTask context for specialist benefit');
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

    // Add explicit memory-before/after guidance for main scope (no tool invocation needed)
    contextualGuidance.push('🧠 BEFORE you work: open memory/<topic>.md for prior learnings');
    contextualGuidance.push('🧠 AFTER you finish: add a short note to memory/<topic>.md (what changed, how to verify)');

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

    // MCP availability hints for PM/Main Scope
    const mcpHints = buildMcpHints();
    if (mcpHints.length > 0) {
      contextualGuidance.push(...mcpHints);
    }

    // Generate constraint display with 3+3 pattern + best practices
    try {
      const constraints = selectRelevantConstraints(userPrompt);
      if (constraints && constraints.length > 0) {
        // Separate situation and cycling constraints
        const situation = constraints.filter(c => c.type === 'situation').slice(0, 3);
        const cycling = constraints.filter(c => c.type === 'cycling').slice(0, 3);

        // Format constraint display
        const constraintLines = [];
        constraintLines.push('🎯 Active Constraints:');
        constraintLines.push('');

        situation.forEach(c => {
          constraintLines.push(`[${c.id}]: ${c.text} *(situation)*`);
        });

        cycling.forEach(c => {
          constraintLines.push(`[${c.id}]: ${c.text} *(cycling)*`);
        });

        // Try to load best practices
        const bestPractices = loadBestPractices();
        if (bestPractices.length > 0) {
          const selectedPractices = selectRandomBestPractices(bestPractices, 3);

          if (selectedPractices.length > 0) {
            constraintLines.push('');
            constraintLines.push('📚 Best Practices (if available):');
            selectedPractices.forEach(bp => {
              constraintLines.push(`• ${bp.title}: ${bp.summary}`);
            });
          }
        }

        const constraintBlock = constraintLines.join('\n');
        const formatInstructions = [
          '⚠️ RESPONSE FORMAT REQUIREMENT (DO NOT IGNORE):',
          '1. Begin your next reply by printing the exact block below (no paraphrasing, nothing before it).',
          '2. Keep the constraint/best-practice text exactly as provided.',
          '3. After the block, continue with your normal response while explicitly referencing the listed constraints/best practices.',
          '',
          constraintBlock
        ].join('\n');

        contextualGuidance.push(formatInstructions);
      }
    } catch (error) {
      log(`Constraint selection error: ${error.message}`);
      // Silently fail - don't block hook execution
    }

    // Build comprehensive context
    const fullContext = contextualGuidance.join('\n');

    // Visible injection so the model sees constraints/best practices
    const response = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: fullContext
      }
    };

    log(`Injecting contextual guidance (visible): ${contextualGuidance.length} messages`);
    console.log(JSON.stringify(response));
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
