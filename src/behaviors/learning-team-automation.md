# Learning Team Automation

**CORE:** First error forgiven • Second error penalized • Active learning bonus • Retrospective mandatory • File-based memory

## Learning Flow

**First Error:** No penalty + Learning created + Pattern stored in file system  
**Repeated Error:** Double penalty (2x) + Escalation  
**Learning Application:** +0.5P/Q bonus for references  
**Memory Format:** Learning-[ErrorType]-[YYYY-MM-DD].json in ~/.claude/memory/entities/Learning/

## Error Processing

**Error Processing Pattern:**
1. **Detect Error**: Identify error type, context, and severity
2. **Search Previous Learnings**: Use `/icc-memory-search "error: [error_type]"` to find similar past errors
3. **Apply Forgiveness Logic**: IF no previous learning found → First error (no penalty) • ELSE → Repeated error (2x penalty)
4. **Create Learning Entity**: Use `/icc-memory-store` to create Learning-[ErrorType]-[Date] with prevention measures
5. **Update Error Tracking**: Increment application count for related learnings

**Learning Creation Process:**
```
1. Format error context and extract key information
2. Generate Learning entity with:
   - Error type and context
   - Prevention strategies
   - Implementation guidance
   - Related role and task information
3. Store in ~/.claude/memory/entities/Learning/[YYYY]/[MM]/
4. Update content and tag indexes
5. Create relationships to patterns and project context
```

## File-Based Memory Integration

**Learning Consultation Pattern:**
```
1. Before role assignment: `/icc-memory-search "role: [role_name] task: [task_type]"`
2. Load relevant learnings and prevention patterns
3. Apply preventive measures or block if critical learnings exist
4. Document learning application for bonus scoring
```

**Reference Detection:** Scan content for learning application patterns:
- "Based on previous learning..." → Load specific learning entity
- "Applying lesson from..." → Reference stored learning ID  
- "To prevent repeat of..." → Link to error prevention patterns

**Storage Structure:**
```json
{
  "id": "Learning-[ErrorType]-[YYYYMMDD]",
  "type": "Learning",
  "created_at": "ISO8601_timestamp",
  "context": {
    "task_id": "current_task",
    "role": "active_role", 
    "error_type": "validation_missing"
  },
  "observations": [
    "Specific error that occurred",
    "Context and conditions that led to error"
  ],
  "patterns": [
    "Actionable pattern for prevention",
    "Implementation guidance"
  ],
  "prevention": [
    "Specific steps to prevent recurrence",
    "Validation checks to implement"
  ],
  "tags": ["error_type", "role", "domain"],
  "relevance_score": 0.95,
  "application_count": 0
}
```

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

**Auto-Application Logic:**
```
1. Parse role communication content
2. Extract learning reference patterns
3. Search file system for referenced learning entities
4. Validate learning exists and is relevant
5. Apply appropriate bonus to role scores
6. Update learning entity usage statistics
```

## Retrospective System

**File-Based Retrospective Process:**
1. **Auto-Trigger**: On task completion/error/milestone
2. **Extract Insights**: What worked/failed/learned from current context
3. **Search Related**: Use `/icc-memory-search` to find related patterns
4. **Create Entities**: Store new patterns and learnings using `/icc-memory-store`
5. **Link Relationships**: Connect new learnings to existing patterns and project context

**Success Pattern Storage:**
```json
{
  "id": "Pattern-[Type]-success-[YYYYMMDD]",
  "type": "Pattern",
  "pattern_type": "success",
  "context": {
    "domain": "task_domain",
    "application": "specific_use_case"
  },
  "implementation": [
    "Step 1: Specific action taken",
    "Step 2: Key decision made",
    "Step 3: Validation performed"
  ],
  "outcomes": [
    "Positive result achieved",
    "Measurable improvement"
  ],
  "reuse_count": 0,
  "success_rate": 1.0
}
```

**Error Pattern Storage:**
- Store as Learning-[ErrorType]-[Date] with comprehensive prevention measures
- Link to related successful patterns for contrast
- Include specific implementation guidance for prevention

## Behavioral Integration

**Memory-First Pattern:**
```
1. Before any action: `/icc-memory-search [relevant_context]`
2. Load applicable learnings and patterns
3. Apply preventive measures and best practices
4. Document learning application in action description
5. Update learning usage statistics
```

**Learning Check Process:**
```
1. Error occurs: Identify error type and context
2. Search previous learnings: `/icc-memory-search "error: [type]"`
3. Apply forgiveness/penalty logic based on search results
4. Create new learning: `/icc-memory-store Learning [error_data]`
5. Continue with enhanced understanding
```

**Pattern Prevention Workflow:**
```
1. Task starts: Search for relevant error patterns
2. Load prevention measures from related learnings
3. Apply proactive safeguards before execution
4. Document prevention application for bonus scoring
```

**Cross-Role Learning Sharing:**
```
1. Learning created in one role context
2. Tag with relevant role and domain information
3. Share through search system when other roles query
4. Prevent team-wide repetition through pattern application
```

## File-Based System Integration

**Error Handling Integration:**
```
1. First Error Detection:
   - Search: `/icc-memory-search "error: [error_type]"`
   - IF no results: Apply zero penalty (first occurrence)
   - Create learning: `/icc-memory-store Learning [error_context]`

2. Repeated Error Detection:
   - Search finds existing learning
   - Apply 2x base penalty multiplier
   - Update existing learning with additional context
```

**Bonus Application System:**
```
1. Auto-scan all role communications and task descriptions
2. Extract learning reference patterns using regex matching
3. Validate references against file system entities
4. Apply appropriate bonuses (+0.5P/Q) to role scores
5. Update learning entity application_count field
```

**Memory Integration Architecture:**
- **Storage**: All learning events in ~/.claude/memory/entities/Learning/[YYYY]/[MM]/
- **Search**: Content and tag-based search across all learning entities  
- **Relationships**: Automatic linking between learnings, patterns, and project context
- **Cleanup**: Automated archiving of old learnings with low relevance scores

---
**LEARNING AUTOMATION:** File-based storage • Error forgiveness • Pattern capture • Cross-role sharing