# Behavioral Decision Matrix

**MANDATORY:** Context-based behavioral decision system for consistent pattern following. Auto-correct violations.

## Purpose

**Token-efficient decision matrix** for resolving behavioral pattern inconsistencies and providing clear, consistent guidance for Claude's behavioral choices across all interaction patterns.

## Core Decision Hierarchy

**PRECEDENCE ORDER (Highest→Lowest):**
1. **Continuation Work** - Work after PRB completion triggers
2. **@Role Direct Execution** - Direct role assignments with work context
3. **Work→PRB Generation** - Work intent patterns requiring structured execution
4. **Simple Information Direct** - Straightforward information requests
5. **Complex→PRB Analysis** - Complex investigation requiring structured analysis

## Context-Based Complexity Evaluation

**CRITICAL:** Use CONTEXT analysis, not keyword matching for behavioral decisions.

### Context Factors for Complexity Assessment

**SIMPLE CONTEXT (Direct Response):**
- **Scope**: Single question, specific target, clear boundaries
- **Investigation Depth**: Surface-level information, existing knowledge
- **Decision Points**: None or single clear choice
- **Coordination**: Individual response, no role handoffs needed
- **Output**: Direct answer, status update, simple explanation

**COMPLEX CONTEXT (PRB Required):**
- **Scope**: Multiple components, system-wide impact, unclear boundaries
- **Investigation Depth**: Multi-layered analysis, research required
- **Decision Points**: Multiple trade-offs, architectural choices
- **Coordination**: Multiple roles, sequential work items
- **Output**: Implementation, structured analysis, multi-step process

### Context Evaluation Process

**STEP 1: Intent Analysis**
- **Information Request**: Seeking knowledge, status, explanation
- **Work Assignment**: Requesting action, implementation, change
- **Consultation**: Asking for advice, recommendations, guidance
- **Investigation**: Requiring analysis, research, structured thinking

**STEP 2: Complexity Scoring**
```
Context Factors (1-3 points each):
- scope_breadth: narrow/medium/broad
- investigation_depth: surface/moderate/deep
- decision_complexity: none/simple/complex
- coordination_needs: individual/team/system
- implementation_scope: info/single/multiple

Total Score: 5-15 points
Simple: 5-8 points → Direct response
Complex: 9-15 points → PRB generation
```

**STEP 3: Context Overrides**
- **@Role Direct**: Always bypasses complexity scoring
- **Explicit Work Request**: Always triggers PRB regardless of complexity
- **User Preference**: Respect explicit "just tell me" vs "implement this"

## Decision Logic Matrix

### 1. Continuation Work (HIGHEST PRECEDENCE)
**PATTERN**: Work continuation after PRB completion
**TRIGGERS**: test, validate, fix after PRB, npm test, pytest, lint, build
**ACTION**: Always generate PRB regardless of complexity score

### 2. @Role Direct Execution (HIGH PRECEDENCE)
**PATTERN**: "@Role [direct work assignment]"
**TRIGGERS**: @Developer implement feature, @DevOps deploy application, @AI-Engineer optimize behavior
**ACTION**: Immediate PRB generation → Task tool execution
**RATIONALE**: Clear role assignment with work context requires immediate structured execution

### 3. Work→PRB Generation (MEDIUM PRECEDENCE)
**PATTERN**: Work intent without explicit role assignment
**TRIGGERS**: Implementation (implement, create, build, develop), Modification (fix, update, modify, change), Operations (deploy, install, configure, setup)
**ACTION**: PRB generation → Appropriate role assignment → Task tool execution
**CONTEXT EVALUATION**: Any scope - Work intent always triggers PRB generation

### 4. Simple Information Direct (LOWER PRECEDENCE)
**PATTERN**: Information requests with simple context
**TRIGGERS**: Query (show, display, list, check), Knowledge (explain, describe, understand), Advisory (recommend, suggest)
**CONTEXT REQUIREMENTS**: scope_breadth ≤2, investigation_depth ≤2, decision_complexity ≤1, coordination_needs = 1, implementation_scope = 1
**ACTION**: Direct response with memory integration

### 5. Complex→PRB Analysis (TRIGGER PRECEDENCE)
**PATTERN**: Information requests requiring structured investigation
**TRIGGERS**: Multi-factor analysis questions, Architecture decision requests, System-wide impact assessments
**CONTEXT REQUIREMENTS**: Any factor = 3 OR total_context_score ≥9
**ACTION**: Generate investigation PRB → Structured analysis via appropriate agent

## Implementation Guidelines

### For Claude Behavioral Processing

**DECISION SEQUENCE:**
1. **Check Continuation Work**: Is this work continuation after PRB?
2. **Check @Role Direct**: Is this a direct role work assignment?
3. **Check Work Intent**: Does this contain implementation/modification intent?
4. **Evaluate Context Complexity**: Score context factors 1-15
5. **Apply Decision Logic**: Use matrix based on precedence and complexity
6. **Execute Action**: PRB generation, direct response, or structured analysis

**ERROR PREVENTION:**
- Never bypass work→PRB for implementation intent
- Always consider context over keyword matching
- Respect precedence hierarchy - higher precedence overrides lower
- Document decision rationale when complexity scoring is marginal

---
*Context-based behavioral decision matrix for consistent pattern following*