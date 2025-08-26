# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories into PRBs with architect collaboration.

**PURPOSE:** @PM and specialist architect work together to analyze stories and create PRBs

## Imports
@./dynamic-specialist-creation.md
@./prb-breakdown-patterns.md

## Core Process

**CRITICAL:** @PM story breakdown operates in MAIN AGENT context only (NOT subagent).

When user says "@PM break down story X" or similar:
1. **@PM reads story**: Understands business goals and requirements
2. **@PM analyzes project scope**: Detects system nature and technology context
3. **@PM analyzes work type**: Identifies specific work patterns and requirements
4. **@PM selects specialist architect**: Chooses domain-specific architect based on two-factor analysis
5. **@PM + Specialist Architect collaborate**: Apply decision matrix for role selection
6. **@PM + Architect assign roles**: Use two-factor analysis to determine correct specialist roles
7. **@PM creates PRBs**: Generates PRBs with documented role assignment rationale (MAIN AGENT ONLY)
8. **Story selection**: @PM + Architect select next story based on priorities/complexity

**SEPARATION ENFORCEMENT:** 
- **CREATION**: @PM + Architect work in main agent context with full project access
- **EXECUTION**: Created PRBs are executed via subagents with resolved context

## Two-Factor Analysis Process

### Factor 1: Project Scope Analysis
**MANDATORY:** PM MUST detect project scope/system nature:

**Scope Detection Patterns:**
1. **System Nature Analysis**:
   - Check CLAUDE.md complete_context.system_nature field
   - **AI-AGENTIC SYSTEM**: Behavioral patterns, memory operations, PRB frameworks
   - **CODE-BASED SYSTEM**: Implementation, databases, APIs, infrastructure
   - **HYBRID SYSTEM**: Both code and behavioral patterns

2. **Technology Stack Detection**:
   - **AI/Behavioral Systems:** .md files, behavioral patterns, agentic frameworks
   - **React Applications:** .jsx, .tsx files, package.json with React dependencies
   - **Database Systems:** .sql files, migration folders, database config
   - **Infrastructure:** Dockerfile, k8s manifests, terraform files
   - **Security:** Security policies, compliance docs, vulnerability assessments
   - **APIs:** OpenAPI specs, REST/GraphQL schemas, microservice patterns
   - **Mobile:** .swift, .kt files, mobile-specific frameworks

### Factor 2: Work Type Analysis
**MANDATORY:** PM MUST analyze specific work type patterns:

**Work Type Detection Patterns:**
1. **Infrastructure/DevOps Keywords**: "deploy", "CI/CD", "container", "docker", "kubernetes", "scaling", "build pipeline"
2. **Security Work Keywords**: "security", "vulnerability", "compliance", "authentication", "authorization", "encrypt"
3. **Database Work Keywords**: "database", "schema", "migration", "query", "SQL", "performance", "index"
4. **Implementation Keywords**: "implement", "feature", "bug fix", "refactor", "code", "function", "API endpoint"
5. **AI/Behavioral Keywords**: "behavioral", "memory", "learning", "agent", "PRB", "pattern", "decision"
6. **Architecture Keywords**: "design", "architecture", "pattern", "structure", "framework", "system"
7. **Testing Keywords**: "test", "QA", "validation", "quality", "coverage", "automation"
8. **Documentation Keywords**: "documentation", "docs", "README", "guide", "manual", "API docs"

**Combined Analysis Logic:**
- Parse story requirements for work type keywords
- Match work type to specialist domain expertise  
- Cross-reference with project scope for final role selection

## Role Assignment Process

### Mandatory PM + Specialist Architect Collaboration
**CRITICAL:** PM MUST collaborate with appropriate architect for ALL role assignments:

1. **PM Analysis Phase**: Analyze work requirements and complexity, identify technical domains involved, determine coordination needs

