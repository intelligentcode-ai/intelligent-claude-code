/**
 * Export Module
 * Generates human-readable markdown exports of memories
 */

const path = require('path');
const fs = require('fs');
const db = require('./db');

function getMemoryRoot(projectRoot = process.cwd()) {
  // Prefer ICC config if present; fallback to "memory" in the project root.
  // This keeps exports shareable (markdown in git) while SQLite stays local in .agent/.
  const candidates = [
    path.join(projectRoot, 'icc.config.json'),
    path.join(projectRoot, '.claude', 'icc.config.json'),
  ];

  for (const p of candidates) {
    try {
      if (!fs.existsSync(p)) continue;
      const raw = fs.readFileSync(p, 'utf8');
      const cfg = JSON.parse(raw);
      const memPath = cfg?.paths?.memory_path;
      if (typeof memPath === 'string' && memPath.trim()) {
        return path.join(projectRoot, memPath.trim());
      }
    } catch (_) {
      // ignore parse errors and continue
    }
  }

  return path.join(projectRoot, 'memory');
}

/**
 * Generate markdown content for a memory
 * @param {object} memory - Memory object
 * @returns {string} Markdown content
 */
function generateMarkdown(memory) {
  const frontmatter = [
    '---',
    `id: ${memory.id}`,
    `title: ${memory.title}`,
    `tags: [${(memory.tags || []).join(', ')}]`,
    `category: ${memory.category}`,
    `scope: ${memory.scope || 'project'}`,
    `importance: ${memory.importance || 'medium'}`,
    `created: ${memory.created_at}`,
  ];

  if (memory.accessed_at) {
    frontmatter.push(`accessed: ${memory.accessed_at}`);
  }

  if (memory.access_count) {
    frontmatter.push(`access_count: ${memory.access_count}`);
  }

  if (memory.supersedes) {
    frontmatter.push(`supersedes: ${memory.supersedes}`);
  }

  frontmatter.push('---');
  frontmatter.push('');

  // Title
  const content = [`# ${memory.title}`, ''];

  // Summary
  content.push('## Summary');
  content.push(memory.summary);
  content.push('');

  // Main content
  if (memory.content && memory.content !== memory.summary) {
    content.push('## Details');
    content.push(memory.content);
    content.push('');
  }

  // Related links
  if (memory.links && memory.links.length > 0) {
    content.push('## Related');
    memory.links.forEach(link => {
      const prefix = link.link_type === 'supersedes' ? 'Supersedes: ' :
                     link.link_type === 'implements' ? 'Implements: ' : '';
      content.push(`- ${prefix}${link.target_id}`);
    });
    content.push('');
  }

  // History (if available from content parsing)
  if (memory.history && memory.history.length > 0) {
    content.push('## History');
    memory.history.forEach(entry => {
      content.push(`- ${entry.date}: ${entry.description}`);
    });
    content.push('');
  }

  return frontmatter.join('\n') + '\n' + content.join('\n');
}

/**
 * Get export path for a memory
 * @param {object} memory - Memory object
 * @param {string} projectRoot - Project root directory
 * @param {boolean} archived - Whether memory is archived
 * @returns {string} Full export path
 */
function getExportPath(memory, projectRoot = process.cwd(), archived = false) {
  const baseDir = getMemoryRoot(projectRoot);
  const subDir = archived ? 'archive' : path.join('exports', memory.category || 'patterns');

  // Sanitize title for filename
  const safeTitle = (memory.title || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);

  const filename = `${memory.id}-${safeTitle}.md`;

  return path.join(baseDir, subDir, filename);
}

/**
 * Export a memory to markdown file
 * @param {string} memoryId - Memory ID
 * @param {string} projectRoot - Project root directory
 * @returns {string|null} Export path or null on error
 */
