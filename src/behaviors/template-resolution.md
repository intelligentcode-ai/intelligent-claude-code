# Template Resolution & Validation

**MANDATORY:** Complete placeholder resolution before AgentTask creation. Auto-correct violations.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/context-validation.md

## Core Rules

### Main Agent Required
Placeholder resolution requires full context: config hierarchy, project root, system nature analysis, critical files, memory search.
AGENTS CANNOT resolve placeholders (isolated context).

### Common Placeholders
**Config**: [FROM_CONFIG], [GIT_PRIVACY], [BRANCH_PROTECTION]
**Context**: [PROJECT_ROOT], [SYSTEM_NATURE], [CURRENT_DATE]
**Files**: [CRITICAL_FILES], [MEMORY_SEARCH:topic], [PROJECT_OVERVIEW]

### Template Source
Use templates from hierarchy: nano (0-2), tiny (3-5), medium (6-15), large (16-30), mega (30+).

### Resolution Standards
Before agent execution: Zero placeholders, absolute paths, actual config values, current dates, embedded search results, story content, role assignment, project context.

### Validation Process
1. Scan for [.*] patterns
2. Replace all placeholders with actual values
3. Validate no unresolved patterns remain
4. Block creation if any placeholders remain

### Auto-Correction
Manual creation → Force template. Unresolved placeholders → Complete resolution. Wrong complexity → Recalculate. Runtime config → Embed values. Agent attempts → Block, redirect to main agent.

---
*Template resolution and validation with complete placeholder handling*