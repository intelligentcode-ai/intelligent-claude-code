---
id: mem-008
title: Memory versioning model: gitignore SQLite, commit markdown exports
tags: [best-practices, git, memory, sqlite, versioning]
category: architecture
scope: project
importance: high
created: 2026-02-08T14:24:17.856Z
---

# Memory versioning model: gitignore SQLite, commit markdown exports

## Summary
Treat SQLite as local derived state in .agent/memory (gitignored); share long-term knowledge via committed markdown under memory/exports; rebuild local DB from exports on init.

## Details
Rationale: SQLite DBs do not merge well in git and are per-machine runtime state. The project should gitignore .agent/memory/ (DB + caches). Durable/team-shareable knowledge should live as markdown exports in memory/exports/ (and optionally memory/archive/), which are reviewable and versioned.\n\nImplementation detail: memory CLI init rebuilds the local SQLite index from memory/exports so new clones can immediately search/list prior memories.\n\nPromotion: patterns that are general and repeatedly useful should be promoted into best-practices/<category>/ as a stable guideline; memory entries can link to the best-practice.
