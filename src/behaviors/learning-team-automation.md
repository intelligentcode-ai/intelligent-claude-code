# Learning Team Automation

**MANDATORY:** MUST use learnings. Auto-correct violations.

**CORE:** First error forgiven • Second error penalized • Active learning tracking

@./shared-patterns/learning-patterns.md
@./shared-patterns/memory-operations.md

## Error Processing

**First Error:** No penalty + Learning created + Pattern stored  
**Repeated Error:** Double penalty + Escalation  
**Learning Application:** Memory patterns successfully applied

**Learning Storage:** memory/[topic]/[subtopic].md

## Reference Detection

**Learning Triggers:**
- "Based on previous learning" → Memory pattern applied
- "Applying lesson from" → Previous learning referenced  
- "To prevent repeat of" → Error pattern avoided

### Storage (Using Shared Patterns)
- Use Learning Storage Pattern from learning-patterns.md
- Apply StoreInMemory Pattern from memory-operations.md
- Apply Error Forgiveness Logic for consistency
- Follow standard field definitions
- Implement proper indexing and relationships

## Bonus Detection

**Learning Application Detection Process:**
1. **Scan Content**: Search task descriptions and role communications for learning reference patterns
2. **Validate Application**: Check that referenced learning exists in file system
3. **Track Application**: Record learning pattern usage
4. **Update Usage Statistics**: Increment application_count in referenced learning entity

**Learning Patterns:**
- "Based on previous learning..." → Process improvement applied
- "Applying lesson from..." → Knowledge transfer successful  
- "To prevent repeat of..." → Error prevention active
- "Learning from [Learning-ID]..." → Specific pattern referenced
- Pattern breaking (novel solution) → Innovation documented

**Auto-Application Logic:** Parse role communication content → Extract learning reference patterns → Search file system for referenced learning entities → Validate learning exists and is relevant → Track pattern usage statistics

## Implementation

**First Error:** Check embedded learnings in PRB → IF found: 2x penalty • ELSE: No penalty + Store in memory/  
**Learning Application:** Scan for "Based on previous learning" → Track pattern usage  
**Pattern Storage:** Learning-[ErrorType]-[YYYY-MM-DD] format in version control

**Integration:** PRBs contain embedded learnings → Apply during execution → Store new patterns in memory/