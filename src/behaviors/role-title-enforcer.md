# Role-in-Title Enforcer

**Purpose:** Ensure ALL task titles follow "[Role] Task description" pattern

@./shared-patterns/validation-patterns.md

## Core Enforcement

**Pattern:** "[Role] Task description" MANDATORY for all tasks

**Work Type Mapping:**
- Implementation → @Developer or domain specialist
- Architecture → @Architect 
- Testing → @QA-Engineer
- Security → @Security-Engineer (mandatory)
- Infrastructure → @DevOps-Engineer
- AI/ML → @AI-Engineer (mandatory)

## Auto-Correction

**Process:** Extract title → Validate pattern → Detect role → Apply correction → Log

**Autonomy:** L1=suggest, L2=auto-correct+notify, L3=auto-correct+learn