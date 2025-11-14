# Test Specification Gap Matrix
**Date**: 2025-11-06
**Purpose**: Detailed mapping of specification gaps across 247 tests

## Legend
- ✅ = Specification exists and documented
- ⚠️ = Partial specification, needs completion
- ❌ = No specification, tests status quo only
- 🔒 = Security-critical specification required
- ❓ = Behavior unclear, specification needed to determine correctness

## Test File Analysis Matrix

### Security-Critical Tests (Priority 1)

#### 1. test-tool-blacklist.js (10 tests)
| Line | Test | Status | Specification Gap | Priority |
|------|------|--------|------------------|----------|
| 15-18 | no blacklist returns not blocked | ❌ | Default behavior specification | 🔒 HIGH |
| 20-23 | exact tool name match | ❌ | Tool matching algorithm spec | 🔒 HIGH |
| 25-28 | no match returns false | ❌ | Negative matching behavior | 🔒 HIGH |
| 30-33 | Bash command pattern matching | 🔒 | Security: Why rm -rf blocked | 🔒 CRITICAL |
| 35-38 | Bash command no match | ❌ | Allowlist specification | 🔒 HIGH |
| 40-43 | handles null tool | ⚠️ | Error handling spec | MEDIUM |
| 45-48 | handles non-array blacklist | ⚠️ | Input validation spec | MEDIUM |
| 50-53 | handles empty blacklist | ⚠️ | Empty blacklist behavior | MEDIUM |
| 55-58 | case-sensitive matching | ❓ | Is case sensitivity INTENDED? | 🔒 HIGH |
| 60-63 | partial command matching | 🔒 | Security: Partial match policy | 🔒 CRITICAL |

**Critical Gaps**:
1. **No Security Policy Document**: Why are specific tools blocked?
2. **No Threat Model**: What attacks does blacklist prevent?
3. **No Authority Reference**: Who approved blocklist decisions?

**Recommendation**: Create `docs/security/tool-blacklist-policy.md`

---

#### 2. test-command-validation.js (35 tests)
| Line | Test | Status | Specification Gap | Priority |
|------|------|--------|------------------|----------|
| 19-22 | extracts simple command | ❌ | Command parsing specification | HIGH |
| 24-27 | extracts commands from pipe | ❌ | Pipe handling behavior | HIGH |
| 29-32 | extracts commands from && chain | ❌ | Chain parsing logic | HIGH |
| 34-37 | extracts commands from \|\| chain | ❌ | OR chain handling | HIGH |
| 39-42 | handles quoted strings | ⚠️ | Quote escape behavior | HIGH |
| 44-47 | handles environment variables | ⚠️ | Env var extraction rules | MEDIUM |
| 49-52 | handles command paths | ❌ | Path stripping logic | MEDIUM |
| 54-57 | handles empty command | ⚠️ | Empty input behavior | LOW |
| 59-62 | handles complex SSH command | ❓ | SSH command policy unclear | 🔒 HIGH |
| 64-67 | handles heredoc pattern | 🔒 | Security: Why heredoc blocked | 🔒 CRITICAL |
| 72-75 | allows git status | ❌ | Git command allowlist | HIGH |
| 77-80 | allows read-only commands | ❌ | Read-only classification | 🔒 HIGH |
| 82-85 | allows grep in pipe | ❌ | Pipe safety specification | MEDIUM |
| 87-90 | allows process inspection | ❌ | ps command allowlist | LOW |
| 92-96 | blocks npm commands | 🔒 | Security: npm blocking policy | 🔒 CRITICAL |
| 98-101 | blocks docker commands | 🔒 | Security: docker policy | 🔒 CRITICAL |
| 103-106 | blocks terraform commands | 🔒 | Security: IaC tool policy | 🔒 CRITICAL |
| 108-111 | blocks python execution | 🔒 | Security: script execution policy | 🔒 CRITICAL |
| 113-117 | blocks heredoc patterns | 🔒 | Security: heredoc threat model | 🔒 CRITICAL |
| 119-122 | blocks chained blocked commands | 🔒 | Chain validation logic | 🔒 HIGH |
| 124-127 | allows kubectl get | ❌ | kubectl read-only policy | HIGH |
| 129-134 | allows kubectl non-read-only | ❓ | **BUG OR FEATURE?** | 🔒 CRITICAL |
| 136-139 | validates SSH remote command | 🔒 | SSH remote execution policy | 🔒 HIGH |

**Critical Questions**:
1. **Line 129-134**: Is kubectl delete ALLOWED without blacklist CORRECT or BUG?
   - Current: Test expects it to be allowed
   - Security concern: Destructive k8s operations in main scope
   - **SPECIFICATION REQUIRED**: Document intended kubectl behavior

