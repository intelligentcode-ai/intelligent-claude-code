# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** is the implementation of a revolutionary AI enhancement system that provides graceful integration for Claude Code. This repository contains the source code, configuration templates, and installation system for the intelligent-claude-code enhancement.

## Development Architecture

### System Type
This is a **configuration-based system** built with native Markdown files, not a traditional software project. There are no build tools, package managers, or compiled artifacts.

### Core Components

#### Source Directory (`/src/`)
- `CLAUDE.md` - Master configuration template (installed to `~/.claude/CLAUDE.md`)
- `config.md` - Native markdown configuration template
- `intelligent-claude-code.md` - Main system orchestrator
- `modes/` - Separate mode files (minimal, standard, enhanced, meta)
- `personas/personas.md` - 14 specialist persona definitions
- `personas/meta-persona-system.md` - 3-tier coordination system
- `behaviors/` - Behavioral intelligence modules

#### Configuration System
- **Mode Architecture**: minimal (~600 tokens) → standard (~2000 tokens) → enhanced (~5000 tokens) → meta (~6200 tokens)
- **Transparent Configuration**: All settings documented
- **Graceful Integration**: Single import line preserves existing content
- **Mode Files**: Separate files in src/modes/ for clean token management

## Development Workflow

### Primary Development Tasks

#### Token Calculation
When modifying modes, calculate tokens using:
1. Count words in each imported file: `wc -w filename.md`
2. Sum all words for the mode
3. Multiply by 1.3 (accounts for markdown formatting)
4. Update all documentation with consistent token counts

#### Mode Hierarchy Validation
Ensure correct token progression:
- Minimal: ~600 tokens (basic features)
- Standard: ~2000 tokens (balanced)
- Enhanced: ~5000 tokens (full automation)
- Meta: ~6200 tokens (highest - includes all other components)

#### Configuration Updates
- Edit `src/config.md` for new configuration options
- Maintain native markdown format consistency
- Update `install.sh` to handle new options
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
1. Search for token count references: `grep -r "tokens" docs/`
2. Search for environment variable references: `grep -r "\.env" .`
3. Ensure all documentation reflects current architecture

### Key Development Patterns

#### File Import Architecture
- Base configuration in `src/CLAUDE.md`
- Mode-specific sections with conditional loading
- Import statements use `@~/.claude/filename.md` syntax
- Hierarchical loading: meta mode imports enhanced mode content

#### Persona System Architecture
- 14 individual personas in `personas/personas.md`
- 3 meta-personas coordinate specialists
- Natural language activation without explicit commands
- Context-aware routing based on request complexity

#### Graceful Integration Philosophy
- Never overwrite existing configurations
- Single import line for activation
- Complete removal via single line deletion
- Preserve team standards and existing workflows

## Development Commands

### File Operations
```bash
# Check token counts
wc -w src/personas/*.md src/behaviors/*.md

# Search for environment variable references (should be none)
grep -r "\.env" . --exclude-dir=archive

# Validate imports exist
find . -name "*.md" -exec grep -l "@~/" {} \;
```

### Configuration Management
- Edit `src/config.md` to add new options
- Update `src/CLAUDE.md` mode sections for new behaviors
- Modify `install.sh` to handle new configuration patterns

### Quality Assurance
1. **Token Count Accuracy**: All mode token counts must be accurate
2. **Import Resolution**: All `@~/` imports must resolve to existing files
3. **Mode Consistency**: Each mode should load appropriate components
4. **Installation Validation**: All three installation scopes must work

## Architecture Insights

### Why This Design
1. **Native Configuration**: Markdown over hidden environment files for discoverability
2. **Mode-Based Loading**: Different token budgets for different use cases
3. **Graceful Integration**: Respects existing developer setups
4. **Persona Specialization**: 14 focused specialists + 3 coordinators

### Extension Points
- Add new personas to `src/personas/personas.md`
- Create new behaviors in `src/behaviors/`
- Extend configuration options in `src/config.md`
- Add new installation scopes in `install.sh`

### Critical Constraints
- **Meta mode must be highest token count** (imports all other components)
- **No environment variable dependencies** (pure markdown configuration)
- **Graceful integration only** (never overwrite existing files)
- **Single import control** (one line to activate/deactivate)

## Common Development Tasks

### Adding New Configuration Option
1. Add to `src/config.md` in appropriate section
2. Update documentation with usage examples
3. Test installation creates correct config files
4. Update `install.sh` if needed for new patterns

### Modifying Persona System
1. Edit `src/personas/personas.md` for individual personas
2. Edit `src/personas/meta-persona-system.md` for coordination
3. Recalculate token counts for affected modes
4. Update documentation

### Fixing Token Counts
1. Calculate actual words: `wc -w` on all imported files
2. Multiply by 1.3 for markdown formatting overhead
3. Update all references in documentation consistently
4. Verify mode hierarchy is correct (meta > enhanced > standard > minimal)

This system represents a paradigm shift in AI tool integration, prioritizing developer experience and team compatibility over feature count.