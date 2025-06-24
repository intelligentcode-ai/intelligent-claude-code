# Intelligent Claude Code - Enhanced Features

## Overview

The Enhanced Mode transforms Claude Code into an intelligent development partner with automatic behaviors, parallelization, and fine-grained configuration through native markdown configuration.

To enable enhanced mode, edit `~/.claude/config.md`:
```markdown
## Active Mode
enhanced
```

## Key Enhancements

### 1. Always-On Intelligence

**Automatic Research**
- Researches unfamiliar libraries/tools without being asked
- Uses Context7 and documentation tools automatically
- Never guesses when documentation exists

**Automatic Thinking**
- Scales thinking depth to match task complexity
- Simple questions → Quick answers
- Complex problems → Deep analysis with sequential thinking
- Critical decisions → Ultrathink mode

**Automatic Todos**
- Creates task lists for complex work (3+ steps)
- Updates progress in real-time
- Only for non-trivial tasks

### 2. Automatic Parallelization

**When It Activates**
- Multiple file analysis: "Check all controllers"
- Parallel research: "Research security AND performance"
- Batch operations: "Write tests for all components"
- Multi-language docs: "Document in English and Spanish"

**Configuration**  
Edit `~/.claude/config.md`:
```markdown
## Parallel Processing
- **Auto Parallel**: true
- **Subagent Model**: sonnet
- **Max Parallel Agents**: 5
```

### 3. Environment-Based Configuration

**Complete Control via config.md**  
Edit `~/.claude/config.md`:
```markdown
## Core Behaviors
- **Always Research**: true
- **Auto Todos**: true
- **Auto Sequential**: true
- **Auto Parallel**: true

## Model Selection
- **Subagent Model**: sonnet

## Active Personas
- Security: true
- Kubernetes: true
- Performance: true
- Architecture: true

## Behavior Rules
- **Git Safety**: true
- **Research First**: true

## Preset Mode
developer
```

### 4. Behavior Presets

**Developer Mode** (set `developer` in config.md preset section)
- Auto-todos for features
- Git safety on
- Test focus enabled
- Balanced research

**Architect Mode** (set `architect` in config.md preset section)
- Deep thinking default
- Architecture persona priority
- System-wide analysis
- Documentation emphasis

**Strict Mode** (set `strict` in config.md preset section)
- All safety rules on
- Mandatory research
- Extensive validation
- Maximum thinking depth

### 5. Smart Task Classification

**Simple Tasks** (Direct Response)
- "What is X?"
- "Fix this typo"
- "Where is the config?"

**Complex Tasks** (Full Treatment)
- Feature implementation
- System design
- Multi-step debugging
- Performance optimization

## Usage Examples

### Basic Enhancement
```markdown
# config.md
## Core Behaviors
- **Always Research**: true
- **Auto Todos**: true
```
Result: Claude automatically researches and creates todos

### Performance Team Setup
```markdown
# config.md
## Preset Mode
developer

## Active Personas
- Performance: true
- Architecture: true
- Teaching: false

## Model Selection
- **Subagent Model**: sonnet
```
Result: Performance-focused development with fast Sonnet subagents

### Strict Security Mode
```markdown
# config.md
## Preset Mode
strict

## Active Personas
- Security: true

## Core Behaviors
- **Auto Parallel**: false
- **Thinking Depth**: ultra
```
Result: Maximum security analysis with deep thinking

## Natural Language Overrides

Always available:
- "Skip the research"
- "No todos needed"
- "Work sequentially"
- "Use Opus for this"
- "Quick answer only"

## Parallelization Examples

**Automatic Parallel**
```
"Analyze all API endpoints for security issues"
→ Spawns subagent per endpoint
→ Parallel security analysis
→ Aggregated report
```

**Manual Sequential**
```
"Analyze endpoints one by one, showing dependencies"
→ Sequential analysis
→ Shows relationships
```

## Installation

1. **Enable Enhanced Mode**
```bash
# During installation
./install.sh
# Select enhanced mode when prompted

# Or in existing installation
# Edit ~/.claude/config.md and set:
## Active Mode
enhanced
```

2. **Configure via config.md**
```bash
# Edit ~/.claude/config.md with your preferences
# All settings are explicit and discoverable
```

3. **Team Standardization**
- Share config.md file with team
- Version control your configuration
- Consistent behavior across team

## Comparison: Standard vs Enhanced

| Feature | Standard | Enhanced |
|---------|----------|----------|
| Research | On request | Automatic |
| Todos | Manual | Auto for complex tasks |
| Thinking | When asked | Scaled to complexity |
| Parallelization | Manual | Automatic |
| Configuration | CLAUDE.md only | CLAUDE.md + config.md |
| Personas | Always active | Toggleable |
| Model selection | Fixed | Configurable |

## Best Practices

1. **Start Simple**: Use presets before custom configuration
2. **Team Alignment**: Share config.md files for consistency
3. **Project-Specific**: Different config.md per project type
4. **Performance**: Use Sonnet for subagents to save tokens
5. **Security**: Enable strict mode for sensitive projects

## Troubleshooting

**Too Much Analysis?**
```markdown
# config.md
## Core Behaviors
- **Fast Mode**: true
```

**Too Many Todos?**
```markdown
# config.md
## Core Behaviors
- **Todo Threshold**: 5
```

**Want Opus Quality?**
```markdown
# config.md
## Model Selection
- **Subagent Model**: opus
```

## Future Roadmap

- Project-type detection for auto-configuration
- Performance metrics dashboard
- Team behavior analytics
- Custom preset definitions

The Enhanced Edition makes Claude Code truly intelligent - automatically doing the right thing at the right time, while giving you complete control when needed.