---
name: memory
description: Activate when user wants to save knowledge, search past decisions, or manage persistent memories. Handles architecture patterns, implementation logic, issues/fixes, and past implementations. Uses local SQLite + FTS5 + vector embeddings for fast hybrid search. Supports write, search, update, archive, and list operations.
---

# Memory Skill

Persistent knowledge storage with local RAG for agents.

## Overview

The memory skill provides a three-tier storage system:
1. **SQLite Database** - Fast queries, FTS5 search, vector embeddings
2. **Markdown Exports** - Human-readable, git-trackable
3. **Archive** - Low-relevance memories preserved for reference

## Storage Locations (Default)

```
.agent/memory/
├── memory.db           # SQLite database (local runtime state; recommended gitignored)

memory/
├── exports/            # Markdown exports (shareable; git-trackable)
│   ├── architecture/
│   ├── implementation/
│   ├── issues/
│   └── patterns/
└── archive/            # Archived memory exports
```

## Important: Public Memory Is First-Class

`memory/exports/**` is treated as equal importance to the local SQLite DB.
The SQLite database under `.agent/memory/memory.db` is an index/cache, and the
memory skill automatically imports/syncs committed exports before read and
write operations so searches don't miss "public" knowledge.

## Operations

### Write Memory

**Triggers:**
- "Remember this..."
- "Save to memory..."
- "Store this pattern..."

**Flow:**
1. Extract: title, summary, tags, category
2. Generate embedding for semantic search
3. Insert into SQLite with FTS5 indexing
4. Export to markdown for git tracking
5. Confirm storage

**Auto-categorization:**
| Keywords | Category |
|----------|----------|
| design, pattern, structure, architecture | architecture |
| code, function, module, implement | implementation |
| bug, fix, error, problem, issue | issues |
| approach, solution, method, technique | patterns |

**Example:**
```
Remember: JWT auth uses 15-min access tokens with refresh tokens
Tags: auth, jwt, security
```

### Search Memory (Hybrid RAG)

**Triggers:**
- "What do we know about X?"
- "Search memory for..."
- "Find memories about..."
- "Did we solve this before?"

**Hybrid Search Pipeline:**
```
Query → ┬→ FTS5 keyword search (BM25)        ─┐
        └→ Vector similarity (cosine)        ─┼→ Merge & Rank → Results
        ┌→ Tag/category filter               ─┘
```

**Scoring:**
- keyword_score * 0.4
- semantic_score * 0.4
- relevance_score * 0.2 (importance, access count, links)

**Syntax:**
```
memory search: jwt authentication              # Hybrid search
memory search: jwt tag:security                # With tag filter
memory search: category:architecture           # Category filter
memory search: similar to mem-001              # Find similar
memory search: --include-archive               # Include archived
```

### Update Memory

**Trigger:** "Update memory about X..."

**Flow:**
1. Find memory by ID or search
2. Apply changes to content
3. Add entry to History section
4. Re-generate embedding
5. Update markdown export

### Link Memory

**Trigger:** "Link memory X to Y"

**Link types:**
- `related` - General relationship
- `supersedes` - Newer replaces older
- `implements` - Memory implements a story/bug

**Example:**
```
Link mem-001 to STORY-015
Link mem-003 supersedes mem-001
```

### Archive Memory

**Trigger:** "Archive memory X" or auto-detected low relevance

**Relevance factors (for auto-archive candidates):**
- Importance: low
- Never accessed after creation
- Not linked to other memories
- Superseded by newer decision

**Flow:**
1. Move export to `archive/` directory
2. Set `archived=1` in database
3. Remains searchable with `--include-archive`

### List Memories

**Trigger:** "List memories" or "Show all memories"

**Options:**
```
list memories                      # All active, grouped by category
list memories category:arch        # Filter by category
list memories tag:security         # Filter by tag
list memories --include-archive    # Include archived
```

### Memory Stats

**Trigger:** "Memory stats" or "Memory statistics"

**Output:**
- Total memories (active/archived)
- By category breakdown
- Most accessed memories
- Archive candidates (low relevance)
- Database size

## Auto-Integration

### With Process Skill
Key decisions are **auto-saved silently** during development:
- Architecture decisions
- Pattern choices
- Problem solutions
- Configuration rationale

