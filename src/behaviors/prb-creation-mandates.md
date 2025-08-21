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

**BLOCKED:** Subagents CANNOT create PRBs due to task-specific context limitations.

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
4. **CRITICAL: Execute Systematic Placeholder Resolution Process** (detailed below)
5. **Validate NO Placeholders**: Ensure ZERO unresolved placeholders remain
6. **Validate All Sections**: Ensure ALL mandatory template sections present
7. **Document Template Source**: Record template used in PRB metadata
8. **Block Runtime Config**: Ensure NO config lookups needed during execution

### MANDATORY: Systematic Placeholder Resolution Process

**@PM MUST follow this exact sequence for EVERY PRB creation:**

**CORE BEHAVIORAL PRINCIPLE:** Transform template placeholders into actual project values through systematic data gathering and replacement. NEVER leave placeholders unresolved.

#### Phase 1: Template Analysis and Preparation
**@PM BEHAVIORAL GOAL:** Understand exactly what needs to be filled

1. **Load selected template** from src/prb-templates/ (based on complexity score)
2. **Create placeholder inventory:**
   ```markdown
   @PM BEHAVIORAL PATTERN:
   - Read template line by line
   - Look for every [SOMETHING] pattern
   - Create checklist to track progress
   - Mark each as ☐ TODO initially
   ```
3. **Create resolution checklist** - track each placeholder as ☐ TODO → ☑ DONE

#### Phase 2: Data Gathering (BEFORE any placeholder filling)
**@PM BEHAVIORAL GOAL:** Collect ALL actual values needed to replace placeholders

**@PM GATHERING APPROACH:** Never start filling placeholders until you have ALL the real values ready.

**A. Basic Metadata:**
```markdown
@PM BEHAVIORAL PATTERN:
1. Find the story file being broken down
2. Extract parent ID from filename 
3. Get current date from system (NEVER hardcode!)
4. Determine project root path

VALUES TO CAPTURE:
- PARENT_ID: "STORY-008" (from story filename)
- CURRENT_DATE: "2025-08-20" (from $(date +%Y-%m-%d))
- PROJECT_ROOT: "/Users/ksamaschke/Work/Engineering/intelligent-claude-code"
```

**B. Configuration Hierarchy Loading:**
```markdown
@PM BEHAVIORAL PATTERN:
1. Look for CLAUDE.md in project root
2. Extract each config line like "git_privacy: true"
3. Store actual boolean/string values, not "[FROM_CONFIG]"

VALUES TO CAPTURE:
- GIT_PRIVACY: true (boolean)
- BRANCH_PROTECTION: false (boolean)
- DEFAULT_BRANCH: "main" (string)
- BRANCH_PREFIX: "feature/" (string)
- AUTONOMY_LEVEL: "L2" (string)
```

**C. System Nature Detection:**
```markdown
@PM BEHAVIORAL PATTERN:
1. Count markdown files (especially in behaviors/ directory)
2. Count code files (.js, .py, .java, etc.)
3. Apply decision logic to classify system type

VALUES TO CAPTURE:
- SYSTEM_NATURE: "MARKDOWN-BASED AI-AGENTIC SYSTEM" (for intelligent-claude-code)

@PM DECISION LOGIC:
- Lots of .md files + behaviors/ directory = "MARKDOWN-BASED AI-AGENTIC SYSTEM"
- More code files than markdown = "CODE-BASED SYSTEM"
- Mixed = "HYBRID SYSTEM"
```

**D. Story Requirements Extraction:**
```markdown
@PM BEHAVIORAL PATTERN:
1. Read entire story file carefully
2. Extract the main user request/requirement
3. Identify what defines success
4. Determine which files need modification

VALUES TO CAPTURE:
- USER_REQUEST: "Exact story requirements extracted from file"
- SUCCESS_CRITERIA: ["Specific success criterion 1", "Specific success criterion 2"]
- PRIMARY_FILE: "/absolute/path/to/main/file.md"
- SECONDARY_FILE: "/absolute/path/to/other/file.md"
```

**E. Role Assignment (via PM+Architect collaboration):**
```markdown
@PM BEHAVIORAL PATTERN:
1. Analyze system nature (from step C)
2. Analyze work type (implementation, security, database, etc.)
3. Collaborate with appropriate domain architect
4. Document role assignment rationale

VALUES TO CAPTURE:
- ROLE: "AI-Engineer" (for behavioral system work)
- RATIONALE: "AI-AGENTIC system + behavioral enhancement work"
```

