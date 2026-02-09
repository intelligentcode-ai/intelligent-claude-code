/**
 * Memory Skill - Main API
 * Persistent knowledge storage with local RAG for ICC agents
 */

const db = require('./db');
const embeddings = require('./embeddings');
const search = require('./search');
const exporter = require('./export');

// Public memory (committed markdown under memory/exports/**) is first-class.
// The local SQLite DB is an index/cache and must stay in sync with exports so
// agents don't "forget" shareable knowledge.
const exportsSignatureByProject = new Map();

function ensurePublicExportsImported(projectRoot = process.cwd()) {
  const database = db.initDatabase(projectRoot);
  if (!database) return { success: false, skipped: true, reason: 'db-unavailable' };

  const signature = exporter.getExportsSignature(projectRoot);
  const prev = exportsSignatureByProject.get(projectRoot);
  if (prev === signature) {
    return { success: true, skipped: true, signature };
  }

  const importStats = exporter.rebuildFromExports(projectRoot);
  exportsSignatureByProject.set(projectRoot, signature);
  return { success: true, skipped: false, signature, importStats };
}

/**
 * Initialize the memory system
 * @param {string} projectRoot - Project root directory
 * @returns {boolean} Success
 */
function init(projectRoot = process.cwd()) {
  const result = ensurePublicExportsImported(projectRoot);
  if (!result.success) return { success: false, error: 'Failed to initialize database' };
  return { success: true, importStats: result.importStats || { imported: 0, errors: 0, files: [] } };
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

  // Ensure public exports are imported before allocating a new id. Otherwise we
  // may allocate an id that already exists in committed exports.
  const importResult = ensurePublicExportsImported(projectRoot);
  if (!importResult.success) {
    // Degraded mode (no SQLite): still write shareable exports so memory isn't "dead paper".
    const category = options.category || autoCategorize(options.title, options.content);
    const id = exporter.allocateNextSequentialIdFromExports(projectRoot);
    const now = new Date().toISOString();
    const memory = {
      id,
      title: options.title,
      summary: options.summary,
      content: options.content || options.summary,
      tags: options.tags || [],
      category,
      importance: options.importance || 'medium',
      scope: options.scope || 'project',
      created_at: now,
      archived: 0
    };

    const exportPath = exporter.getExportPath(memory, projectRoot, false);
    const dir = require('path').dirname(exportPath);
    const fs = require('fs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(exportPath, exporter.generateMarkdown(memory), 'utf8');

    return {
      id,
      title: options.title,
      category,
      exportPath,
      embeddingGenerated: false,
      degradedMode: true
    };
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
  const importResult = ensurePublicExportsImported(options.projectRoot);
  if (!importResult.success) {
    return exporter.searchExports(query, options.projectRoot, { limit: options.limit, includeArchived: options.includeArchived });
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
  const importResult = ensurePublicExportsImported(options.projectRoot);
  if (!importResult.success) {
    return exporter.searchExports(query, options.projectRoot, { limit: options.limit, includeArchived: options.includeArchived }).results || [];
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
  const importResult = ensurePublicExportsImported(options.projectRoot);
  if (!importResult.success) {
    const files = exporter.listExportFiles(options.projectRoot, { includeArchive: true });
    for (const { filePath, archived } of files) {
      const mem = exporter.readMemoryFromMarkdownFile(filePath);
      if (mem?.id === id) {
        return {
          ...mem,
          archived: archived ? 1 : 0,
          export_path: filePath
        };
      }
    }
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

  if (!ensurePublicExportsImported(projectRoot).success) {
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
  if (!ensurePublicExportsImported(options.projectRoot).success) {
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

  if (!ensurePublicExportsImported(projectRoot).success) {
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
  if (!ensurePublicExportsImported(options.projectRoot).success) {
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
  const importResult = ensurePublicExportsImported(options.projectRoot);
  if (!importResult.success) {
    const includeArchived = !!filters.includeArchived;
    const files = exporter.listExportFiles(options.projectRoot, { includeArchive: includeArchived });
    const out = [];
    for (const { filePath, archived } of files) {
      if (!includeArchived && archived) continue;
      const mem = exporter.readMemoryFromMarkdownFile(filePath);
      if (!mem?.id) continue;
      if (filters.category && String(mem.category || '').toLowerCase() !== String(filters.category).toLowerCase()) continue;
      if (filters.importance && String(mem.importance || '').toLowerCase() !== String(filters.importance).toLowerCase()) continue;
      if (filters.tag) {
        const tags = (mem.tags || []).map(t => String(t).toLowerCase());
        if (!tags.includes(String(filters.tag).toLowerCase())) continue;
      }
      out.push({
        id: mem.id,
        title: mem.title,
        summary: mem.summary,
        category: mem.category || 'patterns',
        importance: mem.importance || 'medium',
        archived: archived ? 1 : 0,
        tags: mem.tags || [],
        export_path: filePath
      });
    }
    return out;
  }
  return db.listMemories(filters);
}

/**
 * Get memory statistics
 * @param {object} options - Options
 * @returns {object} Statistics
 */
function stats(options = {}) {
  const importResult = ensurePublicExportsImported(options.projectRoot);
  if (!importResult.success) {
    const files = exporter.listExportFiles(options.projectRoot, { includeArchive: true });
    let total = 0;
    let archived = 0;
    const byCategory = {};
    for (const { filePath, archived: isArchived } of files) {
      const mem = exporter.readMemoryFromMarkdownFile(filePath);
      if (!mem?.id) continue;
      total++;
      if (isArchived) archived++;
      const cat = mem.category || 'patterns';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    }
    return {
      total,
      active: total - archived,
      archived,
      byCategory,
      mostAccessed: [],
      archiveCandidates: 0,
      embeddingsAvailable: false,
      modelName: null,
      embeddingDimension: null,
      degradedMode: true
    };
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
  const importResult = ensurePublicExportsImported(options.projectRoot);
  if (!importResult.success) return [];
  return db.getArchiveCandidates();
}

/**
 * Export all memories to markdown
 * @param {object} options - Options
 * @returns {object} Export statistics
 */
function exportAll(options = {}) {
  const projectRoot = options.projectRoot || process.cwd();

  if (!ensurePublicExportsImported(projectRoot).success) {
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

  const result = ensurePublicExportsImported(projectRoot);
  if (!result.success) return { error: 'Failed to initialize database' };
  return result.importStats || { imported: 0, errors: 0, files: [] };
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
