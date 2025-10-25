# Workflow Settings Initialization

**MANDATORY:** Default workflow settings creation and management for AgentTask execution.

## Workflow Settings Initialization

When initializing workflow settings:
- Checks if workflow_settings exists in CLAUDE.md
- If missing, creates default workflow configuration for all AgentTask sizes
- Workflow settings control version bumping, changelog requirements, PR creation, and merge strategies

## Default Configuration

**Default workflow configuration:**
- **nano**: No version bump, no changelog, direct commit
- **tiny**: Patch version bump, changelog required, direct commit  
- **medium**: Minor version bump, changelog + PR required, feature branch
- **large**: Minor version bump, changelog + PR + coordination required, feature branch
- **mega**: Major version bump, changelog + PR + coordination + breaking change assessment, feature branch

**Application:**
- Settings are automatically applied during AgentTask template resolution
- Can be customized per-project by editing CLAUDE.md workflow_settings section

## Memory System Details

When initializing memory system:
- Creates memory/[topic]/[subtopic].md structure for organized knowledge storage
- Creates memory/errors/ for error patterns and solutions
- Creates memory/patterns/ for reusable implementation patterns
- Creates memory/domain/ for domain knowledge and best practices
- Creates memory/index.md for quick memory lookup
- All memories are version-controlled (not in .gitignore)
- Memories are embedded directly into AgentTasks during generation

## Autonomy Levels

- **L1 (Manual)**: User approval required for ALL actions
- **L2 (Architect)**: Architect approval for technical decisions, auto-proceed for routine
- **L3 (Autonomous)**: Full autonomous execution, only stops for critical issues

## Autonomy Persistence

When autonomy_level is provided as parameter:
1. **Read Current**: Load existing autonomy_level from CLAUDE.md
2. **Compare**: Check if provided level differs from current
3. **Update**: If different, update CLAUDE.md with new autonomy_level
4. **Preserve**: Maintain existing l3_settings if changing to/from L3
5. **Validate**: Ensure CLAUDE.md remains well-formed after changes
6. **Cache Invalidation**: Clear configuration cache to reflect changes

---

*Workflow settings and autonomy management for system initialization*