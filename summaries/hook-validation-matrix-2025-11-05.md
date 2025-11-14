# Hook Validation Matrix - Main Scope vs Agents

**Date**: 2025-11-05
**Purpose**: Complete documentation of ALL validations and their application to Main Scope vs Agents

## CRITICAL PRINCIPLE

**Agents have FEWER restrictions than Main Scope, but VALIDATIONS REMAIN ACTIVE.**

The current system has validations DISABLED for agents in many cases.

## Hook Execution Order (PreToolUse)

1. `agent-marker.js` - Creates agent marker files
2. `git-enforcement.js` - Git privacy and branch protection
3. `main-scope-enforcement.js` - Main scope coordination-only mode
4. `pm-constraints-enforcement.js` - PM role constraints
5. `agent-infrastructure-protection.js` - Infrastructure-as-Code enforcement
6. `config-protection.js` - Configuration file protection
7. `pre-agenttask-validation.js` - AgentTask validation
8. `project-scope-enforcement.js` - Installation directory protection
9. `summary-file-enforcement.js` - Summary file placement + ALL-CAPITALS

---

## COMPLETE VALIDATION MATRIX

### 1. Git Enforcement
**Hook**: `git-enforcement.js`
**Agent Context Check**: ❌ NO - Applies to BOTH

| Validation | Main Scope | Agents | Config Setting |
|------------|------------|--------|----------------|
| **Git Privacy** | ✅ ENFORCED | ✅ ENFORCED | `git.privacy=true` (default) |
| **Branch Protection** | ✅ ENFORCED | ✅ ENFORCED | `git.branch_protection=true` (default) |
| **Require PR for Main** | ✅ ENFORCED | ✅ ENFORCED | `git.require_pr_for_main=true` (default) |

**Privacy Patterns Stripped**:
- "Generated with Claude Code", "Co-Authored-By: Claude", "AI assisted", "claude.com/claude-code"

**Branch Protection**:
- Blocks direct commits to main/master branch
- Requires feature branch workflow + PR

**Implementation**: NO agent context bypass - git enforcement applies to ALL contexts

---

### 2. Infrastructure-as-Code Enforcement
**Hook**: `agent-infrastructure-protection.js`
**Agent Context Check**: ❌ NO - Applies to BOTH

| Validation | Main Scope | Agents | Config Setting |
|------------|------------|--------|----------------|
| **Imperative Destructive** | ✅ BLOCK | ✅ BLOCK | `enforcement.infrastructure_protection.imperative_destructive` |
| **Write Operations** | ✅ BLOCK | ✅ BLOCK | `enforcement.infrastructure_protection.write_operations` |
| **Read Operations** | ✅ ALLOW | ✅ ALLOW | `enforcement.infrastructure_protection.read_operations` |
| **Whitelist Commands** | ✅ ALLOW | ✅ ALLOW | `enforcement.infrastructure_protection.whitelist` |

**Imperative Destructive** (IaC enforcement):
- kubectl delete, govc vm.destroy, Remove-VM, manual infrastructure commands
- Forces use of Ansible playbooks, Terraform, Helm charts

**Write Operations** (blocked for both):
- kubectl apply, govc vm.create, New-VM, manual infrastructure modifications

**Read Operations** (allowed for both):
- kubectl get, govc vm.info, Get-VM, read-only queries

**Implementation**: NO agent context bypass - IaC enforcement applies to ALL contexts

---

### 3. Configuration File Protection
**Hook**: `config-protection.js`
**Agent Context Check**: ❌ NO - Applies to BOTH

| Validation | Main Scope | Agents | Files Protected |
|------------|------------|--------|-----------------|
| **Config Modification** | ✅ BLOCK | ✅ BLOCK | `icc.config.json`, `icc.workflow.json` |

**Protected Files**:
- icc.config.json - System configuration
- icc.workflow.json - Workflow settings

**User-Only Modification**: Configuration files can ONLY be modified by the user manually

**Implementation**: NO agent context bypass - config protection applies to ALL contexts

---

### 4. Installation Directory Protection
**Hook**: `project-scope-enforcement.js`
**Agent Context Check**: ❌ NO - Applies to BOTH

