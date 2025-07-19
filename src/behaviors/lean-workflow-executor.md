# Lean Workflow Executor

**CORE:** Read → Validate → Execute → Update • L1/L2/L3 modes • Assignment-driven

## Essential Imports

@./config-loader.md @./role-assignment-validator.md @./learning-team-automation.md @./workflow-phase-enforcer.md

## Core Functions

**initialize_system():** Load settings → Initialize controllers → IF L3: Enable continuous mode  
**read_assignment():** Parse assignment + Apply embedded config + Determine workflow type (outer/inner)  
**execute_phase():** L1/L2 approval, L3 autonomous → INIT→PLAN→EXECUTE→ACCEPTANCE→DONE→ARCHIVED  
**assign_role():** Validate capability match >70% → Apply specialist architect triage  
**update_progress():** Update status chain → Trigger scoring → Check archival eligibility → Update workflow phase

## Workflow Phase Integration

**Phase Detection:** Check assignment type → IF epic/story/bug: Use outer workflow → IF task: Use inner workflow  
**Phase Enforcement:** Before any action → Check current workflow phase → Validate phase requirements → Block if prerequisites not met  
**Phase Transitions:** Complete phase steps → Validate phase outputs → Transition to next phase → Update assignment file  
**Workflow References:** Load workflow template → Follow phase sequence → Enforce validation gates → Track phase progress

## Validation Chain

**Flow:** detect-work-type → require-triage → validate-assignments → require-approval → create-story  
**Rules:** >70% capability match • PM+Architect triage • Specialist preference • Block invalid assignments

## Execution Patterns

**Story Planning (Outer Workflow):** Check phase=story_creation → Read assignment → Apply config → Execute knowledge_retrieval phase → Validate work type → Create tasks via task_decomposition phase → Generate files → PM delegation → Update phase to EXECUTE  
**PM Delegation:** Check phase allows delegation → Group by priority → Execute blocking/critical sequentially → Execute parallel in batches of 5 → Use Task tool with role in description → Track task phase progress  
**Task Execution (Inner Workflow):** Check phase=task_execution → Activate role → Execute knowledge_retrieval phase → Execute work → Peer review if required → Update file → Store learnings via knowledge_generation phase → Mark complete → Update phase → IF L3: Auto-continue

**Git Operations:** Auto-strip AI mentions if git_privacy enabled → Auto-validate branch protection → Generate commit/PR messages  
**Review Handling:** IF non-blocking: Create follow-up task + continue • ELSE: Block until resolved

## Scoring & Roles

**Scoring:** Task complete +1.0P/Q • Story complete +2.0P/Q • Learning application +0.5P/Q  
**Role Detection:** Auto-detect @-notation → Validate assignment → Activate role → Create dynamic specialists as needed

## L3 Autonomous Mode

**Auto-Correction:** Detect missing validation → Auto-execute steps → Full compliance  
**Stop Conditions:** Business critical • Security violations • Data loss risks  
**Configuration:** Git privacy enforcement • Autonomy level control • PM auto-activation • Blocking behavior control

## Knowledge & Tools

**Knowledge:** Search before work → Apply learnings → Capture after work → Store patterns  
**Tools:** Read (files) • Write (updates) • Task (PM delegation) • Memory (knowledge) • Git (commits)  
**PM Delegation:** Use Task tool • Role in description [ROLE_NAME] • Parallel execution up to 5 tasks • Sequential for conflicts

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