# Role Assignment Decision Matrix

**MANDATORY:** Use two-factor analysis for ALL role assignments. Auto-correct single-factor violations.

**PURPOSE:** Systematic role selection based on project scope AND work type

## Core Principle

**Role = f(ProjectScope, WorkType)**

Role assignment MUST consider both factors:
- **Factor 1:** Project Scope (system nature)
- **Factor 2:** Work Type (specific task patterns)

## Two-Factor Decision Matrix

### AI-AGENTIC SYSTEM Projects

| Work Type | Keywords | Role Selection Pattern | PM + Specialist Architect Collaboration |
|-----------|----------|------------------------|-------------------------------------------|
| **DevOps** | deploy, CI/CD, container, docker, kubernetes, scaling, pipeline | Universal: Always @DevOps-Engineer | PM + @DevOps-Architect → Domain-specific infrastructure specialist |
| **Security** | security, vulnerability, compliance, auth, authorization, encrypt | Universal: Always @Security-Engineer | PM + @Security-Architect → Domain-specific security specialist |
| **Database** | database, schema, migration, query, SQL, performance, index | Universal: Always @Database-Engineer | PM + @Database-Architect → Domain-specific data specialist |
| **AI/Behavioral** | behavioral, memory, learning, agent, PRB, pattern, decision | Dynamic: Create specialist for domain | PM + @AI-Architect → @[Domain]-AI-Engineer (e.g., @Memory-AI-Engineer, @Behavioral-AI-Engineer) |
| **Architecture** | design, architecture, pattern, structure, framework, system | Dynamic: Create domain architect | PM + @System-Architect → @[Domain]-Architect (e.g., @Behavioral-Architect, @AI-System-Architect) |
| **Testing** | test, QA, validation, quality, coverage, automation | Dynamic: Create testing specialist | PM + @Testing-Architect → @[Domain]-Tester (e.g., @Behavioral-Tester, @AI-System-Tester) |
| **Documentation** | documentation, docs, README, guide, manual, API docs | Universal: Always @Requirements-Engineer | PM + @Documentation-Architect → Domain-specific documentation specialist |
| **Implementation** | implement, feature, bug fix, refactor, code | Dynamic: Create implementation specialist | PM + @AI-Architect → @[Domain]-Developer (e.g., @Behavioral-Developer, @AI-System-Developer) |

### CODE-BASED SYSTEM Projects

| Work Type | Keywords | Role Selection Pattern | PM + Specialist Architect Collaboration |
|-----------|----------|------------------------|-------------------------------------------|
| **DevOps** | deploy, CI/CD, container, docker, kubernetes, scaling, pipeline | Universal: Always @DevOps-Engineer | PM + @DevOps-Architect → Domain-specific infrastructure specialist |
| **Security** | security, vulnerability, compliance, auth, authorization, encrypt | Universal: Always @Security-Engineer | PM + @Security-Architect → Domain-specific security specialist |
| **Database** | database, schema, migration, query, SQL, performance, index | Universal: Always @Database-Engineer | PM + @Database-Architect → Domain-specific data specialist |
| **AI/Behavioral** | AI, ML, machine learning, neural, model, prediction | Dynamic: Create AI implementation specialist | PM + @AI-Architect → @[Technology]-AI-Engineer (e.g., @TensorFlow-AI-Engineer, @PyTorch-AI-Engineer) |
| **Architecture** | design, architecture, pattern, structure, framework, system | Dynamic: Create domain architect | PM + @System-Architect → @[Domain]-Architect (e.g., @Microservice-Architect, @API-Architect) |
| **Testing** | test, QA, validation, quality, coverage, automation, unit, integration | Dynamic: Create testing specialist | PM + @Testing-Architect → @[Stack]-Tester (e.g., @Backend-Tester, @API-Tester) |
| **Documentation** | documentation, docs, README, guide, manual, API docs | Universal: Always @Requirements-Engineer | PM + @Documentation-Architect → Domain-specific documentation specialist |
| **Implementation** | implement, feature, bug fix, refactor, code, function, API | Dynamic: Create implementation specialist | PM + @Code-Architect → @[Technology]-Developer (e.g., @React-Developer, @Node-Developer) |

