# PRB Execution Behavior

**MANDATORY:** Enforce completion checklist. Auto-correct false completion claims.

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md
@./shared-patterns/execution-validation.md

## EXECUTION CLARITY

**CRITICAL DISTINCTION:** Clear separation between conversation and execution patterns.

### @Role in Conversation vs Agent Deployment

**@Role in Conversation (Discussion/Planning):**
- **Purpose**: Discussing, planning, coordinating work
- **Context**: Natural conversation about what needs to be done
- **Examples**: 
  - "What should @Developer focus on?"
  - "Can @PM help prioritize this?"
  - "@Architect should we use microservices?"
- **Result**: NO execution happens - purely conversational

**Task Tool + PRB = ONLY Execution Path:**
- **Purpose**: ACTUAL execution of work with full context
- **Context**: Self-contained PRB with embedded configuration
- **Process**: Create PRB → Task tool → Agent executes
- **Examples**:
  - User: "Remove files" → Create PRB → Task tool → Agent executes
  - User: "@PM break down" → Create PRBs → Task tool → Agents execute
  - System generates PRB → Task tool invocation → Specialist agent execution

**NEVER VALID: Direct @Role Execution:**
- **BLOCKED**: @Role mentions that bypass PRB creation
- **BLOCKED**: Direct agent invocation without Task tool
- **BLOCKED**: Execution without self-contained PRB context

### Correct Execution Flow
```
Work Request → PRB Creation (Main Agent) → Task Tool Invocation → Agent Execution
```

### Incorrect Patterns (BLOCKED)
```
❌ Work Request → Direct @Role mention → Immediate execution
❌ @Role conversation → Bypass PRB creation → Direct work
❌ Agent deployment → Without Task tool → Context-less execution
```

## Subagent Execution

**PATTERN:** PRBs execute via subagents with complete embedded context.

### Subagent Invocation
**Standard Pattern:** Task tool invocation with PRB creates appropriate subagent:
- Pattern: Task tool + PRB creates role-specific subagent with embedded context
- Benefits: Role-specific capability, context preservation, specialized execution
- Context: Complete PRB context embedded, no runtime lookups needed

## Mandatory Execution Checklist

### 6 Sections (ALL MANDATORY)
| Section | Requirements | Validation |
|---------|-------------|------------|
| 0. Context Loading | Verify embedded context | All config resolved |
| 1. Context | Load settings, validate files | All values resolved |
| 2. Requirements | Execute functional/processual/technical | Every item complete |
| 3. Git Ops | Branch→Commit→PR→Merge | CHANGELOG before PR |
| 4. Knowledge | Capture learnings | Store in memory/ |
| 5. Review | SME review complete | Approval received |
| 6. Implementation | Apply samples | Patterns verified |

### Critical Settings
- **git_privacy: true** → NO AI mentions in commits
- **branch_protection** → Follow protection strategy
- **Project scope** → Operations within project root only
- **Memory** → Store in ./memory/ not ~/.claude/

## MANDATORY EXECUTION CHECKLIST

**CRITICAL:** Every PRB has 6 mandatory sections. ALL must be executed without exception.

### Section-by-Section Execution Requirements

**CONTEXT VALIDATION (MANDATORY FIRST CHECK):**
- 0. Context Loading Check - VERIFY PRB contains complete embedded context (BLOCKING)

**MANDATORY PRB SECTION EXECUTION:**
- 1. Complete Context Section - ALL file references validated, settings loaded
- 2. Requirements Section - EVERY functional/processual/technical requirement met
- 3. Git Operations Section - EVERY command executed exactly as specified (CHANGELOG before PR creation)
- 4. Knowledge Management Section - ALL learnings captured in specified paths
- 5. Review Process Section - ALL reviewers complete their reviews
- 6. Implementation Samples Section - Applied correctly with examples

**CRITICAL SETTINGS ENFORCEMENT:**
- git_privacy setting → NO "Generated with Claude Code", NO "Co-Authored-By: Claude"
- branch_protection: true → Follow branch protection rules exactly
- autonomy_level → Apply L1/L2/L3 behaviors as configured
- memory_integration: true → Store ALL learnings as specified

**EXECUTION TRACKING:**
- Each section read and understood
- Each requirement executed exactly as specified (no interpretation)
- Each completion verified against specification
- Each result documented in execution log
- Move to next section only after verification

