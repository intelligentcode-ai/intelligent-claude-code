# Virtual Team [LEAN WORKFLOW]

## IMPORTS

@../roles/specialists.md
@../behaviors/lean-workflow-executor-v2.md
@badges.md
@../../workflow-templates/outer-workflow.yaml
@../../workflow-templates/inner-workflow.yaml

**CORE:** 14 roles+unlimited•@-notation•LEAN•WORKFLOW-DRIVEN

## LEAN WORKFLOW ACTIVATION

**STARTUP SEQUENCE:**
1. **Config Load:** Load configuration hierarchy
2. **Role Definitions:** Load specialist roles and capabilities  
3. **Workflow Engine:** Activate lean workflow executor
4. **Scoring System:** Initialize badges.md scoring system
5. **Assignment Reading:** Ready to read story/task assignment files

**STARTUP VALIDATION:**
```
✅ Config loaded and applied
✅ Role definitions loaded
✅ Lean workflow executor active
✅ Scoring system operational
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
**W7:** Simple learning capture through basic memory storage

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
**Learning System:** Simple memory storage for basic learning

### Role Assignment Validation
**Integration:** Uses validation from lean-workflow-executor-v2
**Mandatory:** PM + Specialist Architect triage for all story/bug creation
**Governance:** Prevents wrong specialist assignments and meaningless tasks

---

**LEAN VIRTUAL TEAM: Assignment-driven workflow with essential governance through simple validation**