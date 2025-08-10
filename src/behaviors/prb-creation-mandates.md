# PRB Creation Instructions

**MANDATORY:** ALL PRB creation MUST use templates from src/prb-templates/ with COMPLETE placeholder resolution. NO manual PRB creation allowed. NO runtime config lookups.

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-enforcement-behavior.md
@./work-item-creation.md
@./placeholder-resolution.md

## MANDATORY: Main Agent Creation Only

**CRITICAL:** PRB creation MUST happen in main agent context only.

**WHY MAIN AGENT REQUIRED:**
- Full configuration hierarchy access (embedded → project → user → system)
- Template hierarchy access (project → .claude → ~/.claude)
- Memory search capabilities across memory/ directories
- Best practices integration from best-practices/ directory
- Complete project context gathering and analysis
- Placeholder resolution with actual configuration values

**BLOCKED:** Task tool CANNOT create PRBs due to isolated context limitations.

## MANDATORY TEMPLATE USAGE WITH PLACEHOLDER RESOLUTION

### Templates Are MANDATORY - NO Exceptions, ALL Placeholders MUST be Resolved
**CRITICAL:** Every PRB MUST use appropriate template from `src/prb-templates/` with ALL placeholders resolved at generation time - NO manual creation, NO runtime config lookups.

**TEMPLATE SOURCE (ONLY VALID SOURCE):**
- **nano-prb-template.yaml** (0-2 points): Simple changes (typos, configs)
- **tiny-prb-template.yaml** (3-5 points): Single-file work (<50 lines)  
- **medium-prb-template.yaml** (6-15 points): Multi-file features
- **large-prb-template.yaml** (16-30 points): Complex work requiring coordination
- **mega-prb-template.yaml** (30+ points): System-wide changes

**ABSOLUTE BLOCKING:**
- ❌ Manual PRB creation without templates
- ❌ PRBs with unresolved placeholders (like [FROM_CONFIG])
- ❌ Runtime config lookups during execution
- ❌ Missing mandatory template sections
- ❌ Template sources outside src/prb-templates/

### MANDATORY Template-First Generation Process
**CRITICAL STEPS (NO EXCEPTIONS):**
1. **Calculate Complexity**: Files + Lines + APIs + Security + Coordination
2. **Select Template**: Use complexity score to pick appropriate template from src/prb-templates/
3. **Load Template**: From src/prb-templates/ hierarchy ONLY - NO other sources
4. **Load Configuration**: Read complete config hierarchy at generation time
5. **Resolve ALL Placeholders**: Replace EVERY [PLACEHOLDER] with actual values
   - [FROM_CONFIG] → actual config values (git_privacy: <ACTUAL_VALUE>, not "[FROM_CONFIG]")
   - [PROJECT_ROOT] → actual project root path
   - [CURRENT_DATE] → actual system date
   - [ALL-SETTINGS] → actual configuration object
6. **Embed Complete Context**: All config values embedded in PRB complete_context
7. **Validate NO Placeholders**: Ensure ZERO unresolved placeholders remain
8. **Validate All Sections**: Ensure ALL mandatory template sections present
9. **Document Template Source**: Record template used in PRB metadata
10. **Block Runtime Config**: Ensure NO config lookups needed during execution

**ABSOLUTE BLOCKING (ZERO TOLERANCE):**
- ❌ Manual PRB structure creation
- ❌ Creating PRBs without templates  
- ❌ Any unresolved placeholders in final PRB
- ❌ Missing mandatory template sections
- ❌ Using templates outside src/prb-templates/ hierarchy
- ❌ Runtime config dependencies in PRB execution
- ❌ PRBs requiring config file access during work

### Include Role in Title  
**Format:** "[Role] Description" (from template)
**Examples:** "[Developer] Fix auth", "[AI-Engineer] Add ML"

### Naming Format Requirements
**MANDATORY:** All generated PRBs MUST follow standard naming format:

**Format:** `<PARENT_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`

**Critical Date Rule:** MUST use system date command for current date:
```bash
CURRENT_DATE=$(date +%Y-%m-%d)
```
**NEVER** hardcode dates - always retrieve from system for accuracy.

**Examples:**
- `STORY-001-PRB-001-implement-auth-$(date +%Y-%m-%d).prb.yaml`
- `BUG-005-PRB-001-fix-validation-$(date +%Y-%m-%d).prb.yaml`

**Validation Requirements:**
- Parent ID must reference existing work item (STORY-001, BUG-005, etc.)
- Number must be sequential within parent scope (check existing files to find next number)
- Title must be lowercase, hyphen-separated, descriptive
- Date must be current date in YYYY-MM-DD format

