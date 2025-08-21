# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, command chain coordination, behavioral framework guidance, and PRB-driven execution. This repository contains the configuration templates, behavioral patterns, and installation system for the virtual team enhancement.

## System Usage

### Installation and Setup
```bash
make install           # Install locally to ~/.claude/
make test             # Run installation tests
make uninstall        # Remove installation (preserves user data)
make uninstall FORCE=true  # Complete removal including user data
```

### Primary Interaction Pattern: @Role Communication

The system is designed for natural @Role communication rather than command-based interaction:

```bash
# Virtual Team Interaction (Primary Usage Pattern)
@PM Build me a [project]        # Start any project with PM coordination
@PM break down [story]          # Convert story to PRBs  
@PM what story next?            # Select next story with architect
@PM status update               # Get project status and next actions

@Architect Design the API       # Request architecture design
@Architect review [component]   # Architecture review request
@Database-Architect design schema  # Specialized architecture

@Developer Implement auth       # Assign implementation task
@Developer fix [bug]           # Bug fix assignment
@AI-Engineer optimize behavior  # AI/behavioral improvements

@Security-Engineer Review       # Request security review
@QA-Engineer test [feature]     # Quality assurance request
@DevOps-Engineer deploy [env]   # Deployment operations
```

### Essential Commands (Only 3)

The system includes only 3 essential commands for specific system functions:

```bash
# System Initialization (run once after installation)
/icc-init-system                # Initialize virtual team system

# Configuration Access (when needed)
/icc-get-setting [key]          # Get specific configuration value

# Memory Exploration (when searching patterns)
/icc-search-memory [query]      # Search memory for patterns/learnings
```

**Note**: Memory storage happens automatically during @Role work - no commands needed!

### When to Use @Role Patterns vs Commands

**Use @Role Patterns for** (Primary Usage):
- All project work and coordination: `@PM break down story`
- Architecture and design decisions: `@Architect review system`
- Implementation tasks: `@Developer implement feature`
- Quality assurance: `@QA-Engineer test component`
- Any specialist work: `@Database-Engineer optimize queries`

**Use Essential Commands for** (System Functions Only):
- System initialization: `/icc-init-system` (once after installation)
- Configuration queries: `/icc-get-setting git_privacy` (when needed)
- Memory exploration: `/icc-search-memory authentication` (when exploring patterns)

### MCP Server Integration
```bash
make install MCP_CONFIG=./config/mcps.json  # Install with MCP servers
# Configure MCP servers with environment variables and validation
# Automatic backup and rollback on configuration errors
# JSON syntax validation and comprehensive error handling
```

## High-Level Architecture

### Virtual Team System
The system implements a **14-role virtual development team** that operates through natural @Role communication patterns:

1. **Role System**: 14 specialized roles (@PM, @Architect, @Developer, etc.) with unlimited dynamic specialist creation for <70% capability matches
2. **PRB Engine**: Product Requirement Blueprint system with 5 complexity tiers (Nano, Tiny, Medium, Large, Mega) for single-pass execution
3. **Memory System**: File-based memory storage (version-controlled in `memory/`) with automatic topic-based organization and pattern capture
4. **Configuration Hierarchy**: Embedded → Project → User → System defaults with dynamic loading
5. **Behavioral Enforcement**: Mandatory patterns with auto-correction and PRB validation

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

### FUNDAMENTAL SYSTEM CONCEPTS

**CRITICAL UNDERSTANDING - Three Distinct Component Types:**

1. **AGENTS (13 Technical Specialists)**:
   - Execute as SUBAGENTS via Task tool in isolated context
   - Have defined scope, tools, and YAML frontmatter
   - Located in `src/agents/` directory
   - Examples: ai-engineer, developer, architect, database-engineer
   - Purpose: EXECUTE technical work through PRBs

2. **BEHAVIORS (Main Agent Steering Patterns)**:
   - Guide how the MAIN AGENT behaves
   - NOT executed as subagents - they steer main agent actions
   - Located in `src/behaviors/` directory
   - Examples: story-breakdown.md, prb-enforcement.md, config-loader.md
   - When user types "@PM", main agent follows story-breakdown.md behavior
   - Main agent can act as MANY roles: @PM, @Architect, @Security-Architect, etc.
   - Purpose: STEER main agent behavioral patterns

3. **COMMANDS (Essential System Functions)**:
   - Only 3 essential commands remain for specific system functions
   - Primary interaction is through @Role patterns, not commands
   - Can be triggered by MULTIPLE sources:
     * **USERS DIRECTLY** - Manual invocation (/icc-init-system, /icc-get-setting, /icc-search-memory)
     * **BEHAVIORS** - Called when behaviors need specific functionality
     * **SYSTEM PROCESSES** - Initialization, automation, etc.
   - Located in `src/commands/` directory
   - Essential commands: icc-get-setting.md, icc-init-system.md, icc-search-memory.md
   - Purpose: PROVIDE core system functionality when @Role patterns are insufficient

**CRITICAL RELATIONSHIPS:**
- Behaviors USE essential commands (minimal command dependency)
- Behaviors STEER main agent (they don't execute as subagents)
- Agents EXECUTE work (they operate in isolated Task tool context)
- Main agent can ACT AS different roles through behaviors (@PM, @Architect, etc.)
- Essential commands PROVIDE core functionality when @Role patterns are insufficient
- @Role patterns are PRIMARY interaction method, commands are supporting functions

### Key Architectural Patterns

1. **@Role Communication Pattern**: Primary interaction through natural @Role mentions, not commands
2. **Task Tool Pattern**: 13 technical agents execute as subagents via Task tool
3. **Behavioral Role Pattern**: Main agent acts as different roles (@PM, @Architect) via behaviors
4. **Essential Command Pattern**: Only 3 commands provide core system functionality
5. **Context Loading**: CLAUDE.md provides all context, PRBs are self-contained
6. **Memory-First**: All operations check memory before action, store results automatically
7. **Learning System**: PRB-driven pattern capture and application
8. **Autonomy Levels**: L1 (manual approval), L2 (architect approval), L3 (full autonomous)

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

- **Natural @Role Communication**: Primary interaction through @Role patterns instead of complex commands
- **13 Core Technical Agents**: Specialized subagents with embedded behavioral patterns for technical execution
- **Dynamic Specialization**: Unlimited technology domain coverage via automatic specialist creation
- **Behavioral Pattern Encapsulation**: Main agent role behaviors guide @PM, @Architect interactions
- **Dynamic Specialists**: Auto-create domain experts (@React-Developer, @AWS-Engineer) with 10+ years expertise
- **Learning Culture**: Automatic memory storage during @Role work, successful patterns stored for reuse
- **Parallel Execution**: Up to 5 non-conflicting tasks execute simultaneously
- **Self-Correcting**: Automatic violation detection and correction through PRB validation
- **Memory Integration**: File-based storage with automatic search, relationships, and exponential aging
- **Story Management**: Natural language stories converted to PRBs by @PM and architect collaboration

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.