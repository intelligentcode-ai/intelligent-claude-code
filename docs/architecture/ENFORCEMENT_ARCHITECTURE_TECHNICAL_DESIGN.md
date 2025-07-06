# Technical Architecture: ACTUAL Enforcement Implementation

## Executive Summary

This document presents the comprehensive technical architecture for implementing ACTUAL enforcement mechanisms in the virtual team system. This addresses the critical gap between documented "mandatory enforcement" and zero implementation by providing concrete technical designs for config reading, blocking logic, automatic triggers, and self-correcting workflows.

## Current State Analysis

**PROBLEM IDENTIFIED:**
- Configuration system exists (`.claude/config.md`) but is never read or enforced
- Process enforcement documented but not implemented
- Quality gates described but not automated
- Blocking logic referenced but not functional
- Auto-correction workflows conceptual only

**EVIDENCE OF NON-IMPLEMENTATION:**
- `process-enforcement.md` says "CONFIG FIRST" but no config reading logic
- `virtual-team-core.md` says "Check config first" but no implementation
- `team-config.md` describes settings but no enforcement
- Quality gates documented but never triggered
- Subagent settings exist but aren't validated

## 1. OVERALL ENFORCEMENT ARCHITECTURE

### 1.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENFORCEMENT ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────┐  │
│  │   CONFIG        │  │   ENFORCEMENT   │  │   QUALITY       │  │  AUTO   │  │
│  │   MIDDLEWARE    │  │   ENGINE        │  │   GATES         │  │  CORRECT│  │
│  │                 │  │                 │  │                 │  │         │  │
│  │ • Read/Cache    │  │ • Violation     │  │ • Triggers      │  │ • Loops │  │
│  │ • Validate      │  │ • Block Logic   │  │ • Automation    │  │ • Retry │  │
│  │ • Watch         │  │ • Enforcement   │  │ • Validation    │  │ • Escalate│  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────┘  │
│           │                       │                       │             │     │
│           └───────────────────────┼───────────────────────┼─────────────┘     │
│                                   │                       │                   │
│  ┌─────────────────────────────────┼───────────────────────┼─────────────────┐ │
│  │                    INTEGRATION LAYER                    │                 │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐          │ │
│  │  │   ROLE HOOKS    │  │   WORKFLOW      │  │   GIT           │          │ │
│  │  │                 │  │   INTERCEPTORS  │  │   INTEGRATION   │          │ │
│  │  │ • Pre-execution │  │ • Command       │  │ • Branch        │          │ │
│  │  │ • Post-validate │  │ • Delegation    │  │ • Commit        │          │ │
│  │  │ • Evidence      │  │ • Progress      │  │ • PR Workflow   │          │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘          │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Core Architecture Principles

**1. MIDDLEWARE APPROACH:** All role executions pass through enforcement middleware before execution
**2. REAL-TIME VALIDATION:** Configuration and compliance checked at every decision point
**3. BLOCKING ENFORCEMENT:** Work stops when violations detected, resumes only after correction
**4. AUTOMATIC TRIGGERS:** Quality gates and role delegations triggered by configuration
**5. SELF-CORRECTING LOOPS:** Violations automatically remediated through corrective workflows

### 1.3 Technical Implementation Strategy

**INJECTION POINTS:**
- `virtual-team-core.md`: Role activation hooks
- `process-enforcement.md`: PM workflow interceptors
- `dynamic-roles.md`: Specialist generation controls
- `advanced-features.md`: Quality validation integration

**ENFORCEMENT MECHANISMS:**
- **Config Reading**: Universal config loading at session start and role activation
- **Blocking Logic**: Execution stops when violations detected
- **Auto-Triggers**: Quality gates and delegations triggered by config settings
- **Correction Loops**: Automatic remediation until compliance achieved

## 2. CONFIG READING AND VALIDATION SYSTEM

### 2.1 Configuration Reading Middleware

**TECHNICAL SPECIFICATION:**

```markdown
## Config Reading Middleware Implementation

### Universal Config Loader
**LOCATION:** New section in `virtual-team-core.md`
**FUNCTION:** Read and validate configuration before any role execution
**IMPLEMENTATION:**

```
### @ALL_ROLES: Configuration Enforcement Protocol

