# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories into PRBs with architect collaboration.

**PURPOSE:** @PM and specialist architect work together to analyze stories and create PRBs

## Imports
@./dynamic-specialist-creation.md

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
1. **Infrastructure/DevOps Keywords**:
   - "deploy", "CI/CD", "container", "docker", "kubernetes", "scaling", "build pipeline"
   
2. **Security Work Keywords**:
   - "security", "vulnerability", "compliance", "authentication", "authorization", "encrypt"
   
3. **Database Work Keywords**:
   - "database", "schema", "migration", "query", "SQL", "performance", "index"
   
4. **Implementation Keywords**:
   - "implement", "feature", "bug fix", "refactor", "code", "function", "API endpoint"
   
5. **AI/Behavioral Keywords**:
   - "behavioral", "memory", "learning", "agent", "PRB", "pattern", "decision"
   
6. **Architecture Keywords**:
   - "design", "architecture", "pattern", "structure", "framework", "system"
   
7. **Testing Keywords**:
   - "test", "QA", "validation", "quality", "coverage", "automation"
   
8. **Documentation Keywords**:
   - "documentation", "docs", "README", "guide", "manual", "API docs"

**Combined Analysis Logic:**
- Parse story requirements for work type keywords
- Match work type to specialist domain expertise  
- Cross-reference with project scope for final role selection

## Role Assignment Process

### Mandatory PM + Specialist Architect Collaboration
**CRITICAL:** PM MUST collaborate with appropriate architect for ALL role assignments:

1. **PM Analysis Phase**:
   - Analyze work requirements and complexity
   - Identify technical domains involved
   - Determine coordination needs

2. **Dynamic Specialist Architect Creation**:
   - **Analyze Project Context:** Check CLAUDE.md, file structure, and requirements
   - **Detect Technology Stack:** Identify primary technologies and frameworks
   - **ALWAYS Create Specialist Architects:**
     - Create @[Domain]-Architect based on actual project needs
     - Examples: @React-Architect, @Database-Architect, @Security-Architect, @AI-Architect, @Behavioral-Architect
     - NEVER use generic @Architect - precision is mandatory
   - **No Predefined Lists:** Specialists created dynamically from project context
   - **Universal System:** Works for ANY technology domain or project type
   - **Dynamic Specialist Creation:** Use `/icc-create-dynamic-specialist` command for <70% capability matches
   - **Subagent Integration:** Created specialists become available as subagents in .claude/agents/dynamic/

3. **Collaborative Analysis**:
   - PM + Selected Specialist Architect jointly evaluate requirements
   - Create appropriate domain specialists based on precise needs
   - Consider coordination complexity and dependencies

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
   
   **Decision Matrix Logic** (See role-assignment-matrix.md):
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

5. **Assignment Documentation**:
   - Document specialist creation rationale in PRB
   - Include domain matching and specialist definition
   - Reference PM + Specialist Architect collaboration in PRB context

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

**Large Story Breakdown Process:**
1. **Analyze total complexity**: Calculate full story complexity points
2. **Identify split points**: Find logical boundaries to divide work
3. **Create multiple PRBs**: Each focused on specific aspect, each <15 points
4. **Maintain dependencies**: Ensure PRBs can be executed in logical order
5. **Document relationships**: Note dependencies between PRBs in descriptions

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
3. **Determines Split Strategy:** Single PRB (≤15 points) or multiple PRBs (>15 points)
4. **Generates Compliant PRB Names:** Using format `<STORY_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
5. **Sequential Numbering:** Uses NumberingService for parent-scoped PRB numbers
6. **Template Selection:** Appropriate complexity and template selected using hierarchy
7. **CRITICAL: Complete Placeholder Resolution Process** (see section below)
8. **Creates PRBs:** In configured prb_path/prb_ready (default: `prbs/ready/`)
9. **Validation:** Each PRB name validated before creation and complexity under 15 points
10. **Ready for Execution:** Uses directory structure from configuration

### MANDATORY: Comprehensive Placeholder Resolution Process for @PM

**CRITICAL:** @PM MUST follow this systematic 7-phase process to fill ALL template placeholders correctly:

**BEHAVIORAL PATTERN:** @PM transforms empty template placeholders into actual project values through systematic data gathering and replacement.

---

## Phase 1: Template Loading and Placeholder Discovery

**@PM BEHAVIORAL GOAL:** Create complete inventory of what needs to be filled

### 1.1 Load Selected Template
**@PM BEHAVIORAL PATTERN:** Analyze story complexity → Select appropriate template

```markdown
@PM THINKING PROCESS:
1. Look at story requirements and scope
2. Count files that need modification (1 file=1pt, 2-5 files=3pts, etc.)
3. Estimate lines of change (>50 lines = higher complexity)
4. Check for external dependencies (APIs, databases = +3-5pts each)
5. Consider coordination needs (multiple roles = +2-3pts)
6. Select template based on total complexity score

