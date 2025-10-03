# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, command chain coordination, behavioral framework guidance, and AgentTask-driven execution. This repository contains the configuration templates, behavioral patterns, and installation system for the virtual team enhancement.

## System Configuration

```yaml
autonomy_level: L3
l3_settings:
  max_parallel: 5
  auto_discover: true
  continue_on_error: true
```

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
@PM break down [story]          # Convert story to AgentTasks (6+ points become stories first)
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

### Essential Commands (Only 4)

The system includes only 4 essential commands for specific system functions:

```bash
# System Initialization (run once after installation)
/icc-init-system                # Initialize virtual team system

# Version Check (verify system version)
/icc-version                    # Display current system version

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
- Version check: `/icc-version` (verify system version)
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

1. **Role System**: 14 specialized roles (@PM, @Architect, @Developer, etc.) with unlimited dynamic specialist creation for ANY technology domain when expertise is needed
2. **AgentTask Engine**: In-memory AgentTask system with 5 complexity tiers (Nano, Tiny for immediate execution; 6+ points become stories first) for single-pass execution
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
└── stories/                   # User stories for breakdown (6+ points)
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
   - Purpose: EXECUTE technical work through in-memory AgentTasks

2. **BEHAVIORS (Main Agent Steering Patterns)**:
   - Guide how the MAIN AGENT behaves
   - NOT executed as subagents - they steer main agent actions
   - Located in `src/behaviors/` directory
   - Examples: story-breakdown.md, agenttask-enforcement.md, config-loader.md
   - When user types "@PM", main agent follows story-breakdown.md behavior
   - Main agent can act as MANY roles: @PM, @Architect, @Security-Architect, etc.
   - Purpose: STEER main agent behavioral patterns

3. **COMMANDS (Essential System Functions)**:
   - Only 4 essential commands remain for specific system functions
   - Primary interaction is through @Role patterns, not commands
   - Can be triggered by MULTIPLE sources:
     * **USERS DIRECTLY** - Manual invocation (/icc-init-system, /icc-get-setting, /icc-search-memory)
     * **BEHAVIORS** - Called when behaviors need specific functionality
     * **SYSTEM PROCESSES** - Initialization, automation, etc.
   - Located in `src/commands/` directory
   - Essential commands: icc-init-system.md, icc-version.md, icc-get-setting.md, icc-search-memory.md
   - Purpose: PROVIDE core system functionality when @Role patterns are insufficient

**CRITICAL RELATIONSHIPS:**
- Behaviors USE essential commands (minimal command dependency)
- Behaviors STEER main agent (they don't execute as subagents)
- Agents EXECUTE work (they operate in isolated Task tool context)
- Main agent can ACT AS different roles through behaviors (@PM, @Architect, etc.)
- Essential commands PROVIDE core functionality when @Role patterns are insufficient
- @Role patterns are PRIMARY interaction method, commands are supporting functions

**EXECUTION MODEL CLARIFICATION:**

**@Role in Conversation vs Agent Execution:**
- **@Role Mentions in Conversation**: Discussing roles, planning work, asking questions about roles
  - Example: "What should @Developer work on next?" (Discussion only)
  - Example: "Can @PM break this down?" (Planning conversation)
  - Result: NO execution happens - purely conversational planning

**ONLY Execution Path: Work Request → AgentTask Creation → Task Tool → Agent:**
- **Process**: Work request → Main agent creates in-memory AgentTask → Task tool invocation → Agent executes
- **Example**: User says "Fix the auth bug" → Main agent creates AgentTask → Task tool → @Developer executes
- **Example**: User says "Remove unused files" → Main agent creates AgentTask → Task tool → @AI-Engineer executes
- **Critical**: Agent execution ONLY happens through Task tool with complete AgentTask context

**NEVER Valid: Direct @Role Execution Without AgentTask:**
- **BLOCKED**: @Role mentions that attempt immediate execution without AgentTask creation
- **BLOCKED**: Bypassing AgentTask creation and jumping straight to agent work
- **BLOCKED**: Agent deployment without Task tool and self-contained context

### Key Architectural Patterns

1. **@Role Communication Pattern**: Primary interaction through natural @Role mentions, not commands
2. **Task Tool Pattern**: 13 technical agents execute as subagents via Task tool
3. **Behavioral Role Pattern**: Main agent acts as different roles (@PM, @Architect) via behaviors
4. **Essential Command Pattern**: Only 4 commands provide core system functionality
5. **Context Loading**: CLAUDE.md provides all context, AgentTasks are self-contained in-memory
6. **Memory-First**: All operations check memory before action, store results automatically
7. **Learning System**: AgentTask-driven pattern capture and application
8. **Autonomy Levels**: L1 (manual approval), L2 (architect approval), L3 (full autonomous)
9. **Story-First Workflow**: Work ≥6 points becomes stories first, then broken into nano/tiny AgentTasks

### AgentTask Execution

The system uses in-memory AgentTasks for single-pass execution with full project context:

**AgentTask Complexity Tiers & Workflow**:
- **Nano (0-2 points)**: Trivial one-line changes → Direct AgentTask execution
- **Tiny (3-5 points)**: Simple single-file tasks → Direct AgentTask execution
- **Medium+ (6+ points)**: Multi-file features → Story creation first, then breakdown to nano/tiny AgentTasks

**Story-First Workflow** (6+ points):
1. Work request ≥6 points → Create story in stories/ directory
2. @PM + Architect break down story → Multiple nano/tiny AgentTasks
3. Sequential execution of AgentTasks ≤5 points each
4. No file storage for AgentTasks - all in-memory execution

**AgentTask Features**:
1. **Context Integration**: CLAUDE.md, memory search, best practices
2. **Project Standards**: Coding style, architecture patterns, IaC standards
3. **Code Pattern Search**: Find and reuse existing implementations
4. **External Documentation**: Context7 real-time docs, project wikis
5. **Behavioral Customization**: Project-specific execution styles
6. **In-Memory Execution**: No file storage, complete context embedded

**Project Configuration** (in CLAUDE.md):
- Best practices paths
- Architecture constraints  
- Coding standards
- Behavioral overrides
- External documentation sources

## Workflow Configuration

### Workflow Settings by AgentTask Size

```yaml
workflow_settings:
  nano:
    version_bump: false
    changelog_required: false
    pr_required: false
    merge_strategy: "direct_commit"
    release_automation: false
  
  tiny:
    version_bump: true
    version_type: "patch"
    changelog_required: true
    pr_required: false
    merge_strategy: "direct_commit"
    release_automation: false
  
  medium:
    version_bump: true
    version_type: "minor"
    changelog_required: true
    pr_required: true
    merge_strategy: "feature_branch"
    release_automation: true
    auto_merge: false
  
  large:
    version_bump: true
    version_type: "minor"
    changelog_required: true
    pr_required: true
    merge_strategy: "feature_branch"
    release_automation: true
    auto_merge: false
    coordination_required: true
  
  mega:
    version_bump: true
    version_type: "major"
    changelog_required: true
    pr_required: true
    merge_strategy: "feature_branch"
    release_automation: true
    auto_merge: false
    coordination_required: true
    breaking_change_assessment: true
