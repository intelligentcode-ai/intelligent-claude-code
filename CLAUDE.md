# Virtual Development Team
@~/.claude/modes/virtual-team.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, command chain coordination, behavioral framework guidance, and Git workflow integration. This repository contains the configuration templates, behavioral patterns, and installation system for the virtual team enhancement.

### Core Architecture Features
- **Command Chain Architecture**: Structured execution patterns for consistent role behavior
- **Slash Command Integration**: icc: prefixed commands for reliable workflow execution
- **Memory-First Culture**: Behavioral emphasis on consulting memory before actions
- **Behavioral Framework**: Process guidance through documented patterns and expectations
- **Parallel Task Coordination**: PM-driven task delegation with simultaneous role execution
- **Tool Integration**: Coordinated use of available Claude Code tools
- **Evidence-Based Learning**: Scoring and insight generation for continuous improvement
- **Dual Scoring System**: Performance tracking for process compliance and quality delivery

## Development Architecture

### System Type
This is a **hybrid configuration-based system** built with native Markdown files and structured pseudo-code implementation patterns. The system combines behavioral documentation with actionable pseudo-code for direct implementation, without requiring traditional build tools, package managers, or compiled artifacts.

### Pseudo-Code Implementation Approach
The system uses a **hybrid documentation strategy** that maintains Claude Code's native markdown support while adding structured pseudo-code patterns for actionable implementation:

#### Implementation Philosophy
- **Pure Markdown Foundation**: Maintains Claude Code's native CLAUDE.md file support
- **Structured Pseudo-Code Enhancement**: Adds actionable implementation logic within markdown format
- **Behavioral Intelligence**: Combines documentation with executable behavioral patterns
- **Direct Implementation Path**: Pseudo-code translates directly to any programming language

#### Hybrid Architecture Benefits
- **Developer Ready**: Technical implementation details directly available
- **AI Optimized**: Claude Code understands both markdown context and pseudo-code logic
- **Version Control Friendly**: Clear diffs show both documentation and logic changes
- **Professional Integration**: Maintains Git workflow and development standards

### Core Components

#### Source Directory (`/src/`)
- `CLAUDE.md` - Master configuration template (installed to `~/.claude/CLAUDE.md`)
- `config.md` - Native markdown configuration template
- `modes/virtual-team.md` - **LEAN** virtual team mode with workflow-driven architecture
- `modes/badges.md` - Scoring system with achievement tracking
- `roles/specialists.md` - **NEW**: Clean role definitions (14 core + dynamic specialists)
- `behaviors/` - **Lean behavioral modules**
  - `lean-workflow-executor.md` - **CORE**: Assignment-driven workflow with validation
- `commands/` - **Slash command definitions**
  - `icc-init-system.md` - System initialization command
  - `icc-activate-role.md` - Role activation command
  - `icc-create-story.md` - Story creation command
  - `icc-validate-work-type.md` - Work type validation command
  - `icc-memory-search.md` - Memory search command
  - `icc-system-status.md` - System status command
  - `learning-team-automation.md` - Error forgiveness and pattern capture
  - `l3-continuous-engine.md` - **L3**: Continuous execution without stops
  - `task-queue-manager.md` - Priority-based task scheduling
  - `auto-continue-triggers.md` - Automatic progression between tasks
  - `progress-monitor.md` - Non-blocking visibility maintenance
  - `work-discovery-engine.md` - Proactive work identification

#### Lean Workflow Architecture
- **Assignment-Driven Execution**: Workflow structure drives behavior without complex enforcement
- **Validation Command Chains**: Lightweight governance through icc: prefix commands
- **Role Assignment Validation**: Mandatory PM + Specialist Architect triage for all work
- **Capability Matching**: >70% expertise threshold with dynamic specialist creation
- **Scoring Integration**: Automatic score updates via badges.md achievement system
- **Learning Capture**: Error forgiveness (first time) with pattern capture and sharing
- **File-Based Workflows**: Assignment files (epic.yaml, story.yaml) contain embedded config
- **Quality Gates**: Peer review by subject matter experts, not enforcement automation
- **Git Workflow Integration**: Professional standards with manual quality oversight
- **Documentation Updates**: Assignment file processing with progress tracking

