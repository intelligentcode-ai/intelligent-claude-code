# Specification-Based Testing Implementation Guide
**Date**: 2025-11-06
**Purpose**: Practical guide for transforming status quo tests to specification-based tests

## Overview

This guide provides step-by-step instructions and examples for transforming existing tests from "validates current behavior" to "validates correct behavior per specifications."

## The Core Problem

**Status Quo Testing** (Current Approach):
```javascript
'allows git status': () => {
  const result = validateBashCommand('git status');
  assert.strictEqual(result.allowed, true);
}
```

**Problem**: This test documents that git status is CURRENTLY allowed, but doesn't answer:
- WHY is git status allowed?
- WHAT security policy defines this?
- WHAT happens if this behavior changes?
- IS this behavior correct or buggy?

**Specification-Based Testing** (Target Approach):
```javascript
/**
 * SPECIFICATION: Read-Only Git Commands
 *
 * REQUIREMENT: Git read-only commands MUST be allowed in main scope
 * RATIONALE: Status inspection needed for coordination without modification
 * SECURITY: Read-only commands pose no security risk
 * SOURCE: Command validation policy (docs/security/command-validation-policy.md)
 * AUTHORITY: Security architecture decision (SECURITY-DECISION-003)
 *
 * VALIDATES: Git status command correctly classified as safe coordination command
 * FAILURE MODE: If blocked, PM coordination cannot check repository state
 *
 * RELATED TESTS:
 * - 'allows git log' (read-only git operation)
 * - 'allows git diff' (read-only comparison)
 * RELATED SPECS:
 * - Read-only command classification
 * - Coordination command allowlist
 */
'SPEC: git status allowed per read-only command policy': () => {
  const result = validateBashCommand('git status');

  assert.strictEqual(result.allowed, true,
    'git status MUST be allowed per security policy');
  assert.strictEqual(typeof result.allowed, 'boolean',
    'Validation MUST return boolean result');
}
```

## Transformation Process

### Step 1: Identify Current Test Type

Categorize each test:

**Type A: Positive Validation** (Tests something SHOULD work)
```javascript
'allows kubectl get': () => {
  const result = validateBashCommand('kubectl get pods');
  assert.strictEqual(result.allowed, true);
}
```

**Type B: Negative Validation** (Tests something SHOULD NOT work)
```javascript
'blocks npm commands': () => {
  const result = validateBashCommand('npm install');
  assert.strictEqual(result.allowed, false);
}
```

**Type C: Edge Case Handling** (Tests boundary conditions)
```javascript
'handles null tool': () => {
  const result = isToolBlocked(null, {}, ['Write']);
  assert.strictEqual(result, false);
}
```

**Type D: Behavior Documentation** (Tests current behavior without clear correctness)
```javascript
'allows kubectl non-read-only when not in blacklist': () => {
  const result = validateBashCommand('kubectl delete pod test');
  assert.strictEqual(result.allowed, true);
}
```

### Step 2: Research the Specification

For each test, answer these questions:

**1. WHAT is the requirement?**
- What behavior is being tested?
- What MUST happen?
- What MUST NOT happen?

**2. WHY is this the correct behavior?**
- What business requirement drives this?
- What security concern requires this?
- What technical constraint necessitates this?

**3. WHERE does the requirement come from?**
- User story?
- Security policy?
- Architecture decision?
- Design document?

**4. WHO approved this requirement?**
- Architecture team?
- Security team?
- Product owner?

**5. WHEN should this behavior change?**
- Under what conditions would this be incorrect?
- What would trigger a specification change?

### Step 3: Document Specification Gaps

If you cannot answer the questions above:

**Mark the Test as Specification Gap**:
```javascript
/**
 * WARNING: Tests current behavior without specification validation
 *
 * CURRENT BEHAVIOR: kubectl delete allowed without blacklist config
 * SOURCE: Unknown - no specification found
 *
 * TODO: Verify if this behavior is INTENDED or BUG
 * QUESTIONS:
 * - Should kubectl delete ALWAYS be blocked in main scope?
 * - Or should it require explicit allowlist configuration?
 * - Or is current behavior correct?
 *
 * SECURITY CONCERN: Destructive Kubernetes operations in main scope
 * RISK: Production cluster modifications without agent execution
 *
 * RECOMMENDATION: Document specification in:
 *   docs/security/command-validation-policy.md
 *
 * RELATED ISSUES:
 * - SPEC-GAP-001: kubectl command policy unclear
 */
'SPEC-TODO: kubectl delete behavior needs specification': () => {
  const result = validateBashCommand('kubectl delete pod test');

  // Tests CURRENT behavior, not CORRECT behavior
  assert.strictEqual(result.allowed, true,
    'Current behavior: kubectl delete allowed - SPECIFICATION NEEDED');

  // TODO: After specification created, update this test to:
  // assert.strictEqual(result.allowed, [CORRECT_VALUE],
  //   'kubectl delete [SHOULD/SHOULD_NOT] be allowed per specification');
}
```

