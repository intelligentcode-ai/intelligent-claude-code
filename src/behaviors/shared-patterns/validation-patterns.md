# Shared Validation Patterns

**PURPOSE:** Common validation patterns used across behavioral modules

## Core Validation Patterns

### Capability Match Validation
**Threshold:** >70% capability match required
**Formula:** (matched_capabilities / required_capabilities) * 100
**Application:** Role assignments, specialist creation, reviewer selection

### Context-First Validation
**Pattern:** Load context → Validate understanding → Apply rules → Proceed
**Blocking:** No actions without validated context
**Storage:** PROJECT-CONTEXT.md and memory entities

### Work Type Detection
**Common Types:**
- Behavioral/AI work → @AI-Architect required
- Infrastructure work → @System-Engineer required  
- Security work → @Security-Engineer required
- Documentation work → @Requirements-Engineer

### Validation Chain Pattern
**Standard Flow:** 
1. Load context (if needed)
2. Detect work type
3. Validate role capabilities
4. Require architect approval
5. Execute with validation

### Auto-Correction Pattern
**Detection:** Identify validation gap
**Correction:** Auto-execute missing step
**Logging:** Record correction for learning
**Prevention:** Update patterns to prevent recurrence

## Integration Commands

### Standard Validation Commands
- `/icc-validate-context` - Ensure context loaded
- `/icc-detect-work-type` - Identify work domain
- `/icc-validate-assignments` - Check capability match
- `/icc-require-approval` - Enforce architect approval

### Validation Responses
- **Success:** "✅ Validation complete"
- **Context Missing:** "⚠️ Loading context first..."
- **Low Capability:** "❌ Capability match below 70%"
- **No Approval:** "🚫 Architect approval required"

## Reusable Functions

### validateCapabilityMatch(role, requirements)
```
IF role.capabilities ∩ requirements >= 0.7 * requirements.length
  RETURN true
ELSE
  RETURN false
```

### detectWorkType(content)
```
FOR EACH workType IN workTypes
  IF content.matches(workType.keywords) >= 2
    RETURN workType
RETURN "general"
```

### enforceValidation(action)
```
IF NOT contextLoaded()
  loadContext()
IF NOT validated(action)
  runValidationChain(action)
PROCEED
```

---
*Shared validation patterns for behavioral consistency*