# Role Assignment Validator

**Purpose:** Context-aware role assignment validation with mandatory architect consultation

## Imports
@./shared-patterns/validation-patterns.md
@./shared-patterns/memory-patterns.md

## Core Validation
**Context Enforcement:** PROJECT-CONTEXT.md loading before role assignments
**Work Type Detection:** Behavioral system → @AI-Architect/Engineer • Security → @Security-Architect/Engineer
**Capability Matching:** >70% threshold required, auto-correction for wrong assignments

## Validation Chain
**Story:** detect-work-type → architect triage → validate assignments → joint approval
**Task:** validate-assignments → capability match → architect approval
**Commands:** `/icc-detect-work-type` • `/icc-require-triage` • `/icc-validate-assignments` • `/icc-require-approval`

## Benefits
✅ Context-aware validation ✅ Mandatory architect approval ✅ Capability matching ✅ Auto-correction