function exportMemory(memoryId, projectRoot = process.cwd()) {
  const memory = db.getMemory(memoryId);
  if (!memory) {
    console.error(`Memory ${memoryId} not found`);
    return null;
  }

  const exportPath = getExportPath(memory, projectRoot, memory.archived);
  const markdown = generateMarkdown(memory);

  // Ensure directory exists
  const dir = path.dirname(exportPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(exportPath, markdown, 'utf8');

  // Update export_path in database
  db.updateMemory(memoryId, { export_path: exportPath });

  return exportPath;
}

/**
 * Export all memories to markdown files
 * @param {string} projectRoot - Project root directory
 * @param {object} options - Export options
 * @returns {object} Export statistics
 */
function exportAll(projectRoot = process.cwd(), options = {}) {
  const memories = db.listMemories({
    includeArchived: options.includeArchived || false
  });

  const stats = {
    total: memories.length,
    exported: 0,
    errors: 0,
    paths: []
  };

  for (const memory of memories) {
    try {
      // Get full memory with content
      const fullMemory = db.getMemory(memory.id);
      if (fullMemory) {
        const exportPath = exportMemory(fullMemory.id, projectRoot);
        if (exportPath) {
          stats.exported++;
          stats.paths.push(exportPath);
        } else {
          stats.errors++;
        }
      }
    } catch (e) {
      console.error(`Error exporting ${memory.id}:`, e.message);
      stats.errors++;
    }
  }

  return stats;
}

/**
 * Import a memory from markdown file
 * @param {string} filePath - Path to markdown file
 * @param {string} projectRoot - Project root directory
 * @returns {string|null} Memory ID or null on error
 */
function importMemory(filePath, projectRoot = process.cwd()) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.error('Invalid markdown format: missing frontmatter');
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  // Parse frontmatter fields
  const memory = {
    tags: []
  };

  frontmatter.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      if (key === 'tags') {
        // Parse array: [tag1, tag2]
        const tagsMatch = value.match(/\[([^\]]*)\]/);
        if (tagsMatch) {
          memory.tags = tagsMatch[1].split(',').map(t => t.trim()).filter(Boolean);
        }
      } else {
        memory[key] = value;
      }
    }
  });

  // Parse body sections
  const summaryMatch = body.match(/## Summary\n([\s\S]*?)(?=\n## |$)/);
  if (summaryMatch) {
    memory.summary = summaryMatch[1].trim();
  }

  const detailsMatch = body.match(/## Details\n([\s\S]*?)(?=\n## |$)/);
  if (detailsMatch) {
    memory.content = detailsMatch[1].trim();
  } else {
    memory.content = memory.summary;
  }

  // Initialize database
  db.initDatabase(projectRoot);

  // Check if memory already exists
  if (db.hasMemory(memory.id)) {
    // Update existing
    db.updateMemory(memory.id, {
      title: memory.title,
      summary: memory.summary,
      content: memory.content,
      category: memory.category,
      importance: memory.importance,
      tags: memory.tags
    });
    return memory.id;
  }

  // Create new
  return db.createMemory(memory);
}

/**
 * Rebuild database from markdown exports
 * @param {string} projectRoot - Project root directory
 * @returns {object} Import statistics
 */
function rebuildFromExports(projectRoot = process.cwd()) {
  const memoryRoot = getMemoryRoot(projectRoot);
  const exportsDir = path.join(memoryRoot, 'exports');
  const archiveDir = path.join(memoryRoot, 'archive');

  const stats = {
    imported: 0,
    errors: 0,
    files: []
  };

  const categories = ['architecture', 'implementation', 'issues', 'patterns'];

  // Process exports
  for (const category of categories) {
    const catDir = path.join(exportsDir, category);
    if (fs.existsSync(catDir)) {
      const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const filePath = path.join(catDir, file);
        try {
          const id = importMemory(filePath, projectRoot);
          if (id) {
            stats.imported++;
            stats.files.push(filePath);
          } else {
            stats.errors++;
          }
        } catch (e) {
          console.error(`Error importing ${filePath}:`, e.message);
          stats.errors++;
        }
      }
    }
  }

  // Process archive
  if (fs.existsSync(archiveDir)) {
    const files = fs.readdirSync(archiveDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(archiveDir, file);
      try {
        const id = importMemory(filePath, projectRoot);
        if (id) {
          // Mark as archived
          db.updateMemory(id, { archived: 1 });
          stats.imported++;
          stats.files.push(filePath);
        } else {
          stats.errors++;
        }
      } catch (e) {
        console.error(`Error importing ${filePath}:`, e.message);
        stats.errors++;
      }
    }
  }

  // Ensure future writes allocate ids after the highest imported mem-XXX.
  db.repairIdCounter();

  return stats;
}

/**
 * Move memory export to archive
 * @param {string} memoryId - Memory ID
 * @param {string} projectRoot - Project root directory
 * @returns {string|null} New path or null on error
 */
function archiveExport(memoryId, projectRoot = process.cwd()) {
  const memory = db.getMemory(memoryId);
  if (!memory) return null;

  const oldPath = memory.export_path;
  const newPath = getExportPath(memory, projectRoot, true);

  // Ensure archive directory exists
  const archiveDir = path.dirname(newPath);
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  // Move file if it exists
  if (oldPath && fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  } else {
    // Generate new export
    const markdown = generateMarkdown(memory);
    fs.writeFileSync(newPath, markdown, 'utf8');
  }

  // Update database
  db.updateMemory(memoryId, {
    archived: 1,
    export_path: newPath
  });

  return newPath;
}

module.exports = {
  generateMarkdown,
  getExportPath,
  exportMemory,
  exportAll,
  importMemory,
  rebuildFromExports,
  archiveExport
};