2. **Dynamic Specialist Architect Creation**:
   - **Analyze Project Context:** Check CLAUDE.md, file structure, and requirements
   - **Detect Technology Stack:** Identify primary technologies and frameworks
   - **ALWAYS Create Specialist Architects**: Create @[Domain]-Architect based on actual project needs
   - **Examples**: @React-Architect, @Database-Architect, @Security-Architect, @AI-Architect, @Behavioral-Architect
   - **NEVER use generic @Architect** - precision is mandatory
   - **No Predefined Lists:** Specialists created dynamically from project context
   - **Universal System:** Works for ANY technology domain or project type
   - **Unlimited Specialist Creation:** ALWAYS create specialists when technology expertise is needed through PM + Architect behavioral patterns
   - **Subagent Integration:** Created specialists become available as subagents in .claude/agents/dynamic/

3. **Collaborative Analysis**: PM + Selected Specialist Architect jointly evaluate requirements, create appropriate domain specialists based on precise needs, consider coordination complexity and dependencies

4. **Two-Factor Analysis for Role Selection**:
   **CRITICAL:** Role assignment MUST consider both project scope AND specific work type:
   
   **Factor 1: Project Scope/Context**
   - **AI-AGENTIC SYSTEM**: Behavioral patterns, memory operations, PRB frameworks
   - **CODE-BASED SYSTEM**: Implementation, databases, APIs, infrastructure
   - **HYBRID SYSTEM**: Mixed domain requiring joint assessment
   
   **Factor 2: Work Type Analysis**
   - **Infrastructure/DevOps**: Deployment, CI/CD, containerization, scaling
   - **Security Work**: Vulnerability assessment, compliance, access control
   - **Database Work**: Schema design, queries, performance, migrations  
   - **Implementation**: Feature development, bug fixes, refactoring
   - **AI/Behavioral**: Agentic patterns, memory systems, behavioral frameworks
   - **Architecture**: System design, patterns, technical direction
   - **Testing**: Quality assurance, test frameworks, validation
   - **Documentation**: Technical writing, API docs, user guides
   
   **Decision Matrix Logic**:
   ```
   Role = f(ProjectScope, WorkType) → Dynamic Specialist Creation
   
   Examples:
   - AI-AGENTIC + DevOps work → Create @DevOps-Engineer via PM + @DevOps-Architect
   - AI-AGENTIC + AI patterns → Create @[Domain]-AI-Engineer via PM + @AI-Architect  
   - AI-AGENTIC + Security → Create @Security-Engineer via PM + @Security-Architect
   - CODE-BASED + Implementation → Create @[Technology]-Developer via PM + @Code-Architect
   - Any scope + Database → Create @Database-Engineer via PM + @Database-Architect
   ```
   
   **Selection Process**:
   1. **Identify Project Scope**: Check system_nature in complete_context
   2. **Analyze Work Type**: Parse requirements for specific work patterns
   3. **Create Specialist Architect**: Generate appropriate domain architect
   4. **Apply Decision Matrix**: Use matrix logic for specialist creation
   5. **Document Rationale**: Include analysis and specialist creation in PRB context
   6. **Validate Specialist**: Ensure specialist matches precise domain needs

5. **Assignment Documentation**: Document specialist creation rationale in PRB, include domain matching and specialist definition, reference PM + Specialist Architect collaboration in PRB context

## Story Selection Criteria

@PM and Architect consider:
- **Application state**: What's already built, what's needed next
- **Priority**: Business value and user impact
- **Complexity**: Technical difficulty and effort required
- **Dependencies**: What needs to be built first
- **Risk**: Technical or business risks to address

## Simple Invocation

User simply says:
- "@PM break down the authentication story"
- "@PM what story should we work on next?"
- "@PM analyze the stories and create PRBs"

## Story and Bug Creation Rules

**CRITICAL:** Stories and Bugs MUST NOT contain role assignments:
- **NO "Assigned:" fields** in bug reports
- **NO "@Role" assignments** in stories
- **NO predetermined roles** - WHO is decided during PRB creation
- Stories/Bugs define **WHAT** needs to be done
- PRBs define **WHO** does it and **HOW**

### Validation
- System MUST block creation of bugs/stories with role assignments
- Error message: "❌ Role assignments not allowed in bugs/stories. Roles are determined during PRB creation via PM + Architect collaboration"

## Story Location

