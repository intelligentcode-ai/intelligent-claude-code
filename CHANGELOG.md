# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [8.20.59] - 2025-11-06

### Added
- Unit tests for command-validation.js validating command parsing and security boundaries
- Tests for extractCommandsFromBash() with pipes, heredocs, quotes, environment variables
- Tests for validateBashCommand() security boundaries (allowed vs blocked commands)
- Tests for isAllowedCoordinationCommand() coordination command allowlist
- Tests for isModifyingBashCommand() installation directory modification detection
- STORY-009 completed: Full test infrastructure with unit tests for all hook utilities

---

## [8.20.58] - 2025-11-06

### Added
- Unit tests for marker-detection.js validating hash generation and agent detection
- Tests for generateProjectHash() consistency and uniqueness
- Tests for isAgentContext() with various marker file scenarios
- Tests for isPMRole() inverse logic

---

## [8.20.57] - 2025-11-06

### Added
- Unit tests for hook-helpers.js validating getProjectRoot() behavior
- Path normalization bug tests documenting STORY-006 issue
- Response helper function validation tests
- Edge case handling tests for hook utilities

---

## [8.20.42] - 2025-11-04

### Fixed
- **Agent Marker Hook Execution Order**: Fixed critical bug where agents were blocked from running commands
  - Root cause: agent-marker.js ran AFTER main-scope-enforcement.js in PreToolUse hook chain
  - Impact: main-scope-enforcement detected no marker and blocked agent commands (sudo wg show, ip route show, etc.)
  - Hook execution order: git-enforcement → main-scope-enforcement → ... → agent-marker (WRONG - marker created too late!)
  - Solution: Moved agent-marker.js to FIRST position in PreToolUse hook chain
  - New order: agent-marker → git-enforcement → main-scope-enforcement → ... (marker created before checks)
  - Updated files: ansible/roles/intelligent-claude-code/tasks/main.yml (production_hooks), ansible/roles/intelligent-claude-code/templates/settings.json.j2
  - Removed non-existent hook: post-agent-file-validation.js from SubagentStop hooks
  - Result: Agent markers created before enforcement hooks check, agents can run network debugging commands

---

## [8.20.39] - 2025-10-30

### Fixed
- **Summary File Enforcement - Agent Context Bypass**: Fixed critical bug blocking agents from working on infrastructure files
  - Root cause: Hook applied main scope restrictions to agents, blocking legitimate infrastructure files
  - Impact: Agents blocked from updating files like rollout/tasks/compute/standalone-vm-deployment.yml
  - Solution: Added agent marker detection to skip ALL validation when agent context detected
  - Logic: Check for agent marker file, if agent_count > 0 bypass enforcement entirely
  - Reference: Uses same agent detection pattern as pm-constraints-enforcement.js
  - Result: Agents can now modify ANY file, main scope still restricted to stories/, bugs/, docs/, agenttasks/, summaries/, root .md files

---

## [8.20.38] - 2025-10-30

### Fixed
- **Summary File Enforcement - Correct Hook Response Format**: Fixed critical bug where summary-file-enforcement used wrong response format causing main scope to stop
  - Root cause: Used legacy {continue: false, displayToUser: message} format instead of hookSpecificOutput
  - Impact: Blocking ALL-CAPITALS filenames and summary placement caused main scope to hang
  - Solution: Changed 2 response objects to use hookSpecificOutput with permissionDecision: 'deny'
  - Affected locations: Lines 141-145 (ALL-CAPITALS blocking), Lines 182-186 (summary file blocking)
  - Reference: pm-constraints-enforcement.js uses correct hookSpecificOutput format throughout
  - Result: Hook now properly denies operations without stopping main scope

---

## [8.20.37] - 2025-10-30

### Fixed
- **Hook Exit Codes - Use exit(0) for All Responses**: Fixed critical bug where pm-constraints-enforcement used process.exit(2) for deny responses
  - Root cause: Hook used exit code 2 when blocking operations, Claude Code interpreted as hook failure
  - Impact: Blocked operations caused main scope to stop working ("stopped continuation" error)
  - Solution: Changed all 6 process.exit(2) calls to process.exit(0) in pm-constraints-enforcement.js
  - Hook exit codes: 0 = success (check JSON for allow/deny), non-zero = hook failure/crash
  - Deny responses: permissionDecision: 'deny' + exit(0) = successful denial without stopping main scope
  - Updated log messages from "EXIT CODE: 2 (BLOCKING MODE)" to "EXIT CODE: 0 (DENY)" for clarity
  - Result: Hook can properly deny operations without causing main scope failures

---

## [8.20.36] - 2025-10-30

### Fixed
- **Defensive Marker Cleanup at Session Restart Points**: Added critical defensive cleanup layers to prevent stale agent markers
  - Root cause: SubagentStop hook not invoked consistently by Claude Code, leaving stale markers
  - Impact: pm-constraints-enforcement saw "active agents" and bypassed all validation
  - Session-start hook: Now deletes stale markers on session start (defensive layer 3)
  - Stop hook: Enhanced logging with explicit cleanup messages (defensive layer 4)
  - UserPromptSubmit: Already had cleanup (defensive layer 2, implemented previously)
  - SubagentStop: Primary cleanup when working (defensive layer 1)
  - Result: Even if SubagentStop fails, markers get cleaned up at multiple restart points
  - All hooks use consistent [HOOK-CLEANUP] logging format for easier monitoring

---

## [8.20.35] - 2025-10-29

### Fixed
- **Hook Registration Structure**: Corrected hooks.json structure to ensure all 15 hooks are properly registered
  - Consolidated all PreToolUse hooks into single array (was registering only first hook per event)
  - Added required matcher field for PreToolUse hooks
  - Removed invalid failureMode field from hook configurations
  - Set executable permissions (755) for all 15 hook scripts
  - Documented --allow-dangerously-skip-permissions flag for development
  - Root cause: Array structure caused only first hook per event to register (11 of 15 hooks were non-functional)
  - Impact: All 15 behavioral hooks now properly registered and functional

---

## [8.20.41] - 2025-10-28

### Refactored
- **Hook Initialization Library**: Eliminated code duplication by consolidating hook initialization into shared initializeHook() function
  - Created initializeHook(hookName) in logging.js
  - Function handles input parsing from stdin/argv/env
  - Returns { log, hookInput } object for immediate use
  - Updated all 15 hooks to use shared initialization function
  - Reduced maintenance points from 15 to 1
  - Zero code duplication for hook initialization logic
  - DRY principle properly applied

---

## [8.20.40] - 2025-10-28

### Fixed
- **Complete Hook Logging Migration**: Updated ALL remaining 11 hooks to use createLogger() with normalized project paths
  - Critical fix: pm-constraints-enforcement.js now creates project-specific log files
  - This was causing monitoring operations to have no logs (logs went to wrong file)
  - Updated hooks: agent-infrastructure-protection, agent-marker, context-injection, git-enforcement, pm-constraints-enforcement, post-agent-file-validation, pre-agenttask-validation, stop, subagent-stop, task-tool-execution-reminder, user-prompt-submit
  - All 15 hooks now use consistent createLogger() pattern (4 from v8.20.39 + 11 from this fix)
  - Resolves user frustration: "I WAS RUNNING MAKE INSTALL MULTIPLE TIMES!" - src/hooks/ files finally updated

---

## [8.20.39] - 2025-10-28

### Fixed
- **Normalized Path Logging**: Added normalized project path to hook log filenames for multi-project debugging
  - Modified logging.js createLogger() to accept hookInput parameter
  - Added normalizePath() function: home→~, /→-, strip leading dash
  - Updated log filename format: ${date}-${normalizedPath}-${hookName}.log
  - Example: 2025-10-28-~-Work-Engineering-ansible-deployments-pm-constraints-enforcement.log
  - Updated 4 hooks (project-scope-enforcement, main-scope-enforcement, config-protection, summary-file-enforcement) to pass hookInput
  - Backwards compatible: hookInput parameter optional with default null
  - Resolves critical logging design flaw where missing logs went unnoticed across multiple projects

---

## [8.20.38] - 2025-10-28

### Fixed
- **Silent Exit Logging**: Added warning log when empty input data causes silent exit in pm-constraints-enforcement.js
  - Log appears before exit at line 860 to explain why operation was allowed
  - Message indicates empty input received after checking argv, env, and stdin
  - Enables diagnosis of monitoring operations that result in empty input

---

## [8.20.37] - 2025-10-28

### Fixed
- **Hook Entry Logging**: Added entry log to pm-constraints-enforcement.js to detect invocation vs silent exits
  - Entry log appears as first statement after log() function definition
  - Helps distinguish between hook invoked-but-silent vs not-invoked-at-all
  - Critical for debugging hook execution flow in monitoring operations

---

## [8.20.36] - 2025-10-28

### Fixed
- **Hook Invocation Bug Analysis**: Corrected previous incorrect analysis of global hook invocation failure
  - Previous analysis incorrectly claimed per-window behavior was "by design"
  - CONFIRMED: This is a Claude Code platform BUG, not intended behavior
  - Global hook registration does NOT result in global invocation across windows
  - Platform isolates hook calls per window/instance (security bypass)
  - Documented platform limitation and per-project workaround
  - Analysis stored in summaries/AGENTTASK-017-hook-global-invocation-bug-analysis.md
- **Memory Correction**: Updated memory/hooks/hook-invocation-project-scoping.md with warning
  - Added notice that original analysis was incorrect
  - Redirected to corrected bug analysis

---

## [8.20.35] - 2025-10-28

### Added
- **Hook Investigation**: Comprehensive analysis of hook invocation failure for monitoring window operations
  - Identified root cause: Claude Code's hook system is project-scoped, not truly global
  - Documented multi-window behavior and project context isolation
  - Created memory entry for hook invocation project scoping pattern
  - Report stored in summaries/AGENTTASK-016-hook-invocation-failure-analysis.md
- **Memory Entry**: Hook invocation project scoping pattern
  - Documents project-scoped hook invocation architecture
  - Explains why hooks don't trigger across different Claude Code windows
  - Provides solutions for ensuring project context detection
  - Stored in memory/hooks/hook-invocation-project-scoping.md

---

## [8.20.34] - 2025-10-28

### Added
- **Best Practice**: Promoted version-bump-and-release workflow to best-practices/git/
  - Documented complete version bump workflow with gh CLI integration
  - Includes branch protection, git privacy, and GitHub authentication patterns
  - Proven workflow used successfully 2+ times

### Fixed
- **UserPromptSubmit Hook Marker Cleanup**: Added automatic stale agent marker cleanup
  - Deletes project-specific agent markers at start of each user prompt
  - Ensures PM constraints hook correctly detects main scope context
  - Prevents stale markers from bypassing enforcement (agent_count > 0)
  - Non-fatal cleanup with error logging for resilience
  - Addresses critical bug where stale markers caused enforcement bypass

---

## [8.20.33] - 2025-10-28

### Fixed
- **Merge Conflict Resolution**: Resolved 28 merge conflicts by accepting server changes
  - Synchronized local main with origin/main (resolved 250/272 commit divergence)
  - All behavioral patterns, hooks, and templates updated to server versions
  - Documentation patterns added for future conflict resolution

---

## [8.20.32] - 2025-10-28

### Changed
- **AgentTask Execution Model**: Updated behavioral patterns to implement new execution model
  - Only Nano (0-2 pts), Tiny (3-5 pts), Medium (6-15 pts) AgentTasks are executable
  - Executable AgentTasks passed DIRECTLY to Task tool - NO file writes
  - Work >15 points becomes STORY in ./stories/ directory for breakdown
  - Large (16-30 pts) and Mega (30+ pts) templates deprecated for AgentTask execution
  - Maximum executable AgentTask complexity: 15 points

### Updated
- **Behavioral Patterns**: Updated all AgentTask-related behavioral patterns
  - src/behaviors/agenttask-creation-system.md: Updated size limits and execution flow
  - src/behaviors/agenttask-auto-trigger.md: Updated to 15-point maximum
  - src/behaviors/agenttask-enforcement.md: Added size enforcement rules
  - src/behaviors/story-breakdown.md: Updated AgentTask generation process
  - src/behaviors/shared-patterns/template-enforcement.md: Separated executable vs story templates
  - src/behaviors/shared-patterns/template-loading.md: Clarified executable template tiers
  - src/behaviors/template-resolution.md: Updated template source section

- **Documentation**: Updated CLAUDE.md to reflect new execution model
  - AgentTask Engine description updated to show executable tiers
  - Added Story System explanation for work >15 points
  - Complexity Tiers section updated with execution model details
  - Clarified direct Task tool invocation (no file writes)

### Technical Details
- **Execution Flow**: AgentTasks ≤15 points → Context passed to Task tool directly
- **Story Creation**: Work >15 points → Written to ./stories/ for PM breakdown
- **Template Deprecation**: large-agenttask-template.yaml and mega-agenttask-template.yaml deprecated for AgentTask execution
- **Quality Enforcement**: Size limits enforced through behavioral patterns, not hooks

---

## [8.20.31] - 2025-10-28

### Fixed
- **Config Integration Bug**: Fixed main-scope-enforcement.js to properly use config-based infrastructure protection
  - Hook was NOT using the config system - hardcoded patterns ignored icc.config.default.json configuration
  - Replaced hardcoded command lists with getSetting() calls to enforcement.infrastructure_protection settings
  - Read operations now loaded from enforcement.infrastructure_protection.read_operations (kubectl get, describe, logs, etc.)
  - Write operations now loaded from enforcement.infrastructure_protection.write_operations (kubectl apply, patch, scale, etc.)
  - Imperative destructive operations now loaded from enforcement.infrastructure_protection.imperative_destructive (kubectl delete, drain, etc.)
  - Enables project-specific overrides via icc.config.json without modifying hook code

### Technical Details
- **src/hooks/main-scope-enforcement.js (lines 75-107)**: isReadOnlyInfrastructureCommand() now loads read_operations from config
- **src/hooks/main-scope-enforcement.js (lines 132-183)**: isModifyingInfrastructureCommand() now loads write_operations and imperative_destructive from config
- **Pattern Composition**: Config-based patterns combined with additional patterns for comprehensive coverage
- **Backward Compatibility**: Default fallback arrays ensure functionality if config unavailable
- **Project Customization**: Projects can override lists in their own icc.config.json for specific requirements

---

## [8.20.30] - 2025-10-28

### Fixed
- **Critical SSH Enforcement Bypass**: Fixed security vulnerability where SSH-wrapped kubectl commands bypassed enforcement
  - SSH commands with embedded modifying operations (kubectl delete, rollout, etc.) now properly BLOCKED
  - SSH commands with embedded read-only operations (kubectl get, logs) now properly ALLOWED
  - Recursive command parsing extracts and validates embedded commands in SSH wrappers
  - Prevents execution of: `ssh user@host "kubectl delete pod test"`, `ssh ... "kubectl rollout restart ..."`

### Security
- **SSH Command Parsing**: Implements intelligent SSH command extraction and recursive validation
  - Extracts commands from both single and double quoted SSH patterns
  - Recursively validates embedded commands against modifying operation list
  - Blocks SSH without detectable embedded command (arbitrary command execution risk)
- **Test Coverage**: 8 test cases verified including SSH+kubectl combinations, direct commands, and documentation safety

### Technical Details
- **src/hooks/main-scope-enforcement.js (lines 105-123)**: Added extractSSHEmbeddedCommand() function
- **src/hooks/main-scope-enforcement.js (lines 128-140)**: SSH detection moved to FIRST check with recursive validation
- **Pattern Matching**: Regex patterns match `ssh ... "command"` and `ssh ... 'command'` variations
- **Recursion Safety**: Embedded command validated through same isModifyingInfrastructureCommand() function
- **Documentation Safe**: Echo, cat, and other documentation commands remain ALLOWED

---

## [8.20.29] - 2025-10-28

### Fixed
- **Critical kubectl Command Blocking**: Added missing kubectl commands to main scope enforcement
  - Added: kubectl rollout, kubectl set, kubectl expose, kubectl label, kubectl annotate
  - Added: kubectl replace, kubectl drain, kubectl cordon, kubectl uncordon, kubectl taint
  - Prevents main scope from executing infrastructure modification commands
- **SSH Command Blocking**: Verified SSH blocking properly catches all patterns including embedded commands
  - Blocks: `ssh user@host "kubectl get pods"` and all other SSH variations
  - SSH is always blocked in main scope as it can execute arbitrary commands

### Security
- **Infrastructure Protection**: Closed enforcement gaps that allowed:
  - kubectl rollout restart operations to bypass main scope restrictions
  - SSH-based command execution to bypass enforcement
  - Other kubectl modification commands not in previous blocking list
- **Complete kubectl Coverage**: All modifying kubectl operations now blocked in main scope
- **Comprehensive Testing**: Validated 19 test cases covering blocked and allowed patterns

### Technical Details
- **src/hooks/main-scope-enforcement.js (lines 115-116)**: Added 10 missing kubectl commands to modifyingCommands array
- **Test Coverage**: All kubectl rollout, set, expose, label, annotate, replace, drain, cordon, uncordon, taint commands blocked
- **SSH Detection**: Confirmed .startsWith() pattern correctly blocks all SSH variations
- **Allowed Operations**: kubectl get, describe, logs, top, explain remain permitted (read-only)

---

## [8.20.28] - 2025-10-26

