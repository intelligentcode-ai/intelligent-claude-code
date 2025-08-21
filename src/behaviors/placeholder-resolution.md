# Placeholder Resolution Behavior

**MANDATORY:** Placeholder resolution MUST happen in main agent context only. Auto-correct subagent attempts.

**PURPOSE:** Ensure proper template placeholder resolution with complete project context

## Core Principle: Main Agent Context Required

**PLACEHOLDER RESOLUTION requires full context access:**
- Configuration hierarchy (embedded → project → user → system)
- Project root detection and file system access
- System nature analysis (CODE-BASED vs MARKDOWN-BASED AI-AGENTIC)
- Critical file identification and content sampling
- Memory search across memory/ directories
- Best practices search across best-practices/ directory

**Subagents CANNOT resolve placeholders due to task-specific context.**

## Common Placeholders

| Category | Placeholder | Resolution |
|----------|-------------|------------|
| **Config** | `[FROM_CONFIG]` | Load from hierarchy |
| | `[GIT_PRIVACY]`, `[BRANCH_PROTECTION]` | Boolean settings |
| | `[DEFAULT_BRANCH]`, `[AUTONOMY_LEVEL]` | String settings |
| **Context** | `[PROJECT_ROOT]` | Absolute path |
| | `[SYSTEM_NATURE]` | "CODE-BASED" or "MARKDOWN-BASED AI-AGENTIC" |
| | `[CURRENT_DATE]` | YYYY-MM-DD format |
| **Files** | `[CRITICAL_FILES]` | Relevant files with samples |
| | `[FILE_SAMPLE:path]` | Content sample from path |
| **Search** | `[MEMORY_SEARCH:topic]` | Top memory entries |
| | `[BEST_PRACTICES:domain]` | Relevant practices |

## Resolution Process

### Main Agent Resolution Process

**@PM MUST follow this systematic placeholder resolution process:**

**Phase 1: Template Analysis and Placeholder Inventory**
```bash
# Step 1: Load template and create placeholder inventory
TEMPLATE="src/prb-templates/medium-prb-template.yaml"
echo "Scanning template for placeholders..."
grep -o '\[.*\]' "$TEMPLATE" | sort -u > placeholder-list.txt
echo "Found placeholders:"
cat placeholder-list.txt
```

**Phase 2: Configuration Data Gathering**
```bash
# Step 2: Load configuration hierarchy
echo "Loading project configuration..."

# A. Basic project context
PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
CURRENT_DATE=$(date +%Y-%m-%d)
echo "Project Root: $PROJECT_ROOT"
echo "Current Date: $CURRENT_DATE"

# B. Load CLAUDE.md configuration
if [ -f "$PROJECT_ROOT/CLAUDE.md" ]; then
    echo "Loading CLAUDE.md configuration..."
    GIT_PRIVACY=$(grep 'git_privacy:' CLAUDE.md | cut -d: -f2 | xargs)
    BRANCH_PROTECTION=$(grep 'branch_protection:' CLAUDE.md | cut -d: -f2 | xargs)
    DEFAULT_BRANCH=$(grep 'default_branch:' CLAUDE.md | cut -d: -f2 | xargs)
    BRANCH_PREFIX=$(grep 'branch_prefix:' CLAUDE.md | cut -d: -f2 | xargs)
    AUTONOMY_LEVEL=$(grep 'autonomy_level:' CLAUDE.md | cut -d: -f2 | xargs)
else
    echo "Warning: CLAUDE.md not found, using defaults"
    GIT_PRIVACY="true"
    BRANCH_PROTECTION="true"
    DEFAULT_BRANCH="main"
    BRANCH_PREFIX="feature/"
    AUTONOMY_LEVEL="L2"
fi

# C. Detect system nature
MD_COUNT=$(find "$PROJECT_ROOT" -name '*.md' -type f | wc -l)
CODE_COUNT=$(find "$PROJECT_ROOT" -name '*.js' -o -name '*.py' -o -name '*.java' -o -name '*.ts' -type f | wc -l)
if [ $MD_COUNT -gt $CODE_COUNT ]; then
    SYSTEM_NATURE="MARKDOWN-BASED AI-AGENTIC SYSTEM"
else
    SYSTEM_NATURE="CODE-BASED SYSTEM"
fi
echo "System Nature: $SYSTEM_NATURE"
```

