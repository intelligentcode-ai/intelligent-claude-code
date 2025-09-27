# Template Usage Guidelines

**Purpose:** AgentTask creation follows template hierarchy with complete placeholder resolution.

## Core Enforcement Rules

### Template Requirements
**TEMPLATE SOURCE:** Only templates from hierarchy:
- `nano-agenttask-template.yaml` (0-2 points)
- `tiny-agenttask-template.yaml` (3-5 points) 
- `medium-agenttask-template.yaml` (6-15 points)
- `large-agenttask-template.yaml` (16-30 points)
- `mega-agenttask-template.yaml` (30+ points)

**Requirements:** Use templates from hierarchy, resolve all placeholders, embed configuration values

### Placeholder Resolution
**COMMON PLACEHOLDERS:**
- `[FROM_CONFIG]` → Actual config values
- `[PROJECT_ROOT]` → Absolute project path
- `[CURRENT_DATE]` → System date
- `[SYSTEM_NATURE]` → Project system type
- All placeholders MUST be resolved at generation time

## Validation Messages

**TEMPLATE_REQUIRED:** "AgentTask creation requires template from hierarchy"
**PLACEHOLDER_UNRESOLVED:** "Unresolved placeholder: {placeholder} - resolve during generation"
**RUNTIME_CONFIG_NEEDED:** "Runtime config lookup detected - embed values in AgentTask"

## Integration Requirements

### With AgentTask Creation System
- Block non-template AgentTask creation
- Enforce placeholder resolution before creation
- Validate template completeness
- Prevent runtime config dependencies

### With Auto-Trigger System
- Template-first flow: complexity → template → placeholder resolution
- Follow template hierarchy for consistency

### With Execution System
- AgentTasks execute with embedded configuration only
- Self-contained execution context
- All settings pre-resolved and embedded

---
*Template usage guidelines with placeholder resolution and embedded configuration*