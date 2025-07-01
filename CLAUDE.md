# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 12 specialized roles, Git workflow integration, and autonomous technical decision-making. This repository contains the source code, configuration templates, and installation system for the virtual team enhancement.

## Development Architecture

### System Type
This is a **configuration-based system** built with native Markdown files, not a traditional software project. There are no build tools, package managers, or compiled artifacts.

### Core Components

#### Source Directory (`/src/`)
- `CLAUDE.md` - Master configuration template (installed to `~/.claude/CLAUDE.md`)
- `config.md` - Native markdown configuration template
- `modes/virtual-team.md` - Virtual team mode implementation (~4500 tokens)
- `personas/personas.md` - 14 additional specialist persona definitions
- `behaviors/` - Behavioral intelligence modules (enhanced, git-safety, documentation)

#### Configuration System
- **Virtual Team Mode**: 12 specialized roles with Git workflow and autonomous operation
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

#### File Import Architecture
- Base configuration in `src/CLAUDE.md`
- Virtual team mode in `src/modes/virtual-team.md`
- Import statements use `@~/.claude/filename.md` syntax
- Single import activates entire system

#### Virtual Team Architecture
- 12 specialized roles with distinct expertise
- @-notation for direct role addressing
- Git workflow integration with branch/commit/MR process
- Autonomous technical decision-making

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
1. **@-notation Working**: All role addressing must function correctly
2. **Import Resolution**: All `@~/` imports must resolve to existing files
3. **Git Workflow**: Proper branching and commit standards enforced
4. **Installation Validation**: All three installation scopes must work
5. **GitHub CLI Integration**: Test both automated and manual fallback modes
6. **Automated Versioning**: Verify version bumping and changelog generation

## Architecture Insights

### Why This Design
1. **Native Configuration**: Markdown over hidden environment files for discoverability
2. **Virtual Team Focus**: 12 specialized roles for complete development coverage
3. **Graceful Integration**: Respects existing developer setups
4. **Git Workflow**: Professional development practices built-in

### Extension Points
- Add new roles to `src/modes/virtual-team.md`
- Extend behaviors in `src/behaviors/`
- Customize configuration in `src/config.md`
- Modify installation process in `install.sh`

### Critical Constraints
- **No environment variable dependencies** (pure markdown configuration)
- **Graceful integration only** (never overwrite existing files)
- **Single import control** (one line to activate/deactivate)
- **Git standards enforced** (no AI mentions in commits)

## Common Development Tasks

### Adding New Configuration Option
1. Add to `src/config.md` in appropriate section
2. Update documentation with usage examples
3. Test installation creates correct config files
4. Update `install.sh` if needed for new patterns

### Modifying Virtual Team
1. Edit `src/modes/virtual-team.md` for role changes
2. Update role definitions and responsibilities
3. Test @-notation addressing
4. Update documentation

### Adding New Role
1. Add role definition to `src/modes/virtual-team.md`
2. Define expertise, responsibilities, and activation
3. Update role selection logic in PM section
4. Run `make test` to verify integration

### GitHub CLI Integration Development
1. Test GitHub CLI detection: `command -v gh`
2. Validate authentication: `gh auth status`
3. Test PR creation with fallback mechanisms
4. Verify graceful degradation when gh CLI unavailable

This system represents a paradigm shift in AI tool integration, prioritizing developer experience and team compatibility over feature count.