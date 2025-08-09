# BUG-003: MAJOR - Role Assignments in Bugs/Stories Violates Separation of Concerns

**Status:** Completed
**Completion Date:** 2025-01-09
**Fixed In:** PR #51
**Priority:** CRITICAL  
**Reported:** 2025-01-09  
**Reporter:** User  

## Summary
Bugs and Stories contain role assignments, violating the fundamental principle that WHO does the work should be determined during PRB creation by PM + Architect collaboration, not predetermined in the work items.

## Description
The system is placing "Assigned:" fields with specific roles in Bug and Story templates. This is a MAJOR architectural violation because:

1. **Stories/Bugs define WHAT**: The problem or feature requirement
2. **PRBs define WHO and HOW**: Role assignment happens during PRB creation
3. **PM + Architect decide WHO**: Based on complexity, system nature, and expertise needed

### Critical Violation
**Current State:**
```markdown
# BUG-001
**Assigned:** @AI-Engineer, @System-Engineer  ← WRONG! Should not be here!
```

**Correct State:**
```markdown
# BUG-001
[No role assignment - just problem description]
```

### Why This Matters
1. **Premature Assignment**: Can't know who's best until PM + Architect analyze
2. **Context Missing**: Role selection needs full understanding of:
   - System nature (AI-Agentic vs Code-based)
   - Complexity assessment
   - Available specialists
   - Current workload
3. **Process Bypass**: Predetermined roles bypass mandatory collaboration
4. **Wrong Assumptions**: Story writer shouldn't assume who implements

## Impact
- **Process Violation**: Bypasses PM + Architect collaboration
- **Wrong Specialists**: Predetermined roles may be inappropriate
- **Confusion**: Conflicting assignments between Story and PRB
- **Accountability**: Unclear who actually makes role decisions

## Root Cause
The Bug/Story templates incorrectly include role assignment fields, and the system is populating them instead of leaving role assignment to the PRB creation phase.

## Expected Behavior
1. **Bugs**: Describe problem, impact, reproduction - NO roles
2. **Stories**: Describe feature, requirements, acceptance criteria - NO roles  
3. **PRB Creation**: PM + Architect analyze and assign appropriate roles
4. **Documentation**: PRB documents WHY specific roles were chosen

## Proposed Solution
1. **Remove** "Assigned:" field from all Bug templates
2. **Remove** role references from Story templates
3. **Update** @PM behavior to NOT add roles when creating bugs/stories
4. **Enforce** role assignment ONLY during PRB creation
5. **Validate** bugs/stories don't contain role assignments

## Acceptance Criteria
- [ ] Bug template has NO "Assigned:" field
- [ ] Story template has NO role assignments
- [ ] @PM creates bugs/stories without roles
- [ ] Role assignment happens ONLY in PRB creation
- [ ] PM + Architect collaboration documented in PRB
- [ ] Clear separation between WHAT (bug/story) and WHO (PRB)

## Correct Flow
```
Bug/Story (WHAT) → PM reads → PM + Architect analyze → Create PRB with roles (WHO)
```

NOT:
```
Bug/Story (WHAT + WHO) → PRB copies roles → Wrong specialist works on it
```

## Example of Correct Bug
```markdown
# BUG-001: System Exceeds Scope of Project
**Status:** Open  
**Priority:** Critical
**Reported:** 2025-01-09
**Reporter:** User
[NO ASSIGNED FIELD!]

## Summary
System attempts to write to ~/.claude directory...
```

## Example of Correct Story  
```markdown
# STORY-001: Add MCP Installation Support
**Status:** Ready
**Priority:** High
[NO ROLE ASSIGNMENTS!]

## Requirements
[Just requirements, no mention of who implements]
```

## References
- Violation of: `behaviors/story-breakdown.md` - PM + Architect collaboration
- Violation of: `behaviors/prb-creation-mandates.md` - Role assignment process
- Separation of Concerns principle