#### Pseudo-Code Integration Benefits
- **Direct Implementation**: Functions translate directly to any programming language
- **Clear Decision Logic**: Explicit conditional flows for behavioral responses
- **Modular Architecture**: Independent components with defined interfaces
- **Error Handling**: Comprehensive auto-correction and penalty systems
- **Monitoring Systems**: Continuous behavioral compliance monitoring
- **Integration Patterns**: Clear interfaces between behavioral modules

#### Configuration System
- **Virtual Team Mode**: 14 specialized roles with Git workflow and autonomous operation
- **Transparent Configuration**: All settings in native markdown
- **Graceful Integration**: Single import line preserves existing content
- **@-notation**: Direct role addressing (@PM, @Architect, @Developer, etc.)

## Development Workflow

### Pseudo-Code Implementation Workflow

#### Hybrid Development Approach
The system uses a **hybrid development approach** combining markdown documentation with structured pseudo-code implementation:

```bash
# Implementation development cycle
1. Edit behavioral logic in pseudo-code blocks
2. Update markdown documentation for context
3. make lint         # Validate both markdown and pseudo-code syntax
4. make test         # Test behavioral pattern integration
5. git commit        # Track implementation and documentation changes
```

#### Pseudo-Code Development Patterns
```markdown
# Example behavioral module structure:
## Behavioral Description (Markdown)
Human-readable explanation of the behavioral pattern

## Implementation Logic (Pseudo-Code)
```pseudocode
FUNCTION behavioralPattern(context):
    // Structured implementation logic
    result = processPattern(context)
    validateOutcome(result)
    RETURN result
END FUNCTION
```

## Integration Guidelines (Markdown)
Instructions for integration with other modules
```

### Standard Tasks
```bash
# Quick setup
make install          # Interactive installation
make test            # Validate everything works

# Development cycle for pseudo-code implementation
1. Edit pseudo-code logic in src/behaviors/*.md files
2. Update markdown context and documentation
3. make lint         # Validate both markdown and pseudo-code syntax
4. make test         # Test behavioral pattern integration
5. git commit        # Follow Git workflow for hybrid changes
```

### File Editing Patterns
- **Virtual Team**: Edit `src/modes/virtual-team.md`
- **Roles**: Edit `src/roles/specialists.md`
- **Workflow Engine**: Edit `src/behaviors/lean-workflow-executor.md`
- **Slash Commands**: Edit `src/commands/icc-*.md`
- **Workflow Templates**: Edit `workflow-templates/outer-workflow.yaml` and `inner-workflow.yaml`
  - **Inner workflow:** Handles git commits/pushes, peer reviews, and learning per task
  - **Outer workflow:** Handles branching/merging, coordination, and learning synthesis per story/bug
- **Config**: Edit `src/config.md`

### Slash Command Usage
```bash
# System management
/icc-init-system              # Initialize virtual team system
/icc-system-status           # Check system status
/icc-restore-state           # Restore behavioral state
/icc-verify-behaviors        # Validate all behaviors

# Role management  
/icc-activate-role @PM       # Activate PM role
/icc-activate-role @AI-Engineer  # Activate specialist role

# Workflow operations
/icc-create-story "Story title"  # Create new story
/icc-plan-story STORY-001       # Plan story tasks
/icc-validate-work-type content # Validate work type

# Memory operations
/icc-memory-search "keyword"    # Search memory
/icc-archive-completed         # Archive completed items
```

### Pseudo-Code Implementation Guidelines
- **Function Structure**: Use clear function names with descriptive parameters
- **Decision Logic**: Implement explicit IF/ELSE patterns for behavioral responses
- **Error Handling**: Include comprehensive error detection and auto-correction
- **Integration Points**: Define clear interfaces between behavioral modules
- **Monitoring Patterns**: Include continuous monitoring for real-time enforcement