### Fixed
- **MCP Config Relative Paths**: Makefile now resolves relative paths to absolute before passing to Ansible
- **User-Friendly Installation**: Users can now use `make install MCP_CONFIG=../mcp-servers/mcp-servers.json` without path resolution errors
- **Path Resolution Logic**: Added `realpath` resolution for MCP_CONFIG and ENV_FILE variables in Makefile

### Enhanced
- **Makefile (lines 10-22)**: Added path resolution variables MCP_CONFIG_ABS and ENV_FILE_ABS
- **Makefile (lines 106-107, 122-123, 131-132)**: Updated all ansible-playbook invocations to use absolute path variables
- **Backward Compatibility**: Absolute paths continue to work unchanged

### Benefits
- Relative paths work from user's working directory (e.g., ../path/to/config.json)
- No more "MCP configuration file not found" errors with valid relative paths
- Clean implementation with path resolution in Makefile before Ansible execution
- No Ansible playbook changes required

---

## [8.20.27] - 2025-10-26

### Added
- **Post-Agent File Validation**: New SubagentStop hook validates file placements after agent execution
- **src/hooks/post-agent-file-validation.js**: Non-blocking advisory validation for agent-created files
- **Agent Directory Enforcement**: Extends directory enforcement to agent operations (previously only main/PM scope)
- **Git Status Integration**: Scans modified files using git status to detect agent file creations
- **Advisory Corrections**: Provides git mv commands for fixing misplaced files without blocking agent work

### Enhanced
- **ansible/roles/intelligent-claude-code/tasks/main.yml**: Added post-agent-file-validation.js to SubagentStop hooks
- **ansible/roles/intelligent-claude-code/templates/settings.json.j2**: Registered new validation hook
- **install.ps1**: PowerShell installation updated with 15 production hooks (was 14)
- **Hook Count**: System now has 15 production hooks total across all events

### Benefits
- Agents can no longer bypass directory enforcement (previously only main/PM were enforced)
- Non-blocking advisory approach prevents breaking agent execution
- Clear git mv commands provided for easy file corrections
- Complete enforcement coverage across main scope, PM constraints, and agent operations
- Catches violations like analysis files in docs/ instead of summaries/

---

## [8.20.26] - 2025-10-26

### Added
- **Complete Hook Registration**: ALL 14 production hooks now registered in Ansible playbook and PowerShell script
- **Hook Registration Documentation**: docs/hook-registration-reference.md with complete hook-to-event mapping
- **Main Scope Sleep Allowlist**: Added sleep command to coordination allowlist for CI timing and rate limiting
- **9 PreToolUse Hooks**: git-enforcement, main-scope-enforcement, pm-constraints-enforcement, agent-infrastructure-protection, agent-marker, config-protection, pre-agenttask-validation, project-scope-enforcement, summary-file-enforcement
- **3 UserPromptSubmit Hooks**: user-prompt-submit, context-injection, task-tool-execution-reminder
- **1 SubagentStop Hook**: subagent-stop
- **1 Stop Hook**: stop

### Fixed
- **Git Enforcement Privacy Patterns**: Replaced overly broad patterns (AI, Claude, agent) with specific attribution patterns only
- **Legitimate Technical Mentions**: Now allows commit messages like "Fix mentions" or "Register role" without blocking
- **Specific Attribution Blocking**: Still blocks "Generated with Claude Code", "Co-Authored-By: Claude", and other attribution markers
- **Privacy Pattern List**: "Generated with \\[Claude Code\\]", "Generated with Claude Code", "Co-Authored-By: Claude", "Co-authored-by: Claude", "🤖 Generated with", "Claude assisted", "assisted", "claude.com/claude-code"

### Enhanced
- **src/hooks/git-enforcement.js**: Fixed privacy patterns in two locations (lines 70-79 and 253-267)
- **src/hooks/lib/command-validation.js**: Added sleep to allowed coordination commands
- **src/hooks/main-scope-enforcement.js**: Updated documentation to reflect sleep allowlist
- **ansible/roles/intelligent-claude-code/tasks/main.yml**: Complete hook registration for all 14 hooks
- **ansible/roles/intelligent-claude-code/templates/settings.json.j2**: All hooks properly configured
- **install.ps1**: PowerShell installation with all hooks registered

### Benefits
- Complete enforcement coverage with all hooks active
- Git privacy enforcement now allows legitimate technical discussions
- Main scope can coordinate timing for CI checks and rate limiting
- Clear documentation of all hook registrations and configurations
- Proper attribution blocking without preventing normal development work

---

## [8.20.25] - 2025-10-26

### Added
- **Filename-Based Directory Enforcement**: New enforcement system routes files to correct directories based on filename patterns
- **src/hooks/lib/directory-enforcement.js**: Library module for filename pattern matching and directory validation
- **Pattern-Based Routing**: STORY/EPIC/BUG files to stories/, AGENTTASK files to agenttasks/, docs to docs/, others to summaries/
- **Suggested Path Feedback**: Clear error messages showing both current and suggested correct path

### Enhanced
- **src/hooks/main-scope-enforcement.js**: Integrated directory enforcement check for Write/Edit operations
- **src/hooks/pm-constraints-enforcement.js**: Added directory enforcement validation for PM file operations
- **Error Messages**: Comprehensive feedback with directory routing rules and suggested corrections

### Benefits
- Prevents files from being written to wrong directories based on filename
- Automatic routing of STORY/BUG/EPIC files to stories/ directory
- AGENTTASK files correctly placed in agenttasks/ directory
- Documentation files routed to docs/, summaries to summaries/
- Clear user guidance with suggested correct paths

---

## [8.20.24] - 2025-10-26

### Added
- **L3 Autonomy Mechanical Enforcement**: Two-layer hook-based enforcement system for L3 autonomous execution mode
- **UserPromptSubmit L3 Detection**: Hook now loads autonomy_level from config and injects aggressive autonomous reminders when L3 active
- **High-Weight L3 Reminders**: 6 new L3 reminders (weight 12-15) covering work detection, decisions, errors, and story selection
- **Wrong/Correct Examples**: Clear behavioral examples showing incorrect approval-seeking vs correct autonomous execution
- **Continuous Reinforcement**: L3 reminders injected at TOP of context EVERY turn for maximum visibility

### Enhanced
- **src/hooks/user-prompt-submit.js**: Added L3 detection logic with config-loader integration and aggressive reminder injection
- **src/hooks/lib/reminders.json**: Added 6 L3 autonomous reminders with highest weights in system (12-15)
- **Autonomous Execution Flow**: Mechanical enforcement reduces approval questions and improves autonomous speed

### Removed
- **Deployment Permission Patterns**: Removed outdated deployment permission enforcement from all agents, templates, and behaviors
- **Legacy Permission Checks**: Cleaned up make install permission patterns across all documentation

### Benefits
- Mechanical L3 enforcement via hook system (not just behavioral guidance)
- Continuous reinforcement at start of every conversation turn
- Dramatically reduced approval questions in L3 autonomous mode
- Improved autonomous execution speed and user experience
- L1/L2 modes completely unaffected by L3 enhancements
- Clear wrong/correct examples for pattern learning

---

## [8.9.0] - 2025-09-21

### Changed
- **🎯 HELPFULNESS-FOCUSED SYSTEM**: Removed gamification theater and strengthened focus on system compliance as professional standard delivering superior help quality
- **💪 QUALITY FRAMING**: All messaging now emphasizes quality benefits of system compliance vs degraded outcomes from violations
- **🧠 MEMORY-FIRST ENFORCEMENT**: Enhanced messaging that skipping memory search equals repeating past mistakes and worse help
- **🚀 AGENT SUPERIORITY**: Strengthened messaging that agents deliver professional quality vs amateur direct work execution
- **📈 PROFESSIONAL STANDARDS**: Reframed system compliance as professional best practice delivering maximum user satisfaction

### Removed
- **🚫 Gamification Elements**: Eliminated all compliance scoring, milestone celebrations, and point systems
- **🗑️ Compliance Tracker**: Removed compliance-tracker.js and all associated scoring logic
- **🎮 Game Theater**: Removed all "achievement", "score", "milestone", and "points" messaging

### Enhanced
- **💼 PM ROLE MESSAGING**: Strengthened that PM doing technical work equals coordination failure and project chaos
- **⚡ VIOLATION MESSAGING**: Enhanced messaging that violations reduce help quality and professional standards
- **🎆 SYSTEM VALUE**: Reinforced that system equals professional standards equals best help

---

## [8.8.0] - 2025-09-21

### Added
- **🎮 COMPLIANCE SCORING SYSTEM**: Revolutionary gamification system that tracks and celebrates positive behaviors with milestone rewards
- **🏆 Milestone Celebrations**: Dynamic achievement system with rewards at 25, 50, 100, and 200 points celebrating journey to MAXIMUM HELPFULNESS
- **📊 Real-time Score Display**: Live compliance score tracking with status levels (BUILDING, GREAT, EXCELLENT, PERFECT, LEGENDARY) and star ratings
- **🎯 Behavior Detection**: Intelligent pattern recognition awarding points for AgentTask creation (+10), @Role usage (+5), memory search (+5), agent delegation (+8), and best practices (+5)
- **💡 Positive Reinforcement**: Constructive framing of improvement opportunities encouraging better behaviors instead of punishment
- **📈 Progress Tracking**: Visual progress indicators showing advancement toward next milestone with percentage completion
- **💾 Persistent Storage**: Cross-session score persistence in `~/.claude/hooks/compliance-score.json` with complete behavior history
- **🎊 Celebration Messages**: Enthusiastic milestone achievements: "COMPLIANCE CHAMPION IN TRAINING!", "BEHAVIORAL EXCELLENCE!", "PERFECT COMPLIANCE SCORE!", "LEGENDARY COMPLIANCE!"

### Enhanced
- **src/hooks/user-prompt-submit.js**: Integrated compliance tracking into main hook system for seamless behavior monitoring
- **src/hooks/lib/reminders.json**: Added 6 new compliance-focused reminders linking scoring system to help quality improvements
- **Hook System Architecture**: Enhanced educational reminder system with gamification elements for positive behavioral reinforcement

### Technical Implementation
- **src/hooks/lib/compliance-tracker.js**: Complete compliance scoring engine with behavior detection, milestone tracking, and score persistence
- **Behavioral Pattern Recognition**: Advanced regex-based detection for positive behaviors and improvement opportunities
- **Score Calculation**: Sophisticated scoring algorithm with positive reinforcement bias and constructive violation handling
- **Achievement System**: Comprehensive milestone tracking with timestamps, achievement history, and celebration triggers
- **Data Persistence**: Robust JSON-based storage with error handling and graceful degradation for uninterrupted operation

---

## [8.7.3] - 2025-01-21

### Enhanced
- **AGGRESSIVE behavioral enforcement**: Updated all behavioral patterns to use FORCEFUL language emphasizing quality and helpfulness
- **Maximum helpfulness framing**: System compliance now framed as path to SUPERIOR user outcomes and PROFESSIONAL quality
- **Hook reminders enhancement**: Added 7 new high-priority reminders emphasizing AgentTasks deliver BETTER results than direct work
- **Quality-focused messaging**: All enforcement patterns now emphasize how violations REDUCE help quality and DEGRADE user experience
- **Memory-first emphasis**: Strengthened messaging that memory search PREVENTS MISTAKES and saves USER TIME

### Modified
- **src/hooks/lib/reminders.json**: Added aggressive reminders framing system compliance as MAXIMUM HELPFULNESS
- **src/behaviors/agenttask-enforcement.md**: MANDATORY language emphasizing AgentTasks deliver SUPERIOR QUALITY
- **src/behaviors/shared-patterns/pm-role-enforcement.md**: PM restrictions framed as protecting USER EXPERIENCE
- **src/behaviors/shared-patterns/enforcement-rules.md**: Error messages emphasize quality degradation from violations
- **src/behaviors/shared-patterns/work-detection-patterns.md**: Work blocking framed as ensuring PROFESSIONAL outcomes
- **src/hooks/user-prompt-submit.js**: All violation messages emphasize HELP QUALITY reduction

### Messaging Theme
- Direct work = LOWER QUALITY, MORE ERRORS, LESS HELPFUL
- AgentTasks = SUPERIOR RESULTS, PROFESSIONAL QUALITY, MAXIMUM HELPFULNESS
- Memory search = FASTER ANSWERS, ERROR PREVENTION, SUPERIOR USER EXPERIENCE
- System compliance = BETTER outcomes for users, not restriction

---

## [8.7.2] - 2025-01-21

### Added
- Comprehensive architectural failure analysis identifying critical behavioral enforcement gaps
- Detailed root cause analysis documenting why agent creation is not automatic
- Complete solution architecture for PreToolUse hook enforcement implementation
- Immediate implementation plan with phased approach for behavioral compliance restoration

### Analysis
- **Critical Finding**: Behavioral patterns are advisory text without enforcement mechanisms
- **Root Cause**: PreToolUse/PostToolUse hooks were removed, leaving only UserPromptSubmit guidance
- **Impact**: Claude's helpfulness overrides architectural patterns leading to 70% compliance failure
- **Solution**: Restore PreToolUse hooks with real blocking capability and auto-AgentTask generation

## [8.7.1] - 2025-01-21

### Fixed
- Enhanced agenttask-enforcement.md with comprehensive workflow step enforcement and git operation requirements
- Added mandatory workflow completion validation with blocking patterns for incomplete executions
- Strengthened PM role delegation enforcement with strict tool access control
- Improved AgentTask execution validation with complete workflow step verification

## [8.7.0] - 2025-01-19

### Added
- **Enhanced Hook System**: Context loader now reads complete instructions from virtual-team.md and all referenced files
- **Main Scope Enhancement**: Enabled nano/tiny AgentTask in-memory generation and direct execution
- **Contextual Reminders**: Hook system provides intelligent contextual guidance based on user prompt analysis
- **Complete System Loading**: Hooks now load comprehensive behavioral patterns for full context availability

### Changed
- **AgentTask-Template Emphasis**: Updated all hook messages to specifically reference AgentTask-Templates
- **Memory-First Approach**: Significantly increased emphasis on memory/ search before work or questions
- **Learning Integration**: Enhanced focus on learning patterns and best-practices promotion in hook messaging
- **Enforcement Enhancement**: Main scope can now handle nano/tiny AgentTasks directly while maintaining template compliance

### Fixed
- **Ansible References**: Updated uninstall script to reference agenttask-templates instead of prb-templates
- **JSON Syntax**: Fixed trailing comma in reminders.json configuration file
- **Hook Messaging**: Enhanced compaction detection to reference complete system initialization requirements

---

## [8.6.0] - 2025-01-18

### Changed
- **Documentation Cleanup**: Comprehensive cleanup of obsolete and misplaced content
- **Terminology Update**: Standardized all documentation to use "AgentTask" instead of "PRB"
- **Commands Streamlined**: Updated docs to reflect only 3 actual commands
- **Directory Restructure**: Renamed best-practices/ to best-practices-examples/

### Added
- **Clear Hook Documentation**: Updated hook system guide to reflect UserPromptSubmit-only architecture

### Removed
- **Obsolete Directories**: Completely deleted ./bugs/ directory
- **Misplaced Files**: Removed behavioral files from docs/ directory (naming-standards.md)
- **Completion Reports**: Deleted PRB-COMPLETION-* files and validation tools
- **Obsolete Documentation**: Removed compact patterns and validation guides

### Fixed
- **Template References**: Updated all template paths from src/prb-templates/ to agenttask-templates/
- **Configuration Keys**: Fixed prb_configuration: to agenttask_configuration:
- **Template Filenames**: Updated references to use nano-agenttask-template.yaml format
- **Commands Documentation**: Reflects actual system with only 3 essential commands

## [8.5.0] - 2025-01-17

### Changed
- **Optimal Hook Architecture**: Migrated to UserPromptSubmit-only hook system for behavioral guidance
- **Removed Obsolete Hooks**: Eliminated SessionStart, PreToolUse, PostToolUse hooks entirely
- **Enhanced UserPromptSubmit**: Added compaction detection and system initialization enforcement
- **Installer Improvements**: Both Ansible and PowerShell installers now properly manage hooks
- **Non-Destructive Updates**: Ansible preserves user's custom hooks while cleaning obsolete ones

### Added
- **Compaction Detection**: UserPromptSubmit hook detects continued/summarized sessions
- **System State Tracking**: Tracks virtual team initialization status
- **Aggressive Initialization**: Forces /icc-init-system when system not loaded

### Fixed
- **Hook Registration**: Ansible now removes obsolete hooks instead of merging
- **Module Errors**: Eliminated MODULE_NOT_FOUND errors for deleted hooks
- **Settings Management**: Proper cleanup of legacy hook registrations

### Removed
- `src/hooks/session-start.js` - SessionStart cannot force initialization
- `src/hooks/stop.js` - Stop hook doesn't support required fields
- `docs/HOOK-ARCHITECTURE-ANALYSIS.md` - Obsolete documentation

## [8.3.0] - 2025-09-17

### Changed
- **Hook-Guided Behaviors**: Streamlined behavioral files to focus on essential logic rather than verbose procedural guidance
- **Pattern Simplification**: Removed hook-redundant guidance patterns that hooks already remind about
- **Essential Logic Focus**: Shifted behavioral files from HOW to WHAT (hooks handle the procedural how)
- **Template Compliance**: Maintained core functionality while trusting hooks for behavioral enforcement
- **Import Optimization**: Reduced unnecessary imports in streamlined behavioral files

### Improved
- **Behavioral Architecture**: Cleaner separation between essential logic and hook-guided procedures
- **Hook Integration**: Better trust relationship between behavioral patterns and hook reminders
- **File Maintainability**: Simplified behavioral files easier to maintain and understand
- **System Reliability**: Essential logic preserved while removing procedural redundancy

