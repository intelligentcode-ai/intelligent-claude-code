# Advanced Features Module

## Memory Integration System

**AUTO MEMORY CREATION:** MCP Memory integration enables persistent knowledge capture & relationship tracking across all team interactions.

**ENTITY SCHEMA:**
```
CORE ENTITY TYPES:
- User: Personal prefs, working styles, comm patterns
- Project: Tech reqs, constraints, business context
- Role: Specialized knowledge, expertise patterns, successful approaches
- Pattern: Recurring solutions, anti-patterns, optimization strategies
- Context: Environmental factors, team dynamics, project history
```

**MEMORY TRIGGER POINTS (15 AUTO):**
User Preferences, Project Context, Role Expertise, Pattern Recognition, Req Relationships, Tech Decisions, Stakeholder Mapping, Process Optimization, Error Patterns, Integration Knowledge, Perf Insights, Security Patterns, Testing Strategies, Docs Patterns, Deployment Wisdom

**MEMORY TOOLS:**
- **mcp__memory__create_entities** - Auto-create User/Project/Role/Pattern entities
- **mcp__memory__search_nodes** - Query existing knowledge before new entity creation
- **mcp__memory__add_observations** - Append new insights to existing entities
- **mcp__memory__create_relations** - Establish connections between entities
- **mcp__memory__open_nodes** - Retrieve specific entity details for context

**AUTO MEMORY WORKFLOW:**
```
1. CONTEXT SEARCH: mcp__memory__search_nodes query for existing entities
2. ENTITY CREATION: mcp__memory__create_entities for new entities
3. RELATIONSHIP MAPPING: mcp__memory__create_relations between entities
4. OBSERVATION CAPTURE: mcp__memory__add_observations for insights
5. KNOWLEDGE RETRIEVAL: mcp__memory__open_nodes for context
```

**ROLE-SPECIFIC MEMORY:**
- **@PM:** Project context, user prefs, team dynamics, workflow patterns
- **@Architect:** Tech decisions, system patterns, integration approaches, trade-off analysis
- **@Developer:** Implementation patterns, debugging strategies, code quality approaches
- **@Security-Engineer:** Threat patterns, mitigation strategies, compliance reqs
- **@DevOps-Engineer:** Deployment patterns, infra configs, monitoring approaches
- **@Database-Engineer:** Schema patterns, perf optimizations, data arch
- **@AI-Engineer:** Model selection, prompt patterns, integration strategies, perf tuning
- **@Web-Designer:** Design patterns, UX insights, accessibility approaches
- **@QA-Engineer:** Testing strategies, quality metrics, process improvements
- **@Requirements-Engineer:** Business context, stakeholder patterns, req relationships

**MEMORY ENHANCEMENT PROTOCOL:**
1. **AUTO CAPTURE:** All roles auto create memory entities during work
2. **RELATIONSHIP TRACKING:** Establish connections between entities for context preservation
3. **PATTERN RECOGNITION:** Identify recurring solutions & successful approaches
4. **CONTEXT PRESERVATION:** Maintain project history & team knowledge across sessions
5. **INTELLIGENT RETRIEVAL:** Search existing knowledge before creating new entities

## Git Workflow Protocol

**MANDATORY GIT STANDARDS:** Create feature branch for significant change • NEVER mention Claude Code, AI, or auto tools • Create MR when complete • Merge only after approval • Push timing based on team level

**BRANCH NAMING:** `feature/[component]-[description]` • `bugfix/[issue]-[description]` • `hotfix/[critical-fix]`

**COMMIT MESSAGES:** `[component]: Brief description` 
*Examples:* `auth: Implement JWT token validation` • `database: Add user schema migration` • `frontend: Update responsive design layout` • `security: Add password hashing w/ bcrypt`

**FORBIDDEN IN COMMITS:** ❌ "Generated w/ Claude Code" • ❌ "AI-assisted dev" • ❌ "Co-Authored-By: Claude" • ❌ Any AI tool mentions

**WORKFLOW BY TEAM LEVEL:**
| Level | Branching | Push | MR Creation | Approval |
|-------|-----------|------|-------------|----------|
| 1 | All changes | User approval | User approval | User |
| 2 | All changes | Auto (small) | Auto (big) | User (big), PM (small) |
| 3 | All changes | Auto | Auto | Architect |

**MR STANDARDS:** Title: `[Component]: Brief description` • Template: Changes Made, Testing Completed, Tech Notes • Approval: Level 1 (User), Level 2 (User/PM), Level 3 (Architect) • Protection: MR only, no direct main commits, tests pass, branch cleanup

## AUTO GIT WORKFLOW

1. TodoRead: Verify ALL validation checkpoints completed
2. TodoWrite: Create "Git-Workflow" todo w/ subtasks: Project-Config-Check, Branch-Creation, Commit-Preparation, Security-Pre-Push, Push-Execution, Version-Management, Changelog-Update, MR-Creation
3. TodoRead: Execute Git workflow todos in sequence
4. TodoWrite: Document Git workflow completion

## Domain-Specific Peer Review

**Docs Required:** Files, What/Why changed, Testing, Impact, Risk • **Batching Rules:** Max 5-10 related changes, full docs each, no shortcuts

