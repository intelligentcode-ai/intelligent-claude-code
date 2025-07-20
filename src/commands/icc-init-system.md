# System Init

Initialize the intelligent-claude-code virtual team system using $ARGUMENTS as initialization options.

## Behavioral Sequence
1. Parse $ARGUMENTS for options (--force, --config-only, --memory-reset)
2. Display "🔄 Initializing intelligent-claude-code virtual team system..."
3. Load project context FIRST:
   - Execute `/icc-load-context` to load PROJECT-CONTEXT.md
   - If context found, display "✅ Project context loaded"
   - If no context found, display "ℹ️ No project context found, using defaults"
   - Context shapes all subsequent initialization steps
4. Load configuration hierarchy:
   - Check for `~/.claude/config.md` (user global)
   - Check for `./.claude/config.md` (project)
   - Apply embedded configs if present
   - If no config found, create default at `~/.claude/config.md`
5. Initialize file-based memory system:
   - Execute `/icc-memory-init` to set up memory directories
   - Create ~/.claude/memory/ structure with entities, indexes, and relationships
   - Display "✅ File-based memory system initialized"
6. Load role definitions from `~/.claude/roles/specialists.md`:
   - Validate all 14 core roles are defined
   - Initialize dynamic specialist creation capability
   - Adjust role behavior based on project context if available
   - Display "✅ Role system loaded (14 core + unlimited dynamic)"
7. Start lean workflow executor:
   - Load workflow templates from `~/.claude/workflow-templates/`
   - Initialize validation command chains
   - Apply project-specific workflow adjustments from context
   - Display "✅ Workflow engine active"
8. Initialize scoring system:
   - Load badges definitions from `~/.claude/badges.md`
   - Reset scores if --force flag present
   - Display "✅ Scoring system initialized"
9. Prepare learning automation:
   - Load learning patterns from memory
   - Initialize error forgiveness tracking
   - Display "✅ Learning system active"
10. Set up validation gates:
    - Initialize role assignment validator
    - Activate mandatory triage requirements
    - Apply context-specific validation rules if available
    - Display "✅ Validation gates operational"
11. Display final status: "🚀 Virtual team system initialized successfully"

## Error Handling
- If project context load fails: Continue with defaults but log "ℹ️ Project context unavailable, using system defaults"
- If context file exists but is malformed: Display "⚠️ Warning: PROJECT-CONTEXT.md has formatting issues, using partial context"
- If configuration load fails: Create default config and continue
- If memory initialization fails: Display error and provide directory permission guidance
- If role definitions missing: Display "❌ Error: Role definitions not found. Run installation first."
- If workflow templates missing: Display "❌ Error: Workflow templates not found. Run installation first."
- If any critical component fails: Display specific error and halt initialization
- Context loading is non-blocking: System continues with defaults if context unavailable

## Context Integration

When PROJECT-CONTEXT.md is available, it influences initialization:
- **Role Behavior**: Specialists adjust expertise based on project tech stack
- **Workflow Patterns**: Validation rules adapted to project conventions
- **Memory Priority**: Context information prioritized in memory searches
- **Team Structure**: Dynamic specialist creation aligned with project needs
- **Quality Standards**: Validation gates customized to project requirements

The context loading step ensures the entire virtual team understands project-specific requirements from the start.

## Command Chaining
- If --chain flag present, execute `icc-system-status` after successful initialization
- Output format allows piping to other icc commands
- Context information available to all subsequent commands in chain