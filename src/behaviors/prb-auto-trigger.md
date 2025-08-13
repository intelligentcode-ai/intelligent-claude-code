# PRB Auto-Trigger

**MANDATORY:** Auto-detect work and generate PRB using MANDATORY templates from src/prb-templates/ with COMPLETE placeholder resolution.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-enforcement-behavior.md

## Detection → Memory → PRB → Execution

| Trigger | Pattern | Action |
|---------|---------|--------|
| PRB File | *.prb.yaml | Execute existing |
| Work Request | Implementation intent | Generate PRB |
| @Role | @Role mention | PRB + Task tool |
| Commands | /icc-create-prb | Generate with options |

## Complexity Scoring

**Auto-calculation**:
- Files: 1=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts
- Lines: <10=1pt, <50=2pts, <200=4pts, 200+=8pts
- External APIs: 3pts each
- Database/Security: 4-5pts

**SIZE BLOCKING RULE:**
**CRITICAL:** Block PRB creation if complexity > 15 points:
- **Detection:** After complexity calculation, check if score > 15
- **Action:** IMMEDIATE BLOCK with error message
- **Error Message:** "❌ PRB too large ({score} points). Break it down into smaller PRBs."
- **Resolution:** User must decompose work into multiple smaller PRBs

**MANDATORY Template Selection from src/prb-templates/ with Placeholder Resolution**:
| Score | Template | Source File | Resolution Required |
|-------|----------|-------------|--------------------|
| 0-2 | Nano | nano-prb-template.yaml | ALL placeholders → actual values |
| 3-5 | Tiny | tiny-prb-template.yaml | ALL placeholders → actual values |
| 6-15 | Medium | medium-prb-template.yaml | ALL placeholders → actual values |
| 16-30 | Large | large-prb-template.yaml | ALL placeholders → actual values |
| 30+ | Mega | mega-prb-template.yaml | ALL placeholders → actual values |

**ABSOLUTE ENFORCEMENT:**
- ❌ Every PRB MUST use these templates - NO manual creation
- ❌ ALL placeholders MUST be resolved at generation time
- ❌ NO runtime config lookups allowed
- ❌ Complete configuration MUST be embedded in PRB

## MANDATORY Template-First Generation Flow (ZERO EXCEPTIONS)

1. **Detect** work requirement
2. **Validate** Task tool if @Role
3. **Gather** complete context (MANDATORY)
4. **Search** memory/[topic]/ (MANDATORY)
5. **Search** best-practices/ (MANDATORY)
6. **Score** complexity
7. **SIZE CHECK** - Block if complexity > 15 points with decomposition error
8. **MANDATORY: Load Template** from src/prb-templates/ hierarchy ONLY
9. **MANDATORY: Load Complete Configuration** at generation time
10. **MANDATORY: Resolve ALL Placeholders** with actual config values
   - [FROM_CONFIG] → git_privacy: <ACTUAL_VALUE> (not "[FROM_CONFIG]")
   - [PROJECT_ROOT] → <ACTUAL_PROJECT_ROOT_PATH>
   - [CURRENT_DATE] → <ACTUAL_SYSTEM_DATE>
   - [ALL-SETTINGS] → complete configuration object
11. **MANDATORY: Embed Complete Context** - all config in PRB
12. **MANDATORY: Validate NO Placeholders** - ZERO unresolved values
13. **MANDATORY: Validate Template Completeness** - ALL sections required
14. **Generate** compliant name from template
15. **Create** PRB using complete resolved template structure
16. **Validate** NO runtime config dependencies
17. **Document** template source in metadata
18. **Execute** via Task tool if needed

**ABSOLUTE ENFORCEMENT:** Steps 8-17 are MANDATORY - NO bypassing, NO exceptions, NO runtime config lookups.

## Context Requirements

**MANDATORY before generation**:
- System nature (CODE/AI-AGENTIC)
- Project root (absolute path)
- Configuration (actual values)
- Critical files (with samples)
- User requirements (clear)

**IMMEDIATE BLOCKING:**
- Context incomplete → Cannot generate PRB
- Manual creation attempt → Must use src/prb-templates/
- Unresolved placeholders → Must resolve at generation time
- Runtime config dependencies → Must embed all config values
- Template source invalid → Must use src/prb-templates/ hierarchy
- Missing template sections → Must use complete templates
- **PRB too large** → Complexity > 15 points blocked with decomposition error

## Naming

Format: `<PARENT>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
Get number: `ls prbs/ready/ | grep "^PARENT-PRB-" | sort -V | tail -1`

## Critical Triggers

**MUST Trigger**: Work requests, @Role mentions, PRB commands
**MUST NOT**: Information queries, status checks, reading only

---
*Optimized: 335→~75 lines*