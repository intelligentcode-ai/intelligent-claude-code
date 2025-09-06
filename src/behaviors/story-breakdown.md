# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories into PRBs with architect collaboration.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/context-validation.md
@./shared-patterns/behavioral-decision-matrix.md

## COMPACT-RESISTANT PM ENFORCEMENT

**ULTRA-SHORT CORE:** PM=COORDINATION-ONLY (NO WORK EXECUTION EVER)

**CONTEXT-CHECKPOINT:** PM→PRB→DELEGATE (NEVER PM→WORK)

## PM Role Nuclear Work Prohibition

**ABSOLUTE RULE:** @PM role is COORDINATION ONLY - ZERO work execution permitted.

### PM Nuclear Work Blocking
**PM WORK VIOLATIONS (ABSOLUTELY BLOCKED):**
- Direct file modifications (Edit/Write/MultiEdit tools)
- Code changes or implementation work
- System configuration or deployment
- Bug fixes or technical corrections
- ANY tool usage except Read operations and PRB creation

**PM NUCLEAR ERROR MESSAGE:**
**PM WORK EXECUTION ABSOLUTELY FORBIDDEN**
- ROLE: @PM (Project Manager)
- VIOLATION: Attempted direct work execution

**PM ROLE BOUNDARIES:**
- ALLOWED: Story analysis, PRB creation, role coordination
- FORBIDDEN: ANY work execution, file operations, technical fixes

**ARCHITECTURAL RULE:** PM = COORDINATION ONLY
**REQUIRED ACTION:** Create PRB and delegate to appropriate specialist

**NO EXCEPTIONS - NO SHORTCUTS - NO TECHNICAL WORK**

### PM Validation→PRB Pattern
**MANDATORY:** When PM identifies issues during validation:
1. **Issue Found** → Document in findings
2. **Create PRB** → Generate appropriate work item
3. **Delegate Work** → Assign to specialist role
4. **NEVER Fix Directly** → PM does not perform technical work

## Core Process

**CRITICAL:** @PM story breakdown operates in MAIN AGENT context only (NOT subagent).

### Breakdown Flow

**CHECKPOINT-REMINDER:** PM=COORDINATION-ONLY, PM→PRB→DELEGATE

1. **@PM reads story**: Business goals and requirements
2. **@PM analyzes project scope**: System nature and technology context
3. **@PM analyzes work type**: Specific work patterns and requirements
4. **@PM selects specialist architect**: Domain-specific architect based on two-factor analysis
5. **@PM + Specialist Architect collaborate**: Decision matrix for role selection
6. **@PM + Architect assign roles**: Two-factor analysis documented in PRB
7. **@PM creates PRBs**: MAIN AGENT ONLY with documented rationale
8. **Story selection**: Priority/complexity-based selection

## Two-Factor Analysis Process

### Factor 1: Project Scope Analysis
**MANDATORY:** PM MUST detect project scope/system nature:
- **AI-AGENTIC SYSTEM**: Behavioral patterns, memory operations, PRB frameworks
- **CODE-BASED SYSTEM**: Implementation, databases, APIs, infrastructure
- **HYBRID SYSTEM**: Both code and behavioral patterns

### Factor 2: Work Type Analysis
**MANDATORY:** PM MUST analyze specific work type:
- **Infrastructure/DevOps**: deploy, CI/CD, container, docker, kubernetes, scaling
- **Security**: security, vulnerability, compliance, authentication, authorization
- **Database**: database, schema, migration, query, SQL, performance
- **Implementation**: implement, feature, bug fix, refactor, code, function
- **AI/Behavioral**: behavioral, memory, learning, agent, PRB, pattern
- **Architecture**: design, architecture, pattern, structure, framework

### Dynamic Specialist Architect Creation
**ALWAYS Create Specialist Architects:**
- @React-Architect, @Database-Architect, @Security-Architect, @AI-Architect
- **NEVER use generic @Architect** - precision mandatory
- **Unlimited Specialist Creation**: Based on technology expertise needs

## PRB Generation with Size Limits