**MANDATORY CONFIG CHECK (BEFORE ANY ACTION):**
1. **CONFIG LOCATION DETECTION:**
   - Check `.claude/config.md` (project-specific)
   - Check `~/.claude/config.md` (user-wide)
   - Use hierarchical priority: project > user > defaults

2. **CONFIG READING PROTOCOL:**
   - Read config file using Read tool
   - Parse markdown key-value pairs
   - Validate all required settings present
   - Cache config in session memory

3. **CONFIG VALIDATION:**
   - Verify all mandatory settings exist
   - Validate setting values are within allowed ranges
   - Check for conflicting settings
   - Report missing or invalid configurations

4. **CONFIG ENFORCEMENT:**
   - Apply settings to current session
   - Update behavior based on config values
   - Block execution if critical settings missing
   - Refresh config if file modified

**CONFIG READING IMPLEMENTATION:**
```markdown
**STEP 1: Config Detection**
"I'll check your configuration settings first..."
- Use Read tool on `.claude/config.md`
- If not found, use Read tool on `~/.claude/config.md`
- If neither found, trigger @PM init process

**STEP 2: Config Parsing**
"Reading your configuration settings..."
- Parse key: value pairs from markdown
- Extract settings into session variables
- Validate required settings present

**STEP 3: Config Application**
"Applying your configuration preferences..."
- Set behavioral flags based on config
- Update workflow parameters
- Apply enforcement levels
```

### 2.2 Configuration Caching and Invalidation

**CACHING STRATEGY:**
- **Session-Level Cache:** Config loaded once per session, cached in memory
- **File Watch:** Monitor config files for changes, auto-reload on modification
- **Cache Invalidation:** Clear cache on config file changes or explicit refresh

**IMPLEMENTATION:**
```markdown
### Config Cache Management

**CACHE STRUCTURE:**
```
SESSION_CONFIG = {
    "team_maturity": 3,
    "pm_always_active": false,
    "enforce_peer_review": true,
    "requirements_engineer_mandatory": true,
    "subagent_threshold": 3,
    "parallel_execution_enabled": true,
    "config_last_modified": "2025-07-06T10:30:00Z"
}
```

**CACHE OPERATIONS:**
- **Load:** Read config file, parse, store in session
- **Validate:** Check cache against file modification time
- **Refresh:** Re-read config if file changed
- **Apply:** Update session behavior based on cached config
```

### 2.3 Real-Time Config Updates

**LIVE CONFIG UPDATES:**
- **File Monitoring:** Check config file modification time before each role activation
- **Automatic Reload:** Re-read config if file modified during session
- **Immediate Application:** Apply config changes to current session without restart

**IMPLEMENTATION:**
```markdown
### Live Configuration Updates

**CONFIG REFRESH PROTOCOL:**
1. **Pre-Role Check:** Before any role activation, verify config file timestamp
2. **Change Detection:** If file modified, trigger config reload
3. **Live Update:** Apply new settings to current session
4. **Notification:** Inform user of config changes applied
5. **Validation:** Ensure new config doesn't conflict with current work

**EXAMPLE IMPLEMENTATION:**
"I notice your configuration was updated. Refreshing settings..."
- Check file modification time
- If changed, re-read config
- Apply new settings
- Continue with updated behavior
```

## 3. ENFORCEMENT ENGINE TECHNICAL ARCHITECTURE

### 3.1 Core Enforcement Logic

**VIOLATION DETECTION ENGINE:**

```markdown
## Enforcement Engine Core Implementation

### Violation Detection System
**LOCATION:** New section in `process-enforcement.md`

**DETECTION CATEGORIES:**
1. **Config Violations:** Missing config, invalid values, conflicting settings
2. **Sequence Violations:** Wrong role order, missing prerequisites, skipped steps
3. **Quality Violations:** Missing evidence, assumptions, incomplete work
4. **Process Violations:** Unauthorized actions, bypass attempts, non-compliance

**DETECTION IMPLEMENTATION:**
```markdown
### Violation Detection Protocol

**DETECTION TRIGGERS:**
- Role activation
- Command execution
- Progress updates
- Quality gate transitions
- Git operations

