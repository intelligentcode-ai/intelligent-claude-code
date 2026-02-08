---
id: mem-001
title: Memory Skill Implementation
tags: [embeddings, memory, rag, skills, sqlite]
category: implementation
scope: project
importance: high
created: 2026-02-07T09:46:37.735Z
---

# Memory Skill Implementation

## Summary
Implemented memory skill with SQLite + FTS5 + local embeddings for hybrid search. Uses better-sqlite3 and @xenova/transformers. Integrates with process (auto-check before implementing, auto-save after) and reviewer (auto-remember recurring issues) skills.
