#!/usr/bin/env node

/**
 * Claude Code Pre-Tool-Use Hook
 * 
 * Main enforcement hook that integrates intent classification and configuration
 * to enforce behavioral patterns in intelligent-claude-code.
 * 
 * Exit codes:
 * - 0: Allow action to proceed
 * - 2: Block action with error message
 * - 1: System error (fail open)
 */

const fs = require('fs');
const path = require('path');

// Import our modules
const intentClassifier = require('./lib/intent-classifier');
const configLoader = require('./lib/config-loader');

/**
 * Memory enforcement utilities
 */
class MemoryEnforcement {
  constructor() {
    this.memorySearchWindow = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Check if AgentTask creation is being attempted
   */
  isAgentTaskCreation(tool, parameters) {
    if (tool !== 'Write' && tool !== 'MultiEdit') return false;

    const filePath = parameters.file_path || '';
    return filePath.includes('.agenttask.yaml') || filePath.includes('/agenttasks/');
  }

  /**
   * Check for recent memory search in violation logs
   */
  hasRecentMemorySearch() {
    try {
      const logDir = this._resolveLogDirectory();
      const today = new Date().toISOString().split('T')[0];
      const logFile = path.join(logDir, `violations-${today}.log`);

      if (!fs.existsSync(logFile)) return false;

      const logContent = fs.readFileSync(logFile, 'utf8');
      const lines = logContent.trim().split('\n').filter(line => line.trim());

      const cutoffTime = Date.now() - this.memorySearchWindow;

      for (const line of lines.reverse()) { // Check most recent first
        try {
          const entry = JSON.parse(line);
          const entryTime = new Date(entry.timestamp).getTime();

          if (entryTime < cutoffTime) break; // Too old

          // Check for memory search indicators
          if (entry.tool === 'Read' && (
            entry.parameters?.includes('memory') ||
            entry.context?.includes('memory') ||
            entry.reason?.includes('memory')
          )) {
            return true;
          }

          // Check for memory search commands
          if (entry.tool === 'Bash' && entry.context?.includes('memory search')) {
            return true;
          }
        } catch (parseError) {
          continue; // Skip malformed entries
        }
      }

      return false;
    } catch (error) {
      return false; // Fail open
    }
  }

  /**
   * Resolve log directory (same logic as ViolationLogger)
   */
  _resolveLogDirectory() {
    if (process.env.CLAUDE_PROJECT_DIR) {
      return path.join(process.env.CLAUDE_PROJECT_DIR, '.claude', 'logs');
    }
    return path.join(process.env.HOME || '/tmp', '.claude', 'logs');
  }

  /**
   * Generate memory enforcement error message
   */
  generateMemoryRequirementError() {
    return `🚫 MEMORY CONSULTATION REQUIRED BEFORE AGENTTASK CREATION

VIOLATION: Attempting to create AgentTask without recent memory search
REQUIREMENT: Memory consultation must occur within 5 minutes before AgentTask creation

ARCHITECTURAL RULE: MEMORY-FIRST → AGENTTASK → AGENT EXECUTION

REQUIRED PROCESS:
1. Search memory for relevant patterns: Read files in memory/ directory
2. Apply learned patterns and best practices
3. Then create AgentTask with memory-informed context
4. Deploy via Task tool to authorized agent

MEMORY LOCATIONS TO SEARCH:
- memory/behavioral-enforcement/
- memory/system/
- memory/patterns/
- memory/[relevant-domain]/

NO EXCEPTIONS - MEMORY CONSULTATION IS MANDATORY`;
  }
}

/**
 * Performance tracking
 */
const PERFORMANCE_THRESHOLD = 10; // ms

/**
 * Violation logging for analysis
 */
class ViolationLogger {
  constructor() {
    // Use project scope when available, fall back to user scope
    this.logDir = this._resolveLogDirectory();
    this.ensureLogDir();
  }

  /**
   * Resolve log directory based on project vs user scope
   * @private
   */
  _resolveLogDirectory() {
    // Check for project scope first
    if (process.env.CLAUDE_PROJECT_DIR) {
      return path.join(process.env.CLAUDE_PROJECT_DIR, '.claude', 'logs');
    }
    
    // Fall back to user scope
    return path.join(process.env.HOME || '/tmp', '.claude', 'logs');
  }

  ensureLogDir() {
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }
    } catch (error) {
      // Silent fail - don't break Claude if logging fails
    }
  }

  async logViolation(violation) {
    try {
      const logFile = path.join(this.logDir, `violations-${new Date().toISOString().split('T')[0]}.log`);
      const entry = {
        timestamp: new Date().toISOString(),
        ...violation
      };
      
      const logEntry = JSON.stringify(entry) + '\n';
      fs.appendFileSync(logFile, logEntry);
    } catch (error) {
      // Silent fail - logging failures shouldn't break Claude
    }
  }
}

/**
 * Hook input validation
 */
function validateInput(input) {
  if (!input || typeof input !== 'object') {
    return { valid: false, error: 'Invalid JSON input' };
  }

  if (!input.tool || typeof input.tool !== 'string') {
    return { valid: false, error: 'Missing or invalid tool name' };
  }

  // Parameters should be object if present
  if (input.parameters && typeof input.parameters !== 'object') {
    return { valid: false, error: 'Invalid parameters format' };
  }

  // Context can be string or object
  if (input.context && typeof input.context !== 'object' && typeof input.context !== 'string') {
    return { valid: false, error: 'Invalid context format - must be string or object' };
  }

  return { valid: true };
}

/**
 * Generate helpful error messages for blocked actions
 */
