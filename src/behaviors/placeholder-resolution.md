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
| **Search** | `[MEMORY_SEARCH:topic]` | Top memory entries |
| **Project** | `[PROJECT_OVERVIEW]` | Project description from CLAUDE.md |

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

## Blocking Mechanisms

### Blocking & Error Handling

**BLOCKED OPERATIONS**: Task tool attempts at placeholder resolution, configuration access, project-wide searches

**ERROR MESSAGES**: 
- "❌ PLACEHOLDER RESOLUTION BLOCKED: Task tool cannot resolve placeholders - use main agent"
- "❌ CONFIGURATION ACCESS DENIED: Config hierarchy not available in isolated context"  
- "❌ PROJECT ANALYSIS BLOCKED: Project-wide analysis requires main agent access"
- "❌ MEMORY SEARCH BLOCKED: Memory operations require main agent directory access"

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

### Pattern Storage
**Store resolution patterns in memory:**
- Common placeholder resolution patterns
- Configuration hierarchy usage patterns
- Project analysis and system nature detection patterns
- Search operation optimization patterns
- Template resolution quality improvements

**Memory Locations:**
- `memory/template-processing/placeholder-resolution.md` - Resolution patterns and improvements
- `memory/configuration-management/hierarchy-access.md` - Configuration access patterns

---
*Placeholder resolution behavior for intelligent-claude-code system*