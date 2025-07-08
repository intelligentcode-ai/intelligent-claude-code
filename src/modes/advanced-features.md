# Advanced Features Module

## Memory Integration System
**AUTO MEMORY:** MCP integration • Persistent knowledge • Relationship tracking • **MANDATORY FOR ALL ROLES:** Active memory management required • -1.0pts P penalty for non-compliance • See active-memory-management.md for full protocols
**ENTITIES:** User/Project/Role/Pattern/Context/Score/Behavior • **TRIGGERS:** 15 auto points (prefs, context, expertise, patterns, decisions, etc.) + Active behavior tracking
**TOOLS:** create_entities, search_nodes, add_observations, create_relations, open_nodes
**WORKFLOW:** Search→Create→Map→Capture→Retrieve • **ROLE-SPECIFIC:** PM(context/prefs), Architect(decisions/patterns), User-Role(test-scenarios/selectors/results), etc.
**ACTIVE BEHAVIORS:** Memory compliance tracking • Specialization events • Disagreement patterns

### AI Task Size Scoring System Memory Integration
**AUTO-CAPTURE:** Role scores • Score changes • Task size classifications • AI classification decisions • Learning callouts • Achievements • State transitions • Kudos/WTF events • Team dynamics
**ENTITIES:** 
- **RoleScore:** @[Role]-Score entity (e.g., @Developer-Score, @PM-Score)
- **Observations:** Current P/Q scores • State (Standard/Senior/Elite/etc.) • Recent changes • Task size history • AI classification accuracy • Learning insights • Kudos/WTF received
- **TaskClassification:** Task-[ID] entity for significant classification decisions
- **Observations:** Task description • AI metrics used • Classification decision • Evidence provided • Dispute resolution
- **KudosEvent:** Kudos-[Timestamp] entity for positive feedback
- **Observations:** Issuer role • Recipient role • Specific reason • Score impact • Multiplier applied • Team reaction
- **WTFEvent:** WTF-[Timestamp] entity for corrective feedback  
- **Observations:** Issuer role • Recipient role • Specific issue • Score impact • Multiplier applied • Improvement plan
- **TeamDynamic:** TeamPattern-[Type] entity for behavioral patterns
- **Observations:** Pattern type • Frequency • Roles involved • Cultural impact • Evolution timeline
- **BrowserTest:** BrowserTest-[Feature] entity for test scenarios
- **Observations:** Test steps • Selectors used • Expected results • Actual results • Screenshots captured • Performance metrics
- **TestSelector:** Selector-[Component] entity for reusable selectors
- **Observations:** CSS selector • XPath alternative • Component name • Stability rating • Last verified • Usage frequency
- **AccessibilityIssue:** A11y-[Type] entity for accessibility findings
- **Observations:** WCAG criterion • Severity level • Element affected • Remediation steps • Verification status
**UPDATE TRIGGERS:**
- Score change detected → Update RoleScore entity observations → Include task size multiplier applied
- AI classification completed → Create TaskClassification entity for complex cases → Store decision rationale
- State transition → Add achievement observation → Include task size impact analysis
- Learning callout generated → Capture insight observation → Include classification learning
- Team member replacement → Archive old, create new entity → Preserve task size pattern analysis
- Gaming prevention triggered → Log gaming attempt → Pattern analysis storage
- Kudos issued → Create KudosEvent entity → Store issuer, recipient, reason, impact → Track positive patterns
- WTF issued → Create WTFEvent entity → Store issuer, recipient, issue, impact → Track improvement needs
- Team pattern detected → Create TeamDynamic entity → Store pattern type, frequency, impact → Cultural evolution tracking
- Memory usage → Create MemoryCompliance entity → Store role, quality, frequency → Track compliance patterns
- Role specialization → Create SpecializationEvent entity → Store switch reason, performance improvement → Track optimization
- Disagreement voiced → Create DisagreementEvent entity → Store violation type, resolution, outcome → Track team protection
- Browser test created → Create BrowserTest entity → Store test scenario, selectors, expected behavior → Enable reuse
- Test execution → Update BrowserTest observations → Store results, screenshots, performance → Track reliability
- Selector discovered → Create/update TestSelector entity → Store selector details, stability → Build selector library
- Accessibility issue found → Create AccessibilityIssue entity → Store WCAG details, severity → Track remediation
**RETRIEVAL COMMANDS:**
- `@PM: Show @Developer scoring history` → Search RoleScore entities → Include task size breakdown
- `@PM: What did @Architect learn recently?` → Query learning observations → Include classification insights
- `@PM: Team scoring summary` → Aggregate all RoleScore entities → Show task size distribution
- `@PM: AI classification accuracy report` → Analyze TaskClassification entities → Show prediction vs actual complexity
- `@PM: Gaming prevention report` → Query gaming prevention patterns → Show repeated inappropriate classifications
- `@PM: Kudos/WTF report` → Query Kudos/WTF events → Show feedback patterns → Team dynamics analysis
- `@PM: Team culture report` → Analyze behavior patterns → Show cultural evolution → Improvement trends
- `@PM: Memory compliance report` → Query MemoryCompliance entities → Show usage patterns → Identify gaps
- `@PM: Specialization report` → Query SpecializationEvent entities → Show optimization rate → Excellence metrics
- `@PM: Disagreement report` → Query DisagreementEvent entities → Show violation prevention → Team protection
- `@PM: Browser test coverage` → Query BrowserTest entities → Show test scenarios → Coverage gaps
- `@PM: Selector stability report` → Query TestSelector entities → Show reliability metrics → Maintenance needs
- `@PM: Accessibility compliance` → Query AccessibilityIssue entities → Show WCAG violations → Remediation status
- `@User-Role: Previous test for [feature]` → Search BrowserTest entities → Retrieve test steps → Reuse scenarios

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
**ACTIVE BEHAVIORS:** Memory integration mandatory • Role optimization continuous • Disagreement on violations required

## Validation Protocol
**PM CHECKLIST:** Role activation • Evidence • Investigation • Research • Testing • Docs • No temp • Proper tools • User decisions • Memory usage • Role optimization • Disagreement tracking
**EVIDENCE:** Arch(diagrams/decisions), Reqs(stories/criteria), Implementation(code/tests), AI(configs/workflows), Infra(configs/validation)

## Docs & Progress
**MANDATORY:** Real-time documentation • Structured tracking
**FORMAT:** Objective • Team • Activity Log • DoD Status • Next Steps
**EVIDENCE:** All documented • Progress tracked • Evidence provided • Professional standards