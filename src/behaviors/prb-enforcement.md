# PRB Enforcement

**MANDATORY:** MUST use PRB system for all work. Auto-correct violations.

**PURPOSE:** Enforce PRB-based execution and prevent legacy workflow usage

## Imports
@./shared-patterns/template-loading.md

## Detection Patterns

### CRITICAL: Direct PRB Execution Detection
**HIGHEST PRIORITY:** Block ALL direct PRB execution attempts immediately
**Detection Pattern:** Any attempt to execute PRB without Task tool subagent
**Action:** IMMEDIATE BLOCK → Display Task tool requirement → Prevent execution
**Error:** "❌ PRB execution REQUIRES Task tool subagent - NO EXCEPTIONS"

**BLOCKING TRIGGERS:**
- PRB execution without Task tool context
- Direct file access to *.prb.yaml files for execution
- Any PRB workflow initiation outside Task tool
- Attempts to bypass Task tool requirement

### @Role Detection
**All Formats:** "@Role:", "@Role", "Ask @Role", "@Role\n", "[@Role]", "@Role-Name"
**Action:** Generate appropriate PRB → Block direct execution → REQUIRE Task tool
**Task Tool Required:** ALL @Role mentions MUST use Task tool invocation
**Error:** "❌ @Role delegation requires Task tool usage. Use Task tool with subagent_type='general-purpose'"

### Work Item Detection  
**Patterns:** TASK-XXX, STORY-XXX, BUG-XXX, EPIC-XXX, PRB-XXX mentions
**Action:** Convert to PRB if not already → Execute PRB directly
**Context:** Preserve user intent in PRB generation

### PRB Validation
**Check:** Work has PRB? Correct template? Complexity accurate?
**Block:** Direct execution without PRB → Auto-generate PRB first

### System Nature Role Validation
**MANDATORY:** Validate role assignments against system nature before PRB execution:

**AI-AGENTIC SYSTEM ENFORCEMENT:**
- **Behavioral Patterns:** @AI-Engineer (NOT @Security-Engineer, @Database-Engineer)
- **Memory Operations:** @AI-Engineer (NOT @Database-Engineer)
- **PRB Enforcement:** @AI-Engineer (NOT @DevOps-Engineer)
- **Virtual Team Coordination:** @AI-Engineer + @PM
- **Markdown Processing:** @AI-Engineer (NOT @Developer)

**CODE-BASED SYSTEM ENFORCEMENT:**
- **Implementation Tasks:** @Developer, @Backend-Tester as appropriate
- **Database Operations:** @Database-Engineer for data layer
- **Deployment:** @DevOps-Engineer for infrastructure
- **Security Reviews:** @Security-Engineer for vulnerabilities

**VALIDATION PROCESS:**
1. **Extract system_nature** from PRB complete_context
2. **Check role alignment** with system nature requirements
3. **Block inappropriate assignments** with clear error messages
4. **Enforce PM + Architect collaboration** for role selection
5. **Validate architect domain expertise** matches work requirements

## PRB Enforcement

### Template Selection
**Automatic:** Complexity analysis determines template
**Override:** Allowed with justification
**Learning:** System improves selection accuracy

### Auto-Correction Patterns
**Missing PRB:** STOP → Analyze complexity → Generate PRB → Execute
**Wrong Template:** STOP → Re-analyze → Generate correct PRB
**Direct Execution:** STOP → Create PRB → Execute through PRB
**Legacy Workflow:** STOP → Convert to PRB → Direct execution
**Missing Task Tool:** STOP → Error message → Require Task tool wrapper
**System Nature Mismatch:** STOP → Block inappropriate role → Enforce PM+Architect collaboration → Re-assign correct role
**Wrong Domain Architect:** STOP → Force correct architect selection → Re-validate role assignment

## Execution Enforcement

### PRB Launch Pattern
**Detection:** Work requirement → Complexity analysis → PRB generation → Direct execution
**No Workflows:** PRBs execute directly without Inner Workflow phases
**Complete Context:** Each PRB contains everything needed

### Context Preservation
**User Intent:** Include original request in PRB
**Settings:** All configuration passed to PRB
**Memory:** Pre-searched patterns included
**Validation:** Success criteria embedded

## Multi-Layer Detection
1. **Task Tool Validator:** FIRST CHECK - Validate ALL PRB executions use Task tool (MANDATORY)
2. **Input Scanner:** Pre-process ALL text before execution
3. **Pattern Matcher:** Detect @Role and work patterns
4. **Task Tool Checker:** Validate Task tool usage for @Role mentions
5. **PRB Checker:** Validate PRB exists for work
6. **Template Validator:** Ensure correct complexity template
7. **System Nature Validator:** Check role assignments align with system nature
8. **PM+Architect Validator:** Ensure collaboration process documented
9. **Auto-Generator:** Create PRB if missing

