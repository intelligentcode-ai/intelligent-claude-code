# TASK-002: Behavioral Activation Protocols Implementation

**Status**: PLANNED
**Created**: 2025-07-15 07:07:03
**Updated**: 2025-07-15 07:07:03
**Owner**: @AI-Engineer
**Priority**: P0 (Critical - Core Infrastructure)
**Complexity**: High
**Effort**: Standard
**Impact**: Critical - Enables all behavioral patterns
**Scope**: Extensive - System-wide integration

## Requirements Reference

From P-tasks-behavioral-fixes.md Task 0 (Process Workflow Enforcement):
- Config loads BEFORE any action (including PM activation)
- PM auto-activates when pm_always_active=true
- EVERY implementation triggers Review→Documentation→DoD
- Correct SME auto-assigned for reviews
- HARD BLOCK if process skipped
- Role protocol enforced (right role for right task)
- -1.0P penalty for violations
- Self-violations trigger immediate task updates

## Acceptance Criteria

✅ **Config Loading Protocol**
- [ ] Config loads BEFORE ANY action (including PM activation)
- [ ] Evidence shown: "Loading: config.md" in execution
- [ ] Settings applied immediately without user intervention
- [ ] -2.0P penalty auto-applied for loading violations

✅ **PM Auto-Activation**
- [ ] PM auto-activates when pm_always_active=true in config
- [ ] No manual "@PM" required when configured
- [ ] PM immediately starts planning/coordination workflows
- [ ] Evidence: "@PM (P:X, Q:Y): Auto-activated from config"

✅ **Process Workflow Enforcement**
- [ ] EVERY implementation triggers Review→Documentation→DoD
- [ ] Workflow violations HARD BLOCK execution
- [ ] Evidence: "BLOCKED: Review required before proceeding"
- [ ] -1.0P penalty for attempted workflow bypass

✅ **Auto-SME Assignment**
- [ ] Correct SME auto-assigned for peer reviews
- [ ] AI work → @AI-Engineer review
- [ ] Security → @Security-Engineer review
- [ ] Architecture → @Architect review
- [ ] Evidence: "@[SME] auto-assigned for review"

✅ **Role Protocol Enforcement**
- [ ] Right role for right task validation
- [ ] <70% capability match triggers specialist creation
- [ ] Wrong role attempts blocked with correction
- [ ] Evidence: "Creating @[Specialist] for optimal match"

✅ **Self-Violation Handling**
- [ ] Self-violations trigger immediate task creation
- [ ] Task added to TodoWrite for correction
- [ ] Penalty applied with learning capture
- [ ] Evidence: "Self-violation detected: Creating correction task"

## Subtasks

### 1. Config Loading Infrastructure
**Owner**: @AI-Engineer
**Type**: Implementation
**Description**: Implement config loading before ANY action
**Deliverables**:
- Config loader function in execution-engine.md
- Hook integration for all entry points
- Cache mechanism for performance
- Evidence logging system

### 2. PM Auto-Activation System
**Owner**: @AI-Engineer
**Type**: Implementation
**Description**: Create PM auto-activation based on config
**Deliverables**:
- PM activation logic in core-systems.md
- Config parsing for pm_always_active
- Automatic role initialization
- Score tracking initialization

### 3. Process Workflow Engine
**Owner**: @AI-Engineer
**Type**: Implementation
**Description**: Build workflow enforcement mechanism
**Deliverables**:
- Workflow state machine implementation
- Blocking mechanisms for violations
- Penalty application system
- Evidence generation

### 4. SME Auto-Assignment Logic
**Owner**: @AI-Engineer
**Type**: Implementation
**Description**: Implement automatic reviewer assignment
**Deliverables**:
- Domain-to-SME mapping rules
- Auto-assignment triggers
- Review request generation
- Async review coordination

### 5. Role Protocol Validator
**Owner**: @AI-Engineer
**Type**: Implementation
**Description**: Create role capability matching system
**Deliverables**:
- Capability assessment functions
- Specialist creation triggers
- Role reassignment logic
- Match percentage calculation

### 6. Self-Violation Handler
**Owner**: @AI-Engineer
**Type**: Implementation
**Description**: Build self-violation detection and correction
**Deliverables**:
- Violation detection patterns
- Auto-task creation logic
- TodoWrite integration
- Learning capture system

### 7. Integration Testing
**Owner**: @QA-Engineer
**Type**: Testing
**Review**: @AI-Engineer
**Description**: Validate all behavioral activation protocols
**Deliverables**:
- Test cases for each acceptance criterion
- Integration test suite
- Performance validation
- Evidence of all behaviors working

