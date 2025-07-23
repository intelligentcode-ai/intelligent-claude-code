# Learning Team Automation

**MANDATORY:** MUST use learnings. Auto-correct violations.

**CORE:** First error forgiven • Second error penalized • Active learning bonus

@./shared-patterns/learning-patterns.md
@./shared-patterns/memory-operations.md

## Error Processing

**First Error:** No penalty + Learning created + Pattern stored  
**Repeated Error:** Double penalty + Escalation  
**Learning Application:** +0.5P/Q bonus for references

**Learning Storage:** ~/.claude/memory/entities/Learning/[YYYY]/[MM]/

## Reference Detection

**Bonus Triggers:**
- "Based on previous learning" → +0.5P
- "Applying lesson from" → +0.5P  
- "To prevent repeat of" → +0.5Q

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
3. **Apply Bonuses**: Update role scores based on learning application type
4. **Update Usage Statistics**: Increment application_count in referenced learning entity

**Bonus Triggers:**
- "Based on previous learning..." → +0.5P (Process bonus)
- "Applying lesson from..." → +0.5P (Application bonus)  
- "To prevent repeat of..." → +0.5Q (Quality bonus)
- "Learning from [Learning-ID]..." → +0.5P (Specific reference bonus)
- Pattern breaking (novel solution) → +1.0P/Q (Innovation bonus)

**Auto-Application Logic:** Parse role communication content → Extract learning reference patterns → Search file system for referenced learning entities → Validate learning exists and is relevant → Apply appropriate bonus to role scores

## Implementation

**First Error:** Use SearchMemory → IF found: 2x penalty • ELSE: No penalty + StoreInMemory  
**Learning Application:** Scan for "Based on previous learning" → +0.5P/Q bonus  
**Pattern Storage:** Learning-[ErrorType]-[YYYY-MM-DD] format (see memory-operations.md)

**Integration:** SearchMemory before actions → Apply learnings → StoreInMemory for new patterns