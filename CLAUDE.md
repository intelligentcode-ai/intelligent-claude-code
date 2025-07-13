# Virtual Development Team
@~/.claude/modes/virtual-team.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, command chain coordination, behavioral framework guidance, and Git workflow integration. This repository contains the configuration templates, behavioral patterns, and installation system for the virtual team enhancement.

### Core Architecture Features
- **Command Chain Architecture**: Structured execution patterns for consistent role behavior
- **Memory-First Culture**: Behavioral emphasis on consulting memory before actions
- **Behavioral Framework**: Process guidance through documented patterns and expectations
- **Parallel Task Coordination**: PM-driven task delegation with simultaneous role execution
- **Tool Integration**: Coordinated use of available Claude Code tools
- **Evidence-Based Learning**: Scoring and insight generation for continuous improvement
- **Dual Scoring System**: Performance tracking for process compliance and quality delivery

## Development Architecture

### System Type
This is a **configuration-based system** built with native Markdown files, not a traditional software project. There are no build tools, package managers, or compiled artifacts.

### Core Components

#### Source Directory (`/src/`)
- `CLAUDE.md` - Master configuration template (installed to `~/.claude/CLAUDE.md`)
- `config.md` - Native markdown configuration template
- `modes/virtual-team.md` - Virtual team mode implementation with modular architecture
- `modes/core-systems.md` - PM activation, scoring system, team configuration
- `modes/execution-engine.md` - Universal enforcement, L3 autonomy, quality gates
- `modes/role-framework.md` - 14 core roles with ultra-experienced standards
- `modes/integration-layer.md` - Memory Bank with aging, MCP integration, tool fallback
- `modes/operational-protocols.md` - Git workflow enforcement, quality standards
- `behaviors/` - Behavioral intelligence modules (memory, specialization, disagreement)

#### Behavioral Framework Architecture
- **Command Chain Guidance**: Structured patterns for consistent role execution
- **Quality Gate Patterns**: Process guidance for requirements, architecture, peer review, implementation
- **Task Coordination System**: PM-driven delegation with parallel execution support
- **Security Validation Guidelines**: Recommended practices for code changes and configurations
- **Evidence-Based Reporting**: Encouragement of fact-based validation and documentation
- **Git Workflow Guidance**: Professional branching, commit standards, and MR practices
- **Documentation Patterns**: Structured approach to updates and evidence provision
- **Review Frameworks**: Guidance for peer review processes and validation
- **Validation Guidelines**: DoD patterns for deliverables and handoffs
- **Strategic Analysis Patterns**: Thoughtful approach to role delegations and decisions

#### Configuration System
- **Virtual Team Mode**: 14 specialized roles with Git workflow and autonomous operation
- **Transparent Configuration**: All settings in native markdown
- **Graceful Integration**: Single import line preserves existing content
- **@-notation**: Direct role addressing (@PM, @Architect, @Developer, etc.)

## Development Workflow

### Standard Tasks
```bash
# Quick setup
make install          # Interactive installation
make test            # Validate everything works

# Development cycle
1. Edit source files in src/
2. make lint         # Validate changes
3. make test         # Test functionality
4. git commit        # Follow Git workflow
```

### File Editing Patterns
- **Virtual Team**: Edit `src/modes/virtual-team.md`
- **Roles**: Edit `src/modes/role-framework.md`
- **Behaviors**: Edit files in `src/behaviors/`
- **Config**: Edit `src/config.md`

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
/memory-first → /think-sequential → execute → /quality-gates

# Multi-role coordination
/memory-first → /parallel-delegate → integrate → /quality-gates

# Strategic analysis
/pm-strategic-analysis → delegate → monitor → validate
```

### Role Coordination
- **@-notation**: Direct role addressing (@PM, @Developer, @Architect)
- **Dynamic Specialists**: Auto-created for any technology (@React-Developer)
- **Parallel Execution**: Multiple roles work simultaneously
- **Quality Gates**: Mandatory validation before completion

### Memory Integration
- Consult memory before every action (/memory-first)
- Store insights and learning outcomes
- Build persistent knowledge relationships
- Enable context survival across sessions

## System Integration Requirements

### Tool Dependencies
- **Claude Code**: Core platform (claude.ai/code)
- **MCP Memory**: Persistent knowledge storage
- **Context7**: Real-time documentation injection
- **GitHub CLI**: Repository management (optional, fallback available)
- **Brave Search**: Web search capability

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
- **Configuration-based**: Native Markdown files, no build tools
- **Modular**: Import chain activation via single line
- **Graceful**: Never overwrites existing configurations
- **Professional**: Git workflow enforcement with quality gates

### Core Components
- **14 Specialized Roles**: PM, Architect, Developer, QA, Security, etc.
- **Dynamic Specialists**: Unlimited auto-generated experts (@React-Developer)
- **Command Chains**: Structured execution patterns (/memory-first, /quality-gates)
- **Memory System**: Persistent learning with MCP integration
- **Tool Integration**: Context7, GitHub CLI, Brave Search with fallbacks

### Extension Points
- **Roles**: Add to `src/modes/role-framework.md`
- **Behaviors**: Extend `src/behaviors/` modules
- **Commands**: Add to `src/commands/` directory
- **Config**: Customize `src/config.md`

### Design Constraints
- Pure Markdown configuration (no environment variables)
- Single import activation/deactivation
- Never overwrite existing files
- Command chain mandatory enforcement
- Quality gates for all completions

## Common Development Tasks

### Adding New Role
```bash
1. Edit src/modes/role-framework.md
2. Define role expertise and responsibilities
3. make test  # Verify integration
4. Update documentation
```

### Modifying Behaviors
```bash
1. Edit relevant file in src/behaviors/
2. make lint  # Validate changes
3. make test  # Test functionality
4. make install  # Apply changes
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

### Quality Standards
- **Behavioral Guidance**: Structured patterns that encourage quality completion
- **Documentation Patterns**: Organized approach to updates and evidence provision
- **Professional Git Workflow**: Guidance for branching, commit standards, and MR practices
- **Evidence-Based Reporting**: Emphasis on fact-based documentation and validation
- **Learning-Based Improvement**: Continuous enhancement through insight capture and scoring

This architecture prioritizes developer experience, team compatibility, and professional development practices while providing structured guidance for AI collaboration through behavioral frameworks.