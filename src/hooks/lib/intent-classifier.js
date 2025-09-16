/**
 * Intent Classification Engine for intelligent-claude-code
 * 
 * Classifies user intents based on tool usage, parameters, and context to determine
 * if actions should be allowed in main scope or require PRB+agent execution.
 * 
 * Intent Categories:
 * - research: Reading, searching, analyzing (ALLOWED in main scope)
 * - qa: Answering questions, explaining (ALLOWED in main scope)  
 * - planning: Creating PRBs, architectural discussions (ALLOWED in main scope)
 * - work: Implementing, fixing, modifying code (BLOCKED in main scope)
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
    if (filePath.includes('.prb.') || filePath.includes('/stories/') || 
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
  if (allContent.includes('create prb') || allContent.includes('create story') ||
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
  
  // Normalize scores to sum to 1.0
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  if (totalScore > 0) {
    Object.keys(scores).forEach(key => {
      scores[key] = Math.min(scores[key] / totalScore, 1.0);
    });
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
 * Validates if an action is allowed based on intent classification and configuration
 * 
 * @param {string} tool - Tool name being invoked
 * @param {object} parameters - Tool parameters
 * @param {string} context - Additional context (user message, conversation context)
 * @returns {Promise<object>} Validation result with decision and enforcement action
 */
async function validateAction(tool, parameters = {}, context = '') {
  const startTime = process.hrtime.bigint();
  
  try {
    // First classify the intent
    const classification = classifyIntent(tool, parameters, context);
    const { intent, confidence } = classification;
    
    // Get configuration for the classified intent
    const intentConfig = await configLoader.getIntentConfig(intent);
    
    // Check tool allowance
    const isToolAllowed = await configLoader.isToolAllowed(intent, tool);
    
    // Check parameter patterns
    let parameterViolations = [];
    if (parameters) {
      for (const [key, value] of Object.entries(parameters)) {
        const paramString = `${key}=${value}`;
        const isParamAllowed = await configLoader.isParameterAllowed(intent, paramString);
        if (!isParamAllowed) {
          parameterViolations.push(`${key}=${value}`);
        }
      }
    }
    
    // Check file path patterns
    let pathViolations = [];
    const filePaths = [];
    
    // Extract file paths from parameters
    if (parameters.file_path) filePaths.push(parameters.file_path);
    if (parameters.path) filePaths.push(parameters.path);
    if (parameters.pattern && parameters.pattern.includes('/')) filePaths.push(parameters.pattern);
    
    for (const filePath of filePaths) {
      const isPathAllowed = await configLoader.isPathAllowed(intent, filePath);
      if (!isPathAllowed) {
        pathViolations.push(filePath);
      }
    }
    
    // Determine overall decision
    const hasViolations = !isToolAllowed || parameterViolations.length > 0 || pathViolations.length > 0;
    const enforcement = await configLoader.getEnforcement(intent);
    
    let decision = 'allow';
    let message = '';
    
    if (hasViolations) {
      switch (enforcement) {
        case 'allow':
          decision = 'allow';
          message = 'Action allowed despite pattern violations';
          break;
        case 'warn':
          decision = 'warn';
          message = 'Action allowed with warnings';
          break;
        case 'block':
          decision = 'block';
          message = 'Action blocked due to policy violations';
          break;
        case 'require_prb_context':
          decision = 'require_prb';
          message = 'Action requires PRB+agent execution';
          break;
        default:
          decision = 'warn';
          message = 'Unknown enforcement policy, defaulting to warn';
      }
    }
    
    const endTime = process.hrtime.bigint();
    const timingMs = Number(endTime - startTime) / 1_000_000;
    
    return {
      decision,
      message,
      intent: classification.intent,
      confidence: classification.confidence,
      violations: {
        tool: !isToolAllowed,
        parameters: parameterViolations,
        paths: pathViolations
      },
      enforcement,
      timing: Math.round(timingMs * 100) / 100
    };
    
  } catch (error) {
    console.error('Error during action validation:', error.message);
    
    // Fallback to basic classification
    const classification = classifyIntent(tool, parameters, context);
    return {
      decision: classification.intent === 'work' ? 'require_prb' : 'allow',
      message: 'Validation error, using basic classification',
      intent: classification.intent,
      confidence: classification.confidence,
      violations: { tool: false, parameters: [], paths: [] },
      enforcement: 'warn',
      timing: 0,
      error: error.message
    };
  }
}

/**
 * Checks if a specific tool and parameter combination requires PRB context
 * 
 * @param {string} tool - Tool name
 * @param {object} parameters - Tool parameters
 * @returns {Promise<boolean>} True if PRB context is required
 */
async function requiresPrbContext(tool, parameters = {}) {
  try {
    const validation = await validateAction(tool, parameters);
    return validation.decision === 'require_prb' || validation.intent === 'work';
  } catch (error) {
    console.error('Error checking PRB context requirement:', error.message);
    // Default to requiring PRB for work tools
    return WORK_TOOLS.has(tool);
  }
}

/**
 * Gets enforcement action for a specific intent type
 * 
 * @param {string} intentType - Intent type (research, qa, planning, work)
 * @returns {Promise<string>} Enforcement action
 */
async function getEnforcementAction(intentType) {
  try {
    return await configLoader.getEnforcement(intentType);
  } catch (error) {
    console.error('Error getting enforcement action:', error.message);
    return 'warn'; // Safe default
  }
}

module.exports = {
  classifyIntent,
  validateAction,
  requiresPrbContext,
  getEnforcementAction,
  isWorkIntent,
  isReadOnlyCommand,
  
  // Export constants for testing
  WORK_VERBS,
  RESEARCH_TOOLS,
  WORK_TOOLS,
  QA_PATTERNS,
  PLANNING_PATTERNS,
  WORK_INTENT_PATTERNS,
  WORK_FILE_PATTERNS
};