**DETECTION LOGIC:**
1. **Config Check:** Verify role allowed by config settings
2. **Sequence Check:** Validate prerequisites completed
3. **Quality Check:** Verify evidence and completeness
4. **Process Check:** Ensure proper workflow followed

**VIOLATION RESPONSE:**
- **STOP:** Immediately halt execution
- **REPORT:** Log violation details
- **CORRECT:** Trigger auto-correction workflow
- **RESUME:** Continue after correction
```

### 3.2 Blocking Logic Implementation

**BLOCKING MECHANISMS:**

```markdown
## Blocking Logic Technical Implementation

### Execution Blocking System
**FUNCTION:** Prevent work progression when violations detected

**BLOCKING TRIGGERS:**
- Config violations detected
- Prerequisites not met
- Quality standards not achieved
- Process compliance failures

**BLOCKING IMPLEMENTATION:**
```markdown
### Execution Blocking Protocol

**BLOCKING LOGIC:**
1. **Violation Detection:** Check for any compliance violations
2. **Severity Assessment:** Determine if blocking required
3. **Execution Halt:** Stop current work immediately
4. **User Notification:** Explain why work was blocked
5. **Correction Trigger:** Initiate auto-correction workflow
6. **Validation:** Verify correction completed
7. **Resume:** Continue only after validation passes

**BLOCKING MESSAGES:**
- "Work stopped: Configuration requires @Requirements-Engineer first"
- "Execution blocked: Missing evidence for claims made"
- "Process violation: Peer review required before proceeding"
- "Quality gate failure: Tests must pass before deployment"
```

### 3.3 Auto-Correction Workflows

**CORRECTION MECHANISMS:**

```markdown
## Auto-Correction Workflow Implementation

### Self-Correcting Loop System
**FUNCTION:** Automatically remediate violations until compliance achieved

**CORRECTION TYPES:**
1. **Self-Correction:** Role fixes own violations
2. **Peer Correction:** Domain expert provides guidance
3. **PM Intervention:** PM re-delegates with enhanced scope
4. **Escalation:** Architectural review for system-level issues

**CORRECTION IMPLEMENTATION:**
```markdown
### Auto-Correction Protocol

**CORRECTION WORKFLOW:**
1. **Violation Analysis:** Identify root cause and correction needed
2. **Correction Strategy:** Select appropriate correction method
3. **Remediation Execution:** Apply correction automatically
4. **Validation:** Verify correction resolved violation
5. **Retry:** Repeat until compliance achieved
6. **Escalation:** Escalate if auto-correction fails after 3 attempts

**CORRECTION EXAMPLES:**
- Missing @Requirements-Engineer → Auto-delegate to requirements analysis
- Assumptions detected → Request evidence and factual validation
- Quality gate failure → Re-trigger quality validation workflow
- Process violation → Reset workflow to compliant state
```

## 4. QUALITY GATE AUTOMATION SYSTEM

### 4.1 Automatic Quality Gate Triggers

**GATE TRIGGERING SYSTEM:**

```markdown
## Quality Gate Automation Implementation

### Automatic Gate Triggering
**LOCATION:** Enhanced `process-enforcement.md`

**GATE TRIGGER CONDITIONS:**
- **Gate 0:** New feature request → Auto-trigger @Requirements-Engineer
- **Gate 1:** System change → Auto-trigger @Architect
- **Gate 2:** Code implementation → Auto-trigger domain expert review
- **Gate 3:** Pre-deployment → Auto-trigger @Security-Engineer

**TRIGGERING IMPLEMENTATION:**
```markdown
### Quality Gate Trigger Protocol

**GATE 0: REQUIREMENTS GATE**
**TRIGGER:** Any new feature or enhancement request
**AUTO-ACTION:** 
1. Check if requirements_engineer_mandatory=true in config
2. If true, immediately delegate to @Requirements-Engineer
3. Block all other roles until requirements completed
4. Validate requirements deliverables before proceeding

**GATE 1: ARCHITECTURE GATE**
**TRIGGER:** System changes, new components, infrastructure modifications
**AUTO-ACTION:**
1. Check if architecture_review_required=true in config
2. If true, immediately delegate to @Architect
3. Block implementation until architecture approved
4. Validate architecture deliverables before proceeding

**GATE 2: IMPLEMENTATION GATE**
**TRIGGER:** Code changes, deployment preparations
**AUTO-ACTION:**
1. Check if domain_expert_review=true in config
2. If true, delegate to appropriate domain expert
3. Block deployment until peer review completed
4. Validate implementation meets standards

**GATE 3: SECURITY GATE**
**TRIGGER:** Pre-deployment, configuration changes
**AUTO-ACTION:**
1. Check if security_validation=true in config
2. If true, delegate to @Security-Engineer
3. Block deployment until security validation completed
4. Validate security requirements met
```

