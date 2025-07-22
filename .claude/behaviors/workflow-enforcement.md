# Workflow Enforcement Behavior

**MANDATORY:** MUST follow workflow phases. Auto-correct violations.

**PURPOSE:** Enforce proper workflow execution and phase transitions

## Behavioral Detection System

### Template Coordination
**Imports:** @./shared-patterns/enforcement-templates.md @./shared-patterns/workflow-patterns.md
**Context-Aware Selection:** Work type → Autonomy level → Template → Behavioral configuration

## Core Enforcement Rules

### @Role Mention Detection and Auto-Correction

#### MANDATORY: ALL @Role Mentions MUST Trigger Task Tool

**Detection Pattern:** When @Role: appears at start of line or inline
**Auto-Correction:** Replace with Task tool XML invocation
**Enforcement:** Block direct role execution, enforce Task tool usage

### Auto-Correction Mechanisms

**Detection:** @Role patterns in input → Auto-convert to Task tool XML → Log violation for learning
**Blocking:** Direct @Role invocations → Manual role switching → Inline role execution attempts  
**Enforcement:** ONLY Task tool can invoke roles → NO exceptions → Violations trigger correction

## Phase Enforcement Rules

### Pre-Action Validation
**BEFORE ANY ACTION:** Check current workflow phase → Validate action allowed in phase → Block if wrong phase → AUTO-CORRECT in L3 mode

### Phase Gates
**Phase 1 (Planning):** ONLY memory search and planning allowed → Block implementation attempts → Auto-redirect to planning
**Phase 2 (Validation):** ONLY architect review allowed → Block execution before approval → Auto-request review
**Phase 3 (Execution):** Implementation allowed AFTER validation → Block if no approval → Auto-check approval status
**Phase 4 (Review):** ONLY peer review allowed → Block new work → Auto-trigger review
**Phase 5 (Completion):** ONLY git operations allowed → Block new changes → Auto-commit work

### Auto-Correction Patterns

**Wrong Phase Detection:** Implementation in Planning → STOP → Return to planning
**Execution without Approval:** STOP → Request architect review → Wait → Resume
**Changes during Review:** STOP → Complete review → Create follow-up → Continue
**L3 Autonomous Correction:** Auto-redirect to correct phase → Complete steps → Continue

## Template Application Logic

### Auto-Selection Process (Using enforcement-templates.md)
**Detection:** Security → Strict, AI/Behavioral → Adaptive, Standard → Balanced, Experimental → Learning
**Configuration:** autonomy_level, git_privacy, branch_protection via config-loader.md
**Learning:** Violation capture, bonuses, error forgiveness via learning-team-automation.md

## Violation Tracking

### Critical Enforcement Points

#### MUST Block
- Implementation before planning
- Execution without validation
- Changes during review phase
- New work in completion phase

#### MUST Auto-Correct
- Phase skip attempts
- Out-of-order execution
- Missing validations
- Incomplete transitions

#### MUST Track
- All violations
- Correction patterns
- Success rates
- Learning opportunities

### Violation Penalties (workflow-patterns.md)
**Penalties:** Minor skip (-0.5P), Major skip (-2.0P), Security skip (-3.0Q), Repeat (2x)

## Workflow Detection Patterns

### Behavioral Pattern Recognition
**Auto-Detection Engine:** Content → Classification → Template → Behavioral Configuration

### Work Type Detection Matrix

#### Security Pattern Detection
**Keywords:** security, auth, crypto, vulnerability, compliance, audit, permission, encryption
**Files:** *.security.*, *auth*, *crypto*, *.compliance.*, *.cert.*
**Roles:** @Security-Engineer detected in assignments
**Auto-Template:** Strict enforcement (zero-tolerance, mandatory reviews)

#### AI/Behavioral Pattern Detection  
**Keywords:** behavioral, AI, pattern, enforcement, learning, memory, intelligent, automation
**Files:** *.behavior.*, *.pattern.*, *.learning.*, *.ai.*, *.mind.*
**Roles:** @AI-Engineer, @AI-Architect detected in assignments
**Auto-Template:** Adaptive enforcement (learning-focused, innovation-friendly)

#### Infrastructure Pattern Detection
**Keywords:** deploy, infra, docker, k8s, pipeline, monitoring, system, devops, ci/cd
**Files:** docker*, k8s*, *.yml, *.yaml, *.deploy.*, *.infra.*
**Roles:** @System-Engineer, @DevOps-Engineer detected in assignments
**Auto-Template:** Balanced enforcement (standard workflow, architect approval)

#### Critical Business Pattern Detection
**Keywords:** production, critical, emergency, P0, urgent, customer-facing, revenue
**Files:** *.prod.*, *.critical.*, *.emergency.*
**Priority:** P0 tasks automatically detected
**Auto-Template:** Strict enforcement (enhanced tracking, immediate escalation)

