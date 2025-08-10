# STORY-004: Allow Memory Storage Outside Project Directory (SIMPLIFIED)

**Status:** Completed  
**Priority:** Medium  
**Created:** 2025-08-10  
**Requestor:** User  
**Epic:** Behavioral Enhancement  
**System Context:** MARKDOWN-BASED AI-AGENTIC SYSTEM

## Story
As a developer, I want AI agents to store memory outside the project directory, so memory remains private and separate from project code.

## Core Requirement
Allow configuration of memory path to be outside project directory:
- Instead of `./memory/` 
- Use configured path like `~/claude-memory/` or `/path/to/memory-repo/`
- Optionally in a separate Git repository

## Simple Implementation

### Configuration in CLAUDE.md
```yaml
memory_configuration:
  external_path: "~/claude-memory"  # Or any path outside project
```

### Behavioral Changes Needed
1. Update memory operations behavior to check for `external_path` config
2. If configured, use that path instead of `./memory/`
3. Ensure memory operations respect the configured path
4. Keep memory private (already in .gitignore)

## Acceptance Criteria
- [ ] Memory can be stored in configured external directory
- [ ] Memory operations work with external path
- [ ] Configuration documented
- [ ] Backward compatible (defaults to `./memory/` if not configured)

## What We DON'T Need
- Complex migration tools
- Multiple sync strategies
- Initialization dialogs
- Runtime reconfiguration commands
- Performance optimization
- Team sharing features

Just a simple configuration option to store memory elsewhere!