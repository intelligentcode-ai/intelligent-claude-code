# Intelligent Claude Code

Enhance Claude Code with specialized personas and smart behaviors while respecting your existing setup.

## What This Does

Most AI tools overwrite your configurations. This one doesn't. It adds capabilities by importing one line into your existing CLAUDE.md file, leaving everything else untouched.

## Key Features

### Graceful Integration
- Analyzes your existing CLAUDE.md structure
- Adds only one import line, preserves everything else
- Works with team standards and company imports
- Remove by deleting one line - no vendor lock-in

### Clear Configuration
All settings are visible and documented in config.md:
```markdown
## Active Mode
standard

## Core Behaviors
- **Research First**: Always research unfamiliar tools
- **Git Safety**: Create checkpoints before risky operations
- **Auto Documentation**: Update docs with code changes
```

### Smart Personas
14 specialized personas handle different tasks:
- **Strategic**: Architecture, Project Manager, Documentation, Reviewer
- **Technical**: Backend, Frontend, Infrastructure, Security, Performance
- **Quality**: Tester, UI Designer, Teaching

### Meta-Persona System
For complex tasks, three meta-personas coordinate the specialists:
- **Strategic Coordinator**: Handles planning and architecture
- **Technical Executor**: Manages implementation across domains
- **Quality Guardian**: Ensures testing and documentation

Say "Design a payment system" and it automatically coordinates multiple personas.

### Project Management
Drop simple ideas in `tasks/pending/` and the PM persona:
- Analyzes requirements and dependencies
- Provides realistic effort estimates
- Tracks progress across personas
- Knows AI capabilities and limitations

### Four Modes
- **Minimal** (~600 tokens): Basic features, on-demand personas
- **Standard** (~2000 tokens): Balanced features with smart behaviors
- **Enhanced** (~5000 tokens): Full automation with research and git safety
- **Meta** (~6200 tokens): Meta-persona orchestration system

## Installation

```bash
git clone https://github.com/your-repo/intelligent-claude-code
cd intelligent-claude-code
./install.sh
```

Choose installation scope:
1. **Current Project**: Adds import to local CLAUDE.md
2. **Specific Project**: Adds import to any project's CLAUDE.md
3. **User Scope**: Installs to ~/.claude/ for all projects

## Usage

### Basic Usage
Once installed, just use Claude Code normally. The personas activate automatically based on context.

### Direct Persona Access
- `@security review this authentication code`
- `@architecture design a scalable system`
- `@frontend implement this UI component`

### Mode Switching
Edit ~/.claude/config.md:
```markdown
## Active Mode
enhanced

## Mode Configuration
@~/.claude/modes/enhanced.md
```

### Task Management
Create simple files in tasks/pending/:
```markdown
# Fix Login Bug
Users can't log in after password reset
```

The PM persona processes it and provides realistic estimates.

## Architecture

### How It Works
1. Project CLAUDE.md imports: `@~/.claude/intelligent-claude-code.md`
2. Main system imports: `@~/.claude/config.md`
3. Config imports appropriate mode file
4. Mode file imports required personas and behaviors

### File Structure
```
~/.claude/
├── config.md              # Mode selection and settings
├── modes/                  # Separate mode configurations
│   ├── minimal.md
│   ├── standard.md
│   ├── enhanced.md
│   └── meta.md
├── personas/               # Specialist definitions
│   ├── personas.md
│   └── meta-persona-system.md
└── behaviors/              # Smart behaviors
    ├── behaviors.md
    ├── enhanced-behaviors.md
    └── git-safety-behaviors.md
```

### Token Management
Each mode has accurate token counts:
- Minimal: ~600 tokens (basic features)
- Standard: ~2000 tokens (balanced)
- Enhanced: ~5000 tokens (full automation)
- Meta: ~6200 tokens (includes everything)

## Examples

### Simple Integration
**Before:**
```markdown
# My Project
Use TypeScript and test everything.
```

**After:**
```markdown
# Intelligent Claude Code Integration
@~/.claude/intelligent-claude-code.md

<!-- Existing project configuration preserved below -->

# My Project  
Use TypeScript and test everything.
```

### Complex Task Coordination
**Input:** "Build a real-time chat system"

**Response:** Strategic Coordinator activates, analyzes requirements, coordinates with:
- Architecture persona for system design
- Backend persona for server implementation
- Frontend persona for UI components
- Security persona for authentication
- Infrastructure persona for deployment

## Why This Approach

### Respectful
Preserves your existing configurations and team standards.

### Transparent
All settings are visible in markdown files, not hidden in environment variables.

### Flexible
Use individual personas for simple tasks, meta-coordination for complex ones.

### Removable
Delete one import line to uninstall completely.

### Team-Friendly
Works with existing company imports and development workflows.

## Configuration Options

Edit ~/.claude/config.md to customize:

```markdown
## Active Mode
enhanced

## Core Behaviors
- **Always Research**: true
- **Auto Todos**: true
- **Git Safety**: true

## Active Personas
- **security**: enabled
- **performance**: enabled
- **architecture**: enabled
```

See src/config.md for all available options.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes to src/ files
4. Test installation on different setups
5. Submit a pull request

## License

MIT License - see LICENSE file for details.