### 4.2 Threshold-Based Subagent Activation

**SUBAGENT AUTOMATION:**

```markdown
## Subagent Automation Implementation

### Threshold-Based Activation
**FUNCTION:** Automatically trigger subagents based on config thresholds

**ACTIVATION TRIGGERS:**
- Task count >= subagent_threshold
- Parallel work opportunities detected
- Complex analysis required
- Research tasks identified

**IMPLEMENTATION:**
```markdown
### Subagent Activation Protocol

**THRESHOLD CHECKING:**
1. **Task Count Analysis:** Count current parallel tasks
2. **Threshold Comparison:** Compare against subagent_threshold config
3. **Activation Decision:** If >= threshold AND parallel_execution_enabled=true
4. **Subagent Delegation:** Use Task tool with subagent_model setting
5. **Coordination:** Apply subagent_coordination preferences

**ACTIVATION LOGIC:**
```markdown
**STEP 1: Task Analysis**
"Analyzing current workload..."
- Count parallel tasks required
- Identify opportunities for parallel execution
- Check task complexity and dependencies

**STEP 2: Threshold Evaluation**
"Checking subagent activation thresholds..."
- Compare task count to subagent_threshold
- Verify parallel_execution_enabled=true
- Check max_concurrent_subagents limit

**STEP 3: Subagent Activation**
"Activating subagents for parallel execution..."
- Use Task tool for delegation
- Apply subagent_model preference
- Coordinate according to config settings
```

### 4.3 Workflow Progression Control

**PROGRESSION CONTROL SYSTEM:**

```markdown
## Workflow Progression Control

### Automated Workflow Control
**FUNCTION:** Control workflow progression based on config and quality gates

**PROGRESSION RULES:**
- No progression without quality gate completion
- Config-driven role sequence enforcement
- Automatic prerequisite validation
- Evidence-based progression approval

**CONTROL IMPLEMENTATION:**
```markdown
### Progression Control Protocol

**PROGRESSION CHECKPOINTS:**
1. **Gate Completion:** Verify current quality gate completed
2. **Config Compliance:** Check config requirements met
3. **Evidence Validation:** Verify evidence provided for claims
4. **Prerequisite Check:** Ensure prerequisites completed
5. **Progression Approval:** Allow progression only after all checks pass

**PROGRESSION BLOCKING:**
- Incomplete quality gates → Block progression
- Missing config requirements → Block progression
- Insufficient evidence → Block progression
- Failed prerequisites → Block progression
```

## 5. GIT WORKFLOW INTEGRATION

### 5.1 Git Operation Interception

**GIT INTEGRATION SYSTEM:**

```markdown
## Git Workflow Integration Implementation

### Git Operation Interception
**LOCATION:** Enhanced `advanced-features.md`

**INTERCEPTION POINTS:**
- Branch creation/switching
- Commit operations
- Pull request creation
- Merge operations

**IMPLEMENTATION:**
```markdown
### Git Interception Protocol

**BRANCH OPERATIONS:**
1. **Branch Creation:** Validate branch naming against config
2. **Branch Protection:** Enforce branch protection rules
3. **Branch Switching:** Validate work completion before switching

**COMMIT OPERATIONS:**
1. **Pre-Commit Validation:** Check security, credentials, file paths
2. **Commit Format:** Validate commit message format
3. **Commit Signing:** Apply signing requirements if configured

**PULL REQUEST OPERATIONS:**
1. **PR Creation:** Validate PR requirements met
2. **PR Review:** Enforce review count requirements
3. **PR Merge:** Validate all checks passed before merge
```

### 5.2 Branch Protection Enforcement

**BRANCH PROTECTION SYSTEM:**

