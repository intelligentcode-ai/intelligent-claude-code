# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories into PRBs with architect collaboration.

**PURPOSE:** @PM and specialist architect work together to analyze stories and create PRBs

## Core Process

**CRITICAL:** @PM story breakdown operates in MAIN AGENT context only (NOT Task tool).

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
- **EXECUTION**: Created PRBs are executed via Task tool with resolved context

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

- Stories live in configured story_path directory
- Drafts in story_path/story_drafts subdirectory
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
6. **Creates PRBs:** In configured prb_path ready directory
7. **Template Selection:** Appropriate complexity and template selected using hierarchy
8. **Validation:** Each PRB name validated before creation and complexity under 15 points
9. **Ready for Execution:** Uses directory structure from configuration

## PRB Creation Process

### Template-Based Creation
**BEHAVIORAL PATTERN:** @PM uses complexity-based template selection for all PRB creation:

**Template Selection Logic:**
- **Nano (0-2 points)**: Simple configurations, typos
- **Tiny (3-5 points)**: Single file changes
- **Medium (6-15 points)**: Multi-file features
- **Large (16-30 points)**: Complex coordination
- **Mega (30+ points)**: System-wide changes

### ENHANCED Placeholder Resolution Behavior

**CRITICAL:** @PM and @Architect MUST follow detailed resolution process for ALL placeholders.

#### @PM Template Loading and Analysis
**Step 1: Template Selection and Placeholder Inventory**
```bash
# @PM selects complexity-appropriate template
COMPLEXITY_SCORE=$(calculate_story_complexity)
if [ $COMPLEXITY_SCORE -le 2 ]; then
    TEMPLATE="src/prb-templates/nano-prb-template.yaml"
elif [ $COMPLEXITY_SCORE -le 5 ]; then
    TEMPLATE="src/prb-templates/tiny-prb-template.yaml"
elif [ $COMPLEXITY_SCORE -le 15 ]; then
    TEMPLATE="src/prb-templates/medium-prb-template.yaml"
else
    echo "❌ ERROR: Story too complex ($COMPLEXITY_SCORE points) - must split into multiple PRBs"
    exit 1
fi

# Create placeholder inventory
PLACEHOLDERS=$(grep -o '\[.*\]' "$TEMPLATE" | sort -u)
echo "Placeholders found: $PLACEHOLDERS"
```

#### @PM Configuration Extraction Process
**Step 2: CLAUDE.md Configuration Loading**
```bash
# @PM extracts actual configuration values
extract_config_values() {
    local config_file="CLAUDE.md"
    
    # Extract git settings
    git_privacy=$(grep -i "git_privacy" "$config_file" | grep -o "true\|false" | head -1)
    branch_protection=$(grep -i "branch_protection" "$config_file" | grep -o "true\|false" | head -1)
    default_branch=$(grep -i "default_branch" "$config_file" | sed 's/.*[[:space:]]//' | tr -d '"' | head -1)
    autonomy_level=$(grep -i "autonomy_level" "$config_file" | sed 's/.*[[:space:]]//' | tr -d '"' | head -1)
    
    # Set defaults if not found
    git_privacy=${git_privacy:-"true"}
    branch_protection=${branch_protection:-"true"}
    default_branch=${default_branch:-"main"}
    autonomy_level=${autonomy_level:-"L2"}
    
    echo "Configuration extracted:"
    echo "  git_privacy: $git_privacy"
    echo "  branch_protection: $branch_protection"
    echo "  default_branch: $default_branch"
    echo "  autonomy_level: $autonomy_level"
}
```

