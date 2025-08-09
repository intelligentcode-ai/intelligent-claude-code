# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories into PRBs with architect collaboration.

**PURPOSE:** @PM and specialist architect work together to analyze stories and create PRBs

## Core Process

When user says "@PM break down story X" or similar:
1. **@PM reads story**: Understands business goals and requirements
2. **@PM analyzes domain**: Detects technology stack and project context
3. **@PM selects specialist architect**: Chooses domain-specific architect
4. **@PM + Specialist Architect collaborate**: Jointly analyze technical approach
5. **@PM + Architect assign roles**: Determine correct specialist roles for each PRB
6. **@PM creates PRBs**: Generates appropriate PRBs with role assignments
7. **Story selection**: @PM + Architect select next story based on priorities/complexity

## Domain Detection Process

### PM Domain Analysis
**MANDATORY:** PM MUST detect project domain before selecting architect:

**Detection Patterns:**
1. **Project Context Analysis**:
   - Check CLAUDE.md for system nature and technology references
   - Analyze existing file structure and dependencies
   - Review story requirements for technology mentions

2. **Technology Stack Detection**:
   - **AI/Behavioral Systems:** .md files, behavioral patterns, agentic frameworks
   - **React Applications:** .jsx, .tsx files, package.json with React dependencies
   - **Database Systems:** .sql files, migration folders, database config
   - **Infrastructure:** Dockerfile, k8s manifests, terraform files
   - **Security:** Security policies, compliance docs, vulnerability assessments
   - **APIs:** OpenAPI specs, REST/GraphQL schemas, microservice patterns
   - **Mobile:** .swift, .kt files, mobile-specific frameworks

3. **Requirement Keywords Matching**:
   - Look for domain-specific terms in story descriptions
   - Match technical requirements to specialist expertise
   - Consider integration and deployment patterns

## Role Assignment Process

### Mandatory PM + Specialist Architect Collaboration
**CRITICAL:** PM MUST collaborate with appropriate architect for ALL role assignments:

1. **PM Analysis Phase**:
   - Analyze work requirements and complexity
   - Identify technical domains involved
   - Determine coordination needs

2. **Domain Detection and Specialist Architect Selection**:
   - **Analyze Project Context:** Check CLAUDE.md, file structure, and requirements
   - **Detect Technology Stack:** Identify primary technologies and frameworks
   - **Match to Specialist Architect:**
     - **AI/ML/Behavioral Systems:** @AI-Architect
     - **React/Frontend Applications:** @React-Architect
     - **Database/Data Systems:** @Database-Architect
     - **Infrastructure/Cloud/DevOps:** @Infrastructure-Architect
     - **Security/Compliance:** @Security-Architect
     - **APIs/Microservices:** @API-Architect
     - **Mobile Applications:** @Mobile-Architect
     - **Multi-domain/Complex:** @Architect (general)
   - **Fallback Logic:** Create @[Domain]-Architect if <70% match with existing specialists

3. **Collaborative Analysis**:
   - PM + Selected Architect jointly evaluate requirements
   - Assess specialist expertise needed (>70% capability match)
   - Consider coordination complexity and dependencies

4. **Role Selection Criteria**:
   - **Domain Expertise**: Match specialist to technical domain
   - **Complexity Level**: Simple tasks → core roles, complex → dynamic specialists
   - **Coordination Needs**: Multi-role projects require senior specialists
   - **Project Context**: Consider existing architecture and patterns

5. **Assignment Documentation**:
   - Document role selection rationale in PRB
   - Include capability match score and justification
   - Reference architect collaboration in PRB context

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

When @PM breaks down a story:
1. **Validates Parent Story:** Ensures story follows naming format (STORY-###-title-date.md)
2. **Generates Compliant PRB Names:** Using format `<STORY_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
3. **Sequential Numbering:** Uses NumberingService for parent-scoped PRB numbers
4. **Creates PRBs:** In configured prb_path/prb_ready (default: `prbs/ready/`)
5. **Template Selection:** Appropriate complexity and template selected using hierarchy
6. **Validation:** Each PRB name validated before creation
7. **Ready for Execution:** Uses directory structure from configuration

### PRB Naming Instructions
**MANDATORY:** When creating PRBs from stories, MUST follow these steps:

**Get Current Date:**
```bash
CURRENT_DATE=$(date +%Y-%m-%d)
```

**Get Next PRB Number:**
```bash
# For PRBs under STORY-001
HIGHEST=$(ls prbs/ready/ prbs/completed/ | grep "^STORY-001-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
```

**Generate PRB Name:**
```bash
PRB_NAME="STORY-001-PRB-${NEXT}-<descriptive-title>-${CURRENT_DATE}.prb.yaml"
```

**CRITICAL:** Always use system date command - NEVER hardcode dates like "2025-01-09".

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

Uses configured paths:
- get_project_path("story_path") for stories
- get_project_path("prb_path") for PRBs
- ensure_directory() to create missing paths

---
*Story breakdown behavior for intelligent-claude-code system*