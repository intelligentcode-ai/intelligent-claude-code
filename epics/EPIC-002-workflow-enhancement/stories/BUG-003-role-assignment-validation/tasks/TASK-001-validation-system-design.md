# BUG-003 TASK-001 Role Assignment Validation System Design - COMPLETE

**Task:** Design Role Assignment Validation System  
**Assigned to:** @AI-Architect  
**Status:** COMPLETE  
**Date:** 2025-07-15 11:45:00

## Executive Summary

Designed comprehensive role assignment validation system that requires **mandatory PM + Specialist Architect triage** and prevents wrong specialist assignments through automated detection and approval gates.

## Validation System Architecture

### PHASE 1: MANDATORY TRIAGE (PM + Specialist Architect)
```yaml
TRIGGER: New story/bug creation
DETECTION: Auto-identify specialist architect needed based on work patterns
REQUIREMENT: BLOCK until PM + Specialist Architect complete joint triage
VALIDATION: Work necessity, specialist requirements, approach validation
```

### PHASE 2: TASK ASSIGNMENT VALIDATION
```yaml
DESIGN: Specialist Architect creates task breakdown with role assignments
CAPABILITY_MATCH: Validate >70% capability threshold for assignments
SPECIALIST_PREFERENCE: Block generic roles when specialists exist
BUSYWORK_PREVENTION: Block meaningless tasks without clear value
```

### PHASE 3: APPROVAL & EXECUTION
```yaml
APPROVAL: Joint PM + Specialist Architect approval required
LOCK: Assignment locked after approval
EXECUTION: Assignment file-driven workflow begins
TRACKING: Progress via file updates and scoring system
```

## Work Pattern Detection

### AI-Agentic Work Detection
**Keywords:** AI, ML, agentic, behavioral, automation, intelligence, neural, learning
**Patterns:** Files in behaviors/, modes/, AI-related functionality
**Required Specialist:** @AI-Architect (not generic @Architect)

### Infrastructure Work Detection  
**Keywords:** deployment, infrastructure, system, server, cloud, DevOps
**Patterns:** Infrastructure files, deployment scripts, system configuration
**Required Specialist:** @System-Architect

### Security Work Detection
**Keywords:** security, authentication, authorization, encryption, vulnerability
**Patterns:** Security reviews, compliance, credential management
**Required Specialist:** @Security-Architect

### Database Work Detection
**Keywords:** database, SQL, data, schema, migration, query
**Patterns:** Database files, data modeling, query optimization  
**Required Specialist:** @Database-Architect

## Integration with Lean Workflow

### Updated Outer Workflow
```yaml
1. Knowledge Retrieval
2. Work Type Detection → Auto-assign Specialist Architect
3. **MANDATORY TRIAGE**: PM + Specialist Architect joint validation
   - Validate work necessity and value
   - Confirm specialist requirements
   - Approve task breakdown approach
4. Task Breakdown Design (by Specialist Architect)
   - Create meaningful, specific tasks
   - Assign appropriate specialists (not generic roles)
   - Validate capability matching >70%
5. Role Assignment Validation
   - Block generic @Architect when @AI-Architect needed
   - Prevent wrong specialist assignments
   - Ensure domain expertise alignment
6. **APPROVAL GATE**: Joint PM + Specialist Architect approval required
7. Assignment File Creation → Execution begins
```

### Lean Workflow Executor Enhancement
```yaml
# New validation functions to add:
validate_work_type(content) → specialist_architect_type
require_triage(pm, specialist_architect) → triage_complete
validate_role_assignments(tasks) → validation_result
block_until_approved(pm, specialist_architect) → approval_status
detect_busywork(task_description) → meaningful_work_check
```

## Problem Resolution Examples

### Current Issues Fixed:
✅ **System-Engineer assigned AI work** → Auto-detects AI patterns, requires @AI-Architect
✅ **Generic @Architect used** → Enforces @AI-Architect for AI-agentic work
✅ **Meaningless "Test Role Switching"** → Triage validates task necessity and value
✅ **No PM-Architect collaboration** → Mandatory joint triage for all work

### Validation Rules:
1. **AI-agentic work MUST use @AI-Architect** (not generic @Architect)
2. **All stories/bugs require PM + Specialist Architect triage** before task creation
3. **No task assignments without >70% capability match** validation
4. **No meaningless busywork tasks** - triage must validate real value
5. **Approval gate blocks execution** until PM + Specialist Architect approve

## Implementation Requirements

### Core Components:
- **Work Pattern Detection Engine** - analyzes content for specialist requirements
- **Triage Template System** - structured PM + Specialist Architect collaboration
- **Assignment Validation Layer** - capability matching and specialist preference
- **Approval Gate Mechanism** - blocks execution until validation complete
- **Integration Points** - updates to lean-workflow-executor and workflow templates

### Success Criteria:
- Zero wrong specialist assignments (100% accuracy)
- All work validated by appropriate specialist architect
- No meaningless busywork tasks created
- Mandatory PM + Specialist Architect collaboration for all stories/bugs
- Seamless integration with existing lean workflow system

## Next Steps

Hand off to @AI-Engineer for TASK-002: Implementation in lean-workflow-executor.md

## Knowledge Captured

**Pattern:** Role assignment governance prevents expertise misapplication
**Learning:** Mandatory triage ensures both strategic and technical validation  
**Future:** Always require specialist architect input for domain-specific work

---
**DESIGN COMPLETE:** Comprehensive validation system prevents systemic assignment errors**