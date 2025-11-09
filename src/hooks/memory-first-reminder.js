#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');

/**
 * Memory-First Reminder Hook
 *
 * EDUCATIONAL HOOK - Provides non-blocking reminders about memory-first patterns
 *
 * Triggers:
 * - About to ask user questions → Remind to search memory first
 * - About to create AgentTask → Remind to search memory for patterns
 * - Tool use suggests information need → Remind about memory topics
 *
 * Behavior: ALWAYS ALLOW - This is educational guidance, not enforcement
 */

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('memory-first-reminder');

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    if (!hookInput) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const userPrompt = hookInput.user_prompt || '';

    // Track memory search patterns
    const memorySearchIndicators = [
      'search memory', 'check memory', 'memory/',
      'SearchMemory', 'LoadFromMemory', 'grep.*memory/'
    ];

    const hasMemorySearch = memorySearchIndicators.some(indicator =>
      userPrompt.toLowerCase().includes(indicator.toLowerCase())
    );

    // Memory opportunity detection patterns
    const locationQueries = [
      'where is', 'where are', 'where can', 'path to',
      'location of', 'find the', 'access', 'how do i access'
    ];

    const credentialQueries = [
      'pat', 'token', 'credential', 'password', 'auth',
      'key', 'secret', 'api key', 'github token'
    ];

    const configQueries = [
      'config', 'setting', 'how to configure',
      'what is the', 'what are the', 'configuration'
    ];

    const workflowQueries = [
      'how do i', 'how to', 'procedure for',
      'steps to', 'process for', 'workflow'
    ];

    const agenttaskIndicators = [
      'create agenttask', 'agenttask', 'break down',
      'implement', 'fix', 'create', 'build', 'deploy'
    ];

    // Detect specific opportunity types
    const isLocationQuery = locationQueries.some(q =>
      userPrompt.toLowerCase().includes(q)
    );

    const isCredentialQuery = credentialQueries.some(q =>
      userPrompt.toLowerCase().includes(q)
    );

    const isConfigQuery = configQueries.some(q =>
      userPrompt.toLowerCase().includes(q)
    );

    const isWorkflowQuery = workflowQueries.some(q =>
      userPrompt.toLowerCase().includes(q)
    );

    const isAgenttaskCreation = agenttaskIndicators.some(ind =>
      userPrompt.toLowerCase().includes(ind)
    );

    // Build contextual guidance array
    let memoryGuidance = [];

    // If already searching memory, acknowledge and encourage
    if (hasMemorySearch) {
      log('Memory search detected - providing encouragement');
      memoryGuidance.push('✅ EXCELLENT: Memory search active - following memory-first pattern');

      // Track compliance (increment usage counter)
      trackMemoryUsage('memory_search_performed');
    }
    // PRIORITIZE AgentTask creation guidance (check this BEFORE other queries)
    else if (isAgenttaskCreation && !hasMemorySearch) {
      log('AgentTask creation detected without memory search - providing reminder');

      memoryGuidance.push('💡 MEMORY-FIRST REMINDER:');
      memoryGuidance.push('Before creating AgentTask, search memory/ for:');
      memoryGuidance.push('  - Similar implementation patterns: memory/implementation/');
      memoryGuidance.push('  - Debugging solutions: memory/debugging/');
      memoryGuidance.push('  - Configuration approaches: memory/configuration/');
      memoryGuidance.push('  - Deployment workflows: memory/deployment/');
      memoryGuidance.push('');
      memoryGuidance.push('📋 Memory patterns prevent ERRORS and save TIME');
      memoryGuidance.push('✅ Search memory BEFORE AgentTask creation for SUPERIOR QUALITY');

      // Track opportunity
      trackMemoryUsage('agenttask_without_memory_search');
    }
    // Otherwise, check if memory search would be beneficial for queries
    else if (isLocationQuery || isCredentialQuery || isConfigQuery || isWorkflowQuery) {
      log('Memory opportunity detected - providing reminder');

      memoryGuidance.push('💡 MEMORY-FIRST REMINDER:');
      memoryGuidance.push('Before asking user or creating AgentTask, search memory/ for:');

      // Provide specific topic suggestions based on query type
      if (isLocationQuery || isCredentialQuery) {
        memoryGuidance.push('  - Git credentials and access patterns: memory/git/');
        memoryGuidance.push('  - Configuration paths and locations: memory/configuration/');
        memoryGuidance.push('  - Authentication methods: memory/security/');
      }

      if (isConfigQuery) {
        memoryGuidance.push('  - Configuration patterns: memory/configuration/');
        memoryGuidance.push('  - System settings: memory/system/');
        memoryGuidance.push('  - Hook configurations: memory/hooks/');
      }

      if (isWorkflowQuery) {
        memoryGuidance.push('  - Workflow patterns: memory/workflows/');
        memoryGuidance.push('  - Deployment processes: memory/deployment/');
        memoryGuidance.push('  - Git workflows: memory/git-workflows/');
      }

      memoryGuidance.push('');
      memoryGuidance.push('🧠 Memory contains: Git PAT locations, paths, configs, workflows');
      memoryGuidance.push('⚡ Asking user WITHOUT memory search = wasted time + repeated questions');
      memoryGuidance.push('✅ PROFESSIONAL STANDARD: Memory search FIRST, ask user ONLY if not found');

      // Track opportunity
      trackMemoryUsage('memory_opportunity_detected');
    }

    // Only inject guidance if we have something to say
    if (memoryGuidance.length === 0) {
      log('No memory guidance needed for this prompt');
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Build full context with reminder
    const fullContext = memoryGuidance.join('\n');

    const output = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext: fullContext
      }
    };

    log(`Memory-first reminder injected (${memoryGuidance.length} lines)`);
    console.log(JSON.stringify(output));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    // On error, always allow execution (non-blocking)
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

/**
 * Track memory usage statistics
 *
 * @param {string} eventType - Type of memory event to track
 */
function trackMemoryUsage(eventType) {
  try {
    const statsDir = path.join(os.homedir(), '.claude', 'stats');
    if (!fs.existsSync(statsDir)) {
      fs.mkdirSync(statsDir, { recursive: true });
    }

    const statsFile = path.join(statsDir, 'memory-usage.json');

    let stats = { events: [] };
    if (fs.existsSync(statsFile)) {
      const content = fs.readFileSync(statsFile, 'utf8');
      stats = JSON.parse(content);
    }

    // Add event
    stats.events.push({
      type: eventType,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    });

    // Keep last 1000 events only
    if (stats.events.length > 1000) {
      stats.events = stats.events.slice(-1000);
    }

    // Calculate statistics
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = stats.events.filter(e => e.date === today);

    stats.summary = {
      total_events: stats.events.length,
      today_events: todayEvents.length,
      memory_searches: stats.events.filter(e => e.type === 'memory_search_performed').length,
      opportunities_detected: stats.events.filter(e => e.type === 'memory_opportunity_detected').length,
      agenttask_without_memory: stats.events.filter(e => e.type === 'agenttask_without_memory_search').length,
      last_updated: new Date().toISOString()
    };

    fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
  } catch (error) {
    // Silent fail - don't block on stats tracking
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