### Files Modified
- `src/behaviors/agenttask-auto-trigger.md`: Streamlined from 172 to ~30 lines
- `src/behaviors/agenttask-creation-system.md`: Streamlined from 167 to ~28 lines
- `src/behaviors/shared-patterns/best-practices-integration.md`: Streamlined from 166 to ~20 lines
- `src/behaviors/agenttask-execution.md`: Streamlined from 159 to ~21 lines
- `src/behaviors/shared-patterns/execution-summary.md`: Streamlined from 146 to ~15 lines
- `src/behaviors/shared-patterns/context-validation.md`: Streamlined from 139 to ~20 lines
- `src/behaviors/shared-patterns/workflow-resolution-patterns.md`: Streamlined from 136 to ~26 lines
- `src/behaviors/shared-patterns/memory-operations.md`: Streamlined from 133 to ~23 lines

## [8.2.0] - 2025-01-17

### Changed
- Drastically simplified behavioral enforcement system now that hooks provide direct guidance
- Reduced behavioral file complexity by 60-80% while maintaining essential functionality
- Streamlined enforcement patterns to trust hook-based behavioral reminders
- Consolidated redundant blocking patterns and validation logic
- Simplified error messages and recovery patterns
- Removed verbose "nuclear" enforcement language in favor of essential boundaries
- Maintained core architectural boundaries (@PM role restrictions, main scope blocking)
- Applied hook-first behavioral guidance approach with essential enforcement only

### Technical Details
- Simplified agenttask-enforcement.md from 93 to 27 lines (71% reduction)
- Simplified enforcement-rules.md from 136 to 34 lines (75% reduction)
- Simplified main-scope-blocking.md from 101 to 28 lines (72% reduction)
- Simplified behavioral-decision-matrix.md from 139 to 33 lines (76% reduction)
- Simplified pm-role-enforcement.md from 157 to 29 lines (82% reduction)
- Simplified validation-system.md from 98 to 40 lines (59% reduction)
- Overall enforcement system complexity reduced by 70% while preserving functionality
- Hook system now provides primary behavioral guidance with simplified enforcement backup

## [8.1.7] - 2025-01-26

### Changed
- Compacted behavior files by removing excessive enforcement language and simplifying structure
- Reduced priority behavior files to <125 lines each by removing redundant enforcement
- Removed "MANDATORY:", "CRITICAL:", "MUST", "ABSOLUTE", "ZERO TOLERANCE" prefixes
- Deleted "COMPACT-RESISTANT" sections and verbose error messages
- Converted repetitive explanations to bullet lists and removed dramatic language
- Simplified to clean technical specifications focusing on WHAT and HOW

### Technical Details
- agenttask-auto-trigger.md: 256→172 lines (33% reduction)
- agenttask-creation-system.md: 204→167 lines (18% reduction)
- story-breakdown.md: 188→132 lines (30% reduction)
- agenttask-execution.md: 172→159 lines (8% reduction)
- agenttask-enforcement.md: 138→92 lines (33% reduction)

## [8.1.8] - 2025-01-26

### Added
- 4 new educational reminders for improved behavioral guidance:
  - Self-contained AgentTask requirements (pre and post-action reminders)
  - Git settings compliance reminder for professional workflows
  - Agent selection based on project scope and task type

### Changed
- Compacted README.md by 75% (from 480 to 120 lines) for 2-minute quick start experience
- Enhanced reminder system with more comprehensive behavioral guidance
- Now includes 31 pre-action and 41 post-action educational reminders

### Improved
- Developer onboarding experience with streamlined README
- Educational reminder coverage for core architectural patterns
- Documentation organization with detailed content moved to CHANGELOG

---

## Historical Documentation

*The following detailed documentation was moved from README.md to keep the main README focused and concise.*

### Agent-Driven Architecture Details

Complete virtual development team with 14+ specialized agent roles that work together autonomously. Each agent has deep domain expertise and behavioral patterns optimized for their specialty.

**AgentTask-Driven Execution**: Self-contained AgentTasks replace complex workflows. Each AgentTask includes everything needed for single-pass execution: context, standards, examples, validation, and automatic agent invocation.

**Behavioral Hook Enforcement**: Built-in hook system ensures reliable execution patterns with pre-tool-use hooks, work intent detection, AgentTask-first patterns, and memory-first operations.

### Detailed How It Works

1. **Request Work** → "@PM Implement OAuth2 login"
2. **Agent Activation** → @PM analyzes and creates specialist agents as needed
3. **Memory Check** → Agents search for existing patterns/learnings
4. **Best-Practices Discovery** → Agents find relevant methodological approaches
5. **Analyze Complexity** → Agent team scores complexity (@PM + @Architect for Large/Mega)
6. **Generate PRB** → Self-contained blueprint with embedded context + practices + agent coordination
7. **Agent Execution** → Multi-agent collaborative implementation
8. **Git Integration** → Auto version bump + commit + push
9. **Cross-Agent Learning** → Capture new patterns shared across agent memory

### Agent-Driven Story Management Details

Transform natural language stories into executable AgentTasks with multi-agent coordination:

- **Story Analysis**: @PM reads business goals, specialist agents evaluate technical approaches
- **Agent Team Assembly**: Dynamic creation of domain specialists (@Auth-Engineer, @Frontend-Developer, etc.)
- **Priority Setting**: Multi-agent evaluation of business value + technical complexity
- **AgentTask Creation**: @PM generates complexity-appropriate AgentTasks with agent assignments
- **Agent Coordination**: Collaborative execution across specialized agent team
- **Next Selection**: Agent team considers dependencies, risk, current application state

### Advanced Automation Features

- **Context Awareness**: Auto-detects project type (CODE/AI-AGENTIC/HYBRID) and adjusts patterns
- **Dependency Analysis**: Auto-identifies prerequisite work and creates sequential PRBs
- **Size Management**: Auto-breakdown of complex work into multiple ≤15 point AgentTasks
- **Role Assignment**: Auto-selects appropriate specialists based on work type and technology domain
- **Memory Integration**: Auto-searches applicable patterns and embeds learnings in AgentTasks

### Hook Reminder System Details

The system includes an educational reminder system that helps users learn and follow intelligent-claude-code patterns:

- **Dynamic Loading**: JSON-based configuration with multi-location support
- **Educational Focus**: Non-blocking reminders (5-15% chance) that teach without interrupting
- **User Customization**: Project and user-level reminder customization
- **25+ Behavioral Reminders**: Covering @Role patterns, AgentTask workflow, memory-first approach

### MCP Server Integration Details

Install with automatic MCP server configuration with environment variable support, JSON syntax validation, backup & rollback, permission handling, and detailed logging.

### Memory Configuration Details

The AI agents can store their learnings in different locations with benefits including privacy (keep learnings separate from project code), sharing (use same memory across multiple projects), git integration (auto-commits changes), and flexibility (store anywhere accessible).

### Workflow Configuration Details

Control how the system handles different PRB sizes with fine-grained workflow settings:

- **Nano (0-2 points)**: Trivial fixes with minimal process overhead
- **Tiny (3-5 points)**: Small changes with basic versioning and documentation
- **Medium (6-15 points)**: Standard features requiring review and proper branching
- **Large (16-30 points)**: Complex features needing coordination and careful review
- **Mega (30+ points)**: Major system changes with breaking change assessment

Each size level supports version_bump, version_type, changelog_required, pr_required, merge_strategy, release_automation, coordination_required, and breaking_change_assessment controls.

### Why AgentTasks with Agents?

- **No workflow interruptions** - Single-pass multi-agent execution
- **Token-optimized** - Load only what each agent needs
- **Project-adaptive** - Agent team respects YOUR structure
- **Truly autonomous** - Agent specialists have full context and coordination
- **Predictable** - Same input → Same quality multi-agent output
- **Agent collaboration** - Cross-specialist knowledge sharing and coordination

---

## [8.1.7] - 2025-01-17

### Enhanced
- **Hook System Reminders**: Comprehensive one-line behavioral reminder system with 66 total reminders (27 preAction, 39 postAction)
- **Dynamic Reminder Display**: Hooks now show ONE random line per invocation instead of hardcoded messages
- **Always-On PostToolUse Reminders**: Removed 15% chance limitation - PostToolUse hook now ALWAYS shows helpful reminders
- **Resource Management Reminders**: Added extensive PostToolUse reminders for autonomy settings, cleanup, memory contribution, and AgentTask management
- **Research-First Approach**: Added PreToolUse reminder emphasizing "research, don't assume" philosophy

### Fixed
- **Reminder Loading Logic**: Fixed reminder-loader.js with proper random selection methods for both preAction and postAction reminders
- **Hook Reliability**: Enhanced hook execution to consistently provide educational guidance throughout user interactions
- **Behavioral Reinforcement**: Strengthened "proof don't claim" and resource cleanup patterns in post-action reminders

## [8.1.6] - 2025-01-16

### Fixed
- **Hook Path Resolution**: Fix hardcoded paths in reminder-loader.js that caused errors when hooks run from Claude Code context
- **Project Directory Detection**: Implement intelligent project directory detection using multiple strategies (environment variables, project markers, parent directory traversal)
- **Context-Aware Path Resolution**: Replace process.cwd() dependency with robust project directory detection for reliable operation when installed to ~/.claude/hooks/
- **Fallback Behavior**: Graceful handling when project directory cannot be detected, falling back to user-global and system default reminder locations

## [8.1.5] - 2025-01-16

### Changed
- Clean up Ansible playbook to remove obsolete test directories and scripts after hook system conversion
- Remove references to config, coverage, and tests directories in hook deployment tasks
- Remove executable permissions setting for non-existent test utility scripts

## [8.1.4] - 2025-01-16

### Added
- **Dynamic Reminder System**: Comprehensive educational reminder system with JSON configuration support
- **Multi-Location Loading**: Priority-based loading from project-local (.claude/hooks/reminders.json), user-global (~/.claude/hooks/reminders.json), and system default locations
- **User Extension Support**: Users can customize reminders for project-specific needs while preserving customizations during updates
- **25+ Behavioral Reminders**: Educational reminders covering @Role patterns, AgentTask workflow, memory-first approach, and system boundaries
- **Installer Integration**: Both Ansible and PowerShell installers deploy reminder system with user customization preservation

### Enhanced
- **Hook System Architecture**: Dynamic reminder loading with fallback hierarchy for reliability
- **Educational Focus**: Non-blocking educational reminders (5-15% chance) to reinforce system patterns without disrupting workflow
- **Installation Robustness**: Installers preserve user customizations while updating system components
- **Cross-Platform Support**: Consistent reminder system deployment across Linux, macOS, and Windows platforms

### Fixed
- Critical hook scope detection logic error where Task tool was incorrectly flagged as work instead of orchestration
- Task tool now correctly classified as planning with 1.0 confidence - Task creates subagents and IS the AgentTask+agent pattern
- AGENT_TOOLS constant properly exported from intent-classifier module for system integration
- Hook logic now properly distinguishes between work tools (Edit/Write/MultiEdit) and orchestration tools (Task/TodoWrite/ExitPlanMode)
- Behavioral enforcement system correctly implements: Main scope creates AgentTasks → Task tool creates agents → Agents do work

## [8.1.3] - 2025-01-16

### Fixed
- Critical production error in PreToolUse hook where convertClaudeCodeInput function was not exported in module.exports
- PreToolUse hook now properly processes Claude Code JSON input format with convertClaudeCodeInput function
- Behavioral enforcement system fully restored and functional after fixing missing function export
- Hook system can now handle both legacy and Claude Code specific PreToolUse JSON formats

## [8.0.2] - 2025-01-16

### Fixed
- PostToolUse hook registration missing from both Windows installer and Ansible playbook installation systems
- Windows installer now registers both PreToolUse and PostToolUse hooks in settings.json with proper deduplication
- Ansible playbook template updated to include PostToolUse hook registration for new installations
- Ansible merge logic enhanced to include PostToolUse hook when merging with existing settings.json
- Installation test validation updated to verify both PreToolUse and PostToolUse hook registration
- Uninstall procedures updated to properly remove both hook types from settings.json
- Production hook deployment now ensures complete behavioral enforcement system activation

### Enhanced
- Hook registration system now provides consistent deployment across Windows and Linux installation methods
- Installation logs clearly distinguish between PreToolUse and PostToolUse hook registration steps
- Test utilities excluded from production hook registration while maintaining executable status for testing

## [8.1.2] - 2025-01-16

### Added
- Educational reminder system in PostToolUse hook providing random system principle reminders
- 10 comprehensive reminder categories covering @Role patterns, AgentTask workflow, memory-first approach, and system boundaries
- Random message rotation to prevent repetitive notifications (15% chance for educational tools, 5% for others)
- System principle reinforcement through post-tool notifications to enhance user education

### Enhanced
- PostToolUse hook now combines memory storage enforcement with educational reminders
- Cross-platform compatibility maintained with Node.js implementation
- Graceful input handling pattern preserved from existing hook architecture

## [8.1.1] - 2025-01-16

### Fixed
- Comprehensive input handling for all hooks to gracefully handle missing input, JSON parse errors, and stdin issues
- Applied convertClaudeCodeInput() function pattern to PostToolUse hook for consistent Claude Code JSON format handling
- Enhanced fail-open philosophy across all hook types to prevent Claude Code crashes due to hook input problems
- Improved hook system reliability with graceful failure handling when input problems occur

## [8.1.0] - 2025-01-16

### Added
- Windows installer hook deployment and settings.json integration
- Install-HookSystem function for comprehensive hook deployment to scope-appropriate directories
- Full settings.json JSON manipulation with ConvertFrom-Json and ConvertTo-Json
- Duplicate prevention for repeated installations with robust validation
- Support for both user scope (~/.claude/) and project scope (project/.claude/)
- Comprehensive error handling for missing files, malformed JSON, and file operations
- User feedback and progress indication throughout hook deployment process
- Hook cleanup integration in both conservative and force uninstall modes
- Test-JsonFile validation for settings.json corruption detection
- Register-HookInSettings and Unregister-HookFromSettings functions
- Complete parity with Ansible playbook hook deployment approach

### Fixed
- Cleanup of unnecessary test and analysis files created during development
- Proper feature branch workflow implementation

## [8.0.4] - 2025-01-16

### Added
- STORY-002-AgentTask-002: Implemented PowerShell hook file deployment in install.ps1
- Added Install-HookSystem function for Windows hook deployment automation
- Comprehensive hook file copying from src/hooks/ to ~/.claude/hooks/ recursively
- Windows path resolution with proper user profile directory handling
- Robust error handling for file operations and permission issues
- User feedback and progress indication during hook deployment
- Updated uninstall logic to properly clean up hooks directory
- Enhanced test suite to validate hook deployment functionality

## [8.0.3] - 2025-01-16

### Fixed
- BUG-005-AgentTask-001: Fixed critical hook script stdin blocking issue
- Removed all async/await stdin dependencies that caused indefinite waiting
- Implemented synchronous input handling with command line, environment variable, and piped stdin support
- Eliminated readline and async Promise-based stdin reading that blocked hook execution
- Hook now executes autonomously in ~20ms without any user interaction
- Fixed behavioral enforcement system failure caused by stdin hanging
- Added comprehensive input method support with clear error messages

## [8.0.2] - 2025-01-16

### Fixed
- BUG-002-AgentTask-001: Updated hook source files from PRB to AgentTask terminology
- Updated pre-tool-use.js to reference AgentTask creation instead of PRB creation
- Updated intent-classifier.js comments and patterns for AgentTask terminology
- Updated intent-patterns.json configuration to use agenttask_context and agenttask paths
- Updated README.md documentation to reflect AgentTask terminology throughout
- Improved hook system consistency with system-wide AgentTask terminology adoption

## [8.0.1] - 2025-01-16

### Fixed
- Fixed hook input validation to handle multiple tool name formats and context types
- Improved error handling for Claude Code hook integration compatibility
- Enhanced context processing to support arrays, objects, and nested structures

## [7.18.0] - 2025-01-16

### Changed
- STORY-003-PRB-004: Completed final AgentTask template rename
- Renamed prb-templates/ directory to agenttask-templates/
- Renamed all template files from *-prb-template.yaml to *-agenttask-template.yaml
- Updated template content to use AgentTask terminology instead of PRB references
- Updated Ansible deployment to install agenttask-templates/ directory
- Updated all template error messages and placeholders for AgentTask consistency

## [7.21.2] - 2025-01-16

### Changed
- Renamed directory structure from prbs/ to agenttasks/ for AgentTask terminology alignment
- Updated all configuration references from prb_path to agenttask_path
- Modified hook scripts to recognize .agenttask.yaml files and /agenttasks/ directory
- Updated behavioral documentation to reflect AgentTask terminology
- Preserved all existing AgentTask files during directory rename

## [7.21.1] - 2025-01-16

### Changed
- STORY-003-PRB-002: Updated shared patterns files for AgentTask terminology
- Renamed prb-queue-management.md to agenttask-queue-management.md
- Updated all PRB references to AgentTask in shared patterns files
- Fixed queue terminology and execution patterns in agenttask-queue-management.md
- Updated execution-summary.md, execution-validation.md, memory-operations.md with AgentTask terminology
- Updated workflow-enforcement-patterns.md and workflow-resolution-patterns.md with AgentTask terminology
- Fixed import references to use new agenttask-queue-management.md filename

## [7.21.0] - 2025-01-16

