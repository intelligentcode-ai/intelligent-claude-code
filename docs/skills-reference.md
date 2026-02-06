# Skills Reference

## Overview
The intelligent-claude-code system provides **33 skills** organized into categories. The primary interaction method is through **@Role communication patterns** and **skill description matching**.

## Essential Skills (4)

### icc-init-system
Initializes the virtual team system and prepares for work.

**Trigger:** Ask to initialize system or start ICC

**Examples:**
```
Initialize the ICC system
Start the virtual team with L3 autonomy
```

**What it does:**
- Loads configuration from CLAUDE.md
- Creates memory directory structure
- Activates the 14 core roles
- Sets up work queue system
- Configures autonomy level

### icc-version
Displays ICC system version, component status, and installation info.

**Trigger:** Ask about version or system status

**What it does:**
- Shows current version (v10.0.0)
- Lists installed components
- Verifies installation status

### icc-get-setting
Retrieves configuration values from the hierarchy.

**Trigger:** Ask about a configuration setting

**Examples:**
```
What is the autonomy level?
Check if git privacy is enabled
What is the default branch?
```

**Configuration hierarchy:**
1. Embedded config (in AgentTasks)
2. Project config (./config.md or CLAUDE.md)
3. User config (~/.claude/config.md - system-wide only)
4. System defaults

### icc-search-memory
Searches memory for relevant learnings and patterns.

**Trigger:** Ask to search memory or look up prior knowledge

**Examples:**
```
Search memory for oauth authentication
Look up database optimization patterns
Find error handling patterns in memory
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

The system is designed for **natural @Role communication** rather than skill-based interaction. This is the primary and preferred way to work with the system.

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

### @Role vs Skills

**Use @Role Patterns for** (Primary Usage):
- All project work and coordination
- Architecture and design decisions
- Implementation tasks
- Quality assurance
- Any specialist work

**Use Skills for** (System Functions):
- System initialization: icc-init-system
- Version check: icc-version
- Configuration queries: icc-get-setting
- Memory exploration: icc-search-memory
- Process skills: thinking, memory, best-practices, etc.

## All Skills by Category

### Role Skills (14)
pm, architect, developer, system-engineer, devops-engineer,
database-engineer, security-engineer, ai-engineer, web-designer,
qa-engineer, backend-tester, requirements-engineer, user-tester, reviewer

### Command Skills (4)
icc-version, icc-init-system, icc-search-memory, icc-get-setting

### Process Skills (11)
thinking, work-queue, memory, best-practices, validate,
autonomy, parallel-execution, workflow, mcp-config,
story-breakdown, git-privacy

### Enforcement Companion Skills (3)
file-placement, branch-protection, infrastructure-protection

### Meta Skill (1)
skill-creator - Guide for creating new skills

## Usage Patterns

### Starting New Work
```bash
Initialize the ICC system                     # System initialization
@PM Build a REST API for user management      # Natural language work request
```

### Memory Exploration
```bash
Search memory for "authentication patterns"   # Find relevant patterns
@Developer Implement OAuth based on memory    # Apply found patterns
```

### Configuration Management
```bash
What is the autonomy level?                  # Check current autonomy
Is git privacy enabled?                       # Check privacy settings
```

## Best Practices

### Effective @Role Communication
- Be specific in work descriptions
- Include success criteria
- Reference existing code/patterns when relevant
- Mention constraints upfront

### Memory Integration
- Memory searches happen automatically during @Role work
- Use the icc-search-memory skill for manual exploration only
- Learnings are stored automatically - no manual skills needed
- Memory captures patterns from successful work executions

### System Configuration
- Use the icc-get-setting skill to understand current configuration
- Configuration affects @Role behavior and work queue execution
- Settings hierarchy: Embedded → Project → User → System defaults

---

The intelligent-claude-code system prioritizes **@Role communication patterns** over skill-based interaction. The 4 essential skills provide core system functionality, while most work happens through natural language interaction with the 14-role team and unlimited dynamic specialists.
