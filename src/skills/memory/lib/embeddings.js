/**
 * Embeddings Module
 * Local vector embeddings using transformers.js
 */

// Embedding model configuration
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
const EMBEDDING_DIM = 384;

// Lazy-loaded pipeline
let embeddingPipeline = null;
let pipelineLoading = null;
let transformersAvailable = null;

/**
 * Check if transformers.js is available
 * @returns {boolean}
 */
function isAvailable() {
  if (transformersAvailable !== null) {
    return transformersAvailable;
  }

  try {
    require('@xenova/transformers');
    transformersAvailable = true;
  } catch (e) {
    console.warn('Embeddings: @xenova/transformers not installed.');
    console.warn('Run: npm install @xenova/transformers');
    console.warn('Falling back to keyword-only search.');
    transformersAvailable = false;
  }

  return transformersAvailable;
}

/**
 * Initialize the embedding pipeline
 * Downloads model on first use (~80MB)
 * @returns {Promise<object|null>} Pipeline or null
 */
async function initPipeline() {
  if (embeddingPipeline) {
    return embeddingPipeline;
  }

  if (pipelineLoading) {
    return pipelineLoading;
  }

  if (!isAvailable()) {
    return null;
  }

  pipelineLoading = (async () => {
    try {
      const { pipeline, env } = require('@xenova/transformers');

      // Configure cache location
      env.cacheDir = process.env.TRANSFORMERS_CACHE ||
                     require('path').join(require('os').homedir(), '.cache', 'transformers');

      // Disable remote model loading after first download
      env.allowRemoteModels = true;

      console.log('Loading embedding model (first time may download ~80MB)...');

      embeddingPipeline = await pipeline('feature-extraction', MODEL_NAME, {
        quantized: true  // Use quantized model for faster inference
      });

      console.log('Embedding model loaded successfully.');
      return embeddingPipeline;
    } catch (e) {
      console.error('Failed to load embedding model:', e.message);
      transformersAvailable = false;
      return null;
    }
  })();

  return pipelineLoading;
}

/**
 * Generate embedding for text
 * @param {string} text - Text to embed
 * @returns {Promise<Float32Array|null>} 384-dim embedding or null
 */
async function generateEmbedding(text) {
  const pipeline = await initPipeline();
  if (!pipeline) {
    return null;
  }

  try {
    // Truncate very long text (model has token limit)
    const truncated = text.slice(0, 8000);

    const output = await pipeline(truncated, {
      pooling: 'mean',
      normalize: true
    });

    // Convert to Float32Array
    return new Float32Array(output.data);
  } catch (e) {
    console.error('Embedding generation failed:', e.message);
    return null;
  }
}

/**
 * Generate embeddings for multiple texts (batch)
 * @param {string[]} texts - Array of texts
 * @returns {Promise<Float32Array[]>} Array of embeddings
 */
async function generateEmbeddings(texts) {
  const pipeline = await initPipeline();
  if (!pipeline) {
    return texts.map(() => null);
  }

  const results = [];
  for (const text of texts) {
    const embedding = await generateEmbedding(text);
    results.push(embedding);
  }

  return results;
}

/**
 * Calculate cosine similarity between two embeddings
 * @param {Float32Array} a - First embedding
 * @param {Float32Array} b - Second embedding
 * @returns {number} Similarity score (0-1)
 */
function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

/**
 * Find similar embeddings
 * @param {Float32Array} queryEmbedding - Query embedding
 * @param {Array<{id: string, embedding: Float32Array}>} candidates - Candidate embeddings
 * @param {number} topK - Number of results to return
 * @returns {Array<{id: string, score: number}>} Sorted by similarity
 */
function findSimilar(queryEmbedding, candidates, topK = 10) {
  if (!queryEmbedding) {
    return [];
  }

  const scored = candidates
    .map(c => ({
      id: c.id,
      score: cosineSimilarity(queryEmbedding, c.embedding)
    }))
    .filter(s => s.score > 0.1)  // Filter very low scores
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

/**
 * Create searchable text from memory fields
 * @param {object} memory - Memory object
 * @returns {string} Combined text for embedding
 */
function memoryToText(memory) {
  const parts = [
    memory.title,
    memory.summary,
    memory.content
  ].filter(Boolean);

  if (memory.tags && memory.tags.length > 0) {
    parts.push('Tags: ' + memory.tags.join(', '));
  }

  if (memory.category) {
    parts.push('Category: ' + memory.category);
  }

  return parts.join('\n\n');
}

/**
 * Get embedding dimension
 * @returns {number}
 */
function getDimension() {
  return EMBEDDING_DIM;
}

/**
 * Get model name
 * @returns {string}
 */
function getModelName() {
  return MODEL_NAME;
}

module.exports = {
  isAvailable,
  initPipeline,
  generateEmbedding,
  generateEmbeddings,
  cosineSimilarity,
  findSimilar,
  memoryToText,
  getDimension,
  getModelName
};
