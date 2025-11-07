# Complete Hook Validation Matrix - Main Scope vs Agents

**Date**: 2025-11-05
**Purpose**: COMPLETE documentation of ALL validations and enforcement rules

## Hook Execution Order (PreToolUse)

1. `agent-marker.js` - Creates agent marker files (NO enforcement)
2. `git-enforcement.js` - Git privacy + branch protection (BOTH contexts)
3. `main-scope-enforcement.js` - Main scope restrictions (agent bypass)
4. `pm-constraints-enforcement.js` - PM role constraints (PM only)
5. `agent-infrastructure-protection.js` - IaC enforcement (BOTH contexts)
6. `config-protection.js` - Config file protection (BOTH contexts)
7. `pre-agenttask-validation.js` - AgentTask validation (context unclear)
8. `project-scope-enforcement.js` - Installation protection (BOTH contexts)
9. `summary-file-enforcement.js` - Summary + ALL-CAPITALS (partial agent bypass)

---

## COMPLETE VALIDATION RULES

### 1. Git Enforcement (`git-enforcement.js`)
**Agent Bypass**: ❌ NO - Applies to BOTH main scope and agents

| Rule | Main Scope | Agents | Default |
|------|------------|--------|---------|
| Git Privacy (strip AI mentions) | ✅ ENFORCED | ✅ ENFORCED | ON |
| Branch Protection (no direct main commits) | ✅ ENFORCED | ✅ ENFORCED | ON |
| Require PR for Main | ✅ ENFORCED | ✅ ENFORCED | ON |

**Privacy Patterns Stripped**:
- "Generated with Claude Code", "Co-Authored-By: Claude"
- "AI assisted", "claude.com/claude-code", "🤖 Generated with"

**Branch Protection**: Blocks direct commits to main/master, requires feature branch + PR workflow

**Config**: `git.privacy`, `git.branch_protection`, `git.require_pr_for_main`

---

### 2. Infrastructure-as-Code Enforcement (`agent-infrastructure-protection.js`)
**Agent Bypass**: ❌ NO - Applies to BOTH main scope and agents

| Rule | Main Scope | Agents | Purpose |
|------|------------|--------|---------|
| Imperative Destructive Commands | ✅ BLOCK | ✅ BLOCK | Force IaC (Ansible/Terraform/Helm) |
| Infrastructure Write Operations | ✅ BLOCK | ✅ BLOCK | Prevent manual infrastructure changes |
| Infrastructure Read Operations | ✅ ALLOW | ✅ ALLOW | Information gathering permitted |
| Whitelist Commands | ✅ ALLOW | ✅ ALLOW | Explicitly allowed operations |

**Imperative Destructive** (forces IaC):
- kubectl delete, govc vm.destroy, Remove-VM
- Manual infrastructure destruction → Must use playbooks/charts

**Write Operations** (blocked):
- kubectl apply, govc vm.create, New-VM
- Manual infrastructure creation → Must use IaC tools

**Read Operations** (allowed):
- kubectl get, govc vm.info, Get-VM
- Read-only queries permitted for both contexts

**Config**: `enforcement.infrastructure_protection.{imperative_destructive,write_operations,read_operations,whitelist}`

---

### 3. Configuration File Protection (`config-protection.js`)
**Agent Bypass**: ❌ NO - Applies to BOTH main scope and agents

| Rule | Main Scope | Agents | Files |
|------|------------|--------|-------|
| Config File Modification | ✅ BLOCK | ✅ BLOCK | icc.config.json, icc.workflow.json |

**Protected Files**: `icc.config.json`, `icc.workflow.json`

**Principle**: Configuration files are USER-ONLY - neither main scope nor agents can modify system configuration

---

### 4. Installation Directory Protection (`project-scope-enforcement.js`)
**Agent Bypass**: ❌ NO - Applies to BOTH main scope and agents

| Rule | Main Scope | Agents | Location |
|------|------------|--------|----------|
| Installation Directory Writes | ✅ BLOCK | ✅ BLOCK | ~/.claude/ (except CLAUDE.md) |
| Installation Directory Reads | ✅ ALLOW | ✅ ALLOW | ~/.claude/ |

**Protected**: `~/.claude/` system installation directory

**Exception**: `~/.claude/CLAUDE.md` can be modified (user configuration)

**Principle**: All work must be done within project directories, not installation

---