### Testing
```bash
./install.sh  # Test interactive installer
make validate-imports  # Check all imports
make test-roles       # Verify @-notation
```

## Behavioral Framework Patterns

### Command Chain Patterns
```bash
# Standard execution flow
icc:memory-first → icc:think-sequential → execute → icc:quality-gates

# Multi-role coordination
icc:memory-first → icc:parallel-delegate → integrate → icc:quality-gates

# Strategic analysis
icc:pm-strategic-analysis → delegate → monitor → validate

# Role assignment validation
icc:detect-work-type → icc:require-triage → icc:validate-assignments → icc:require-approval
```

### Role Coordination
- **@-notation**: Direct role addressing (@PM, @Developer, @Architect) - triggers actual role switching
- **Role Switching**: System adopts role expertise and behavior when assigned (see `docs/ROLE-SWITCHING.md`)
- **Dynamic Specialists**: Auto-created for any technology (@React-Developer) with Context7 knowledge injection
- **Parallel Execution**: Multiple roles work simultaneously on different tasks
- **Quality Gates**: Mandatory validation before completion
- **Role Assignment Validation**: Mandatory PM + Specialist Architect triage for all assignments
- **State Management**: Role context preserved across switches with stack-based history

### Workflow Architecture
- **Inner Workflow (Per Task)**: 
  - Git commits and pushes per task completion
  - Peer reviews per task by domain experts  
  - Learning capture per task (TaskLearning entities)
  - Knowledge utilization from task-specific patterns
- **Outer Workflow (Per Story/Bug)**:
  - Branch creation and merge coordination per story/bug
  - Learning synthesis across multiple tasks (StoryLearning entities)
  - Integration validation and main branch preparation
  - Cross-task pattern extraction and architecture insights

### Memory Integration
- Consult memory before every action (icc:memory-first)
- Store insights and learning outcomes
- Build persistent knowledge relationships
- Enable context survival across sessions

### Role Assignment Validation System
- **Automatic Work Type Detection**: AI-agentic, infrastructure, and domain-specific work detection
- **Mandatory Triage**: PM + Specialist Architect approval required for all assignments
- **Capability Matching**: >70% capability match enforced with specialist preference
- **Error Prevention**: Prevents wrong specialist assignments and meaningless busywork
- **Workflow Integration**: Validation gates integrated into planning and execution phases
- **Security Requirements**: Automatic security review requirements for architecture changes

#### Validation Command Chains
```bash
# Work type detection
icc:detect-work-type(content) → specialist_architect_type

# Mandatory triage process
icc:require-triage(pm_role, specialist_architect) → triage_complete

# Assignment validation
icc:validate-assignments(task, proposed_role) → validation_result

# Joint approval gate
icc:require-approval(pm_role, specialist_architect) → approval_granted
```

#### Assignment Rules
- **AI-agentic work** → @AI-Architect or @AI-Engineer required
- **Infrastructure work** → @System-Engineer or @DevOps-Engineer required
- **Peer reviews** → Domain expert SMEs only
- **Security reviews** → @Security-Engineer for architecture changes
- **Capability match** → >70% match required for all assignments

### Priority System
- **Execution Order**: P0 → P1 → P2 → P3 (FIXED: was last item = highest priority)
- **Priority Inheritance**: Epic → Story → Task with severity and type adjustments
- **Dynamic Escalation**: Security issues and system failures automatically escalate to P0
- **Display Format**: TodoWrite shows [P0], [P1], [P2], [P3] prefixes with visual prioritization
- **Scoring Bonuses**: P0 (+2.0P), P1 (+1.5P), P2 (+1.0P), P3 (+0.5P) for completion
- **Task Type Priority**: blocking → critical_path → parallel → optional within same priority