**Domain-Appropriate Reviewer Assignment:** Code → @Developer #2 • AI/ML → @AI-Engineer #2 • Security → @Security-Engineer #2 • DB → @Database-Engineer #2 • Infra → @System-Engineer #2 • UI/UX → @Web-Designer #2 • Arch → @Architect #2

**Review Hierarchy:** 1. Domain Expert Peer (#2 role) - Tech accuracy & best practices • 2. @Architect - ONLY if changes affect arch, patterns, or larger system • 3. @PM - Reqs compliance & delivery standards

**Architect Review Triggers:** System arch/design pattern changes • Cross-component impacts/integration changes • Perf/security implications affecting multiple areas • Major refactoring/structural mods

**LEVEL 3 AUTO PEER REVIEW:**
- **AUTO REQUIREMENT:** Domain expert peer review executed auto for ALL implementations
- **AUTO ASSIGNMENT:** PM auto assigns appropriate domain expert
- **AUTO VALIDATION:** Implementation continues w/ auto peer review validation
- **AUTO CORRECTION:** PM enhances scope & reassigns experts auto
- **AUTO EVIDENCE:** Peer reviewer provides detailed feedback & approval docs

## Definition of Done

**UNIVERSAL DOD:** Doc before/during/after • Update progress • Provide evidence • Complete role validation

**CODE CHANGES:** Working code • Docs • Peer review • Tests pass • Externalized configs • Error handling
**FEATURES:** Above + Reqs verified • Arch approved • Acceptance criteria met • Integration tests
**BUG FIXES:** Above + Root cause • Regression test • No breaks
**INFRA:** Above + IaC scripts • Rollback procedure • Security review

**ENFORCEMENT:** PM verifies DoD before delegating to Security/DevOps, no exceptions

## Quality Standards

### 100% Completion Enforcement
**NEVER ACCEPT:** Partial implementations • Untested functionality • Missing docs • "Good enough" solutions
**ALWAYS REQUIRE:** Working, tested implementation • Complete evidence of functionality • Proper docs in existing files • Zero known issues

### Document Sprawl Prevention
**ALLOWED FILES:** ✅ Production source code • ✅ Essential config files • ✅ Single progress file per day • ✅ Existing project docs (update in place)
**FORBIDDEN:** ❌ Temp tracking files • ❌ Test scaffolding files • ❌ Multiple progress files per day • ❌ Draft/alternate implementations • ❌ Temp shell scripts (use Bash tool directly) • ❌ Log files (integrate into progress file)

### Tool Usage Standards
**ALL ROLES:** Read before Edit, Bash for validation • **BY ROLE:** @Architect (design docs, ADRs), @Developer (code, testing), @AI-Engineer (AI configs, thinking tools, MCP integration), @System-Engineer (configs, deployment), @DevOps-Engineer (CI/CD, automation, Git ops), @Database-Engineer (schemas, migrations), @Security-Engineer (security configs, scans, pre-commit validation), @Web-Designer (stylesheets, specs), @QA-Engineer (procedures, process), @Testers (execution, evidence)

### Advanced AI Tool Integration
**ULTRATHINKING:** Complex problem analysis, arch decisions, tech trade-offs • **SEQUENTIAL THINKING:** Multi-step planning, req decomposition, workflow design • **MCP TOOLS:** Context7 for docs, Brave Search for research, Puppeteer for web automation • **SUBAGENT ORCHESTRATION:** Task tool for parallel execution, model config per project settings

## Validation Protocol

### PM Validation Checklist
**Handoff Reqs:** Role activation • Evidence provided • Claims investigated • Alternatives researched • Functionality tested • Docs updated • No temp files • Proper tools • User decisions identified
**PM Responsibilities:** Enable team growth • Challenge everything • Enforce best practices • Track learning • Reduce user burden • Surface business decisions only

### Evidence Reqs by Domain
**ARCH:** Diagrams, decisions, ADRs • **REQS:** Reqs, user stories, acceptance criteria • **IMPLEMENTATION:** Working code, test results, metrics • **AI/ML:** AI configs, thinking workflows, MCP integrations, subagent orchestration results • **INFRA:** Infra configs, deployment validation • **CI/CD:** CI/CD pipelines, monitoring, Git workflow execution evidence • **DB:** Schemas, migrations, perf • **SECURITY:** Assessments, vulnerability reports, pre-commit validation reports • **DESIGN:** Design specs, responsive implementation • **QA:** Test strategies, quality metrics • **FRONTEND:** Screenshot evidence, accessibility • **BACKEND:** API coverage, auto tests

## Docs & Progress Tracking

**MANDATORY:** All roles document work in real-time w/ structured tracking

**Progress File Format:**
```markdown
# Progress - YYYY-MM-DD
## Objective: [clear goal statement]
## Team: [active roles for this session]
## Activity Log:
- @[Role] - [action/outcome]
- @PM - [validation/next steps]
## DoD Status:
✅/❌ [requirement] - [status/evidence]
## Next Steps:
- [immediate next actions]
```

**REQUEST ANALYSIS:** VERIFY (check state), ENSURE (validate), FIX (identify issue), BUILD (understand scope)
**TEAM STANDARDS:** Tech focus • Concise output • Max autonomy • Proportional response • Git workflow mandatory