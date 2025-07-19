# Enforce Validation

Activate real-time validation enforcement using $ARGUMENTS for enforcement level.

## Behavioral Sequence
1. Parse $ARGUMENTS for enforcement options:
   - Enforcement level: strict, normal, advisory (default: normal)
   - Focus areas: roles, git, workflow, all (default: all)
   - Auto-correction: enabled, disabled (default: enabled)
2. Display enforcement activation:
   "🔒 Activating validation enforcement"
   "Level: [strict|normal|advisory]"
   "Areas: [roles|git|workflow|all]"
   "Auto-correction: [enabled|disabled]"
3. Initialize validation monitors:
   
   **Role Assignment Monitor:**
   - Monitor all @role activations and task assignments
   - Validate capability match >70% for all assignments
   - Enforce PM + Specialist Architect approval requirements
   - Block invalid role assignments immediately
   
   **Git Privacy Monitor:**
   - Monitor all git commit messages and PR descriptions
   - Auto-strip AI mentions if git_privacy enabled
   - Enforce branch protection rules
   - Validate commit message standards
   
   **Workflow Compliance Monitor:**
   - Monitor task creation and execution sequence
   - Validate proper phase transitions (DEFINING → PLANNING → EXECUTE)
   - Enforce dependency resolution before task execution
   - Validate acceptance criteria completion
4. Set enforcement rules based on level:
   
   **Strict Enforcement:**
   - HALT execution on any validation failure
   - Require explicit approval for all overrides
   - Log all violations with full context
   - No automatic corrections without confirmation
   
   **Normal Enforcement:**
   - Auto-correct minor violations
   - HALT on major violations (security, data loss)
   - Warn and proceed on advisory violations
   - Log significant violations only
   
   **Advisory Enforcement:**
   - Log all violations but continue execution
   - Provide recommendations for improvements
   - Highlight patterns of repeated violations
   - No blocking behavior
5. Activate monitoring hooks:
   - Pre-action validation: Check before any operation
   - Real-time monitoring: Continuous validation during execution
   - Post-action verification: Validate results and compliance
6. Initialize violation tracking:
   - Create violation log: `~/.claude/violations.log`
   - Track violation patterns and frequencies
   - Monitor role-specific compliance rates
7. Set up auto-correction behaviors:
   
   **Role Assignment Auto-Correction:**
   ```
   Violation: Generic role assigned to specialist work
   Auto-Correction: Reassign to appropriate specialist
   Log: "Auto-corrected: @Developer → @AI-Engineer for AI work"
   ```
   
   **Git Privacy Auto-Correction:**
   ```
   Violation: AI mentions in commit message
   Auto-Correction: Strip mentions and clean message
   Log: "Auto-corrected: Removed AI mentions from commit"
   ```
   
   **Workflow Auto-Correction:**
   ```
   Violation: Task created without proper phase
   Auto-Correction: Update parent phase and dependencies
   Log: "Auto-corrected: Updated story phase to EXECUTE"
   ```
8. Display active enforcement status:
   "✅ Validation enforcement active"
   "Monitors: [X] active rules"
   "Auto-correction: [Y] behaviors enabled"
   "Violation tracking: Started"
9. Start continuous monitoring loop:
   - Monitor system state every 30 seconds
   - Check for new violations or compliance issues
   - Apply auto-corrections as configured
   - Update violation statistics
10. Log enforcement activation in activity tracking

## Error Handling
- Invalid enforcement level: "Error: Enforcement level must be strict, normal, or advisory"
- Invalid focus area: "Error: Focus area must be roles, git, workflow, or all"
- System not initialized: "Error: Virtual team system must be initialized first"
- Monitoring setup failed: "Error: Could not initialize validation monitors: [specific error]"
- Log file creation failed: "Warning: Could not create violation log, using memory tracking"

## Enforcement Behaviors by Level

**Strict Enforcement:**
- Role assignment violations → HALT with error
- Git privacy violations → HALT with correction prompt
- Workflow violations → HALT with guidance
- All violations logged with full stack trace

**Normal Enforcement:**
- Role assignment violations → Auto-correct with warning
- Git privacy violations → Auto-strip with notification
- Workflow violations → Auto-fix minor, HALT major
- Significant violations logged

**Advisory Enforcement:**
- All violations → Log and recommend
- Provide improvement suggestions
- Track patterns for future guidance
- Never block execution

## Validation Rules Enforced

**Role Assignment Validation:**
```
1. Work type detection required for all assignments
2. Capability match >70% mandatory
3. PM + Specialist Architect approval required
4. No generic roles for specialist work
5. Security reviews required for architecture tasks
```

**Git Privacy Validation:**
```
1. Strip AI mentions from all git operations
2. Enforce branch protection rules
3. Validate commit message formats
4. Check for credential exposure
```

**Workflow Validation:**
```
1. Proper phase transitions required
2. Dependencies must be resolved
3. Acceptance criteria completion mandatory
4. Learning capture required for task completion
```

## Command Chaining
- Enforcement remains active until system reset
- Enforcement status affects all subsequent operations
- Violation logs can be exported for analysis
- Real-time monitoring supports continuous improvement