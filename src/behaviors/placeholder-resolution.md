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

### Configuration Placeholders
- `[FROM_CONFIG]` → Load actual configuration value from hierarchy
- `[ALL-SETTINGS]` → Load all relevant configuration settings
- `[GIT_PRIVACY]` → Resolve git_privacy setting (true/false)
- `[BRANCH_PROTECTION]` → Resolve branch_protection setting (true/false)
- `[DEFAULT_BRANCH]` → Resolve default_branch setting ("main", "master", etc.)
- `[AUTONOMY_LEVEL]` → Resolve autonomy_level setting ("L1", "L2", "L3")

### Project Context Placeholders  
- `[PROJECT_ROOT]` → Absolute path to project root directory
- `[SYSTEM_NATURE]` → "CODE-BASED SYSTEM" or "MARKDOWN-BASED AI-AGENTIC SYSTEM"
- `[PROJECT_TYPE]` → Project classification from context analysis
- `[CURRENT_DATE]` → Current date in YYYY-MM-DD format

### File Reference Placeholders
- `[CRITICAL_FILES]` → List of relevant files with content samples
- `[FILE_SAMPLE:path]` → Content sample from specific file
- `[RELEVANT_DOCS]` → Documentation files relevant to work

### Memory and Best Practices Placeholders
- `[MEMORY_SEARCH:topic]` → Top relevant memory entries for topic
- `[BEST_PRACTICES:domain]` → Relevant best practices for domain
- `[LEARNING_PATTERNS]` → Applicable learning patterns

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

### Task Tool Isolation Problems
```
Task Tool Cannot Resolve Because:
- Limited working directory scope (no project-wide access)
- No configuration hierarchy access (only isolated context)
- Cannot perform file system analysis for project root detection
- Cannot traverse memory/ directories for pattern searches
- Cannot access best-practices/ directory structure
- Cannot load and merge configuration from multiple sources
- Cannot sample file contents outside working directory
- Cannot determine system nature from isolated context
```

## Placeholder Categories

### Critical Configuration Access
**Requires main agent configuration hierarchy:**
- git_privacy setting for commit message filtering
- branch_protection settings for git workflow
- default_branch setting for repository operations
- autonomy_level setting for behavioral patterns
- memory_integration setting for learning storage
- All project-specific behavioral overrides

### System Analysis Required
**Requires main agent project analysis:**
- Project root absolute path detection
- System nature classification (analyze file types, structure)
- Technology stack identification
- Critical file discovery and content sampling
- Architecture pattern recognition

### Search Operations Required  
**Requires main agent search capabilities:**
- Memory directory traversal and content search
- Best practices directory analysis and selection
- Learning pattern identification and relevance scoring
- Historical context and pattern application
- Cross-reference analysis for related patterns

## Blocking Mechanisms

### Task Tool Placeholder Blocking
**BLOCK Task tool attempts to:**
- Access configuration files outside working directory
- Perform "[FROM_CONFIG]" resolution without hierarchy access
- Resolve "[PROJECT_ROOT]" without file system analysis
- Access memory/ directories for placeholder resolution  
- Search best-practices/ directories for pattern selection
- Sample file contents outside isolated working directory

### Detection Function
```
DetectPlaceholderViolation(execution_context):
  # Check if Task tool attempting placeholder resolution
  IF execution_context.is_task_tool_subagent AND
     execution_context.operation_type == "placeholder_resolution":
    RETURN PLACEHOLDER_VIOLATION("Task tool cannot resolve placeholders")
  
  # Check for configuration access attempts
  IF execution_context.is_task_tool_subagent AND
     execution_context.file_access.contains_config_hierarchy:
    RETURN CONFIG_ACCESS_VIOLATION("Configuration hierarchy not available")
  
  # Check for project-wide search attempts  
  IF execution_context.is_task_tool_subagent AND
     execution_context.search_operations.contains_memory_search:
    RETURN MEMORY_ACCESS_VIOLATION("Memory search requires main agent context")
  
  RETURN VALIDATION_PASSED
```

### Error Messages
```
❌ PLACEHOLDER RESOLUTION BLOCKED: Task tool cannot resolve template placeholders
Reason: Placeholder resolution requires full project context and configuration hierarchy
Solution: Use main agent for template resolution, Task tool for execution only

❌ CONFIGURATION ACCESS DENIED: Task tool cannot access "[FROM_CONFIG]" values  
Reason: Configuration hierarchy not available in isolated Task tool context
Solution: Main agent must resolve all placeholders before Task tool execution

❌ PROJECT ANALYSIS BLOCKED: Task tool cannot resolve "[PROJECT_ROOT]"
Reason: Project-wide analysis requires main agent file system access
Solution: Main agent must gather complete project context before delegation

❌ MEMORY SEARCH BLOCKED: Task tool cannot resolve "[MEMORY_SEARCH:topic]"  
Reason: Memory search operations require main agent directory access
Solution: Main agent must perform memory searches and embed results
```

## Resolution Standards

### Complete Resolution Required
**BEFORE Task tool execution:**
- ALL placeholders must be resolved to actual values
- NO "[...]" patterns should remain in templates  
- Configuration values must be specific, not generic
- File paths must be absolute, not relative
- Search results must be embedded, not referenced

### Validation Checklist
```markdown
PLACEHOLDER RESOLUTION VALIDATION:
☐ No "[FROM_CONFIG]" patterns remain
☐ No "[PROJECT_ROOT]" patterns remain  
☐ No "[SYSTEM_NATURE]" patterns remain
☐ No "[MEMORY_SEARCH:*]" patterns remain
☐ All file paths are absolute
☐ All configuration values are actual (not placeholders)
☐ All dates are current system date (not hardcoded)
☐ All search results are embedded content (not references)
```

### Resolution Quality Gates
**Quality requirements for resolution:**
- Configuration values match actual project settings
- File samples contain actual content from project files
- Memory results are relevant to work context
- Best practices match work domain and complexity
- Dates reflect current system time
- All context is actionable without additional searches

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