#### Phase 3: Systematic Placeholder Replacement
**@PM BEHAVIORAL GOAL:** Replace EVERY placeholder with actual values collected in Phase 2

**@PM REPLACEMENT APPROACH:** Work through placeholders systematically. Never skip any. Update checklist as you go.

**1. Basic Identifiers:**
```markdown
@PM BEHAVIORAL PATTERN: Use values collected in Phase 2, make sure they're specific

TEMPLATE BEFORE:
[PARENT_ID] → Use value from Phase 2: "STORY-008"
[NEXT_NUMBER] → Count existing PRBs + 1: "002"
[TITLE] → Descriptive from story: "enhance-pm-process"
[CURRENT_DATE] → From $(date +%Y-%m-%d): "2025-08-20"
[ROLE] → From PM+Architect: "AI-Engineer"
[DESCRIPTION] → Story-specific: "Enhance @PM Process for Complete Placeholder Resolution"

TEMPLATE AFTER:
id: "STORY-008-PRB-002-enhance-pm-process-2025-08-20"
title: "[AI-Engineer] Enhance @PM Process for Complete Placeholder Resolution"
```

**2. Configuration Values:**
```markdown
@PM BEHAVIORAL PATTERN: Replace ALL [FROM_CONFIG] with actual values

TEMPLATE BEFORE:
git_privacy: "[FROM_CONFIG]"
branch_protection: "[FROM_CONFIG]"
default_branch: "[FROM_CONFIG]"
project_root: "[PROJECT_ROOT]"
system_nature: "[SYSTEM_NATURE]"

TEMPLATE AFTER (using Phase 2 values):
git_privacy: true
branch_protection: false
default_branch: "main"
project_root: "/Users/ksamaschke/Work/Engineering/intelligent-claude-code"
system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM"

@PM CRITICAL CHECK:
NO "[FROM_CONFIG]" patterns should remain!
NO "[PROJECT_ROOT]" patterns should remain!
NO "[SYSTEM_NATURE]" patterns should remain!
```

**3. Story-Derived Content:**
```yaml
[USER_REQUEST] → "Exact user request from story"
[SUCCESS_CRITERIA] → ["Specific criteria 1", "Specific criteria 2"]
[FEATURE_BOUNDARY] → "What's included and excluded"
[MAIN_FEATURE_REQUIREMENT] → "Primary requirement from story"
[SUPPORTING_REQUIREMENT_1] → "First supporting requirement"
[SUPPORTING_REQUIREMENT_2] → "Second supporting requirement"
[WHAT_TO_IMPLEMENT] → "Specific implementation details"
[EXPECTED_BEHAVIOR] → "How feature should behave"
```

**4. File Analysis Results:**
```yaml
[PRIMARY_FILE] → "src/behaviors/story-breakdown.md"
[SECONDARY_FILE] → "src/behaviors/prb-creation-mandates.md"
[OTHER_FILES_IF_NEEDED] → "src/behaviors/placeholder-resolution.md"
[TOPIC] → "behavioral-patterns" # For memory search
[DOMAIN] → "process-enhancement" # For best practices
```

#### Phase 4: Validation and Quality Control
**@PM MUST perform these checks:**

**A. Placeholder Completeness Check:**
```bash
# Scan final PRB for ANY remaining placeholders
if grep -q '\[.*\]' final-prb.yaml; then
    echo "❌ BLOCKED: Unresolved placeholders found:"
    grep -o '\[.*\]' final-prb.yaml
    exit 1
fi
```

**B. Configuration Validation:**
- Verify git_privacy is boolean (true/false), not "[FROM_CONFIG]"
- Verify branch_protection is boolean, not "[FROM_CONFIG]"
- Verify default_branch is string, not "[FROM_CONFIG]"
- Verify project_root is absolute path, not "[PROJECT_ROOT]"

**C. Content Quality Check:**
- All requirements are specific to the story
- All file paths are absolute
- All success criteria are measurable
- Complete context section has real values only

#### Phase 5: Final PRB Assembly
**@PM creates final PRB with:**
1. All placeholders replaced with actual values
2. Complete context section embedded
3. No runtime configuration dependencies
4. Self-contained execution context
5. Proper validation checklist

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

### ENHANCED: Comprehensive Placeholder Detection and Validation

**@PM BEHAVIORAL ERROR PATTERNS TO DETECT AND BLOCK:**

