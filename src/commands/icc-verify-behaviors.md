# Verify Behaviors

Validate all behavioral patterns are operational using $ARGUMENTS for specific validation focus.

## Behavioral Sequence
1. Parse $ARGUMENTS for validation options:
   - --focus: all, modules, roles, memory, scoring, commands (default: all)
   - --depth: quick, standard, comprehensive (default: standard)
   - --output: summary, detailed, diagnostic (default: summary)
   - --repair: auto, prompt, report-only (default: prompt)
2. Display validation initiation:
   "🔍 Verifying intelligent-claude-code behavioral patterns"
   "Focus: [all|modules|roles|memory|scoring|commands]"
   "Depth: [quick|standard|comprehensive]"
   "Repair: [auto|prompt|report-only]"
3. Initialize validation framework:
   - Create validation workspace
   - Set up diagnostic logging
   - Prepare test scenarios
   - Initialize repair tracking
4. Validate behavioral module loading:
   
   **Module Existence Check:**
   - Verify all required modules exist:
     * `~/.claude/modes/virtual-team.md`
     * `~/.claude/roles/specialists.md`
     * `~/.claude/behaviors/*.md`
     * `~/.claude/workflow-templates/*.yaml`
   - Check file integrity and permissions
   - Validate import chain resolution
   
   **Module Content Validation:**
   - Parse each module for syntax errors
   - Validate YAML front matter
   - Check import references
   - Verify behavioral pattern completeness
   
   **Results:**
   ```
   📁 Module Loading: [PASS|FAIL]
   Found: [X]/[Y] required modules
   Issues: [list of any problems]
   Status: [Operational|Needs Repair|Critical]
   ```

5. Validate role activation capability:
   
   **Core Role Testing:**
   - Test activation of all 14 core roles
   - Verify role switching functionality
   - Check role state preservation
   - Validate role score tracking
   
   **Dynamic Specialist Testing:**
   - Test dynamic specialist creation (@Domain-BaseRole)
   - Verify capability matching algorithm
   - Check specialist assignment validation
   - Test Context7 knowledge injection (if available)
   
   **Role Assignment Validation:**
   - Test work type detection
   - Verify mandatory triage requirements
   - Check PM + Architect approval workflows
   - Validate capability match thresholds
   
   **Results:**
   ```
   👥 Role System: [PASS|FAIL]
   Core Roles: [X]/14 functional
   Dynamic Creation: [Working|Broken]
   Assignment Validation: [Active|Inactive]
   Status: [Operational|Needs Repair|Critical]
   ```

6. Validate workflow engine status:
   
   **Workflow Template Validation:**
   - Check outer-workflow.yaml completeness
   - Validate inner-workflow.yaml structure
   - Test workflow phase transitions
   - Verify validation gate integration
   
   **Command Chain Testing:**
   - Test /icc- prefix command execution
   - Verify command chaining works
   - Check command parameter parsing
   - Validate error handling
   
   **Assignment File Processing:**
   - Test epic.yaml, story.yaml, bug.yaml processing
   - Verify embedded config application
   - Check task generation workflows
   - Validate progress tracking
   
   **Results:**
   ```
   ⚙️ Workflow Engine: [PASS|FAIL]
   Templates: [X]/[Y] valid
   Command Chains: [Working|Broken]
   File Processing: [Active|Inactive]
   Status: [Operational|Needs Repair|Critical]
   ```

7. Validate memory system connection:
   
   **MCP Memory Testing:**
   - Test connection: `mcp__memory__read_graph()`
   - Verify entity creation and retrieval
   - Check search functionality
   - Test relation building
   
   **Learning System Testing:**
   - Test learning entity creation
   - Verify error forgiveness patterns
   - Check learning application bonuses
   - Test pattern recognition
   
   **Knowledge Integration:**
   - Test memory-first patterns
   - Verify knowledge retrieval before actions
   - Check learning storage after tasks
   - Test cross-role knowledge sharing
   
   **Results:**
   ```
   🧠 Memory System: [PASS|FAIL]
   MCP Connection: [Connected|Disconnected|File-based]
   Learning Patterns: [Active|Inactive]
   Knowledge Flow: [Working|Broken]
   Status: [Operational|Needs Repair|Critical]
   ```

