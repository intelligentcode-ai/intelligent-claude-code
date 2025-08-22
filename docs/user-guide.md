# User Guide - Intelligent Claude Code Agent System

## Getting Started

Welcome to Intelligent Claude Code! This system transforms Claude into an intelligent virtual development team with 14+ specialized agent roles that work together to deliver high-quality software autonomously.

## Agent-Driven Development

The core concept is **agent-driven development** - instead of manually coordinating different tasks, you interact with specialized agents that handle their domains expertly and collaborate seamlessly.

### Key Concepts

- **Agents**: Specialized roles like @PM, @Developer, @Security-Engineer with deep domain expertise
- **PRBs (Product Requirement Blueprints)**: Self-contained execution plans with agent coordination
- **Dynamic Agent Creation**: System creates specialists for any technology (@React-Developer, @AWS-Engineer)
- **Cross-Agent Learning**: Agents share knowledge and learn from each other's work
- **L3 Autonomous Mode**: Full multi-agent autonomous execution without interruption

## Installation & Setup

```bash
# Clone and install
git clone https://github.com/ksamaschke/intelligent-claude-code
cd intelligent-claude-code
make install

# Initialize the agent system
/icc-init-system

# You're ready! Start working with agents
@PM Build a user authentication system
```

## Working with Agents

### Starting a Project
Instead of describing what you want manually, direct agents:

```bash
# Traditional approach (don't do this)
"I need to implement user authentication with JWT tokens..."

# Agent-driven approach (do this)
@PM Build a user authentication system with JWT tokens
```

The @PM agent will:
1. Analyze your requirements
2. Create appropriate specialist agents (@Security-Engineer, @Backend-Developer, etc.)
3. Generate PRBs with agent assignments
4. Coordinate multi-agent execution

### Core Agent Interactions

**@PM (Project Manager)**: Strategic coordination and task breakdown
```bash
@PM Build a user authentication system
@PM Break down the payment integration story
@PM What should we work on next?
```

**@Architect**: System design and technical architecture
```bash
@Architect Design the API architecture for our e-commerce platform
@Architect Review the microservices approach for this project
```

**@Developer**: General implementation and coding
```bash
@Developer Implement the user registration endpoint
@Developer Fix the authentication middleware bug
```

**Domain Specialists**: Automatic creation based on project needs
```bash
# These agents are created automatically when needed:
@Security-Engineer: Security reviews, vulnerability assessments
@DevOps-Engineer: CI/CD, deployment, infrastructure
@Database-Engineer: Database design, query optimization
@QA-Engineer: Testing strategies and quality assurance
@Backend-Tester: API testing and backend validation
@Web-Designer: UI/UX design and user experience
```

### Agent Coordination Patterns

Agents coordinate automatically through PRB execution:

1. **@PM** analyzes work and creates specialist agents
2. **Specialist agents** collaborate on technical approach
3. **@Architect** provides system design guidance
4. **Implementation agents** execute work with coordination
5. **Quality agents** validate deliverables
6. **All agents** share learnings for continuous improvement

## Memory System

The agent system includes sophisticated memory management where agents learn from every interaction and share knowledge.

### Memory Configuration

#### Default Setup (Project Memory)
```yaml
# Memory stored in ./memory/ within your project
# No configuration needed - this is the default
```

#### External Memory (Recommended for Multiple Projects)
```yaml
# In CLAUDE.md
memory_configuration:
  external_path: "~/claude-memory"     # Home directory
  external_path: "../shared-memory"   # Relative to project
  external_path: "/path/to/memory"    # Absolute path
```

#### Benefits of External Memory
- **Cross-Project Learning**: Agents apply knowledge across all your projects
- **Privacy**: Keep agent learnings separate from project code
- **Team Collaboration**: Share agent knowledge across team members
- **Git Integration**: Auto-commit memory changes when .git exists in memory path
- **Agent Continuity**: Agents remember patterns across different development sessions

### How Agents Use Memory

**Learning Capture**: Every agent interaction stores patterns, solutions, and learnings
```bash
# When @Developer fixes a bug, the learning is stored for all agents
memory/implementation/authentication-patterns.md
memory/debugging/jwt-token-issues.md
memory/collaboration/pm-developer-coordination.md
```

**Cross-Agent Knowledge Sharing**: Agents access shared memory during work
```bash
# @Security-Engineer can access @Developer's security implementation patterns
# @QA-Engineer can learn from @Backend-Tester's testing approaches
# @PM can apply lessons from previous project coordination
```

**Memory-First Operations**: All agents check memory before starting work
- Prevents repeating solved problems
- Applies previous successful patterns
- Improves quality through accumulated knowledge

## L3 Autonomous Mode

The most powerful feature is L3 autonomous mode where agents work completely independently.

### Configuring L3 Mode
```yaml
# In CLAUDE.md
autonomy_level: L3
l3_settings:
  max_parallel: 5                    # Up to 5 agents working simultaneously
  auto_discover: true                # Agents find and start work automatically
  continue_on_error: true            # Self-correction without stopping
```

### L3 Agent Behaviors

**Autonomous Work Discovery**: Agents find work automatically
- Scan project for incomplete features
- Identify technical debt and improvements
- Discover testing gaps and quality issues
- Find documentation that needs updating

**Multi-Agent Coordination**: Agents collaborate without human intervention
- @PM coordinates multiple development streams
- Specialist agents handle their domains independently
- Quality agents validate work continuously
- All agents share progress and learnings

