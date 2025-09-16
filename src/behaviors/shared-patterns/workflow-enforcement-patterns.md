# Workflow Enforcement Patterns

**MANDATORY:** Agents MUST check and follow embedded workflow settings. Auto-correct violations.

## Core Workflow Enforcement

### Workflow Settings Detection
**MANDATORY:** All agents MUST check workflow section in AgentTasks:

**Workflow Section Structure:**
- version_bump: true/false
- version_type: patch/minor/major
- changelog_required: true/false
- pr_required: true/false
- merge_strategy: direct_commit/feature_branch
- release_automation: true/false
- auto_merge: true/false
- coordination_required: true/false
- breaking_change_assessment: true/false

### PR Creation Enforcement

**MANDATORY PR CREATION WHEN:** `workflow.pr_required: true`

**PR Creation Process:**
1. **Check PR Required:** Scan workflow.pr_required setting in AgentTask
2. **Create Feature Branch:** If pr_required=true, MUST use feature_branch strategy
3. **Create Pull/Merge Request:** After git push, create PR/MR using platform tools
4. **Include PR/MR URL:** Add PR/MR URL to completion report
5. **Block Completion:** If pr_required=true but no PR/MR created, BLOCK AgentTask completion

**Platform-Agnostic PR Creation Pattern:**
Create pull/merge request using platform-appropriate method:
- **GitHub:** gh pr create --title "[AgentTask-ID]: [Description]" --body "[PR_DESCRIPTION]"
- **GitLab:** glab mr create --title "[AgentTask-ID]: [Description]" --description "[MR_DESCRIPTION]"
- **Bitbucket:** Use web interface or bb pr create with appropriate parameters
- **Generic Git:** Use platform's standard PR/MR creation mechanism

### Workflow Compliance Checklist

**BEFORE MARKING AgentTask COMPLETE:**
- ☐ Check workflow.pr_required setting
- ☐ If pr_required=true, verify PR/MR was created
- ☐ Verify merge_strategy matches workflow setting
- ☐ Check version_bump compliance if required
- ☐ Validate changelog_required compliance
- ☐ Include PR/MR URL in completion report if PR/MR created

### Blocking Patterns (IMMEDIATE STOP)

**PR/MR CREATION VIOLATIONS:**
- **BLOCKED:** "No PR/MR needed for this change" when workflow.pr_required=true
- **BLOCKED:** "Direct commit acceptable" when workflow.merge_strategy=feature_branch
- **BLOCKED:** Completing AgentTask without PR/MR when workflow.pr_required=true
- **BLOCKED:** Using direct_commit strategy when workflow requires feature_branch

**Error Message:**
**WORKFLOW VIOLATION:** PR/MR required but not created
**REQUIRED ACTION:** Create pull/merge request before marking AgentTask complete

### Agent Behavioral Integration

**ALL AGENTS MUST:**
1. **Parse Workflow Section:** Extract workflow settings from AgentTask
2. **Apply Settings:** Follow workflow requirements during execution
3. **Validate Compliance:** Check each workflow requirement is met
4. **Block Violations:** Stop execution if workflow requirements not followed
5. **Report Compliance:** Include workflow compliance in completion report

---
*Workflow enforcement patterns ensuring agents follow embedded workflow settings*