### Behavioral Detection Algorithm

#### Content Analysis Engine
**Process:** Parse task content → Extract keywords → Weight by frequency → Calculate domain scores
**Scoring:** Security=+10 strict, AI=+10 adaptive, Infra=+8 balanced, Critical=+15 strict
**Threshold:** >7 points triggers template auto-selection
**Fallback:** Default to balanced template if no clear pattern

#### Real-Time Pattern Learning
**Execution Monitoring:** Track violation patterns per template type
**Success Tracking:** Monitor completion rates and quality scores
**Template Refinement:** Adjust keyword weights based on outcomes
**Pattern Evolution:** Learn new keywords from successful projects

### Template Auto-Selection Logic

#### Selection Engine
**Phase 1:** Content classification (keywords + files + roles)
**Phase 2:** Context evaluation (autonomy level + project criticality)  
**Phase 3:** Template scoring (pattern match + context weighting)
**Phase 4:** Override checking (manual settings + emergency conditions)
**Phase 5:** Behavioral configuration application

#### Override Hierarchy
**Level 1:** Emergency/P0 tasks → Always strict template
**Level 2:** Manual template in embedded config → Respect user choice
**Level 3:** Security keywords detected → Force strict template
**Level 4:** Auto-detection results → Apply calculated template
**Level 5:** Default fallback → Balanced template

### Template Coordination Logic

#### Behavioral Template Selection Flow
**Phase Integration:** Detection → Classification → Template Selection → Configuration → Application

##### Detection to Template Mapping
**Security Detection → Strict Template:** Zero-tolerance enforcement, mandatory multi-level reviews
**AI/Behavioral Detection → Adaptive Template:** Learning-focused flexibility, innovation encouragement  
**Infrastructure Detection → Balanced Template:** Standard workflow, architect approval gates
**Critical/P0 Detection → Strict Template:** Enhanced tracking, immediate escalation paths

##### Template Application Timing
**Outer Workflow Start:** Initial detection scans assignment content → Selects primary template
**Phase Transitions:** Re-evaluate context at each gate → Adjust template if needed
**Inner Workflow Entry:** Inherit parent template → Apply task-specific overrides
**Runtime Adaptation:** Monitor violations → Switch templates based on patterns

#### Behavioral Configuration Flow

##### Settings Propagation Pattern
**Parent Level:** Load PROJECT-CONTEXT and settings → Detect work type → Select template
**Template Application:** Apply enforcement characteristics → Configure phase gates
**Subagent Inheritance:** Pass template choice in context → Maintain consistency
**Override Handling:** Check embedded config → Apply if specified → Log deviation

##### Phase Gate Configuration
**Strict Template Gates:** Every phase requires explicit approval → No auto-progression
**Balanced Template Gates:** Architect approval at validation → Auto-progress others
**Adaptive Template Gates:** Peer review only → Learning-based progression
**Learning Template Gates:** Minimal gates → Focus on pattern capture

#### Template Coordination Rules

##### Selection Priority
1. **Emergency Override:** P0/Critical always gets Strict regardless of detection
2. **Manual Override:** Embedded config template choice respected if valid
3. **Security Override:** Any security keyword forces Strict template
4. **Detection Result:** Apply highest-scoring template from analysis
5. **Default Fallback:** Balanced template when no clear pattern

##### Template Switching Conditions
**Allowed Switches:** Learning → Balanced → Strict (increasing enforcement)
**Blocked Switches:** Strict → Balanced → Learning (decreasing enforcement)
**Exception:** L3 autonomy can switch based on success patterns
**Logging:** All template switches create learning entries

##### Coordination Enforcement
**Template Lock:** Once selected, template persists through workflow
**Phase Validation:** Template rules enforced at every phase transition  
**Violation Handling:** Template determines correction severity
**Success Tracking:** Template effectiveness measured per completion

### Integration Behavioral Patterns

#### With Workflow Templates (executable-workflow.md)
**Outer Workflow:** Pattern detection selects enforcement template before story execution
**Inner Workflow:** Template configuration shapes task-level behavioral rules
**Dynamic Adaptation:** Real-time template switching based on execution patterns
**Template Persistence:** Selected template flows through all workflow phases

#### With Autonomy Levels (config-loader.md)
**L1:** Pattern detection with user confirmation for template selection
**L2:** Auto-detection with architect approval for template overrides  
**L3:** Full autonomous detection, template application, and behavioral adaptation
**Settings Integration:** Template choice stored in workflow state alongside autonomy level

#### With Learning System (learning-team-automation.md)
**Pattern Evolution:** Detection accuracy improves through violation analysis
**Template Effectiveness:** Success rates tracked per template type
**Behavioral Refinement:** Keyword weights adjusted based on project outcomes
**Coordination Learning:** Successful template selections reinforce patterns

---
*Workflow enforcement with behavioral detection patterns and template coordination for intelligent development system*