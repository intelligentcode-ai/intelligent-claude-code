# System Init

Initialize the intelligent-claude-code virtual team system using $ARGUMENTS as initialization options.

## Behavioral Sequence
1. Parse $ARGUMENTS for options (--force, --config-only, --memory-reset)
2. Display "🔄 Initializing intelligent-claude-code virtual team system..."
3. Load configuration hierarchy:
   - Check for `~/.claude/config.md` (user global)
   - Check for `./.claude/config.md` (project)
   - Apply embedded configs if present
   - If no config found, create default at `~/.claude/config.md`
4. Initialize MCP Memory connection:
   - Test memory system availability
   - If memory unavailable, display "⚠️ Warning: Memory system unavailable, using file-based fallback"
   - If memory available, display "✅ Memory system connected"
5. Load role definitions from `~/.claude/roles/specialists.md`:
   - Validate all 14 core roles are defined
   - Initialize dynamic specialist creation capability
   - Display "✅ Role system loaded (14 core + unlimited dynamic)"
6. Start lean workflow executor:
   - Load workflow templates from `~/.claude/workflow-templates/`
   - Initialize validation command chains
   - Display "✅ Workflow engine active"
7. Initialize scoring system:
   - Load badges definitions from `~/.claude/badges.md`
   - Reset scores if --force flag present
   - Display "✅ Scoring system initialized"
8. Prepare learning automation:
   - Load learning patterns from memory
   - Initialize error forgiveness tracking
   - Display "✅ Learning system active"
9. Set up validation gates:
   - Initialize role assignment validator
   - Activate mandatory triage requirements
   - Display "✅ Validation gates operational"
10. Display final status: "🚀 Virtual team system initialized successfully"

## Error Handling
- If configuration load fails: Create default config and continue
- If memory connection fails: Switch to file-based mode and warn user
- If role definitions missing: Display "❌ Error: Role definitions not found. Run installation first."
- If workflow templates missing: Display "❌ Error: Workflow templates not found. Run installation first."
- If any critical component fails: Display specific error and halt initialization

## Command Chaining
- If --chain flag present, execute `icc-system-status` after successful initialization
- Output format allows piping to other icc commands