### Changed
- STORY-003-PRB-001: Renamed core behavioral files from PRB to AgentTask terminology
- Renamed 5 core behavioral files: prb-creation-system.md, prb-auto-trigger.md, prb-execution.md, prb-enforcement.md, prb-system-integration.md
- Updated all headers from "PRB" to "AgentTask" in renamed files
- Fixed cross-file references and imports to use new AgentTask filenames
- Updated virtual-team.md imports to reference new AgentTask behavioral files
- Updated icc-init-system.md documentation to reflect new AgentTask file names
- Preserved git history through proper git mv operations

## [7.20.0] - 2025-01-16

### Enhanced
- BUG-072-PRB-001: Implemented aggressive breakdown enforcement to ensure manageable task decomposition
- Enforced MANDATORY story creation for all work ≥6 points before PRB generation
- Limited PRB creation to nano (0-2 points) and tiny (3-5 points) templates only
- Blocked medium, large, and mega PRB template usage to prevent oversized tasks
- Updated prb-auto-trigger.md with aggressive breakdown rules and size restrictions
- Enhanced prb-creation-system.md with story-first enforcement for ≥6 point work
- Strengthened story-breakdown.md to ensure all PRBs are ≤5 points maximum
- Added comprehensive blocking patterns to prevent bypass of breakdown requirements
- Implemented enforcement messages to guide users through proper decomposition workflow
- Created fail-safe mechanisms ensuring all complex work follows Story→tiny PRB pattern

## [7.19.0] - 2025-01-16

### Enhanced
- BUG-071-PRB-001: Implemented PRB deduplication checking to prevent duplicate work creation
- Added mandatory Step 0 duplicate check to prb-creation-system.md before all PRB generation
- Enhanced prb-auto-trigger.md with deduplication detection before template loading
- Implemented 70% similarity threshold using weighted scoring algorithm (description 40%, scope 30%, context 20%, parent 10%)
- Added update-existing pattern to enhance existing PRBs instead of creating duplicates
- Created comprehensive similarity scoring for work descriptions, technical scope, and context alignment
- Added user notification system for existing PRB reuse with enhancement details
- Enhanced blocking patterns and auto-correction for duplicate creation attempts
- Updated context requirements to include mandatory duplicate check completion

## [7.18.0] - 2025-01-16

### Enhanced
- BUG-070-PRB-003: Implemented hook-based enforcement for memory consultation and storage
- Enhanced pre-tool-use.js with memory consultation requirements before PRB creation
- Created post-tool-use.js hook for automatic memory storage reminders after PRB execution
- Added MemoryEnforcement class with 5-minute consultation window validation
- Implemented memory search detection through violation logs and file operations
- Added comprehensive memory opportunity detection for domain knowledge, solution patterns, and issue resolution
- Updated settings-example.json to include PostToolUse hook configuration
- Enhanced hook README with memory enforcement documentation and usage guidelines
- Added memory violation logging and compliance tracking for analysis
- Created test suite for memory enforcement functionality validation

## [7.17.0] - 2025-01-16

### Enhanced
- BUG-070-PRB-002: Implemented automatic memory storage after PRB execution
- Enhanced prb-execution.md with mandatory memory storage as Step 9 in execution flow
- Updated execution-summary.md to include memory storage in 10-step checklist and require memory storage documentation
- Strengthened learning-team-automation.md with specific PRB completion triggers for automatic pattern capture
- Enhanced memory-operations.md with comprehensive PRB completion storage guidance and topic selection rules
- Added automatic storage triggers for successful patterns, error resolutions, configuration discoveries, and process optimizations
- Implemented security validation and proper topic organization for PRB execution learnings
- Documented memory storage format and examples for consistent pattern capture across all PRB completions

## [7.16.0] - 2025-01-16

### Enhanced
- BUG-070-PRB-001: Integrated memory consultation into PRB generation flow
- Enhanced prb-creation-system.md with mandatory memory-first approach and detailed SearchMemory integration
- Updated prb-auto-trigger.md to enforce memory search before template loading with comprehensive pattern embedding
- Strengthened memory-operations.md with detailed PRB integration process and validation rules
- Added memory search validation and blocking patterns to prevent runtime memory lookups
- Documented memory pattern embedding process for self-contained PRB execution
- Implemented memory-first principle throughout PRB generation pipeline

## [7.15.10] - 2025-01-08

### Fixed
- BUG-069-PRB-003: Enhanced hook installation documentation for comprehensive project and user scope support
- Updated INSTALLATION.md to clearly document both project-level (recommended) and user-level installation methods
- Added verification instructions for both installation types with proper environment variable usage
- Improved logging location documentation to show project vs user scope paths
- Validated backward compatibility with existing user-level installations

## [7.15.9] - 2025-01-08

### Fixed
- BUG-069-PRB-003: Fixed hook scope violations to properly support project-level hooks
- ViolationLogger now uses CLAUDE_PROJECT_DIR environment variable for project-relative log paths
- ConfigLoader supports both project and user scope with proper path resolution
- Updated hook installation documentation for both project-level and user-level deployment
- Environment variable support for CLAUDE_PROJECT_DIR to enable project boundaries
- Backward compatibility maintained with user scope as fallback when CLAUDE_PROJECT_DIR not set

## [7.15.8] - 2025-01-08

### Fixed
- BUG-069-PRB-002: Added hook deployment to Ansible installation tasks
- Hooks directory now created during installation with proper subdirectory copying
- Hook scripts made executable during installation process
- Settings.json template created for hook registration
- Added logs directory creation for violation logging
- Installation summary updated to indicate behavioral hooks are active

## [7.15.7] - 2025-09-07

### Added
- STORY-001-PRB-001: Intent classification engine for behavioral enforcement
- High-performance Node.js classifier distinguishing research vs work intent
- 95.2% accuracy on test scenarios with <5ms performance target achieved
- Support for 4 intent categories: research, qa, planning, work
- Comprehensive test suite with 21 accuracy scenarios and edge case testing
- Integration patterns for main scope blocking and PRB execution enforcement
- Tool-based classification for Edit, Write, Read, Grep, Glob, Bash operations
- Context analysis for @Role patterns, question detection, and work verbs
- File path analysis for code vs documentation vs planning files
- Command analysis for read-only vs modification operations

## [7.15.7] - 2025-09-06

### Fixed
- BUG-069: Implement compact-resistant behavioral enforcement patterns to survive context compression
- Added COMPACT-RESISTANT markers to critical enforcement sections
- Implemented CHECKPOINT patterns for rule re-injection at decision points
- Created ULTRA-SHORT reminders (PM=COORDINATION-ONLY) that survive summarization
- Added context monitoring sections for reinforcement detection
- Enhanced behavioral pattern persistence through Claude Code AUTO-COMPACT compression

## [7.15.6] - 2025-09-06

### Fixed
- Remove hardcoded template paths that break user-scope installations
- Fix template hierarchy to properly use detected installation path instead of hardcoded .claude/prb-templates/ references
- Ensure compatibility with user-scope ~/.claude/ installations and $CLAUDE_INSTALL_PATH
- Simplify template loading hierarchy to: project → installation (removing invalid project/.claude/ hardcoded path)

## [7.15.4] - 2025-09-06

### Fixed
- Integrated missing shared patterns into virtual-team.md to resolve system dependencies
- Added summary-validation-patterns.md, pm-role-blocking-patterns.md, and work-detection-patterns.md imports
- Updated behavior count from 18 to 21 in core summary

## [7.15.3] - 2025-01-06

### Fixed
- Restored YAML configuration examples in behavioral patterns for better user understanding

## [7.15.2] - 2025-01-06

### Fixed
- Enforce 150-line limit on all behavior files per CLAUDE.md requirements
- Split oversized behaviors into shared patterns
- Maintain functionality through pattern imports
- Improve behavioral system modularity
- Extract execution summary validation patterns
- Modularize main scope blocking patterns  
- Split agents documentation into focused files
- Reorganize init system command patterns

## [7.15.1] - 2025-01-06

### Fixed
- Remove all pseudo-code from system files per CLAUDE.md requirements
- Replace code blocks with markdown behavioral descriptions
- Maintain system functionality through clear behavioral patterns
- Transform enforcement messages from code blocks to structured markdown
- Complete system compliance with markdown-based AI-agentic requirements

## [7.15.0] - 2025-09-06

### Added
- Comprehensive PRB execution summary pattern with mandatory 9-step validation checklists
- execution-summary.md behavioral pattern for transparent execution reporting
- Mandatory execution summary enforcement in prb-execution.md
- Complete functional requirements, success criteria, and git operations validation
- Files modified tracking and next steps guidance in all PRB completions
- Enhanced execution transparency and accountability through structured summaries

## [7.14.0] - 2025-09-06

### Enhanced
- Sequential thinking triggers liberalized for any multi-step reasoning
- Project context now always included in sequential thinking analysis
- Behavioral decision matrix updated to route more scenarios to sequential thinking
- PRB generation enhanced with mandatory sequential thinking step
- MCP tool integration enhanced with project scope awareness
- Liberal automatic activation for ALL multi-step reasoning processes

## [7.13.0] - 2025-09-06

### Fixed
- BUG-065: Git privacy setting validation and enforcement implemented
- Enhanced AI mention filtering for professional git operations
- Improved configuration loading for git_privacy setting
- Added mandatory privacy validation before ALL git operations
- Enhanced PRB templates with comprehensive AI mention filtering
- Strengthened professional git standards compliance

## [7.12.0] - 2025-09-06

### Fixed
- BUG-064: PM role nuclear work blocking enforcement implemented
- Enhanced PM role architectural violation prevention with ultra-aggressive detection
- Improved main scope execution blocking for PM work attempts
- Strengthened PM tool access restrictions with nuclear messaging
- Added PM-specific detection patterns to main-scope-blocking.md
- Enhanced PM behavioral integration in enforcement-rules.md

## [7.11.2] - 2025-09-06

### Fixed
- Fixed Playwright MCP server configuration to use correct package `@playwright/mcp@latest`
- Fixed GitHub MCP server by adding missing `-y` flag for automatic npm package installation
- Fixed Python-based MCP servers (pdf-reader, document-operations) by using full path to uv with correct syntax
- Updated README.md with correct Playwright MCP server package in examples

## [7.11.0] - 2025-09-01

### Added
- **CRITICAL**: Implemented best-practices search and generation in PRB system
- Best-practices directory integration with PRB generation flow
- Automatic best-practices search during PRB creation (step 3 in generation flow)
- Work type to best-practices directory mapping (architecture, development, security, etc.)
- Pattern promotion from successful memory patterns to reusable best-practices
- New best-practices-operations.md shared pattern for systematic operations
- Token-optimized best-practices embedding in PRB context (max 1000 tokens)
- Relevance scoring for best-practices selection based on work context
- Auto-generation of best-practices from patterns used 3+ times successfully

### Enhanced
- Updated prb-auto-trigger.md with mandatory best-practices search integration
- Enhanced prb-creation-system.md with best-practices context embedding
- Improved learning-team-automation.md with best-practices generation from successful patterns
- Updated best-practices-integration.md with project directory structure support
- Added comprehensive work type analysis and directory mapping logic

## [7.10.0] - 2025-09-01

### Fixed
- **CRITICAL**: BUG-063 - Enhanced `/icc-init-system` command robustness after context loss
- **CRITICAL**: Added comprehensive context recovery mechanisms for AI-agentic system
- **CRITICAL**: Improved bootstrap validation with detailed failure reporting
- Added three-phase initialization: Recovery → Loading → Validation
- Enhanced error handling for context-loss-specific scenarios
- Added recovery state assessment to help users understand system state
- Integrated context-validation patterns for comprehensive system validation

## [7.9.0] - 2025-09-01

### Added
- **CRITICAL**: Implemented missing Sequential Thinking behavioral pattern (109 lines)
- **CRITICAL**: Implemented missing Ultrathinking behavioral pattern (118 lines) 
- **CRITICAL**: PM nuclear work blocking with zero-tolerance enforcement
- New pm-role-enforcement.md shared pattern for PM delegation compliance
- Analytical frameworks integration in virtual-team.md
- Sequential analysis integration in PRB generation workflow

### Fixed
- **CRITICAL**: BUG-061 - PM roles now blocked from all direct work execution
- **CRITICAL**: BUG-062 - Sequential thinking and ultrathinking patterns now fully implemented
- PM validation-to-fix violations completely eliminated
- story-breakdown.md reference to mcp__sequential-thinking__sequentialthinking now supported
- Complete analytical framework coverage for complex problem solving

### Changed
- Enhanced story-breakdown.md with PM work prohibition patterns
- Updated virtual-team.md from 16 to 18 behavioral patterns
- Strengthened behavioral-decision-matrix.md with analytical framework integration
- Enhanced prb-auto-trigger.md with sequential analysis integration

## [7.8.1] - 2025-09-01

### Fixed
- **CRITICAL**: Implemented PM role nuclear work blocking to prevent direct work execution violations
- Enhanced story-breakdown behavior with absolute PM work prohibition patterns
- Added PM-specific tool access control and violation detection
- Created pm-role-enforcement.md shared pattern for nuclear PM blocking
- Integrated PM validation→PRB pattern to enforce coordination-only role requirements

## [7.8.0] - 2025-08-30

### Added
- **CRITICAL**: Implemented ULTRA-STRICT main scope work blocking with ZERO TOLERANCE
- Nuclear enforcement patterns for architectural integrity protection
- Enhanced workflow enforcement with platform-agnostic PR creation patterns
- MCP extensions and prb-extensions.yaml integration for behavioral system
- Comprehensive shared pattern validation and inclusion checking
- Workflow setting embedding in PRBs for complete self-contained execution

### Fixed
- **CRITICAL**: All PRBs now self-contained with embedded workflow settings
- **CRITICAL**: Workflow PR creation now enforced when workflow.pr_required=true
- **CRITICAL**: Removed ALL GitHub-specific hardcoding for multi-platform support
- **CRITICAL**: Main scope execution blocking strengthened with nuclear enforcement
- **CRITICAL**: All behavioral files shortened to 125-line maximum
- **CRITICAL**: Complete removal of code/pseudo-code patterns from behavioral files
- Fix PRB generation to embed resolved workflow settings instead of placeholders
- Ensure agents receive explicit PR creation commands when pr_required=true
- Add workflow resolution patterns for self-contained PRB execution
- Remove GitHub-specific hardcoding from workflow enforcement patterns, making them platform-agnostic for GitLab, Bitbucket, and other git platforms
- Placeholder resolution system for [WORKFLOW_*] patterns in PRBs
- Behavioral decision matrix with context-based complexity scoring
- Template enforcement patterns with complete validation

### Changed
- prb-enforcement.md: Enhanced with ultra-strict detection patterns and nuclear blocking
- main-scope-blocking.md: New shared pattern with comprehensive work detection
- workflow-enforcement-patterns.md: New shared pattern for platform-agnostic workflows
- All behavioral files: Shortened and cleaned of code contamination
- PRB templates: Now include workflow setting placeholders for resolution

## [7.7.1] - 2025-08-30

### Fixed
- **CRITICAL**: Removed all code/pseudo-code patterns from behavioral system files
- **CRITICAL**: Shortened all behavioral files to 125-line maximum requirement
- Eliminated if/then, function(), and programming syntax from markdown behavioral patterns
- Converted code syntax to natural language behavioral statements
- Fixed code contamination violations throughout AI behavioral system
- Maintained all functionality while ensuring markdown-only behavioral language
- Created BUG-055 documenting project scope enforcement issues

### Changed
- prb-enforcement.md: 256→119 lines with code pattern removal
- template-loading.md: 274→134 lines with pseudo-code elimination
- prb-auto-trigger.md: 218→133 lines with syntax conversion
- prb-execution.md: 180→126 lines with behavioral language
- prb-creation-system.md: 165→134 lines with code cleanup
- memory-operations.md: 164→79 lines with natural patterns
- All behavioral files now use natural markdown language instead of code

## [7.6.6] - 2025-08-30

### Added
- Comprehensive template extensions documentation (docs/template-extensions.md)
- Real-world examples for frontend, backend, DevOps, and documentation projects
- Complete prb-extensions.yaml structure reference with all customization options
- AI-powered intelligent merging explanation with additive and override patterns
- Migration guide from template copying to extension-based customization
- Troubleshooting section with specific error patterns and solutions
- Best practices for when to use extensions vs template copying
- Performance optimization guidance for large extension files

## [7.6.5] - 2025-08-30

### Enhanced
- Refactored agent-status-monitoring.md from 107 to 63 lines (41.1% reduction)
- Consolidated agent states into single line format for improved conciseness
- Simplified monitoring pattern to essential periodic check behavior
- Compressed failure handling to action table format with direct responses
- Streamlined timeout management to complexity mapping and response flow
- Focused on monitoring behavior patterns while preserving all functionality

## [7.6.4] - 2025-08-30

### Enhanced
- Refactored prb-queue-management.md from 285 to 46 lines (83.9% reduction)
- Consolidated queue states into compact table format with clear dispatch rules
- Simplified conflict detection and dependency resolution to essential behavioral logic
- Preserved all functionality while dramatically improving conciseness and readability
- Removed verbose YAML examples and implementation details, focusing on decision patterns

## [7.6.3] - 2025-08-30

### Enhanced
- Refactored non-blocking-task-patterns.md from 195 to 63 lines (67.7% reduction)
- Consolidated verbose examples and redundant explanations into concise behavioral patterns
- Preserved all functionality while improving readability and maintainability
- Optimized decision matrix, agent management, and error handling for faster comprehension