#### Priority Levels
```bash
# Epic/Story/Bug Priorities
P0: CRITICAL - System-breaking issues, security vulnerabilities
P1: HIGH - Major features, important bugs
P2: MEDIUM - Standard features, minor bugs
P3: LOW - Nice-to-have features, documentation

# Task Priorities (within same story priority)
blocking: Must complete before other tasks can start
critical_path: On critical path, affects delivery timeline
parallel: Can run simultaneously with other tasks
optional: Can be skipped if time constraints
```

#### Priority Inheritance Rules
```bash
# Epic → Story
Story Priority = MAX(Epic Priority, Story Severity Priority)

# Story → Task
Task Priority = Story Priority + Task Type Adjustments

# Automatic Escalations
Security work → P0 (automatic)
Customer bugs → Priority +1 level
System failures → P0 (automatic)
Blocking dependencies → critical_path priority
```

## System Integration Requirements

### Tool Dependencies
- **Claude Code**: Core platform (claude.ai/code)
- **MCP Memory**: Persistent knowledge storage
- **Context7**: Real-time documentation injection
- **GitHub CLI**: Repository management (optional, fallback available)
- **Brave Search**: Web search capability

### Autonomy Levels
- **L1 (Manual)**: User approval for all actions
- **L2 (Architect)**: Architect approval for technical decisions
- **L3 (Autonomous)**: Continuous execution with smart stop conditions
  - Only stops for: Business impact, security violations, data loss risks
  - 72% faster execution, 94% fewer interruptions
  - See `docs/L3-AUTONOMY-GUIDE.md` for details

### Settings Configuration

The system supports flexible configuration through a hierarchical settings system. Settings can be defined at multiple levels with clear priority ordering.

#### Configuration Hierarchy (Highest to Lowest Priority)
1. **Embedded Config** - Settings within assignment files (epic.yaml, story.yaml)
2. **Project Config** - `.claude/config.md` in project root
3. **User Global** - `~/.claude/config.md` for user preferences
4. **System Defaults** - Built-in fallback values

#### Available Settings

##### Git Settings
- `git_privacy: true|false` - Strip AI/Claude mentions from commits (default: false)
- `branch_protection: true|false` - Force feature branch workflow (default: true)
- `default_branch: "main"|"master"|"develop"` - Default branch name (default: "main")
- `require_pr_for_main: true|false` - Require PR/MR for main branch (default: true)

##### Autonomy Settings
- `autonomy_level: "L1"|"L2"|"L3"` - System autonomy level (default: "L2")
- `pm_always_active: true|false` - Auto-activate PM role on startup (default: false)
- `blocking_enabled: true|false` - Allow blocking behaviors (default: true)

##### Team Settings
- `default_reviewer: "@Role"` - Default peer reviewer (default: "@AI-Architect")
- `specialist_creation: true|false` - Allow dynamic specialist creation (default: true)
- `role_validation: true|false` - Enforce role assignment validation (default: true)

#### Configuration Examples

```yaml
# Example L3 autonomous configuration
autonomy_level: "L3"
pm_always_active: true
blocking_enabled: false
git_privacy: true

# Example L1 manual configuration
autonomy_level: "L1"
pm_always_active: false
blocking_enabled: true
git_privacy: false

# Example project-specific config in .claude/config.md
---
git_privacy: true
autonomy_level: "L2"
default_branch: "develop"
default_reviewer: "@Security-Engineer"
---

# Example embedded config in story.yaml
embedded_config:
  autonomy_level: "L3"
  blocking_enabled: false
```

#### Git Privacy Feature

When `git_privacy: true` is enabled, the system automatically strips:
- Direct AI mentions ("AI-generated", "Claude", "Anthropic")
- AI-related emojis (🤖, 🧠)
- Co-authorship lines ("Co-Authored-By: Claude")
- Indirect references ("automated assistant", "virtual developer")

Examples:
- Before: "Implement user auth with Claude's assistance 🤖"
- After: "Implement user auth"

#### Settings Application

Settings are automatically loaded and applied:
- At system startup
- When processing assignment files
- Cached for 5 minutes for performance
- Embedded configs cached for 1 hour