#### @PM Project Context Gathering
**Step 3: Project Analysis and Context Building**
```bash
# @PM gathers complete project context
gather_project_context() {
    # Get absolute project root
    PROJECT_ROOT=$(pwd)
    echo "Project root: $PROJECT_ROOT"
    
    # Analyze system nature
    analyze_system_nature() {
        MD_FILES=$(find . -maxdepth 3 -name "*.md" -type f | wc -l)
        BEHAVIOR_FILES=$(find . -name "*behavior*" -o -name "*agent*" -o -name "*prb*" | wc -l)
        CODE_FILES=$(find . -name "*.js" -o -name "*.py" -o -name "*.java" -o -name "*.ts" -o -name "*.go" | wc -l)
        
        if [ $BEHAVIOR_FILES -gt 5 ] && [ $MD_FILES -gt $CODE_FILES ]; then
            echo "MARKDOWN-BASED AI-AGENTIC SYSTEM"
        elif [ $CODE_FILES -gt $MD_FILES ]; then
            echo "CODE-BASED SYSTEM"
        else
            echo "HYBRID SYSTEM"
        fi
    }
    
    SYSTEM_NATURE=$(analyze_system_nature)
    CURRENT_DATE=$(date +%Y-%m-%d)
    
    echo "System nature: $SYSTEM_NATURE"
    echo "Current date: $CURRENT_DATE"
}
```

#### @PM Story Requirements Extraction
**Step 4: Parent Story Analysis**
```bash
# @PM extracts story requirements and context
extract_story_requirements() {
    local parent_story="$1"
    
    if [ ! -f "$parent_story" ]; then
        echo "❌ ERROR: Parent story not found: $parent_story"
        return 1
    fi
    
    # Extract story content
    USER_REQUEST=$(head -20 "$parent_story" | tail -15)  # Skip title, get main content
    SUCCESS_CRITERIA=$(grep -A10 -i "success\|criteria\|acceptance" "$parent_story" 2>/dev/null || echo "Standard implementation completion")
    FEATURE_SCOPE=$(grep -A5 -i "scope\|boundary\|limit" "$parent_story" 2>/dev/null || echo "Feature implementation within story boundaries")
    
    echo "User request extracted (${#USER_REQUEST} chars)"
    echo "Success criteria identified"
    echo "Feature scope defined"
}
```

#### @PM and @Architect Role Assignment
**Step 5: Two-Factor Role Assignment with Placeholder Resolution**
```bash
# @PM + @Architect collaboration for role assignment
assign_role_with_context() {
    local system_nature="$1"
    local work_type="$2"
    
    # PM analysis
    echo "@PM analyzing work requirements..."
    
    # Select appropriate architect specialist
    case "$work_type" in
        *behavioral*|*memory*|*agent*|*prb*)
            ARCHITECT="@Behavioral-Architect"
            ;;
        *security*|*auth*|*compliance*)
            ARCHITECT="@Security-Architect"
            ;;
        *database*|*sql*|*schema*)
            ARCHITECT="@Database-Architect"
            ;;
        *api*|*rest*|*graphql*)
            ARCHITECT="@API-Architect"
            ;;
        *)
            case "$system_nature" in
                *AI-AGENTIC*)
                    ARCHITECT="@Behavioral-Architect"
                    ;;
                *CODE-BASED*)
                    ARCHITECT="@Code-Architect"
                    ;;
                *)
                    ARCHITECT="@System-Architect"
                    ;;
            esac
            ;;
    esac
    
    echo "@PM collaborating with $ARCHITECT..."
    
    # Apply decision matrix
    if [[ "$system_nature" == *"AI-AGENTIC"* ]] && [[ "$work_type" == *"behavioral"* ]]; then
        ASSIGNED_ROLE="@AI-Engineer"
    elif [[ "$work_type" == *"security"* ]]; then
        ASSIGNED_ROLE="@Security-Engineer"
    elif [[ "$work_type" == *"database"* ]]; then
        ASSIGNED_ROLE="@Database-Engineer"
    elif [[ "$system_nature" == *"CODE-BASED"* ]]; then
        ASSIGNED_ROLE="@Developer"
    else
        ASSIGNED_ROLE="@AI-Engineer"  # Default for AI-AGENTIC systems
    fi
    
    echo "Role assigned: $ASSIGNED_ROLE"
    echo "Rationale: $system_nature + $work_type → $ASSIGNED_ROLE via PM+$ARCHITECT collaboration"
}
```

