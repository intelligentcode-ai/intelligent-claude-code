# Token Optimization Guide

## Token Optimization Strategies

Different modes load different amounts of content:
- **Enhanced mode**: Full automation features and all behavior files
- **Standard mode**: Balanced features with core behaviors  
- **Meta mode**: Task routing system with coordination logic
- **Minimal mode**: Essential behaviors with on-demand activation

Token usage depends on which content is loaded.

## Solutions

### 1. Minimal Mode (Recommended)

**Reduced token usage** - Essential features only

```markdown
# Set mode in config.md
## Active Mode
minimal
```

Or during installation:
```bash
./install.sh
# Select option 1 for minimal mode
```

Features preserved:
- All core behaviors
- All personas (activated on demand)
- Git safety
- Auto features

### 2. Selective Loading

Use config.md to disable unused features:

```markdown
# Disable unused personas
## Active Personas
- Infrastructure: false
- Kubernetes: false
- UI Design: false

# Disable verbose features
## Display Options
- **Show Thinking**: false
- **Show Research**: false
```

### 3. Project-Specific Minimal

Create ultra-minimal project CLAUDE.md:

```markdown
# Project Config

Tech: React, Node.js
Style: Functional, TypeScript

Rules:
- Test everything
- No console.logs
- Handle errors

Use security persona for auth code.
```

### 4. Dynamic Loading Pattern

Instead of loading everything, reference as needed:

```markdown
# CLAUDE.md

For specialized help, say:
- "Load security persona"
- "Load testing behaviors"
- "Show git safety rules"

Default: Efficient, research-first, clean commits.
```

## Installation Approaches

### Complete Installation
- All modes available, switch via config.md
- Higher token usage but maximum flexibility
- Best for experimentation and varied workflows

### Modular Installation
- Single mode only, optimized files
- Lower token usage, focused functionality
- Best for production with known requirements

| Installation | Switching | Token Usage | Best For |
|-------------|-----------|-------------|----------|
| Complete | Via config.md | Higher | Flexibility |
| Modular | Not available | Lower | Efficiency |

## Best Practices

### 1. Start Minimal
Begin with minimal mode, add only what you use.

### 2. Project-Specific Only
Keep project CLAUDE.md ultra-concise:
```markdown
# API Project
- RESTful patterns
- PostgreSQL
- Test coverage 80%+
```

### 3. Configuration Activation
Use config.md to activate features per-project:
```markdown
# Frontend project
## Active Personas
- Frontend: true
- Backend: false
```

### 4. Lazy Loading
Reference behaviors instead of including:
```markdown
Say "security review" for security analysis.
Say "performance check" for optimization.
```

## Installation Options

### Minimal User Scope
```bash
./install.sh
# Choose option 3
# When asked about enhanced, choose 'n'
# Manually copy minimal files
```

### Minimal Project
```bash
echo "# Project: Use minimal Claude behaviors" > CLAUDE.md
echo "@~/.claude/minimal-behaviors.md" >> CLAUDE.md
```

## Token Usage Examples

### Heavy Usage (Not Recommended)
```markdown
@~/.claude/personas.md
@~/.claude/behaviors.md  
@~/.claude/enhanced-behaviors.md
@~/.claude/git-safety-behaviors.md
# Plus project instructions...
```
**Cost**: 5,000+ tokens per message

### Optimal Usage
```markdown
# Core rules only
Research first. Think deeply. Clean commits.
@~/.claude/minimal-behaviors.md
```
**Cost**: 600 tokens per message

### Ultra-Light Usage
```markdown
# React project. Test everything.
Security persona for auth.
```
**Cost**: 50 tokens per message

## Recommendations

1. **Default to Minimal**: Set `minimal` in config.md
2. **Activate on Demand**: Load personas when needed
3. **Project Brevity**: Keep project files tiny
4. **Monitor Usage**: Check token consumption
5. **Trim Regularly**: Remove unused features

## Quick Switch

### Switching Modes:
```markdown
# Edit config.md in your project or ~/.claude/
## Active Mode
minimal    # Switch to minimal
standard   # Switch to standard
enhanced   # Switch to enhanced
```

No file copying needed! The unified CLAUDE.md adapts based on the mode set in config.md.

### Mode-Specific Files:
- **All modes**: CLAUDE.md, personas.md, behaviors.md
- **Minimal only**: minimal-behaviors.md
- **Enhanced only**: enhanced-behaviors.md, git-safety-behaviors.md

The minimal configuration provides 90% of the benefits at 10% of the token cost!