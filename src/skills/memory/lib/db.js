/**
 * Memory Database Module
 * SQLite storage with FTS5 full-text search support
 */

const path = require('path');
const fs = require('fs');

// Database instance (lazy-loaded)
let db = null;
let Database = null;

function sleepMs(ms) {
  // Synchronous sleep (Node) to allow retry loops during initialization.
  // Avoids adding async plumbing to the DB module.
  const sab = new SharedArrayBuffer(4);
  Atomics.wait(new Int32Array(sab), 0, 0, ms);
}

/**
 * Get the memory database path
 * @param {string} projectRoot - Project root directory
 * @returns {string} Path to memory.db
 */
function getDbPath(projectRoot = process.cwd()) {
  return path.join(projectRoot, '.agent', 'memory', 'memory.db');
}

/**
 * Ensure the memory directory exists
 * @param {string} projectRoot - Project root directory
 */
function ensureMemoryDir(projectRoot = process.cwd()) {
  // Local/private runtime state only (SQLite DB, caches).
  // Shareable markdown exports are written by export.js under memoryRoot.
  const memoryDir = path.join(projectRoot, '.agent', 'memory');

  if (!fs.existsSync(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true });
  }
}

/**
 * Initialize the database with schema
 * @param {string} projectRoot - Project root directory
 * @returns {object} Database instance
 */
function initDatabase(projectRoot = process.cwd()) {
  if (db) return db;

  // Try to load better-sqlite3
  try {
    Database = require('better-sqlite3');
  } catch (e) {
    console.error('better-sqlite3 not installed. Run: npm install better-sqlite3');
    console.error('Memory skill will operate in degraded mode (no persistence).');
    return null;
  }

  ensureMemoryDir(projectRoot);
  const dbPath = getDbPath(projectRoot);

  // Allow concurrent writers to wait briefly instead of failing with
  // "database is locked" when multiple processes initialize/write at once.
  db = new Database(dbPath, { timeout: 5000 });

  // New projects can run multiple concurrent "init" calls (multiple agent
  // processes). SQLite only allows one writer, so we retry initialization on
  // lock instead of failing the entire command.
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      db.pragma('journal_mode = WAL');

      // Create schema
      db.exec(`
    -- Core memories table
    CREATE TABLE IF NOT EXISTS memories (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      scope TEXT DEFAULT 'project',
      importance TEXT DEFAULT 'medium',
      created_at TEXT NOT NULL,
      accessed_at TEXT,
      access_count INTEGER DEFAULT 0,
      supersedes TEXT,
      archived INTEGER DEFAULT 0,
      export_path TEXT
    );

    -- Tags (many-to-many)
    CREATE TABLE IF NOT EXISTS tags (
      memory_id TEXT,
      tag TEXT,
      PRIMARY KEY (memory_id, tag),
      FOREIGN KEY (memory_id) REFERENCES memories(id) ON DELETE CASCADE
    );

    -- Links (memory-to-memory, memory-to-work-item)
    CREATE TABLE IF NOT EXISTS links (
      source_id TEXT,
      target_id TEXT,
      link_type TEXT DEFAULT 'related',
      PRIMARY KEY (source_id, target_id),
      FOREIGN KEY (source_id) REFERENCES memories(id) ON DELETE CASCADE
    );

    -- Vector embeddings (384-dim from MiniLM)
    CREATE TABLE IF NOT EXISTS memories_vec (
      memory_id TEXT PRIMARY KEY,
      embedding BLOB NOT NULL,
      FOREIGN KEY (memory_id) REFERENCES memories(id) ON DELETE CASCADE
    );

    -- Indexes for fast queries
    CREATE INDEX IF NOT EXISTS idx_memories_category ON memories(category);
    CREATE INDEX IF NOT EXISTS idx_memories_importance ON memories(importance);
    CREATE INDEX IF NOT EXISTS idx_memories_archived ON memories(archived);
    CREATE INDEX IF NOT EXISTS idx_tags_tag ON tags(tag);

    -- Meta key/value store for counters and migrations
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value INTEGER NOT NULL
    );
  `);

      // Initialize / repair counter for concurrency-safe id allocation.
      // If there are already mem-XXX entries, ensure next_id is at least max+1.
      try {
        db.prepare(`INSERT OR IGNORE INTO meta (key, value) VALUES ('next_id', 1)`).run();

        const maxRow = db.prepare(`
          SELECT MAX(CAST(SUBSTR(id, 5) AS INTEGER)) AS max_seq
          FROM memories
          WHERE id LIKE 'mem-%'
            AND id NOT LIKE 'mem-%-%'
            AND SUBSTR(id, 5) GLOB '[0-9]*'
        `).get();

        const maxSeq = Number(maxRow?.max_seq || 0);
        const desired = maxSeq + 1;

        const curRow = db.prepare(`SELECT value FROM meta WHERE key = 'next_id'`).get();
        const cur = Number(curRow?.value || 1);

        if (cur <= desired) {
          db.prepare(`UPDATE meta SET value = ? WHERE key = 'next_id'`).run(desired);
        }
      } catch (e) {
        // If anything goes wrong, keep operating; worst case the allocator falls
        // back to timestamp ids in degraded mode.
      }

      break;
    } catch (e) {
      if (e && typeof e.message === 'string' && e.message.includes('database is locked')) {
        // linear backoff, capped
        sleepMs(Math.min(250, 25 * (attempt + 1)));
        continue;
      }
      throw e;
    }
  }

  // Create FTS5 virtual table (separate to handle exists check)
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      db.exec(`
        CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
          title, summary, content,
          content=memories,
          content_rowid=rowid
        );
      `);
      break;
    } catch (e) {
      if (e && typeof e.message === 'string' && e.message.includes('database is locked')) {
        sleepMs(Math.min(250, 25 * (attempt + 1)));
        continue;
      }
      // FTS5 table may already exist
      if (!e.message.includes('already exists')) {
        console.warn('FTS5 setup warning:', e.message);
      }
      break;
    }
  }

  // Create triggers to keep FTS in sync
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      db.exec(`
        CREATE TRIGGER IF NOT EXISTS memories_ai AFTER INSERT ON memories BEGIN
          INSERT INTO memories_fts(rowid, title, summary, content)
          VALUES (NEW.rowid, NEW.title, NEW.summary, NEW.content);
        END;

        CREATE TRIGGER IF NOT EXISTS memories_ad AFTER DELETE ON memories BEGIN
          INSERT INTO memories_fts(memories_fts, rowid, title, summary, content)
          VALUES ('delete', OLD.rowid, OLD.title, OLD.summary, OLD.content);
        END;

        CREATE TRIGGER IF NOT EXISTS memories_au AFTER UPDATE ON memories BEGIN
          INSERT INTO memories_fts(memories_fts, rowid, title, summary, content)
          VALUES ('delete', OLD.rowid, OLD.title, OLD.summary, OLD.content);
          INSERT INTO memories_fts(rowid, title, summary, content)
          VALUES (NEW.rowid, NEW.title, NEW.summary, NEW.content);
        END;
      `);
      break;
    } catch (e) {
      if (e && typeof e.message === 'string' && e.message.includes('database is locked')) {
        sleepMs(Math.min(250, 25 * (attempt + 1)));
        continue;
      }
      // Triggers may already exist or may fail on older SQLite; ignore.
      break;
    }
  }

  return db;
}

