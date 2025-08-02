# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, command chain coordination, behavioral framework guidance, and Git workflow integration. This repository contains the configuration templates, behavioral patterns, and installation system for the virtual team enhancement.

## Common Development Commands

### Installation and Setup
```bash
make install           # Install locally to ~/.claude/
make test             # Run installation tests
make uninstall        # Remove installation (preserves user data)
make uninstall FORCE=true  # Complete removal including user data
```

### System Initialization and Management
```bash
/icc-init-system      # Initialize virtual team system (run after installation)
/icc-system-status    # Check system health and component status
/icc-load-project-context  # Load PROJECT-CONTEXT.md for current project
```

### Common Workflow Commands
```bash
# Virtual Team Interaction
@PM Build me a [project]     # Start any project with PM coordination
@Architect Design the API    # Request architecture design
@Developer Implement auth    # Assign implementation task
@Security-Engineer Review    # Request security review

# Configuration and Settings
/icc-get-setting [key]       # Get specific configuration value
/icc-load-config            # Reload all configuration files

# Memory Operations
/icc-search-memory [query]   # Search memory for patterns/learnings
/icc-store-memory [type] [content]  # Store new memory entity
/icc-memory-status          # Check memory system statistics
```

## High-Level Architecture

### Virtual Team System
The system implements a **14-role virtual development team** that operates through behavioral patterns and command chains:

1. **Role System**: 14 specialized roles (@PM, @Architect, @Developer, etc.) with unlimited dynamic specialist creation for <70% capability matches
2. **Workflow Engine**: Two-level workflow system (Outer for story/bug planning, Inner for task execution) with Task tool invocations
3. **Memory System**: File-based memory storage in `.claude/memory/` with exponential aging and pattern capture
4. **Configuration Hierarchy**: Embedded → Project → User → System defaults with dynamic loading
5. **Behavioral Enforcement**: Mandatory patterns with auto-correction and penalty systems

### Directory Structure
```
project-root/
├── .claude/                    # Project-specific configuration
│   ├── PROJECT-CONTEXT.md      # Project context (loaded once by parent)
│   ├── config.md              # Project settings
│   └── memory/                # File-based memory storage
│       └── entities/          # Learning, Pattern, Knowledge entities
├── epics/                     # Epic/Story/Bug organization
│   └── EPIC-XXX/
│       ├── epic.yaml
│       ├── stories/
│       │   └── STORY-XXX/
│       └── bugs/
│           └── BUG-XXX/
└── src/                       # System source files
    ├── behaviors/             # Behavioral patterns
    ├── commands/              # Slash commands
    ├── modes/                 # Virtual team mode
    ├── roles/                 # Role definitions
    └── workflow-templates/    # Workflow execution patterns
```

### Key Architectural Patterns

1. **Task Tool Pattern**: Every @Role mention triggers a Task tool invocation creating a subagent
2. **Context Loading**: Parent loads PROJECT-CONTEXT.md and settings ONCE, passes to all subagents
3. **Memory-First**: All operations check memory before action, store results after completion
4. **Learning System**: First errors forgiven with pattern capture, repeated errors penalized
5. **Autonomy Levels**: L1 (manual approval), L2 (architect approval), L3 (full autonomous)

### Workflow Execution

The system uses a simplified, AI-executable workflow with clear steps:

**Outer Workflow (Story/Bug Level)**:
1. PM Planning (loads all context/settings)
2. Architect Triage
3. Task Creation with pre-assigned SME reviewers
4. Git Branch Setup
5. Parallel Task Execution
6. Merge Request Decision
7. Story Retrospective

**Inner Workflow (Task Level)**:
1. Memory Search
2. Generate Workflow Steps
3. Execute Work
4. SME Peer Review
5. Version Bump
6. Git Operations
7. Task Completion
8. Learning Capture

## Testing

Run the comprehensive test suite:
```bash
make test  # Runs installation, idempotency, uninstall, and reinstall tests
```

Tests verify:
- Ansible syntax validation
- Installation creates all required files
- Import line added to CLAUDE.md
- Conservative uninstall preserves user data
- Force uninstall removes everything
- Reinstallation works after uninstall

## Work Guidance

### Work Location Guidelines
- Work is ONLY to be conducted INSIDE this project!
- No external work or context switching is permitted
- All tasks must be focused on the intelligent-claude-code repository and its enhancement

### Key Implementation Notes

1. **LOAD ONCE, PASS EVERYWHERE**: Parent loads PROJECT-CONTEXT AND ALL SETTINGS ONCE, passes to EVERY subagent
2. **NO REDUNDANT LOADING**: Subagents NEVER load context or settings - parent provides everything
3. **Pre-Assigned Reviews**: SME reviewers are assigned during task creation, not selected at runtime
4. **Role in Title**: Every task MUST include role in square brackets: "[Role] Description"
5. **Complexity-Based Subtasks**: Simple (0-1), Standard (2-3), Complex (4+) subtasks based on work nature
6. **Version Bumping**: Always bump version before git operations in inner workflow step 5
7. **Git Privacy**: Strip AI mentions when git_privacy=true before commits

### System Features

- **Dynamic Specialists**: Auto-create domain experts (@React-Developer, @AWS-Engineer) with 10+ years expertise
- **Learning Culture**: First errors create learnings, repeated errors get penalties, applied learnings earn bonuses
- **Parallel Execution**: Up to 5 non-conflicting tasks execute simultaneously
- **Self-Correcting**: Automatic violation detection and correction with penalty systems
- **Memory Integration**: File-based storage with search, relationships, and exponential aging

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.