### Size Management (MANDATORY)
**Single PRB**: Story analysis ≤15 points → Create one PRB
**Multiple PRBs**: Story analysis >15 points → Auto-breakdown into multiple PRBs ≤15 points each
**Sequential numbering**: PRB-001, PRB-002, PRB-003 under same parent story

### Auto-Breakdown Process
1. **Analyze complexity**: Calculate total story complexity points
2. **Sequential thinking**: ALWAYS use mcp__sequential-thinking__sequentialthinking for ALL story analysis with project context
3. **AUTO-BREAKDOWN**: If >15 points, use logical decomposition with sequential thinking framework
4. **Generate sub-PRBs**: Each ≤15 points with specific focus and project scope awareness
5. **Sequential numbering**: Under same parent with dependencies documented
6. **FAIL-SAFE**: If auto-breakdown fails, BLOCK with manual breakdown request

## Story Selection Criteria

@PM and Architect consider:
- **Application state**: What's built, what's needed next
- **Priority**: Business value and user impact
- **Complexity**: Technical difficulty and effort
- **Dependencies**: What needs to be built first
- **Risk**: Technical or business risks

## Story and Bug Creation Rules

**CRITICAL:** Stories and Bugs MUST NOT contain role assignments:
- **NO "Assigned:" fields** in bug reports
- **NO "@Role" assignments** in stories
- Stories/Bugs define **WHAT** needs to be done
- PRBs define **WHO** does it and **HOW**

## PM Tool Access Control

**NUCLEAR BLOCKING:** PM role has RESTRICTED tool access with AGGRESSIVE detection:
- **ALLOWED TOOLS:** Read, LS, Glob, Grep (information gathering only)
- **BLOCKED TOOLS:** Edit, Write, MultiEdit, Bash (system operations)
- **PRB CREATION:** Only non-technical PRB generation permitted
- **DETECTION:** Ultra-aggressive work pattern detection for PM violations

**PM TOOL VIOLATION ERROR:**
**PM TOOL ACCESS ABSOLUTELY DENIED**
- ROLE: @PM (Project Manager)
- TOOL: [Edit/Write/MultiEdit/Bash]
- VIOLATION: PM attempting technical work execution

**ARCHITECTURAL VIOLATION:** PM EXECUTING WORK DIRECTLY

**PM ROLE BOUNDARIES:**
- Information gathering: ALLOWED
- PRB creation: ALLOWED  
- Work execution: ABSOLUTELY FORBIDDEN
- Technical operations: ABSOLUTELY FORBIDDEN
- File modifications: NUCLEAR BLOCKED
- System changes: NUCLEAR BLOCKED

**MANDATORY RECOVERY PROCESS:**
1. Create PRB with clear requirements
2. Delegate to appropriate specialist (@AI-Engineer, @Developer, etc.)
3. Deploy via Task tool to authorized agent
4. NEVER perform technical work directly

**PM = COORDINATION ONLY - NO TECHNICAL EXECUTION**

**AGGRESSIVE PM WORK DETECTION:**
- **Work Intent Patterns:** "Let me fix", "I'll update", "Going to change", "Need to modify"
- **Direct Action Attempts:** Any Edit/Write/MultiEdit tool usage by PM role
- **Bypass Patterns:** "Quick change", "Simple fix", "Just need to..."
- **IMMEDIATE BLOCKING:** All detected patterns trigger nuclear PRB creation requirement

## PM Delegation Enforcement

**MANDATORY PATTERN:** All PM-identified work MUST be delegated:
1. **Analysis Phase:** PM reviews, identifies needs
2. **Documentation Phase:** PM creates clear PRB with requirements
3. **Delegation Phase:** PM assigns to specialist (@AI-Engineer, @Developer, etc.)
4. **Coordination Phase:** PM tracks progress and provides guidance
5. **NEVER Execution Phase:** PM never performs technical work directly

## Simple Invocation

- "@PM break down the authentication story"
- "@PM what story should we work on next?"
- "@PM analyze the stories and create PRBs"

---
*Story breakdown with architect collaboration and auto-sizing*