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
- Complete project context gathering and analysis
- Placeholder resolution with actual configuration values

**BLOCKED:** Task tool CANNOT create PRBs due to isolated context limitations.

## MANDATORY TEMPLATE USAGE WITH PLACEHOLDER RESOLUTION

### Templates Are MANDATORY - NO Exceptions
**CRITICAL:** Every PRB MUST use appropriate template from `src/prb-templates/` with ALL placeholders resolved at generation time.

**TEMPLATE SOURCE (ONLY VALID SOURCE):**
- **nano-prb-template.yaml** (0-2 points): Simple changes
- **tiny-prb-template.yaml** (3-5 points): Single-file work  
- **medium-prb-template.yaml** (6-15 points): Multi-file features
- **large-prb-template.yaml** (16-30 points): Complex coordination
- **mega-prb-template.yaml** (30+ points): System-wide changes

**ABSOLUTE BLOCKING:**
- ❌ Manual PRB creation without templates
- ❌ PRBs with unresolved placeholders (like [FROM_CONFIG])
- ❌ Runtime config lookups during execution
- ❌ Missing mandatory template sections
- ❌ Template sources outside src/prb-templates/

### Template-First Generation Process
**CRITICAL STEPS:**
1. **Calculate Complexity**: Files + Lines + APIs + Security + Coordination
2. **Select Template**: Use complexity score to pick appropriate template from src/prb-templates/
3. **Load Template**: From src/prb-templates/ hierarchy ONLY - NO other sources
4. **Load Configuration**: Read complete config hierarchy at generation time
5. **Resolve ALL Placeholders**: Replace EVERY [PLACEHOLDER] with actual values
6. **Embed Complete Context**: All config values embedded in PRB complete_context
7. **Validate NO Placeholders**: Ensure ZERO unresolved placeholders remain
8. **Validate All Sections**: Ensure ALL mandatory template sections present
9. **Document Template Source**: Record template used in PRB metadata
10. **Block Runtime Config**: Ensure NO config lookups needed during execution

### MANDATORY Placeholder Resolution Instructions

**COMMON PLACEHOLDERS TO RESOLVE:**
- `[FROM_CONFIG]` → Load actual config values (git_privacy: true/false, not "[FROM_CONFIG]")
- `[PROJECT_ROOT]` → Actual project root path
- `[CURRENT_DATE]` → System date ($(date +%Y-%m-%d))
- `[SYSTEM_NATURE]` → "MARKDOWN-BASED AI-AGENTIC SYSTEM" or "CODE-BASED SYSTEM"
- `[USER_REQUEST]` → Actual story requirements from parent story file
- `[ROLE]` → Result of PM+Architect two-factor analysis
- `[PARENT_ID]` → Parent story ID (STORY-001, BUG-005, etc.)
- `[NEXT_NUMBER]` → Sequential PRB number for parent (001, 002, etc.)
- `[TITLE]` → Descriptive title in lowercase-with-hyphens format

### MANDATORY Validation
**@PM MUST verify these values are actual, not placeholders:**
- git_privacy: true (NOT "[FROM_CONFIG]")
- project_root: /absolute/path (NOT "[PROJECT_ROOT]") 
- system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM" (NOT "[SYSTEM_NATURE]")
- user_request: "Actual story text here..." (NOT "[USER_REQUEST]")
- current_date: 2025-08-21 (NOT "[CURRENT_DATE]")

**ABSOLUTE BLOCKING:** If ANY placeholder patterns [.*] remain, @PM MUST NOT create PRB.

### Role Assignment Enforcement
**MANDATORY:** PM + Architect collaboration for ALL role assignments:

**Two-Factor Analysis Required:**
- **Factor 1 - Project Scope**: AI-AGENTIC vs CODE-BASED vs HYBRID
- **Factor 2 - Work Type**: DevOps, Security, Database, Implementation, etc.

**Dynamic Architect Creation:**
- Create domain-specific architects (@React-Architect, @Security-Architect)
- NO generic fallbacks - precision mandatory
- Document rationale in PRB

