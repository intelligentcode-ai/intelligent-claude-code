# Template Loading Patterns

**MANDATORY:** Use template hierarchy for AgentTask loading. Auto-correct violations.

## Imports
@./installation-path-detection.md

## Template Hierarchy
**Search Order (Highest→Lowest):**
1. Project templates (agenttask_template_path)
2. Development context (project_root/src/agenttask-templates/)
3. Installation templates (installation agenttask-templates/)

## Standard Templates
nano (0-2 points), tiny (3-5 points), medium (6-15 points), large (16-30 points), mega (30+ points).

## Loading Process
1. Determine template name from complexity → 2. Search hierarchy → 3. Load CLAUDE.md context → 4. Merge agenttask-extensions.yaml → 5. Validate structure

## Extension System
**File**: agenttask-extensions.yaml in project root or .claude/
**Merging**: Additive by default, use !override prefix for replacements, context-aware, backward compatible.

## Configuration
Template path configurable via agenttask_template_path in CLAUDE.md or config.md. Default: "agenttask-templates".

## Error Handling
Missing templates → Search next in hierarchy → Error if none found.
Validation: YAML structure, required fields, complete context, no placeholders.

## Integration
- **Configuration**: Use configured paths, apply hierarchy, enable flexibility
- **AgentTask Generation**: Analyze complexity, load from hierarchy, inject context, validate structure
- **Directory**: Respect configured paths, auto-create missing directories

## Customization
**Extension-Based** (recommended): agenttask-extensions.yaml with automatic updates.
**Template Copying** (legacy): Copy to project directory, manual updates.

---
*Template loading patterns for intelligent-claude-code system*