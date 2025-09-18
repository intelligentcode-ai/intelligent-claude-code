# Commands Reference

## Overview
The intelligent-claude-code system provides **only 3 essential commands** for specific system functions. The primary interaction method is through **@Role communication patterns** rather than command-based interaction.

## Essential Commands (Only 3)

### `/icc-init-system`
Initializes the virtual team system and prepares for work.

**Usage:** `/icc-init-system [autonomy_level]`

**Examples:**
```bash
/icc-init-system          # Initialize with default settings
/icc-init-system L3       # Initialize with full autonomy
```

**What it does:**
- Loads configuration from CLAUDE.md
- Creates memory directory structure
- Activates the 14 core roles
- Sets up AgentTask system
- Configures autonomy level

### `/icc-get-setting [key]`
Retrieves configuration values from the hierarchy.

**Usage:** `/icc-get-setting [setting_name]`

**Examples:**
```bash
/icc-get-setting autonomy_level     # Returns: L2
/icc-get-setting git_privacy        # Returns: true
/icc-get-setting default_branch     # Returns: main
```

**Configuration hierarchy:**
1. Embedded config (in AgentTasks)
2. Project config (./config.md or CLAUDE.md)
3. User config (~/.claude/config.md - system-wide only)
4. System defaults

### `/icc-search-memory [query]`
Searches memory for relevant learnings and patterns.

**Usage:** `/icc-search-memory "[search terms]"`

**Examples:**
```bash
/icc-search-memory "oauth authentication"
/icc-search-memory "database optimization"
/icc-search-memory "error handling patterns"
```

**Used for:**
- Manual memory exploration
- Pattern investigation
- Learning discovery

**Results include:**
- Topic location
- Entry date
- Relevance score
- Preview snippet

## Primary Interaction: @Role Communication

The system is designed for **natural @Role communication** rather than command-based interaction. This is the primary and preferred way to work with the system.

### Core @Role Patterns

**Project Management:**
```bash
@PM Build me a [project]        # Start any project with PM coordination
@PM break down [story]          # Convert story to AgentTasks
@PM what story next?            # Select next story with architect
@PM status update               # Get project status and next actions
```

**Architecture and Design:**
```bash
@Architect Design the API       # Request architecture design
@Architect review [component]   # Architecture review request
@Database-Architect design schema  # Specialized architecture
```

**Implementation Work:**
```bash
@Developer Implement auth       # Assign implementation task
@Developer fix [bug]            # Bug fix assignment
@AI-Engineer optimize behavior  # AI/behavioral improvements
```

**Quality and Operations:**
```bash
@Security-Engineer Review       # Request security review
@QA-Engineer test [feature]     # Quality assurance request
@DevOps-Engineer deploy [env]   # Deployment operations
```

### How @Role Communication Works

1. **Natural Language**: Simply mention @Role with your request
2. **AgentTask Creation**: System creates appropriate AgentTask automatically
3. **Agent Execution**: Work executes through Task tool with specialist agents
4. **Memory Storage**: Learnings captured automatically during work

### Dynamic Specialist Creation

The system automatically creates specialists for ANY technology domain when expertise is needed:

**Examples:**
- `@React-Developer` - Frontend React expertise
- `@AWS-Engineer` - Cloud infrastructure specialist
- `@Kubernetes-DevOps-Engineer` - Container orchestration
- `@ML-Specialist` - Machine learning and AI systems
- `@Vue-Frontend-Developer` - Vue.js frontend development

### @Role vs Commands

**Use @Role Patterns for** (Primary Usage):
- All project work and coordination
- Architecture and design decisions
- Implementation tasks
- Quality assurance
- Any specialist work

**Use Commands for** (System Functions Only):
- System initialization: `/icc-init-system`
- Configuration queries: `/icc-get-setting`
- Memory exploration: `/icc-search-memory`

## Usage Patterns

### Starting New Work
```bash
/icc-init-system                              # Initialize system once
@PM Build a REST API for user management      # Natural language work request
```

### Memory Exploration
```bash
/icc-search-memory "authentication patterns"  # Find relevant patterns
@Developer Implement OAuth based on memory    # Apply found patterns
```

### Configuration Management
```bash
/icc-get-setting autonomy_level              # Check current autonomy
/icc-get-setting git_privacy                 # Check privacy settings
```

## Best Practices

### Effective @Role Communication
- Be specific in work descriptions
- Include success criteria
- Reference existing code/patterns when relevant
- Mention constraints upfront

### Memory Integration
- Memory searches happen automatically during @Role work
- Use `/icc-search-memory` for manual exploration only
- Learnings are stored automatically - no manual commands needed
- Memory captures patterns from successful AgentTask executions

### System Configuration
- Use `/icc-get-setting` to understand current configuration
- Configuration affects @Role behavior and AgentTask execution
- Settings hierarchy: Embedded → Project → User → System defaults

---

The intelligent-claude-code system prioritizes **@Role communication patterns** over command-based interaction. The 3 essential commands provide core system functionality, while most work happens through natural language interaction with the 14-role team and unlimited dynamic specialists.