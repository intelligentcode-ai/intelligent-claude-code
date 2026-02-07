#!/usr/bin/env node
/**
 * Memory Skill CLI
 * Command-line interface for memory operations
 *
 * Usage:
 *   node cli.js write --title "..." --summary "..." [--tags "..."] [--category "..."]
 *   node cli.js search "query"
 *   node cli.js get <id>
 *   node cli.js list [--category "..."] [--tag "..."]
 *   node cli.js stats
 *   node cli.js update <id> --title "..." --summary "..."
 *   node cli.js link <source> <target> [--type "related"]
 *   node cli.js archive <id>
 *   node cli.js delete <id>
 */

const memory = require('./lib/index.js');
const path = require('path');

// Find project root (look for .git or CLAUDE.md)
function findProjectRoot() {
  let dir = process.cwd();
  const fs = require('fs');

  // Cross-platform root detection: stop when dir === path.dirname(dir)
  // This works on both Unix (/) and Windows (C:\)
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, '.git')) ||
        fs.existsSync(path.join(dir, 'CLAUDE.md'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const projectRoot = findProjectRoot();

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

function parseArgs(args) {
  const result = { _: [] };
  let i = 0;
  while (i < args.length) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      result[key] = value;
      i += value === true ? 1 : 2;
    } else {
      result._.push(args[i]);
      i++;
    }
  }
  return result;
}

const opts = parseArgs(args.slice(1));

async function main() {
  try {
    switch (command) {
      case 'write': {
        if (!opts.title || !opts.summary) {
          console.error('Usage: memory write --title "..." --summary "..." [--content "..."] [--tags "a,b,c"] [--category "..."] [--importance "high|medium|low"]');
          process.exit(1);
        }
        const result = await memory.write({
          title: opts.title,
          summary: opts.summary,
          content: opts.content || opts.summary,
          tags: opts.tags ? opts.tags.split(',').map(t => t.trim()) : [],
          category: opts.category,
          importance: opts.importance,
          projectRoot
        });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'search': {
        const query = opts._.join(' ');
        if (!query) {
          console.error('Usage: memory search "query" [--limit N]');
          process.exit(1);
        }
        const result = await memory.find(query, {
          projectRoot,
          limit: opts.limit ? parseInt(opts.limit) : 10
        });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'quick': {
        const query = opts._.join(' ');
        if (!query) {
          console.error('Usage: memory quick "query"');
          process.exit(1);
        }
        const results = memory.quickFind(query, { projectRoot, limit: 10 });
        console.log(JSON.stringify(results, null, 2));
        break;
      }

      case 'get': {
        const id = opts._[0];
        if (!id) {
          console.error('Usage: memory get <id>');
          process.exit(1);
        }
        const mem = memory.get(id, { projectRoot });
        if (mem) {
          console.log(JSON.stringify(mem, null, 2));
        } else {
          console.error(`Memory ${id} not found`);
          process.exit(1);
        }
        break;
      }

      case 'list': {
        const filters = {};
        if (opts.category) filters.category = opts.category;
        if (opts.tag) filters.tag = opts.tag;
        if (opts.importance) filters.importance = opts.importance;
        if (opts['include-archived']) filters.includeArchived = true;
        if (opts.limit) filters.limit = parseInt(opts.limit);

        const results = memory.list(filters, { projectRoot });
        console.log(JSON.stringify(results, null, 2));
        break;
      }

      case 'stats': {
        const stats = memory.stats({ projectRoot });
        console.log(JSON.stringify(stats, null, 2));
        break;
      }

      case 'update': {
        const id = opts._[0];
        if (!id) {
          console.error('Usage: memory update <id> --title "..." --summary "..."');
          process.exit(1);
        }
        const updates = {};
        if (opts.title) updates.title = opts.title;
        if (opts.summary) updates.summary = opts.summary;
        if (opts.content) updates.content = opts.content;
        if (opts.category) updates.category = opts.category;
        if (opts.importance) updates.importance = opts.importance;
        if (opts.tags) updates.tags = opts.tags.split(',').map(t => t.trim());

        const success = await memory.update(id, updates, { projectRoot });
        console.log(JSON.stringify({ success, id }));
        break;
      }

      case 'link': {
        const [source, target] = opts._;
        if (!source || !target) {
          console.error('Usage: memory link <source-id> <target-id> [--type related|supersedes|implements]');
          process.exit(1);
        }
        const success = memory.link(source, target, opts.type || 'related', { projectRoot });
        console.log(JSON.stringify({ success, source, target, type: opts.type || 'related' }));
        break;
      }

      case 'archive': {
        const id = opts._[0];
        if (!id) {
          console.error('Usage: memory archive <id>');
          process.exit(1);
        }
        const newPath = memory.archive(id, { projectRoot });
        console.log(JSON.stringify({ success: !!newPath, id, archivePath: newPath }));
        break;
      }

      case 'delete': {
        const id = opts._[0];
        if (!id) {
          console.error('Usage: memory delete <id>');
          process.exit(1);
        }
        const success = memory.remove(id, { projectRoot });
        console.log(JSON.stringify({ success, id }));
        break;
      }

      case 'candidates': {
        const candidates = memory.getArchiveCandidates({ projectRoot });
        console.log(JSON.stringify(candidates, null, 2));
        break;
      }

      case 'init': {
        const success = memory.init(projectRoot);
        console.log(JSON.stringify({ success, projectRoot }));
        break;
      }

      default:
        console.log(`Memory Skill CLI

Commands:
  init                              Initialize memory database
  write --title "..." --summary "..." [options]  Store a new memory
  search "query"                    Hybrid search (keyword + semantic)
  quick "query"                     Fast keyword-only search
  get <id>                          Get memory by ID
  list [--category X] [--tag Y]     List memories
  stats                             Show statistics
  update <id> [--title/--summary/...] Update a memory
  link <source> <target>            Link two memories
  archive <id>                      Archive a memory
  delete <id>                       Delete a memory
  candidates                        Show archive candidates

Options:
  --title "..."       Memory title
  --summary "..."     Brief summary
  --content "..."     Full content
  --tags "a,b,c"      Comma-separated tags
  --category "..."    Category (architecture, implementation, issues, patterns)
  --importance "..."  Importance (high, medium, low)
  --limit N           Limit results
  --include-archived  Include archived in list
`);
    }
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  } finally {
    memory.close();
  }
}

main();
