# Template Hierarchy Usage

## Overview
Use template hierarchy for consistent AgentTask structure and quality across all complexity levels.

## Template Hierarchy

### Load Order (Highest→Lowest Priority)
1. **Project templates**: `agenttask_template_path` (project-specific)
2. **Development context**: `project_root/src/agenttask-templates/` (when working on ICC itself)
3. **Installation templates**: `~/.claude/agenttask-templates/` (system defaults)

### Standard Templates
- **nano-agenttask-template.yaml** (0-2 points): Trivial one-line changes
- **tiny-agenttask-template.yaml** (3-5 points): Simple single-file tasks
- **medium-agenttask-template.yaml** (6-15 points): Multi-file features
- **large-agenttask-template.yaml** (16-30 points): Complex features
- **mega-agenttask-template.yaml** (30+ points): Epic-level work

## Template Selection

### Complexity Assessment
1. **Count affected files**: More files = higher complexity
2. **Estimate lines changed**: More changes = higher complexity
3. **Identify dependencies**: More dependencies = higher complexity
4. **Assess unknowns**: More unknowns = higher complexity
5. **Calculate points**: Sum all factors

### Selection Matrix
- **0-2 points**: Nano template, direct execution
- **3-5 points**: Tiny template, direct execution
- **6-15 points**: Medium template, story first
- **16-30 points**: Large template, story first
- **30+ points**: Mega template, story first

## Template Structure

### Required Sections
All templates must include:
- **metadata**: Complexity, template type, version
- **project_context**: CLAUDE.md content, system nature
- **configuration**: All embedded settings
- **memory_search**: Relevant patterns
- **best_practices**: Applicable practices
- **requirements**: Functional and acceptance criteria
- **execution_checklist**: Step-by-step validation
- **success_criteria**: Completion validation

### Placeholder Patterns
Templates use placeholders resolved during creation:
- `[FROM_CONFIG]`: Configuration values
- `[PROJECT_ROOT]`: Absolute project path
- `[SYSTEM_NATURE]`: AI-AGENTIC/CODE/HYBRID
- `[CURRENT_DATE]`: System date
- `[MEMORY_SEARCH:topic]`: Memory results
- `[CRITICAL_FILES]`: File content samples

## Extension System

### Project Customization
Create `agenttask-extensions.yaml` in project root or `.claude/`:

```yaml
extensions:
  all_templates:
    custom_section:
      - "Project-specific requirement"
      - "Additional quality gate"

  tiny_template_only:
    execution_checklist:
      - "!override Step 1: Custom execution step"
      - "Additional validation step"
```

### Extension Merging
- **Additive by default**: New sections added to template
- **Override with prefix**: Use `!override` for replacements
- **Context-aware**: Applies only to matching templates
- **Backward compatible**: No changes to standard templates

## Common Pitfalls

### Wrong Template Selection
**WRONG**: 15-point feature as tiny template
**CORRECT**: 15-point feature → Medium template → Story first

### Missing Project Context
**WRONG**: Generic template without CLAUDE.md
**CORRECT**: Complete CLAUDE.md context embedded

### Unresolved Placeholders
**WRONG**: `[PROJECT_ROOT]/src/file.js` in final AgentTask
**CORRECT**: `/absolute/path/to/project/src/file.js`

### Runtime Config Lookups
**WRONG**: Template references config files during execution
**CORRECT**: All config values embedded during creation

## Quality Checklist

Before using template:

- ☐ Complexity correctly assessed (0-2/3-5/6-15/16-30/30+)
- ☐ Appropriate template selected for points
- ☐ Template hierarchy searched (project → dev → installation)
- ☐ All placeholders identified
- ☐ Project context available (CLAUDE.md)
- ☐ Configuration values ready to embed
- ☐ Memory search completed
- ☐ Best practices loaded
- ☐ Story-first workflow for 6+ points

After template loading:

- ☐ All placeholders resolved
- ☐ Project context embedded
- ☐ Configuration embedded
- ☐ Memory patterns included
- ☐ Best practices applied
- ☐ Absolute paths used
- ☐ Self-contained execution possible
- ☐ Quality gates defined

## Integration Points

### With AgentTask Creation
- Template hierarchy provides source
- Complexity determines selection
- Placeholders resolved during creation
- Extensions merged automatically

### With Story Breakdown
- Medium+ templates → Story first
- Story breakdown into nano/tiny
- Each breakdown uses appropriate template
- Sequential execution maintained

### With Configuration System
- Config values embedded during creation
- No runtime config lookups needed
- Hierarchy respected (embedded → project → user → system)
- All settings pre-resolved

## Examples

### Template Selection Flow

**Scenario**: Implement JWT authentication

1. **Assess Complexity**:
   - Affected files: 5 (auth.js, middleware.js, config.js, tests, docs)
   - Lines changed: ~300
   - Dependencies: jsonwebtoken, bcrypt
   - Unknowns: Token refresh strategy
   - **Total**: 8 points

2. **Select Template**: Medium (6-15 points)

3. **Create Story First**: STORY-042-jwt-authentication-2025-10-08.md

4. **Breakdown into Tasks**:
   - TINY-001: Token generation (3 points, tiny template)
   - TINY-002: Middleware implementation (4 points, tiny template)
   - NANO-001: Documentation update (1 point, nano template)

### Template Customization

**Project Extension** (`agenttask-extensions.yaml`):
```yaml
extensions:
  all_templates:
    security_validation:
      - "OWASP Top 10 review required"
      - "Security scan with npm audit"

  medium_template_only:
    deployment_checklist:
      - "Staging deployment required"
      - "Load testing validation"
```

## Success Metrics

- Correct template selection rate >95%
- Zero placeholder errors in production
- Consistent AgentTask structure across team
- Reduced onboarding time for new work
- Template extensions applied successfully
