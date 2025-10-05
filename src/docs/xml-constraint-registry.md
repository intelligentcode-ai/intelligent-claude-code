# XML Constraint ID Registry

## Overview

This registry documents all constraint IDs used in the intelligent-claude-code virtual team XML schema. Each ID uniquely identifies a critical enforcement rule and enables machine-parseable validation.

## Constraint ID Naming Convention

**Format**: `CATEGORY-SPECIFIC-CONSTRAINT`

- **CATEGORY**: High-level grouping (PM, AGENTTASK, DIR, ROLE, etc.)
- **SPECIFIC**: Subcategory or component area
- **CONSTRAINT**: Specific rule or requirement

**Examples**:
- `PM-FILE-OPS`: PM file operation allowlist
- `AGENTTASK-TEMPLATE`: AgentTask template compliance
- `DIR-STRUCTURE`: Directory structure requirements

## PM Constraints

### PM-CORE
**Description**: Overall PM role constraints and boundaries
**Scope**: All PM role coordination and delegation requirements
**Related File**: src/behaviors/story-breakdown.md

### PM-FILE-OPS
**Description**: PM file operation allowlist
**Scope**: Defines which paths and tools PM can access
**Allowed Operations**:
- Story file creation and editing (stories/*.md)
- Bug report creation and editing (bugs/*.md)
- Root-level documentation files (*.md in root)
- Read operations (Read, LS, Glob, Grep)

### PM-TECH-BLOCK
**Description**: PM technical directory blocking
**Scope**: Prevents PM from modifying technical files
**Blocked Paths**:
- src/* (source code modifications)
- config/* (system configuration)
- tests/* (test files)
- lib/* (library files)

**Blocked Operations**:
- Code changes or implementation work
- System configuration or deployment
- Bug fixes or technical corrections

**Blocked Tools**:
- Write (technical file creation)
- Edit (technical file modification)
- Bash (system operations)

### PM-DELEGATE
**Description**: PM delegation requirements
**Scope**: Enforces PM must delegate technical work
**Process**:
1. Issue found → Document in findings
2. Create AgentTask → Generate appropriate work item
3. Delegate work → Assign to specialist role
4. Never fix directly → PM does not perform technical work

**Bypass Patterns** (blocked):
- "Let me fix"
- "I'll update"
- "Going to change"
- "Need to modify"
- "Quick change"
- "Simple fix"

## AgentTask Requirements

### AGENTTASK-CORE
**Description**: Overall AgentTask requirements
**Scope**: All AgentTask creation and validation rules
**Related Files**:
- src/behaviors/agenttask-creation-system.md
- src/behaviors/agenttask-execution.md
- src/behaviors/template-resolution.md

### AGENTTASK-TEMPLATE
**Description**: Template compliance requirements
**Scope**: AgentTasks must use templates from hierarchy
**Templates**:
- nano-agenttask-template.yaml (0-2 points)
- tiny-agenttask-template.yaml (3-5 points)
- medium-agenttask-template.yaml (6-15 points)
- large-agenttask-template.yaml (16-30 points)
- mega-agenttask-template.yaml (30+ points)

**Validation Rules**:
- Only use templates from hierarchy
- Block non-template AgentTask creation
- Enforce template-first flow

### AGENTTASK-PLACEHOLDERS
**Description**: Placeholder resolution requirements
**Scope**: All placeholders must be resolved before agent execution
**Common Placeholders**:
- [FROM_CONFIG] → Actual config values
- [PROJECT_ROOT] → Absolute project path
- [CURRENT_DATE] → System date YYYY-MM-DD
- [SYSTEM_NATURE] → Project system type
- [MEMORY_SEARCH:*] → Top memory entries
- [USER_REQUEST] → Story content
- [ROLE] → Role assignment

**Validation Checklist**:
- ✅ Zero placeholders - No [.*] patterns remain
- ✅ Absolute paths - All paths start with /
- ✅ Actual config values - Boolean/string values loaded
- ✅ Current dates - System date format YYYY-MM-DD
- ✅ Embedded search results - Memory/practice results included
- ✅ Story content - Actual requirements text
- ✅ Role assignment - Specific role assigned
- ✅ Project context - Real system nature determined

### AGENTTASK-CONTEXT
**Description**: Context completeness requirements
**Scope**: AgentTasks must contain complete self-contained context
**Required Elements**:
- Configuration hierarchy values (embedded)
- Project root absolute path
- System nature (CODE-BASED/AI-AGENTIC/HYBRID)
- Critical file identification and samples
- Memory search results
- Best practices applicable to work type

**Validation Rules**:
- No runtime configuration lookups
- Self-contained execution context
- All settings pre-resolved and embedded

### AGENTTASK-SIZE
**Description**: Work complexity and size limits
**Scope**: Determines creation approach based on complexity
**Thresholds**:
- **0-5 points**: Direct AgentTask creation with nano/tiny template
  - No story creation needed
  - Immediate execution via Task tool
- **6+ points**: Story creation required
  - MUST create Story file first in stories/ directory
  - Story broken down into multiple nano/tiny AgentTasks ≤5 points each

**Maximum Size**: 5 points (tiny) - no exceptions

## Directory Structure

### DIR-STRUCTURE
**Description**: Directory structure and file organization requirements
**Scope**: Overall directory hierarchy and naming standards
**Related File**: src/behaviors/directory-structure.md

### PATH-ALLOWLIST
**Description**: Path allowlist for PM operations
**Scope**: Coordination paths accessible to PM role
**Directories**:
- stories/ (user stories and requirements)
- stories/drafts/ (work-in-progress stories)
- bugs/ (bug reports)
- bugs/open/ (active bugs)
- bugs/completed/ (fixed bugs)
- summaries/ (summary and report files)
- *.md in root (root-level markdown documentation)

### PATH-BLOCKLIST
**Description**: Path blocklist for PM operations
**Scope**: Technical paths blocked from PM role
**Directories**:
- src/ (source code)
- config/ (configuration files)
- tests/ (test files)
- lib/ (library files)

### NAMING-STD
**Description**: Naming standards for work items
**Scope**: Consistent naming format and sequential numbering
**Format**: `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`

**Components**:
- **Categories**: EPIC, STORY, BUG (case sensitive)
- **Numbers**: Zero-padded (001, 002, 003), sequential within category
- **Titles**: Lowercase, hyphen-separated, descriptive
- **Dates**: YYYY-MM-DD format

**Examples**:
- EPIC-001-virtual-team-enhancement-2025-08-26.md
- STORY-001-user-authentication-2025-08-26.md
- BUG-005-naming-format-inconsistency-2025-08-26.md

**Validation Rules**:
- Category in allowed list (EPIC, STORY, BUG)
- Number format (zero-padded, sequential)
- Title format (lowercase, hyphens only)
- Date format (YYYY-MM-DD)

### SUMMARY-REDIRECT
**Description**: Summary file redirection to summaries/ directory
**Scope**: Prevents summary files in project root
**Patterns** (case-insensitive):
- SUMMARY*
- REPORT*
- VALIDATION*
- ANALYSIS*

**Behavior**:
- Detect summary files in project root
- Block creation with suggested path: summaries/[filename]
- Auto-create summaries/ directory when needed
- Case-insensitive matching (SUMMARY.md, summary.md, Summary.md)

## Role Assignment

### ROLE-CORE
**Description**: Overall role assignment rules
**Scope**: Role selection and specialist creation
**Related File**: src/behaviors/role-system.md

### ROLE-TWO-FACTOR
**Description**: Two-factor analysis for role assignment
**Scope**: Role selection based on project scope and work type

**Factor 1: Project Scope**
- AI-AGENTIC: Behavioral patterns, memory operations, AgentTask frameworks
- CODE-BASED: Implementation, databases, APIs, infrastructure
- HYBRID: Both code and behavioral patterns

**Factor 2: Work Type**
- Infrastructure: deploy, CI/CD, container, docker, kubernetes, scaling
- Security: security, vulnerability, compliance, authentication, authorization
- Database: database, schema, migration, query, SQL, performance
- Implementation: implement, feature, bug fix, refactor, code, function
- AI_Behavioral: behavioral, memory, learning, agent, AgentTask, pattern
- Architecture: design, architecture, pattern, structure, framework

**Process**:
1. PM analyzes project scope (Factor 1)
2. PM analyzes work type (Factor 2)
3. PM selects specialist architect based on analysis
4. PM + Specialist Architect collaborate on role selection
5. Document two-factor rationale in AgentTask

### ROLE-SPECIALIST
**Description**: Specialist creation rules
**Scope**: Dynamic specialist creation for technology domains

**Rules**:
- Always create specialist architects for domain expertise
- Never use generic @Architect - precision required
- Unlimited specialist creation based on technology expertise needs

**Naming Pattern**: `@[Domain]-[RoleType]`

**Examples**:
- @React-Architect
- @Database-Architect
- @Security-Architect
- @AI-Architect
- @React-Developer
- @AWS-Engineer
- @ML-Specialist
- @Kubernetes-DevOps-Engineer

## Meta Rules

### RECURSIVE-DISPLAY
**Description**: Recursive rule display enforcement
**Priority**: Critical
**Scope**: XML constraints must be recursively displayed for awareness

**Trigger**: When constraint violation detected or validation required

**Behavior**:
- Display relevant constraint XML to user
- Show constraint ID and description
- Provide actionable guidance for compliance
- Reference full schema for detailed requirements

**Integration Points**:
- STORY-007 Hook Integration
- PreToolUse hook validation
- AgentTask validation
- PM role enforcement

## Constraint ID Index

Quick reference index of all constraint IDs:

### PM Constraints (4)
- PM-CORE
- PM-FILE-OPS
- PM-TECH-BLOCK
- PM-DELEGATE

### AgentTask Requirements (5)
- AGENTTASK-CORE
- AGENTTASK-TEMPLATE
- AGENTTASK-PLACEHOLDERS
- AGENTTASK-CONTEXT
- AGENTTASK-SIZE

### Directory Structure (5)
- DIR-STRUCTURE
- PATH-ALLOWLIST
- PATH-BLOCKLIST
- NAMING-STD
- SUMMARY-REDIRECT

### Role Assignment (3)
- ROLE-CORE
- ROLE-TWO-FACTOR
- ROLE-SPECIALIST

### Meta Rules (1)
- RECURSIVE-DISPLAY

**Total Constraints**: 18 unique constraint IDs

## Usage Guidelines

### For Developers

When implementing validation logic:
1. Reference constraint IDs in code comments
2. Load constraint XML from schema using ID
3. Display constraint on violation
4. Provide actionable guidance based on constraint

### For Hook Integration (STORY-007)

1. Parse constraint IDs from XML schema
2. Map constraints to validation functions
3. Display constraint XML on violation detection
4. Reference constraint ID in error messages

### For Documentation

1. Reference constraint IDs in behavioral files
2. Link to this registry for detailed information
3. Use constraint IDs in AgentTask requirements
4. Track constraint evolution and changes

## Version Control

- **Registry Version**: 1.0
- **Created**: 2025-10-03
- **Total Constraints**: 18
- **Related**: STORY-006 (Hybrid XML conversion), STORY-007 (Hook integration)
- **Schema File**: src/docs/xml-schema-design.md

## Change Log

### 2025-10-03 - Initial Registry
- Created initial constraint ID registry
- Defined 18 constraint IDs across 5 categories
- Documented naming convention and usage guidelines
- Aligned with STORY-006 requirements