- Stories live in configured story_path (default: `stories/`)
- Drafts in story_path/story_drafts (default: `stories/drafts/`)
- Any text file format (.txt, .md, etc.)
- Natural language descriptions
- No forced structure
- Paths auto-created if missing

## PRB Generation

### PRB Size Limits
**MANDATORY:** @PM MUST keep individual PRBs under 15 complexity points:

**Size Management Rules:**
- **Single PRB**: If story analysis shows ≤15 points → Create one PRB
- **Multiple PRBs**: If story analysis shows >15 points → Split into multiple PRBs
- **Each PRB < 15 points**: Every individual PRB must be under the limit
- **Sequential numbering**: PRB-001, PRB-002, PRB-003, etc. under same parent story
- **Logical grouping**: Split by natural boundaries (frontend/backend, auth/data, setup/implementation)

**Large Story Breakdown Process (AUTOMATIC):**
1. **Analyze total complexity**: Calculate full story complexity points
2. **AUTOMATIC BREAKDOWN**: If >15 points, use prb-breakdown-patterns.md for logical decomposition
3. **Generate sub-PRBs**: Each focused on specific aspect, automatically ≤15 points
4. **Sequential numbering**: PRB-001, PRB-002, PRB-003, etc. under same parent
5. **Maintain dependencies**: Auto-document logical execution order
6. **Validate each PRB**: Ensure every generated PRB is ≤15 points
7. **FAIL-SAFE**: If auto-breakdown fails, BLOCK with manual breakdown request

**Examples of splits:**
- **Authentication Story (25 points)**: 
  - PRB-001: Backend auth setup (12 points)
  - PRB-002: Frontend login UI (10 points)
- **API Integration (20 points)**:
  - PRB-001: API client setup (8 points) 
  - PRB-002: Data models and validation (7 points)
  - PRB-003: Error handling and tests (9 points)

### Standard PRB Creation Process

When @PM breaks down a story:
1. **Validates Parent Story:** Ensures story follows naming format (STORY-###-title-date.md)
2. **Analyzes Complexity:** Calculate total story complexity points
3. **AUTOMATIC SIZE ENFORCEMENT:** If any PRB would be >15 points, auto-breakdown using prb-breakdown-patterns.md
4. **Generates Compliant PRB Names:** Using format `<STORY_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
5. **Sequential Numbering:** Uses NumberingService for parent-scoped PRB numbers
6. **Creates PRBs:** In configured prb_path/prb_ready (default: `prbs/ready/`)
7. **Template Selection:** Appropriate complexity and template selected using hierarchy (Nano/Tiny/Medium only)
8. **MANDATORY Validation:** Each PRB complexity verified ≤15 points before creation
9. **BLOCK on Failure:** If auto-breakdown fails to create PRBs ≤15 points, BLOCK with error
10. **Ready for Execution:** Uses directory structure from configuration

### PRB Naming Instructions
**MANDATORY:** When creating PRBs from stories, follow standard naming format:

**Format:** `<STORY_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
**Date:** Use current system date (YYYY-MM-DD) - NEVER hardcode dates
**Number:** Sequential numbering within parent story scope
**Title:** Descriptive title in lowercase-with-hyphens format

### Naming Validation Integration
- **Parent Reference:** All PRBs must reference valid parent story ID
- **Sequential Numbers:** STORY-001-PRB-001, STORY-001-PRB-002, etc.
- **Format Compliance:** Auto-validate generated names follow standard format
- **Uniqueness Check:** Verify generated PRB names don't conflict with existing files
- **Error Handling:** Clear error messages if naming validation fails

## Story Selection Process

When asked "what's next?", @PM and Architect:
1. Review all stories in configured story_path
2. Consider current application state
3. Evaluate priorities and dependencies
4. Recommend next story with rationale
5. Can immediately break it down if requested

## Directory Integration

Imports:
@./directory-structure.md
@./shared-patterns/template-loading.md
@./naming-enforcement-behavior.md
@./work-item-creation.md
@./placeholder-resolution.md

Uses configured paths:
- get_project_path("story_path") for stories
- get_project_path("prb_path") for PRBs
- ensure_directory() to create missing paths

---
*Story breakdown behavior for intelligent-claude-code system*