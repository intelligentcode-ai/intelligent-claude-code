# Behavioral Decision Matrix

**MANDATORY:** Context-based behavioral decision system for consistent pattern following. Auto-correct violations.

## Purpose

**Token-efficient decision matrix** for resolving behavioral pattern inconsistencies and providing clear, consistent guidance for Claude's behavioral choices across all interaction patterns.

## Core Decision Hierarchy

**PRECEDENCE ORDER (Highest→Lowest):**
1. **@Role Direct Execution** - Direct role assignments with work context
2. **Work→PRB Generation** - Work intent patterns requiring structured execution
3. **Simple Information Direct** - Straightforward information requests
4. **Complex→PRB Analysis** - Complex investigation requiring structured analysis

## Context-Based Complexity Evaluation

**CRITICAL:** Use CONTEXT analysis, not keyword matching for behavioral decisions.

### Context Factors for Complexity Assessment

**SIMPLE CONTEXT (Direct Response):**
- **Scope:** Single question, specific target, clear boundaries
- **Investigation Depth:** Surface-level information, existing knowledge
- **Decision Points:** None or single clear choice
- **Coordination:** Individual response, no role handoffs needed
- **Output:** Direct answer, status update, simple explanation

**COMPLEX CONTEXT (PRB Required):**
- **Scope:** Multiple components, system-wide impact, unclear boundaries
- **Investigation Depth:** Multi-layered analysis, research required
- **Decision Points:** Multiple trade-offs, architectural choices
- **Coordination:** Multiple roles, sequential work items
- **Output:** Implementation, structured analysis, multi-step process

### Context Evaluation Process

**STEP 1: Intent Analysis**
- **Information Request:** Seeking knowledge, status, explanation
- **Work Assignment:** Requesting action, implementation, change
- **Consultation:** Asking for advice, recommendations, guidance
- **Investigation:** Requiring analysis, research, structured thinking

**STEP 2: Complexity Scoring**
```yaml
Context Factors:
  scope_breadth: 1-3 (narrow/medium/broad)
  investigation_depth: 1-3 (surface/moderate/deep) 
  decision_complexity: 1-3 (none/simple/complex)
  coordination_needs: 1-3 (individual/team/system)
  implementation_scope: 1-3 (info/single/multiple)

Total Score: 5-15 points
Simple: 5-8 points → Direct response
Complex: 9-15 points → PRB generation
```

**STEP 3: Context Overrides**
- **@Role Direct:** Always bypasses complexity scoring
- **Explicit Work Request:** Always triggers PRB regardless of complexity
- **User Preference:** Respect explicit "just tell me" vs "implement this"

## Decision Logic Matrix

### 1. @Role Direct Execution (HIGHEST PRECEDENCE)

**PATTERN:** "@Role [direct work assignment]"

**TRIGGERS:**
- `@Developer implement feature X`
- `@DevOps deploy application Y`
- `@AI-Engineer optimize behavior Z`

**ACTION:** Immediate PRB generation → Task tool execution
**RATIONALE:** Clear role assignment with work context requires immediate structured execution

**IMPLEMENTATION:**
```yaml
if: "@Role" + work_verb + specific_target
then: generate_prb() → task_tool_execution()
bypass: complexity_evaluation, information_checks
```

### 2. Work→PRB Generation (HIGH PRECEDENCE)

**PATTERN:** Work intent without explicit role assignment

**TRIGGERS:**
- Implementation: implement, create, build, develop, code, write
- Modification: fix, update, modify, change, refactor, enhance  
- Operations: deploy, install, configure, setup, migrate
- Maintenance: delete, remove, clean, archive

**CONTEXT EVALUATION:**
- **Any Scope:** Work intent always triggers PRB generation
- **Override Simple:** Even simple work requires PRB for traceability
- **No Exceptions:** All implementation work follows PRB→agent pattern

**ACTION:** PRB generation → Appropriate role assignment → Task tool execution

**IMPLEMENTATION:**
```yaml
if: work_verb_detected + implementation_intent
then: analyze_complexity() → select_template() → generate_prb()
bypass: direct_response_options
```

### 3. Simple Information Direct (MEDIUM PRECEDENCE)

**PATTERN:** Information requests with simple context

**TRIGGERS:**
- Query: show, display, list, check, status
- Knowledge: explain, describe, understand, clarify
- Advisory: recommend, suggest, what would you do

