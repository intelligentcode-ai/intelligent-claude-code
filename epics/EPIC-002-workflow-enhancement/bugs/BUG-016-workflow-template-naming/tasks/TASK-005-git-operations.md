# TASK-005 Git Operations

**Task:** Commit and push workflow template renaming  
**Assigned to:** @AI-Engineer  
**Status:** PLANNED  
**Priority:** critical_path  
**Dependencies:** [TASK-004]

## Git Operations Requirements

### Git Settings to Respect
```yaml
git_privacy: true                # Strip AI mentions from commits/MRs
branch_protection: true          # Force feature branches
default_branch: "main"           # main, master, develop
require_pr_for_main: true        # Force PR/MR workflow
```

### Commit Requirements
- Commit renamed workflow templates
- Include proper commit message with evidence
- **RESPECT git_privacy: true** - NO AI/Claude mentions
- Include all modified files

### Push Requirements
- Push to feature branch (branch_protection: true)
- Validate all tests passing
- Ensure no merge conflicts
- Confirm deliverables complete

### Files to Commit

- workflow-templates/outer-workflow.yaml (renamed)
- workflow-templates/inner-workflow.yaml (renamed)
- src/modes/virtual-team.md (updated imports)
- Documentation updates
- Task completion files

### Git Commands
```bash
git add workflow-templates/*.yaml
git add src/modes/virtual-team.md
git add [documentation files]
git commit -m "BUG-016: Rename workflow templates to remove '-corrected' suffix"
git push
```