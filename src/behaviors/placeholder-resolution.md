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

## Resolution Process

### Main Agent Resolution Function
```
ResolveAllPlaceholders(template_content, work_context):
  1. **Load Configuration Hierarchy:**
     - embedded_config = work_context.prb_config
     - project_config = load_project_config()  
     - user_config = load_user_config()
     - system_config = load_system_defaults()
     - merged_config = merge_hierarchy(embedded, project, user, system)
  
  2. **Gather Project Context:**
     - project_root = detect_project_root()
     - system_nature = analyze_system_nature(project_root)
     - critical_files = identify_critical_files(work_context)
     - current_date = get_current_date()
  
  3. **Perform Searches:**
     - memory_results = search_memory(work_context.keywords)
     - practices_results = search_best_practices(work_context.domain)
  
  4. **Replace All Placeholders:**
     FOR each placeholder IN extract_placeholders(template_content):
       resolved_value = resolve_placeholder(placeholder, context_data)
       template_content = replace(template_content, placeholder, resolved_value)
  
  5. **Validate Resolution:**
     IF contains_unresolved_placeholders(template_content):
       RETURN RESOLUTION_ERROR("Unresolved placeholders remaining")
     
     RETURN resolved_template_content
```

### Task Tool Limitations
**Cannot access**: Configuration hierarchy, project-wide files, memory/ directories, best-practices/, project root analysis, system nature detection
**Reason**: Isolated context with limited working directory scope

## Placeholder Categories Requiring Main Agent

| Category | Requirements | Examples |
|----------|-------------|----------|
| **Configuration** | Hierarchy access | git_privacy, branch_protection, autonomy_level |
| **System Analysis** | Project-wide access | Project root, system nature, critical files |
| **Search Operations** | Directory traversal | Memory patterns, best practices, learning history |

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

**VALIDATION CHECKLIST**:
☐ No config/context/search patterns remain ☐ Absolute file paths ☐ Actual config values ☐ Current dates ☐ Embedded search results

**QUALITY GATES**: Config matches project settings, file samples actual content, memory/practices relevant to context, dates current, all context actionable

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