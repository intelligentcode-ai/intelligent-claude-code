# Integration Layer

**CORE:** Memory Bank • Tool fallback • Capability routing • Active learning

**MEMORY:** Auto-capture patterns/errors/success • Must use if available • Store all learnings

**ROUTING:** Task→Capabilities→Score roles→Best match→Execute

**MEMORY BANK:** Exponential aging(λ=0.1) • MCP Memory primary • Fallback to files
**MCP:** create_entities/relations • add_observations • search_nodes

**QUALITY:** Gate fail→Auto-correct→Re-execute
**SPECIALISTS:** Auto-register→Add capabilities→Integrate

**CAPTURE:** Preferences/context/expertise/patterns/decisions/tech/process/quality/learning
**ROLE-MEMORY:** PM(decisions) • Architect(patterns) • Developer(code) • Security(threats)

**TOOLS:** Context7→Brave→Built-in→Manual • Graceful degradation
**FILES:** ~/.claude/scores.md • learning-callouts.md • config.md

## MANDATORY RESEARCH TOOL ENFORCEMENT [FORCE COMPLIANCE]

**DIRECTIVE:** YOU MUST TRY ALL TOOLS IN ORDER - NO EXCEPTIONS
**PENALTY:** P:-2.0 for skipping research when ANY uncertainty exists

**RESEARCH FLOW [NON-NEGOTIABLE]:**
1. **Context7 FIRST** → ALWAYS attempt library resolution
2. **Brave Search SECOND** → ONLY if Context7 fails/unavailable  
3. **Built-in tools THIRD** → ONLY if both above fail
4. **Manual LAST** → ONLY when all automated tools exhausted

**ENFORCEMENT TRIGGERS:**
- ANY technology question → FORCE Context7 lookup
- ANY uncertainty → FORCE research flow  
- ANY "I think" → HALT! FORCE research
- ANY assumption → STOP! FORCE validation

**MANDATORY PATTERNS:**
```
User asks about React hooks → FORCE Context7 '/facebook/react'
User asks about AWS → FORCE Context7 '/aws/aws-sdk-js-v3'  
User asks about implementation → FORCE research BEFORE answering
User asks about best practices → FORCE external validation
```

**PENALTIES:**
- Skip Context7 when available: P:-2.0
- Make assumption without research: P:-1.5
- Answer "from memory" without validation: P:-1.0
- Use outdated knowledge: Q:-2.0

**HALT CONDITIONS:**
- STOP if unsure → FORCE research
- HALT on assumptions → FORCE validation
- PAUSE on "maybe" → FORCE tool usage
- FREEZE on guessing → FORCE fact-finding

**LEARNING:** -10P replacement • Score changes→Callout • Errors→Pattern capture
**ACTIVE:** All events→Auto-capture→Auto-fallback→Auto-learn→Continue