**Phase 3: Story and Context Analysis**
```bash
# Step 3: Extract story requirements and context
PARENT_STORY="$1"  # Story file passed as argument
if [ -f "$PARENT_STORY" ]; then
    echo "Analyzing parent story: $PARENT_STORY"
    USER_REQUEST=$(grep -A 10 "## Requirements\|## Description" "$PARENT_STORY" | head -5)
    echo "User Request extracted"
else
    echo "Error: Parent story file not found: $PARENT_STORY"
    exit 1
fi

# Get next PRB number
PARENT_ID=$(basename "$PARENT_STORY" | cut -d'-' -f1-2)  # Extract STORY-XXX
NEXT_NUM=$(ls prbs/ready/ prbs/completed/ 2>/dev/null | grep "^$PARENT_ID-PRB-" | wc -l)
NEXT_NUM=$((NEXT_NUM + 1))
NEXT_NUMBER=$(printf "%03d" $NEXT_NUM)
echo "Next PRB Number: $NEXT_NUMBER"
```

**Phase 4: Systematic Placeholder Replacement**
```bash
# Step 4: Replace ALL placeholders with actual values
echo "Starting placeholder replacement..."

# Create working copy of template
cp "$TEMPLATE" working-prb.yaml

# Replace basic identifiers
sed -i "s/\[PARENT_ID\]/$PARENT_ID/g" working-prb.yaml
sed -i "s/\[NEXT_NUMBER\]/$NEXT_NUMBER/g" working-prb.yaml
sed -i "s/\[CURRENT_DATE\]/$CURRENT_DATE/g" working-prb.yaml
sed -i "s/\[PROJECT_ROOT\]/$PROJECT_ROOT/g" working-prb.yaml
sed -i "s/\[SYSTEM_NATURE\]/$SYSTEM_NATURE/g" working-prb.yaml

# Replace configuration placeholders
sed -i "s/git_privacy: \"\[FROM_CONFIG\]\"/git_privacy: $GIT_PRIVACY/g" working-prb.yaml
sed -i "s/branch_protection: \"\[FROM_CONFIG\]\"/branch_protection: $BRANCH_PROTECTION/g" working-prb.yaml
sed -i "s/default_branch: \"\[FROM_CONFIG\]\"/default_branch: \"$DEFAULT_BRANCH\"/g" working-prb.yaml
sed -i "s/\[FROM_CONFIG\]/$DEFAULT_BRANCH/g" working-prb.yaml  # Catch any remaining

# Replace story-derived content (manual step - @PM must do this)
echo "Manual replacement needed for story-specific placeholders:"
echo "- [USER_REQUEST] -> Extract from story requirements"
echo "- [SUCCESS_CRITERIA] -> Define based on story goals"
echo "- [ROLE] -> Result from PM+Architect collaboration"
echo "- [DESCRIPTION] -> Brief description from story analysis"
```

**Phase 5: Validation and Quality Control**
```bash
# Step 5: Validate NO placeholders remain
echo "Validating placeholder resolution..."

if grep -q '\[.*\]' working-prb.yaml; then
    echo "❌ CRITICAL ERROR: Unresolved placeholders found:"
    grep -n '\[.*\]' working-prb.yaml
    echo ""
    echo "@PM MUST resolve these placeholders before PRB creation:"
    grep -o '\[.*\]' working-prb.yaml | sort -u
    exit 1
else
    echo "✅ All placeholders resolved successfully"
fi

# Validate configuration values are actual
if grep -q '"\[FROM_CONFIG\]"' working-prb.yaml; then
    echo "❌ ERROR: [FROM_CONFIG] placeholders still present"
    exit 1
fi

if grep -q '"\[PROJECT_ROOT\]"' working-prb.yaml; then
    echo "❌ ERROR: [PROJECT_ROOT] placeholder still present"
    exit 1
fi

echo "✅ Configuration validation passed"
echo "PRB ready for creation: working-prb.yaml"
```