8. Validate scoring system functionality:
   
   **Badge System Testing:**
   - Test badges.md loading and parsing
   - Verify achievement tracking
   - Check score calculation accuracy
   - Test bonus application logic
   
   **Score Tracking Validation:**
   - Test P (Process) score updates
   - Verify Q (Quality) score tracking
   - Check penalty application
   - Test score persistence
   
   **Integration Testing:**
   - Test automatic score updates
   - Verify role-specific scoring
   - Check learning application bonuses
   - Test score-based decision making
   
   **Results:**
   ```
   🏆 Scoring System: [PASS|FAIL]
   Badge Tracking: [Active|Inactive]
   Score Updates: [Working|Broken]
   Integration: [Seamless|Issues]
   Status: [Operational|Needs Repair|Critical]
   ```

9. Validate command availability and functionality:
   
   **Command Discovery:**
   - Scan all icc-*.md command files
   - Verify command completeness
   - Check parameter parsing
   - Test error handling
   
   **Core Command Testing:**
   - icc-init-system functionality
   - icc-activate-role operation
   - icc-memory-search capability
   - icc-system-status reporting
   
   **Workflow Command Testing:**
   - icc-create-epic/story/bug operations
   - icc-plan-story/bug functionality
   - icc-detect-work-type operation
   - icc-archive-completed capability
   
   **Results:**
   ```
   💻 Command System: [PASS|FAIL]
   Available: [X]/[Y] commands
   Functional: [A]/[B] tested
   Integration: [Working|Issues]
   Status: [Operational|Needs Repair|Critical]
   ```

10. Compile comprehensive validation report:
    ```
    🔍 Behavioral Pattern Validation Report
    
    Overall Status: [OPERATIONAL|DEGRADED|CRITICAL]
    
    📁 Modules: [PASS|FAIL] - [details]
    👥 Roles: [PASS|FAIL] - [details]
    ⚙️ Workflow: [PASS|FAIL] - [details]
    🧠 Memory: [PASS|FAIL] - [details]
    🏆 Scoring: [PASS|FAIL] - [details]
    💻 Commands: [PASS|FAIL] - [details]
    
    Issues Found: [X]
    Critical: [A], Warning: [B], Info: [C]
    
    Recommendations:
    - [recommendation 1]
    - [recommendation 2]
    ```
11. Execute repair actions (if enabled):
    - Auto-repair minor issues (broken imports, missing files)
    - Prompt for major repairs (module corruption, system conflicts)
    - Report-only for diagnostic mode
    - Log all repair actions taken
12. Display final validation status:
    "✅ Behavioral pattern validation completed"
    "📈 Overall Health: [Excellent|Good|Degraded|Critical]"
    "🔧 Issues: [X] found, [Y] repaired"
    "🎯 Operational: [Z%] of system functional"

## Error Handling
- Validation framework setup failed: "Error: Could not initialize validation framework"
- Module access denied: "Error: Cannot read behavioral modules: [permission issue]"
- Memory system unavailable: "Warning: Memory validation skipped - system unavailable"
- Command execution failed: "Warning: Command [command] failed validation: [specific error]"
- Repair operation failed: "Error: Could not repair [component]: [specific error]"

## Validation Depth Levels

**Quick Validation:**
- Basic existence checks
- Simple functionality tests
- Core system health only
- Fast execution (< 30 seconds)

**Standard Validation:**
- Comprehensive component testing
- Integration verification
- Error condition testing
- Moderate execution (1-2 minutes)

**Comprehensive Validation:**
- Deep system analysis
- Performance testing
- Edge case validation
- Full diagnostic scan (3-5 minutes)

## Health Status Ratings

**Operational (90-100%):**
- All critical systems functional
- Minor issues only
- Full capability available
- No user impact

**Degraded (70-89%):**
- Some non-critical issues
- Reduced functionality
- Workarounds available
- Minor user impact

**Critical (<70%):**
- Major system failures
- Significant functionality lost
- Immediate attention required
- Major user impact

## Repair Capabilities

**Auto-Repair:**
- Fix broken import chains
- Restore missing configuration files
- Repair file permissions
- Reset corrupted settings

**Manual Repair:**
- Module corruption recovery
- System conflict resolution
- Complex configuration issues
- Data integrity problems

## Command Chaining
- Validation results can trigger automatic repairs
- Health status affects system operation modes
- Diagnostic information supports troubleshooting