## [7.6.2] - 2025-08-30

### Enhanced
- Story breakdown behavior with MCP issue tracker integration patterns
- External issue creation support for GitHub, GitLab, and Jira via MCP servers
- Bidirectional status synchronization between file-based and external issue systems
- Provider-specific patterns and metadata storage for external issue tracking
- File-based system remains default with opt-in external integration

## [7.6.1] - 2025-08-30

### Enhanced
- PRB templates with conditional MCP operation routing and provider extension points
- All PRB templates (nano, tiny, medium, large, mega) now include mcp_operations sections
- Conditional execution patterns that check MCP configuration and route to appropriate providers
- Comprehensive placeholder resolution documentation for MCP configuration values
- Backward compatibility maintained with file-based fallbacks as guaranteed defaults

## [7.6.0] - 2025-08-30

### Added
- MCP (Model Context Protocol) configuration schema for CLAUDE.md integration
- MCP provider detection patterns for memory, issue tracking, and documentation operations
- Comprehensive fallback system ensuring file-based operations as guaranteed default
- Provider interface standards for memory, issue tracking, and documentation MCP servers
- Configuration validation rules and schema compliance checking
- Integration with config-loader.md for MCP configuration loading and caching
- Graceful degradation patterns with error handling and logging

### Enhanced
- Memory operations with MCP provider detection and automatic fallback
- Configuration loading system with MCP integration support
- Project extensibility through optional MCP server configuration
- Backward compatibility guarantee preserving existing file-based workflows

## [7.5.1] - 2025-08-30

### Added
- PRB queue management system with behavioral patterns for parallel execution
- Queue state lifecycle tracking (queued → running → completed → failed → blocked)
- Capacity enforcement system respecting max_parallel from L3 autonomy settings
- File conflict prevention through behavioral locking patterns
- Dependency resolution system for chained PRB execution
- Auto-dispatch behavioral patterns triggering queued PRBs when capacity available
- Background Task tool integration with agent handle management
- Priority-based queue management with HIGH → MEDIUM → LOW ordering

### Enhanced
- PRB execution behavior with queue management integration
- PRB auto-trigger system with queue management support
- Memory system with queue management patterns and performance tracking
- L3 autonomous mode with true parallel execution capacity management

## [7.5.0] - 2025-08-30

### Added
- Non-blocking Task tool invocation patterns for parallel agent execution
- Agent handle tracking and status monitoring system
- Background execution decision criteria and capacity management
- Parallel execution coordination with conflict detection
- L3 autonomous mode support for true parallel agent execution

### Enhanced
- PRB execution behavior with non-blocking Task tool integration
- Agent registry management for background execution tracking
- Status monitoring patterns for background agents

## [7.4.21] - 2025-08-29

### Added
- L3 autonomous mode configuration with full autonomous execution capability
- Enhanced L3 settings: max_parallel=5, auto_discover=true, continue_on_error=true
- Context-based behavioral decision matrix (behavioral-decision-matrix.md) for consistent pattern following
- Four-tier decision hierarchy: @Role direct → Work→PRB → Simple info direct → Complex→PRB
- Context-based complexity evaluation system replacing keyword-based detection
- Token-efficient decision checklist for real-time behavioral choices
- Integration with prb-enforcement.md and prb-auto-trigger.md for consistent decision making
- Resolution of contradictions between existing behavioral patterns

### Fixed
- Behavioral pattern inconsistencies between enforcement and auto-trigger logic
- Conflicting guidance for @Role mentions and work intent classification
- Missing context evaluation for complexity assessment in decision making

## [7.4.20] - 2025-08-29

### Added
- PRB template extension system (prb-extensions.yaml) enabling project-specific template customization
- AI-powered intelligent merging of extensions with base templates
- Support for 'all:' section for universal additions across all PRB sizes
- Size-specific extensions (nano:, tiny:, medium:, large:, mega:) for targeted customization
- Override marker (!override) for explicit value replacement in extensions
- Comprehensive documentation and examples for extension system usage
- Backward compatibility maintained for projects without extensions

## [7.4.19] - 2025-08-29

### Added
- Windows PowerShell installation script (install.ps1) with full feature parity to Linux Makefile
- Windows installation instructions in README.md with PowerShell examples
- MCP configuration support for Windows installations
- Comprehensive test suite for Windows installation including idempotency tests
- Conservative and force uninstall options for Windows users

### Contributors
- @pawanb24 - Windows PowerShell installation support

## [7.4.18] - 2025-08-28

### Fixed
- BUG-045: Expanded sequential thinking usage with lower thresholds and more triggers
- Lowered sequential thinking threshold from complexity >5 to >2 points
- Added triggers for bug analysis, PRB creation planning, and architecture decisions
- Enhanced structured decision-making patterns for improved work quality

## [7.4.17] - 2025-08-28

### Fixed
- BUG-044: Added tool-level blocking to prevent main scope work execution
- Implemented Edit/Write/MultiEdit tool blocking for work patterns in main scope
- Added automatic PRB generation trigger when tools are blocked
- Enhanced enforcement with clear error messaging and @Role pattern redirection

## [7.4.16] - 2025-08-28

### Fixed
- BUG-043: Enforced complete PRB workflow execution in agents
- Added mandatory workflow completion enforcement to ai-engineer and developer agents
- Blocked incomplete workflow patterns with comprehensive validation requirements
- Ensured all 7 workflow steps (knowledge, implementation, review, version, documentation, commit, push) are mandatory

## [7.4.15] - 2025-08-27

### Fixed
- BUG-037: Corrected default configuration to professional standards (PM active, git privacy, PR enforcement)
- BUG-036: Disabled automatic file generation, requires explicit user request
- BUG-035: Fixed autonomy level configuration to read from and persist to CLAUDE.md
- Added autonomy level reading from CLAUDE.md on system initialization
- Implemented autonomy level persistence mechanism to preserve user preferences across sessions
- Enhanced config-loader.md with autonomy persistence functionality
- Updated icc-init-system.md to use and persist autonomy level changes

## [7.4.14] - 2025-08-27

### Fixed
- BUG-033: Added execution precision controls to prevent overshooting user requests
- Implemented proportional response rules where simple requests get simple responses
- Added scope expansion blocking patterns to prevent automatic feature expansion
- Enhanced prb-enforcement.md with request-response complexity alignment

## [7.4.13] - 2025-08-27

### Added
- Workflow configuration initialization in icc-init-system (BUG-042)
- Documentation for workflow configuration feature in README

## [7.4.12] - 2025-08-27

### Added
- Workflow configuration system per PRB size (BUG-041)
- Automatic workflow instructions in PRBs
- Version bump, CHANGELOG, PR, and release automation settings
- Workflow section placeholders in all 5 PRB templates (nano, tiny, medium, large, mega)
- Enhanced prb-auto-trigger.md to read and embed workflow settings during PRB generation

## [7.4.11] - 2025-08-27

### Fixed
- **BUG-029**: Added sequential thinking triggers for main scope roles
- **BUG-034**: Activated sequential thinking that was integrated but unused since v7.3.13
- Added minimal triggers (2 lines total) to story-breakdown.md and prb-auto-trigger.md
- Complex tasks (>5 points) now automatically use structured thinking
- No new behavioral patterns - architectural precision with minimal change

## [7.4.10] - 2025-08-27

### Fixed
- **BUG-039**: Refactored bloated prb-auto-trigger.md from 374 to 128 lines (65.7% reduction)
- **BUG-040**: Refactored bloated enforcement-rules.md from 299 to 96 lines (67.8% reduction)
- Removed all marketing language and 'HYPER-INTELLIGENT' fluff
- Consolidated duplicate patterns and verbose pseudocode
- Preserved ASK vs DEMAND classification for balanced detection

## [7.4.8] - 2025-08-27

### Fixed
- **BUG-032-PRB-004**: Implemented automatic agent invocation system for PRB execution
- Enhanced Task tool integration with proper agent selection
- Completed end-to-end work detection to agent execution workflow

## [7.4.7] - 2025-08-27

### Fixed
- Implemented automatic PRB creation system for work requests
- Enhanced template selection and context embedding automation
- Integrated work detection with seamless PRB generation

## [7.4.6] - 2025-08-27

### Fixed
- Implemented automatic PRB creation system for work requests
- Enhanced template selection and context embedding automation
- Integrated work detection with seamless PRB generation
- Added intelligent work intent recognition with semantic analysis
- Automated complete context gathering and placeholder resolution
- Streamlined work-to-PRB-to-execution pipeline with full automation

## [7.4.5] - 2025-08-27

### Fixed
- Implemented main scope execution blocking patterns
- Enhanced architectural enforcement with mandatory PRB creation
- Added comprehensive blocking mechanisms with clear error guidance
- Strengthened tool access validation requiring active PRB execution context
- Improved error messaging with specific @Role pattern redirection guidance
- Enhanced work intent detection with architectural violation prevention

## [7.4.4] - 2025-08-27

### Fixed
- Enhanced work detection patterns for automatic PRB triggering
- Improved classification between work requests and information queries
- Strengthened behavioral pattern detection accuracy with comprehensive algorithms
- Added advanced work intent classification with context-based decision logic
- Implemented compound pattern detection for mixed work and information requests
- Enhanced @Role pattern classification to distinguish assignments from consultations

## [7.4.3] - 2025-08-27

### Fixed
- Corrected import reference in virtual-team.md from non-existent prb-creation-mandates.md to actual prb-creation-system.md
- Fixed broken behavior import that would prevent proper system initialization

## [7.4.2] - 2025-08-26

### Fixed
- Remove non-existent command references from behavioral patterns
- Replace hardcoded role assignments with dynamic two-factor analysis
- Clean optimization comments from behavioral files

## [7.4.1] - 2025-08-26

### Fixed
- Removed broken imports from consolidation cleanup
- Fixed technical error: PRBs execute via AGENTS (not Task tool)
- Cleaned up references to deleted behavioral pattern files
- Updated import references to point to existing files
- Corrected technical terminology consistency across all behavioral patterns

## [7.3.13] - 2025-01-26

### Added
- Sequential thinking integration for role behavioral patterns
- Complexity recognition patterns that trigger structured thinking
- Ultrathinking integration for optimal approach discovery
- Systematic analysis patterns for @PM, @Architect, and specialist roles
- Reduced user intervention through enhanced upfront thinking
- Structured thinking frameworks for complex decision scenarios
- Automatic complexity assessment that mandates appropriate thinking modes

### Enhanced
- Story breakdown behavior with mandatory structured thinking integration
- Dynamic specialist creation with systematic analysis for optimal decisions
- Role assignment matrix with complexity-based thinking activation
- Main agent role operations with systematic analysis before solution proposals

## [7.3.12] - 2025-08-26

### Added
- PRB adaptation behavioral patterns for user corrections and new information
- Dynamic PRB update mechanisms for real-time context modification
- Error detection patterns that trigger automatic PRB adaptation
- Context propagation ensures updated information reaches execution
- Seamless agent restart patterns with updated context

## [7.3.11] - 2025-01-26

### Fixed
- BUG-027: Implement automatic bug status updates in PRB completion process
- Enhanced behavioral pattern integration for bug lifecycle management

## [7.3.10] - 2025-01-26

### Fixed
- BUG-025: Fixed over-aggressive blocking of direct questions and @Role interactions:
  - Enhanced violation detection to properly distinguish questions from work requests
  - Added question pattern recognition for natural Q&A interactions
  - Updated enforcement rules to prioritize question detection over work indicators
  - Refined error messages to clarify allowed vs blocked operations
  - Enables natural interactions like "@PM what story next?" without PRB requirement
  - Maintains PRB enforcement for actual implementation work

- BUG-026: Comprehensive cleanup of behavioral files to remove bloat and redundancies:
  - Removed 3,377 lines of pseudo-code functions and bash scripts
  - Eliminated hardcoded memory paths and non-existent command references
  - Reduced file sizes by 40-80% while preserving all enforcement capabilities
  - Cleaned 15+ behavioral files including enforcement-rules, validation tools, and integration files
  - Streamlined to directive-based enforcement patterns
  - Improved token efficiency and readability

## [7.3.9] - 2025-08-26

### Fixed
- BUG-020: Complete fix for PRB behavioral violations through three comprehensive PRBs:
  - BUG-020-PRB-001: Strengthened PRB enforcement to prevent direct execution attempts
  - BUG-020-PRB-002: Clarified @Role conversation vs agent deployment patterns
  - BUG-020-PRB-003: Added comprehensive real-time violation detection and auto-correction
- Created violation-detection-patterns.md with universal pre-tool validation
- Enhanced enforcement-rules.md with real-time violation detection functions
- Added tool-specific violation detection for Write, Edit, MultiEdit, and Bash tools
- Implemented work intent vs information request classification system
- Created unmistakable error messages with specific auto-correction guidance
- Added violation pattern tracking in memory/process-violations/ directory
- Enhanced PRB enforcement with immediate blocking before tool execution
- Implemented auto-correction workflows with role suggestion logic

## [7.3.8] - 2025-08-26

### Fixed
- BUG-020-PRB-002: Clarified @Role conversation vs agent deployment patterns
- Added EXECUTION CLARITY section to prb-execution.md with critical distinctions
- Enhanced CLAUDE.md with execution model clarification and clear examples
- Created comprehensive execution flow diagram showing correct vs incorrect patterns
- Documented that @Role in conversation is planning/discussion, not execution
- Clarified that ONLY execution path is: Work Request → PRB Creation → Task Tool → Agent
- Added validation checklist and common misunderstanding corrections
- Enhanced system boundary documentation between main agent and task tool contexts

## [7.3.7] - 2025-08-26

### Fixed
- BUG-020: Strengthened PRB enforcement to prevent direct execution attempts
- Added IMMEDIATE EXECUTION BLOCKING section with pre-execution validation
- Enhanced violation detection patterns for file operations and state modifications  
- Added unmistakable error messages for PRB bypass attempts
- Implemented comprehensive monitoring scope for all tool usage
- Added information vs work classification with clear examples
- Enhanced common violation scenarios with specific corrections
- Strengthened real-time interception with universal request processing

## [7.3.6] - 2025-08-26

### Fixed
- BUG-019: Enhanced agent behavioral patterns to enforce template documentation requirements
- Agents now MUST execute version bumps, CHANGELOG updates, and README updates per template
- Added blocking mechanisms for agents that skip documentation compliance

## [7.3.5] - 2025-08-26

### Fixed
- Integrated template system with CLAUDE.md project context loading
- All PRB templates now include complete project boundaries and behavioral constraints
- Template enforcement validates project context completeness
- Added project context fields (project_overview, work_location, key_context, system_features) to nano and mega templates
- Enhanced template loading process to parse CLAUDE.md for context integration
- Complete template system integration ensuring proper system boundaries across all complexity levels

## [7.3.4] - 2025-08-26

### Enhanced
- PRB templates now include project overview and work location context
- Context validation enforces project scope boundaries
- Added system features embedding to complete_context sections
- Enhanced project boundary validation with comprehensive scope checking
- Updated PRB auto-trigger to require project context fields
- Added project scope violation detection and blocking

## [7.3.3] - 2025-08-26

### Fixed
- Enhanced PRB creation to parse and embed CLAUDE.md project context
- Fixed missing system scope in PRB context loading
- Added project overview extraction to template resolution process
- Implemented work location constraints parsing from CLAUDE.md
- Added key implementation notes extraction for better PRB context
- Enhanced context validation to require CLAUDE.md project overview
- Updated placeholder resolution to include project context parsing
- Added validation for project boundaries and work guidelines

## [7.3.2] - 2025-08-26

### Fixed
- Added mandatory validation enforcement to PRB templates (nano, tiny, medium)
- Added validation enforcement to large and mega PRB templates
- Blocked bypass patterns like 'No git operations needed' and 'Skip validation'
- Enforced SME review requirements across all template complexity levels
- Implemented complex workflow validation with comprehensive blocking requirements
- Added sub-PRB coordination validation for large templates
- Added architectural board review enforcement for mega templates
- Added comprehensive error messages for validation violations
- Strengthened git workflow compliance and documentation requirements
- Completed BUG-022 validation gap fixes across all template complexity levels

## [7.3.1] - 2025-08-26

### Fixed
- Ansible callback plugin compatibility on Debian systems
- Changed ansible.cfg stdout_callback from 'yaml' to 'default' for cross-platform compatibility
- Resolved SafeRepresenter AttributeError on Debian installations

## [7.3.0] - 2025-08-26

### Added
- **PM Agent**: Complete PM agent implementation for 14-agent virtual team
- New file: src/agents/pm.md with comprehensive project management capabilities
- PM agent enables Task tool deployment for @PM behavioral patterns
- Story breakdown, work delegation, and team coordination functionality
- Updated agents README.md to reflect complete 14-agent framework

### Changed
- Minor version bump (7.2 → 7.3) for new PM agent feature addition
- Virtual team now complete with all 14 specialized agents ready for deployment

## [7.2.2] - 2025-08-25

### Fixed
- **CRITICAL**: Automatic PRB size limit enforcement - PRBs >15 complexity points now automatically broken down
- Changed from manual breakdown errors to automatic decomposition into sub-PRBs
- Added prb-breakdown-patterns.md with multiple breakdown strategies
- Updated prb-auto-trigger.md from SIZE BLOCKING to SIZE BREAKDOWN rule
- Enhanced prb-enforcement.md with Size Validator in multi-layer detection
- Modified story-breakdown.md for automatic @PM size enforcement
- **BUG-021**: Created missing PM agent definition to enable @PM deployment via Task tool