```markdown
## Branch Protection Implementation

### Automated Branch Protection
**FUNCTION:** Enforce branch protection rules automatically

**PROTECTION RULES:**
- Require PR for main branch (require_pr_for_main)
- Require reviews (require_pr_reviews)
- Block direct commits to protected branches
- Validate security before merge

**ENFORCEMENT IMPLEMENTATION:**
```markdown
### Branch Protection Protocol

**PROTECTION VALIDATION:**
1. **Branch Check:** Identify target branch
2. **Protection Rules:** Apply config-based protection
3. **Violation Detection:** Check for protection violations
4. **Enforcement Action:** Block violations, redirect to proper workflow

**PROTECTION MESSAGES:**
- "Direct commits to main branch blocked. Create feature branch."
- "Pull request required. Current branch needs PR workflow."
- "Review requirements not met. Need {count} reviews before merge."
```

### 5.3 Commit Validation Pipeline

**COMMIT VALIDATION SYSTEM:**

```markdown
## Commit Validation Implementation

### Automated Commit Validation
**FUNCTION:** Validate all commits against config requirements

**VALIDATION CHECKS:**
- Credential scanning (scan_credentials)
- File path validation (validate_file_paths)
- Large file detection (check_large_files)
- Commit format validation (commit_format)

**VALIDATION IMPLEMENTATION:**
```markdown
### Commit Validation Protocol

**VALIDATION PIPELINE:**
1. **Credential Scan:** Check for exposed credentials
2. **File Validation:** Validate file paths and names
3. **Size Check:** Detect large files
4. **Format Check:** Validate commit message format
5. **Security Check:** Scan for security issues
6. **Approval:** Allow commit only after all checks pass

**VALIDATION BLOCKING:**
- Credentials detected → Block commit
- Invalid file paths → Block commit
- Large files detected → Block commit
- Invalid format → Block commit
```

## 6. ROLE BEHAVIOR MODIFICATION

### 6.1 Role Workflow Injection

**BEHAVIOR MODIFICATION SYSTEM:**

```markdown
## Role Behavior Modification Implementation

### Universal Role Behavior Injection
**LOCATION:** Enhanced `virtual-team-core.md`

**INJECTION POINTS:**
- Role activation (pre-execution)
- Command processing (during execution)
- Progress updates (post-execution)
- Quality validation (validation phase)

**IMPLEMENTATION:**
```markdown
### Role Behavior Injection Protocol

**PRE-EXECUTION INJECTION:**
1. **Config Check:** Read and validate configuration
2. **Sequence Validation:** Verify prerequisites completed
3. **Authority Check:** Verify role authorized for action
4. **Evidence Preparation:** Prepare evidence collection

**DURING EXECUTION INJECTION:**
1. **Quality Monitoring:** Monitor work quality continuously
2. **Compliance Checking:** Verify process compliance
3. **Evidence Collection:** Collect evidence for claims
4. **Progress Tracking:** Update progress continuously

**POST-EXECUTION INJECTION:**
1. **Deliverable Validation:** Validate deliverables meet standards
2. **Evidence Verification:** Verify evidence provided
3. **Quality Gate Preparation:** Prepare for next quality gate
4. **Handoff Protocol:** Execute proper handoff procedures
```

### 6.2 Configuration-Driven Behavior

**BEHAVIOR CONTROL SYSTEM:**

```markdown
## Configuration-Driven Behavior Implementation

### Dynamic Behavior Modification
**FUNCTION:** Modify role behavior based on configuration settings

**BEHAVIOR CATEGORIES:**
- Process compliance behavior
- Quality enforcement behavior
- Security validation behavior
- Documentation behavior

**IMPLEMENTATION:**
```markdown
### Behavior Control Protocol

**BEHAVIOR MODIFICATION LOGIC:**
1. **Config Reading:** Read relevant config settings
2. **Behavior Selection:** Select behavior based on config
3. **Behavior Application:** Apply behavior to current session
4. **Behavior Validation:** Verify behavior applied correctly

**BEHAVIOR EXAMPLES:**
- stop_on_assumptions=true → Stop work when assumptions detected
- require_evidence=true → Require evidence for all claims
- enforce_peer_review=true → Mandatory peer review for all work
- auto_correction_enabled=true → Auto-correct violations
```

### 6.3 Tool Usage Control

**TOOL CONTROL SYSTEM:**