### Step 4: Add Specification Documentation

For tests where specification is known or researched:

**Template**:
```javascript
/**
 * SPECIFICATION: [Feature/Behavior Name]
 *
 * REQUIREMENT: [MUST/SHOULD/MAY statement]
 * RATIONALE: [WHY this requirement exists]
 * SECURITY: [Security implications if any]
 * SOURCE: [Where specification is documented]
 * AUTHORITY: [Who approved this specification]
 *
 * VALIDATES: [What this test proves about correctness]
 * FAILURE MODE: [What breaks if this test fails]
 *
 * RELATED TESTS: [Other tests for same specification]
 * RELATED SPECS: [Other specifications this depends on]
 */
'SPEC: [descriptive test name]': () => {
  // Test implementation
}
```

### Step 5: Add Negative Tests

For every positive test, ensure negative test exists:

**Example - Positive Test**:
```javascript
/**
 * SPECIFICATION: Git Read-Only Commands
 * [Full specification as above]
 */
'SPEC: git status allowed per read-only policy': () => {
  const result = validateBashCommand('git status');
  assert.strictEqual(result.allowed, true);
}
```

**Add Corresponding Negative Test**:
```javascript
/**
 * SPECIFICATION: Git Write Commands Require Agent Execution
 *
 * REQUIREMENT: Git write operations MUST be blocked in main scope
 * RATIONALE: Modifications require agent execution for proper tracking
 * SECURITY: Prevent unauthorized repository modifications
 * SOURCE: Command validation policy
 * AUTHORITY: Security architecture decision (SECURITY-DECISION-003)
 *
 * VALIDATES: Git push correctly blocked in main scope
 * FAILURE MODE: If allowed, repository modifications bypass agent controls
 *
 * RELATED TESTS:
 * - 'SPEC: git status allowed' (read-only counterpart)
 * - 'NEGATIVE: git commit blocked' (other write operation)
 */
'NEGATIVE-SPEC: git push blocked per write command policy': () => {
  const result = validateBashCommand('git push origin main');

  assert.strictEqual(result.allowed, false,
    'git push MUST be blocked per security policy');
  assert.ok(result.message,
    'Blocking MUST include explanation message');
  assert.ok(result.message.includes('agent'),
    'Message SHOULD suggest agent execution');
}
```

## Practical Examples

### Example 1: Security-Critical Test Transformation

**BEFORE** (Status Quo):
```javascript
// Line 92-96 in test-command-validation.js
'blocks npm commands': () => {
  const result = validateBashCommand('npm install');
  assert.strictEqual(result.allowed, false, 'Should block npm');
  assert(result.message, 'Should include error message');
}
```

**AFTER** (Specification-Based):
```javascript
/**
 * SECURITY SPECIFICATION: Package Manager Blocking
 *
 * REQUIREMENT: ALL package managers MUST be blocked in main scope
 * RATIONALE: Package installation executes arbitrary code from package.json scripts
 * THREAT MODEL:
 *   - Attack: Malicious package with postinstall script
 *   - Impact: Arbitrary code execution in system context
 *   - Mitigation: Block all package managers (npm, yarn, pnpm, pip, gem, etc.)
 *
 * SECURITY POLICY: Package installation REQUIRES agent execution
 * AUTHORITY: Security architecture decision (SECURITY-DECISION-001)
 * SOURCE: docs/security/tool-blacklist-policy.md (Section 3.2)
 *
 * VALIDATES: npm correctly blocked per security policy
 * FAILURE MODE: If allowed, arbitrary code execution vulnerability
 *
 * RELATED TESTS:
 * - 'NEGATIVE-SPEC: yarn blocked' (alternative package manager)
 * - 'NEGATIVE-SPEC: pnpm blocked' (alternative package manager)
 * - 'NEGATIVE-SPEC: pip blocked' (Python package manager)
 * RELATED SPECS:
 * - Tool blacklist policy (all package managers)
 * - Agent execution requirements
 */
'SECURITY-SPEC: npm blocked to prevent arbitrary code execution': () => {
  const result = validateBashCommand('npm install');

  // Primary security validation
  assert.strictEqual(result.allowed, false,
    'npm MUST be blocked per SECURITY-DECISION-001');

  // Error message validation
  assert.ok(result.message,
    'Blocking MUST include error message explaining security policy');

  // Suggested remediation validation
  assert.ok(result.message.includes('agent') || result.message.includes('AgentTask'),
    'Message SHOULD suggest agent execution as alternative');

  // Block reason validation
  assert.ok(result.message.includes('npm') || result.message.includes('package'),
    'Message MUST identify blocked tool or category');
}

/**
 * SECURITY SPECIFICATION: Comprehensive Package Manager Coverage
 *
 * REQUIREMENT: Package manager blocking MUST cover all common package managers
 * RATIONALE: Attackers may use alternative package managers to bypass npm block
 * SECURITY POLICY: Comprehensive coverage prevents bypass attempts
 *
 * VALIDATES: Alternative package managers also blocked
 * FAILURE MODE: Bypass vulnerability via yarn/pnpm/etc.
 */
'NEGATIVE-SPEC: yarn blocked like npm per comprehensive policy': () => {
  const result = validateBashCommand('yarn install');
  assert.strictEqual(result.allowed, false,
    'yarn MUST be blocked per comprehensive package manager policy');
}

'NEGATIVE-SPEC: pnpm blocked like npm per comprehensive policy': () => {
  const result = validateBashCommand('pnpm install');
  assert.strictEqual(result.allowed, false,
    'pnpm MUST be blocked per comprehensive package manager policy');
}
```

