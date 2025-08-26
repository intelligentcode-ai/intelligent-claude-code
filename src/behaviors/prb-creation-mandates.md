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
   - [FROM_CONFIG] → actual config values (git_privacy: <ACTUAL_VALUE>, not "[FROM_CONFIG]")
   - [PROJECT_ROOT] → actual project root path
   - [CURRENT_DATE] → actual system date
   - [ALL-SETTINGS] → actual configuration object
   - [TECHNOLOGY_DOMAINS] → actual technology domains for unlimited specialist creation
6. **Embed Complete Context**: All config values embedded in PRB complete_context
7. **Embed Specialization Context**: Technology domains and unlimited specialist creation instructions embedded
8. **Validate NO Placeholders**: Ensure ZERO unresolved placeholders remain
9. **Validate All Sections**: Ensure ALL mandatory template sections present
10. **Document Template Source**: Record template used in PRB metadata
11. **Block Runtime Config**: Ensure NO config lookups needed during execution

### MANDATORY Placeholder Resolution Requirements

**CRITICAL:** @PM MUST resolve ALL placeholders before PRB creation.

**Resolution Requirements:**
1. **Template Loading:** Load appropriate template from src/prb-templates/
2. **Configuration Access:** Extract actual values from configuration hierarchy
3. **Project Context:** Gather project root, system nature, and CLAUDE.md content
4. **Placeholder Replacement:** Replace ALL [PLACEHOLDER] patterns with actual values
5. **Validation:** Ensure zero unresolved placeholders remain

**Required Configuration Values:**
- **git_privacy**: true/false from configuration hierarchy
- **branch_protection**: true/false from settings
- **default_branch**: "main"/"master"/"develop" from config
- **autonomy_level**: "L1"/"L2"/"L3" from settings
- **branch_prefix**: "feature"/"bugfix"/"hotfix" from config

**Project Context Requirements:**
1. **CLAUDE.md Analysis:** Parse project overview, work constraints, and key implementation notes
2. **System Nature Detection:** Determine if AI-AGENTIC, CODE-BASED, or HYBRID system
3. **Project Root:** Get absolute project path
4. **Current Date:** Use system date in YYYY-MM-DD format
5. **Project Boundaries:** Extract scope constraints from CLAUDE.md

**Story Analysis Requirements:**
1. **Parent Story:** Read complete story file for requirements
2. **Success Criteria:** Extract specific success conditions
3. **Feature Scope:** Define implementation boundaries
4. **User Request:** Capture exact user requirements

**Placeholder Replacement Process:**
1. **Configuration Placeholders:** Replace [FROM_CONFIG] with actual config values
2. **Context Placeholders:** Replace [PROJECT_ROOT], [CURRENT_DATE], [SYSTEM_NATURE]
3. **Project Placeholders:** Replace [PROJECT_OVERVIEW], [WORK_LOCATION], [KEY_NOTES]
4. **Story Placeholders:** Replace [USER_REQUEST], [SUCCESS_CRITERIA], [FEATURE_SCOPE]
5. **Work Item Placeholders:** Replace [ROLE], [PARENT_ID], [TITLE], [DESCRIPTION]

**MANDATORY Validation Requirements:**

**Validation Process:**
1. **Scan for Placeholders:** Check for any remaining [.*] patterns
2. **Verify Actual Values:** Ensure all values are actual, not placeholder patterns
3. **Block on Failure:** Prevent PRB creation if any placeholders remain
4. **Complete Resolution:** All placeholders must be resolved before proceeding

**Required Actual Values (NOT placeholders):**
- git_privacy: true/false (NOT "[FROM_CONFIG]")
- project_root: /absolute/path (NOT "[PROJECT_ROOT]")
- system_nature: actual system type (NOT "[SYSTEM_NATURE]")
- user_request: actual story content (NOT "[USER_REQUEST]")
- current_date: YYYY-MM-DD format (NOT "[CURRENT_DATE]")
- project_overview: actual CLAUDE.md content (NOT "[PROJECT_OVERVIEW]")

**ABSOLUTE BLOCKING:** Zero tolerance for unresolved placeholders.

### Role Assignment and Quality Standards

**PM + Architect Collaboration Required:**
- Two-factor analysis: Project scope + Work type
- Dynamic architect creation for domain expertise
- Document rationale in PRB context
- No generic assignments - precision mandatory

**Quality Requirements:**
- All placeholders resolved with actual values
- Configuration matches project settings
- Complete context embedded for execution
- Zero tolerance for unresolved patterns

### Execution Protection and Standards

**Subagent Protection:**
- PRBs must be fully resolved before Task tool execution
- No placeholder inheritance to subagents
- Self-contained execution with embedded context
- Block execution if placeholders detected

**Validation Standards:**
- Zero [.*] placeholder patterns allowed
- Actual config values required (no placeholders)
- Absolute file paths mandatory
- Story-specific content embedded

**Naming:** `<PARENT_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml` (use system date)

## Natural Interaction Patterns
PRB creation responds to natural language patterns:
- "Create PRB for [work description]" → Complexity analysis and template selection
- "Break down STORY-X" → @PM story analysis and PRB generation 
- "@Role implement [feature]" → Role assignment and PRB creation
- Work requests automatically trigger appropriate PRB generation with embedded context

## Integration

**Core Commands:** `/icc-init-system`, `/icc-get-setting`, `/icc-search-memory`
**Natural Patterns:** "Create PRB for [work]", "Break down STORY-X", "@Role implement [feature]"
**Automatic Triggers:** Work requests trigger PRB generation with embedded context

---
*Cleaned: 727→~150 lines*