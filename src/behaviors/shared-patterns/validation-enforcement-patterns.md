# Shared Validation & Enforcement Patterns

**MANDATORY:** MUST use validation and enforcement. Auto-correct violations.

**PURPOSE:** Complete validation and auto-correction patterns

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

## Auto-Correction & Enforcement Patterns

### Auto-Correction Pattern
**Detection:** Identify validation gap or violation
**Correction:** Auto-execute missing step or fix
**Logging:** Record correction for learning
**Prevention:** Update patterns to prevent recurrence

### Enforcement Headers
**Standard Format:** `**MANDATORY:** MUST use X. Auto-correct violations.`
**Application:** All behavioral files requiring enforcement
**Trigger:** System automatically detects and corrects violations

### Violation Detection
**Continuous Monitoring:** Check all actions against enforcement rules → Identify violations automatically → Create violation record → Apply appropriate correction → Log for learning

### Auto-Correction Execution
**Correction Process:** Look up standard correction for violation type → If correction exists: execute automatically → Record success for learning → If no correction: escalate to appropriate role

### Penalty System
**Process Violations:** -1.0P per violation
**Quality Violations:** -1.0Q per violation
**Repeated Violations:** 2x penalty for same violation type
**Auto-Correction Bonus:** +0.5P for successful auto-corrections

## Validation Commands

### Standard Validation Commands
- `/icc-validate-context` - Ensure context loaded
- `/icc-detect-work-type` - Identify work domain
- `/icc-validate-assignments` - Check capability match
- `/icc-require-approval` - Enforce architect approval
- `/icc-enforce-validation` - Apply validation chain

### Validation Functions
**Capability Matching:** Calculate overlap between role capabilities and requirements → If overlap >= 70%: approve assignment → If below 70%: reject or create specialist

**Work Type Detection:** Analyze content for domain keywords → If 2+ matches found: assign specific work type → Otherwise: assign general work type

**Validation Enforcement:** Check if context loaded → If not: load context first → Check if validation complete → If not: run validation chain → Then proceed with action

## Enforcement Integration

### Behavioral Enforcement
**Application:** All behavioral modules must include enforcement headers
**Auto-Correction:** System automatically corrects behavioral violations
**Monitoring:** Continuous validation of behavioral compliance
**Escalation:** Critical violations escalate to PM

### Validation Responses
- **Success:** "✅ Validation complete"
- **Context Missing:** "⚠️ Loading context first..."
- **Low Capability:** "❌ Capability match below 70%"
- **No Approval:** "🚫 Architect approval required"
- **Auto-Corrected:** "🔧 Auto-corrected: [violation]"

### Enforcement Monitoring
**Compliance Monitoring:** Continuously scan for behavioral violations → For each violation found: determine if auto-correctable → If yes: apply correction automatically → If no: escalate to appropriate role for manual intervention

---
*Consolidated validation and enforcement patterns for intelligent-claude-code system*