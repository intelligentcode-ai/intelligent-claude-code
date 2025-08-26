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
```
❌ DIRECT EXECUTION BLOCKED: Implementation work requires PRB
REQUIRED ACTION: Use @Role pattern to generate PRB first
Example: @AI-Engineer implement this feature
```

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