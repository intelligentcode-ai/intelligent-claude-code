#!/usr/bin/env node

/**
 * Claude Code Post-Tool-Use Hook
 *
 * Provides educational reminders about intelligent-claude-code system principles
 * and enforces memory storage after PRB execution to capture learning patterns.
 *
 * Features:
 * - Random educational reminders about @Role patterns, AgentTask workflow, memory-first approach
 * - Memory storage enforcement after PRB execution
 * - System principle reinforcement through post-tool notifications
 *
 * Exit codes:
 * - 0: Success (continue normal operation)
 * - 1: Warning (log but continue)
 */

const fs = require('fs');
const path = require('path');

// Import reminder loader for dynamic reminders
const ReminderLoader = require('./lib/reminder-loader');

/**
 * Performance tracking
 */
const PERFORMANCE_THRESHOLD = 5; // ms (faster than pre-hook)

/**
 * Educational reminder system for intelligent-claude-code principles
 * Now uses dynamic loading from reminders.json with fallback to hardcoded defaults
 */
class EducationalReminderSystem {
  constructor() {
    this.reminderLoader = new ReminderLoader();
  }

  /**
   * Get random educational reminder (legacy compatibility)
   */
  getRandomReminder() {
    return this.reminderLoader.getRandomReminder('postAction');
  }

  /**
   * Check if educational reminder should be shown (random chance + context)
   */
  shouldShowReminder(tool, parameters, result) {
    // ALWAYS show a reminder for every tool use
    return true;
  }

  /**
   * Generate educational reminder message
   */
  generateEducationalReminder() {
    return this.reminderLoader.getPostExecutionReminder();
  }

  /**
   * Get system reminder
   */
  getSystemReminder() {
    return this.reminderLoader.getSystemReminder();
  }
}

/**
 * Memory storage enforcement
 */
class MemoryStorageEnforcement {
  constructor() {
    // Use project scope when available
    this.logDir = this._resolveLogDirectory();
    this.memoryDir = this._resolveMemoryDirectory();
    this.ensureDirectories();
  }

  /**
   * Resolve log directory based on project vs user scope
   * @private
   */
  _resolveLogDirectory() {
    if (process.env.CLAUDE_PROJECT_DIR) {
      return path.join(process.env.CLAUDE_PROJECT_DIR, '.claude', 'logs');
    }
    return path.join(process.env.HOME || '/tmp', '.claude', 'logs');
  }

  /**
   * Resolve memory directory based on project scope
   * @private
   */
  _resolveMemoryDirectory() {
    if (process.env.CLAUDE_PROJECT_DIR) {
      return path.join(process.env.CLAUDE_PROJECT_DIR, 'memory');
    }
    return path.join(process.cwd(), 'memory');
  }