function generateErrorMessage(intent, tool, reason) {
  const baseMessage = `🚫 MAIN SCOPE EXECUTION BLOCKED`;
  
  let specificMessage = '';
  switch (intent) {
    case 'work':
      specificMessage = `Work intent detected using ${tool}. All implementation work must use AgentTask+agent pattern.`;
      break;
    case 'modification':
      specificMessage = `File modification detected using ${tool}. Modifications require AgentTask creation and agent execution.`;
      break;
    case 'system':
      specificMessage = `System operation detected using ${tool}. System changes require AgentTask authorization.`;
      break;
    default:
      specificMessage = `Action blocked: ${reason}`;
  }

  const guidance = `
ARCHITECTURAL RULE: ALL WORK → AGENTTASK → AGENT EXECUTION

REQUIRED PROCESS:
1. Create AgentTask using @Role pattern
2. Deploy via Task tool to authorized agent
3. Agent executes with full tool authorization

NO EXCEPTIONS - NO SHORTCUTS - NO COMPROMISES`;

  return `${baseMessage}

${specificMessage}

${guidance}`;
}

/**
 * Main hook processing function
 */
async function processHook(input) {
  const startTime = Date.now();
  const logger = new ViolationLogger();
  const memoryEnforcement = new MemoryEnforcement();

  try {
    // Validate input
    const validation = validateInput(input);
    if (!validation.valid) {
      return {
        allowed: true, // Fail open on validation errors
        message: `Input validation failed: ${validation.error}`,
        performance: Date.now() - startTime
      };
    }

    const { tool, parameters = {}, context = "" } = input;

    // MEMORY ENFORCEMENT: Check for AgentTask creation without memory search
    if (memoryEnforcement.isAgentTaskCreation(tool, parameters)) {
      if (!memoryEnforcement.hasRecentMemorySearch()) {
        // Log memory violation
        await logger.logViolation({
          tool,
          intent: 'memory_violation',
          reason: 'AgentTask creation without memory consultation',
          parameters: Object.keys(parameters),
          context: 'AgentTask creation detected',
          violation_type: 'memory_enforcement'
        });

        return {
          allowed: false,
          message: memoryEnforcement.generateMemoryRequirementError(),
          performance: Date.now() - startTime
        };
      } else {
        // Log successful memory compliance and allow AgentTask creation
        await logger.logViolation({
          tool,
          intent: 'memory_compliance',
          reason: 'AgentTask creation with memory consultation',
          parameters: Object.keys(parameters),
          context: 'Memory requirement satisfied',
          violation_type: 'memory_compliance'
        });

        // Allow AgentTask creation when memory requirement is satisfied
        return {
          allowed: true,
          message: 'AgentTask creation allowed with memory consultation',
          performance: Date.now() - startTime
        };
      }
    }

    // Prepare context for classifier (expects string)
    const contextString = typeof context === 'string' ? context : JSON.stringify(context);

    // Classify the intent using our classifier
    const classification = await intentClassifier.classifyIntent(tool, parameters, contextString);

    // Get enforcement configuration
    const enforcement = await configLoader.getEnforcement(classification.intent);

    // Check if action should be blocked
    const shouldBlock = (enforcement === 'block' || enforcement === 'require_prb_context') &&
                       classification.confidence >= 0.6;

    if (shouldBlock) {
      // Log violation for analysis
      await logger.logViolation({
        tool,
        intent: classification.intent,
        confidence: classification.confidence,
        reason: classification.reason,
        parameters: Object.keys(parameters),
        context: Object.keys(context)
      });

      const errorMessage = generateErrorMessage(
        classification.intent,
        tool,
        classification.reason
      );

      return {
        allowed: false,
        message: errorMessage,
        performance: Date.now() - startTime
      };
    }

    // Action allowed
    return {
      allowed: true,
      message: `${classification.intent} intent allowed`,
      performance: Date.now() - startTime
    };

  } catch (error) {
    // Log error but fail open to avoid breaking Claude
    await logger.logViolation({
      error: error.message,
      tool: input?.tool || 'unknown',
      type: 'system_error'
    });

    return {
      allowed: true, // Fail open on system errors
      message: `System error (failing open): ${error.message}`,
      performance: Date.now() - startTime
    };
  }
}

/**
 * Main hook execution
 */
async function main() {
  try {
    // Read JSON input from stdin
    let inputData = '';
    
    // Handle stdin data
    if (process.stdin.isTTY) {
      // No piped input - exit with error
      console.error('Error: Hook expects JSON input from stdin');
      process.exit(1);
    }

    process.stdin.setEncoding('utf8');
    
    for await (const chunk of process.stdin) {
      inputData += chunk;
    }

    if (!inputData.trim()) {
      console.error('Error: No input received');
      process.exit(1);
    }

    // Parse JSON input
    let input;
    try {
      input = JSON.parse(inputData);
    } catch (error) {
      console.error(`Error parsing JSON: ${error.message}`);
      process.exit(1);
    }

    // Process the hook
    const result = await processHook(input);

    // Check performance
    if (result.performance > PERFORMANCE_THRESHOLD) {
      console.warn(`Warning: Hook took ${result.performance}ms (threshold: ${PERFORMANCE_THRESHOLD}ms)`);
    }

    // Output result and exit with appropriate code
    if (result.allowed) {
      console.log(`ALLOWED: ${result.message}`);
      process.exit(0);
    } else {
      console.error(result.message);
      process.exit(2);
    }

  } catch (error) {
    console.error(`Hook system error: ${error.message}`);
    process.exit(1); // Fail open
  }
}

// Handle uncaught errors gracefully
process.on('uncaughtException', (error) => {
  console.error(`Uncaught exception: ${error.message}`);
  process.exit(1); // Fail open
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled rejection: ${reason}`);
  process.exit(1); // Fail open
});

// Run the hook
if (require.main === module) {
  main();
}

module.exports = { processHook, generateErrorMessage, validateInput };