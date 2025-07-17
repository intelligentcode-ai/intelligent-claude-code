# icc:memory-search

Search memory system for patterns, learnings, and knowledge entities.

## Usage
```
icc-memory-search "search query"
icc-memory-search --type Learning
icc-memory-search --entity "Entity Name"
```

## Parameters
- `query`: Search term or pattern (required)
- `--type`: Filter by entity type (Learning, Pattern, Project, etc.)
- `--entity`: Search for specific entity name

## Implementation
Integrates with MCP Memory system for knowledge retrieval:

1. **Query Processing**: Parse search terms and filters
2. **Memory Search**: Search nodes using MCP Memory search
3. **Result Filtering**: Apply type and entity filters
4. **Context Extraction**: Extract relevant observations and relations
5. **Learning Application**: Apply findings to current context

## Expected Output
```
🔍 Memory Search: "authentication patterns"

📊 Search Results (5 found):

🧠 Learning-authentication-error-2025-07-15
   Type: Learning
   Content: "Error: Missing validation in auth flow"
   Learning: "Always validate tokens before processing"
   Prevention: "Add middleware validation layer"

🔗 Pattern-oauth-implementation-2025-07-14
   Type: Pattern
   Content: "OAuth implementation best practices"
   Success: "Used industry standard patterns"
   Reuse: "Apply to all authentication features"

💡 Project-auth-system-context
   Type: Project
   Content: "Authentication system architecture"
   Relations: Links to 3 stories, 8 tasks
   Status: "In progress"

🎯 Applicable Learnings:
   - Apply middleware validation (Learning-authentication-error)
   - Use OAuth patterns (Pattern-oauth-implementation)
   - Reference existing architecture (Project-auth-system)
```

## Integration
- Connects to MCP Memory system
- Supports learning-team-automation patterns
- Provides actionable insights for current work
- Integrates with knowledge-first workflow principles