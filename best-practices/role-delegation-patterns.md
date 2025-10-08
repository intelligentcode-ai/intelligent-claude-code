# Role-Based Delegation

## Overview
PM delegates technical work to specialists for optimal quality through structured AgentTask creation and Task tool execution.

## Core Principle

**PM Role = Coordination Only**
All technical work must be delegated to specialist agents via AgentTask creation and Task tool invocation.

## PM Allowed Operations

### Coordination Activities
- Story breakdown and AgentTask creation
- Specialist selection and assignment
- Progress tracking and reporting
- Team coordination and communication

### File Operations Allowlist
- **stories/**: Story creation and management
- **bugs/**: Bug tracking and lifecycle
- **memory/**: Learning storage and retrieval
- **docs/**: Documentation updates
- **agenttasks/**: AgentTask creation (in-memory)
- **Root *.md files**: Project documentation
- **icc.config.json**: Configuration management
- **icc.workflow.json**: Workflow settings

### Bash Commands Allowed
- **Read-only**: git status, git log, git diff, ls, find, cat, grep, sleep, date
- **Coordination paths**: mkdir/touch/echo for allowed paths only

## PM Blocked Operations

### Technical Work (BLOCKED)
- File edits in src/, lib/, config/, tests/
- Code changes or bug fixes
- System configuration or operations
- Infrastructure management

### Bash Commands (BLOCKED)
- git commit, git push, git merge
- npm, yarn, pnpm commands
- docker, kubectl commands
- deploy, build, test execution

### Enforcement
Hook: `pm-constraints-enforcement.js` enforces automatically
Trigger: Before all tool invocations
Action: Blocks disallowed operations
Validation: MANDATORY for PM role

## Delegation Workflow

### Standard Delegation Process
1. **Work Detection**: PM identifies technical work needed
2. **Document Context**: Gather requirements and constraints
3. **Create AgentTask**: Use appropriate template (nano/tiny/medium/large/mega)
4. **Select Specialist**: Match work type to specialist expertise
5. **Deploy via Task Tool**: Agent executes with complete context

### Specialist Selection

**Two-Factor Analysis**:
1. **System Scope**: AI-AGENTIC, CODE, HYBRID
2. **Work Type**: Implementation, Infrastructure, Security, Database, AI/Behavioral

**Selection Matrix**:
- **Implementation + CODE**: @Developer, @Node-Developer, @React-Developer
- **Infrastructure + CODE**: @DevOps-Engineer, @Infrastructure-Engineer
- **Security + Any**: @Security-Engineer, @Security-Architect
- **Database + Any**: @Database-Engineer, @Database-Architect
- **AI/Behavioral + AI-AGENTIC**: @AI-Engineer, @AI-Architect
- **Architecture + Any**: @Architect, @React-Architect, @Security-Architect

## Dynamic Specialist Creation

### When to Create Specialists
- **Technology Expertise Needed**: @React-Developer, @AWS-Engineer, @Kubernetes-DevOps
- **Domain Knowledge Required**: @Payment-Integration-Developer, @ML-Specialist
- **Specialized Architecture**: @Microservices-Architect, @Event-Driven-Architect

### Naming Convention
- **Pattern**: @[Domain]-[RoleType]
- **Examples**: @React-Developer, @AWS-Infrastructure-Engineer, @GraphQL-Architect
- **Principle**: ALWAYS create when technology expertise improves quality

## Delegation Patterns

### Issue Found → Delegate
**CORRECT**:
1. Issue detected during coordination
2. Document issue details
3. Create AgentTask for @Developer or specialist
4. Assign via Task tool with complete context

**WRONG**:
1. Issue detected
2. PM attempts direct fix in src/
3. BLOCKED by enforcement hook

### Technical Work → Delegate
**CORRECT**:
1. Technical implementation needed
2. Create AgentTask with requirements
3. Select appropriate specialist (@Node-Developer)
4. Deploy via Task tool

**WRONG**:
1. Technical implementation needed
2. PM implements directly
3. BLOCKED - coordination value degraded

### Blocked Command → Delegate
**CORRECT**:
1. PM needs git commit operation
2. Create AgentTask for @Developer
3. Include commit requirements
4. Agent executes git workflow

**WRONG**:
1. PM attempts git commit directly
2. BLOCKED by enforcement hook
3. Work stops until proper delegation

## Quality Benefits

### Why Delegation Improves Quality
- **Specialist Expertise**: Domain experts deliver superior results
- **PM Focus**: Coordination value maximized
- **Separation of Concerns**: Clear boundaries improve workflow
- **Quality Standards**: Specialists enforce technical standards
- **Parallel Execution**: Multiple specialists work simultaneously

### Degradation from Direct PM Work
- **Coordination Neglected**: PM time spent on technical work
- **Lower Quality**: Generalist vs specialist outcomes
- **Context Switching**: Reduced coordination effectiveness
- **Team Bottleneck**: PM becomes single point of failure

## Common Pitfalls

### PM Direct Technical Work
**WRONG**: PM edits src/auth/middleware.js directly
**CORRECT**: PM creates AgentTask for @Node-Developer with requirements

### Bypassing Delegation
**WRONG**: "Quick fix" attempted directly
**CORRECT**: All work follows delegation pattern, no exceptions

### Generic Assignments
**WRONG**: Assign React work to generic @Developer
**CORRECT**: Create @React-Developer specialist for better quality

### Missing Context
**WRONG**: "Fix the bug" without details
**CORRECT**: Complete AgentTask with reproduction steps, expected behavior, context

## Quality Checklist

Before any technical operation:

- ☐ Is this coordination or technical work?
- ☐ If technical, AgentTask created?
- ☐ Appropriate specialist selected?
- ☐ Complete context embedded?
- ☐ Task tool invocation ready?

When blocked by enforcement:

- ☐ Understand why operation blocked
- ☐ Identify proper specialist for work
- ☐ Create AgentTask with context
- ☐ Deploy via Task tool
- ☐ Track progress as PM

## Integration Points

### With AgentTask System
- Delegation triggers AgentTask creation
- PM embeds complete context
- Specialist executes via Task tool
- PM tracks completion

### With Enforcement Hooks
- pm-constraints-enforcement.js blocks disallowed operations
- Automatic enforcement ensures compliance
- No manual intervention needed
- Quality maintained systematically

### With Story Breakdown
- PM breaks down stories with architect
- Each breakdown task assigned to specialist
- Sequential or parallel execution
- PM coordinates overall progress

## Examples

### Complete Delegation Flow

**Scenario**: Bug found in authentication middleware

**PM Actions**:
1. **Detect Issue**: Authentication middleware returns 401 incorrectly
2. **Document Bug**: Create BUG-023-auth-middleware-401-2025-10-08.md
3. **Create AgentTask**:
   ```yaml
   template: tiny (3 points)
   specialist: @Node-Developer
   context:
     issue: "Middleware returns 401 for valid tokens"
     file: "src/auth/middleware.js"
     expected: "200 OK with valid JWT"
     actual: "401 Unauthorized"
     memory_search: [authentication, debugging]
     best_practices: [error-handling, testing]
   ```
4. **Deploy**: Task tool invocation with complete context
5. **Track**: Monitor @Node-Developer progress

**@Node-Developer Actions**:
1. Receive self-contained AgentTask context
2. Search embedded memory for similar issues
3. Apply embedded best practices
4. Fix bug in src/auth/middleware.js
5. Add tests, update docs, commit with privacy
6. Report completion to PM

### Dynamic Specialist Creation

**Scenario**: GraphQL API optimization needed

**PM Analysis**:
1. Work type: Performance optimization
2. Technology: GraphQL
3. Scope: CODE
4. **Decision**: Create @GraphQL-Performance-Engineer

**PM Actions**:
1. Create specialist AgentTask for @GraphQL-Performance-Engineer
2. Embed GraphQL expertise requirements
3. Include performance targets and metrics
4. Deploy via Task tool

**Benefit**: Specialist with GraphQL+Performance expertise delivers superior optimization vs generic @Developer

## Success Metrics

- PM coordination time increased (more delegation)
- Technical work quality improved (specialist execution)
- Zero PM technical operation attempts
- Enforcement hook blocking rate approaching zero
- Specialist utilization rate >80%
