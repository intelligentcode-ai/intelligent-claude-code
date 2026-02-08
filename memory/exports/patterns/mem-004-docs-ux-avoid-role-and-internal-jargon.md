---
id: mem-004
title: Docs UX: avoid @Role and internal jargon
tags: [docs, readme, roles, ux]
category: patterns
scope: project
importance: high
created: 2026-02-08T13:24:27.367Z
---

# Docs UX: avoid @Role and internal jargon

## Summary
Docs should use role prefixes like 'PM: ...' and keep user-facing workflow explanations as plain checklists (avoid Stage/AgentTask jargon).

## Details
Docs guidance learned:\n\n- Do NOT use @PM/@Reviewer examples: in some tools '@' triggers file mentions/opening, so role invocation examples should be 'PM: ...', 'Reviewer: ...'.\n- Prefer plain-English, scannable checklists for README and workflow docs.\n- Keep internal implementation terms (e.g., Stage 3, AgentTask) out of user-facing docs; keep only what a human needs to run the workflow.\n- Legacy/outdated docs should be removed rather than kept as 'legacy' sections.
