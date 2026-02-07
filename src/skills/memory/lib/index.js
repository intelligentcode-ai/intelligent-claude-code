/**
 * Memory Skill - Main API
 * Persistent knowledge storage with local RAG for ICC agents
 */

const db = require('./db');
const embeddings = require('./embeddings');
const search = require('./search');
const exporter = require('./export');

/**
 * Initialize the memory system
 * @param {string} projectRoot - Project root directory
 * @returns {boolean} Success
 */
function init(projectRoot = process.cwd()) {
  const database = db.initDatabase(projectRoot);
  return database !== null;
}

/**
 * Write a new memory
 * @param {object} options - Memory options
 * @param {string} options.title - Memory title
 * @param {string} options.summary - Brief summary
 * @param {string} options.content - Full content
 * @param {string[]} options.tags - Tags for categorization
 * @param {string} options.category - Category (architecture, implementation, issues, patterns)
 * @param {string} options.importance - Importance level (high, medium, low)
 * @param {string} options.projectRoot - Project root directory
 * @returns {Promise<object>} Created memory info
 */
async function write(options) {
  const projectRoot = options.projectRoot || process.cwd();

  // Initialize database
  if (!db.initDatabase(projectRoot)) {
    return { error: 'Failed to initialize database' };
  }

  // Auto-categorize if not provided
  const category = options.category || autoCategorize(options.title, options.content);

  // Create memory
  const id = db.createMemory({
    title: options.title,
    summary: options.summary,
    content: options.content || options.summary,
    tags: options.tags || [],
    category,
    importance: options.importance || 'medium',
    scope: options.scope || 'project'
  });

  if (!id) {
    return { error: 'Failed to create memory' };
  }

  // Generate embedding
  if (embeddings.isAvailable()) {
    const text = embeddings.memoryToText({
      title: options.title,
      summary: options.summary,
      content: options.content,
      tags: options.tags,
      category
    });

    const embedding = await embeddings.generateEmbedding(text);
    if (embedding) {
      db.storeEmbedding(id, embedding);
    }
  }

  // Export to markdown
  const exportPath = exporter.exportMemory(id, projectRoot);

  return {
    id,
    title: options.title,
    category,
    exportPath,
    embeddingGenerated: embeddings.isAvailable()
  };
}

/**
 * Auto-categorize based on content keywords
 * @param {string} title - Memory title
 * @param {string} content - Memory content
 * @returns {string} Category
 */
function autoCategorize(title, content) {
  const text = `${title} ${content}`.toLowerCase();

  const patterns = {
    architecture: /\b(design|pattern|structure|architecture|schema|api|interface|module)\b/,
    implementation: /\b(code|function|method|class|implement|build|create)\b/,
    issues: /\b(bug|fix|error|problem|issue|fail|crash|exception)\b/,
    patterns: /\b(approach|solution|technique|strategy|method|practice)\b/
  };

  for (const [category, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return category;
    }
  }

  return 'patterns';
}

/**
 * Search memories
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<object>} Search results
 */
async function find(query, options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return { results: [], error: 'Database not initialized' };
  }

  return search.search(query, options);
}

/**
 * Quick synchronous search (FTS only)
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Array} Search results
 */
function quickFind(query, options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return [];
  }

  return search.quickSearch(query, options);
}

/**
 * Get a specific memory
 * @param {string} id - Memory ID
 * @param {object} options - Options
 * @returns {object|null} Memory or null
 */
function get(id, options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return null;
  }

  return db.getMemory(id);
}

/**
 * Update an existing memory
 * @param {string} id - Memory ID
 * @param {object} updates - Fields to update
 * @param {object} options - Options
 * @returns {Promise<boolean>} Success
 */
