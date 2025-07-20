# Memory Store

Store entities and observations in the memory system using $ARGUMENTS.

## Behavior
Create memory entities with structured observations for knowledge retention
and future reference. Supports multiple entity types with relational data.

## Arguments
**Format:** "EntityType:EntityName | Observations: observation1, observation2, observation3"
**Example:** "TaskLearning:TASK-001-oauth-implementation | Observations: Used JWT library successfully, Error handling for expired tokens needed, Integration tests passed on first run"

## Core Actions
- Parse entity type and name from $ARGUMENTS
- Extract observations from pipe-separated format
- Create memory entity with MCP Memory integration
- Store observations as structured knowledge
- Create relationships with existing entities when relevant
- Log successful storage for verification

## Entity Types
- **TaskLearning**: Individual task insights and outcomes
- **StoryLearning**: Story-level patterns and architecture insights
- **ErrorPattern**: Error types and prevention measures
- **SuccessPattern**: Successful approaches and reusable solutions
- **ProcessImprovement**: Team and workflow enhancements
- **TechnicalDecision**: Architecture and technology choices

## Integration
- Used by learning-team-automation.md for automatic learning capture
- Referenced by workflow templates for knowledge generation phases
- Supports exponential aging memory system
- Enables cross-role knowledge sharing

## Quality Standards
- Observations must be specific and actionable
- Entity names follow project naming conventions
- Relationships created when entities reference each other
- Storage verified through memory search validation