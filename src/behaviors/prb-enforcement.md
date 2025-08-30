# PRB Enforcement

**MANDATORY:** Use PRB system with templates for all work. Block direct execution.

## Imports
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md
@./shared-patterns/main-scope-blocking.md
@./shared-patterns/continuation-work-patterns.md

## Core Rules

### Creation vs Execution
**CREATION:** Main agent (Stories/Bugs/EPICs/PRBs, templates, config)
**EXECUTION:** Subagent (PRB implementation, file ops, git)

### Work Pattern Detection
**WORK INTENT:** Action verbs requiring PRB - implement, create, build, fix, update, modify, deploy, install, configure, delete, remove
**INFORMATION REQUEST:** Pure questions using what, how, why, should, can, will + @Role consultations without work commitment

### Template Enforcement
- Manual PRB creation → BLOCKED → "Use template hierarchy"
- Unresolved placeholders → BLOCKED → "Resolve all placeholders" 
- Runtime config lookup → BLOCKED → "Embed config values"
- Wrong template source → BLOCKED → "Use template hierarchy only"

### Main Scope Work Blocking

**NUCLEAR ENFORCEMENT:** ZERO TOLERANCE for main scope work execution.

**BLOCKED ACTIONS:** All work execution in main scope including:
- Direct file operations without PRB
- System configuration without PRB
- Code changes without PRB
- Any implementation without PRB context

**ERROR MESSAGE:**
```
MAIN SCOPE EXECUTION BLOCKED
ARCHITECTURAL RULE: ALL WORK → PRB → AGENT EXECUTION
REQUIRED ACTION: Generate PRB using @Role pattern first
```

### Tool Access Control

**BLOCKED TOOLS IN MAIN SCOPE:**
- Edit, MultiEdit, Write tools for modifications
- Bash tool for system changes (read-only allowed)

**BLOCKING CONDITIONS:**
- Work intent detected
- Main scope context (not in active PRB)
- No PRB authorization

**AUTHORIZED TOOLS:**
- Read operations (Read, LS, Glob, Grep) always allowed
- Configuration loading and memory search

### Auto-Generation Trigger

**WHEN BLOCKED:** Automatically trigger PRB generation
1. Detect blocked work attempt
2. Capture user requirements
3. Generate appropriate PRB
4. Execute via Task tool subagent

## Auto-Correction Patterns

| Violation | Action |
|-----------|--------|
| Manual PRB creation | Force template usage |
| Missing template sections | Load complete template |
| Unresolved placeholders | Resolve placeholders |
| Runtime config lookup | Embed config values |
| PRB exceeds 15 points | Auto-breakdown |
| Wrong role assignment | PM+Architect collaboration |

## Pattern Detection Rules

**@Role mentions** → Generate PRB → Subagent execution
**Work items** → Convert to PRB → Execute
**Direct work** → Block → Generate PRB

## System Nature Validation

**AI-AGENTIC:** @AI-Engineer for behaviors, memory, PRBs
**CODE-BASED:** @Developer, @Backend-Tester for implementation
**HYBRID:** PM+Architect collaboration for role selection

## Execution Controls

### Proportional Response
**MANDATORY:** Match response complexity to request complexity

**SIMPLE REQUESTS:** Single action, specific target, focused intent
**SIMPLE RESPONSE:** Perform only requested action, no scope expansion

**BLOCKED EXPANSION:**
- "While I'm at it..." patterns
- Unrequested improvements
- Automatic feature additions

### File Generation Control

**BLOCKED:** Automatic file generation without explicit request
**ALLOWED:** Only when user explicitly requests file creation

**EXPLICIT REQUESTS:** "Create file...", "Write to file...", "Generate filename..."
**BLOCKED AUTOMATIC:** Summary files, temporary files, documentation without request

## Quality Gates

**Pre-Creation:** Template compliance, context completeness, role assignment
**Runtime:** Execution monitoring, quality maintenance
**Post-Execution:** Completion verification, learning capture

---
*Core PRB enforcement with blocking, auto-correction, and execution precision controls*