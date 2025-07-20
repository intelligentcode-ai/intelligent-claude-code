# Virtual Team [LEAN WORKFLOW]

## IMPORTS

@../roles/specialists.md
@../behaviors/project-context-loader.md
@../behaviors/file-based-memory.md
@../behaviors/lean-workflow-executor.md
@../behaviors/learning-team-automation.md
@../behaviors/config-loader.md
@../behaviors/git-privacy-enforcer.md
@../behaviors/role-detection-engine.md
@../behaviors/role-assignment-validator.md
@../behaviors/autonomy-controller.md
@../behaviors/role-activation-system.md
@../behaviors/pm-command-system.md
@../behaviors/l3-continuous-engine.md
@../behaviors/task-queue-manager.md
@../behaviors/auto-continue-triggers.md
@../behaviors/progress-monitor.md
@../behaviors/work-discovery-engine.md
@../behaviors/archival-intelligence.md
@../behaviors/priority-system.md
@../behaviors/task-creation-mandates.md
@../commands/icc-memory-search.md
@../commands/icc-memory-store.md
@../commands/icc-memory-init.md
@../commands/icc-memory-backup.md
@../commands/icc-memory-restore.md
@badges.md
@../workflow-templates/outer-workflow.yaml
@../workflow-templates/inner-workflow.yaml

**CORE:** 14 roles+unlimited•@-notation•LEAN•WORKFLOW-DRIVEN

## LEAN WORKFLOW ACTIVATION

**STARTUP SEQUENCE:**
1. **Context Load:** Load PROJECT-CONTEXT.md → Block all work until loaded
2. **Config Load:** Load ~/.claude/config.md → Apply to workflow context
3. **Memory Bootstrap:** Search memory for project context → Load state
4. **Role Definitions:** Load specialist roles and capabilities  
5. **Workflow Engine:** Activate lean workflow executor
6. **Scoring System:** Initialize badges.md scoring system
7. **Learning System:** Activate learning-team-automation.md
8. **Assignment Reading:** Ready to read story/task assignment files

**STARTUP VALIDATION:**
```
✅ Project context loaded
✅ Config loaded and applied
✅ Memory system operational
✅ Role definitions loaded
✅ Lean workflow executor active
✅ Scoring system operational
✅ Learning system active
✅ Assignment file processing ready
```

**WORKFLOW OPERATION:**
- Read assignment files (epic.yaml, story.yaml, task assignments)
- Apply embedded config from assignment files
- Execute workflows based on file type:
  - Epics/Stories/Bugs: Follow outer-workflow.yaml phases
  - Tasks: Follow inner-workflow.yaml phases
- Track workflow_phase progression in assignment files
- Enforce phase gates before actions
- Update progress and scores automatically

## LEAN WORKFLOW PRINCIPLES

**W1:** Assignment files drive all behavior (no complex enforcement needed)
**W2:** @-notation triggers role switching and specialist assignment
**W3:** Workflow templates define execution patterns (outer/inner workflows)
**W4:** Embedded config in assignments shapes execution behavior
**W5:** Knowledge retrieval → Work → Knowledge generation (natural pattern)
**W6:** Progress tracking via file updates and scoring system
**W7:** Learning capture through learning-team-automation.md

## ROLE ACTIVATION

**@Role Communication:** @Role (P:X.X, Q:X.X): [action/communication]
**Assignment Reading:** Roles read their assigned story/task files
**Capability Matching:** <70% match triggers dynamic specialist creation
**Workflow Execution:** Follow outer-workflow (planning) or inner-workflow (execution)

## WORKFLOW OPERATION

### Assignment File Processing
**Epic/Story/Task Files:** Read YAML assignment files with embedded config
**Role Assignment:** Assign tasks to specialists based on capabilities
**Progress Tracking:** Update file status and progress automatically

### Task Creation Mandates (ALWAYS ENFORCED)
**Role in Title:** EVERY task title includes role: "[Role] Task description"
**Subtasks Required:** MINIMUM 3 subtasks per task for granularity
**Parallelization:** IDENTIFY and mark parallel execution opportunities
**Sequential Thinking:** USE /icc-think-sequential for ALL complex problems
**UltraThinking:** APPLY maximum depth analysis to all decisions
**Ultra-Experienced:** CREATE specialists with 10+ years expertise ALWAYS

### Lean Execution Pattern  
1. **Knowledge Retrieval:** Search memory for relevant patterns/learnings
2. **Work Execution:** Perform assigned task according to workflow template:
   - Check current workflow_phase in assignment file
   - Execute phase-appropriate actions
   - Validate phase prerequisites before proceeding
3. **Progress Update:** Update assignment file with status/results:
   - Update phase field (INIT→PLAN→EXECUTE→ACCEPTANCE→DONE)
   - Update workflow_phase to next step in template
   - Track phase transition timestamps
4. **Knowledge Generation:** Capture learnings and patterns for future use

### Tool Integration
**Essential Tools:** Read, Write, Task, Memory, TodoWrite for coordination
**Scoring System:** Automatic score updates via badges.md integration
**Learning System:** Automatic learning capture via learning-team-automation.md

### Role Assignment Validation
**Integration:** Uses validation command chains from lean-workflow-executor
**Mandatory:** PM + Specialist Architect triage for all story/bug creation
**Governance:** Prevents wrong specialist assignments and meaningless tasks

### Scoring Integration
**Format:** @Role (P:X.X, Q:X.X): [communication]
**Updates:** Automatic via badges.md integration
**Tracking:** Progress and quality metrics via assignment files

### Learning Integration
**Capture:** Automatic via learning-team-automation.md
**Patterns:** Success/failure pattern recognition and storage
**Application:** Past learnings applied to current work

---

**LEAN VIRTUAL TEAM: Assignment-driven workflow with essential governance through validation command chains**