TEMPLATE SELECTION RULES:
- 0-2 points: nano-prb-template.yaml (simple configs, typos)
- 3-5 points: tiny-prb-template.yaml (single file changes)
- 6-15 points: medium-prb-template.yaml (multi-file features)
- 16-30 points: large-prb-template.yaml (complex coordination)
- 30+ points: mega-prb-template.yaml (system-wide changes)
```

### 1.2 Create Complete Placeholder Inventory
**@PM BEHAVIORAL PATTERN:** Scan template → List every placeholder → Create checklist

```markdown
@PM SYSTEMATIC APPROACH:
1. Read through entire template file line by line
2. Look for EVERY pattern that looks like [SOMETHING]
3. Create a checklist with each placeholder marked as TODO
4. Track progress as you fill each one

COMMON PLACEHOLDERS @PM WILL FIND:
- [PARENT_ID] → Story ID being broken down
- [NEXT_NUMBER] → Sequential PRB number
- [TITLE] → Descriptive PRB title
- [CURRENT_DATE] → Today's date (NEVER hardcode!)
- [ROLE] → Result from PM+Architect collaboration
- [FROM_CONFIG] → Values from CLAUDE.md
- [PROJECT_ROOT] → Absolute project path
- [USER_REQUEST] → Story requirements
- [SUCCESS_CRITERIA] → What defines success
- [SYSTEM_NATURE] → MARKDOWN-BASED AI-AGENTIC SYSTEM or CODE-BASED SYSTEM

@PM TRACKING PATTERN:
☐ TODO → (working on it) → ☑ DONE
Always update checklist as you progress.
```

### 1.3 Verify Template Structure
```bash
# Ensure template has all required sections
REQUIRED_SECTIONS=("id:" "title:" "project_root:" "user_request:" "success_criteria:")
for section in "${REQUIRED_SECTIONS[@]}"; do
    if ! grep -q "$section" "$TEMPLATE"; then
        echo "❌ ERROR: Template missing required section: $section"
        exit 1
    fi
done
echo "✅ Template structure validated"
```

---

## Phase 2: Project Context and Configuration Data Gathering

**@PM BEHAVIORAL GOAL:** Gather ALL actual values needed to replace placeholders

### 2.1 Determine Project Root and Basic Context
**@PM BEHAVIORAL PATTERN:** Find project boundaries → Get current date → Validate paths
```markdown
@PM BEHAVIORAL THINKING:
1. "I need to find where this project starts and ends"
2. "I need today's date, and I must NEVER hardcode it"
3. "The path must be absolute (start with /) for consistency"

@PM EXECUTION PATTERN:
Step 1: Check if this is a git repository
  - If yes: Use git to find project root
  - If no: Use current working directory
Step 2: Get current date using system command
Step 3: Verify path format is correct

VALUES TO CAPTURE:
- PROJECT_ROOT: "/Users/ksamaschke/Work/Engineering/intelligent-claude-code"
- CURRENT_DATE: "2025-08-20" (from $(date +%Y-%m-%d))
```

### 2.2 Load Configuration Hierarchy
**@PM BEHAVIORAL PATTERN:** Find config file → Extract values → Validate they're real

```markdown
@PM BEHAVIORAL THINKING:
1. "I need to find the project's configuration settings"
2. "I must replace [FROM_CONFIG] with actual values, not leave it as placeholder"
3. "If no config exists, I'll use sensible defaults"

@PM SEARCH PRIORITY:
1. CLAUDE.md (main project config)
2. .claude/config.md (hidden config)
3. config.md (alternate location)
4. Use defaults if none found