## COMPLETE EXAMPLE - Template Transformation Process

**@PM BEHAVIORAL DEMONSTRATION:** How to transform template placeholders into actual values

### BEFORE (Template with placeholders):
```yaml
id: "[PARENT_ID]-PRB-[NEXT_NUMBER]-[TITLE]-[CURRENT_DATE]"
title: "[ROLE] [DESCRIPTION]"
project_root: "[PROJECT_ROOT]"
system_nature: "[SYSTEM_NATURE]"
git_privacy: "[FROM_CONFIG]"
branch_protection: "[FROM_CONFIG]"
default_branch: "[FROM_CONFIG]"
user_request: "[USER_REQUEST]"
success_criteria: "[SUCCESS_CRITERIA]"
primary_file: "[PRIMARY_FILE]"
secondary_file: "[SECONDARY_FILE]"
```

### @PM STEP-BY-STEP TRANSFORMATION:

**Step 1: Basic Identifiers**
```markdown
@PM THINKING: "I need basic metadata about this PRB"
[PARENT_ID] → "STORY-008" (from story filename)
[NEXT_NUMBER] → "002" (count existing PRBs + 1)
[TITLE] → "enhance-pm-process" (descriptive from story)
[CURRENT_DATE] → "2025-08-20" (from $(date +%Y-%m-%d))
[ROLE] → "AI-Engineer" (from PM+Architect collaboration)
[DESCRIPTION] → "Enhance @PM Process for Complete Placeholder Resolution"
```

**Step 2: Configuration Values**
```markdown
@PM THINKING: "I need actual config values from CLAUDE.md"
[FROM_CONFIG] for git_privacy → true (boolean from config)
[FROM_CONFIG] for branch_protection → false (boolean from config)
[FROM_CONFIG] for default_branch → "main" (string from config)
[PROJECT_ROOT] → "/Users/ksamaschke/Work/Engineering/intelligent-claude-code"
[SYSTEM_NATURE] → "MARKDOWN-BASED AI-AGENTIC SYSTEM" (analyzed)
```

**Step 3: Story-Specific Content**
```markdown
@PM THINKING: "I need specific requirements from the story"
[USER_REQUEST] → "@PM needs clearer behavioral patterns for filling template placeholders"
[SUCCESS_CRITERIA] → ["All placeholders resolved in final PRBs", "No runtime config lookups needed"]
[PRIMARY_FILE] → "/Users/ksamaschke/Work/Engineering/intelligent-claude-code/src/behaviors/story-breakdown.md"
[SECONDARY_FILE] → "/Users/ksamaschke/Work/Engineering/intelligent-claude-code/src/behaviors/prb-creation-mandates.md"
```

### AFTER (@PM fills with actual values):
```yaml
id: "STORY-008-PRB-002-enhance-pm-process-2025-08-20"
title: "[AI-Engineer] Enhance @PM Process for Complete Placeholder Resolution"
project_root: "/Users/ksamaschke/Work/Engineering/intelligent-claude-code"
system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM"
git_privacy: true
branch_protection: false
default_branch: "main"
user_request: "@PM needs clearer behavioral patterns for filling template placeholders"
success_criteria: 
  - "All placeholders resolved in final PRBs"
  - "No runtime config lookups needed"
  - "Self-contained PRB execution"
primary_file: "/Users/ksamaschke/Work/Engineering/intelligent-claude-code/src/behaviors/story-breakdown.md"
secondary_file: "/Users/ksamaschke/Work/Engineering/intelligent-claude-code/src/behaviors/prb-creation-mandates.md"
```