**Continuous Learning**: Agents improve the system over time
- Learn from successful patterns
- Avoid previously encountered issues
- Optimize collaboration patterns
- Improve code quality through experience

### L3 Safety Features

Even in L3 mode, agents still require approval for:
- Destructive operations (deleting files/databases)
- Credential/secret management
- Production deployments
- Billing or cost-impacting changes

## Project Configuration

Configure your project in `CLAUDE.md` to guide agent behavior:

```yaml
# Project Context for Agents
complete_context:
  system_nature: "CODE-BASED SYSTEM"  # or "MARKDOWN-BASED AI-AGENTIC SYSTEM"
  project_root: "/absolute/path/to/project"

# Best Practices Discovery
prb_configuration:
  best_practices_paths:
    - "docs/standards/"
    - "engineering/patterns/"
    
  code_pattern_search:
    paths: ["src/", "lib/"]
    
  behavioral_overrides:
    testing_approach: "tdd"
    deployment_strategy: "blue-green"

# Memory Configuration for Agent Learning
memory_configuration:
  external_path: "~/claude-memory"

# Agent Operation Settings
autonomy_level: L2                   # L1: Manual, L2: Architect approval, L3: Full autonomous
git_privacy: true                    # Clean commits without AI mentions
branch_protection: true              # Follow branch protection strategy
default_branch: "main"
```

## Story Management

Agents excel at converting natural language stories into executable PRBs.

### Creating Stories
Write stories in `stories/` directory:

```markdown
# stories/user-authentication.md
## User Authentication Story

As a user, I want to register and log in securely so that I can access my personalized content.

### Requirements
- User registration with email/password
- JWT-based authentication
- Password reset functionality
- Session management
- Security best practices

### Acceptance Criteria
- Registration creates user account
- Login returns valid JWT token
- Password reset sends email with secure token
- Session expires appropriately
- All endpoints use HTTPS
```

### Agent-Driven Story Breakdown
```bash
@PM break down user-authentication story
```

This triggers:
1. **@PM** reads the story and analyzes requirements
2. **@PM** creates specialist agents (@Auth-Engineer, @Security-Engineer, @Backend-Developer)
3. **Agent team** collaborates on technical approach
4. **@PM** generates PRBs with agent assignments
5. **Agents execute** PRBs collaboratively
6. **@PM** tracks progress and coordinates completion

## Advanced Agent Features

### Dynamic Specialist Creation

Agents automatically create specialists for any technology domain:

```bash
@PM Build a React Native mobile app
# Creates: @React-Native-Developer, @Mobile-UI-Designer, @iOS-Engineer, @Android-Engineer

@PM Implement machine learning recommendations
# Creates: @ML-Engineer, @Data-Scientist, @Model-Training-Specialist

@PM Set up Kubernetes deployment
# Creates: @Kubernetes-Engineer, @DevOps-Architect, @Container-Specialist
```

### Agent Collaboration Patterns

**PM + Architect Partnership**: Strategic and technical collaboration
```bash
# @PM handles business coordination
# @Architect provides technical guidance
# Together they create specialist agents and coordinate work
```

**Specialist Agent Teams**: Domain experts working together
```bash
# @Frontend-Developer + @Web-Designer for UI work
# @Backend-Developer + @Database-Engineer for API work
# @Security-Engineer + @DevOps-Engineer for deployment security
```

**Quality Agent Integration**: Continuous validation
```bash
# @QA-Engineer plans testing strategy
# @Backend-Tester handles API validation
# @Security-Engineer performs security reviews
# All quality agents share testing knowledge
```

### Cross-Agent Learning Examples

**Implementation Patterns**: When @Developer solves a complex problem, other agents learn the approach

**Security Patterns**: When @Security-Engineer identifies vulnerabilities, all agents learn to avoid them

**Architecture Decisions**: When @Architect selects patterns, implementation agents understand the reasoning

**Testing Strategies**: When @QA-Engineer develops test approaches, all agents understand quality expectations

## Troubleshooting

### Agent Not Responding
```bash
# Check system initialization
/icc-init-system

# Verify agent syntax (use @ prefix)
@PM instead of PM or pm
```

### Memory Issues
```bash
# Check memory path configuration
# Ensure memory directory exists and is writable
# Verify external_path setting in CLAUDE.md
```

### L3 Autonomous Mode Issues
```bash
# Check autonomy_level setting
# Verify l3_settings configuration
# Ensure agents have necessary permissions
```

### Agent Coordination Problems
```bash
# Clear communication with @PM for coordination
# Ensure PRBs include proper agent assignments
# Check that specialized agents are being created appropriately
```

## Best Practices

### Effective Agent Communication
- Always use @Agent syntax for clarity
- Be specific about requirements and constraints
- Let @PM coordinate multi-agent work
- Trust agents to create appropriate specialists

### Memory Management
- Use external memory for cross-project learning
- Let agents store learnings automatically
- Regularly review memory for insights
- Share memory paths across team members

### Project Organization
- Maintain clear CLAUDE.md configuration
- Organize stories in logical groups
- Let agents handle PRB generation
- Focus on business requirements, not implementation details

### Quality Assurance
- Let quality agents handle validation
- Trust cross-agent collaboration for comprehensive review
- Use agent memory to avoid repeating issues
- Leverage agent learning for continuous improvement

---

**Ready to experience agent-driven development?** Start with `@PM Build a [your project idea]` and watch your virtual development team collaborate to bring it to life!