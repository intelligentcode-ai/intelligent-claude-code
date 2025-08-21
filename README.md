# Intelligent Claude Code - PRB-Driven Development

Transform Claude Code into an intelligent development team using Product Requirement Blueprints (PRBs) for predictable, autonomous execution.

## Quick Start (30 seconds)

```bash
# Install
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install

# Initialize
/icc-init-system

# Start working
"Build a user authentication system"
# System generates PRB → Specialist executes → Work completes
```

## What You Get

### 🎯 PRB-Driven Execution
Self-contained blueprints replace complex workflows. Each PRB includes everything needed for single-pass execution: context, standards, examples, validation.

### 👥 14 Specialist Roles  
- @PM, @Architect, @Developer, @Security-Engineer, etc.
- Dynamic specialist creation for any technology
- All with 10+ years expertise

### 🧠 Self-Learning System
- PRB execution generates learnings automatically
- Successful patterns captured and stored
- Applies previous learnings automatically
- Continuous improvement through memory patterns

### 🧠 Memory-First Operations
- All operations check memory before action
- Automatic pattern capture and storage
- Memory pattern application tracking
- Version-controlled in memory/ directory
- Topic-based organization with auto-pruning

### 📋 Dynamic Best-Practices Injection
- Add methodological approaches to `best-practices/` directory
- Auto-discovery during PRB generation
- Support for ANY methodology (GitOps, DevSecOps, TDD, Clean Architecture, etc.)
- Template placeholders replaced with your project's practices
- Zero system modification required

### ⚡ Autonomous Operation
- **L1**: Manual approval required
- **L2**: Architect approval (default)
- **L3**: Fully autonomous execution

### 🔧 Adapts to YOUR Project
Configure in CLAUDE.md where your docs/standards are. System finds and includes them automatically in PRBs.

## How It Works

1. **Request Work** → "Implement OAuth2 login"
2. **Memory Check** → Search for existing patterns/learnings
3. **Best-Practices Discovery** → Find relevant methodological approaches
4. **Analyze Complexity** → System scores complexity (with PM + Architect for Large/Mega)
5. **Generate PRB** → Self-contained blueprint with embedded context + practices
6. **Specialist Executes** → Single-pass implementation
7. **Git Integration** → Auto version bump + commit + push
8. **Learn & Store** → Capture new patterns in memory/

## Story Management

Transform natural language stories into executable PRBs:

1. **Story Creation** → Write stories in `stories/` directory
2. **@PM Analysis** → "@PM break down authentication story"
3. **Architect Collaboration** → Joint technical analysis
4. **PRB Generation** → Ready-to-execute blueprints in `prbs/ready/`
5. **Story Selection** → "@PM what story should we work on next?"

### Story Directory Structure
```
stories/
├── user-authentication.md    # Business requirements
├── payment-system.md         # Feature specifications  
└── drafts/                   # Work-in-progress stories
    └── api-redesign.md
```

### PM + Architect Process
- **Story Analysis**: @PM reads business goals, @Architect evaluates technical approach
- **Priority Setting**: Joint evaluation of business value + technical complexity
- **PRB Creation**: @PM generates appropriate complexity PRBs
- **Next Selection**: Consider dependencies, risk, current application state

## Essential Commands (Lean System)

```bash
/icc-init-system              # Initialize virtual team system
/icc-get-setting [key]        # Access configuration values
/icc-search-memory [query]    # Search stored learnings
```

**Everything else is automatic:**
- PRB generation happens on work detection
- Specialist creation via <70% capability matching
- Memory storage during PRB execution  
- Story management through @PM natural language

## MCP Server Integration

Install with automatic MCP server configuration:

```bash
# Create MCP configuration
cat > config/mcps.json << 'EOF'
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "playwright": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    },
    "custom-api": {
      "command": "node",
      "args": ["/path/to/custom-mcp.js"],
      "env": {
        "API_KEY": "${OPENAI_API_KEY}",
        "DATABASE_URL": "${DB_CONNECTION}"
      }
    }
  }
}
EOF

# Install with MCP integration
make install MCP_CONFIG=./config/mcps.json
```

### Environment Variable Support
- Use `${VARIABLE_NAME}` placeholders in MCP configurations
- Variables resolved from environment or API keys file
- Validation and backup included automatically
- Rollback on failure to previous settings

### Error Handling Features
- **JSON Syntax Validation**: Comprehensive JSON structure checking
- **Backup & Rollback**: Automatic settings.json backup before changes
- **Permission Handling**: Graceful file permission error handling  
- **Environment Resolution**: Safe environment variable substitution
- **Detailed Logging**: Complete error logs with troubleshooting steps

## Configuration (CLAUDE.md)

```yaml
# Tell system where YOUR files are
prb_configuration:
  best_practices_paths:
    - "docs/standards/"        # Your location
    - "engineering/patterns/"  # Your location
    
  code_pattern_search:
    paths: ["src/", "lib/"]    # Your code
    
  behavioral_overrides:
    testing_approach: "tdd"    # Your preferences

# Memory configuration - where AI agents store learnings
memory_configuration:
  external_path: "~/claude-memory"    # External memory location
  # Or use project-local (default): "./memory/"
```

## Memory Configuration

The AI agents can store their learnings in different locations:

### Default (Project-Local)
```yaml
# Memory stored in ./memory/ within your project
# No configuration needed - this is the default
```

### External Memory Path
```yaml
# In CLAUDE.md
memory_configuration:
  external_path: "~/claude-memory"     # Home directory
  external_path: "../shared-memory"   # Relative to project
  external_path: "/path/to/memory"    # Absolute path
```

**Benefits of External Memory:**
- **Privacy**: Keep learnings separate from project code
- **Sharing**: Use same memory across multiple projects  
- **Git Integration**: When `.git` exists in memory path, system auto-commits changes
- **Flexibility**: Store anywhere accessible to the AI agents

## Directory Structure

```
your-project/
├── CLAUDE.md                  # Your config
├── docs/                      # Your docs (anywhere)
├── src/                       # Your code
├── stories/                   # User stories for PRB generation
│   └── drafts/                # Work-in-progress stories
├── memory/                    # Version-controlled learnings (default)
└── prbs/                      # Version-controlled PRBs
    ├── ready/                 # Ready to execute
    └── completed/             # Executed PRBs
```

Work in YOUR structure - system adapts!

## Documentation

- **[Documentation Index](docs/index.md)** - Start here!
- [Virtual Team Guide](docs/virtual-team-guide.md) - Meet the 14 specialist roles
- [Commands Reference](docs/commands-reference.md) - All 12 commands explained
- [PRB System Guide](docs/prb-system-guide.md) - How PRBs work
- [Project Configuration](docs/project-configuration.md) - Setup guide

## Why PRBs?

- **No workflow interruptions** - Single-pass execution
- **Token-optimized** - Load only what's needed  
- **Project-adaptive** - Respects YOUR structure
- **Truly autonomous** - Specialists have full context
- **Predictable** - Same input → Same quality output

## License

MIT - See LICENSE file

---

**Ready to work autonomously?** Install and let your specialists handle the implementation details.