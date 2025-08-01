# Workflow Integration Guide

**Last Updated:** 2025-01-19  
**Status:** Complete  
**Purpose:** Explain how workflows guide execution in the intelligent-claude-code system

## Overview

The intelligent-claude-code system uses **two workflow templates** that orchestrate all development activities:

1. **Outer Workflow** - Guides epic, story, and bug planning (strategic level)
2. **Inner Workflow** - Guides task execution by specialists (tactical level)

These workflows work together to provide structure while maintaining flexibility through assignment-driven execution.

## Workflow Architecture

### Assignment-Driven Execution

The system follows an **assignment-driven architecture** where workflow structure comes from YAML assignment files rather than complex enforcement logic:

```yaml
# Assignment files drive behavior
epic.yaml    → Outer workflow activation → Story/bug creation
story.yaml   → Outer workflow planning → Task decomposition  
task.md      → Inner workflow execution → Specialist work
```

### Workflow Hierarchy

```
Outer Workflow (Planning Level)
├── Epic Definition
├── Story/Bug Creation
├── Task Decomposition
├── Role Assignment & Validation
├── Git Branch Creation
└── Acceptance Criteria

Inner Workflow (Execution Level)
├── Knowledge Retrieval
├── Task Planning
├── Task Execution
├── Peer Review
├── Git Operations (commits/pushes)
└── Learning Capture
```

## Outer Workflow: Planning Process

The outer workflow (`workflow-templates/outer-workflow.yaml`) orchestrates how epics are broken into stories/bugs and then into tasks.

### Phase 1: Knowledge Retrieval

**Purpose:** Start with existing knowledge before planning new work

```yaml
# Automatic memory search queries
- "Similar features implemented"
- "Past architectural decisions"  
- "Lessons learned from related work"
```

**Example:**
```bash
# Planning OAuth story
Memory search: "OAuth implementation patterns"
Found: Previous JWT integration approach
Apply: Reuse token storage pattern
```

### Phase 2: Epic Definition

**Purpose:** Define the overarching initiative

**Responsible Roles:** @PM, @Architect, @Requirements-Engineer

**Activities:**
- Define epic boundaries and goals
- Set success metrics
- Identify constraints

### Phase 3: Story and Bug Creation

**Purpose:** Break epic into implementable pieces

**Story Types:**
- NEW_FEATURE - New functionality
- ENHANCEMENT - Improve existing
- REFACTOR - Technical improvement

**Priority Inheritance:**
```yaml
Story Priority = MAX(Epic Priority, Story Severity)
# Security stories → P0 (automatic)
# Customer bugs → Priority +1 level
```

### Phase 4: Task Decomposition

**Purpose:** Break stories/bugs into specialist-assignable tasks

**Mandatory Requirements:**
1. **Role in Title** - "[Role] Task description"
2. **Minimum 3 Subtasks** - Maximum granularity
3. **Parallelization** - Identify concurrent opportunities
4. **Sequential Thinking** - Use /icc:think-sequential
5. **UltraThinking** - Apply maximum depth analysis
6. **Ultra-Experienced** - Create 10+ year specialists

**Validation Chain:**
```bash
# Mandatory validation steps
1. icc:detect-work-type → Analyze task type
2. icc:require-triage → PM + Architect approval
3. icc:validate-assignments → >70% capability match
4. icc:require-approval → Final dual approval
```

### Phase 5: Git Operations

**Purpose:** Establish version control structure

**Branch Creation:**
```bash
# Per story/bug
feature/STORY-001-oauth-login
bug/BUG-012-fix-timeout
```

### Phase 6: Knowledge Generation

**Purpose:** Capture planning decisions

**Stores:**
- Epic breakdown reasoning
- Story priorities
- Task assignments
- Risk mitigations

## Inner Workflow: Task Execution

The inner workflow (`workflow-templates/inner-workflow.yaml`) guides how individual tasks are executed by specialists.

### Phase 1: Knowledge Retrieval

**Purpose:** Load relevant patterns before execution

```yaml
# Task-specific searches
- "Past solutions for this task type"
- "Code patterns that worked"
- "Known issues and fixes"
```

### Phase 2: Task Planning

**Purpose:** Specialist plans approach

**Decision Points:**
- Simple task → Direct execution
- Complex task → Create subtasks

**Optional Subtasks:**
```markdown
1. Setup environment
2. Implement core logic
3. Add error handling
4. Write tests
5. Update documentation
```

### Phase 3: Task Execution

**Purpose:** Perform the actual work

**Execution Approach:**
- Follow retrieved patterns
- Apply specialist expertise
- Consider edge cases
- Maintain quality standards

**Progress Tracking:**
```yaml
statuses: [in_progress, blocked, completed, needs_review]
priority_display: "[P0]", "[P1]", "[P2]", "[P3]"
```

### Phase 4: Peer Review

**Purpose:** Domain expert validation

**Validation Requirements:**
- Reviewer must have domain expertise
- Capability match >70%
- Not the task implementer

**Enforcement Rules:**
```yaml
AI work → @AI-Engineer or @AI-Architect review
Security work → @Security-Engineer review
Infrastructure → @DevOps-Engineer review
Generic reviewers → BLOCKED
```

### Phase 5: Git Operations

**Purpose:** Commit and push changes

**Per-Task Operations:**
```bash
# Commit template
git commit -m "TASK-001: Implement OAuth token validation"

# Privacy mode (if enabled)
# Strips: AI mentions, Claude, emojis
```

