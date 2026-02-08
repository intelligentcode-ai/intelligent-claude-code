---
id: mem-006
title: Claude Code hooks: settings.json schema + ansible merge fix
tags: [ansible, claude-code, hooks, icc, settings.json]
category: patterns
scope: project
importance: high
created: 2026-02-08T14:24:17.856Z
---

# Claude Code hooks: settings.json schema + ansible merge fix

## Summary
Claude Code hooks expect hook entries to use the key 'command' (not 'ansible.builtin.command'). ICC's ansible installer must merge production hooks using 'command' so Claude Code doesn't error with 'Expected string, but received undefined'.

## Details
Issue: Claude Code reported settings error under ~/.claude/settings.json because hooks.PreToolUse[0].hooks[*].command was undefined. Cause: installer merged hooks using the YAML key 'ansible.builtin.command', producing JSON like {"ansible.builtin.command": "node ..."} instead of {"command": "node ..."}.\n\nFix: update ansible hook merge in ansible/roles/intelligent_claude_code/tasks/main.yml to emit 'command'. Confirmed by running claude --version with no settings parse error.
