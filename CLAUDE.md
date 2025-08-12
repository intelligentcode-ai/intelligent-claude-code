# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, command chain coordination, behavioral framework guidance, and PRB-driven execution. This repository contains the configuration templates, behavioral patterns, and installation system for the virtual team enhancement.

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

### Common Development Commands
```bash
# Virtual Team Interaction
@PM Build me a [project]     # Start any project with PM coordination
@Architect Design the API    # Request architecture design
@Developer Implement auth    # Assign implementation task
@Security-Engineer Review    # Request security review

# Story Management (NEW!)
@PM break down [story]       # Convert story to PRBs
@PM what story next?         # Select next story with architect

# Configuration and Settings
/icc-get-setting [key]       # Get specific configuration value
/icc-load-config            # Reload all configuration files

# Memory Operations
/icc-search-memory [query]   # Search memory for patterns/learnings
/icc-store-memory [type] [content]  # Store new memory entity
/icc-memory-status          # Check memory system statistics

# MCP Server Integration
make install MCP_CONFIG=./config/mcps.json  # Install with MCP servers
# Configure MCP servers with environment variables and validation
# Automatic backup and rollback on configuration errors
# JSON syntax validation and comprehensive error handling
```

## High-Level Architecture

### Virtual Team System
The system implements a **14-role virtual development team** that operates through behavioral patterns and command chains:

1. **Role System**: 14 specialized roles (@PM, @Architect, @Developer, etc.) with unlimited dynamic specialist creation for <70% capability matches
2. **PRB Engine**: Product Requirement Blueprint system with 5 complexity tiers (Nano, Tiny, Medium, Large, Mega) for single-pass execution
3. **Memory System**: File-based memory storage (version-controlled in `memory/`) with topic-based organization and pattern capture
4. **Configuration Hierarchy**: Embedded → Project → User → System defaults with dynamic loading
5. **Behavioral Enforcement**: Mandatory patterns with auto-correction and penalty systems

### Your Project Structure
```
your-project/                  # YOUR project (any structure you want!)
├── CLAUDE.md                  # Project context and config
├── config.md                  # Project config (optional, default location)
├── docs/                      # Your docs (or wherever you prefer)
│   ├── best-practices/        # Your practices
│   └── architecture/          # Your architecture
├── src/                       # Your code
├── memory/                    # Version-controlled learning storage
│   └── [topic]/               # Organized by topic
├── prbs/                      # Version-controlled PRBs
│   ├── ready/                 # Ready to execute
│   └── completed/             # Executed PRBs
└── stories/                   # User stories for PRB generation (NEW!)
    └── drafts/                # Work-in-progress stories
```

The system adapts to YOUR structure via CLAUDE.md configuration!

### Key Architectural Patterns

1. **Task Tool Pattern**: Every @Role mention triggers a Task tool invocation creating a subagent
2. **Context Loading**: CLAUDE.md provides all context, PRBs are self-contained
3. **Memory-First**: All operations check memory before action, store results after completion
4. **Learning System**: First errors forgiven with pattern capture, repeated errors penalized
5. **Autonomy Levels**: L1 (manual approval), L2 (architect approval), L3 (full autonomous)

### PRB Execution

The system uses Product Requirement Blueprints for single-pass execution with full project context:

**PRB Complexity Tiers**:
- **Nano (0-2 points)**: Trivial one-line changes
- **Tiny (3-5 points)**: Simple single-file tasks
- **Medium (6-15 points)**: Standard multi-file features
- **Large (16-30 points)**: Complex features with sub-PRBs
- **Mega (30+ points)**: System-wide changes

**PRB Features**:
1. **Context Integration**: CLAUDE.md, memory search, best practices
2. **Project Standards**: Coding style, architecture patterns, IaC standards
3. **Code Pattern Search**: Find and reuse existing implementations
4. **External Documentation**: Context7 real-time docs, project wikis
5. **Behavioral Customization**: Project-specific execution styles
6. **Draft Support**: Generate PRBs from specifications in .claude/drafts/

**Project Configuration** (in CLAUDE.md):
- Best practices paths
- Architecture constraints  
- Coding standards
- Behavioral overrides
- External documentation sources

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

1. **CONTEXT LOADING**: PRBs include complete context - CLAUDE.md and memory search results upfront
2. **SINGLE-PASS EXECUTION**: Each PRB contains everything needed for complete execution
3. **COMPLEXITY-BASED SELECTION**: System auto-selects PRB template based on complexity score
4. **Role in Title**: Every work item MUST include role in square brackets: "[Role] Description"
5. **Autonomous Execution**: PRBs enable reliable autonomous work without workflow interruptions
6. **Version Bumping**: Always bump version before git operations
7. **Git Privacy**: Strip AI mentions when git_privacy=true before commits

### System Features

- **Dynamic Specialists**: Auto-create domain experts (@React-Developer, @AWS-Engineer) with 10+ years expertise
- **Learning Culture**: First errors create learnings, repeated errors get penalties, applied learnings earn bonuses
- **Parallel Execution**: Up to 5 non-conflicting tasks execute simultaneously
- **Self-Correcting**: Automatic violation detection and correction with penalty systems
- **Memory Integration**: File-based storage with search, relationships, and exponential aging
- **Story Management**: Natural language stories converted to PRBs by @PM and architect collaboration

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.