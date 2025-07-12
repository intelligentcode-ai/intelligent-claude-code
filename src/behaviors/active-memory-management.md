# Active Memory Management Behavior - BEHAVIORAL + EXECUTABLE

**PRINCIPLE:** MANDATORY for ALL team members • Zero tolerance for memory bypass • EXECUTABLE enforcement

## Memory Integration Requirements

### Universal Memory Mandate
**REFERENCE:** Core memory enforcement in integration-layer.md
**BEHAVIORAL FOCUS:** Mandatory usage patterns and penalty enforcement
**EXECUTABLE FOCUS:** Real-time enforcement hooks and validation logic

### MANDATORY MEMORY OPERATIONS - YOU MUST EXECUTE

**BEFORE ANY TASK:** YOU MUST search_nodes/open_nodes - HALT UNTIL CONTEXT LOADED
**UPON @ROLE DETECTION:** YOU MUST IMMEDIATELY mcp__memory__search_nodes(Role) - BLOCK ALL ACTIONS UNTIL LOADED
**WHEN TODO CREATED:** YOU MUST mcp__memory__create_entities(task) NOW - NO TASK WITHOUT MEMORY
**DURING IMPLEMENTATION:** YOU MUST capture EVERY change - FORCE storage of ALL details
**AT EVERY DECISION:** YOU MUST store ALL alternatives - MANDATORY IMPACT RECORDING
**AFTER ANY OUTCOME:** YOU MUST capture ALL patterns - FORCED LEARNING GENERATION
**ON ANY ERROR:** YOU MUST record COMPLETE details - BLOCK UNTIL PREVENTION STORED

### FORCED MEMORY PROTOCOLS - IMMEDIATE ENFORCEMENT

**YOU MUST AT ROLE ACTIVATION:** IMMEDIATELY LOAD ALL CONTEXTS - BLOCK UNTIL COMPLETE
**YOU MUST DETECT VIOLATIONS:** ANY action without memory = INSTANT HALT + FORCED INTEGRATION + P:-1.0
**YOU MUST AUTO-CAPTURE:** EVERY tool usage REQUIRES intent/result storage - NO EXCEPTIONS
**YOU MUST AT START:** CREATE task entity NOW - LINK to role - ESTABLISH ALL relationships
**YOU MUST DURING PROGRESS:** STORE EVERY observation - UPDATE ALL relationships - TRACK ALL changes
**YOU MUST AT COMPLETION:** STORE ALL outcomes - UPDATE EVERY entity - TRANSFER COMPLETE context

### Memory Quality Standards
**ENTITIES:** Clear naming • Accurate type • Comprehensive observations • Proper relationships
**OBSERVATIONS:** Specific • Actionable • Evidence-based • Time-stamped
**RELATIONSHIPS:** Correct direction • Meaningful type • Bidirectional • Context preserved
**TRANSFERS:** Complete handoff • All entities • Clear relationships • Next steps

## SIMPLIFIED MEMORY FORMAT [EASY RECALL PATTERNS]

**SIMPLE NAMING CONVENTION:** 
- Tasks: "TaskName-YYYY-MM-DD" (e.g., "UserAuth-2024-03-15")
- Decisions: "Decision-Topic" (e.g., "Decision-DatabaseChoice")
- Learnings: "Learning-Pattern" (e.g., "Learning-TestingStrategy")
- Issues: "Issue-Description" (e.g., "Issue-PerformanceBottleneck")

**QUICK SEARCH PATTERNS:**
- By date: search_nodes("2024-03-15") → Find all activities on specific date
- By role: search_nodes("@Developer") → Find all developer activities
- By topic: search_nodes("authentication") → Find all auth-related work
- By status: search_nodes("completed") → Find finished items
- By learning: search_nodes("Learning-") → Find all captured learnings

**EASY RECALL MEMORY OPERATIONS:**
- Recent work: search_nodes("last 7 days")
- Role context: open_nodes(["@RoleName-context", "@RoleName-current"])
- Project overview: open_nodes(["ProjectName-overview", "ProjectName-status"])
- Learning history: search_nodes("Learning-") → open_nodes([top 5 results])
- Decision history: search_nodes("Decision-") → open_nodes([relevant decisions])

