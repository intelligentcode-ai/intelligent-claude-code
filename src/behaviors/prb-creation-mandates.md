# PRB Creation Mandates

**MANDATORY:** Role-in-title + complexity-based templates. Auto-correct violations.

## Imports
@./shared-patterns/learning-patterns.md

## Mandatory Rules

### Role in Title
**Format:** "[Role] Description"
**Examples:** "[Developer] Fix auth", "[AI-Engineer] Add ML"

### Complexity-Based Templates
**Auto-selected by score:**
- **Nano (0-2):** Trivial (typos, configs)
- **Tiny (3-5):** Single-file (<50 lines)
- **Medium (6-15):** Multi-file features
- **Large (16-30):** Complex w/ coordination
- **Mega (30+):** System-wide changes

**Scoring factors:** Files + Lines + External APIs + Security + Coordination

### Quality Requirements
- Sequential thinking for Large/Mega
- Pre-assigned SME reviewers
- 10+ years specialist expertise
- Project context integration

### Auto-Correction
- Missing role → Add based on work type
- Wrong template → Re-analyze complexity
- No specialist → Create if <70% match
- Missing SME → Pre-assign reviewer

## Integration
Commands: `/icc-analyze-complexity`, `/icc-create-prb`, `/icc-think-sequential`

---
*Optimized: 113→35 lines*