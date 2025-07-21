# Executable AI Workflow

**MANDATORY:** Use unified workflow execution. PROJECT-CONTEXT.md AND ALL SETTINGS loaded ONCE by parent.

**Purpose:** Complete workflow with Task tool invocations, dynamic roles, and coordination

## Core Principle: @Role = Task Tool Invocation

Every @Role triggers a Task tool invocation creating a subagent with that expertise.

**CRITICAL:** PROJECT-CONTEXT.md AND ALL SETTINGS are loaded ONCE by parent and passed to ALL subagents.

**Task Tool XML Example:**
```xml
<invoke name="Task">
  <parameter name="description">[PM] Plan STORY-XXX implementation</parameter>
  <parameter name="prompt">You are @PM. Analyze requirements and define approach.
  Context: [PROJECT-CONTEXT content passed from parent]
  Settings: autonomy_level=L2, git_privacy=true, branch_protection=true, default_branch=main, pm_always_active=true, blocking_enabled=false</parameter>
</invoke>
```

## Directory Structure
```
project-root/
├── .claude/
│   ├── PROJECT-CONTEXT.md    # Loaded ONCE by parent
│   └── config.md
├── epics/
│   └── EPIC-001/
│       ├── epic.yaml
│       └── stories/
└── tasks/
    └── TASK-001.md
```

## Priority System
**Execution:** P0 → P1 → P2 → P3 (highest to lowest)
**Escalation:** Security/critical → P0
**Parallel:** Up to 5 non-conflicting tasks

## Outer Workflow (Story/Bug Level)

1. **PM Planning with ALL Configuration Loading**
   - **PARENT LOADS EVERYTHING ONCE HERE:**
     - Load PROJECT-CONTEXT.md via /icc-load-project-context
     - Load ALL settings via /icc-get-setting for each:
       - autonomy_level (L1/L2/L3)
       - git_privacy (true/false)
       - branch_protection (true/false)
       - default_branch (main/master/develop)
       - require_pr_for_main (true/false)
       - pm_always_active (true/false)
       - blocking_enabled (true/false)
       - specialist_creation (true/false)
       - role_validation (true/false)
   - **PASS BOTH context AND settings to EVERY subagent in ALL steps**
   - **No subagent ever needs to load these again - parent provides everything**
2. **Architect Triage** - Review and approve technical approach  
   - Validate role assignments for work type
   - Ensure correct specialist selection
   - **Receives context AND settings from parent**
3. **Task Creation** - "[Role] Description" format, min 3 subtasks
   - **PRE-ASSIGN SME peer reviewer** during task creation
   - Include SME assignment in task definition
   - Format: "SME_Reviewer: @Security-Engineer" in task
   - **Receives context AND settings from parent**
4. **Git Branch Setup** - Create feature/STORY-XXX branch
   - Uses git_privacy setting for AI mention stripping (passed from parent)
   - Uses branch_protection and other git settings (passed from parent)
   - **Receives context AND settings from parent**
5. **Parallel Task Execution** - Execute up to 5 tasks simultaneously
   - **Pass BOTH PROJECT-CONTEXT AND settings to each task subagent**
   - Each subagent receives full configuration from parent
6. **Merge Request Decision** - PARENT asks user directly (not subagent)
   - "Would you like me to create a merge request?"
7. **Story Retrospective** - Capture learnings and patterns
   - **Receives context AND settings from parent**

## Inner Workflow (Task Level)

1. **Memory Search** - Find relevant patterns for task domain
   - **Uses context AND settings already passed from parent**
   - No need to load settings - parent already provided them
2. **Generate Workflow Steps** - Based on task type, create specific steps
   - Development task: Design → Implement → Test → Document
   - Bug fix: Reproduce → Diagnose → Fix → Verify
   - Feature: Requirements → Design → Build → Integrate
   - MANDATORY: Generate explicit steps to prevent deviation