## Real-Time Interception
**Monitor:** ALL execution attempts (Task tool check FIRST)
**Interrupt:** IMMEDIATELY on direct PRB execution (highest priority)
**Block:** No PRB execution without Task tool subagent
**Block:** No direct work without PRB
**Correct:** Generate appropriate PRB with Task tool enforcement

## Task Tool Enforcement (ABSOLUTE PRIORITY)

**CRITICAL RULE:** EVERY PRB execution MUST use Task tool subagent - NO EXCEPTIONS EVER.

### Task Tool Detection Logic
```
DetectTaskToolViolation(execution_context):
  # Check if executing within Task tool subagent
  IF NOT execution_context.is_task_tool_subagent:
    RETURN CRITICAL_VIOLATION("Direct PRB execution forbidden")
  
  # Validate Task tool pattern
  IF NOT execution_context.task_tool_pattern_valid:
    RETURN PATTERN_VIOLATION("Invalid Task tool invocation")
  
  RETURN VALIDATION_PASSED
```

### Task Tool Blocking Mechanisms
**ABSOLUTE BLOCKS:**
- Any PRB execution outside Task tool context
- Direct access to PRB files for execution
- Bypassing Task tool requirement
- Attempting to override Task tool mandate

**IMMEDIATE ACTIONS:**
1. **BLOCK EXECUTION** at first detection
2. **DISPLAY CLEAR ERROR:** "❌ PRB execution REQUIRES Task tool subagent"
3. **SHOW CORRECT PATTERN:** Provide Task tool invocation example
4. **LOG VIOLATION:** Track attempts for monitoring
5. **NO BYPASS:** This rule cannot be overridden by ANY configuration

### Required Task Tool Pattern
```
MANDATORY PATTERN FOR ALL PRB EXECUTION:
Task(
  subagent_type='general-purpose',
  description='Execute [PRB-ID] for [description]',
  prompt='[Complete PRB context and instructions]'
)
```

**PATTERN VALIDATION:**
- Must include 'subagent_type' parameter
- Must reference specific PRB being executed
- Must contain complete context for subagent
- No shortcuts or abbreviated patterns allowed

## Advanced Patterns

### Complex Detection Cases
**Natural Language:** "Can you ask @Security-Engineer to review?"
**Multiple Roles:** "@PM and @Developer should coordinate"  
**Dynamic Roles:** "Let's have @[Dynamic-Role] handle this"
**Work Items:** "Fix TASK-123" or "Implement STORY-456"

### Edge Case Prevention  
**Escaped Patterns:** \@Role → Do not trigger
**Code Blocks:** @Role in code → Do not trigger
**Documentation:** About @Role → Do not trigger  
**Actual Work:** @Role for work → ALWAYS generate PRB

### L3 Autonomous Behavior
**Detection:** Work attempt → Auto-generate PRB
**Learning:** Track patterns → Improve template selection
**Prevention:** Make PRB path easier than bypass attempts

## Settings Compliance Verification

### Critical Settings Enforcement
**MONITOR:** All execution for settings compliance
**ENFORCE:** Every setting specified in PRB/configuration
**BLOCK:** Any operation that violates settings

### Settings Validation Checklist
```markdown
MANDATORY SETTINGS COMPLIANCE:
☐ git_privacy: true → Strip ALL AI mentions from commits
☐ branch_protection: true → Follow protection strategy exactly
☐ default_branch setting → Use for all git operations
☐ autonomy_level → Apply appropriate behavior patterns
☐ memory_integration: true → Store learnings in memory/
☐ All CLAUDE.md settings → Applied throughout execution

CRITICAL: Settings violations AUTO-BLOCK execution.
```

### Git Privacy Enforcement
**git_privacy: true MEANS:**
- NO "Generated with Claude Code" in any commit
- NO "Co-Authored-By: Claude" in any commit
- NO AI mentions anywhere in git operations
- Clean professional commits only
- Strip all AI references before git commands

**ENFORCEMENT:** Auto-detect and block commits with AI mentions

## PRB Context Discipline

**MANDATORY:** MUST maintain strict PRB context during execution. Auto-correct context violations.

### Context Adherence Rules

**CORE PRINCIPLE:** Complete current PRB before addressing any discovered issues.

