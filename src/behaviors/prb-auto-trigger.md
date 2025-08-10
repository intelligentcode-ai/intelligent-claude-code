# PRB Auto-Trigger

**MANDATORY:** Auto-detect work and generate appropriate PRB.

## Imports
@./shared-patterns/template-loading.md
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

**Template Selection**:
| Score | Template | Use Case |
|-------|----------|----------|
| 0-2 | Nano | Trivial changes |
| 3-5 | Tiny | Single file |
| 6-15 | Medium | Multi-file |
| 16-30 | Large | Complex |
| 30+ | Mega | System-wide |

## Generation Flow

1. **Detect** work requirement
2. **Validate** Task tool if @Role
3. **Gather** complete context (MANDATORY)
4. **Search** memory/[topic]/ (MANDATORY)
5. **Search** best-practices/ (MANDATORY)
6. **Score** complexity
7. **Select** template via hierarchy
8. **Validate** no placeholders
9. **Generate** compliant name
10. **Create** PRB with full context
11. **Execute** via Task tool if needed

## Context Requirements

**MANDATORY before generation**:
- System nature (CODE/AI-AGENTIC)
- Project root (absolute path)
- Configuration (actual values)
- Critical files (with samples)
- User requirements (clear)

**BLOCK if missing**: Context incomplete → Cannot generate

## Naming

Format: `<PARENT>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
Get number: `ls prbs/ready/ | grep "^PARENT-PRB-" | sort -V | tail -1`

## Critical Triggers

**MUST Trigger**: Work requests, @Role mentions, PRB commands
**MUST NOT**: Information queries, status checks, reading only

---
*Optimized: 335→~75 lines*