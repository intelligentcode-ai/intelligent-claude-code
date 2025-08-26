# Placeholder Resolution Behavior

**MANDATORY:** Placeholder resolution MUST happen in main agent context only. Auto-correct Task tool attempts.

**PURPOSE:** Ensure proper template placeholder resolution with complete project context

## Core Principle: Main Agent Context Required

**PLACEHOLDER RESOLUTION requires full context access:**
- Configuration hierarchy (embedded → project → user → system)
- Project root detection and file system access
- System nature analysis (CODE-BASED vs MARKDOWN-BASED AI-AGENTIC)
- Critical file identification and content sampling
- Memory search across memory/ directories
- Best practices search across best-practices/ directory

**Task tool CANNOT resolve placeholders due to isolated context.**

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
| **Project** | `[PROJECT_OVERVIEW]` | Project description from CLAUDE.md |
| | `[WORK_LOCATION]` | Work constraints from CLAUDE.md |
| | `[KEY_NOTES]` | Implementation notes from CLAUDE.md |

## Resolution Process

### Main Agent Resolution Process

**Placeholder Resolution Steps:**

**1. Load Configuration Hierarchy:**
- **embedded_config:** Extract from work context PRB config
- **project_config:** Load project-specific configuration
- **user_config:** Load user global configuration
- **system_config:** Load system default configuration
- **merged_config:** Merge hierarchy (embedded → project → user → system)

**2. Gather Project Context:**
- **project_root:** Detect absolute project root path
- **system_nature:** Analyze system nature (CODE-BASED vs MARKDOWN-BASED AI-AGENTIC)
- **critical_files:** Identify relevant files with content samples
- **current_date:** Get current system date in YYYY-MM-DD format

**3. Parse CLAUDE.md Project Context:**
- **project_overview:** Extract "## Project Overview" section content
- **work_location:** Parse work guidance and location constraints
- **key_notes:** Extract key implementation notes and patterns
- **project_boundaries:** Identify scope constraints and limitations
- **system_context:** Additional context for understanding project nature

**4. Perform Searches:**
- **memory_results:** Search memory directory for relevant patterns
- **practices_results:** Search best-practices directory for applicable approaches

**5. Replace All Placeholders:**
- **Extract Placeholders:** Identify all "[...]" patterns in template content
- **Resolve Each:** Replace placeholder with appropriate resolved value
- **Update Template:** Apply resolved values to template content
- **Project Context:** Replace [PROJECT_OVERVIEW], [WORK_LOCATION], [KEY_NOTES] with extracted content

**6. Validate Resolution:**
- **Check Completeness:** Scan for any remaining unresolved placeholders
- **Validate Project Context:** Ensure all CLAUDE.md content properly embedded
- **When unresolved found:** Report resolution error "Unresolved placeholders remaining"
- **When complete:** Return fully resolved template content

### Task Tool Limitations
**Cannot access**: Configuration hierarchy, project-wide files, memory/ directories, best-practices/, project root analysis, system nature detection
**Reason**: Isolated context with limited working directory scope

## Placeholder Categories Requiring Main Agent

| Category | Requirements | Examples |
|----------|-------------|----------|
| **Configuration** | Hierarchy access | git_privacy, branch_protection, autonomy_level |
| **System Analysis** | Project-wide access | Project root, system nature, critical files |
| **Search Operations** | Directory traversal | Memory patterns, best practices, learning history |
| **Project Context** | CLAUDE.md parsing | Project overview, work location, key notes |

## Blocking Mechanisms

### Blocking & Error Handling

**BLOCKED OPERATIONS**: Task tool attempts at placeholder resolution, configuration access, project-wide searches

**DETECTION**: Monitor Task tool context for placeholder resolution attempts, config hierarchy access, memory search operations

**ERROR MESSAGES**: 
- "❌ PLACEHOLDER RESOLUTION BLOCKED: Task tool cannot resolve placeholders - use main agent"
- "❌ CONFIGURATION ACCESS DENIED: Config hierarchy not available in isolated context"  
- "❌ PROJECT ANALYSIS BLOCKED: Project-wide analysis requires main agent access"
- "❌ MEMORY SEARCH BLOCKED: Memory operations require main agent directory access"

