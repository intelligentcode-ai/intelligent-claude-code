# Learning Team Automation

**MANDATORY:** MUST use learnings. Auto-correct violations.

**CORE:** First error forgiven • Second error penalized • Active learning tracking • PROACTIVE memory generation

@./shared-patterns/learning-patterns.md
@./shared-patterns/memory-operations.md
@./proactive-memory-behavior.md

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

## Proactive Memory Generation

**MANDATORY:** Generate memory during ALL operations, not just PRBs. Auto-detect learning opportunities.

### Proactive Triggers

**CONTINUOUS OPERATION TRIGGERS:**
- Any information request from user (before asking, check memory first)
- Discovery of new configurations, paths, or processes
- Problem resolution patterns that could recur
- Repeated questions or requests from users
- Tool or service configuration discoveries
- Successful workflow completions
- Error resolution patterns

### Intelligent Detection Patterns

**HIGH-VALUE Learning Detection:**
- **Frequency Patterns**: Same question asked 2+ times
- **Configuration Discovery**: New paths, settings, or access methods found
- **Problem-Solution Pairs**: Issues resolved with reusable solutions
- **Workflow Optimization**: Process improvements that could apply broadly
- **Tool Integration**: Successfully integrated tools or services

**AUTO-STORE Triggers:**
```markdown
IMMEDIATE Storage Required:
☐ User provides path/configuration information
☐ Authentication or credential access pattern discovered  
☐ Successful resolution of complex problem
☐ Workflow process that could be repeated
☐ Tool configuration that works
☐ Error solution that could prevent future issues
```

### Situational Awareness

**During ANY Task Execution:**
1. **Pre-Execution**: Check memory for relevant patterns BEFORE asking user
2. **During Execution**: Identify learning opportunities as they emerge
3. **Post-Execution**: Evaluate what should be stored for future use

**Pattern Recognition Rules:**
- If user provides same type of information twice → Store pattern
- If problem solution involves multiple steps → Store complete solution
- If configuration works well → Store configuration pattern
- If user corrects system assumptions → Store correct approach

### Security-Aware Proactive Storage

**PROACTIVE SECURITY PATTERNS:**
- **Safe Location Storage**: When users reveal credential locations, store the location method
- **Access Pattern Storage**: When authentication workflows succeed, store the process
- **Configuration Security**: When secure configurations discovered, store the approach

**NEVER Store During Proactive Generation:**
- Actual credential values (tokens, passwords, keys)
- Sensitive project details that shouldn't be persistent
- Personal information not relevant to technical workflows
- Temporary session data or transient states

### Integration with Role Operations

**EACH ROLE CONTRIBUTES:**
- **@PM**: Project management patterns, workflow optimizations
- **@Architect**: Technical design patterns, architectural decisions
- **@Developer**: Implementation patterns, coding solutions
- **@AI-Engineer**: Behavioral improvements, system enhancements
- **@Security-Engineer**: Security patterns, compliance approaches
- **ALL ROLES**: Discovery patterns, problem solutions, configuration discoveries

**PROACTIVE ROLE BEHAVIOR:**
- Before executing role-specific tasks, check role-specific memory
- During role execution, identify patterns worth storing
- After role completion, store successful patterns for role reuse

## Enhanced Auto-Application Logic

**PROACTIVE APPLICATION SEQUENCE:**
1. **Query Intent Analysis**: Parse what user needs
2. **Memory Search**: Search relevant memory topics automatically
3. **Relevance Scoring**: Score memory matches for applicability
4. **Auto-Application**: Apply high-relevance memories without asking
5. **Gap Identification**: Identify what's missing from memory
6. **Proactive Storage**: Store new learnings discovered during execution

**INTEGRATION WITH EXISTING PATTERNS:**
- Memory-first approach enhances error forgiveness
- Proactive generation improves learning application detection
- Continuous learning supports pattern storage automation
- Role-specific memories enhance specialist effectiveness