### Example 2: Unclear Behavior Transformation

**BEFORE** (Tests Unclear Behavior):
```javascript
// Line 87-93 in test-file-validation.js
'validateMarkdownOutsideAllowlist: allows README.md anywhere (case-insensitive)': () => {
  const filePath = 'src/readme.md';
  const projectRoot = '/project';

  const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);
  assert.strictEqual(result.allowed, true);
}
```

**AFTER** (Documents Specification Gap):
```javascript
/**
 * SPECIFICATION GAP: README.md Markdown Exception
 *
 * CURRENT BEHAVIOR: README.md allowed in ANY directory (case-insensitive)
 * INCLUDES: src/readme.md, lib/README.MD, tests/readme.MD
 *
 * SPECIFICATION QUESTIONS:
 * 1. Is README.md INTENTIONALLY exempt from markdown restrictions?
 * 2. Does this create security risk (arbitrary markdown in source directories)?
 * 3. What is the RATIONALE for this exception?
 * 4. Should this exception exist at all?
 *
 * ALTERNATIVE BEHAVIORS:
 * A. Current: README.md allowed anywhere (current behavior)
 * B. Restricted: README.md only at root and docs/ directories
 * C. Comprehensive: README.md also restricted like other markdown
 *
 * SECURITY CONSIDERATIONS:
 * - README.md in src/ could document malicious code
 * - README.md exemption could be abused for documentation sprawl
 * - Exemption may be necessary for package subdirectory documentation
 *
 * RECOMMENDATION:
 * 1. Document specification in: docs/file-validation-policy.md
 * 2. Decide if this is CORRECT, ACCEPTABLE, or BUG
 * 3. If CORRECT: Document rationale and keep exception
 * 4. If BUG: Create fix task and update routing logic
 *
 * RELATED ISSUES:
 * - SPEC-GAP-002: README.md exception policy unclear
 *
 * TODO: After specification decided, update this test to validate CORRECT behavior
 */
'SPEC-TODO: README.md anywhere exception needs specification': () => {
  const filePath = 'src/readme.md';
  const projectRoot = '/project';

  const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);

  // Tests CURRENT behavior
  assert.strictEqual(result.allowed, true,
    'Current behavior: README.md allowed anywhere - NEEDS SPECIFICATION');

  // After specification created, this test should become one of:
  //
  // Option A: Exception is CORRECT
  // assert.strictEqual(result.allowed, true,
  //   'README.md MUST be allowed anywhere per documentation accessibility policy');
  //
  // Option B: Exception is BUG
  // assert.strictEqual(result.allowed, false,
  //   'README.md MUST follow standard markdown restrictions');
}

/**
 * NEGATIVE TEST: Other Markdown Files Not Exempt
 *
 * VALIDATES: Only README.md has exception, not all markdown files
 * PREVENTS: Accidental exemption of arbitrary markdown files
 */
'NEGATIVE-SPEC: non-README markdown correctly restricted': () => {
  const filePath = 'src/documentation.md';
  const projectRoot = '/project';

  const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);

  assert.strictEqual(result.allowed, false,
    'Non-README markdown MUST be restricted per standard policy');
}
```

### Example 3: Complex Behavior Transformation

