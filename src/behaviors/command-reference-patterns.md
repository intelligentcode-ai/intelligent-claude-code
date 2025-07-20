# Command Reference Patterns

**Purpose:** Standard patterns for referencing commands from behaviors  
**Type:** Behavioral Guidance Component  
**Status:** ACTIVE

## Core Principle

**Avoid Duplication:** Behaviors should reference commands rather than duplicating implementation details. Commands are single source of truth for actions.

## Reference Patterns

### Direct Command Reference
**Format:** Use `/command-name [arguments]` for specific command execution
**Example:** Use `/icc-detect-work-type [task_content]` for work type analysis

### Behavioral Guidance with Command
**Format:** Describe when/why to use command, then reference it
**Example:** When creating stories, use `/icc-create-story "Title | Epic: EPIC-XXX | Priority: P1"` for consistent formatting

### Command Chain Reference
**Format:** Reference command sequences for complex workflows
**Example:** Follow validation chain: `/icc-detect-work-type` → `/icc-require-triage` → `/icc-validate-assignments`

## Replacement Patterns

### Replace Detailed Steps
**Before:** List 5-10 implementation steps in behavior
**After:** Reference command that implements those steps

### Replace Duplicate Logic
**Before:** Describe same logic in multiple behavioral files
**After:** Single command reference across all behaviors

### Replace Implementation Details
**Before:** Explain how something works technically
**After:** Reference command and focus on when/why to use it

## Integration Guidelines

### Behavioral Files Should
- Focus on WHEN and WHY to use commands
- Provide context and decision-making guidance
- Reference specific commands for implementation
- Avoid duplicating command content

### Command Files Should
- Contain specific implementation steps
- Be authoritative source for actions
- Handle all implementation details
- Be referenced by behaviors

## Token Optimization

### High-Impact Replacements
- Validation logic → Command references
- Complex workflows → Command chains
- Detailed procedures → Command usage patterns

### Maintenance Benefits
- Single source of truth in commands
- Changes only needed in command files
- Behaviors stay focused on guidance
- Reduced content duplication

---
*Command reference patterns for intelligent-claude-code system*