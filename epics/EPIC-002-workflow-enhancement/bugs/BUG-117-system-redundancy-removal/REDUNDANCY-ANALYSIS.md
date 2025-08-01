# REDUNDANCY ANALYSIS - BUG-117

## SCOPE: /src/ directory ONLY (NOT ~/.claude)

## WORKFLOW CAPABILITIES (from executable-workflow.md)

The workflow handles:
1. Role switching via subagent calls
2. Memory search operations
3. Task creation and execution
4. Priority management (P0→P1→P2→P3)
5. Git operations (branch, commit, push, MR)
6. Peer review with SME assignment
7. Learning capture and retrospectives
8. Dynamic specialist creation (<70% match)
9. Parallel task execution (up to 5)
10. L3 autonomous mode execution

## DETAILED FILE ANALYSIS

### /src/behaviors/ (10 files in project)

#### 1. workflow-coordination.md
**PURPOSE:** Task queue and priority management
**REDUNDANCY:** Priority system duplicated in workflow (lines 209-213)
**UNIQUE:** Queue operations, dependency management, parallel conflict detection
**VERDICT:** PARTIAL REDUNDANCY - Keep queue/dependency logic, remove priority rules

#### 2. workflow-enforcement-patterns.md
**PURPOSE:** Enforce workflow execution
**CREATED:** During BUG-115
**REDUNDANCY:** Entire file - workflow is self-enforcing via subagents
**VERDICT:** FULL REDUNDANCY - DELETE

#### 3. workflow-executor-simple.md  
**PURPOSE:** Simple workflow execution
**CREATED:** During BUG-115
**REDUNDANCY:** Entire file - duplicates executable-workflow.md
**VERDICT:** FULL REDUNDANCY - DELETE

#### 4. workflow-integration-strategy.md
**PURPOSE:** How to integrate workflows
**CREATED:** During BUG-115
**REDUNDANCY:** Documentation only, workflow handles execution
**VERDICT:** FULL REDUNDANCY - DELETE

#### 5. workflow-auto-correction-design.md
**PURPOSE:** Auto-correct workflow violations
**CREATED:** During BUG-115
**REDUNDANCY:** Workflow enforces itself via subagents
**VERDICT:** FULL REDUNDANCY - DELETE

### /src/behaviors/shared-patterns/ (5 files)

#### 1. configuration-patterns.md
**PURPOSE:** Configuration loading patterns
**UNIQUE:** Settings hierarchy, cache patterns
**REDUNDANCY:** None - workflow doesn't handle config
**VERDICT:** KEEP

#### 2. learning-patterns.md
**PURPOSE:** Learning storage patterns
**REDUNDANCY:** Basic storage duplicated in workflow retrospective
**UNIQUE:** Error forgiveness logic, bonus calculations
**VERDICT:** PARTIAL REDUNDANCY - Keep error/bonus logic

#### 3. validation-enforcement-patterns.md
**PURPOSE:** Validation and auto-correction
**REDUNDANCY:** Capability matching in workflow
**UNIQUE:** Auto-correction patterns, violation detection
**VERDICT:** PARTIAL REDUNDANCY - Keep auto-correction

#### 4. organization-patterns.md
**PURPOSE:** File organization patterns
**UNIQUE:** Directory structures, naming conventions
**REDUNDANCY:** None - workflow doesn't define file org
**VERDICT:** KEEP

#### 5. l3-autonomy-patterns.md
**PURPOSE:** L3 autonomous execution patterns
**REDUNDANCY:** Basic L3 check in workflow
**UNIQUE:** Stop conditions, recovery strategies
**VERDICT:** PARTIAL REDUNDANCY - Keep stop conditions

### /src/commands/ (66 files)

#### MEMORY COMMANDS (to analyze):
- icc-memory-init.md
- icc-memory-store.md  
- icc-memory-cleanup.md
- icc-memory-search.md (if exists)

#### QUEUE COMMANDS (to analyze):
- icc-queue-add.md
- icc-queue-get-parallel.md

#### VALIDATION COMMANDS (to analyze):
- icc-validate-file.md
- icc-validate-naming.md
- icc-validate-role-title.md

#### GIT COMMANDS (to analyze):
- icc-git-clean.md
- icc-git-validate.md

## RECOMMENDATIONS

### DELETE (5 files - all workflow duplicates from BUG-115):
1. workflow-enforcement-patterns.md
2. workflow-executor-simple.md
3. workflow-integration-strategy.md
4. workflow-auto-correction-design.md
5. Any workflow YAML files if still present

### CONSOLIDATE:
1. Merge validation patterns
2. Extract unique queue logic from workflow-coordination.md
3. Consolidate learning patterns

### KEEP:
1. Configuration patterns (unique)
2. Organization patterns (unique)
3. Core behaviors that add functionality beyond workflow

## NEXT STEPS
1. Delete identified redundant files
2. Extract unique functionality before consolidation
3. Update imports in remaining files
4. Test all functionality preserved