3. **Execute Work** - Follow generated workflow steps exactly
   - No interpretation or shortcuts allowed
   - Complete each step fully before proceeding
4. **SME Peer Review** - Review by PRE-ASSIGNED SME from task
   - Use SME_Reviewer field from task definition
   - Can repeat up to 3 times before escalation
   - Minor issues: Fix and re-review
   - Major issues: Back to step 2 (workflow generation)
5. **Version Bump** - Update version files before commit
   - Check if changes affect public API or behavior
   - Bump patch version for bug fixes and internal changes
   - Bump minor version for new features or API additions
   - Update VERSION file and any package.json if applicable
6. **Git Operations** - Commit with "TASK-XXX: Description"
   - Apply git_privacy setting if true: strip AI mentions (from parent settings)
   - Check branch_protection before commit (from parent settings)
   - Use default_branch setting (from parent settings)
7. **Task Completion** - Update status to COMPLETED
8. **Learning Capture** - Store patterns for future reference

## Review Repetition Pattern
- **Minor issues:** Fix in same task, re-review
- **Major issues:** Back to workflow generation (inner step 2)
- **Blocking issues:** Create follow-up task
- **Maximum:** 3 review cycles before PM escalation
- **SME is PRE-ASSIGNED:** Never select reviewer, use task's SME_Reviewer field

## Task Creation Example (with SME Pre-Assignment)

```yaml
task_id: TASK-001
title: "[Security-Engineer] Implement OAuth2 authentication"
description: "Add OAuth2 authentication with JWT tokens"
SME_Reviewer: "@AI-Architect"  # PRE-ASSIGNED during creation
subtasks:
  - Design OAuth2 flow with security considerations
  - Implement JWT token generation and validation
  - Add refresh token mechanism with rotation
priority: P1
```

## Dynamic Specialists

When existing roles <70% capability match:
- Create @GraphQL-Developer, @Kubernetes-Expert, etc.
- Always specify "10+ years expertise"
- Use for specialized domain work

## Autonomy Control

### Levels
- **L1:** User approval required for ALL actions
- **L2:** Architect approval for technical decisions
- **L3:** Full autonomous execution

### L3 Continuous Execution
- Auto-discover ready tasks
- Execute up to 5 parallel
- Continue while work exists
- Stop only for critical issues

## Git Settings
- **git_privacy:** Strip AI mentions from commits
- **branch_protection:** Enforce feature branches
- **require_pr_for_main:** Block direct pushes

## Work Type Detection
- **Behavioral/AI:** @AI-Engineer or @AI-Architect
- **Security:** @Security-Engineer
- **Infrastructure:** @System-Engineer or @DevOps
- **General:** Domain-appropriate specialist

## Critical Implementation Notes

1. **LOAD ONCE, PASS EVERYWHERE:** Parent loads PROJECT-CONTEXT AND ALL SETTINGS ONCE in step 1, passes to EVERY subagent
2. **NO REDUNDANT LOADING:** Subagents NEVER load context or settings - parent provides everything
3. **User Interaction:** Parent asks user about MR/PR (outer step 6) - NOT delegated
4. **Review Pattern:** SME is PRE-ASSIGNED in task, up to 3 cycles
5. **Role Selection:** Use @AI-Engineer for behavioral/AI work, not @Developer
6. **Capability Match:** <70% triggers specialist creation
7. **Version Bump:** ALWAYS bump version before Git operations (inner step 5)
8. **Workflow Generation:** Inner step 2 generates explicit steps - NO deviation
9. **Git Privacy:** Strip AI mentions when git_privacy=true before commits

## Task Queue Management
- Priority queue with P0-P3 ordering
- Dependency tracking and resolution
- Resource conflict prevention
- Automatic work discovery in L3

## User Interruption Handling
- Save state to task file
- Document completed subtasks
- Resume from interruption point
- Maintain task continuity

---
*Balanced executable workflow ~150 lines*