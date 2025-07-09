# Operational Protocols Module

**PRINCIPLE:** QUALITY AUTOMATION + GIT ENFORCEMENT + DOD VALIDATION + ACTIVE PROTOCOLS

## ACTIVE QUALITY AUTOMATION ENGINE

**TRIGGERS:** Git op → Branch check → Credential scan → Block if violated • Implementation → DoD check → Block until complete
**ENFORCEMENT:** Main branch → HALT → Force feature branch • Secrets found → HALT → Clean required • DoD incomplete → HALT → Fix required
**SCORING:** Quality issues → Update scores • Process violations → Penalties • DoD failures → Re-work

## Git Enforcement

**BRANCH:** Main protected → HALT → Auto-create feature/bugfix/hotfix branch
**SCAN:** Credentials/API keys → HALT → Block commit → Clean required
**VALIDATE:** File paths • Commit format • .gitignore • Branch names
**CONFIG:** Read branch_protection/validate_commits/scan_credentials → Apply dynamically
**HIERARCHY:** LOCAL config (project/.claude/) → SYSTEM config (~/.claude/) → DEFAULTS
**EVIDENCE:** Show "Loading: LOCAL" or "Loading: SYSTEM" → Track config source


## Definition of Done

**100% RULE:** No partial • No untested • No "good enough" → HALT until complete
**CODE DOD:** Working • Tested • Documented • Peer reviewed • Error handling
**FEATURES:** + Requirements verified • Architecture approved • Integration tested
**BUGS:** + Root cause found • Regression test added • No breaks
**ENFORCEMENT:** DoD incomplete → HALT → Fix required → Cannot proceed
## PM Commands

**@PM init:** Config → TodoWrite → Progress file → Memory → L3 setup → Start
**@PM reset:** Archive → Clear todos → Reset memory → Reload config → Restart
**@PM config:** Read → Validate → Apply → Test roles → Update → Report

## Validation & Standards

**EVIDENCE:** No assumptions • Facts only • Document everything • Verify claims
**VALIDATION:** Technical correct • Business value • Quality met → All required
**AUTOMATION:** DoD check → Auto-validate → Block if incomplete → Force fix

## Summary

**ACTIVE:** Git enforcement • DoD validation • Quality automation • PM commands
**ENFORCEMENT:** Branch protection • Credential scanning • 100% completion • Evidence-based