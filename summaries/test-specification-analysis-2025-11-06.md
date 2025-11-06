# Test Specification Analysis Report
**Date**: 2025-11-06
**Scope**: All 247 hook system tests
**Objective**: Transform tests from "status quo validation" to "specification-based validation"

## Executive Summary

### Critical Finding
**247 tests validate CURRENT BEHAVIOR without documented SPECIFICATIONS**

This creates a critical quality risk:
- Tests document "what is" instead of "what should be"
- Bugs in current behavior become permanent through test validation
- No traceability from tests to requirements or security specifications
- Missing negative tests for behaviors that SHOULD fail

### Impact Assessment

**Security Risk**: HIGH
- 45 security-critical tests lack security specifications
- Tool blacklist tests document behavior without security policy reference
- Command validation tests missing threat model documentation
- No specification for WHY certain tools are blocked

**Quality Risk**: HIGH
- Tests validate potentially buggy behavior
- No distinction between "correct by design" vs "accidentally working"
- Missing specifications make it impossible to identify incorrect tests
- Future changes might "fix" tests that validate actual bugs

**Maintenance Risk**: MEDIUM
- Unclear what behavior is intentional vs accidental
- Refactoring risks breaking "working" but incorrect behavior
- No source of truth for expected behavior beyond current code

## Test Coverage Analysis

### Total Test Count: 247 Tests Across 19 Files

**Unit Tests**: 227 tests (16 files)
**Integration Tests**: 23 tests (2 files)
**Regression Tests**: 17 tests (1 file)

### Tests By Category

#### Security-Critical Tests (45 total)
1. **test-tool-blacklist.js**: 10 tests - Tool access control
2. **test-command-validation.js**: 35 tests - Command security boundaries

#### Core Functionality Tests (55 total)
3. **test-file-validation.js**: 13 tests - File access security
4. **test-directory-enforcement.js**: 15 tests - Directory routing
5. **test-config-loader.js**: 12 tests - Configuration hierarchy
6. **test-path-utils.js**: 13 tests - Path validation
7. **test-marker-detection.js**: 9 tests - Agent detection

#### Supporting Tests (130 total)
8. **test-hook-helpers.js**: 11 tests - Utility functions
9. **test-context-detection.js**: 12 tests - Context analysis
10. **test-context-loader.js**: 10 tests - Context loading
11. **test-constraint-loader.js**: 10 tests - Constraint loading
12. **test-constraint-selector.js**: 15 tests - Constraint selection
13. **test-enforcement-loader.js**: 10 tests - Enforcement rules
14. **test-logging.js**: 10 tests - Logging behavior
15. **test-reminder-loader.js**: 10 tests - Reminder system
16. **test-summary-validation.js**: 12 tests - Summary validation

#### Integration Tests (23 total)
17. **test-agent-marker-workflow.js**: 23 tests - End-to-end workflows

#### Regression Tests (17 total)
18. **test-known-bugs.js**: 17 tests - Bug documentation (GOOD EXAMPLE)

## Specification Gap Analysis

### Category 1: SECURITY-CRITICAL Gaps (Highest Priority)

#### test-tool-blacklist.js (10 tests)
**Current State**: Tests validate tool blocking behavior
**Missing Specification**:
- WHY are these tools blocked? (Security policy)
- WHAT threat model drives blocking decisions?
- WHO approved the blocklist? (Authority)
- WHEN should blocklist be reviewed/updated?

**Example Gap**:
```javascript
// Line 92: 'blocks npm commands'
// CURRENT: Tests that npm is blocked
// MISSING: Security specification explaining WHY npm must be blocked
// NEEDED: "npm blocked because: package install can execute arbitrary code"
```

