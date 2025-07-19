# Behavioral Command Template

**Purpose:** Standard template for creating Claude Code slash commands using $ARGUMENTS pattern

## Template Structure

```markdown
# Command Name

Brief one-line description using $ARGUMENTS.

## Behavior
Detailed explanation of what the AI will do with $ARGUMENTS. Include:
- Role requirements and restrictions
- Main behavioral actions and outcomes
- Integration with virtual team system
- Memory search or learning capture patterns

## Arguments
**Format:** Expected input format specification
**Example:** Concrete usage example with real values
**Notes:** Optional information about defaults, validation, or special handling

## Core Actions
- Bullet point list of main actions
- Include validation steps
- Mention file operations or git actions
- Note memory or learning integration

## Validation
- Role verification requirements
- Input format validation approach
- Error handling behavior

## Integration
- How command works with virtual team roles
- Memory system integration
- Learning capture patterns
- Related commands or workflows
```

## Detailed Template with Examples

```markdown
# [Command Name]

[Brief description of command purpose] using $ARGUMENTS.

## Behavior
[Detailed behavioral description explaining what the AI agent will do with the provided arguments. Focus on outcomes and actions, not parsing logic.]

**Role Requirements:** [@Role or "Any role" or "No restrictions"]
**Prerequisites:** [Any requirements like existing files, system state, etc.]

[Explain the main workflow and what the user can expect to happen]

## Arguments
**Format:** [Clear specification of expected input format]
**Example:** [Concrete example showing real usage]
**Notes:** [Optional notes about defaults, validation, special cases]

## Core Actions
- [Primary action 1]
- [Primary action 2] 
- [Validation or verification step]
- [File operations or git actions]
- [Memory/learning integration]

## Validation
- [Input validation approach]
- [Role verification if needed]
- [Error handling behavior]

## Error Handling
If $ARGUMENTS doesn't match expected format or validation fails:
1. [First response action]
2. [Fallback or help action]
3. [Recovery suggestion]

## Integration
- **Memory System:** [How command searches or stores information]
- **Learning Capture:** [What patterns or outcomes are captured]
- **Related Commands:** [Commands that work together with this one]
- **Virtual Team:** [How command fits into team workflow]

## Examples

### Basic Usage
```
/command-name basic argument
```
[Expected behavior and outcome]

### Complex Usage  
```
/command-name "Complex argument | With: multiple | Parts"
```
[Expected behavior and outcome]

### Error Cases
```
/command-name invalid-format
```
[How AI handles invalid input]
```

## Real Example: Create Story Command

```markdown
# Create Story

Create a new story within an epic using $ARGUMENTS.

## Behavior
PM-only operation that creates a new feature implementation story within an existing epic. Extracts story title, parent epic reference, priority level, and scope description from $ARGUMENTS using pipe-separated format. 

**Role Requirements:** @PM role required
**Prerequisites:** Parent epic must exist in the system

The command creates a story in DEFINING phase with no initial tasks, updates the parent epic with the story reference, and sets up the story directory structure.

## Arguments
**Format:** "Story Title | Epic: EPIC-XXX | Priority: P0|P1|P2|P3 | Scope description"
**Example:** "OAuth Login Implementation | Epic: EPIC-001 | Priority: P1 | Implement OAuth2 authentication with Google and GitHub providers"
**Notes:** Priority defaults to P2 if not specified; scope description is optional but recommended

## Core Actions
- Verify @PM role is active
- Validate parent epic exists and is accessible  
- Assign next sequential STORY-XXX identifier
- Create story directory structure with story.yaml
- Update parent epic file with story reference
- Set story status to DEFINING and phase to PLAN

## Validation
- Confirms @PM role before execution
- Verifies epic ID format (EPIC-XXX) and existence
- Validates priority is P0, P1, P2, or P3
- Checks for unique story title within epic

## Error Handling
If $ARGUMENTS doesn't match expected format or validation fails:
1. Display format requirements with concrete example
2. List available epics if epic not found
3. Request role activation if not @PM

## Integration
- **Memory System:** Searches for similar stories and epic patterns before creation
- **Learning Capture:** Stores story creation patterns and any issues encountered
- **Related Commands:** Works with /icc-plan-story for task breakdown
- **Virtual Team:** Triggers PM workflow for story planning and delegation

## Examples

### Basic Usage
```
/icc-create-story "User Registration | Epic: EPIC-001 | Priority: P2"
```
Creates registration story in EPIC-001 with P2 priority

### Complex Usage
```
/icc-create-story "OAuth Integration | Epic: EPIC-001 | Priority: P1 | Complete OAuth2 flow with Google, GitHub, and Microsoft providers including refresh token handling"
```
Creates detailed OAuth story with comprehensive scope

### Error Cases
```
/icc-create-story "Invalid Format"
```
AI responds with format requirements and example
```

## Usage Guidelines

### When Creating Commands

1. **Start with Behavior**: Focus on what the AI agent will do, not how it parses input
2. **Clear Arguments**: Provide unambiguous format with concrete examples
3. **Role Integration**: Specify any role requirements or team integration
4. **Error Handling**: Describe helpful error responses and recovery
5. **Memory Integration**: Include memory search and learning capture patterns

### Common Patterns

#### Simple Value Commands
```markdown
## Arguments
**Format:** Single value or identifier
**Example:** @AI-Engineer
```

#### Structured Input Commands  
```markdown
## Arguments
**Format:** "Field1 | Field2: Value | Field3"
**Example:** "Title | Epic: EPIC-001 | Priority: P1"
```

#### Search or Query Commands
```markdown
## Arguments
**Format:** Search terms or natural language query
**Example:** "OAuth implementation patterns"
```

### Validation Patterns

#### Role-Restricted Commands
```markdown
## Behavior
**@PM role required.** [Description of PM-only behavior]

## Validation
- Confirms @PM role is active before execution
- Provides role activation guidance if needed
```

#### Format Validation
```markdown
## Validation
- Verifies input matches expected format
- Provides format example on validation failure
- Suggests corrections for common mistakes
```

This template ensures all behavioral commands are consistent, well-documented, and properly integrated with the virtual team system.