/**
 * Generate a new memory ID
 * @returns {string} New memory ID (mem-XXX)
 */
function generateId() {
  // If db isn't available (degraded mode), fall back to a timestamp+random id.
  // This avoids collisions when multiple processes write concurrently.
  if (!db) {
    const rand = Math.random().toString(16).slice(2, 8);
    return `mem-${Date.now()}-${rand}`;
  }

  // Concurrency-safe sequential id allocation.
  // Two concurrent writers must never observe the same "next id" value.
  //
  // We use a tiny meta table as a counter and allocate ids inside a write
  // transaction. The first statement is a write, so SQLite serializes writers.
  const allocate = db.transaction(() => {
    db.prepare(`
      INSERT OR IGNORE INTO meta (key, value) VALUES ('next_id', 1)
    `).run();

    // Increment first to acquire the write lock, then read and subtract 1.
    db.prepare(`
      UPDATE meta SET value = value + 1 WHERE key = 'next_id'
    `).run();

    const row = db.prepare(`
      SELECT value FROM meta WHERE key = 'next_id'
    `).get();

    const seq = (row?.value || 1) - 1;
    return `mem-${String(seq).padStart(3, '0')}`;
  });

  return allocate();
}

/**
 * Create a new memory
 * @param {object} memory - Memory data
 * @returns {string} Created memory ID
 */
