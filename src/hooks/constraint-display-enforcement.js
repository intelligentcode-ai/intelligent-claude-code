#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { selectRelevantConstraints } = require('./lib/constraint-selector');

/**
 * PostToolUse Hook: Constraint Display Enforcement
 *
 * MECHANICALLY ENFORCES RECURSIVE-DISPLAY meta-rule by appending constraint
 * display to significant tool outputs.
 *
 * Displays 6 constraints (3 situation-related + 3 cycling) + up to 3 best practices
 * after significant tool executions (Write, Edit, Task, Bash).
 *
 * RATIONALE: Read/Grep operations are too frequent for constraint display.
 * Focus on tools that perform actual work/changes.
 *
 * STATUS: OPTIONAL ENFORCEMENT HOOK (not activated by default)
 *
 * ACTIVATION: Add to settings.json PostToolUse hooks:
 * {
 *   "hooks": {
 *     "PostToolUse": [
 *       {
 *         "matcher": "*",
 *         "hooks": [
 *           {
 *             "type": "command",
 *             "command": "node ~/.claude/hooks/constraint-display-enforcement.js",
 *             "timeout": 5000,
 *             "failureMode": "allow"
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * }
 *
 * NOTE: This creates mechanical enforcement but may clutter output.
 * The constraint display is already implemented in context-injection.js (UserPromptSubmit).
 * Only activate if you need MECHANICAL enforcement that can't be behaviorally ignored.
 */

/**
 * Load best practices from README.md
 *
 * @returns {Array<Object>} Array of best practice objects with title and summary
 */