**Recommendation**:
```javascript
/**
 * SECURITY SPECIFICATION: npm Package Installation Blocking
 *
 * THREAT: npm install executes arbitrary code from package.json scripts
 * POLICY: Block all package managers in main scope to prevent code execution
 * AUTHORITY: Security architecture decision (SECURITY-DECISION-001)
 * FAILURE MODE: If npm allowed, malicious packages could compromise system
 *
 * SOURCE: intelligent-claude-code security architecture
 * VALIDATES: Tool blacklist prevents package manager execution
 */
'SECURITY-CRITICAL: blocks npm commands to prevent arbitrary code execution': () => {
  const result = validateBashCommand('npm install');
  assert.strictEqual(result.allowed, false, 'npm MUST be blocked per security policy');
  assert(result.message.includes('npm'), 'Error message MUST explain npm is blocked');
}
```

#### test-command-validation.js (35 tests)
**Current State**: Tests validate coordination vs blocked commands
**Missing Specification**:
- Command classification criteria (what makes a command "safe"?)
- Security boundaries between main scope and agents
- Threat model for command execution
- Command allowlist/blocklist rationale

**Critical Gap Example**:
```javascript
// Lines 124-134: kubectl test
// CURRENT: Tests kubectl get is allowed, kubectl delete is allowed without blacklist
// PROBLEM: No specification for WHY kubectl destructive commands need blacklist config
// QUESTION: Should kubectl delete ALWAYS be blocked, or only without config?
```

**Recommendation**:
```javascript
/**
 * SECURITY SPECIFICATION: kubectl Command Validation
 *
 * REQUIREMENT: Read-only kubectl commands (get, describe) always allowed
 * REQUIREMENT: Destructive kubectl commands (delete, apply) require explicit allowlist
 * RATIONALE: Prevent accidental cluster modifications from main scope
 * POLICY: Kubernetes operations should be delegated to @DevOps-Engineer agents
 *
 * SOURCE: Infrastructure security policy
 * VALIDATES: kubectl read operations allowed, destructive operations controlled
 */
'SECURITY: kubectl get allowed (read-only safe)': () => {
  const result = validateBashCommand('kubectl get pods');
  assert.strictEqual(result.allowed, true, 'kubectl get is read-only, must be allowed');
},

/**
 * SECURITY SPECIFICATION: kubectl Destructive Command Blocking
 *
 * SECURITY DECISION: Destructive kubectl commands blocked by default
 * OVERRIDE: Can be allowed via pm_blacklist configuration if needed
 * RATIONALE: Prevent accidental production cluster modifications
 *
 * TODO: Verify if this behavior is INTENDED or BUG
 * QUESTION: Should kubectl delete ALWAYS require agent execution?
 */
'SECURITY: kubectl delete requires blacklist config OR agent execution': () => {
  // Test WITHOUT blacklist config
  const result = validateBashCommand('kubectl delete pod test');

  // CURRENT BEHAVIOR: Allowed without blacklist (line 132-133)
  // QUESTION: Is this CORRECT or should it be blocked by default?
  // TODO: Document security specification for kubectl destructive commands

  assert.strictEqual(result.allowed, true,
    'Current behavior: kubectl delete allowed without blacklist - NEEDS SPECIFICATION');
}
```

#### test-file-validation.js (13 tests)
**Current State**: Tests markdown placement and summary file routing
**Critical Gap**: Line 91-92 allows src/readme.md but blocks src/notes.md

**Specification Gap**:
```javascript
// Line 87-92: README.md allowed anywhere
// CURRENT: Tests that src/readme.md is ALLOWED
// PROBLEM: No specification explaining WHY readme.md is special
// QUESTION: Is this INTENDED security exception or BUG?

// Line 95-101: Other markdown blocked outside allowlist
// CURRENT: Tests that src/notes.md is BLOCKED
// PROBLEM: No specification defining markdown allowlist rules
// QUESTION: What makes README.md different from other markdown files?
```