### Search Memory Before Creating PRBs
**MANDATORY:** Always check memory before creating PRBs:
- Look in memory/[topic]/ folders for relevant patterns
- Find keywords from the work request
- Choose the best 2-3 entries based on relevance and how recent they are
- Include them in the PRB (up to 1000 tokens)
- Never create a PRB without checking memory first

### Quality Requirements
- Sequential thinking for Large/Mega
- Pre-assigned SME reviewers
- 10+ years specialist expertise
- Project context integration
- Memory entries embedded in context
- **COMPLETE CONTEXT MANDATORY**: Every PRB MUST include complete_context section with:
  - system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM" or "CODE-BASED SYSTEM"
  - configuration values (actual values, not placeholders)
  - critical file references with samples
  - project root path and structure
  - user requirements clearly stated
  - embedded memory entries from search

### Bug/Story Validation
**MANDATORY:** Bugs and Stories MUST NOT contain role assignments:

1. **Validation Before Creation**:
   - Scan bug/story content for role assignments
   - Block if contains "Assigned:", "@Role", or role references
   - Error: "❌ Role assignments not allowed in bugs/stories. Roles determined during PRB creation"

2. **Separation of Concerns**:
   - Bugs/Stories = WHAT (problem/requirement description)
   - PRBs = WHO (role assignment via PM+Architect) + HOW (implementation)
   - No predetermined roles allowed in work items

### Role Assignment Enforcement
**MANDATORY:** PM + Architect collaboration for ALL role assignments:

1. **Block Direct Role Assignment**: 
   - STOP execution if role assigned without PM+Architect process
   - Redirect to story-breakdown.md role assignment process
   - Generate error: "❌ Role assignment requires PM+Architect collaboration"

2. **Enforce Collaboration Process**:
   - PM MUST analyze work requirements first
   - PM MUST select appropriate architect domain expert based on system nature
   - Together they MUST determine correct role assignment
   - Document collaboration and rationale in PRB

3. **Two-Factor Analysis Enforcement**:
   - **MANDATORY:** Role assignment MUST consider BOTH project scope AND work type
   - **Factor 1 - Project Scope:** Extract from complete_context.system_nature field
     - **AI-AGENTIC SYSTEM:** Behavioral patterns, memory operations, PRB frameworks
     - **CODE-BASED SYSTEM:** Implementation, databases, APIs, infrastructure  
     - **HYBRID SYSTEM:** Mixed domains requiring joint assessment
   - **Factor 2 - Work Type:** Parse requirements for specific work patterns
     - **DevOps Work:** Deployment, CI/CD, containers, scaling → @DevOps-Engineer
     - **Security Work:** Vulnerabilities, compliance, auth → @Security-Engineer  
     - **Database Work:** Schema, queries, performance → @Database-Engineer
     - **Implementation:** Features, bugs, refactoring → @Developer/@AI-Engineer (scope dependent)
     - **AI/Behavioral:** Patterns, memory, agents → @AI-Engineer
     - **Architecture:** Design, patterns, structure → @Architect
     - **Testing:** QA, validation, automation → @QA-Engineer/@Backend-Tester
   - **BLOCK:** Single-factor role assignments (blind assignments)

4. **Dynamic Architect Creation**:
   - **Domain Analysis:** PM analyzes work requirements to identify technology domain
   - **Dynamic Creation Process:** ALWAYS create domain-specific specialists
   - **Create @[Domain]-Architect:** Based on actual project needs (not predefined lists)
   - **Examples:** @React-Architect, @Database-Architect, @Security-Architect, @API-Architect
   - **No Generic Fallbacks:** ALWAYS create domain-specific specialist architects
   - **CRITICAL:** Specialists are DISCOVERED from project context, not PREDEFINED
   - **VALIDATION:** Created specialist MUST match work domain precisely

5. **Validation Requirements**:
   - PRB MUST include two-factor analysis rationale
   - PRB MUST document project scope identification
   - PRB MUST document work type analysis
   - PRB MUST reference PM + Specialist Architect collaboration
   - PRB MUST include specialist creation justification
   - PRB MUST document domain expert creation process
   - PRB MUST validate role aligns with BOTH factors
   - PRB MUST show specialist architect domain expertise
   - PRB MUST include decision matrix application

