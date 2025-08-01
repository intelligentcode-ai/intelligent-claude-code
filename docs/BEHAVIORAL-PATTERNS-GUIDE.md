# Behavioral Patterns Guide

**Created From:** BUG-074 Pseudo-Code Contamination Cleanup  
**Date:** 2025-01-19  
**Purpose:** Prevent future pseudo-code contamination through clear pattern documentation

## Quick Reference - Good vs Bad Patterns

### ✅ GOOD: Behavioral Text Pattern
```markdown
## Core Functions

**Memory Search:** Query memory → Filter results → Apply relevance scoring → Return insights  
**Task Execution:** Validate assignment → Load context → Execute work → Store learnings  
**Error Handling:** Detect error → Check previous learning → Apply fix or create new learning
```

### ❌ BAD: Pseudo-Code Pattern
```markdown
## Core Functions

function memorySearch(query) {
    results = memory.search(query);
    return filterRelevant(results);
}
```

## Core Principles

### 1. **Natural Language Instructions**
Behaviors guide AI through plain English instructions, not code:
- Write as if explaining to a colleague
- Use action verbs: Detect, Validate, Execute, Store
- Avoid programming syntax entirely

### 2. **Flow Notation**
Express sequences and conditions clearly:
- **Sequential:** Action → Next → Final
- **Options:** Choice • Alternative • Fallback  
- **Conditions:** IF state: action • ELSE: alternative

### 3. **Tool Usage**
Be explicit about tool usage:
- ✅ "Use Read tool to load file content"
- ❌ "file = readFile(path)"

## Pattern Categories

### Command Patterns
```markdown
## Behavioral Sequence
1. Verify prerequisites (role, permissions)
2. Parse input using $ARGUMENTS placeholder
3. Validate data exists and is correct format
4. Execute core action using appropriate tools
5. Update status and provide feedback
6. Chain to next command if specified
```

### Validation Patterns
```markdown
**Validation Chain:** detect-work-type → require-triage → validate-assignment → approve
**Capability Check:** Match >70% → Assign role • ELSE: Create specialist
**Error Response:** Missing data: "Error: [specific issue]" → Exit
```

### Scoring Patterns
```markdown
**Task Complete:** +1.0P/Q  
**Story Complete:** +2.0P/Q  
**Learning Applied:** +0.5P/Q bonus  
**Error Repeated:** -2.0P penalty (double)
```

### Configuration Patterns
```markdown
**Check Setting:** IF git_privacy == true: Strip AI mentions  
**Autonomy Mode:** L3 enabled: Auto-continue • L2: Require approval  
**Feature Toggle:** IF blocking_enabled: Block • ELSE: Create follow-up
```

## Anti-Pattern Detection

### Red Flags to Catch
1. **Parentheses:** `function()`, `method(param)`
2. **Variables:** `var x =`, `let result =`  
3. **Code Blocks:** Pseudo-code inside ``` blocks
4. **Returns:** `return value`
5. **Classes:** `class Name {`
6. **Loops:** `for`, `while`, `forEach`

### Why These Fail
- AI cannot execute code syntax
- Breaks markdown import chains
- Confuses behavioral intent
- Overcomplicates simple instructions

## Writing Checklist

Before committing any behavioral file:

- [ ] No function definitions or calls
- [ ] No variable assignments  
- [ ] No code syntax (brackets, semicolons)
- [ ] All flows use → or • notation
- [ ] Tools explicitly named
- [ ] Conditions as simple IF/ELSE text
- [ ] Examples show desired output only
- [ ] Can be read aloud naturally

## Examples by File Type

### Behavioral File
```markdown
# Component Name

**Purpose:** Clear single-line purpose  
**Type:** Component category  

## Operation

**Trigger:** When this activates  
**Flow:** Step → Step → Result  
**Output:** What it produces  

## Rules

**Rule 1:** Condition: Action  
**Rule 2:** IF state: behavior • ELSE: alternative  
```

### Command File  
```markdown
# Command Name

Action description using $ARGUMENTS.

## Behavioral Sequence
1. Validate prerequisites
2. Parse $ARGUMENTS naturally  
3. Execute using [Tool]
4. Return formatted result

## Error Handling
- Missing data: "Error: [message]"
- Invalid format: "Error: [message]"
```

## Team Responsibilities

### @PM
- Review all behaviors for clarity
- Ensure no pseudo-code contamination
- Validate natural language flow

### @AI-Architect
- Design behavioral patterns
- Ensure architectural alignment
- Review for system consistency

### @AI-Engineer  
- Write behaviors following guidelines
- Clean contaminated files
- Document patterns

### @QA-Engineer
- Test behaviors are executable
- Validate AI can understand
- Report confusion points

## Prevention Strategy

1. **Education First:** New team members learn patterns before writing
2. **Review Early:** Catch contamination in PR reviews
3. **Pattern Library:** Reference this guide and examples
4. **Regular Audits:** Periodic checks for creeping pseudo-code
5. **Tool Integration:** Linters could detect function syntax

## Success Metrics

- AI executes behaviors without confusion
- No "cannot understand" errors
- Clean markdown import chains
- Rapid behavior comprehension
- Consistent pattern usage

---

Remember: **Behaviors are instructions, not implementations.** Write for AI comprehension, not code compilation.