  ensureDirectories() {
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }
      if (!fs.existsSync(this.memoryDir)) {
        fs.mkdirSync(this.memoryDir, { recursive: true });
      }
    } catch (error) {
      // Silent fail - don't break Claude if directory creation fails
    }
  }

  /**
   * Check if this was a PRB completion
   */
  isPRBCompletion(tool, parameters, result) {
    if (tool !== 'Write' && tool !== 'MultiEdit') return false;

    const filePath = parameters.file_path || '';
    const content = parameters.content || parameters.new_string || '';

    // Check for PRB completion indicators
    const isAgentTaskFile = filePath.includes('.agenttask.yaml') || filePath.includes('/agenttasks/');
    const hasCompletionMarkers = content.includes('✅') ||
                                content.includes('COMPLETED') ||
                                content.includes('execution_summary') ||
                                content.includes('Step_') ||
                                content.includes('completion_definition') ||
                                content.includes('done_when');

    return isAgentTaskFile && hasCompletionMarkers;
  }

  /**
   * Extract learning opportunities from PRB content
   */
  extractLearningOpportunities(content) {
    const opportunities = [];

    // Extract domain from content
    const domains = this._extractDomains(content);

    // Extract patterns and solutions
    const patterns = this._extractPatterns(content);

    // Extract issues and resolutions
    const issues = this._extractIssues(content);

    if (domains.length > 0) {
      opportunities.push({
        type: 'domain_knowledge',
        domains: domains,
        suggestion: `Store domain-specific patterns in memory/${domains[0]}/`
      });
    }

    if (patterns.length > 0) {
      opportunities.push({
        type: 'solution_pattern',
        patterns: patterns,
        suggestion: 'Store successful implementation patterns for reuse'
      });
    }

    if (issues.length > 0) {
      opportunities.push({
        type: 'issue_resolution',
        issues: issues,
        suggestion: 'Store issue resolution patterns to prevent recurrence'
      });
    }

    return opportunities;
  }

  /**
   * Extract technical domains from content
   * @private
   */
  _extractDomains(content) {
    const domains = [];
    const domainPatterns = [
      /behavioral[_-]?enforcement/i,
      /system[_-]?configuration/i,
      /hook[_-]?implementation/i,
      /memory[_-]?management/i,
      /prb[_-]?execution/i,
      /git[_-]?operations/i,
      /file[_-]?operations/i,
      /javascript[_-]?implementation/i,
      /node\.?js/i,
      /automation/i,
      /testing/i,
      /validation/i
    ];

    for (const pattern of domainPatterns) {
      if (pattern.test(content)) {
        const match = pattern.source.replace(/[^a-z_-]/gi, '').replace(/_/g, '-');
        domains.push(match.toLowerCase());
      }
    }

    return [...new Set(domains)]; // Remove duplicates
  }

  /**
   * Extract solution patterns from content
   * @private
   */
  _extractPatterns(content) {
    const patterns = [];

    // Look for implementation patterns
    if (content.includes('class ') && content.includes('constructor')) {
      patterns.push('class-based-implementation');
    }

    if (content.includes('async function') || content.includes('await ')) {
      patterns.push('async-pattern');
    }

    if (content.includes('try {') && content.includes('catch')) {
      patterns.push('error-handling');
    }

    if (content.includes('fs.existsSync') || content.includes('fs.readFileSync')) {
      patterns.push('file-system-operations');
    }

    if (content.includes('JSON.parse') || content.includes('JSON.stringify')) {
      patterns.push('json-processing');
    }

    return patterns;
  }

  /**
   * Extract issue and resolution patterns
   * @private
   */
  _extractIssues(content) {
    const issues = [];

    // Look for common issue indicators
    if (content.includes('BLOCKED') || content.includes('ERROR')) {
      issues.push('blocking-error-resolution');
    }

    if (content.includes('violation') || content.includes('compliance')) {
      issues.push('compliance-enforcement');
    }

    if (content.includes('timeout') || content.includes('performance')) {
      issues.push('performance-optimization');
    }

    return issues;
  }

  /**
   * Generate memory storage reminder
   */
  generateMemoryReminder(opportunities) {
    // Just use a simple one-line reminder from the educational system
    const educationalReminder = new EducationalReminderSystem();
    return educationalReminder.generateEducationalReminder();
  }

  /**
   * Log memory opportunity for analysis
   */
  async logMemoryOpportunity(tool, parameters, opportunities) {
    try {
      const logFile = path.join(this.logDir, `memory-opportunities-${new Date().toISOString().split('T')[0]}.log`);
      const entry = {
        timestamp: new Date().toISOString(),
        tool,
        file_path: parameters.file_path,
        opportunities: opportunities.map(opp => ({
          type: opp.type,
          domains: opp.domains,
          patterns: opp.patterns,
          issues: opp.issues
        })),
        memory_dir: this.memoryDir,
        reminder_shown: true
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

  return { valid: true };
}

/**
 * Main hook processing function
 */
async function processHook(input) {
  const startTime = Date.now();
  const memoryEnforcement = new MemoryStorageEnforcement();
  const educationalReminder = new EducationalReminderSystem();

  try {
    // Validate input
    const validation = validateInput(input);
    if (!validation.valid) {
      return {
        success: true, // Don't block on validation errors
        message: `Input validation failed: ${validation.error}`,
        performance: Date.now() - startTime
      };
    }

    const { tool, parameters = {}, result = {} } = input;

    // Check for PRB completion and memory opportunities (priority)
    if (memoryEnforcement.isPRBCompletion(tool, parameters, result)) {
      const content = parameters.content || parameters.new_string || '';
      const opportunities = memoryEnforcement.extractLearningOpportunities(content);

      if (opportunities.length > 0) {
        // Log the opportunity
        await memoryEnforcement.logMemoryOpportunity(tool, parameters, opportunities);

        // Generate reminder message
        const reminder = memoryEnforcement.generateMemoryReminder(opportunities);

        return {
          success: true,
          message: reminder,
          performance: Date.now() - startTime,
          learning_opportunities: opportunities.length
        };
      }
    }

    // Check if educational reminder should be shown
    if (educationalReminder.shouldShowReminder(tool, parameters, result)) {
      const reminder = educationalReminder.generateEducationalReminder();

      return {
        success: true,
        message: reminder,
        performance: Date.now() - startTime,
        reminder_type: 'educational'
      };
    }

    // No memory opportunities or reminders needed
    return {
      success: true,
      message: `Post-hook processing completed`,
      performance: Date.now() - startTime
    };

  } catch (error) {
    // Log error but continue normally
    return {
      success: true, // Don't break Claude on post-hook errors
      message: `Post-hook warning: ${error.message}`,
      performance: Date.now() - startTime
    };
  }
}

/**
 * Convert Claude Code hook format to internal hook format
 */
function convertClaudeCodeInput(claudeInput) {
  // If input already has the expected format, use it as-is
  if (claudeInput.tool && claudeInput.parameters !== undefined) {
    return claudeInput;
  }

  // Handle Claude Code PostToolUse format
  if (claudeInput.hook_event_name === 'PostToolUse' && claudeInput.tool_name && claudeInput.tool_result) {
    return {
      tool: claudeInput.tool_name,
      parameters: claudeInput.tool_input || {},
      result: claudeInput.tool_result,
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
    result: claudeInput.tool_result || claudeInput.result || {},
    context: claudeInput.context || claudeInput
  };
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
        // If synchronous read fails, fail open with minimal processing
        console.log(JSON.stringify({continue: true}));  // No message needed when no input
        process.exit(0);
      }
    } else {
      // No input available - fail open for graceful handling
      console.log(JSON.stringify({continue: true}));  // No message needed when no input
      process.exit(0);
    }

    if (!inputData.trim()) {
      // No input data - fail open gracefully
      console.log(JSON.stringify({continue: true}));  // No message needed when no input
      process.exit(0);
    }

    // Parse JSON input
    let claudeInput;
    try {
      claudeInput = JSON.parse(inputData);
    } catch (error) {
      // JSON parse error - fail open gracefully
      console.log(JSON.stringify({continue: true}));  // Continue on parse error
      process.exit(0);
    }

    // Convert Claude Code format to internal format
    const input = convertClaudeCodeInput(claudeInput);

    // Process the hook asynchronously
    processHook(input).then(result => {
      // Check performance
      if (result.performance > PERFORMANCE_THRESHOLD) {
        console.warn(`Warning: Post-hook took ${result.performance}ms (threshold: ${PERFORMANCE_THRESHOLD}ms)`);
      }

      // Output result in Claude Code expected JSON format
      const output = {
        continue: true,  // Always continue for post-hooks
        hookSpecificOutput: {
          hookEventName: "PostToolUse",
          additionalContext: result.message  // This adds context directly to Claude
        }
      };

      console.log(JSON.stringify(output));
      process.exit(0);
    }).catch(error => {
      console.warn(`Post-hook warning: ${error.message}`);
      process.exit(0); // Don't break Claude on post-hook errors
    });

  } catch (error) {
    console.warn(`Post-hook system error: ${error.message}`);
    process.exit(0); // Fail open
  }
}

// Handle uncaught errors gracefully
process.on('uncaughtException', (error) => {
  console.warn(`Post-hook uncaught exception: ${error.message}`);
  process.exit(0); // Don't break Claude
});

process.on('unhandledRejection', (reason, promise) => {
  console.warn(`Post-hook unhandled rejection: ${reason}`);
  process.exit(0); // Don't break Claude
});

// Run the hook
if (require.main === module) {
  main();
}

module.exports = { processHook, validateInput, convertClaudeCodeInput };