### ENHANCED Auto-Correction with Template Enforcement
- **MANUAL PRB CREATION → BLOCK immediately - redirect to src/prb-templates/ usage**
- **MISSING TEMPLATE SECTIONS → BLOCK - force complete template loading from src/prb-templates/**  
- **UNRESOLVED PLACEHOLDERS → BLOCK - require complete placeholder resolution at generation time**
- **RUNTIME CONFIG DEPENDENCIES → BLOCK - embed all config values in PRB**
- **WRONG TEMPLATE COMPLEXITY → BLOCK - recalculate and use correct template from src/prb-templates/**
- **TEMPLATE SOURCE INVALID → BLOCK - must use src/prb-templates/ hierarchy only**
- Missing role → Trigger PM+Architect collaboration process
- Wrong template → Re-analyze complexity with architect input
- No specialist → PM+Architect decide on dynamic specialist creation
- Missing SME → PM+Architect pre-assign domain-appropriate reviewer
- Direct role assignment → Block and redirect to collaboration process
- **Single-factor analysis → BLOCK and require two-factor analysis**
- **Missing work type analysis → BLOCK PRB generation until work type identified**
- **Project scope not identified → BLOCK until system_nature verified**
- **Blind role assignment → BLOCK and enforce decision matrix application**
- **System nature mismatch → Block role assignment, require PM+Architect re-evaluation**
- **Wrong specialist domain → Force dynamic creation of appropriate @[Domain]-Architect**
- **Generic specialist attempted → Block and require domain-specific specialist creation**
- **MISSING COMPLETE CONTEXT → BLOCK PRB generation until context gathered**
- **PLACEHOLDER VALUES IN FINAL PRB → BLOCK execution until actual values embedded**
- **CONFIG LOOKUP DURING EXECUTION → BLOCK - all values must be pre-embedded**
- **Role-system conflict → Auto-correct based on two-factor analysis validation**

### Context Validation Requirements

**MANDATORY PRE-GENERATION CONTEXT GATHERING:**
1. **Load project configuration**: Read actual values from CLAUDE.md and config hierarchy
2. **Determine project root**: Identify absolute path to project root
3. **Gather system nature**: Identify if code or markdown-based system
4. **Extract critical file references**: Find and sample relevant files
5. **Load user requirements**: Capture exact user intent and specifications

**VALIDATION BLOCKERS:**
- **PLACEHOLDER_VALUES_DETECTED**: "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]"
- **MISSING_SYSTEM_NATURE**: No system type identification
- **EMPTY_FILE_REFERENCES**: No actual file paths or samples
- **VAGUE_REQUIREMENTS**: Generic or unclear user specifications

**REQUIRED COMPLETE CONTEXT STRUCTURE:**
```yaml
complete_context:
  system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM"  # OR "CODE-BASED SYSTEM"
  project_root: "/absolute/path/to/project"
  configuration:
    git_privacy: <ACTUAL_VALUE>  # NOT hardcoded
    branch_protection: <ACTUAL_VALUE>  # NOT hardcoded
    default_branch: <ACTUAL_VALUE>  # NOT hardcoded
    autonomy_level: <ACTUAL_VALUE>  # NOT hardcoded
  critical_files:
    - path: "/absolute/path/to/file"
      purpose: "specific purpose"
      sample: "actual content sample"
  user_requirements:
    original_request: "exact user words"
    clarifications: ["any clarifications needed"]
    success_criteria: ["specific success criteria"]
```

### Naming Format Validation
**MANDATORY:** All generated PRBs MUST follow standard naming format:

**Validation Requirements:**
- **Format:** `<PARENT_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
- **Parent ID:** Must reference existing work item (STORY-001, BUG-005, etc.)
- **Number:** Sequential within parent scope (find next available number by checking directories)
- **Title:** Lowercase, hyphen-separated, descriptive
- **Date:** Current date in YYYY-MM-DD format

**How to Validate:**
1. **Before PRB Creation:** Check that parent reference exists
2. **Get Next Number:** Find the next available PRB number for the parent
3. **Check Format:** Make sure all components follow naming rules
4. **Verify Uniqueness:** Confirm the generated name doesn't already exist
5. **Fix Issues:** Correct any format problems automatically

**How Templates Work:**
- Template placeholders get replaced with actual values automatically
- `[PARENT_ID]` becomes the validated parent work item ID
- `[NEXT_NUMBER]` becomes the next sequential PRB number for parent
- `[TITLE]` becomes the cleaned, compliant title format
- `[CURRENT_DATE]` becomes current date in YYYY-MM-DD format

**Error Handling:**
- **PARENT_NOT_FOUND:** "❌ Parent work item not found: {parent_id}"
- **INVALID_FORMAT:** "❌ Generated name violates format: {name}"
- **NAME_EXISTS:** "❌ PRB name already exists: {name}"
- **NUMBERING_CONFLICT:** "❌ Cannot generate unique number for parent: {parent_id}"

## Available Tools
Use these commands: `/icc-analyze-complexity`, `/icc-create-prb`, `/icc-think-sequential`, `/icc-validate-context`, `/icc-validate-prb-name`

---
*Optimized: 113→35 lines*