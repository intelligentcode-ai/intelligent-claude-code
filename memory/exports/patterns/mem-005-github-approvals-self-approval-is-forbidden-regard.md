---
id: mem-005
title: GitHub approvals: self-approval is forbidden regardless of required approvals
tags: [approvals, github, policy, workflow]
category: patterns
scope: project
importance: high
created: 2026-02-08T13:24:34.379Z
---

# GitHub approvals: self-approval is forbidden regardless of required approvals

## Summary
GitHub enforces a server-side rule: the PR author cannot submit an APPROVED review on their own PR; '0 required approvals' removes merge blocking but does not allow self-approval.

## Details
Approvals policy learned:\n\n- Even if branch protection requires 0 approvals, GitHub still forbids the PR author from submitting an APPROVED review on their own PR (CLI shows API error).\n- Therefore, a 'pragmatic auto-approve' step only works if the authenticated GH user is not the PR author (use a second identity/bot) or if approvals are optional in the workflow.\n- If workflow.require_github_approval=true is enabled, self-authored PRs need a second identity/bot to satisfy the gate.