```markdown
## Tool Usage Control Implementation

### Configuration-Based Tool Control
**FUNCTION:** Control tool usage based on configuration settings

**TOOL CONTROL CATEGORIES:**
- Security tool usage (credential scanning)
- Validation tool usage (file validation)
- Documentation tool usage (auto-documentation)
- Subagent tool usage (Task tool delegation)

**IMPLEMENTATION:**
```markdown
### Tool Control Protocol

**TOOL USAGE VALIDATION:**
1. **Tool Request:** Role requests tool usage
2. **Config Check:** Verify tool usage allowed by config
3. **Authorization:** Authorize or deny tool usage
4. **Usage Monitoring:** Monitor tool usage compliance

**TOOL CONTROL EXAMPLES:**
- scan_credentials=true → Mandatory credential scanning before commits
- validate_file_paths=true → Mandatory file path validation
- auto_documentation=true → Automatic documentation updates
- subagent_auto_delegation=true → Automatic subagent delegation
```

## 7. INTEGRATION STRATEGY WITH EXISTING MODULES

### 7.1 Module Enhancement Strategy

**NON-INVASIVE INTEGRATION:**

```markdown
## Integration Strategy Implementation

### Module Enhancement Approach
**PRINCIPLE:** Enhance existing modules without breaking functionality

**ENHANCEMENT LOCATIONS:**
- `virtual-team-core.md`: Add config reading and role behavior injection
- `process-enforcement.md`: Add enforcement engine and quality gates
- `dynamic-roles.md`: Add specialist generation controls
- `advanced-features.md`: Add evidence management and validation

**ENHANCEMENT IMPLEMENTATION:**
```markdown
### Module Enhancement Protocol

**ENHANCEMENT STEPS:**
1. **Identify Injection Points:** Find optimal locations for enhancement
2. **Add Enhancement Sections:** Add new sections to existing modules
3. **Preserve Existing Functionality:** Ensure no breaking changes
4. **Test Integration:** Verify enhancements work with existing functionality
5. **Document Changes:** Update documentation with enhancement details
```

### 7.2 Backward Compatibility

**COMPATIBILITY PRESERVATION:**

```markdown
## Backward Compatibility Implementation

### Compatibility Preservation Strategy
**FUNCTION:** Ensure existing functionality continues to work

**COMPATIBILITY REQUIREMENTS:**
- Existing @-notation commands work unchanged
- Existing workflow patterns continue to function
- Graceful degradation when config not available
- Optional enforcement that can be disabled

**COMPATIBILITY IMPLEMENTATION:**
```markdown
### Compatibility Protocol

**COMPATIBILITY CHECKS:**
1. **Feature Detection:** Detect if enforcement features enabled
2. **Graceful Fallback:** Provide fallback behavior if enforcement disabled
3. **Existing Command Support:** Ensure existing commands continue to work
4. **Progressive Enhancement:** Add enforcement as enhancement, not replacement

**COMPATIBILITY EXAMPLES:**
- Config not found → Use default behavior
- Enforcement disabled → Skip enforcement checks
- Legacy commands → Continue to work as before
```

### 7.3 Migration Strategy

**MIGRATION IMPLEMENTATION:**

```markdown
## Migration Strategy Implementation

### Phased Migration Approach
**FUNCTION:** Gradually introduce enforcement without disrupting existing users

**MIGRATION PHASES:**
1. **Phase 1:** Add config reading capability
2. **Phase 2:** Add enforcement engine
3. **Phase 3:** Add quality gates
4. **Phase 4:** Add auto-correction
5. **Phase 5:** Full enforcement activation

**MIGRATION IMPLEMENTATION:**
```markdown
### Migration Protocol

**MIGRATION STEPS:**
1. **Current State Assessment:** Evaluate existing configurations
2. **Enhancement Planning:** Plan enhancement implementation
3. **Gradual Rollout:** Implement enhancements gradually
4. **Testing and Validation:** Test each phase thoroughly
5. **User Communication:** Communicate changes to users
6. **Full Activation:** Activate full enforcement after validation
```

## 8. IMPLEMENTATION SEQUENCE AND DEPENDENCIES

### 8.1 Implementation Phases

