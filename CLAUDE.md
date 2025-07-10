# Virtual Development Team
@~/.claude/modes/virtual-team.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, TRUE dynamic specialist generation, mandatory enforcement architecture, Git workflow integration, and Level 3 autonomous technical decision-making. This repository contains the source code, configuration templates, and installation system for the virtual team enhancement.

### Core Architecture Features
- **TRUE Dynamic Specialist Generation**: Unlimited domain experts created on-demand with Context7 knowledge injection
- **Memory-First Culture**: ALL roles MUST consult memory before actions with -1.0pts P penalty enforcement
- **Mandatory Enforcement Architecture**: Universal process compliance for ALL roles and workflows
- **Level 3 Autonomous Operations**: Strategic analysis layer with continuous autonomy protocols
- **Fallback Tool Logic**: Intelligent degradation from Context7 → Brave Search → Built-in tools
- **Process Compliance Enforcement**: Fact-based validation with auto-correction workflows
- **Dual Scoring System**: Real-time professionalism and quality tracking for all team members

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

#### Mandatory Enforcement Architecture
- **Universal Process Compliance**: ALL roles must follow enforcement protocols for ALL activities
- **Quality Gates**: Auto-correction workflows for requirements, architecture, peer review, implementation
- **Automatic Quality Gate Triggers**: Configuration-driven routing, blocking logic, auto-delegation system
- **Security Validation**: Mandatory pre-commit validation for ALL code changes and configurations
- **Fact-Based Validation**: No assumptions, evidence-based reporting, PRD compliance for ALL work
- **Git Workflow Enforcement**: Proper branching, commit standards, MR requirements for ALL changes
- **Documentation Compliance**: Real-time updates, no document sprawl, evidence provision for ALL tasks
- **Review Enforcement**: Mandatory peer review for ALL implementations, not just code changes
- **Validation Enforcement**: DoD validation required for ALL deliverables and handoffs
- **Process Gate Enforcement**: Strategic analysis layer required for ALL role delegations

#### Configuration System
- **Virtual Team Mode**: 14 specialized roles with Git workflow and autonomous operation
- **Transparent Configuration**: All settings in native markdown
- **Graceful Integration**: Single import line preserves existing content
- **@-notation**: Direct role addressing (@PM, @Architect, @Developer, etc.)

## Development Workflow

### Primary Development Tasks

#### Virtual Team Updates
When modifying the virtual team:
1. Edit `src/modes/virtual-team.md` for role changes
2. Update role definitions and workflows
3. Test @-notation addressing works correctly
4. Verify Git workflow integration

#### Configuration Updates
- Edit `src/config.md` for configuration changes
- Maintain native markdown format consistency
- Update `install.sh` if needed
- Test installation with all three scopes

### Testing Approach

#### Installation Testing
```bash
# Test all installation scopes
./install.sh  # Test interactive installer
# Options: 1) Current Project, 2) Specific Project, 3) User (~/.claude/)
```

#### Configuration Validation
1. Verify all imports resolve correctly
2. Check token counts match documentation
3. Test mode switching works properly
4. Validate graceful integration preserves existing files

#### Documentation Consistency
1. Verify all @-notation examples work correctly
2. Ensure Git workflow documentation is accurate
3. Check role definitions match implementation

### Key Development Patterns

#### Modular Architecture System
- **Base Configuration**: `src/CLAUDE.md` with import chain management
- **Virtual Team Core**: `src/modes/virtual-team.md` with modular dependency chain
- **Core Systems**: `src/modes/core-systems.md` with PM activation and scoring
- **Execution Engine**: `src/modes/execution-engine.md` with enforcement and L3 autonomy
- **Role Framework**: `src/modes/role-framework.md` with 14 roles and standards
- **Integration Layer**: `src/modes/integration-layer.md` with memory and tools
- **Operational Protocols**: `src/modes/operational-protocols.md` with Git workflow
- **Import Chain**: Core → Execution → Role → Integration → Operational
- **Single Import Activation**: `@~/.claude/modes/virtual-team.md` activates entire system