| Validation | Main Scope | Agents | Protected Location |
|------------|------------|--------|-------------------|
| **Installation Writes** | ✅ BLOCK | ✅ BLOCK | `~/.claude/` (except CLAUDE.md) |
| **Installation Reads** | ✅ ALLOW | ✅ ALLOW | `~/.claude/` |

**Protected Directory**: ~/.claude/ (system installation)
**Allowed Exception**: ~/.claude/CLAUDE.md (user configuration)
**Principle**: All work must be done within project directories

**Implementation**: NO agent context bypass - installation protection applies to ALL contexts

---

### 5. ALL-CAPITALS Filename Validation
**Hook**: `summary-file-enforcement.js` (lines 63-144)
**Agent Context Check**: ✅ YES - But check happens AFTER ALL-CAPITALS validation

| Validation | Main Scope | Agents | Allowlist |
|------------|------------|--------|-----------|
| **ALL-CAPITALS Files** | ✅ BLOCK | ✅ BLOCK | README.md, CLAUDE.md, SKILL.md, etc. |

**Allowlist** (both contexts):
- README.md, LICENSE, LICENSE.md, CLAUDE.md, SKILL.md, CHANGELOG.md
- CONTRIBUTING.md, AUTHORS, NOTICE, PATENTS, VERSION, MAKEFILE, DOCKERFILE
- COPYING, COPYRIGHT

**Implementation**: ALL-CAPITALS check happens BEFORE agent context check (v8.20.54) - CORRECT!

---

### 6. Summary File Placement Validation
**Hook**: `summary-file-enforcement.js` (lines 146-213)
**Agent Context Check**: ✅ YES - Agents SKIP this validation (exits early)

| Validation | Main Scope | Agents | Pattern Files |
|------------|------------|--------|---------------|
| **Summary Placement** | ✅ ENFORCED | ❌ BYPASSED | FIX-*.md, RESULT-*.md, SUMMARY-*.md, etc. |

**Summary Patterns** (main scope only):
- FIX-*.md, RESULT-*.md, SUMMARY-*.md, COMPLETION-*.md
- EXECUTION-*.md, ANALYSIS-*.md, REPORT-*.md
- All must go to `summaries/` directory

**CURRENT BEHAVIOR**: Agent context check at lines 146-168 returns `allowOperation()` early, skipping ALL remaining validation

**PROBLEM**: Agents can create summary-pattern files anywhere without enforcement

---

### 7. Directory Routing Validation
**Hook**: `main-scope-enforcement.js` (lines 303-364), `pm-constraints-enforcement.js`
**Agent Context Check**: ✅ YES - Agents get selective bypass

| Context | Enforcement | Current Behavior |
|---------|-------------|------------------|
| **Main Scope** | ✅ FULL ENFORCEMENT | All filename patterns must match correct directories |
| **Agents** | ❌ SELECTIVE BYPASS | Only pattern-matched files enforced, arbitrary files allowed |

**Pattern-Matched Files** (enforced for both):
- STORY-*.md, EPIC-*.md, BUG-*.md → stories/ (or subdirectories)
- AGENTTASK-*.yaml → agenttasks/
- FIX-*.md, RESULT-*.md, SUMMARY-*.md, etc. → summaries/

**Arbitrary Files** (current agent behavior):
- ❌ docs/my-notes.md → NOT ENFORCED for agents
- ❌ skills/something.md → NOT ENFORCED for agents
- ❌ random-location/file.md → NOT ENFORCED for agents

**PROBLEM**: Agents skip directory enforcement for non-pattern-matched files. This allows agents to create files in arbitrary locations without validation.

**Implementation**: Lines 315-337 in `main-scope-enforcement.js` skip enforcement when `!shouldRoute` for agents.

---

### 3. Summary File Placement Validation
**Hook**: `summary-file-enforcement.js` (lines 146-213)
**Status**: ❌ COMPLETELY DISABLED FOR AGENTS (WRONG!)

