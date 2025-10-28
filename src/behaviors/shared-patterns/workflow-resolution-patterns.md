# Workflow Resolution Patterns

**MANDATORY:** Resolve ALL workflow placeholders with actual workflow_settings values.

## Resolution Process

**Loading**: Read workflow_settings from CLAUDE.md per AgentTask size
**Mapping**: Replace `[WORKFLOW_*]` placeholders with actual values
**Validation**: No workflow placeholders remain unresolved

## Size Mapping

**EXECUTABLE AGENTTASKS (Passed to Task tool):**
- **nano (0-2 pts)** → workflow_settings.nano.*
- **tiny (3-5 pts)** → workflow_settings.tiny.*
- **medium (6-15 pts)** → workflow_settings.medium.*

**DEPRECATED (Work >15 pts becomes STORY):**
- **large (16-30 pts)** → DEPRECATED - create STORY instead
- **mega (30+ pts)** → DEPRECATED - create STORY instead

## Integration

**Template Loading**: Apply resolution after template loading
**Git Operations**: Embed explicit commands based on merge_strategy and pr_required
**Self-Contained**: No runtime configuration lookups

---
*Workflow resolution patterns for self-contained AgentTask execution*