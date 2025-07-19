# Load

Force-load all virtual team behavioral patterns using $ARGUMENTS for load options.

## Behavioral Sequence
1. Parse $ARGUMENTS for load options:
   - --force: Force reload even if already loaded
   - --validate: Validate all imports and patterns
   - --verbose: Show detailed loading progress
   - --modules: Load specific modules only
2. Display loading initiation:
   "🔄 Force-loading virtual team behavioral patterns"
   "Options: [force|validate|verbose|modules]"
3. Read main configuration hierarchy:
   - Load `~/.claude/CLAUDE.md` (master config)
   - Load `~/.claude/config.md` (user settings)
   - Load `./.claude/config.md` (project settings)
   - Merge configuration with priority order
   - Display: "✅ Configuration hierarchy loaded"
4. Follow all import chains:
   - Parse all `@~/` imports in CLAUDE.md
   - Load `modes/virtual-team.md` (core mode)
   - Load `roles/specialists.md` (role definitions)
   - Load `behaviors/*.md` (behavioral modules)
   - Load `workflow-templates/*.yaml` (workflow patterns)
   - Validate all imports resolve correctly
5. Load behavioral modules in sequence:
   
   **Core Workflow:**
   - Load `lean-workflow-executor.md`
   - Internalize assignment-driven execution patterns
   - Activate validation command chains
   
   **Role System:**
   - Load 14 core role definitions
   - Enable dynamic specialist creation
   - Initialize @-notation handling
   
   **Learning System:**
   - Load `learning-team-automation.md`
   - Initialize error forgiveness patterns
   - Enable learning application bonuses
   
   **Memory Integration:**
   - Test MCP Memory connection
   - Load memory search capabilities
   - Initialize knowledge-first patterns
   
   **Scoring System:**
   - Load `badges.md` achievement system
   - Initialize P/Q score tracking
   - Enable automatic score updates

6. Internalize patterns and rules:
   
   **Command Chain Patterns:**
   ```
   icc:memory-first → icc:think-sequential → execute → icc:quality-gates
   icc:detect-work-type → icc:require-triage → icc:validate-assignments
   ```
   
   **Role Assignment Rules:**
   ```
   - >70% capability match required
   - PM + Specialist Architect approval mandatory
   - Dynamic specialist creation for <70% match
   - Security review required for architecture
   ```
   
   **Workflow Enforcement:**
   ```
   - Assignment files drive behavior
   - Validation gates prevent wrong assignments
   - Learning capture required for all tasks
   - Quality peer review by domain experts
   ```

7. Commit to behavioral compliance:
   - Accept all validation requirements
   - Enable mandatory enforcement architecture
   - Activate real-time compliance monitoring
   - Display: "✅ COMMITTED TO BEHAVIORAL COMPLIANCE"
8. Activate validation enforcement:
   - Initialize role assignment validator
   - Enable git privacy enforcement
   - Start workflow compliance monitoring
   - Activate learning application tracking
9. Test system integration:
   - Verify @-notation role switching works
   - Test memory search functionality
   - Validate command chain execution
   - Check tool integrations (Context7, GitHub CLI)
10. Display loading completion status:
    ```
    ✅ Virtual Team Behavioral Patterns Loaded
    
    📁 Modules: [X] loaded, [Y] total
    👥 Roles: 14 core + unlimited dynamic
    🧠 Memory: [Connected|File-based]
    🔒 Validation: Active
    🏆 Scoring: Operational
    ⚙️ Workflows: [X] templates loaded
    
    Status: FULLY OPERATIONAL
    ```
11. Log loading completion and update system state

## Error Handling
- Configuration missing: "Error: Main configuration not found. Run installation first."
- Import resolution failed: "Error: Import chain broken: [specific imports]"
- Module load failed: "Error: Could not load module: [module_name] - [specific error]"
- Memory connection failed: "Warning: Memory system unavailable, using file fallback"
- Validation setup failed: "Error: Could not initialize validation enforcement"
- Role system failed: "Error: Role definitions corrupted or missing"
- Workflow templates missing: "Warning: Workflow templates not found, using defaults"

## Loading Validation

**Import Chain Validation:**
```
Check sequence:
1. CLAUDE.md imports virtual-team.md
2. virtual-team.md imports all behavior modules
3. All behavior modules exist and parse correctly
4. Workflow templates exist and validate
5. No circular imports detected
```

**Module Integration Tests:**
```
Test each module:
- Role activation (@PM, @Developer)
- Memory search functionality  
- Command chain execution
- Validation rule enforcement
- Scoring system updates
```

## Loading Modes

**--force Mode:**
- Reload even if patterns already active
- Clear existing state and reload fresh
- Useful for development and testing

**--validate Mode:**
- Perform comprehensive validation
- Check all imports and dependencies
- Verify behavioral pattern integrity
- Report any issues or inconsistencies

**--verbose Mode:**
- Show detailed loading progress
- Display each module as it loads
- Report validation steps and results
- Useful for debugging load issues

**--modules Mode:**
- Load only specified modules
- Useful for selective pattern updates
- Faster loading for specific changes

## Post-Load Verification

**System Health Check:**
- All imports resolved successfully
- Role switching functional
- Memory system accessible
- Validation enforcement active
- Scoring system operational

**Integration Test:**
- Execute sample role activation
- Perform test memory search
- Validate command chain execution
- Verify tool integrations working

## Command Chaining
- Loading enables all other icc commands
- System must be loaded before role activation
- Loading status affects command availability