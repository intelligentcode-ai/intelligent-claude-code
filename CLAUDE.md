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
- `modes/virtual-team.md` - Virtual team mode implementation with modular architecture
- `modes/core-systems.md` - PM activation, scoring system, team configuration
- `modes/execution-engine.md` - Universal enforcement, L3 autonomy, quality gates
- `modes/role-framework.md` - 14 core roles with ultra-experienced standards
- `modes/integration-layer.md` - Memory Bank with aging, MCP integration, tool fallback
- `modes/operational-protocols.md` - Git workflow enforcement, quality standards
- `behaviors/` - **Behavioral intelligence modules with pseudo-code implementation**
  - `pseudo-code-integration.md` - Master behavioral framework orchestrator
  - `enforcement-autonomy.md` - Process compliance and auto-correction patterns
  - `memory-coordination.md` - Memory-first culture enforcement patterns
  - `command-chains.md` - Structured execution and tool integration patterns
  - `active-disagreement.md` - Violation detection and resolution patterns
  - `role-assessment.md` - Capability optimization and specialist creation
  - `learning-team-automation.md` - Error forgiveness and pattern capture

#### Behavioral Framework Architecture
- **Pseudo-Code Implementation**: Actionable behavioral patterns with structured execution logic
- **Command Chain Orchestration**: Structured patterns with pseudo-code implementation details
- **Quality Gate Enforcement**: Process guidance with blocking patterns and auto-correction
- **Task Coordination System**: PM-driven delegation with parallel execution pseudo-code
- **Security Validation Automation**: Automated code validation with enforcement patterns
- **Evidence-Based Monitoring**: Real-time validation with scoring and learning integration
- **Git Workflow Automation**: Professional standards with automated compliance checking
- **Documentation Intelligence**: Structured updates with pseudo-code pattern generation
- **Review Framework Automation**: Automated peer review with quality enforcement
- **Validation Engine**: DoD patterns with blocking enforcement and auto-correction
- **Strategic Analysis Intelligence**: Thoughtful role delegation with optimization algorithms

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
- **Roles**: Edit `src/modes/role-framework.md`
- **Behavioral Pseudo-Code**: Edit files in `src/behaviors/` with hybrid approach
  - Update pseudo-code blocks for implementation logic
  - Maintain markdown sections for context and documentation
  - Ensure integration patterns between modules remain clear
- **Config**: Edit `src/config.md`

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
```

### Role Coordination
- **@-notation**: Direct role addressing (@PM, @Developer, @Architect)
- **Dynamic Specialists**: Auto-created for any technology (@React-Developer)
- **Parallel Execution**: Multiple roles work simultaneously
- **Quality Gates**: Mandatory validation before completion

### Memory Integration
- Consult memory before every action (icc:memory-first)
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
- **Command Chains**: Structured execution patterns (icc:memory-first, icc:quality-gates)
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