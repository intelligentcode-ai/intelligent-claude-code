const { loadConstraintIDs } = require('./constraint-loader');

/**
 * Constraint Selector - Intelligent relevance scoring for context-aware constraint display
 *
 * Analyzes conversation context, active roles, and work type to select the 2-3 most
 * relevant constraints for recursive display in UserPromptSubmit hook.
 */

// Track recently displayed constraints for rotation (in-memory)
let recentlyDisplayed = [];
const MAX_RECENT = 10; // Remember last 10 displayed constraint IDs

/**
 * Detect active role from conversation context
 *
 * @param {string} context - Recent conversation text
 * @returns {string|null} Active role (e.g., '@PM', '@Developer') or null
 */
function detectActiveRole(context) {
  if (!context || typeof context !== 'string') {
    return null;
  }

  const rolePattern = /@([A-Z][a-zA-Z-]+(?:-[A-Z][a-zA-Z-]+)*)/g;
  const matches = [];
  let match;

  while ((match = rolePattern.exec(context)) !== null) {
    matches.push(match[0]);
  }

  if (matches.length === 0) {
    return null;
  }

  // Return most recent role mention
  return matches[matches.length - 1];
}

/**
 * Classify work type from conversation keywords
 *
 * @param {string} context - Recent conversation text
 * @returns {string} Work type category
 */
function classifyWorkType(context) {
  if (!context || typeof context !== 'string') {
    return 'general';
  }

  const keywords = {
    coordination: ['break down', 'story', 'plan', 'organize', 'delegate', 'assign', 'coordinate'],
    implementation: ['implement', 'create', 'build', 'develop', 'code', 'write', 'add'],
    architecture: ['design', 'architect', 'structure', 'pattern', 'framework'],
    testing: ['test', 'validate', 'verify', 'check', 'quality'],
    agenttask: ['agenttask', 'task creation', 'template', 'complexity'],
    memory: ['memory', 'learning', 'pattern', 'store', 'search']
  };

  const lowerContext = context.toLowerCase();

  for (const [type, words] of Object.entries(keywords)) {
    if (words.some(word => lowerContext.includes(word))) {
      return type;
    }
  }

  return 'general';
}

/**
 * Calculate relevance score for a single constraint
 *
 * @param {Object} constraint - Constraint object with id and category
 * @param {string|null} activeRole - Active role from context
 * @param {string} workType - Work type classification
 * @returns {number} Relevance score
 */
function calculateRelevance(constraint, activeRole, workType) {
  let score = 1; // Baseline for all constraints

  // Role matching - high priority
  if (activeRole) {
    const roleNormalized = activeRole.toLowerCase().replace('@', '').replace('-', '');

    if (constraint.id.toLowerCase().includes('pm') && roleNormalized.includes('pm')) {
      score += 10;
    }
    if (constraint.id.toLowerCase().includes('developer') && roleNormalized.includes('developer')) {
      score += 10;
    }
    if (constraint.id.toLowerCase().includes('architect') && roleNormalized.includes('architect')) {
      score += 10;
    }
  }

  // Work type matching - medium priority
  if (workType === 'coordination' && constraint.id.startsWith('PM-')) {
    score += 5;
  }
  if (workType === 'implementation' && constraint.id.startsWith('AGENTTASK-')) {
    score += 5;
  }
  if (workType === 'agenttask' && (constraint.id.startsWith('AGENTTASK-') || constraint.id.includes('TEMPLATE'))) {
    score += 5;
  }
  if (workType === 'architecture' && constraint.category.toLowerCase().includes('role')) {
    score += 5;
  }

  // Meta-rules always relevant - low priority baseline
  if (constraint.category.toLowerCase().includes('meta')) {
    score += 3;
  }

  // Recursive display rule gets bonus for meta context
  if (constraint.id === 'RECURSIVE-DISPLAY') {
    score += 2;
  }

  // PM constraints get slight boost for coordination work
  if (constraint.category.toLowerCase().includes('pm') && workType === 'coordination') {
    score += 3;
  }

  return score;
}

/**
 * Select 2-3 most relevant constraints based on conversation context
 *
 * @param {string} context - Recent conversation text
 * @returns {Array<Object>} Array of 2-3 most relevant constraint objects with id and text
 */
function selectRelevantConstraints(context) {
  const constraints = loadConstraintIDs();

  if (constraints.length === 0) {
    return [];
  }

  const activeRole = detectActiveRole(context);
  const workType = classifyWorkType(context);

  // Score all constraints with rotation penalty
  const scored = constraints.map(constraint => {
    let score = calculateRelevance(constraint, activeRole, workType);

    // Apply rotation penalty: reduce score if recently displayed
    const recentIndex = recentlyDisplayed.indexOf(constraint.id);
    if (recentIndex !== -1) {
      // More recent = higher penalty
      const recencyPenalty = (MAX_RECENT - recentIndex) * 0.5;
      score -= recencyPenalty;
    }

    return {
      id: constraint.id,
      text: constraint.text,
      score: score,
      category: constraint.category
    };
  });

  // Sort by score (highest first), take top 3
  const selected = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(c => ({ id: c.id, text: c.text }));

  // Update recently displayed tracking
  selected.forEach(constraint => {
    // Remove if already in list
    recentlyDisplayed = recentlyDisplayed.filter(id => id !== constraint.id);
    // Add to front of list
    recentlyDisplayed.unshift(constraint.id);
  });

  // Keep only last MAX_RECENT
  recentlyDisplayed = recentlyDisplayed.slice(0, MAX_RECENT);

  return selected;
}

module.exports = {
  detectActiveRole,
  classifyWorkType,
  calculateRelevance,
  selectRelevantConstraints
};