#### Level 1: Critical Placeholder Patterns (IMMEDIATE BLOCKING)
❌ **"[FROM_CONFIG]" anywhere in final PRB** → Error: "Configuration values not resolved from CLAUDE.md hierarchy"  
❌ **"[PROJECT_ROOT]" anywhere in final PRB** → Error: "Project root path not resolved to absolute path"  
❌ **"[USER_REQUEST]" anywhere in final PRB** → Error: "Story requirements not extracted from parent story"  
❌ **"[CURRENT_DATE]" anywhere in final PRB** → Error: "Date not generated with $(date +%Y-%m-%d) command"  
❌ **"[ROLE]" anywhere in final PRB** → Error: "Role not assigned via PM+Architect collaboration process"  
❌ **"[SYSTEM_NATURE]" anywhere in final PRB** → Error: "System nature not analyzed (should be MARKDOWN-BASED AI-AGENTIC SYSTEM, CODE-BASED SYSTEM, or HYBRID SYSTEM)"
❌ **ANY "[PLACEHOLDER_NAME]" pattern** → Error: "Unresolved placeholder found: {placeholder}"

#### Level 2: Configuration Type Validation (BEHAVIORAL CHECKING)
❌ **git_privacy: "[FROM_CONFIG]"** → Error: "@PM must load actual boolean value (true/false) from config"  
❌ **branch_protection: "[FROM_CONFIG]"** → Error: "@PM must load actual boolean value (true/false) from config"  
❌ **default_branch: "[FROM_CONFIG]"** → Error: "@PM must load actual string value (main/master/develop) from config"  
❌ **project_root: "[PROJECT_ROOT]"** → Error: "@PM must resolve to absolute path starting with /"  
❌ **user_request: "[USER_REQUEST]"** → Error: "@PM must extract actual requirements from story file"

#### Level 3: Content Quality Validation (BEHAVIORAL QUALITY)
❌ **Generic success criteria** → Error: "Success criteria must be specific to this story, not generic template text"  
❌ **Template boilerplate left unchanged** → Error: "Must customize all content for this specific story"  
❌ **Missing role assignment rationale** → Error: "Must document PM+Architect collaboration rationale"  
❌ **Relative file paths** → Error: "All file paths must be absolute (start with /)"  
❌ **Empty or TODO placeholders** → Error: "All placeholders must have actual values"

**COMPREHENSIVE BEHAVIORAL VALIDATION PROCESS:**

```markdown
# @PM MUST follow this validation sequence BEFORE creating any PRB:

## Step 1: Placeholder Scan
Execute: grep -o '\[.*\]' final-prb.yaml | sort -u
Result: MUST return empty (no output)
If not empty: STOP - return to placeholder resolution phase

## Step 2: Configuration Type Check
Validate these patterns exist in final PRB:
- git_privacy: true OR git_privacy: false (NOT "[FROM_CONFIG]")
- branch_protection: true OR branch_protection: false (NOT "[FROM_CONFIG]") 
- default_branch: "actual-branch-name" (NOT "[FROM_CONFIG]")
- project_root: "/absolute/path/to/project" (NOT "[PROJECT_ROOT]")

## Step 3: Story-Specific Content Check
Validate these sections have actual story-specific content:
- user_request: Contains actual story requirements (NOT "[USER_REQUEST]")
- success_criteria: Lists specific success criteria (NOT generic template text)
- title: Contains actual role and description (NOT "[ROLE] [DESCRIPTION]")

## Step 4: System Nature Validation
Validate complete_context.system_nature contains one of:
- "MARKDOWN-BASED AI-AGENTIC SYSTEM"
- "CODE-BASED SYSTEM" 
- "HYBRID SYSTEM"
NOT "[SYSTEM_NATURE]" or generic placeholder

## Step 5: File Path Validation
All file references must be absolute paths:
- primary_file: "/absolute/path/to/file.md" (NOT "relative/path" or "[PRIMARY_FILE]")
- All paths in critical_files section must start with "/"

## Step 6: Role Assignment Documentation
Validate PRB contains:
- Role assigned through PM+Architect collaboration
- Two-factor analysis rationale documented
- Domain architect creation justification (if applicable)
```

**AUTOMATED BEHAVIORAL VALIDATION SCRIPT:**

