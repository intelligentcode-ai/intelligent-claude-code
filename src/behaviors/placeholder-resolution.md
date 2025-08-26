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

### Validation Framework

**Validation Categories:**

**Configuration Validation:**
- Verify git_privacy is true/false, not [FROM_CONFIG]
- Confirm branch_protection resolved from config
- Ensure default_branch is actual value
- Validate all config placeholders resolved

**Context Validation:**
- Check project_root is absolute path, not [PROJECT_ROOT]
- Verify system_nature properly identified (MARKDOWN-BASED/CODE-BASED/HYBRID)
- Confirm current date in YYYY-MM-DD format, not [CURRENT_DATE]
- Validate all context placeholders resolved

**Content Validation:**
- Ensure user_request contains actual story content, not [USER_REQUEST]
- Verify role assignment is specific (@Role), not [ROLE]
- Check all content placeholders resolved
- Validate story-specific requirements embedded

**Comprehensive Validation:**
- Scan for any remaining [.*] placeholder patterns
- Block PRB creation if any placeholders detected
- Ensure complete resolution before Task tool execution
- Report specific unresolved placeholders with clear error messages

## Integration and Learning

**System Integration:**
- PRB creation: Main agent resolves all placeholders before Task tool execution
- Template loading: Resolution happens immediately after template loading
- Work item creation: Complete context gathered before resolution

**Memory Integration:**
- Store successful resolution patterns in memory/template-processing/
- Capture configuration hierarchy patterns in memory/configuration-management/
- Learn from resolution improvements for future optimizations

---
*Placeholder resolution behavior for intelligent-claude-code system*