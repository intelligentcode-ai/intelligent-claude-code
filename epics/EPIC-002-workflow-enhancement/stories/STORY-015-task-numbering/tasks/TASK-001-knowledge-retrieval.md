# TASK-001: Knowledge Retrieval - Task Numbering Patterns

## Task Details
- **ID**: TASK-001
- **Title**: Knowledge retrieval - task numbering patterns
- **Assigned To**: @AI-Engineer
- **Status**: COMPLETED
- **Effort**: small

## Execution Log

### Memory Search Results

#### 1. Task Format and Numbering Patterns Found

**Task Format Protocol**:
- Mandatory format: `@Role (P: Xpts, Q: Ypts - State, Size: Small/Standard): [action]`
- Task IDs follow pattern: `TASK-XXX-title.md` format
- Tasks must have individual IDs within stories/bugs
- Task files are self-contained units

**Workflow Phases** (from multiple sources):
- INIT → PLAN → EXECUTE → ACCEPTANCE → DONE
- These phases are used in the enhanced planning system
- Each phase has specific entry/exit criteria

**Command Patterns**:
- Commands use `icc:` prefix (e.g., `icc:memory-first`, `icc:think-sequential`)
- Slash commands integrated into workflow execution
- Commands enforce behavioral patterns like memory consultation

#### 2. Role Restrictions and Responsibilities

**PM Role Restrictions**:
- PM cannot implement - must delegate via Task tool
- PM cannot be assigned to stories - must coordinate
- PM must consult Architect for role assignments
- PM blocked from direct implementation work

**Task Tool Usage**:
- Requires `@Role: Task description` format
- Mandatory for ALL role involvement (impersonation protocol)
- Used for delegation, not self-implementation
- Complex tasks (>3 steps) require Task tool usage

#### 3. Existing Conventions to Preserve

**Hierarchy Convention**:
- Epic → Story/Bug → Task → Subtask
- Tasks belong to stories/bugs, not directly to epics
- Subtasks are optional within tasks

**File Organization**:
- Task files stored within story/bug directories
- Pattern: `epics/EPIC-XXX/stories/STORY-XXX/tasks/TASK-XXX-title.md`
- Assignment files use YAML format with embedded config

**Priority System**:
- P0 → P1 → P2 → P3 execution order
- Tasks inherit priority from parent story/bug
- Security issues auto-escalate to P0

#### 4. Conflicts with Proposed Patterns

**Potential Conflicts**:
1. **Sequential numbering** might conflict with parallel task creation
2. **Role-based prefixes** could complicate file organization
3. **Workflow stage indicators** might duplicate phase tracking in YAML

**No Major Conflicts Found**:
- System already uses task numbering (TASK-XXX)
- Workflow phases already defined (INIT→PLAN→EXECUTE→ACCEPTANCE→DONE)
- Role assignments already tracked in YAML files

### Key Findings Summary

1. **Task numbering exists**: TASK-XXX pattern already in use
2. **Workflow stages defined**: 5-phase workflow already implemented
3. **Role assignment enforced**: Via Task tool with mandatory format
4. **File organization clear**: Hierarchical structure preserves relationships
5. **Priority system functional**: Inheritance and escalation rules defined

### Recommendations for STORY-015

Based on memory retrieval:
1. **Enhance existing TASK-XXX pattern** rather than replace it
2. **Use existing workflow phases** (INIT→PLAN→EXECUTE→ACCEPTANCE→DONE)
3. **Maintain Task tool format** for role assignments
4. **Preserve file hierarchy** for task organization
5. **Consider adding stage indicators** to task IDs (e.g., TASK-001-PLAN)

## Acceptance Criteria Results
- ✅ Compiled relevant knowledge about task patterns
- ✅ Identified existing conventions (TASK-XXX, workflow phases)
- ✅ Documented findings for implementation use
- ✅ No major conflicts with proposed patterns identified

## Status
COMPLETED - All knowledge retrieved and documented