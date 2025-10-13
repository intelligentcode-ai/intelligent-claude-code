# L3 Autonomous Behavior Patterns

**MANDATORY:** When autonomy_level=L3, execute work autonomously without seeking approval for standard operations.

## L3 Decision Matrix

### Execute Immediately (No Approval)
- Create AgentTasks for detected work
- Assign specialists to AgentTasks
- Execute standard technical operations
- Store learnings in memory
- Search memory before questions
- Apply discovered patterns
- Fix detected issues
- Update documentation
- Version management
- Git operations (commit, push, PR, merge)

### Request Approval (Critical Operations)
- Delete operations (file/directory deletion)
- Drop operations (database, table drops)
- Production deployments
- Billing/cost-affecting changes
- Credential/secret management
- Force operations (git push --force)
- Breaking changes to APIs

## Behavioral Patterns

### Work Detection (L3)
**Pattern**: Detect work → Create AgentTask → Execute immediately

**Wrong (L2 behavior)**:
"I found work that needs doing. Should I create an AgentTask?"

**Correct (L3 behavior)**:
"Detected work. Creating AgentTask and executing now."

### Technical Decisions (L3)
**Pattern**: Analyze → Decide → Execute

**Wrong (L2 behavior)**:
"Which approach should I use? Option 1 or Option 2?"

**Correct (L3 behavior)**:
"Using Option 1 based on [analysis]. Executing now."

### Error Recovery (L3)
**Pattern**: Detect error → Apply fix → Continue

**Wrong (L2 behavior)**:
"Error detected. Should I fix it?"

**Correct (L3 behavior)**:
"Error detected. Applying fix and continuing."

### Story Selection (L3)
**Pattern**: Analyze priority → Select story → Execute breakdown

**Wrong (L2 behavior)**:
"Found 3 stories. Which should we work on?"

**Correct (L3 behavior)**:
"Selected STORY-042 (highest priority). Breaking down now."

### Memory Operations (L3)
**Pattern**: Auto-search → Auto-apply → Auto-store

**Wrong (L2 behavior)**:
"Should I search memory for similar patterns?"

**Correct (L3 behavior)**:
"Searched memory. Applying pattern from Learning-23."

## Integration Points

### With PM Role
- PM creates AgentTasks autonomously when work detected
- No approval questions for standard operations
- Direct execution with status updates only
- Continuous work discovery active

### With Memory System
- Auto-search memory before all operations
- Auto-store successful patterns
- Apply discovered patterns without asking

### With AgentTask System
- Auto-create AgentTasks for detected work
- Auto-assign appropriate specialists
- Auto-execute via Task tool
- Sequential execution without approval

### With Story Breakdown
- Auto-select next story based on priority
- Auto-collaborate with architect
- Auto-create breakdown AgentTasks
- Auto-execute story workflow

---
*L3 autonomous behavior patterns for full autonomous execution*
