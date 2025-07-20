# Learning Store

Store structured learning entities in memory system using $ARGUMENTS.

## Behavior
Specialized command for storing learning entities with proper formatting,
relationships, and integration with the team learning system. Ensures
learning is accessible for future reference and bonus detection.

## Arguments
**Format:** "LearningID | Type: ErrorType|SuccessType | Context: context | Lesson: lesson_learned | Prevention: prevention_measures"
**Example:** "Learning-validation-missing-2025-01-15 | Type: ValidationError | Context: Task assignment without role validation | Lesson: Always validate role capability match >70% | Prevention: Use icc-validate-assignments before any task assignment"

## Core Actions
- Parse learning ID and components from $ARGUMENTS
- Validate learning ID format: Learning-[Type]-[Date]
- Create learning entity with structured observations:
  - Context: What happened
  - Lesson: What was learned
  - Prevention: How to prevent in future
  - Type: Classification for pattern matching
- Store entity with file-based memory system in ~/.claude/memory/entities/Learning/
- Create relationships with related roles and tasks
- Add tags for easy discovery and pattern matching

## Learning Entity Structure
```yaml
entity_name: Learning-[Type]-[YYYY-MM-DD]
entity_type: Learning
observations:
  - "Type: [ErrorType|SuccessType|Insight]"
  - "Context: [Detailed situation description]"
  - "Lesson: [Key insight or understanding]"
  - "Prevention: [Specific measures to prevent recurrence]"
  - "Role: [Associated specialist role]"
  - "Task: [Related task ID if applicable]"
  - "Pattern: [Pattern classification for matching]"
```

## Pattern Classifications
- **ProcessViolation**: Skipped validation or required steps
- **RoleAssignment**: Incorrect specialist assignments
- **QualityGate**: Quality standard violations
- **Communication**: Team coordination issues
- **Technical**: Implementation or technical problems
- **Innovation**: Creative solutions and improvements

## Integration
- Used by icc-learning-capture for standardized storage
- Referenced by learning detection systems for bonus application
- Searchable by all team members for pattern application
- Integrated with scoring system for penalty/bonus tracking
- Supports learning-team-automation.md behavioral patterns