@PM VALUE EXTRACTION PATTERN:
Look for lines like: "git_privacy: true"
Extract the part after the colon
Remove quotes and whitespace
Store as actual boolean/string value

VALUES TO CAPTURE:
- GIT_PRIVACY: true (boolean, not "[FROM_CONFIG]")
- BRANCH_PROTECTION: true (boolean, not "[FROM_CONFIG]")
- DEFAULT_BRANCH: "main" (string, not "[FROM_CONFIG]")
- BRANCH_PREFIX: "feature/" (string, not "[FROM_CONFIG]")
- AUTONOMY_LEVEL: "L2" (string, not "[FROM_CONFIG]")

@PM VALIDATION CHECK:
Each value must be actual data, not a placeholder.
If you see "[FROM_CONFIG]" in your final list, something went wrong!
```

### 2.3 Analyze System Nature
**@PM BEHAVIORAL PATTERN:** Count file types → Determine project nature → Classify system

```markdown
@PM BEHAVIORAL THINKING:
1. "What kind of system am I working with?"
2. "Is this mostly behavioral patterns (.md files) or code (.js/.py files)?"
3. "This affects which specialists I'll need"

@PM ANALYSIS APPROACH:
Step 1: Count markdown files (especially in behaviors/ directory)
Step 2: Count code files (.js, .py, .java, .ts, etc.)
Step 3: Apply decision logic

@PM CLASSIFICATION RULES:
- Many behaviors/ files + more .md than code = "MARKDOWN-BASED AI-AGENTIC SYSTEM"
- More code files than markdown = "CODE-BASED SYSTEM"  
- Mixed or unclear = "HYBRID SYSTEM"

VALUES TO CAPTURE:
- SYSTEM_NATURE: "MARKDOWN-BASED AI-AGENTIC SYSTEM" (for intelligent-claude-code)

@PM VALIDATION CHECK:
This MUST be one of the three exact strings above, not "[SYSTEM_NATURE]"!
```

---

## Phase 3: Story Analysis and Requirements Extraction  

**@PM BEHAVIORAL GOAL:** Extract specific story requirements to replace placeholder content

### 3.1 Extract Parent Story Information
**@PM BEHAVIORAL PATTERN:** Read story file → Extract story ID → Validate story exists
```markdown
@PM BEHAVIORAL THINKING:
1. "Which story am I breaking down into PRBs?"
2. "I need to extract the story ID to use as the parent reference"
3. "I need to validate this story actually exists"

@PM EXTRACTION PATTERN:
From filename "STORY-008-enhance-pm-process-2025-08-20.md"
Extract "STORY-008" as the PARENT_ID

VALUES TO CAPTURE:
- PARENT_ID: "STORY-008" (extracted from story filename)
- PARENT_STORY_FILE: Full path to the story file being broken down

@PM VALIDATION CHECK:
Story file must exist and be readable.
Parent ID must follow format like "STORY-001", "BUG-005", etc.
```

### 3.2 Extract Story Requirements
```bash
# Read complete story content for analysis
echo "Extracting story requirements..."
STORY_CONTENT=$(cat "$PARENT_STORY_FILE")

# Extract main user request (typically first few lines or marked section)
USER_REQUEST=$(echo "$STORY_CONTENT" | head -10 | grep -v '^#' | grep -v '^$' | head -3 | tr '\n' ' ')
if [ -z "$USER_REQUEST" ]; then
    echo "❌ ERROR: Cannot extract user request from story"
    exit 1
fi

echo "Extracted user request: $USER_REQUEST"

# @PM must manually define these based on story analysis:
echo ""
echo "⚠️  @PM MANUAL INPUT REQUIRED:"
echo "Based on story analysis, @PM must define:"
echo "1. SUCCESS_CRITERIA (what defines success)"
echo "2. FEATURE_BOUNDARY (what's included/excluded)"  
echo "3. PRIMARY_FILE (main file to modify)"
echo "4. SECONDARY_FILE (additional files if needed)"
echo "5. ROLE assignment (via PM+Architect collaboration)"
echo "6. DESCRIPTION (brief PRB description)"
```

### 3.3 Determine Next PRB Number
```bash
# Find next sequential PRB number for this parent story
echo "Determining next PRB number for $PARENT_ID..."