### 8. Documentation Update
**Owner**: @AI-Engineer
**Type**: Documentation
**Review**: @Architect
**Description**: Document behavioral activation system
**Deliverables**:
- Technical implementation guide
- Integration patterns documentation
- Troubleshooting guide
- Example usage patterns

### 9. Security Review
**Owner**: @Security-Engineer
**Type**: Review
**Description**: Security validation of activation protocols
**Deliverables**:
- Security assessment report
- Vulnerability analysis
- Recommended hardening measures
- Approval for deployment

## Git Operations

### Branch Creation
```bash
git checkout -b feature/task-002-behavioral-activation
# Privacy mode: true - No sensitive data in commits
```

### Commit Structure
```bash
# Implementation commits
git add src/modes/execution-engine.md
git commit -m "feat: implement config loading infrastructure

- Add config loader with cache mechanism
- Hook into all entry points
- Evidence logging for compliance
- -2.0P penalty for violations"

# Test commits
git add tests/behavioral-activation/
git commit -m "test: add behavioral activation test suite

- Config loading validation
- PM auto-activation tests
- Workflow enforcement checks
- Role protocol validation"

# Documentation commits
git add docs/behavioral-activation.md
git commit -m "docs: document behavioral activation protocols

- Implementation guide
- Integration patterns
- Troubleshooting steps
- Example usage"
```

### Pull Request
```bash
# After all subtasks complete
git push -u origin feature/task-002-behavioral-activation

# PR Title: "feat: implement behavioral activation protocols (TASK-002)"
# PR Description will include:
# - Link to this task file
# - Summary of all behavioral patterns implemented
# - Test results showing evidence
# - Security review approval
```

## Role Assignments

### Primary Implementation
**@AI-Engineer** (Capability Match: 95%)
- Behavioral pattern expertise
- Pseudo-code implementation skills
- System integration knowledge
- Activation protocol design

### Quality Assurance
**@QA-Engineer** (Capability Match: 90%)
- Integration testing expertise
- Behavioral validation skills
- Evidence collection methods
- Test automation knowledge

### Security Review
**@Security-Engineer** (Capability Match: 85%)
- Protocol security assessment
- Vulnerability analysis
- Hardening recommendations
- Compliance validation

### Architecture Review
**@Architect** (Capability Match: 90%)
- System design validation
- Integration pattern review
- Performance assessment
- Scalability evaluation

## Dependencies

**Upstream Dependencies**:
- None (This is foundational infrastructure)

**Downstream Dependencies**:
- Task 1: Runtime Execution Bridge (depends on config loading)
- Task 2: Config Reading Protocol (extends this work)
- Task 3: L3 Autonomy Restoration (requires activation protocols)
- Task 4: Memory-First Enforcement (uses activation system)

## Embedded Configuration

```markdown
# Task Configuration
task_id: TASK-002
priority: P0
complexity: high
effort: standard
privacy_mode: true
auto_review: true
blocking_gates: true

# Workflow Settings
require_review: true
require_testing: true
require_documentation: true
require_security_review: true

# Role Capabilities
ai_engineer_match: 95%
qa_engineer_match: 90%
security_engineer_match: 85%
architect_match: 90%

# Enforcement Rules
config_penalty: -2.0
workflow_penalty: -1.0
role_penalty: -0.5
format_penalty: -0.5
```

## Progress Tracking

### Subtask Status
- [ ] Config Loading Infrastructure - NOT_STARTED
- [ ] PM Auto-Activation System - NOT_STARTED
- [ ] Process Workflow Engine - NOT_STARTED
- [ ] SME Auto-Assignment Logic - NOT_STARTED
- [ ] Role Protocol Validator - NOT_STARTED
- [ ] Self-Violation Handler - NOT_STARTED
- [ ] Integration Testing - BLOCKED (awaiting implementation)
- [ ] Documentation Update - BLOCKED (awaiting implementation)
- [ ] Security Review - BLOCKED (awaiting implementation)

### Evidence Collection
- Config loading evidence: PENDING
- PM activation evidence: PENDING
- Workflow enforcement evidence: PENDING
- SME assignment evidence: PENDING
- Role validation evidence: PENDING
- Self-violation evidence: PENDING

### Risk Factors
1. **Integration Complexity**: Multiple system touchpoints
2. **Performance Impact**: Config loading on every action
3. **Blocking Behavior**: May disrupt existing workflows
4. **Cache Invalidation**: Config changes need immediate effect

### Mitigation Strategies
1. Efficient caching with 1-hour TTL
2. Async operations where possible
3. Graceful degradation for missing components
4. Clear error messages for blocked operations

---
*Task planned by @PM (P:0.0, Q:0.0) at 2025-07-15 07:07:03*
*Demonstrating WORKFLOW AS ENFORCEMENT principle*