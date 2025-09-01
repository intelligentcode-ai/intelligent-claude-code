# Learning Team Automation

**MANDATORY:** Use learnings and auto-correct violations.

## Imports
@./shared-patterns/memory-operations.md
@./shared-patterns/learning-patterns.md
@./shared-patterns/best-practices-operations.md

## Core Learning Process

**PRB-DRIVEN EXECUTION:** Active learning tracking with proactive memory generation

### Learning Capture
**STORE PATTERNS:** Successful PRB execution patterns
**STORAGE LOCATION:** memory/[topic]/[subtopic].md
**LEARNING TYPES:** Process improvements, knowledge transfers, issue prevention

### Best-Practices Generation
**AUTO-GENERATE:** Best-practices from successful patterns with broad applicability
**STORAGE LOCATION:** best-practices/[category]/[practice-name].md  
**CATEGORIES:** architecture, collaboration, development, git, operations, quality, security
**TRIGGER CRITERIA:** Pattern used successfully 3+ times, broad applicability confirmed

### Learning Application
**REFERENCE PATTERNS:**
- "Based on previous learning" → Memory pattern applied
- "Applying lesson from" → Previous learning referenced
- "To prevent repeat of" → Issue pattern avoided
- "Learning from [Learning-ID]" → Specific pattern referenced

### Learning Application Detection
1. **Scan Content:** Search for learning reference patterns
2. **Validate Application:** Check referenced learning exists
3. **Track Application:** Record learning pattern usage
4. **Update Statistics:** Increment application_count

## Proactive Memory Generation

**MANDATORY:** Generate memory during ALL operations, not just PRBs

### Proactive Triggers
**CONTINUOUS OPERATION TRIGGERS:**
- Information requests from user (check memory first)
- Discovery of configurations, paths, or processes
- Problem resolution patterns
- Repeated questions or requests
- Tool/service configuration discoveries
- Successful workflow completions
- Issue resolution patterns

### Intelligent Detection
**HIGH-VALUE Learning Detection:**
- **Frequency Patterns:** Same question asked 2+ times
- **Configuration Discovery:** New paths, settings, access methods
- **Problem-Solution Pairs:** Reusable solutions
- **Workflow Optimization:** Broadly applicable improvements  
- **Tool Integration:** Successfully integrated tools/services
- **Best-Practice Patterns:** Repeated successful patterns qualifying for best-practice promotion

### Auto-Store Triggers
```markdown
IMMEDIATE Storage Required:
☐ User provides path/configuration information
☐ Authentication/credential access pattern discovered
☐ Complex problem resolution
☐ Repeatable workflow process
☐ Working tool configuration
☐ Issue solution preventing future problems
```

### Security-Aware Storage
**PROACTIVE PATTERNS:**
- **Safe Location Storage:** Store location methods, not credentials
- **Access Pattern Storage:** Store processes, not values
- **Configuration Security:** Store approaches, not secrets

**NEVER Store:** Actual credential values, sensitive project details, personal information, temporary states

## Implementation Integration

### PRB Execution Integration
**Learning Capture:** Check embedded learnings → Apply during execution → Store new patterns
**Learning Application:** Scan for reference patterns → Track usage → Apply proven approaches

### Enhanced Auto-Application
1. **Query Intent Analysis:** Parse user needs
2. **Memory Search:** Auto-search relevant topics
3. **Relevance Scoring:** Score matches for applicability
4. **Auto-Application:** Apply high-relevance memories
5. **Gap Identification:** Identify missing information
6. **Proactive Storage:** Store new learnings discovered

---
*Learning team automation with proactive memory generation*