function createMemory(memory) {
  if (!db) {
    console.error('Database not initialized');
    return null;
  }

  const now = new Date().toISOString();

  const insert = db.prepare(`
    INSERT INTO memories (id, title, summary, content, category, scope,
                          importance, created_at, export_path)
    VALUES (@id, @title, @summary, @content, @category, @scope,
            @importance, @created_at, @export_path)
  `);

  // Best-effort retry on id collision (can happen with concurrent writers if
  // a custom id is provided or a caller bypasses the allocator).
  let id = memory.id || generateId();
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      insert.run({
        id,
        title: memory.title,
        summary: memory.summary,
        content: memory.content,
        category: memory.category || 'patterns',
        scope: memory.scope || 'project',
        importance: memory.importance || 'medium',
        created_at: now,
        export_path: memory.export_path || null
      });
      break;
    } catch (e) {
      if (e && typeof e.message === 'string' && e.message.includes('UNIQUE constraint failed: memories.id')) {
        id = generateId();
        continue;
      }
      throw e;
    }
  }

  // Insert tags
  if (memory.tags && memory.tags.length > 0) {
    const insertTag = db.prepare(`
      INSERT OR IGNORE INTO tags (memory_id, tag) VALUES (?, ?)
    `);
    memory.tags.forEach(tag => insertTag.run(id, tag.toLowerCase()));
  }

  return id;
}

/**
 * Get a memory by ID
 * @param {string} id - Memory ID
 * @returns {object|null} Memory object or null
 */
function getMemory(id) {
  if (!db) return null;

  const memory = db.prepare(`
    SELECT * FROM memories WHERE id = ?
  `).get(id);

  if (!memory) return null;

  // Get tags
  memory.tags = db.prepare(`
    SELECT tag FROM tags WHERE memory_id = ?
  `).all(id).map(r => r.tag);

  // Get links
  memory.links = db.prepare(`
    SELECT target_id, link_type FROM links WHERE source_id = ?
  `).all(id);

  // Update access stats
  db.prepare(`
    UPDATE memories
    SET accessed_at = ?, access_count = access_count + 1
    WHERE id = ?
  `).run(new Date().toISOString(), id);

  return memory;
}

/**
 * Update a memory
 * @param {string} id - Memory ID
 * @param {object} updates - Fields to update
 * @returns {boolean} Success
 */
function updateMemory(id, updates) {
  if (!db) return false;

  const allowed = ['title', 'summary', 'content', 'category', 'scope',
                   'importance', 'supersedes', 'archived', 'export_path'];

  const fields = [];
  const values = {};

  allowed.forEach(field => {
    if (updates[field] !== undefined) {
      fields.push(`${field} = @${field}`);
      values[field] = updates[field];
    }
  });

  if (fields.length === 0) return false;

  values.id = id;

  db.prepare(`
    UPDATE memories SET ${fields.join(', ')} WHERE id = @id
  `).run(values);

  // Update tags if provided
  if (updates.tags) {
    db.prepare(`DELETE FROM tags WHERE memory_id = ?`).run(id);
    const insertTag = db.prepare(`
      INSERT INTO tags (memory_id, tag) VALUES (?, ?)
    `);
    updates.tags.forEach(tag => insertTag.run(id, tag.toLowerCase()));
  }

  return true;
}

/**
 * Delete a memory
 * @param {string} id - Memory ID
 * @returns {boolean} Success
 */
function deleteMemory(id) {
  if (!db) return false;

  const result = db.prepare(`DELETE FROM memories WHERE id = ?`).run(id);
  return result.changes > 0;
}

/**
 * Add a link between memories or to a work item
 * @param {string} sourceId - Source memory ID
 * @param {string} targetId - Target ID (mem-xxx or STORY-xxx)
 * @param {string} linkType - Link type (related, supersedes, implements)
 */
function addLink(sourceId, targetId, linkType = 'related') {
  if (!db) return;

  db.prepare(`
    INSERT OR REPLACE INTO links (source_id, target_id, link_type)
    VALUES (?, ?, ?)
  `).run(sourceId, targetId, linkType);
}

/**
 * Store vector embedding for a memory
 * @param {string} id - Memory ID
 * @param {Float32Array} embedding - 384-dim embedding
 */
function storeEmbedding(id, embedding) {
  if (!db) return;

  const buffer = Buffer.from(embedding.buffer);

  db.prepare(`
    INSERT OR REPLACE INTO memories_vec (memory_id, embedding)
    VALUES (?, ?)
  `).run(id, buffer);
}

