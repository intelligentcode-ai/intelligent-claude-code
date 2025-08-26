# PRB Auto-Trigger

**MANDATORY:** Auto-detect work and generate PRB using MANDATORY templates from src/prb-templates/ with COMPLETE placeholder resolution.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-enforcement-behavior.md
@./prb-breakdown-patterns.md

## Detection → Memory → PRB → Execution

| Trigger | Pattern | Action |
|---------|---------|--------|
| PRB File | *.prb.yaml | Execute existing |
| Work Request | Implementation intent | Generate PRB |
| @Role | @Role mention | PRB + Subagent execution |
| Natural Language | "break down STORY-X", "create specialist for Y" | Generate PRB |

## Complexity Scoring

**Auto-calculation**:
- Files: 1=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts
- Lines: <10=1pt, <50=2pts, <200=4pts, 200+=8pts
- External APIs: 3pts each
- Database/Security: 4-5pts

**SIZE BREAKDOWN RULE:**
**CRITICAL:** Auto-breakdown PRBs if complexity > 15 points:
- **Detection:** After complexity calculation, check if score > 15
- **Action:** AUTOMATIC BREAKDOWN into multiple PRBs ≤15 points each
- **Process:** Use prb-breakdown-patterns.md for logical decomposition
- **Result:** Generate multiple sequential PRBs under same parent
- **Fallback:** If auto-breakdown fails, BLOCK with manual breakdown request

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

## Template-First Generation Flow

**Context & Analysis Phase:**
1. Detect work requirement → Validate subagent mode if @Role
2. Gather complete context → Search memory/[topic]/ and best-practices/
3. Score complexity → Auto-breakdown if >15 points

**Template Resolution Phase:**
4. Load template from src/prb-templates/ hierarchy
5. Load complete configuration at generation time
6. Resolve ALL placeholders with actual values
7. Embed complete context in PRB
8. Validate zero unresolved placeholders and template completeness

**Creation & Execution Phase:**
9. Generate compliant name → Create PRB with resolved structure
10. Document template source → Execute via subagent if needed

## Context Requirements

**Context Requirements:**
- System nature, project root, configuration values
- Critical files with samples, clear user requirements
- Project overview and boundaries from CLAUDE.md

**IMMEDIATE BLOCKING:**
- Context incomplete → Cannot generate PRB
- Manual creation attempt → Must use src/prb-templates/
- Unresolved placeholders → Must resolve at generation time
- Runtime config dependencies → Must embed all config values
- Template source invalid → Must use src/prb-templates/ hierarchy
- Missing template sections → Must use complete templates
- **PRB too large** → Complexity > 15 points triggers automatic breakdown into smaller PRBs

## Execution Rules

**Naming:** `<PARENT>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
**Triggers:** Work requests, @Role mentions, natural language work patterns
**Execution:** All PRBs execute via subagents with embedded context

---
*Optimized: 335→~75 lines*