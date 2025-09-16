#!/usr/bin/env node

/**
 * Claude Code Post-Tool-Use Hook
 *
 * Enforces memory storage after PRB execution to capture learning patterns
 * and ensure knowledge accumulation in the intelligent-claude-code system.
 *
 * Exit codes:
 * - 0: Success (continue normal operation)
 * - 1: Warning (log but continue)
 */

const fs = require('fs');
const path = require('path');

/**
 * Performance tracking
 */
const PERFORMANCE_THRESHOLD = 5; // ms (faster than pre-hook)

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
    const isPRBFile = filePath.includes('.prb.yaml') || filePath.includes('/prbs/');
    const hasCompletionMarkers = content.includes('✅') ||
                                content.includes('COMPLETED') ||
                                content.includes('execution_summary') ||
                                content.includes('Step_') ||
                                content.includes('completion_definition') ||
                                content.includes('done_when');

    console.log(`DEBUG: isPRBFile=${isPRBFile}, hasCompletionMarkers=${hasCompletionMarkers}, filePath=${filePath}`);

    return isPRBFile && hasCompletionMarkers;
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
    let reminder = `📚 MEMORY STORAGE OPPORTUNITY DETECTED\n\n`;
    reminder += `PRB execution completed. Consider storing learnings for future reuse:\n\n`;

    opportunities.forEach((opportunity, index) => {
      reminder += `${index + 1}. ${opportunity.type.toUpperCase()}:\n`;
      reminder += `   ${opportunity.suggestion}\n`;

      if (opportunity.domains) {
        reminder += `   Domains: ${opportunity.domains.join(', ')}\n`;
      }
      if (opportunity.patterns) {
        reminder += `   Patterns: ${opportunity.patterns.join(', ')}\n`;
      }
      if (opportunity.issues) {
        reminder += `   Issues: ${opportunity.issues.join(', ')}\n`;
      }
      reminder += `\n`;
    });

    reminder += `MEMORY STORAGE LOCATIONS:\n`;
    reminder += `- memory/behavioral-enforcement/ (behavioral patterns)\n`;
    reminder += `- memory/system/ (system operations)\n`;
    reminder += `- memory/patterns/ (implementation patterns)\n`;
    reminder += `- memory/[domain]/ (domain-specific knowledge)\n\n`;

    reminder += `LEARNING CAPTURE PRINCIPLE: Every PRB completion is a learning opportunity!`;

    return reminder;
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

    // Check for PRB completion and memory opportunities
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

    // No memory opportunities detected
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
 * Main hook execution
 */
async function main() {
  try {
    // Read JSON input from stdin
    let inputData = '';

    // Handle stdin data
    if (process.stdin.isTTY) {
      // No piped input - this is normal for post-hooks, just exit
      process.exit(0);
    }

    process.stdin.setEncoding('utf8');

    for await (const chunk of process.stdin) {
      inputData += chunk;
    }

    if (!inputData.trim()) {
      // No input is normal for post-hooks
      process.exit(0);
    }

    // Parse JSON input
    let input;
    try {
      input = JSON.parse(inputData);
    } catch (error) {
      console.warn(`Post-hook JSON parse warning: ${error.message}`);
      process.exit(0);
    }

    // Process the hook
    const result = await processHook(input);

    // Check performance
    if (result.performance > PERFORMANCE_THRESHOLD) {
      console.warn(`Warning: Post-hook took ${result.performance}ms (threshold: ${PERFORMANCE_THRESHOLD}ms)`);
    }

    // Output result - always success for post-hooks
    console.log(result.message);
    process.exit(0);

  } catch (error) {
    console.warn(`Post-hook warning: ${error.message}`);
    process.exit(0); // Don't break Claude on post-hook errors
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

module.exports = { processHook, validateInput };