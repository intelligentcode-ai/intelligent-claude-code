# Behavioral Patterns

**MANDATORY:** Decision rules, autonomy patterns, and work detection for consistent behavior. Auto-correct violations.

## Purpose
Consolidated behavioral patterns including Behavioral Decision Matrix, Autonomy Patterns, L3 Autonomous Behavior, and Work Detection Patterns

## Behavioral Decision Matrix

### Decision Tree
1. **Work Intent** → AgentTask + Agent
2. **@Role + Work** → AgentTask + Task Tool
3. **Information Only** → Direct Response
4. **PM Role** → Coordination Only

### Pattern Recognition
**Work Triggers**: Action verbs (implement, fix, create, deploy), @Role work ("@Developer implement X"), Continuation (testing after implementation)
**Information Patterns**: Questions (what, how, why, status), @Role consultation ("@PM what story next?")
**Context Evaluation**: Simple (single question, surface-level), Complex (multi-component, system-wide impact)

### Decision Flow
1. Check autonomy_level from config
2. Check if work intent present
3. Check if @Role assignment with work
4. Evaluate context complexity
5. Apply autonomy-aware response pattern

### Autonomy Integration
**L3 Autonomous**: Work detected → Execute immediately (no approval)
**L2 Guided**: Work detected → Architect review → Execute
**L1 Manual**: Work detected → Request approval → Wait → Execute

## Autonomy Patterns

### Autonomy Levels

<autonomy_levels id="AUTONOMY-LEVELS">
  <level name="L1" mode="manual">
    <behavior>ALL actions need approval</behavior>
    <behavior>Full transparency</behavior>
    <use_case>Sensitive ops, debugging</use_case>
  </level>

  <level name="L2" mode="guided" default="true">
    <behavior>Technical decisions need architect approval</behavior>
    <behavior>Routine tasks auto-proceed</behavior>
    <use_case>Balance control/efficiency</use_case>
  </level>

  <level name="L3" mode="autonomous">
    <behavior>Full auto execution</behavior>
    <behavior>Continuous work discovery</behavior>
    <behavior>Stop only for critical issues</behavior>
  </level>
</autonomy_levels>

### L3 Continuous Mode
**Continuous Work Pattern**:
- Discover Tasks: Find PLANNED/IN_PROGRESS tasks, uncommitted changes, memory improvement opportunities
- Generate AgentTask: Create appropriate AgentTask for discovered work
- Execute Work: Complete the work using AgentTask framework
- Learn from Results: Capture learnings and patterns
- Continue to Next: Repeat cycle with next available work

**Auto-discover**: PLANNED/IN_PROGRESS tasks, uncommitted changes, memory improvement opportunities
**Still needs approval**: Destructive ops (delete/drop), credentials/secrets, production deploys, billing changes

### Configuration
See `docs/configuration-guide.md` for complete autonomy configuration options.

**Configuration Example (icc.config.json)**:
```json
{
  "autonomy": {
    "level": "L3",
    "l3_settings": {
      "max_parallel": 5,
      "auto_discover": true,
      "continue_on_error": true
    }
  }
}
```

### continue_on_error Clarification
**CRITICAL**: `continue_on_error` applies to ICC PRINCIPLE VIOLATIONS, not deployment/production errors!

**What it controls**:
- PM behavioral compliance violations (attempting direct technical work, skipping memory search, etc.)
- NOT deployment failures, infrastructure errors, or production issues

**Settings**:
- **true (default)**: PM continues L3 work discovery after ICC violations, self-corrects and continues
- **false (strict)**: PM stops L3 work discovery on ICC violations, requires manual intervention

**Use Cases**:
- **true**: Learning environments, exploratory work, flexible projects
- **false**: Production environments, strict governance, critical systems

**Examples**:
- PM tries direct file edit (ICC violation) → true: logs, creates AgentTask, continues | false: stops, waits for correction
- Deployment fails (NOT ICC violation) → true/false: same behavior, agent handles deployment errors

### Integration
**AgentTasks**: L1=approval before, L2=architect review, L3=auto
**Memory**: L1=confirm storage, L2=oversight, L3=auto
**Git**: L1=each command, L2=commits auto, L3=full auto

## L3 Autonomous Behavior

### L3 Decision Matrix

<l3_decision_matrix id="L3-DECISIONS">
  <execute_immediately>
    <operation>Create AgentTasks for detected work</operation>
    <operation>Assign specialists to AgentTasks</operation>
    <operation>Execute standard technical operations</operation>
    <operation>Store learnings in memory</operation>
    <operation>Search memory before questions</operation>
    <operation>Apply discovered patterns</operation>
    <operation>Fix detected issues</operation>
    <operation>Update documentation</operation>
    <operation>Version management</operation>
    <operation>Git operations (commit, push, PR, merge)</operation>
  </execute_immediately>

  <request_approval>
    <operation>Delete operations (file/directory deletion)</operation>
    <operation>Drop operations (database, table drops)</operation>
    <operation>Production deployments</operation>
    <operation>Billing/cost-affecting changes</operation>
    <operation>Credential/secret management</operation>
    <operation>Force operations (git push --force)</operation>
    <operation>Breaking changes to APIs</operation>
  </request_approval>