# Check both ready and completed directories
EXISTING_PRBS=$(ls prbs/ready/ prbs/completed/ 2>/dev/null | grep "^$PARENT_ID-PRB-" | wc -l)
NEXT_NUM=$((EXISTING_PRBS + 1))
NEXT_NUMBER=$(printf "%03d" $NEXT_NUM)

echo "Next PRB number: $NEXT_NUMBER"
echo "Full PRB ID will be: $PARENT_ID-PRB-$NEXT_NUMBER"
```

---

## Phase 4: Role Assignment via PM+Architect Collaboration

### 4.1 Apply Two-Factor Analysis
```bash
# @PM must execute this collaboration process
echo "=== PM+ARCHITECT COLLABORATION REQUIRED ==="
echo ""
echo "Factor 1 - Project Scope: $SYSTEM_NATURE"
echo "Factor 2 - Work Type Analysis:"
echo ""

# @PM analyzes work type keywords from story
WORK_ANALYSIS=$(echo "$STORY_CONTENT" | tr '[:upper:]' '[:lower:]')

if echo "$WORK_ANALYSIS" | grep -q -E "deploy|ci/cd|container|docker|kubernetes|scaling|build"; then
    SUGGESTED_WORK_TYPE="DevOps/Infrastructure"
    SUGGESTED_ARCHITECT="@DevOps-Architect"
    SUGGESTED_ROLE="@DevOps-Engineer"
elif echo "$WORK_ANALYSIS" | grep -q -E "security|vulnerability|compliance|auth|encrypt"; then
    SUGGESTED_WORK_TYPE="Security"
    SUGGESTED_ARCHITECT="@Security-Architect"
    SUGGESTED_ROLE="@Security-Engineer"
elif echo "$WORK_ANALYSIS" | grep -q -E "database|schema|migration|query|sql|performance"; then
    SUGGESTED_WORK_TYPE="Database"
    SUGGESTED_ARCHITECT="@Database-Architect"
    SUGGESTED_ROLE="@Database-Engineer"
elif echo "$WORK_ANALYSIS" | grep -q -E "behavioral|memory|learning|agent|prb|pattern"; then
    SUGGESTED_WORK_TYPE="AI/Behavioral"
    SUGGESTED_ARCHITECT="@Behavioral-Architect"
    SUGGESTED_ROLE="@AI-Engineer"
elif echo "$WORK_ANALYSIS" | grep -q -E "test|qa|validation|quality|coverage"; then
    SUGGESTED_WORK_TYPE="Testing"
    SUGGESTED_ARCHITECT="@QA-Architect"
    SUGGESTED_ROLE="@QA-Engineer"
else
    SUGGESTED_WORK_TYPE="Implementation"
    if [ "$SYSTEM_NATURE" = "MARKDOWN-BASED AI-AGENTIC SYSTEM" ]; then
        SUGGESTED_ARCHITECT="@Behavioral-Architect"
        SUGGESTED_ROLE="@AI-Engineer"
    else
        SUGGESTED_ARCHITECT="@Code-Architect"
        SUGGESTED_ROLE="@Developer"
    fi
fi

echo "Suggested work type: $SUGGESTED_WORK_TYPE"
echo "Suggested architect: $SUGGESTED_ARCHITECT"
echo "Suggested role: $SUGGESTED_ROLE"
echo ""
echo "@PM must confirm with $SUGGESTED_ARCHITECT and document rationale"
```

---

## Phase 5: Systematic Placeholder Replacement

### 5.1 Create Working Copy and Replace Basic Identifiers
```bash
# Create working copy of template
cp "$TEMPLATE" "/tmp/working-prb.yaml"
echo "Created working copy: /tmp/working-prb.yaml"

# Replace basic identifiers first
echo "Replacing basic identifiers..."
sed -i "s/\[PARENT_ID\]/$PARENT_ID/g" /tmp/working-prb.yaml
sed -i "s/\[NEXT_NUMBER\]/$NEXT_NUMBER/g" /tmp/working-prb.yaml  
sed -i "s/\[CURRENT_DATE\]/$CURRENT_DATE/g" /tmp/working-prb.yaml
sed -i "s|\[PROJECT_ROOT\]|$PROJECT_ROOT|g" /tmp/working-prb.yaml
sed -i "s/\[SYSTEM_NATURE\]/$SYSTEM_NATURE/g" /tmp/working-prb.yaml

