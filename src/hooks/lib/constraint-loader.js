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
    // Define hierarchy: project → user → system
    const paths = [
      path.join(process.cwd(), '.claude', 'modes', 'virtual-team.md'),  // Project-local
      path.join(process.env.HOME, '.claude', 'modes', 'virtual-team.md') // User-global (system)
    ];

    // Load constraints from all available sources
    const allConstraints = new Map(); // Use Map to merge by ID (last wins)

    // Process in reverse order (system → user → project) so higher priority overrides
    for (let i = paths.length - 1; i >= 0; i--) {
      const virtualTeamPath = paths[i];

      if (!fs.existsSync(virtualTeamPath)) {
        continue; // Skip missing files
      }

      const content = fs.readFileSync(virtualTeamPath, 'utf8');

      // Extract constraint IDs from XML attributes using regex
      const idRegex = /id="([A-Z][A-Z0-9-]+)"/g;
      let match;

      while ((match = idRegex.exec(content)) !== null) {
        const constraintId = match[1];
        const category = inferCategory(content, match.index);
        const text = extractConstraintText(content, match.index, constraintId);

        // Store with source path for debugging
        allConstraints.set(constraintId, {
          id: constraintId,
          category: category,
          text: text,
          position: match.index,
          source: virtualTeamPath
        });
      }
    }

    // Convert Map to Array
    const constraints = Array.from(allConstraints.values());

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
 * Extract human-readable constraint text from XML structure
 *
 * @param {string} content - Full file content
 * @param {number} position - Position of constraint ID
 * @param {string} constraintId - The constraint ID
 * @returns {string} Human-readable constraint text
 */
function extractConstraintText(content, position, constraintId) {
  // Find the element containing this ID and extract ONLY its direct children
  const searchStart = Math.max(0, position - 200);
  const searchEnd = Math.min(content.length, position + 2000);
  const searchArea = content.substring(searchStart, searchEnd);

  // First, find the opening tag with this ID
  const openTagMatch = searchArea.match(new RegExp(`<([a-z_]+)[^>]*id="${constraintId}"[^>]*>`, 'i'));
  if (!openTagMatch) {
    return 'Constraint enforcement rule';
  }

  const tagName = openTagMatch[1];
  const openTagPos = searchArea.indexOf(openTagMatch[0]);
  const contentStart = openTagPos + openTagMatch[0].length;

  // Find the matching closing tag for this element
  const closingTagPattern = new RegExp(`</${tagName}>`, 'i');
  const closingMatch = searchArea.substring(contentStart).match(closingTagPattern);
  if (!closingMatch) {
    return 'Constraint enforcement rule';
  }

  // Extract only the content between opening and closing tags of THIS element
  const elementContent = searchArea.substring(contentStart, contentStart + closingMatch.index);

  // Strategy 1: Look for descriptive child elements within THIS element only
  const descriptiveElements = [
    'display_pattern',
    'purpose',
    'source',
    'pattern',
    'requirement',
    'operation',
    'element'
  ];

  for (const elemName of descriptiveElements) {
    const pattern = new RegExp(`<${elemName}[^>]*>([^<]+)</${elemName}>`, 'i');
    const match = elementContent.match(pattern);
    if (match && match[1]) {
      const text = match[1].trim();
      if (text && text.length > 0) {
        return text;
      }
    }
  }

  // Strategy 2: Extract direct text content (for elements with no child tags)
  // Remove all nested XML tags and extract remaining text
  const textOnly = elementContent.replace(/<[^>]+>/g, '').trim();
  if (textOnly && textOnly.length > 0 && !textOnly.match(/^\s*$/)) {
    return textOnly;
  }

  // Ultimate fallback
  return 'Constraint enforcement rule';
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