### Added
- New file: src/behaviors/prb-breakdown-patterns.md with comprehensive breakdown logic
- Domain-based, layer-based, feature-based, and epic-based splitting strategies
- Automatic parent-child relationship tracking for sub-PRBs
- Fallback mechanisms for breakdown failures
- **New Agent**: src/agents/pm.md with project management and coordination capabilities
- PM agent includes story breakdown, work delegation, and team coordination expertise
- Updated agents README.md to reflect 14 core agents (was 13)

## [7.2.1] - 2025-08-21

### Changed
- Enhanced @PM behavioral patterns with complete placeholder resolution
- Simplified PRB templates for easier usage
- Improved agent definitions with behavioral focus
- Integrated comprehensive validation tools

## [7.2.0] - 2025-08-21

### Changed
- **MAJOR**: Implemented lean command system - removed 11 redundant commands (79% reduction)
- Retained only 3 essential commands: icc-init-system, icc-get-setting, icc-search-memory
- PRB generation, story management, and specialist creation now fully automatic
- Updated behavior files to reflect automatic command patterns
- Completely rewrote commands-reference.md for lean system documentation
- Updated CLAUDE.md examples to show remaining commands only

### Removed
- icc-breakdown-story.md - Story management now automatic via @PM
- icc-create-prb.md - PRB generation now automatic on work detection
- icc-generate-prb-from-draft.md - Draft processing integrated into auto-generation
- icc-story-status.md - Status tracking integrated into system
- icc-create-dynamic-specialist.md - Specialist creation now automatic (<70% match)
- icc-create-specialist.md - Manual specialist creation deprecated
- icc-analyze-complexity.md - Complexity analysis now automatic
- icc-think-sequential.md - Sequential thinking integrated into specialist behavior
- icc-load-memory.md - Memory loading integrated into search functionality
- icc-store-memory.md - Memory storage now automatic during PRB execution
- icc-rename-work-items.md - Work item management simplified

## [7.1.0] - 2025-08-20

### Changed
- Refactored web-designer agent: reduced from 277 to 95 lines, focused on behavioral patterns
- Refactored requirements-engineer agent: reduced from 450 to 109 lines, focused on behavioral patterns
- Removed all code samples from UX and requirements agent definitions
- Enhanced behavioral focus and consistency across agent definitions

## [7.0.0] - 2025-08-20
>>>>>>> feature/enhance-pm-placeholder-process

### Fixed
- Validated and corrected all documentation examples and commands
- Ensured terminology consistency across all documentation files
- Updated specialist creation policy from "capability matches" to "when technology expertise is needed"
- Added missing commands to commands-reference.md (/icc-create-specialist, /icc-create-dynamic-specialist, /icc-rename-work-items, /icc-think-sequential)
- Removed non-existent commands from documentation (/icc-enable-l3-autonomous, /icc-validate-template-usage, /icc-check-placeholder-resolution)
- Fixed repository URLs throughout documentation (github.com/intelligentcode-ai/intelligent-claude-code.git)
- Fixed capitalization inconsistency in user-guide.md
- Corrected virtual-team-guide.md to properly reflect dynamic specialist creation

## [6.17.1] - 2025-08-11

### Changed
- Standardized PRB template execution processes with consistent base process flows
- Nano template: 4-step process (Knowledge → Implementation → Git Commit → Git Push)
- Tiny template: 7-step process (Knowledge → Implementation → Review → Version → Documentation → Git Commit → Git Push)
- Medium template: 9-step process (Branch → Knowledge → Implementation → Review → Version → Documentation → Git Commit → Git Push → PR)
- Added explicit version bump steps to Tiny and Medium PRB templates
- Documentation step now specifies CHANGELOG as minimum requirement plus additional docs as needed
- Enhanced execution clarity with crystal clear numbered steps and detailed checklists
- Separated git operations into distinct commit and push steps for better process control

## [Unreleased]

## [6.22.0] - 2025-01-22

### Added
- Comprehensive troubleshooting guide with common issues and solutions
- System architecture documentation with component diagrams and interactions
- Enhanced installation guide with verification procedures

## [6.21.1] - 2025-01-22

### Added
- Technical documentation updates for commands, configuration, and PRB system
- Enhanced command reference with agent system integration patterns
- Template validation commands documentation (/icc-validate-template-usage, /icc-check-placeholder-resolution)
- L3 autonomous mode configuration documentation
- Agent system configuration with dynamic specialist creation settings

### Changed
- Updated docs/commands-reference.md with agent communication patterns and template validation
- Enhanced docs/configuration-guide.md with agent system and template resolution configuration
- Refreshed docs/prb-system-guide.md for template enforcement and agent execution
- Improved docs/prb-templates-guide.md with validation requirements and agent integration

## [6.21.0] - 2025-01-13

### Added
- Universal markdown-based behavioral system - removed ALL hardcoded paths and user-specific references
- Standardized PRB template execution processes with consistent flows across all complexity levels
- Pure markdown behavioral descriptions - eliminated all code and pseudo-code from src/

### Changed
- PRB templates now follow standardized 4-9 step execution processes based on complexity
- Nano: 4 steps, Tiny: 7 steps, Medium: 9 steps (with branch creation and PR)
- All behavioral patterns converted to pure markdown instructions
- System is now completely portable and universal

### Fixed
- Removed hardcoded project references that prevented universal deployment
- Eliminated pseudo-code that violated markdown-based system principles
- Removed error forgiveness concept incompatible with PRB-driven execution

## [6.20.0] - 2025-08-12

### Added
- STORY-006: PRB size blocking to prevent creation of PRBs larger than 15 points
- Automatic blocking rule in prb-auto-trigger.md for oversized PRBs
- PM instructions to break down large stories into multiple smaller PRBs
- Clear error message when PRB exceeds 15 point complexity limit

### Changed
- Enhanced story-breakdown.md with PRB size management rules
- Updated PRB creation process to include complexity analysis step
- Added examples for splitting large stories (Authentication, API Integration)

## [6.19.0] - 2025-08-12

### Added
- STORY-001: Complete MCP server integration with error handling and validation
- Comprehensive JSON syntax validation for MCP configurations
- Automatic backup and rollback functionality for settings.json
- Environment variable placeholder resolution with ${VAR} syntax
- Graceful file permission error handling
- Detailed error logging and troubleshooting guidance
- MCP configuration parameter support in Makefile
- Complete troubleshooting documentation for MCP integration
- Integration with main installation playbook for seamless MCP setup

## [6.18.0] - 2025-08-12

### Added
- STORY-004: External memory path configuration support
- Configurable `memory_path` setting for storing memory outside project directory
- Support for relative, absolute, and home directory paths
- Git auto-commit integration when .git exists in memory path
- Comprehensive user guide for external memory configuration
- Configuration guide with complete examples and scenarios
- Security validation to prevent sensitive data storage

### Changed
- Updated memory-operations.md with Memory Base Path Resolution behavioral pattern
- Enhanced configuration-patterns.md with memory_path setting
- Replaced function references with behavioral instructions (MARKDOWN-BASED AI-AGENTIC SYSTEM)

### Documentation
- Added memory configuration section to README.md
- Created detailed user guide with setup scenarios (docs/user-guide.md)
- Created comprehensive configuration guide (docs/configuration-guide.md)

## [6.17.1] - 2025-08-11

### Fixed
- ADHOC-PRB-003: Fixed memory-operations.md behavioral pattern references
- Removed function references from MARKDOWN-BASED AI-AGENTIC SYSTEM
- Changed "ResolveMemoryBasePath()" references to "Memory Base Path Resolution pattern"
- Maintained behavioral pattern integrity throughout memory operations
>>>>>>> origin/main

## [6.9.0] - 2025-08-10

### Fixed
- PRB-005: Fixed critical role assignment errors and contradictions across behavioral patterns
- Removed hardcoded role assignments from role-assignment-matrix.md
- Enforced specialist architect selection over generic engineers
- Eliminated role assignments from story/bug validation
- Aligned all behavioral patterns with dynamic specialist creation
- PRB-007: Removed hardcoded values from behavioral patterns
- Eliminated TTL references and cache management concepts inappropriate for AI instructions
- Replaced fixed configuration values with dynamic configuration loading
- Enhanced system flexibility through configuration-driven approach
- PRB-006: Removed all pseudo-code from markdown behavioral system
- Converted programming constructs to natural language behavioral descriptions
- Replaced function definitions and algorithms with process descriptions
- Ensured AI instruction format consistency across entire system
- Transformed YAML loops and conditionals to behavioral guidance

## [6.15.0] - 2025-08-09

### Fixed
- BUG-013: Implemented two-factor role assignment (project scope + work type)
- Role assignment no longer blindly assigns @AI-Engineer to all AI-AGENTIC work
- Correct specialists now selected based on actual work requirements

### Added
- Two-factor decision matrix for role selection
- Work type detection patterns for intelligent assignment
- Comprehensive role-assignment-matrix.md documentation

### Changed
- PM + Architect collaboration now analyzes both project context and work type
- PRB creation enforces two-factor role selection with rationale
- Auto-correction blocks single-factor assignments

## [6.14.0] - 2025-08-09

### Fixed
- BUG-012: Strengthened memory protection with multi-layer defense
- Added pre-commit hook to block memory files locally
- Enhanced GitHub workflow to run on all branches
- Added PR-specific memory file checks

### Added
- Local git hooks for memory protection (.githooks/pre-commit)
- Comprehensive memory protection documentation
- Multi-layer security approach for memory privacy

### Security
- Memory files now protected at multiple levels
- Clear remediation instructions at each protection layer
- Defense-in-depth implementation for privacy

## [6.13.0] - 2025-08-09

### Fixed
- BUG-009: Removed time estimations from all PRB templates - AI agents execute instantly
- BUG-010: CHANGELOG now updated before PR creation in release workflow
- PRB templates now correctly reflect AI-agentic instant execution model
- Complexity scores now represent instruction sophistication, not time

### Changed
- PRB execution behavior now enforces CHANGELOG update before PR creation
- All PRB templates updated to acknowledge instant AI execution
- Removed meaningless time references from complexity descriptions

## [6.12.1] - 2025-08-09

### Fixed
- BUG-011: Removed hardcoded specialist architects - now created dynamically
- Specialist architects are DISCOVERED based on project needs, not predefined
- System truly generic for ANY project type without assumptions

## [6.12.0] - 2025-08-09

### Fixed
- BUG-007: Init system now shows visual feedback when reloading behaviors and templates
- BUG-008: PM now selects specialist architects based on project domain
- Init system displays project scope from CLAUDE.md or prompts if not found
- Fixed role assignment to match actual project requirements

### Added
- Specialist architect roles (@AI-Architect, @React-Architect, @Database-Architect, etc.)
- Domain detection logic for automatic architect selection
- Project scope prompting in init system when CLAUDE.md lacks context
- Visual reloading indicators for behaviors and templates

## [6.8.3] - 2025-08-09

### Security
- Added SECURITY.md documenting memory file exposure in git history
- Enhanced .gitignore with stronger memory file exclusion patterns
- Added GitHub Action to automatically block PRs containing memory files
- Removed remaining memory files from version control

### Fixed
- Memory files are now properly excluded from version control
- Previous releases (6.8.1, 6.8.2) contained memory files that shouldn't have been included
- No sensitive credentials were exposed, only system learning patterns

## [6.8.2] - 2025-08-09

### Fixed
- BUG-005: Complete naming format enforcement across all behavioral patterns
- Implemented mandatory system date retrieval using `date +%Y-%m-%d`
- Completed naming-enforcement-behavior.md and numbering-service-behavior.md
- Added proper naming instructions to all PRB generation behaviors
- Removed incorrectly tracked memory files from version control

### Improved
- Multi-layer validation prevents naming format violations
- Sequential numbering with comprehensive bash examples
- Clear error messages and auto-correction logic
- System date enforcement (never hardcoded dates)

## [6.8.1] - 2025-01-09

### Fixed
- BUG-001: Enforced strict project scope boundaries to prevent unauthorized ~/.claude access
- Enhanced prb-enforcement.md with comprehensive scope violation detection and blocking
- Added pre-execution scope validation in prb-execution.md with mandatory validation checklist
- Implemented project boundary validation in context-validation.md
- Added Task tool working directory constraints and validation functions
- Created clear error messages and violation blocking mechanisms
- Enhanced monitoring for scope violations with real-time detection

## [6.8.0] - 2025-01-09

### Fixed
- BUG-002: Fixed role selection enforcement to require PM + Architect collaboration
- Added system nature awareness to role assignment validation
- Strengthened behavioral pattern enforcement mechanisms to prevent inappropriate role assignments
- Enhanced prb-creation-mandates.md with mandatory system nature validation
- Added role appropriateness validation to context-validation.md
- Updated prb-enforcement.md with multi-layer system nature checking
- Created comprehensive error messages and auto-correction patterns
- Stored complex enforcement patterns in memory for future reference

## [6.7.1] - 2025-01-09

### Fixed
- BUG-003: Eliminated role assignments from bug/story templates to enforce proper PM+Architect collaboration
- Updated story-breakdown.md to explicitly prevent role assignments in bugs/stories
- Added validation in prb-creation-mandates.md to block role assignments in work items
- Created memory pattern documenting role assignment enforcement in AI-agentic systems

## [6.7.0] - 2025-08-04

### Added
- Dynamic best-practices injection system for PRB generation
- best-practices/ directory structure with organized methodological approaches
- Auto-discovery mechanism that searches best-practices during PRB generation
- Template placeholder replacement with dynamic practice content
- Support for unlimited methodological approaches (GitOps, DevSecOps, TDD, Clean Architecture, etc.)
- Integration with existing PRB generation pipeline
- Shared patterns for best-practices integration
- Project scope enforcement to prevent work outside current project directory

## [6.5.2] - 2025-08-04

### Added
- PRB context discipline enforcement to prevent scope creep during PRB execution
- Strict context adherence rules for maintaining PRB focus
- Issue discovery and deferral process for critical issues found during execution
- Context switching rules with clear allowed/forbidden patterns
- Violation detection and auto-correction mechanisms

### Enhanced
- PRB enforcement behavior with comprehensive context discipline controls

## [6.5.1] - 2025-08-04

### Added
- Systematic end-to-end PRB validation process
- Comprehensive project search validation
- Evidence-based deliverable verification system
- Documentation completeness validation with scoring
- Validation evidence collection and audit trails

### Enhanced
- PRB execution behavior with mandatory systematic validation
- Completion enforcement mechanisms with evidence requirements
- Quality gate enforcement with comprehensive checks

## [6.5.0] - 2025-08-04

### Removed
- Obsolete badges and role scoring system (P:X.X, Q:X.X)
- Badge-based gamification from virtual team system
- Scoring bonuses from learning behaviors

### Added
- Clean professional progress reporting system
- Simple completion tracking focused on delivery

### Changed
- Virtual team system focuses on reliable execution over gamification
- Learning system emphasizes memory patterns over scoring
- Progress reporting uses clear completion states

## [6.4.2] - 2025-08-04

### Fixed
- Added Task tool enforcement to @Role detection patterns
- All @Role mentions now require Task tool invocation
- Added clear error messages for missing Task tool usage

### Enhanced
- prb-enforcement.md with Task tool requirement and multi-layer detection
- prb-auto-trigger.md with Task tool wrapper for @Role mentions

## [6.4.0] - 2025-08-03

### Added
- Complete documentation_management section to ALL PRB templates
- GitHub release creation in git_operations for Medium/Large/Mega templates
- README.md update requirements when changes affect user documentation
- Systematic version bump guidance across all complexity tiers
- Post-execution documentation validation checklists

### Enhanced
- git_operations sections with comprehensive changelog requirements
- Template consistency across all complexity levels
- Software delivery lifecycle integration in templates

### Fixed
- CRITICAL: Every PRB execution was incomplete due to missing documentation requirements
- Missing version_bump sections in Large and Mega templates
- Inconsistent documentation management across templates

## [6.3.1] - 2025-08-03

### Added
- Version bump configuration to nano, large, and mega PRB templates
- Memory-first enforcement in /icc-create-prb command

### Fixed
- Applied remaining changes from unmerged PRBs that were executed but not properly merged
- Ensured all PRB templates have consistent version management configuration

## [6.3.0] - 2025-08-03

### Added
- Memory-first enforcement in PRB generation - MANDATORY memory search before creating PRBs
- Git push operation added to mandatory PRB execution checklist
- PRB completion enforcement to prevent false completion claims
- Settings compliance verification in PRB execution
- Role assignment enforcement requiring PM + Architect collaboration
- Learning capture for all critical fixes

### Fixed
- **CRITICAL**: PRBs were being created on feature branches but not pushed to remote
- **CRITICAL**: System falsely claiming PRB completion without executing all steps
- **CRITICAL**: Settings (like git_privacy) were being ignored during PRB execution
- **CRITICAL**: Memory path violations - system was using date-based paths instead of topic-based
- **CRITICAL**: Role assignments were bypassing mandatory PM + Architect collaboration
- **CRITICAL**: PRBs missing complete context and embedded learnings
- **CRITICAL**: Lifecycle management not moving completed PRBs properly

### Changed
- PRB execution now includes mandatory git push after commits
- PRB templates updated with enforcement reminders and checklists
- Memory system enforces topic-based structure: memory/[topic]/[subtopic].md
- All behavioral patterns updated for memory-first pattern
- Documentation files must use lowercase naming (not UPPERCASE)

## [6.1.0] - 2025-08-03

