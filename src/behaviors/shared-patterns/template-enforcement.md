# Template Enforcement Patterns

**MANDATORY:** ALL AgentTask creation MUST use templates from hierarchy with COMPLETE placeholder resolution. NO exceptions.

## Core Enforcement Rules

### Template Requirements
**TEMPLATE SOURCE:** Only templates from hierarchy:
- `nano-agenttask-template.yaml` (0-2 points)
- `tiny-agenttask-template.yaml` (3-5 points) 
- `medium-agenttask-template.yaml` (6-15 points)
- `large-agenttask-template.yaml` (16-30 points)
- `mega-agenttask-template.yaml` (30+ points)

**BLOCKED:** AgentTask creation without templates, unresolved placeholders, runtime config lookups, manual PRB structures

### Placeholder Resolution
**COMMON PLACEHOLDERS:**
- `[FROM_CONFIG]` → Actual config values
- `[PROJECT_ROOT]` → Absolute project path
- `[CURRENT_DATE]` → System date
- `[SYSTEM_NATURE]` → Project system type
- All placeholders MUST be resolved at generation time

## Error Messages

**TEMPLATE_REQUIRED:** "❌ AgentTask creation without template FORBIDDEN - use template hierarchy"
**PLACEHOLDER_UNRESOLVED:** "❌ Unresolved placeholder: {placeholder} - resolve during generation"
**RUNTIME_CONFIG_FORBIDDEN:** "❌ Runtime config lookup forbidden - embed values in AgentTask"

## Integration Requirements

### With PRB Creation System
- Block non-template AgentTask creation
- Enforce placeholder resolution before creation
- Validate template completeness
- Prevent runtime config dependencies

### With Auto-Trigger System  
- Template-first flow: complexity → template → placeholder resolution
- NO manual creation allowed

### With Execution System
- PRBs execute with embedded configuration only
- Self-contained execution context
- All settings pre-resolved and embedded

---
*Template enforcement with mandatory placeholder resolution and embedded configuration*