/**
 * Intent Classification Engine for intelligent-claude-code
 *
 * Classifies user intents based on tool usage, parameters, and context to provide
 * educational reminders about the "NO WORK IN MAIN SCOPE" architectural pattern.
 *
 * Intent Categories:
 * - research: Reading, searching, analyzing (Educational guidance provided)
 * - qa: Answering questions, explaining (Educational guidance provided)
 * - planning: Creating AgentTasks, architectural discussions (Educational guidance provided)
 * - work: Implementing, fixing, modifying code (Strong "NO WORK IN MAIN SCOPE" reminder)
 */

const configLoader = require('./config-loader');

/**
 * Work intent patterns from behavioral analysis
 */
const WORK_VERBS = new Set([
  // Direct action verbs
  'fix', 'change', 'update', 'modify', 'adjust', 'correct', 'improve', 'enhance', 'optimize', 'refactor',
  // Creation verbs
  'create', 'add', 'insert', 'generate', 'build', 'make', 'write', 'implement', 'develop',
  // Removal verbs
  'delete', 'remove', 'clean', 'purge', 'clear', 'eliminate', 'drop',
  // Operation verbs
  'deploy', 'install', 'configure', 'setup', 'run', 'execute', 'start', 'stop', 'restart',
  // System verbs
  'migrate', 'backup', 'restore', 'sync', 'merge', 'commit', 'push', 'pull'
]);

/**
 * Research/read-only tool patterns
 */
const RESEARCH_TOOLS = new Set([
  'Read', 'Grep', 'Glob', 'WebSearch', 'WebFetch', 'Bash'
]);

/**
 * Agent execution and planning tools (ALWAYS ALLOWED - these ARE the AgentTask+agent pattern!)
 *
 * CRITICAL UNDERSTANDING:
 * - Task tool CREATES subagents - this IS the correct AgentTask+agent implementation
 * - TodoWrite manages planning and task orchestration
 * - ExitPlanMode handles agent lifecycle management
 *
 * These tools implement the architectural pattern: Main scope creates AgentTasks → Task tool creates agents → Agents do work
 */
const AGENT_TOOLS = new Set([
  'Task', 'TodoWrite', 'ExitPlanMode'
]);

/**
 * Modification tools that indicate work intent
 */
const WORK_TOOLS = new Set([
  'Edit', 'Write', 'MultiEdit', 'NotebookEdit'
]);

/**
 * Q&A context patterns
 */
const QA_PATTERNS = [
  /\b(what|how|why|when|where|who)\b/i,
  /\b(explain|describe|tell|show|demonstrate)\b/i,
  /\b(answering|explaining|describing|clarifying)\b/i,
  /\?(.*?)$/m // Ends with question
];

/**
 * Planning context patterns
 */
const PLANNING_PATTERNS = [
  /\b(plan|design|architect|strategy|approach)\b/i,
  /\b(should|could|might|would|recommend)\b/i,
  /\b(@\w+)\b/g, // @Role mentions
  /\.prb\.ya?ml$/i, // PRB files
  /\/stories\//i // Stories directory
];

/**
 * Work intent patterns
 */
const WORK_INTENT_PATTERNS = [
  /\b(let me|i'll|going to|need to|should|will)\s+\w+/i,
  /\b(quick|simple|just)\s+\w+/i,
  /\bfix\s+(this|that|the)\b/i,
  /\bimplement\s+/i,
  /\bmodify\s+/i
];

/**
 * File path patterns that suggest work intent
 */
const WORK_FILE_PATTERNS = [
  /\.(js|ts|py|java|cpp|c|php|rb|go|rs|scala|kt)$/i, // Code files
  /\.(json|yaml|yml|toml|ini|conf)$/i, // Config files
  /\.(sql|db)$/i, // Database files
  /\.(css|scss|sass|less|styl)$/i, // Style files
  /\.(html|htm|jsp|erb|ejs|hbs)$/i // Template files
];

/**
 * Load external memory path from CLAUDE.md if configured
 */
function getExternalMemoryPath() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const claudeMdPath = path.join(process.cwd(), 'CLAUDE.md');
    if (fs.existsSync(claudeMdPath)) {
      const content = fs.readFileSync(claudeMdPath, 'utf8');
      // Extract external_path from memory_configuration
      const match = content.match(/memory_configuration:\s*\n\s*external_path:\s*["']([^"']+)["']/);
      if (match) {
        let externalPath = match[1];
        // Expand ~ to home directory
        if (externalPath.startsWith('~')) {
          externalPath = path.join(require('os').homedir(), externalPath.slice(1));
        }
        return externalPath;
      }
    }
  } catch (error) {
    // Ignore errors, use default behavior
  }
  return null;
}