### @PM VALIDATION CHECKLIST:
```markdown
☑ NO [PARENT_ID] patterns remain
☑ NO [NEXT_NUMBER] patterns remain  
☑ NO [CURRENT_DATE] patterns remain
☑ NO [ROLE] patterns remain
☑ NO [FROM_CONFIG] patterns remain
☑ NO [PROJECT_ROOT] patterns remain
☑ NO [SYSTEM_NATURE] patterns remain
☑ NO [USER_REQUEST] patterns remain
☑ NO [SUCCESS_CRITERIA] patterns remain
☑ NO [PRIMARY_FILE] patterns remain
☑ NO [SECONDARY_FILE] patterns remain
☑ All configuration values are actual booleans/strings
☑ All file paths are absolute (start with /)
☑ All requirements are story-specific
☑ PRB is completely self-contained
```

### @PM SUCCESS PATTERN:
```markdown
✅ Template → Data Gathering → Systematic Replacement → Validation → Self-Contained PRB
❌ Template → Quick Fill → Skip Validation → Placeholder Errors → Failed PRB
```

### Subagent Limitations
**Cannot access**: Configuration hierarchy, project-wide files, memory/ directories, best-practices/, project root analysis, system nature detection
**Reason**: Task-specific context with limited working scope

## Placeholder Categories Requiring Main Agent

| Category | Requirements | Examples |
|----------|-------------|----------|
| **Configuration** | Hierarchy access | git_privacy, branch_protection, autonomy_level |
| **System Analysis** | Project-wide access | Project root, system nature, critical files |
| **Search Operations** | Directory traversal | Memory patterns, best practices, learning history |

## Blocking Mechanisms

### Blocking & Error Handling

**BLOCKED OPERATIONS**: Subagent attempts at placeholder resolution, configuration access, project-wide searches

**DETECTION**: Monitor subagent context for placeholder resolution attempts, config hierarchy access, memory search operations

**ERROR MESSAGES**: 
- "❌ PLACEHOLDER RESOLUTION BLOCKED: Subagents cannot resolve placeholders - use main agent"
- "❌ CONFIGURATION ACCESS DENIED: Config hierarchy not available in subagent context"  
- "❌ PROJECT ANALYSIS BLOCKED: Project-wide analysis requires main agent access"
- "❌ MEMORY SEARCH BLOCKED: Memory operations require main agent directory access"

## Resolution Standards

### Resolution Requirements

**BEFORE subagent execution**: ALL placeholders resolved, NO "[...]" patterns remain, configuration values specific, file paths absolute, search results embedded

**MANDATORY VALIDATION CHECKLIST:**
- ☐ NO `[FROM_CONFIG]` patterns remain in final PRB
- ☐ NO `[PROJECT_ROOT]` patterns remain in final PRB  
- ☐ NO `[USER_REQUEST]` patterns remain in final PRB
- ☐ NO `[CURRENT_DATE]` patterns remain in final PRB
- ☐ NO `[ROLE]` patterns remain in final PRB
- ☐ NO `[PLACEHOLDER]` patterns of ANY type remain
- ☐ All configuration values are actual booleans/strings
- ☐ All file paths are absolute (start with /)
- ☐ All dates are in YYYY-MM-DD format
- ☐ All requirements are specific to the story
- ☐ Complete context section has real values only
- ☐ PRB is completely self-contained

