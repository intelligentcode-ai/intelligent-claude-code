#!/usr/bin/env node

/**
 * Claude Code Pre-Tool-Use Hook
 *
 * Educational reminder system that provides helpful guidance about intelligent-claude-code
 * behavioral patterns. NO BLOCKING - all actions are allowed with educational reminders.
 *
 * Exit codes:
 * - 0: Always allow action to proceed (educational mode only)
 * - 1: System error (fail open)
 */

const fs = require('fs');
const path = require('path');

// Import our modules
const intentClassifier = require('./lib/intent-classifier');
const configLoader = require('./lib/config-loader');
const ReminderLoader = require('./lib/reminder-loader');

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
   * Generate memory consultation reminder message
   */
  generateMemoryConsultationReminder() {
    // Use dynamic reminder loader for memory guidance
    const reminderLoader = new ReminderLoader();
    return reminderLoader.getMemoryGuidanceReminder();
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

  logViolationSync(violation) {
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
 * Educational reminder system for intelligent-claude-code principles
 * Now uses dynamic loading from reminders.json with fallback to hardcoded defaults
 */
class EducationalReminderSystem {
  constructor() {
    this.reminderLoader = new ReminderLoader();
  }

  /**
   * Get random pre-execution reminder (legacy compatibility)
   */
  getRandomPreExecutionReminder() {
    return this.reminderLoader.getRandomReminder('preAction');
  }

  /**
   * Generate pre-execution educational reminder
   */
  generatePreExecutionReminder() {
    return this.reminderLoader.getPreExecutionReminder();
  }

  /**
   * Check if educational reminder should be shown (random chance)
   */
  shouldShowPreExecutionReminder(tool) {
    // Show reminder for certain tools with random chance
    const educationalTools = ['Write', 'Edit', 'MultiEdit', 'Bash'];
    const isEducationalTool = educationalTools.includes(tool);

    // Show reminder 20% of the time for educational tools, 5% for others
    const showChance = isEducationalTool ? 0.20 : 0.05;
    return Math.random() < showChance;
  }

  /**
   * Get memory guidance reminder
   */
  generateMemoryConsultationReminder() {
    return this.reminderLoader.getMemoryGuidanceReminder();
  }
}

/**
 * Generate educational reminder messages for work patterns
 */
function generateEducationalMessage(intent, tool, reason) {
  // Create reminder system for dynamic reminder loading
  const reminderSystem = new EducationalReminderSystem();

  // Always return just a one-line reminder
  return reminderSystem.generatePreExecutionReminder();
}

/**
 * Convert Claude Code input format to internal format
 */
function convertClaudeCodeInput(claudeInput) {
  // If input already has the expected format, use it as-is
  if (claudeInput.tool && claudeInput.parameters !== undefined) {
    return claudeInput;
  }

  // Handle Claude Code PreToolUse format
  if (claudeInput.hook_event_name === 'PreToolUse' && claudeInput.tool_name && claudeInput.tool_input) {
    return {
      tool: claudeInput.tool_name,
      parameters: claudeInput.tool_input || {},
      context: {
        session_id: claudeInput.session_id,
        cwd: claudeInput.cwd,
        transcript_path: claudeInput.transcript_path
      }
    };
  }

  // Handle legacy format or other formats - extract what we can
  return {
    tool: claudeInput.tool_name || claudeInput.tool || 'Unknown',
    parameters: claudeInput.tool_input || claudeInput.parameters || {},
    context: claudeInput.context || claudeInput
  };
}

/**
 * Synchronous version of processHook to avoid async/await stdin issues
 */
function processHookSync(input) {
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

    // MEMORY GUIDANCE: Educational reminder for AgentTask creation
    if (memoryEnforcement.isAgentTaskCreation(tool, parameters)) {
      if (!memoryEnforcement.hasRecentMemorySearch()) {
        // Log memory guidance opportunity (synchronous)
        logger.logViolationSync({
          tool,
          intent: 'memory_guidance',
          reason: 'AgentTask creation - memory consultation suggested',
          parameters: Object.keys(parameters),
          context: 'AgentTask creation detected',
          violation_type: 'educational_guidance'
        });

        return {
          allowed: true, // ALWAYS ALLOW - educational mode only
          message: memoryEnforcement.generateMemoryConsultationReminder(),
          performance: Date.now() - startTime
        };
      } else {
        // Log successful memory practice
        logger.logViolationSync({
          tool,
          intent: 'memory_compliance',
          reason: 'AgentTask creation with memory consultation - excellent practice!',
          parameters: Object.keys(parameters),
          context: 'Memory-first approach applied',
          violation_type: 'best_practice'
        });

        // Positive reinforcement for good practices
        return {
          allowed: true,
          message: '✅ EXCELLENT: AgentTask creation with memory consultation - following best practices!',
          performance: Date.now() - startTime
        };
      }
    }

    // Prepare context for classifier (expects string)
    const contextString = typeof context === 'string' ? context : JSON.stringify(context);

    // Classify the intent using our classifier (synchronous)
    const classification = intentClassifier.classifyIntent(tool, parameters, contextString);

    // Get enforcement configuration (convert async to sync for this critical path)
    let enforcement;
    try {
      // Create a simple synchronous enforcement lookup
      const enforcementConfig = {
        work: 'block',
        modification: 'block',
        system: 'block',
        research: 'allow',
        qa: 'allow',
        planning: 'allow'
      };
      enforcement = enforcementConfig[classification.intent] || 'allow';
    } catch (error) {
      enforcement = 'allow'; // Fail open
    }

    // ALWAYS show educational reminders regardless of classification
    const shouldShowReminder = true;

    if (shouldShowReminder) {
      // Log educational opportunity for analysis (synchronous)
      logger.logViolationSync({
        tool,
        intent: classification.intent,
        confidence: classification.confidence,
        reason: classification.reason,
        parameters: Object.keys(parameters),
        context: Object.keys(context),
        educational_mode: true
      });

      const educationalMessage = generateEducationalMessage(
        classification.intent,
        tool,
        classification.reason
      );

      return {
        allowed: true, // ALWAYS ALLOW - educational mode only
        message: educationalMessage,
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
    // Log error but fail open to avoid breaking Claude (synchronous)
    logger.logViolationSync({
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
 * Main hook processing function (kept for backward compatibility)
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

    // MEMORY GUIDANCE: Educational reminder for AgentTask creation
    if (memoryEnforcement.isAgentTaskCreation(tool, parameters)) {
      if (!memoryEnforcement.hasRecentMemorySearch()) {
        // Log memory guidance opportunity
        await logger.logViolation({
          tool,
          intent: 'memory_guidance',
          reason: 'AgentTask creation - memory consultation suggested',
          parameters: Object.keys(parameters),
          context: 'AgentTask creation detected',
          violation_type: 'educational_guidance'
        });

        return {
          allowed: true, // ALWAYS ALLOW - educational mode only
          message: memoryEnforcement.generateMemoryConsultationReminder(),
          performance: Date.now() - startTime
        };
      } else {
        // Log successful memory practice
        await logger.logViolation({
          tool,
          intent: 'memory_compliance',
          reason: 'AgentTask creation with memory consultation - excellent practice!',
          parameters: Object.keys(parameters),
          context: 'Memory-first approach applied',
          violation_type: 'best_practice'
        });

        // Positive reinforcement for good practices
        return {
          allowed: true,
          message: '✅ EXCELLENT: AgentTask creation with memory consultation - following best practices!',
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

    // ALWAYS show educational reminders regardless of classification
    const shouldShowReminder = true;

    if (shouldShowReminder) {
      // Log educational opportunity for analysis
      await logger.logViolation({
        tool,
        intent: classification.intent,
        confidence: classification.confidence,
        reason: classification.reason,
        parameters: Object.keys(parameters),
        context: Object.keys(context),
        educational_mode: true
      });

      const educationalMessage = generateEducationalMessage(
        classification.intent,
        tool,
        classification.reason
      );

      return {
        allowed: true, // ALWAYS ALLOW - educational mode only
        message: educationalMessage,
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
function main() {
  try {
    let inputData = '';

    // Priority 1: Command line argument (for testing/debugging)
    if (process.argv[2]) {
      inputData = process.argv[2];
    }
    // Priority 2: Environment variable (for testing/debugging)
    else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    }
    // Priority 3: Claude Code provides JSON via stdin (primary method)
    else if (!process.stdin.isTTY) {
      // Try to read from stdin synchronously
      try {
        const stdinBuffer = fs.readFileSync(0, 'utf8');
        if (stdinBuffer && stdinBuffer.trim()) {
          inputData = stdinBuffer;
        }
      } catch (error) {
        // If synchronous read fails, fail open with minimal enforcement
        console.log(JSON.stringify({continue: true, systemMessage: 'No input data available, failing open'}));
        process.exit(0);
      }
    } else {
      // No input available - fail open for graceful handling
      console.log(JSON.stringify({continue: true, systemMessage: 'No input source available, failing open'}));
      process.exit(0);
    }

    if (!inputData.trim()) {
      // No input data - fail open gracefully
      console.log(JSON.stringify({continue: true, systemMessage: 'No input data provided, failing open'}));
      process.exit(0);
    }

    // Parse JSON input
    let claudeInput;
    try {
      claudeInput = JSON.parse(inputData);
    } catch (error) {
      // JSON parse error - fail open gracefully
      console.log(JSON.stringify({continue: true, systemMessage: `JSON parse error, failing open (${error.message})`}));
      process.exit(0);
    }

    // Convert Claude Code format to internal format
    const input = convertClaudeCodeInput(claudeInput);

    // Process the hook synchronously
    const result = processHookSync(input);

    // Check performance
    if (result.performance > PERFORMANCE_THRESHOLD) {
      console.warn(`Warning: Hook took ${result.performance}ms (threshold: ${PERFORMANCE_THRESHOLD}ms)`);
    }

    // Output result in Claude Code expected JSON format
    const output = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        additionalContext: result.message
      }
    };

    // Debug logging to stderr and file
    const logEntry = {
      timestamp: new Date().toISOString(),
      tool: input?.tool || 'unknown',
      output: output,
      message: result.message
    };

    console.error(`[PRE-HOOK DEBUG] ${JSON.stringify(logEntry)}`);

    try {
      const logFile = path.join(process.env.HOME || '/tmp', '.claude', 'logs', `pre-hook-debug-${new Date().toISOString().split('T')[0]}.log`);
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    } catch (error) {
      console.error(`[PRE-HOOK] Logging failed: ${error.message}`);
    }

    console.log(JSON.stringify(output));
    process.exit(0); // Always exit 0 in educational mode

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

module.exports = {
  processHook,
  generateEducationalMessage,
  validateInput,
  convertClaudeCodeInput,
  EducationalReminderSystem
};