# Load Patterns

Force-load and internalize all virtual team behavioral patterns

## Usage
```
/icc-load
```

## Implementation
This command performs comprehensive behavioral pattern loading:

1. **FORCE READ**: Read ~/.claude/modes/virtual-team.md completely
2. **PARSE IMPORTS**: Follow all @import references and load each file
3. **LOAD PATTERNS**: Internalize all behavioral patterns and rules
4. **COMMIT TO COMPLIANCE**: Acknowledge understanding and commit to following
5. **VALIDATE UNDERSTANDING**: Confirm all patterns are loaded and understood

## Expected Output
```
🔄 Force-loading virtual team behavioral patterns...
✅ Reading ~/.claude/modes/virtual-team.md
✅ Parsing imports: 14 behavioral modules found
✅ Loading patterns: lean-workflow-executor.md
✅ Loading patterns: role-assignment-validator.md
✅ Loading patterns: git-privacy-enforcer.md
✅ Loading patterns: learning-team-automation.md
✅ Loading patterns: [all other behavioral modules]
✅ Committing to behavioral compliance
✅ Validating understanding of all patterns

🚀 All behavioral patterns loaded and internalized
Status: COMMITTED TO COMPLIANCE
```

## Auto-Execution Integration
This command is automatically executed by:
- `/icc-init-system` (during initialization)
- `/icc-restore-state` (during state restoration)
- `/icc-verify-behaviors` (during behavior verification)

## Force-Loading Process
1. **Read virtual-team.md**: Force complete read of the file
2. **Follow All Imports**: Parse every @import and load referenced files
3. **Internalize Patterns**: Load all behavioral patterns into active memory
4. **Commit to Compliance**: Explicitly acknowledge understanding and commit to following
5. **Validate**: Confirm all patterns are understood and will be followed
6. **ENFORCE**: Execute /icc-enforce-validation to activate real-time enforcement

## Implementation with Enforcement
```pseudocode
FUNCTION forceLoadBehavioralPatterns():
    output = []
    output.append("🔄 Force-loading virtual team behavioral patterns...")
    
    // STEP 1-3: Load patterns (existing logic)
    loadAllPatterns()
    
    // STEP 4: ACTIVATE ENFORCEMENT (NEW)
    output.append("\n🔐 Activating validation enforcement...")
    enforcement = executeCommand("/icc-enforce-validation")
    output.append(enforcement)
    
    output.append("\n✨ Behavioral patterns loaded and ENFORCED!")
    RETURN output.join("\n")
```

This command ensures Claude Code instances properly load and ENFORCE the complete virtual team behavioral framework with real-time validation.