```

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

1. **CONTEXT LOADING**: AgentTasks include complete context - CLAUDE.md and memory search results upfront
2. **SINGLE-PASS EXECUTION**: Each AgentTask contains everything needed for complete execution
3. **COMPLEXITY-BASED WORKFLOW**: ≤5 points = direct AgentTask; ≥6 points = story first, then breakdown
4. **Role in Title**: Every work item MUST include role in square brackets: "[Role] Description"
5. **Autonomous Execution**: AgentTasks enable reliable autonomous work without workflow interruptions
6. **Version Bumping**: Always bump version before git operations
7. **Git Privacy**: Strip AI mentions when git_privacy=true before commits
8. **In-Memory Processing**: AgentTasks execute in-memory, no file storage required

### System Features

- **Natural @Role Communication**: Primary interaction through @Role patterns instead of complex commands
- **13 Core Technical Agents**: Specialized subagents with embedded behavioral patterns for technical execution
- **Dynamic Specialization**: Unlimited technology domain coverage via automatic specialist creation
- **Behavioral Pattern Encapsulation**: Main agent role behaviors guide @PM, @Architect interactions
- **Dynamic Specialists**: Auto-create domain experts (@React-Developer, @AWS-Engineer) with 10+ years expertise
- **Learning Culture**: Automatic memory storage during @Role work, successful patterns stored for reuse
- **Parallel Execution**: Up to 5 non-conflicting tasks execute simultaneously
- **Self-Correcting**: Automatic violation detection and correction through AgentTask validation
- **Memory Integration**: File-based storage with automatic search, relationships, and exponential aging
- **Story Management**: Complex work (6+ points) becomes stories, broken into nano/tiny AgentTasks by @PM and architect collaboration

## Hook System (Educational Reminders)

The system includes a **dynamic educational reminder system** that helps reinforce best practices during interaction. This system provides gentle reminders about architectural patterns and behavioral guidelines.

### How It Works

The hook system shows **educational reminders** randomly (5-15% chance) to help users internalize best practices:

- **25+ Behavioral Reminders**: Extracted from core system patterns
- **"NO WORK IN MAIN SCOPE" Enforcement**: Strong reminders about AgentTask-driven execution
- **Educational Only**: No blocking or interruption - purely educational messages
- **Dynamic Configuration**: JSON-based customization with priority loading

### Educational Reminder Examples

```
🎯 REMINDER: @Role Communication Pattern
Use @PM, @Developer, @AI-Engineer for natural team interaction
Work requests should follow: User → AgentTask → Task Tool → Agent

