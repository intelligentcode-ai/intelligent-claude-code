# BUG-011: Hardcoded Specialist Architect Roles

**Status:** Completed  
**Priority:** CRITICAL  
**Reported:** 2025-08-09  
**Reporter:** User  

## Summary
The system has HARDCODED specialist architect roles in specialists.md, which violates the fundamental principle that specialist roles should be created DYNAMICALLY based on project scope.

## Description
The latest changes incorrectly added predefined specialist architects (@AI-Architect, @React-Architect, etc.) to the specialists.md file. This is fundamentally WRONG because:
1. Specialist roles should be identified BASED ON PROJECT SCOPE
2. They should be created DYNAMICALLY when needed
3. The system should work for ANY project without assumptions
4. We can't predict what specialist architects might be needed

### Current Behavior (WRONG)
- Hardcoded list of specialist architects in specialists.md
- Assumes certain project types will exist
- Violates the generic nature of the system
- Limits flexibility for unknown project types

### Expected Behavior (CORRECT)
- PM analyzes project scope from CLAUDE.md
- PM identifies needed specialist architect
- If <70% match with existing roles, CREATE dynamically
- No predefined specialist architects
- Fully adaptive to ANY project type

## Impact
- **CRITICAL**: Violates core system principle of being generic
- **CRITICAL**: Introduces assumptions about project types
- **HIGH**: Limits system flexibility
- **HIGH**: Contradicts dynamic specialist creation principle

## Root Cause
Misunderstanding of how specialist architects should work - they should be DISCOVERED and CREATED based on need, not predefined.

## Evidence
- specialists.md now contains hardcoded architect types
- System assumes certain project types (React, Database, etc.)
- Violates the <70% match → create specialist rule

## Proposed Solution
1. REMOVE all hardcoded specialist architects from specialists.md
2. Keep ONLY the 14 core roles
3. Implement proper dynamic creation in PM behavior
4. Specialist architects created on-demand based on project

## Acceptance Criteria
- [ ] No hardcoded specialist architects in specialists.md
- [ ] PM creates specialists dynamically based on project
- [ ] <70% match rule properly implemented
- [ ] System works for ANY project type without assumptions
- [ ] Specialist creation is truly dynamic

## Priority Justification
CRITICAL because this violates the fundamental design principle that the system is GENERIC and adaptive to ANY project type without assumptions.