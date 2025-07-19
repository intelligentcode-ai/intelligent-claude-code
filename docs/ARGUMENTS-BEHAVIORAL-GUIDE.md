# $ARGUMENTS Behavioral Pattern Guide

**Purpose:** Guide for creating and maintaining behavioral commands using Claude Code's $ARGUMENTS substitution pattern

## Overview

Claude Code slash commands use a simple **string substitution pattern** where `$ARGUMENTS` is replaced with everything typed after the command name. This is fundamentally different from traditional command-line parameter parsing.

## How $ARGUMENTS Works

### Basic Pattern
```markdown
# Command file content
Process the GitHub issue: $ARGUMENTS
```

### Usage Example
```bash
/command 142
```

### Result
Claude Code replaces `$ARGUMENTS` with "142", resulting in:
```
Process the GitHub issue: 142
```

## Key Behavioral Principles

### 1. Simple String Substitution
- **NOT parameter parsing** with flags, options, or complex structures
- **SIMPLE replacement** of `$ARGUMENTS` with user input
- **NO validation** or type checking by Claude Code itself

### 2. Behavioral Interpretation
Commands describe **what AI should do** with the arguments, not how to parse them:

```markdown
# GOOD: Behavioral description
Create a new epic using $ARGUMENTS as the title and scope definition.

# BAD: Parameter parsing instructions
Parse $ARGUMENTS for --title and --scope flags.
```

### 3. Human-Readable Documentation
Arguments are documented for **human understanding**, not AI parsing:

```markdown
## Arguments
Expects: Epic title followed by scope description
Format: "Epic Title | Scope description here"
Example: "User Authentication | OAuth2 login system with social providers"
```

## Argument Documentation Standards

### Basic Format
```markdown
# Command Name

Brief description using $ARGUMENTS.

## Behavior
Detailed explanation of what the AI will do with $ARGUMENTS.

## Arguments
**Format:** Expected input format
**Example:** Concrete usage example
**Notes:** Any special handling or constraints
```

### Complete Example
```markdown
# Create Story

Create a new story within an epic using $ARGUMENTS.

## Behavior
PM-only operation that creates a new feature implementation within an epic. 
Extracts story title, parent epic, scope, and priority from $ARGUMENTS. 
Story created in DEFINING phase with no tasks initially.

## Arguments
**Format:** "Story Title | Epic: EPIC-XXX | Priority: P1 | Scope description"
**Example:** "OAuth Login | Epic: EPIC-001 | Priority: P1 | Implement OAuth2 authentication"
**Notes:** Epic must exist; priority defaults to P2 if not specified

## Core Actions
- Verify @PM role and epic exists
- Assign next STORY-XXX ID
- Create story directory with story.yaml
- Update parent epic with story reference
```

## Common Argument Patterns

### 1. Simple Value
```markdown
# Activate Role
Switch to specialized role using $ARGUMENTS as the role name.

## Arguments
**Format:** @RoleName
**Example:** @AI-Engineer
```

### 2. Structured Input
```markdown
# Create Bug
Create a new bug report using $ARGUMENTS.

## Arguments
**Format:** "Bug Title | Severity: HIGH | Reproduction steps"
**Example:** "Login timeout | Severity: CRITICAL | User clicks login, waits 30s, times out"
```

### 3. Search Query
```markdown
# Memory Search
Search knowledge base for $ARGUMENTS.

## Arguments
**Format:** Search terms or phrases
**Example:** "OAuth implementation patterns"
```

### 4. Complex Specification
```markdown
# Plan Story
Plan tasks for story using $ARGUMENTS.

## Arguments
**Format:** "STORY-XXX | Optional notes about specific focus areas"
**Example:** "STORY-005 | Focus on security validation and error handling"
```

## Best Practices

### 1. Clear Behavioral Description
- Focus on **what the AI will do** with the arguments
- Describe the **expected outcome** of the command
- Explain any **role restrictions** or **prerequisites**

### 2. Format Documentation
- Provide **clear format** expectations
- Include **concrete examples** 
- Note **optional vs required** parts
- Explain **default values** or behaviors

### 3. Validation Patterns
When AI needs to validate arguments, describe the behavioral pattern:

```markdown
## Behavior
Validates that $ARGUMENTS contains a valid role name starting with @. 
If role doesn't exist in 14 core roles, attempts to create dynamic specialist 
by parsing @Domain-BaseRole pattern.
```

### 4. Error Handling
Describe what happens with invalid arguments:

```markdown
## Error Handling
If $ARGUMENTS doesn't match expected format, AI will:
1. Request clarification with format example
2. Suggest closest valid option if applicable
3. Display help information for the command
```

## Anti-Patterns to Avoid

### 1. Parameter Parsing Instructions
```markdown
# BAD
Parse $ARGUMENTS for --title, --epic, and --priority flags.

# GOOD  
Extract title, epic, and priority from $ARGUMENTS using format "Title | Epic: XXX | Priority: P1".
```

### 2. Complex Validation Rules
```markdown
# BAD
Validate that --priority is P0-P3, --epic exists in database, title is 3-50 chars.

# GOOD
If priority not specified, default to P2. Verify epic exists before proceeding.
```

### 3. Implementation Details
```markdown
# BAD
Split $ARGUMENTS on | character, trim whitespace, validate each component.

# GOOD
Interpret $ARGUMENTS as pipe-separated values for title, epic, and priority.
```

## Command Creation Checklist

When creating new behavioral commands:

- [ ] Uses `$ARGUMENTS` for user input substitution
- [ ] Focuses on behavioral description, not parameter parsing
- [ ] Includes clear argument format documentation
- [ ] Provides concrete usage examples
- [ ] Describes expected AI behavior and outcomes
- [ ] Documents any role restrictions or prerequisites
- [ ] Explains error handling approach
- [ ] Avoids complex parsing or validation instructions

## Integration with Virtual Team

### Role-Specific Commands
Commands can restrict usage to specific roles:

```markdown
## Behavior
**@PM role required.** Creates new epic using $ARGUMENTS for title and objectives.
```

### Memory Integration
Commands should leverage memory search patterns:

```markdown
## Behavior
First searches memory for similar epics using title from $ARGUMENTS, 
then creates new epic incorporating relevant patterns and lessons learned.
```

### Learning Capture
Commands should describe learning capture:

```markdown
## Core Actions
- Create epic structure and files
- Store epic creation patterns in memory
- Capture any issues or improvements for future epic creation
```

This behavioral pattern ensures commands are maintainable, understandable by humans, and correctly interpreted by AI agents in the virtual team system.