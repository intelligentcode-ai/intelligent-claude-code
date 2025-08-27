# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories into PRBs with architect collaboration.

## Core Process

**CRITICAL:** @PM story breakdown operates in MAIN AGENT context only (NOT subagent).

### Breakdown Flow
1. **@PM reads story:** Business goals and requirements
2. **@PM analyzes project scope:** System nature and technology context
3. **@PM analyzes work type:** Specific work patterns and requirements
4. **@PM selects specialist architect:** Domain-specific architect based on two-factor analysis
5. **@PM + Specialist Architect collaborate:** Decision matrix for role selection
6. **@PM + Architect assign roles:** Two-factor analysis documented in PRB
7. **@PM creates PRBs:** MAIN AGENT ONLY with documented rationale
8. **Story selection:** Priority/complexity-based selection

## Two-Factor Analysis Process

### Factor 1: Project Scope Analysis
**MANDATORY:** PM MUST detect project scope/system nature:
- **AI-AGENTIC SYSTEM:** Behavioral patterns, memory operations, PRB frameworks
- **CODE-BASED SYSTEM:** Implementation, databases, APIs, infrastructure
- **HYBRID SYSTEM:** Both code and behavioral patterns

### Factor 2: Work Type Analysis  
**MANDATORY:** PM MUST analyze specific work type:
- **Infrastructure/DevOps:** deploy, CI/CD, container, docker, kubernetes, scaling
- **Security:** security, vulnerability, compliance, authentication, authorization
- **Database:** database, schema, migration, query, SQL, performance
- **Implementation:** implement, feature, bug fix, refactor, code, function
- **AI/Behavioral:** behavioral, memory, learning, agent, PRB, pattern
- **Architecture:** design, architecture, pattern, structure, framework

### Dynamic Specialist Architect Creation
**ALWAYS Create Specialist Architects:**
- @React-Architect, @Database-Architect, @Security-Architect, @AI-Architect
- **NEVER use generic @Architect** - precision mandatory
- **Unlimited Specialist Creation:** Based on technology expertise needs

## PRB Generation with Size Limits

### Size Management (MANDATORY)
**Single PRB:** Story analysis ≤15 points → Create one PRB
**Multiple PRBs:** Story analysis >15 points → Auto-breakdown into multiple PRBs ≤15 points each
**Sequential numbering:** PRB-001, PRB-002, PRB-003 under same parent story

### Auto-Breakdown Process
1. **Analyze complexity:** Calculate total story complexity points
2. **Sequential thinking:** If complexity >10 points, use mcp__sequential-thinking__sequentialthinking for structured analysis
3. **AUTO-BREAKDOWN:** If >15 points, use logical decomposition
4. **Generate sub-PRBs:** Each ≤15 points with specific focus
5. **Sequential numbering:** Under same parent with dependencies documented
6. **FAIL-SAFE:** If auto-breakdown fails, BLOCK with manual breakdown request

## Story Selection Criteria

@PM and Architect consider:
- **Application state:** What's built, what's needed next
- **Priority:** Business value and user impact
- **Complexity:** Technical difficulty and effort
- **Dependencies:** What needs to be built first
- **Risk:** Technical or business risks

## Story and Bug Creation Rules

**CRITICAL:** Stories and Bugs MUST NOT contain role assignments:
- **NO "Assigned:" fields** in bug reports
- **NO "@Role" assignments** in stories
- Stories/Bugs define **WHAT** needs to be done
- PRBs define **WHO** does it and **HOW**

## Simple Invocation

- "@PM break down the authentication story"
- "@PM what story should we work on next?"
- "@PM analyze the stories and create PRBs"

---
*Story breakdown with architect collaboration and auto-sizing*