const fs = require('fs');
const path = require('path');

/**
 * Constraint Loader - Loads constraint definitions from JSON configuration
 *
 * Provides access to all registered constraint IDs for context-aware constraint display.
 * Implements 15-minute caching to optimize performance.
 */

let constraintCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

/**
 * Load and parse all constraint IDs from constraints.json
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
      path.join(process.cwd(), '.claude', 'hooks', 'lib', 'constraints.json'),  // Project-local
      path.join(process.env.HOME, '.claude', 'hooks', 'lib', 'constraints.json') // User-global (system)
    ];

    // Load constraints from all available sources
    const allConstraints = new Map(); // Use Map to merge by ID (last wins)

    // Process in reverse order (system → user → project) so higher priority overrides
    for (let i = paths.length - 1; i >= 0; i--) {
      const constraintsPath = paths[i];

      if (!fs.existsSync(constraintsPath)) {
        continue; // Skip missing files
      }

      const content = fs.readFileSync(constraintsPath, 'utf8');
      const data = JSON.parse(content);

      if (!data.constraints || !Array.isArray(data.constraints)) {
        continue; // Skip invalid format
      }

      // Process each constraint from JSON
      data.constraints.forEach(constraint => {
        if (!constraint.id || !constraint.text) {
          return; // Skip incomplete constraints
        }

        // Store with source path for debugging
        allConstraints.set(constraint.id, {
          id: constraint.id,
          category: constraint.category || 'General',
          text: constraint.text,
          weight: constraint.weight || 5,
          source: constraintsPath
        });
      });
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
