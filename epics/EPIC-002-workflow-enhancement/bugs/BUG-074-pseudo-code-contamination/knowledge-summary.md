# Behavioral Pattern Knowledge Summary for BUG-074

## What Makes Good Behavioral Text

### Characteristics of Clean Behavioral Documentation
1. **SHORT and PRECISE** - Each behavior described in one concise line
2. **Action-oriented** - Uses active voice with clear verbs (Load, Execute, Validate, Check)
3. **Arrow notation** - Uses → to show flow and transformations
4. **Bullet points** - Uses • to separate sequential actions
5. **Direct references** - References commands and tools without implementation details

### Examples of Clean Behavioral Text
```markdown
**initialize_system():** Load settings → Initialize controllers → IF L3: Enable continuous mode  
**read_assignment():** Parse assignment + Apply embedded config  
**Flow:** detect-work-type → require-triage → validate-assignments → require-approval → create-story  
**Rules:** >70% capability match • PM+Architect triage • Specialist preference • Block invalid assignments
```

### Key Patterns
- **Function descriptions:** `functionName(): action → action → result`
- **Conditional behavior:** `IF condition: action • ELSE: alternative`
- **Lists:** Simple bullet points or markdown lists, no complex data structures
- **References:** Direct command names without parameters or syntax

## Examples of Pseudo-Code Contamination to Avoid

### Major Anti-Patterns Found
1. **CLASS definitions** - No object-oriented structures
2. **FUNCTION blocks** - No implementation code blocks
3. **FOR/WHILE loops** - No procedural logic
4. **Complex IF/ELSE** - No nested conditional blocks
5. **Data structures** - No dictionaries, arrays, or complex types in code format
6. **Variable assignments** - No `variable = value` statements
7. **Method calls** - No `object.method()` syntax

### Contamination Examples
```pseudocode
# BAD - Pseudo-code contamination:
CLASS RoleAssignmentValidator:
    FUNCTION validateAssignment(task, role):
        workType = detectWorkType(task)
        IF capMatch < 0.7:
            result.valid = false
        RETURN result

# BAD - Implementation details:
FOR task IN tasks:
    validation = validateAssignment(task, task.assigned_to)
    IF NOT validation.valid:
        RETURN {valid: false}
```

## Command Reference Patterns

### Proper Command Integration
1. **Name commands directly** - Use command name without implementation
2. **Describe behavior** - What the command does, not how
3. **List in flow** - Show where commands fit in behavioral sequence
4. **No parameters** - Avoid showing command syntax or parameters

### Good Examples
```markdown
**Validation Chain:** icc:detect-work-type → icc:require-triage → icc:validate-assignments
**Memory Operations:** Search before work → Apply learnings → Capture after work
**Tools:** Read (files) • Write (updates) • Task (PM delegation) • Memory (knowledge)
```

## Guidelines for Cleanup Effort

### Conversion Strategy
1. **Replace CLASS/FUNCTION blocks** with behavioral descriptions
2. **Convert loops** to simple action descriptions
3. **Simplify conditionals** to IF/ELSE one-liners
4. **Remove variables** and replace with flow descriptions
5. **Extract data** to YAML examples or simple lists

### Target Format
- **Headers:** Clear section organization
- **Bold labels:** **concept:** description format
- **Flow arrows:** → for sequences
- **Bullets:** • for parallel or grouped items
- **Examples:** YAML format for data, not code blocks

### Validation Criteria
1. **No code blocks** except YAML examples
2. **No programming constructs** (classes, functions, loops)
3. **Action-oriented language** throughout
4. **Clear behavioral descriptions** without implementation
5. **Command references** without syntax details

### Files Requiring Cleanup
Based on pattern analysis, focus on:
- `role-assignment-validator.md` - Heavy pseudo-code contamination
- `l3-continuous-engine.md` - Contains implementation details
- `task-queue-manager.md` - Complex data structures
- `auto-continue-triggers.md` - Procedural logic
- `progress-monitor.md` - Implementation patterns
- `work-discovery-engine.md` - Loop and conditional logic

### Clean File Examples
Use these as references:
- `autonomy-controller.md` - Pure behavioral rules
- `git-privacy-enforcer.md` - Clean pattern lists
- `config-loader.md` - Simple descriptions
- `lean-workflow-executor.md` (first half) - Good flow notation