echo "✅ Basic identifiers replaced"
```

### 5.2 Replace Configuration Placeholders  
```bash
# Replace all configuration-based placeholders
echo "Replacing configuration placeholders..."

# Handle [FROM_CONFIG] patterns - MUST be replaced with actual values
sed -i "s/git_privacy: \"\[FROM_CONFIG\]\"/git_privacy: $GIT_PRIVACY/g" /tmp/working-prb.yaml
sed -i "s/branch_protection: \"\[FROM_CONFIG\]\"/branch_protection: $BRANCH_PROTECTION/g" /tmp/working-prb.yaml
sed -i "s/default_branch: \"\[FROM_CONFIG\]\"/default_branch: \"$DEFAULT_BRANCH\"/g" /tmp/working-prb.yaml
sed -i "s/branch_prefix: \"\[FROM_CONFIG\]\"/branch_prefix: \"$BRANCH_PREFIX\"/g" /tmp/working-prb.yaml

# Replace any remaining [FROM_CONFIG] with actual values
sed -i "s/\[FROM_CONFIG\]/$DEFAULT_BRANCH/g" /tmp/working-prb.yaml

echo "✅ Configuration placeholders replaced"
```

### 5.3 Replace User Request and Basic Story Data
```bash
# Replace user request and basic story-derived content
echo "Replacing story-derived content..."

# Replace user request with actual extracted content
ESCAPED_USER_REQUEST=$(echo "$USER_REQUEST" | sed 's/[[\.*^$()+?{|]/\\&/g')
sed -i "s/\[USER_REQUEST\]/$ESCAPED_USER_REQUEST/g" /tmp/working-prb.yaml

echo "✅ Story-derived content replaced"

# Show remaining placeholders that need manual @PM input
echo ""
echo "=== @PM MANUAL REPLACEMENT REQUIRED ==="
REMAINING_PLACEHOLDERS=$(grep -o '\[.*\]' /tmp/working-prb.yaml | sort -u)
if [ -n "$REMAINING_PLACEHOLDERS" ]; then
    echo "These placeholders need @PM manual input:"
    echo "$REMAINING_PLACEHOLDERS"
    echo ""
    echo "@PM must replace each with specific values from story analysis:"
    echo "- [ROLE] → Result from PM+Architect collaboration"
    echo "- [DESCRIPTION] → Brief PRB description"
    echo "- [SUCCESS_CRITERIA] → Specific success criteria from story"
    echo "- [FEATURE_BOUNDARY] → What's included/excluded"
    echo "- [PRIMARY_FILE] → Main file to modify"
    echo "- [SECONDARY_FILE] → Additional files"
    echo "- [MAIN_FEATURE_REQUIREMENT] → Primary requirement"
    echo "- [SUPPORTING_REQUIREMENT_*] → Secondary requirements"
    echo "- [TOPIC] → Memory topic for search"
    echo "- [DOMAIN] → Best practices domain"
fi
```

---

## Phase 6: Quality Validation and Completeness Check

### 6.1 Automated Placeholder Detection
```bash
# Comprehensive placeholder validation
echo "=== PHASE 6: VALIDATION ==="
echo "Scanning for ANY remaining placeholders..."

PLACEHOLDER_CHECK=$(grep -o '\[.*\]' /tmp/working-prb.yaml | sort -u)
if [ -n "$PLACEHOLDER_CHECK" ]; then
    echo "❌ CRITICAL ERROR: Unresolved placeholders found:"
    echo "$PLACEHOLDER_CHECK"
    echo ""
    echo "@PM MUST resolve ALL placeholders before proceeding"
    exit 1
else
    echo "✅ All placeholders resolved"
fi
```

### 6.2 Configuration Values Validation
```bash
# Validate configuration values are actual values, not placeholders
echo "Validating configuration values..."

CONFIG_ERRORS=()
if grep -q '"\[FROM_CONFIG\]"' /tmp/working-prb.yaml; then
    CONFIG_ERRORS+=("Found unresolved [FROM_CONFIG] placeholders")
fi

