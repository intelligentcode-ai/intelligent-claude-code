/**
 * Hybrid Search Module
 * Combines FTS5 keyword search with vector similarity
 */

const db = require('./db');
const embeddings = require('./embeddings');

// Search weights
const KEYWORD_WEIGHT = 0.4;
const SEMANTIC_WEIGHT = 0.4;
const RELEVANCE_WEIGHT = 0.2;

/**
 * Parse search query for filters and terms
 * @param {string} query - Raw search query
 * @returns {object} Parsed query with terms and filters
 */
function parseQuery(query) {
  const result = {
    terms: [],
    tags: [],
    category: null,
    importance: null,
    includeArchived: false,
    similarTo: null,
    exactPhrase: null
  };

  // Extract exact phrases
  const phraseMatch = query.match(/"([^"]+)"/);
  if (phraseMatch) {
    result.exactPhrase = phraseMatch[1];
    query = query.replace(/"[^"]+"/g, '');
  }

  // Split into tokens
  const tokens = query.trim().split(/\s+/);

  for (const token of tokens) {
    if (token.startsWith('tag:')) {
      result.tags.push(token.slice(4).toLowerCase());
    } else if (token.startsWith('category:')) {
      result.category = token.slice(9).toLowerCase();
      // Handle abbreviations
      if (result.category === 'arch') result.category = 'architecture';
      if (result.category === 'impl') result.category = 'implementation';
    } else if (token.startsWith('importance:')) {
      result.importance = token.slice(11).toLowerCase();
    } else if (token === '--include-archive' || token === '--archived') {
      result.includeArchived = true;
    } else if (token.startsWith('similar')) {
      // Handle "similar to mem-001"
      continue;
    } else if (token.startsWith('mem-')) {
      result.similarTo = token;
    } else if (token !== 'to' && token.length > 0) {
      result.terms.push(token);
    }
  }

  return result;
}

/**
 * Search using FTS5 (keyword search)
 * @param {object} database - SQLite database
 * @param {object} parsed - Parsed query
 * @param {number} limit - Max results
 * @returns {Array} Search results with BM25 scores
 */
function ftsSearch(database, parsed, limit = 20) {
  if (!database || parsed.terms.length === 0 && !parsed.exactPhrase) {
    return [];
  }

  let searchTerms = parsed.terms.join(' ');
  if (parsed.exactPhrase) {
    searchTerms = `"${parsed.exactPhrase}" ${searchTerms}`.trim();
  }

  if (!searchTerms) return [];

  try {
    // FTS5 search with BM25 ranking
    let sql = `
      SELECT
        m.id, m.title, m.summary, m.category, m.importance,
        m.access_count, m.created_at, m.archived,
        bm25(memories_fts) as bm25_score
      FROM memories_fts fts
      JOIN memories m ON fts.rowid = m.rowid
      WHERE memories_fts MATCH ?
    `;

    const params = [searchTerms];

    if (!parsed.includeArchived) {
      sql += ' AND m.archived = 0';
    }

    if (parsed.category) {
      sql += ' AND m.category = ?';
      params.push(parsed.category);
    }

    if (parsed.importance) {
      sql += ' AND m.importance = ?';
      params.push(parsed.importance);
    }

    sql += ' ORDER BY bm25_score LIMIT ?';
    params.push(limit);

    const results = database.prepare(sql).all(...params);

    // Normalize BM25 scores (higher is better, but BM25 returns negative)
    const maxScore = Math.max(...results.map(r => Math.abs(r.bm25_score)), 1);
    return results.map(r => ({
      ...r,
      keyword_score: 1 - (Math.abs(r.bm25_score) / maxScore)
    }));
  } catch (e) {
    console.warn('FTS search failed:', e.message);
    return [];
  }
}

/**
 * Search using vector similarity
 * @param {string} queryText - Query text
 * @param {number} limit - Max results
 * @returns {Promise<Array>} Results with similarity scores
 */
async function vectorSearch(queryText, limit = 20) {
  if (!embeddings.isAvailable()) {
    return [];
  }

  const queryEmbedding = await embeddings.generateEmbedding(queryText);
  if (!queryEmbedding) {
    return [];
  }

  const allEmbeddings = db.getAllEmbeddings();
  if (allEmbeddings.length === 0) {
    return [];
  }

  const similar = embeddings.findSimilar(queryEmbedding, allEmbeddings, limit);

  return similar.map(s => ({
    id: s.id,
    semantic_score: s.score
  }));
}

/**
 * Calculate relevance score based on metadata
 * @param {object} memory - Memory object
 * @returns {number} Relevance score (0-1)
 */
function calculateRelevance(memory) {
  let score = 0.5;  // Base score

  // Importance boost
  if (memory.importance === 'high') score += 0.3;
  if (memory.importance === 'low') score -= 0.2;

  // Access count boost (logarithmic)
  if (memory.access_count > 0) {
    score += Math.min(0.2, Math.log10(memory.access_count + 1) * 0.1);
  }

  // Archived penalty
  if (memory.archived) {
    score -= 0.3;
  }

  return Math.max(0, Math.min(1, score));
}

/**
 * Merge and rank results from multiple sources
 * @param {Array} ftsResults - FTS5 results
 * @param {Array} vectorResults - Vector search results
 * @param {object} database - SQLite database
 * @returns {Array} Merged and ranked results
 */
