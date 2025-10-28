# Story Breakdown Behavior

@PM breaks down stories into AgentTasks with architect collaboration.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/context-validation.md
@./shared-patterns/behavioral-decision-matrix.md

## PM Role Rules

PM role is coordination only - no work execution permitted.

PM work violations (blocked):
- Direct file modifications (Edit/Write/MultiEdit tools)
- Code changes or implementation work
- System configuration or deployment
- Bug fixes or technical corrections
- Tool usage except Read operations and AgentTask creation

PM role boundaries:
- Allowed: Story analysis, AgentTask creation, role coordination
- Forbidden: Work execution, file operations, technical fixes

PM validation pattern:
1. Issue found → Document in findings
2. Create AgentTask → Generate appropriate work item
3. Delegate work → Assign to specialist role
4. Never fix directly → PM does not perform technical work

## Core Process

@PM story breakdown operates in main agent context only.

Breakdown flow:
1. @PM reads story: Business goals and requirements
2. @PM analyzes project scope: System nature and technology context
3. @PM analyzes work type: Specific work patterns and requirements
4. @PM selects specialist architect: Domain-specific architect based on two-factor analysis
5. @PM + Specialist Architect collaborate: Decision matrix for role selection
6. @PM + Architect assign roles: Two-factor analysis documented in AgentTask
7. @PM creates AgentTasks: Main agent only with documented rationale
8. Story selection: Priority/complexity-based selection

## Two-Factor Analysis

Factor 1: Project scope analysis
- AI-AGENTIC SYSTEM: Behavioral patterns, memory operations, AgentTask frameworks
- CODE-BASED SYSTEM: Implementation, databases, APIs, infrastructure
- HYBRID SYSTEM: Both code and behavioral patterns

Factor 2: Work type analysis
- Infrastructure/DevOps: deploy, CI/CD, container, docker, kubernetes, scaling
- Security: security, vulnerability, compliance, authentication, authorization
- Database: database, schema, migration, query, SQL, performance
- Implementation: implement, feature, bug fix, refactor, code, function
- AI/Behavioral: behavioral, memory, learning, agent, AgentTask, pattern
- Architecture: design, architecture, pattern, structure, framework

Dynamic specialist architect creation:
- Always create specialist architects: @React-Architect, @Database-Architect, @Security-Architect, @AI-Architect
- Never use generic @Architect - precision required
- Unlimited specialist creation based on technology expertise needs

## AgentTask Generation

Size management:
- Stories broken into nano/tiny/medium AgentTasks ≤15 points
- Maximum executable AgentTask: 15 points (medium) - no exceptions
- Work >15 points: Create STORY in ./stories/ for breakdown first
- Sequential numbering: AgentTask-001, AgentTask-002, AgentTask-003 under same parent story

Auto-breakdown process:
1. Analyze complexity: Calculate total story complexity points
2. Sequential thinking: Use mcp__sequential-thinking__sequentialthinking for story analysis with project context
3. Breakdown enforcement: Decompose into nano/tiny/medium AgentTasks ≤15 points using sequential thinking
4. Generate sub-AgentTasks: Each ≤15 points with specific focus and project scope awareness
5. Sequential numbering: Under same parent with dependencies documented
6. Direct execution: Pass AgentTask context to Task tool (NO file writes)
7. Fail-safe: If auto-breakdown fails, block with manual breakdown request

## Story Selection

@PM and Architect consider:
- Application state: What's built, what's needed next
- Priority: Business value and user impact
- Complexity: Technical difficulty and effort
- Dependencies: What needs to be built first
- Risk: Technical or business risks

## Creation Rules

Stories and bugs must not contain role assignments:
- No "Assigned:" fields in bug reports
- No "@Role" assignments in stories
- Stories/Bugs define what needs to be done
- AgentTasks define who does it and how

## Tool Access Control

PM role has restricted tool access:
- Allowed tools: Read, LS, Glob, Grep (information gathering only)
- Blocked tools: Edit, Write, MultiEdit, Bash (system operations)
- AgentTask creation: Only non-technical AgentTask generation permitted

PM tool violation response:
- Tool access denied for modification tools
- Create AgentTask with clear requirements
- Delegate to appropriate specialist (@AI-Engineer, @Developer, etc.)
- Deploy via Task tool to authorized agent

PM work detection patterns:
- Work intent patterns: "Let me fix", "I'll update", "Going to change", "Need to modify"
- Direct action attempts: Any Edit/Write/MultiEdit tool usage by PM role
- Bypass patterns: "Quick change", "Simple fix", "Just need to..."

## Delegation Pattern

All PM-identified work must be delegated:
1. Analysis phase: PM reviews, identifies needs
2. Documentation phase: PM creates clear AgentTask with requirements
3. Delegation phase: PM assigns to specialist (@AI-Engineer, @Developer, etc.)
4. Coordination phase: PM tracks progress and provides guidance
5. Never execution phase: PM never performs technical work directly

## Invocation

Simple invocation patterns:
- "@PM break down the authentication story"
- "@PM what story should we work on next?"
- "@PM analyze the stories and create AgentTasks"

---
*Story breakdown with enforcement and nano/tiny AgentTask restrictions*