/**
 * Check if file path is memory-related (project or external)
 */
function isMemoryPath(filePath) {
  // Check project memory path
  if (filePath.includes('/memory/')) {
    return true;
  }
  
  // Check external memory path
  const externalMemoryPath = getExternalMemoryPath();
  if (externalMemoryPath && filePath.startsWith(externalMemoryPath)) {
    return true;
  }
  
  return false;
}

/**
 * Classifies user intent based on tool usage, parameters, and context
 * 
 * @param {string} tool - Tool name being invoked
 * @param {object} parameters - Tool parameters
 * @param {string} context - Additional context (user message, conversation context)
 * @returns {object} Classification result with intent and confidence
 */
function classifyIntent(tool, parameters = {}, context = '') {
  const startTime = process.hrtime.bigint();
  
  // Input validation
  if (!tool || typeof tool !== 'string') {
    return { intent: 'unknown', confidence: 0.0, timing: 0 };
  }
  
  const contextLower = (context || '').toLowerCase();
  const paramStr = JSON.stringify(parameters || {}).toLowerCase();
  const allContent = `${contextLower} ${paramStr}`;
  
  // Initialize scoring
  let scores = {
    research: 0.0,
    qa: 0.0,
    planning: 0.0,
    work: 0.0
  };
  
  // Check if this is an agent tool - if so, classification is final
  const isAgentTool = AGENT_TOOLS.has(tool);
  
  // Tool-based classification (primary signal)
  if (RESEARCH_TOOLS.has(tool)) {
    scores.research += 0.6;
    
    // Strengthen research for read operations with research context
    if (tool === 'Read' && (contextLower.includes('understand') || 
        contextLower.includes('analyze') || contextLower.includes('read'))) {
      scores.research += 0.2;
    }
    
    // Bash tool context analysis
    if (tool === 'Bash') {
      const command = parameters.command || '';
      if (isReadOnlyCommand(command)) {
        scores.research += 0.3;
      } else {
        scores.work += 0.6; // System modification commands - increased weight
        scores.research -= 0.2; // Reduce research score for work commands
      }
    }
  }
  
  if (WORK_TOOLS.has(tool)) {
    const filePath = parameters.file_path || '';
    
    // Strong planning indicators override work classification
    if (filePath.includes('.agenttask.') || filePath.includes('/stories/') ||
        filePath.includes('/docs/') || filePath.includes('/plans/') ||
        isMemoryPath(filePath)) {
      scores.planning += 0.7;
      scores.work += 0.2; // Still some work, but planning dominates
    } else {
      scores.work += 0.7;
    }
  }
  
  // Context pattern analysis
  
  // Q&A patterns
  let qaMatches = 0;
  for (const pattern of QA_PATTERNS) {
    if (pattern.test(allContent)) {
      qaMatches++;
    }
  }
  scores.qa += Math.min(qaMatches * 0.2, 0.6);
  
  // Planning patterns
  let planningMatches = 0;
  for (const pattern of PLANNING_PATTERNS) {
    if (pattern.test(allContent)) {
      planningMatches++;
    }
  }
  scores.planning += Math.min(planningMatches * 0.2, 0.6);
  
  // Strong planning context indicators
  if (allContent.includes('create agenttask') || allContent.includes('create story') ||
      allContent.includes('architecture') || allContent.includes('design')) {
    scores.planning += 0.3;
  }
  
  // Work intent patterns
  let workMatches = 0;
  for (const pattern of WORK_INTENT_PATTERNS) {
    if (pattern.test(allContent)) {
      workMatches++;
    }
  }
  scores.work += Math.min(workMatches * 0.3, 0.6);
  
  // Work verb analysis
  let workVerbCount = 0;
  for (const verb of WORK_VERBS) {
    if (allContent.includes(verb)) {
      workVerbCount++;
    }
  }
  scores.work += Math.min(workVerbCount * 0.1, 0.4);
  
  // File path analysis
  const filePath = parameters.file_path || parameters.path || '';
  if (filePath) {
    for (const pattern of WORK_FILE_PATTERNS) {
      if (pattern.test(filePath)) {
        scores.work += 0.2;
        break;
      }
    }
  }
  
  // Target object analysis (increases work likelihood)
  if (paramStr.includes('file_path') || paramStr.includes('.js') || paramStr.includes('.py')) {
    scores.work += 0.1;
  }
  
  // Implementation detail analysis
  if (allContent.includes('implement') || allContent.includes('code') || 
      allContent.includes('function') || allContent.includes('class')) {
    scores.work += 0.15;
  }
  
  // Question markers reduce work intent and boost Q&A
  if (contextLower.includes('?') || contextLower.startsWith('what') || 
      contextLower.startsWith('how') || contextLower.startsWith('why') ||
      contextLower.startsWith('should') || contextLower.includes('can you explain')) {
    scores.work *= 0.5;
    scores.qa += 0.4;
    scores.research *= 0.8; // Also reduce research slightly to boost qa
  }
  
  // @Role mentions suggest planning
  if (/@\w+/.test(context)) {
    scores.planning += 0.3;
    // Unless it's direct work assignment
    if (/@\w+\s+(implement|fix|deploy|create)\s+/.test(context)) {
      scores.work += 0.4;
    }
  }
  
  // Research context strengthening
  if (contextLower.includes('understand') || contextLower.includes('analyze') ||
      contextLower.includes('examine') || contextLower.includes('review')) {
    scores.research += 0.2;
  }

  // FINAL AGENT TOOL CLASSIFICATION - Override all other scoring
  // Task tool CREATES subagents - this IS the correct behavior, not a violation!
  if (isAgentTool) {
    scores.planning = 1.0;   // Maximum planning score - these ARE orchestration tools
    scores.work = 0.0;       // NEVER classify as work - this IS the approved pattern
    scores.research = 0.0;   // Clear classification - these are planning tools
    scores.qa = 0.0;         // Clear classification - these are planning tools
  }

  // Normalize scores to sum to 1.0 (except for agent tools which are already correct)
  if (!isAgentTool) {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    if (totalScore > 0) {
      Object.keys(scores).forEach(key => {
        scores[key] = Math.min(scores[key] / totalScore, 1.0);
      });
    }
  }
  
  // Find highest scoring intent
  const topIntent = Object.entries(scores).reduce((max, [intent, score]) => 
    score > max.score ? { intent, score } : max, 
    { intent: 'research', score: 0.0 }
  );
  
  // Calculate timing
  const endTime = process.hrtime.bigint();
  const timingMs = Number(endTime - startTime) / 1000000; // Convert nanoseconds to milliseconds
  
  return {
    intent: topIntent.intent,
    confidence: Math.round(topIntent.score * 1000) / 1000, // Round to 3 decimal places
    timing: Math.round(timingMs * 1000) / 1000, // Round timing to 3 decimal places
    scores: scores // Include all scores for debugging
  };
}