#### @PM Placeholder Replacement Execution
**Step 6: Complete Placeholder Resolution**
```bash
# @PM executes complete placeholder replacement
resolve_all_placeholders() {
    local template_file="$1"
    local output_file="$2"
    
    # Start with template
    cp "$template_file" "$output_file"
    
    # Replace configuration placeholders
    sed -i "s/\[FROM_CONFIG\]/$git_privacy/g" "$output_file"
    sed -i "s/\[PROJECT_ROOT\]/$PROJECT_ROOT/g" "$output_file"
    sed -i "s/\[SYSTEM_NATURE\]/$SYSTEM_NATURE/g" "$output_file"
    sed -i "s/\[CURRENT_DATE\]/$CURRENT_DATE/g" "$output_file"
    
    # Replace story-specific placeholders
    # Note: Complex replacements require careful escaping
    python3 -c "
import re
with open('$output_file', 'r') as f:
    content = f.read()
    
# Replace user request (escape special characters)
user_request = '''$USER_REQUEST'''.replace('\"', '\\\"')
content = re.sub(r'\[USER_REQUEST\]', user_request, content)

# Replace other placeholders
content = re.sub(r'\[SUCCESS_CRITERIA\]', '''$SUCCESS_CRITERIA''', content)
content = re.sub(r'\[FEATURE_SCOPE\]', '''$FEATURE_SCOPE''', content)
content = re.sub(r'\[ROLE\]', '$ASSIGNED_ROLE', content)

with open('$output_file', 'w') as f:
    f.write(content)
"
    
    echo "Placeholder replacement completed"
}
```

#### @PM Validation and Quality Assurance
**Step 7: MANDATORY Validation Process**
```bash
# @PM validates complete placeholder resolution
validate_prb_resolution() {
    local prb_file="$1"
    
    echo "Validating PRB resolution..."
    
    # Check for remaining placeholders
    REMAINING=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null | sort -u)
    if [ ! -z "$REMAINING" ]; then
        echo "❌ VALIDATION FAILED: Unresolved placeholders found:"
        echo "$REMAINING"
        echo ""
        echo "BLOCKING: PRB creation forbidden until ALL placeholders resolved"
        return 1
    fi
    
    # Verify critical values are not placeholders
    if grep -q "\[FROM_CONFIG\]" "$prb_file"; then
        echo "❌ CRITICAL: [FROM_CONFIG] still present - configuration not extracted"
        return 1
    fi
    
    if grep -q "\[PROJECT_ROOT\]" "$prb_file"; then
        echo "❌ CRITICAL: [PROJECT_ROOT] still present - project path not set"
        return 1
    fi
    
    if grep -q "\[USER_REQUEST\]" "$prb_file"; then
        echo "❌ CRITICAL: [USER_REQUEST] still present - story requirements not extracted"
        return 1
    fi
    
    # Verify actual values present
    if ! grep -q "git_privacy:.*true\|false" "$prb_file"; then
        echo "❌ CRITICAL: git_privacy not properly set"
        return 1
    fi
    
    if ! grep -q "project_root:.*/" "$prb_file"; then
        echo "❌ CRITICAL: project_root not absolute path"
        return 1
    fi
    
    echo "✅ VALIDATION PASSED: All placeholders resolved, actual values verified"
    return 0
}
```

**ABSOLUTE ENFORCEMENT:** @PM CANNOT create PRB until validation passes completely.

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

## Integration Points

### Behavioral Imports
- Template loading and hierarchy navigation
- Naming enforcement and validation patterns
- Work item creation separation (main agent vs Task tool)
- Placeholder resolution behavioral patterns
- Directory structure configuration compliance

### Configuration Integration
- Uses configured story_path for story location
- Uses configured prb_path for PRB creation
- Respects directory structure configuration
- Auto-creates missing directories as needed

---
*Story breakdown behavior for intelligent-claude-code system*