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
- First errors create learnings (no penalty)
- Repeated errors get penalties  
- Applies previous learnings automatically
- Continuous improvement through memory patterns

### 🧠 Memory-First Operations
- All operations check memory before action
- Automatic pattern capture and storage
- Memory pattern application tracking
- Version-controlled in memory/ directory
- Topic-based organization with auto-pruning

### ⚡ Autonomous Operation
- **L1**: Manual approval required
- **L2**: Architect approval (default)
- **L3**: Fully autonomous execution

### 🔧 Adapts to YOUR Project
Configure in CLAUDE.md where your docs/standards are. System finds and includes them automatically in PRBs.

## How It Works

1. **Request Work** → "Implement OAuth2 login"
2. **Memory Check** → Search for existing patterns/learnings
3. **Analyze Complexity** → System scores complexity (with PM + Architect for Large/Mega)
4. **Generate PRB** → Self-contained blueprint with embedded context
5. **Specialist Executes** → Single-pass implementation
6. **Git Integration** → Auto version bump + commit + push
7. **Learn & Store** → Capture new patterns in memory/

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

## Key Commands

```bash
/icc-init-system              # Initialize system
/icc-create-prb               # Generate PRB for work
/icc-generate-prb-from-draft  # From your specifications
/icc-create-specialist        # Dynamic role creation
/icc-think-sequential         # Complex problem solving
/icc-store-memory            # Save learnings (auto-prunes)
```

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
```

## Directory Structure

```
your-project/
├── CLAUDE.md                  # Your config
├── docs/                      # Your docs (anywhere)
├── src/                       # Your code
├── stories/                   # User stories for PRB generation
│   └── drafts/                # Work-in-progress stories
├── memory/                    # Version-controlled learnings
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