**BEFORE** (Tests Complex Behavior):
```javascript
// Line 33-39 in test-directory-enforcement.js
'getCorrectDirectory: BUG files go to stories/': () => {
  const filename = 'BUG-001-login-fix.md';
  const projectRoot = '/project';

  const result = getCorrectDirectory(filename, projectRoot);
  assert.strictEqual(result, path.join(projectRoot, 'stories'));
}
```

**AFTER** (Documents Decision or Gap):
```javascript
/**
 * SPECIFICATION: BUG File Directory Routing
 *
 * CURRENT BEHAVIOR: BUG files route to stories/ directory
 * DESIGN DECISION: [TO BE DOCUMENTED]
 *
 * SPECIFICATION QUESTION:
 * Should BUG files have their own bugs/ directory, or share stories/ directory?
 *
 * OPTION A: Current Behavior (BUG files → stories/)
 * Rationale: Bugs are work items like stories, simpler to have one directory
 * Pros: Simpler directory structure, one work item location
 * Cons: Harder to filter bugs vs features, mixed organization
 *
 * OPTION B: Separate Directory (BUG files → bugs/)
 * Rationale: Bugs distinct from features, better organization
 * Pros: Clear separation, easier filtering, better organization
 * Cons: More directories, need to check multiple locations
 *
 * CURRENT DIRECTORY STRUCTURE (per CLAUDE.md):
 * - stories/ - User stories
 * - bugs/ - Bug reports (directory exists!)
 *   - open/ - Active bugs
 *   - completed/ - Fixed bugs
 *
 * CONTRADICTION FOUND: CLAUDE.md defines bugs/ directory, but routing sends BUG files to stories/
 *
 * SPECIFICATION NEEDED:
 * 1. Is current routing (BUG → stories/) CORRECT?
 * 2. Or should it route to bugs/ per CLAUDE.md structure?
 * 3. If bugs/ should be used, create fix task for routing logic
 *
 * RELATED ISSUES:
 * - SPEC-GAP-003: BUG file directory routing contradicts CLAUDE.md
 *
 * TODO: Resolve specification, update routing or documentation to match
 */
'SPEC-TODO: BUG file routing contradicts CLAUDE.md structure': () => {
  const filename = 'BUG-001-login-fix.md';
  const projectRoot = '/project';

  const result = getCorrectDirectory(filename, projectRoot);

  // Tests CURRENT behavior
  const currentTarget = path.join(projectRoot, 'stories');
  const claudemdTarget = path.join(projectRoot, 'bugs');

  assert.strictEqual(result, currentTarget,
    'Current behavior: BUG files route to stories/');

  // Document the contradiction
  console.log(`  ⚠ CONTRADICTION: CLAUDE.md defines bugs/ directory`);
  console.log(`    Current routing: ${currentTarget}`);
  console.log(`    CLAUDE.md structure: ${claudemdTarget}`);
  console.log(`    Specification needed: Which is CORRECT?`);

  // After specification decided:
  // If stories/ is CORRECT:
  //   - Update CLAUDE.md to remove bugs/ directory or explain exception
  //   - Document rationale in specification
  // If bugs/ is CORRECT:
  //   - Fix routing logic to route BUG files to bugs/
  //   - Update this test to expect bugs/ directory
}

/**
 * SPECIFICATION: STORY File Routing (Baseline for Comparison)
 *
 * REQUIREMENT: STORY files MUST route to stories/ directory
 * RATIONALE: Stories are feature work items, organized by work type
 * SOURCE: Directory structure specification
 *
 * VALIDATES: STORY routing works correctly (baseline for BUG comparison)
 */
'SPEC: STORY files route to stories/ per directory structure': () => {
  const filename = 'STORY-001-authentication.md';
  const projectRoot = '/project';

  const result = getCorrectDirectory(filename, projectRoot);

  assert.strictEqual(result, path.join(projectRoot, 'stories'),
    'STORY files MUST route to stories/ per specification');
}
```

## Test Documentation Standards

### Minimum Required Documentation

Every test MUST include:

1. **SPECIFICATION or SPEC-TODO header**
2. **REQUIREMENT statement** (what MUST/SHOULD/MAY happen)
3. **RATIONALE** (WHY this is correct)
4. **SOURCE** (where specification is documented)
5. **VALIDATES** (what this test proves)

### Specification Status Markers

Use clear markers to indicate specification status:

**`SPEC:`** - Full specification documented
```javascript
'SPEC: git status allowed per read-only policy': () => { }
```

**`SPEC-TODO:`** - Specification needed
```javascript
'SPEC-TODO: kubectl delete behavior needs specification': () => { }
```