2. **Line 113-117**: Why are heredoc patterns blocked?
   - Security concern not documented
   - Is this preventing injection attacks?
   - **THREAT MODEL REQUIRED**: Document heredoc security rationale

**Recommendation**: Create `docs/security/command-validation-policy.md`

---

#### 3. test-file-validation.js (13 tests)
| Line | Test | Status | Specification Gap | Priority |
|------|------|--------|------------------|----------|
| 17-23 | detects SUMMARY pattern | ❌ | Summary detection specification | MEDIUM |
| 25-31 | detects REPORT pattern | ❌ | Report pattern rules | MEDIUM |
| 33-39 | detects VALIDATION pattern | ❌ | Validation file patterns | MEDIUM |
| 41-47 | ignores non-summary files | ❌ | Non-summary classification | MEDIUM |
| 49-55 | allows files in summaries/ | ❌ | Summary directory policy | HIGH |
| 57-69 | blocks summary files outside summaries/ | 🔒 | Security: Summary routing policy | 🔒 HIGH |
| 71-77 | non-summary files pass validation | ❌ | Default validation behavior | MEDIUM |
| 79-85 | allows root .md files | ❌ | Root file exception policy | HIGH |
| 87-93 | allows README.md anywhere | ❓ | **WHY README.md special?** | 🔒 HIGH |
| 95-102 | blocks markdown outside allowlist | 🔒 | Markdown restriction policy | 🔒 HIGH |
| 104-110 | extracts > redirect | ❌ | Redirect extraction logic | LOW |
| 112-119 | extracts >> redirect | ❌ | Append redirect handling | LOW |
| 121-127 | returns empty for no redirects | ❌ | Empty result behavior | LOW |

**Critical Question**:
- **Line 87-93**: Is README.md INTENTIONALLY exempt from markdown restrictions?
  - Current: Allowed in ANY directory (even src/)
  - Question: Is this security exception CORRECT?
  - **SPECIFICATION REQUIRED**: Document README.md exception policy

**Recommendation**: Create `docs/file-validation-policy.md`

---

### Core Functionality Tests (Priority 2)

#### 4. test-directory-enforcement.js (15 tests)
| Line | Test | Status | Specification Gap | Priority |
|------|------|--------|------------------|----------|
| 17-23 | STORY files go to stories/ | ❌ | Story routing specification | HIGH |
| 25-31 | EPIC files go to stories/ | ❌ | Epic routing logic | HIGH |
| 33-39 | BUG files go to stories/ | ❓ | **Should bugs/ directory exist?** | HIGH |
| 41-47 | AGENTTASK files go to agenttasks/ | ❌ | AgentTask routing policy | HIGH |
| 49-55 | CLAUDE.md goes to root | ❌ | Root file specifications | HIGH |
| 57-63 | VERSION goes to root | ❌ | Version file policy | MEDIUM |
| 65-71 | README.md goes to root | ❌ | README routing logic | MEDIUM |
| 73-79 | architecture.md goes to docs/ | ❌ | Documentation routing | MEDIUM |
| 81-87 | api.md goes to docs/ | ❌ | API doc routing | MEDIUM |
| 89-95 | other files go to summaries/ | ❌ | Default routing behavior | HIGH |
| 97-104 | returns true for correct placement | ❌ | Validation logic spec | HIGH |
| 106-112 | returns false for incorrect placement | ❌ | Error detection logic | HIGH |
| 114-120 | allows subdirectories of correct directory | ⚠️ | Subdirectory policy | HIGH |
| 122-128 | exempts non-markdown files | ❓ | Non-markdown exemption policy | MEDIUM |
| 130-138 | suggests correct path | ❌ | Path suggestion algorithm | MEDIUM |

**Critical Question**:
- **Line 33-39**: Should BUG files have their own bugs/ directory?
  - Current: Routes to stories/
  - Question: Is this CORRECT or should bugs/ exist?
  - Alternative: Separate bugs/ for better organization?
  - **SPECIFICATION REQUIRED**: Document BUG file directory decision

**Recommendation**: Create `docs/directory-structure-specification.md`

---