```bash
#!/bin/bash
# MANDATORY @PM PRB Validation Script
# @PM MUST run this before creating any PRB - NO EXCEPTIONS

PRB_FILE="$1"
if [ -z "$PRB_FILE" ]; then
    echo "❌ Usage: validate-prb.sh [prb-file]"
    exit 1
fi

if [ ! -f "$PRB_FILE" ]; then
    echo "❌ PRB file not found: $PRB_FILE"
    exit 1
fi

echo "=== @PM PRB VALIDATION SEQUENCE ==="
echo "Validating: $PRB_FILE"
echo ""

# VALIDATION ERRORS ARRAY
VALIDATION_ERRORS=()

# STEP 1: Placeholder Scan (CRITICAL - ZERO TOLERANCE)
echo "Step 1: Scanning for unresolved placeholders..."
PLACEHOLDERS=$(grep -o '\[.*\]' "$PRB_FILE" 2>/dev/null | sort -u)
if [ -n "$PLACEHOLDERS" ]; then
    VALIDATION_ERRORS+=("CRITICAL: Unresolved placeholders found:")
    while read -r placeholder; do
        VALIDATION_ERRORS+=("  - $placeholder")
    done <<< "$PLACEHOLDERS"
fi

# STEP 2: Configuration Type Validation
echo "Step 2: Validating configuration types..."
if grep -q 'git_privacy: "\[FROM_CONFIG\]"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("git_privacy not resolved from config (still shows [FROM_CONFIG])")
fi
if grep -q 'branch_protection: "\[FROM_CONFIG\]"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("branch_protection not resolved from config (still shows [FROM_CONFIG])")
fi
if grep -q 'default_branch: "\[FROM_CONFIG\]"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("default_branch not resolved from config (still shows [FROM_CONFIG])")
fi
if grep -q 'project_root: "\[PROJECT_ROOT\]"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("project_root not resolved to absolute path (still shows [PROJECT_ROOT])")
fi

# Check that git_privacy and branch_protection are actual booleans
if ! grep -q 'git_privacy: \(true\|false\)' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("git_privacy must be boolean (true or false), not string or placeholder")
fi
if ! grep -q 'branch_protection: \(true\|false\)' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("branch_protection must be boolean (true or false), not string or placeholder")
fi

# STEP 3: Story-Specific Content Validation
echo "Step 3: Validating story-specific content..."
if grep -q 'user_request: "\[USER_REQUEST\]"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("user_request not extracted from story (still shows [USER_REQUEST])")
fi
if grep -q 'title: "\[ROLE\] \[DESCRIPTION\]"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("title not customized (still shows [ROLE] [DESCRIPTION] template)")
fi

# Check for generic/template content
if grep -q -i 'generic\|template\|example\|TODO\|FIXME' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("Found generic/template content - must be story-specific")
fi

# STEP 4: System Nature Validation
echo "Step 4: Validating system nature..."
if grep -q 'system_nature: "\[SYSTEM_NATURE\]"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("system_nature not analyzed (still shows [SYSTEM_NATURE])")
fi
if ! grep -q 'system_nature: "\(MARKDOWN-BASED AI-AGENTIC SYSTEM\|CODE-BASED SYSTEM\|HYBRID SYSTEM\)"' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("system_nature must be one of: MARKDOWN-BASED AI-AGENTIC SYSTEM, CODE-BASED SYSTEM, or HYBRID SYSTEM")
fi

# STEP 5: File Path Validation
echo "Step 5: Validating file paths..."
# Check for relative paths in file references
if grep -q '_file: "[^/]' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("Found relative file paths - all paths must be absolute (start with /)")
fi

# STEP 6: Role Assignment Documentation
echo "Step 6: Validating role assignment documentation..."
if ! grep -q -i 'pm.*architect\|architect.*pm\|collaboration' "$PRB_FILE"; then
    VALIDATION_ERRORS+=("Missing PM+Architect collaboration documentation")
fi

# FINAL VALIDATION RESULT
echo ""
if [ ${#VALIDATION_ERRORS[@]} -eq 0 ]; then
    echo "✅ ALL VALIDATIONS PASSED"
    echo "✅ PRB is ready for creation"
    echo "✅ All placeholders resolved with actual values"
    echo "✅ Configuration embedded from project hierarchy"
    echo "✅ Story requirements extracted and specified"
    echo "✅ Role assignment documented"
    echo "✅ PRB is completely self-contained"
    exit 0
else
    echo "❌ VALIDATION FAILED - PRB CANNOT BE CREATED"
    echo ""
    echo "Found ${#VALIDATION_ERRORS[@]} validation errors:"
    printf '%s\n' "${VALIDATION_ERRORS[@]}"
    echo ""
    echo "🔄 @PM MUST fix ALL errors before PRB creation:"
    echo "   1. Return to appropriate placeholder resolution phase"
    echo "   2. Fix all identified issues"
    echo "   3. Re-run this validation script"
    echo "   4. Only create PRB when validation passes 100%"
    exit 1
fi
```

