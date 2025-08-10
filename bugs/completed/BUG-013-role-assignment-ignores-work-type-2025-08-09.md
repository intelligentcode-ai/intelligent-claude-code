# BUG-013: Role Assignment Ignores Actual Work Type

**Status:** Completed  
**Priority:** CRITICAL  
**Reported:** 2025-08-09  
**Reporter:** User  

## Summary
The system is NOT properly considering BOTH project scope AND actual work type when assigning roles. It's defaulting to project-type roles without analyzing what the actual work requires.

## Description
Role assignment is FAILING because it only considers project scope (AI-AGENTIC SYSTEM) and blindly assigns @AI-Engineer to everything, without analyzing whether the work is:
- DevOps/CI/CD configuration → Should be @DevOps-Engineer
- Security/vulnerability work → Should be @Security-Engineer  
- Database operations → Should be @Database-Engineer
- Infrastructure work → Should be @System-Engineer

### Current Behavior (WRONG)
- System sees "AI-AGENTIC SYSTEM" project scope
- Automatically assigns @AI-Engineer to ALL work
- Ignores the actual nature of the work being done
- Results in wrong specialist doing wrong type of work

### Expected Behavior (CORRECT)
- System identifies project scope (AI-AGENTIC, CODE-BASED, etc.)
- ALSO analyzes the specific work requirements
- Selects role based on BOTH factors:
  - Project context provides domain understanding
  - Work type determines required expertise
- Right specialist for right work

## Evidence
- BUG-012 PRB initially assigned to @AI-Engineer
- Work was clearly DevOps (git hooks, CI/CD workflows)
- Should have been @DevOps-Engineer from the start
- Pattern repeats across multiple PRBs

## Impact
- **CRITICAL**: Wrong specialists assigned to work
- **CRITICAL**: Work approached with wrong expertise
- **HIGH**: Inefficient execution and confusion
- **HIGH**: Violates specialist expertise principles

## Root Cause
The PM + Architect collaboration is not properly analyzing:
1. **Project Scope**: What kind of system is this?
2. **Work Type**: What expertise does THIS SPECIFIC WORK need?
3. **Role Selection**: Who has the right skills for THIS work?

Instead, it's just pattern-matching on project type alone.

## Examples of Correct Assignment
For an AI-AGENTIC SYSTEM project:
- **Behavioral pattern updates** → @AI-Engineer (AI work in AI project)
- **Git hooks and CI/CD** → @DevOps-Engineer (DevOps work in AI project)
- **Security vulnerabilities** → @Security-Engineer (Security work in AI project)
- **Database schema** → @Database-Engineer (Database work in AI project)
- **Infrastructure setup** → @System-Engineer (Infrastructure work in AI project)

## Proposed Solution
1. PM must analyze BOTH scope AND work type
2. Create decision matrix:
   - Row: Project scope/context
   - Column: Work type/expertise needed
   - Cell: Appropriate role
3. Document role selection rationale in PRB
4. Validate role has expertise for specific work

## Acceptance Criteria
- [ ] Role assignment considers project scope
- [ ] Role assignment ALSO considers work type
- [ ] Correct specialist selected for actual work
- [ ] Decision rationale documented in PRB
- [ ] No more blind @AI-Engineer assignments

## Priority Justification
CRITICAL because every PRB will have wrong role assignments until this two-factor analysis is implemented, resulting in wrong expertise applied to work.