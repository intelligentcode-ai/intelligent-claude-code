# Intelligent Claude Code - Agent-Driven Development

Transform Claude Code into an intelligent development team with 14+ specialized agent roles using Product Requirement Blueprints (PRBs) for predictable, autonomous execution.

## Quick Start (30 seconds)

```bash
# Install
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
make install

# Initialize
/icc-init-system

# Start working with agents
@PM Build a user authentication system
# System: Generates PRB → Creates specialist agents → Agents execute → Work completes
```

## What You Get

### 🤖 Agent-Driven Architecture
Complete virtual development team with 14+ specialized agent roles that work together autonomously. Each agent has deep domain expertise and behavioral patterns optimized for their specialty.

### 🎯 PRB-Driven Execution
Self-contained blueprints replace complex workflows. Each PRB includes everything needed for single-pass execution: context, standards, examples, validation, and automatic agent invocation. PRBs automatically identify the appropriate specialist agent and execute via Task tool for complete isolation and quality assurance.

### 👥 14+ Specialist Agent Roles  
**Core Agents:**
- @PM, @Architect, @Developer, @AI-Engineer
- @System-Engineer, @DevOps-Engineer, @Database-Engineer
- @Security-Engineer, @QA-Engineer, @Backend-Tester
- @Requirements-Engineer, @Web-Designer, @User-Role

**Dynamic Agent Creation:**
- Unlimited specialists for any technology (@React-Developer, @AWS-Engineer, @ML-Specialist)
- Domain experts created automatically based on project needs
- All agents have 10+ years of expertise in their specialization

### 🧠 Self-Learning Agent System
- Agent execution generates learnings automatically
- Successful patterns captured and shared between agents
- Agents apply previous learnings to new tasks
- Continuous improvement through cross-agent knowledge sharing

### 🧠 Memory-First Operations
- All agent operations check memory before action
- Automatic pattern capture and storage across agent interactions
- Memory pattern application tracking
- Version-controlled in memory/ directory
- Topic-based organization with auto-pruning

### 📋 Dynamic Best-Practices Injection
- Add methodological approaches to `best-practices/` directory
- Auto-discovery during PRB generation and agent coordination
- Support for ANY methodology (GitOps, DevSecOps, TDD, Clean Architecture, etc.)
- Template placeholders replaced with your project's practices
- Zero system modification required

### ⚡ Autonomous Agent Operation
- **L1**: Manual approval required for all agent actions
- **L2**: Agent coordination with architect approval (default)
- **L3**: Fully autonomous multi-agent execution

### 🔧 Adapts to YOUR Project
Configure in CLAUDE.md where your docs/standards are. Agents find and include them automatically in PRBs and execution patterns.

## How It Works

1. **Request Work** → "@PM Implement OAuth2 login"
2. **Agent Activation** → @PM analyzes and creates specialist agents as needed
3. **Memory Check** → Agents search for existing patterns/learnings
4. **Best-Practices Discovery** → Agents find relevant methodological approaches
5. **Analyze Complexity** → Agent team scores complexity (@PM + @Architect for Large/Mega)
6. **Generate PRB** → Self-contained blueprint with embedded context + practices + agent coordination
7. **Agent Execution** → Multi-agent collaborative implementation
8. **Git Integration** → Auto version bump + commit + push
9. **Cross-Agent Learning** → Capture new patterns shared across agent memory

## Agent-Driven Story Management

Transform natural language stories into executable PRBs with multi-agent coordination:

1. **Story Creation** → Write stories in `stories/` directory
2. **@PM Analysis** → "@PM break down authentication story"
3. **Agent Collaboration** → @PM + @Architect + domain specialists collaborate
4. **PRB Generation** → Ready-to-execute blueprints with agent assignments in `prbs/ready/`
5. **Agent Execution** → Specialized agents execute PRBs collaboratively
6. **Story Selection** → "@PM what story should we work on next?"