**`SECURITY-SPEC:`** - Security-critical specification
```javascript
'SECURITY-SPEC: npm blocked to prevent code execution': () => { }
```

**`NEGATIVE-SPEC:`** - Negative test validating specification
```javascript
'NEGATIVE-SPEC: git push blocked per write command policy': () => { }
```

**`REGRESSION-SPEC:`** - Known bug documentation (from test-known-bugs.js)
```javascript
'REGRESSION-SPEC: memory routing bug documented': () => { }
```

### Assertion Enhancement

**BEFORE**:
```javascript
assert.strictEqual(result.allowed, false);
```

**AFTER**:
```javascript
assert.strictEqual(result.allowed, false,
  'npm MUST be blocked per SECURITY-DECISION-001');
```

Always include specification reference in assertion messages.

## Implementation Checklist

For each test file, complete these steps:

### Phase 1: Analysis (Week 1)
- [ ] Read all tests in file
- [ ] Categorize each test (Positive/Negative/Edge/Unclear)
- [ ] Research specifications for each test
- [ ] Document specification gaps
- [ ] Identify security-critical tests
- [ ] List missing negative tests

### Phase 2: Documentation (Week 2)
- [ ] Add specification headers to all tests
- [ ] Update test names with SPEC/SPEC-TODO markers
- [ ] Enhance assertion messages with specification references
- [ ] Document contradictions and questions
- [ ] Create specification gap issues

### Phase 3: Enhancement (Week 3)
- [ ] Add missing negative tests
- [ ] Add security threat model documentation
- [ ] Link to specification documents
- [ ] Cross-reference related tests
- [ ] Add failure mode documentation

### Phase 4: Validation (Week 4)
- [ ] Review all tests for specification completeness
- [ ] Verify specification documents created
- [ ] Ensure all security tests have threat models
- [ ] Confirm negative test coverage adequate
- [ ] Validate traceability (requirement → test)

## Success Metrics

Track these metrics for each test file:

**Specification Coverage**:
- % tests with SPEC vs SPEC-TODO markers
- Target: 100% SPEC (all tests have specifications)

**Security Documentation**:
- % security tests with threat model documentation
- Target: 100% for security-critical tests

**Negative Test Coverage**:
- Ratio of negative tests to positive tests
- Target: 90%+ (nearly 1:1 ratio)

**Specification Traceability**:
- % tests with SOURCE documentation
- Target: 100% (all tests reference specifications)

**Gap Resolution**:
- Number of SPEC-TODO markers remaining
- Target: 0 (all specification gaps resolved)

## Common Pitfalls to Avoid

### Pitfall 1: Testing Implementation, Not Specification
**WRONG**:
```javascript
'extracts command from path': () => {
  // Tests HOW extraction works, not WHAT should be extracted
  assert.ok(result.includes('npm'));
}
```

**RIGHT**:
```javascript
'SPEC: command extraction identifies executable name': () => {
  // Tests WHAT behavior is correct per specification
  assert.strictEqual(result, 'npm',
    'Command extraction MUST identify executable name per parsing specification');
}
```

### Pitfall 2: Accepting Status Quo Without Question
**WRONG**:
```javascript
'current behavior works': () => {
  // Assumes current behavior is correct
}
```

**RIGHT**:
```javascript
'SPEC-TODO: verify current behavior is correct': () => {
  // Questions current behavior, requests specification
}
```

### Pitfall 3: Missing Negative Tests
**WRONG**:
Only test that safe commands are allowed.

**RIGHT**:
Test both:
- Safe commands ARE allowed
- Unsafe commands ARE NOT allowed

### Pitfall 4: Vague Specification References
**WRONG**:
```javascript
/**
 * Tests that this works correctly
 */
```

**RIGHT**:
```javascript
/**
 * SPECIFICATION: Command Validation Policy
 * SOURCE: docs/security/command-validation-policy.md (Section 3.1)
 * REQUIREMENT: Read-only commands MUST be allowed
 */
```

## Conclusion

Transforming tests from status quo validation to specification-based validation:

1. **Identifies bugs**: Tests that validate incorrect behavior become obvious
2. **Prevents regressions**: Specifications prevent "fixing" correct behavior
3. **Improves quality**: Clear correctness criteria improve test reliability
4. **Enables refactoring**: Specifications allow safe behavior changes
5. **Documents intent**: Future developers understand WHY behavior is correct

**Remember**: Tests should validate CORRECTNESS, not just document CURRENT BEHAVIOR.

---

**Guide Version**: 1.0
**Last Updated**: 2025-11-06
**Author**: QA Engineer
**Status**: Ready for Implementation