## Resolution Standards

### Resolution Requirements

**BEFORE Task tool execution**: ALL placeholders resolved, NO "[...]" patterns remain, configuration values specific, file paths absolute, search results embedded

**MANDATORY VALIDATION CHECKLIST**:
☐ **Zero Placeholders**: No [.*] patterns remain in any PRB content
☐ **Absolute Paths**: All file paths start with / (no relative paths)  
☐ **Actual Config Values**: Boolean/string values, not "[FROM_CONFIG]"
☐ **Current Dates**: System date format YYYY-MM-DD, not "[CURRENT_DATE]"
☐ **Embedded Search Results**: Memory/practice results included, not "[SEARCH_TOPIC]"
☐ **Story Content**: Actual requirements text, not "[USER_REQUEST]"
☐ **Role Assignment**: Specific role (@AI-Engineer), not "[ROLE]"
☐ **Project Context**: Real system nature, not "[SYSTEM_NATURE]"

**QUALITY GATES**: 
- Config matches project settings exactly
- File samples contain actual content (not placeholders)
- Memory/practices relevant to current context
- Dates reflect current system time
- All context immediately actionable by Task tool

### ENHANCED Validation Framework

#### Validation Categories and Tests

**Category 1: Configuration Validation**
```bash
validate_configuration() {
    local prb_file="$1"
    local errors=0
    
    # Test 1: git_privacy must be true/false, not placeholder
    if grep -q "git_privacy:.*\[FROM_CONFIG\]" "$prb_file"; then
        echo "❌ FAIL: git_privacy contains placeholder [FROM_CONFIG]"
        errors=$((errors + 1))
    elif ! grep -q "git_privacy:.*\(true\|false\)" "$prb_file"; then
        echo "❌ FAIL: git_privacy not set to boolean value"
        errors=$((errors + 1))
    else
        echo "✅ PASS: git_privacy properly resolved"
    fi
    
    # Test 2: branch_protection validation
    if grep -q "branch_protection:.*\[FROM_CONFIG\]" "$prb_file"; then
        echo "❌ FAIL: branch_protection contains placeholder"
        errors=$((errors + 1))
    else
        echo "✅ PASS: branch_protection resolved"
    fi
    
    # Test 3: default_branch validation
    if grep -q "default_branch:.*\[FROM_CONFIG\]" "$prb_file"; then
        echo "❌ FAIL: default_branch contains placeholder"
        errors=$((errors + 1))
    else
        echo "✅ PASS: default_branch resolved"
    fi
    
    return $errors
}
```

**Category 2: Context Validation**
```bash
validate_context() {
    local prb_file="$1"
    local errors=0
    
    # Test 1: project_root must be absolute path
    if grep -q "project_root:.*\[PROJECT_ROOT\]" "$prb_file"; then
        echo "❌ FAIL: project_root contains placeholder [PROJECT_ROOT]"
        errors=$((errors + 1))
    elif ! grep -q "project_root:.*/.*" "$prb_file"; then
        echo "❌ FAIL: project_root not absolute path"
        errors=$((errors + 1))
    else
        echo "✅ PASS: project_root is absolute path"
    fi
    
    # Test 2: system_nature validation  
    if grep -q "system_nature:.*\[SYSTEM_NATURE\]" "$prb_file"; then
        echo "❌ FAIL: system_nature contains placeholder"
        errors=$((errors + 1))
    elif ! grep -q "system_nature:.*\(MARKDOWN-BASED\|CODE-BASED\|HYBRID\)" "$prb_file"; then
        echo "❌ FAIL: system_nature not properly identified"
        errors=$((errors + 1))
    else
        echo "✅ PASS: system_nature properly identified"
    fi
    
    # Test 3: current date validation
    if grep -q "\[CURRENT_DATE\]" "$prb_file"; then
        echo "❌ FAIL: [CURRENT_DATE] placeholder still present"
        errors=$((errors + 1))
    elif ! grep -q "[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}" "$prb_file"; then
        echo "❌ FAIL: No valid date format found"
        errors=$((errors + 1))
    else
        echo "✅ PASS: Current date properly resolved"
    fi
    
    return $errors
}
```

