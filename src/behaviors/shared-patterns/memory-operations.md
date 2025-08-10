# Memory Operations

**MANDATORY:** Version-controlled memory in project.

## Structure
```
memory/
├── [topic]/
│   └── [subtopic].md  # Dated entries (newest first)
└── index.md           # Topic index
```

## Entry Format
```markdown
## YYYY-MM-DD: Title
**Context:** Task/PRB reference
**Problem:** What went wrong
**Solution:** How fixed
**Code:** [if applicable]
---
```

## Operations

| Operation | Process | Result |
|-----------|---------|--------|
| Store | Add to top → Prune if >10/5KB → Archive old | Updated file |
| Search | Keywords → Index → Score by relevance+recency | Top matches |
| Load | Read file → Parse → Cache 5min | Memory entries |

## Pruning
- Threshold: 10 entries or 5KB
- Archive: memory/archive/[topic]/[year].md
- Keep: Most recent 5-10

## PRB Integration
- Embed 2-3 most relevant (max 1000 tokens)
- Selection: topic match + recency
- No runtime lookups needed

---
*Optimized: 179→~35 lines*