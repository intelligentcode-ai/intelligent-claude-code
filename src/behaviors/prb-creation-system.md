# PRB Creation System

**MANDATORY:** All PRB and work item creation via main agent with template compliance and placeholder resolution.

## Core Creation Rules

### Main Agent Only
**CRITICAL:** ALL work item creation MUST happen in main agent context:
- Stories, Bugs, EPICs, PRBs creation
- Template resolution with full context
- Configuration hierarchy access
- Complete project context gathering

**BLOCKED:** AGENTS CANNOT create work items due to isolated context limitations.

### Template Requirements
**MANDATORY:** Every PRB MUST use appropriate template from `src/prb-templates/`:
- `nano-prb-template.yaml` (0-2 points): Simple changes
- `tiny-prb-template.yaml` (3-5 points): Single-file work
- `medium-prb-template.yaml` (6-15 points): Multi-file features
- `large-prb-template.yaml` (16-30 points): Complex coordination
- `mega-prb-template.yaml` (30+ points): System-wide changes

### Placeholder Resolution
**COMPLETE RESOLUTION REQUIRED:**
- ALL placeholders resolved at generation time
- NO runtime config lookups
- Configuration values embedded in PRB
- Self-contained execution context

## Creation Process

### Template-First Generation
1. **Calculate Complexity**: Files + Lines + APIs + Security + Coordination
2. **Select Template**: Use complexity score for appropriate template
3. **Load Template**: From `src/prb-templates/` hierarchy ONLY
4. **Load Configuration**: Complete config hierarchy at generation time
5. **Resolve Placeholders**: Replace EVERY placeholder with actual values
6. **Embed Context**: All config values embedded in PRB
7. **Validate**: ZERO unresolved placeholders remain
8. **Generate Name**: Compliant naming format
9. **Create File**: With complete resolved content

### Size Enforcement
**AUTO-BREAKDOWN:** If complexity >15 points, automatically break into smaller PRBs ≤15 points each

### Validation
**MANDATORY CHECKS:**
- Template source compliance
- Zero placeholder patterns
- Complete context embedding
- Naming format compliance
- Parent reference validation (for PRBs)

## Creation vs Execution Separation

### Creation (Main Agent)
- Full configuration access
- Template hierarchy access
- Memory search capabilities
- Complete project context
- Placeholder resolution

### Execution (Subagent)
- PRB implementation work
- Role-based task delegation
- Code changes and file operations
- Testing and validation
- Git operations within PRB scope

## Error Handling

### Violation Detection
**BLOCK:**
- Subagent creation attempts
- Manual PRB creation without templates
- Unresolved placeholders
- Runtime config dependencies

### Auto-Correction
- Wrong template → Recalculate complexity, use correct template
- Missing context → Gather required context
- Size violations → Automatic breakdown
- Format violations → Apply naming standards

### Error Messages
- "❌ CREATION BLOCKED: Work items must be created by main agent"
- "❌ TEMPLATE REQUIRED: PRB creation without template FORBIDDEN"
- "❌ PLACEHOLDER UNRESOLVED: All placeholders must be resolved"
- "❌ SIZE VIOLATION: PRB >15 points requires automatic breakdown"

---
*Comprehensive PRB and work item creation system*