**PHASE 1: CONFIG READING FOUNDATION (Week 1)**
- Create config reading middleware in `virtual-team-core.md`
- Add config validation and caching system
- Implement live config updates
- Test config reading with existing config file

**PHASE 2: ENFORCEMENT ENGINE CORE (Week 2)**
- Add violation detection system to `process-enforcement.md`
- Implement blocking logic for violations
- Create basic auto-correction workflows
- Test enforcement with simple violations

**PHASE 3: QUALITY GATE AUTOMATION (Week 3)**
- Implement automatic quality gate triggers
- Add threshold-based subagent activation
- Create workflow progression control
- Test quality gate automation

**PHASE 4: GIT WORKFLOW INTEGRATION (Week 4)**
- Add git operation interception
- Implement branch protection enforcement
- Create commit validation pipeline
- Test git workflow integration

**PHASE 5: ROLE BEHAVIOR MODIFICATION (Week 5)**
- Add role workflow injection
- Implement configuration-driven behavior
- Create tool usage control
- Test role behavior modification

**PHASE 6: INTEGRATION AND TESTING (Week 6)**
- Complete integration with all modules
- Comprehensive testing of all features
- Performance optimization
- Documentation completion

### 8.2 Technical Dependencies

**CORE DEPENDENCIES:**
- `Read` tool for config file reading
- `TodoRead`/`TodoWrite` for progress tracking
- `Task` tool for subagent delegation
- `Bash` tool for git operations
- `Memory` MCP for evidence tracking

**MODULE DEPENDENCIES:**
- `virtual-team-core.md` → All other modules (core role definitions)
- `process-enforcement.md` → Quality gate system
- `dynamic-roles.md` → Specialist generation controls
- `advanced-features.md` → Evidence management integration

### 8.3 Implementation Files

**NEW FILES TO CREATE:**
- None (all implementation goes into existing modules)

**EXISTING FILES TO MODIFY:**
- `/src/modes/virtual-team-core.md` - Add config reading and role behavior injection
- `/src/modes/process-enforcement.md` - Add enforcement engine and quality gates
- `/src/modes/dynamic-roles.md` - Add specialist generation controls
- `/src/modes/advanced-features.md` - Add evidence management and validation
- `/src/modes/team-config.md` - Add enforcement configuration documentation

## 9. TECHNICAL SPECIFICATIONS

### 9.1 Performance Requirements

**PERFORMANCE TARGETS:**
- Config reading: <1 second per session
- Violation detection: <0.5 seconds per check
- Quality gate processing: <2 seconds per gate
- Auto-correction: <5 seconds per correction cycle
- Overall overhead: <10% of total execution time

### 9.2 Error Handling

**ERROR HANDLING STRATEGY:**
- Graceful degradation when config unavailable
- Fallback behavior for enforcement failures
- User notification for configuration errors
- Automatic retry for transient failures

### 9.3 Security Considerations

**SECURITY REQUIREMENTS:**
- Config file validation to prevent injection
- Secure credential scanning
- Safe file path validation
- Audit trail for all enforcement actions

## 10. CONCLUSION

This technical architecture provides a comprehensive, implementable solution for ACTUAL enforcement in the virtual team system. The design ensures:

**UNIVERSAL CONFIG READING:** Every role reads and validates configuration before execution
**REAL ENFORCEMENT:** Blocking logic prevents work progression when violations detected
**AUTOMATIC TRIGGERS:** Quality gates and role delegations triggered automatically by configuration
**SELF-CORRECTING WORKFLOWS:** Auto-correction loops ensure compliance without manual intervention
**SEAMLESS INTEGRATION:** Non-invasive enhancement of existing modules

The architecture is designed for immediate implementation with clear technical specifications, minimal dependencies, and backward compatibility. Implementation can begin immediately with Phase 1 (Config Reading Foundation) and progress through the defined phases.

**IMMEDIATE NEXT STEPS:**
1. Begin Phase 1 implementation (Config Reading Foundation)
2. Create config reading middleware in `virtual-team-core.md`
3. Test config reading with existing `.claude/config.md` file
4. Validate config caching and live updates
5. Proceed to Phase 2 (Enforcement Engine Core)

This architecture transforms the virtual team system from documented enforcement to ACTUAL enforcement, making the system truly autonomous and compliant with all configuration requirements.