### 5. ALL-CAPITALS Filename Validation (`summary-file-enforcement.js`)
**Agent Bypass**: ❌ NO - Check happens BEFORE agent context detection

| Rule | Main Scope | Agents | Allowlist |
|------|------------|--------|-----------|
| ALL-CAPITALS Filenames | ✅ BLOCK | ✅ BLOCK | README.md, CLAUDE.md, SKILL.md, etc. |

**Allowlist**: README.md, LICENSE, LICENSE.md, CLAUDE.md, SKILL.md, CHANGELOG.md, CONTRIBUTING.md, AUTHORS, NOTICE, PATENTS, VERSION, MAKEFILE, DOCKERFILE, COPYING, COPYRIGHT

**Implementation**: ALL-CAPITALS check at lines 63-144 happens BEFORE agent context check at lines 146-168 (v8.20.54)

**Status**: ✅ CORRECTLY ENFORCED FOR BOTH

---

### 6. Summary File Placement (`summary-file-enforcement.js`)
**Agent Bypass**: ✅ YES - Agents SKIP this validation entirely

| Rule | Main Scope | Agents | Patterns |
|------|------------|--------|----------|
| Summary Pattern Files → summaries/ | ✅ ENFORCED | ❌ BYPASSED | FIX-*.md, RESULT-*.md, SUMMARY-*.md, etc. |

**Summary Patterns**: FIX-*.md, RESULT-*.md, SUMMARY-*.md, COMPLETION-*.md, EXECUTION-*.md, ANALYSIS-*.md, REPORT-*.md

**Main Scope**: All summary-pattern files MUST go to `summaries/` directory

**Agents**: Agent context check at lines 146-168 returns `allowOperation()` early, skipping ALL remaining validation

**PROBLEM**: Agents can create summary-pattern files anywhere without directory enforcement

---

### 7. Directory Routing (`main-scope-enforcement.js` + `pm-constraints-enforcement.js`)
**Agent Bypass**: ✅ YES - Agents get selective bypass for non-pattern-matched files