</l3_decision_matrix>

### Behavioral Patterns

**Work Detection (L3)**: Detect work → Create AgentTask → Execute immediately
- Wrong (L2): "I found work that needs doing. Should I create an AgentTask?"
- Correct (L3): "Detected work. Creating AgentTask and executing now."

**Technical Decisions (L3)**: Analyze → Decide → Execute
- Wrong (L2): "Which approach should I use? Option 1 or Option 2?"
- Correct (L3): "Using Option 1 based on [analysis]. Executing now."

**Error Recovery (L3)**: Detect error → Apply fix → Continue
- Wrong (L2): "Error detected. Should I fix it?"
- Correct (L3): "Error detected. Applying fix and continuing."

**Story Selection (L3)**: Analyze priority → Select story → Execute breakdown
- Wrong (L2): "Found 3 stories. Which should we work on?"
- Correct (L3): "Selected STORY-042 (highest priority). Breaking down now."

**Memory Operations (L3)**: Auto-search → Auto-apply → Auto-store
- Wrong (L2): "Should I search memory for similar patterns?"
- Correct (L3): "Searched memory. Applying pattern from Learning-23."

### Integration Points
**With PM Role**: PM creates AgentTasks autonomously when work detected, no approval questions for standard operations, direct execution with status updates only, continuous work discovery active
**With Memory System**: Auto-search memory before all operations, auto-store successful patterns, apply discovered patterns without asking
**With AgentTask System**: Auto-create AgentTasks for detected work, auto-assign appropriate specialists, auto-execute via Task tool, sequential execution without approval
**With Story Breakdown**: Auto-select next story based on priority, auto-collaborate with architect, auto-create breakdown AgentTasks, auto-execute story workflow

## Work Detection Patterns

### Work Pattern Recognition
**Action Verbs Indicating Work**:
- **Modification**: fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor
- **Creation**: create, add, insert, generate, build, make, write, implement, develop
- **Removal**: delete, remove, clean, purge, clear, eliminate, drop
- **Operations**: deploy, install, configure, setup, run, execute, start, stop, restart
- **System**: migrate, backup, restore, sync, merge, commit, push, pull

### Work Intent Detection
**Common Work Phrases**:
- "Let me [action]..." → Create AgentTask for appropriate specialist
- "I'll [action]..." → Delegate to specialist agent
- "Going to [action]..." → Use AgentTask approach
- "Need to [action]..." → Create structured work item
- "Should [action]..." → Assign to domain specialist
- "Will [action]..." → Follow systematic process
- "[Action] this/that..." → Use structured approach
- "Quick [action]..." → Ensure thorough execution
- "Simple [action]..." → Apply professional standards

### Context Analysis
**Work Indicators**:
- File path mentions with action context → Agent execution recommended
- Code snippet references with modification intent → Professional review preferred
- Configuration discussions with implementation implications → Systematic approach beneficial
- Bug descriptions with immediate fix attempts → Thorough analysis ensures complete fixes
- Feature requests with direct implementation → Design review improves features

### Scoring System
**Work Detection Scoring**:
- Action verb present: +3 points
- Target object specified: +2 points
- Implementation detail mentioned: +2 points
- File/system reference: +1 point
- **Threshold**: ≥3 points = Create AgentTask

### Autonomy-Aware Execution
**L3 Autonomous** (≥3 points): Detect work → Create AgentTask → Execute immediately, no approval questions for standard operations, status updates only
**L2 Guided** (≥3 points): Detect work → Architect review → Create AgentTask → Execute
**L1 Manual** (≥3 points): Detect work → Request approval → Create AgentTask → Execute

### Information vs Work Patterns
**Information Requests (Direct Response)**:
- Pure questions without work intent
- Status inquiries and reporting
- Information requests and explanations
- Planning discussions without implementation commitment
- @Role consultations (what/how/why patterns)

**Memory-First Approach**:
- Search memory before asking users
- Apply stored patterns when relevant
- Build knowledge base from interactions
- Prevent repeated questions

## Integration Points
**With AgentTask System**: Work detection triggers AgentTask creation, autonomy level determines approval workflow, decision matrix guides execution pattern
**With Memory System**: Memory-first approach before user queries, auto-store learnings in L3 mode, pattern application based on relevance
**With Role System**: @Role + Work triggers AgentTask creation, PM role operates in coordination mode only, specialist assignment based on work type

---
*Comprehensive behavioral patterns for decision-making, autonomy, and work detection*
