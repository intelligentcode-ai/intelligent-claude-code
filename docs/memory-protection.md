# Memory Protection Guide

## Overview

ICC separates memory into:

- **Local runtime state (never commit):** `.agent/memory/` (SQLite DB + caches)
- **Shareable memory exports (ok to commit):** `memory/exports/` (markdown)

This keeps fast local search (SQLite + embeddings) without putting a binary database into git.

## What Must Stay Local

- `.agent/memory/memory.db`
- Anything under `.agent/memory/`
- Files ending in `*.memory` or `*.learning` (if you use those patterns)

These are ignored by default via `.gitignore`, and blocked by a pre-commit hook as a safety net.

## What Is Safe To Share

- `memory/exports/<category>/mem-*.md`
- `memory/archive/` (optional; if you want an audit trail of older exports)

These are human-readable, diffable, and PR-reviewable.

## Protections In This Repo

1. `.gitignore` ignores `.agent/memory/` (local runtime state).
2. `.githooks/pre-commit` blocks committing `.agent/memory/` even if it is accidentally staged.

## One-Time Local Setup (Optional)

If you want the repo hook to run locally:

```bash
git config core.hooksPath .githooks
```

## Quick Verification

```bash
# should print nothing
git ls-files .agent/memory || true

# should show exported markdown (if present)
ls -la memory/exports 2>/dev/null || true
```