#### 5. test-config-loader.js (12 tests)
| Line | Test | Status | Specification Gap | Priority |
|------|------|--------|------------------|----------|
| 16-22 | returns configuration object | ⚠️ | Config structure specification | HIGH |
| 24-30 | includes autonomy settings | ❌ | Autonomy config requirements | HIGH |
| 32-38 | includes git settings | ❌ | Git config structure | HIGH |
| 40-47 | includes paths settings | ❌ | Path config specification | HIGH |
| 49-55 | includes enforcement settings | ❌ | Enforcement config structure | HIGH |
| 57-63 | retrieves top-level setting | ❌ | Setting retrieval logic | MEDIUM |
| 65-71 | retrieves nested setting with dot notation | ❓ | **Dot notation precedence?** | HIGH |
| 73-78 | returns default for missing key | ⚠️ | Default value behavior | MEDIUM |
| 80-85 | handles deeply nested keys | ❌ | Deep nesting support | MEDIUM |
| 87-94 | clears configuration cache | ❌ | Cache invalidation policy | MEDIUM |
| 96-101 | git.privacy returns boolean | ⚠️ | Type coercion rules | LOW |
| 103-109 | paths.story_path returns string | ⚠️ | Type validation spec | LOW |

**Critical Question**:
- **Line 65-71**: What happens if both object and dot-notation keys exist?
  - Example: config has 'autonomy' object AND 'autonomy.level' key
  - Question: Which takes precedence?
  - **SPECIFICATION REQUIRED**: Document dot notation resolution rules

**Recommendation**: Create `docs/configuration-hierarchy-specification.md`

---

#### 6. test-path-utils.js (13 tests)
| Line | Test | Status | Specification Gap | Priority |
|------|------|--------|------------------|----------|
| 19-27 | returns allowlist and blocklist | ❌ | Path configuration structure | HIGH |
| 29-37 | includes standard paths | ❌ | Standard path definitions | HIGH |
| 39-46 | root .md files allowed | ❓ | **What else allowed at root?** | HIGH |
| 48-55 | root config files allowed | ❌ | Config file exceptions | HIGH |
| 57-64 | VERSION file allowed | ❌ | Version file policy | MEDIUM |
| 66-73 | files in allowlist directories allowed | ❌ | Allowlist validation logic | HIGH |
| 75-82 | files outside allowlist blocked | ❌ | Default blocking behavior | 🔒 HIGH |
| 84-91 | paths outside project blocked | 🔒 | Project boundary enforcement | 🔒 CRITICAL |
| 93-100 | blocked paths detected | 🔒 | Blocklist enforcement | 🔒 HIGH |
| 102-109 | non-blocked paths allowed | ❌ | Allowlist precedence | HIGH |
| 111-116 | finds .git directory | ⚠️ | Project root detection | HIGH |
| 118-124 | detects ~/.claude/ paths | 🔒 | Installation path protection | 🔒 CRITICAL |
| 126-129 | rejects non-installation paths | 🔒 | Path validation logic | 🔒 HIGH |

**Critical Question**:
- **Line 39-46**: What files are allowed at project root?
  - Current: Tests README.md and icc.config.json
  - Question: Is this COMPLETE list or examples?
  - **SPECIFICATION REQUIRED**: Complete root-level file allowlist

**Recommendation**: Create `docs/path-validation-specification.md`

---

#### 7. test-marker-detection.js (9 tests)
| Line | Test | Status | Specification Gap | Priority |
|------|------|--------|------------------|----------|
| Tests | Various marker detection | ✅ | **GOOD EXAMPLE** | N/A |

**Note**: This file has relatively clear test specifications. Use as template for others.

---

### Supporting Tests (Priority 3)

#### 8-16. Supporting Utility Tests
These test files primarily validate utility functions. Most need:
- Algorithm specification documentation
- Edge case handling policies
- Error behavior specifications

**Priority**: MEDIUM (Complete after security and core tests)

---

### Integration Tests (Priority 2)

#### 17. test-agent-marker-workflow.js (23 tests)
| Test Count | Status | Specification Gap | Priority |
|-----------|--------|------------------|----------|
| 23 tests | ⚠️ | End-to-end workflow specifications | HIGH |

**Gaps**:
- Missing complete workflow specifications
- Need user journey documentation
- Integration point specifications unclear

**Recommendation**: Create `docs/agent-marker-workflow-specification.md`

---

### Regression Tests (Priority - Reference)

#### 18. test-known-bugs.js (17 tests)
| Test Count | Status | Notes |
|-----------|--------|-------|
| 17 tests | ✅ | **EXCELLENT EXAMPLE** - Use as template |

**Strengths**:
- Clear bug documentation
- Inverted assertions documented
- Fix status tracked
- Deployment awareness

**Use this file as MODEL for specification-based testing**

---

## Missing Negative Tests

### Security-Critical Negative Tests Needed

#### Tool Blacklist (test-tool-blacklist.js)
Missing negative tests for:
- ❌ ansible/ansible-playbook (infrastructure tools)
- ❌ yarn/pnpm (alternative package managers)
- ❌ pip/gem/cargo (language package managers)
- ❌ systemctl/service (system management)
- ❌ crontab/at (scheduled tasks)
- ❌ useradd/passwd (user management)

