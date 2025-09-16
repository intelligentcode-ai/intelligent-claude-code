# Intelligent Claude Code - Virtual Development Team

Transform Claude Code into an intelligent virtual development team with 14+ specialized roles using AgentTask execution system and behavioral hook enforcement for reliable, autonomous development.

## Quick Start (30 seconds)

### Linux/macOS
```bash
# Install
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
make install

# Initialize
/icc-init-system

# Start working with agents
@PM Build a user authentication system
# System: Generates AgentTask → Creates specialist agents → Agents execute → Work completes
```

### Windows
```powershell
# Install
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
.\install.ps1 install

# Initialize
/icc-init-system

# Start working with agents
@PM Build a user authentication system
# System: Generates AgentTask → Creates specialist agents → Agents execute → Work completes
```

## What You Get

### 🤖 Agent-Driven Architecture
Complete virtual development team with 14+ specialized agent roles that work together autonomously. Each agent has deep domain expertise and behavioral patterns optimized for their specialty.

### 🎯 AgentTask-Driven Execution
Self-contained AgentTasks replace complex workflows. Each AgentTask includes everything needed for single-pass execution: context, standards, examples, validation, and automatic agent invocation. AgentTasks automatically identify the appropriate specialist agent and execute via Task tool for complete isolation and quality assurance.

### 🛡️ Behavioral Hook Enforcement
Built-in hook system ensures reliable execution patterns:
- **Pre-Tool-Use Hooks**: Validate all tool operations against behavioral patterns
- **Work Intent Detection**: Automatically blocks unauthorized direct execution
- **AgentTask-First Pattern**: Enforces structured work through AgentTask system
- **Memory-First Operations**: Ensures all work checks existing patterns before proceeding
- **Educational Reminder System**: Dynamic reminders help users learn system patterns

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

Transform natural language stories into executable AgentTasks with multi-agent coordination:

1. **Story Creation** → Write stories in `stories/` directory
2. **@PM Analysis** → "@PM break down authentication story"
3. **Agent Collaboration** → @PM + @Architect + domain specialists collaborate
4. **AgentTask Generation** → Ready-to-execute blueprints with agent assignments in `agenttasks/ready/`
5. **Agent Execution** → Specialized agents execute AgentTasks collaboratively
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
- **AgentTask Creation**: @PM generates complexity-appropriate AgentTasks with agent assignments
- **Agent Coordination**: Collaborative execution across specialized agent team
- **Next Selection**: Agent team considers dependencies, risk, current application state

## Automatic AgentTask System

**Complete Automation Pipeline:** Work requests automatically trigger AgentTask creation and execution with no manual steps required.

### Automatic AgentTask Generation
- **Work Detection**: Intelligent recognition of implementation vs information requests
- **Template Selection**: Automatic complexity scoring and template selection (Nano→Mega)
- **Context Integration**: Complete project context, configuration, and memory patterns embedded
- **Placeholder Resolution**: All configuration values resolved during generation (no runtime lookups)
- **Quality Validation**: Generated PRBs meet all template requirements and validation standards

### Seamless Work Flow
```bash
# Natural Work Requests → Automatic AgentTask Creation → Subagent Execution
@PM Build a [project]         # Auto-creates project setup AgentTasks with specialist assignments
@Developer Implement auth     # Auto-generates implementation AgentTask with complete context
@AI-Engineer optimize system  # Auto-creates optimization AgentTask with behavioral patterns
"Fix the login bug"          # Auto-detects work intent, creates bug fix AgentTask
"Setup CI/CD pipeline"       # Auto-creates infrastructure AgentTask with DevOps specialist
```

**Intelligent Classification:**
- **Work Triggers** (Auto-AgentTask): implement, create, build, fix, deploy, configure, setup
- **Information Requests** (No AgentTask): show, explain, what is, status, how does

### Enhanced Automation Features
- **Context Awareness**: Auto-detects project type (CODE/AI-AGENTIC/HYBRID) and adjusts patterns
- **Dependency Analysis**: Auto-identifies prerequisite work and creates sequential PRBs
- **Size Management**: Auto-breakdown of complex work into multiple ≤15 point AgentTasks
- **Role Assignment**: Auto-selects appropriate specialists based on work type and technology domain
- **Memory Integration**: Auto-searches applicable patterns and embeds learnings in AgentTasks

## Essential Commands (Lean System)

```bash
/icc-init-system              # Initialize virtual team system
/icc-get-setting [key]        # Access configuration values
/icc-search-memory [query]    # Search stored learnings
```

**Everything else is automatic:**
- AgentTask generation happens on work detection with complete automation
- Specialist creation via technology domain analysis
- Memory storage during AgentTask execution
- Story management through @PM natural language

## Hook Reminder System

The system includes an educational reminder system that helps users learn and follow intelligent-claude-code patterns:

### Key Features
- **Dynamic Loading**: JSON-based configuration with multi-location support
- **Educational Focus**: Non-blocking reminders (5-15% chance) that teach without interrupting
- **User Customization**: Project and user-level reminder customization
- **25+ Behavioral Reminders**: Covering @Role patterns, AgentTask workflow, memory-first approach

### Customization Locations
```
Priority Order (Highest to Lowest):
1. Project-local: .claude/hooks/reminders.json
2. User-global: ~/.claude/hooks/reminders.json
3. System default: ~/.claude/hooks/lib/reminders.json
```