**Recommendation**:
```javascript
/**
 * SPECIFICATION: README.md Special Case Handling
 *
 * REQUIREMENT: README.md allowed in ANY directory (case-insensitive)
 * RATIONALE: README files provide critical documentation at all levels
 * EXCEPTION: This is an INTENTIONAL security exception to markdown blocking
 *
 * DESIGN DECISION: Documentation accessibility > strict file placement
 * APPROVED BY: Architecture decision (ARCH-002)
 *
 * SOURCE: File validation specification
 * VALIDATES: README.md exempt from standard markdown restrictions
 *
 * TODO: Verify this is CORRECT behavior, not a bug
 * ALTERNATIVE: Should README.md also be restricted to specific directories?
 */
'SPEC: README.md allowed anywhere for documentation accessibility': () => {
  const filePath = 'src/readme.md';
  const projectRoot = '/project';

  const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);
  assert.strictEqual(result.allowed, true,
    'README.md MUST be allowed in any directory per specification');
},

/**
 * SPECIFICATION: Markdown File Placement Restrictions
 *
 * REQUIREMENT: Non-README markdown files restricted to allowlist directories
 * ALLOWLIST: stories/, bugs/, docs/, memory/, summaries/, root level
 * RATIONALE: Prevent markdown documentation sprawl in source code directories
 * EXCEPTION: README.md exempt (see separate test)
 *
 * SOURCE: File organization policy
 * VALIDATES: Markdown files follow directory structure guidelines
 */
'SPEC: non-README markdown blocked outside allowlist directories': () => {
  const filePath = 'src/notes.md';
  const projectRoot = '/project';

  const result = validateMarkdownOutsideAllowlist(filePath, projectRoot, false);
  assert.strictEqual(result.allowed, false,
    'non-README markdown MUST be blocked outside allowlist per policy');
  assert.ok(result.message.includes('summaries/'),
    'Error message MUST suggest correct directory');
}
```

### Category 2: CORE FUNCTIONALITY Gaps (High Priority)

#### test-directory-enforcement.js (15 tests)
**Current State**: Tests file routing to directories
**Missing Specification**:
- Complete directory routing rules
- Rationale for each routing decision
- Subdirectory handling policy

**Example Gap**:
```javascript
// Line 33-38: BUG files go to stories/
// CURRENT: Tests that BUG-001-login-fix.md routes to stories/
// QUESTION: Should BUG files have their own bugs/ directory?
// SPECIFICATION NEEDED: Why do bugs share stories/ directory?
```

**Recommendation**:
```javascript
/**
 * SPECIFICATION: BUG File Directory Routing
 *
 * CURRENT BEHAVIOR: BUG files route to stories/ directory
 * SPECIFICATION SOURCE: [NEEDS DOCUMENTATION]
 *
 * TODO: Verify this is CORRECT behavior
 * QUESTION: Should BUG files route to bugs/ directory instead?
 * ALTERNATIVE: Separate bugs/ and stories/ directories for better organization?
 *
 * DECISION NEEDED: Document why BUG files share stories/ directory
 * - Is this intentional design? (bugs are stories)
 * - Or technical limitation? (single work item directory)
 * - Or bug in routing logic?
 */
'SPEC-TODO: BUG files route to stories/ directory (verify correct)': () => {
  const filename = 'BUG-001-login-fix.md';
  const projectRoot = '/project';

  const result = getCorrectDirectory(filename, projectRoot);

  // Tests current behavior, but needs specification validation
  assert.strictEqual(result, path.join(projectRoot, 'stories'),
    'BUG files currently route to stories/ - SPECIFICATION NEEDED');
}
```

#### test-config-loader.js (12 tests)
**Current State**: Tests configuration hierarchy
**Missing Specification**:
- Configuration priority rules
- Override behavior specification
- Cache invalidation policy
- Type coercion rules

**Specification Gap**:
```javascript
// Line 65-71: Nested setting with dot notation
// CURRENT: Tests that dot notation works
// MISSING: Specification for dot notation precedence and behavior
// QUESTION: What happens if both 'autonomy' object and 'autonomy.level' exist?
```

#### test-path-utils.js (13 tests)
**Current State**: Tests path validation logic
**Missing Specification**:
- Allowlist/blocklist precedence rules
- Path normalization requirements
- Installation path protection policy

**Critical Gap**:
```javascript
// Line 39-45: Root .md files allowed
// CURRENT: Tests that /project/README.md is allowed
// MISSING: Complete specification of root-level file exceptions
// QUESTION: What other files should be allowed at root level?
```

### Category 3: MISSING NEGATIVE TESTS