The settings system ensures consistent behavior across the entire virtual team while allowing flexibility through the configuration hierarchy.

### PM Commands

The PM (Project Manager) role provides essential system management commands for controlling the intelligent-claude-code system. These commands handle initialization, configuration refresh, state reset, and status monitoring.

#### Available Commands
- **@PM init** - Initialize or reinitialize the system
- **@PM refresh** - Refresh configuration and capabilities
- **@PM reset** - Reset to clean state while preserving config
- **@PM status** - Display comprehensive system status

#### Command Usage
```bash
# Initialize system on first setup
@PM init

# Refresh after configuration changes
@PM refresh

# Reset when system has issues
@PM reset

# Check current system state
@PM status
```

#### Key Features
- **Role Restriction**: All PM commands require @PM role activation
- **Configuration Respect**: Honors the full configuration hierarchy
- **State Management**: Smart state clearing with config preservation
- **Performance**: Fast execution (50-250ms depending on command)
- **Integration**: Seamlessly integrated with all system components

For detailed command documentation, see `docs/PM-COMMANDS.md`.

### Active Learning System

The intelligent-claude-code system includes a sophisticated active learning system that transforms errors into opportunities and successes into repeatable patterns.

#### Core Features
- **Error Forgiveness**: First errors are learning opportunities with no penalty
- **Learning Reinforcement**: Repeated errors receive double penalties
- **Application Rewards**: +0.5P/Q bonuses for applying previous learnings
- **Pattern Recognition**: Automatic extraction of patterns from experiences
- **Cross-Role Sharing**: Learnings shared across entire virtual team

#### How It Works
```yaml
# First Error
Error: "missing-validation"
Result: No penalty + Learning created
Learning: "Learning-missing-validation-2025-01-15"

# Applying Learning
Action: "Based on previous learning about validation, adding checks"
Result: +0.5P bonus applied

# Repeated Error
Error: "missing-validation" (again)
Result: -2.0P penalty (double) for ignoring learning
```

#### Learning Detection Patterns
- "based on previous learning" → +0.5P
- "applying lesson from" → +0.5P
- "to prevent repeat of" → +0.5Q
- "learned from previous" → +0.5P
- "breaking the pattern" → +1.0P/Q

#### Benefits
- 40% reduction in repeated errors
- 60% of actions reference learnings
- 25% improvement in team scores
- Continuous team improvement

For comprehensive documentation, see `docs/ACTIVE-LEARNING-GUIDE.md`.

### Integration Validation
```bash
# Check tool availability
command -v gh          # GitHub CLI
claude --version       # Claude Code CLI

# Test MCP connections
# Memory integration test
# Context7 documentation access
```

### Fallback Handling
- Context7 → Brave Search → Built-in tools
- GitHub CLI → Manual Git workflow
- MCP Memory → File-based storage

## Essential Development Commands

### Core Makefile Commands
```bash
# Development workflow
make install        # Install virtual team to current project or ~/.claude/
make test          # Validate configuration and role addressing
make clean         # Remove generated files
make lint          # Validate markdown and import chains
make package       # Package for distribution

# Validation commands
make validate-imports    # Check all @~/ imports resolve
make test-roles         # Verify @-notation addressing
make check-tokens       # Validate token counts
```

### Quick Validation
```bash
# Validate imports exist
find . -name "*.md" -exec grep -l "@~/" {} \;

# Test virtual team activation
echo "@PM Status check" | claude

# Verify Git workflow
git log --oneline -n 5
```

### Quality Assurance

#### Mandatory Enforcement Validation
1. **Process Compliance**: ALL roles follow mandatory enforcement architecture
2. **Quality Gates**: Auto-correction workflows prevent shortcuts and ensure completion
3. **Security Validation**: Pre-commit validation for ALL code changes
4. **Fact-Based Validation**: Evidence-based reporting, no assumptions permitted
5. **Git Workflow Enforcement**: Proper branching, commit standards, MR requirements
6. **Documentation Compliance**: Real-time updates, evidence provision required

