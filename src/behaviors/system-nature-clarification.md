# System Nature Clarification

**MANDATORY:** Understand that this is a MARKDOWN-BASED AI-AGENTIC SYSTEM where we write instructions for AI agents.

**PURPOSE:** Prevent confusion about what this system is and how it works

## What This System Is

### This is an AI Instruction System
- **System Type:** MARKDOWN-BASED AI-AGENTIC SYSTEM
- **Primary Function:** Writing instructions for AI agents to follow
- **Core Components:** Behavioral patterns written in markdown
- **Output:** Clear instructions that tell AI agents what to do

### This is NOT a Software Project  
- **Not building:** Executable code, services, or applications
- **Not creating:** Software architecture, validation logic, or command functions
- **Not implementing:** Code classes, service layers, or API endpoints

## How to Think About This System

### Correct Understanding
**We are writing INSTRUCTIONS that tell AI agents:**
- How to create PRBs
- What naming format to use
- When to search memory
- How to validate work items
- What steps to follow

### Wrong Understanding
**We are NOT building:**
- A NumberingService class
- Validation logic functions  
- Command execution systems
- Software services or APIs

## Examples of Correct vs Incorrect Approaches

### ✅ CORRECT: Instruction Language
```markdown
### How to Get Next Number
To get the next available number:
1. Look in the directory for existing files
2. Find the highest number currently used
3. Add 1 to get the next number
4. Format with zero-padding (001, 002, etc.)
```

### ❌ INCORRECT: Service Language
```markdown
### NumberingService.GetNextNumber()
The NumberingService class provides:
- GetNextNumber(category, parent_id) function
- Validation logic for number conflicts
- Caching strategy with TTL management
```

### ✅ CORRECT: Validation Instructions
```markdown
### How to Check PRB Names
When validating a PRB name:
- Check that the format matches the pattern
- Make sure the parent exists
- Verify the number is sequential
- Show helpful error messages if something is wrong
```

### ❌ INCORRECT: Validation Logic
```markdown
### ValidateWorkItemName Function
```
ValidateWorkItemName(proposed_name, category):
  if !matchesPattern(proposed_name):
    throw ValidationError("Invalid format")
  return ValidationResult.PASSED
```
```

## When Writing Behavioral Patterns

### Use This Language
- "How to..." / "When to..." / "Steps to..."
- "Check that..." / "Make sure..."
- "Look for..." / "Find the..."
- "Show error..." / "Tell the user..."

### Avoid This Language  
- "Service" / "Function" / "Class" / "Logic"
- "Implement" / "Execute" / "Process"
- "Command" / "API" / "Endpoint"
- "Cache" / "TTL" / "Performance optimization"

## Integration with Other Behaviors

### When Reading Other Patterns
- Focus on WHAT the AI should do, not HOW code would work
- Extract the instructions, ignore the technical implementation details
- Translate service language into clear step-by-step instructions

### When Writing New Patterns
- Start with "This tells the AI how to..."
- Write as if explaining to someone what steps to follow
- Use simple, direct language
- Focus on the outcome, not the technical process

## Common Mistakes to Avoid

### Treating Markdown as Code
❌ "The validation function should return..."
✅ "When validating, check that..."

### Writing Software Architecture
❌ "The system provides a caching layer with..."
✅ "To speed things up, remember the results for..."

### Using Development Terminology  
❌ "Implement error handling logic..."
✅ "When errors happen, show helpful messages..."

### Creating Complex Technical Patterns
❌ "The service layer abstracts the data access..."
✅ "To get the data, look in these files..."

## Remember
This system exists to make AI agents more effective by giving them clear, simple instructions. Every behavioral pattern should read like a helpful guide that tells the AI exactly what to do, step by step.

---
*System nature clarification for intelligent-claude-code system*