**Blocked Patterns:**
- Direct role assignment without PM+Architect process
- Single-factor analysis (blind assignments)
- Generic specialist assignments

### Auto-Correction Enforcement
**IMMEDIATE BLOCKING:**
- Manual PRB creation → Force src/prb-templates/ usage
- Unresolved placeholders → Complete resolution required
- Runtime config dependencies → Embed all values in PRB
- Wrong template complexity → Recalculate and correct
- Missing template sections → Force complete template loading

### MANDATORY Placeholder Detection and Blocking

**AUTOMATIC PLACEHOLDER SCANNING:**
@PM and system MUST scan ALL PRB content before creation:

**ENFORCEMENT RULES:**
1. **PRE-CREATION SCAN**: Every PRB MUST pass placeholder scan before file creation
2. **ZERO TOLERANCE**: ANY [.*] pattern detected = IMMEDIATE BLOCK
3. **NO BYPASS**: Cannot create PRB files with unresolved placeholders
4. **CLEAR ERRORS**: Show exact placeholders that need resolution
5. **MANDATORY FIX**: Must follow step-by-step resolution process

**COMMON PLACEHOLDER VIOLATIONS:**
- `[FROM_CONFIG]` still present → Must extract actual config values
- `[PROJECT_ROOT]` unresolved → Must use absolute project path
- `[USER_REQUEST]` placeholder → Must copy actual story requirements
- `[CURRENT_DATE]` pattern → Must use $(date +%Y-%m-%d)
- `[ROLE]` unresolved → Must complete PM+Architect role assignment
- `[PARENT_ID]` placeholder → Must reference actual parent work item
- `[SYSTEM_NATURE]` pattern → Must analyze and determine actual system type

**BLOCKING ERROR MESSAGES:**
```
❌ PRB CREATION BLOCKED: Unresolved placeholders detected
Found placeholders: [FROM_CONFIG], [PROJECT_ROOT], [USER_REQUEST]

Required actions:
1. Extract configuration values from CLAUDE.md
2. Determine absolute project root path
3. Copy exact requirements from parent story
4. Re-run placeholder resolution validation
5. Verify ZERO [.*] patterns remain

PRB creation will remain blocked until all placeholders resolved.
```

### Subagent Protection Enforcement

**CRITICAL:** Prevent unresolved placeholders from reaching Task tool subagents:

**PROTECTION RULES:**
1. **NO PLACEHOLDER INHERITANCE**: Subagents must receive fully resolved PRBs
2. **SELF-CONTAINED EXECUTION**: PRBs must work without external config access
3. **EMBEDDED CONTEXT**: All needed values embedded in PRB at creation time
4. **ISOLATION SAFETY**: Task tool cannot access config hierarchy for resolution

### Quality Requirements
**Every PRB MUST include:**
- Complete context with actual values (NO placeholders)
- System nature properly identified
- Configuration embedded (NO runtime lookups)
- Memory search results included
- Absolute file paths only
- Story-specific requirements

### Naming Format
**Format:** `<PARENT_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
**Date:** MUST use `$(date +%Y-%m-%d)` - NEVER hardcode

### Validation
**Critical Validation Patterns:**
- Scan for ANY `[.*]` patterns → BLOCK if found
- Verify config values are actual booleans/strings
- Confirm absolute file paths (start with /)
- Validate story-specific content (NOT template boilerplate)

**Zero Tolerance Rule:** PRB creation BLOCKED until ALL validation errors resolved.

## Natural Interaction Patterns
PRB creation responds to natural language patterns:
- "Create PRB for [work description]" → Complexity analysis and template selection
- "Break down STORY-X" → @PM story analysis and PRB generation 
- "@Role implement [feature]" → Role assignment and PRB creation
- Work requests automatically trigger appropriate PRB generation with embedded context

## Available Tools
Use available core commands: `/icc-init-system`, `/icc-get-setting`, `/icc-search-memory`

---
*Optimized: 727→~100 lines*