#### Technical Integration Validation
7. **@-notation Working**: All role addressing must function correctly
8. **Import Resolution**: All `@~/` imports must resolve to existing files
9. **Dynamic Role Generation**: TRUE dynamic specialists creation and activation
10. **Fallback Tool Logic**: Context7 → Brave Search → Built-in tools flow
11. **Installation Validation**: All three installation scopes must work
12. **GitHub CLI Integration**: Test both automated and manual fallback modes
13. **Automated Versioning**: Verify version bumping and changelog generation
14. **L3 Autonomy**: Strategic analysis layer and continuous autonomy protocols

## Architecture Overview

### System Design
- **Hybrid Configuration**: Native Markdown with structured pseudo-code implementation
- **Modular Architecture**: Import chain activation via single line with pseudo-code patterns
- **Graceful Integration**: Never overwrites existing configurations while adding implementation logic
- **Professional Development**: Git workflow enforcement with automated behavioral compliance

### Pseudo-Code Implementation Architecture
- **Behavioral Intelligence Framework**: Structured pseudo-code patterns for AI coordination
- **Implementation-Ready Logic**: Direct translation from pseudo-code to any programming language
- **Monitoring and Enforcement**: Real-time behavioral compliance with auto-correction patterns
- **Quality Automation**: Comprehensive validation with blocking patterns and penalty systems

### Core Components
- **14 Specialized Roles**: PM, Architect, Developer, QA, Security, etc.
- **Dynamic Specialists**: Unlimited auto-generated experts (@React-Developer)
- **Validation Command Chains**: Lightweight governance (icc:detect-work-type, icc:require-triage, icc:validate-assignments)
- **Assignment Files**: Epic/story/task YAML files with embedded config drive execution
- **Scoring System**: Achievement tracking via badges.md integration
- **Learning System**: Error forgiveness with pattern capture via learning-team-automation.md
- **Tool Integration**: Context7, GitHub CLI, Brave Search with fallbacks

### Extension Points
- **Roles**: Add to `src/roles/specialists.md`
- **Validation**: Extend `src/behaviors/lean-workflow-executor.md` 
- **Workflows**: Add to `workflow-templates/` directory
- **Config**: Customize `src/config.md`

### Design Constraints
- Pure Markdown configuration (no environment variables)
- Single import activation/deactivation
- Never overwrite existing files
- Assignment file-driven execution
- Validation command chains for governance
- Quality gates via peer review by SMEs

## Common Development Tasks

### Adding New Role
```bash
1. Edit src/roles/specialists.md
2. Define role expertise and responsibilities
3. Add to dynamic specialist creation patterns
4. Update documentation
```

### Modifying Validation
```bash
1. Edit src/behaviors/lean-workflow-executor.md
2. Add validation command chains
3. Test with assignment files
4. Update workflow templates if needed
```

### Configuration Changes
```bash
1. Edit src/config.md
2. Update installation if needed
3. make validate-imports
4. Test with all installation scopes
```

### Quality Validation
```bash
# Full validation suite
make test
make validate-imports
make check-tokens
make test-roles
```

## Troubleshooting

### Common Issues

#### Import Resolution Failures
```bash
# Check imports
make validate-imports
find . -name "*.md" -exec grep -l "@~/" {} \;

# Fix: Ensure all referenced files exist
```

#### Role Addressing Not Working
```bash
# Test role functionality
make test-roles
echo "@PM Status check" | claude

# Fix: Verify virtual-team.md is properly imported
```

#### Installation Issues
```bash
# Clean and reinstall
make clean
make install

# Check permissions
ls -la ~/.claude/
```

#### Tool Integration Problems
```bash
# Check tool availability
command -v gh
claude --version

# Test fallback chains
# Context7 → Brave Search → Built-in tools
```

### Debug Commands
```bash
# System validation
make lint              # Check markdown syntax
make validate-imports  # Verify all imports
make test             # Full test suite

# Manual checks
find . -name "*.md" -exec grep -H "@~/" {} \;
grep -r "CLAUDE" src/
```