if grep -q '"\[PROJECT_ROOT\]"' /tmp/working-prb.yaml; then
    CONFIG_ERRORS+=("Found unresolved [PROJECT_ROOT] placeholders")
fi

# Check that config values are proper types
if ! grep -q 'git_privacy: \(true\|false\)' /tmp/working-prb.yaml; then
    CONFIG_ERRORS+=("git_privacy must be boolean (true/false)")
fi

if ! grep -q 'branch_protection: \(true\|false\)' /tmp/working-prb.yaml; then
    CONFIG_ERRORS+=("branch_protection must be boolean (true/false)")
fi

if [ ${#CONFIG_ERRORS[@]} -gt 0 ]; then
    echo "❌ Configuration validation failed:"
    printf '%s\n' "${CONFIG_ERRORS[@]}"
    exit 1
else
    echo "✅ Configuration values validated"
fi
```

### 6.3 Content Quality and Completeness Check
```bash
# Check that all content is specific and actionable
echo "Checking content quality..."

QUALITY_ERRORS=()

# Check for generic/template-like content
if grep -q -i 'TODO\|FIXME\|placeholder\|example' /tmp/working-prb.yaml; then
    QUALITY_ERRORS+=("Found TODO/placeholder content - must be specific")
fi

# Check that file paths are absolute
if grep -q 'file.*: "[^/]' /tmp/working-prb.yaml; then
    QUALITY_ERRORS+=("File paths must be absolute (start with /)")
fi

# Check that requirements are specific (not generic)
if grep -q -E '(generic|basic|simple|standard) (requirement|feature)' /tmp/working-prb.yaml; then
    QUALITY_ERRORS+=("Requirements too generic - must be story-specific")
fi

if [ ${#CONFIG_ERRORS[@]} -gt 0 ]; then
    echo "❌ Content quality validation failed:"
    printf '%s\n' "${QUALITY_ERRORS[@]}"
    exit 1
else
    echo "✅ Content quality validated"
fi
```

---

## Phase 7: Final PRB Assembly and Creation

### 7.1 Generate Final PRB Filename
```bash
# Create properly formatted filename
TITLE=$(grep '^title:' /tmp/working-prb.yaml | cut -d'"' -f2 | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
FINAL_FILENAME="$PARENT_ID-PRB-$NEXT_NUMBER-$TITLE-$CURRENT_DATE.prb.yaml"

echo "Final PRB filename: $FINAL_FILENAME"

# Validate filename format
if [[ ! "$FINAL_FILENAME" =~ ^[A-Z]+-[0-9]+-PRB-[0-9]+-[a-z0-9-]+-[0-9]{4}-[0-9]{2}-[0-9]{2}\.prb\.yaml$ ]]; then
    echo "❌ ERROR: Generated filename doesn't match required format"
    echo "Generated: $FINAL_FILENAME"
    exit 1
fi
```

### 7.2 Create Final PRB with Complete Context
```bash
# Ensure complete context section exists and is populated
echo "Ensuring complete context section..."

# Check if complete_context section needs to be added/enhanced
if ! grep -q 'complete_context:' /tmp/working-prb.yaml; then
    # Add complete context section
    cat >> /tmp/working-prb.yaml << EOF

# MANDATORY: Complete Context Section  
complete_context:
  project_root: "$PROJECT_ROOT"
  system_nature: "$SYSTEM_NATURE"
  configuration:
    git_privacy: $GIT_PRIVACY
    branch_protection: $BRANCH_PROTECTION
    default_branch: "$DEFAULT_BRANCH"
    branch_prefix: "$BRANCH_PREFIX"
    autonomy_level: "$AUTONOMY_LEVEL"
  critical_files:
    - path: "$PROJECT_ROOT/src/behaviors/story-breakdown.md"
      purpose: "PM behavioral patterns for story breakdown"
      sample: "**MANDATORY:** @PM breaks down stories into PRBs"
  user_requirements:
    original_request: "$USER_REQUEST"
    success_criteria: "Defined during story analysis"
    behavioral_scope: "Enhance PM behavioral patterns"
EOF
    echo "✅ Complete context section added"
else
    echo "✅ Complete context section already exists"
fi
```

### 7.3 Final Validation and PRB Creation
```bash
# Run final comprehensive validation
echo "=== FINAL VALIDATION ==="

# One final check for any placeholders
FINAL_PLACEHOLDER_CHECK=$(grep -o '\[.*\]' /tmp/working-prb.yaml 2>/dev/null || true)
if [ -n "$FINAL_PLACEHOLDER_CHECK" ]; then
    echo "❌ FINAL VALIDATION FAILED: Still found placeholders:"
    echo "$FINAL_PLACEHOLDER_CHECK"
    exit 1
fi

# Validate YAML syntax
if ! python3 -c "import yaml; yaml.safe_load(open('/tmp/working-prb.yaml'))" 2>/dev/null; then
    echo "❌ YAML syntax validation failed"
    exit 1
fi

# Create final PRB file
mkdir -p prbs/ready/
cp /tmp/working-prb.yaml "prbs/ready/$FINAL_FILENAME"

echo "✅ PRB created successfully: prbs/ready/$FINAL_FILENAME"
echo ""
echo "=== @PM PLACEHOLDER RESOLUTION COMPLETE ==="
echo "✅ All placeholders resolved with actual values"
echo "✅ Configuration embedded from project hierarchy"  
echo "✅ Story requirements extracted and specified"
echo "✅ Role assigned via PM+Architect collaboration"
echo "✅ PRB is completely self-contained"
echo "✅ Ready for subagent execution"

# Update checklist to show completion
sed -i 's/☐ TODO:/☑ DONE:/g' /tmp/pm-checklist.txt
echo ""
echo "Updated checklist:"
cat /tmp/pm-checklist.txt
```

---

## @PM Error Prevention Guide

### COMMON MISTAKES TO AVOID:
❌ **Leaving `[FROM_CONFIG]` in final PRB** → Must load actual config values  
❌ **Using `[PROJECT_ROOT]` in paths** → Must use absolute path like `/Users/user/project`  
❌ **Keeping `[USER_REQUEST]` generic** → Must extract actual story requirements  
❌ **Not running `$(date +%Y-%m-%d)`** → Must use system date, never hardcode  
❌ **Skipping PM+Architect collaboration** → Must document role assignment rationale  
❌ **Creating PRB with ANY `[PLACEHOLDER]` patterns** → Must resolve 100% before creation

### SUCCESS PATTERN:
✅ **Phase 1** → Load template + create checklist  
✅ **Phase 2** → Gather all configuration data  
✅ **Phase 3** → Extract story requirements completely  
✅ **Phase 4** → Document PM+Architect collaboration  
✅ **Phase 5** → Replace ALL placeholders systematically  
✅ **Phase 6** → Validate NO placeholders remain  
✅ **Phase 7** → Create self-contained PRB

### VALIDATION COMMANDS:
```bash
# @PM must run these before PRB creation:
grep '\[.*\]' /tmp/working-prb.yaml  # Should return nothing
grep '".*FROM_CONFIG.*"' /tmp/working-prb.yaml  # Should return nothing  
python3 -c "import yaml; yaml.safe_load(open('/tmp/working-prb.yaml'))"  # Should succeed
```

**BLOCKING RULE:** If ANY validation fails, @PM MUST NOT create the PRB. Return to the appropriate phase and fix ALL issues first.

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

**CRITICAL:** Always use system date command - NEVER hardcode specific dates.

### Placeholder Resolution Error Prevention

**COMMON @PM MISTAKES TO AVOID:**
- ❌ Leaving `[FROM_CONFIG]` instead of loading actual config values
- ❌ Using `[PROJECT_ROOT]` instead of absolute path like `/Users/user/project`
- ❌ Keeping `[USER_REQUEST]` instead of copying actual story requirements  
- ❌ Using `[CURRENT_DATE]` instead of running `$(date +%Y-%m-%d)`
- ❌ Leaving `[ROLE]` instead of result from PM+Architect collaboration

**@PM SUCCESS PATTERN:**
1. **Load template** → **Scan for ALL `[PLACEHOLDERS]`** → **Gather actual values** → **Replace ALL placeholders** → **Validate NONE remain** → **Create PRB**

**BLOCKING RULE:** If ANY `[PLACEHOLDER]` patterns remain in final PRB, @PM MUST NOT create the PRB. Fix ALL placeholders first.

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