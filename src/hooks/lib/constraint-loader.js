const fs = require('fs');
const path = require('path');

/**
 * Constraint Loader - Extracts constraint IDs from virtual-team.md XML structure
 *
 * Provides access to all registered constraint IDs for context-aware constraint display.
 * Implements 15-minute caching to optimize performance.
 */

let constraintCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

/**
 * Load and parse all constraint IDs from virtual-team.md
 *
 * @returns {Array} Array of constraint objects with metadata
 */
function loadConstraintIDs() {
  // Check cache validity
  if (constraintCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_TTL)) {
    return constraintCache;
  }

  try {
    // Load virtual-team.md from standard location
    const virtualTeamPath = path.join(process.env.HOME, '.claude', 'modes', 'virtual-team.md');

    if (!fs.existsSync(virtualTeamPath)) {
      console.error(`Constraint loader: virtual-team.md not found at ${virtualTeamPath}`);
      return [];
    }

    const content = fs.readFileSync(virtualTeamPath, 'utf8');

    // Extract constraint IDs from XML attributes using regex
    const constraints = [];
    const idRegex = /id="([A-Z][A-Z0-9-]+)"/g;
    let match;

    while ((match = idRegex.exec(content)) !== null) {
      const constraintId = match[1];
      const category = inferCategory(content, match.index);

      constraints.push({
        id: constraintId,
        category: category,
        position: match.index
      });
    }

    // Cache results
    constraintCache = constraints;
    cacheTimestamp = Date.now();

    return constraints;

  } catch (error) {
    console.error('Constraint loader error:', error.message);
    return [];
  }
}

/**
 * Infer constraint category from surrounding XML context
 *
 * @param {string} content - Full file content
 * @param {number} position - Position of constraint ID in content
 * @returns {string} Inferred category name
 */
function inferCategory(content, position) {
  // Look backwards for nearest XML opening tag (up to 1000 chars)
  const before = content.substring(Math.max(0, position - 1000), position);

  // Extract the most recent XML opening tag
  const tagMatch = before.match(/<([a-z_]+)(?:\s|>)/g);
  if (!tagMatch || tagMatch.length === 0) {
    return 'unknown';
  }

  // Get the last (most recent) opening tag
  const lastTag = tagMatch[tagMatch.length - 1]
    .replace(/[<>\s]/g, '')
    .trim();

  // Map XML tags to human-readable categories
  const categoryMap = {
    'pm_constraints': 'PM Guidelines',
    'agenttask_requirements': 'AgentTask Requirements',
    'meta_rule': 'Meta Rules',
    'allowed_operations': 'PM Allowed Operations',
    'blocked_operations': 'PM Blocked Operations',
    'delegation_required': 'PM Delegation',
    'template_compliance': 'Template Compliance',
    'context_completeness': 'Context Requirements',
    'size_limits': 'Size Limits',
    'role_separation': 'Role Separation',
    'placeholder_resolution': 'Placeholder Resolution'
  };

  return categoryMap[lastTag] || lastTag;
}

/**
 * Get all constraint IDs as simple array of ID strings
 *
 * @returns {Array<string>} Array of constraint ID strings
 */
function getConstraintIDList() {
  const constraints = loadConstraintIDs();
  return constraints.map(c => c.id);
}

/**
 * Get constraints grouped by category
 *
 * @returns {Object} Constraints grouped by category
 */
function getConstraintsByCategory() {
  const constraints = loadConstraintIDs();
  const grouped = {};

  constraints.forEach(constraint => {
    if (!grouped[constraint.category]) {
      grouped[constraint.category] = [];
    }
    grouped[constraint.category].push(constraint.id);
  });

  return grouped;
}

/**
 * Invalidate cache (useful for testing or manual refresh)
 */
function invalidateCache() {
  constraintCache = null;
  cacheTimestamp = null;
}

module.exports = {
  loadConstraintIDs,
  getConstraintIDList,
  getConstraintsByCategory,
  invalidateCache
};
