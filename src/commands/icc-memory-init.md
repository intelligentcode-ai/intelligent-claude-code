# Memory Init

Initialize memory system with project context and knowledge entities using $ARGUMENTS.

## Behavior
Initialize MCP Memory system with project entities, search capability, and knowledge relationships. AI-Engineer or PM operation that establishes memory foundation for intelligent team operation.

## Arguments
**Format:** "project_name | domain | context_description"
**Example:** "intelligent-claude-code | AI Development | Virtual team system with behavioral patterns"

## Core Actions
1. **Project Entity Creation**: Create primary project entity with domain and context
2. **Context Bootstrap**: Search for existing project knowledge and load base entities
3. **Relationship Network**: Establish core knowledge relationships and patterns
4. **Search Validation**: Test memory search functionality and entity retrieval
5. **Learning Foundation**: Initialize learning capture patterns and error tracking

## Memory Entities
- **Project**: Core project entity with domain, objectives, architecture
- **Team**: Virtual team configuration and role definitions
- **Patterns**: Behavioral patterns, workflow templates, command chains
- **Learning**: Error patterns, success patterns, improvement insights

## Search Patterns
- Project-specific knowledge retrieval
- Cross-project pattern matching
- Error prevention through learning application
- Architecture decision capture and reuse

## Integration
- MCP Memory server connection required
- Memory entities persist across sessions
- Search patterns support all team behaviors
- Learning entities enable continuous improvement

## Error Handling
- **No MCP**: "Memory server not available - using fallback mode"
- **Connection Failed**: "Cannot connect to memory - check MCP configuration"
- **Entity Creation Failed**: "Memory entity creation failed - verify permissions"
- **Search Failed**: "Memory search unavailable - using local knowledge"

## Role Restrictions
**Authorized Roles:** @AI-Engineer, @PM
**Required Expertise:** Memory systems, MCP integration, knowledge management