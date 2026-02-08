---
id: mem-002
title: Skill Integration Pattern
tags: [integration, patterns, process, reviewer, skills]
category: patterns
scope: project
importance: high
created: 2026-02-07T09:46:53.508Z
---

# Skill Integration Pattern

## Summary
Skills integrate via CLI calls: node ~/.claude/skills/memory/cli.js <command>. Process skill calls memory before implementing (check for prior solutions) and after (save key decisions). Reviewer skill calls memory to save recurring issues. Best-practices skill searches memory alongside best-practices directory.