### Story Directory Structure
```
stories/
├── user-authentication.md    # Business requirements
├── payment-system.md         # Feature specifications  
└── drafts/                   # Work-in-progress stories
    └── api-redesign.md
```

### Multi-Agent Story Process
- **Story Analysis**: @PM reads business goals, specialist agents evaluate technical approaches
- **Agent Team Assembly**: Dynamic creation of domain specialists (@Auth-Engineer, @Frontend-Developer, etc.)
- **Priority Setting**: Multi-agent evaluation of business value + technical complexity
- **PRB Creation**: @PM generates complexity-appropriate PRBs with agent assignments
- **Agent Coordination**: Collaborative execution across specialized agent team
- **Next Selection**: Agent team considers dependencies, risk, current application state

## Automatic PRB System

**Complete Automation Pipeline:** Work requests automatically trigger PRB creation and execution with no manual steps required.

### Automatic PRB Generation
- **Work Detection**: Intelligent recognition of implementation vs information requests
- **Template Selection**: Automatic complexity scoring and template selection (Nano→Mega)
- **Context Integration**: Complete project context, configuration, and memory patterns embedded
- **Placeholder Resolution**: All configuration values resolved during generation (no runtime lookups)
- **Quality Validation**: Generated PRBs meet all template requirements and validation standards

### Seamless Work Flow
```bash
# Natural Work Requests → Automatic PRB Creation → Subagent Execution
@PM Build a [project]         # Auto-creates project setup PRBs with specialist assignments
@Developer Implement auth     # Auto-generates implementation PRB with complete context
@AI-Engineer optimize system  # Auto-creates optimization PRB with behavioral patterns
"Fix the login bug"          # Auto-detects work intent, creates bug fix PRB
"Setup CI/CD pipeline"       # Auto-creates infrastructure PRB with DevOps specialist
```

**Intelligent Classification:**
- **Work Triggers** (Auto-PRB): implement, create, build, fix, deploy, configure, setup
- **Information Requests** (No PRB): show, explain, what is, status, how does

### Enhanced Automation Features
- **Context Awareness**: Auto-detects project type (CODE/AI-AGENTIC/HYBRID) and adjusts patterns
- **Dependency Analysis**: Auto-identifies prerequisite work and creates sequential PRBs
- **Size Management**: Auto-breakdown of complex work into multiple ≤15 point PRBs
- **Role Assignment**: Auto-selects appropriate specialists based on work type and technology domain
- **Memory Integration**: Auto-searches applicable patterns and embeds learnings in PRBs

## Essential Commands (Lean System)

```bash
/icc-init-system              # Initialize virtual team system
/icc-get-setting [key]        # Access configuration values
/icc-search-memory [query]    # Search stored learnings
```

**Everything else is automatic:**
- PRB generation happens on work detection with complete automation
- Specialist creation via technology domain analysis
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
- [Virtual Team Guide](docs/virtual-team-guide.md) - Meet the 14+ agent roles and dynamic specialist creation
- [User Guide](docs/user-guide.md) - Complete agent system usage guide
- [Commands Reference](docs/commands-reference.md) - All commands and agent interactions explained
- [PRB System Guide](docs/prb-system-guide.md) - How PRBs work with agent coordination
- [Project Configuration](docs/project-configuration.md) - Setup guide for agent-driven projects

## Why PRBs with Agents?

- **No workflow interruptions** - Single-pass multi-agent execution
- **Token-optimized** - Load only what each agent needs  
- **Project-adaptive** - Agent team respects YOUR structure
- **Truly autonomous** - Agent specialists have full context and coordination
- **Predictable** - Same input → Same quality multi-agent output
- **Agent collaboration** - Cross-specialist knowledge sharing and coordination

## License

MIT - See LICENSE file

---

**Ready for autonomous agent-driven development?** Install and let your specialized agent team handle the implementation details.