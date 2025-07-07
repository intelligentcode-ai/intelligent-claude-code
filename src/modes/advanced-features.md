# Advanced Features Module

## Memory Integration System
**AUTO MEMORY:** MCP integration • Persistent knowledge • Relationship tracking
**ENTITIES:** User/Project/Role/Pattern/Context • **TRIGGERS:** 15 auto points (prefs, context, expertise, patterns, decisions, etc.)
**TOOLS:** create_entities, search_nodes, add_observations, create_relations, open_nodes
**WORKFLOW:** Search→Create→Map→Capture→Retrieve • **ROLE-SPECIFIC:** PM(context/prefs), Architect(decisions/patterns), etc.

## Git Workflow Protocol - ENFORCEMENT

### Branch Protection
**DETECTION:** git status → current branch → compare default_branch
**MAIN PROTECTION:** current=main/master+branch_protection → BLOCK → force feature branch
**AUTO-CREATION:** Generate using prefixes (feature/, bugfix/, hotfix/)
**NAMING:** Validate patterns before operations

### Pre-Commit Validation
**CREDENTIAL SCAN:** API keys, tokens, passwords, secrets before Git ops
**FILE VALIDATION:** Invalid chars, max length, forbidden paths, personal info
**LARGE FILES:** Prevent commits exceeding size limits
**GITIGNORE:** Ensure exists and covers patterns

### Operation Interception
**COMMIT:** Before → credential scan → file paths → branch protection
**PUSH:** Before → verify not main (if protected) → security validation
**MERGE:** Before → PR approval requirements → final validation

### Config-Driven Enforcement
**READ:** config.md branch_protection, validate_commits, require_pr_for_main, scan_credentials
**DYNAMIC:** Adjust enforcement per settings
**DEGRADATION:** Warn if tools unavailable, manual guidance

### Implementation Logic

**BRANCH PROTECTION:** git branch --show-current → Read config: default_branch → If current=default AND branch_protection=true: BLOCK → Create: git checkout -b feature/[auto-name] → Guide to new branch → Retry on feature branch

**PRE-COMMIT VALIDATION:** scan_credentials=true: Scan staged → BLOCK if found → remediation → validate_file_paths=true: Check chars/personal → BLOCK if violations → validate_commits=true: Check format → validate standards

**AUTO BRANCH CREATION:** Generate: [prefix]/[component]-[description] → Use: feature/, bugfix/, hotfix/ → Extract component from changes → Create: git checkout -b [name] → Inform user → Proceed

### ENFORCEMENT MECHANISMS

**REQUIREMENTS:** Git Status: Bash git branch --show-current → Config Reading: Parse config.md enforcement settings → Operation Blocking: Stop violating Git operations → Auto Remediation: Create branches, scan files, validate paths → User Guidance: Specific instructions when blocked

**TRIGGERS:** Before git commit: Pre-commit validation → Before git push: Branch protection check → Before git merge: PR requirement validation → Before Git ops: Read enforcement config

**PATTERNS:** Credentials: API keys, tokens, passwords, private keys → File Paths: Invalid chars, max length, forbidden dirs → Branch Names: Configured prefixes, conventions → Commit Messages: Configured format requirements

**STANDARDS:** Feature branch • AI mentions optional (respect config) • MR when complete • Merge after approval
**NAMING:** feature/[component]-[description] • bugfix/[issue] • hotfix/[critical]
**COMMITS:** [component]: Brief description • **AI MENTIONS:** Optional feature - respect flags
**WORKFLOW LEVELS:** L1(User approval), L2(Auto small/User big), L3(Auto/Architect)
**MR:** Title format • Template • Approval hierarchy • Protection (MR only, tests pass, cleanup)
**AUTO GIT:** TodoRead checkpoints→TodoWrite subtasks→Execute sequence→Document completion

## Domain Peer Review
**DOCS:** Files/Changes/Testing/Impact/Risk • **BATCHING:** Max 5-10 changes
**REVIEWERS:** Code→@Developer #2, AI/ML→@AI-Engineer #2, Security→@Security-Engineer #2
**HIERARCHY:** Domain Expert→@Architect(arch changes)→@PM(reqs compliance)
**TRIGGERS:** System arch, cross-component, perf/security, major refactoring
**L3 AUTO:** Auto requirement/assignment/validation/correction/evidence

## Definition of Done
**UNIVERSAL:** Doc before/during/after • Update progress • Evidence • Role validation
**CODE:** Working code • Docs • Peer review • Tests pass • Configs • Error handling
**FEATURES:** + Reqs verified • Arch approved • Acceptance criteria • Integration tests
**BUGS:** + Root cause • Regression test • No breaks
**INFRA:** + IaC scripts • Rollback • Security review
**ENFORCEMENT:** PM verifies DoD before Security/DevOps delegation

## Quality Standards
**100% COMPLETION:** No partial/untested/missing docs/"good enough"
**ALWAYS:** Working tested implementation • Complete evidence • Proper docs • Zero issues
**DOC SPRAWL:** Single progress file/day • Update existing • Remove temp (auto_cleanup)
**TOOLS:** Read before Edit • Bash validation • Role-specific usage
**AI:** ULTRATHINKING, SEQUENTIAL THINKING, MCP TOOLS, SUBAGENTS

## Validation Protocol
**PM CHECKLIST:** Role activation • Evidence • Investigation • Research • Testing • Docs • No temp • Proper tools • User decisions
**EVIDENCE:** Arch(diagrams/decisions), Reqs(stories/criteria), Implementation(code/tests), AI(configs/workflows), Infra(configs/validation)

## Docs & Progress
**MANDATORY:** Real-time documentation • Structured tracking
**FORMAT:** Objective • Team • Activity Log • DoD Status • Next Steps
**EVIDENCE:** All documented • Progress tracked • Evidence provided • Professional standards