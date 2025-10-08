# AgentTask Creation Patterns

## Overview
Properly structured AgentTasks with complete embedded context enable reliable single-pass execution by specialist agents.

## Template Hierarchy Usage

### Complexity-Based Selection
- **Nano (0-2 points)**: Trivial one-line changes
- **Tiny (3-5 points)**: Simple single-file tasks
- **Medium (6-15 points)**: Multi-file features (becomes STORY first)
- **Large (16-30 points)**: Complex features (becomes STORY first)
- **Mega (30+ points)**: Epic-level work (becomes STORY first)

### Story-First Workflow (6+ Points)
1. Create story file in stories/ directory
2. @PM + Architect collaborate on breakdown
3. Generate multiple nano/tiny AgentTasks (≤5 points each)
4. Sequential execution of breakdown tasks

## Placeholder Resolution

### Common Placeholders
- `[FROM_CONFIG]` → Actual configuration values
- `[PROJECT_ROOT]` → Absolute project path
- `[CURRENT_DATE]` → System date (YYYY-MM-DD)
- `[SYSTEM_NATURE]` → AI-AGENTIC/CODE/HYBRID
- `[MEMORY_SEARCH:topic]` → Embedded memory results
- `[CRITICAL_FILES]` → Relevant file content

### Resolution Process
1. Scan template for `[.*]` patterns
2. Replace with actual values from context
3. Validate no unresolved placeholders remain
4. Block creation if placeholders detected

## Context Embedding

### Required Context Elements
- **CLAUDE.md**: Complete project context
- **Configuration**: All settings embedded (no runtime lookups)
- **Memory Search**: Relevant patterns from memory/
- **Best Practices**: Applicable patterns from best-practices/
- **Project Root**: Absolute paths and boundaries
- **Critical Files**: File content samples when needed

### Self-Contained Execution
- All configuration pre-embedded
- No external dependencies during execution
- Complete context for agent isolation
- Memory patterns included
- Project standards embedded

## Common Pitfalls

### Runtime Config Lookups
**WRONG**: AgentTask references config files during execution
**CORRECT**: All config values embedded during creation

### Unresolved Placeholders
**WRONG**: `[PROJECT_ROOT]/src/file.js` in final AgentTask
**CORRECT**: `/absolute/path/to/project/src/file.js`

### Missing Context
**WRONG**: "Implement feature X" without details
**CORRECT**: Complete context with architecture patterns, coding standards, examples

### Wrong Complexity Tier
**WRONG**: 15-point feature as tiny AgentTask
**CORRECT**: 15-point feature → Story → Multiple nano/tiny breakdown

## Quality Checklist

Before deploying AgentTask via Task tool:

- ☐ Template from hierarchy (nano/tiny/medium/large/mega)
- ☐ All placeholders resolved with actual values
- ☐ Complete CLAUDE.md context embedded
- ☐ Configuration values embedded (no runtime lookups)
- ☐ Memory search results included
- ☐ Best practices patterns embedded
- ☐ Absolute paths (no relative references)
- ☐ Complexity tier matches actual scope
- ☐ Story-first workflow for 6+ points
- ☐ Self-contained execution possible

## Integration Points

### With Memory System
- Search memory before AgentTask creation
- Embed relevant patterns in context
- Store successful patterns after completion

### With Best Practices
- Load applicable practices during creation
- Embed quality gates and standards
- Apply proven implementation patterns

### With Configuration
- Load from hierarchy during creation
- Embed all needed settings
- No runtime config dependencies

## Examples

### Well-Structured Nano AgentTask
```yaml
complexity: 0-2 points
template: nano
context:
  project_root: /absolute/path/to/project
  system_nature: AI-AGENTIC
  memory_patterns: [embedded search results]
  best_practices: [relevant practices]
all_placeholders: resolved
execution: self-contained
```

### Story-First Workflow (8 Points)
```
1. Create STORY-042-user-authentication-2025-10-08.md
2. @PM + @Security-Architect collaborate
3. Breakdown into 3 tiny AgentTasks:
   - TINY-001: Auth schema design (3 points)
   - TINY-002: JWT implementation (4 points)
   - TINY-003: Integration tests (3 points)
4. Sequential execution via Task tool
```

## Success Metrics

- Zero placeholder errors during execution
- No runtime config lookup failures
- Single-pass completion rate >90%
- Context completeness validated
- Agent isolation maintained