**PROJECT SCOPE VALIDATION (MANDATORY BEFORE EXECUTION):**
- All file operations validated within project root
- No write operations to ~/.claude/ during normal execution
- Subagent operations constrained to project boundaries
- Memory operations restricted to ./memory/ directory
- Configuration changes limited to project-local only

**SYSTEMATIC VALIDATION (MANDATORY BEFORE COMPLETION):**
- Comprehensive project search executed and documented
- All deliverables verified with evidence
- Documentation completeness validated
- Zero remaining references confirmed
- Validation log complete with all evidence
- All validation functions executed successfully

**SKIP NOTHING. EXECUTE EVERYTHING. VALIDATE SYSTEMATICALLY.**

### Settings Compliance Verification

**SETTINGS ENFORCEMENT CHECKLIST:**
- git_privacy setting verified and applied to ALL git operations
- branch_protection rules followed for branch creation/merging
- default_branch setting used for all git operations
- autonomy_level behaviors applied throughout execution
- memory_integration enabled and learnings stored
- All other configuration settings from CLAUDE.md applied

**CRITICAL:** Settings are NOT suggestions - they are MANDATORY requirements.

## Execution State Tracking

### PRB Lifecycle States
- **INITIALIZED**: PRB loaded, context gathered
- **IN_PROGRESS**: Active execution of requirements
- **PENDING_REVIEW**: Work complete, awaiting review
- **PENDING_VALIDATION**: Review passed, awaiting success criteria validation
- **PENDING_KNOWLEDGE**: Validation complete, awaiting knowledge capture
- **PENDING_GIT**: Knowledge captured, awaiting git operations
- **PENDING_LIFECYCLE**: Git operations complete, awaiting PRB file move
- **COMPLETE**: All checklist items validated, PRB moved to completed/

### State Transition Guards
Each state transition MUST validate previous state completion before proceeding.

**CRITICAL:** Context validation MUST be FIRST check before ANY state transitions.

## Context Validation (MANDATORY FIRST)

**ABSOLUTE PRIORITY:** Context validation check MUST happen BEFORE any other validation.

### Pre-Execution Context Validation

**CONTEXT VALIDATION CHECKLIST (HIGHEST PRIORITY):**
- Verify PRB contains complete embedded context
- Check all configuration values are resolved (no placeholders)
- Validate all file references and samples are present
- Confirm memory and best practices patterns are embedded

### Context Loading Validation

**Steps to Validate Context:**
1. **Check Embedded Configuration:** Verify all config values are actual values
   - git_privacy, branch_protection, default_branch must be specific values
   - No "[FROM_CONFIG]" or placeholder patterns remain
2. **Validate File References:** Confirm critical files have actual paths and samples
   - File paths must be absolute and accessible
   - Sample content must be present for referenced files
3. **Verify Complete Context:** Ensure PRB is self-contained
   - No runtime config lookups needed during execution
   - All necessary context embedded at generation time

**State Transition Flow:**
INITIALIZED → IN_PROGRESS → PENDING_REVIEW → PENDING_VALIDATION → PENDING_KNOWLEDGE → PENDING_GIT → PENDING_LIFECYCLE → COMPLETE

State transitions require validation of previous state completion.

## Completion Validation

### Mandatory Before Completion
- [ ] All 6 sections executed completely
- [ ] Settings compliance verified
- [ ] Functional requirements met
- [ ] Process requirements followed
- [ ] Review approved by SME
- [ ] Success criteria validated
- [ ] Knowledge captured
- [ ] Git operations clean
- [ ] PRB moved to completed/ (FINAL STEP)

### Systematic Validation Protocol
1. **Search**: `grep -r "TERMS" .` for all changes
2. **Verify**: Each deliverable exists and works
3. **Document**: Evidence in validation log
4. **Confirm**: Zero remaining issues

## False Completion Detection

**Triggers**: "PRB COMPLETE" without checklist validation
**Action**: BLOCK → Display missing items → Reset state

**Auto-correction Process:**

**PRB Completion Blocking Message:**
- ❌ PRB COMPLETION BLOCKED
- **Missing:** List of unchecked items
- **Action:** Complete missing items
- **State:** Current state → Required: COMPLETE

## Project Scope Enforcement