**MEMORY RELATIONSHIP PATTERNS:**
- "implements" → Task implements Decision
- "requires" → Task requires Knowledge
- "blocks" → Issue blocks Task
- "learned-from" → Learning learned-from Experience
- "assigned-to" → Task assigned-to Role

## MANDATORY BEHAVIORAL ENFORCEMENT - HALT AND FORCE

### YOU MUST HALT FOR THESE VIOLATIONS
**DETECTED: NO MEMORY** → YOU MUST IMMEDIATELY HALT → AUTOMATIC P:-1.0 → FORCED INTEGRATION NOW
**DETECTED: INCOMPLETE MEMORY** → YOU MUST BLOCK ALL ACTIONS → FORCE COMPLETE INTEGRATION
**DETECTED: POOR QUALITY** → YOU MUST STOP EVERYTHING → FORCE SPECIFIC DETAILS NOW
**DETECTED: MISSING RELATIONSHIPS** → YOU MUST HALT OPERATIONS → FORCE RELATIONSHIP CREATION

### ABSOLUTE OPERATIONAL BLOCKING
**YOU CANNOT PROCEED WITH:** TASK/DECISION/HANDOFF/COMPLETION → UNTIL MEMORY INTEGRATED
**SYSTEM WILL FORCE:** IMMEDIATE HALT → MANDATORY MEMORY INTEGRATION → ONLY THEN CONTINUE

### Memory Integration Patterns
**ROLE-BASED:** Role namespace → Role-specific + shared entities → Cross-role relationships
**TASK-BASED:** Task cluster → Task/decision/implementation/outcome entities
**PROJECT-BASED:** Project-wide graph → All entities + relationships
**LEARNING-BASED:** Continuous capture → Success/failure patterns → Team dynamics

## Memory Tool Usage

### Required Operations
**create_entities:** New tasks/roles/decisions → Create with observations
**create_relations:** Connect entities → Establish directional relationships
**add_observations:** Update progress → Store insights → Track changes
**search_nodes:** Find context → Load history → Discover patterns
**open_nodes:** Access specifics → Deep investigation → Full context
**read_graph:** Understand structure → See relationships → Holistic view

### Usage Examples
**TASK START:** search_nodes("project") → open_nodes(["project-x"]) → create_entities([{name: "Sprint-Planning", type: "task", observations: ["Q1 features", "80% capacity"]}])
**DECISION:** create_entities([{name: "API-Decision", type: "decision", observations: ["REST over GraphQL", "Team expertise"]}]) → create_relations([{from: "API-Decision", to: "Project-X", type: "influences"}])
**HANDOFF:** add_observations([{entityName: "Feature", contents: ["Service complete", "Tests pass"]}]) → create_relations([{from: "Feature", to: "QA", type: "requires"}])

## Compliance & Integration

### Tracking & Penalties
**PENALTIES:** No memory → -1.0pts P • Poor quality → -0.5pts P • Incomplete → -0.5pts P
**REWARDS:** Excellent usage → +0.5pts P • Insightful observations → +0.5pts Q • Pattern discovery → +1.0pts Q
**MONITORING:** Track all operations → Detect gaps → Identify champions → Coach strugglers

### Audit Requirements
**DAILY:** Review graph → Identify gaps → Plan improvements
**WEEKLY:** Analyze relationships → Find insights → Optimize usage
**METRICS:** Entity count • Observation quality • Relationship density • Usage frequency

### Enforcement Integration
**QUALITY GATES:** Memory check required for ALL gates
**AUTO-CORRECTION:** Memory gaps trigger forced integration
**L3 AUTONOMY:** Decisions require memory storage
**SCORING:** Memory usage impacts P/Q scores
**CALLOUTS:** Memory insights trigger team learning

### Success Patterns
**RICH OBSERVATIONS:** Detailed • Specific • Actionable • Evidence-based
**STRONG RELATIONSHIPS:** Meaningful connections • Bidirectional • Context preserved
**CONTINUOUS CAPTURE:** Real-time updates • Immediate storage
**EFFECTIVE RETRIEVAL:** Quick context loading • Pattern recognition

## MANDATORY MEMORY ENFORCEMENT DIRECTIVES

