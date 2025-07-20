# Memory Search

Search memory system using $ARGUMENTS for relevant patterns.

## Behavior
Searches memory for learnings, patterns, and insights with relevance ranking.

## Arguments
**Format:** "search_query | search_type"
**Types:** learning, pattern, success, error, all
**Example:** "authentication | pattern"

## Core Actions
1. Parse query and type → Execute search with expansion
2. Apply relevance scoring → Filter by type → Return ranked results
3. Track search patterns for optimization

## Search Types
**Learning**: Learning entities | **Pattern**: Reusable practices | **Success**: Successful approaches | **Error**: Prevention measures | **All**: Comprehensive

## Error Handling
- **Empty**: "Query required" | **Memory error**: "Search failed" | **No results**: "None found"