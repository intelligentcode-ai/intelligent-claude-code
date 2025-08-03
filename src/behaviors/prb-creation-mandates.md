# PRB Creation Mandates

**MANDATORY:** Role-in-title + complexity-based templates. Auto-correct violations.

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md

## Mandatory Rules

### Role in Title
**Format:** "[Role] Description"
**Examples:** "[Developer] Fix auth", "[AI-Engineer] Add ML"

### Complexity-Based Templates
**Auto-selected by score using template hierarchy:**
- **Nano (0-2):** Trivial (typos, configs)
- **Tiny (3-5):** Single-file (<50 lines)
- **Medium (6-15):** Multi-file features
- **Large (16-30):** Complex w/ coordination
- **Mega (30+):** System-wide changes

**Scoring factors:** Files + Lines + External APIs + Security + Coordination
**Template Loading:** Use hierarchy: project → .claude → ~/.claude

### Quality Requirements
- Sequential thinking for Large/Mega
- Pre-assigned SME reviewers
- 10+ years specialist expertise
- Project context integration

### Role Assignment Enforcement
**MANDATORY:** PM + Architect collaboration for ALL role assignments:

1. **Block Direct Role Assignment**: 
   - STOP execution if role assigned without PM+Architect process
   - Redirect to story-breakdown.md role assignment process
   - Generate error: "❌ Role assignment requires PM+Architect collaboration"

2. **Enforce Collaboration Process**:
   - PM MUST analyze work requirements first
   - PM MUST select appropriate architect domain expert
   - Together they MUST determine correct role assignment
   - Document collaboration and rationale in PRB

3. **Validation Requirements**:
   - PRB MUST include role assignment rationale
   - PRB MUST reference PM+Architect collaboration
   - PRB MUST include capability match justification (>70%)
   - PRB MUST document domain expert selection process

### Auto-Correction
- Missing role → Trigger PM+Architect collaboration process
- Wrong template → Re-analyze complexity with architect input
- No specialist → PM+Architect decide on dynamic specialist creation
- Missing SME → PM+Architect pre-assign domain-appropriate reviewer
- Direct role assignment → Block and redirect to collaboration process

## Integration
Commands: `/icc-analyze-complexity`, `/icc-create-prb`, `/icc-think-sequential`

---
*Optimized: 113→35 lines*