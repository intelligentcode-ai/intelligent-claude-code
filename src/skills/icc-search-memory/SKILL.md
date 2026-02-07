---
name: icc-search-memory
description: Activate before asking user questions when prior context may exist. Activate when looking for patterns, decisions, or solutions from past work. Searches version-controlled memory for prior knowledge and context.
---

# ICC Search Memory

Search the version-controlled memory system for prior knowledge and context.

## When to Use

- Before asking user for information that may already be stored
- When generating AgentTasks that need embedded context
- Looking for past patterns, decisions, or solutions
- Exploring what the team has learned previously

## Usage

```
/icc-search-memory [query]
```

**Query Examples:**
- Keywords: `oauth2 authentication`
- Exact phrases: `"token refresh"`
- Type filter: `type:Learning oauth`
- Context filter: `context:STORY-001`
- Tag search: `tag:authentication`

## Search Process

1. **Parse query** - extract keywords, filters, and context references
2. **Search strategy** - check index, search recent first
3. **Score results** using:
   - Keyword match: +3 points per match
   - Context match: +5 points
   - Recency: exponential decay
   - Tag match: +2 points
4. **Return top 10 results** with previews

## Output Format

```
Found [N] relevant memories:

1. [Title] (Score: X.X)
   Location: memory/[topic]/[file].md
   "[preview snippet]"
   Tags: [tag1, tag2]

2. [Title] (Score: X.X)
   ...
```

## Memory Storage Format

Memories are stored in `memory/<topic>/<subtopic>.md`:
- Newest entries first
- Short, actionable summaries
- Tagged for searchability

## Integration

- Used during AgentTask generation to find relevant knowledge
- Memories embedded directly into AgentTasks
- Auto-prunes large files during search
