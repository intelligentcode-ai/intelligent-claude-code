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

### MANDATORY Placeholder Resolution Instructions

**CRITICAL:** @PM MUST follow these exact steps to resolve ALL placeholders before PRB creation.

#### Step 1: Load Template and Identify Placeholders
**@PM Instructions:**
1. Load selected template from src/prb-templates/
2. Scan template content for ALL placeholder patterns: [TEXT_IN_BRACKETS]
3. Create placeholder inventory: [FROM_CONFIG], [PROJECT_ROOT], [CURRENT_DATE], etc.
4. BLOCK PRB creation until ALL placeholders identified

#### Step 2: Gather Configuration Values 
**@PM Configuration Collection Process:**

**CLAUDE.md Configuration Loading:**
```bash
# Extract configuration from CLAUDE.md
CONFIG_SOURCE="CLAUDE.md"
git_privacy=$(grep "git_privacy:" $CONFIG_SOURCE | cut -d: -f2 | tr -d ' ')
branch_protection=$(grep "branch_protection:" $CONFIG_SOURCE | cut -d: -f2 | tr -d ' ')
default_branch=$(grep "default_branch:" $CONFIG_SOURCE | cut -d: -f2 | tr -d ' ')
autonomy_level=$(grep "autonomy_level:" $CONFIG_SOURCE | cut -d: -f2 | tr -d ' ')
```

**@PM MUST extract these actual values:**
- **git_privacy**: true/false (from CLAUDE.md or config hierarchy)
- **branch_protection**: true/false (from configuration)
- **default_branch**: "main"/"master"/"develop" (from configuration)
- **autonomy_level**: "L1"/"L2"/"L3" (from configuration)
- **branch_prefix**: "feature"/"bugfix"/"hotfix" (from configuration)

#### Step 3: Gather Project Context
**@PM Project Analysis Process:**

**CLAUDE.md Project Context Extraction:**
```bash
# Parse CLAUDE.md for project overview and constraints
CLAUDE_FILE="CLAUDE.md"
if [ -f "$CLAUDE_FILE" ]; then
    # Extract project overview section
    PROJECT_OVERVIEW=$(sed -n '/^## Project Overview/,/^## /p' "$CLAUDE_FILE" | grep -v "^##" | tr '\n' ' ')
    
    # Extract system nature from overview
    if echo "$PROJECT_OVERVIEW" | grep -q "AI-AGENTIC\|behavioral\|memory\|PRB"; then
        SYSTEM_NATURE="MARKDOWN-BASED AI-AGENTIC SYSTEM"
    elif echo "$PROJECT_OVERVIEW" | grep -q "code\|implementation\|API\|database"; then
        SYSTEM_NATURE="CODE-BASED SYSTEM"
    else
        SYSTEM_NATURE="HYBRID SYSTEM"
    fi
    
    # Extract work location constraints
    WORK_LOCATION=$(sed -n '/### Work Location Guidelines/,/^###\|^## /p' "$CLAUDE_FILE" | grep -v "^#" | tr '\n' ' ')
    
    # Extract key implementation notes
    KEY_NOTES=$(sed -n '/### Key Implementation Notes/,/^###\|^## /p' "$CLAUDE_FILE" | grep -v "^#" | tr '\n' ' ')
    
    # Extract project boundaries and constraints
    PROJECT_BOUNDARIES=$(awk '/[Bb]oundary|[Cc]onstraint|[Ss]cope/,/^##|^$/ {print}' "$CLAUDE_FILE" | grep -v "^#" | head -3)
fi
```

**Project Root Detection:**
```bash
# Get absolute project root path
PROJECT_ROOT=$(pwd)
echo "Project Root: $PROJECT_ROOT"
```

**System Nature Analysis:**
```bash
# Count file types to determine system nature
MD_COUNT=$(find . -name "*.md" -type f | wc -l)
CODE_COUNT=$(find . -name "*.js" -o -name "*.py" -o -name "*.java" -o -name "*.ts" | wc -l)

if [ $MD_COUNT -gt $CODE_COUNT ]; then
    SYSTEM_NATURE="MARKDOWN-BASED AI-AGENTIC SYSTEM"
else
    SYSTEM_NATURE="CODE-BASED SYSTEM"
fi
```

**Current Date Generation:**
```bash
# Always get current date from system
CURRENT_DATE=$(date +%Y-%m-%d)
echo "Current Date: $CURRENT_DATE"
```

#### Step 4: Extract Story Requirements
**@PM Story Analysis Process:**

**Parent Story Reading:**
```bash
# Read parent story file
STORY_FILE="stories/STORY-XXX-title-date.md"
USER_REQUEST=$(cat "$STORY_FILE" | head -10)  # First 10 lines
SUCCESS_CRITERIA=$(grep -A5 "Success:" "$STORY_FILE" || grep -A5 "Criteria:" "$STORY_FILE")
FEATURE_SCOPE=$(grep -A3 "Scope:" "$STORY_FILE" || echo "Standard feature implementation")
```

#### Step 5: Execute Placeholder Replacement
**@PM Replacement Process:**

