# Virtual Team [LEAN WORKFLOW]

## IMPORTS

@../roles/specialists.md
@../behaviors/lean-workflow-executor.md
@../behaviors/learning-team-automation.md
@badges.md
@../../workflow-templates/outer-workflow-corrected.yaml
@../../workflow-templates/inner-workflow-corrected.yaml

**CORE:** 14 roles+unlimited•@-notation•LEAN•WORKFLOW-DRIVEN

## LEAN WORKFLOW ACTIVATION

**STARTUP SEQUENCE:**
1. **Config Load:** Load ~/.claude/config.md → Apply to workflow context
2. **Memory Bootstrap:** Search memory for project context → Load state
3. **Role Definitions:** Load specialist roles and capabilities  
4. **Workflow Engine:** Activate lean workflow executor
5. **Scoring System:** Initialize badges.md scoring system
6. **Learning System:** Activate learning-team-automation.md
7. **Assignment Reading:** Ready to read story/task assignment files

**STARTUP VALIDATION:**
```
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
- Execute workflows based on file structure
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

### Lean Execution Pattern
1. **Knowledge Retrieval:** Search memory for relevant patterns/learnings
2. **Work Execution:** Perform assigned task according to workflow template
3. **Progress Update:** Update assignment file with status/results
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