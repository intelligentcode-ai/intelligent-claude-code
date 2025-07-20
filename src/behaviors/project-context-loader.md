# Project Context Loader

**Purpose:** Enforce PROJECT-CONTEXT.md loading as first action in every session  
**Type:** Core System Behavior  
**Status:** ACTIVE

## Imports

@./shared-patterns/memory-patterns.md
@./shared-patterns/validation-patterns.md

## Core Enforcement

### Context-First Behavior (Using Shared Patterns)
- Apply Session Management from memory-patterns.md
- Use Blocking Behaviors from validation-patterns.md  
- Follow Memory Integration patterns for context storage
- Implement Auto-Creation patterns when missing

### Context Commands
- Use `/icc-memory-search "ProjectContext"` to check existing context
- Use `/icc-read-project-context` to load from file
- Use `/icc-check-context-status` before ALL command execution
- Use `/icc-refresh-context` to update stale context

## Loading Behaviors

### Session Detection (Using Shared Patterns)
- Apply Session Boundary Detection from memory-patterns.md
- Check for ProjectContext entity in memory
- Validate context age and project path
- Force reload on session changes

### Template Generation (Using Shared Patterns)
- Use `/icc-detect-project-type [project_path]` to analyze structure
- Use `/icc-create-project-template [type] [path]` to generate template
- Apply Project Type Detection patterns:
  - Web Application, Backend Service, Mobile App
  - Library/Package, Documentation Site, Data/AI Project
  - DevOps/Infrastructure, Game/Engine, Enterprise System

## Integration Patterns

### System Integration (Using Shared Patterns)
- Apply Command Interception from validation-patterns.md
- Use Role Activation blocking until context loaded
- Follow Hard/Soft Blocking patterns based on operation type
- Implement Memory Storage for context persistence

### Auto-Creation Process
- Analyze project structure for type detection
- Generate intelligent templates with discovered patterns
- Pre-populate with technology stack and conventions
- Guide completion with project-specific instructions

## Benefits

✅ **Context-First Enforcement** - No work without project understanding
✅ **Intelligent Templates** - Auto-generated based on project analysis
✅ **Session Persistence** - Context survives across sessions via memory
✅ **Universal Blocking** - All roles require context before activation

---
*Project context loader for intelligent-claude-code system*