/**
 * Get embedding for a memory
 * @param {string} id - Memory ID
 * @returns {Float32Array|null} Embedding or null
 */
function getEmbedding(id) {
  if (!db) return null;

  const result = db.prepare(`
    SELECT embedding FROM memories_vec WHERE memory_id = ?
  `).get(id);

  if (!result) return null;

  return new Float32Array(result.embedding.buffer);
}

/**
 * Get all embeddings for similarity search
 * @returns {Array} Array of {id, embedding}
 */
function getAllEmbeddings() {
  if (!db) return [];

  const results = db.prepare(`
    SELECT mv.memory_id, mv.embedding, m.archived
    FROM memories_vec mv
    JOIN memories m ON mv.memory_id = m.id
    WHERE m.archived = 0
  `).all();

  return results.map(r => ({
    id: r.memory_id,
    embedding: new Float32Array(r.embedding.buffer)
  }));
}

/**
 * List memories with optional filters
 * @param {object} filters - category, tag, archived, limit
 * @returns {Array} Array of memory summaries
 */
function listMemories(filters = {}) {
  if (!db) return [];

  let sql = `
    SELECT DISTINCT m.id, m.title, m.summary, m.category, m.importance,
           m.created_at, m.accessed_at, m.access_count, m.archived
    FROM memories m
    LEFT JOIN tags t ON m.id = t.memory_id
    WHERE 1=1
  `;
  const params = [];

  if (!filters.includeArchived) {
    sql += ' AND m.archived = 0';
  }

  if (filters.category) {
    sql += ' AND m.category = ?';
    params.push(filters.category);
  }

  if (filters.tag) {
    sql += ' AND t.tag = ?';
    params.push(filters.tag.toLowerCase());
  }

  if (filters.importance) {
    sql += ' AND m.importance = ?';
    params.push(filters.importance);
  }

  sql += ' ORDER BY m.access_count DESC, m.created_at DESC';

  if (filters.limit) {
    sql += ' LIMIT ?';
    params.push(filters.limit);
  }

  const memories = db.prepare(sql).all(...params);

  // Add tags to each memory
  const getTagsStmt = db.prepare(`
    SELECT tag FROM tags WHERE memory_id = ?
  `);

  return memories.map(m => ({
    ...m,
    tags: getTagsStmt.all(m.id).map(r => r.tag)
  }));
}

/**
 * Get archive candidates (low relevance memories)
 * @returns {Array} Memories that could be archived
 */
function getArchiveCandidates() {
  if (!db) return [];

  return db.prepare(`
    SELECT m.id, m.title, m.summary, m.category, m.importance,
           m.created_at, m.access_count,
           (SELECT COUNT(*) FROM links WHERE source_id = m.id) as link_count
    FROM memories m
    WHERE m.archived = 0
      AND m.importance = 'low'
      AND m.access_count <= 1
      AND (SELECT COUNT(*) FROM links WHERE source_id = m.id) = 0
    ORDER BY m.created_at ASC
  `).all();
}

/**
 * Get memory statistics
 * @returns {object} Stats object
 */
function getStats() {
  if (!db) return { error: 'Database not initialized' };

  const total = db.prepare(`SELECT COUNT(*) as count FROM memories`).get();
  const active = db.prepare(`SELECT COUNT(*) as count FROM memories WHERE archived = 0`).get();
  const archived = db.prepare(`SELECT COUNT(*) as count FROM memories WHERE archived = 1`).get();

  const byCategory = db.prepare(`
    SELECT category, COUNT(*) as count
    FROM memories WHERE archived = 0
    GROUP BY category
  `).all();

  const mostAccessed = db.prepare(`
    SELECT id, title, access_count
    FROM memories WHERE archived = 0
    ORDER BY access_count DESC
    LIMIT 5
  `).all();

  const archiveCandidates = getArchiveCandidates();

  return {
    total: total.count,
    active: active.count,
    archived: archived.count,
    byCategory: Object.fromEntries(byCategory.map(r => [r.category, r.count])),
    mostAccessed,
    archiveCandidates: archiveCandidates.length
  };
}

/**
 * Close the database connection
 */
function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = {
  initDatabase,
  getDbPath,
  ensureMemoryDir,
  generateId,
  createMemory,
  getMemory,
  updateMemory,
  deleteMemory,
  addLink,
  storeEmbedding,
  getEmbedding,
  getAllEmbeddings,
  listMemories,
  getArchiveCandidates,
  getStats,
  closeDatabase
};