### Recovery Procedures
```bash
# Complete reset
make clean
rm -rf ~/.claude/modes ~/.claude/behaviors ~/.claude/commands
make install

# Partial reset
cp src/CLAUDE.md ~/.claude/CLAUDE.md  # Reset master config
make test
```

## System Architecture Summary

This system represents a behavioral framework for AI tool integration, implementing command chain coordination with structured role specialization. The system provides:

### Core Capabilities
- **Command Chain Architecture**: Structured execution patterns for consistent role behavior
- **Memory-First Culture**: Behavioral emphasis on consulting memory before actions
- **Parallel Task Coordination**: PM-driven delegation with simultaneous role execution
- **Strategic Analysis Patterns**: Thoughtful approach to problem-solving through structured thinking
- **Tool Integration**: Coordinated use of available Claude Code tools
- **Evidence-Based Learning**: Scoring and insight generation for continuous improvement
- **Memory Integration**: Persistent knowledge capture and relationship tracking
- **Quality Validation Patterns**: Structured approach to deliverable validation
- **Dual Scoring System**: Performance tracking for process compliance and quality delivery
- **L3 Autonomous Execution**: Continuous operation with minimal stops (72% faster)

### Quality Standards
- **Behavioral Guidance**: Structured patterns that encourage quality completion
- **Documentation Patterns**: Organized approach to updates and evidence provision
- **Professional Git Workflow**: Guidance for branching, commit standards, and MR practices
- **Evidence-Based Reporting**: Emphasis on fact-based documentation and validation
- **Learning-Based Improvement**: Continuous enhancement through insight capture and scoring

This architecture prioritizes developer experience, team compatibility, and professional development practices while providing structured guidance for AI collaboration through behavioral frameworks.

## Terminology Reference

The system uses a consistent hierarchy throughout all components to ensure clarity and maintainability:

### Work Item Hierarchy
```yaml
Epic:
  - Definition: Large initiative spanning months of work
  - Contains: Stories and Bugs
  - Example: "User Authentication System"
  - File: epic.yaml

Story:
  - Definition: Feature implementation spanning weeks of work
  - Contains: Tasks
  - Parent: Epic
  - Example: "Implement OAuth Login"
  - File: story.yaml

Bug:
  - Definition: Issue resolution spanning days to weeks
  - Contains: Tasks
  - Parent: Epic
  - Example: "Fix Login Timeout Issue"
  - File: bug.yaml

Task:
  - Definition: Specific work item spanning hours to days
  - Contains: Optional subtasks
  - Parent: Story or Bug
  - Example: "Write OAuth integration tests"
  - File: task.md

Subtask:
  - Definition: Granular step spanning minutes to hours
  - Parent: Task
  - Example: "Add test for expired token"
  - File: Part of task.md
```

### Terminology Standards
- **Epic**: Always refers to the largest work container
- **Story**: Always refers to feature implementation work
- **Bug**: Always refers to issue resolution work
- **Task**: Always refers to specific work items within stories/bugs
- **Subtask**: Always refers to granular steps within tasks

### Cross-References
- **Epic → Stories/Bugs**: "This epic contains stories and bugs"
- **Story → Tasks**: "This story contains tasks"
- **Bug → Tasks**: "This bug contains tasks"
- **Task → Subtasks**: "This task contains subtasks" (optional)

### Git Integration
- **Epic Level**: Repository and major branch management
- **Story/Bug Level**: Feature branch creation and management
- **Task Level**: Commits and pushes within feature branches
- **Subtask Level**: Individual commits within task scope

### Workflow Alignment
- **Outer Workflow**: Handles Epic/Story/Bug level coordination
- **Inner Workflow**: Handles Task level execution
- **Role Assignment**: Specialists assigned to tasks, not stories/bugs
- **Progress Tracking**: Hierarchical progress from task → story/bug → epic

This consistent terminology ensures seamless integration across all system components and maintains clarity for all team members.