#### TRUE Dynamic Specialist Generation
- **Technology Discovery Engine**: 3-tier auto-detection (file patterns, content analysis, context inference)
- **Context7 Knowledge Injection**: Real-time expertise loading with fallback logic
- **Unlimited Domain Support**: Generate specialists for ANY technology/domain
- **Dynamic Role Evolution**: Specialists adapt capabilities based on project needs
- **Parallel Instance Support**: Multiple same-role instances (@Developer-1, @Developer-2)
- **Custom Role Creation**: User-triggered specialization with unlimited naming

#### Virtual Team Architecture
- **14 Core Specialized Roles**: PM, Requirements-Engineer, Architect, Developer, User-Role, System-Engineer, DevOps-Engineer, Database-Engineer, Security-Engineer, AI-Engineer, Web-Designer, QA-Engineer, Frontend-Tester, Backend-Tester
- **TRUE Dynamic Specialist Generation**: Unlimited domain experts (@React-Developer, @Kubernetes-Engineer, @GraphQL-Expert, @Blockchain-Specialist, etc.)
- **@-notation Addressing**: Direct role communication (@PM, @Architect, custom specialists)
- **Mandatory Enforcement**: ALL roles follow process compliance architecture
- **Strategic Analysis Layer**: Pre-execution planning with thoughtful organized responses
- **Level 3 Autonomous Operations**: Continuous technical decision-making with business-only escalation
- **Git Workflow Integration**: Branch/commit/MR process with mandatory security validation
- **Fallback Tool Logic**: Context7 → Brave Search → Built-in tools → Manual guidance
- **Fact-Based Validation**: Evidence-based reporting, no assumptions, PRD compliance
- **Auto-Correction Workflows**: Self-correcting quality loops until completion standards achieved

#### Graceful Integration Philosophy
- Never overwrite existing configurations
- Single import line for activation
- Complete removal via single line deletion
- Preserve team standards and existing workflows

## Development Commands

### File Operations
```bash
# Validate imports exist
find . -name "*.md" -exec grep -l "@~/" {} \;

# Test virtual team activation
echo "@PM Status check" | claude

# Verify Git workflow
git log --oneline -n 5
```

### Configuration Management
- Edit `src/config.md` to add new options
- Update `src/CLAUDE.md` mode sections for new behaviors
- Modify installation process via `make install` to handle new configuration patterns
- Test GitHub CLI integration and graceful fallbacks

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

## Architecture Insights

### Why This Design

#### Core Design Philosophy
1. **Native Configuration**: Markdown over hidden environment files for discoverability
2. **Virtual Team Focus**: 14 specialized roles + unlimited dynamic specialists
3. **Graceful Integration**: Respects existing developer setups with single import
4. **Git Workflow**: Professional development practices with mandatory enforcement

#### Advanced Architecture Benefits
5. **TRUE Dynamic Adaptation**: Unlimited specialists for ANY technology domain
6. **Mandatory Quality**: Universal process compliance prevents shortcuts
7. **Strategic Intelligence**: Pre-execution analysis with thoughtful responses
8. **Autonomous Operations**: Level 3 continuous technical decision-making
9. **Fallback Resilience**: Multiple tool layers ensure availability
10. **Fact-Based Validation**: Evidence-driven development with auto-correction
11. **Memory Integration**: Persistent knowledge capture and relationship tracking
12. **Security-First**: Mandatory pre-commit validation for all changes

### Extension Points

#### Core System Extensions
- **Core Roles**: Add new roles to `src/modes/role-framework.md`
- **Dynamic Specialists**: Extend role framework for new domains
- **Process Enforcement**: Enhance `src/modes/execution-engine.md` for new quality gates
- **Advanced Features**: Extend `src/modes/integration-layer.md` for new capabilities
- **Behaviors**: Extend `src/behaviors/` for new behavioral intelligence
- **Configuration**: Customize `src/config.md` for project-specific settings
- **Installation**: Modify installation process in `install.sh`

#### Dynamic Architecture Extensions
- **Technology Discovery**: Add new file patterns and content recognition
- **Context7 Integration**: Extend knowledge injection for new domains
- **Fallback Logic**: Enhance tool availability detection and degradation
- **Enforcement Rules**: Add new mandatory compliance requirements
- **Memory Patterns**: Extend persistent knowledge capture points
- **Security Validation**: Add new pre-commit validation rules

### Critical Constraints

