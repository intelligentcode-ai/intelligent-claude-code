# BUG-008: PM Not Involving SPECIALIST Architect for Role Assignment

**Status:** Completed  
**Priority:** CRITICAL  
**Reported:** 2025-08-09  
**Reporter:** User  

## Summary
PM is NOT collaborating with the appropriate SPECIALIST Architect based on the ACTUAL project scope and work item requirements. Generic @Architect is used instead of domain-specific specialist architects.

## Description
The PM + Architect collaboration process is FAILING to:
1. Identify WHAT the actual project/work is about (React app? AI behavioral system? Database design? Infrastructure?)
2. Select the SPECIALIST Architect for THAT specific domain (@React-Architect for React, @AI-Architect for AI systems, @Database-Architect for data, etc.)
3. Have that SPECIALIST Architect determine appropriate roles based on the ACTUAL work requirements

### Current Behavior (WRONG)
- PM uses generic @Architect regardless of project domain
- Wrong roles assigned because specialist architect not involved
- PRBs created without domain expertise
- Mismatched approach to work requirements

### Expected Behavior (CORRECT)
- PM identifies the PROJECT DOMAIN from context/requirements
- PM selects SPECIALIST Architect for that domain
- SPECIALIST Architect determines appropriate roles
- PRBs reflect correct domain understanding
- Right expertise applied to right problems

## Impact
- **CRITICAL**: Wrong specialist assigned for work
- **CRITICAL**: Work approached with wrong mindset
- **HIGH**: Creates confusion about project purpose
- **HIGH**: Produces ineffective PRBs

## Root Cause Analysis
The PM + Architect collaboration process is broken because:
1. PM doesn't identify the actual project domain before selecting architect
2. Generic @Architect used instead of domain-specific specialist
3. Without specialist architect, wrong roles get assigned
4. The system can work on ANY type of project but needs RIGHT specialist for each

## Reproduction Steps
1. Request work on any story/bug
2. PM + Architect collaborate to create PRB
3. Observe wrong role assignment (@Developer instead of @AI-Engineer)
4. Notice PRB has software development approach
5. See confusion about system nature throughout

## Evidence
- STORY-005 PRB assigned @Developer for AI instruction work
- PRB included time estimations
- PRB wanted to create NEW behaviors
- Focus on "implementation" instead of "instruction enhancement"

## Proposed Solution
PM + Architect collaboration must understand system nature BEFORE role assignment.

## Acceptance Criteria
- [ ] PM understands this is AI-AGENTIC SYSTEM
- [ ] Architect selection based on system nature
- [ ] @AI-Engineer selected for behavioral pattern work
- [ ] No software development terminology in PRBs
- [ ] No time estimations in PRBs
- [ ] Focus on enhancing existing behaviors

## Related Issues
- BUG-007: System initialization doesn't reinforce project scope
- System nature confusion throughout project

## Priority Justification
CRITICAL because every single PRB will have wrong role assignment until this is fixed, making all work approach the system incorrectly.