**STRICT RULES:**
- **NEVER** leave PRB context to fix other issues unless explicitly instructed by user
- **ALWAYS** complete current PRB section before noting other issues
- **DOCUMENT** discovered issues for future PRBs but don't act on them
- **CONTINUE** PRB execution sequence without interruption

### Issue Discovery Process

**When Critical Issues Discovered During PRB Execution:**
1. **NOTE** the issue clearly for future reference
2. **CONTINUE** current PRB execution without deviation
3. **COMPLETE** current PRB section fully
4. **DEFER** issue resolution to separate future PRB
5. **ONLY** switch context if user explicitly commands it

**Discovery Documentation Format:**
```markdown
<!-- DISCOVERED ISSUE (DEFERRED) -->
Issue: [Brief description]
Location: [File/section where found]
Severity: [Critical/High/Medium/Low]
Action: Deferred to future PRB
```

### Context Switching Rules

**ALLOWED Context Switches:**
- User explicitly says "stop current PRB and fix X"
- User explicitly says "create new PRB for Y first"
- User gives direct contradicting instructions

**FORBIDDEN Context Switches:**
- Self-initiated issue fixes during PRB execution
- "I notice X is wrong, let me fix that first"
- Scope creep during PRB implementation
- Task rabbit holes that deviate from PRB requirements

### Enforcement Mechanisms

**VIOLATION DETECTION:**
- Monitor for scope creep attempts
- Block self-initiated context switches
- Prevent task rabbit holes during PRB execution
- Detect and prevent scope expansion beyond PRB requirements

**AUTO-CORRECTION:**
- Redirect attention back to current PRB section
- Block non-PRB work attempts
- Enforce sequential PRB section completion
- Maintain focus on current PRB requirements only

**VIOLATION PENALTIES:**
- First violation: Warning + redirection to current PRB
- Repeated violations: Block execution until current PRB completes
- Severe violations: Escalate to user for clarification

## Completion Validation

### False Completion Detection
**MONITOR:** All completion claims ("PRB COMPLETE", "Task finished", "Work done")
**VALIDATE:** Against mandatory completion checklist from prb-execution.md
**BLOCK:** Any completion claim without full validation

### Completion Enforcement
**REQUIRED CHECKLIST:**
- [ ] All 6 PRB sections executed completely
- [ ] All settings compliance verified
- [ ] All functional requirements met
- [ ] All processual requirements met  
- [ ] Reviews completed and passed
- [ ] Success criteria validated
- [ ] Knowledge captured in memory/
- [ ] Git operations executed exactly as specified
- [ ] PRB moved to completed/

**NO SHORTCUTS:** Cannot skip any checklist item or PRB section, even for "simple" work

### Completion State Tracking
**STATES:** INITIALIZED → IN_PROGRESS → PENDING_REVIEW → PENDING_VALIDATION → PENDING_KNOWLEDGE → PENDING_GIT → COMPLETE
**VALIDATION:** Each state transition requires evidence of completion AND settings compliance
**BLOCKING:** Cannot claim completion without reaching COMPLETE state with full settings compliance

## Project Scope Enforcement

**MANDATORY:** MUST enforce strict project boundaries. Auto-correct scope violations.

### Core Scope Rules

**PROJECT BOUNDARY:** All work MUST remain within current project directory
- **ALLOWED:** Only work within project root and subdirectories
- **BLOCKED:** Work in ~/.claude/, other projects, or external directories
- **ENFORCEMENT:** Block Task tool invocations attempting external work

### Scope Violation Detection

**MONITOR Patterns:**
- Task tool subagent_context containing paths outside project root
- File operations attempting to access ~/.claude/ or other projects
- @Role delegations with external directory references
- Work requests mentioning files outside current project
- Write operations targeting ~/.claude during normal execution
- Memory storage attempts outside project boundaries
- Configuration updates that modify global system files