function mergeResults(ftsResults, vectorResults, database) {
  const merged = new Map();

  // Add FTS results
  for (const result of ftsResults) {
    merged.set(result.id, {
      ...result,
      keyword_score: result.keyword_score || 0,
      semantic_score: 0
    });
  }

  // Add/update with vector results
  for (const result of vectorResults) {
    if (merged.has(result.id)) {
      merged.get(result.id).semantic_score = result.semantic_score;
    } else {
      // Get memory details from database
      const memory = db.getMemory(result.id);
      if (memory) {
        merged.set(result.id, {
          id: memory.id,
          title: memory.title,
          summary: memory.summary,
          category: memory.category,
          importance: memory.importance,
          access_count: memory.access_count,
          archived: memory.archived,
          keyword_score: 0,
          semantic_score: result.semantic_score
        });
      }
    }
  }

  // Calculate final scores
  const results = Array.from(merged.values()).map(r => {
    const relevance = calculateRelevance(r);
    const finalScore =
      (r.keyword_score * KEYWORD_WEIGHT) +
      (r.semantic_score * SEMANTIC_WEIGHT) +
      (relevance * RELEVANCE_WEIGHT);

    return {
      ...r,
      relevance_score: relevance,
      final_score: finalScore
    };
  });

  // Sort by final score
  results.sort((a, b) => b.final_score - a.final_score);

  return results;
}

/**
 * Filter results by tags
 * @param {Array} results - Search results
 * @param {string[]} tags - Required tags
 * @param {object} database - SQLite database
 * @returns {Array} Filtered results
 */
function filterByTags(results, tags, database) {
  if (!tags || tags.length === 0) {
    return results;
  }

  return results.filter(r => {
    const memoryTags = database.prepare(`
      SELECT tag FROM tags WHERE memory_id = ?
    `).all(r.id).map(t => t.tag);

    return tags.every(t => memoryTags.includes(t));
  });
}

/**
 * Hybrid search combining keyword and semantic search
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<Array>} Ranked search results
 */
async function search(query, options = {}) {
  const database = db.initDatabase(options.projectRoot);
  if (!database) {
    return { results: [], error: 'Database not initialized' };
  }

  const parsed = parseQuery(query);
  const limit = options.limit || 10;

  // Handle "similar to mem-xxx" queries
  if (parsed.similarTo) {
    return searchSimilar(parsed.similarTo, limit);
  }

  // Build query text for vector search
  const queryText = [
    parsed.exactPhrase,
    ...parsed.terms
  ].filter(Boolean).join(' ');

  // Execute searches in parallel
  const [ftsResults, vectorResults] = await Promise.all([
    ftsSearch(database, parsed, limit * 2),
    queryText ? vectorSearch(queryText, limit * 2) : Promise.resolve([])
  ]);

  // Merge results
  let results = mergeResults(ftsResults, vectorResults, database);

  // Apply tag filter
  if (parsed.tags.length > 0) {
    results = filterByTags(results, parsed.tags, database);
  }

  // Limit final results
  results = results.slice(0, limit);

  // Add tags to results
  const getTagsStmt = database.prepare(`
    SELECT tag FROM tags WHERE memory_id = ?
  `);
  results = results.map(r => ({
    ...r,
    tags: getTagsStmt.all(r.id).map(t => t.tag)
  }));

  return {
    results,
    query: parsed,
    ftsCount: ftsResults.length,
    vectorCount: vectorResults.length,
    embeddingsAvailable: embeddings.isAvailable()
  };
}

/**
 * Find memories similar to a given memory
 * @param {string} memoryId - Memory ID to find similar to
 * @param {number} limit - Max results
 * @returns {Promise<Array>} Similar memories
 */
async function searchSimilar(memoryId, limit = 10) {
  const memory = db.getMemory(memoryId);
  if (!memory) {
    return { results: [], error: `Memory ${memoryId} not found` };
  }

  const queryText = embeddings.memoryToText(memory);
  const vectorResults = await vectorSearch(queryText, limit + 1);

  // Remove the source memory from results
  const results = vectorResults
    .filter(r => r.id !== memoryId)
    .slice(0, limit)
    .map(r => {
      const m = db.getMemory(r.id);
      return {
        ...m,
        similarity_score: r.semantic_score
      };
    });

  return {
    results,
    sourceMemory: memoryId,
    embeddingsAvailable: embeddings.isAvailable()
  };
}

/**
 * Quick search (FTS only, synchronous)
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Array} Search results
 */
function quickSearch(query, options = {}) {
  const database = db.initDatabase(options.projectRoot);
  if (!database) {
    return [];
  }

  const parsed = parseQuery(query);
  const results = ftsSearch(database, parsed, options.limit || 10);

  // Add tags
  const getTagsStmt = database.prepare(`
    SELECT tag FROM tags WHERE memory_id = ?
  `);

  return results.map(r => ({
    ...r,
    tags: getTagsStmt.all(r.id).map(t => t.tag)
  }));
}

module.exports = {
  search,
  searchSimilar,
  quickSearch,
  parseQuery,
  ftsSearch,
  vectorSearch,
  calculateRelevance
};
