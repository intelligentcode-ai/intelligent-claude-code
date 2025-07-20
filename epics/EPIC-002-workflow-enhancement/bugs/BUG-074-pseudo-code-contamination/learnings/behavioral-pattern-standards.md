# Behavioral Pattern Standards

**Purpose:** Define proper behavioral patterns for intelligent-claude-code behavioral modules  
**Type:** Standards Documentation  
**Status:** AUTHORITATIVE

## Overview

This document establishes the definitive standards for writing behavioral markdown files in the intelligent-claude-code system. It defines what constitutes proper behavioral text, identifies anti-patterns to avoid, and provides validation guidelines for maintaining behavioral purity.

## Proper Behavioral Patterns

### 1. Declarative Behavioral Description

**Good Pattern:**
```markdown
## Operation

**Trigger:** When `git_privacy: true` in settings  
**Scope:** Commit messages, PR titles, PR descriptions  
**Fallback:** "Update implementation" if message becomes empty
```

**Why it works:**
- Describes WHAT happens, not HOW
- Uses natural language
- Focuses on conditions and outcomes
- Remains implementation-agnostic

### 2. Behavioral Flow Description

**Good Pattern:**
```markdown
## Core Functions

**initialize_system():** Load settings → Initialize controllers → IF L3: Enable continuous mode  
**read_assignment():** Parse assignment + Apply embedded config  
**execute_phase():** L1/L2 approval, L3 autonomous → INIT→PLAN→EXECUTE→ACCEPTANCE→DONE→ARCHIVED
```

**Why it works:**
- Uses arrows (→) to show flow
- Describes sequence of behaviors
- Avoids implementation details
- Focuses on state transitions

### 3. Rule-Based Behavior

**Good Pattern:**
```markdown
### Autonomy Levels
- **L1:** User approval required for ALL actions
- **L2:** Architect approval for technical decisions, auto-proceed for routine tasks
- **L3:** Full autonomous execution without approval
```

**Why it works:**
- States rules clearly
- Uses natural language
- Defines behaviors, not code
- Focuses on outcomes

### 4. Pattern Recognition

**Good Pattern:**
```markdown
#### Learning Detection Patterns
- "based on previous learning" → +0.5P
- "applying lesson from" → +0.5P
- "to prevent repeat of" → +0.5Q
```

**Why it works:**
- Shows pattern → outcome
- Uses simple arrows
- Describes recognition, not parsing
- Natural language patterns

### 5. Behavioral Integration

**Good Pattern:**
```markdown
## Integration

**Usage Pattern:**
- Load configuration
- Check specific setting  
- Apply behavioral rules
- Execute appropriate action
```

**Why it works:**
- High-level steps
- No code syntax
- Behavioral focus
- Clear sequence

## Anti-Patterns to Avoid

### 1. Pseudo-Code Contamination

**Bad Pattern:**
```pseudocode
FUNCTION validateAssignment(task, role):
    IF capMatch < 0.7:
        result.valid = false
    RETURN result
```

**Why it's bad:**
- Uses programming syntax
- Includes function definitions
- Has return statements
- Implementation-specific

**Correct Alternative:**
```markdown
**Assignment Validation:** Check capability match → Require >70% threshold → Create specialist if needed
```

### 2. Code-Like Structures

**Bad Pattern:**
```markdown
CLASS TaskQueue:
    queue = PriorityQueue()
    tasks = Map()
```

**Why it's bad:**
- Class definitions
- Variable declarations
- Data structure specifics
- Programming constructs

**Correct Alternative:**
```markdown
**Task Queue:** Priority-based queue for task management with mapping capabilities
```

### 3. Implementation Logic

**Bad Pattern:**
```markdown
FOR source IN sources:
    TRY:
        work = source()
    CATCH error:
        HandleError(error)
```

**Why it's bad:**
- Control flow statements
- Try/catch blocks
- Function calls
- Error handling syntax

**Correct Alternative:**
```markdown
**Work Discovery:** Check each source → Handle any errors → Continue with next source
```

### 4. Variable Assignments

**Bad Pattern:**
```markdown
state = {active: false, tasks: [], errors: 0}
composite = (epic * 1000) + (taskPri * 100) + age
```

**Why it's bad:**
- Variable definitions
- Mathematical operations
- Object syntax
- Direct assignments

**Correct Alternative:**
```markdown
**State Tracking:** Maintains active status, task list, and error count
**Priority Calculation:** Combines epic priority, task priority, and age factors
```

### 5. Conditional Logic Syntax

**Bad Pattern:**
```markdown
IF GetSetting("autonomy_level") == "L3":
    state.active = true
ELSE:
    RETURN false
```

**Why it's bad:**
- Programming conditionals
- Function calls
- Boolean operations
- Return statements

