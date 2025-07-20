# Lean Workflow Executor

**CORE:** Read → Validate → Execute → Update • L1/L2/L3 modes • Assignment-driven

## Essential Imports

@./config-loader.md @./role-assignment-validator.md @./learning-team-automation.md @./workflow-phase-enforcer.md @./file-management-enforcer.md

## Core Behaviors

**System Initialization:** Use `/icc-load-config` → Initialize controllers → IF L3: Enable continuous mode via `/icc-l3-activate`  
**Assignment Reading:** Parse assignment + Apply embedded config via `/icc-apply-config` + Determine workflow type (outer/inner)  
**Phase Execution:** L1/L2 approval, L3 autonomous → Use `/icc-phase-transition` for INIT→PLAN→EXECUTE→ACCEPTANCE→DONE→ARCHIVED  
**Role Assignment:** Use `/icc-validate-assignments` for capability match >70% → Apply specialist architect triage via `/icc-require-triage`  
**Progress Updates:** Update status chain → Trigger scoring → Check archival eligibility via `/icc-archive-scan` → Update workflow phase

## Workflow Phase Integration

**Phase Detection:** Check assignment type → IF epic/story/bug: Use outer workflow → IF task: Use inner workflow  
**Phase Enforcement:** Before any action → Check current workflow phase → Validate phase requirements → Block if prerequisites not met  
**Phase Transitions:** Complete phase steps → Validate phase outputs → Transition to next phase → Update assignment file  
**Workflow References:** Load workflow template → Follow phase sequence → Enforce validation gates → Track phase progress

## Validation Chain

**Flow:** Use `/icc-detect-work-type` → `/icc-require-triage` → `/icc-validate-assignments` → `/icc-require-approval` → `/icc-create-story`  
**Rules:** >70% capability match • PM+Architect triage • Specialist preference • Block invalid assignments

## Execution Patterns

**Story Planning (Outer Workflow):** Use `/icc-phase-check` → Read assignment → Apply config via `/icc-apply-config` → Execute knowledge_retrieval via `/icc-memory-search` → Validate work type via `/icc-detect-work-type` → Create tasks via `/icc-plan-tasks` → Generate files → PM delegation via `/icc-delegate-tasks` → Update phase to EXECUTE  
**PM Delegation:** Use `/icc-delegate-tasks` for parallel execution (up to 5 tasks) with role assignment and priority grouping  
**Task Execution (Inner Workflow):** Use `/icc-phase-check` → Activate role via `/icc-activate-role` → Execute knowledge_retrieval via `/icc-memory-search` → Execute work → Peer review if required → Update file via `/icc-validate-file` → Store learnings via `/icc-learning-capture` → Mark complete → Update phase → IF L3: Auto-continue

**Git Operations:** Use `/icc-git-clean` for AI mention stripping → Use `/icc-git-validate` for branch protection → Generate commit/PR messages  
**Review Handling:** IF non-blocking: Create follow-up task via `/icc-create-task` + continue • ELSE: Block until resolved

## Scoring & Roles

**Scoring:** Use `/icc-score-update` for task complete +1.0P/Q • Story complete +2.0P/Q • Learning application +0.5P/Q  
**Role Detection:** Use `/icc-detect-role` for @-notation → Validate assignment via `/icc-validate-assignments` → Activate role via `/icc-activate-role` → Create dynamic specialists as needed

## L3 Autonomous Mode

**Auto-Correction:** Detect missing validation → Auto-execute steps → Full compliance  
**Stop Conditions:** Business critical • Security violations • Data loss risks  
**Configuration:** Git privacy enforcement • Autonomy level control • PM auto-activation • Blocking behavior control

## Knowledge & Tools

**Knowledge:** Use `/icc-memory-search [keywords]` before work → Apply learnings → Capture after work → Store patterns  
**Tools:** Read (files) • Write (updates with validation) • Task (PM delegation) • Memory (knowledge) • Git (commits)  
**PM Delegation:** Use Task tool • Role in description [ROLE_NAME] • Parallel execution up to 5 tasks • Sequential for conflicts  
**File Management:** All Write operations validate via file-management-enforcer → Enhance existing preferred → Naming conventions enforced

## Priority System

**Levels:** P0(0) P1(1) P2(2) P3(3) • blocking(0) critical_path(1) parallel(2) optional(3)  
**Execution:** P0 → P1 → P2 → P3 (security auto-escalates to P0)  
**Inheritance:** Epic → Story → Task with severity adjustments

## Error Handling

**Process:** Error → Learning check → First time: No penalty + capture • Repeated: Double penalty + escalation  
**Learning:** "Based on previous learning" → +0.5P/Q bonus • Error patterns stored and shared across roles

## L3 Continuous Mode

**Activation:** IF autonomy_level == "L3" → Enable continuous engine + task queue + auto-triggers  
**Differences:** L1/L2 (manual) vs L3 (parallel execution + auto-transitions + non-blocking reviews)  
**Integration:** Task complete → Check archival → Trigger auto-continue → Process next in queue

## Implementation

**Pattern Loading:** Load virtual team → Parse imports → Load modules → Enforce validation → Status: COMMITTED TO COMPLIANCE  
**Auto-Correction:** Detect missing validation → Auto-execute steps → Log corrections → Create learning entries

## Key Benefits

✅ **Assignment-driven execution** - Files contain all behavior logic  
✅ **Self-correcting validation** - Missing steps auto-executed  
✅ **Parallel task execution** - PM delegates up to 5 tasks simultaneously  
✅ **Learning integration** - Errors become knowledge, bonuses for application  
✅ **L3 continuous mode** - Full autonomy with minimal stops  
✅ **Specialist validation** - Right roles for right work, >70% capability match