| Rule | Main Scope | Agents | Files |
|------|------------|--------|-------|
| Pattern-Matched Files | ✅ ENFORCED | ✅ ENFORCED | STORY-*.md, BUG-*.md, AGENTTASK-*.yaml |
| Arbitrary Markdown Files | ✅ ENFORCED | ❌ BYPASSED | docs/*.md, skills/*.md, etc. |

**Pattern-Matched Files** (enforced for both):
- STORY-*.md, EPIC-*.md, BUG-*.md → `stories/` (or subdirectories)
- AGENTTASK-*.yaml → `agenttasks/`

**Arbitrary Files** (main scope enforced, agents bypassed):
- docs/my-notes.md → Main scope must use correct directory, agents allowed anywhere
- skills/something.md → Main scope restricted, agents unrestricted

**Implementation**: Lines 315-337 in `main-scope-enforcement.js` check `!shouldRoute` and skip enforcement for agents

**Selective Bypass Rationale**: Agents need flexibility to create arbitrary documentation/notes, but pattern-matched work items (STORY, BUG) must follow structure

---

### 8. Main Scope Coordination-Only Mode (`main-scope-enforcement.js`)
**Agent Bypass**: ✅ YES - Entire hook skipped for agents (lines 197-223)

| Rule | Main Scope | Agents | Purpose |
|------|------------|--------|---------|
| Tool Blacklist (universal) | ✅ ENFORCED | ❌ BYPASSED | Dangerous operations |
| Tool Blacklist (main_scope_only) | ✅ ENFORCED | ❌ BYPASSED | Force AgentTask delegation |
| Coordination Tools Only | ✅ ENFORCED | ❌ BYPASSED | Read, Grep, Glob, Task, etc. |
| Write/Edit Directory Allowlist | ✅ ENFORCED | ❌ BYPASSED | stories/, bugs/, memory/, docs/, summaries/ |
| Infrastructure Command Validation | ✅ ENFORCED | ❌ BYPASSED | Block ssh, kubectl, docker, etc. |

**Agent Context Check**: Lines 197-223 detect agent marker and return `allowOperation()` immediately, skipping ALL remaining main scope enforcement

**Coordination Tools** (main scope only):
- Read, Grep, Glob, Task, TodoWrite, WebFetch, WebSearch, BashOutput, KillShell
- All MCP tools (mcp__*)

**Main Scope Allowlist Directories**:
- stories/, bugs/, memory/, docs/, summaries/, agenttasks/
- src/ (only in development context - working on intelligent-claude-code itself)
- Root files (*.md, VERSION, icc.config.json, etc.)

**Main Scope Infrastructure Blocking**:
- ssh, scp, rsync (all SSH blocked - can execute arbitrary commands)
- kubectl apply, docker run, terraform, ansible, npm install, pip install
- systemctl start, database modifications (INSERT, UPDATE, DELETE, DROP)

**Main Scope Infrastructure Allowed**:
- Read-only: kubectl get, docker ps, curl/wget, npm list, systemctl status
- Git workflow: git add, git commit, git push, git status
- Coordination bash: ls, cat, grep, ps, top, sleep, etc.
- mkdir for allowlist directories

**Agent Behavior**: Agents COMPLETELY BYPASS this hook - no tool blacklist, no coordination-only mode, no directory allowlist

**CRITICAL ISSUE**: Agents bypass ALL tool blacklist validation, including universal blacklist for dangerous operations

---

### 9. PM Role Constraints (`pm-constraints-enforcement.js`)
**Agent Bypass**: ✅ YES - But only relevant when PM role active

| Rule | PM Role (Main Scope) | Agents | Purpose |
|------|----------------------|--------|---------|
| PM Technical Work Block | ✅ ENFORCED | N/A | PM coordination only |
| PM Tool Restrictions | ✅ ENFORCED | N/A | Read, LS, Glob, Grep only |
| PM Directory Allowlist | ✅ ENFORCED | N/A | Limited write locations |

**PM Role Detection**: Checks for agent marker file - if absent, PM role assumed

**PM Restrictions**:
- No Edit/Write/MultiEdit outside allowlist directories
- No technical bash commands (only coordination commands)
- Only coordination tools allowed

**PM Allowlist Directories**:
- stories/, bugs/, memory/, docs/, agenttasks/, summaries/
- icc.config.json, icc.workflow.json (root config files)
- src/ (only in development context)

**Agent Behavior**: Agents never act as PM, so PM constraints don't apply

---

## SUMMARY TABLE

| Validation | Main Scope | Agents | Agent Bypass Location |
|------------|------------|--------|----------------------|
| **Git Privacy** | ✅ ENFORCED | ✅ ENFORCED | NO BYPASS |
| **Branch Protection** | ✅ ENFORCED | ✅ ENFORCED | NO BYPASS |
| **IaC Enforcement** | ✅ ENFORCED | ✅ ENFORCED | NO BYPASS |
| **Config Protection** | ✅ ENFORCED | ✅ ENFORCED | NO BYPASS |
| **Installation Protection** | ✅ ENFORCED | ✅ ENFORCED | NO BYPASS |
| **ALL-CAPITALS Filenames** | ✅ ENFORCED | ✅ ENFORCED | NO BYPASS (checked before agent detection) |
| **Summary File Placement** | ✅ ENFORCED | ❌ BYPASSED | summary-file-enforcement.js:146-168 |
| **Directory Routing (patterns)** | ✅ ENFORCED | ✅ ENFORCED | NO BYPASS |
| **Directory Routing (arbitrary)** | ✅ ENFORCED | ❌ BYPASSED | main-scope-enforcement.js:315-337 |
| **Tool Blacklist** | ✅ ENFORCED | ❌ BYPASSED | main-scope-enforcement.js:197-223 |
| **Coordination Tools Only** | ✅ ENFORCED | ❌ BYPASSED | main-scope-enforcement.js:197-223 |
| **Write/Edit Allowlist** | ✅ ENFORCED | ❌ BYPASSED | main-scope-enforcement.js:197-223 |
| **Infrastructure Commands** | ✅ ENFORCED | ❌ BYPASSED | main-scope-enforcement.js:197-223 |
| **PM Role Constraints** | ✅ ENFORCED (PM only) | N/A | Agents don't act as PM |

---

## KEY FINDINGS

### ✅ CORRECTLY ENFORCED FOR BOTH
1. **Git enforcement** - Privacy + branch protection apply to all contexts
2. **IaC enforcement** - Imperative destructive + write operations blocked for all
3. **Config protection** - Configuration files user-only for all contexts
4. **Installation protection** - Installation directory protected for all contexts
5. **ALL-CAPITALS** - Filename validation enforced for all contexts (v8.20.54 fix)

### ⚠️ SELECTIVE AGENT BYPASS (BY DESIGN)
6. **Directory routing (arbitrary)** - Agents can create docs/notes anywhere (pattern-matched files still enforced)

### ❌ PROBLEMATIC AGENT BYPASS
7. **Summary file placement** - Agents can create FIX-*.md, RESULT-*.md anywhere
8. **Tool blacklist** - Agents bypass universal + main_scope_only blacklists entirely
9. **Main scope enforcement** - Agents bypass entire main-scope-enforcement.js hook

---

## AGENT BYPASS MECHANISMS

### Early Exit Pattern (PROBLEMATIC)
**Location**: `main-scope-enforcement.js` lines 197-223

```javascript
// Check for agent marker
if (fs.existsSync(markerFile)) {
  const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
  if (marker.agent_count > 0) {
    log('Agent context detected - strict main scope enforcement skipped');
    return allowOperation(log);  // ← EXITS EARLY, SKIPS ALL VALIDATION!
  }
}
```

**Impact**: Agents bypass:
- Tool blacklist (universal + main_scope_only)
- Coordination tools restriction
- Write/Edit directory allowlist
- Infrastructure command validation
- ALL remaining main scope enforcement

### Early Exit Pattern (PROBLEMATIC)
**Location**: `summary-file-enforcement.js` lines 146-168

```javascript
// Agent context check
if (fs.existsSync(markerFile)) {
  const marker = JSON.parse(fs.readFileSync(markerFile, 'utf8'));
  if (marker.agent_count > 0) {
    log('Agent context detected - skipping remaining validation (ALL-CAPITALS already checked)');
    return allowOperation(log, true);  // ← EXITS EARLY!
  }
}

// STEP 3: Summary file validation (NEVER REACHED BY AGENTS!)
```

**Impact**: Agents bypass summary file placement validation entirely

### Selective Bypass Pattern (BY DESIGN)
**Location**: `main-scope-enforcement.js` lines 315-337

```javascript
// Check if this file SHOULD be routed (has a pattern match)
const shouldRoute = correctDir !== path.join(projectRoot, 'summaries') ||
                    fileName.match(/^(STORY|EPIC|BUG|AGENTTASK)-/);

if (!shouldRoute) {
  // Agent context check - skip enforcement for non-routed files
  if (marker.agent_count > 0) {
    log('Agent context + no routing pattern - skipping enforcement');
    return allowOperation(log, true);
  }
}
```

**Impact**: Agents can create arbitrary docs/notes anywhere (pattern-matched files still enforced)

---

## CONFIGURATION SETTINGS

### Git Settings
- `git.privacy` - Strip AI mentions (default: true)
- `git.privacy_patterns` - Patterns to strip
- `git.branch_protection` - Block direct main commits (default: true)
- `git.require_pr_for_main` - Require PR workflow (default: true)
- `git.default_branch` - Protected branch name (default: "main")

### Infrastructure Protection
- `enforcement.infrastructure_protection.enabled` - Enable IaC enforcement (default: true)
- `enforcement.infrastructure_protection.imperative_destructive` - Commands blocked (forces IaC)
- `enforcement.infrastructure_protection.write_operations` - Write commands blocked
- `enforcement.infrastructure_protection.read_operations` - Read commands (allowed)
- `enforcement.infrastructure_protection.whitelist` - Explicitly allowed commands
- `enforcement.infrastructure_protection.read_operations_allowed` - Enable read operations (default: true)
- `enforcement.infrastructure_protection.emergency_override_enabled` - Emergency override (default: false)
- `enforcement.infrastructure_protection.emergency_override_token` - Override token

### Main Scope Enforcement
- `enforcement.strict_main_scope` - Enable coordination-only mode (default: true)
- `enforcement.strict_main_scope_message` - Custom blocking message
- `enforcement.allowed_allcaps_files` - ALL-CAPITALS filename allowlist
- `enforcement.blocking_enabled` - Global enforcement toggle (default: true)

### Path Configuration
- `paths.story_path` - Stories directory (default: "stories")
- `paths.bug_path` - Bugs directory (default: "bugs")
- `paths.memory_path` - Memory directory (default: "memory")
- `paths.docs_path` - Documentation directory (default: "docs")
- `paths.summaries_path` - Summaries directory (default: "summaries")
- `paths.src_path` - Source code directory (default: "src")
- `paths.test_path` - Tests directory (default: "tests")
- `paths.config_path` - Configuration directory (default: "config")
