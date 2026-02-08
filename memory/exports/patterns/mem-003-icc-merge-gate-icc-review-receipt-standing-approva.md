---
id: mem-003
title: ICC merge gate: ICC-REVIEW-RECEIPT + standing approval
tags: [auto_merge, dev-first, merge, receipt, workflow]
category: patterns
scope: project
importance: high
created: 2026-02-08T13:24:18.223Z
---

# ICC merge gate: ICC-REVIEW-RECEIPT + standing approval

## Summary
Merges are gated by a fresh ICC-REVIEW-RECEIPT comment matching the PR head SHA; merging without explicit user approval is only allowed when workflow.auto_merge=true.

## Details
Workflow rules learned/confirmed:\n\n- PRs target dev; main only via release PR (dev -> main).\n- Merge gate is a PR comment marker ICC-REVIEW-RECEIPT that must be fresh and match the PR head SHA (Head-SHA).\n- Receipt must show Findings: 0 / NO FINDINGS / Result: PASS and indicate subagent reviewer context.\n- Default safety: wait for explicit user approval before merging.\n- Optional: set workflow.auto_merge=true (standing approval) to allow agent-performed merges after gates pass (recommended only for PRs into dev).\n- Releases remain explicit (dev -> main PR, tag, GitHub release, then sync main back into dev).