function loadBestPractices() {
  try {
    // Try multiple paths: project, user, installation
    const possiblePaths = [
      path.join(process.cwd(), 'best-practices', 'README.md'),
      path.join(process.cwd(), '.claude', 'best-practices', 'README.md'),
      path.join(os.homedir(), '.claude', 'best-practices', 'README.md')
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
 * Get or initialize rotation state for cycling constraints
 *
 * @param {string} sessionId - Current session ID
 * @returns {number} Current rotation index
 */
function getRotationState(sessionId) {
  const stateDir = path.join(os.homedir(), '.claude', 'tmp');

  // Ensure directory exists
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }

  // Create session-based state file
  const stateHash = crypto.createHash('md5').update(sessionId).digest('hex').substring(0, 8);
  const stateFile = path.join(stateDir, `constraint-rotation-${stateHash}`);

  try {
    if (fs.existsSync(stateFile)) {
      const data = fs.readFileSync(stateFile, 'utf8');
      const state = JSON.parse(data);
      return state.index || 0;
    }
  } catch (error) {
    // Return 0 if state file doesn't exist or is invalid
  }

  return 0;
}

/**
 * Update rotation state
 *
 * @param {string} sessionId - Current session ID
 * @param {number} newIndex - New rotation index
 */
function updateRotationState(sessionId, newIndex) {
  const stateDir = path.join(os.homedir(), '.claude', 'tmp');
  const stateHash = crypto.createHash('md5').update(sessionId).digest('hex').substring(0, 8);
  const stateFile = path.join(stateDir, `constraint-rotation-${stateHash}`);

  try {
    const state = {
      index: newIndex,
      timestamp: Date.now()
    };
    fs.writeFileSync(stateFile, JSON.stringify(state));
  } catch (error) {
    // Silent fail - don't block execution
  }
}

/**
 * Map tool names to relevant constraint categories for situation-based selection
 *
 * @param {string} toolName - Name of the tool that was executed
 * @returns {Array<string>} Priority constraint ID prefixes for this tool
 */
function getToolConstraintPriorities(toolName) {
  const toolMap = {
    'Read': ['MEMORY-SEARCH-MANDATORY', 'BEST-PRACTICES-FIRST'],
    'Write': ['PM-FILE-OPS', 'AGENTTASK-CONTEXT'],
    'Edit': ['PM-FILE-OPS', 'AGENTTASK-TEMPLATE'],
    'Bash': ['PM-TECH-BLOCK', 'PM-DELEGATE'],
    'Task': ['AGENTTASK-TEMPLATE', 'AGENTTASK-PLACEHOLDERS', 'AGENTTASK-ROLES'],
    'Grep': ['MEMORY-SEARCH-MANDATORY', 'BEST-PRACTICES-FIRST'],
    'Glob': ['MEMORY-SEARCH-MANDATORY']
  };

  return toolMap[toolName] || [];
}

/**
 * Generate constraint display block
 *
 * @param {string} toolName - Name of tool that was executed
 * @param {string} sessionId - Current session ID
 * @returns {string} Formatted constraint display
 */
function generateConstraintDisplay(toolName, sessionId) {
  try {
    // Use tool context to influence situation-based selection
    const toolContext = `Tool: ${toolName}`;
    const constraints = selectRelevantConstraints(toolContext);

    if (!constraints || constraints.length === 0) {
      return ''; // No constraints loaded
    }

    // Separate situation and cycling constraints
    const situation = constraints.filter(c => c.type === 'situation').slice(0, 3);
    const cycling = constraints.filter(c => c.type === 'cycling').slice(0, 3);

    // Format constraint display
    const lines = [];
    lines.push('');
    lines.push('🎯 Active Constraints:');
    lines.push('');

    situation.forEach(c => {
      lines.push(`[${c.id}]: ${c.text} *(situation)*`);
    });

    cycling.forEach(c => {
      lines.push(`[${c.id}]: ${c.text} *(cycling)*`);
    });

    // Try to load best practices
    const bestPractices = loadBestPractices();
    if (bestPractices.length > 0) {
      const selectedPractices = selectRandomBestPractices(bestPractices, 3);

      if (selectedPractices.length > 0) {
        lines.push('');
        lines.push('📚 Best Practices:');
        selectedPractices.forEach(bp => {
          lines.push(`• ${bp.title}: ${bp.summary}`);
        });
      }
    }

    lines.push('');

    // Advance rotation state for next execution
    const currentIndex = getRotationState(sessionId);
    const newIndex = (currentIndex + 3) % 14; // 14 total constraints, advance by 3
    updateRotationState(sessionId, newIndex);

    return lines.join('\n');

  } catch (error) {
    // Silent fail - don't break tool execution
    return '';
  }
}

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-constraint-display-enforcement.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  try {
    // Parse input from multiple sources
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        inputData = fs.readFileSync(0, 'utf8');
      } catch (stdinError) {
        log(`WARN: Failed to read stdin: ${stdinError.message} - passing through`);
        console.log(JSON.stringify({ continue: true }));
        process.exit(0);
      }
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    const hookInput = JSON.parse(inputData);
    log(`PostToolUse triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool information
    const toolName = hookInput.tool_name || hookInput.tool || '';
    const sessionId = hookInput.session_id || 'default';

    // Get original output
    const hookOutput = hookInput.hookOutput || {};
    const originalStdout = hookOutput.stdout || '';
    const originalStderr = hookOutput.stderr || '';
    const exitCode = hookOutput.exitCode !== undefined ? hookOutput.exitCode : 0;

    // Only append constraints for significant tools (not Read/Grep - too frequent)
    const significantTools = ['Write', 'Edit', 'Task', 'Bash', 'MultiEdit'];

    if (!significantTools.includes(toolName)) {
      // Pass through without modification for read-only tools
      log(`Skipping constraint display for ${toolName} (not a significant tool)`);
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Generate constraint display for significant tools only
    const constraintDisplay = generateConstraintDisplay(toolName, sessionId);

    // Build response with constraint display as hookSpecificOutput
    // Using hookSpecificOutput instead of modifying stdout prevents JSON serialization issues
    const response = {
      hookOutput: {
        stdout: originalStdout,
        stderr: originalStderr,
        exitCode: exitCode
      },
      hookSpecificOutput: constraintDisplay
    };

    log(`Appended constraint display to ${toolName} output`);
    console.log(JSON.stringify(response));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, pass through original output without modification
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
