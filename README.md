# Intelligent Claude Code

Transform Claude Code into a 14+ agent virtual development team with autonomous AgentTask execution.

## Quick Start

```bash
# Install
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
make install                   # Linux/macOS
# or .\install.ps1 install    # Windows

# Initialize
/icc-init-system

# Start working
@PM Build a user authentication system
```

## What You Get

- **14+ Specialist Agents**: @PM, @Developer, @AI-Engineer, @Database-Engineer, @Security-Engineer + unlimited dynamic specialists
- **AgentTask Automation**: Work requests automatically become self-contained AgentTasks
- **Memory-First Operations**: All agents check/store learnings automatically
- **Autonomous Execution**: L1 (manual) → L2 (guided) → L3 (fully autonomous)

## Primary Usage Pattern

```bash
# Natural @Role communication - no complex commands needed
@PM break down [story]         # Story → AgentTasks
@Developer implement auth      # Auto-creates + executes AgentTask
@AI-Engineer optimize system   # AI/behavioral improvements
@DevOps-Engineer deploy prod   # Infrastructure operations
```

## Essential Commands (Only 3)

```bash
/icc-init-system              # Initialize system
/icc-get-setting [key]        # Get configuration
/icc-search-memory [query]    # Search learnings
```

**Everything else is automatic** - AgentTask generation, memory storage, specialist creation.

## Configuration

Configure in `CLAUDE.md` where YOUR files are:

```yaml
# System adapts to YOUR project structure
agenttask_configuration:
  best_practices_paths: ["docs/standards/"]

memory_configuration:
  external_path: "~/claude-memory"  # Optional external memory

workflow_settings:
  tiny:
    version_bump: true
    changelog_required: true
    pr_required: false
```

## Documentation

**Start here**: [Documentation Index](docs/index.md)

**Key Guides**:
- [Installation Guide](docs/installation-guide.md)
- [User Guide](docs/user-guide.md)
- [AgentTask System Guide](docs/agenttask-system-guide.md)
- [Virtual Team Guide](docs/virtual-team-guide.md)

## License

MIT - See LICENSE file