async function update(id, updates, options = {}) {
  const projectRoot = options.projectRoot || process.cwd();

  if (!db.initDatabase(projectRoot)) {
    return false;
  }

  const success = db.updateMemory(id, updates);
  if (!success) return false;

  // Re-generate embedding if content changed
  if (updates.content || updates.title || updates.summary) {
    const memory = db.getMemory(id);
    if (memory && embeddings.isAvailable()) {
      const text = embeddings.memoryToText(memory);
      const embedding = await embeddings.generateEmbedding(text);
      if (embedding) {
        db.storeEmbedding(id, embedding);
      }
    }
  }

  // Re-export markdown
  exporter.exportMemory(id, projectRoot);

  return true;
}

/**
 * Link memories or link to work items
 * @param {string} sourceId - Source memory ID
 * @param {string} targetId - Target ID (mem-xxx or STORY-xxx)
 * @param {string} linkType - Link type (related, supersedes, implements)
 * @param {object} options - Options
 * @returns {boolean} Success
 */
function link(sourceId, targetId, linkType = 'related', options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return false;
  }

  db.addLink(sourceId, targetId, linkType);

  // Re-export to include link
  exporter.exportMemory(sourceId, options.projectRoot);

  return true;
}

/**
 * Archive a memory
 * @param {string} id - Memory ID
 * @param {object} options - Options
 * @returns {string|null} New export path or null
 */
function archive(id, options = {}) {
  const projectRoot = options.projectRoot || process.cwd();

  if (!db.initDatabase(projectRoot)) {
    return null;
  }

  return exporter.archiveExport(id, projectRoot);
}

/**
 * Delete a memory
 * @param {string} id - Memory ID
 * @param {object} options - Options
 * @returns {boolean} Success
 */
function remove(id, options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return false;
  }

  // Get export path before deletion
  const memory = db.getMemory(id);
  const exportPath = memory?.export_path;

  // Delete from database
  const success = db.deleteMemory(id);

  // Remove export file if exists
  if (success && exportPath) {
    try {
      const fs = require('fs');
      if (fs.existsSync(exportPath)) {
        fs.unlinkSync(exportPath);
      }
    } catch (e) {
      console.warn('Failed to delete export file:', e.message);
    }
  }

  return success;
}

/**
 * List memories with filters
 * @param {object} filters - Filter options
 * @param {object} options - Options
 * @returns {Array} Memory list
 */
function list(filters = {}, options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return [];
  }

  return db.listMemories(filters);
}

/**
 * Get memory statistics
 * @param {object} options - Options
 * @returns {object} Statistics
 */
function stats(options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return { error: 'Database not initialized' };
  }

  const dbStats = db.getStats();

  return {
    ...dbStats,
    embeddingsAvailable: embeddings.isAvailable(),
    modelName: embeddings.getModelName(),
    embeddingDimension: embeddings.getDimension()
  };
}

/**
 * Get archive candidates (low relevance memories)
 * @param {object} options - Options
 * @returns {Array} Candidate memories
 */
function getArchiveCandidates(options = {}) {
  if (!db.initDatabase(options.projectRoot)) {
    return [];
  }

  return db.getArchiveCandidates();
}

/**
 * Export all memories to markdown
 * @param {object} options - Options
 * @returns {object} Export statistics
 */
function exportAll(options = {}) {
  const projectRoot = options.projectRoot || process.cwd();

  if (!db.initDatabase(projectRoot)) {
    return { error: 'Database not initialized' };
  }

  return exporter.exportAll(projectRoot, options);
}

/**
 * Rebuild database from markdown exports
 * @param {object} options - Options
 * @returns {object} Import statistics
 */
function rebuild(options = {}) {
  const projectRoot = options.projectRoot || process.cwd();

  // Initialize database (creates fresh if needed)
  if (!db.initDatabase(projectRoot)) {
    return { error: 'Failed to initialize database' };
  }

  return exporter.rebuildFromExports(projectRoot);
}

/**
 * Close database connection
 */
function close() {
  db.closeDatabase();
}

module.exports = {
  // Core operations
  init,
  write,
  find,
  quickFind,
  get,
  update,
  link,
  archive,
  remove,
  list,
  stats,

  // Utility
  getArchiveCandidates,
  exportAll,
  rebuild,
  close,

  // Sub-modules (for advanced usage)
  db,
  embeddings,
  search,
  exporter
};
