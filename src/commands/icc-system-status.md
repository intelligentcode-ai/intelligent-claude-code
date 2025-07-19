# System Status

Display comprehensive virtual team system status using $ARGUMENTS for detail level or focus area.

## Behavioral Sequence
1. Parse $ARGUMENTS for options:
   - Detail level: --brief, --detailed, --full (default: detailed)
   - Focus area: --config, --roles, --memory, --tasks, --health
   - Output format: --json, --yaml, --table (default: table)
2. Display system header:
   "🚀 Intelligent Claude Code - Virtual Team Status"
   "Timestamp: [current_datetime]"
   "Working Directory: [current_path]"
3. Check configuration hierarchy and active settings:
   - Load user global config: `~/.claude/config.md`
   - Load project config: `./.claude/config.md` 
   - Display embedded configs if present
   - Show merged configuration with hierarchy priority
   - Key settings display:
   ```
   🔧 Configuration:
   Autonomy Level: [L1|L2|L3]
   Git Privacy: [enabled|disabled]
   PM Always Active: [yes|no]
   Blocking Enabled: [yes|no]
   Default Branch: [main|master|develop]
   ```
4. List all active roles with scores:
   - Scan role activation history
   - Display current role with context
   - Show role scores and recent activity
   ```
   👥 Active Roles:
   Current: @[Role] (P:X.X, Q:X.X)
   Recent: @[Role1] (P:X.X, Q:X.X), @[Role2] (P:X.X, Q:X.X)
   Available: 14 core + unlimited dynamic specialists
   ```
5. Verify memory system connection:
   - Test MCP Memory with `mcp__memory__read_graph()`
   - Count total entities, relations, recent activity
   - Show learning statistics
   ```
   🧠 Memory System:
   Status: [Connected|Disconnected|File-based fallback]
   Entities: [X] total, [Y] learnings, [Z] patterns
   Recent Activity: [X] new learnings in last 7 days
   ```
6. Report task queue status:
   - Scan for active epics/stories/bugs
   - Count tasks by status and priority
   - Show current work in progress
   ```
   📋 Task Queue:
   Active Epics: [X]
   Stories: [Y] planned, [Z] in progress, [A] completed
   Bugs: [Y] open, [Z] in progress, [A] resolved
   Tasks: P0([X]) P1([Y]) P2([Z]) P3([A])
   ```
7. Show system health metrics:
   - Check file system permissions
   - Verify Git repository status
   - Test tool integrations (GitHub CLI, Context7, etc.)
   - Validate import chains
   ```
   ❤️ System Health:
   File System: [OK|Issues]
   Git Repository: [Clean|Modified|Conflicts]
   GitHub CLI: [Available|Missing]
   Context7: [Connected|Unavailable]
   Import Chains: [Valid|Broken links found]
   ```
8. Display recent learnings and activity:
   - Show last 5 learning entities created
   - Display recent score changes
   - Highlight any system warnings or errors
   ```
   📚 Recent Activity:
   Latest Learning: [Learning-Type-Date]
   Score Changes: @[Role] (+X.XP, +Y.YQ)
   Warnings: [X] active
   Errors: [Y] unresolved
   ```
9. Indicate any system issues:
   - Configuration conflicts or missing files
   - Memory system problems
   - Git workflow issues
   - Tool integration failures
   - Import resolution failures
10. Provide actionable recommendations:
    - Suggest fixes for detected issues
    - Recommend next actions based on current state
    - Highlight optimization opportunities

## Error Handling
- Configuration load failed: "Warning: Configuration issues detected - using defaults"
- Memory connection failed: "Warning: Memory system unavailable - using file fallback"
- Git repository issues: "Warning: Git repository problems detected"
- Missing tools: "Info: Optional tools not available: [list]"
- Import chain broken: "Error: Broken imports detected: [specific imports]"

## Detail Level Behaviors
**--brief**: Show only critical status and current role
**--detailed** (default): Show all sections with key metrics
**--full**: Include diagnostic information and verbose output

## Focus Area Behaviors
**--config**: Show only configuration hierarchy and settings
**--roles**: Show only role information and scores
**--memory**: Show only memory system status and statistics
**--tasks**: Show only task queue and work item status
**--health**: Show only system health and diagnostic information

## Status Indicators
- ✅ **Healthy**: Component functioning normally
- ⚠️ **Warning**: Minor issues, system functional
- ❌ **Error**: Major issues, component non-functional
- 🔄 **Loading**: Component initializing
- ❔ **Unknown**: Status cannot be determined

## Command Chaining
- Status output can be piped to other monitoring tools
- JSON/YAML output supports automated monitoring
- Health check results can trigger automatic fixes