| Context | Enforcement | Current Behavior |
|---------|-------------|------------------|
| **Main Scope** | ✅ ENFORCED | Summary pattern files → summaries/ |
| **Agents** | ❌ BYPASSED | Agent context check returns early, skips validation |

**Summary Patterns**:
- FIX-*.md, RESULT-*.md, SUMMARY-*.md, COMPLETION-*.md
- EXECUTION-*.md, ANALYSIS-*.md, REPORT-*.md

**PROBLEM**: Agent context check at line 146-168 returns `allowOperation()` early, skipping ALL remaining validation including summary file placement.

**Current Code** (v8.20.54):
```javascript
// STEP 2: Agent context check - skip remaining validation for agents
if (fs.existsSync(markerFile)) {
  const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
  if (marker.agent_count > 0) {
    log('Agent context detected - skipping remaining validation (ALL-CAPITALS already checked)');
    return allowOperation(log, true);  // ← EXITS EARLY, NO VALIDATION!
  }
}

// STEP 3: Summary file validation (NEVER REACHED BY AGENTS!)
```

---

### 4. Tool Blacklist Validation
**Hook**: `main-scope-enforcement.js` (lines 240-287), `lib/tool-blacklist.js`
**Status**: ⚠️ AGENT CONTEXT BYPASS (EARLY EXIT)

| Context | Enforcement | Current Behavior |
|---------|-------------|------------------|
| **Main Scope** | ✅ FULL ENFORCEMENT | Universal + main_scope_only blacklists checked |
| **Agents** | ❌ COMPLETELY BYPASSED | Agent marker check returns early at line 207-218 |

**Tool Blacklists**:
- **Universal**: Dangerous operations blocked for EVERYONE
- **main_scope_only**: Operations requiring AgentTask delegation
- **agents_only**: Operations agents should never perform

**PROBLEM**: Agent marker check at lines 207-218 returns early BEFORE blacklist validation at lines 240-287.

**Current Code Flow**:
```javascript
// Lines 197-223: Agent context check
if (fs.existsSync(markerFile)) {
  const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
  if (marker.agent_count > 0) {
    log('Agent context detected - strict main scope enforcement skipped');
    return allowOperation(log);  // ← EXITS EARLY!
  }
}

// Lines 240-287: Tool blacklist check (NEVER REACHED BY AGENTS!)
const blacklistResult = checkToolBlacklist(tool, toolInput, 'main_scope');
```

---

### 5. Coordination Tool Restriction
**Hook**: `main-scope-enforcement.js` (lines 296-299)
**Status**: ❌ BYPASSED FOR AGENTS

| Context | Enforcement | Current Behavior |
|---------|-------------|------------------|
| **Main Scope** | ✅ ENFORCED | Only coordination tools allowed |
| **Agents** | ❌ BYPASSED | All tools allowed |

**Coordination Tools** (main scope only):
- Read, Grep, Glob, Task, TodoWrite, WebFetch, WebSearch, BashOutput, KillShell

**PROBLEM**: Agent bypass happens before this check, so agents can use ANY tool without validation.

---

### 6. Write/Edit Directory Allowlist
**Hook**: `main-scope-enforcement.js` (lines 366-439)
**Status**: ❌ BYPASSED FOR AGENTS

| Context | Enforcement | Current Behavior |
|---------|-------------|------------------|
| **Main Scope** | ✅ ENFORCED | Write/Edit only to allowlist directories |
| **Agents** | ❌ BYPASSED | Write/Edit anywhere |

**Allowlist Directories** (main scope):
- stories/, bugs/, memory/, docs/, agenttasks/, summaries/
- src/ (only in development context)
- Root files (*.md, VERSION, icc.config.json, etc.)

**PROBLEM**: Agent bypass allows agents to write/edit files anywhere without directory restriction validation.

---

### 7. Infrastructure Command Validation
**Hook**: `main-scope-enforcement.js` (lines 442-568)
**Status**: ❌ BYPASSED FOR AGENTS

| Context | Enforcement | Current Behavior |
|---------|-------------|------------------|
| **Main Scope** | ✅ ENFORCED | Only read-only infrastructure + coordination commands |
| **Agents** | ❌ BYPASSED | All bash commands allowed |

