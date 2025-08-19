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

**3. Perform Searches:**
- **memory_results:** Search memory directory for relevant patterns
- **practices_results:** Search best-practices directory for applicable approaches

**4. Replace All Placeholders:**
- **Extract Placeholders:** Identify all "[...]" patterns in template content
- **Resolve Each:** Replace placeholder with appropriate resolved value
- **Update Template:** Apply resolved values to template content

**5. Validate Resolution:**
- **Check Completeness:** Scan for any remaining unresolved placeholders
- **When unresolved found:** Report resolution error "Unresolved placeholders remaining"
- **When complete:** Return fully resolved template content

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

**VALIDATION CHECKLIST**:
☐ No config/context/search patterns remain ☐ Absolute file paths ☐ Actual config values ☐ Current dates ☐ Embedded search results

**QUALITY GATES**: Config matches project settings, file samples actual content, memory/practices relevant to context, dates current, all context actionable

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

### Memory Storage Location
`memory/template-processing/placeholder-resolution.md` - Resolution patterns and improvements
`memory/configuration-management/hierarchy-access.md` - Configuration access patterns

---
*Placeholder resolution behavior for intelligent-claude-code system*