#### Command Validation (test-command-validation.js)
Missing negative tests for:
- ❌ export/unset (environment modification)
- ❌ kill/killall (process control)
- ❌ curl -X POST/PUT/DELETE (write operations)
- ❌ chmod/chown (permission changes)
- ❌ ln/mount (filesystem operations)
- ❌ source/eval (code execution)

#### File Validation (test-file-validation.js)
Missing negative tests for:
- ❌ CHANGELOG.md in src/ (should route to root or docs/)
- ❌ TODO.md in arbitrary locations
- ❌ CONTRIBUTING.md placement rules
- ❌ .gitignore outside root
- ❌ package.json outside root or specific directories

#### Directory Enforcement (test-directory-enforcement.js)
Missing negative tests for:
- ❌ STORY files that bypass routing
- ❌ Work items outside designated directories
- ❌ Memory files outside memory/
- ❌ Documentation outside docs/

---

## Specification Priority Matrix

### CRITICAL (Complete This Week)
1. **Security Policy Document** (`docs/security/security-policy.md`)
   - Tool blacklist rationale
   - Command validation threat model
   - File access control policy
   - Path protection requirements

2. **Tool Blacklist Specification** (`docs/security/tool-blacklist-policy.md`)
   - Complete blocklist with rationale
   - Threat model for each blocked tool
   - Override policies
   - Review/update process

3. **Command Validation Specification** (`docs/security/command-validation-policy.md`)
   - Allowed vs blocked command classification
   - Security boundaries (main scope vs agents)
   - Special cases (kubectl, ssh, heredoc)
   - Chain/pipe validation rules

### HIGH (Complete Next 2 Weeks)
4. **File Validation Policy** (`docs/file-validation-policy.md`)
   - Markdown placement rules
   - README.md exception policy
   - Summary file routing
   - Root-level file allowlist

5. **Directory Structure Specification** (`docs/directory-structure-specification.md`)
   - Complete routing rules
   - BUG file directory decision
   - Subdirectory policies
   - Default routing behavior

6. **Configuration Hierarchy Specification** (`docs/configuration-hierarchy-specification.md`)
   - Priority rules
   - Override behavior
   - Dot notation precedence
   - Type coercion rules

7. **Path Validation Specification** (`docs/path-validation-specification.md`)
   - Allowlist/blocklist precedence
   - Project boundary enforcement
   - Installation path protection
   - Root-level file exceptions

### MEDIUM (Complete This Month)
8. Individual utility function specifications
9. Integration workflow specifications
10. Error handling specifications

---

## Specification Template

Use this template for ALL specification documents:

```markdown
# [Component] Specification
**Version**: 1.0
**Status**: Draft/Review/Approved
**Authority**: [Architecture/Security/Product]
**Last Updated**: YYYY-MM-DD

## Purpose
[Why this specification exists]

## Requirements
[MUST/SHOULD/MAY statements]

## Rationale
[WHY each requirement exists]

## Security Considerations
[Threat model, attack vectors, mitigations]

## Examples
### Valid Behavior
[Examples of correct behavior]

### Invalid Behavior
[Examples of incorrect behavior]

## Test Coverage
[Which tests validate this specification]

## Edge Cases
[Special cases and their handling]

## Future Considerations
[Known limitations, future enhancements]

## Change History
[Version history and rationale for changes]
```

---

## Action Items Summary

### Immediate (This Week)
- [ ] Create `docs/security/security-policy.md`
- [ ] Create `docs/security/tool-blacklist-policy.md`
- [ ] Create `docs/security/command-validation-policy.md`
- [ ] Add specification comments to test-tool-blacklist.js
- [ ] Add specification comments to test-command-validation.js
- [ ] Add specification comments to test-file-validation.js
- [ ] Document kubectl delete behavior specification (CRITICAL)
- [ ] Document README.md exception policy (HIGH)
- [ ] Document BUG file routing decision (HIGH)

### Short-Term (Weeks 2-3)
- [ ] Create remaining specification documents (4-7 above)
- [ ] Add specification comments to all remaining tests
- [ ] Add negative test coverage for security-critical areas
- [ ] Create specification gap tickets for unclear behaviors
- [ ] Establish test review process requiring specifications

### Long-Term (Month 1+)
- [ ] 100% specification coverage for all tests
- [ ] Complete negative test coverage
- [ ] Specification-driven test development process
- [ ] Test quality metrics tracking
- [ ] Regular specification review and updates

---

**Matrix Generated**: 2025-11-06
**Total Tests Analyzed**: 247 across 19 files
**Specification Gaps Identified**: 215+ gaps requiring documentation
**Critical Security Gaps**: 45+ gaps in security-critical tests
**Missing Negative Tests**: 50+ negative tests needed