**Template Variable Substitution:**
```bash
# Replace ALL placeholders with actual values
sed "s/\[FROM_CONFIG\]/$git_privacy/g" template.yaml > temp1.yaml
sed "s/\[PROJECT_ROOT\]/$PROJECT_ROOT/g" temp1.yaml > temp2.yaml  
sed "s/\[CURRENT_DATE\]/$CURRENT_DATE/g" temp2.yaml > temp3.yaml
sed "s/\[SYSTEM_NATURE\]/$SYSTEM_NATURE/g" temp3.yaml > temp4.yaml

# Replace project context placeholders with CLAUDE.md content
sed "s/\[PROJECT_OVERVIEW\]/$PROJECT_OVERVIEW/g" temp4.yaml > temp5.yaml
sed "s/\[WORK_LOCATION\]/$WORK_LOCATION/g" temp5.yaml > temp6.yaml
sed "s/\[KEY_NOTES\]/$KEY_NOTES/g" temp6.yaml > resolved.yaml
```

**Manual Replacement for Complex Placeholders:**
- `[USER_REQUEST]` → Copy exact story requirements from parent story file
- `[SUCCESS_CRITERIA]` → Extract success criteria from story file
- `[FEATURE_SCOPE]` → Define feature boundaries from story analysis
- `[ROLE]` → Result of PM+Architect two-factor analysis
- `[PARENT_ID]` → Parent story ID (STORY-001, BUG-005, etc.)
- `[NEXT_NUMBER]` → Sequential PRB number for parent (001, 002, etc.)
- `[TITLE]` → Descriptive title in lowercase-with-hyphens format
- `[DESCRIPTION]` → Work description for title and branch naming
- `[PROJECT_OVERVIEW]` → Extracted project overview from CLAUDE.md
- `[WORK_LOCATION]` → Work location constraints from CLAUDE.md  
- `[KEY_NOTES]` → Key implementation notes from CLAUDE.md

#### Step 6: MANDATORY Validation
**@PM Validation Checklist:**

**Placeholder Validation Process:**
```bash
# Scan for any remaining placeholders
REMAINING_PLACEHOLDERS=$(grep -o '\[.*\]' resolved.yaml | wc -l)
if [ $REMAINING_PLACEHOLDERS -gt 0 ]; then
    echo "❌ VALIDATION FAILED: $REMAINING_PLACEHOLDERS placeholders remain"
    grep '\[.*\]' resolved.yaml  # Show remaining placeholders
    exit 1
else
    echo "✅ VALIDATION PASSED: All placeholders resolved"
fi
```

**@PM MUST verify these values are actual, not placeholders:**
- git_privacy: true (NOT "[FROM_CONFIG]")
- project_root: /absolute/path (NOT "[PROJECT_ROOT]") 
- system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM" (NOT "[SYSTEM_NATURE]")
- user_request: "Actual story text here..." (NOT "[USER_REQUEST]")
- current_date: 2025-08-21 (NOT "[CURRENT_DATE]")
- project_overview: "Actual project overview from CLAUDE.md..." (NOT "[PROJECT_OVERVIEW]")
- work_location: "Actual work constraints from CLAUDE.md..." (NOT "[WORK_LOCATION]")
- key_notes: "Actual implementation notes from CLAUDE.md..." (NOT "[KEY_NOTES]")

**ABSOLUTE BLOCKING:** If ANY placeholder patterns [.*] remain, @PM MUST NOT create PRB.

#### Step 7: Create Self-Contained PRB
**@PM Final Creation:**
1. Save resolved template as properly named PRB file
2. Verify PRB contains NO placeholder patterns [.*]
3. Confirm PRB can execute without external config lookups
4. Document resolution process completion
5. Ready for Task tool execution with embedded context

**Quality Verification:**
- Every placeholder replaced with actual value
- Configuration values match project settings  
- File paths are absolute and valid
- Story requirements are specific and clear
- Role assignment documented with rationale
- Complete context embedded for execution

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

```bash
# Automatic placeholder detection in PRB content
PLACEHOLDER_SCAN() {
    local prb_file="$1"
    
    # Scan for any remaining placeholder patterns
    PLACEHOLDERS_FOUND=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null | sort -u)
    PLACEHOLDER_COUNT=$(echo "$PLACEHOLDERS_FOUND" | wc -l)
    
    if [ ! -z "$PLACEHOLDERS_FOUND" ] && [ "$PLACEHOLDER_COUNT" -gt 0 ]; then
        echo "❌ CRITICAL ERROR: Unresolved placeholders detected in PRB:"
        echo "$PLACEHOLDERS_FOUND"
        echo ""
        echo "BLOCKED: PRB creation forbidden until ALL placeholders resolved"
        echo "Required action: Follow Step-by-Step Placeholder Resolution Process"
        return 1
    else
        echo "✅ VALIDATION PASSED: No placeholder patterns detected"
        return 0
    fi
}
```

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

**SUBAGENT CONTEXT VALIDATION:**
```bash
# Validate PRB context before Task tool execution
VALIDATE_SUBAGENT_CONTEXT() {
    local prb_content="$1"
    
    # Check for placeholder leakage to subagents
    if echo "$prb_content" | grep -q '\[.*\]'; then
        echo "❌ SUBAGENT PROTECTION VIOLATED: Placeholders detected in execution context"
        echo "Task tool subagents cannot resolve placeholders - must be resolved in main agent"
        echo "BLOCKING execution until placeholders resolved in main agent context"
        return 1
    fi
    
    # Verify self-contained context
    if ! echo "$prb_content" | grep -q "git_privacy:.*true\|false"; then
        echo "❌ INCOMPLETE CONTEXT: Configuration not embedded"
        return 1
    fi
    
    return 0
}
```

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