**BLOCKED Operations**:
- Write to ~/.claude/ (except installation)
- Access outside project root
- Memory in ~/.claude/memory/
- Global config changes

**Validation**: See shared-patterns/execution-validation.md

## Integration Points

### With PRB Enforcement
- Blocks direct work without PRB
- Validates PRB state throughout execution
- Prevents premature completion claims
- Enforces sequential state transitions

### With Learning System
- Captures completion enforcement patterns
- Learns from false completion attempts
- Improves validation accuracy over time
- Stores enforcement effectiveness data

### With Git Operations
- Validates git operations completion
- Ensures commit message compliance
- Verifies clean working state
- Enforces branch management requirements

### With Review System
- Mandates review completion
- Validates reviewer qualifications
- Ensures feedback incorporation
- Blocks completion without review approval

## Implementation Patterns

### State Validation Process

**Steps to Validate PRB State Transition:**
1. **Critical Context Validation (HIGHEST PRIORITY):** Validate that PRB contains complete embedded context
   - If context incomplete: Block transition, display context error, return validation failed
2. **Get Current State:** Determine current PRB state and target state
3. **Load Completion Checklist:** Get the mandatory checklist items for this PRB
4. **Check State Transition Path:** For each required state between current and target:
   - Get checklist items for that state
   - Validate each item is completed
   - If any item not validated: Block transition, display missing items, return validation failed
5. **Allow Transition:** If all validations pass, allow state transition to proceed

### Completion Claim Interception Process

**Steps to Intercept and Validate Completion Claims:**
1. **Detect Completion Pattern:** Check if text contains completion claims like "PRB COMPLETE", "Task finished", "Work done"
2. **If Completion Detected:**
   - **Extract PRB ID:** Get the PRB identifier from the claim
   - **Validate PRB State:** Check if PRB actually meets "COMPLETE" state requirements
   - **If Validation Fails:** Block completion, display missing checklist items, reset to appropriate state
   - **If Validation Passes:** Allow completion to proceed

### Quality Gate Enforcement Process

**Steps to Enforce Quality Gates for PRB Completion:**
1. **Validate All Quality Areas:** Check completion status for each required area:
   - **Functional Requirements:** All functional acceptance criteria met
   - **Processual Requirements:** All process requirements followed
   - **Git Operations:** All git operations completed and pushed
   - **Review Process:** All reviews completed and approved
   - **Knowledge Capture:** All learnings captured and stored
   - **Success Criteria:** All success criteria validated
   - **PRB Lifecycle:** PRB lifecycle management completed

2. **Bug Lifecycle Integration:** If all quality areas pass:
   - **Check Bug References:** If PRB references a bug, extract bug ID
   - **Complete Bug Lifecycle:** Mark referenced bug as complete
   - **Final PRB Move:** Move PRB file from ready/ to completed/ (absolute final step)

3. **Return Final Status:** Only return complete if ALL quality areas pass including lifecycle

## PRB Lifecycle Management

### PRB File Movement Protocol
**MANDATORY SEQUENCE:**
1. Complete all functional requirements
2. Complete all processual requirements  
3. Complete all git operations and push
4. Complete review process
5. Complete knowledge capture
6. Validate success criteria
7. **FINAL STEP:** Move PRB file from prbs/ready/ to prbs/completed/

**CRITICAL RULE:** PRB file movement is the absolute final operation. If ANY prior step fails, PRB remains in ready/ for retry.

### Lifecycle State Management

**PRB File States:**
- **PRB_READY:** File in prbs/ready/, available for execution
- **PRB_IN_PROGRESS:** File in prbs/ready/, currently being executed
- **PRB_COMPLETED:** File in prbs/completed/, execution finished

**State Validation:**
- Only PRBs in READY state can begin execution
- PRBs remain in ready/ throughout entire execution
- Move to completed/ only occurs after ALL validation passes
- Failed executions leave PRB in ready/ for retry

### Automatic Cleanup Prevention
**PREVENTS:**
- PRBs stuck in ready/ after successful execution
- Lost PRBs due to premature file moves
- Incomplete executions marked as complete
- State inconsistencies in PRB management

## Error Recovery

- **Incomplete**: Identify missing → Reset state → Guide completion
- **False claim**: Block → Display validation → Ensure proper completion
- **State corruption**: Detect → Reset to last good → Rebuild from evidence

---
*Optimized: 654→~120 lines*