/**
 * Determines if a classification indicates work intent based on confidence threshold
 * 
 * @param {object} classification - Result from classifyIntent
 * @param {number} threshold - Confidence threshold (default: 0.3)
 * @returns {boolean} True if work intent is detected
 */
function isWorkIntent(classification, threshold = 0.3) {
  if (!classification || typeof classification !== 'object') {
    return false;
  }
  
  return classification.intent === 'work' && classification.confidence >= threshold;
}

/**
 * Checks if a bash command is read-only
 * 
 * @param {string} command - Bash command
 * @returns {boolean} True if command is read-only
 */
function isReadOnlyCommand(command) {
  if (!command || typeof command !== 'string') {
    return true;
  }
  
  const readOnlyCommands = [
    'ls', 'cat', 'head', 'tail', 'grep', 'find', 'which', 'whereis', 
    'pwd', 'whoami', 'date', 'ps', 'top', 'df', 'du', 'free', 'uname',
    'history', 'env', 'printenv', 'echo', 'wc', 'sort', 'uniq'
  ];
  
  const workCommands = [
    'npm', 'yarn', 'pip', 'apt', 'yum', 'brew', 'git', 'make', 'docker',
    'kubectl', 'terraform', 'ansible', 'cp', 'mv', 'rm', 'mkdir', 'chmod',
    'chown', 'ln', 'touch', 'curl', 'wget'
  ];
  
  const cmdLower = command.toLowerCase().trim();
  
  // Check for work commands first (higher priority)
  for (const workCmd of workCommands) {
    if (cmdLower.startsWith(workCmd + ' ') || cmdLower === workCmd) {
      return false;
    }
  }
  
  // Check if command starts with any read-only command
  for (const readCmd of readOnlyCommands) {
    if (cmdLower.startsWith(readCmd + ' ') || cmdLower === readCmd) {
      return true;
    }
  }
  
  // Check for pipe operations that are generally read-only
  if (cmdLower.includes(' | ') && !cmdLower.includes('tee') && !cmdLower.includes('>')) {
    return true;
  }
  
  // Check for output redirection (indicates work)
  if (cmdLower.includes('>') || cmdLower.includes('>>')) {
    return false;
  }
  
  return false; // Default to work if unsure
}