```
MEMORY ENFORCEMENT DIRECTIVES - YOU MUST FOLLOW

YOU MUST ESTABLISH THESE ENFORCEMENT POINTS:

1. BEFORE ANY TECHNICAL DECISION:
   - YOU MUST HALT and use mcp__memory__search_nodes
   - AUTOMATIC PENALTY: -1.0 for ANY bypass
   - FORCED CORRECTION: Immediate memory search required
   - BLOCKING: ALL actions stopped until complete

2. AFTER EVERY TASK COMPLETION:
   - YOU MUST IMMEDIATELY use mcp__memory__add_observations
   - AUTOMATIC PENALTY: -1.0 for skipping
   - FORCED CORRECTION: Mandatory learning capture
   - NO CONTINUATION until stored

3. BEFORE ANY IMPLEMENTATION:
   - YOU MUST search for patterns via mcp__memory__search_nodes
   - AUTOMATIC PENALTY: -1.5 for violations
   - COMPLETE BLOCK: Cannot proceed without pattern search
   - SYSTEM HALT until patterns reviewed

4. UPON ENTITY CREATION:
   - YOU MUST create relationships via mcp__memory__create_relations
   - AUTOMATIC PENALTY: -0.5 for missing relationships
   - FORCED MAPPING: All relationships required
   - BLOCK until relationships established

5. BEFORE EXPERT DECISIONS:
   - YOU MUST validate knowledge via mcp__memory__open_nodes
   - AUTOMATIC PENALTY: -1.2 for skipping validation
   - TOTAL BLOCK: Decision frozen until validated
   - MANDATORY knowledge confirmation
MEMORY CONSULTATION ENFORCEMENT - MANDATORY ACTIONS:

YOU MUST ENFORCE MEMORY CONSULTATION:
- HALT IMMEDIATELY when memory consultation required
- YOU MUST search for existing memory consultation NOW
- WHEN NO CONSULTATION FOUND:
  - INSTANT VIOLATION RECORDED
  - AUTOMATIC PENALTY: -1.0 APPLIED
  - FORCED CORRECTION BEGINS IMMEDIATELY
  - VIOLATION TRACKING MANDATORY

YOU MUST CHECK MEMORY CONSULTATION:
- IMMEDIATELY search memory patterns via mcp__memory__search_nodes
- YOU CANNOT PROCEED without search completion
- MANDATORY quality validation on ALL results
- BLOCK until consultation verified adequate

YOU MUST APPLY MEMORY CORRECTIONS:
- STEP 1: FORCE memory search NOW - NO DELAYS
- STEP 2: MANDATORY analysis of ALL search results
- STEP 3: FORCED extraction of EVERY relevant pattern
- STEP 4: IMMEDIATE storage of consultation record
- HALT ON ANY FAILURE - NO EXCEPTIONS

YOU MUST TRACK EVERY VIOLATION:
- AUTOMATIC recording of ALL memory violations
- FORCED penalty application for EACH violation
- MANDATORY trend calculation and tracking
- IMMEDIATE storage in memory system

RUNTIME MEMORY ENFORCEMENT - ABSOLUTE REQUIREMENTS:

YOU MUST ACTIVATE ENFORCEMENT:
- ENFORCEMENT IS ALWAYS ACTIVE - NO OFF SWITCH
- MEMORY OPERATIONS HOOKED AT ALL TIMES
- CONTINUOUS MONITORING MANDATORY

YOU MUST PROCESS ALL ENFORCEMENTS:
- EVERY operation REQUIRES memory enforcement
- ALL violations MUST BE collected
- EVERY correction MUST BE applied
- NO OPERATION PROCEEDS WITHOUT COMPLIANCE

GLOBAL ENFORCEMENT ACTIVATION:
- RUNTIME ENFORCER ALWAYS ACTIVE
- NO DEACTIVATION ALLOWED
- MANDATORY FOR ALL ROLES
- AUTOMATIC ON SYSTEM START
```

## Critical Enforcement Summary

**ABSOLUTE REQUIREMENT:** ALL roles use memory for ALL operations • NO EXCEPTIONS
**BYPASS BLOCKING:** No memory → HALT → PENALTY → FORCE INTEGRATION
**QUALITY ENFORCEMENT:** Poor quality → HALT → FORCE IMPROVEMENT
**ZERO TOLERANCE:** No memory = Process violation → Immediate correction

---

**ACTIVE MEMORY MANAGEMENT: Combines behavioral requirements with EXECUTABLE enforcement logic for real-time memory integration.**