**Modifying Infrastructure Commands** (main scope blocked):
- ssh, scp, rsync, kubectl apply, docker run, terraform, ansible
- npm install, pip install, systemctl start, database modifications

**Read-Only Infrastructure** (main scope allowed):
- kubectl get, docker ps, curl/wget, npm list, systemctl status

**PROBLEM**: Agent bypass allows agents to execute ANY bash command including destructive infrastructure operations.

---

### 8. PM Role Constraints
**Hook**: `pm-constraints-enforcement.js`
**Status**: ✅ CORRECTLY ENFORCED FOR PM ROLE ONLY

| Context | Enforcement | Current Behavior |
|---------|-------------|------------------|
| **PM Role (Main Scope)** | ✅ ENFORCED | Coordination only, technical work blocked |
| **Agents** | ✅ NOT APPLICABLE | Agents never act as PM |

**PM Restrictions**:
- No Edit/Write/MultiEdit outside allowlist
- No technical bash commands
- Only coordination tools allowed

**This is CORRECT** - PM constraints are role-specific, not scope-specific.

---

## CURRENT VALIDATION FLOW

### Main Scope Validation Flow
```
1. Hook Entry
2. ❌ Agent Context Check → If agent, EXIT (lines 197-223) ← PROBLEM!
3. Tool Blacklist Check (universal + main_scope_only)
4. MCP Tool Check (allow all)
5. Coordination Tool Check (Read, Grep, Glob, Task, etc.)
6. Write/Edit Operations:
   - ALL-CAPITALS check (via summary-file-enforcement.js)
   - Directory routing check (pattern-matched files)
   - Allowlist directory check
   - Summary file placement check (via summary-file-enforcement.js)
7. Bash Operations:
   - Infrastructure modification check
   - Read-only infrastructure check
   - Coordination command check
   - mkdir allowlist check
8. Block all other operations
```

### Agent Validation Flow (CURRENT - WRONG!)
```
1. Hook Entry
2. ✅ Agent Context Check → Agent detected → EXIT IMMEDIATELY
3. ❌ ALL REMAINING VALIDATIONS SKIPPED
```

---

## WHAT SHOULD HAPPEN

### Correct Agent Validation Flow
```
1. Hook Entry
2. ALL-CAPITALS Filename Check (ALWAYS enforced)
3. Tool Blacklist Check:
   - ✅ Universal blacklist (dangerous operations)
   - ✅ agents_only blacklist (operations agents shouldn't do)
   - ❌ Skip main_scope_only blacklist (AgentTask delegation not needed for agents)
4. Directory Routing Check:
   - ✅ Pattern-matched files (STORY-*.md, FIX-*.md, etc.)
   - ✅ Summary file placement (FIX-*.md, RESULT-*.md → summaries/)
   - ⚠️ Arbitrary files (maybe less strict, but VALIDATE placement makes sense)
5. Infrastructure Commands:
   - ✅ Block dangerous operations (rm -rf /, DROP DATABASE, etc.)
   - ✅ Block unauthorized SSH/deployment commands
   - ✅ Allow read-only infrastructure
   - ✅ Allow agent-appropriate bash operations
6. Write/Edit Operations:
   - ⚠️ Less strict than main scope (agents CAN work in src/, test/, etc.)
   - ✅ Still validate paths make sense for project structure
   - ✅ Block writes to system directories outside project
```

---

## REQUIRED FIXES

### FIX 1: Move Agent Context Check AFTER Critical Validations
**Files**: `main-scope-enforcement.js`, `summary-file-enforcement.js`

**Current Problem**: Agent check happens at line 197-223 in main-scope-enforcement.js, BEFORE all validations.

**Fix**: Move agent context check to happen AFTER:
1. ALL-CAPITALS filename check (already fixed in summary-file-enforcement.js)
2. Tool blacklist check (universal + agents_only lists)
3. Critical infrastructure protection

**Proposed Order**:
```javascript
// 1. ALL-CAPITALS check (ALWAYS enforced)
// 2. Tool blacklist check (universal + agents_only)
// 3. Critical infrastructure protection
// 4. Agent context check → If agent, apply REDUCED enforcement
// 5. Main scope enforcement (full restrictions)
```