### With Reviewer Skill
Recurring issues are auto-remembered:
- Common bugs and their fixes
- Security patterns
- Code quality findings

### Implementation Check
Before implementing, check: "Did we solve this before?"
- Searches for similar problems
- Returns relevant past solutions

## Memory Entry Format

### Database Schema
```sql
memories (id, title, summary, content, category, scope,
          importance, created_at, accessed_at, access_count,
          supersedes, archived, export_path)
memories_fts (title, summary, content)  -- FTS5 virtual table
memories_vec (memory_id, embedding)      -- 384-dim vectors
tags (memory_id, tag)
links (source_id, target_id, link_type)
```

### Markdown Export
```markdown
---
id: mem-001
title: JWT Authentication Pattern
tags: [auth, jwt, security]
category: architecture
importance: high
created: 2026-02-01T10:00:00Z
---

# JWT Authentication Pattern

## Summary
Use refresh tokens with 15-min access token expiry.

## Context
[Why this decision was made]

## Implementation
[Code examples, configuration]

## Related
- mem-002: Token Refresh Flow

## History
- 2026-02-01: Initial creation
```

## Setup

### Automatic (via ICC installers)
If npm is available during `make install` or `.\install.ps1 install`, dependencies are installed automatically.

### Manual Setup (if needed)
```bash
# Linux/macOS
cd ~/.claude/skills/memory && npm install --production

# Windows PowerShell
cd $env:USERPROFILE\.claude\skills\memory
npm install --production
```

## Dependencies

For CLI features (optional but recommended):
- `better-sqlite3` - SQLite with native bindings
- `@xenova/transformers` - Local embedding generation

First use of embeddings downloads the model (~80MB) to `~/.cache/transformers/`.

## Fallback Behavior

If CLI/dependencies unavailable, the skill works via manual markdown:
1. Write memories as markdown files in `memory/exports/`
2. Search using Grep tool or file search
3. All memory functionality remains available, just without hybrid RAG

## Execution

### Method 1: CLI (Recommended when Node.js available)

If the memory skill's dependencies are installed:

```bash
# Path to CLI (adjust for your installation)
MEMORY_CLI="$HOME/.claude/skills/memory/cli.js"  # Linux/macOS
# $env:USERPROFILE\.claude\skills\memory\cli.js   # Windows

# Check if CLI is available
node $MEMORY_CLI --help

# Write a memory
node $MEMORY_CLI write \
  --title "JWT Authentication" \
  --summary "Use 15-min access tokens with refresh tokens" \
  --tags "auth,jwt,security" \
  --category "architecture" \
  --importance "high"

# Search (hybrid: keyword + semantic)
node $MEMORY_CLI search "authentication tokens"

# Quick search (keyword only, faster)
node $MEMORY_CLI quick "jwt"

# List memories
node $MEMORY_CLI list --category architecture

# Get specific memory
node $MEMORY_CLI get mem-001

# Statistics
node $MEMORY_CLI stats
```

### Method 2: Manual Markdown (Fallback)

When Node.js/dependencies unavailable, manage memories as markdown files directly:

**Write:**
```bash
mkdir -p memory/exports/architecture
cat > memory/exports/architecture/mem-001-jwt-auth.md << 'EOF'
---
id: mem-001
title: JWT Authentication Pattern
tags: [auth, jwt, security]
category: architecture
importance: high
created: 2026-02-07T10:00:00Z
---

# JWT Authentication Pattern

## Summary
Use 15-min access tokens with refresh tokens.

## Details
[Full description here]
EOF
```

**Search:**
```bash
# Keyword search in exports
grep -r "authentication" memory/exports/
```

**List:**
```bash
find memory/exports -name "*.md" -type f
```

### Cross-Platform Notes

| Platform | CLI Available | Fallback |
|----------|---------------|----------|
| Linux | Yes (if Node.js installed) | Manual markdown |
| macOS | Yes (if Node.js installed) | Manual markdown |
| Windows | Yes (if Node.js installed) | Manual markdown |
| Codex/GPT | No | Manual markdown |
| Cursor | Depends on setup | Manual markdown |

## Cross-Platform

- Windows/macOS/Linux supported
- SQLite works everywhere
- Markdown exports are universal
- Model cached per-user (not per-project)
