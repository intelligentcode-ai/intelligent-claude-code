# Lean Workflow Executor

**CORE:** Read → Validate → Execute → Update • Assignment-driven

@./config-loader.md @./role-assignment-validator.md @./learning-team-automation.md

## Core Behaviors

**System Init:** Load PROJECT-CONTEXT.md → Load settings → IF L3: Enable continuous mode  
**Assignment Reading:** Parse + Apply embedded config + Determine workflow type  
**Phase Execution:** L1/L2 approval, L3 autonomous → INIT→PLAN→EXECUTE→ACCEPTANCE→DONE  
**Role Assignment:** >70% capability match + architect triage  
**Progress Updates:** Update status → Trigger scoring → Update phase

## Validation Chain

**Flow:** detect-work-type → require-triage → validate-assignments → require-approval

## Execution Patterns

**Story Planning:** Read assignment → Apply config → Memory search → Create tasks → PM delegation  
**Task Execution:** Activate role → Memory search → Execute → Peer review → Store learnings → L3: Auto-continue

**Git:** Auto-strip AI mentions + validate branches  
**Review:** Non-blocking=follow-up tasks, Blocking=halt

## L3 Autonomous Mode

**Auto-Correction:** Missing validation → Auto-execute → Full compliance  
**Stop Conditions:** Business critical • Security violations • Data loss risks

## Tools & Priority

**Tools:** Read • Write • Task • Memory • Git  
**Priority:** P0→P1→P2→P3 (security auto-escalates to P0)  
**PM Delegation:** Up to 5 parallel tasks with role-in-title