### Quick Customization Example
```json
// .claude/hooks/reminders.json
{
  "preAction": [
    {
      "category": "Project Standards",
      "message": "📋 Check project-specific coding standards",
      "icon": "📋",
      "principle": "Project consistency requires following established patterns"
    }
  ]
}
```

**Learn More**: See [Hook Reminder System Documentation](docs/hooks/reminder-system.md)

## MCP Server Integration

Install with automatic MCP server configuration:

### Linux/macOS
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
      "args": ["@playwright/mcp@latest"]
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

### Windows
```powershell
# Create MCP configuration
@'
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "playwright": {
      "command": "npx", 
      "args": ["@playwright/mcp@latest"]
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
'@ | Out-File -FilePath config/mcps.json -Encoding utf8

# Install with MCP integration
.\install.ps1 install -McpConfig ./config/mcps.json
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
agenttask_configuration:
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

# Workflow configuration - customize per AgentTask size
workflow_settings:
  nano:
    version_bump: false           # No version changes for trivial fixes
    changelog_required: false     # No changelog for trivial changes
    pr_required: false           # Direct commit for simple changes
  tiny:
    version_bump: true           # Patch version bumps
    version_type: "patch"        # For small features/fixes
    changelog_required: true     # Document all changes
    pr_required: false          # Direct commit allowed
  medium:
    version_bump: true          # Minor version bumps for features
    version_type: "minor"
    changelog_required: true
    pr_required: true           # Require pull request review
    merge_strategy: "feature_branch"
  large:
    version_bump: true
    version_type: "minor"
    changelog_required: true
    pr_required: true
    coordination_required: true  # Multi-agent coordination needed
  mega:
    version_bump: true
    version_type: "major"       # Major versions for breaking changes
    changelog_required: true
    pr_required: true
    coordination_required: true
    breaking_change_assessment: true
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

## Workflow Configuration

Control how the system handles different PRB sizes with fine-grained workflow settings:

### Per-Size Configuration
The system automatically applies different workflows based on AgentTask complexity:

- **Nano (0-2 points)**: Trivial fixes with minimal process overhead
- **Tiny (3-5 points)**: Small changes with basic versioning and documentation
- **Medium (6-15 points)**: Standard features requiring review and proper branching
- **Large (16-30 points)**: Complex features needing coordination and careful review
- **Mega (30+ points)**: Major system changes with breaking change assessment

### Customizable Settings
Each size level supports these workflow controls:

- **version_bump**: Enable/disable automatic version bumping
- **version_type**: patch/minor/major version increment type
- **changelog_required**: Require CHANGELOG.md entries
- **pr_required**: Require pull request for changes
- **merge_strategy**: direct_commit or feature_branch
- **release_automation**: Enable automated releases
- **coordination_required**: Multi-agent coordination needed
- **breaking_change_assessment**: Assess breaking changes

### Automatic Initialization
When running `/icc-init-system`, the system:
- Checks if workflow_settings exist in your CLAUDE.md
- Creates sensible defaults if missing
- Allows full customization per project needs
- Applies settings automatically during AgentTask execution

## Directory Structure

```
your-project/
├── CLAUDE.md                  # Your config
├── docs/                      # Your docs (anywhere)
├── src/                       # Your code
├── stories/                   # User stories for AgentTask generation
│   └── drafts/                # Work-in-progress stories
├── memory/                    # Version-controlled learnings (default)
└── agenttasks/                # Version-controlled AgentTasks
    ├── ready/                 # Ready to execute
    └── completed/             # Executed AgentTasks
```

Work in YOUR structure - system adapts!

## Documentation

### Getting Started
- **[Documentation Index](docs/index.md)** - Start here!
- [Installation Guide](docs/installation-guide.md) - Complete installation instructions
- [User Guide](docs/user-guide.md) - Complete agent system usage guide
- [Virtual Team Guide](docs/virtual-team-guide.md) - Meet the 14+ agent roles and dynamic specialist creation

### Core System Guides
- [AgentTask System Guide](docs/agenttask-system-guide.md) - How AgentTasks work with agent coordination
- [Configuration Guide](docs/configuration-guide.md) - Complete configuration reference
- [Commands Reference](docs/commands-reference.md) - All commands and agent interactions explained
- [Hook System Guide](docs/hook-system-guide.md) - Behavioral enforcement and hook architecture
- [Hook Reminder System](docs/hooks/reminder-system.md) - Dynamic educational reminder system

### Advanced Features
- **[Template Extensions Guide](docs/template-extensions.md)** - Customize AgentTask templates without copying entire files
- **[MCP Integration Guide](docs/mcp-integration.md)** - Connect with external systems (GitHub, databases, etc.)
- [AgentTask Templates Guide](docs/agenttask-templates-guide.md) - Deep dive into AgentTask template system
- [Best Practices Guide](docs/best-practices-guide.md) - Proven patterns and methodologies

### Quick Examples
**Template Extensions** - Add project-specific requirements to any AgentTask:
```yaml
# agenttask-extensions.yaml
all:
  requirements:
    processual:
      - "Run ESLint validation"
      - "Execute security scan"
medium:
  review_checklist:
    - "Integration test coverage > 80%"
```

**MCP Integration** - Connect with external systems:
```yaml
# In CLAUDE.md
mcp_integrations:
  issue_tracking:
    provider: "mcp__github"
    project: "your-org/your-repo"
  memory:
    provider: "mcp__memory"
    config:
      database_url: "${NEO4J_URI}"
```

## Why AgentTasks with Agents?

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