# Role Assignment Decision Matrix

**MANDATORY:** Use two-factor analysis for ALL role assignments. Auto-correct single-factor violations.

**PURPOSE:** Systematic role selection based on project scope AND work type

## Core Principle

**Role = f(ProjectScope, WorkType)**

Role assignment MUST consider both factors:
- **Factor 1:** Project Scope (system nature)
- **Factor 2:** Work Type (specific task patterns)

## Two-Factor Decision Matrix

| Work Type | Keywords | AI-AGENTIC SYSTEM | CODE-BASED SYSTEM | HYBRID SYSTEM | Rationale |
|-----------|----------|-------------------|-------------------|---------------|-----------|
| **DevOps** | deploy, CI/CD, container, docker, kubernetes, scaling, pipeline | @DevOps-Engineer | @DevOps-Engineer | @DevOps-Engineer | Infrastructure expertise transcends project type |
| **Security** | security, vulnerability, compliance, auth, authorization, encrypt | @Security-Engineer | @Security-Engineer | @Security-Engineer | Security expertise transcends project boundaries |
| **Database** | database, schema, migration, query, SQL, performance, index | @Database-Engineer | @Database-Engineer | @Database-Engineer | Data layer expertise independent of system type |
| **AI/Behavioral** | behavioral, memory, learning, agent, PRB, pattern, decision, AI, ML, neural | @AI-Engineer | @AI-Engineer | @AI-Engineer | AI implementation across all system types |
| **Architecture** | design, architecture, pattern, structure, framework, system | @Architect | @Architect | @Architect + @AI-Engineer | System design (joint for hybrid) |
| **Testing** | test, QA, validation, quality, coverage, automation | @QA-Engineer | @Backend-Tester | @QA-Engineer + @Backend-Tester | Testing expertise by system type |
| **Documentation** | documentation, docs, README, guide, manual, API docs | @Requirements-Engineer | @Requirements-Engineer | @Requirements-Engineer | Documentation specialist across systems |
| **Implementation** | implement, feature, bug fix, refactor, code, function, API | @AI-Engineer | @Developer | @Developer (code) @AI-Engineer (behavioral) | Implementation by system type |

## Universal Role Assignments

**These roles apply regardless of project scope:**

- **@DevOps-Engineer**: All deployment, CI/CD, containerization, scaling work
- **@Security-Engineer**: All security, compliance, vulnerability work  
- **@Database-Engineer**: All database, schema, query, performance work
- **@Requirements-Engineer**: All documentation, specification, guide work
- **@PM**: All project coordination, story breakdown, task delegation
- **@Web-Designer**: All UI/UX design, user experience work
- **@User-Role**: All end-to-end testing, browser automation work

## Decision Process

### Step 1: Identify Project Scope
```
ProjectScope = complete_context.system_nature
- AI-AGENTIC SYSTEM
- CODE-BASED SYSTEM  
- HYBRID SYSTEM
```

### Step 2: Analyze Work Type
```
Parse requirements for work type keywords:
- Count keyword matches per work type category
- Select work type with highest keyword match score
- Consider context and intent beyond keywords
```

### Step 3: Apply Decision Matrix
```
Role = DecisionMatrix[ProjectScope][WorkType]
- Look up intersection in matrix
- Apply universal roles if applicable
- Validate >70% capability match
```

### Step 4: Document Rationale
```
PRB must include:
- Project scope identification method
- Work type analysis results  
- Decision matrix application
- Capability match justification
- PM + Architect collaboration evidence
```

## Example Scenarios

| Input | System Type | Work Type | Assigned Role | Rationale |
|--------|-------------|-----------|---------------|-----------|
| "Deploy behavioral framework with CI/CD" | AI-AGENTIC | DevOps | @DevOps-Engineer | Universal infrastructure expertise |
| "Implement memory aging algorithm" | AI-AGENTIC | AI/Behavioral | @AI-Engineer | Core AI-agentic system work |
| "Fix authentication bug in API" | CODE-BASED | Implementation | @Developer | Traditional code implementation |
| "Review PRB system for vulnerabilities" | AI-AGENTIC | Security | @Security-Engineer | Universal security expertise |
| "Design API-agent integration" | HYBRID | Architecture | @Architect + @AI-Engineer | Joint hybrid assessment |

## Work Type Detection Patterns

| Work Type | Primary Keywords | Secondary Keywords |
|-----------|------------------|-------------------|
| **DevOps** | deploy, CI/CD, container, docker, kubernetes | pipeline, build, infrastructure, monitoring |
| **Security** | security, vulnerability, compliance, auth | encrypt, access, permissions, audit, threat |
| **Database** | database, schema, migration, query, SQL | index, table, transaction, backup, CRUD |
| **Implementation** | implement, feature, bug fix, refactor, code | API, endpoint, service, method, function |
| **AI/Behavioral** | behavioral, memory, learning, agent, PRB | decision, intelligence, automation, ML, AI |
| **Architecture** | design, architecture, pattern, structure | system, component, integration, framework |
| **Testing** | test, QA, validation, quality, coverage | unit, integration, automation, scenario |
| **Documentation** | documentation, docs, README, guide | specification, tutorial, wiki, reference |

## Edge Cases and Overrides

### Multiple Work Types
**When requirements contain multiple work type keywords:**
1. Count keyword matches per category
2. Select primary work type (highest count)
3. Consider secondary work types for coordination
4. May require multiple role assignments

### Unclear Work Type
**When work type cannot be clearly determined:**
1. Default to project scope-appropriate general role
2. AI-AGENTIC → @AI-Engineer
3. CODE-BASED → @Developer
4. HYBRID → @Architect (for analysis)

### Domain-Specific Work
**When work requires >70% specialized domain expertise:**
1. Create dynamic specialist: @[Domain]-Engineer
2. Examples: @React-Developer, @AWS-Engineer, @GraphQL-Specialist
3. Document domain expertise requirement
4. Validate capability match for dynamic specialist

## Validation and Enforcement

### Validation Process
1. Extract system_nature from complete_context
2. Analyze work type keywords from requirements
3. Apply decision matrix (project_scope × work_type)
4. Validate >70% capability match
5. Document PM + Architect collaboration

### Enforcement & Errors
**BLOCKED**: Single-factor assignments, missing rationale, ignored matrix
**REQUIRED**: Two-factor analysis, PM + Architect collaboration
**ERRORS**: "❌ Missing work type analysis", "❌ System nature not identified", "❌ Decision matrix ignored"

## Integration Points

### With Story Breakdown
- @PM uses matrix during story breakdown process
- Architect collaboration applies decision matrix
- Role assignments documented with rationale

### With PRB Creation
- PRB templates include two-factor analysis fields
- Validation blocks PRB creation without proper analysis
- Auto-correction guides users to decision matrix

### With Learning System
- Store successful role assignment patterns
- Learn from role assignment effectiveness
- Improve decision matrix over time

---
*Two-factor role assignment decision matrix for intelligent-claude-code system*