---
id: mem-007
title: Memory skill reliability: id allocation, import seeding, and FTS query sanitization
tags: [concurrency, fts, import, memory, sqlite, unique]
category: implementation
scope: project
importance: high
created: 2026-02-08T14:24:17.857Z
---

# Memory skill reliability: id allocation, import seeding, and FTS query sanitization

## Summary
Fixes: repair sequential id counter via meta.next_id, robust retries on UNIQUE collisions, rebuild DB from markdown exports, and quote special tokens in FTS queries so hyphenated terms (e.g., ICC-REVIEW) don't error.

## Details
Observed issues: (1) concurrent writes/imports could hit UNIQUE constraint on memories.id; (2) after importing mem-001..mem-005 from committed exports, the local next_id counter could lag and cause repeated collisions; (3) FTS5 MATCH queries like ICC-REVIEW could throw syntax errors.\n\nFixes:\n- db.js: add repairIdCounter() and call it after schema and after import; expand createMemory() collision retries and ensure it either inserts or errors; add hasMemory() for existence checks without mutating access_count.\n- export.js: rebuildFromExports() reads from shareable memory root (memory/exports + memory/archive), imports into SQLite, then calls repairIdCounter().\n- search.js: quote terms with special characters before passing to FTS5 MATCH to avoid parse errors.\n\nResult: memory init seeds DB from committed exports; searching ICC-REVIEW works; fresh clones get searchable project knowledge without committing the DB.
