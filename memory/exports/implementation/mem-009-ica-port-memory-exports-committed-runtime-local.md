---
id: mem-009
title: ICA port: memory exports committed, runtime local
tags: [ci, gitignore, ica, memory, versioning]
category: implementation
scope: project
importance: medium
created: 2026-02-08T15:26:51.893Z
---

# ICA port: memory exports committed, runtime local

## Summary
Ported the split memory storage model into intelligent-code-agents: .agent/memory is local-only (gitignored + pre-commit + CI), shareable exports live in memory/exports and seed local DB via init; docs/templates updated.
