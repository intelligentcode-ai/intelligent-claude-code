# Blocking Enforcement Module

**CRITICAL:** This module implements PRE-ACTION validators that BLOCK operations BEFORE execution. ALL enforcement is MANDATORY and IMMEDIATE.

## Pre-Action Validators

### Tool-Level Blocking

**EDIT/WRITE/MULTIEDIT BLOCKER:**
```
BEFORE ANY Edit/Write/MultiEdit operation:
1. CHECK: Has @QA-Engineer reviewed this change?
   - IF NO → BLOCK with: "❌ BLOCKED: Peer review required. Tag @QA-Engineer for review first."
2. CHECK: Has memory been consulted for this file/component?
   - IF NO → BLOCK with: "❌ BLOCKED: Memory consultation required. Check memory first. (-1.0P penalty)"
3. CHECK: Does change include security-sensitive patterns?
   - IF YES → BLOCK with: "❌ BLOCKED: Security validation required. Tag @Security-Engineer first."
```

**BASH COMMAND BLOCKER:**
```
BEFORE ANY Bash command execution:
1. CHECK: Is command modifying code without review?
   - IF YES → BLOCK with: "❌ BLOCKED: Use Edit/Write tools with peer review instead."
2. CHECK: Does command access credentials/secrets?
   - IF YES → BLOCK with: "❌ BLOCKED: Security validation required. Tag @Security-Engineer."
3. CHECK: Is command pushing to remote without validation?
   - IF YES → BLOCK with: "❌ BLOCKED: Pre-push validation required. Run security checks first."
```

### Memory Enforcement Gates

**MEMORY-FIRST BLOCKER:**
```
BEFORE ANY technical decision or implementation:
1. DETECT: Is this a new component/feature/fix?
   - IF YES → FORCE: "⏸️ PAUSED: Memory consultation required first."
   - REQUIRE: @memory search_nodes query="[component/feature/issue]"
   - IF SKIPPED → APPLY: -1.0P penalty + BLOCK action
2. DETECT: Is this modifying existing code?
   - IF YES → FORCE: "⏸️ PAUSED: Check memory for previous implementations."
   - REQUIRE: Show memory consultation results
   - IF SKIPPED → APPLY: -1.0P penalty + BLOCK action
```

### File-Level Protection

**CRITICAL FILE BLOCKER:**
```
PROTECTED FILES = [
  "**/*.env*",
  "**/*secret*",
  "**/*credential*",
  "**/config.json",
  "**/.github/workflows/*",
  "**/package.json",
  "**/package-lock.json"
]

BEFORE modifying protected files:
1. BLOCK with: "🔒 PROTECTED FILE: Requires dual approval."
2. REQUIRE: @Security-Engineer approval
3. REQUIRE: @DevOps-Engineer approval
4. REQUIRE: Documented justification
```

### Git-Level Enforcement

**PRE-COMMIT BLOCKER:**
```
BEFORE ANY git commit:
1. RUN: Security scan on staged changes
   - IF violations → BLOCK with: "❌ SECURITY VIOLATION: Fix issues before committing."
2. CHECK: Are all modified files peer-reviewed?
   - IF NO → BLOCK with: "❌ UNREVIEWED CHANGES: All files must be reviewed."
3. CHECK: Does commit message follow standards?
   - IF NO → BLOCK with: "❌ INVALID COMMIT: Use conventional format."
```

**BRANCH PROTECTION:**
```
PROTECTED BRANCHES = ["main", "master", "production"]

IF target branch is protected:
1. BLOCK direct commits with: "❌ PROTECTED BRANCH: Use feature branch + MR."
2. FORCE: Create feature branch
3. REQUIRE: MR with approvals
```

## Enforcement Implementation

### Active Blocking Patterns

**PATTERN 1: Pre-Execution Validation**
```
ALL tools MUST implement:
try {
  validatePreConditions() // BLOCKS if conditions not met
  executeAction()
} catch (BlockedException) {
  showBlockingMessage()
  provideRemediationSteps()
  HALT execution
}
```

**PATTERN 2: Continuous Monitoring**
```
MONITOR all tool invocations:
- INTERCEPT before execution
- VALIDATE against enforcement rules
- BLOCK non-compliant actions
- LOG violations with context
```

### Blocking Messages

**STANDARD BLOCKING FORMAT:**
```
❌ BLOCKED: [Reason]
📋 REQUIRED: [What needs to happen]
👤 CONTACT: [Who to involve]
📚 REFERENCE: [Memory or documentation]
🔧 FIX: [Specific steps to unblock]
```

**EXAMPLE BLOCKS:**
```
❌ BLOCKED: Unreviewed code modification
📋 REQUIRED: Peer review from @QA-Engineer
👤 CONTACT: @QA-Engineer @current-implementation
📚 REFERENCE: Check memory for similar changes
🔧 FIX: 
   1. Save your changes as draft
   2. Tag @QA-Engineer with context
   3. Wait for approval
   4. Retry operation
```

## Penalty Enforcement

**AUTOMATIC PENALTIES:**
```
MEMORY SKIP DETECTION:
- Action attempted without memory check → -1.0P (automatic)
- Repeated violations → -2.0P (escalating)
- Pattern of avoidance → Role replacement triggered

REVIEW BYPASS ATTEMPTS:
- Trying to edit without review → -0.5P
- Attempting direct commits → -1.0P
- Circumventing security checks → -2.0P
```

## Integration Points

**TOOL WRAPPER ENFORCEMENT:**
```
EVERY tool call MUST:
1. Pass through enforcement layer FIRST
2. Validate ALL preconditions
3. Block non-compliant operations
4. Only proceed if ALL checks pass
```

**ROLE ACTIVATION ENFORCEMENT:**
```
WHEN any role is activated:
1. Load blocking rules for that role
2. Apply role-specific validators
3. Monitor all actions for compliance
4. Block violations in real-time
```

## Active Directives

**YOU MUST:**
1. **BLOCK** all Edit/Write/MultiEdit without peer review - NO EXCEPTIONS
2. **FORCE** memory consultation before ANY technical decision
3. **PREVENT** security-sensitive changes without validation
4. **HALT** git operations that violate standards
5. **APPLY** penalties automatically for violations

**YOU MUST NOT:**
1. Allow "just this once" exceptions
2. Permit bypassing for "simple" changes
3. Delay enforcement for convenience
4. Reduce penalties for any reason
5. Allow operations to proceed while "checking"

## Enforcement Activation

**THIS MODULE IS NOW ACTIVE:**
- ALL validators are RUNNING
- ALL blocks are ENFORCED
- ALL penalties are AUTOMATIC
- NO exceptions are permitted
- Compliance is MANDATORY

**ENFORCEMENT STATUS: 🟢 ACTIVE AND BLOCKING**