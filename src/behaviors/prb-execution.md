# PRB Execution Behavior

**MANDATORY:** All PRBs execute via automatic agent invocation with Task tool - enforce completion checklist and auto-correct false completion claims.

## Imports
@./shared-patterns/non-blocking-task-patterns.md
@./shared-patterns/prb-queue-management.md

## PRB Execution Flow

**Complete Flow:**
1. PRB created with complete context
2. Appropriate agent identified via work type analysis
3. Agent executed automatically via Task tool
4. Results captured and integrated

## Automatic Agent Invocation System

### Agent Selection Logic
**MANDATORY:** Match PRB work type to correct agent specialization:

<!-- IMPLEMENTATION NOTE: Agent selection analyzes PRB content for work type patterns
     and automatically selects the most appropriate specialist. This eliminates manual
     role assignment and ensures optimal expertise matching for each PRB execution. -->

**Work Type Analysis:**
- **AI/Behavioral Patterns:** PRBs involving behavioral patterns, memory operations, PRB frameworks → @AI-Engineer
- **Code Implementation:** Feature development, bug fixes, refactoring → @Developer
- **Architecture Design:** System design, technical architecture, framework decisions → @Architect
- **Infrastructure/DevOps:** CI/CD, deployment, containers, scaling → @DevOps-Engineer
- **Security Assessment:** Security reviews, vulnerability analysis, compliance → @Security-Engineer
- **Database Operations:** Schema design, queries, performance optimization → @Database-Engineer
- **Quality Assurance:** Testing frameworks, test planning, validation → @QA-Engineer
- **Requirements Analysis:** Documentation, specifications, requirements → @Requirements-Engineer

### Dynamic Specialist Creation
**UNLIMITED DOMAINS:** Automatically create specialists for ANY technology domain:
- **Technology Detection:** Extract technology stack from PRB context
- **Specialist Generation:** Create @[Technology]-Engineer, @[Domain]-Developer, @[Platform]-Architect
- **Examples:** @React-Developer, @AWS-Engineer, @Kubernetes-DevOps-Engineer, @ML-Specialist
- **Expertise Level:** All specialists operate with 10+ years domain expertise

### Task Tool Integration
**MANDATORY PATTERN:** All PRB execution via Task tool subagents with non-blocking support:

<!-- IMPLEMENTATION NOTE: Task tool creates isolated execution environment for each
     agent, ensuring complete context passing and preventing configuration lookups
     at runtime. This maintains PRB self-containment and execution reliability. -->

#### Standard Blocking Execution
```markdown
Task(
    subagent_type='general-purpose',
    description='Execute [PRB-ID]: [brief_description]',
    prompt='[Complete PRB context with embedded configuration]'
)
```

#### Non-Blocking Execution Pattern
**For Parallel Execution (L3 Mode):**
```markdown
Task(
    subagent_type='general-purpose',
    description='Execute [PRB-ID]: [brief_description]',
    prompt='[Complete PRB context with embedded configuration]',
    run_in_background=true
)
```

**Non-Blocking Decision Criteria:**
- **Use Non-Blocking When:**
  - L3 autonomous mode with max_parallel > 1
  - Independent PRBs without dependencies
  - Long-running tasks (>2 minutes expected)
  - Available parallel capacity exists
  
**Use Blocking When:**
- L1/L2 modes requiring approval
- Dependent PRBs needing previous results
- Critical operations requiring immediate feedback
- At max_parallel capacity threshold

#### Background Agent Tracking
**Agent Handle Management:**
```yaml
parallel_execution:
  current_running: [count]
  max_capacity: [from_config]
  agent_registry:
    - handle: [agent_id]
      prb_id: [prb_id]  
      start_time: [timestamp]
      status: running|completed|error
```

**Status Monitoring Pattern:**
1. Store agent handle on background launch
2. Periodically check agent status (every 2-5 minutes)
3. Process completion or handle errors
4. Clean up completed agents from registry
5. Auto-dispatch queued PRBs when slots available

**EXECUTION ISOLATION:**
- Complete PRB context passed to agent
- No runtime configuration lookups
- Self-contained execution environment
- Agent operates with full project context
- Background execution maintains same isolation guarantees

## Execution Clarity

### PRB Execution Patterns
**AUTOMATIC AGENT INVOCATION:** PRBs trigger appropriate agent selection and Task tool execution
**PARALLEL EXECUTION:** Non-blocking Task tool enables parallel agent execution (L3 mode)
**SUBAGENT EXECUTION:** All PRBs execute via AGENTS with embedded context
**SELF-CONTAINED:** No external config lookups or runtime dependencies
**COMPLETION TRACKING:** Mandatory checklist validation with background status monitoring

### Context Requirements
**PRB MUST CONTAIN:**
- Complete embedded configuration
- Resolved placeholders (zero `[.*]` patterns)
- Self-contained execution context
- Quality standards and success criteria
- Agent specialization requirements

## Execution Checklist

### Pre-Execution Validation
☐ **Template Compliance:** PRB follows template structure
☐ **Context Completeness:** All required context embedded
☐ **Role Assignment:** Appropriate specialist assigned
☐ **Quality Standards:** Standards defined and clear

### During Execution
☐ **Progress Tracking:** Track execution progress
☐ **Quality Maintenance:** Maintain standards throughout
☐ **Context Preservation:** Stay within PRB scope
☐ **Issue Documentation:** Document discoveries for future PRBs

### Post-Execution Validation
☐ **Requirements Met:** All PRB requirements satisfied
☐ **Quality Standards:** Standards met or exceeded
☐ **Testing Complete:** All tests pass
☐ **Documentation Updated:** Relevant docs updated
☐ **Git Operations Clean:** Professional commits, no AI mentions
☐ **Learning Captured:** Patterns stored in memory

## Completion Validation

### False Completion Detection
**BLOCK completion claims without checklist validation**
**VALIDATE:** All 6 PRB sections executed, settings compliance verified, requirements met

### Mandatory Completion Steps
1. **Checklist Validation:** All items completed
2. **Quality Review:** Standards compliance verified
3. **Learning Capture:** Success patterns stored
4. **File Movement:** PRB moved from ready/ to completed/

## Error Handling

### Execution Issues
**RECOVERABLE:** Test failures, lint errors, import errors, type errors
**NON-RECOVERABLE:** Create fix task, log for manual review, continue other work

### Context Discipline
**STRICT RULES:**
- Never leave PRB context for other issues
- Complete current PRB before noting issues
- Document discoveries for future PRBs
- Only switch on explicit user command

### Adaptation Handling
**DYNAMIC UPDATES:** Modify PRB context when corrections provided
**AGENT RESTART:** Seamless transition with updated context
**VALIDATION:** Maintain template compliance during updates

---
*PRB execution with completion validation and quality assurance*