### Added
- Story management system - users can write natural language stories in `stories/` directory
- `/icc-breakdown-story` command - @PM and architect collaborate to convert stories to PRBs  
- `/icc-story-status` command - track story progress and PRB completion
- Configurable directory structure behavior with defaults and overrides
- Proper slash command parameter syntax for all commands

### Changed
- Updated all commands to use proper `<required> [optional]` parameter syntax
- Enhanced virtual-team.md to import story-breakdown and directory-structure behaviors
- Commands now show proper usage examples with parameters

### Fixed
- Commands now properly parse arguments using $ARGUMENTS
- Story and PRB paths respect configured directory structure
- Documentation updated to reflect 12 commands (was 10)

## [5.5.0] - 2025-01-18

### MAJOR RELEASE: Performance Optimization & Installation Simplification

**CRITICAL FIX**: Resolved 40KB+ file performance issues by converting pseudo-code to concise behavioral commands. Installation now always updates to latest files.

### Changed - Complete System Optimization
- **Behavioral Files Reduced**: From 36KB+ pseudo-code to 4.2KB precise commands
- **Installation Simplified**: Removed confusing update/install distinction - `make install` now always deploys latest
- **Force Update Default**: All files now use `force: yes` to ensure latest versions deployed
- **Command Structure**: All behavioral files use SHORT, PRECISE COMMANDS with meaningful headlines

### Fixed
- **Performance Issue**: Files over 40KB causing system slowdowns completely eliminated
- **Installation Confusion**: Users no longer stuck with old files when running `make install`
- **Version Stagnation**: Proper version bumping resumed (5.4.0 → 5.5.0)

### Removed
- **make update command**: No longer needed - `make install` handles everything
- **Update mode logic**: Simplified installation by removing conditional update paths
- **Excessive pseudo-code**: All behavioral patterns converted to concise commands

## [5.4.0] - 2025-07-17

### Added - Self-Correcting Validation System

#### Command-Based Enforcement
- **ValidationInterceptor**: Core self-correcting logic in lean-workflow-executor.md
- **/icc-enforce-validation**: Command that activates real-time enforcement hooks
- **/icc-test-enforcement**: Test command demonstrating validation working
- **Integration with /icc-load**: Automatic enforcement activation
- **Documentation**: Comprehensive guide at docs/SELF-CORRECTING-VALIDATION.md

#### Auto-Correction Features
- **Work Type Detection**: Automatically identifies ai_agentic, infrastructure, security work
- **Role Assignment Correction**: Auto-corrects to specialists with >70% capability match
- **Git Privacy Enforcement**: Auto-strips AI mentions when git_privacy enabled
- **Architect Consultation**: Auto-activates specialist architects when missing
- **L3 Acceleration**: Validation executes without stopping autonomous flow

### Fixed
- **BUG-059**: Validation chains now self-correct instead of being bypassed
- Command-based hooks enable real enforcement in markdown systems
- L3 autonomy accelerates validation rather than bypassing it

### Changed
- /icc-load now automatically executes /icc-enforce-validation
- All role assignments validated through proper specialist architect
- Git operations automatically enforce privacy settings

## [5.3.0] - 2025-07-14

### MAJOR RELEASE: Behavioral Activation Protocol Implementation

**BREAKTHROUGH**: Transformed from passive behavioral documentation to active runtime protocol enforcement with comprehensive pseudo-code implementation across all team behaviors.

### Added - Behavioral Activation Protocols

#### Core Session Protocols
- **SESSION STARTUP PROTOCOL**: Automatic system activation on first message with capability detection
- **BEHAVIORAL MEMORY ACTIVATION**: Auto-load behavioral patterns from memory bank before any action
- **RUNTIME CAPABILITY DETECTION**: Dynamic tool availability assessment with graceful fallback chains
- **CONTINUOUS MONITORING LOOPS**: 100ms behavioral compliance monitoring with real-time auto-correction
- **ACTIVE ENFORCEMENT ENGINE**: Pseudo-code patterns for immediate violation detection and penalty application

#### Mandatory PM-Architect Partnership Enforcement
- **STRATEGIC CONSULTATION PROTOCOL**: Auto-trigger consultation for architecture, technology, and security decisions
- **COLLABORATIVE DECISION ENFORCEMENT**: Block solo architecture decisions with P:-3.0 penalty
- **JOINT ANALYSIS REQUIREMENTS**: Mandatory PM strategic view + Architect technical input synthesis
- **CONSULTATION BLOCKING**: Execution halted until collaboration completed with evidence documentation
- **PARTNERSHIP VALIDATION**: Real-time validation of consultation patterns with memory storage

#### Active Memory-First Cultural Enforcement
- **MEMORY CONSULTATION BLOCKING**: HALT all actions until memory search completed (P:-1.0 penalty bypass)
- **AUTOMATIC MEMORY INTEGRATION**: Pre-action memory search with context loading and pattern application
- **LEARNING APPLICATION DETECTION**: Automatic bonus scoring (+0.5P/Q) for applying previous learnings
- **MEMORY ENTITY CREATION**: Automated storage of decisions, learnings, and patterns during execution
- **CROSS-ROLE KNOWLEDGE SHARING**: Active memory propagation across team roles for collective intelligence

#### Advanced Specialist Creation Automation
- **CAPABILITY MATCH AUTOMATION**: Continuous assessment with <70% match triggering specialist creation
- **DYNAMIC CONTEXT7 INTEGRATION**: Real-time knowledge injection for unlimited specialist domains
- **AI-WORK DETECTION ENFORCEMENT**: Mandatory AI-specialist + Architect consultation for behavioral work
- **ULTRA-EXPERIENCED ACTIVATION**: All specialists activated with 10+ years expertise behavioral patterns
- **SPECIALIST LIFECYCLE MANAGEMENT**: Creation, activation, knowledge transfer, and integration protocols

#### Comprehensive Quality Gate Automation
- **BLOCKING QUALITY ENFORCEMENT**: Prevent completion until ALL quality criteria met (Q:-2.0 bypass penalty)
- **AUTO-CORRECTION WORKFLOWS**: Failed gates trigger automatic specialist delegation and re-validation
- **MULTI-DIMENSIONAL VALIDATION**: Code, architecture, security, documentation, and integration checks
- **PROGRESSIVE QUALITY ASSURANCE**: Staged validation with dependency mapping and critical path analysis
- **EVIDENCE-BASED COMPLETION**: All completions require documented evidence and peer validation

### Enhanced - Behavioral Framework Architecture

#### Pseudo-Code Implementation Patterns
- **BEHAVIORAL FUNCTION LIBRARIES**: Structured pseudo-code patterns for direct implementation
- **DECISION LOGIC FRAMEWORKS**: Explicit conditional flows for behavioral responses
- **MONITORING SYSTEM ARCHITECTURE**: Continuous behavioral compliance tracking with auto-correction
- **INTEGRATION INTERFACE PATTERNS**: Clear module boundaries with defined behavioral contracts
- **ERROR HANDLING PROTOCOLS**: Comprehensive auto-correction and penalty application systems

#### Command Chain Automation
- **UNIVERSAL CHAIN ENFORCEMENT**: Every role executes mandatory chain patterns (memory→think→execute→gates)
- **AUTO-CHAIN DETECTION**: Context analysis triggers appropriate chain patterns without manual activation
- **PARALLEL EXECUTION COORDINATION**: PM-driven multi-role task delegation with simultaneous execution
- **CHAIN COMPLIANCE MONITORING**: Real-time validation of chain execution with penalty enforcement
- **LEARNING INTEGRATION**: Chain effectiveness tracking with pattern optimization and team improvement

#### Active Disagreement Protocol Enforcement
- **VIOLATION DETECTION AUTOMATION**: Continuous monitoring with mandatory objection patterns
- **DISAGREEMENT ESCALATION WORKFLOWS**: Peer → PM → Architect → User escalation with resolution tracking
- **TEAM SAFETY PROTOCOLS**: Zero-penalty good faith disagreements with learning capture
- **COLLABORATIVE RESOLUTION**: Evidence-based resolution with team learning integration
- **RECOGNITION SYSTEMS**: Successful disagreement rewards (+1.0P/Q) with Kudos eligibility

### Modified Files - Comprehensive Behavioral Transformation

#### Core System Files
- **`src/modes/virtual-team.md`**: Added session startup protocol and behavioral activation directives
- **`src/modes/core-systems.md`**: Enhanced with dual scoring system and real-time performance tracking
- **`src/modes/execution-engine.md`**: Integrated L3 autonomous operation with continuous learning
- **`src/modes/role-framework.md`**: Added unlimited specialist creation with Context7 integration
- **`src/modes/integration-layer.md`**: Enhanced memory bank integration with exponential aging
- **`src/modes/operational-protocols.md`**: Added Git workflow enforcement with security validation

#### Behavioral Intelligence Modules
- **`src/behaviors/runtime-tools.md`**: NEW - Runtime behavioral activation with tool integration
- **`src/behaviors/memory-coordination.md`**: NEW - Memory-first culture enforcement patterns
- **`src/behaviors/command-chains.md`**: NEW - Structured execution patterns with automation
- **`src/behaviors/unified-enforcement.md`**: NEW - Comprehensive penalty and auto-correction system
- **`src/behaviors/team-coordination.md`**: NEW - PM-Architect partnership with parallel execution
- **`src/behaviors/active-disagreement.md`**: NEW - Mandatory violation objection with rewards
- **`src/behaviors/learning-team-automation.md`**: NEW - Error forgiveness with pattern capture

#### Command System Architecture
- **`src/commands.md`**: NEW - Complete command chain system with autonomous triggers
- **Command Chain Patterns**: Memory-first→Sequential-thinking→Parallel-delegate→Quality-gates
- **Universal Commands**: icc:memorize, icc:recall, icc:apply-learning, icc:enforce-process
- **System Commands**: icc:init, icc:reset, icc:refresh for operational management
- **Behavioral Commands**: icc:pm-architect-consult, icc:auto-delegate, icc:capability-match

### Technical Implementation Architecture

#### Session Activation Protocol
```pseudocode
FUNCTION sessionStartup():
    detectCapabilities() 
    loadBehavioralPatterns()
    activateEnforcementEngine()
    initializeContinuousMonitoring()
    establishMemoryBankConnections()
END FUNCTION
```

#### Behavioral Enforcement Engine
```pseudocode
FUNCTION enforcementLoop():
    WHILE session_active:
        monitorCompliance()
        detectViolations()
        applyPenalties()
        triggerAutoCorrection()
        capturelearning()
        optimizePerformance()
        sleep(100ms)
END FUNCTION
```

#### Quality Gate Automation
```pseudocode
FUNCTION qualityGateValidation(deliverable):
    completenessCheck()
    qualityStandardsValidation()
    securityReview()
    peerReviewVerification()
    IF violations: triggerAutoCorrection()
    ELSE: approveCompletion()
END FUNCTION
```

### Behavioral Compliance Features

#### Real-Time Monitoring
- **Continuous Compliance Tracking**: 100ms monitoring loops with immediate violation detection
- **Behavioral Pattern Recognition**: Learning from team interactions with pattern optimization
- **Performance Analytics**: Real-time scoring with trend analysis and improvement recommendations
- **Auto-Correction Workflows**: Immediate remediation with specialist delegation and re-validation
- **Team Coordination Optimization**: Dynamic role assignment with capability matching and parallel execution

#### Learning and Adaptation
- **First Error Forgiveness**: No penalty with learning capture for new error types
- **Repeated Error Penalties**: Double penalty for identical errors after learning documented
- **Success Pattern Replication**: Automatic pattern capture with team sharing and optimization
- **Retrospective Automation**: Continuous learning extraction with memory integration
- **Cross-Role Knowledge Transfer**: Active sharing of insights and best practices across team

### Quality Assurance and Validation

#### Architectural Review Compliance
- **Peer Review Protocol**: All behavioral changes reviewed by domain experts
- **Evidence-Based Validation**: Comprehensive testing with documented outcomes
- **Git Workflow Enforcement**: Professional branching, commit standards, and merge requirements
- **Security Validation**: Automated credential scanning with violation blocking
- **Documentation Compliance**: Real-time updates with evidence-based reporting

#### System Integration Testing
- **Tool Fallback Validation**: Context7 → Brave Search → Built-in knowledge cascade testing
- **Memory System Integration**: MCP Memory primary with file-based fallback validation
- **Command Chain Execution**: Full chain compliance testing with penalty enforcement
- **Role Specialization Testing**: Dynamic specialist creation with capability matching validation
- **Quality Gate Enforcement**: Comprehensive blocking and auto-correction validation

### Performance Impact

#### System Optimization
- **Behavioral Efficiency**: 40% reduction in system size while adding comprehensive behavioral intelligence
- **Response Time Improvement**: Active patterns reduce decision latency with pre-loaded behavioral frameworks
- **Memory Utilization**: Exponential aging algorithm (λ=0.1) optimizes knowledge retention
- **Parallel Execution**: Multi-role coordination increases throughput with simultaneous task execution
- **Learning Acceleration**: Active pattern capture accelerates team capability development

#### Capability Enhancement
- **Unlimited Specialist Creation**: Any technology domain with Context7 knowledge injection
- **Strategic Analysis Depth**: PM-Architect partnership ensures comprehensive decision-making
- **Quality Assurance Automation**: Blocking gates prevent quality shortcuts with auto-correction
- **Memory-Driven Intelligence**: Continuous learning application with pattern recognition
- **Professional Development Integration**: Git workflow enforcement with security validation

### Breaking Changes

#### Behavioral Transformation
- **Passive to Active**: All behavioral documentation now includes runtime enforcement patterns
- **Manual to Automatic**: Role activation, memory consultation, and quality validation now automated
- **Individual to Team**: All behaviors now optimized for team coordination and collaboration
- **Reactive to Proactive**: Violation prevention through continuous monitoring and auto-correction
- **Documentation to Implementation**: Pseudo-code patterns enable direct implementation

#### Integration Requirements
- **Session Startup**: Systems must call session activation protocol on initialization
- **Memory Integration**: All actions require memory consultation with automated enforcement
- **Quality Gates**: All completions must pass comprehensive validation before proceeding
- **Behavioral Compliance**: Continuous monitoring required with penalty and auto-correction systems
- **Team Coordination**: Multi-role work requires PM coordination with parallel execution frameworks

This release represents the most significant behavioral advancement, transforming the virtual team from documented guidance to active behavioral intelligence with comprehensive runtime enforcement, continuous learning, and team coordination optimization.

### Changed
- Major consolidation to reduce system size from 268KB to 160KB (40% reduction)
- Consolidated 3 enforcement files into unified-enforcement.md (1,318 → 172 lines)
- Consolidated 3 coordination files into team-coordination.md (404 → 104 lines)
- Consolidated 2 role files into role-optimization.md (374 → 91 lines)
- Updated virtual-team.md imports to reflect consolidated structure
- Standardized all commands to use 'icc:' prefix for consistency (naming convention change only - no functional changes)
  - Updated all documentation files to reflect icc: prefix
  - Maintained backward compatibility notes where appropriate

### Removed
- Removed obsolete directories: tests/, examples/, progress/, research/, review-reports/
- Removed empty directories: docs/reviews/, src/templates/
- Removed redundant .claude/ directory from project root
- Eliminated scattered enforcement logic across multiple files

### Improved
- Single source of truth for penalties, enforcement, and coordination
- Clearer module boundaries and reduced import complexity
- Maintained 100% functionality with better maintainability
- Reduced from 23 to 20 core system files

## [5.2.0] - 2025-07-12

### Added
- **System Commands**: /icc:init, /icc:reset, /icc:refresh for system management
- **Continuous Operation**: L2/L3 autonomy with self-correction instead of halts
- **PM-Architect Consultation**: Mandatory equal-partner consultation enforcement
- **Task Tool Enforcement**: Complex work requires Task tool delegation
- **Sequential Thinking Enforcement**: Complex decisions require thinking chains
- **Command Prefix**: All commands use icc: prefix for clarity
- **CLAUDE.md Improvements**: Practical developer guide with troubleshooting

### Changed
- **L2/L3 Behavior**: Replace HALT/STOP with continuous correction
- **Command Chains**: Integrated /icc: prefix throughout system
- **Behavioral Triggers**: Maximum strength autonomous enforcement
- **Memory Patterns**: Simplified format for easy recall

### Fixed
- **Scope Violations**: All work confined to project repository
- **Process Compliance**: Proper review and documentation workflows
- **Role Assignment**: AI-specialists for AI-agentic work
- **Continuous Operation**: No stops for L2/L3 autonomy

## [5.1.0] - 2025-07-12

### Added
- **Mandatory Behavioral Enforcement**: Replace all descriptive language with forcing directives
- **HALT/BLOCK Patterns**: Operations stop until requirements met with automatic penalties
- **YOU MUST Directives**: All behaviors now use mandatory language throughout
- **Automatic Penalty System**: -1.0 to -3.0 penalties instantly applied for violations
- **Forced Memory Consultation**: HALT UNTIL COMPLETE before any action
- **Mandatory Sequential Thinking**: BLOCK CONTINUATION for complex tasks
- **Research Tool Enforcement**: Context7→Brave→Built-in flow with penalties for skipping
- **Role Specialization Forcing**: <70% match HALTS until specialist created
- **Graceful Tool Degradation**: Fallback mechanisms when MCP tools unavailable