**CONTEXT REQUIREMENTS:**
```yaml
scope_breadth: ≤2 (narrow to medium)
investigation_depth: ≤2 (surface to moderate)  
decision_complexity: ≤1 (none to simple)
coordination_needs: 1 (individual response)
implementation_scope: 1 (information only)
```

**ACTION:** Direct response with memory integration
**RATIONALE:** Simple information requests don't require structured execution

**IMPLEMENTATION:**
```yaml
if: information_request + simple_context_score ≤8
then: search_memory() → direct_response()
exclude: work_intent, complex_analysis_needs
```

### 4. Complex→PRB Analysis (TRIGGER PRECEDENCE)

**PATTERN:** Information requests requiring structured investigation

**TRIGGERS:**
- Multi-factor analysis questions
- Architecture decision requests  
- System-wide impact assessments
- Investigation requiring multiple perspectives
- Bug analysis and root cause investigation

**CONTEXT REQUIREMENTS:**
```yaml
Any of:
  scope_breadth: 3 (broad system impact)
  investigation_depth: 3 (deep analysis required)
  decision_complexity: 3 (complex trade-offs)
  coordination_needs: ≥2 (multiple roles/perspectives)
  
OR total_context_score: ≥9
```

**ACTION:** Generate investigation PRB → Structured analysis via appropriate agent
**RATIONALE:** Complex questions benefit from structured thinking and documentation

**IMPLEMENTATION:**
```yaml
if: information_request + complex_context_score ≥9
then: generate_investigation_prb() → structured_analysis()
rationale: "Complex analysis benefits from PRB structure"
```

## Contradiction Resolution

### Current Pattern Conflicts Resolved

**CONFLICT 1: @Role Questions vs @Role Work**
- **OLD:** Inconsistent handling of @Role mentions
- **NEW:** Clear distinction: Questions→conversation, Work assignments→PRB

**CONFLICT 2: Simple Work Direct vs Work→PRB**  
- **OLD:** Confusion about when to generate PRBs for simple tasks
- **NEW:** ALL work intent triggers PRB (consistency and traceability)

**CONFLICT 3: Information vs Investigation**
- **OLD:** Keyword-based detection missing context nuances
- **NEW:** Context-based complexity evaluation with clear thresholds

**CONFLICT 4: ASK vs DEMAND Classification**
- **OLD:** Overlapping patterns causing decision conflicts  
- **NEW:** Hierarchical precedence with clear context evaluation

## Implementation Guidelines

### For Claude Behavioral Processing

**DECISION SEQUENCE:**
1. **Check @Role Direct:** Is this a direct role work assignment?
2. **Check Work Intent:** Does this contain implementation/modification intent?
3. **Evaluate Context Complexity:** Score context factors 1-15
4. **Apply Decision Logic:** Use matrix based on precedence and complexity
5. **Execute Action:** PRB generation, direct response, or structured analysis

**ERROR PREVENTION:**
- **Never bypass work→PRB** for implementation intent
- **Always consider context** over keyword matching
- **Respect precedence hierarchy** - higher precedence overrides lower
- **Document decision rationale** when complexity scoring is marginal

### Token-Efficient Usage

**QUICK DECISION CHECKLIST:**
```yaml
@Role + work_verb + target? → PRB generation
work_verb (implement/fix/deploy)? → PRB generation  
info_request + simple_context? → Direct response
info_request + complex_context? → Investigation PRB
```

**CONTEXT SCORING SHORTCUTS:**
- Multiple files/systems = complex
- Single question/status = simple
- Trade-off decisions = complex
- Factual queries = simple

## Integration Points

### With Existing Patterns

**PRB Enforcement:** References this matrix for consistent decision making
**PRB Auto-Trigger:** Uses context evaluation logic for trigger decisions
**Enforcement Rules:** Aligns blocking mechanisms with decision hierarchy

### Memory Integration

**DECISION PATTERN STORAGE:**
- Store successful decision applications
- Track context evaluation accuracy
- Learn from behavioral choice outcomes
- Refine complexity scoring based on results

### Configuration Override

**PROJECT-SPECIFIC DECISIONS:**
- Projects can override complexity thresholds via CLAUDE.md
- Context factor weights adjustable per project needs
- Precedence hierarchy remains consistent across all projects

---
*Context-based behavioral decision matrix for consistent pattern following*