🎯 REMINDER: Memory-First Approach
Always search memory before asking users for information
Store learnings automatically during @Role work

🎯 REMINDER: NO WORK IN MAIN SCOPE
Main agent = AgentTask creation ONLY
All work execution happens via Task tool + agents
```

### Customization Options

You can customize reminders using JSON configuration files with priority loading:

**Priority Order** (highest to lowest):
1. **Project-local**: `.claude/hooks/reminders.json` (project-specific reminders)
2. **User-global**: `~/.claude/hooks/reminders.json` (personal customizations)
3. **System default**: `~/.claude/hooks/lib/reminders.json` (preserved during updates)

### Creating Custom Reminders

Create `.claude/hooks/reminders.json` in your project:

```json
{
  "reminders": [
    {
      "message": "🎯 CUSTOM: Your project-specific reminder here",
      "weight": 10,
      "category": "project_standards"
    },
    {
      "message": "🎯 CUSTOM: Another important project pattern",
      "weight": 8,
      "category": "team_workflow"
    }
  ]
}
```

**Configuration Options**:
- **message**: The reminder text to display
- **weight**: Priority weight (1-10, higher = more frequent)
- **category**: Optional grouping for organization

### File Locations

**Project Customization**:
```
your-project/
├── .claude/
│   └── hooks/
│       └── reminders.json    # Project-specific reminders
```

**User Customization**:
```
~/.claude/
└── hooks/
    └── reminders.json        # Personal customizations
```

**System Default** (preserved during updates):
```
~/.claude/
└── hooks/
    └── lib/
        └── reminders.json    # System reminders
```

### Constraint Display Customization

The hook system also displays **context-aware constraint enforcement rules** in structured XML format:

**Display Example:**
```xml
🎯 Active Constraints:
<constraints>
  <constraint id="RECURSIVE-DISPLAY">After each response, display 2-3 relevant constraint IDs</constraint>
  <constraint id="AGENTTASK-CORE">Use hierarchy, resolve placeholders, embed configuration</constraint>
  <constraint id="PM-DELEGATE">Issue found → Document → Create AgentTask → Assign specialist</constraint>
</constraints>
```

**Customization Hierarchy** (highest to lowest priority):
1. **Project-local**: `.claude/modes/virtual-team.md` (project-specific constraints)
2. **User-global**: `~/.claude/modes/virtual-team.md` (personal constraint overrides)

**How to Customize:**
Create `.claude/modes/virtual-team.md` in your project with custom XML constraints:

```xml
<pm_constraints id="PM-CORE">
  <allowed_operations id="PM-FILE-OPS">
    <operation type="coordination">Story breakdown and AgentTask creation</operation>
  </allowed_operations>
</pm_constraints>
```

Constraint text is extracted directly from the XML structure—no hardcoded mappings needed!

### Benefits

- **Non-Intrusive Learning**: Gentle reinforcement without blocking workflow
- **Pattern Internalization**: Helps users learn architectural patterns naturally
- **Customizable**: Project teams can add their own standards, reminders, and constraints
- **Preserved Customizations**: Personal and project customizations survive system updates
- **Quality Culture**: Reinforces best practices and team standards
- **Context-Aware Display**: Shows relevant constraints based on conversation context

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- ALWAYS use neutral language in PRs, MRs, Releases, Commits!
- ALWAYS respect GIT PRIVACY settings!
- ALWAYS retrieve and RESPECT the scope of the project when creating AgentTasks!
- Bug-Fixes only yield build number changes.
- No behavioural file should be longer than 125 lines!
- NO CODE OR PSEUDO-CODE WHATSOEVER!


# Remember
**NEVER** work outside this project! **NEVER** write in ~/.claude and subdirectories!