### Changed
- **Command Chains**: Now FORCE behaviors instead of suggesting them
- **Memory Integration**: Blocks operations until consultation complete
- **Quality Gates**: Prevent ANY bypass attempts with severe penalties
- **Role Framework**: All specialists MUST be ultra-experienced (10+ years)
- **Enforcement Engine**: Executable JavaScript logic replaces pseudo-code
- **Integration Layer**: Research tools have mandatory usage order
- **Active Behaviors**: All use directive language with NO EXCEPTIONS

### Fixed
- **Behavioral Degradation**: Forcing language survives context compaction
- **Memory Skip Issues**: Now impossible to bypass memory consultation
- **Sequential Thinking Loss**: Forced for ALL complex tasks
- **Role Confusion**: AI-agentic tasks MUST use AI-specialists
- **Quality Shortcuts**: Blocking gates prevent any bypass
- **Optional Behaviors**: Everything now mandatory with enforcement

## [5.0.0] - 2025-07-10

### MAJOR RELEASE: Runtime Behavioral Enforcement

**BREAKING CHANGES**: Transformed from documented enforcement to active runtime behaviors

### Added
- **Runtime Execution Bridge**: Config auto-loads before any action with SESSION START protocol
- **Process Workflow Enforcement**: Mandatory Review→Documentation→DoD blocking 
- **Real-Time Learning Application**: +1.0P rewards for self-discovered gaps
- **Sequential Thinking Auto-Trigger**: Complex tasks (>3 steps) automatically invoke thinking tools
- **PM Implementation Blocking**: PM cannot Edit/Write/MultiEdit (-1.0P penalty + auto-delegation)
- **Task Format Validation**: "@Role (P:X, Q:Y): task" format enforced (-0.5P miss)
- **Date Command Automation**: No hardcoded dates, Bash date commands required
- **Self-Violation Detection**: Immediate task creation + learning capture + continuous work
- **Config-First Protocol**: .claude/config.md loads BEFORE anything with 1hr cache
- **Settings Enforcement**: -2.0P penalty for missing config, blocking on violations

### Enhanced
- **L3 Autonomy**: Only 4 valid halt conditions, continuous operation without stops
- **Memory-First Enforcement**: -1.0P penalty for skipped memory consultation
- **Auto-Correction Engine**: Comprehensive violation detection and immediate remediation
- **Tool Fallback Logic**: Context7 → Brave Search → Built-in knowledge cascade
- **Role Replacement**: Automatic at -10P with knowledge transfer protocols

### Fixed
- **ALL 16 BEHAVIORAL EXECUTION GAPS**: Configuration to runtime transformation complete
- **Process Compliance**: Universal enforcement across all roles and workflows
- **Quality Gate Automation**: Self-correcting loops until 100% completion
- **L3 Stop Violations**: Continuous autonomous operation restored
- **Settings Loading**: Config enforcement during actual execution

### Technical Implementation
- Enhanced execution-engine.md with active enforcement triggers
- Updated runtime-execution.md with pre-execution blocking validators
- Integrated P-tasks systematic approach for gap resolution
- Memory integration for violation tracking and learning capture
- SESSION START protocol ensures config loading before any role activation

### Compliance & Validation
- All implementations peer reviewed by domain experts
- Process workflow enforcement active for all changes
- Evidence-based validation completed with QA-Engineer approval
- L3 autonomous operation protocols fully restored
- DoD enforcement: Review→Documentation→Validation blocking

This major release represents the complete transformation from passive documentation to active runtime behavioral enforcement, making the virtual team system truly autonomous with comprehensive process compliance.

### Critical Fixes (Post-Implementation)
- **Active Behavioral Enforcement**: Replaced passive documentation with active auto-correction triggers
- **Comprehensive Learning System**: Learning from successes, efficiency gains, and quality improvements (not just violations)
- **Generic Memory Patterns**: Improved knowledge retrieval with searchable pattern categories
- **Auto-Role Reassignment**: Automatic correction of wrong role assignments with learning capture
- **Continuous L3 Operation**: Uninterrupted autonomous execution with pattern recognition

This release ensures true runtime behavioral enforcement with continuous learning and improvement.

### Planning Mode Implementation  
- **Auto-Trigger**: Enhancement requests automatically activate planning mode
- **Complete Pipeline**: Requirements → Architecture → Epic/Story → Implementation → Test → Validate → Document → Deploy
- **End-to-End Delivery**: Teams deliver complete features autonomously after planning
- **Process Integration**: Full behavioral enforcement with peer review, testing, documentation

Critical fix: Planning mode now auto-activates for enhancement requests and delivers complete features through entire development pipeline.

## [4.4.0] - 2025-07-08

### Added
- **PLANNING SUPPORT**: Interactive planning sessions with PM and Architect
- **BACKLOG MANAGEMENT**: Prioritized work queue with P0-P3 priorities
- **EPIC/STORY/TASK STRUCTURE**: AI-optimized artifacts for team execution
- **AUTONOMOUS PICKUP**: L3 team automatically selects next priority work
- **PLANNING COMMANDS**: @PM plan, plan next, plan review, plan epic
- **300_IMPLEMENTATION**: Dedicated directory for planning artifacts

### Improved
- **DOCUMENTATION**: Added planning support guide and updated command reference
- **L3 INTEGRATION**: Seamless autonomous execution from backlog

## [4.3.1] - 2025-07-08

### Changed
- **README.md**: Complete overhaul - reduced from 443 to 110 lines (75% reduction) for clarity and focus
- **SETTINGS HIERARCHY**: Implemented LOCAL > SYSTEM config hierarchy with proper fallback logic
- **DYNAMIC ROLE DISCOVERY**: Enhanced capability-based role matching to prevent wrong role assignments
- **PROCESS CONTINUATION**: Automatic workflow continuation after peer review to prevent process stopping

### Fixed
- **ROLE ASSIGNMENT**: Fixed systemic issue with wrong roles being assigned for tasks
- **SETTINGS LOADING**: Fixed to check local project config before system config
- **PROCESS FLOW**: Fixed process chain stopping after review phase

### Added
- **USER-ROLE**: Implemented browser automation specialist with Puppeteer MCP integration
- **BROWSER TESTING SPECIALISTS**: Added User-Role, User-Flow-Simulator, Regression-Tester, and Accessibility-Tester dynamic roles
- **PUPPETEER MCP INTEGRATION**: Full integration with mcp__puppeteer-docker__ functions for browser automation
- **VISUAL REGRESSION TESTING**: Screenshot comparison and layout validation capabilities
- **ACCESSIBILITY TESTING**: WCAG compliance validation with keyboard navigation and ARIA verification
- **MEMORY ENTITIES**: Added BrowserTest, TestSelector, and AccessibilityIssue entities for test persistence
- **FALLBACK LOGIC**: Graceful degradation to manual test instructions when Puppeteer unavailable
- **COLLABORATION PATTERNS**: Established handoff protocols with QA-Engineer, Frontend-Tester, Backend-Tester
- **AUTOMATIC PEER REVIEW**: Added browser testing detection and reviewer assignment for test changes
- **PROCESS ENFORCEMENT**: Integrated User-Role into quality gates and enforcement protocols

### Documentation
- **USER-ROLE GUIDE**: Comprehensive guide at docs/user-simulator-guide.md
- **DEMO EXAMPLES**: Created examples/user-simulator-demo.md with 8 real-world scenarios
- **README UPDATE**: Added User-Role to the list of dynamic specialists

## [4.2.1] - 2025-07-07

### Changed
- **ROOT DIRECTORY CLEANUP**: Removed unnecessary files from root directory and organized documentation properly
- **FILE ORGANIZATION**: Moved progress files to appropriate directories and removed temporary files

## [4.2.0] - 2025-07-07

### Added
- **FILE OPTIMIZATION SYSTEM**: Comprehensive token reduction across core enforcement files
- **ACTIVE MEMORY MANAGEMENT**: Mandatory memory usage behavior with penalty enforcement
- **ACTIVE ROLE SPECIALIZATION**: Automatic optimal specialist switching and creation
- **ACTIVE DISAGREEMENT SYSTEM**: Mandatory violation objection with reward incentives

### Changed
- **TOKEN EFFICIENCY**: Achieved 37%+ reduction in process-enforcement.md and team-config.md file sizes
- **AUTO-ASSIGNMENTS**: Enhanced with domain specifications for improved auto-detection accuracy
- **WORKFLOW PROTOCOLS**: Streamlined operational triggers while preserving full functionality
- **ENFORCEMENT ARCHITECTURE**: Maintained all HALT conditions and penalty systems through optimization

### Enhanced
- **ARCHITECTURAL REVIEW PROCESS**: Mandatory peer review for all optimization work
- **FUNCTIONALITY PRESERVATION**: 100% system capability maintained through comprehensive QA validation
- **PROCESS COMPLIANCE**: Enhanced enforcement of peer review and Git workflow requirements

## [4.1.0] - 2025-07-07

### Added
- **PENALTY-BASED ENFORCEMENT**: Implemented professionalism score penalties for task format violations
- **MANDATORY ARCHITECT CONSULTATION**: Added requirement for architect involvement in penalty system design
- **SETTINGS ENFORCEMENT PROTOCOL**: Documented the protocol for handling misconfigured PM settings

### Changed
- **ENFORCEMENT MECHANISM**: Replaced HALT mechanism with -1.0 P score penalty for protocol violations
- **PENALTY AMOUNTS**: Updated penalty values to standardized amounts (-1.0 P score per violation)
- **VIOLATION HANDLING**: Shifted from blocking behavior to penalty-based continuous operation

### Enhanced
- **TASK FORMAT COMPLIANCE**: Strengthened enforcement through penalty system
- **PROTOCOL ADHERENCE**: Improved compliance through score-based consequences
- **TEAM ACCOUNTABILITY**: Enhanced accountability with tangible performance impacts

## [4.0.0] - 2025-07-07

### Added
- **DUAL SCORING SYSTEM**: Comprehensive performance tracking with Professionalism + Quality scores
- **PROFESSIONALISM SCORING**: Tracks communication quality, protocol adherence, and team collaboration
- **QUALITY SCORING**: Measures technical excellence, thoroughness, and deliverable completeness
- **REAL-TIME LEARNING CALLOUTS**: Automatic score adjustment feedback for continuous improvement
- **MEMORY INTEGRATION**: Persistent score tracking and performance history across sessions
- **AUTOMATIC TEAM REPLACEMENT**: Performance-based role replacement when scores drop below thresholds
- **PERFORMANCE TRACKING**: Individual role performance monitoring with trend analysis
- **SCORE-BASED ROLE EVOLUTION**: Dynamic role advancement based on sustained high performance
- **TRANSPARENT SCORING**: All roles display current scores in every interaction
- **LEARNING FEEDBACK LOOPS**: Automatic callouts for score improvements and corrections
- **PERFORMANCE ANALYTICS**: Comprehensive tracking of team member effectiveness
- **QUALITY GATE INTEGRATION**: Scoring system integrated with existing quality enforcement
- **ROLE ACCOUNTABILITY**: Clear performance metrics tied to specific role responsibilities
- **CONTINUOUS IMPROVEMENT**: Self-correcting score adjustments based on performance evidence

### Changed
- **ALL ROLE INTERACTIONS**: Now include mandatory score display format `@Role (P: Xpts, Q: Ypts - State)`
- **TEAM COORDINATION**: Enhanced with performance-based role selection and replacement
- **QUALITY ENFORCEMENT**: Integrated with dual scoring for comprehensive performance management
- **MEMORY SYSTEM**: Extended to capture and track performance metrics across sessions
- **ROLE DELEGATION**: PM now considers performance scores when assigning tasks
- **WORKFLOW PROGRESSION**: Score-based advancement with automatic quality checks
- **FEEDBACK MECHANISMS**: Real-time learning callouts integrated into all role interactions
- **PERFORMANCE STANDARDS**: Clear thresholds established for role effectiveness
- **TEAM DYNAMICS**: Performance-driven collaboration with transparency requirements
- **AUTONOMOUS OPERATIONS**: Enhanced with score-based decision making and role optimization

### Enhanced
- **VIRTUAL TEAM EFFECTIVENESS**: Dual scoring ensures consistent high-quality performance
- **PROFESSIONAL COMMUNICATION**: Standardized score-based interaction protocols
- **QUALITY ASSURANCE**: Comprehensive tracking of technical excellence and completeness
- **TEAM ACCOUNTABILITY**: Clear performance metrics for all team members
- **CONTINUOUS LEARNING**: Automatic feedback and improvement mechanisms
- **PERFORMANCE TRANSPARENCY**: All stakeholders can see real-time team performance
- **ROLE OPTIMIZATION**: Data-driven team composition and role assignment
- **WORKFLOW EFFICIENCY**: Score-based process optimization and improvement

### Technical Implementation
- **SCORE CALCULATION**: Automated scoring algorithms for professionalism and quality metrics
- **MEMORY PERSISTENCE**: Long-term storage of performance data and trends
- **REPLACEMENT LOGIC**: Automatic role replacement based on performance thresholds
- **LEARNING ALGORITHMS**: Adaptive scoring based on performance patterns and feedback
- **INTEGRATION POINTS**: Seamless integration with existing enforcement and quality systems
- **ANALYTICS ENGINE**: Comprehensive performance tracking and trend analysis
- **FEEDBACK SYSTEMS**: Real-time callouts and improvement suggestions
- **THRESHOLD MANAGEMENT**: Dynamic adjustment of performance standards and expectations

## [2.16.0] - 2025-07-05

### Added
- **LEVEL 3 AUTONOMOUS OPERATION SYSTEM**: Complete technical autonomy with strategic business escalation
- **AUTONOMOUS DECISION BOUNDARIES**: PM makes independent technical decisions without user intervention
- **AUTONOMOUS TECHNICAL DECISIONS**: Architecture, implementation, infrastructure, security, performance, quality, tool selection
- **STRATEGIC BUSINESS ESCALATION**: User escalation only for business impact, budget, timeline, stakeholder, policy decisions
- **AUTONOMOUS QUALITY GATES**: Non-blocking self-correcting quality assurance system
- **AUTONOMOUS WORKFLOW PROGRESSION**: Continuous advancement through self-correcting quality loops
- **AUTONOMOUS PEER REVIEW ENFORCEMENT**: Automatic domain expert assignment with autonomous validation
- **AUTONOMOUS SCOPE/CONTEXT PROVISION**: Complete information delivery without user intervention
- **LEVEL 3 AUTONOMOUS STATE TRACKING**: Self-monitoring workflow with automatic corrective action
- **AUTONOMOUS QUALITY RESPONSES**: Self-correcting loops with automatic re-delegation until quality achieved

### Changed
- **PM Protocol**: Now operates with complete technical autonomy for all technical decisions
- **Decision Boundaries**: Clear separation between autonomous technical and strategic business decisions
- **Quality Gates**: Transformed from blocking to self-correcting autonomous validation
- **Workflow Progression**: From manual handoffs to autonomous advancement with quality loops
- **Escalation Protocol**: From general escalation to strategic business-only escalation
- **State Management**: From blocking validation to autonomous self-correction
- **Peer Review**: From manual assignment to autonomous domain expert allocation
- **Requirements Engineering**: From manual execution to autonomous first-role execution
- **Architect Enforcement**: From manual system change detection to autonomous technical design

### Fixed
- **PM Decision Paralysis**: PM now makes autonomous technical decisions without asking user
- **Blocking State Management**: Replaced with non-blocking self-correcting autonomous loops
- **Level 3 Configuration Issues**: Proper Level 3 autonomy now works as intended
- **User Intervention Requirements**: Technical decisions now handled autonomously
- **Wait/Continue Inconsistency**: Autonomous progression eliminates blocking behavior
- **State Accumulation Issues**: Self-correcting mechanisms prevent degradation over time
- **Quality Gate Blocking**: Non-blocking autonomous quality assurance prevents workflow stalls
- **Manual Peer Review**: Autonomous domain expert assignment and validation

## [2.15.0] - 2025-07-05

### Added
- **CRITICAL PM Protocol Enforcement**: Mandatory blocking gates preventing process shortcuts
- **GATE 0: Requirements-Engineer Enforcement**: Mandatory for ALL requests - no bypassing allowed
- **GATE 1: Architect Enforcement**: Mandatory for system changes - prevents architectural shortcuts
- **GATE 2: Scope/Context Provision Enforcement**: Complete information required before role delegation
- **GATE 3: Peer Review Enforcement**: Domain expert peer review mandatory for all implementations
- **IMMEDIATE STOP enforcement**: Violations trigger immediate halt, no auto-correction
- **Complete scope/context provision**: All roles receive complete requirements and context
- **Domain expert peer review**: Automatic assignment of appropriate domain experts

### Changed
- **PM protocol**: Now includes 4 mandatory blocking gates with violation detection
- **Workflow sequence**: No conditional bypassing allowed - Requirements-Engineer mandatory for all
- **Role delegation**: Requires complete scope/context before any role assignment
- **Validation process**: Peer review enforcement with domain expert assignment

### Fixed
- **Process integrity**: Eliminated PM shortcuts and protocol violations
- **Requirements bypassing**: Mandatory Requirements-Engineer execution for all requests
- **Architect bypassing**: Mandatory Architect execution for system changes
- **Incomplete scope**: Mandatory complete information provision before delegation
- **Missing peer review**: Mandatory domain expert review before completion

## [2.14.0] - 2025-07-02

### Added
- Comprehensive behavioral enforcement optimization
- Enhanced virtual team coordination
- Template consolidation for intelligent optimization

### Changed
- Optimized behavioral enforcement patterns
- Improved virtual team workflow efficiency
- Consolidated template architecture