### HYBRID SYSTEM Projects

| Work Type | Keywords | Role Selection Pattern | PM + Specialist Architect Collaboration |
|-----------|----------|------------------------|-------------------------------------------|
| **DevOps** | deploy, CI/CD, container, docker, kubernetes, scaling, pipeline | Universal: Always @DevOps-Engineer | PM + @DevOps-Architect → Domain-specific infrastructure specialist |
| **Security** | security, vulnerability, compliance, auth, authorization, encrypt | Universal: Always @Security-Engineer | PM + @Security-Architect → Domain-specific security specialist |
| **Database** | database, schema, migration, query, SQL, performance, index | Universal: Always @Database-Engineer | PM + @Database-Architect → Domain-specific data specialist |
| **AI/Behavioral** | behavioral, memory, learning, agent, PRB, pattern | Dynamic: Create AI-behavioral specialist | PM + @AI-Architect → @[Domain]-AI-Engineer (AI-agentic portions) |
| **Code Implementation** | implement, feature, bug fix, refactor, code, function, API | Dynamic: Create code implementation specialist | PM + @Code-Architect → @[Technology]-Developer (traditional code portions) |
| **Architecture** | design, architecture, pattern, structure, framework, system | Joint: Multiple specialist architects | PM + @System-Architect + @AI-Architect → Joint architectural assessment |
| **Testing** | test, QA, validation, quality, coverage | Joint: Multiple testing specialists | PM + @Testing-Architect → @[Domain]-Tester + @[Stack]-Tester (hybrid testing approach) |
| **Documentation** | documentation, docs, README, guide, manual | Universal: Always @Requirements-Engineer | PM + @Documentation-Architect → Domain-specific documentation specialist |

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
1. PM + Specialist Architect collaboration to analyze requirements
2. AI-AGENTIC → PM + @AI-Architect → Create appropriate specialist
3. CODE-BASED → PM + @Code-Architect → Create appropriate specialist
4. HYBRID → PM + @System-Architect + @AI-Architect → Joint analysis and specialist creation

### Domain-Specific Work
**ALWAYS create dynamic specialists for precise expertise matching:**
1. Create specialist for specific domain: @[Domain]-Engineer
2. Examples: @React-Developer, @AWS-Engineer, @GraphQL-Specialist, @Memory-AI-Engineer
3. Document domain expertise and specialist creation rationale
4. PM + Specialist Architect must collaborate to define specialist role
5. No generic fallbacks - precision is mandatory

## Validation and Enforcement

### Pre-Assignment Validation
```
ValidateTwoFactorAnalysis(requirements, context):
  1. project_scope = ExtractSystemNature(context.complete_context)
  2. work_type = AnalyzeWorkTypeKeywords(requirements)
  3. specialist_architect = SelectSpecialistArchitect(project_scope, work_type)
  4. role = PMArchitectCollaboration(project_scope, work_type, specialist_architect)
  5. DocumentSpecialistCreation(project_scope, work_type, role, rationale)
```

### Enforcement Rules
- **BLOCK**: Single-factor role assignments
- **BLOCK**: Role assignments without PM + Specialist Architect collaboration
- **BLOCK**: Use of generic engineers when specialists should be created
- **BLOCK**: Hardcoded role assignments ignoring dynamic creation patterns
- **REQUIRE**: PM + Specialist Architect collaboration evidence
- **REQUIRE**: Two-factor analysis documentation
- **REQUIRE**: Specialist creation rationale

### Error Messages
- "❌ Single-factor analysis detected - work type analysis missing"
- "❌ Project scope not identified - check complete_context.system_nature"  
- "❌ Generic role assigned - create domain-specific specialist instead"
- "❌ PM + Specialist Architect collaboration missing - enforce collaboration process"
- "❌ Specialist creation not documented - provide creation rationale"

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