**AUTOMATED VALIDATION SCRIPT:**
```bash
#!/bin/bash
# @PM MUST run this before creating any PRB
PRB_FILE="$1"

echo "Validating PRB placeholder resolution: $PRB_FILE"

# Check for any remaining placeholders
if grep -q '\[.*\]' "$PRB_FILE"; then
    echo "❌ VALIDATION FAILED: Unresolved placeholders:"
    grep -n '\[.*\]' "$PRB_FILE" | head -10
    exit 1
fi

# Check for specific problematic patterns
PROBLEMS=()
if grep -q '"\[FROM_CONFIG\]"' "$PRB_FILE"; then
    PROBLEMS+=("Configuration values not resolved")
fi
if grep -q '"\[PROJECT_ROOT\]"' "$PRB_FILE"; then
    PROBLEMS+=("Project root path not resolved")
fi
if grep -q '"\[USER_REQUEST\]"' "$PRB_FILE"; then
    PROBLEMS+=("Story requirements not extracted")
fi

if [ ${#PROBLEMS[@]} -gt 0 ]; then
    echo "❌ VALIDATION FAILED:"
    printf '%s\n' "${PROBLEMS[@]}"
    exit 1
fi

echo "✅ PRB validation passed - ready for creation"
```

**QUALITY GATES**: 
- Config matches actual project settings (not defaults)
- File paths exist and are accessible
- Story requirements captured completely
- Role assignments documented with rationale
- All context actionable and specific

## Integration Points

### With PRB Creation
**prb-creation-mandates.md integration:**
- Main agent must resolve ALL placeholders before PRB completion
- Subagents receive PRB with completely resolved context
- No placeholder resolution happens during PRB execution

### With Template System
**template-loading.md integration:**  
- Template loading happens in main agent context
- Placeholder resolution happens immediately after template loading
- Resolved templates are passed to subagents for execution

### With Work Item Creation
**work-item-creation.md integration:**
- All work item templates get placeholder resolution in main agent
- Complete context gathered before placeholder resolution
- Resolved work items ready for subagent execution

## Learning Integration

### Pattern Capture
**Store resolution patterns in memory:**
- Common placeholder resolution patterns
- Configuration hierarchy usage patterns
- Project analysis and system nature detection patterns
- Search operation optimization patterns
- Template resolution quality improvements
- Placeholder validation success/failure patterns
- @PM process enhancement learnings

### Memory Storage Location
`memory/template-processing/placeholder-resolution.md` - Resolution patterns and improvements
`memory/configuration-management/hierarchy-access.md` - Configuration access patterns
`memory/behavioral-patterns/pm-process-enhancements.md` - @PM process improvement patterns

## @PM Common Mistakes and Prevention

**BEHAVIORAL ANTI-PATTERNS:** Mistakes @PM often makes and how to avoid them

### Most Common @PM Errors:

**❌ ERROR 1: Leaving "[FROM_CONFIG]" in final PRB**
```markdown
@PM MISTAKE PATTERN:
- Sees "[FROM_CONFIG]" in template
- Doesn't load actual config values
- Leaves placeholder unchanged

@PM CORRECT PATTERN:
1. See "[FROM_CONFIG]" → "This needs actual config value"
2. Open CLAUDE.md → Find "git_privacy: true"
3. Replace "[FROM_CONFIG]" → true (the actual boolean)
4. Validate: NO "[FROM_CONFIG]" patterns remain
```

**❌ ERROR 2: Using "[PROJECT_ROOT]" instead of absolute path**
```markdown
@PM MISTAKE PATTERN:
- Sees "[PROJECT_ROOT]" in template
- Doesn't detect actual project path
- Leaves placeholder unchanged

@PM CORRECT PATTERN:
1. See "[PROJECT_ROOT]" → "This needs absolute path"
2. Find project root: "/Users/ksamaschke/Work/Engineering/intelligent-claude-code"
3. Replace "[PROJECT_ROOT]" → "/Users/ksamaschke/Work/Engineering/intelligent-claude-code"
4. Validate: Path starts with "/" and is real location
```

**❌ ERROR 3: Copying "[USER_REQUEST]" instead of story requirements**
```markdown
@PM MISTAKE PATTERN:
- Sees "[USER_REQUEST]" in template
- Doesn't read actual story file
- Leaves placeholder unchanged

@PM CORRECT PATTERN:
1. See "[USER_REQUEST]" → "This needs story requirements"
2. Read story file completely
3. Extract actual requirements: "@PM needs clearer behavioral patterns for filling template placeholders"
4. Replace "[USER_REQUEST]" → actual story text
5. Validate: Content is specific to this story
```

