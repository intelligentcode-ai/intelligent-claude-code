# Workflow Resolution Patterns

**MANDATORY:** Resolve ALL workflow placeholders with actual workflow_settings values.

## Core Resolution Process

### Workflow Settings Loading
**STEPS:**
1. **Load CLAUDE.md**: Read workflow_settings section from project configuration
2. **Determine PRB Size**: Map complexity score to PRB size (nano/tiny/medium/large/mega)
3. **Extract Size Settings**: Get workflow_settings.[size] object with all values
4. **Resolve Placeholders**: Replace ALL workflow placeholders with actual values
5. **Validate Resolution**: Ensure NO workflow placeholders remain unresolved

**Example workflow_settings in CLAUDE.md:**
```yaml
workflow_settings:
  tiny:
    version_bump: true
    version_type: "patch"
    changelog_required: true
    pr_required: false
    merge_strategy: "direct_commit"
    release_automation: false
  medium:
    version_bump: true
    version_type: "minor"
    changelog_required: true
    pr_required: true
    merge_strategy: "feature_branch"
    release_automation: true
    auto_merge: false
```

### Placeholder Resolution Map

**Standard Workflow Placeholders:**
- `[WORKFLOW_VERSION_BUMP]` → workflow_settings.[size].version_bump (true/false)
- `[WORKFLOW_VERSION_TYPE]` → workflow_settings.[size].version_type (patch/minor/major)
- `[WORKFLOW_CHANGELOG_REQUIRED]` → workflow_settings.[size].changelog_required (true/false)
- `[WORKFLOW_PR_REQUIRED]` → workflow_settings.[size].pr_required (true/false)
- `[WORKFLOW_MERGE_STRATEGY]` → workflow_settings.[size].merge_strategy (direct_commit/feature_branch)
- `[WORKFLOW_RELEASE_AUTOMATION]` → workflow_settings.[size].release_automation (true/false)
- `[WORKFLOW_AUTO_MERGE]` → workflow_settings.[size].auto_merge (true/false)
- `[WORKFLOW_COORDINATION_REQUIRED]` → workflow_settings.[size].coordination_required (true/false)
- `[WORKFLOW_BREAKING_CHANGE_ASSESSMENT]` → workflow_settings.[size].breaking_change_assessment (true/false)

### Size-to-Settings Mapping

**Complexity Score to Size:**
- 0-2 points → nano → workflow_settings.nano.*
- 3-5 points → tiny → workflow_settings.tiny.*
- 6-15 points → medium → workflow_settings.medium.*
- 16-30 points → large → workflow_settings.large.*
- 30+ points → mega → workflow_settings.mega.*

## PR Creation Resolution

### PR Required Processing
**WHEN pr_required=true:**
1. **Replace [PR_ID]** → Actual PRB identifier (e.g., "STORY-001-PRB-001")
2. **Replace [FEATURE_DESCRIPTION]** → Actual feature/work description
3. **Include EXPLICIT PR Commands** → Complete git workflow instructions
4. **Add PR Creation Steps** → Step-by-step PR creation with gh cli commands

### Git Workflow Resolution
**WHEN merge_strategy="feature_branch":**
- Include branch creation commands
- Include push commands with upstream tracking
- Include PR creation commands
- Include merge instructions

**WHEN merge_strategy="direct_commit":**
- Include direct commit instructions
- Skip PR creation steps
- Include direct push to main branch

## Validation Rules

### Placeholder Detection
**BLOCKED PATTERNS:**
- Any `[WORKFLOW_*]` pattern remaining unresolved
- Generic workflow instructions without specific values
- PR creation steps without actual commands when pr_required=true
- Version bump instructions without specific version_type when version_bump=true

### Self-Contained Validation
**REQUIRED IN PRB:**
- Resolved workflow settings embedded in PRB context
- Explicit git commands with actual values
- Complete PR creation workflow when required
- No runtime configuration lookups

### PR Creation Command Resolution
**WHEN pr_required=true, STEP 9 MUST INCLUDE:**
```bash
# Create feature branch pull request
git push -u origin [BRANCH_NAME]
gh pr create --title "[PRB_ID]: [FEATURE_DESCRIPTION]" --body "$(cat <<'EOF'
## Summary
[FEATURE_OVERVIEW]

## Changes Made
- [CHANGE_1]
- [CHANGE_2]

## Testing
[TESTING_PERFORMED]

Generated with Claude Code
EOF
)"
```

**WHEN pr_required=false:**
- Skip STEP 9 entirely OR include note "PR creation skipped per workflow settings"
- Direct commit to main branch after STEP 8

## Integration Points

### With Template Loading
- Apply workflow resolution AFTER template loading
- Scan template for workflow placeholders
- Replace ALL placeholders with actual settings values

### With PRB Generation Flow
- Insert workflow resolution step after configuration loading
- Validate workflow resolution before PRB creation
- Ensure complete context embedding with resolved workflow

### With Git Operations
- Use resolved workflow settings for actual git operations
- Follow exact workflow instructions embedded in PRB
- No interpretation required by executing agent

---
*Workflow resolution patterns for self-contained PRB execution*