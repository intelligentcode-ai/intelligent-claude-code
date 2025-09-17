# Template Resolution & Validation

**MANDATORY:** All AgentTask templates require complete placeholder resolution and validation before creation.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/context-validation.md

## Core Rules

### Main Agent Context Required
**PLACEHOLDER RESOLUTION requires full context:**
- Configuration hierarchy (embedded → project → user → system)
- Project root detection and file system access
- System nature analysis (CODE-BASED vs MARKDOWN-BASED AI-AGENTIC)
- Critical file identification and content sampling
- Memory search across memory/ directories

**AGENTS CANNOT resolve placeholders due to isolated context.**

### Common Placeholders

| Category | Placeholder | Resolution |
|----------|-------------|------------|
| **Config** | `[FROM_CONFIG]` | Load from hierarchy |
| | `[GIT_PRIVACY]`, `[BRANCH_PROTECTION]` | Boolean settings |
| **Context** | `[PROJECT_ROOT]` | Absolute path |
| | `[SYSTEM_NATURE]` | System type analysis |
| | `[CURRENT_DATE]` | YYYY-MM-DD format |
| **Files** | `[CRITICAL_FILES]` | Relevant files with samples |
| **Search** | `[MEMORY_SEARCH:topic]` | Top memory entries |
| **Project** | `[PROJECT_OVERVIEW]` | Project description from CLAUDE.md |

### Template Source
**MANDATORY:** Only use templates from hierarchy:
- `nano-agenttask-template.yaml` (0-2 points)
- `tiny-agenttask-template.yaml` (3-5 points)
- `medium-agenttask-template.yaml` (6-15 points)
- `large-agenttask-template.yaml` (16-30 points)
- `mega-agenttask-template.yaml` (30+ points)

### Resolution Standards
**BEFORE AGENT execution:**
- Zero placeholders (`[.*]` patterns)
- Absolute paths only (no relative paths)
- Actual config values (not placeholders)
- Current dates (not `[CURRENT_DATE]`)
- Embedded search results (not `[SEARCH_TOPIC]`)
- Story content (not `[USER_REQUEST]`)
- Role assignment (not `[ROLE]`)
- Project context (not `[SYSTEM_NATURE]`)

### Validation Checklist
**MANDATORY VALIDATION:**
☐ **Zero Placeholders**: No [.*] patterns remain
☐ **Absolute Paths**: All paths start with /
☐ **Actual Config Values**: Boolean/string values loaded
☐ **Current Dates**: System date format YYYY-MM-DD
☐ **Embedded Search Results**: Memory/practice results included
☐ **Story Content**: Actual requirements text
☐ **Role Assignment**: Specific role assigned
☐ **Project Context**: Real system nature determined

### Blocking & Validation
1. **Scan Template**: Check for `[.*]` patterns
2. **Resolve All**: Replace every placeholder with actual values
3. **Validate**: Ensure no unresolved patterns remain
4. **Block Creation**: If any placeholders remain

### Auto-Correction
- Manual AgentTask creation → Force template usage
- Unresolved placeholders → Complete resolution required
- Wrong complexity → Recalculate and use correct template
- Runtime config → Embed all values in AgentTask
- AGENT attempts → Block and redirect to main agent

### Error Messages
- "❌ PLACEHOLDER RESOLUTION BLOCKED: AGENTS cannot resolve placeholders - use main agent"
- "❌ CONFIGURATION ACCESS DENIED: Config hierarchy not available in isolated context"
- "❌ PROJECT ANALYSIS BLOCKED: Project-wide analysis requires main agent access"
- "❌ MEMORY SEARCH BLOCKED: Memory operations require main agent directory access"

---
*Template resolution and validation with complete placeholder handling*