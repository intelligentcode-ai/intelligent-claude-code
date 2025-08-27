# PRB Enforcement

**MANDATORY:** Use PRB system with templates for all work. Block direct execution.

## Imports
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md

## Core Rules

### Creation vs Execution
**CREATION:** Main agent (Stories/Bugs/EPICs/PRBs, templates, config)
**EXECUTION:** Subagent (PRB implementation, file ops, git)

### Detection & Blocking
**WORK INTENT:** implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
**INFORMATION REQUEST:** Questions with what, how, why, should, can, will + @Role questions

### Template Enforcement (ZERO TOLERANCE)
- Manual PRB creation → BLOCK → "Use src/prb-templates/"
- Unresolved placeholders → BLOCK → "Resolve all placeholders"
- Runtime config lookup → BLOCK → "Embed config values"
- Wrong template source → BLOCK → "Use src/prb-templates/ only"

### Direct Execution Blocking

#### Main Scope Execution Prevention
**MANDATORY:** ALL work execution must follow PRB+agent pattern. Direct main scope execution is BLOCKED.

```
❌ MAIN SCOPE EXECUTION BLOCKED: All work requires PRB+agent execution
VIOLATION: Detected work intent without active PRB context
REQUIRED ACTION: Use @Role pattern to generate PRB first

Examples:
- @AI-Engineer implement this feature
- @Developer fix this bug  
- @DevOps-Engineer deploy the application
- @Database-Engineer optimize queries

Process: User Request → PRB Generation → Agent Execution
```

#### Comprehensive Blocking Patterns
**BLOCK ALL:** Main scope implementation attempts
- Direct file creation/modification without PRB
- Direct system configuration without PRB
- Direct deployment operations without PRB
- Direct code changes without PRB

**ERROR MESSAGING:**
```
❌ ARCHITECTURE VIOLATION: Main scope work execution forbidden
SYSTEM DESIGN: Work requests → PRB creation → Subagent execution
CORRECTIVE ACTION: Generate PRB using @Role pattern before proceeding
BLOCKING REASON: Maintains architectural integrity and execution traceability
```

#### Implementation Commitment Detection
**TRIGGER BLOCKING FOR:**
- Action verbs indicating work commitment (implement, create, build, fix, deploy)
- File operation requests (create file, modify file, configure system)
- @Role assignments with work context (@Role implement/fix/deploy)
- System modification requests (install, update, configure, setup)

**ALLOW THROUGH:**
- Pure information requests (show, explain, describe, analyze)
- Status inquiries (what's the status, how is progress)
- Planning discussions without implementation commitment
- Architecture consultations without immediate execution

## Auto-Correction
| Violation | Action |
|-----------|--------|
| Manual PRB creation | Force template usage |
| Missing template sections | Load complete template |
| Unresolved placeholders | Resolve all placeholders |
| Runtime config lookup | Embed config values |
| PRB >15 points | Auto-breakdown |
| Wrong role assignment | PM+Architect collaboration |

## Pattern Detection
**@Role mentions** → Generate PRB → Subagent execution
**Work items (STORY-XXX, BUG-XXX)** → Convert to PRB → Execute
**Direct work** → Block → Generate PRB

## System Nature Validation
**AI-AGENTIC:** @AI-Engineer for behaviors, memory, PRBs
**CODE-BASED:** @Developer, @Backend-Tester for implementation
**Mismatch:** Enforce PM+Architect collaboration

## Quality Gates
**Pre-Creation:** Template compliance, context completeness, role assignment
**Runtime:** Execution monitoring, quality maintenance, adaptation handling
**Post-Execution:** Completion verification, quality assessment, learning capture

---
*Core PRB enforcement with blocking and auto-correction*