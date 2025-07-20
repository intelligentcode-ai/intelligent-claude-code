# Task Creation Mandates

**PURPOSE:** ABSOLUTELY MANDATORY behavioral requirements for ALL task creation in the virtual team system. **NO EXCEPTIONS PERMITTED.**

## UNIVERSAL ENFORCEMENT PRINCIPLES

**BEHAVIORAL RULE**: Every single task throughout the ENTIRE system MUST follow these patterns WITHOUT EXCEPTION.  
**VALIDATION REQUIREMENT**: ALL task creation BLOCKED until compliance achieved.  
**AUTO-CORRECTION**: L3 mode automatically fixes violations, L1/L2 require manual compliance.  
**LEARNING INTEGRATION**: Violations create learning entries, repeated violations receive double penalties.

## MANDATORY TASK CREATION RULES

### Role in Title - ABSOLUTELY REQUIRED
**UNIVERSAL MANDATE: Every task title MUST include the assigned specialist role in square brackets**

**MANDATORY FORMAT**: `[Role] Task description`
**ENFORCEMENT**: NO task creation permitted without role prefix
**VALIDATION**: Auto-checked via `/icc-validate-role-title` command
**AUTO-CORRECTION**: L3 mode applies fixes automatically

**COMPLIANT EXAMPLES:**
- `[Developer] Implement configuration loader`
- `[AI-Engineer] Design memory system architecture`
- `[QA-Engineer] Create integration test suite`
- `[React-Developer] Build user authentication components`
- `[Security-Engineer] Review API endpoint security`
- `[DevOps-Engineer] Setup CI/CD pipeline configuration`

**VIOLATION EXAMPLES (BLOCKED):**
- ❌ `Implement configuration loader` (Missing role)
- ❌ `(Developer) Implement feature` (Wrong brackets)
- ❌ `[Person] Do work` (Generic, not specialist)
- ❌ `[Dev] Quick fix` (Abbreviated, not full role)
- ❌ `Task: Update system` (No role prefix)

**SPECIALIST ROLE REQUIREMENTS:**
- Core roles: @PM, @Architect, @Developer, @AI-Engineer, @QA-Engineer, etc.
- Dynamic specialists: @React-Developer, @AWS-Engineer, @GraphQL-Expert
- Domain experts: @Security-Engineer, @DevOps-Engineer, @Database-Engineer
- NO generic roles: @Person, @Someone, @Team, @User

### Subtasks - ALWAYS
**Every task MUST be decomposed into subtasks**
- Minimum 3 subtasks per task
- Maximum granularity for parallel execution
- Each subtask clearly scoped
- Subtasks enable progress tracking

### Parallelization - WHERE APPLICABLE
**Identify and mark parallel execution opportunities**
- Non-conflicting subtasks execute simultaneously
- File-independent work runs in parallel
- Up to 5 parallel subtasks per batch
- Sequential only when dependencies require

### Sequential Thinking - ALWAYS
**Use /icc-think-sequential for ALL complex problems**
- Break down into logical steps
- Question assumptions
- Revise thinking as needed
- Document thought progression

### UltraThinking - ALWAYS  
**Apply maximum depth analysis**
- Consider edge cases
- Explore alternative approaches
- Challenge initial solutions
- Think beyond immediate requirements

### Ultra-Experienced Specialists - ALWAYS
**Create specialists with 10+ years expertise**
- Never use generic roles for specialized work
- Create domain-specific specialists (e.g., @GraphQL-Developer)
- Apply maximum expertise level
- Include domain best practices

## BEHAVIORAL ENFORCEMENT SYSTEM

### Automatic Validation Chain
**MANDATORY SEQUENCE**: Every task creation MUST complete this validation:
1. **Role Detection**: `/icc-detect-work-type` identifies required specialist
2. **Title Validation**: `/icc-validate-role-title` enforces format compliance  
3. **Assignment Validation**: `/icc-validate-assignments` verifies capability match >70%
4. **Approval Gate**: PM + Specialist Architect approval for all assignments

### Real-Time Enforcement Behaviors
**Task File Creation**: BLOCKED until title contains valid role prefix
**Assignment Processing**: Auto-corrects titles during story/bug planning
**PM Delegation**: Task tool automatically applies role-in-title format
**Bulk Operations**: System-wide compliance scanning and correction

### Learning-Based Improvement
**First Violation**: Create learning entry + no penalty + auto-correction suggestion
**Repeated Violation**: 2x penalty + escalation + mandatory correction
**Pattern Application**: +0.5P/Q bonus when using proper format consistently
**Cross-Role Sharing**: All role-in-title learnings shared across team

## UNIVERSAL APPLICATION SCOPE

**NON-NEGOTIABLE ENFORCEMENT** applies to:
- ALL bug task decomposition (every task in every bug)
- ALL story task creation (every task in every story)  
- ALL epic planning (every task in every epic)
- ALL role assignments (every specialist assignment)
- ALL task updates (every title modification)
- ALL PM delegations (every Task tool usage)
- ALL peer reviews (every review task assignment)
- ALL git operations (every task-related commit)

## BEHAVIORAL COMMAND INTEGRATION

**Task Creation Commands** (ALL enforce role-in-title):
- `/icc-plan-story` - Creates tasks with mandatory role prefixes
- `/icc-plan-bug` - Enforces specialist assignment in titles
- `/icc-create-task` - Validates title format before creation
- `/icc-validate-role-title` - Direct title compliance checking

**Supporting Commands** (ensure compliance):
- `/icc-detect-work-type` - Identifies appropriate specialist role
- `/icc-validate-assignments` - Verifies specialist capability match
- `/icc-create-specialist` - Creates domain experts for tasks
- `/icc-parallelize-subtasks` - Maintains role clarity in parallel work

**Quality Enforcement Commands**:
- `/icc-scan-work` - Identifies non-compliant titles for correction
- `/icc-enforce-validation` - Activates strict compliance monitoring
- `/icc-bulk-title-fix` - Corrects multiple title violations

## AUTO-CORRECTION BEHAVIORS

### L3 Autonomous Mode
- **Automatic Fixes**: Apply corrections without user intervention
- **Smart Detection**: Analyze content to assign appropriate specialist
- **Instant Compliance**: Fix violations immediately during task creation
- **Learning Capture**: Store correction patterns for future use

### L1/L2 Manual Modes  
- **Violation Blocking**: Prevent task creation until compliance achieved
- **Correction Suggestions**: Provide specific format fixes
- **Approval Requirements**: Require manual confirmation of corrections
- **Learning Opportunities**: Create educational moments from violations

### Pattern Recognition
- **Content Analysis**: Scan task descriptions for technology/domain clues
- **Role Mapping**: Automatically suggest appropriate specialists
- **Context Awareness**: Consider parent story/bug for role consistency
- **Expertise Matching**: Ensure specialist has required capabilities

## COMPLIANCE MONITORING

### Real-Time Metrics
- **Title Compliance Rate**: Track percentage following "[Role] Description" pattern
- **Auto-Correction Success**: Monitor accuracy of automatic fixes  
- **Specialist Assignment Quality**: Measure capability match scores
- **Learning Application**: Track usage of role-in-title patterns

### Quality Assurance
- **Daily Compliance Scans**: Automated checking of all task titles
- **Violation Analytics**: Pattern analysis of common mistakes
- **Correction Effectiveness**: Measure impact of enforcement behaviors
- **Team Performance**: Track improvement in title clarity over time