#### Configuration Constraints
- **No environment variable dependencies** (pure markdown configuration)
- **Graceful integration only** (never overwrite existing files)
- **Single import control** (one line to activate/deactivate)
- **Git standards enforced** (no AI mentions in commits)

#### Enforcement Constraints
- **Universal process compliance** (ALL roles must follow enforcement architecture)
- **Mandatory quality gates** (auto-correction workflows required)
- **Fact-based validation** (no assumptions, evidence-based reporting)
- **Security validation** (pre-commit validation for ALL changes)
- **Documentation compliance** (real-time updates, evidence provision)
- **Strategic analysis required** (thoughtful responses, not reactive)
- **L3 autonomy boundaries** (technical autonomy, business escalation only)
- **Tool availability adaptation** (graceful degradation through fallback layers)

## Common Development Tasks

### Adding New Configuration Option
1. Add to `src/config.md` in appropriate section
2. Update documentation with usage examples
3. Test installation creates correct config files
4. Update `install.sh` if needed for new patterns

### Modifying Virtual Team
1. Edit `src/modes/role-framework.md` for role changes
2. Update role definitions and responsibilities
3. Test @-notation addressing
4. Update documentation

### Adding New Role
1. Add role definition to `src/modes/role-framework.md`
2. Define expertise, responsibilities, and activation
3. Update role selection logic in core-systems.md
4. Run `make test` to verify integration

### GitHub CLI Integration Development
1. Test GitHub CLI detection: `command -v gh`
2. Validate authentication: `gh auth status`
3. Test PR creation with fallback mechanisms
4. Verify graceful degradation when gh CLI unavailable

### Dynamic Role System Development
1. Validate technology discovery engine: File patterns, content analysis, context inference
2. Test Context7 knowledge injection: Library resolution, documentation retrieval
3. Verify fallback tool logic: Context7 → Brave Search → Built-in tools
4. Test unlimited specialist generation: Custom roles, domain experts, parallel instances
5. Validate enforcement integration: Process compliance, quality gates, auto-correction

### Process Enforcement Development
1. Test mandatory quality gates: Requirements, architecture, peer review, security
2. Validate fact-based validation: Evidence requirements, assumption detection
3. Test auto-correction workflows: Quality loops, specialist re-delegation
4. Verify L3 autonomy: Strategic analysis, continuous operations, business escalation
5. Test security validation: Pre-commit validation, credential scanning, compliance

### Dual Scoring System Development
1. Validate score display: All roles show P/Q scores in correct format
2. Test scoring triggers: Process compliance and quality outcomes update scores
3. Verify learning generation: Callouts created for significant score changes
4. Test memory integration: Scores persist and history is retrievable
5. Validate team replacement: -10 professionalism triggers seamless replacement
6. Test enforcement: Only PM and Architect can assign scores, evidence required

## System Architecture Summary

This system represents a paradigm shift in AI tool integration, implementing TRUE dynamic role transformation with mandatory enforcement architecture. The system provides:

### Core Capabilities
- **Unlimited Dynamic Specialists**: Generate experts for ANY technology domain
- **Memory-First Culture**: ALL roles MUST consult memory before actions with behavioral enforcement
- **Mandatory Process Compliance**: Universal enforcement for ALL roles and workflows
- **Level 3 Autonomous Operations**: Strategic analysis with continuous technical decision-making
- **Intelligent Tool Fallback**: Context7 → Brave Search → Built-in tools → Manual guidance
- **Fact-Based Validation**: Evidence-driven development with auto-correction workflows
- **Memory Integration**: Persistent knowledge capture and relationship tracking
- **Security-First Architecture**: Mandatory pre-commit validation for all changes
- **Dual Scoring System**: Real-time accountability and continuous improvement for all team members

### Quality Standards
- **100% Completion Enforcement**: No partial implementations or "good enough" solutions
- **Document Sprawl Prevention**: Single progress file per day, update existing docs only
- **Professional Git Workflow**: Proper branching, commit standards, MR requirements
- **Evidence-Based Reporting**: All claims backed by evidence, no assumptions permitted
- **Auto-Correction Workflows**: Self-correcting quality loops until standards achieved

This architecture prioritizes developer experience, team compatibility, and professional development practices while maintaining complete quality assurance through mandatory enforcement protocols.