/**
 * Provides educational guidance based on intent classification
 *
 * @param {string} tool - Tool name being invoked
 * @param {object} parameters - Tool parameters
 * @param {string} context - Additional context (user message, conversation context)
 * @returns {Promise<object>} Educational guidance result with tips and reminders
 */
async function provideEducationalGuidance(tool, parameters = {}, context = '') {
  const startTime = process.hrtime.bigint();

  try {
    // First classify the intent
    const classification = classifyIntent(tool, parameters, context);
    const { intent, confidence } = classification;

    let message = '';
    let guidanceType = 'general';

    // Provide intent-specific educational guidance
    switch (intent) {
      case 'work':
        guidanceType = 'work_reminder';
        message = `🚨 CRITICAL REMINDER: NO WORK IN MAIN SCOPE

🛑 DETECTED: Work intent using ${tool} - This should go through agents!

🏗️ FUNDAMENTAL ARCHITECTURE RULE:
Main scope = Coordination and AgentTask creation ONLY
Agent scope = Technical execution via Task tool

❌ MAIN SCOPE PROHIBITIONS:
• Direct file modifications
• Code implementation
• System configuration
• Bug fixes
• Feature development

✅ CORRECT PATTERN:
1. "@Developer fix authentication bug"
2. System: Creates AgentTask with complete context
3. Task tool: Deploys to @Developer agent
4. Agent: Executes with full tool authorization

🔥 REMEMBER: Work in main scope breaks the architecture!
🎯 USE: @Role patterns for reliable, autonomous execution`;
        break;

      case 'planning':
        guidanceType = 'planning_tip';
        message = `📅 PLANNING ACTIVITY DETECTED

🎆 EXCELLENT: Planning and coordination work perfectly in main scope!

💡 TIP: Use @Role patterns for natural team coordination:
- "@PM break down story" for project management
- "@Architect design system" for architecture decisions
- "@AI-Engineer optimize behavior" for AI improvements

🏗️ PATTERN: Planning in main → Execution via agents = Perfect architecture!`;
        break;

      case 'research':
        guidanceType = 'research_tip';
        message = `🔍 RESEARCH ACTIVITY DETECTED

✅ PERFECT: Research and analysis work great in main scope!

🧠 MEMORY TIP: Check memory/[topic]/ directories first - the system stores proven patterns and solutions automatically.

📚 RESEARCH LOCATIONS:
- memory/behavioral-enforcement/
- memory/system/
- memory/patterns/
- Previous AgentTask results in agenttasks/completed/

🎆 PRINCIPLE: Memory-first approach prevents repeated work and applies proven solutions!`;
        break;

      case 'qa':
        guidanceType = 'qa_tip';
        message = `❓ Q&A ACTIVITY DETECTED

✅ EXCELLENT: Questions and explanations work perfectly in main scope!

💭 ENHANCEMENT TIP: When providing answers, consider referencing:
- Stored patterns in memory/[topic]/
- Successful AgentTask executions
- Best practices from previous work

🎆 PRINCIPLE: Knowledge sharing strengthens the entire virtual team system!`;
        break;

      default:
        message = `🎓 SYSTEM REMINDER: intelligent-claude-code Architecture

🏗️ CORE PATTERN: Main scope → AgentTask → Task tool → Agent execution

💡 REMEMBER: Use @Role patterns for natural team coordination and reliable work execution!`;
    }

    const endTime = process.hrtime.bigint();
    const timingMs = Number(endTime - startTime) / 1_000_000;

    return {
      decision: 'allow', // Always allow in educational mode
      message,
      intent: classification.intent,
      confidence: classification.confidence,
      guidance_type: guidanceType,
      timing: Math.round(timingMs * 100) / 100,
      educational_mode: true
    };

  } catch (error) {
    console.error('Error during educational guidance:', error.message);

    return {
      decision: 'allow',
      message: '🎓 EDUCATIONAL MODE: All actions allowed with learning reminders!',
      intent: 'unknown',
      confidence: 0,
      guidance_type: 'fallback',
      timing: 0,
      educational_mode: true,
      error: error.message
    };
  }
}