**ERROR RECOVERY GUIDANCE BY ERROR TYPE:**

**Configuration Errors:**
- **"[FROM_CONFIG] found"** → Return to Phase 2.2 (Load Configuration Hierarchy)
- **"Boolean values not loaded"** → Check CLAUDE.md parsing, verify config file exists
- **"Project root not absolute"** → Use `git rev-parse --show-toplevel` or `pwd`

**Content Errors:**
- **"[USER_REQUEST] found"** → Return to Phase 3.2 (Extract Story Requirements)
- **"Generic success criteria"** → Analyze story requirements, create specific criteria
- **"Template content unchanged"** → Customize all content for this specific story

**Role Assignment Errors:**
- **"[ROLE] placeholder found"** → Return to Phase 4 (PM+Architect Collaboration)
- **"Missing collaboration docs"** → Document two-factor analysis and rationale
- **"Role-system mismatch"** → Re-evaluate with appropriate domain architect

**System Analysis Errors:**
- **"[SYSTEM_NATURE] found"** → Return to Phase 2.3 (Analyze System Nature)
- **"Invalid system nature"** → Re-run file type analysis, choose correct classification

**BEHAVIORAL ENFORCEMENT PATTERN:**
1. **@PM attempts PRB creation** → System runs validation automatically
2. **ANY validation error found** → BLOCK creation, show specific errors
3. **@PM fixes errors** → Return to appropriate resolution phase
4. **@PM re-runs validation** → Must pass 100% before PRB creation allowed
5. **All validations pass** → PRB creation proceeds with self-contained content

**ZERO TOLERANCE RULE:** @PM CANNOT create PRB until ALL validation errors are resolved.

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
    git_privacy: true  # ACTUAL BOOLEAN, NOT "[FROM_CONFIG]"
    branch_protection: false  # ACTUAL BOOLEAN, NOT "[FROM_CONFIG]"
    default_branch: "main"  # ACTUAL STRING, NOT "[FROM_CONFIG]"
    autonomy_level: "L2"  # ACTUAL STRING, NOT "[FROM_CONFIG]"
  critical_files:
    - path: "/absolute/path/to/file"
      purpose: "specific purpose"
      sample: "actual content sample"
  user_requirements:
    original_request: "exact user words"
    clarifications: ["any clarifications needed"]
    success_criteria: ["specific success criteria"]
```

### MANDATORY: Placeholder Resolution Checkpoints

**@PM MUST verify at each checkpoint:**

**Checkpoint 1 - After Template Loading:**
- ☐ Template loaded from src/prb-templates/
- ☐ All placeholders identified and listed
- ☐ Placeholder resolution checklist created

**Checkpoint 2 - After Data Gathering:**
- ☐ Configuration values loaded from CLAUDE.md
- ☐ Project context gathered (root, system nature)
- ☐ Story requirements extracted
- ☐ Role assigned via PM+Architect collaboration

**Checkpoint 3 - After Placeholder Replacement:**
- ☐ All [PLACEHOLDER] patterns replaced
- ☐ No "[FROM_CONFIG]" strings remain
- ☐ No "[PROJECT_ROOT]" strings remain
- ☐ No "[USER_REQUEST]" strings remain
- ☐ All configuration values are actual booleans/strings

**Checkpoint 4 - Before PRB Creation:**
- ☐ Final scan shows ZERO placeholder patterns
- ☐ Complete context section has real values only
- ☐ All file paths are absolute
- ☐ All requirements are story-specific
- ☐ PRB is completely self-contained

**BLOCKING ENFORCEMENT:**
If ANY checkpoint fails, @PM MUST NOT proceed to next phase. Fix ALL issues before continuing.

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
Use these commands: `/icc-analyze-complexity`, `/icc-create-prb`, `/icc-think-sequential`, `/icc-validate-context`, `/icc-validate-prb-name`, `/icc-check-placeholders`

### NEW: Placeholder Resolution Commands
**@PM MUST use these validation commands:**
- `/icc-check-placeholders [prb-file]` - Scan PRB for unresolved placeholders
- `/icc-validate-config-values [prb-file]` - Verify config values are actual, not "[FROM_CONFIG]"
- `/icc-extract-placeholders [template]` - List all placeholders in template
- `/icc-resolve-placeholder [template] [placeholder] [value]` - Replace specific placeholder

---
*Optimized: 113→35 lines*