**BLOCKING Triggers:**
- Any write path starting with ~/.claude/ (except installation/explicit global config)
- Paths containing ../[project-name]/ patterns
- References to /home/*/other-projects/
- Task tool invocations with external working directories
- File creation/modification outside current project root
- Memory operations targeting ~/.claude/memory/ instead of ./memory/

**CRITICAL SCOPE VIOLATIONS:**
- ~/.claude/ write operations during normal execution
- Installing/modifying system behavioral patterns during work execution
- Creating global configuration outside of explicit user requests
- Memory storage in global location instead of project-local

### Enforcement Mechanisms

**PRE-EXECUTION VALIDATION:**
```markdown
MANDATORY PRE-EXECUTION CHECKS:
☐ All file paths validated within project root
☐ Task tool working directories verified as project-local
☐ Memory operations constrained to project ./memory/ directory
☐ Write operations blocked for ~/.claude/ except installation context
☐ Configuration changes verified as project-local only
```

**SCOPE VALIDATION FUNCTION:**
```
ValidateProjectScope(operation_context):
  project_root = get_project_root()
  
  FOR each file_operation IN operation_context:
    IF file_operation.path.startswith("~/.claude/") AND 
       operation_context.type != "installation" AND 
       operation_context.type != "explicit_global_config":
      BLOCK_OPERATION()
      RETURN SCOPE_VIOLATION_ERROR
    
    IF NOT file_operation.path.startswith(project_root):
      BLOCK_OPERATION() 
      RETURN PROJECT_BOUNDARY_ERROR
  
  RETURN VALIDATION_PASSED
```

**REAL-TIME MONITORING:**
- Monitor file operations for scope violations
- Block external directory access attempts
- Redirect scope violations back to project boundaries
- Pre-validate Task tool invocations before execution
- Check memory storage location before write operations

**ENHANCED ERROR MESSAGES:**
- "❌ SCOPE VIOLATION: Write operations to ~/.claude/ forbidden during normal execution"
- "❌ BLOCKED: Access to ~/.claude/ only permitted during installation or explicit global config changes"
- "❌ PROJECT BOUNDARY: Cannot work outside {current_project_root}"
- "❌ MEMORY VIOLATION: Use ./memory/ directory, not ~/.claude/memory/"
- "❌ TASK VIOLATION: Task tool working directory must be within project scope"

### Task Tool Scope Control

**MANDATORY:** All Task tool invocations must respect project boundaries

**ENHANCED VALIDATION RULES:**
- Verify subagent_context paths are within project root
- Block Task assignments with external directory references
- Ensure all delegated work remains within project scope
- Pre-validate working directory before Task tool execution
- Block any Task invocation with ~/.claude in working_directory parameter
- Validate file operation paths in Task descriptions

**SCOPE VIOLATION BLOCKING:**
```
ValidateTaskScope(task_context):
  project_root = get_project_root()
  
  # Check working directory
  IF task_context.working_directory:
    IF task_context.working_directory.startswith("~/.claude/"):
      BLOCK_TASK()
      ERROR("❌ TASK VIOLATION: Cannot set ~/.claude/ as working directory")
      RETURN BLOCKED
    
    IF NOT task_context.working_directory.startswith(project_root):
      BLOCK_TASK() 
      ERROR("❌ Task scope violation: {task_path} outside project boundary")
      RETURN BLOCKED
  
  # Check file operations in task description
  FOR each file_path IN extract_file_paths(task_context.description):
    IF file_path.startswith("~/.claude/") AND NOT task_context.type == "installation":
      BLOCK_TASK()
      ERROR("❌ SCOPE VIOLATION: Task references forbidden ~/.claude/ path")
      RETURN BLOCKED
  
  RETURN VALIDATION_PASSED
```

**TASK TOOL INTEGRATION:**
```markdown
TASK TOOL PRE-EXECUTION CHECKLIST:
☐ Working directory validated as within project root
☐ No ~/.claude/ paths in file operations (except installation)
☐ Subagent context constrained to project boundaries
☐ Task description validated for scope compliance
☐ All file references within project directory
```

### Integration with Role System

**@Role ENFORCEMENT:**
- All @Role delegations must specify project-local work only
- Block @Role tasks attempting external directory access
- Ensure subagents operate within project boundaries

**DYNAMIC SPECIALIST CREATION:**
- New specialists created with project scope restrictions
- All specialist expertise scoped to current project context
- Block specialist work outside project boundaries

## Integration Points

### With PRB Execution
**Import:** @./prb-execution.md for completion checklist enforcement
**Validate:** All completion claims against mandatory checklist
**Block:** False completion attempts immediately

### With Learning System
**Track:** PRB generation patterns → Template accuracy → Execution success → Completion enforcement
**Apply:** Improve detection → Optimize template selection → Reduce overrides → Prevent false completions

### With Autonomy Levels  
**L1:** User approval for PRB generation
**L2:** Architect approval for Large/Mega PRBs
**L3:** Autonomous PRB generation and execution with mandatory completion validation

### With PRB Templates
**Reference:** Use template hierarchy (see shared-patterns/template-loading.md)
**Loading:** Project → .claude → ~/.claude hierarchy
**Nano/Tiny:** Direct execution, minimal overhead, full completion validation
**Medium:** Replaces Inner Workflow completely, enforces completion checklist
**Large/Mega:** Orchestrates sub-PRBs, validates all sub-PRB completions

---
*PRB enforcement behavior for intelligent-claude-code system*