**❌ ERROR 4: Hardcoding dates instead of using system**
```markdown
@PM MISTAKE PATTERN:
- Sees "[CURRENT_DATE]" in template
- Types "2025-08-20" manually
- Hardcodes specific date

@PM CORRECT PATTERN:
1. See "[CURRENT_DATE]" → "This needs today's date"
2. Get date from system: $(date +%Y-%m-%d)
3. Replace "[CURRENT_DATE]" → actual system date
4. Validate: Date is current and in YYYY-MM-DD format
```

**❌ ERROR 5: Skipping PM+Architect collaboration for role**
```markdown
@PM MISTAKE PATTERN:
- Sees "[ROLE]" in template
- Assigns role without analysis
- Skips collaboration process

@PM CORRECT PATTERN:
1. See "[ROLE]" → "This needs PM+Architect collaboration"
2. Analyze system nature + work type
3. Collaborate with appropriate domain architect
4. Document rationale for role selection
5. Replace "[ROLE]" → "AI-Engineer" (with justification)
```

### @PM Prevention Strategies:

**STRATEGY 1: Systematic Checklist**
```markdown
Before starting ANY PRB creation:
☐ Read template completely - identify ALL placeholders
☐ Gather ALL data first - don't start filling until you have everything
☐ Replace systematically - work through each placeholder one by one
☐ Validate completely - scan final PRB for ANY remaining placeholders
☐ Double-check critical patterns: [FROM_CONFIG], [PROJECT_ROOT], [USER_REQUEST]
```

**STRATEGY 2: Validation Before Creation**
```markdown
Before creating PRB file:
1. Search for "[" in final content → Should find NOTHING
2. Check config values are boolean/string, not placeholder
3. Check file paths start with "/"
4. Check requirements are story-specific
5. Check role assignment has documented rationale
```

**STRATEGY 3: Error Pattern Recognition**
```markdown
If you see these in final PRB, STOP and fix:
- "[FROM_CONFIG]" → Load actual config value
- "[PROJECT_ROOT]" → Use absolute path
- "[USER_REQUEST]" → Extract from story
- "[CURRENT_DATE]" → Use $(date +%Y-%m-%d)
- "[ROLE]" → Apply PM+Architect process
- ANY "[SOMETHING]" → Identify and resolve
```

### Enhanced Error Recovery

**Common @PM Resolution Errors and Fixes:**

**Error: "[FROM_CONFIG] found in final PRB"**
- **Problem**: Config values not loaded from CLAUDE.md
- **Fix**: Run configuration loading script in Phase 2
- **Prevention**: Always validate config values are boolean/string, not placeholder

**Error: "[PROJECT_ROOT] found in final PRB"**
- **Problem**: Project root path not detected
- **Fix**: Use `git rev-parse --show-toplevel` or `pwd`
- **Prevention**: Verify path is absolute (starts with /)

**Error: "[USER_REQUEST] found in final PRB"**
- **Problem**: Story requirements not extracted
- **Fix**: Re-read parent story file completely
- **Prevention**: Copy exact requirements from story to PRB

**Error: "[ROLE] found in final PRB"**
- **Problem**: Role not assigned via PM+Architect collaboration
- **Fix**: Execute two-factor analysis process
- **Prevention**: Document role assignment rationale

**Recovery Process:**
1. **Identify unresolved placeholders** using validation script
2. **Return to appropriate Phase** (2=data gathering, 3=story analysis, 4=replacement)
3. **Fix specific issues** using error-specific guidance
4. **Re-run validation** until all placeholders resolved
5. **Create PRB** only after 100% validation success

---
*Enhanced placeholder resolution behavior with systematic @PM guidance for intelligent-claude-code system*