---

### FIX 2: Create Separate Agent Validation Path
**Files**: `main-scope-enforcement.js`, `summary-file-enforcement.js`

**Current Problem**: Agent context check returns `allowOperation()` and exits, skipping ALL remaining validation.

**Fix**: Create separate validation path for agents:
```javascript
if (isAgentContext(...)) {
  // AGENT VALIDATION PATH (fewer restrictions, but still validated)
  return validateAgentOperation(tool, filePath, command, projectRoot, log);
} else {
  // MAIN SCOPE VALIDATION PATH (strict restrictions)
  return validateMainScopeOperation(tool, filePath, command, projectRoot, log);
}
```

---

### FIX 3: Implement Agent-Specific Tool Blacklist
**Files**: `lib/tool-blacklist.js`, `icc.config.default.json`

**Current Problem**: No `agents_only` blacklist exists.

**Fix**: Add configuration for agent-specific blocked operations:
```json
"tool_blacklist": {
  "universal": ["dangerous operations"],
  "main_scope_only": ["operations requiring AgentTask delegation"],
  "agents_only": ["operations agents should never perform"]
}
```

---

### FIX 4: Agent Infrastructure Command Validation
**Files**: `main-scope-enforcement.js`

**Current Problem**: Agents bypass ALL infrastructure command validation.

**Fix**: Create agent-specific infrastructure validation:
- ✅ Allow read-only operations
- ✅ Allow agent-appropriate modifications (git, npm install in project, etc.)
- ❌ Block destructive operations (rm -rf /, DROP DATABASE, etc.)
- ❌ Block unauthorized SSH/deployment
- ❌ Block system-wide changes

---

### FIX 5: Agent Directory Validation
**Files**: `main-scope-enforcement.js`, `pm-constraints-enforcement.js`

**Current Problem**: Agents skip directory enforcement for non-pattern-matched files.

**Fix**: Validate agent file placement:
- ✅ Allow src/, test/, lib/ (technical work directories)
- ✅ Enforce pattern-matched files (STORY-*.md, FIX-*.md, etc.)
- ✅ Enforce summary file placement
- ⚠️ Validate arbitrary file placement makes sense for project structure
- ❌ Block writes outside project root

---

## SUMMARY

**CURRENT STATE**: Agents have NO VALIDATIONS after agent context detection (lines 197-223 in main-scope-enforcement.js).

**REQUIRED STATE**: Agents have FEWER RESTRICTIONS than main scope, but VALIDATIONS REMAIN ACTIVE:

| Validation | Main Scope | Agents (Should Be) |
|------------|------------|--------------------|
| ALL-CAPITALS filenames | ✅ BLOCK | ✅ BLOCK |
| Tool blacklist (universal) | ✅ BLOCK | ✅ BLOCK |
| Tool blacklist (agents_only) | N/A | ✅ BLOCK |
| Tool blacklist (main_scope_only) | ✅ BLOCK | ❌ Allow |
| Directory routing (patterns) | ✅ ENFORCE | ✅ ENFORCE |
| Directory routing (arbitrary) | ✅ ENFORCE | ⚠️ VALIDATE |
| Summary file placement | ✅ ENFORCE | ✅ ENFORCE |
| Infrastructure (destructive) | ✅ BLOCK | ✅ BLOCK |
| Infrastructure (read-only) | ✅ Allow | ✅ Allow |
| Infrastructure (agent work) | ✅ BLOCK | ✅ Allow |
| Write/Edit (allowlist dirs) | ✅ ENFORCE | ⚠️ RELAXED |
| Write/Edit (outside project) | ✅ BLOCK | ✅ BLOCK |
| Coordination tools only | ✅ ENFORCE | ❌ Allow All |

**CRITICAL FIXES NEEDED**:
1. Move agent context check AFTER critical validations
2. Create separate agent validation path (don't just exit)
3. Implement agent-specific tool blacklist (agents_only)
4. Add agent infrastructure command validation
5. Add agent directory placement validation
