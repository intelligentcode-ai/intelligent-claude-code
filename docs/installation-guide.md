# Installation Guide - Intelligent Claude Code

## Installation Scopes

The installer now supports three different installation scopes to match your workflow:

### 1. Current Project Scope
Installs a CLAUDE.md file in your current project directory.

**Use when**: You want project-specific instructions while inheriting global behaviors
**Creates**: `./CLAUDE.md` with graceful integration
**Inherits**: User behaviors from `~/.claude/`

### 2. Specific Project Scope
Installs to any project directory you specify.

**Use when**: Setting up multiple projects at once
**Creates**: `[path]/CLAUDE.md` with graceful integration
**Inherits**: User behaviors from `~/.claude/`

### 3. User Scope (Global)
Installs the full system to `~/.claude/` for all projects.

**Use when**: Setting up your default behaviors and personas
**Creates**: Full behavior system in `~/.claude/`
**Applies to**: All projects automatically

## Installation Process

### Basic Installation
```bash
git clone [repo]
cd intelligent-claude-code
./install.sh
```

You'll see:
```
Installation Scope:
1) Current Project (./CLAUDE.md)
2) Specific Project (custom path)
3) User Scope (~/.claude/)

Select installation scope (1-3):
```

### Recommended Setup

1. **First, install user scope** (option 3):
   - Sets up global behaviors
   - Installs all personas
   - Configures enhanced features

2. **Then, for each project** (option 1 or 2):
   - Creates project CLAUDE.md
   - Integrates gracefully with existing config
   - Allows project customization

## Scope Details

### Project CLAUDE.md Structure
```markdown
# Intelligent Claude Code - Project Configuration

This project uses Intelligent Claude Code for enhanced AI assistance.

## Configuration
Configuration is handled through the native config.md system with graceful integration.

## Behaviors
@~/.claude/personas.md
@~/.claude/behaviors.md
@~/.claude/enhanced-behaviors.md
@~/.claude/git-safety-behaviors.md

## Project-Specific Instructions
Add your project-specific instructions below:
```

### User Scope Files
- `CLAUDE.md` - Main configuration
- `personas.md` - 12 behavioral personas
- `behaviors.md` - Smart behaviors
- `enhanced-behaviors.md` - Advanced features
- `git-safety-behaviors.md` - Git safety rules

## Configuration Hierarchy

1. **User Defaults** (`~/.claude/`)
   - Base behaviors for all projects
   - Default personas and rules
   
2. **Project Config** (`./CLAUDE.md`)
   - Project-specific instructions
   - Imports user behaviors
   
3. **Configuration Settings** (`config.md`)
   - Fine-tune any behavior
   - Project-specific toggles

## Examples

### Install for Current Project
```bash
cd my-project
/path/to/intelligent-claude-code/install.sh
# Select option 1
```

### Install for Multiple Projects
```bash
./install.sh
# Select option 2
# Enter: ~/projects/api-server
# Repeat for other projects
```

### Install Enhanced User Scope
```bash
./install.sh
# Select option 3
# Choose "y" for enhanced features
```

## Enhanced Features

When installing user scope, you'll be asked:
```
Install enhanced features? (recommended) (y/n):
```

Enhanced features include:
- Automatic research
- Automatic todos
- Parallelization
- Feature branching
- Git safety

## Backup and Updates

### Existing Installation
If `~/.claude/` exists:
- Option to backup current config
- Timestamped backup created
- Safe to update

### Project Updates
If `CLAUDE.md` exists in project:
- Asks before overwriting
- Preserves custom instructions
- Updates import paths

## Verification

After installation:

### User Scope Test
```bash
# In any project
claude "Let's think deeply about the architecture"
# Should activate deep thinking mode
```

### Project Scope Test
```bash
# In project with CLAUDE.md
claude "What are the project rules?"
# Should show project-specific instructions
```

### Configuration Test
```bash
# Edit config.md to disable security persona
claude "Review this for security"
# Security persona should be disabled
```

## Troubleshooting

### "src directory not found"
Run installer from the intelligent-claude-code directory

### "Directory does not exist"
For option 2, ensure the project path exists

### Features not working
1. Check user scope is installed (option 3)
2. Verify ~/.claude/ contains all files
3. Check config.md configuration

### Project imports failing
Ensure user scope installation is complete before project installation

## Best Practices

1. **Install Order**: User scope first, then projects
2. **Enhanced Features**: Recommended for full functionality
3. **Project Instructions**: Keep specific to project
4. **Configuration Files**: Use config.md for team standards
5. **Regular Updates**: Pull latest and reinstall user scope

## Uninstall

### Remove from project:
```bash
# Simply remove the import line from CLAUDE.md:
# @~/.claude/intelligent-claude-code.md
```

### Remove user scope:
```bash
rm -rf ~/.claude
```

### Keep backups:
```bash
ls ~/.claude.backup.*
```