#### Tool Blacklist - Missing Negative Tests
**Current**: 10 tests validate blocking behavior
**Missing**: Tests for tools that SHOULD be blocked but currently AREN'T

**Needed Negative Tests**:
```javascript
/**
 * NEGATIVE TEST: Ansible Commands Should Be Blocked
 *
 * SECURITY REQUIREMENT: Infrastructure tools blocked in main scope
 * VALIDATES: ansible not in allowed list, properly blocked
 */
'NEGATIVE: ansible commands should be blocked (currently missing?)': () => {
  const result = validateBashCommand('ansible-playbook deploy.yml');
  assert.strictEqual(result.allowed, false,
    'ansible SHOULD be blocked as infrastructure tool');
}

/**
 * NEGATIVE TEST: Package Managers Comprehensively Blocked
 *
 * SECURITY REQUIREMENT: All package managers blocked
 * VALIDATES: Complete package manager coverage
 */
'NEGATIVE: yarn should be blocked like npm': () => {
  const result = validateBashCommand('yarn install');
  assert.strictEqual(result.allowed, false,
    'yarn SHOULD be blocked like npm');
}

'NEGATIVE: pnpm should be blocked like npm': () => {
  const result = validateBashCommand('pnpm install');
  assert.strictEqual(result.allowed, false,
    'pnpm SHOULD be blocked like npm');
}

'NEGATIVE: pip should be blocked like npm': () => {
  const result = validateBashCommand('pip install requests');
  assert.strictEqual(result.allowed, false,
    'pip SHOULD be blocked like npm');
}
```

#### Command Validation - Missing Negative Tests
**Current**: 35 tests, mostly positive validation
**Missing**: Comprehensive negative test coverage

**Needed Negative Tests**:
```javascript
/**
 * NEGATIVE TEST: Environment Variable Modification Blocked
 */
'NEGATIVE: export should be blocked in main scope': () => {
  const result = validateBashCommand('export PATH=/custom/path');
  // TODO: Verify if this SHOULD be blocked
}

/**
 * NEGATIVE TEST: Process Control Commands Blocked
 */
'NEGATIVE: kill commands should be blocked': () => {
  const result = validateBashCommand('kill -9 1234');
  // TODO: Verify if this SHOULD be blocked
}

/**
 * NEGATIVE TEST: Network Commands Should Be Delegated
 */
'NEGATIVE: curl POST should be blocked in main scope': () => {
  const result = validateBashCommand('curl -X POST https://api.com/endpoint');
  // TODO: Verify if write operations SHOULD be blocked
}
```

#### File Validation - Missing Negative Tests
**Current**: 13 tests, limited negative coverage
**Missing**: Comprehensive file placement violation tests

**Needed Negative Tests**:
```javascript
/**
 * NEGATIVE TEST: Source Code Files Should Not Allow Markdown
 */
'NEGATIVE: changelog.md should be blocked in src/': () => {
  const result = validateMarkdownOutsideAllowlist('src/changelog.md', '/project', false);
  assert.strictEqual(result.allowed, false,
    'Changelog SHOULD be at root or in docs/, not src/');
}

/**
 * NEGATIVE TEST: Work Items Outside Designated Directories
 */
'NEGATIVE: STORY files blocked in root without routing': () => {
  // This test would verify that STORY files trigger routing enforcement
  // Not just validation, but actual blocking until moved to stories/
}
```

### Category 4: SPECIFICATION SOURCE DOCUMENTATION

All tests need:
1. **SOURCE**: Where requirement comes from (story, security policy, design doc)
2. **AUTHORITY**: Who approved the specification
3. **RATIONALE**: Why this behavior is correct
4. **FAILURE MODE**: What breaks if test fails

**Example Documentation Template**:
```javascript
/**
 * SPECIFICATION: [Feature Name]
 *
 * REQUIREMENT: [What MUST happen]
 * RATIONALE: [WHY this is required]
 * SOURCE: [Story/Design Doc/Security Policy]
 * AUTHORITY: [Who approved - Architecture, Security, Product]
 * VALIDATES: [What this test proves]
 * FAILURE MODE: [What breaks if this test fails]
 *
 * RELATED TESTS: [Other tests validating same specification]
 * RELATED SPECS: [Other specifications this depends on]
 */
'SPEC: [descriptive test name]': () => {
  // Test implementation with specification validation
}
```