### Phase 6: Knowledge Generation

**Purpose:** Capture task learnings

**Learning Entity:**
```yaml
TaskLearning:
  task_id: "TASK-001"
  approach_taken: "Used JWT with refresh tokens"
  challenges_faced: "Token expiration edge cases"
  solutions_found: "Implemented grace period"
  patterns_identified: "Refresh before expiry"
```

## Workflow Integration Points

### Command Chain Integration

Workflows integrate with behavioral command chains:

```bash
# Outer workflow commands
icc:create-story → Triggers story creation phase
icc:plan-story → Activates task decomposition
icc:validate-work-type → Enforces validation chain

# Inner workflow commands  
icc:activate-role → Switches to specialist
icc:memory-first → Retrieves knowledge
icc:quality-gates → Validates completion
```

### Configuration Integration

Workflows respect the configuration hierarchy:

```yaml
# Embedded config in story.yaml
embedded_config:
  autonomy_level: "L3"
  blocking_enabled: false
  
# Applied during workflow execution
- L3 mode → Continuous execution
- No blocking → Create follow-up tasks
```

### Learning System Integration

Both workflows integrate with the learning system:

```yaml
# Outer workflow
- Capture planning decisions
- Store architectural patterns
- Document team insights

# Inner workflow  
- Record task approaches
- Extract code patterns
- Share specialist knowledge
```

## Practical Examples

### Example 1: Creating OAuth Feature

**Outer Workflow Execution:**

1. **Knowledge Retrieval**
   ```bash
   Search: "OAuth implementation"
   Found: JWT pattern from previous project
   ```

2. **Story Creation**
   ```yaml
   story:
     id: STORY-015
     title: "Implement OAuth Login"
     epic: EPIC-001
     priority: P1
   ```

3. **Task Decomposition**
   ```yaml
   tasks:
     - "[Backend-Developer] Create OAuth provider integration"
     - "[Database-Engineer] Design token storage schema"
     - "[Security-Engineer] Review authentication flow"
     - "[QA-Engineer] Create integration tests"
   ```

4. **Validation Chain**
   ```bash
   ✓ Work type: authentication (security domain)
   ✓ Triage: @PM + @Security-Architect approved
   ✓ Capability match: All >70%
   ✓ Final approval: Granted
   ```

### Example 2: Executing Database Task

**Inner Workflow Execution:**

1. **Knowledge Retrieval**
   ```bash
   Search: "token storage patterns"
   Found: Encrypted token table design
   ```

2. **Task Planning**
   ```markdown
   Subtasks:
   1. Create migration script
   2. Add encryption functions
   3. Create indexes
   4. Write tests
   ```

3. **Execution**
   ```sql
   -- Following retrieved pattern
   CREATE TABLE oauth_tokens (
     id UUID PRIMARY KEY,
     user_id UUID NOT NULL,
     encrypted_token TEXT NOT NULL,
     expires_at TIMESTAMP NOT NULL
   );
   ```

4. **Peer Review**
   ```yaml
   Reviewer: @Database-Architect
   Focus: Schema design, indexes, security
   Result: Approved with suggestions
   ```

5. **Git Operations**
   ```bash
   git commit -m "TASK-002: Design token storage schema"
   git push origin feature/STORY-015-oauth-login
   ```

## Workflow Benefits

### Structure Without Rigidity
- Clear phases guide work
- Flexibility through assignment files
- Embedded config overrides
- Hooks for customization

### Quality Through Validation
- Mandatory validation chains
- Capability matching
- Domain expert reviews
- Learning capture

### Efficiency Through Automation
- Automatic priority inheritance
- Parallel task identification
- Knowledge retrieval
- Progress tracking

### Continuous Improvement
- Learning synthesis
- Pattern extraction
- Cross-task insights
- Team knowledge sharing

## L3 Autonomous Mode

In L3 mode, workflows execute continuously:

### Outer Workflow in L3
- Auto-create stories from detected needs
- Immediate task decomposition
- No approval stops (except critical)
- Continuous planning cycles

### Inner Workflow in L3
- Parallel task execution (up to 5)
- Non-blocking reviews
- Auto-recovery from errors
- Continuous progression

### Stop Conditions (L3 Only)
- BUSINESS_CRITICAL_DECISION
- SECURITY_VIOLATION
- DATA_LOSS_RISK
- CRITICAL_QUALITY_FAILURE

## Integration with Other Systems

### Memory Integration
```yaml
Before: Search relevant patterns
During: Apply retrieved knowledge
After: Store new learnings
```

### Scoring Integration
```yaml
Task completion: +1.0P/Q
Learning application: +0.5P/Q bonus
Priority bonuses: P0(+2.0), P1(+1.5), P2(+1.0), P3(+0.5)
```

### Tool Integration
- Read: Load assignment files
- Task: PM delegation
- Memory: Knowledge operations
- Git: Version control
- TodoWrite: Progress tracking

## Summary

The workflow integration provides:

1. **Clear Structure** - Defined phases for planning and execution
2. **Flexible Implementation** - Assignment-driven, not rigid enforcement
3. **Quality Assurance** - Validation chains and peer reviews
4. **Continuous Learning** - Knowledge retrieval and generation
5. **Efficient Execution** - Parallel tasks and smart automation

The workflows act as **guides, not enforcers**, providing structure while allowing the virtual team to adapt to specific project needs through assignment files and embedded configuration.