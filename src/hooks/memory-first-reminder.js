#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { initializeHook } = require('./lib/logging');

const MAX_STATS_EVENTS = 200;
const MAX_STATS_BYTES = 5 * 1024 * 1024; // 5MB guardrail

/**
 * Detect contextual reminders based on user prompt
 * @param {string} promptLower
 * @returns {{messages: string[], categories: string[]}}
 */
function analyzePrompt(promptLower) {
  const messages = [];
  const categories = [];

  const credentialIndicators = ['pat', 'token', 'credential', 'password', 'secret', 'key'];
  if (credentialIndicators.some(word => promptLower.includes(word))) {
    categories.push('credential');
    messages.push('🔐 Credentials question detected – MEMORY-FIRST enforcement active.');
    messages.push('📁 Reference memory/git/ for PAT, token, and credential storage details.');
  }

  const configIndicators = ['config', 'configuration', 'settings', 'setting'];
  if (configIndicators.some(word => promptLower.includes(word))) {
    categories.push('configuration');
    messages.push('⚙️ Configuration request identified – pull answers from memory/configuration/.');
  }

  const agentTaskIndicators = ['agenttask', 'agent task', 'create an agent', 'delegate to'];
  if (agentTaskIndicators.some(word => promptLower.includes(word))) {
    categories.push('agenttask');
    messages.push('🧱 AgentTask creation detected – memory/implementation/ holds prior solutions.');
    messages.push('🚨 Search memory BEFORE AgentTask to preload context.');
  }

  const workflowIndicators = ['deploy', 'deployment', 'workflow', 'release', 'production'];
  if (workflowIndicators.some(word => promptLower.includes(word))) {
    categories.push('workflow');
    messages.push('🚀 Workflow/Deployment topic – review memory/deployment/ and memory/workflows/.');
  }

  const memorySearchIndicators = ['search memory', 'check memory', 'look in memory', 'memory search'];
  if (memorySearchIndicators.some(phrase => promptLower.includes(phrase))) {
    categories.push('acknowledgement');
    messages.push('✅ EXCELLENT: memory search already in progress – you are following the memory-first pattern.');
  }

  return { messages, categories };
}

function getDefaultStatsData() {
  return {
    events: [],
    summary: {
      total_events: 0,
      opportunities_detected: 0,
      acknowledgements: 0
    }
  };
}

function ensureStatsFile(log) {
  const statsDir = path.join(os.homedir(), '.claude', 'stats');
  fs.mkdirSync(statsDir, { recursive: true });
  const statsFile = path.join(statsDir, 'memory-usage.json');

  let rotateFile = false;
  if (fs.existsSync(statsFile)) {
    try {
      const { size } = fs.statSync(statsFile);
      if (size > MAX_STATS_BYTES) {
        const archiveName = `memory-usage-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        fs.renameSync(statsFile, path.join(statsDir, archiveName));
        rotateFile = true;
        if (log) {
          log(`Memory stats file exceeded ${MAX_STATS_BYTES} bytes; rotated to ${archiveName}`);
        }
      }
    } catch (error) {
      // If stat/rename fails, fall back to truncating file
      try {
        fs.unlinkSync(statsFile);
      } catch (unlinkError) {
        if (log) {
          log(`Failed to rotate stats file: ${unlinkError.message}`);
        }
      }
      rotateFile = true;
    }
  }

  if (rotateFile || !fs.existsSync(statsFile)) {
    return { statsFile, data: getDefaultStatsData() };
  }

  try {
    const existing = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
    if (!existing.summary) {
      existing.summary = { ...getDefaultStatsData().summary };
    }
    if (!Array.isArray(existing.events)) {
      existing.events = [];
    }
    return { statsFile, data: existing };
  } catch (error) {
    if (log) {
      log(`Stats file parse error: ${error.message} - resetting file`);
    }
    return { statsFile, data: getDefaultStatsData() };
  }
}

function recordMemoryStats(hookInput, categories, log) {
  if (!categories.length) {
    return;
  }

  const { statsFile, data } = ensureStatsFile(log);

  data.events.push({
    timestamp: new Date().toISOString(),
    session_id: hookInput.session_id || 'unknown-session',
    prompt_preview: (hookInput.user_prompt || '').slice(0, 160),
    categories
  });

  data.summary.total_events = (data.summary.total_events || 0) + 1;
  const opportunityCount = categories.filter(category => category !== 'acknowledgement').length;
  data.summary.opportunities_detected = (data.summary.opportunities_detected || 0) + opportunityCount;
  if (categories.includes('acknowledgement')) {
    data.summary.acknowledgements = (data.summary.acknowledgements || 0) + 1;
  }

  if (data.events.length > MAX_STATS_EVENTS) {
    data.events = data.events.slice(-MAX_STATS_EVENTS);
    if (log) {
      log(`Memory stats trimmed to last ${MAX_STATS_EVENTS} events`);
    }
  }

  fs.writeFileSync(statsFile, JSON.stringify(data));
}

function buildReminder(messages) {
  if (!messages.length) {
    return null;
  }

  const lines = [
    '🧠 MEMORY-FIRST ALERT – Maximum guidance engaged.',
    'MEMORY-FIRST is REQUIRED before asking users or creating work.',
    ''
  ];

  return lines.concat(messages).join('\n');
}

function main() {
  const { log, hookInput } = initializeHook('memory-first-reminder');
  const standardOutput = { continue: true, suppressOutput: true };

  try {
    if (!hookInput || !hookInput.user_prompt) {
      console.log(JSON.stringify(standardOutput));
      return;
    }

    const promptLower = hookInput.user_prompt.toLowerCase();
    const { messages, categories } = analyzePrompt(promptLower);

    if (!messages.length) {
      log('No memory-first opportunity detected.');
      console.log(JSON.stringify(standardOutput));
      return;
    }

    const reminder = buildReminder(messages);

    if (reminder) {
      recordMemoryStats(hookInput, categories, log);
      log(`Memory-first reminder injected for categories: ${categories.join(', ')}`);
      const response = {
        continue: true,
        suppressOutput: true,
        hookSpecificOutput: {
          hookEventName: 'UserPromptSubmit',
          additionalContext: reminder
        }
      };
      console.log(JSON.stringify(response));
      return;
    }

    console.log(JSON.stringify(standardOutput));
  } catch (error) {
    log(`Error: ${error.message}`);
    console.log(JSON.stringify(standardOutput));
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