**Correct Alternative:**
```markdown
**L3 Activation:** When autonomy level is L3 → Activate continuous mode
```

## Validation Guidelines

### Pre-Commit Checklist

1. **No Programming Keywords**
   - Ban: FUNCTION, CLASS, IF/ELSE, FOR, WHILE, TRY/CATCH
   - Ban: RETURN, THROW, SWITCH, CASE
   - Ban: =, ==, !=, <, >, <=, >=

2. **No Code Structures**
   - No function definitions
   - No class declarations
   - No variable assignments
   - No method calls with parentheses

3. **No Data Types**
   - No arrays/lists syntax: [], {}
   - No type declarations
   - No object notation
   - No null/true/false literals

4. **Natural Language Test**
   - Can a non-programmer understand it?
   - Does it describe behavior, not implementation?
   - Is it focused on WHAT, not HOW?

### Red Flags to Watch For

1. **Syntax Patterns**
   - Parentheses after words: `function()`
   - Dot notation: `object.property`
   - Square brackets: `array[index]`
   - Curly braces: `{key: value}`

2. **Programming Patterns**
   - Variable declarations
   - Function definitions
   - Loop structures
   - Conditional blocks

3. **Implementation Details**
   - Specific algorithms
   - Data structure choices
   - Memory management
   - Performance optimizations

### Validation Process

1. **Automated Checks**
   ```bash
   # Check for pseudo-code patterns
   grep -E "(FUNCTION|CLASS|RETURN|IF.*:|FOR.*IN)" file.md
   
   # Check for code syntax
   grep -E "(\w+\(\)|\w+\.\w+|\[.*\]|{.*:.*})" file.md
   ```

2. **Manual Review**
   - Read through for natural language
   - Verify behavioral focus
   - Check for implementation leakage
   - Ensure clarity without code

3. **Peer Review Focus**
   - Is it purely behavioral?
   - Can AI understand without parsing code?
   - Does it guide without implementing?
   - Is it maintainable as text?

## Behavioral Writing Guidelines

### 1. Use Natural Language

**Instead of:** `executeTask(task) returns result`  
**Write:** "Execute task and provide result"

### 2. Describe Flows with Arrows

**Instead of:** `step1(); step2(); step3();`  
**Write:** "Step 1 → Step 2 → Step 3"

### 3. State Rules Clearly

**Instead of:** `if (condition) { action() }`  
**Write:** "When condition occurs: perform action"

### 4. Focus on Outcomes

**Instead of:** `result = calculate(a, b, c)`  
**Write:** "Calculate result based on inputs"

### 5. Use Behavioral Verbs

**Good verbs:** Trigger, activate, validate, check, ensure, require, process  
**Bad verbs:** Execute(), call(), return, throw, instantiate

## Maintenance Guidelines

### Regular Audits

1. **Monthly Review**
   - Scan all behavioral files
   - Check for pseudo-code creep
   - Update any violations
   - Document findings

2. **Pre-Release Validation**
   - Full system scan
   - Automated pattern detection
   - Manual spot checks
   - Sign-off required

### Training New Contributors

1. **Required Reading**
   - This standards document
   - Example behavioral files
   - Anti-pattern examples
   - Review process guide

2. **First Contribution**
   - Pair with experienced contributor
   - Extra review attention
   - Feedback on patterns
   - Gradual independence

### Evolution Process

1. **Pattern Updates**
   - Document new patterns discovered
   - Update anti-pattern list
   - Revise validation tools
   - Communicate changes

2. **Tool Improvements**
   - Enhance detection scripts
   - Add new validation rules
   - Improve automation
   - Track effectiveness

## Examples from Recent Cleanup

### Before (Contaminated)
```pseudocode
FUNCTION processWork(workItems):
    FOR item IN workItems:
        state.discovered.add(item.id)
        SWITCH item.type:
            CASE "bug": processBug(item)
```

### After (Clean)
```markdown
**Work Processing:** Add items to discovered set → Process based on type (bug/story/task)
```

### Before (Contaminated)
```pseudocode
IF canAutoFix(error):
    fix = generateFix(error)
    applyFix(task, fix)
    retryTask(task)
```

### After (Clean)
```markdown
**Error Recovery:** When auto-fixable → Generate fix → Apply fix → Retry task
```

## Conclusion

Behavioral files must remain purely behavioral - describing WHAT the system does, not HOW it does it. By following these standards, we ensure:

1. **AI Comprehension:** Natural language that AI can understand without code parsing
2. **Maintainability:** Text-based descriptions that anyone can update
3. **Flexibility:** Behavioral descriptions that don't constrain implementation
4. **Clarity:** Clear communication of system behavior

Remember: If it looks like code, it doesn't belong in a behavioral file. When in doubt, use natural language to describe the behavior.

---
*Definitive standards for behavioral pattern writing in intelligent-claude-code*