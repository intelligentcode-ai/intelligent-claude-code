# Virtual Team Guide

## Overview

The intelligent-claude-code system transforms Claude into a virtual development team with 14 specialized roles that collaborate to deliver high-quality software. Each role has deep expertise and works autonomously through AgentTask-driven execution.

## Core Concepts

### Virtual Team Philosophy
- **Specialists, not generalists**: Each role has 10+ years of expertise in their domain
- **Collaborative execution**: Roles hand off work naturally through AgentTasks
- **Self-improving**: Team learns from every task and applies knowledge to future work
- **Autonomous operation**: Given clear requirements, specialists execute independently

### AgentTask (Product Requirement Blueprint)
A AgentTask is a self-contained execution blueprint that includes:
- Complete requirements and context
- Embedded best practices and standards
- Relevant code examples from your project
- Previous learnings on similar tasks
- Validation criteria and tests

Think of AgentTasks as "everything a specialist needs to complete the work in one pass."

## The 14 core roles

### Leadership & Planning
**@PM (Project Manager)**
- Analyzes requirements and creates task breakdowns
- Coordinates between roles (never codes directly)
- Ensures work aligns with business goals
- Triggers: "Plan the implementation of...", "Break down this epic..."

**@Architect**
- Designs system architecture and technical approach
- Reviews and approves technical decisions
- Selects appropriate patterns and technologies
- Triggers: "Design the architecture for...", "Review this approach..."

### Implementation Specialists
**@Developer**
- General software implementation
- Feature development and bug fixes
- Code refactoring and optimization
- Triggers: "Implement...", "Fix the bug in...", "Refactor..."

*Note: Backend and Frontend specialists are created dynamically as @[Technology]-Developer when specific technology expertise is needed (e.g., @React-Developer, @Node-Developer, @Vue-Developer)*

### Infrastructure & Operations
**@System-Engineer**
- System configuration and setup
- Performance optimization
- Infrastructure management
- Triggers: "Configure...", "Optimize system performance..."

**@DevOps-Engineer**
- CI/CD pipeline setup
- Deployment automation
- Build and release processes
- Triggers: "Setup deployment...", "Create build pipeline..."

**@Database-Engineer**
- Database design and optimization
- Query performance tuning
- Data modeling
- Triggers: "Design database schema...", "Optimize query..."

### Quality & Security
**@QA-Engineer**
- Test planning and strategy
- Quality assurance processes
- Test automation setup
- Triggers: "Create test plan...", "Setup test automation..."

**@Backend-Tester**
- API and integration testing
- Backend validation
- Performance testing
- Triggers: "Test the API...", "Validate backend..."

**@User-Role**
- End-to-end testing and browser automation
- Real user journey validation
- Triggers: "Test the signup flow...", "Validate user journey..."

**@Security-Engineer**
- Security reviews and audits
- Vulnerability assessment
- Security best practices
- Triggers: "Review security...", "Assess vulnerabilities..."

**@Reviewer**
- Critical reviews and risk assessment
- Regression checks and change impact analysis
- Triggers: "Review for regressions...", "Audit this change..."

### Specialized Domains
**@AI-Engineer**
- AI/ML system design
- Intelligent automation
- Machine learning integration
- Triggers: "Implement AI feature...", "Design ML pipeline..."

**@Web-Designer**
- UI/UX design
- Visual design and branding
- User experience optimization
- Triggers: "Design the interface...", "Create mockups..."

**@Requirements-Engineer**
- Requirements analysis
- Specification documentation
- Stakeholder communication
- Triggers: "Analyze requirements...", "Document specifications..."

## Dynamic Specialists

When technology expertise is needed, the system ALWAYS creates ultra-experienced specialists for ANY domain. This is not based on capability thresholds - specialists are created when PM + Architect determine technology expertise will improve execution:

```
Task: "Implement GraphQL subscriptions"
System: Creates @GraphQL-Developer with 10+ years GraphQL expertise

Task: "Setup Kubernetes cluster"  
System: Creates @Kubernetes-Expert with deep K8s knowledge

Task: "Implement WebRTC video chat"
System: Creates @WebRTC-Specialist with real-time communication expertise
```

## How to Work with the Team

### Natural Language Requests
Simply describe what you need:
```
"Build a user authentication system with OAuth2"
"Fix the performance issue in the dashboard"
"Add real-time notifications to the chat"
```

### Direct Role Assignment
Use @-notation for specific expertise:
```
"@Security-Engineer review the authentication flow"
"@Database-Engineer optimize the user queries"
"@AI-Engineer implement smart recommendations"
```

### Working with Drafts
Create specification documents anywhere in your project:
```
drafts/new-feature/requirements.md
specs/api-design.md
docs/feature-proposal.md
```

Then: `/icc-generate-agenttask-from-draft drafts/new-feature/`

## Interaction Patterns

### Planning Phase
1. User describes high-level goal
2. @PM analyzes and breaks down into tasks
3. @Architect reviews technical approach
4. AgentTasks generated for each task

### Execution Phase
1. Specialist receives AgentTask with full context
2. Implements solution following embedded standards
3. Validates against criteria
4. Captures new learnings

### Learning Phase
1. New patterns stored in `memory/[topic]/`
2. AgentTask patterns become learnings automatically
3. Future AgentTasks include relevant learnings
4. Team improves continuously

## Memory System

The team maintains shared memory in your project:

```
memory/
├── authentication/
│   ├── oauth2-patterns.md      # OAuth2 implementations
│   └── jwt-handling.md         # JWT patterns
├── error-handling/
│   ├── api-errors.md          # API error patterns
│   └── retry-strategies.md    # Retry approaches
└── performance/
    └── caching.md             # Caching strategies
```

- **Topic-based organization**: Related learnings grouped together
- **Newest first**: Recent learnings take precedence
- **Version controlled**: Share knowledge with your team
- **Auto-pruned**: Keeps only most relevant recent entries

## Best Practices

### Clear Requirements
The clearer your requirements, the better the output:
- ❌ "Make it better"
- ✅ "Improve API response time to under 200ms"

### Let Specialists Specialize
- Don't ask @PM to code
- Don't ask @Developer to design architecture
- Trust each role's expertise

### Leverage Memory
- Check `memory/` for existing patterns
- Build on previous solutions
- Share learnings with your team

### Progressive Enhancement
Start simple, iterate:
1. Basic implementation
2. Add tests
3. Optimize performance
4. Enhance security

## Common Workflows

### New Feature Development
```
You: "Build user profile management"
@PM: Creates task breakdown
@Architect: Designs approach
@Developer: Implements features
@QA-Engineer: Creates tests
@Security-Engineer: Reviews security
```

### Bug Fixing
```
You: "Users can't login with Google"
@Developer: Investigates issue
@Security-Engineer: Checks OAuth flow
@Backend-Tester: Validates fix
System: Stores learning for future
```

### Performance Optimization
```
You: "Dashboard loads too slowly"
@System-Engineer: Profiles performance
@Database-Engineer: Optimizes queries
@Developer: Implements caching
@QA-Engineer: Validates improvements
```

## Troubleshooting

### "No specialist available"
- System will create a dynamic specialist
- Provide context about the technology
- Specialist will have deep expertise

### "Conflicting approaches"
- @Architect resolves technical conflicts
- Clear requirements prevent most conflicts
- Memory system shares proven patterns

### "Work not progressing"
- Ensure clear requirements in AgentTask
- Review any blocking issues

---

The virtual team is designed to work the way real development teams do - with specialized expertise, natural handoffs, and continuous learning. Let them handle the implementation details while you focus on defining what needs to be built.