/**
 * Checks if a tool combination suggests AgentTask+agent pattern (educational)
 *
 * @param {string} tool - Tool name
 * @param {object} parameters - Tool parameters
 * @returns {Promise<boolean>} True if AgentTask pattern is suggested
 */
async function suggestsAgentTaskPattern(tool, parameters = {}) {
  try {
    const guidance = await provideEducationalGuidance(tool, parameters);
    return guidance.guidance_type === 'work_reminder';
  } catch (error) {
    console.error('Error checking AgentTask pattern suggestion:', error.message);
    // Default suggestion for work tools
    return WORK_TOOLS.has(tool);
  }
}

/**
 * Gets educational guidance type for a specific intent type
 *
 * @param {string} intentType - Intent type (research, qa, planning, work)
 * @returns {Promise<string>} Educational guidance type
 */
async function getEducationalGuidanceType(intentType) {
  try {
    // Map intents to educational guidance types
    const guidanceMap = {
      'work': 'work_reminder',
      'planning': 'planning_tip',
      'research': 'research_tip',
      'qa': 'qa_tip'
    };
    return guidanceMap[intentType] || 'general_tip';
  } catch (error) {
    console.error('Error getting educational guidance type:', error.message);
    return 'general_tip'; // Safe default
  }
}

module.exports = {
  classifyIntent,
  provideEducationalGuidance,
  suggestsAgentTaskPattern,
  getEducationalGuidanceType,
  isWorkIntent,
  isReadOnlyCommand,

  // Legacy function names for compatibility
  validateAction: provideEducationalGuidance,
  requiresPrbContext: suggestsAgentTaskPattern,
  getEnforcementAction: getEducationalGuidanceType,

  // Export constants for testing and system integration
  WORK_VERBS,
  RESEARCH_TOOLS,
  AGENT_TOOLS,    // CRITICAL: Export agent tools for hook system integration
  WORK_TOOLS,
  QA_PATTERNS,
  PLANNING_PATTERNS,
  WORK_INTENT_PATTERNS,
  WORK_FILE_PATTERNS
};