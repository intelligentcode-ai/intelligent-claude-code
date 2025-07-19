# Memory Search

Search memory for patterns and apply learnings using $ARGUMENTS as the search query.

## Behavioral Sequence
1. Parse $ARGUMENTS to extract search query and options:
   - Query text (required)
   - --type filter (Learning, Success-Pattern, TaskLearning, etc.)
   - --recent flag (last 30 days only)
   - --exact flag (exact match vs. fuzzy search)
2. If query empty, respond "Error: Search query required"
3. Initialize memory search:
   - Test MCP Memory connection with `mcp__memory__read_graph()`
   - If connection fails, fall back to file-based search in `~/.claude/memory/`
   - Display "🔍 Searching memory for: '[query]'"
4. Execute primary search:
   - Use `mcp__memory__search_nodes()` with query
   - Search entity names, types, and observation content
   - Apply type filter if specified
5. Enhance search with related entities:
   - For each primary result, find related entities
   - Follow relation chains to discover connected learnings
   - Identify cross-references and patterns
6. Rank and filter results:
   - Score by relevance (keyword matches, content similarity)
   - Weight by recency (newer learnings score higher)
   - Filter by date range if --recent flag present
   - Limit to top 10 most relevant results
7. Categorize findings:
   - **Learning Entities**: Error patterns with prevention measures
   - **Success Patterns**: Proven approaches for reuse
   - **Task Learnings**: Specific implementation insights
   - **Architecture Insights**: System design patterns
   - **Process Improvements**: Workflow optimizations
8. Display search results:
   ```
   📚 Memory Search Results (X found):
   
   🚨 Learning: [Learning-ErrorType-Date]
   Context: [error context]
   Lesson: [what was learned]
   Prevention: [how to avoid]
   Applied: X times (+Y.Y bonus earned)
   
   ✅ Success Pattern: [Success-Pattern-Type-Date] 
   Approach: [what worked]
   Reuse: [how to apply]
   Results: [outcomes achieved]
   ```
9. Suggest applications to current work:
   - Identify relevant patterns for active tasks
   - Recommend preventive measures for detected risks
   - Suggest proven approaches for similar work
   - Highlight bonus opportunities for applying learnings
10. Update search analytics:
    - Record search query and results
    - Track learning application opportunities
    - Identify gaps in memory coverage

## Error Handling
- Empty query: "Error: Search query required"
- Memory connection failed: "Warning: Using file-based memory search (limited functionality)"
- No results found: "Info: No matching memories found. Consider broader search terms."
- Search timeout: "Warning: Search timed out. Try more specific query."
- Invalid type filter: "Error: Unknown memory type '[type]'. Available: Learning, Success-Pattern, TaskLearning"

## Search Strategies
- **Exact Match**: Use --exact for specific entity names or IDs
- **Fuzzy Search**: Default mode finds related concepts and synonyms
- **Pattern Search**: Search for "Learning-[pattern]" or "Success-[pattern]"
- **Context Search**: Include surrounding context words for better matching
- **Type Filtering**: Use --type to focus on specific memory categories

## Learning Application Bonuses
- Reference found learning: "+0.5P bonus when applied"
- Apply success pattern: "+0.5Q bonus for quality"
- Break error pattern: "+1.0P/Q bonus for improvement"
- First-time pattern use: "+0.5P bonus for discovery"

## Command Chaining
- Search results can be piped to role activation for context loading
- If --apply flag present, automatically reference top learning in next action
- Output format supports integration with task execution commands