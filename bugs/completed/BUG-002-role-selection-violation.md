# BUG-002: Critical Role Selection Violation - Ignoring Project Scope and Architect Collaboration

**Status:** Completed  
**Completion Date:** 2025-01-09
**Fixed In:** PR #52  
**Priority:** CRITICAL  
**Reported:** 2025-01-09  
**Reporter:** User  

## Summary
System is violating MANDATORY role selection process by:
1. Selecting roles without considering PROJECT SCOPE (AI-Agentic Markdown-Based System)
2. Bypassing REQUIRED PM + Specialist Architect collaboration
3. Assigning inappropriate roles for the system nature

## Description
The intelligent-claude-code system is an **AI-AGENTIC MARKDOWN-BASED SYSTEM**, yet role assignments are being made as if it were a traditional code-based system. Additionally, the MANDATORY PM + Architect collaboration process is being completely bypassed.

### Critical Violations Observed
1. **@Security-Engineer assigned to AI-agentic behavioral patterns** (should be @AI-Engineer)
2. **Direct role assignment without PM + Architect process**
3. **Ignoring system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM"**
4. **No specialist architect domain expert selection**

### Current Behavior
- Roles assigned directly based on surface-level keywords
- No consideration of project scope or system nature
- Architect collaboration completely bypassed
- Wrong domain experts selected

### Expected Behavior
According to `behaviors/story-breakdown.md` and `behaviors/prb-creation-mandates.md`:
1. **PM MUST analyze work requirements first**
2. **PM MUST select appropriate architect domain expert**:
   - @AI-Engineer for: AI/ML, behavioral systems, agentic workflows
   - @System-Engineer for: Infrastructure, deployment, system operations
   - @Security-Engineer for: Security reviews, compliance, vulnerability analysis
   - @Architect for: General architecture, complex multi-domain projects
3. **PM + Architect MUST jointly determine role assignment**
4. **Assignment MUST consider project scope (AI-Agentic Markdown-Based)**
5. **Document collaboration and rationale in PRB**

## Impact
- **Critical**: Wrong specialists working on wrong domains
- **Efficiency**: AI-agentic patterns handled by non-AI specialists
- **Quality**: Behavioral patterns not properly understood or implemented
- **Compliance**: Violates mandatory behavioral patterns

## Root Cause Analysis
The role assignment enforcement in `prb-creation-mandates.md` is either:
1. Not being loaded/applied during PRB creation
2. Being overridden by incorrect logic
3. Missing validation for PM + Architect collaboration

## Reproduction Steps
1. Request PRB creation for any AI-agentic behavioral work
2. Observe role assignment without PM + Architect collaboration
3. See inappropriate role selection (e.g., Security-Engineer for behavioral patterns)

## Proposed Solution
1. **ENFORCE** PM + Architect collaboration check in PRB generation
2. **BLOCK** any PRB creation without documented architect selection
3. **VALIDATE** role assignments match system nature
4. **AUTO-CORRECT** inappropriate role selections based on project scope
5. **REQUIRE** collaboration documentation in every PRB

## Acceptance Criteria
- [ ] NO PRB can be created without PM + Architect collaboration
- [ ] Architect selection MUST match work domain
- [ ] Role assignments MUST align with system nature (AI-Agentic)
- [ ] Every PRB documents collaboration process
- [ ] Validation blocks inappropriate role assignments
- [ ] Error messages clearly explain collaboration requirements

## Behavioral Pattern Updates Required
1. `behaviors/prb-creation-mandates.md` - Strengthen enforcement
2. `behaviors/prb-enforcement.md` - Add collaboration validation
3. `behaviors/story-breakdown.md` - Enforce architect selection
4. `behaviors/shared-patterns/context-validation.md` - Validate role appropriateness

## Examples of Correct Role Selection for AI-Agentic System
- **Behavioral patterns**: @AI-Engineer (NOT @Security-Engineer)
- **Memory operations**: @AI-Engineer (NOT @Database-Engineer)
- **PRB enforcement**: @AI-Engineer (NOT @DevOps-Engineer)
- **Virtual team coordination**: @AI-Engineer + @PM
- **Markdown processing**: @AI-Engineer (NOT @Developer)

## References
- Mandatory process: `behaviors/story-breakdown.md` - Role Assignment Process
- Enforcement: `behaviors/prb-creation-mandates.md` - Role Assignment Enforcement
- System nature: This is a MARKDOWN-BASED AI-AGENTIC SYSTEM