# Workflow Enforcement Patterns

**MANDATORY:** Agents MUST check and follow embedded workflow settings. Auto-correct violations.

## Core Workflow Enforcement

### Workflow Settings Detection
**MANDATORY:** All agents MUST check workflow section in PRBs:

```yaml
workflow:
  version_bump: true/false
  version_type: patch/minor/major
  changelog_required: true/false
  pr_required: true/false
  merge_strategy: direct_commit/feature_branch
  release_automation: true/false
  auto_merge: true/false
  coordination_required: true/false
  breaking_change_assessment: true/false
```

### PR Creation Enforcement

**MANDATORY PR CREATION WHEN:** `workflow.pr_required: true`

**PR Creation Process:**
1. **Check PR Required:** Scan workflow.pr_required setting in PRB
2. **Create Feature Branch:** If pr_required=true, MUST use feature_branch strategy
3. **Create Pull Request:** After git push, IMMEDIATELY create PR
4. **Include PR URL:** Add PR URL to completion report
5. **Block Completion:** If pr_required=true but no PR created, BLOCK PRB completion

**PR Creation Command Pattern:**
```bash
gh pr create --title "[PRB-ID]: [Description]" --body "[PR_DESCRIPTION]"
```

### Workflow Compliance Checklist

**BEFORE MARKING PRB COMPLETE:**
- ☐ Check workflow.pr_required setting
- ☐ If pr_required=true, verify PR was created
- ☐ Verify merge_strategy matches workflow setting
- ☐ Check version_bump compliance if required
- ☐ Validate changelog_required compliance
- ☐ Include PR URL in completion report if PR created

### Blocking Patterns (IMMEDIATE STOP)

**PR CREATION VIOLATIONS:**
- **BLOCKED:** "No PR needed for this change" when workflow.pr_required=true
- **BLOCKED:** "Direct commit acceptable" when workflow.merge_strategy=feature_branch
- **BLOCKED:** Completing PRB without PR when workflow.pr_required=true
- **BLOCKED:** Using direct_commit strategy when workflow requires feature_branch

**Error Messages:**
```
❌ WORKFLOW VIOLATION: PR required but not created
WORKFLOW SETTING: pr_required=true
REQUIRED ACTION: Create pull request before marking PRB complete
BLOCKING REASON: Workflow settings mandate PR creation for this complexity level
```

### Completion Reporting Enhancement

**MANDATORY COMPLETION REPORT SECTIONS:**

**Workflow Compliance Report:**
```markdown
## Workflow Compliance
- Version Bump: [COMPLETED/SKIPPED] (Required: [workflow.version_bump])
- Changelog Entry: [COMPLETED/SKIPPED] (Required: [workflow.changelog_required])
- Pull Request: [COMPLETED/SKIPPED] (Required: [workflow.pr_required])
- PR URL: [URL] (if PR created)
- Merge Strategy: [USED_STRATEGY] (Required: [workflow.merge_strategy])
```

### Agent Behavioral Integration

**ALL AGENTS MUST:**
1. **Parse Workflow Section:** Extract workflow settings from PRB
2. **Apply Settings:** Follow workflow requirements during execution
3. **Validate Compliance:** Check each workflow requirement is met
4. **Block Violations:** Stop execution if workflow requirements not followed
5. **Report Compliance:** Include workflow compliance in completion report

### Complex Workflow Requirements

**MEDIUM/LARGE/MEGA PRBS (pr_required=true):**
- MANDATORY feature branch creation
- MANDATORY pull request creation
- MANDATORY PR URL in completion report
- BLOCKED direct commits to main/default branch

**NANO/TINY PRBS (pr_required=false):**
- Allowed direct commits to main/default branch
- No PR creation required
- Still follow version_bump and changelog_required settings

---
*Workflow enforcement patterns ensuring agents follow embedded workflow settings*