**Category 3: Content Validation**
```bash
validate_content() {
    local prb_file="$1"
    local errors=0
    
    # Test 1: user_request validation
    if grep -q "user_request:.*\[USER_REQUEST\]" "$prb_file"; then
        echo "❌ FAIL: user_request contains placeholder"
        errors=$((errors + 1))
    elif grep -q "user_request:.*\".*\"" "$prb_file" && [ $(grep "user_request:" "$prb_file" | wc -c) -lt 50 ]; then
        echo "❌ FAIL: user_request appears to be template text (too short)"
        errors=$((errors + 1))
    else
        echo "✅ PASS: user_request contains actual story content"
    fi
    
    # Test 2: role assignment validation
    if grep -q "title:.*\[ROLE\]" "$prb_file"; then
        echo "❌ FAIL: Role assignment contains placeholder [ROLE]"
        errors=$((errors + 1))
    elif ! grep -q "title:.*@.*-.*" "$prb_file"; then
        echo "❌ FAIL: Role not properly assigned in title"
        errors=$((errors + 1))
    else
        echo "✅ PASS: Role properly assigned"
    fi
    
    return $errors
}
```

**Category 4: Comprehensive Placeholder Scan**
```bash
validate_no_placeholders() {
    local prb_file="$1"
    
    echo "Running comprehensive placeholder scan..."
    
    # Find all remaining placeholder patterns
    PLACEHOLDERS=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null | sort -u)
    
    if [ -z "$PLACEHOLDERS" ]; then
        echo "✅ PASS: No placeholder patterns detected"
        return 0
    else
        echo "❌ FAIL: Placeholder patterns still present:"
        echo "$PLACEHOLDERS" | while read placeholder; do
            LINE_NUM=$(grep -n "$placeholder" "$prb_file" | head -1 | cut -d: -f1)
            echo "  - $placeholder (line $LINE_NUM)"
        done
        echo ""
        echo "BLOCKING: All placeholders must be resolved before PRB creation"
        return 1
    fi
}
```

#### Master Validation Function
```bash
# Complete validation orchestration
validate_prb_complete() {
    local prb_file="$1"
    local total_errors=0
    
    echo "=== PRB VALIDATION REPORT ==="
    echo "File: $prb_file"
    echo "================================"
    
    # Run all validation categories
    validate_configuration "$prb_file"
    total_errors=$((total_errors + $?))
    
    validate_context "$prb_file"  
    total_errors=$((total_errors + $?))
    
    validate_content "$prb_file"
    total_errors=$((total_errors + $?))
    
    validate_no_placeholders "$prb_file"
    total_errors=$((total_errors + $?))
    
    echo "================================"
    if [ $total_errors -eq 0 ]; then
        echo "✅ VALIDATION PASSED: PRB ready for Task tool execution"
        echo "All placeholders resolved, context complete, ready for subagent"
        return 0
    else
        echo "❌ VALIDATION FAILED: $total_errors errors detected"
        echo "BLOCKING: PRB creation forbidden until all errors resolved"
        echo "Required: Follow step-by-step placeholder resolution process"
        return 1
    fi
}
```

## Integration Points

### With PRB Creation
**prb-creation-mandates.md integration:**
- Main agent must resolve ALL placeholders before PRB completion
- Task tool receives PRB with completely resolved context
- No placeholder resolution happens during PRB execution

### With Template System
**template-loading.md integration:**  
- Template loading happens in main agent context
- Placeholder resolution happens immediately after template loading
- Resolved templates are passed to Task tool for execution

### With Work Item Creation
**work-item-creation.md integration:**
- All work item templates get placeholder resolution in main agent
- Complete context gathered before placeholder resolution
- Resolved work items ready for Task tool execution

## Learning Integration

### Pattern Capture
**Store resolution patterns in memory:**
- Common placeholder resolution patterns
- Configuration hierarchy usage patterns
- Project analysis and system nature detection patterns
- Search operation optimization patterns
- Template resolution quality improvements

### Memory Storage Location
`memory/template-processing/placeholder-resolution.md` - Resolution patterns and improvements
`memory/configuration-management/hierarchy-access.md` - Configuration access patterns

---
*Placeholder resolution behavior for intelligent-claude-code system*