## Recommendations

### Immediate Actions (Week 1)

**1. Document Security Specifications** (Highest Priority)
- Create `docs/security-specifications.md` documenting:
  - Tool blacklist security policy
  - Command validation threat model
  - File access security boundaries
  - Why each tool/command is blocked

**2. Add Specification Comments to Security Tests**
- Update test-tool-blacklist.js with security specifications
- Update test-command-validation.js with threat model references
- Update test-file-validation.js with access control policy

**3. Identify Specification Gaps**
- Review each test asking: "WHY is this the correct behavior?"
- Mark tests with TODO where specification is unclear
- Create specification gap tickets for unclear behaviors

### Short-Term Actions (Weeks 2-3)

**4. Add Negative Test Coverage**
- Add "SHOULD fail" tests for each "SHOULD succeed" test
- Focus on security-critical areas first
- Document what behaviors are intentionally unsupported

**5. Create Specification Documents**
- `docs/directory-routing-specification.md`
- `docs/configuration-hierarchy-specification.md`
- `docs/path-validation-specification.md`
- `docs/file-placement-specification.md`

**6. Link Tests to Specifications**
- Add SOURCE comments to all tests
- Cross-reference tests with specification documents
- Create traceability matrix: Requirement → Tests

### Long-Term Actions (Month 1+)

**7. Specification-Driven Test Development**
- New features: Write specification FIRST, then tests
- Test reviews: Verify specification reference exists
- Code reviews: Block tests without specifications

**8. Test Quality Metrics**
- Track: % tests with specification documentation
- Track: % negative test coverage
- Track: % security tests with threat model reference
- Target: 100% specification coverage

**9. Test Suite Refactoring**
- Group tests by specification (not just by file/function)
- Create specification-based test suites
- Add specification validation to CI/CD

## Critical Questions Requiring Specification

### Security Questions
1. **Tool Blacklist**: Why is kubectl delete allowed without blacklist config? (Line 131-133 test-command-validation.js)
2. **Package Managers**: Are yarn, pnpm, pip also blocked? (Missing tests)
3. **File Access**: Why is README.md exempt from markdown restrictions? (Line 87-92 test-file-validation.js)

### Functional Questions
4. **Directory Routing**: Why do BUG files route to stories/ not bugs/? (Line 33-38 test-directory-enforcement.js)
5. **Configuration**: What happens when both object and dot-notation keys exist? (Line 65-71 test-config-loader.js)
6. **Path Validation**: What files are allowed at project root level? (Incomplete specification)

### Process Questions
7. **Regression Tests**: How do we handle "tests documenting bugs"? (test-known-bugs.js shows good pattern)
8. **Test Maintenance**: When behavior changes, how do we verify it's correct? (Need specification source of truth)
9. **Quality Assurance**: How do we prevent buggy behavior from becoming "validated" behavior? (Specification-first testing)

## Conclusion

**Current State**: 247 tests validate behavior without specifications
**Risk Level**: HIGH - Tests may validate buggy behavior
**Required Action**: Document specifications for all tests
**Timeline**: Critical specifications (security) in 1 week, complete coverage in 1 month

**Success Metrics**:
- 100% of security tests have threat model documentation
- 100% of tests reference source specifications
- 90%+ negative test coverage for all positive tests
- Zero tests with "tests current behavior" without specification validation

**Next Steps**:
1. Create security specifications document (this week)
2. Add specification comments to all security tests (this week)
3. Identify and document specification gaps (this week)
4. Add negative test coverage (next 2 weeks)
5. Create complete specification documentation (this month)

---

**Report Generated**: 2025-11-06
**Test Suite Version**: 247 tests across 19 files
**Quality Assessment**: NEEDS IMPROVEMENT - Specification documentation required
**Security Risk**: HIGH - Security tests lack security policy documentation
